/**
 * Free Audits Table
 *
 * Armazena resultados de auditorias gratuitas
 * Permite análise de padrões, insights sobre mercado
 * e sequência de follow-up automático
 */

CREATE TABLE IF NOT EXISTS free_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Lead info
  website_url TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,

  -- Financial impact (o número que importa)
  monthly_revenue_loss INTEGER DEFAULT 0,
  yearly_revenue_loss INTEGER DEFAULT 0,
  potential_monthly_gain INTEGER DEFAULT 0,

  -- Lead qualification
  urgency_score INTEGER DEFAULT 0,
  urgency_classification TEXT DEFAULT 'cold' CHECK (urgency_classification IN ('hot', 'warm', 'cold')),

  -- Performance metrics (técnico)
  metrics JSONB DEFAULT '{}'::JSONB,

  -- Full breakdown (análise detalhada)
  breakdown JSONB DEFAULT '{}'::JSONB,

  -- Follow-up status
  follow_up_stage TEXT DEFAULT 'awaiting_response' CHECK (follow_up_stage IN (
    'awaiting_response',
    'engaged',
    'scheduled_call',
    'proposal_sent',
    'client',
    'rejected'
  )),

  first_follow_up_at TIMESTAMP WITH TIME ZONE,
  follow_up_count INTEGER DEFAULT 0,

  -- Conversion tracking
  converted_to_client BOOLEAN DEFAULT FALSE,
  client_id UUID REFERENCES auth.users(id),
  conversion_date TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_free_audits_email ON free_audits(email);
CREATE INDEX IF NOT EXISTS idx_free_audits_urgency ON free_audits(urgency_classification);
CREATE INDEX IF NOT EXISTS idx_free_audits_created ON free_audits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_free_audits_revenue_loss ON free_audits(monthly_revenue_loss DESC);
CREATE INDEX IF NOT EXISTS idx_free_audits_follow_up_stage ON free_audits(follow_up_stage);

-- View para leads de alta prioridade
CREATE OR REPLACE VIEW v_hot_audit_leads AS
SELECT
  id,
  name,
  email,
  website_url,
  monthly_revenue_loss,
  urgency_score,
  created_at
FROM free_audits
WHERE urgency_classification = 'hot'
  AND converted_to_client = FALSE
  AND follow_up_stage != 'rejected'
ORDER BY urgency_score DESC, created_at DESC;

-- View para dashboard
CREATE OR REPLACE VIEW v_audits_dashboard AS
SELECT
  DATE_TRUNC('day', created_at)::DATE as audit_date,
  COUNT(*) as total_audits,
  SUM(monthly_revenue_loss) as total_monthly_loss,
  AVG(urgency_score) as avg_urgency,
  COUNT(*) FILTER (WHERE urgency_classification = 'hot') as hot_leads,
  COUNT(*) FILTER (WHERE urgency_classification = 'warm') as warm_leads,
  COUNT(*) FILTER (WHERE converted_to_client = TRUE) as conversions
FROM free_audits
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY audit_date DESC;

-- Função para atualizar follow-up
CREATE OR REPLACE FUNCTION update_audit_follow_up(
  audit_id UUID,
  new_stage TEXT
)
RETURNS void AS $$
BEGIN
  UPDATE free_audits
  SET
    follow_up_stage = new_stage,
    follow_up_count = follow_up_count + 1,
    first_follow_up_at = COALESCE(first_follow_up_at, NOW()),
    updated_at = NOW()
  WHERE id = audit_id;
END;
$$ LANGUAGE plpgsql;

GRANT EXECUTE ON FUNCTION update_audit_follow_up TO authenticated, anon;
