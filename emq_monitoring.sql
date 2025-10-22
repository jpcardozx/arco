-- ============================================================================
-- EMQ (Event Match Quality) Monitoring Dashboard
-- ============================================================================
--
-- Use estas queries no Supabase SQL Editor para monitorar qualidade de eventos
--
-- Documentação: https://www.facebook.com/business/help/765081237991954
-- EMQ 6+: Bom
-- EMQ 4-5: Razoável (melhorar _fbp/_fbc)
-- EMQ <4: Ruim (enviar mais sinais PII)
--

-- ============================================================================
-- 1. STATUS GERAL (Dashboard Card)
-- ============================================================================

SELECT
  COUNT(*) as total_events,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful_events,
  COUNT(CASE WHEN status = 'error' THEN 1 END) as failed_events,
  ROUND(
    (COUNT(CASE WHEN status = 'success' THEN 1 END)::numeric / COUNT(*) * 100),
    2
  ) as success_rate,
  COUNT(CASE WHEN fbtrace_id IS NOT NULL THEN 1 END) as traced_events,
  COUNT(DISTINCT DATE(created_at)) as days_with_data
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '7 days';

-- ============================================================================
-- 2. EVENTOS POR DIA (Trend)
-- ============================================================================

SELECT
  DATE(created_at) as date,
  event_name,
  COUNT(*) as event_count,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
  COUNT(CASE WHEN status = 'error' THEN 1 END) as failed,
  ROUND(
    (COUNT(CASE WHEN status = 'success' THEN 1 END)::numeric / COUNT(*) * 100),
    1
  ) as success_percentage
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), event_name
ORDER BY DATE(created_at) DESC, event_name;

-- ============================================================================
-- 3. EMQ QUALITY INDICATORS (Melhorias necessárias)
-- ============================================================================

SELECT
  'FBC Missing' as issue,
  COUNT(*) as count,
  ROUND((COUNT(*)::numeric / (SELECT COUNT(*) FROM meta_events_log) * 100), 1) as percentage,
  'Adicione fbclid da URL' as recommendation
FROM meta_events_log
WHERE fbc IS NULL OR fbc = ''
UNION ALL
SELECT
  'FBP Missing',
  COUNT(*),
  ROUND((COUNT(*)::numeric / (SELECT COUNT(*) FROM meta_events_log) * 100), 1),
  'Gere _fbp no browser ou cookie'
FROM meta_events_log
WHERE fbp IS NULL OR fbp = ''
UNION ALL
SELECT
  'Email Missing',
  COUNT(*),
  ROUND((COUNT(*)::numeric / (SELECT COUNT(*) FROM meta_events_log) * 100), 1),
  'Colete email do usuário'
FROM meta_events_log
WHERE user_data ->> 'email' IS NULL OR user_data ->> 'email' = ''
UNION ALL
SELECT
  'Phone Missing',
  COUNT(*),
  ROUND((COUNT(*)::numeric / (SELECT COUNT(*) FROM meta_events_log) * 100), 1),
  'Colete telefone do usuário'
FROM meta_events_log
WHERE user_data ->> 'phone' IS NULL OR user_data ->> 'phone' = '';

-- ============================================================================
-- 4. EVENTOS COM FBTRACE_ID (Correlação Meta)
-- ============================================================================

SELECT
  event_id,
  event_name,
  status,
  fbtrace_id,
  created_at,
  CASE
    WHEN fbtrace_id IS NOT NULL THEN 'Rastreado'
    ELSE 'Sem rastreamento'
  END as trace_status,
  EXTRACT(EPOCH FROM (NOW() - created_at))::int as age_seconds
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC
LIMIT 100;

-- ============================================================================
-- 5. DUPLICATAS BLOQUEADAS (Dedup Effectiveness)
-- ============================================================================

SELECT
  DATE(created_at) as date,
  COUNT(*) as duplicate_count,
  COUNT(DISTINCT event_id) as unique_event_ids,
  ROUND(
    ((COUNT(*) - COUNT(DISTINCT event_id))::numeric / COUNT(*) * 100),
    1
  ) as duplication_percentage
FROM meta_events_dedup
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================================================
-- 6. EVENTOS COM ERRO (Troubleshooting)
-- ============================================================================

SELECT
  event_id,
  event_name,
  error_message,
  status,
  created_at,
  fbtrace_id,
  request_id,
  EXTRACT(EPOCH FROM (NOW() - created_at))::int as age_seconds
FROM meta_events_log
WHERE status = 'error'
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- ============================================================================
-- 7. RETRY QUEUE STATUS (Se configurado)
-- ============================================================================

SELECT
  event_id,
  event_name,
  retry_count,
  status as queue_status,
  last_error,
  created_at,
  next_retry_at,
  CASE
    WHEN retry_count >= 3 THEN 'Dead Letter'
    WHEN status = 'pending' AND next_retry_at < NOW() THEN 'Ready to Retry'
    ELSE status
  END as action_needed
FROM meta_retry_queue
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 50;

-- ============================================================================
-- 8. PERFORMANCE METRICS (Latência)
-- ============================================================================

SELECT
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_ms) as p50_latency_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_ms) as p95_latency_ms,
  PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY duration_ms) as p99_latency_ms,
  MAX(duration_ms) as max_latency_ms,
  AVG(duration_ms)::int as avg_latency_ms
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '24 hours'
  AND duration_ms IS NOT NULL;

-- ============================================================================
-- 9. DEDUP CACHE EFFECTIVENESS
-- ============================================================================

SELECT
  'Dedup Cache' as metric,
  COUNT(*) as total_cached,
  COUNT(CASE WHEN NOW() - created_at < INTERVAL '1 hour' THEN 1 END) as active_ttl,
  COUNT(CASE WHEN NOW() - created_at > INTERVAL '1 hour' THEN 1 END) as expired_ttl,
  ROUND(
    (COUNT(CASE WHEN NOW() - created_at < INTERVAL '1 hour' THEN 1 END)::numeric / COUNT(*) * 100),
    1
  ) as active_percentage
FROM meta_events_dedup;

-- ============================================================================
-- 10. TOP EVENTS BY VOLUME (Distribuição)
-- ============================================================================

SELECT
  event_name,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
  ROUND(
    (COUNT(CASE WHEN status = 'success' THEN 1 END)::numeric / COUNT(*) * 100),
    1
  ) as success_rate,
  COUNT(DISTINCT DATE(created_at)) as days_active
FROM meta_events_log
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY event_name
ORDER BY total DESC;

-- ============================================================================
-- 11. REAL-TIME ALERTS (Verificar a cada 5 minutos)
-- ============================================================================

WITH recent_events AS (
  SELECT
    event_name,
    COUNT(*) as count,
    COUNT(CASE WHEN status = 'error' THEN 1 END) as error_count,
    COUNT(CASE WHEN fbc IS NULL THEN 1 END) as fbc_missing
  FROM meta_events_log
  WHERE created_at > NOW() - INTERVAL '5 minutes'
  GROUP BY event_name
)
SELECT
  event_name,
  count,
  error_count,
  ROUND((error_count::numeric / NULLIF(count, 0) * 100), 1) as error_rate,
  fbc_missing,
  CASE
    WHEN error_count::numeric / NULLIF(count, 0) > 0.1 THEN '🔴 Alto erro (>10%)'
    WHEN error_count::numeric / NULLIF(count, 0) > 0.05 THEN '🟡 Erro moderado (>5%)'
    WHEN fbc_missing::numeric / NULLIF(count, 0) > 0.5 THEN '🟡 FBC baixo (<50%)'
    ELSE '✅ Normal'
  END as alert
FROM recent_events
WHERE count > 0;

-- ============================================================================
-- INSTRUÇÕES DE USO
-- ============================================================================
--
-- 1. DASHBOARD REAL-TIME:
--    - Execute query #1 a cada 5 minutos (auto-refresh no Supabase)
--    - Monitore success_rate e traced_events
--
-- 2. DIAGNÓSTICO EMQ:
--    - Execute query #3 para ver quais sinais estão faltando
--    - Prioridade: FBC > FBP > Email > Phone
--
-- 3. TROUBLESHOOTING:
--    - Use query #6 para investigar erros
--    - Procure por padrões (ex: todos error_code 100?)
--
-- 4. ALERTAS:
--    - Execute query #11 a cada 5-10 minutos
--    - Se error_rate > 10%, investigar imediatamente
--
-- 5. RELATÓRIO SEMANAL:
--    - Execute query #2 e #10 para relatório executivo
--    - Mostrar trend de volume e taxa de sucesso
--
-- ============================================================================
