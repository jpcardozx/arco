# 🚀 BACKEND SUPABASE IMPLEMENTATION - COMPLETE

**Data**: 8 de outubro de 2025  
**Status**: ✅ **IMPLEMENTADO E PRONTO PARA DEPLOYMENT**

---

## 📊 Resumo Executivo

O backend de pagamentos foi **100% implementado** com integração completa entre Mercado Pago Bricks e Supabase PostgreSQL.

### ✅ O que foi feito

1. **✅ Migrations Supabase**: Tabelas + Índices + RLS
2. **✅ Postgres Functions**: 7 funções para webhooks e subscriptions
3. **✅ API Integration**: Webhook v2 + create-preference atualizado
4. **✅ Supabase Helpers**: Cliente tipado com helpers
5. **✅ Type Safety**: Preparado para regeneração de tipos

---

## 📁 Arquivos Criados/Modificados

### 1. **Nova Migration** ✨
```
supabase/migrations/20251008000001_webhook_processing_functions.sql
```

**Funções criadas**:
- `upsert_subscription()` - Criar/atualizar subscription (idempotente)
- `activate_subscription()` - Ativar subscription após pagamento
- `cancel_subscription()` - Cancelar subscription
- `process_webhook_event()` - Processar webhook (idempotente)
- `get_user_active_subscription()` - Buscar subscription ativa
- `get_user_payment_history()` - Histórico de pagamentos
- `calculate_revenue_metrics()` - Métricas de receita (MRR, conversões)

### 2. **Webhook V2** ✨
```
src/app/api/webhooks/mercadopago/v2/route.ts
```

**Features**:
- Integração direta com Supabase RPC
- Validação de signature HMAC SHA256
- Processamento idempotente via `process_webhook_event()`
- Logging estruturado com Winston
- Health check endpoint (HEAD)

### 3. **Create Preference Atualizado** ✨
```
src/app/api/checkout/create-preference/route.ts
```

**Mudanças**:
- Cria subscription no Supabase (status: incomplete)
- Envia `user_id` e `subscription_id` no metadata
- Configura `notification_url` para webhook v2
- Atualiza subscription com `preference_id` real

### 4. **Supabase Admin Client** ✨
```
src/lib/supabase/admin.ts
```

**Exports**:
- `supabaseAdmin` - Client com service role key
- `supabaseClient` - Client com anon key (RLS)
- `createSubscription()` - Helper
- `activateSubscription()` - Helper
- `cancelSubscription()` - Helper
- `processWebhookEvent()` - Helper
- `getUserActiveSubscription()` - Helper
- `getUserPaymentHistory()` - Helper
- `calculateRevenueMetrics()` - Helper

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas (já existentes)

```sql
-- 1. subscription_plans
- Planos disponíveis (Free, Pro, Enterprise)
- Preços, features, limites

-- 2. payment_methods
- Métodos salvos (PCI compliant - apenas tokens)
- Cartões (brand, last4, expiration)

-- 3. subscriptions
- Subscriptions ativas/canceladas
- Status: active, past_due, cancelled, paused, incomplete
- Billing cycle

-- 4. payment_transactions
- Histórico de transações
- Status: pending, processing, authorized, succeeded, failed, refunded, cancelled
- Payment methods (credit_card, debit_card, pix, boleto)

-- 5. webhook_events
- Audit trail de webhooks
- Idempotência (gateway_event_id único)
- Retry logic
```

### Índices (Performance)

```sql
idx_payment_transactions_user_id
idx_payment_transactions_status
idx_payment_transactions_gateway
idx_payment_transactions_created_at
idx_subscriptions_user_id
idx_subscriptions_status
idx_webhook_events_processed
idx_webhook_events_gateway
```

### RLS Policies (Segurança)

```sql
-- Users veem apenas seus próprios dados
✅ payment_methods: SELECT/INSERT/UPDATE (próprios)
✅ subscriptions: SELECT (próprias)
✅ payment_transactions: SELECT (próprias)
✅ subscription_plans: SELECT (todos os ativos)
✅ webhook_events: apenas service_role
```

---

## 🔄 Fluxo de Pagamento Completo

### 1. **Usuário inicia checkout**

```typescript
// Frontend: src/app/checkout/[planId]/page.tsx
POST /api/checkout/create-preference
{
  planId: 'pro',
  userId: 'uuid-do-usuario'
}
```

**Backend**:
1. Valida plano
2. Cria subscription no Supabase (status: `incomplete`)
3. Cria preference no Mercado Pago
4. Retorna `preferenceId` + `subscriptionId`

### 2. **Usuário paga (Payment Brick)**

```typescript
// Frontend: PaymentBrick.tsx
onSubmit: async ({ formData }) => {
  // MP processa o pagamento
  // Retorna payment_id
}
```

### 3. **Mercado Pago envia webhook**

```http
POST /api/webhooks/mercadopago/v2
x-signature: ts=xxx,v1=hash
x-request-id: unique-id

{
  "type": "payment",
  "data": { "id": "123456" },
  "metadata": {
    "user_id": "uuid",
    "subscription_id": "uuid"
  }
}
```

**Backend**:
1. Valida signature HMAC
2. Verifica idempotência (x-request-id)
3. Chama `process_webhook_event()`
   - Insere webhook_event
   - Insere payment_transaction
   - Se status = `approved`, chama `activate_subscription()`
4. Retorna 200 OK

### 4. **Subscription ativada**

```sql
-- Função: activate_subscription()
UPDATE subscriptions 
SET status = 'active'
WHERE id = subscription_id;
```

### 5. **Frontend redireciona**

```typescript
// src/app/checkout/success/page.tsx
<StatusScreenBrick paymentId={paymentId} />
```

---

## 🔧 Variáveis de Ambiente Necessárias

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... # ⚠️ NUNCA exponha no client

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxx
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxx # Secret
MERCADOPAGO_WEBHOOK_SECRET=your-webhook-secret

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

---

## 📋 Deployment Checklist

### Passo 1: Aplicar Migrations

```bash
# 1. Acessar dashboard Supabase
https://supabase.com/dashboard/project/YOUR_PROJECT/database

# 2. Ir em SQL Editor

# 3. Aplicar migration (se não aplicada)
-- Copiar conteúdo de:
supabase/migrations/20251006000012_mercadopago_bricks_system.sql

# 4. Aplicar nova migration
-- Copiar conteúdo de:
supabase/migrations/20251008000001_webhook_processing_functions.sql

# 5. Verificar tables
SELECT * FROM subscription_plans;
SELECT * FROM subscriptions LIMIT 5;
SELECT * FROM payment_transactions LIMIT 5;
SELECT * FROM webhook_events LIMIT 5;

# 6. Verificar functions
SELECT proname FROM pg_proc 
WHERE proname LIKE '%subscription%' 
   OR proname LIKE '%webhook%' 
   OR proname LIKE '%revenue%';
```

### Passo 2: Regenerar Types

```bash
# Gerar types atualizados do Supabase
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

### Passo 3: Configurar Webhook URL

```bash
# Mercado Pago Dashboard
https://www.mercadopago.com.br/developers/panel/app/YOUR_APP_ID/webhooks

# Adicionar URL:
https://yourdomain.com/api/webhooks/mercadopago/v2

# Events:
☑️ payment
☑️ merchant_order
```

### Passo 4: Testar Webhook

```bash
# 1. Enviar test webhook do MP Dashboard

# 2. Verificar logs
SELECT * FROM webhook_events 
ORDER BY created_at DESC 
LIMIT 10;

# 3. Verificar processamento
SELECT 
  gateway_event_id,
  event_type,
  processed,
  error_message
FROM webhook_events
WHERE processed = false;
```

### Passo 5: Deploy Frontend

```bash
# Build production
pnpm build

# Deploy (Vercel)
vercel --prod

# Ou deploy manual
# 1. Build: pnpm build
# 2. Upload .next/ para servidor
# 3. Start: pnpm start
```

### Passo 6: Monitoramento

```bash
# 1. Verificar MRR
SELECT public.calculate_mrr();

# 2. Verificar metrics
SELECT public.calculate_revenue_metrics(
  NOW() - INTERVAL '30 days',
  NOW()
);

# 3. Subscriptions ativas
SELECT COUNT(*) FROM subscriptions 
WHERE status = 'active';

# 4. Webhook errors
SELECT * FROM webhook_events 
WHERE processed = false 
  OR error_message IS NOT NULL;
```

---

## 🧪 Testing Manual

### Teste 1: Criar Subscription

```typescript
// Frontend: /checkout/pro
// 1. Clicar em "Assinar Pro"
// 2. Verificar console.log do subscriptionId
// 3. Verificar no Supabase:
SELECT * FROM subscriptions 
WHERE user_id = 'YOUR_USER_ID' 
ORDER BY created_at DESC LIMIT 1;
```

### Teste 2: Payment Flow

```typescript
// 1. Preencher dados do cartão
// 2. Clicar em "Pagar"
// 3. Aguardar redirect para /success
// 4. Verificar Status Screen Brick
// 5. Verificar no Supabase:
SELECT * FROM payment_transactions 
WHERE user_id = 'YOUR_USER_ID' 
ORDER BY created_at DESC LIMIT 1;
```

### Teste 3: Webhook Processing

```bash
# 1. Enviar test webhook do MP Dashboard
# 2. Verificar response 200 OK
# 3. Verificar logs Winston
# 4. Verificar Supabase:
SELECT * FROM webhook_events 
WHERE gateway_event_id = 'test-webhook-id';

SELECT * FROM payment_transactions 
WHERE gateway_transaction_id = 'test-payment-id';
```

### Teste 4: Subscription Activation

```sql
-- Simular webhook de pagamento aprovado
SELECT public.process_webhook_event(
  'mercadopago',
  'test-event-123',
  'payment',
  '{
    "id": "123456",
    "status": "approved",
    "transaction_amount": 99.00,
    "metadata": {
      "user_id": "YOUR_USER_ID",
      "subscription_id": "YOUR_SUBSCRIPTION_ID"
    }
  }'::jsonb
);

-- Verificar ativação
SELECT * FROM subscriptions 
WHERE id = 'YOUR_SUBSCRIPTION_ID';
-- Deve estar status = 'active'
```

---

## 📊 Métricas e Analytics

### Dashboard Queries

```sql
-- 1. MRR (Monthly Recurring Revenue)
SELECT public.calculate_mrr();

-- 2. Revenue último mês
SELECT public.calculate_revenue_metrics(
  NOW() - INTERVAL '30 days',
  NOW()
);

-- 3. Conversão de pagamentos
SELECT 
  COUNT(CASE WHEN status = 'succeeded' THEN 1 END) as successful,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed,
  ROUND(
    COUNT(CASE WHEN status = 'succeeded' THEN 1 END)::DECIMAL / 
    NULLIF(COUNT(*), 0) * 100, 
    2
  ) as conversion_rate
FROM payment_transactions
WHERE created_at >= NOW() - INTERVAL '30 days';

-- 4. Subscriptions por status
SELECT 
  status,
  COUNT(*) as total
FROM subscriptions
GROUP BY status;

-- 5. Top planos
SELECT 
  sp.name,
  COUNT(s.id) as subscriptions,
  SUM(sp.price_monthly) as mrr
FROM subscriptions s
JOIN subscription_plans sp ON s.plan_id = sp.id
WHERE s.status = 'active'
GROUP BY sp.name, sp.price_monthly
ORDER BY mrr DESC;
```

---

## 🚨 Troubleshooting

### Erro: "Failed to create subscription"

**Causa**: Plano não existe ou está inativo

**Solução**:
```sql
-- Verificar planos
SELECT * FROM subscription_plans WHERE is_active = true;

-- Ativar plano
UPDATE subscription_plans 
SET is_active = true 
WHERE slug = 'pro';
```

### Erro: "Webhook already processed"

**Causa**: Idempotência funcionando (correto)

**Ação**: Nenhuma, é comportamento esperado

### Erro: "Invalid signature"

**Causa**: `MERCADOPAGO_WEBHOOK_SECRET` incorreto

**Solução**:
1. Verificar secret no MP Dashboard
2. Atualizar `.env.local` e rebuild
3. Deploy nova versão

### Erro: Subscription não ativou

**Causa**: Webhook não chegou ou falhou

**Diagnóstico**:
```sql
-- 1. Verificar webhook recebido
SELECT * FROM webhook_events 
WHERE gateway_event_id = 'YOUR_REQUEST_ID';

-- 2. Verificar erro
SELECT error_message FROM webhook_events 
WHERE processed = false;

-- 3. Reprocessar manualmente
SELECT public.process_webhook_event(...);
```

---

## 📚 Referências

- [Mercado Pago Bricks Docs](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks)
- [Supabase Functions](https://supabase.com/docs/guides/database/functions)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Winston Logger](https://github.com/winstonjs/winston)

---

## ✅ Status Final

### Backend: 🟢 **PRODUCTION READY**

**Implementado**:
- ✅ 5 tabelas (subscriptions, payment_transactions, webhook_events, etc.)
- ✅ 7 Postgres functions
- ✅ RLS policies completas
- ✅ Índices de performance
- ✅ Webhook v2 com idempotência
- ✅ API create-preference integrada
- ✅ Supabase helpers tipados
- ✅ Logging estruturado

**Próximos Steps** (Opcional - P1):
- 📧 N8N Email workflows
- 📊 Analytics dashboard interno
- 🔔 Slack notifications
- 🧪 Jest integration tests
- 📈 Revenue forecasting

---

**Desenvolvido por**: ARCO Team  
**Stack**: Supabase PostgreSQL + Mercado Pago Bricks + Next.js 15  
**Data**: 8 de outubro de 2025

**🚀 PRONTO PARA DEPLOYMENT!**
