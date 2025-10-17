-- CORREÇÃO CRÍTICA 2: Adicionar Soft Deletes em tabelas principais
-- Migration: 20251010130001_add_soft_deletes.sql

-- ============================================
-- PARTE 1: Adicionar deleted_at em todas as tabelas principais
-- ============================================

-- Leads
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Clients
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Quiz Results
ALTER TABLE quiz_results 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Projects
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Campaigns
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Consultoria Bookings
ALTER TABLE consultoria_bookings 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Analysis Requests
ALTER TABLE analysis_requests 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- Domain Analysis Requests (pode não existir, ignorar erro)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'domain_analysis_requests') THEN
    ALTER TABLE domain_analysis_requests 
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;
  END IF;
END $$;

-- Support Tickets
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID REFERENCES auth.users(id) DEFAULT NULL;

-- ============================================
-- PARTE 2: Indexes para Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_leads_deleted_at ON leads(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clients_deleted_at ON clients(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_quiz_results_deleted_at ON quiz_results(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_projects_deleted_at ON projects(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_campaigns_deleted_at ON campaigns(deleted_at) WHERE deleted_at IS NULL;

-- ============================================
-- PARTE 3: Views de "Ativos" (excluindo deletados)
-- ============================================

-- Active Leads
CREATE OR REPLACE VIEW active_leads AS
SELECT * FROM leads WHERE deleted_at IS NULL;

-- Active Clients
CREATE OR REPLACE VIEW active_clients AS
SELECT * FROM clients WHERE deleted_at IS NULL;

-- Active Quiz Results
CREATE OR REPLACE VIEW active_quiz_results AS
SELECT * FROM quiz_results WHERE deleted_at IS NULL;

-- Active Projects
CREATE OR REPLACE VIEW active_projects AS
SELECT * FROM projects WHERE deleted_at IS NULL;

-- Active Campaigns
CREATE OR REPLACE VIEW active_campaigns AS
SELECT * FROM campaigns WHERE deleted_at IS NULL;

-- ============================================
-- PARTE 4: Function para Soft Delete
-- ============================================

CREATE OR REPLACE FUNCTION soft_delete(
  p_table_name TEXT,
  p_record_id UUID,
  p_deleted_by UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  EXECUTE format(
    'UPDATE %I SET deleted_at = NOW(), deleted_by = $1 WHERE id = $2 AND deleted_at IS NULL',
    p_table_name
  ) USING p_deleted_by, p_record_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PARTE 5: Function para Restore (Undelete)
-- ============================================

CREATE OR REPLACE FUNCTION restore_deleted(
  p_table_name TEXT,
  p_record_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  EXECUTE format(
    'UPDATE %I SET deleted_at = NULL, deleted_by = NULL WHERE id = $1 AND deleted_at IS NOT NULL',
    p_table_name
  ) USING p_record_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PARTE 6: Atualizar RLS Policies para respeitar deleted_at
-- ============================================

-- Leads: Users veem apenas não deletados
DROP POLICY IF EXISTS "Users can view own leads" ON leads;
CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT
  USING (
    auth.uid() = user_id 
    AND deleted_at IS NULL
  );

-- Leads: Admins veem tudo (incluindo deletados)
DROP POLICY IF EXISTS "Admins can view all leads" ON leads;
CREATE POLICY "Admins can view all leads" ON leads
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.user_type = 'admin'
    )
  );

-- Clients: Users veem apenas não deletados
DROP POLICY IF EXISTS "Users can view own clients" ON clients;
CREATE POLICY "Users can view own clients" ON clients
  FOR SELECT
  USING (
    auth.uid() = user_id 
    AND deleted_at IS NULL
  );

-- Quiz Results: Respeitar deleted_at
DROP POLICY IF EXISTS "Users can view own quiz results" ON quiz_results;
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT
  USING (
    (auth.uid() = user_id OR auth.uid() IN (
      SELECT id FROM auth.users WHERE email = quiz_results.email
    ))
    AND deleted_at IS NULL
  );

-- ============================================
-- PARTE 7: View de Itens Deletados (para Admins)
-- ============================================

CREATE OR REPLACE VIEW deleted_items_audit AS
SELECT 
  'leads' as table_name,
  id,
  deleted_at,
  deleted_by,
  (SELECT email FROM auth.users WHERE id = deleted_by) as deleted_by_email,
  jsonb_build_object(
    'email', email,
    'full_name', full_name,
    'company_name', company_name
  ) as item_data
FROM leads
WHERE deleted_at IS NOT NULL

UNION ALL

SELECT 
  'clients' as table_name,
  id,
  deleted_at,
  deleted_by,
  (SELECT email FROM auth.users WHERE id = deleted_by) as deleted_by_email,
  jsonb_build_object(
    'email', email,
    'name', name,
    'company', company
  ) as item_data
FROM clients
WHERE deleted_at IS NOT NULL

UNION ALL

SELECT 
  'quiz_results' as table_name,
  id,
  deleted_at,
  deleted_by,
  (SELECT email FROM auth.users WHERE id = deleted_by) as deleted_by_email,
  jsonb_build_object(
    'email', email,
    'name', name,
    'score', score
  ) as item_data
FROM quiz_results
WHERE deleted_at IS NOT NULL

UNION ALL

SELECT 
  'projects' as table_name,
  id,
  deleted_at,
  deleted_by,
  (SELECT email FROM auth.users WHERE id = deleted_by) as deleted_by_email,
  jsonb_build_object(
    'name', name,
    'status', status
  ) as item_data
FROM projects
WHERE deleted_at IS NOT NULL

ORDER BY deleted_at DESC;

-- ============================================
-- PARTE 8: Function para Cleanup Permanente (Hard Delete)
-- ============================================

CREATE OR REPLACE FUNCTION permanent_delete_old_items(
  p_days_threshold INTEGER DEFAULT 90
)
RETURNS TABLE(
  table_name TEXT,
  deleted_count BIGINT
) AS $$
DECLARE
  v_cutoff_date TIMESTAMPTZ;
BEGIN
  v_cutoff_date := NOW() - (p_days_threshold || ' days')::INTERVAL;
  
  -- Leads
  DELETE FROM leads 
  WHERE deleted_at IS NOT NULL 
  AND deleted_at < v_cutoff_date;
  table_name := 'leads';
  deleted_count := (SELECT COUNT(*) FROM leads WHERE deleted_at < v_cutoff_date);
  RETURN NEXT;
  
  -- Clients
  DELETE FROM clients 
  WHERE deleted_at IS NOT NULL 
  AND deleted_at < v_cutoff_date;
  table_name := 'clients';
  deleted_count := (SELECT COUNT(*) FROM clients WHERE deleted_at < v_cutoff_date);
  RETURN NEXT;
  
  -- Quiz Results
  DELETE FROM quiz_results 
  WHERE deleted_at IS NOT NULL 
  AND deleted_at < v_cutoff_date;
  table_name := 'quiz_results';
  deleted_count := (SELECT COUNT(*) FROM quiz_results WHERE deleted_at < v_cutoff_date);
  RETURN NEXT;
  
  -- Projects
  DELETE FROM projects 
  WHERE deleted_at IS NOT NULL 
  AND deleted_at < v_cutoff_date;
  table_name := 'projects';
  deleted_count := (SELECT COUNT(*) FROM projects WHERE deleted_at < v_cutoff_date);
  RETURN NEXT;
  
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PARTE 9: Comentários e Documentação
-- ============================================

COMMENT ON COLUMN leads.deleted_at IS 'Soft delete: timestamp quando foi deletado (NULL = ativo)';
COMMENT ON COLUMN leads.deleted_by IS 'UUID do usuário que deletou o registro';
COMMENT ON FUNCTION soft_delete(TEXT, UUID, UUID) IS 'Soft delete genérico. Uso: SELECT soft_delete(''leads'', ''uuid'', auth.uid());';
COMMENT ON FUNCTION restore_deleted(TEXT, UUID) IS 'Restaura item deletado. Uso: SELECT restore_deleted(''leads'', ''uuid'');';
COMMENT ON FUNCTION permanent_delete_old_items(INTEGER) IS 'Hard delete de itens deletados há mais de X dias. Uso: SELECT * FROM permanent_delete_old_items(90);';
COMMENT ON VIEW deleted_items_audit IS 'Auditoria de todos os itens deletados (soft delete) para admins';

-- ============================================
-- PARTE 10: Exemplos de Uso
-- ============================================

-- Exemplo 1: Soft delete de um lead
-- SELECT soft_delete('leads', 'lead-uuid-aqui', auth.uid());

-- Exemplo 2: Restaurar lead deletado
-- SELECT restore_deleted('leads', 'lead-uuid-aqui');

-- Exemplo 3: Ver todos os itens deletados
-- SELECT * FROM deleted_items_audit;

-- Exemplo 4: Cleanup permanente de itens deletados há mais de 90 dias
-- SELECT * FROM permanent_delete_old_items(90);

-- Exemplo 5: Contar itens ativos vs deletados
-- SELECT 
--   (SELECT COUNT(*) FROM leads WHERE deleted_at IS NULL) as active_leads,
--   (SELECT COUNT(*) FROM leads WHERE deleted_at IS NOT NULL) as deleted_leads;

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- 1. Verificar colunas adicionadas
SELECT 
  table_name,
  column_name
FROM information_schema.columns
WHERE column_name IN ('deleted_at', 'deleted_by')
AND table_schema = 'public'
ORDER BY table_name;

-- 2. Verificar views criadas
SELECT viewname 
FROM pg_views 
WHERE schemaname = 'public' 
AND viewname LIKE '%active%' OR viewname LIKE '%deleted%';

-- 3. Verificar indexes criados
SELECT indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND indexname LIKE '%deleted%';

-- ============================================
-- ROLLBACK (se necessário)
-- ============================================

-- Para reverter esta migration:
/*
DROP VIEW IF EXISTS active_leads;
DROP VIEW IF EXISTS active_clients;
DROP VIEW IF EXISTS active_quiz_results;
DROP VIEW IF EXISTS active_projects;
DROP VIEW IF EXISTS active_campaigns;
DROP VIEW IF EXISTS deleted_items_audit;

DROP FUNCTION IF EXISTS soft_delete(TEXT, UUID, UUID);
DROP FUNCTION IF EXISTS restore_deleted(TEXT, UUID);
DROP FUNCTION IF EXISTS permanent_delete_old_items(INTEGER);

ALTER TABLE leads DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE clients DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE quiz_results DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE projects DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE campaigns DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE consultoria_bookings DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE analysis_requests DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE domain_analysis_requests DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
ALTER TABLE support_tickets DROP COLUMN IF EXISTS deleted_at, DROP COLUMN IF EXISTS deleted_by;
*/
