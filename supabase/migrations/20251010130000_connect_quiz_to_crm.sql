-- CORREÇÃO CRÍTICA 1: Conectar quiz_results com sistema de leads
-- Migration: 20251010_connect_quiz_to_crm.sql

-- ============================================
-- PARTE 1: Adicionar Foreign Keys Faltantes
-- ============================================

-- 1.1. Adicionar lead_id ao quiz_results
ALTER TABLE quiz_results
ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE SET NULL;

-- 1.2. Adicionar client_id ao quiz_results (caso lead converta)
ALTER TABLE quiz_results
ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id) ON DELETE SET NULL;

-- 1.3. Adicionar index para performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_lead_id ON quiz_results(lead_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_client_id ON quiz_results(client_id);

-- ============================================
-- PARTE 2: Trigger Automático Quiz → Lead
-- ============================================

CREATE OR REPLACE FUNCTION auto_create_lead_from_quiz()
RETURNS TRIGGER AS $$
DECLARE
  v_lead_id UUID;
  v_existing_lead_id UUID;
BEGIN
  -- Verificar se já existe lead com este email
  SELECT id INTO v_existing_lead_id
  FROM leads
  WHERE email = NEW.email
  AND deleted_at IS NULL
  LIMIT 1;

  -- Se já existe, apenas vincular
  IF v_existing_lead_id IS NOT NULL THEN
    NEW.lead_id := v_existing_lead_id;
    
    -- Apenas atualizar updated_at do lead
    UPDATE leads
    SET 
      updated_at = NOW()
    WHERE id = v_existing_lead_id;
    
  ELSE
    -- Criar novo lead
    INSERT INTO leads (
      email,
      full_name,
      company_name,
      phone,
      source,
      status,
      analysis_id,
      created_at
    ) VALUES (
      NEW.email,
      NEW.name,
      NEW.company,
      NEW.phone,
      'quiz',
      CASE 
        WHEN NEW.lead_score = 'qualified' THEN 'qualified'
        WHEN NEW.lead_score = 'hot' THEN 'contacted'
        WHEN NEW.lead_score = 'warm' THEN 'new'
        ELSE 'new'
      END,
      NULL,
      NEW.created_at
    )
    RETURNING id INTO v_lead_id;
    
    NEW.lead_id := v_lead_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger
DROP TRIGGER IF EXISTS quiz_to_lead_trigger ON quiz_results;
CREATE TRIGGER quiz_to_lead_trigger
  BEFORE INSERT ON quiz_results
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_lead_from_quiz();

-- ============================================
-- PARTE 3: Migrar Dados Históricos
-- ============================================

-- Criar leads para quiz_results antigos que não têm lead_id
DO $$
DECLARE
  quiz_record RECORD;
  v_lead_id UUID;
  v_existing_lead_id UUID;
BEGIN
  FOR quiz_record IN 
    SELECT * FROM quiz_results 
    WHERE lead_id IS NULL 
    AND email IS NOT NULL
  LOOP
    -- Verificar se já existe lead
    SELECT id INTO v_existing_lead_id
    FROM leads
    WHERE email = quiz_record.email
    AND deleted_at IS NULL
    LIMIT 1;

    IF v_existing_lead_id IS NOT NULL THEN
      -- Apenas vincular
      UPDATE quiz_results
      SET lead_id = v_existing_lead_id
      WHERE id = quiz_record.id;
    ELSE
      -- Criar novo lead
      INSERT INTO leads (
        email,
        full_name,
        company_name,
        phone,
        source,
        status,
        analysis_id,
        created_at
      ) VALUES (
        quiz_record.email,
        quiz_record.name,
        quiz_record.company,
        quiz_record.phone,
        'quiz',
        CASE 
          WHEN quiz_record.lead_score = 'qualified' THEN 'qualified'
          WHEN quiz_record.lead_score = 'hot' THEN 'contacted'
          ELSE 'new'
        END,
        NULL,
        quiz_record.created_at
      )
      RETURNING id INTO v_lead_id;

      -- Vincular quiz ao lead
      UPDATE quiz_results
      SET lead_id = v_lead_id
      WHERE id = quiz_record.id;
    END IF;
  END LOOP;
END $$;

-- ============================================
-- PARTE 4: Views Úteis
-- ============================================

-- View: Leads do Quiz com detalhes completos
CREATE OR REPLACE VIEW quiz_leads_detailed AS
SELECT 
  l.id as lead_id,
  l.email,
  l.full_name as name,
  l.company_name as company,
  l.phone,
  l.status as lead_status,
  l.source,
  l.assigned_to,
  l.created_at as lead_created_at,
  qr.id as quiz_id,
  qr.score as quiz_score,
  qr.lead_score as quiz_qualification,
  qr.verticals as identified_verticals,
  qr.urgency_level,
  qr.created_at as quiz_completed_at,
  qr.responses as quiz_answers,
  qr.profile_data,
  qr.recommendations
FROM leads l
INNER JOIN quiz_results qr ON qr.lead_id = l.id
ORDER BY qr.created_at DESC;

-- View: Dashboard de conversão Quiz → Lead → Client
CREATE OR REPLACE VIEW quiz_conversion_funnel AS
SELECT 
  DATE_TRUNC('day', qr.created_at) as date,
  COUNT(*) as total_quizzes,
  COUNT(DISTINCT qr.lead_id) as leads_created,
  COUNT(DISTINCT qr.client_id) as clients_converted,
  COUNT(*) FILTER (WHERE qr.lead_score = 'qualified') as qualified_count,
  COUNT(*) FILTER (WHERE qr.lead_score = 'hot') as hot_count,
  COUNT(*) FILTER (WHERE qr.lead_score = 'warm') as warm_count,
  COUNT(*) FILTER (WHERE qr.lead_score = 'cold') as cold_count,
  ROUND(AVG(qr.score), 1) as avg_quiz_score,
  ROUND(
    COUNT(DISTINCT qr.client_id)::numeric / 
    NULLIF(COUNT(DISTINCT qr.lead_id), 0)::numeric * 100, 
    1
  ) as lead_to_client_conversion_rate
FROM quiz_results qr
WHERE qr.created_at >= NOW() - INTERVAL '90 days'
GROUP BY DATE_TRUNC('day', qr.created_at)
ORDER BY date DESC;

-- ============================================
-- PARTE 5: Function Útil - Converter Lead → Client
-- ============================================

CREATE OR REPLACE FUNCTION convert_quiz_lead_to_client(
  p_quiz_id UUID,
  p_converted_by UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_quiz RECORD;
  v_client_id UUID;
BEGIN
  -- Buscar quiz
  SELECT * INTO v_quiz
  FROM quiz_results
  WHERE id = p_quiz_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quiz não encontrado: %', p_quiz_id;
  END IF;

  -- Verificar se já existe client
  IF v_quiz.client_id IS NOT NULL THEN
    RETURN v_quiz.client_id;
  END IF;

  -- Criar client
  INSERT INTO clients (
    user_id,
    email,
    name,
    company,
    phone,
    status,
    tier,
    created_at
  ) VALUES (
    p_converted_by,
    v_quiz.email,
    v_quiz.name,
    v_quiz.company,
    v_quiz.phone,
    'active',
    'free',
    NOW()
  )
  RETURNING id INTO v_client_id;

  -- Atualizar quiz_results
  UPDATE quiz_results
  SET client_id = v_client_id
  WHERE id = p_quiz_id;

  -- Atualizar lead para status 'won'
  IF v_quiz.lead_id IS NOT NULL THEN
    UPDATE leads
    SET 
      status = 'won',
      updated_at = NOW()
    WHERE id = v_quiz.lead_id;
  END IF;

  RETURN v_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PARTE 6: Comentários e Documentação
-- ============================================

COMMENT ON COLUMN quiz_results.lead_id IS 'FK para leads - criado automaticamente via trigger ao completar quiz';
COMMENT ON COLUMN quiz_results.client_id IS 'FK para clients - preenchido quando lead converte em cliente';
COMMENT ON FUNCTION auto_create_lead_from_quiz() IS 'Trigger que cria lead automaticamente ao salvar quiz_results. Se email já existe, apenas vincula e atualiza score.';
COMMENT ON FUNCTION convert_quiz_lead_to_client(UUID, UUID) IS 'Converte lead do quiz em client. Uso: SELECT convert_quiz_lead_to_client(''quiz-uuid'', ''user-uuid'');';
COMMENT ON VIEW quiz_leads_detailed IS 'View completa: leads + quiz_results com todas as informações relevantes';
COMMENT ON VIEW quiz_conversion_funnel IS 'Funil de conversão Quiz → Lead → Client por dia (últimos 90 dias)';

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- 1. Verificar se trigger está ativo
SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'quiz_to_lead_trigger';

-- 2. Verificar quiz_results sem lead_id (devem ser 0 após migração)
SELECT COUNT(*) as quiz_sem_lead
FROM quiz_results
WHERE lead_id IS NULL AND email IS NOT NULL;

-- 3. Verificar leads criados do quiz
SELECT COUNT(*) as leads_from_quiz
FROM leads
WHERE source LIKE '%quiz%';

-- 4. Testar conversão funnel
SELECT * FROM quiz_conversion_funnel LIMIT 7;

-- ============================================
-- ROLLBACK (se necessário)
-- ============================================

-- Para reverter esta migration:
/*
DROP TRIGGER IF EXISTS quiz_to_lead_trigger ON quiz_results;
DROP FUNCTION IF EXISTS auto_create_lead_from_quiz();
DROP FUNCTION IF EXISTS convert_quiz_lead_to_client(UUID, UUID);
DROP VIEW IF EXISTS quiz_leads_detailed;
DROP VIEW IF EXISTS quiz_conversion_funnel;
DROP INDEX IF EXISTS idx_quiz_results_lead_id;
DROP INDEX IF EXISTS idx_quiz_results_client_id;
ALTER TABLE quiz_results DROP COLUMN IF EXISTS lead_id;
ALTER TABLE quiz_results DROP COLUMN IF EXISTS client_id;
*/
