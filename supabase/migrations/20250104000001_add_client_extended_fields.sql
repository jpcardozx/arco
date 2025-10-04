-- Migration: Adicionar campos estendidos à tabela clients
-- Data: 2025-01-04
-- Descrição: Campos usados pelo frontend para funcionalidades de CRM

-- Adicionar campos de relacionamento e tracking
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS last_contact TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMPTZ;

-- Adicionar campos de contexto imobiliário/negócio
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS property_type TEXT,
  ADD COLUMN IF NOT EXISTS transaction_type TEXT,
  ADD COLUMN IF NOT EXISTS budget_min NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS budget_max NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS department TEXT;

-- Criar índices para performance em queries comuns
CREATE INDEX IF NOT EXISTS idx_clients_assigned_to ON public.clients(assigned_to);
CREATE INDEX IF NOT EXISTS idx_clients_next_follow_up ON public.clients(next_follow_up) WHERE next_follow_up IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_clients_last_contact ON public.clients(last_contact) WHERE last_contact IS NOT NULL;

-- Comentários para documentação
COMMENT ON COLUMN public.clients.assigned_to IS 'Usuário responsável pelo cliente';
COMMENT ON COLUMN public.clients.last_contact IS 'Data do último contato com o cliente';
COMMENT ON COLUMN public.clients.next_follow_up IS 'Data agendada para próximo follow-up';
COMMENT ON COLUMN public.clients.property_type IS 'Tipo de imóvel de interesse (residencial, comercial, etc)';
COMMENT ON COLUMN public.clients.transaction_type IS 'Tipo de transação (compra, venda, locação)';
COMMENT ON COLUMN public.clients.budget_min IS 'Orçamento mínimo do cliente';
COMMENT ON COLUMN public.clients.budget_max IS 'Orçamento máximo do cliente';
COMMENT ON COLUMN public.clients.department IS 'Departamento/área de interesse';
