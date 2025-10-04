-- Migration: Adicionar campos estendidos à tabela tasks
-- Data: 2025-01-04
-- Descrição: Campos usados pelo frontend para funcionalidades avançadas de tasks

-- Adicionar campos extras para tasks
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS property_id UUID,
  ADD COLUMN IF NOT EXISTS task_type TEXT DEFAULT 'task',
  ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'team', 'public')),
  ADD COLUMN IF NOT EXISTS reminders JSONB DEFAULT '[]'::jsonb;

-- Criar índice para property_id (se for referência a outra tabela)
CREATE INDEX IF NOT EXISTS idx_tasks_property_id ON public.tasks(property_id) WHERE property_id IS NOT NULL;

-- Criar índice para task_type (filtros comuns)
CREATE INDEX IF NOT EXISTS idx_tasks_task_type ON public.tasks(task_type);

-- Comentários para documentação
COMMENT ON COLUMN public.tasks.property_id IS 'ID de propriedade/imóvel relacionado (se aplicável)';
COMMENT ON COLUMN public.tasks.task_type IS 'Tipo de task: task, event, reminder, meeting';
COMMENT ON COLUMN public.tasks.visibility IS 'Visibilidade: private (só criador), team (equipe), public (todos)';
COMMENT ON COLUMN public.tasks.reminders IS 'Array de lembretes em JSON: [{"time": "15min", "sent": false}]';
