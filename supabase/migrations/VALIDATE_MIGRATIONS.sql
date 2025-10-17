-- ============================================
-- VALIDAÇÃO COMPLETA DAS MIGRATIONS
-- Execute no SQL Editor do Supabase
-- ============================================

-- 1. Verificar que quiz_results tem as FKs corretas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'quiz_results'
AND column_name IN ('lead_id', 'client_id', 'deleted_at', 'deleted_by')
ORDER BY column_name;

-- 2. Verificar que o trigger existe
SELECT 
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'quiz_to_lead_trigger';

-- 3. Verificar views criadas
SELECT 
  table_name as view_name,
  view_definition
FROM information_schema.views
WHERE table_schema = 'public'
AND table_name IN (
  'quiz_leads_detailed',
  'quiz_conversion_funnel',
  'active_leads',
  'active_clients',
  'active_quiz_results'
)
ORDER BY table_name;

-- 4. Verificar functions criadas
SELECT 
  routine_name,
  routine_type,
  data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'auto_create_lead_from_quiz',
  'convert_quiz_lead_to_client',
  'soft_delete'
)
ORDER BY routine_name;

-- 5. Verificar indexes criados
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND indexname LIKE '%deleted_at%'
ORDER BY tablename;

-- 6. Testar view quiz_leads_detailed (últimos 3 leads do quiz)
SELECT 
  lead_id,
  email,
  full_name,
  lead_score,
  verticals,
  quiz_completed_at,
  lead_created_at
FROM quiz_leads_detailed
ORDER BY quiz_completed_at DESC
LIMIT 3;

-- 7. Testar view quiz_conversion_funnel
SELECT 
  total_quizzes,
  leads_created,
  clients_converted,
  ROUND((leads_created::numeric / NULLIF(total_quizzes, 0)) * 100, 2) as "% quiz → lead",
  ROUND((clients_converted::numeric / NULLIF(leads_created, 0)) * 100, 2) as "% lead → client"
FROM quiz_conversion_funnel;

-- 8. Testar view active_leads (top 5)
SELECT 
  id,
  email,
  full_name,
  company_name,
  created_at,
  deleted_at
FROM active_leads
ORDER BY created_at DESC
LIMIT 5;

-- 9. Contar itens ativos vs deletados
SELECT 
  'leads' as tabela,
  COUNT(*) FILTER (WHERE deleted_at IS NULL) as ativos,
  COUNT(*) FILTER (WHERE deleted_at IS NOT NULL) as deletados,
  COUNT(*) as total
FROM leads

UNION ALL

SELECT 
  'clients' as tabela,
  COUNT(*) FILTER (WHERE deleted_at IS NULL) as ativos,
  COUNT(*) FILTER (WHERE deleted_at IS NOT NULL) as deletados,
  COUNT(*) as total
FROM clients

UNION ALL

SELECT 
  'quiz_results' as tabela,
  COUNT(*) FILTER (WHERE deleted_at IS NULL) as ativos,
  COUNT(*) FILTER (WHERE deleted_at IS NOT NULL) as deletados,
  COUNT(*) as total
FROM quiz_results;

-- 10. Verificar quiz_results com lead_id preenchido
SELECT 
  COUNT(*) as total_quizzes,
  COUNT(lead_id) as quizzes_com_lead,
  COUNT(*) - COUNT(lead_id) as quizzes_sem_lead,
  ROUND((COUNT(lead_id)::numeric / COUNT(*)) * 100, 2) as "% com lead"
FROM quiz_results;

-- ============================================
-- RESULTADO ESPERADO
-- ============================================
-- Query 1: Deve mostrar 4 colunas (lead_id, client_id, deleted_at, deleted_by)
-- Query 2: Deve mostrar 1 trigger (quiz_to_lead_trigger)
-- Query 3: Deve mostrar 5 views
-- Query 4: Deve mostrar 3 functions
-- Query 5: Deve mostrar 3 indexes (leads, clients, quiz_results)
-- Query 6: Deve mostrar últimos leads criados pelo quiz
-- Query 7: Deve mostrar funil de conversão com percentuais
-- Query 8: Deve mostrar apenas leads ativos (deleted_at IS NULL)
-- Query 9: Deve mostrar contagem de ativos vs deletados por tabela
-- Query 10: Deve mostrar % de quizzes conectados a leads
