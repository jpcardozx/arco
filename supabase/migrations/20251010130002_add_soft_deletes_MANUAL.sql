-- APLICAR MANUALMENTE NO SQL EDITOR DO SUPABASE DASHBOARD
-- https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/sql

-- ============================================
-- PARTE 1: Adicionar colunas deleted_at e deleted_by
-- ============================================

-- Leads
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL;

-- Clients
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL;

-- Quiz Results
ALTER TABLE quiz_results 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL;

-- Projects
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL;

-- Campaigns
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL;

-- ============================================
-- PARTE 2: Indexes para Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_leads_deleted_at ON leads(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clients_deleted_at ON clients(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_quiz_results_deleted_at ON quiz_results(deleted_at) WHERE deleted_at IS NULL;

-- ============================================
-- PARTE 3: Views de Ativos
-- ============================================

CREATE OR REPLACE VIEW active_leads AS
SELECT * FROM leads WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW active_clients AS
SELECT * FROM clients WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW active_quiz_results AS
SELECT * FROM quiz_results WHERE deleted_at IS NULL;

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
-- VERIFICAÇÃO
-- ============================================

SELECT 
  table_name,
  column_name
FROM information_schema.columns
WHERE column_name IN ('deleted_at', 'deleted_by')
AND table_schema = 'public'
ORDER BY table_name;
