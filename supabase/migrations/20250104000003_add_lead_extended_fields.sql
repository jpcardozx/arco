-- Migration: Adicionar campos estendidos à tabela leads
-- Data: 2025-01-04
-- Descrição: Campos usados pelo frontend para qualificação e tracking de leads

-- Adicionar campos de qualificação e contexto
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  ADD COLUMN IF NOT EXISTS interest_type TEXT DEFAULT 'buy' CHECK (interest_type IN ('buy', 'sell', 'rent', 'invest', 'consult')),
  ADD COLUMN IF NOT EXISTS budget_min NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS budget_max NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS preferred_location TEXT,
  ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0 CHECK (lead_score BETWEEN 0 AND 100),
  ADD COLUMN IF NOT EXISTS last_contact TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMPTZ;

-- Criar índices para queries frequentes
CREATE INDEX IF NOT EXISTS idx_leads_priority ON public.leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_interest_type ON public.leads(interest_type);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON public.leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON public.leads(next_follow_up) WHERE next_follow_up IS NOT NULL;

-- Comentários para documentação
COMMENT ON COLUMN public.leads.notes IS 'Notas e observações sobre o lead';
COMMENT ON COLUMN public.leads.priority IS 'Prioridade de follow-up';
COMMENT ON COLUMN public.leads.interest_type IS 'Tipo de interesse: compra, venda, locação, investimento, consultoria';
COMMENT ON COLUMN public.leads.budget_min IS 'Orçamento mínimo declarado';
COMMENT ON COLUMN public.leads.budget_max IS 'Orçamento máximo declarado';
COMMENT ON COLUMN public.leads.preferred_location IS 'Localização preferida/região de interesse';
COMMENT ON COLUMN public.leads.lead_score IS 'Score de qualificação (0-100) calculado automaticamente';
COMMENT ON COLUMN public.leads.last_contact IS 'Data do último contato realizado';
COMMENT ON COLUMN public.leads.next_follow_up IS 'Próximo follow-up agendado';
