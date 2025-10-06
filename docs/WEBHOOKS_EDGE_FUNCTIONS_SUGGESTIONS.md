w# 🚀 Webhooks & Edge Functions - Sugestões Estratégicas

## 📋 Índice
1. [Webhooks Prioritários](#webhooks-prioritários)
2. [Edge Functions Sugeridas](#edge-functions-sugeridas)
3. [Integrações Externas](#integrações-externas)
4. [Automações de Negócio](#automações-de-negócio)
5. [Implementação](#implementação)

---

## 🎯 Webhooks Prioritários

### **1. Stripe Payment Webhooks** (P0 - Critical)

**Trigger:** Eventos do Stripe
**Endpoint:** `/api/webhooks/stripe`

**Eventos essenciais:**
```typescript
// supabase/functions/stripe-webhook/index.ts

interface StripeWebhookEvents {
  'checkout.session.completed': {
    // Usuário finalizou pagamento
    action: 'Upgrade tier FREE → PAID'
    update: 'user_profiles.tier = paid'
  }

  'customer.subscription.updated': {
    // Assinatura renovada/alterada
    action: 'Atualizar subscription_status'
    update: 'user_profiles.subscription_status'
  }

  'customer.subscription.deleted': {
    // Cancelamento de assinatura
    action: 'Downgrade PAID → FREE'
    update: 'user_profiles.tier = free'
  }

  'invoice.payment_succeeded': {
    // Pagamento confirmado
    action: 'Criar invoice em invoices table'
    notification: 'Email: "Pagamento confirmado"'
  }

  'invoice.payment_failed': {
    // Pagamento falhou
    action: 'Atualizar status para past_due'
    notification: 'Email: "Problema no pagamento"'
  }
}
```

**Implementação:**
```bash
supabase functions new stripe-webhook
```

---

### **2. Analysis Request Webhook** (P0 - Já existe)

**Status:** ✅ Implementado (`lighthouse-scan`)
**Trigger:** `INSERT ON analysis_requests`
**Action:** Executa Lighthouse scan via PageSpeed API

**Melhorias sugeridas:**
- [ ] Adicionar CrUX data (real user metrics)
- [ ] Webhook callback ao completar (notificar frontend)
- [ ] Retry queue para falhas

---

### **3. User Signup Webhook** (P1)

**Trigger:** `INSERT ON auth.users`
**Endpoint:** Edge Function `welcome-email`

**Ações:**
1. Criar `user_profiles` (✅ já feito via trigger)
2. Enviar email de boas-vindas (Resend)
3. Criar onboarding tasks
4. Adicionar ao CRM (HubSpot/Pipedrive)

```typescript
// supabase/functions/welcome-email/index.ts

serve(async (req) => {
  const { user } = await req.json()

  // 1. Send welcome email via Resend
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'arco@consultingarco.com',
      to: user.email,
      subject: 'Bem-vindo à ARCO! 🚀',
      html: WelcomeEmailTemplate(user),
    }),
  })

  // 2. Create onboarding tasks
  await supabase.from('tasks').insert({
    user_id: user.id,
    title: 'Complete seu perfil',
    type: 'onboarding',
    status: 'pending',
  })

  // 3. Add to CRM
  await addToCRM(user)

  return new Response('OK')
})
```

---

### **4. Lead Capture Webhook** (P1)

**Trigger:** `INSERT ON leads`
**Action:** Notificar vendas + iniciar nurture flow

```typescript
// supabase/functions/lead-notification/index.ts

serve(async (req) => {
  const { record: lead } = await req.json()

  // 1. Notify sales team (Slack/Email)
  await notifySalesTeam({
    email: lead.email,
    company: lead.company_name,
    source: lead.source,
  })

  // 2. Start email nurture sequence (Resend)
  await startNurtureSequence(lead.email)

  // 3. Create follow-up task for admin
  await supabase.from('tasks').insert({
    user_id: lead.assigned_to,
    title: `Follow-up: ${lead.full_name}`,
    type: 'lead_followup',
    priority: 'high',
    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
  })

  return new Response('OK')
})
```

---

### **5. Invoice Status Webhook** (P2)

**Trigger:** `UPDATE ON invoices WHERE status = 'paid'`
**Action:** Processar comissões + notificar cliente

```typescript
// supabase/functions/invoice-paid/index.ts

serve(async (req) => {
  const { record: invoice } = await req.json()

  // 1. Calculate and create commissions
  const commission = invoice.total_amount * 0.10 // 10%
  await supabase.from('commissions').insert({
    invoice_id: invoice.id,
    user_id: invoice.assigned_to,
    amount: commission,
    status: 'pending',
  })

  // 2. Send payment confirmation email
  await sendPaymentConfirmation(invoice)

  // 3. Update user limits (reset monthly_analysis_count if needed)
  if (invoice.type === 'subscription') {
    await supabase
      .from('user_profiles')
      .update({ monthly_analysis_count: 0 })
      .eq('id', invoice.user_id)
  }

  return new Response('OK')
})
```

---

## 🔧 Edge Functions Sugeridas

### **6. PDF Report Generator** (P1)

**Trigger:** Manual (dashboard button)
**Purpose:** Gerar relatório PDF das análises

```typescript
// supabase/functions/generate-pdf-report/index.ts

import { PDFDocument } from 'pdf-lib'

serve(async (req) => {
  const { analysisId } = await req.json()

  // 1. Fetch analysis data
  const { data: analysis } = await supabase
    .from('analysis_results')
    .select('*, analysis_requests(*)')
    .eq('analysis_id', analysisId)
    .single()

  // 2. Generate PDF
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()

  // Add ARCO branding, charts, scores
  page.drawText(`ARCO Index: ${analysis.arco_index}`, {
    x: 50,
    y: 700,
    size: 24,
  })

  const pdfBytes = await pdfDoc.save()

  // 3. Upload to storage
  const { data: upload } = await supabase.storage
    .from('reports')
    .upload(`${analysisId}.pdf`, pdfBytes, {
      contentType: 'application/pdf',
    })

  return new Response(JSON.stringify({ url: upload.path }))
})
```

---

### **7. WhatsApp Notification** (P2)

**Trigger:** Eventos críticos (análise completa, pagamento confirmado)
**Integration:** Twilio / WhatsApp Business API

```typescript
// supabase/functions/whatsapp-notify/index.ts

serve(async (req) => {
  const { phone, message, templateId } = await req.json()

  await fetch('https://graph.facebook.com/v18.0/PHONE_ID/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template',
      template: {
        name: templateId, // 'analysis_complete', 'payment_confirmed'
        language: { code: 'pt_BR' },
      },
    }),
  })

  return new Response('OK')
})
```

---

### **8. Data Export Function** (P2)

**Trigger:** Manual (export button)
**Purpose:** Exportar dados do dashboard (CSV/JSON)

```typescript
// supabase/functions/export-data/index.ts

serve(async (req) => {
  const { userId, format, dataType } = await req.json()

  let query = supabase.from(dataType).select('*').eq('user_id', userId)

  const { data } = await query

  if (format === 'csv') {
    const csv = convertToCSV(data)
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${dataType}.csv`,
      },
    })
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

---

### **9. AI Analysis Insights** (P3 - Future)

**Trigger:** Após análise Lighthouse
**Purpose:** GPT-4 gera insights acionáveis

```typescript
// supabase/functions/ai-insights/index.ts

serve(async (req) => {
  const { analysisId } = await req.json()

  const { data: analysis } = await supabase
    .from('analysis_results')
    .select('lighthouse_data')
    .eq('analysis_id', analysisId)
    .single()

  // Call OpenAI API
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: 'Você é um consultor de performance web da ARCO.',
      },
      {
        role: 'user',
        content: `Analise este Lighthouse report e sugira 3 ações prioritárias: ${JSON.stringify(analysis.lighthouse_data)}`,
      },
    ],
  })

  const insights = completion.choices[0].message.content

  // Save insights
  await supabase
    .from('analysis_results')
    .update({ ai_insights: insights })
    .eq('analysis_id', analysisId)

  return new Response(JSON.stringify({ insights }))
})
```

---

### **10. Scheduled Jobs (Cron)** (P2)

**Via:** Supabase Edge Functions + pg_cron

```sql
-- Reset monthly limits (1st of every month)
SELECT cron.schedule(
  'reset-monthly-limits',
  '0 0 1 * *',
  $$
  UPDATE user_profiles
  SET monthly_analysis_count = 0,
      monthly_support_tickets = 0
  WHERE tier = 'paid'
  $$
);

-- Send usage summary email (end of month)
SELECT cron.schedule(
  'monthly-usage-report',
  '0 9 28 * *',
  $$ SELECT net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/monthly-report',
    headers := '{"Authorization": "Bearer <anon-key>"}'
  ) $$
);

-- Archive old analyses (6 months+)
SELECT cron.schedule(
  'archive-old-analyses',
  '0 2 * * 0', -- Sundays 2am
  $$
  UPDATE analysis_requests
  SET status = 'archived'
  WHERE created_at < NOW() - INTERVAL '6 months'
  $$
);
```

---

## 🔗 Integrações Externas

### **11. CRM Integration** (HubSpot/Pipedrive)

**Eventos:**
- Novo lead → Create contact in CRM
- Análise completa → Add activity note
- Upgrade para PAID → Update deal stage

```typescript
// supabase/functions/crm-sync/index.ts

async function syncToCRM(lead: Lead) {
  // HubSpot
  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        email: lead.email,
        firstname: lead.full_name?.split(' ')[0],
        company: lead.company_name,
        lifecyclestage: 'lead',
        lead_source: lead.source,
      },
    }),
  })
}
```

---

### **12. Google Analytics 4 Tracking**

**Events to track:**
- `analysis_completed`
- `subscription_started`
- `report_downloaded`

```typescript
// supabase/functions/ga4-track/index.ts

async function trackGA4(event: string, params: Record<string, any>) {
  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA4_ID}&api_secret=${GA4_SECRET}`, {
    method: 'POST',
    body: JSON.stringify({
      client_id: params.user_id,
      events: [{
        name: event,
        params,
      }],
    }),
  })
}
```

---

## 📊 Automações de Negócio

### **13. Tier Enforcement** (P0)

**Database Function + RLS:**

```sql
-- Prevent FREE users from exceeding limits
CREATE OR REPLACE FUNCTION check_analysis_limit()
RETURNS TRIGGER AS $$
DECLARE
  user_tier TEXT;
  current_count INT;
BEGIN
  SELECT tier, monthly_analysis_count
  INTO user_tier, current_count
  FROM user_profiles
  WHERE id = NEW.user_id;

  -- FREE tier: 3 analyses/month
  IF user_tier = 'free' AND current_count >= 3 THEN
    RAISE EXCEPTION 'Limite de análises atingido. Faça upgrade para continuar.';
  END IF;

  -- Increment counter
  UPDATE user_profiles
  SET monthly_analysis_count = monthly_analysis_count + 1
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_analysis_limit
  BEFORE INSERT ON analysis_requests
  FOR EACH ROW
  EXECUTE FUNCTION check_analysis_limit();
```

---

### **14. Auto-Archive Completed Analyses** (P2)

```sql
-- Move old analyses to archive table (save storage)
CREATE TABLE analysis_requests_archive (LIKE analysis_requests INCLUDING ALL);

SELECT cron.schedule(
  'archive-completed-analyses',
  '0 3 * * *', -- Daily 3am
  $$
  WITH moved AS (
    DELETE FROM analysis_requests
    WHERE status = 'completed'
      AND created_at < NOW() - INTERVAL '90 days'
    RETURNING *
  )
  INSERT INTO analysis_requests_archive
  SELECT * FROM moved
  $$
);
```

---

## 🚀 Implementação

### **Passo 1: Deploy Edge Functions**

```bash
# Create new function
supabase functions new stripe-webhook

# Deploy
supabase functions deploy stripe-webhook --project-ref vkclegvrqprevcdgosan

# Set secrets
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx
supabase secrets set RESEND_API_KEY=re_xxx
```

---

### **Passo 2: Configurar Webhooks**

**Stripe:**
```
Dashboard → Developers → Webhooks → Add endpoint
URL: https://vkclegvrqprevcdgosan.supabase.co/functions/v1/stripe-webhook
Events: checkout.session.completed, customer.subscription.*
```

**Supabase Database Webhooks:**
```sql
-- Via Supabase Dashboard: Database → Webhooks → Create webhook
-- Or via SQL:
SELECT net.http_post(
  url := 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/lead-notification',
  headers := '{"Content-Type": "application/json"}',
  body := row_to_json(NEW)
) FROM leads WHERE NEW.id IS NOT NULL;
```

---

### **Passo 3: Monitoramento**

**Logs:**
```bash
# Real-time logs
supabase functions logs stripe-webhook --tail

# Check invocations
supabase functions list --project-ref vkclegvrqprevcdgosan
```

**Alertas:**
- Configurar Sentry para erros
- Slack notifications para falhas críticas
- Datadog/CloudWatch para métricas

---

## ✅ Checklist de Implementação

### **Fase 1 - Core (Sprint 1)**
- [ ] Stripe payment webhooks
- [ ] Welcome email on signup
- [ ] Lead capture notifications
- [ ] PDF report generator

### **Fase 2 - Automação (Sprint 2)**
- [ ] Invoice processing + commissions
- [ ] WhatsApp notifications
- [ ] CRM sync (HubSpot)
- [ ] Tier enforcement triggers

### **Fase 3 - Advanced (Sprint 3)**
- [ ] AI insights (GPT-4)
- [ ] Data export function
- [ ] GA4 tracking
- [ ] Scheduled jobs (cron)

---

## 🔐 Segurança

**Sempre validar webhooks:**

```typescript
// Stripe webhook signature verification
const sig = req.headers.get('stripe-signature')
const event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)

// Supabase webhook JWT verification
const jwt = req.headers.get('authorization')
const { error } = await supabase.auth.getUser(jwt)
if (error) throw new Error('Unauthorized')
```

---

## 📞 Próximos Passos

1. **Priorizar:** Qual webhook/function implementar primeiro?
2. **Secrets:** Adicionar API keys ao Supabase Vault
3. **Testing:** Configurar ambiente de staging
4. **Monitoring:** Setup Sentry + Slack alerts

---

**Última atualização:** 2025-10-06
**Responsável:** Development Team
