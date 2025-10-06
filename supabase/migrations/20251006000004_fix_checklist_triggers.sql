-- Fix Checklist Activity Logs Trigger
-- Migration: 20251006000004_fix_checklist_triggers.sql

-- ==============================================================================
-- CORRIGIR FUNÇÃO DE TRIGGER PARA ACTIVITY LOGS
-- ==============================================================================

-- Remover trigger existente problemático
DROP TRIGGER IF EXISTS update_checklist_progress_on_item_change ON public.checklist_items;

-- Recriar função corrigida para atualizar progresso e logs
CREATE OR REPLACE FUNCTION public.update_checklist_progress_and_log()
RETURNS TRIGGER AS $$
DECLARE
    v_total_items INTEGER;
    v_completed_items INTEGER;
    v_progress_percentage DECIMAL(3,1);
    v_checklist_user_id UUID;
    v_action TEXT;
    v_description TEXT;
BEGIN
    -- Determinar ação baseada no trigger
    IF TG_OP = 'INSERT' THEN
        v_action := 'item_added';
        v_description := 'Item adicionado: ' || NEW.title;
    ELSIF TG_OP = 'UPDATE' AND OLD.is_completed = FALSE AND NEW.is_completed = TRUE THEN
        v_action := 'item_completed';
        v_description := 'Item concluído: ' || NEW.title;
    ELSIF TG_OP = 'UPDATE' AND OLD.is_completed = TRUE AND NEW.is_completed = FALSE THEN
        v_action := 'item_uncompleted';
        v_description := 'Item desmarcado: ' || NEW.title;
    ELSIF TG_OP = 'DELETE' THEN
        v_action := 'item_deleted';
        v_description := 'Item removido: ' || OLD.title;
    ELSE
        -- Para outras atualizações, apenas atualizar progresso sem log
        v_action := NULL;
    END IF;

    -- Obter user_id do checklist
    SELECT user_id INTO v_checklist_user_id
    FROM public.interactive_checklists
    WHERE id = COALESCE(NEW.checklist_id, OLD.checklist_id);

    -- Calcular estatísticas atualizadas
    SELECT 
        COUNT(*),
        COUNT(*) FILTER (WHERE is_completed = TRUE)
    INTO v_total_items, v_completed_items
    FROM public.checklist_items
    WHERE checklist_id = COALESCE(NEW.checklist_id, OLD.checklist_id);

    -- Calcular porcentagem
    IF v_total_items > 0 THEN
        v_progress_percentage := ROUND((v_completed_items::DECIMAL / v_total_items::DECIMAL) * 100, 1);
    ELSE
        v_progress_percentage := 0;
    END IF;

    -- Atualizar checklist com novas estatísticas
    UPDATE public.interactive_checklists
    SET 
        total_items = v_total_items,
        completed_items = v_completed_items,
        progress_percentage = v_progress_percentage,
        status = CASE 
            WHEN v_progress_percentage = 0 THEN 'not_started'
            WHEN v_progress_percentage = 100 THEN 'completed'
            ELSE 'in_progress'
        END,
        updated_at = NOW()
    WHERE id = COALESCE(NEW.checklist_id, OLD.checklist_id);

    -- Criar log de atividade apenas se necessário e se temos user_id
    IF v_action IS NOT NULL AND v_checklist_user_id IS NOT NULL THEN
        INSERT INTO public.checklist_activity_logs (
            checklist_id,
            user_id,
            item_id,
            action,
            details
        ) VALUES (
            COALESCE(NEW.checklist_id, OLD.checklist_id),
            v_checklist_user_id,
            COALESCE(NEW.id, OLD.id),
            v_action,
            jsonb_build_object(
                'item_title', COALESCE(NEW.title, OLD.title),
                'category', COALESCE(NEW.category, OLD.category),
                'priority', COALESCE(NEW.priority, OLD.priority),
                'progress_percentage', v_progress_percentage,
                'total_items', v_total_items,
                'completed_items', v_completed_items
            )
        );
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Recriar trigger corrigido
CREATE TRIGGER update_checklist_progress_on_item_change
    AFTER INSERT OR UPDATE OR DELETE ON public.checklist_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_checklist_progress_and_log();

-- ==============================================================================
-- CORRIGIR FUNÇÃO CREATE_WEBSITE_AUDIT_CHECKLIST
-- ==============================================================================

-- Remover função existente
DROP FUNCTION IF EXISTS public.create_website_audit_checklist(UUID, TEXT, TEXT);

-- Recriar função corrigida
CREATE OR REPLACE FUNCTION public.create_website_audit_checklist(
    p_user_id UUID,
    p_title TEXT DEFAULT 'Auditoria Completa de Website',
    p_description TEXT DEFAULT 'Checklist abrangente para auditoria de performance, SEO, segurança e UX'
)
RETURNS UUID AS $$
DECLARE
    v_checklist_id UUID;
    v_items jsonb;
BEGIN
    -- Validar usuário
    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID é obrigatório';
    END IF;

    -- Verificar se usuário existe
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'Usuário não encontrado';
    END IF;

    -- Criar checklist principal
    INSERT INTO public.interactive_checklists (
        title,
        description,
        user_id,
        estimated_time_minutes,
        checklist_type,
        total_items,
        completed_items,
        progress_percentage,
        status
    ) VALUES (
        p_title,
        p_description,
        p_user_id,
        120,
        'website_audit',
        0, -- Será atualizado pelo trigger
        0,
        0,
        'not_started'
    ) RETURNING id INTO v_checklist_id;

    -- Template de itens de auditoria
    v_items := '[
        {
            "category": "Performance",
            "title": "Verificar velocidade de carregamento",
            "description": "Usar PageSpeed Insights ou GTmetrix para medir Core Web Vitals",
            "priority": "high",
            "difficulty": "easy",
            "estimated_minutes": 10,
            "sort_order": 1
        },
        {
            "category": "Performance", 
            "title": "Otimizar imagens para web",
            "description": "Verificar compressão e formatos adequados (WebP, AVIF)",
            "priority": "high",
            "difficulty": "medium",
            "estimated_minutes": 15,
            "sort_order": 2
        },
        {
            "category": "Performance",
            "title": "Revisar e minificar CSS/JS",
            "description": "Verificar se arquivos estão minificados e otimizados",
            "priority": "medium",
            "difficulty": "medium",
            "estimated_minutes": 20,
            "sort_order": 3
        },
        {
            "category": "SEO",
            "title": "Verificar meta tags essenciais",
            "description": "Confirmar title, description, canonical e OpenGraph",
            "priority": "high",
            "difficulty": "easy",
            "estimated_minutes": 8,
            "sort_order": 4
        },
        {
            "category": "SEO",
            "title": "Analisar estrutura de headings",
            "description": "Verificar hierarquia H1-H6 correta e semântica",
            "priority": "high",
            "difficulty": "easy",
            "estimated_minutes": 10,
            "sort_order": 5
        },
        {
            "category": "SEO",
            "title": "Validar sitemap e robots.txt",
            "description": "Confirmar sitemap atualizado e robots.txt configurado",
            "priority": "medium",
            "difficulty": "easy",
            "estimated_minutes": 5,
            "sort_order": 6
        },
        {
            "category": "Segurança",
            "title": "Verificar certificado SSL/HTTPS",
            "description": "Confirmar SSL válido e redirecionamento HTTPS",
            "priority": "high",
            "difficulty": "easy",
            "estimated_minutes": 5,
            "sort_order": 7
        },
        {
            "category": "Segurança",
            "title": "Testar cabeçalhos de segurança",
            "description": "Verificar HSTS, CSP, X-Frame-Options e outros headers",
            "priority": "medium",
            "difficulty": "medium",
            "estimated_minutes": 12,
            "sort_order": 8
        },
        {
            "category": "UX/Acessibilidade",
            "title": "Verificar responsividade mobile",
            "description": "Testar em diferentes dispositivos e resoluções",
            "priority": "high",
            "difficulty": "easy",
            "estimated_minutes": 15,
            "sort_order": 9
        },
        {
            "category": "UX/Acessibilidade",
            "title": "Testar navegação e formulários",
            "description": "Verificar links funcionais e validação de formulários",
            "priority": "high",
            "difficulty": "medium",
            "estimated_minutes": 20,
            "sort_order": 10
        },
        {
            "category": "UX/Acessibilidade",
            "title": "Avaliar contraste e legibilidade",
            "description": "Usar WAVE ou Lighthouse para verificar acessibilidade",
            "priority": "medium",
            "difficulty": "easy",
            "estimated_minutes": 10,
            "sort_order": 11
        }
    ]'::jsonb;

    -- Inserir itens do checklist
    INSERT INTO public.checklist_items (
        checklist_id,
        category,
        title,
        description,
        priority,
        difficulty,
        estimated_minutes,
        sort_order
    )
    SELECT 
        v_checklist_id,
        (item->>'category')::TEXT,
        (item->>'title')::TEXT,
        (item->>'description')::TEXT,
        (item->>'priority')::TEXT,
        (item->>'difficulty')::TEXT,
        (item->>'estimated_minutes')::INTEGER,
        (item->>'sort_order')::INTEGER
    FROM jsonb_array_elements(v_items) AS item;

    -- Criar log de criação
    INSERT INTO public.checklist_activity_logs (
        checklist_id,
        user_id,
        action,
        details
    ) VALUES (
        v_checklist_id,
        p_user_id,
        'checklist_created',
        jsonb_build_object(
            'title', p_title,
            'type', 'website_audit',
            'total_items', jsonb_array_length(v_items)
        )
    );

    RETURN v_checklist_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- ADICIONAR CONSTRAINT PARA EVITAR CHECKLIST_ACTIVITY_LOGS SEM USER_ID
-- ==============================================================================

-- Garantir que activity logs sempre tenham user_id
ALTER TABLE public.checklist_activity_logs 
ADD CONSTRAINT checklist_activity_logs_user_id_not_null 
CHECK (user_id IS NOT NULL);

-- ==============================================================================
-- FUNCTION PARA ESTATÍSTICAS DE CHECKLIST
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_checklist_with_stats(p_checklist_id UUID)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    user_id UUID,
    status TEXT,
    checklist_type TEXT,
    total_items INTEGER,
    completed_items INTEGER,
    progress_percentage DECIMAL(3,1),
    estimated_time_minutes INTEGER,
    actual_time_minutes INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    items_by_category JSONB,
    recent_activity JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ic.id,
        ic.title,
        ic.description,
        ic.user_id,
        ic.status,
        ic.checklist_type,
        ic.total_items,
        ic.completed_items,
        ic.progress_percentage,
        ic.estimated_time_minutes,
        ic.actual_time_minutes,
        ic.created_at,
        ic.updated_at,
        -- Estatísticas por categoria
        (
            SELECT jsonb_object_agg(
                category,
                jsonb_build_object(
                    'total', category_stats.total,
                    'completed', category_stats.completed,
                    'percentage', ROUND((category_stats.completed::DECIMAL / category_stats.total::DECIMAL) * 100, 1)
                )
            )
            FROM (
                SELECT 
                    ci.category,
                    COUNT(*) as total,
                    COUNT(*) FILTER (WHERE ci.is_completed = TRUE) as completed
                FROM public.checklist_items ci
                WHERE ci.checklist_id = p_checklist_id
                GROUP BY ci.category
            ) category_stats
        ) as items_by_category,
        -- Atividade recente
        (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'action', cal.action,
                    'details', cal.details,
                    'created_at', cal.created_at
                )
                ORDER BY cal.created_at DESC
            )
            FROM (
                SELECT cal.action, cal.details, cal.created_at
                FROM public.checklist_activity_logs cal
                WHERE cal.checklist_id = p_checklist_id
                ORDER BY cal.created_at DESC
                LIMIT 10
            ) cal
        ) as recent_activity
    FROM public.interactive_checklists ic
    WHERE ic.id = p_checklist_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- COMENTÁRIOS E METADADOS
-- ==============================================================================

COMMENT ON FUNCTION public.update_checklist_progress_and_log() IS 
'Atualiza automaticamente estatísticas do checklist e cria logs de atividade quando itens são modificados';

COMMENT ON FUNCTION public.create_website_audit_checklist(UUID, TEXT, TEXT) IS 
'Cria um checklist completo de auditoria de website com 11 itens pré-definidos';

COMMENT ON FUNCTION public.get_checklist_with_stats(UUID) IS 
'Retorna checklist com estatísticas detalhadas por categoria e atividade recente';