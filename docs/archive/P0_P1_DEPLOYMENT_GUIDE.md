# 🚀 P0 + P1 Implementation - Deployment Guide

## ✅ Implementações Concluídas

### **Edge Functions (4 criadas)**
1. ✅ `stripe-webhook` - Gerencia pagamentos e assinaturas
2. ✅ `welcome-email` - Onboarding automático de novos usuários
3. ✅ `lead-notification` - Notifica equipe de vendas + nurture
4. ✅ `generate-pdf-report` - Exporta análises em PDF profissional
5. ✅ `lighthouse-scan` - Melhorado com CrUX data (real user metrics)

### **Database Migrations (3 criadas)**
1. ✅ `20251006000000_add_sensitive_data_encryption.sql` - Criptografia pgcrypto
2. ✅ `20251006000001_tier_enforcement_and_automation.sql` - Tier limits + automações
3. ✅ `20251006000002_add_crux_data_column.sql` - Campo para dados CrUX

---

## 📋 Checklist de Deployment

### **Fase 1: Preparação (5 min)**

- [ ] **1.1 Verificar variáveis de ambiente**
```bash
# Verificar .env.local
cat .env.local | grep -E "STRIPE|RESEND|SUPABASE"
```

Variáveis necessárias:
```bash
# Supabase
SUPABASE_URL=https://vkclegvrqprevcdgosan.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend (Email)
RESEND_API_KEY=re_FfQAjozL_6GzKoCpiANzqmv5TxFRhg2ou

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_live_...  # ou sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...  # ou pk_test_...

# Admin
ADMIN_EMAIL=arco@consultingarco.com

# Optional (P2)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
BROWSERLESS_API_KEY=... # para PDF rendering
```

---

### **Fase 2: Database Migrations (2 min)**

- [ ] **2.1 Aplicar migrations**
```bash
cd /home/jpcardozx/projetos/arco

# Apply migrations
npx supabase db push --include-all

# Verify
npx supabase migration list
```

- [ ] **2.2 Verificar tier enforcement**
```bash
# Test tier limit (should fail after 3 analyses for FREE user)
npx supabase db query "
  SELECT enforce_tier_limits();
"
```

- [ ] **2.3 Configurar cron jobs** (via Supabase Dashboard)
```sql
-- Database → Extensions → pg_cron (enable)

-- Then run in SQL Editor:
SELECT cron.schedule(
  'reset-monthly-limits',
  '0 0 1 * *',
  $$ SELECT reset_monthly_limits() $$
);

SELECT cron.schedule(
  'archive-old-analyses',
  '0 2 * * *',
  $$ SELECT archive_old_analyses() $$
);
```

---

### **Fase 3: Edge Functions Deployment (10 min)**

- [ ] **3.1 Deploy todas edge functions**
```bash
cd /home/jpcardozx/projetos/arco

# Deploy Stripe webhook
npx supabase functions deploy stripe-webhook --project-ref vkclegvrqprevcdgosan

# Deploy Welcome email
npx supabase functions deploy welcome-email --project-ref vkclegvrqprevcdgosan

# Deploy Lead notification
npx supabase functions deploy lead-notification --project-ref vkclegvrqprevcdgosan

# Deploy PDF generator
npx supabase functions deploy generate-pdf-report --project-ref vkclegvrqprevcdgosan

# Deploy Lighthouse (updated with CrUX)
npx supabase functions deploy lighthouse-scan --project-ref vkclegvrqprevcdgosan
```

- [ ] **3.2 Configurar secrets**
```bash
# Set secrets for edge functions
npx supabase secrets set \
  RESEND_API_KEY="re_FfQAjozL_6GzKoCpiANzqmv5TxFRhg2ou" \
  STRIPE_SECRET_KEY="sk_test_..." \
  STRIPE_WEBHOOK_SECRET="whsec_..." \
  ADMIN_EMAIL="arco@consultingarco.com" \
  SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..." \
  --project-ref vkclegvrqprevcdgosan
```

- [ ] **3.3 Verificar deploy**
```bash
# List deployed functions
npx supabase functions list --project-ref vkclegvrqprevcdgosan

# Check logs
npx supabase functions logs stripe-webhook --project-ref vkclegvrqprevcdgosan
```

---

### **Fase 4: Webhook Configuration (15 min)**

#### **4.1 Stripe Webhooks**

- [ ] Ir para [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
- [ ] Clicar em "Add endpoint"
- [ ] Configurar:

```
Endpoint URL:
https://vkclegvrqprevcdgosan.supabase.co/functions/v1/stripe-webhook

Events to send:
✅ checkout.session.completed
✅ customer.subscription.updated
✅ customer.subscription.deleted
✅ invoice.payment_succeeded
✅ invoice.payment_failed

Description: ARCO Payment Webhook
```

- [ ] Copiar **Signing secret** (começa com `whsec_`)
- [ ] Adicionar ao secrets:
```bash
npx supabase secrets set STRIPE_WEBHOOK_SECRET="whsec_..." --project-ref vkclegvrqprevcdgosan
```

#### **4.2 Supabase Database Webhooks**

- [ ] Ir para [Supabase Dashboard → Database → Webhooks](https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/database/webhooks)

**Webhook 1: Welcome Email (on user signup)**
```
Name: welcome-email-on-signup
Table: auth.users
Events: INSERT
Type: HTTP Request
URL: https://vkclegvrqprevcdgosan.supabase.co/functions/v1/welcome-email
Method: POST
Headers:
  Content-Type: application/json
  Authorization: Bearer <SUPABASE_ANON_KEY>
```

**Webhook 2: Lead Notification (on new lead)**
```
Name: lead-notification
Table: public.leads
Events: INSERT
Type: HTTP Request
URL: https://vkclegvrqprevcdgosan.supabase.co/functions/v1/lead-notification
Method: POST
Headers:
  Content-Type: application/json
  Authorization: Bearer <SUPABASE_ANON_KEY>
```

**Webhook 3: Lighthouse Scan (already exists)**
```
Name: lighthouse-scan-trigger
Table: public.analysis_requests
Events: INSERT
Type: HTTP Request
URL: https://vkclegvrqprevcdgosan.supabase.co/functions/v1/lighthouse-scan
Method: POST
```

---

### **Fase 5: Storage Configuration (5 min)**

- [ ] **5.1 Criar bucket para relatórios**

Via [Supabase Dashboard → Storage](https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/storage/buckets):
```
Bucket name: reports
Public: Yes (para download de PDFs)
File size limit: 10 MB
Allowed MIME types: application/pdf
```

- [ ] **5.2 RLS Policy para reports bucket**
```sql
-- Users can only access their own reports
CREATE POLICY "Users can view own reports"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'reports'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Service role can manage all reports"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'reports');
```

---

### **Fase 6: Frontend Integration (15 min)**

#### **6.1 Criar página de Billing/Pricing**

- [ ] Implementar Stripe Checkout:
```typescript
// src/app/pricing/page.tsx

export default async function PricingPage() {
  const createCheckoutSession = async () => {
    'use server'
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: 'price_XXX', // Stripe Price ID
        quantity: 1,
      }],
      success_url: 'https://arco.consultingarco.com/dashboard?success=true',
      cancel_url: 'https://arco.consultingarco.com/pricing?canceled=true',
      metadata: {
        user_id: user!.id,
      },
      customer_email: user!.email,
    })

    redirect(session.url!)
  }

  // ... render pricing cards
}
```

#### **6.2 Adicionar botão de exportar PDF**

```typescript
// src/app/dashboard/analyses/[id]/page.tsx

async function exportToPDF(analysisId: string) {
  const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysisId }),
  })

  const { pdf_url } = await response.json()
  window.open(pdf_url, '_blank')
}

// Button component
<Button onClick={() => exportToPDF(analysis.id)}>
  Exportar PDF →
</Button>
```

#### **6.3 Criar API route para PDF**

```typescript
// src/app/api/generate-pdf/route.ts

import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { analysisId } = await req.json()
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Call edge function
  const response = await fetch(
    `https://vkclegvrqprevcdgosan.supabase.co/functions/v1/generate-pdf-report`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        analysisId,
        userId: user.id,
      }),
    }
  )

  const data = await response.json()
  return NextResponse.json(data)
}
```

#### **6.4 Mostrar tier limits no dashboard**

```typescript
// src/app/dashboard/page.tsx

const { data: usage } = await supabase.rpc('get_user_usage_stats', {
  p_user_id: user.id,
})

// Render usage bar
<div className="mb-8">
  <div className="flex justify-between mb-2">
    <span>Análises este mês</span>
    <span>{usage.analyses_used} / {usage.analyses_limit}</span>
  </div>
  <div className="h-2 bg-gray-200 rounded">
    <div
      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded"
      style={{ width: `${usage.analyses_percentage}%` }}
    />
  </div>
</div>
```

---

### **Fase 7: Testing (20 min)**

#### **7.1 Test Stripe Webhook**

- [ ] Usar [Stripe CLI](https://stripe.com/docs/stripe-cli):
```bash
stripe listen --forward-to https://vkclegvrqprevcdgosan.supabase.co/functions/v1/stripe-webhook

# Trigger test event
stripe trigger checkout.session.completed
```

- [ ] Verificar logs:
```bash
npx supabase functions logs stripe-webhook --project-ref vkclegvrqprevcdgosan
```

#### **7.2 Test Welcome Email**

- [ ] Criar novo usuário via signup
- [ ] Verificar email recebido (inbox)
- [ ] Verificar tasks criadas:
```sql
SELECT * FROM tasks WHERE type = 'onboarding' ORDER BY created_at DESC LIMIT 3;
```

#### **7.3 Test Lead Notification**

- [ ] Criar lead via formulário
- [ ] Verificar:
  - [ ] Email admin recebido
  - [ ] Slack notification (se configurado)
  - [ ] Lead nurture email enviado
  - [ ] Task criada para follow-up

#### **7.4 Test Tier Enforcement**

- [ ] Como FREE user, fazer 3 análises
- [ ] Tentar 4ª análise → deve falhar com erro:
```
Limite de análises atingido (3 de 3).
Faça upgrade para o plano PRO para continuar.
```

#### **7.5 Test PDF Generation**

- [ ] Clicar em "Exportar PDF" em análise
- [ ] Verificar PDF baixado
- [ ] Verificar arquivo em Storage → reports bucket

#### **7.6 Test CrUX Data**

- [ ] Fazer nova análise
- [ ] Verificar `analysis_results.crux_data`:
```sql
SELECT
  id,
  arco_index,
  crux_data->>'overall_category' as crux_category,
  crux_data->'metrics' as crux_metrics
FROM analysis_results
ORDER BY created_at DESC
LIMIT 1;
```

---

## 🔐 Security Checklist

- [ ] **Todas as secrets configuradas** (não há hardcoded keys)
- [ ] **RLS habilitado** em todas as tabelas
- [ ] **Webhooks verificam signatures** (Stripe, Supabase)
- [ ] **Edge functions validam auth** (JWT tokens)
- [ ] **CORS configurado** corretamente
- [ ] **Storage buckets com RLS** (reports, cloud_files)

---

## 📊 Monitoring Setup

### **Dashboard de Monitoramento**

- [ ] **Supabase Dashboard**
  - Database → Logs (erros SQL)
  - Functions → Logs (edge function errors)
  - Storage → Usage

- [ ] **Stripe Dashboard**
  - Webhooks → Events (success/failure rate)
  - Billing → Subscriptions (active users)

- [ ] **Resend Dashboard**
  - Emails → Logs (delivery rate)
  - Analytics → Open rate

### **Alertas Recomendados**

```bash
# Configurar via Slack/Email:
- Webhook failure (> 5% error rate)
- Edge function timeout (> 30s)
- Storage limit reached (> 80%)
- Stripe payment failed
```

---

## 🚀 Go Live Checklist

### **Production Ready**

- [ ] ✅ Migrations aplicadas
- [ ] ✅ Edge functions deployed
- [ ] ✅ Webhooks configurados
- [ ] ✅ Secrets configuradas
- [ ] ✅ Storage buckets criados
- [ ] ✅ Frontend integrado
- [ ] ✅ Testes passando
- [ ] ✅ Monitoring ativo

### **Rollout Plan**

1. **Soft Launch (1 semana)**
   - [ ] Ativar para 10% dos usuários (feature flag)
   - [ ] Monitorar métricas: conversion rate, error rate
   - [ ] Coletar feedback

2. **Full Launch**
   - [ ] Ativar para 100% dos usuários
   - [ ] Anunciar novos features (email, blog post)
   - [ ] Monitorar escalabilidade

---

## 📝 Próximos Passos (P2/P3)

Após P0+P1 estável, implementar:

- [ ] WhatsApp notifications (Twilio)
- [ ] CRM sync (HubSpot/Pipedrive)
- [ ] AI insights (GPT-4)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

## 🆘 Troubleshooting

### **Problema: Webhook não dispara**

```bash
# Check webhook status
npx supabase functions logs <function-name> --project-ref vkclegvrqprevcdgosan

# Verify webhook URL
curl -X POST https://vkclegvrqprevcdgosan.supabase.co/functions/v1/<function-name> \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### **Problema: Email não envia**

```bash
# Test Resend API
curl https://api.resend.com/emails \
  -H "Authorization: Bearer re_FfQAjozL_6GzKoCpiANzqmv5TxFRhg2ou" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "arco@consultingarco.com",
    "to": "test@example.com",
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'
```

### **Problema: Tier limit não funciona**

```sql
-- Verify trigger exists
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'trigger_enforce_tier_limits';

-- Test manually
DO $$
DECLARE
  test_user_id UUID := 'user-id-here';
BEGIN
  INSERT INTO analysis_requests (user_id, url, status)
  VALUES (test_user_id, 'https://example.com', 'pending');
END $$;
```

---

## ✅ Deployment Complete!

Após completar todos os steps acima, o sistema P0+P1 estará **production-ready** com:

✅ **5 Edge Functions** operacionais
✅ **Tier enforcement** automático
✅ **Emails transacionais** (welcome, nurture, notifications)
✅ **PDF reports** profissionais
✅ **Stripe integration** completa
✅ **CrUX data** (real user metrics)
✅ **Automações de negócio** (comissões, leads, archive)

---

**Última atualização:** 2025-10-06
**Tempo estimado de deployment:** 1-2 horas
**Responsável:** Development Team
