-- Sistema de Armazenamento Persistente Completo - Versão Simplificada
-- Migration: 20251006000007_complete_storage_system.sql

-- ==============================================================================
-- SISTEMA DE PERFIL DO CLIENTE SIMPLIFICADO MAS COMPLETO
-- ==============================================================================

DROP TABLE IF EXISTS public.client_profiles CASCADE;
DROP TABLE IF EXISTS public.client_interactions CASCADE;
DROP TABLE IF EXISTS public.checklist_templates CASCADE;
DROP TABLE IF EXISTS public.checklist_verifications CASCADE;
DROP TABLE IF EXISTS public.checklist_relationships CASCADE;

-- Tabela de perfil do cliente
CREATE TABLE public.client_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    
    -- Informações básicas
    business_type TEXT DEFAULT 'corporate',
    industry TEXT DEFAULT 'other',
    company_size TEXT DEFAULT 'medium',
    annual_revenue TEXT DEFAULT 'not_disclosed',
    
    -- Contato
    primary_contact_name TEXT,
    primary_contact_email TEXT,
    primary_contact_phone TEXT,
    
    -- Técnico
    current_website TEXT,
    platform TEXT DEFAULT 'custom',
    has_analytics BOOLEAN DEFAULT FALSE,
    
    -- Objetivos
    primary_goals TEXT[] DEFAULT ARRAY[]::TEXT[],
    pain_points TEXT[] DEFAULT ARRAY[]::TEXT[],
    budget_range TEXT DEFAULT 'not_disclosed',
    
    -- Preferências
    brand_colors JSONB DEFAULT '[]'::jsonb,
    design_style TEXT DEFAULT 'modern',
    
    -- Relacionamento
    satisfaction_score DECIMAL(2,1) DEFAULT 5.0,
    total_projects INTEGER DEFAULT 0,
    
    -- Configurações
    preferred_communication TEXT DEFAULT 'email',
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    
    -- Metadados
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    notes TEXT,
    custom_data JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(client_id)
);

-- Histórico de interações
CREATE TABLE public.client_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    checklist_id UUID REFERENCES public.interactive_checklists(id) ON DELETE SET NULL,
    
    interaction_type TEXT NOT NULL DEFAULT 'note',
    subject TEXT,
    description TEXT,
    outcome TEXT DEFAULT 'neutral',
    
    metadata JSONB DEFAULT '{}'::jsonb,
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates de checklist
CREATE TABLE public.checklist_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    business_type TEXT,
    industry TEXT,
    
    estimated_hours INTEGER DEFAULT 8,
    difficulty TEXT DEFAULT 'medium',
    
    items_template JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    is_active BOOLEAN DEFAULT TRUE,
    usage_count INTEGER DEFAULT 0,
    success_rate DECIMAL(3,1) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verificações automáticas
CREATE TABLE public.checklist_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES public.interactive_checklists(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.checklist_items(id) ON DELETE CASCADE,
    
    verification_type TEXT NOT NULL DEFAULT 'manual',
    status TEXT NOT NULL DEFAULT 'pending',
    score DECIMAL(5,2),
    
    details JSONB DEFAULT '{}'::jsonb,
    url_tested TEXT,
    screenshot_url TEXT,
    
    verified_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Relacionamentos entre entidades
CREATE TABLE public.checklist_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES public.interactive_checklists(id) ON DELETE CASCADE,
    
    client_profile_id UUID REFERENCES public.client_profiles(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    
    relationship_type TEXT NOT NULL DEFAULT 'general',
    auto_sync BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ÍNDICES ESSENCIAIS
-- ==============================================================================

CREATE INDEX idx_client_profiles_client_id ON public.client_profiles(client_id);
CREATE INDEX idx_client_profiles_business_type ON public.client_profiles(business_type);
CREATE INDEX idx_client_profiles_tags ON public.client_profiles USING GIN(tags);

CREATE INDEX idx_client_interactions_client_id ON public.client_interactions(client_id);
CREATE INDEX idx_client_interactions_type ON public.client_interactions(interaction_type);
CREATE INDEX idx_client_interactions_date ON public.client_interactions(created_at DESC);

CREATE INDEX idx_checklist_templates_active ON public.checklist_templates(is_active);
CREATE INDEX idx_checklist_templates_business_type ON public.checklist_templates(business_type);

CREATE INDEX idx_checklist_verifications_checklist_id ON public.checklist_verifications(checklist_id);
CREATE INDEX idx_checklist_verifications_status ON public.checklist_verifications(status);

CREATE INDEX idx_checklist_relationships_checklist_id ON public.checklist_relationships(checklist_id);

-- ==============================================================================
-- TRIGGERS PARA UPDATED_AT
-- ==============================================================================

CREATE TRIGGER trigger_client_profiles_updated_at
    BEFORE UPDATE ON public.client_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_checklist_templates_updated_at
    BEFORE UPDATE ON public.checklist_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================================================
-- RLS POLICIES SIMPLIFICADAS
-- ==============================================================================

ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_relationships ENABLE ROW LEVEL SECURITY;

-- Políticas simples - todos usuários autenticados podem acessar
CREATE POLICY "Authenticated users can access client profiles" ON public.client_profiles FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can access client interactions" ON public.client_interactions FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Everyone can view active templates" ON public.checklist_templates FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Authenticated users can manage templates" ON public.checklist_templates FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can access verifications" ON public.checklist_verifications FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can access relationships" ON public.checklist_relationships FOR ALL USING (auth.uid() IS NOT NULL);

-- ==============================================================================
-- FUNÇÕES UTILITÁRIAS
-- ==============================================================================

-- Criar perfil completo do cliente
CREATE OR REPLACE FUNCTION public.create_client_profile(
    p_client_id UUID,
    p_data JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
    v_profile_id UUID;
BEGIN
    INSERT INTO public.client_profiles (
        client_id,
        business_type,
        industry,
        company_size,
        primary_contact_name,
        primary_contact_email,
        current_website,
        platform,
        primary_goals,
        pain_points,
        budget_range,
        design_style,
        preferred_communication,
        tags,
        notes,
        custom_data
    ) VALUES (
        p_client_id,
        COALESCE(p_data->>'business_type', 'corporate'),
        COALESCE(p_data->>'industry', 'other'),
        COALESCE(p_data->>'company_size', 'medium'),
        p_data->>'primary_contact_name',
        p_data->>'primary_contact_email',
        p_data->>'current_website',
        COALESCE(p_data->>'platform', 'custom'),
        COALESCE(
            ARRAY(SELECT jsonb_array_elements_text(p_data->'primary_goals')),
            ARRAY['improve_performance', 'increase_traffic']
        ),
        COALESCE(
            ARRAY(SELECT jsonb_array_elements_text(p_data->'pain_points')),
            ARRAY['slow_website', 'low_conversion']
        ),
        COALESCE(p_data->>'budget_range', 'not_disclosed'),
        COALESCE(p_data->>'design_style', 'modern'),
        COALESCE(p_data->>'preferred_communication', 'email'),
        COALESCE(
            ARRAY(SELECT jsonb_array_elements_text(p_data->'tags')),
            ARRAY[]::TEXT[]
        ),
        p_data->>'notes',
        COALESCE(p_data->'custom_data', '{}'::jsonb)
    ) RETURNING id INTO v_profile_id;
    
    -- Criar interação inicial
    INSERT INTO public.client_interactions (
        client_id,
        user_id,
        interaction_type,
        subject,
        description,
        metadata
    ) VALUES (
        p_client_id,
        auth.uid(),
        'profile_created',
        'Perfil do cliente criado',
        'Perfil completo criado no sistema',
        jsonb_build_object('profile_id', v_profile_id)
    );
    
    RETURN v_profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar checklist personalizado baseado no perfil
CREATE OR REPLACE FUNCTION public.create_personalized_checklist(
    p_client_id UUID,
    p_title TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_profile public.client_profiles%ROWTYPE;
    v_template public.checklist_templates%ROWTYPE;
    v_checklist_id UUID;
    v_client_name TEXT;
BEGIN
    -- Buscar perfil do cliente
    SELECT * INTO v_profile
    FROM public.client_profiles
    WHERE client_id = p_client_id;
    
    -- Buscar nome do cliente
    SELECT name INTO v_client_name
    FROM public.clients
    WHERE id = p_client_id;
    
    -- Buscar template adequado
    SELECT * INTO v_template
    FROM public.checklist_templates
    WHERE business_type = v_profile.business_type
    AND is_active = TRUE
    ORDER BY success_rate DESC, usage_count DESC
    LIMIT 1;
    
    -- Se não encontrar, usar template genérico
    IF v_template.id IS NULL THEN
        SELECT * INTO v_template
        FROM public.checklist_templates
        WHERE business_type IS NULL
        AND is_active = TRUE
        ORDER BY success_rate DESC
        LIMIT 1;
    END IF;
    
    -- Criar checklist
    INSERT INTO public.interactive_checklists (
        title,
        description,
        user_id,
        checklist_type,
        estimated_time_minutes,
        tags
    ) VALUES (
        COALESCE(p_title, 'Auditoria para ' || v_client_name),
        'Checklist personalizado baseado no perfil do cliente',
        auth.uid(),
        'website_audit',
        COALESCE(v_template.estimated_hours * 60, 480),
        ARRAY[v_profile.business_type, v_profile.industry]
    ) RETURNING id INTO v_checklist_id;
    
    -- Criar relacionamento
    INSERT INTO public.checklist_relationships (
        checklist_id,
        client_profile_id,
        relationship_type
    ) VALUES (
        v_checklist_id,
        v_profile.id,
        'client_audit'
    );
    
    -- Criar itens baseados no template (se existir)
    IF v_template.id IS NOT NULL THEN
        INSERT INTO public.checklist_items (
            checklist_id,
            category,
            title,
            description,
            priority,
            estimated_minutes,
            sort_order
        )
        SELECT 
            v_checklist_id,
            COALESCE((item->>'category')::TEXT, 'General'),
            (item->>'title')::TEXT,
            COALESCE((item->>'description')::TEXT, ''),
            COALESCE((item->>'priority')::TEXT, 'medium'),
            COALESCE((item->>'estimated_minutes')::INTEGER, 15),
            ROW_NUMBER() OVER ()
        FROM jsonb_array_elements(v_template.items_template) AS item;
        
        -- Atualizar contador do template
        UPDATE public.checklist_templates
        SET usage_count = usage_count + 1
        WHERE id = v_template.id;
    END IF;
    
    RETURN v_checklist_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Obter estatísticas completas do cliente
CREATE OR REPLACE FUNCTION public.get_client_stats(p_client_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    WITH client_data AS (
        SELECT 
            c.*,
            cp.business_type,
            cp.industry,
            cp.satisfaction_score,
            cp.total_projects
        FROM public.clients c
        LEFT JOIN public.client_profiles cp ON c.id = cp.client_id
        WHERE c.id = p_client_id
    ),
    interaction_stats AS (
        SELECT 
            COUNT(*) as total_interactions,
            COUNT(*) FILTER (WHERE interaction_type = 'meeting') as meetings,
            COUNT(*) FILTER (WHERE outcome = 'positive') as positive_interactions,
            MAX(created_at) as last_interaction
        FROM public.client_interactions
        WHERE client_id = p_client_id
    ),
    checklist_stats AS (
        SELECT 
            COUNT(DISTINCT ic.id) as total_checklists,
            COUNT(DISTINCT ic.id) FILTER (WHERE ic.status = 'completed') as completed_checklists,
            AVG(ic.progress_percentage) as avg_progress
        FROM public.interactive_checklists ic
        JOIN public.checklist_relationships cr ON ic.id = cr.checklist_id
        JOIN public.client_profiles cp ON cr.client_profile_id = cp.id
        WHERE cp.client_id = p_client_id
    )
    SELECT jsonb_build_object(
        'client', to_jsonb(cd.*),
        'interactions', to_jsonb(interactions.*),
        'checklists', to_jsonb(checklists.*)
    ) INTO v_result
    FROM client_data cd, interaction_stats interactions, checklist_stats checklists;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- DADOS INICIAIS - TEMPLATES BÁSICOS
-- ==============================================================================

INSERT INTO public.checklist_templates (name, description, business_type, items_template) VALUES 
('E-commerce Básico', 'Auditoria básica para lojas online', 'e-commerce', 
'[
  {"category": "Performance", "title": "Testar velocidade da página inicial", "description": "Usar PageSpeed Insights", "priority": "high", "estimated_minutes": 15},
  {"category": "Performance", "title": "Verificar tempo de carregamento do checkout", "description": "Testar processo completo de compra", "priority": "critical", "estimated_minutes": 30},
  {"category": "UX", "title": "Testar navegação mobile", "description": "Verificar usabilidade em dispositivos móveis", "priority": "high", "estimated_minutes": 20},
  {"category": "SEO", "title": "Verificar meta tags de produtos", "description": "Analisar title e description das páginas de produto", "priority": "medium", "estimated_minutes": 25},
  {"category": "Conversão", "title": "Analisar botões de call-to-action", "description": "Verificar visibilidade e efetividade dos CTAs", "priority": "high", "estimated_minutes": 15}
]'::jsonb),

('Website Corporativo', 'Auditoria para sites institucionais', 'corporate',
'[
  {"category": "Performance", "title": "Analisar Core Web Vitals", "description": "Medir LCP, FID e CLS", "priority": "high", "estimated_minutes": 20},
  {"category": "SEO", "title": "Verificar estrutura de URLs", "description": "Analisar hierarquia e organização das URLs", "priority": "medium", "estimated_minutes": 15},
  {"category": "Conteúdo", "title": "Revisar conteúdo institucional", "description": "Verificar clareza e relevância das informações", "priority": "medium", "estimated_minutes": 30},
  {"category": "Contato", "title": "Testar formulários de contato", "description": "Verificar funcionamento e validações", "priority": "high", "estimated_minutes": 10},
  {"category": "Segurança", "title": "Verificar certificado SSL", "description": "Confirmar HTTPS e validade do certificado", "priority": "high", "estimated_minutes": 5}
]'::jsonb),

('SaaS/Startup', 'Auditoria para produtos SaaS e startups', 'saas',
'[
  {"category": "Performance", "title": "Testar performance da aplicação", "description": "Medir tempos de resposta das principais funcionalidades", "priority": "critical", "estimated_minutes": 45},
  {"category": "UX", "title": "Analisar onboarding de usuários", "description": "Verificar processo de cadastro e primeiros passos", "priority": "high", "estimated_minutes": 30},
  {"category": "Segurança", "title": "Verificar autenticação", "description": "Testar login, logout e segurança de sessão", "priority": "critical", "estimated_minutes": 25},
  {"category": "Mobile", "title": "Testar responsividade", "description": "Verificar funcionamento em diferentes dispositivos", "priority": "high", "estimated_minutes": 20},
  {"category": "Analytics", "title": "Configurar tracking de eventos", "description": "Implementar acompanhamento de ações dos usuários", "priority": "medium", "estimated_minutes": 40}
]'::jsonb);

-- ==============================================================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ==============================================================================

COMMENT ON TABLE public.client_profiles IS 'Perfis detalhados dos clientes para personalização de serviços';
COMMENT ON TABLE public.client_interactions IS 'Histórico de todas as interações com clientes';
COMMENT ON TABLE public.checklist_templates IS 'Templates de checklist por tipo de negócio';
COMMENT ON TABLE public.checklist_verifications IS 'Verificações e validações automáticas de itens';
COMMENT ON TABLE public.checklist_relationships IS 'Relacionamentos entre checklists e outras entidades';

COMMENT ON FUNCTION public.create_client_profile(UUID, JSONB) IS 'Cria perfil completo do cliente com dados estruturados';
COMMENT ON FUNCTION public.create_personalized_checklist(UUID, TEXT) IS 'Cria checklist personalizado baseado no perfil do cliente';
COMMENT ON FUNCTION public.get_client_stats(UUID) IS 'Retorna estatísticas completas do relacionamento com o cliente';