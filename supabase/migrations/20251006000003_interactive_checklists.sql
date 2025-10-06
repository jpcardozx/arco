-- Migration: Interactive Checklists Real-time System
-- File: supabase/migrations/20251006000003_interactive_checklists.sql

-- ==============================================================================
-- INTERACTIVE CHECKLISTS REAL-TIME SYSTEM
-- ==============================================================================

-- Tabela principal de checklists interativos
CREATE TABLE IF NOT EXISTS public.interactive_checklists (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    checklist_type TEXT NOT NULL DEFAULT 'website_audit',
    title TEXT NOT NULL,
    description TEXT,
    total_items INTEGER NOT NULL DEFAULT 0,
    completed_items INTEGER NOT NULL DEFAULT 0,
    progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    estimated_time_minutes INTEGER DEFAULT 30,
    actual_time_minutes INTEGER,
    tags TEXT[] DEFAULT '{}',
    
    CONSTRAINT interactive_checklists_pkey PRIMARY KEY (id)
);

-- Tabela de itens do checklist
CREATE TABLE IF NOT EXISTS public.checklist_items (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES public.interactive_checklists(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    action_required TEXT,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    estimated_minutes INTEGER DEFAULT 5,
    actual_minutes INTEGER,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    completed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    notes TEXT,
    evidence_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT checklist_items_pkey PRIMARY KEY (id)
);

-- Tabela de histórico de mudanças (para analytics)
CREATE TABLE IF NOT EXISTS public.checklist_activity_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES public.interactive_checklists(id) ON DELETE CASCADE,
    item_id UUID REFERENCES public.checklist_items(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'item_completed', 'item_uncompleted', 'checklist_created', 'note_added'
    details JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT checklist_activity_logs_pkey PRIMARY KEY (id)
);

-- ==============================================================================
-- ÍNDICES PARA PERFORMANCE
-- ==============================================================================

-- Índices principais
CREATE INDEX IF NOT EXISTS idx_interactive_checklists_user_id ON public.interactive_checklists(user_id);
CREATE INDEX IF NOT EXISTS idx_interactive_checklists_status ON public.interactive_checklists(status);
CREATE INDEX IF NOT EXISTS idx_interactive_checklists_type ON public.interactive_checklists(checklist_type);

CREATE INDEX IF NOT EXISTS idx_checklist_items_checklist_id ON public.checklist_items(checklist_id);
CREATE INDEX IF NOT EXISTS idx_checklist_items_category ON public.checklist_items(category);
CREATE INDEX IF NOT EXISTS idx_checklist_items_priority ON public.checklist_items(priority);
CREATE INDEX IF NOT EXISTS idx_checklist_items_completed ON public.checklist_items(is_completed);
CREATE INDEX IF NOT EXISTS idx_checklist_items_sort_order ON public.checklist_items(checklist_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_checklist_activity_logs_checklist_id ON public.checklist_activity_logs(checklist_id);
CREATE INDEX IF NOT EXISTS idx_checklist_activity_logs_created_at ON public.checklist_activity_logs(created_at DESC);

-- ==============================================================================
-- TRIGGERS PARA UPDATED_AT
-- ==============================================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_interactive_checklists_updated_at
    BEFORE UPDATE ON public.interactive_checklists
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_checklist_items_updated_at
    BEFORE UPDATE ON public.checklist_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================================================
-- TRIGGER PARA AUTO-UPDATE DE PROGRESSO
-- ==============================================================================

-- Função para atualizar progresso do checklist
CREATE OR REPLACE FUNCTION public.update_checklist_progress()
RETURNS TRIGGER AS $$
DECLARE
    total_count INTEGER;
    completed_count INTEGER;
    progress_pct DECIMAL(5,2);
    new_status TEXT;
BEGIN
    -- Contar itens total e completados
    SELECT 
        COUNT(*),
        COUNT(*) FILTER (WHERE is_completed = TRUE)
    INTO total_count, completed_count
    FROM public.checklist_items
    WHERE checklist_id = NEW.checklist_id;
    
    -- Calcular progresso
    progress_pct := CASE 
        WHEN total_count > 0 THEN (completed_count::DECIMAL / total_count::DECIMAL) * 100
        ELSE 0
    END;
    
    -- Determinar status
    new_status := CASE
        WHEN progress_pct = 100 THEN 'completed'
        WHEN progress_pct > 0 THEN 'in_progress'
        ELSE 'not_started'
    END;
    
    -- Atualizar checklist
    UPDATE public.interactive_checklists
    SET 
        total_items = total_count,
        completed_items = completed_count,
        progress_percentage = progress_pct,
        status = new_status,
        completed_at = CASE WHEN new_status = 'completed' AND status != 'completed' THEN NOW() ELSE completed_at END,
        updated_at = NOW()
    WHERE id = NEW.checklist_id;
    
    -- Log da atividade
    INSERT INTO public.checklist_activity_logs (checklist_id, item_id, user_id, action, details)
    VALUES (
        NEW.checklist_id,
        NEW.id,
        COALESCE(NEW.completed_by, auth.uid()),
        CASE WHEN NEW.is_completed THEN 'item_completed' ELSE 'item_uncompleted' END,
        jsonb_build_object(
            'item_title', NEW.title,
            'previous_progress', (SELECT progress_percentage FROM public.interactive_checklists WHERE id = NEW.checklist_id),
            'new_progress', progress_pct
        )
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar progresso quando item muda
CREATE TRIGGER update_checklist_progress_on_item_change
    AFTER INSERT OR UPDATE OF is_completed ON public.checklist_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_checklist_progress();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Ativar RLS
ALTER TABLE public.interactive_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para interactive_checklists
CREATE POLICY "Users can view own checklists"
    ON public.interactive_checklists
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checklists"
    ON public.interactive_checklists
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklists"
    ON public.interactive_checklists
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own checklists"
    ON public.interactive_checklists
    FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas para checklist_items (via ownership do checklist)
CREATE POLICY "Users can view items of own checklists"
    ON public.checklist_items
    FOR SELECT
    USING (
        checklist_id IN (
            SELECT id FROM public.interactive_checklists 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert items to own checklists"
    ON public.checklist_items
    FOR INSERT
    WITH CHECK (
        checklist_id IN (
            SELECT id FROM public.interactive_checklists 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update items of own checklists"
    ON public.checklist_items
    FOR UPDATE
    USING (
        checklist_id IN (
            SELECT id FROM public.interactive_checklists 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete items of own checklists"
    ON public.checklist_items
    FOR DELETE
    USING (
        checklist_id IN (
            SELECT id FROM public.interactive_checklists 
            WHERE user_id = auth.uid()
        )
    );

-- Políticas para activity logs
CREATE POLICY "Users can view activity logs of own checklists"
    ON public.checklist_activity_logs
    FOR SELECT
    USING (
        checklist_id IN (
            SELECT id FROM public.interactive_checklists 
            WHERE user_id = auth.uid()
        )
    );

-- ==============================================================================
-- FUNÇÕES HELPER
-- ==============================================================================

-- Função para criar checklist com itens padrão
CREATE OR REPLACE FUNCTION public.create_website_audit_checklist(
    p_user_id UUID,
    p_title TEXT DEFAULT 'Website Audit Completo',
    p_description TEXT DEFAULT 'Auditoria técnica e UX completa do seu website'
)
RETURNS UUID AS $$
DECLARE
    checklist_id UUID;
    default_items JSONB := '[
        {"category": "Performance", "title": "Testar velocidade de carregamento", "description": "Verificar PageSpeed Insights e Core Web Vitals", "action_required": "Execute o teste no Google PageSpeed Insights", "priority": "high", "difficulty": "easy", "estimated_minutes": 5, "sort_order": 1},
        {"category": "Performance", "title": "Otimizar imagens", "description": "Verificar se imagens estão comprimidas e em formatos modernos", "action_required": "Converter para WebP/AVIF e comprimir", "priority": "high", "difficulty": "medium", "estimated_minutes": 15, "sort_order": 2},
        {"category": "Performance", "title": "Configurar cache do navegador", "description": "Implementar cabeçalhos de cache adequados", "action_required": "Configurar Cache-Control headers", "priority": "medium", "difficulty": "hard", "estimated_minutes": 20, "sort_order": 3},
        {"category": "SEO", "title": "Verificar títulos e meta descriptions", "description": "Todas as páginas devem ter títulos únicos e meta descriptions", "action_required": "Revisar e otimizar títulos de todas as páginas", "priority": "critical", "difficulty": "easy", "estimated_minutes": 10, "sort_order": 4},
        {"category": "SEO", "title": "Configurar sitemap.xml", "description": "Sitemap deve estar presente e atualizado", "action_required": "Gerar e submeter sitemap ao Google Search Console", "priority": "high", "difficulty": "easy", "estimated_minutes": 5, "sort_order": 5},
        {"category": "SEO", "title": "Implementar dados estruturados", "description": "Schema.org markup para melhor indexação", "action_required": "Adicionar JSON-LD ou microdata", "priority": "medium", "difficulty": "hard", "estimated_minutes": 25, "sort_order": 6},
        {"category": "Acessibilidade", "title": "Verificar contraste de cores", "description": "Contraste deve atender WCAG AA (4.5:1)", "action_required": "Testar com ferramenta de contraste", "priority": "high", "difficulty": "easy", "estimated_minutes": 10, "sort_order": 7},
        {"category": "Acessibilidade", "title": "Adicionar alt text nas imagens", "description": "Todas as imagens devem ter texto alternativo", "action_required": "Revisar e adicionar alt text relevante", "priority": "high", "difficulty": "easy", "estimated_minutes": 15, "sort_order": 8},
        {"category": "Acessibilidade", "title": "Testar navegação por teclado", "description": "Site deve ser navegável apenas com teclado", "action_required": "Testar Tab, Enter, Space em todos elementos", "priority": "medium", "difficulty": "medium", "estimated_minutes": 12, "sort_order": 9},
        {"category": "Segurança", "title": "Configurar HTTPS", "description": "Certificado SSL válido e redirecionamento automático", "action_required": "Implementar SSL e forçar HTTPS", "priority": "critical", "difficulty": "medium", "estimated_minutes": 10, "sort_order": 10},
        {"category": "Segurança", "title": "Implementar Content Security Policy", "description": "CSP headers para prevenir XSS", "action_required": "Configurar CSP headers no servidor", "priority": "medium", "difficulty": "hard", "estimated_minutes": 30, "sort_order": 11},
        {"category": "UX", "title": "Testar responsividade", "description": "Layout deve funcionar em todos dispositivos", "action_required": "Testar em mobile, tablet e desktop", "priority": "high", "difficulty": "easy", "estimated_minutes": 15, "sort_order": 12}
    ]';
    item JSONB;
BEGIN
    -- Criar checklist
    INSERT INTO public.interactive_checklists (user_id, checklist_type, title, description, total_items, estimated_time_minutes)
    VALUES (p_user_id, 'website_audit', p_title, p_description, 12, 172)
    RETURNING id INTO checklist_id;
    
    -- Inserir itens padrão
    FOR item IN SELECT * FROM jsonb_array_elements(default_items)
    LOOP
        INSERT INTO public.checklist_items (
            checklist_id,
            category,
            title,
            description,
            action_required,
            priority,
            difficulty,
            estimated_minutes,
            sort_order
        ) VALUES (
            checklist_id,
            item->>'category',
            item->>'title',
            item->>'description',
            item->>'action_required',
            item->>'priority',
            item->>'difficulty',
            (item->>'estimated_minutes')::INTEGER,
            (item->>'sort_order')::INTEGER
        );
    END LOOP;
    
    RETURN checklist_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter estatísticas do checklist
CREATE OR REPLACE FUNCTION public.get_checklist_stats(p_checklist_id UUID)
RETURNS JSONB AS $$
DECLARE
    stats JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_items', COUNT(*),
        'completed_items', COUNT(*) FILTER (WHERE is_completed = TRUE),
        'progress_percentage', ROUND(
            CASE 
                WHEN COUNT(*) > 0 THEN (COUNT(*) FILTER (WHERE is_completed = TRUE)::DECIMAL / COUNT(*)::DECIMAL) * 100
                ELSE 0 
            END, 2
        ),
        'estimated_time_remaining', SUM(estimated_minutes) FILTER (WHERE is_completed = FALSE),
        'categories', jsonb_agg(DISTINCT category),
        'priority_breakdown', jsonb_object_agg(
            priority, 
            COUNT(*) FILTER (WHERE priority = checklist_items.priority)
        )
    )
    INTO stats
    FROM public.checklist_items
    WHERE checklist_id = p_checklist_id;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- GRANTS DE PERMISSÕES
-- ==============================================================================

-- Permitir acesso às tabelas para usuários autenticados
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interactive_checklists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.checklist_items TO authenticated;
GRANT SELECT, INSERT ON public.checklist_activity_logs TO authenticated;

-- Permitir uso das funções
GRANT EXECUTE ON FUNCTION public.create_website_audit_checklist(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_checklist_stats(UUID) TO authenticated;

-- ==============================================================================
-- COMENTÁRIOS
-- ==============================================================================

COMMENT ON TABLE public.interactive_checklists IS 'Checklists interativos com real-time updates';
COMMENT ON TABLE public.checklist_items IS 'Itens individuais dos checklists com tracking de progresso';
COMMENT ON TABLE public.checklist_activity_logs IS 'Log de atividades para analytics e auditoria';

COMMENT ON FUNCTION public.create_website_audit_checklist IS 'Cria um checklist padrão de auditoria de website';
COMMENT ON FUNCTION public.get_checklist_stats IS 'Retorna estatísticas detalhadas de um checklist';