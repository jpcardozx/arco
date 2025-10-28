# 🔍 Análise Gap: ARCO Tripwire Implementation

**Data:** 27 de outubro de 2025  
**Objetivo:** Mapear o que existe vs o que falta para implementar funil tripwire  
**Categorias:** ✅ Já temos | ⚙️ Configurar | 🔍 Revisar | ⚡ Aprimorar | 🔨 Criar | 🚀 Otimizar

---

## 📊 Resumo Executivo

### **Status Atual:**
- **Infraestrutura base:** 70% pronta (Supabase, PostHog client, MercadoPago)
- **Tracking server-side:** 0% (CAPI e PostHog server faltam)
- **Funil tripwire:** 40% (página existe, tracking incompleto)
- **Compliance:** 0% (cookie consent não existe)

### **Prioridade de Implementação:**
1. 🔴 **CRÍTICO:** Meta CAPI + Cookie Consent (4h) - sem isso, ads desperdiçam budget
2. 🟡 **IMPORTANTE:** PostHog server + Lead Magnet page (7h)
3. 🟢 **DESEJÁVEL:** Intent scoring, automações (futuro)

---

## ✅ 1. JÁ TEMOS (Funcional e Configurado)

### **1.1 Supabase (SSR + Auth)**

**Arquivos existentes:**
- ✅ `src/middleware.ts` - SSR auth com cookies
- ✅ `src/lib/supabase/server.ts` - createSupabaseServer
- ✅ `src/lib/supabase/client.ts` - createSupabaseClient
- ✅ `src/lib/supabase/admin.ts` - Admin client
- ✅ `src/lib/supabase/auth.ts` - Auth helpers
- ✅ `src/lib/supabase/lead-capture.ts` - Lead capture logic

**Env vars configuradas:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://vkclegvrqprevcdgosan.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (configurado)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (configurado)
```

**Database tables (verificar se existem):**
- ❓ `leads` table (provável que exista)
- ❓ `purchases` table (provável que exista)
- ❓ Schema correto conforme CONVERSION_STACK_IMPLEMENTATION.md

**Status:** ✅ **Funcional** - RLS implementado, auth funcionando

---

### **1.2 PostHog Client-Side**

**Arquivos existentes:**
- ✅ `src/lib/posthog/experiments.ts` - Experiments config
- ✅ `src/lib/posthog/cohorts.ts` - Cohorts config
- ✅ `src/app/tripwire/page.tsx` - Events: tripwire_page_viewed, tripwire_checkout_initiated

**Env vars configuradas:**
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_k6slH23FdBBe1rBJS2h9I4nGjZ1voyum25NFcLfoCVF
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_ANALYTICS_DEBUG=true
```

**Events tracking (client-side apenas):**
- ✅ `tripwire_page_viewed`
- ✅ `tripwire_checkout_initiated`
- ✅ `tripwire_redirect_to_payment`
- ✅ `tripwire_checkout_error`

**Status:** ✅ **Funcional** mas incompleto (falta server-side)

---

### **1.3 MercadoPago**

**Arquivos existentes:**
- ✅ `src/app/api/checkout/tripwire/route.ts` - Checkout endpoint
- ✅ `src/app/api/webhooks/mercadopago/route.ts` - Webhook handler
- ✅ `src/lib/payments/mercadopago/orders.ts` - Order logic

**Env vars configuradas:**
```bash
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-cdfb831a-f7c1-4c1b-bf3d-dd332726f709
MERCADOPAGO_ACCESS_TOKEN=APP_USR-... (provável que existe)
```

**Status:** ✅ **Funcional** - checkout cria preferência, webhook processa pagamentos

---

### **1.4 Resend Email**

**Env vars configuradas:**
```bash
RESEND_API_KEY=re_FfQAjozL_6GzKoCpiANzqmv5TxFRhg2ou
RESEND_FROM_EMAIL=arco@consultingarco.com
RESEND_FROM_NAME=ARCO Consulting
RESEND_REPLY_TO=arco@consultingarco.com
```

**Status:** ✅ **Funcional** - pronto para enviar emails

---

### **1.5 Meta Conversions API (Credenciais)**

**Env vars configuradas:**
```bash
META_DATASET_ID=1574079363975678
META_CONVERSION_API_ACCESS_TOKEN=EAALqEBN5Xe8BPlRTsyDft4O2a3q46LGgP0gZCWK4QGbvCVP7RInoarA1eWfqmbQYPA5gSRApev5La23iLqyZBpSjCXRN5ZC3ZAlxWNnMavtxCHuoYZBv1GEGXbrcagaMnchvSZAt0lV25ZB4YvytWdLrUrEKNMr6vl2By9gF42mOmFyrL0ImRG6n1Qq6PcQatgDVgZDZD
META_TEST_EVENT_CODE=TEST12345
```

**Status:** ✅ **Configurado** mas sem endpoint ainda (criar /api/meta/track)

---

### **1.6 Tripwire Page (Frontend)**

**Arquivo existente:**
- ✅ `src/app/tripwire/page.tsx` (377 linhas)

**Features existentes:**
- ✅ Form de checkout (nome, email, phone)
- ✅ Pre-fill com query params (`?email=...`)
- ✅ Integração MercadoPago
- ✅ PostHog tracking (client-side)
- ✅ Error handling
- ✅ Loading states

**Status:** ✅ **Funcional** mas precisa adicionar CAPI tracking

---

### **1.7 Zustand Store**

**Arquivo existente:**
- ✅ `src/lib/stores/dashboard-store.ts` - Dashboard UI state

**Instalado:**
- ✅ `zustand@^5.0.2` (package.json)

**Status:** ✅ **Pronto** para criar intent-store.ts

---

### **1.8 Meta Tracking Hook**

**Arquivo existente:**
- ✅ `src/hooks/useMetaTracking.ts` (419 linhas)

**Features:**
- ✅ `generateEventId()` para dedup
- ✅ `evaluateEMQ()` - EMQ monitoring
- ✅ `trackEMQ()` - tracking quality

**Problema:** Aponta para Supabase Edge Function que não existe (deve apontar para `/api/meta/track`)

**Status:** 🔍 **Revisar** - mudar endpoint de Edge Function para Next.js API route

---

## ⚙️ 2. CONFIGURAR (Existe mas precisa env vars/setup)

### **2.1 PostHog Server-Side**

**Precisa instalar:**
```bash
pnpm add posthog-node
```

**Precisa adicionar env var:**
```bash
POSTHOG_API_KEY=phx_... # Personal API Key (obter no PostHog Settings)
```

**Como obter:**
1. PostHog → Settings → Project Settings → API Keys
2. Create "Personal API Key" (não Project API Key)
3. Copiar e adicionar ao `.env.local`

**Esforço:** 15 minutos

---

### **2.2 Meta Pixel (Frontend)**

**Precisa adicionar ao layout:**
- Pixel script em `src/app/layout.tsx`
- Env var: `NEXT_PUBLIC_META_PIXEL_ID=...` (obter no Meta Events Manager)

**Esforço:** 30 minutos

---

## 🔍 3. REVISAR (Existe mas não segue spec)

### **3.1 Lead Capture API**

**Arquivo:** `src/app/api/leads/capture/route.ts`

**Problema:**
- ✅ Salva lead no Supabase
- ✅ Envia email com Resend
- ❌ **Falta:** Tracking dual (PostHog server + Meta CAPI)

**O que adicionar:**
```typescript
// Após Supabase insert:

// 1. PostHog server-side
await trackEvent(lead.id, 'lead_captured', {
  email: formData.email,
  source: formData.source
})

// 2. Meta CAPI
await fetch('/api/meta/track', {
  method: 'POST',
  body: JSON.stringify({
    eventName: 'Lead',
    email: formData.email,
    eventId: crypto.randomUUID()
  })
})
```

**Esforço:** 30 minutos

---

### **3.2 useMetaTracking Hook**

**Arquivo:** `src/hooks/useMetaTracking.ts`

**Problema:**
- ✅ Lógica de tracking completa
- ❌ Aponta para Supabase Edge Function (não existe)
- ❌ Deve apontar para `/api/meta/track` (Next.js API route)

**Mudança necessária:**
```typescript
// ANTES
const response = await fetch('/api/supabase-function/meta-track', ...)

// DEPOIS
const response = await fetch('/api/meta/track', ...)
```

**Esforço:** 10 minutos

---

### **3.3 Webhook MercadoPago**

**Arquivo:** `src/app/api/webhooks/mercadopago/route.ts`

**Problema:**
- ✅ Processa pagamento
- ✅ Atualiza Supabase
- ❌ **Falta:** Tracking Purchase (PostHog + Meta CAPI)

**O que adicionar:**
```typescript
if (payment.status === 'approved') {
  // ... update Supabase
  
  // Track Purchase (Meta CAPI)
  await fetch('/api/meta/track', {
    method: 'POST',
    body: JSON.stringify({
      eventName: 'Purchase',
      email: payment.payer.email,
      phone: payment.payer.phone?.number,
      value: payment.transaction_amount,
      eventId: payment.metadata.event_id // Dedup!
    })
  })
  
  // Track PostHog server
  await trackEvent(payment.payer.email, 'tripwire_purchased', {
    value: payment.transaction_amount
  })
}
```

**Esforço:** 30 minutos

---

### **3.4 Tripwire Page Tracking**

**Arquivo:** `src/app/tripwire/page.tsx`

**Problema:**
- ✅ Tracking client-side (PostHog)
- ❌ **Falta:** Tracking server-side (Meta CAPI)

**O que adicionar:**
```typescript
useEffect(() => {
  const email = searchParams?.get('email')
  
  // Adicionar: ViewContent (Meta CAPI)
  fetch('/api/meta/track', {
    method: 'POST',
    body: JSON.stringify({
      eventName: 'ViewContent',
      email,
      value: 147,
      eventId: crypto.randomUUID()
    })
  })
}, [])

// No handleCheckout, adicionar: InitiateCheckout
await fetch('/api/meta/track', {
  method: 'POST',
  body: JSON.stringify({
    eventName: 'InitiateCheckout',
    email,
    phone,
    value: 147,
    eventId: checkoutEventId
  })
})
```

**Esforço:** 20 minutos

---

## ⚡ 4. APRIMORAR (Funciona mas pode melhorar)

### **4.1 Security Headers (Middleware)**

**Arquivo:** `src/middleware.ts`

**Atual:** CSP genérico

**Melhorar:** Adicionar domains específicos
```typescript
Content-Security-Policy: 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    *.facebook.com *.facebook.net 
    us.i.posthog.com 
    *.mercadopago.com;
  connect-src 'self' 
    *.facebook.com 
    us.i.posthog.com 
    vkclegvrqprevcdgosan.supabase.co;
```

**Esforço:** 15 minutos

---

### **4.2 Error Handling (Global)**

**Atual:** Console.error em alguns lugares

**Melhorar:** 
- Sentry ou similar para production errors
- PostHog custom event `error` com context
- User-facing error messages

**Esforço:** 1-2h (futuro, não prioridade)

---

## 🔨 5. CRIAR (Não existe, precisa construir)

### **5.1 Meta CAPI Endpoint** 🔴 CRÍTICO

**Arquivo:** `src/app/api/meta/track/route.ts`

**Status:** ❌ Não existe

**Esforço:** 4h (incluindo testes)

**Prioridade:** **MÁXIMA** - sem isso, ads desperdiçam 50%+ do budget

**Implementação:** Ver TRIPWIRE_IMPLEMENTATION_PLAN.md seção 1.1

---

### **5.2 Cookie Consent Banner** 🔴 CRÍTICO

**Arquivo:** `src/components/cookie-consent-banner.tsx`

**Status:** ❌ Não existe

**Esforço:** 3h

**Prioridade:** **MÁXIMA** - LGPD compliance + necessário para CAPI

**Implementação:** Ver TRIPWIRE_IMPLEMENTATION_PLAN.md seção 1.2

---

### **5.3 PostHog Server Library** 🟡 IMPORTANTE

**Arquivo:** `src/lib/posthog/server.ts`

**Status:** ❌ Não existe

**Esforço:** 1h (instalação + wrapper functions)

**Prioridade:** **ALTA** - necessário para analytics completo

**Implementação:** Ver TRIPWIRE_IMPLEMENTATION_PLAN.md seção 1.3

---

### **5.4 Lead Magnet Page** 🟡 IMPORTANTE

**Arquivo:** `src/app/lead-magnet/page.tsx`

**Status:** ❌ Não existe

**Esforço:** 5h (UI + form + tracking)

**Prioridade:** **ALTA** - entrada do funil

**Features:**
- Form: email, nome, segmento
- Tracking: Lead event (Meta CAPI + PostHog)
- Redirect: thank you page com link para tripwire

**Implementação:** Ver TRIPWIRE_IMPLEMENTATION_PLAN.md seção 2.1

---

### **5.5 Email Templates (Resend)**

**Arquivos:** 
- `src/emails/lead-magnet-cases.tsx` (20 cases do segmento)
- `src/emails/tripwire-diagnosis.tsx` (diagnóstico + link reunião)

**Status:** ❌ Não existem

**Esforço:** 3h (2 templates)

**Prioridade:** **MÉDIA** - importante mas não blocker

---

### **5.6 Thank You Pages**

**Arquivos:**
- `src/app/obrigado-lead/page.tsx` (após lead magnet)
- `src/app/obrigado-tripwire/page.tsx` (após purchase)

**Status:** ❌ Não existem

**Esforço:** 2h (2 páginas simples)

**Prioridade:** **MÉDIA**

---

### **5.7 Intent Scoring System** 🟢 DESEJÁVEL

**Arquivos:**
- `src/lib/stores/intent-store.ts` (Zustand store)
- `src/hooks/useIntentTracking.ts` (tracking hooks)
- `src/lib/scoring/calculate-intent.ts` (score calculator)

**Status:** ❌ Não existe

**Esforço:** 8h

**Prioridade:** **BAIXA** - implementar DEPOIS de validar tripwire

**Sinais propostos:**
1. Time on page (20 pontos)
2. Form interaction (30 pontos)
3. Case study engagement (25 pontos)
4. Video watch depth (15 pontos)
5. Page depth (5 pontos)
6. Return visit (5 pontos)

---

### **5.8 Meta Ads Campaign Structure**

**Não é código, é configuração no Meta Ads Manager**

**Campanha 1: Lead Magnet**
- Objetivo: Lead
- Budget: R$50/dia
- Audiência: Lookalike 1% ou interest

**Campanha 2: Tripwire**
- Objetivo: Purchase
- Budget: R$50/dia
- Audiência: Custom (leads últimos 7 dias)

**Esforço:** 3h (setup + criativos)

**Prioridade:** **MÉDIA** - após semana 1 de dev

---

## 🚀 6. OTIMIZAR (Funciona mas tem performance issues)

### **6.1 PostHog Event Batching**

**Atual:** Eventos enviados individualmente

**Otimizar:** Buffer de 10 eventos ou 10s

**Ganho:** Reduz requisições em 70-90%

**Prioridade:** **BAIXA** - premature optimization

**Esforço:** 2h

---

### **6.2 Meta CAPI Rate Limiting**

**Atual:** Sem retry logic

**Otimizar:** 1 retry com timeout 5s

**Ganho:** Evita perda de eventos em picos

**Prioridade:** **BAIXA** - implementar se necessário

**Esforço:** 1h

---

### **6.3 Supabase RLS Queries**

**Atual:** Sem caching

**Otimizar:** `@supabase/cache-helpers`

**Ganho:** Reduz latência 40-60%

**Prioridade:** **BAIXA** - premature optimization

**Esforço:** 2h

---

## 📊 Priorização por ROI

### **🔴 Fase 1: Foundation (Semana 1 - 20h)**

**Bloqueadores críticos (sem isso, nada funciona):**

| Item | Esforço | Impacto | ROI |
|------|---------|---------|-----|
| Meta CAPI endpoint | 4h | 🔥 40-60% menor CPL | **MÁXIMO** |
| Cookie Consent | 3h | 🔥 Compliance legal | **MÁXIMO** |
| PostHog server lib | 1h | 🔥 Analytics completo | **ALTO** |
| Lead Magnet page | 5h | 🔥 Entrada do funil | **ALTO** |
| Revisar tracking tripwire | 1h | 🔥 Eventos corretos | **ALTO** |
| Revisar lead capture API | 0.5h | 🔥 Dual tracking | **MÉDIO** |
| Revisar webhook MP | 0.5h | 🔥 Purchase event | **MÉDIO** |
| Email templates | 3h | Medium | **MÉDIO** |
| Thank you pages | 2h | Low | **BAIXO** |

**Total Fase 1:** 20h

---

### **🟡 Fase 2: Validação (Semana 2-3)**

**Testar com tráfego real:**

| Item | Esforço | Budget | Objetivo |
|------|---------|--------|----------|
| Meta Pixel install | 0.5h | - | Tracking client |
| Campaigns setup | 3h | R$700 (7 dias) | Gerar dados |
| Monitor PostHog funnel | - | - | Medir conversões |

**Total Fase 2:** 3.5h + R$700 ads

---

### **🟢 Fase 3: Otimização (Semana 7+)**

**Apenas SE math funcionar:**

| Item | Esforço | Quando |
|------|---------|--------|
| Intent scoring | 8h | Após 50+ tripwires |
| Email automation | 4h | Após validar manual |
| Event batching | 2h | Se necessário |
| Lookalike audiences | 2h | Após 100+ tripwires |

**Total Fase 3:** 16h (opcional)

---

## ✅ Checklist de Validação

### **Antes de Rodar Ads (Semana 1):**

**Meta CAPI:**
- [ ] Endpoint `/api/meta/track` criado
- [ ] Env vars configuradas (DATASET_ID, ACCESS_TOKEN)
- [ ] Test event enviado → verificado no Event Manager
- [ ] EMQ score 8-10 (verificar no Event Manager)
- [ ] Deduplication funcionando (mesmo event_id não duplica)

**Cookie Consent:**
- [ ] Banner aparece na primeira visita
- [ ] "Aceitar" salva no localStorage
- [ ] Refresh não mostra banner novamente
- [ ] PostHog opt-in funciona

**PostHog Server:**
- [ ] Package `posthog-node` instalado
- [ ] POSTHOG_API_KEY configurado
- [ ] Test event enviado → verificado no PostHog Activity
- [ ] Flush funcionando (eventos aparecem < 30s)

**Lead Magnet:**
- [ ] Página renderiza corretamente
- [ ] Form validation funciona
- [ ] Submit salva em Supabase
- [ ] Lead event enviado (CAPI + PostHog)
- [ ] Email recebido com cases

**Tripwire:**
- [ ] Página renderiza com pre-fill (email)
- [ ] ViewContent event enviado (CAPI)
- [ ] InitiateCheckout event enviado (CAPI)
- [ ] Checkout MercadoPago funciona
- [ ] Webhook processa Purchase event
- [ ] Purchase event enviado (CAPI + PostHog)

---

### **Após 7 Dias de Ads (Semana 2):**

**Métricas coletadas:**
- [ ] Lead Magnet CPL medido (não chutar)
- [ ] Email open/click rate medido
- [ ] Tripwire conversion rate medido
- [ ] CPA tripwire medido
- [ ] Receita vs gasto calculado

**Decision Point:**
- [ ] Se ≥5 tripwires vendidos + CPA < R$300 → CONTINUAR
- [ ] Se 1-4 tripwires → AJUSTAR (preço, creative, audiência)
- [ ] Se 0 tripwires → PIVOTAR (repensar oferta)

---

### **Após 20 Tripwires Vendidos (Semana 4-6):**

**Conversão tripwire → projeto:**
- [ ] Taxa de agendamento medida
- [ ] Taxa de show-up medida
- [ ] Taxa de fechamento medida
- [ ] Ticket médio calculado
- [ ] Conversão total > 15% → SCALE
- [ ] Conversão 5-15% → OTIMIZAR sales process
- [ ] Conversão < 5% → RETHINK estratégia

---

## 📝 Arquivos a Criar/Modificar (Resumo)

### **Criar (14 arquivos):**

1. ✅ `src/app/api/meta/track/route.ts` - Meta CAPI endpoint
2. ✅ `src/components/cookie-consent-banner.tsx` - Cookie consent
3. ✅ `src/lib/posthog/server.ts` - PostHog server lib
4. ✅ `src/app/lead-magnet/page.tsx` - Lead magnet page
5. ✅ `src/app/obrigado-lead/page.tsx` - Thank you lead
6. ✅ `src/app/obrigado-tripwire/page.tsx` - Thank you tripwire
7. ✅ `src/emails/lead-magnet-cases.tsx` - Email template 1
8. ✅ `src/emails/tripwire-diagnosis.tsx` - Email template 2
9. `src/lib/stores/intent-store.ts` - Intent scoring (futuro)
10. `src/hooks/useIntentTracking.ts` - Intent hooks (futuro)
11. `src/app/api/email/send-cases/route.ts` - Email API
12. `src/app/api/email/send-diagnosis/route.ts` - Email API
13. `.env.example` - Update com novas vars
14. `TRIPWIRE_IMPLEMENTATION_PLAN.md` - Plano detalhado ✅

### **Modificar (6 arquivos):**

1. ✅ `src/app/api/leads/capture/route.ts` - Adicionar dual tracking
2. ✅ `src/app/api/webhooks/mercadopago/route.ts` - Adicionar Purchase event
3. ✅ `src/app/tripwire/page.tsx` - Adicionar CAPI tracking
4. ✅ `src/hooks/useMetaTracking.ts` - Mudar endpoint
5. ✅ `src/middleware.ts` - Atualizar CSP
6. ✅ `src/app/layout.tsx` - Adicionar Meta Pixel + Cookie Banner

### **Configurar (env vars):**

```bash
# Adicionar ao .env.local:
POSTHOG_API_KEY=phx_... # Obter no PostHog Settings
NEXT_PUBLIC_META_PIXEL_ID=... # Obter no Meta Events Manager
```

---

## 🎯 Quick Wins (Implementar Hoje)

**Se você tem apenas 4-6h disponíveis:**

1. **Meta CAPI endpoint** (4h) - 40-60% impacto em CPL
2. **Cookie Consent** (2h) - Legal compliance

**Total:** 6h, ganho MÁXIMO

**Resultado:** Pode começar a rodar ads com tracking correto.

---

**Data última atualização:** 27 de outubro de 2025
