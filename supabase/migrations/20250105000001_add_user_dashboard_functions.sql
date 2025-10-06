-- ============================================
-- USER DASHBOARD FUNCTIONS
-- Functions para buscar dados do dashboard de usuários/operadores
-- ============================================

-- ============================================
-- FUNCTION: GET USER STATS
-- Retorna estatísticas do usuário logado
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_id UUID;
    my_leads_count INT;
    new_today_count INT;
    my_tasks_count INT;
    urgent_tasks_count INT;
    appointments_today_count INT;
    conversions_month_count INT;
BEGIN
    -- Pegar ID do usuário autenticado
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not authenticated';
    END IF;
    
    -- Contar leads do usuário
    SELECT COUNT(*) INTO my_leads_count
    FROM public.leads
    WHERE assigned_to = user_id;
    
    -- Contar leads novos hoje
    SELECT COUNT(*) INTO new_today_count
    FROM public.leads
    WHERE assigned_to = user_id
    AND DATE(created_at) = CURRENT_DATE;
    
    -- Contar tasks pendentes
    SELECT COUNT(*) INTO my_tasks_count
    FROM public.tasks
    WHERE assigned_to = user_id
    AND status = 'pending';
    
    -- Contar tasks urgentes
    SELECT COUNT(*) INTO urgent_tasks_count
    FROM public.tasks
    WHERE assigned_to = user_id
    AND priority = 'high'
    AND status = 'pending';
    
    -- Contar agendamentos hoje
    SELECT COUNT(*) INTO appointments_today_count
    FROM public.tasks
    WHERE assigned_to = user_id
    AND DATE(due_date) = CURRENT_DATE;
    
    -- Contar conversões do mês
    SELECT COUNT(*) INTO conversions_month_count
    FROM public.leads
    WHERE assigned_to = user_id
    AND status = 'converted'
    AND DATE_TRUNC('month', updated_at) = DATE_TRUNC('month', CURRENT_DATE);
    
    -- Retornar JSON
    RETURN json_build_object(
        'my_leads', COALESCE(my_leads_count, 0),
        'new_today', COALESCE(new_today_count, 0),
        'my_tasks', COALESCE(my_tasks_count, 0),
        'urgent_tasks', COALESCE(urgent_tasks_count, 0),
        'appointments_today', COALESCE(appointments_today_count, 0),
        'conversions_month', COALESCE(conversions_month_count, 0)
    );
END;
$$;

-- ============================================
-- FUNCTION: GET USER TASKS
-- Retorna tasks do usuário para uma data específica
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_tasks(p_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    due_date TIMESTAMPTZ,
    status TEXT,
    priority TEXT,
    client_id UUID,
    client_name TEXT,
    category TEXT,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_id UUID;
BEGIN
    -- Pegar ID do usuário autenticado
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not authenticated';
    END IF;
    
    -- Retornar tasks do dia
    RETURN QUERY
    SELECT 
        t.id,
        t.title,
        t.description,
        t.due_date,
        t.status,
        t.priority,
        t.client_id,
        c.name as client_name,
        t.category,
        t.start_time,
        t.end_time,
        t.created_at
    FROM public.tasks t
    LEFT JOIN public.clients c ON t.client_id = c.id
    WHERE t.assigned_to = user_id
    AND DATE(t.due_date) = p_date
    ORDER BY 
        CASE t.priority 
            WHEN 'high' THEN 1
            WHEN 'medium' THEN 2
            WHEN 'low' THEN 3
        END,
        t.due_date ASC;
END;
$$;

-- ============================================
-- FUNCTION: GET USER LEADS
-- Retorna leads recentes do usuário
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_leads(p_limit INT DEFAULT 10)
RETURNS TABLE (
    id UUID,
    email TEXT,
    name TEXT,
    phone TEXT,
    source TEXT,
    status TEXT,
    metadata JSONB,
    client_id UUID,
    client_name TEXT,
    client_company TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_id UUID;
BEGIN
    -- Pegar ID do usuário autenticado
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not authenticated';
    END IF;
    
    -- Retornar leads recentes
    RETURN QUERY
    SELECT 
        l.id,
        l.email,
        l.name,
        l.phone,
        l.source,
        l.status,
        l.metadata,
        c.id as client_id,
        c.name as client_name,
        c.company as client_company,
        l.created_at,
        l.updated_at
    FROM public.leads l
    LEFT JOIN public.clients c ON c.created_by = user_id
    WHERE l.assigned_to = user_id
    ORDER BY l.created_at DESC
    LIMIT p_limit;
END;
$$;

-- ============================================
-- GRANTS
-- ============================================

GRANT EXECUTE ON FUNCTION public.get_user_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_tasks(DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_leads(INT) TO authenticated;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON FUNCTION public.get_user_stats() IS 'Retorna estatísticas do usuário logado para o dashboard';
COMMENT ON FUNCTION public.get_user_tasks(DATE) IS 'Retorna tasks do usuário para uma data específica (padrão: hoje)';
COMMENT ON FUNCTION public.get_user_leads(INT) IS 'Retorna leads recentes atribuídos ao usuário';
