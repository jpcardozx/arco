# 🔍 Auditoria Completa: Sistema de Captura de Leads

**Data:** 18 de outubro de 2025  
**Objetivo:** Identificar o que já existe vs o que precisa ser desenvolvido  
**Status:** Sistema parcialmente implementado - Requer afinamento

---

## 📊 Status Geral: **60% Implementado**

```
✅ Funcional  ❌ Faltando  ⚠️ Precisa Afinamento

DATABASE:       ✅ 90% - Tabela exists, RLS configurado
API ROUTES:     ⚠️ 40% - Apenas lead-magnet, falta API genérica
FORMULÁRIOS:    ❌ 20% - Sem landing page de captura
WEBHOOKS:       ✅ 80% - Sistema webhook funcional (Mercadopago)
NOTIFICAÇÕES:   ⚠️ 50% - Email OK, falta Slack/WhatsApp
INTEGRAÇÕES:    ❌ 10% - Sem CRM integration
ANALYTICS:      ❌ 0%  - Sem tracking de conversão
```

---

## ✅ O QUE JÁ TEMOS (Funcional)

### 1. **Database - Tabela `leads`** ✅

**Status:** IMPLEMENTADO e FUNCIONAL

**Localização:** Supabase (visible via UI)

**Schema Atual:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Dados básicos
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  
  -- Tracking
  source TEXT, -- 'url_analyzer', 'landing_page', 'referral', 'direct'
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted'
  
  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  analysis_id UUID REFERENCES analysis(id),
  
  -- Metadata (JSONB)
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS Policies:** ✅ Configurado
```sql
✅ Service role has full access
✅ Users can read their assigned leads  
✅ Anyone can insert new leads (anon)
```

**Arquivo:** `/APPLY_LEADS_RLS.sql`

---

### 2. **API Route: Lead Magnet** ✅

**Status:** IMPLEMENTADO e FUNCIONAL

**Arquivo:** `/src/app/api/lead-magnet/route.ts`

**Funcionalidades:**
```typescript
✅ Validação com Zod
✅ Insert no Supabase (tabela leads)
✅ Envio de email via Resend
✅ Metadata tracking (IP, user-agent)
✅ Error handling robusto
✅ Response types padronizados
```

**Endpoint:**
```
POST /api/lead-magnet
Body: { name, email, company, phone? }
```

**Fluxo:**
```
1. Recebe dados do form
2. Valida com Zod
3. Salva no Supabase (leads table)
4. Envia email de boas-vindas (Resend)
5. Retorna success/error
```

**Campos salvos:**
```typescript
{
  full_name: string,
  email: string,
  company_name: string,
  phone: string | null,
  source: 'landing_page',
  status: 'new',
  metadata: {
    lead_magnet: 'checklist-performance',
    form_type: 'lead_magnet',
    ip: string,
    user_agent: string,
    submitted_at: ISO Date
  }
}
```

---

### 3. **Server Actions: Leads Management** ✅

**Status:** IMPLEMENTADO para Dashboard

**Arquivo:** `/src/app/dashboard/leads/actions.ts`

**Funcionalidades:**
```typescript
✅ getLeads() - Lista todos os leads do usuário
✅ getLeadById(id) - Busca lead específico
✅ createLead(data) - Cria novo lead (autenticado)
✅ updateLead(id, data) - Atualiza lead
✅ deleteLead(id) - Remove lead
✅ getLeadStats() - Estatísticas de conversão
```

**Uso:** Dashboard interno (não para landing pages públicas)

---

### 4. **Sistema de Webhooks** ✅

**Status:** FUNCIONAL (Mercadopago)

**Tabela:** `webhook_events`

**Schema:**
```sql
CREATE TABLE webhook_events (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  gateway TEXT NOT NULL, -- 'mercadopago', 'stripe', etc
  gateway_event_id TEXT UNIQUE,
  event_type TEXT,
  payload JSONB,
  
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0
);
```

**API Routes:**
```
✅ POST /api/webhooks/mercadopago/route.ts
✅ POST /api/webhooks/mercadopago/v2/route.ts
```

**Monitor:** ✅ `/monitor/webhooks` - Dashboard em tempo real

---

### 5. **Email System (Resend)** ✅

**Status:** CONFIGURADO e FUNCIONAL

**Provider:** Resend API

**Template:** Email HTML inline (lead-magnet)

**Funcionalidades:**
```typescript
✅ Envio de email transacional
✅ Template HTML responsivo
✅ Personalização (nome, empresa)
✅ Link para download de PDF
✅ Error handling
```

**Domínio:** `arco@consultingarco.com`

---

### 6. **Dashboard de Leads** ⚠️

**Status:** PARCIALMENTE IMPLEMENTADO

**Arquivos:**
```
✅ /src/app/dashboard/leads/page.tsx
✅ /src/app/dashboard/leads/actions.ts
✅ /src/app/dashboard/components/modules/leads/LeadsPipeline.tsx
```

**Funcionalidades:**
```
✅ Visualização de leads
✅ Filtros por status
✅ Atribuição de leads
⚠️ Pipeline drag-and-drop (existe mas precisa refinamento)
❌ Histórico de interações
❌ Tags e segmentação
```

---

## ❌ O QUE FALTA (Precisa Desenvolver)

### 1. **Landing Page de Captura** ❌

**Status:** NÃO IMPLEMENTADO

**Necessário:**
```typescript
// Estrutura recomendada
/lp/[campaign-slug]/page.tsx         ← Landing dinâmica
/lp/[campaign-slug]/success/page.tsx ← Thank you page

// Componentes
HeroSection.tsx       ← Hero + CTA principal
LeadCaptureForm.tsx   ← Form otimizado p/ conversão
SocialProofSection.tsx ← Depoimentos + logos
FAQSection.tsx        ← Accordion com objeções
CTASection.tsx        ← Call-to-action secundário
```

**Recursos Faltantes:**
- ❌ Layout de landing page
- ❌ Formulário de captura público
- ❌ Thank you page
- ❌ Success tracking
- ❌ UTM parameters handling
- ❌ A/B testing setup

---

### 2. **API Route Genérica de Captura** ❌

**Status:** NÃO IMPLEMENTADO

**Necessário:** `/api/leads/capture/route.ts`

**Diferença do lead-magnet:**
```typescript
// Lead Magnet (específico)
- Campo: lead_magnet fixo
- Email: template fixo (checklist)
- Source: 'landing_page' fixo

// API Genérica (flexível) ❌ FALTA
- Qualquer campanha
- Templates dinâmicos
- Multiple sources
- UTM tracking completo
- Custom metadata
```

**Schema Sugerido:**
```typescript
POST /api/leads/capture
{
  // Lead data
  name: string,
  email: string,
  phone?: string,
  company?: string,
  
  // Campaign tracking
  campaign_slug: string,     // ❌ Novo
  landing_page_url: string,  // ❌ Novo
  
  // UTM parameters
  utm_source?: string,       // ❌ Novo
  utm_medium?: string,       // ❌ Novo
  utm_campaign?: string,     // ❌ Novo
  utm_content?: string,      // ❌ Novo
  utm_term?: string,         // ❌ Novo
  
  // GDPR/LGPD
  consent_marketing: boolean, // ❌ Novo
  consent_terms: boolean,     // ❌ Novo
}
```

---

### 3. **Tabela de Campanhas** ❌

**Status:** NÃO EXISTE

**Necessário:** Tabela `campaigns` para gerenciar landing pages

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Identificação
  slug TEXT UNIQUE NOT NULL,           -- ❌ Novo
  name TEXT NOT NULL,                  -- ❌ Novo
  description TEXT,
  
  -- Conteúdo da Landing
  hero_title TEXT NOT NULL,            -- ❌ Novo
  hero_subtitle TEXT,                  -- ❌ Novo
  cta_text TEXT DEFAULT 'Começar',     -- ❌ Novo
  cta_button_color TEXT,               -- ❌ Novo
  
  -- Tracking
  total_views INTEGER DEFAULT 0,       -- ❌ Novo
  total_leads INTEGER DEFAULT 0,       -- ❌ Novo
  conversion_rate DECIMAL(5,2),        -- ❌ Novo
  
  -- Configuração
  is_active BOOLEAN DEFAULT true,      -- ❌ Novo
  start_date TIMESTAMPTZ,              -- ❌ Novo
  end_date TIMESTAMPTZ,                -- ❌ Novo
  
  -- A/B Testing
  variant TEXT DEFAULT 'A',            -- ❌ Novo
  
  -- Email Config
  email_template_id TEXT,              -- ❌ Novo
  thank_you_page_url TEXT,             -- ❌ Novo
  
  -- Integração
  crm_integration_enabled BOOLEAN DEFAULT false, -- ❌ Novo
  webhook_url TEXT                     -- ❌ Novo
);
```

**Uso:**
```typescript
// Buscar campanha por slug
const campaign = await getCampaignBySlug('lancamento-2025')

// Renderizar landing com conteúdo dinâmico
<h1>{campaign.hero_title}</h1>
<button>{campaign.cta_text}</button>
```

---

### 4. **Campos Adicionais na Tabela `leads`** ⚠️

**Status:** Tabela existe mas FALTA campos para campanhas

**Campos Faltantes:**
```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS
  campaign_slug TEXT,              -- ❌ Novo
  landing_page_url TEXT,           -- ❌ Novo
  utm_source TEXT,                 -- ❌ Novo
  utm_medium TEXT,                 -- ❌ Novo
  utm_campaign TEXT,               -- ❌ Novo
  utm_content TEXT,                -- ❌ Novo
  utm_term TEXT,                   -- ❌ Novo
  referrer TEXT,                   -- ❌ Novo
  ip_address INET,                 -- ❌ Novo (existe no metadata)
  user_agent TEXT,                 -- ❌ Novo (existe no metadata)
  consent_marketing BOOLEAN DEFAULT false, -- ❌ Novo (LGPD)
  consent_terms BOOLEAN DEFAULT true,      -- ❌ Novo (LGPD)
  lead_score INTEGER DEFAULT 0,    -- ❌ Novo (qualificação)
  sent_to_crm BOOLEAN DEFAULT false, -- ❌ Novo
  crm_id TEXT;                     -- ❌ Novo
```

**Migration SQL:**
```sql
-- sql/add-campaign-fields-to-leads.sql
ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS campaign_slug TEXT,
  ADD COLUMN IF NOT EXISTS landing_page_url TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS ip_address INET,
  ADD COLUMN IF NOT EXISTS consent_marketing BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_terms BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sent_to_crm BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS crm_id TEXT;

-- Indexes para performance
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign_slug);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);
```

---

### 5. **Notificações Adicionais** ⚠️

**Status:** Parcialmente Implementado

**Implementado:**
```
✅ Email (Resend) - Funcional
```

**Faltando:**
```
❌ Slack Webhook - Notificação imediata de novo lead
❌ WhatsApp (Evolution API) - Notificação via WhatsApp
❌ Discord Webhook - Alternativa ao Slack
❌ Telegram Bot - Outra opção
```

**Implementação Recomendada:**

```typescript
// lib/notifications/slack.ts
export async function notifySlackNewLead(lead: Lead) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🎯 Novo Lead Capturado!`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Nome:* ${lead.full_name}\n*Email:* ${lead.email}\n*Empresa:* ${lead.company_name}\n*Campanha:* ${lead.campaign_slug}`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'Ver no Dashboard' },
              url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${lead.id}`
            }
          ]
        }
      ]
    })
  });
}
```

---

### 6. **Analytics e Tracking** ❌

**Status:** NÃO IMPLEMENTADO

**Necessário:**

```typescript
// Tracking de conversão
❌ Google Analytics 4
❌ Facebook Pixel  
❌ Google Tag Manager
❌ Hotjar (heatmaps)
❌ Microsoft Clarity

// Event tracking
❌ Page view
❌ Form started
❌ Form submitted
❌ Conversion complete
❌ Button clicks
❌ Scroll depth
```

**Implementação:**
```bash
pnpm add react-ga4
pnpm add react-facebook-pixel
pnpm add @vercel/analytics
```

```typescript
// lib/analytics/index.ts
import ReactGA from 'react-ga4';

export function trackLeadSubmit(campaign: string) {
  ReactGA.event({
    category: 'Lead',
    action: 'Submit',
    label: campaign,
  });
}

export function trackPageView(path: string) {
  ReactGA.send({ hitType: 'pageview', page: path });
}
```

---

### 7. **CRM Integration** ❌

**Status:** NÃO IMPLEMENTADO

**Necessário:**

```typescript
// Integrações com CRMs
❌ RD Station
❌ HubSpot
❌ Pipedrive
❌ Salesforce

// Webhook para CRM externo
❌ POST para URL configurável
```

**Implementação Recomendada:**

```typescript
// lib/crm/rdstation.ts
import { RDStationClient } from '@rdstation/rdstation-node';

export async function sendToRDStation(lead: Lead) {
  const client = new RDStationClient(process.env.RDSTATION_TOKEN);
  
  await client.contacts.create({
    email: lead.email,
    name: lead.full_name,
    company: lead.company_name,
    mobile_phone: lead.phone,
    tags: [lead.campaign_slug, lead.source],
    cf_lead_score: lead.lead_score,
  });
}
```

---

### 8. **A/B Testing** ❌

**Status:** NÃO IMPLEMENTADO

**Necessário:**

```typescript
// Sistema de A/B test para landing pages
❌ Variants de headline
❌ Variants de CTA
❌ Variants de layout
❌ Tracking de conversão por variant

// Usando Vercel Edge Config
import { get } from '@vercel/edge-config';

export async function getVariant(campaign: string) {
  const config = await get(`campaign_${campaign}_variant`);
  return config || 'A';
}
```

---

### 9. **Rate Limiting e Anti-Spam** ⚠️

**Status:** PARCIAL (Zod validation existe)

**Necessário:**

```typescript
❌ Rate limiting por IP
❌ Google reCAPTCHA v3
❌ Honeypot field
❌ Email validation service
❌ Blacklist de domínios
```

**Implementação:**
```bash
pnpm add react-google-recaptcha-v3
pnpm add @upstash/ratelimit
```

---

### 10. **GDPR/LGPD Compliance** ⚠️

**Status:** PARCIAL (tem checkbox no lead-magnet)

**Necessário:**

```typescript
❌ Cookie banner
❌ Privacy policy link
❌ Terms acceptance tracking
❌ Double opt-in (email confirmation)
❌ Unsubscribe mechanism
❌ Data export/deletion (GDPR)
```

---

## 🎯 PRIORIZAÇÃO DE DESENVOLVIMENTO

### **P0 - Crítico (Implementar Agora)**

1. ✅ **API Route Genérica** `/api/leads/capture`
   - Tempo: 2-3 horas
   - Complexidade: Baixa
   - Impacto: Alto

2. ✅ **Campos Adicionais na Tabela `leads`**
   - Tempo: 1 hora (SQL migration)
   - Complexidade: Baixa
   - Impacto: Alto

3. ✅ **Landing Page Base** `/lp/[slug]/page.tsx`
   - Tempo: 4-6 horas
   - Complexidade: Média
   - Impacto: Alto

4. ✅ **Tabela de Campanhas** `campaigns`
   - Tempo: 2 horas
   - Complexidade: Baixa
   - Impacto: Médio

---

### **P1 - Importante (Próxima Sprint)**

5. ⚠️ **Notificação Slack**
   - Tempo: 1-2 horas
   - Complexidade: Baixa
   - Impacto: Médio

6. ⚠️ **Analytics (GA4 + FB Pixel)**
   - Tempo: 2-3 horas
   - Complexidade: Média
   - Impacto: Alto

7. ⚠️ **Rate Limiting + reCAPTCHA**
   - Tempo: 2-3 horas
   - Complexidade: Média
   - Impacto: Médio

---

### **P2 - Desejável (Backlog)**

8. 📋 **A/B Testing**
   - Tempo: 6-8 horas
   - Complexidade: Alta
   - Impacto: Médio

9. 📋 **CRM Integration (RD Station)**
   - Tempo: 4-6 horas
   - Complexidade: Média
   - Impacto: Médio

10. 📋 **GDPR Compliance completo**
    - Tempo: 8-10 horas
    - Complexidade: Alta
    - Impacto: Baixo (legal requirement)

---

## 📋 PLANO DE AÇÃO (Timeline)

### **Sprint 1 (3-4 dias) - MVP Landing Page**

**Objetivo:** Landing page funcional com captura de leads

```
Dia 1:
✅ Migration: Adicionar campos na tabela leads (1h)
✅ Criar tabela campaigns (1h)
✅ API Route /api/leads/capture (3h)

Dia 2:
✅ Componente LeadCaptureForm.tsx (3h)
✅ Página /lp/[slug]/page.tsx (4h)

Dia 3:
✅ Componente HeroSection.tsx (2h)
✅ Componente SocialProof.tsx (2h)
✅ Thank you page /lp/[slug]/success (2h)

Dia 4:
✅ Testes e2e (3h)
✅ Deploy e validação (2h)
```

---

### **Sprint 2 (2-3 dias) - Notificações e Analytics**

```
Dia 1:
✅ Slack webhook integration (2h)
✅ WhatsApp notification (2h)
✅ Email templates dinâmicos (2h)

Dia 2:
✅ Google Analytics 4 setup (2h)
✅ Facebook Pixel setup (2h)
✅ Event tracking (2h)

Dia 3:
✅ Dashboard de analytics (3h)
✅ Relatórios de conversão (2h)
```

---

### **Sprint 3 (3-4 dias) - Integrações e Segurança**

```
Dia 1:
✅ Rate limiting (Upstash) (2h)
✅ Google reCAPTCHA v3 (2h)
✅ Honeypot + validation (2h)

Dia 2-3:
✅ RD Station integration (6h)
✅ CRM webhook genérico (2h)

Dia 4:
✅ GDPR compliance (cookie banner, etc) (4h)
```

---

## 🔧 ARQUIVOS QUE PRECISAM SER CRIADOS

### 1. Migrations SQL
```
✅ sql/add-campaign-fields-to-leads.sql
✅ sql/create-campaigns-table.sql
✅ sql/add-indexes-for-campaigns.sql
```

### 2. API Routes
```
✅ src/app/api/leads/capture/route.ts
✅ src/app/api/campaigns/[slug]/route.ts
```

### 3. Componentes de Landing
```
✅ src/components/landing/HeroSection.tsx
✅ src/components/landing/LeadCaptureForm.tsx
✅ src/components/landing/SocialProofSection.tsx
✅ src/components/landing/FAQSection.tsx
✅ src/components/landing/CTASection.tsx
```

### 4. Páginas
```
✅ src/app/lp/[slug]/page.tsx
✅ src/app/lp/[slug]/success/page.tsx
✅ src/app/lp/[slug]/layout.tsx
```

### 5. Utilities
```
✅ src/lib/notifications/slack.ts
✅ src/lib/notifications/whatsapp.ts
✅ src/lib/analytics/index.ts
✅ src/lib/crm/rdstation.ts
✅ src/lib/security/rate-limit.ts
```

---

## 💰 ESTIMATIVA DE CUSTO (Complementos)

### Serviços Adicionais Necessários:

```yaml
✅ Grátis:
  - Vercel Analytics (incluído)
  - Supabase Database (tier gratuito OK)
  - Resend Email (500/mês free)

💵 Pagos (Recomendados):
  - Google reCAPTCHA: Grátis
  - Upstash Rate Limiting: $0-$10/mês
  - Slack Webhook: Grátis
  - RD Station: $58-$350/mês
  - HubSpot Starter: $50/mês
  - Hotjar: $31-$79/mês

Total Estimado: $100-$500/mês
```

---

## ✅ RESUMO EXECUTIVO

### O que já funciona:
- ✅ Database (leads table) com RLS
- ✅ API de lead magnet específico
- ✅ Email via Resend
- ✅ Dashboard interno de leads
- ✅ Webhooks system (pagamentos)

### O que falta para landing pages:
- ❌ API genérica de captura
- ❌ Landing page components
- ❌ Tabela de campanhas
- ❌ UTM tracking
- ❌ Analytics integration
- ❌ Notificações Slack/WhatsApp
- ❌ CRM integration

### Tempo total estimado:
**8-10 dias de desenvolvimento** para sistema completo e afiado

### Começar por:
1. ✅ Migration: Adicionar campos (1h)
2. ✅ API /api/leads/capture (3h)
3. ✅ Landing page base (6h)
4. ✅ Formulário otimizado (3h)

**Quer que eu comece implementando o MVP (Sprint 1)?** 🚀
