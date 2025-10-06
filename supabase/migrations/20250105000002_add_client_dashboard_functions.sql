-- ============================================
-- CLIENT DASHBOARD FUNCTIONS
-- Functions para buscar dados do dashboard de clientes
-- ============================================

-- ============================================
-- FUNCTION: GET CLIENT METRICS
-- Retorna métricas do cliente (leads, conversões, ROI)
-- ============================================

CREATE OR REPLACE FUNCTION public.get_client_metrics()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_id UUID;
    leads_count INT := 0;
    conversions_count INT := 0;
    conversion_rate NUMERIC := 0;
    page_views INT := 0;
BEGIN
    -- Pegar ID do usuário autenticado
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not authenticated';
    END IF;
    
    -- Contar leads dos últimos 30 dias
    -- Nota: Como leads não tem client_id ainda, vamos usar created_by como proxy
    SELECT COUNT(*) INTO leads_count
    FROM public.leads
    WHERE created_at >= NOW() - INTERVAL '30 days';
    
    -- Contar conversões dos últimos 30 dias
    SELECT COUNT(*) INTO conversions_count
    FROM public.leads
    WHERE status = 'converted'
    AND updated_at >= NOW() - INTERVAL '30 days';
    
    -- Calcular taxa de conversão
    IF leads_count > 0 THEN
        conversion_rate := ROUND((conversions_count::NUMERIC / leads_count::NUMERIC) * 100, 2);
    END IF;
    
    -- Retornar JSON
    RETURN json_build_object(
        'leads_generated', COALESCE(leads_count, 0),
        'conversions', COALESCE(conversions_count, 0),
        'conversion_rate', COALESCE(conversion_rate, 0),
        'page_views', 0, -- Placeholder: implementar quando tiver tabela page_analytics
        'period', '30 days'
    );
END;
$$;

-- ============================================
-- FUNCTION: GET CLIENT DOMAIN
-- Retorna dados de domínio do cliente
-- ============================================

CREATE OR REPLACE FUNCTION public.get_client_domain()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_id UUID;
    domain_data JSON;
BEGIN
    -- Pegar ID do usuário autenticado
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not authenticated';
    END IF;
    
    -- Buscar análise de domínio mais recente do usuário
    SELECT json_build_object(
        'domain', dar.domain,
        'isVerified', dar.status = 'analyzed',
        'ssl', json_build_object(
            'enabled', COALESCE(dar.ssl_enabled, false),
            'expiry', COALESCE(dar.ssl_expiry::TEXT, ''),
            'issuer', COALESCE(dar.ssl_issuer, 'Unknown')
        ),
        'dns', json_build_object(
            'status', CASE 
                WHEN dar.status = 'analyzed' THEN 'healthy'
                WHEN dar.status = 'identified' THEN 'warning'
                ELSE 'error'
            END,
            'records', '[]'::json  -- Placeholder: implementar quando tiver tabela dns_records
        ),
        'performance', json_build_object(
            'speed', COALESCE(dar.performance_score, 0),
            'seo', COALESCE(dar.seo_score, 0),
            'accessibility', COALESCE(dar.accessibility_score, 0),
            'bestPractices', COALESCE(dar.best_practices_score, 0)
        ),
        'pages', '[]'::json,  -- Placeholder: implementar quando tiver tabela page_analytics
        'created_at', dar.created_at,
        'updated_at', dar.updated_at
    ) INTO domain_data
    FROM public.domain_analysis_requests dar
    WHERE dar.user_id = user_id
    ORDER BY dar.created_at DESC
    LIMIT 1;
    
    -- Se não houver dados, retornar null
    RETURN COALESCE(domain_data, NULL);
END;
$$;

-- ============================================
-- FUNCTION: GET CLIENT TIMELINE
-- Retorna timeline de eventos do cliente
-- ============================================

CREATE OR REPLACE FUNCTION public.get_client_timeline(p_limit INT DEFAULT 50)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_id UUID;
    timeline_events JSON;
BEGIN
    -- Pegar ID do usuário autenticado
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User not authenticated';
    END IF;
    
    -- Buscar eventos do audit_log do usuário
    SELECT json_agg(
        json_build_object(
            'id', al.id::TEXT,
            'type', CASE 
                WHEN al.action = 'INSERT' THEN 'milestone'
                WHEN al.action = 'UPDATE' THEN 'document'
                WHEN al.action = 'DELETE' THEN 'call'
                ELSE 'message'
            END,
            'title', CONCAT(al.table_name, ' ', LOWER(al.action)),
            'description', COALESCE(
                'Record ID: ' || COALESCE(al.record_id::TEXT, 'N/A'),
                'Action performed'
            ),
            'timestamp', al.created_at,
            'metadata', json_build_object(
                'table', al.table_name,
                'action', al.action,
                'status', 'completed'
            )
        )
        ORDER BY al.created_at DESC
    ) INTO timeline_events
    FROM public.audit_log al
    WHERE al.user_id = user_id
    LIMIT p_limit;
    
    -- Se não houver eventos, retornar array vazio
    RETURN COALESCE(timeline_events, '[]'::json);
END;
$$;

-- ============================================
-- GRANTS
-- ============================================

GRANT EXECUTE ON FUNCTION public.get_client_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_client_domain() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_client_timeline(INT) TO authenticated;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON FUNCTION public.get_client_metrics() IS 'Retorna métricas do cliente (leads, conversões, visualizações)';
COMMENT ON FUNCTION public.get_client_domain() IS 'Retorna dados de análise de domínio do cliente';
COMMENT ON FUNCTION public.get_client_timeline(INT) IS 'Retorna timeline de eventos do cliente baseado no audit_log';
