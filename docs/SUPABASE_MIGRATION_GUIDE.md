# 🗄️ Guia Rápido: Aplicar Migration no Supabase

**Projeto:** vkclegvrqprevcdgosan  
**URL:** https://vkclegvrqprevcdgosan.supabase.co  
**Tempo estimado:** 5-10 minutos

---

## 🎯 Objetivo

Criar 5 tabelas para o Payment System:
1. `subscription_plans` - Planos de assinatura
2. `payment_methods` - Métodos de pagamento (PCI compliant)
3. `subscriptions` - Assinaturas ativas
4. `payment_transactions` - Histórico de pagamentos
5. `webhook_events` - Log de webhooks (idempotência)

---

## 📋 Passo a Passo

### **1. Acessar SQL Editor (1 min)**

**URL direta:**
```
https://vkclegvrqprevcdgosan.supabase.co/project/_/sql
```

Ou navegue:
1. Acesse: https://supabase.com/dashboard
2. Selecione projeto: **vkclegvrqprevcdgosan**
3. Menu lateral: **SQL Editor**
4. Clique em **"New query"**

---

### **2. Copiar Migration SQL (30 segundos)**

**Arquivo local:**
```
supabase/migrations/20251006000012_mercadopago_bricks_system.sql
```

**Ou baixe daqui:** [Link para o arquivo]

**Conteúdo resumido:**
- 367 linhas de SQL
- 5 CREATE TABLE
- 8 CREATE INDEX
- 7 CREATE POLICY
- 2 CREATE FUNCTION
- 3 INSERT (seed data)

---

### **3. Executar Migration (2 min)**

1. **Cole o SQL completo** no editor
2. Clique em **"Run"** (Ctrl+Enter)
3. **Aguarde** a execução (~30 segundos)

**Resultado esperado:**
```
Success. No rows returned
```

---

### **4. Validar Criação (2 min)**

**Query de validação:**
```sql
-- Verificar tabelas
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'subscription_plans',
    'payment_methods',
    'subscriptions',
    'payment_transactions',
    'webhook_events'
  )
ORDER BY table_name;
```

**Resultado esperado: 5 linhas**
```
subscription_plans      | BASE TABLE
payment_methods         | BASE TABLE
subscriptions           | BASE TABLE
payment_transactions    | BASE TABLE
webhook_events          | BASE TABLE
```

---

### **5. Verificar RLS Policies (1 min)**

```sql
-- Verificar Row Level Security
SELECT 
  tablename, 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename LIKE '%payment%'
     OR tablename LIKE '%subscription%'
ORDER BY tablename, policyname;
```

**Resultado esperado: 7 policies**

---

### **6. Confirmar Planos Seed (1 min)**

```sql
-- Verificar planos criados
SELECT 
  name,
  slug,
  price_monthly,
  price_yearly,
  is_active,
  is_featured
FROM subscription_plans
ORDER BY price_monthly;
```

**Resultado esperado:**
```
Free       | free       |    0.00 |    0.00 | true  | false
Pro        | pro        |   99.00 |  990.00 | true  | true
Enterprise | enterprise |  299.00 | 2990.00 | true  | false
```

---

### **7. Testar Função MRR (30 segundos)**

```sql
-- Calcular Monthly Recurring Revenue
SELECT calculate_mrr() as mrr;
```

**Resultado esperado:**
```
0.00
```
(Zero porque ainda não há assinaturas ativas)

---

## ✅ Checklist de Validação

Após executar a migration, confirme:

- [ ] 5 tabelas criadas
- [ ] 7 RLS policies ativas
- [ ] 8 índices criados
- [ ] 3 planos seed inseridos
- [ ] Função `calculate_mrr()` disponível
- [ ] Função `cleanup_old_webhook_events()` disponível

---

## 🔍 Queries de Debug

### **Contar registros por tabela:**
```sql
SELECT 
  'subscription_plans' as table_name, 
  COUNT(*) as count 
FROM subscription_plans
UNION ALL
SELECT 'payment_methods', COUNT(*) FROM payment_methods
UNION ALL
SELECT 'subscriptions', COUNT(*) FROM subscriptions
UNION ALL
SELECT 'payment_transactions', COUNT(*) FROM payment_transactions
UNION ALL
SELECT 'webhook_events', COUNT(*) FROM webhook_events;
```

### **Ver estrutura de uma tabela:**
```sql
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'payment_transactions'
ORDER BY ordinal_position;
```

### **Ver foreign keys:**
```sql
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND (tc.table_name LIKE '%payment%' 
    OR tc.table_name LIKE '%subscription%')
ORDER BY tc.table_name, kcu.column_name;
```

---

## 🚨 Troubleshooting

### **Erro: "relation already exists"**

**Solução 1:** Tabelas já foram criadas anteriormente
```sql
-- Verificar se tabelas existem
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'subscription_plans',
    'payment_methods',
    'subscriptions',
    'payment_transactions',
    'webhook_events'
  );
```

**Solução 2:** Dropar e recriar (⚠️ CUIDADO: perde dados!)
```sql
-- APENAS EM DESENVOLVIMENTO!
DROP TABLE IF EXISTS public.webhook_events CASCADE;
DROP TABLE IF EXISTS public.payment_transactions CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.payment_methods CASCADE;
DROP TABLE IF EXISTS public.subscription_plans CASCADE;

-- Depois execute a migration novamente
```

### **Erro: "permission denied"**

**Causa:** Usuário sem permissão para criar tabelas

**Solução:** Use o SQL Editor do Supabase Dashboard (tem permissões de admin)

### **Erro: "syntax error"**

**Causa:** SQL copiado incorretamente

**Solução:** 
1. Abra o arquivo original: `supabase/migrations/20251006000012_mercadopago_bricks_system.sql`
2. Copie **todo o conteúdo** (Ctrl+A, Ctrl+C)
3. Cole no SQL Editor
4. Execute novamente

---

## 📊 Após Aplicar Migration

### **Próximos passos:**

1. **Configurar Webhook no Mercado Pago** (10 min)
   - URL: `https://arco.vercel.app/api/webhooks/mercadopago`
   - Gerar secret signature

2. **Atualizar variáveis de ambiente** (5 min)
   - Adicionar `MERCADOPAGO_WEBHOOK_SECRET`

3. **Implementar backend core** (1h30min)
   - `src/lib/payments/mercadopago/client.ts`
   - `src/lib/payments/mercadopago/orders.ts`
   - `src/lib/payments/mercadopago/webhooks.ts`
   - `src/app/api/webhooks/mercadopago/route.ts`

---

## 🔗 Links Úteis

- **Supabase Dashboard:** https://vkclegvrqprevcdgosan.supabase.co
- **SQL Editor:** https://vkclegvrqprevcdgosan.supabase.co/project/_/sql
- **Table Editor:** https://vkclegvrqprevcdgosan.supabase.co/project/_/editor
- **Migration File:** `supabase/migrations/20251006000012_mercadopago_bricks_system.sql`
- **Docs:** `MERCADOPAGO_BRICKS_IMPLEMENTATION.md`

---

**Status após aplicar:** Database = 100% ✅  
**Tempo total:** ~10 minutos  
**Próximo blocker:** Webhook configuration

---

## 💡 Dica Pro

Para facilitar testes futuros, salve as queries de validação como **Saved queries** no SQL Editor:

1. Execute uma query de validação
2. Clique em **"Save"**
3. Nomeie: "Validate Payment Tables"
4. Reutilize sempre que precisar validar o schema

---

**Última atualização:** 6 de outubro de 2025  
**Versão da migration:** 20251006000012
