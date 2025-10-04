-- Migration: Add Audit Log System
-- Description: Sistema completo de auditoria para rastrear todas as mudanças críticas
-- Date: 2025-10-04

-- ============================================
-- AUDIT LOG TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT,
    user_role TEXT,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    changed_fields TEXT[],
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes para queries eficientes
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON public.audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_record_id ON public.audit_log(record_id);

-- Index composto para queries comuns
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON public.audit_log(table_name, record_id);

-- ============================================
-- RLS POLICIES FOR AUDIT LOG
-- ============================================

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Apenas admins podem visualizar audit log
CREATE POLICY "Only admins can view audit log"
    ON public.audit_log
    FOR SELECT
    USING ((auth.jwt() ->> 'role')::text = 'admin');

-- Ninguém pode inserir, atualizar ou deletar manualmente (apenas via triggers)
CREATE POLICY "No manual modifications to audit log"
    ON public.audit_log
    FOR ALL
    USING (false)
    WITH CHECK (false);

-- ============================================
-- FUNCTION: AUDIT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION public.audit_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_email TEXT;
    user_role TEXT;
    changed_fields TEXT[];
    old_json JSONB;
    new_json JSONB;
BEGIN
    -- Buscar email e role do usuário
    SELECT email INTO user_email FROM auth.users WHERE id = auth.uid();
    SELECT (auth.jwt() ->> 'role')::text INTO user_role;
    
    -- DELETE
    IF TG_OP = 'DELETE' THEN
        old_json := row_to_json(OLD)::jsonb;
        
        INSERT INTO public.audit_log (
            user_id, 
            user_email, 
            user_role,
            action, 
            table_name, 
            record_id, 
            old_data
        )
        VALUES (
            auth.uid(), 
            user_email,
            user_role,
            'DELETE', 
            TG_TABLE_NAME, 
            OLD.id, 
            old_json
        );
        
        RETURN OLD;
    
    -- UPDATE
    ELSIF TG_OP = 'UPDATE' THEN
        old_json := row_to_json(OLD)::jsonb;
        new_json := row_to_json(NEW)::jsonb;
        
        -- Detectar quais campos mudaram
        SELECT ARRAY_AGG(key) INTO changed_fields
        FROM jsonb_each(old_json)
        WHERE old_json->key IS DISTINCT FROM new_json->key;
        
        -- Só registra se houver mudanças reais
        IF array_length(changed_fields, 1) > 0 THEN
            INSERT INTO public.audit_log (
                user_id, 
                user_email,
                user_role,
                action, 
                table_name, 
                record_id, 
                old_data, 
                new_data,
                changed_fields
            )
            VALUES (
                auth.uid(), 
                user_email,
                user_role,
                'UPDATE', 
                TG_TABLE_NAME, 
                NEW.id, 
                old_json, 
                new_json,
                changed_fields
            );
        END IF;
        
        RETURN NEW;
    
    -- INSERT
    ELSIF TG_OP = 'INSERT' THEN
        new_json := row_to_json(NEW)::jsonb;
        
        INSERT INTO public.audit_log (
            user_id, 
            user_email,
            user_role,
            action, 
            table_name, 
            record_id, 
            new_data
        )
        VALUES (
            auth.uid(), 
            user_email,
            user_role,
            'INSERT', 
            TG_TABLE_NAME, 
            NEW.id, 
            new_json
        );
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$;

-- ============================================
-- TRIGGERS FOR AUDIT
-- ============================================

-- Audit para clients
CREATE TRIGGER audit_clients_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.audit_changes();

-- Audit para tasks
CREATE TRIGGER audit_tasks_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.audit_changes();

-- Audit para leads
CREATE TRIGGER audit_leads_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.audit_changes();

-- Audit para users (mudanças de role são críticas)
CREATE TRIGGER audit_users_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.audit_changes();

-- ============================================
-- FUNCTION: GET AUDIT LOG WITH FILTERS
-- ============================================

CREATE OR REPLACE FUNCTION public.get_audit_log(
    filter_table TEXT DEFAULT NULL,
    filter_action TEXT DEFAULT NULL,
    filter_user_id UUID DEFAULT NULL,
    limit_count INT DEFAULT 50,
    offset_count INT DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    user_email TEXT,
    user_role TEXT,
    action TEXT,
    table_name TEXT,
    record_id UUID,
    changed_fields TEXT[],
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.user_email,
        a.user_role,
        a.action,
        a.table_name,
        a.record_id,
        a.changed_fields,
        a.created_at
    FROM public.audit_log a
    WHERE 
        (filter_table IS NULL OR a.table_name = filter_table)
        AND (filter_action IS NULL OR a.action = filter_action)
        AND (filter_user_id IS NULL OR a.user_id = filter_user_id)
    ORDER BY a.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$;

-- ============================================
-- FUNCTION: GET RECORD HISTORY
-- ============================================

CREATE OR REPLACE FUNCTION public.get_record_history(
    p_table_name TEXT,
    p_record_id UUID
)
RETURNS TABLE (
    id UUID,
    user_email TEXT,
    action TEXT,
    changed_fields TEXT[],
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.user_email,
        a.action,
        a.changed_fields,
        a.old_data,
        a.new_data,
        a.created_at
    FROM public.audit_log a
    WHERE 
        a.table_name = p_table_name
        AND a.record_id = p_record_id
    ORDER BY a.created_at DESC;
END;
$$;

-- ============================================
-- FUNCTION: CLEANUP OLD AUDIT LOGS
-- ============================================

CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs(days_to_keep INT DEFAULT 90)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    deleted_count INT;
BEGIN
    -- Deletar logs mais antigos que X dias
    DELETE FROM public.audit_log
    WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant execute nas funções de audit
GRANT EXECUTE ON FUNCTION public.get_audit_log(TEXT, TEXT, UUID, INT, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_record_history(TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_audit_logs(INT) TO authenticated;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE public.audit_log IS 
'Tabela de auditoria que registra todas as mudanças em tabelas críticas do sistema';

COMMENT ON FUNCTION public.audit_changes() IS 
'Trigger function que captura INSERT, UPDATE e DELETE e registra no audit log';

COMMENT ON FUNCTION public.get_audit_log(TEXT, TEXT, UUID, INT, INT) IS 
'Retorna logs de auditoria com filtros opcionais';

COMMENT ON FUNCTION public.get_record_history(TEXT, UUID) IS 
'Retorna histórico completo de mudanças de um registro específico';

COMMENT ON FUNCTION public.cleanup_old_audit_logs(INT) IS 
'Remove logs de auditoria mais antigos que X dias (default 90)';
