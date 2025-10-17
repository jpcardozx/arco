-- =====================================================
-- VERIFICAÇÃO: Tabelas e Functions de Pagamento
-- =====================================================

-- 1. Verificar tabelas criadas
SELECT 
  'TABELAS' as tipo,
  tablename as nome,
  '✅' as status
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'subscription_plans', 
    'subscriptions', 
    'payment_transactions', 
    'webhook_events', 
    'payment_methods'
  )
ORDER BY tablename;

-- 2. Verificar functions criadas
SELECT 
  'FUNCTIONS' as tipo,
  proname as nome,
  '✅' as status
FROM pg_proc 
WHERE proname IN (
  'upsert_subscription',
  'activate_subscription',
  'cancel_subscription',
  'process_webhook_event',
  'get_user_active_subscription',
  'get_user_payment_history',
  'calculate_revenue_metrics',
  'calculate_mrr'
)
ORDER BY proname;

-- 3. Verificar planos seed
SELECT 
  'SEED DATA' as tipo,
  slug as nome,
  CASE WHEN is_active THEN '✅' ELSE '❌' END as status
FROM subscription_plans
ORDER BY price_monthly;

-- 4. Contar índices
SELECT 
  'ÍNDICES' as tipo,
  COUNT(*)::text as nome,
  '✅' as status
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%subscription%'
     OR indexname LIKE 'idx_%payment%'
     OR indexname LIKE 'idx_%webhook%';

-- 5. Verificar RLS ativado
SELECT 
  'RLS ATIVADO' as tipo,
  tablename as nome,
  CASE WHEN rowsecurity THEN '✅' ELSE '❌' END as status
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public'
  AND tablename IN (
    'subscription_plans',
    'subscriptions', 
    'payment_transactions',
    'webhook_events',
    'payment_methods'
  )
ORDER BY tablename;
