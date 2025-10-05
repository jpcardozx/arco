# Mocks vs Real APIs - Status e Roadmap

**Data:** 2025-10-04
**Status:** 📋 Documentação Completa

---

## 🎯 Status Atual

### ✅ APIs com Implementação Real (Pronta para Produção)

Nenhuma API está 100% conectada a serviços externos ainda. Todas usam mocks ou dados do Supabase local.

### 🔶 APIs com Mocks (Funcionais mas Precisam de Integração)

| API | Status | Mock Location | API Key Necessária | Priority |
|-----|--------|---------------|-------------------|----------|
| **Domain Validation** | Mock funcional | `/api/domain/validate` | Não inicialmente | P1 |
| **Lead Magnet** | Mock funcional | `/api/lead-magnet` | ConvertKit/Resend | P1 |
| **Pre-signup** | Mock funcional | `/api/presignup` | Email service | P2 |
| **Analytics** | Mock | `/api/analytics.ts` | Google Analytics | P3 |
| **WhatsApp** | Estrutura pronta | `dashboard/whatsapp/*` | Meta Business API | P2 |
| **Aliquotas PDF** | Mock data | `lib/services/pdf-aliquotas.ts` | Não | P3 |

---

## 📋 Detalhamento por API

### 1. Domain Validation API

**Arquivo:** `/src/app/api/domain/validate/route.ts`

**Status Atual:**
- ✅ Validação de formato (Zod)
- ✅ Rate limiting (in-memory)
- ✅ Respostas padronizadas
- 🔶 Mock de DNS, SSL, performance

**Mock Data:**
```typescript
{
  domain: "example.com",
  isValid: true,
  isAvailable: !domain.includes('test'),
  dnsRecords: {
    a: ['192.0.2.1', '192.0.2.2'],
    mx: ['mail.example.com'],
    txt: ['v=spf1...']
  },
  sslValid: true,
  performanceScore: 70-100 (random)
}
```

**Para Produção:**
```bash
# Opções de integração:
1. Python Script (scripts/domain_validator.py)
   - Usar dnspython para DNS
   - Usar ssl module para certificados
   - Usar requests para HTTP checks

2. Serviços Externos:
   - Cloudflare API (DNS)
   - SSL Labs API (SSL validation)
   - PageSpeed Insights API (performance)

# Não requer API keys inicialmente se usar Python local
```

**Prioridade:** P1 - Crítico para URL Analyzer
**Esforço:** 2-3 dias

---

### 2. Lead Magnet API

**Arquivo:** `/src/app/api/lead-magnet/route.ts`

**Status Atual:**
- ✅ Validação de formulário (Zod)
- ✅ Transform de telefone
- ✅ Respostas padronizadas
- 🔶 Mock de envio de email
- 🔶 Mock de salvamento no CRM

**Mock Behavior:**
```typescript
// Simula delay de 1s
await new Promise(resolve => setTimeout(resolve, 1000))

// Retorna sucesso sem enviar email real
return successResponse({
  name, email,
  downloadUrl: '/downloads/checklist-performance.pdf'
})
```

**Para Produção:**

#### Opção 1: ConvertKit (Recomendado)
```typescript
import { ConvertKit } from '@convertkit/convertkit-node'

const ck = new ConvertKit(process.env.CONVERTKIT_API_KEY)

await ck.forms.subscribe({
  formId: process.env.CONVERTKIT_FORM_ID,
  email: validatedData.email,
  firstName: validatedData.name.split(' ')[0],
  fields: {
    company: validatedData.company,
    phone: validatedData.phone
  }
})
```

**API Keys Necessárias:**
- `CONVERTKIT_API_KEY`
- `CONVERTKIT_FORM_ID`

#### Opção 2: Resend (Alternativa)
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: validatedData.email,
  subject: 'Seu Checklist de Performance',
  html: EmailTemplate({ name: validatedData.name })
})
```

**API Keys Necessárias:**
- `RESEND_API_KEY`

**Prioridade:** P1 - Crítico para conversão
**Esforço:** 1 dia

---

### 3. Supabase Integration

**Arquivos:**
- `/src/lib/supabase/clients-service.ts`
- `/src/lib/supabase/leads-service.ts`
- `/src/lib/supabase/tasks-service.ts`
- `/src/lib/supabase/crm-service.ts`

**Status Atual:**
- ✅ Estrutura completa de serviços
- ✅ Types TypeScript
- ✅ CRUD operations
- 🔶 RLS (Row Level Security) no Supabase
- 🔶 Real-time subscriptions

**Para Produção:**

```sql
-- 1. Criar tabelas no Supabase
-- Schema já definido em backend.ts

-- 2. Configurar RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clients"
  ON clients FOR SELECT
  USING (auth.uid() = created_by OR assigned_to = auth.uid());

CREATE POLICY "Users can insert own clients"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Similar para leads e tasks
```

**API Keys Necessárias:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Prioridade:** P1 - Fundamental
**Esforço:** 2-3 dias (schema + RLS + testing)

---

### 4. WhatsApp Business API

**Arquivos:**
- `/src/app/dashboard/whatsapp/components/*`
- `/src/lib/services/whatsapp-business-api.ts` (criar)

**Status Atual:**
- ✅ UI Components prontos
- 🔶 Integração com Meta Business API (faltando)
- 🔶 Webhook handlers (faltando)

**Para Produção:**

```typescript
// lib/services/whatsapp-business-api.ts
import axios from 'axios'

const WHATSAPP_API = 'https://graph.facebook.com/v18.0'

export async function sendMessage({
  to,
  message
}: {
  to: string
  message: string
}) {
  const response = await axios.post(
    `${WHATSAPP_API}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}
```

**API Keys Necessárias:**
- `WHATSAPP_BUSINESS_ACCOUNT_ID`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_VERIFY_TOKEN`

**Setup:**
1. Criar Meta Business Account
2. Configurar WhatsApp Business API
3. Verificar número de telefone
4. Configurar webhook

**Prioridade:** P2 - Feature avançada
**Esforço:** 3-5 dias

---

### 5. Analytics API

**Arquivo:** `/src/app/api/analytics.ts`

**Status Atual:**
- 🔶 Estrutura básica
- 🔶 Mock de métricas

**Para Produção:**

```typescript
// Integração com Google Analytics 4
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const analyticsDataClient = new BetaAnalyticsDataClient()

async function getPageViews(startDate: string, endDate: string) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'screenPageViews' }]
  })

  return response
}
```

**API Keys Necessárias:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `GA_PROPERTY_ID`
- Service Account JSON (para server-side)

**Prioridade:** P3 - Nice to have
**Esforço:** 2 dias

---

## 🚀 Roadmap de Integração

### Fase 1: Fundação (Semana 1)
**Priority: P1**

- [ ] **Supabase Setup**
  - Criar schema no Supabase
  - Configurar RLS policies
  - Testar CRUD operations
  - **API Keys:** Supabase (required)

- [ ] **Lead Magnet Email**
  - Escolher provider (ConvertKit ou Resend)
  - Criar conta e API key
  - Integrar envio de emails
  - Testar com emails reais
  - **API Keys:** ConvertKit OU Resend (required)

**Deliverables:**
- ✅ Database funcionando
- ✅ Emails sendo enviados
- ✅ Leads salvos no CRM

---

### Fase 2: Core Features (Semana 2-3)
**Priority: P1-P2**

- [ ] **Domain Validation Real**
  - Implementar Python script OU
  - Integrar com Cloudflare API
  - Testar validações reais
  - Cache de resultados (Redis/Upstash)
  - **API Keys:** Cloudflare (optional)

- [ ] **Auth & RBAC**
  - Configurar Supabase Auth
  - Implementar RLS completo
  - Testar permissões
  - **API Keys:** Já incluído no Supabase

**Deliverables:**
- ✅ URL Analyzer com dados reais
- ✅ Sistema de auth funcionando
- ✅ Permissões por role

---

### Fase 3: Advanced Features (Semana 4-5)
**Priority: P2-P3**

- [ ] **WhatsApp Integration**
  - Setup Meta Business Account
  - Configurar webhook
  - Testar envio/recebimento
  - **API Keys:** Meta Business (required)

- [ ] **Analytics**
  - Setup Google Analytics 4
  - Integrar Data API
  - Dashboard de métricas
  - **API Keys:** Google Analytics (required)

**Deliverables:**
- ✅ WhatsApp bot funcionando
- ✅ Analytics dashboard

---

### Fase 4: Payments & Advanced (Semana 6+)
**Priority: P3-P4**

- [ ] **Payment Gateway**
  - Stripe OU Mercado Pago
  - Checkout pages
  - Webhook handling
  - **API Keys:** Stripe/MP (required)

- [ ] **Rate Limiting Production**
  - Migrar para Upstash Redis
  - Implementar distributed rate limiting
  - **API Keys:** Upstash (optional)

---

## 📊 Resumo de API Keys

### Obrigatórias (Fase 1)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Email (escolher 1)
CONVERTKIT_API_KEY=...  # OU
RESEND_API_KEY=...
```

### Recomendadas (Fase 2)
```bash
# Cloudflare (para domain validation)
CLOUDFLARE_API_KEY=...  # Opcional, pode usar Python local

# Redis (para rate limiting em produção)
UPSTASH_REDIS_REST_URL=...  # Opcional, funciona sem
```

### Opcionais (Fase 3+)
```bash
# WhatsApp
WHATSAPP_ACCESS_TOKEN=...

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=...

# Payments
STRIPE_SECRET_KEY=...
```

---

## 🔧 Como Remover Mocks

### 1. Domain Validation
```typescript
// ANTES (Mock)
const mockResponse = {
  domain,
  isValid: true,
  // ... mock data
}

// DEPOIS (Real)
import { validateDomain } from '@/lib/services/domain-validator'
const realData = await validateDomain(domain)
```

### 2. Lead Magnet
```typescript
// ANTES (Mock)
await new Promise(resolve => setTimeout(resolve, 1000))
console.log('Lead Magnet Submission:', validatedData)

// DEPOIS (Real)
import { sendLeadMagnetEmail } from '@/lib/services/email'
await sendLeadMagnetEmail(validatedData)
await saveToCRM(validatedData)
```

### 3. Tasks/Clients/Leads
```typescript
// ANTES (Mock)
const realTasks: Task[] = []

// DEPOIS (Real)
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
const supabase = createSupabaseBrowserClient()
const realTasks = await CRMService.getTasks(supabase)
```

---

## ✅ Checklist de Produção

### Antes de Deploy
- [ ] Todas as `NEXT_PUBLIC_*` env vars configuradas
- [ ] Supabase RLS policies testadas
- [ ] Rate limiting em produção (Upstash)
- [ ] Emails de lead magnet funcionando
- [ ] Analytics tracking configurado
- [ ] Error tracking (Sentry) configurado
- [ ] Backup strategy definida

### Testes Necessários
- [ ] Teste end-to-end de signup
- [ ] Teste de envio de emails
- [ ] Teste de rate limiting
- [ ] Teste de permissões RBAC
- [ ] Teste de validação de domínio
- [ ] Load testing básico

---

## 💡 Recomendações

### Custos Estimados (Mensal)

| Serviço | Plano | Custo |
|---------|-------|-------|
| Supabase | Free (até 500MB) | $0 |
| ConvertKit | Free (até 1k subs) | $0 |
| Resend | Free (100 emails/dia) | $0 |
| Upstash Redis | Free (10k req/dia) | $0 |
| Cloudflare | Free | $0 |
| **Total Fase 1-2** | | **$0** |
| Stripe | Pay per transaction | 2.9% + $0.30 |
| Meta WhatsApp | Free (1k conv/mês) | $0 |
| **Total com Features** | | **~$0-50** |

### Ordem de Prioridade

1. **Supabase** - Fundamental para tudo
2. **Email Service** - Crítico para conversão
3. **Domain Validation** - Pode usar Python local
4. **WhatsApp** - Feature avançada
5. **Analytics** - Nice to have
6. **Payments** - Apenas se monetizar

---

**Conclusão:** Sistema pode iniciar em produção com **apenas Supabase + Email service** (ambos com planos gratuitos). Demais features podem ser adicionadas incrementalmente conforme necessidade.
