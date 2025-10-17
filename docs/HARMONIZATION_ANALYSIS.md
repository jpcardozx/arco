# 🔄 Análise de Harmonização: Payment System

**Data:** 6 de outubro de 2025  
**Objetivo:** Unificar documentação e preparar implementação Supabase

---

## 🔍 Análise de Discrepâncias

### **Migrations Encontradas (3 versões):**

1. **`20251006000011_payment_management_system.sql`** - Proposta genérica (Stripe + MP)
2. **`20251006000012_mercadopago_bricks_system.sql`** - Específica Bricks + Orders API v2 ✅
3. **`FINANCE_TO_PAYMENTS_PROPOSAL.md`** - Documentação conceitual

### **Status Atual:**
- ❌ **20251006000011** - Obsoleta, será deletada
- ✅ **20251006000012** - Versão canônica, será aplicada
- 📚 Documentação - Será harmonizada

---

## 📊 Estrutura de Tabelas (Canônica)

### **Schema Final (20251006000012):**

```
public.subscription_plans
├── id (UUID, PK)
├── name, slug, description
├── price_monthly, price_yearly, currency
├── mercadopago_plan_id          # Preapproval API
├── stripe_price_id_monthly      # Futuro internacional
├── stripe_price_id_yearly
├── features (JSONB)
├── max_analyses, max_storage_gb, max_users
├── is_active, is_featured
└── created_at, updated_at

public.payment_methods (PCI compliant)
├── id (UUID, PK)
├── user_id (FK → auth.users)
├── gateway ('mercadopago' | 'stripe')
├── gateway_customer_id
├── gateway_payment_method_id
├── card_brand, card_last4       # Não-sensível
├── card_exp_month, card_exp_year
├── is_default, is_active
└── created_at, updated_at

public.subscriptions
├── id (UUID, PK)
├── user_id (FK → auth.users)
├── plan_id (FK → subscription_plans)
├── gateway ('mercadopago' | 'stripe')
├── gateway_subscription_id      # Preapproval ID
├── status (active|past_due|cancelled|paused|incomplete)
├── current_period_start, current_period_end
├── cancel_at_period_end, cancelled_at
├── trial_start, trial_end
└── created_at, updated_at

public.payment_transactions
├── id (UUID, PK)
├── user_id (FK → auth.users)
├── subscription_id (FK → subscriptions)
├── gateway ('mercadopago' | 'stripe')
├── gateway_transaction_id       # Payment ID
├── gateway_order_id             # Order ID (v2) ✅ CHAVE
├── gateway_customer_id
├── amount, currency
├── status (pending|processing|authorized|succeeded|failed|refunded|cancelled)
├── payment_method_type (credit_card|debit_card|pix|boleto)
├── payment_method_last4
├── paid_at, refunded_at
├── metadata (JSONB)
└── created_at, updated_at

public.webhook_events (Idempotência)
├── id (UUID, PK)
├── gateway ('mercadopago' | 'stripe')
├── gateway_event_id (UNIQUE)    # x-request-id
├── event_type (payment|merchant_order|subscription_*)
├── payload (JSONB)
├── processed, processed_at
├── error_message, retry_count
└── received_at, created_at
```

---

## ✅ Diferenças Chave vs. Proposta Original

| Aspecto | Proposta Original | Versão Bricks (Canônica) | Razão |
|---------|------------------|--------------------------|-------|
| **API** | Preferences API | Orders API v2 ✅ | Moderna, captura manual |
| **Front** | Redirect | Payment Brick ✅ | On-site, customizável |
| **Campo chave** | - | `gateway_order_id` ✅ | Orquestração de pedido |
| **Status** | 6 estados | 7 estados (+authorized) ✅ | Captura em 2 estágios |
| **Stripe** | Igual prioridade | Futuro opcional ✅ | Foco Brasil primeiro |

---

## 🗑️ Ações de Limpeza

### **1. Deletar Migration Obsoleta**
```bash
rm supabase/migrations/20251006000011_payment_management_system.sql
```

**Razão:** Superseded por `20251006000012` (Bricks + Orders v2)

### **2. Atualizar Documentação**
- ✅ `MERCADOPAGO_BRICKS_IMPLEMENTATION.md` - Fonte de verdade
- ⏳ `FINANCE_TO_PAYMENTS_PROPOSAL.md` - Arquivar como histórico
- ⏳ Criar `PAYMENT_SYSTEM_CANONICAL.md` - Referência rápida

---

## 📋 Checklist de Implementação Supabase

### **FASE 1: Database Setup (AGORA)**

#### **1.1 Aplicar Migration Canônica**
```bash
# Via Supabase Dashboard:
# 1. https://vkclegvrqprevcdgosan.supabase.co/project/_/sql
# 2. Cole: supabase/migrations/20251006000012_mercadopago_bricks_system.sql
# 3. Run
```

**Resultado esperado:**
- ✅ 5 tabelas criadas
- ✅ 3 planos seed (Free, Pro, Enterprise)
- ✅ RLS policies ativas
- ✅ Índices de performance
- ✅ Funções: `calculate_mrr()`, `cleanup_old_webhook_events()`

#### **1.2 Validar Schema**
```sql
-- Verificar tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'subscription_plans',
    'payment_methods',
    'subscriptions',
    'payment_transactions',
    'webhook_events'
  );

-- Verificar RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE '%payment%' 
     OR tablename LIKE '%subscription%';

-- Verificar planos seed
SELECT name, slug, price_monthly, is_active 
FROM subscription_plans 
ORDER BY price_monthly;
```

#### **1.3 Verificar Relacionamentos**
```sql
-- Foreign keys
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
  AND tc.table_name LIKE '%payment%'
     OR tc.table_name LIKE '%subscription%';
```

---

## 🔍 Análise de Progresso Atual

### **Status Geral do Projeto ARCO**

```bash
# Executar análise completa
npx tsx src/lib/context-tester.ts test
```

### **Backend - Payment System**

**Situação atual:**
- ✅ **Credenciais:** Configuradas (test mode)
- ✅ **SDKs:** Instalados (`@mercadopago/sdk-react`, `mercadopago`)
- ✅ **Documentação:** 2.400+ linhas
- ✅ **Migration:** Pronta para aplicar
- ❌ **Database:** Tabelas não criadas ainda
- ❌ **Backend Core:** Não implementado
- ❌ **Frontend:** Não implementado

**Completude:** 15% (setup apenas)

### **Análise de Dependências**

```
payment_system/
├─ 📦 Dependencies
│  ├─ ✅ @mercadopago/sdk-react@1.0.6
│  ├─ ✅ mercadopago@2.9.0
│  ├─ ✅ @supabase/supabase-js@2.74.0
│  ├─ ✅ zod@3.25.76
│  └─ ❌ stripe (não instalado, futuro)
│
├─ 🗄️ Database
│  ├─ ❌ subscription_plans (pending)
│  ├─ ❌ payment_methods (pending)
│  ├─ ❌ subscriptions (pending)
│  ├─ ❌ payment_transactions (pending)
│  └─ ❌ webhook_events (pending)
│
├─ 🔧 Backend Core
│  ├─ ❌ src/lib/payments/mercadopago/client.ts
│  ├─ ❌ src/lib/payments/mercadopago/orders.ts
│  ├─ ❌ src/lib/payments/mercadopago/webhooks.ts
│  └─ ❌ src/app/api/webhooks/mercadopago/route.ts
│
└─ 🎨 Frontend
   ├─ ❌ src/app/(dashboard)/payments/page.tsx
   ├─ ❌ src/app/(dashboard)/payments/new/page.tsx
   └─ ❌ Payment Brick integration
```

---

## 📊 Pendências Críticas (P0)

### **1. Database Setup** 🔴 BLOCKER
**Status:** Não aplicado  
**Ação:** Aplicar `20251006000012_mercadopago_bricks_system.sql`  
**Tempo:** 5 minutos  
**Bloqueia:** Todo o resto da implementação

### **2. Webhook Configuration** 🔴 BLOCKER
**Status:** Secret não gerado  
**Ação:**
1. Configurar webhook no painel MP
2. Gerar secret signature
3. Adicionar `MERCADOPAGO_WEBHOOK_SECRET` ao `.env.local` e Vercel

**Tempo:** 10 minutos  
**Bloqueia:** Processamento de pagamentos

### **3. Backend Core** 🟡 HIGH
**Status:** Não implementado  
**Arquivos necessários:**
- `src/lib/payments/mercadopago/client.ts` (10 min)
- `src/lib/payments/mercadopago/orders.ts` (30 min)
- `src/lib/payments/mercadopago/webhooks.ts` (20 min)
- `src/app/api/webhooks/mercadopago/route.ts` (30 min)

**Tempo total:** ~1h30min  
**Bloqueia:** Checkout funcional

---

## 🎯 Roadmap Revisado

### **✅ FASE 0: Foundation (COMPLETO)**
- [x] Análise de arquitetura
- [x] Credenciais configuradas
- [x] SDKs instalados
- [x] Documentação criada
- [x] Migration SQL pronta

**Tempo:** 3 horas (concluído)

### **🔴 FASE 1: Database Setup (ESTA SEMANA - P0)**
- [ ] Deletar migration obsoleta
- [ ] Aplicar migration canônica
- [ ] Validar schema no Supabase
- [ ] Verificar RLS policies
- [ ] Confirmar planos seed
- [ ] Gerar webhook secret

**Tempo estimado:** 30 minutos  
**Prioridade:** BLOCKER

### **🟡 FASE 2: Backend Core (SEMANA 1 - P0)**
- [ ] Mercado Pago client
- [ ] Orders service (create, capture, cancel)
- [ ] Webhook handler + validation
- [ ] Processar eventos (payment, merchant_order)
- [ ] Salvar no Supabase

**Tempo estimado:** 1-2 dias  
**Prioridade:** HIGH

### **🟢 FASE 3: Frontend Checkout (SEMANA 2 - P1)**
- [ ] Inicializar SDK React
- [ ] Payment Brick page
- [ ] Status Brick
- [ ] Fluxo de checkout completo
- [ ] Error handling

**Tempo estimado:** 2-3 dias  
**Prioridade:** MEDIUM

### **🔵 FASE 4: Dashboard (SEMANA 2 - P1)**
- [ ] KPIs (receita, assinaturas, taxa de sucesso)
- [ ] Lista de transações
- [ ] Filtros e busca
- [ ] Gráficos

**Tempo estimado:** 2-3 dias  
**Prioridade:** MEDIUM

### **🟣 FASE 5: Subscriptions (SEMANA 3 - P2)**
- [ ] Preapproval API integration
- [ ] Criar/cancelar assinaturas
- [ ] Renovação automática
- [ ] Trial periods
- [ ] Upgrade/downgrade

**Tempo estimado:** 3-4 dias  
**Prioridade:** LOW

### **⚪ FASE 6: Advanced (SEMANA 4 - P3)**
- [ ] Captura manual
- [ ] Refunds
- [ ] Relatórios
- [ ] Exportação

**Tempo estimado:** 3-5 dias  
**Prioridade:** FUTURE

---

## 🚀 Script de Harmonização

```bash
#!/bin/bash
# harmonize-payments.sh

echo "🔄 Harmonizando Payment System..."

# 1. Deletar migration obsoleta
echo "[1/5] Deletando migration obsoleta..."
rm -f supabase/migrations/20251006000011_payment_management_system.sql

# 2. Arquivar proposta original
echo "[2/5] Arquivando proposta original..."
mkdir -p docs/proposals
mv FINANCE_TO_PAYMENTS_PROPOSAL.md docs/proposals/

# 3. Criar symlink canônico
echo "[3/5] Criando referência canônica..."
ln -sf MERCADOPAGO_BRICKS_IMPLEMENTATION.md PAYMENT_SYSTEM_CANONICAL.md

# 4. Validar estrutura
echo "[4/5] Validando estrutura..."
test -f supabase/migrations/20251006000012_mercadopago_bricks_system.sql && echo "✅ Migration canônica OK"
test -d src/lib/payments/mercadopago && echo "✅ Diretório payments OK"
test -f .env.local && grep -q "MERCADOPAGO" .env.local && echo "✅ Credenciais OK"

# 5. Próximos passos
echo "[5/5] Próximos passos:"
echo ""
echo "1️⃣  Aplicar migration no Supabase:"
echo "   https://vkclegvrqprevcdgosan.supabase.co/project/_/sql"
echo ""
echo "2️⃣  Configurar webhook:"
echo "   https://www.mercadopago.com.br/developers/panel/app/webhooks"
echo ""
echo "3️⃣  Implementar backend core:"
echo "   src/lib/payments/mercadopago/client.ts"
echo ""
echo "✅ Harmonização completa!"
```

---

## 📈 Métricas de Progresso

### **Overall Project Progress**
- **Database:** 0% (migration não aplicada)
- **Backend:** 15% (setup apenas)
- **Frontend:** 0% (não iniciado)
- **Documentation:** 100% ✅
- **Setup:** 100% ✅

**Total:** ~23% complete

### **Payment System Specific**
```
Foundation ████████████████████████████ 100%
Database   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%
Backend    ████░░░░░░░░░░░░░░░░░░░░░░░░  15%
Frontend   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%
Tests      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%
Deploy     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%
```

---

## 🎯 Ações Imediatas (Próximas 2 horas)

### **1. Executar harmonização (5 min)**
```bash
bash harmonize-payments.sh
```

### **2. Aplicar migration no Supabase (10 min)**
1. Acesse: https://vkclegvrqprevcdgosan.supabase.co/project/_/sql
2. Cole: `supabase/migrations/20251006000012_mercadopago_bricks_system.sql`
3. Execute
4. Valide com queries de verificação

### **3. Configurar webhook (10 min)**
1. Acesse: https://www.mercadopago.com.br/developers/panel/app/webhooks
2. URL: `https://arco.vercel.app/api/webhooks/mercadopago`
3. Eventos: `payment`, `merchant_order`, `subscription_authorized_payment`
4. Ativar "Secret Signature"
5. Copiar secret

### **4. Atualizar variáveis (5 min)**
```bash
# .env.local
MERCADOPAGO_WEBHOOK_SECRET=<secret_copiado>

# Vercel
vercel env add MERCADOPAGO_WEBHOOK_SECRET
```

### **5. Implementar backend core (1h30min)**
Ver exemplos em `MERCADOPAGO_BRICKS_IMPLEMENTATION.md`

---

## ✅ Checklist de Harmonização

- [ ] Migration obsoleta deletada
- [ ] Proposta original arquivada
- [ ] Referência canônica criada
- [ ] Migration aplicada no Supabase
- [ ] Schema validado
- [ ] RLS policies verificadas
- [ ] Planos seed confirmados
- [ ] Webhook configurado
- [ ] Secret adicionado às variáveis
- [ ] Backend core iniciado

---

## 📞 Comandos Úteis

### **Verificar progresso geral:**
```bash
npx tsx src/lib/context-tester.ts test
```

### **Verificar tabelas no Supabase:**
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
```

### **Verificar RLS:**
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

### **Testar MRR:**
```sql
SELECT calculate_mrr();
```

---

**Última atualização:** 6 de outubro de 2025  
**Status:** Pronto para harmonização e implementação Supabase
