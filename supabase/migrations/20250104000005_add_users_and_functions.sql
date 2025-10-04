-- Migration: Add Users Table and Analytics Functions
-- Description: Cria tabela pública de users com metadata e funções RPC para métricas
-- Date: 2025-10-04

-- ============================================
-- USERS TABLE
-- ============================================

-- Criar tabela pública de users para metadata extendido
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'user', 'client')),
    full_name TEXT,
    avatar_url TEXT,
    company TEXT,
    phone TEXT,
    bio TEXT,
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    language TEXT DEFAULT 'pt-BR',
    email_notifications BOOLEAN DEFAULT true,
    whatsapp_notifications BOOLEAN DEFAULT true,
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index para queries por role
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_last_seen ON public.users(last_seen_at);

-- Trigger para updated_at
CREATE TRIGGER set_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- RLS POLICIES FOR USERS
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver seu próprio perfil
CREATE POLICY "Users can view their own profile"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Admins podem ver todos os perfis
CREATE POLICY "Admins can view all users"
    ON public.users
    FOR SELECT
    USING ((auth.jwt() ->> 'role')::text = 'admin');

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update their own profile"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins podem atualizar qualquer perfil
CREATE POLICY "Admins can update all users"
    ON public.users
    FOR UPDATE
    USING ((auth.jwt() ->> 'role')::text = 'admin');

-- Apenas admins podem inserir users
CREATE POLICY "Admins can insert users"
    ON public.users
    FOR INSERT
    WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

-- Apenas admins podem deletar users
CREATE POLICY "Admins can delete users"
    ON public.users
    FOR DELETE
    USING ((auth.jwt() ->> 'role')::text = 'admin');

-- ============================================
-- FUNCTION: GET ADMIN STATS
-- ============================================

CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    total_users INT;
    total_clients INT;
    total_leads INT;
    total_tasks INT;
    active_clients INT;
    pending_tasks INT;
    completed_tasks INT;
    new_leads INT;
    converted_leads INT;
BEGIN
    -- Contar usuários
    SELECT COUNT(*) INTO total_users FROM auth.users;
    
    -- Contar clientes
    SELECT COUNT(*) INTO total_clients FROM public.clients;
    SELECT COUNT(*) INTO active_clients FROM public.clients WHERE status = 'active';
    
    -- Contar leads
    SELECT COUNT(*) INTO total_leads FROM public.leads;
    SELECT COUNT(*) INTO new_leads FROM public.leads WHERE status = 'new';
    SELECT COUNT(*) INTO converted_leads FROM public.leads WHERE status = 'converted';
    
    -- Contar tarefas
    SELECT COUNT(*) INTO total_tasks FROM public.tasks;
    SELECT COUNT(*) INTO pending_tasks FROM public.tasks WHERE status = 'pending';
    SELECT COUNT(*) INTO completed_tasks FROM public.tasks WHERE status = 'completed';
    
    RETURN json_build_object(
        'total_users', COALESCE(total_users, 0),
        'total_clients', COALESCE(total_clients, 0),
        'active_clients', COALESCE(active_clients, 0),
        'total_leads', COALESCE(total_leads, 0),
        'new_leads', COALESCE(new_leads, 0),
        'converted_leads', COALESCE(converted_leads, 0),
        'total_tasks', COALESCE(total_tasks, 0),
        'pending_tasks', COALESCE(pending_tasks, 0),
        'completed_tasks', COALESCE(completed_tasks, 0)
    );
END;
$$;

-- ============================================
-- FUNCTION: GET CONVERSION METRICS
-- ============================================

CREATE OR REPLACE FUNCTION public.get_conversion_metrics()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_leads_count INT;
    converted_leads_count INT;
    conversion_rate NUMERIC;
    avg_conversion_time INTERVAL;
BEGIN
    -- Contar leads dos últimos 30 dias
    SELECT COUNT(*) INTO new_leads_count 
    FROM public.leads 
    WHERE created_at >= NOW() - INTERVAL '30 days';
    
    -- Contar leads convertidos dos últimos 30 dias
    SELECT COUNT(*) INTO converted_leads_count 
    FROM public.leads 
    WHERE status = 'converted' 
    AND updated_at >= NOW() - INTERVAL '30 days';
    
    -- Calcular taxa de conversão
    IF new_leads_count > 0 THEN
        conversion_rate := (converted_leads_count::NUMERIC / new_leads_count::NUMERIC) * 100;
    ELSE
        conversion_rate := 0;
    END IF;
    
    -- Calcular tempo médio de conversão
    SELECT AVG(updated_at - created_at) INTO avg_conversion_time
    FROM public.leads
    WHERE status = 'converted'
    AND updated_at >= NOW() - INTERVAL '30 days';
    
    RETURN json_build_object(
        'period', '30 days',
        'new_leads', COALESCE(new_leads_count, 0),
        'converted_leads', COALESCE(converted_leads_count, 0),
        'conversion_rate', ROUND(COALESCE(conversion_rate, 0), 2),
        'avg_conversion_days', EXTRACT(DAY FROM COALESCE(avg_conversion_time, INTERVAL '0 days'))
    );
END;
$$;

-- ============================================
-- FUNCTION: GET MONTHLY REVENUE (Placeholder)
-- ============================================

CREATE OR REPLACE FUNCTION public.get_monthly_revenue()
RETURNS NUMERIC
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    revenue NUMERIC;
BEGIN
    -- TODO: Implementar cálculo real quando tiver tabela de revenue/transactions
    -- Por enquanto, retorna um cálculo estimado baseado em clientes ativos
    SELECT COUNT(*) * 5000.00 INTO revenue 
    FROM public.clients 
    WHERE status = 'active'
    AND created_at >= DATE_TRUNC('month', NOW());
    
    RETURN COALESCE(revenue, 0);
END;
$$;

-- ============================================
-- FUNCTION: GET RECENT ACTIVITY
-- ============================================

CREATE OR REPLACE FUNCTION public.get_recent_activity(limit_count INT DEFAULT 10)
RETURNS TABLE (
    activity_type TEXT,
    description TEXT,
    created_at TIMESTAMPTZ,
    user_email TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'client'::TEXT as activity_type,
        'Novo cliente: ' || c.name as description,
        c.created_at,
        u.email as user_email
    FROM public.clients c
    LEFT JOIN auth.users u ON u.id = c.created_by
    ORDER BY c.created_at DESC
    LIMIT limit_count;
END;
$$;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant execute permission nas funções para authenticated users
GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_conversion_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_monthly_revenue() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_recent_activity(INT) TO authenticated;

-- Grant permissions na tabela users
GRANT SELECT, UPDATE ON public.users TO authenticated;
GRANT INSERT, DELETE ON public.users TO authenticated;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE public.users IS 'Tabela pública de usuários com metadata extendido e informações de role';
COMMENT ON FUNCTION public.get_admin_stats() IS 'Retorna estatísticas gerais do sistema para o dashboard de admin';
COMMENT ON FUNCTION public.get_conversion_metrics() IS 'Retorna métricas de conversão de leads dos últimos 30 dias';
COMMENT ON FUNCTION public.get_monthly_revenue() IS 'Retorna receita estimada do mês atual';
COMMENT ON FUNCTION public.get_recent_activity(INT) IS 'Retorna as atividades recentes do sistema';
