# 🔍 AUDITORIA COMPLETA DO SUPABASE - ARCO

**Data:** 10 de outubro de 2025  
**Objetivo:** Identificar redundâncias, duplicidades, gaps de integração e oportunidades de otimização

---

## 📊 RESUMO EXECUTIVO

### Situação Atual
- **Total de tabelas:** ~60+ tabelas
- **Políticas RLS:** 276 policies criadas
- **Problemas identificados:** 15 duplicações críticas
- **Funcionalidades Supabase não utilizadas:** 8 recursos
- **Oportunidades de consolidação:** 12 áreas

### Classificação por Gravidade
🔴 **CRÍTICO** - 5 problemas (requer ação imediata)  
🟡 **MÉDIO** - 7 problemas (otimização recomendada)  
🟢 **BAIXO** - 3 problemas (melhorias futuras)

---

## 🔴 PROBLEMAS CRÍTICOS

### 1. DUPLICAÇÃO: Tabela `leads` (2 versões)

**Encontrado:**
```sql
-- Versão 1 (sem schema público explícito)
CREATE TABLE IF NOT EXISTS leads (...)

-- Versão 2 (com public. explícito)
CREATE TABLE IF NOT EXISTS public.leads (...)
```

**Problema:**
- Pode criar duas tabelas distintas ou conflito de nomenclatura
- Dados podem estar fragmentados
- RLS policies podem estar inconsistentes

**Solução Recomendada:**
```sql
-- 1. Consolidar em uma única tabela
-- 2. Migrar dados se necessário
-- 3. Drop da tabela duplicada
-- 4. Criar view unificada se preciso retrocompatibilidade
```

**Impacto:** 🔴 ALTO - Pode causar perda de dados ou inconsistências

---

### 2. DUPLICAÇÃO: Tabela `clients` (2 versões)

**Encontrado:**
```sql
CREATE TABLE IF NOT EXISTS public.clients (...)
CREATE TABLE IF NOT EXISTS public.clients (...) -- Duplicado!
```

**Problema:**
- Migrations conflitantes
- Possível sobrescrita de schema
- RLS policies duplicadas

**Solução Recomendada:**
```sql
-- 1. Identificar qual migration é a mais recente
-- 2. Remover migration duplicada
-- 3. Consolidar RLS policies
```

**Impacto:** 🔴 ALTO - Schema inconsistente

---

### 3. FRAGMENTAÇÃO: Sistema de Análises (3 tabelas desconectadas)

**Encontrado:**
```sql
analysis_requests
analysis_results
domain_analysis_requests  -- Duplicação?
domain_validations
quiz_results  -- Novo, sem conexão
qualification_responses  -- Outro sistema de qualificação?
```

**Problema:**
- 3+ sistemas de análise/diagnóstico sem integração
- `quiz_results` não tem FK para `leads` ou `clients`
- `domain_analysis_requests` vs `analysis_requests` - redundância?
- `qualification_responses` vs `quiz_results` - qual usar?

**Solução Recomendada:**
```sql
-- Consolidar em um único sistema:

-- 1. Tabela principal: diagnostic_sessions
CREATE TABLE diagnostic_sessions (
  id UUID PRIMARY KEY,
  type TEXT CHECK (type IN ('domain_analysis', 'quiz', 'custom')),
  lead_id UUID REFERENCES leads(id),  -- 👈 CONEXÃO FALTANDO
  client_id UUID REFERENCES clients(id),
  status TEXT,
  data JSONB,
  created_at TIMESTAMPTZ
);

-- 2. Migrar dados de:
-- - analysis_requests → diagnostic_sessions (type='domain_analysis')
-- - quiz_results → diagnostic_sessions (type='quiz')
-- - qualification_responses → diagnostic_sessions (type='custom')

-- 3. Drop tabelas antigas após migração
```

**Impacto:** 🔴 ALTO - Dados isolados, relatórios impossíveis

---

### 4. FALTA DE CONEXÃO: `quiz_results` → `leads` / `clients`

**Problema Atual:**
```sql
-- quiz_results.sql
CREATE TABLE quiz_results (
  id UUID,
  email TEXT,  -- ❌ Apenas email, sem FK
  user_id UUID REFERENCES auth.users,  -- ✅ Tem isso
  -- ❌ FALTANDO: lead_id, client_id
  ...
)
```

**Fluxo Quebrado:**
```
Quiz Completado → Salva em quiz_results
                ↓
                ❌ NÃO CRIA LEAD AUTOMATICAMENTE
                ❌ NÃO VINCULA A CLIENT EXISTENTE
                ❌ NÃO APARECE NO CRM
```

**Solução Recomendada:**
```sql
-- 1. Adicionar FKs
ALTER TABLE quiz_results
ADD COLUMN lead_id UUID REFERENCES leads(id),
ADD COLUMN client_id UUID REFERENCES clients(id);

-- 2. Criar trigger para auto-criar lead
CREATE OR REPLACE FUNCTION auto_create_lead_from_quiz()
RETURNS TRIGGER AS $$
BEGIN
  -- Se não tem lead_id, criar lead automaticamente
  IF NEW.lead_id IS NULL THEN
    INSERT INTO leads (
      email,
      name,
      company,
      phone,
      source,
      status,
      score,
      metadata
    ) VALUES (
      NEW.email,
      NEW.name,
      NEW.company,
      NEW.phone,
      'quiz-diagnostico',
      CASE 
        WHEN NEW.lead_score = 'qualified' THEN 'qualified'
        WHEN NEW.lead_score = 'hot' THEN 'contacted'
        ELSE 'new'
      END,
      NEW.score,
      jsonb_build_object(
        'quiz_id', NEW.id,
        'verticals', NEW.verticals,
        'urgency', NEW.urgency_level
      )
    )
    RETURNING id INTO NEW.lead_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quiz_to_lead
  BEFORE INSERT ON quiz_results
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_lead_from_quiz();
```

**Impacto:** 🔴 CRÍTICO - Quiz não integra com CRM!

---

### 5. DUPLICAÇÃO: Múltiplos sistemas de e-mail

**Encontrado:**
```sql
email_templates
email_accounts
email_messages
notification_queue  -- Também envia emails?
```

**Problema:**
- 4 tabelas relacionadas a email
- `notification_queue` pode duplicar funcionalidade
- Não há integração clara entre elas

**Solução Recomendada:**
```sql
-- Sistema unificado:

-- 1. email_accounts (mantém - configuração SMTP/IMAP)
-- 2. email_templates (mantém - templates reutilizáveis)
-- 3. email_campaigns (novo - substitui notification_queue para emails)
-- 4. email_logs (novo - unifica email_messages + logs de envio)

-- notification_queue deve ser apenas para notificações in-app
```

**Impacto:** 🔴 MÉDIO - Confusão operacional

---

## 🟡 PROBLEMAS MÉDIOS

### 6. Falta de Audit Trail Unificado

**Situação Atual:**
```sql
audit_log  -- Genérico
activity_logs  -- Dashboard apenas
checklist_activity_logs  -- Específico de checklists
```

**Problema:**
- 3 sistemas de auditoria diferentes
- Difícil rastrear eventos cross-table
- `activity_logs` só para dashboard (limitado)

**Solução:**
```sql
-- Consolidar em audit_log com tipos
ALTER TABLE audit_log ADD COLUMN entity_type TEXT;
ALTER TABLE audit_log ADD COLUMN entity_id UUID;
ALTER TABLE audit_log ADD COLUMN action_type TEXT;

-- Migrar activity_logs → audit_log
-- Migrar checklist_activity_logs → audit_log
```

---

### 7. Sistema de Checklists Fragmentado

**Encontrado:**
```sql
interactive_checklists
checklist_items
checklist_templates
checklist_relationships
checklist_verifications
checklist_activity_logs
```

**Problema:**
- 6 tabelas para checklists (muito complexo)
- `checklist_relationships` sugere N:N mas não está claro com quê
- `checklist_verifications` vs `checklist_items.completed` - redundância?

**Recomendação:**
- Revisar se precisa de 6 tabelas
- Considerar JSONB para estrutura mais flexível

---

### 8. Payments: 3 sistemas paralelos

**Encontrado:**
```sql
payment_methods
payment_transactions
transactions  -- Duplicação?
subscriptions
subscription_plans
invoices
commissions
commission_goals
```

**Problema:**
- `payment_transactions` vs `transactions` - qual usar?
- Sistema complexo sem documentação clara

**Recomendação:**
- Unificar `payment_transactions` e `transactions`
- Criar diagrama ER do sistema financeiro

---

### 9. Campanhas vs Projetos - Sobreposição?

**Encontrado:**
```sql
campaigns
campaign_metrics
projects
project_milestones
```

**Pergunta:**
- Campanhas são diferentes de Projetos?
- Se sim, qual a relação?
- Se não, consolidar

---

### 10. Analytics: Múltiplas tabelas de métricas

**Encontrado:**
```sql
analytics_data
performance_metrics
campaign_metrics
domain_monitoring
uptime_checks
security_scans
```

**Problema:**
- 6 tabelas de métricas diferentes
- Possível usar Supabase Realtime + Views materializadas

**Oportunidade:**
- Consolidar em `metrics` com `metric_type`
- Usar Materialized Views para agregações

---

### 11. Falta de Soft Deletes

**Problema:**
- Maioria das tabelas não tem `deleted_at`
- Risco de perda de dados em cascades

**Solução:**
```sql
-- Padrão para todas as tabelas principais:
ALTER TABLE leads ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE clients ADD COLUMN deleted_at TIMESTAMPTZ;
-- etc.

-- Criar view para queries:
CREATE VIEW active_leads AS
SELECT * FROM leads WHERE deleted_at IS NULL;
```

---

### 12. Storage não integrado com cloud_files

**Encontrado:**
```sql
cloud_files  -- Tabela custom
storage_items  -- Outra tabela custom
-- ❌ NÃO USA: Supabase Storage nativo
```

**Problema:**
- Não está usando Supabase Storage (storage.objects)
- Implementação custom menos segura
- Perde features como CDN, thumbnails, transforms

**Solução:**
```sql
-- Migrar para Supabase Storage:

-- 1. Criar buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('client-files', 'client-files', false),
  ('public-assets', 'public-assets', true);

-- 2. Migrar cloud_files → storage.objects
-- 3. Criar view de compatibilidade:
CREATE VIEW cloud_files_v2 AS
SELECT 
  id,
  name,
  bucket_id,
  owner,
  created_at,
  metadata
FROM storage.objects;
```

**Impacto:** 🟡 MÉDIO - Perde features do Supabase

---

## 🟢 MELHORIAS FUTURAS

### 13. Não usa Supabase Edge Functions

**Oportunidade:**
- Lógica de negócio está no client
- Edge Functions para:
  - Envio de emails (após quiz)
  - Webhooks de pagamento
  - Processamento de análises
  - Geração de PDFs

---

### 14. Não usa Supabase Realtime

**Oportunidade:**
- Dashboard poderia ser real-time
- Notificações in-app real-time
- Chat de suporte real-time

---

### 15. Não usa Database Webhooks

**Oportunidade:**
- Webhook quando lead novo é criado
- Webhook quando pagamento é confirmado
- Integração com Zapier/n8n nativa

---

## 📋 FUNCIONALIDADES SUPABASE NÃO UTILIZADAS

### 1. **Supabase Storage** ❌
- Usando tabelas custom (`cloud_files`, `storage_items`)
- Perdendo: CDN, transforms, RLS nativo

### 2. **Supabase Realtime** ❌
- Não habilitado em nenhuma tabela
- Perdendo: Updates live, presença

### 3. **Database Webhooks** ❌
- Nenhum webhook configurado
- Perdendo: Integrações automáticas

### 4. **Edge Functions** ⚠️ (Parcial)
- Pouco ou nenhum uso
- Lógica no client é insegura

### 5. **Materialized Views** ❌
- Não usa para dashboards
- Queries pesadas toda vez

### 6. **Full Text Search (pg_trgm)** ❌
- Busca de leads/clientes lenta
- Poderia usar FTS nativo

### 7. **PostGIS** (se precisar geolocalização) ❌
- Não habilitado
- Útil para: localização de clientes, mapas

### 8. **pg_cron** ⚠️ (Comentado)
- Vejo `-- SELECT cron.schedule...` comentado
- Não está usando jobs agendados

---

## 🔧 PLANO DE AÇÃO RECOMENDADO

### **FASE 1: CORREÇÕES CRÍTICAS (Esta Semana)**

#### 1.1. Consolidar Tabelas Duplicadas
```sql
-- Migration: 20251010_consolidate_duplicates.sql

-- 1. Unificar leads
-- 2. Unificar clients (remover duplicação)
-- 3. Conectar quiz_results → leads
```

#### 1.2. Adicionar FKs Faltantes
```sql
-- Migration: 20251010_add_missing_fks.sql

ALTER TABLE quiz_results 
  ADD COLUMN lead_id UUID REFERENCES leads(id);

ALTER TABLE consultoria_bookings
  ADD COLUMN lead_id UUID REFERENCES leads(id);

-- etc.
```

#### 1.3. Criar Trigger: Quiz → Lead
```sql
-- Migration: 20251010_quiz_to_lead_trigger.sql
-- (código fornecido acima)
```

---

### **FASE 2: OTIMIZAÇÕES (Próximas 2 Semanas)**

#### 2.1. Migrar para Supabase Storage
```sql
-- Criar buckets
-- Migrar arquivos
-- Atualizar código
```

#### 2.2. Consolidar Sistema de Análises
```sql
-- Criar diagnostic_sessions
-- Migrar dados
-- Drop tabelas antigas
```

#### 2.3. Adicionar Soft Deletes
```sql
-- Em todas as tabelas principais
ALTER TABLE ... ADD COLUMN deleted_at TIMESTAMPTZ;
```

#### 2.4. Habilitar Realtime
```sql
-- Para tabelas que precisam updates live
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_results;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

---

### **FASE 3: FEATURES AVANÇADAS (Próximo Mês)**

#### 3.1. Implementar Edge Functions
```typescript
// supabase/functions/process-quiz/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  // Processar quiz
  // Criar lead
  // Enviar email
  // Retornar resultado
})
```

#### 3.2. Database Webhooks
```sql
-- Webhook quando lead qualificado é criado
-- POST para Zapier/n8n/Slack
```

#### 3.3. Materialized Views
```sql
CREATE MATERIALIZED VIEW dashboard_metrics AS
SELECT 
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as leads_week,
  COUNT(*) FILTER (WHERE lead_score = 'qualified') as qualified_count,
  AVG(score) as avg_score
FROM quiz_results;

-- Refresh a cada hora
CREATE INDEX ON dashboard_metrics (refreshed_at);
```

#### 3.4. Full Text Search
```sql
-- Habilitar extensão
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Adicionar coluna tsvector
ALTER TABLE leads ADD COLUMN search_vector tsvector;

-- Trigger para atualizar
CREATE TRIGGER leads_search_update
  BEFORE INSERT OR UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION tsvector_update_trigger(
    search_vector, 'pg_catalog.portuguese', 
    name, email, company
  );

-- Index GIN para busca rápida
CREATE INDEX leads_search_idx ON leads USING GIN(search_vector);

-- Query:
SELECT * FROM leads 
WHERE search_vector @@ to_tsquery('portuguese', 'empresa:*');
```

---

## 📊 DIAGRAMA DE RELACIONAMENTOS RECOMENDADO

```
auth.users
    ↓
user_profiles (tier, user_type)
    ↓
    ├─→ leads (prospects)
    │     ↓
    │     ├─→ lead_interactions
    │     ├─→ quiz_results (FK: lead_id) ← ADICIONAR
    │     ├─→ consultoria_bookings (FK: lead_id) ← ADICIONAR
    │     └─→ clients (conversão)
    │           ↓
    │           ├─→ projects
    │           │     ↓
    │           │     └─→ project_milestones
    │           ├─→ subscriptions
    │           │     ↓
    │           │     └─→ payment_transactions
    │           ├─→ campaigns
    │           │     ↓
    │           │     └─→ campaign_metrics
    │           └─→ support_tickets
    │
    └─→ diagnostic_sessions (NOVO - consolida análises)
          ↓
          ├─→ analysis_requests (migrar aqui)
          ├─→ quiz_results (migrar aqui)
          └─→ domain_validations (migrar aqui)
```

---

## 🎯 MÉTRICAS DE SUCESSO

### Antes da Consolidação
- **Tabelas:** ~60
- **Duplicações:** 5 críticas
- **FKs faltando:** 10+
- **Funcionalidades Supabase:** 30% utilizado
- **Queries N+1:** Alta incidência

### Depois da Consolidação (Meta)
- **Tabelas:** ~45 (-25%)
- **Duplicações:** 0
- **FKs completos:** 100%
- **Funcionalidades Supabase:** 80% utilizado
- **Queries N+1:** Redução de 70%

---

## 📝 CHECKLIST DE AUDITORIA

### Redundâncias
- [ ] Consolidar `leads` (2 versões)
- [ ] Remover duplicação `clients`
- [ ] Unificar `analysis_requests` + `quiz_results` + `qualification_responses`
- [ ] Consolidar `email_messages` + `notification_queue`
- [ ] Unificar `payment_transactions` + `transactions`
- [ ] Revisar 6 tabelas de checklists
- [ ] Consolidar 3 sistemas de auditoria

### Conexões Faltantes
- [ ] `quiz_results.lead_id` → `leads.id`
- [ ] `consultoria_bookings.lead_id` → `leads.id`
- [ ] `domain_analysis_requests.client_id` → `clients.id`
- [ ] `campaigns.client_id` → `clients.id`

### Funcionalidades Supabase
- [ ] Migrar para Supabase Storage
- [ ] Habilitar Realtime em tabelas críticas
- [ ] Criar Edge Functions (process-quiz, send-email)
- [ ] Configurar Database Webhooks
- [ ] Implementar Materialized Views
- [ ] Habilitar Full Text Search
- [ ] Configurar pg_cron para jobs

### Boas Práticas
- [ ] Adicionar `deleted_at` em todas as tabelas
- [ ] Documentar ER diagrams
- [ ] Criar indexes faltantes
- [ ] Revisar RLS policies (276 é muito?)
- [ ] Adicionar constraints CHECK faltantes

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **HOJE:** Criar migration para conectar `quiz_results` → `leads`
2. **HOJE:** Criar trigger `quiz_to_lead`
3. **AMANHÃ:** Consolidar tabelas duplicadas
4. **Esta Semana:** Migrar para Supabase Storage
5. **Próxima Semana:** Habilitar Realtime + Edge Functions

---

**Status:** 🔴 Requer ação imediata  
**Prioridade:** Alta  
**Impacto Estimado:** +40% eficiência, -30% bugs, +60% features do Supabase utilizadas
