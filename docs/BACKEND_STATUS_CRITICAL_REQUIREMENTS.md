# 🔧 ARCO Backend Status & 15 Requisitos Críticos

**Data:** 4 de outubro de 2025  
**Status:** ❌ **NÃO SINCRONIZADO COM SUPABASE** (Mock Services Ativos)  
**Prioridade:** 🔴 **P0 - CRÍTICO**

---

## 📊 STATUS ATUAL: RESUMO EXECUTIVO

### ❌ Não Configurado (Mock Data)
1. **Supabase**: Sem conexão real, todos os serviços usam mock data
2. **Prisma**: Package instalado mas sem schema.prisma configurado
3. **NextAuth Database Adapter**: Usando array em memória (não persistente)
4. **Email Service**: Não configurado (sem Resend/SendGrid)
5. **File Storage**: Sem integração real (mock de cloud storage)
6. **Stripe**: Webhooks e pagamentos não configurados
7. **Environment Variables**: `.env.local` criado com credenciais Supabase (faltam variáveis de auth, email, pagamentos)

### ✅ Configurado (Parcial)
1. **NextAuth**: OAuth providers configurados (GitHub, Google, Credentials)
2. **JWT Sessions**: Funcionando em modo development
3. **API Routes**: Estrutura básica criada (`/api/auth`, `/api/analytics`)
4. **TypeScript**: Interfaces e tipos bem definidos
5. **Middleware**: Security headers e route protection ativos

---

## 🔴 15 REQUISITOS CRÍTICOS DE BACKEND

### 1. **Autenticação e Sessão (P0)**
**Status:** ❌ Mock (array em memória)  
**Impacto:** Sessões perdidas a cada restart, sem persistência de usuários

**Requisitos:**
- [ ] Criar schema Prisma para User, Account, Session
- [ ] Configurar PrismaAdapter no NextAuth
- [ ] Migrar usuários demo para banco real
- [ ] Implementar email verification
 - [ ] (Deferido) 2FA para admins — pode ser revisitado após MVP

**Arquivos afetados:**
```
src/app/api/auth.ts (demo users array)
prisma/schema.prisma (não existe)
.env.local (NEXTAUTH_SECRET, DATABASE_URL)
```

**Prioridade:** 🔴 P0 (bloqueador para produção)

---

### 2. **Banco de Dados Principal (P0)**
**Status:** ❌ Não configurado  
**Impacto:** Sem persistência de dados críticos

**Decisão Necessária:**
- **Opção A:** Supabase (PostgreSQL + PostGIS + Row Level Security)
- **Opção B:** PlanetScale (MySQL Edge, 50ms P95 reads)
- **Opção C:** Prisma + Railway PostgreSQL

**Schema crítico:**
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          String    @default("user")
  emailVerified DateTime?
  accounts      Account[]
  sessions      Session[]
  clients       Client[]
  tasks         Task[]
  leads         Lead[]
}

model Client {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  company   String?
  status    String   @default("lead")
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  dueDate     DateTime
  status      String   @default("pending")
  priority    String   @default("medium")
  clientId    String?
  client      Client?  @relation(fields: [clientId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Lead {
  id          String   @id @default(cuid())
  email       String
  name        String?
  source      String   // "lead_magnet", "calculator", "contact_form"
  status      String   @default("new")
  metadata    Json?    // Armazena dados do formulário
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Prioridade:** 🔴 P0 (bloqueador para produção)

---

### 3. **CRM Service - Persistência Real (P0)**
**Status:** ❌ Mock data em memória  
**Impacto:** Dados de clientes e tarefas não persistem

**Arquivo:** `src/lib/supabase/crm-service.ts`

**TODO:**
```typescript
// Substituir:
private static mockClients: Client[] = [...]

// Por:
import { prisma } from '@/lib/prisma'

export class CRMService {
  static async getClients(): Promise<Client[]> {
    return await prisma.client.findMany({
      include: { tasks: true }
    })
  }
  
  static async createClient(data: CreateClientDTO): Promise<Client> {
    return await prisma.client.create({ data })
  }
  
  // ... resto dos métodos CRUD
}
```

**Prioridade:** 🔴 P0 (dashboard depende disso)

---

### 4. **Email Marketing & Transacional (P1)**
**Status:** ❌ Não configurado  
**Impacto:** Sem email automation (lead magnets, tripwires, nurture)

**Providers Recomendados:**
- **Resend** (transacional): Welcome emails, tripwire delivery
- **ConvertKit/Mailchimp** (marketing): Nurture sequences, newsletters

**Configuração:**
```typescript
// src/lib/email/resend-client.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadMagnetEmail(email: string, downloadUrl: string) {
  await resend.emails.send({
    from: 'ARCO <noreply@arco.com>',
    to: email,
    subject: 'Seu Checklist de Otimização de Funil',
    html: `<p>Acesse seu checklist: <a href="${downloadUrl}">Download</a></p>`
  })
}
```

**Fluxos críticos:**
1. Lead Magnet delivery (D0)
2. Nurture sequence pós-LM (D2, D5, D7)
3. Diagnóstico Express confirmation (D0)
4. Proposta follow-up (D+1, D+3, D+7)

**Prioridade:** 🟡 P1 (necessário para funil)

---

### 5. **Stripe Payment Integration (P1)**
**Status:** ❌ Não configurado  
**Impacto:** Sem cobrança de tripwires/pacotes

**Configuração:**
```typescript
// src/lib/stripe/stripe-client.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

// Criar checkout session para Diagnóstico Express
export async function createCheckoutSession(email: string, productId: string) {
  return await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [{
      price: productId, // price_xxx para Diagnóstico (R$ 497)
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you-diagnostico?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/diagnostico`
  })
}
```

**Webhooks necessários:**
```typescript
// src/app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe/stripe-client'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'checkout.session.completed':
      // Atualizar lead status para "paid"
      // Enviar email de confirmação
      // Criar task para equipe
      break
    case 'payment_intent.payment_failed':
      // Log failure
      break
  }

  return Response.json({ received: true })
}
```

**Prioridade:** 🟡 P1 (necessário para monetização)

---

### 6. **Calendly Integration & Webhooks (P1)**
**Status:** ❌ Não configurado  
**Impacto:** Agendamentos não sincronizam com CRM

**Integração:**
```typescript
// src/app/api/webhooks/calendly/route.ts
export async function POST(req: Request) {
  const event = await req.json()
  
  if (event.event === 'invitee.created') {
    const { email, name, event_type_name } = event.payload
    
    // Criar lead no banco
    await prisma.lead.create({
      data: {
        email,
        name,
        source: 'calendly',
        status: 'scheduled',
        metadata: {
          eventType: event_type_name,
          scheduledAt: event.payload.scheduled_event.start_time
        }
      }
    })
    
    // Enviar email de confirmação
    await sendDiagnosticoConfirmation(email, name)
    
    // Track no GA4
    await trackGA4Event('diagnostico_booked', { email })
  }
  
  return Response.json({ received: true })
}
```

**Prioridade:** 🟡 P1 (funil depende disso)

---

### 7. **File Storage (CloudStorageService) (P2)**
**Status:** ❌ Mock data  
**Impacto:** Dashboard de documentos não funciona

**Arquivo:** `src/app/lib/supabase/cloud-storage-service.ts`

**Opções:**
- **Supabase Storage**: Integrado com RLS, CDN global
- **Cloudflare R2**: S3-compatible, zero egress costs
- **Vercel Blob**: Nativo Next.js, edge network

**Implementação (Supabase):**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export class CloudStorageService {
  static async uploadFile(file: File, userId: string) {
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${userId}/${file.name}`, file)
    
    if (error) throw error
    return data
  }
  
  static async listFiles(userId: string) {
    const { data, error } = await supabase.storage
      .from('documents')
      .list(userId)
    
    if (error) throw error
    return data
  }
}
```

**Prioridade:** 🟢 P2 (nice-to-have, não bloqueador)

---

### 8. **Analytics Storage (GA4 + Custom) (P1)**
**Status:** ❌ Mock data em memória  
**Impacto:** Dados de analytics não persistem

**Arquivo:** `src/app/api/analytics.ts`

**Solução:**
```typescript
// Usar ClickHouse ou TimescaleDB para time-series data
// Alternativa: Supabase + views otimizadas

model AnalyticsEvent {
  id          String   @id @default(cuid())
  eventName   String
  eventData   Json
  userId      String?
  sessionId   String
  timestamp   DateTime @default(now())
  
  @@index([eventName, timestamp])
  @@index([userId, timestamp])
}

// API endpoint
export async function POST(req: Request) {
  const { eventName, eventData } = await req.json()
  
  await prisma.analyticsEvent.create({
    data: {
      eventName,
      eventData,
      sessionId: req.headers.get('x-session-id') || 'unknown'
    }
  })
  
  return Response.json({ tracked: true })
}
```

**Prioridade:** 🟡 P1 (necessário para MCP intelligence)

---

### 9. **Lead Capture & Segmentation (P1)**
**Status:** ❌ Não implementado  
**Impacto:** Lead magnets não coletam dados

**Forms necessários:**
1. **Lead Magnet Opt-in**
2. **ROI Calculator Submission**
3. **Contact Form**
4. **Diagnóstico Express Booking**

**Implementação:**
```typescript
// src/app/api/leads/route.ts
export async function POST(req: Request) {
  const { email, name, source, metadata } = await req.json()
  
  // Validação
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }
  
  // Criar lead
  const lead = await prisma.lead.create({
    data: { email, name, source, metadata }
  })
  
  // Tag no ConvertKit
  await tagLeadInConvertKit(email, source)
  
  // Enviar lead magnet se aplicável
  if (source === 'lead_magnet') {
    await sendLeadMagnetEmail(email, metadata.downloadUrl)
  }
  
  // Track GA4
  await trackGA4Event('lead_captured', { source, email })
  
  return Response.json({ success: true, leadId: lead.id })
}
```

**Prioridade:** 🟡 P1 (funil depende disso)

---

### 10. **Environment Variables & Secrets (P0)**
**Status:** ⚠️ `.env.local` criado (Supabase ✅, demais variáveis pendentes)  
**Impacto:** Integrações além do Supabase continuam bloqueadas até que os demais segredos sejam cadastrados

**Criar `.env.local`:**
```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/arco"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"

# OAuth Providers
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email
RESEND_API_KEY="re_xxx"
CONVERTKIT_API_KEY="xxx"
CONVERTKIT_FORM_ID="xxx"

# Payments
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# Storage
SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_ANON_KEY="eyJxxx"
SUPABASE_SERVICE_ROLE_KEY="eyJxxx"

# Analytics
GA4_PROPERTY_ID="properties/xxx"
GA4_SERVICE_ACCOUNT_PATH="./credentials/ga4-service-account.json"

# Calendly
CALENDLY_WEBHOOK_SECRET="xxx"

> ✅ `.env.local` já inclui `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_PROJECT_ID` e `SUPABASE_SERVICE_ROLE_KEY` para o projeto `vkclegvrqprevcdgosan`. Falta definir `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
> ✅ `src/lib/supabase/client.ts` agora expõe `getSupabaseAdminClient`, `createSupabaseServerClient` e `createSupabaseBrowserClient` para uso gradual na migração.
# API Security
API_SECRET_KEY="generate_random_256bit_key"
```

**Prioridade:** 🔴 P0 (requisito para todos os outros)

---

### 11. **Error Tracking & Monitoring (P1)**
**Status:** ❌ Não configurado  
**Impacto:** Bugs silenciosos em produção

**Recomendação: Sentry**
```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV
})

// Uso em API routes
try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error)
  throw error
}
```

**Prioridade:** 🟡 P1 (necessário para produção)

---

### 12. **Rate Limiting & Security (P1)**
**Status:** ⚠️ Parcialmente implementado (código existe mas não ativo)  
**Impacto:** Vulnerável a abuse e DDoS

**Arquivo:** `src/lib/core/api-performance.ts`

**Ativar:**
```typescript
// src/middleware.ts
import { rateLimit } from '@/lib/core/api-performance'

export function middleware(req: NextRequest) {
  const ip = req.ip || 'unknown'
  
  // Rate limit: 100 requests per minute
  if (!rateLimit(ip, 100, 60000)) {
    return new Response('Rate limit exceeded', { status: 429 })
  }
  
  // Continue...
}
```

**Rate Limits Recomendados:**
- `/api/leads`: 5/min por IP
- `/api/analytics`: 100/min por IP
- `/api/calculate-roi`: 10/min por IP
- Login attempts: 5/15min por IP

**Prioridade:** 🟡 P1 (necessário antes de lançar)

---

### 13. **Backup & Disaster Recovery (P2)**
**Status:** ❌ Não configurado  
**Impacto:** Sem plano de recuperação

**Requisitos:**
- [ ] Daily automated backups (Supabase nativo ou pg_dump)
- [ ] Point-in-time recovery (últimas 7 dias)
- [ ] Backup de environment variables (1Password/Doppler)
- [ ] Restore procedure documentado

**Prioridade:** 🟢 P2 (importante mas não bloqueador)

---

### 14. **API Documentation (P2)**
**Status:** ❌ Não documentado  
**Impacto:** Difícil manutenção e integração

**Recomendação: OpenAPI/Swagger**
```typescript
// src/app/api/docs/route.ts
import { createSwaggerSpec } from 'next-swagger-doc'

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'ARCO API',
        version: '1.0.0'
      }
    }
  })
  
  return Response.json(spec)
}
```

**Prioridade:** 🟢 P2 (nice-to-have)

---

### 15. **Testing Infrastructure (P2)**
**Status:** ❌ Não implementado  
**Impacto:** Sem garantia de qualidade

**Setup necessário:**
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom jest
pnpm add -D @playwright/test  # E2E tests
```

**Tests críticos:**
1. Unit: CRM CRUD operations
2. Integration: NextAuth flow
3. E2E: Lead magnet opt-in → email delivery
4. E2E: Calendly booking → CRM sync
5. E2E: Stripe payment → webhook → status update

**Prioridade:** 🟢 P2 (importante para escala)

---

## 🎯 ROADMAP DE IMPLEMENTAÇÃO

### Sprint 1: Foundation (Semana 1-2)
**Objetivo:** Ambiente básico funcional

- [ ] Criar `.env.local` com todas as keys
- [ ] Configurar Prisma schema completo
- [ ] Migrar NextAuth para database adapter
- [ ] Deploy de staging no Vercel
- [ ] Configurar Supabase project

**DRI:** Backend Developer  
**Bloqueador:** Decisão sobre database (Supabase vs PlanetScale)

---

### Sprint 2: CRM & Leads (Semana 3-4)
**Objetivo:** Dashboard funcional com dados reais

- [ ] Implementar CRM service real (substituir mock)
- [ ] Criar API `/api/leads` com validação
- [ ] Integrar Resend para email transacional
- [ ] Configurar Calendly webhook
- [ ] Setup rate limiting ativo

**DRI:** Backend Developer  
**Dependência:** Sprint 1 completo

---

### Sprint 3: Payments & Automation (Semana 5-6)
**Objetivo:** Funil de tripwire operacional

- [ ] Stripe checkout integration
- [ ] Stripe webhook handler
- [ ] ConvertKit nurture sequences
- [ ] Lead magnet automation
- [ ] GA4 event tracking backend

**DRI:** Backend Developer + Marketing  
**Dependência:** Sprint 2 completo

---

### Sprint 4: Monitoring & Polish (Semana 7-8)
**Objetivo:** Produção-ready

- [ ] Sentry error tracking
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Backup automation
- [ ] E2E tests críticos
- [ ] API documentation (Swagger)

**DRI:** Backend Developer + DevOps  
**Dependência:** Sprint 3 completo

---

## 📊 MÉTRICAS DE SUCESSO

### Technical KPIs
- ✅ Zero mock services em produção
- ✅ API P95 response time < 200ms
- ✅ 99.9% uptime (Vercel + Supabase)
- ✅ Zero lost sessions (persistent auth)
- ✅ Email delivery rate > 98% (Resend)

### Business KPIs
- ✅ Lead capture rate > 10% (homepage visitors)
- ✅ Email open rate > 25% (nurture sequence)
- ✅ Calendly booking rate > 5% (lead magnet → tripwire)
- ✅ Stripe payment success rate > 95%

---

## 🚨 DECISÕES PENDENTES

### 1. Database Provider
**Opções:**
- Supabase (PostgreSQL + RLS + Storage + Realtime)
- PlanetScale (MySQL Edge, melhor performance)
- Railway (PostgreSQL simples)

**Recomendação:** Supabase (all-in-one, RLS built-in)

---

### 2. Email Provider
**Opções:**
- Resend (transacional) + ConvertKit (marketing)
- SendGrid (all-in-one, menos moderno)
- Postmark (transacional only)

**Recomendação:** Resend + ConvertKit (melhor DX)

---

### 3. File Storage
**Opções:**
- Supabase Storage (integrado com RLS)
- Cloudflare R2 (zero egress costs)
- Vercel Blob (nativo Next.js)

**Recomendação:** Supabase Storage (se usar Supabase DB)

---

## 📞 PRÓXIMOS PASSOS IMEDIATOS

### Hoje (Urgente)
1. [x] Criar `.env.local` com credenciais iniciais do Supabase (anon pendente)
2. [ ] Decidir provider de database (Supabase vs PlanetScale)
3. [ ] Criar conta Resend (free tier)
4. [ ] Criar conta Stripe (test mode)

### Esta Semana
1. [ ] Configurar Prisma schema completo
2. [ ] Migrar NextAuth para database
3. [ ] Deploy staging no Vercel
4. [ ] Documentar fluxos críticos

### Próximas 2 Semanas
1. [ ] Implementar CRM service real
2. [ ] Lead capture API
3. [ ] Email automation básica
4. [ ] Calendly integration

---

## 🔗 REFERÊNCIAS

- **NextAuth Database Adapters:** https://next-auth.js.org/adapters/prisma
- **Prisma Schema Generator:** https://prisma.io/docs/concepts/components/prisma-schema
- **Resend Quick Start:** https://resend.com/docs/send-with-nextjs
- **Stripe Checkout:** https://stripe.com/docs/payments/checkout
- **Supabase Auth + Prisma:** https://supabase.com/docs/guides/integrations/prisma

---

**Última atualização:** 4 de outubro de 2025  
**Owner:** @jpcardozx  
**Status:** 🔴 CRÍTICO - Ação imediata necessária
