# 🏗️ ARQUITETURA E INFRAESTRUTURA DO BACKEND - ARCO

**Versão**: 1.0  
**Data**: 10 de outubro de 2025  
**Stack**: Next.js 15 + Supabase PostgreSQL + TypeScript  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Arquitetura de Camadas](#arquitetura-de-camadas)
4. [Infraestrutura Supabase](#infraestrutura-supabase)
5. [Sistema de Migrations](#sistema-de-migrations)
6. [Serviços e Integrações](#serviços-e-integrações)
7. [Segurança e Autenticação](#segurança-e-autenticação)
8. [Performance e Otimização](#performance-e-otimização)
9. [Monitoramento e Logging](#monitoramento-e-logging)
10. [Deploy e CI/CD](#deploy-e-cicd)

---

## 1. VISÃO GERAL

### 1.1 Filosofia Arquitetural

O backend do ARCO segue uma **arquitetura híbrida serverless** com:
- **Backend-as-a-Service (BaaS)**: Supabase para persistência, auth e storage
- **API Routes**: Next.js 15 App Router para lógica de negócio customizada
- **Server Actions**: Para mutações de dados server-side
- **Edge Functions**: Para processamento distribuído (planejado)

### 1.2 Princípios de Design

```
┌─────────────────────────────────────────────────────────┐
│                    PRINCÍPIOS CORE                      │
├─────────────────────────────────────────────────────────┤
│ • Type Safety First: TypeScript strict mode            │
│ • Database-Driven: Schema como fonte da verdade        │
│ • Serverless Native: Zero servidores para gerenciar    │
│ • RLS Security: Row Level Security em todas as tabelas │
│ • Audit Everything: Logs completos de todas as ações   │
│ • Soft Deletes: Nunca perder dados acidentalmente      │
│ • Real-time Ready: Subscriptions via Supabase Realtime │
└─────────────────────────────────────────────────────────┘
```

### 1.3 Modelo de Dados

**66 tabelas** organizadas em **9 domínios**:
1. **Leads & CRM** (leads, clients, interactions)
2. **Quiz System** (quiz_results, qualification_responses)
3. **Projects & Tasks** (projects, tasks, milestones)
4. **Finance** (invoices, transactions, subscriptions)
5. **Content** (campaigns, analytics, performance_metrics)
6. **Communication** (email_*, whatsapp_*, notification_queue)
7. **Storage** (cloud_files, storage_items, file_shares)
8. **Analytics** (domain_analysis, security_scans, uptime_checks)
9. **System** (users, user_profiles, activity_logs, audit_log)

---

## 2. STACK TECNOLÓGICA

### 2.1 Core Backend

| Componente | Tecnologia | Versão | Propósito |
|------------|------------|--------|-----------|
| **Runtime** | Node.js | 24.9.0 | Execução JavaScript/TypeScript |
| **Framework** | Next.js | 15.3.1 | Full-stack React framework |
| **Language** | TypeScript | 5.x | Type safety end-to-end |
| **Database** | PostgreSQL | 15.x | Database relacional (via Supabase) |
| **BaaS** | Supabase | 2.74.0 | Auth, Storage, Realtime, Edge Functions |
| **ORM Alternative** | Supabase Client | 2.74.0 | Type-safe queries via generated types |
| **Package Manager** | pnpm | 9.0.0 | Fast, disk-efficient |

### 2.2 Infraestrutura

```
┌──────────────────────────────────────────────────────────────┐
│                    INFRAESTRUTURA ATUAL                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │   Vercel Edge   │────────▶│   Next.js 15    │           │
│  │   (Frontend)    │         │   (App Router)  │           │
│  └─────────────────┘         └────────┬────────┘           │
│                                       │                     │
│                                       ▼                     │
│                            ┌──────────────────┐            │
│                            │  Supabase Cloud  │            │
│                            │  (São Paulo)     │            │
│                            ├──────────────────┤            │
│                            │ • PostgreSQL 15  │            │
│                            │ • PostgREST API  │            │
│                            │ • GoTrue Auth    │            │
│                            │ • Realtime       │            │
│                            │ • Storage        │            │
│                            └──────────────────┘            │
│                                       │                     │
│                                       ▼                     │
│                            ┌──────────────────┐            │
│                            │   AWS S3 Backup  │            │
│                            │   (Opcional)     │            │
│                            └──────────────────┘            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Integrações Externas:                                       │
│  • Mercado Pago API (payments)                               │
│  • Resend API (emails transacionais)                         │
│  • Google PageSpeed API (performance)                        │
│  • n8n Webhooks (automações - planejado)                     │
└──────────────────────────────────────────────────────────────┘
```

### 2.3 Dependências Principais

```json
{
  "@supabase/supabase-js": "^2.74.0",
  "@supabase/ssr": "^0.7.0",
  "next": "15.3.1",
  "react": "^19.1.0",
  "typescript": "^5.x",
  "@tanstack/react-query": "^5.81.5",
  "framer-motion": "^11.18.2",
  "zod": "^3.26.0",
  "axios": "^1.10.0"
}
```

---

## 3. ARQUITETURA DE CAMADAS

### 3.1 Diagrama de Camadas

```
┌───────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                     │
│  Next.js Pages & Components (React 19)                        │
│  • /app/dashboard/* (client dashboards)                       │
│  • /app/quiz/* (lead generation)                              │
│  • /app/checkout/* (payments)                                 │
└─────────────────────────┬─────────────────────────────────────┘
                          │
┌─────────────────────────┴─────────────────────────────────────┐
│                      APPLICATION LAYER                        │
│  Business Logic & API Routes                                  │
│  • Server Actions (/app/dashboard/*/actions.ts)               │
│  • API Routes (/app/api/*)                                    │
│  • Services (/src/lib/services/*)                             │
└─────────────────────────┬─────────────────────────────────────┘
                          │
┌─────────────────────────┴─────────────────────────────────────┐
│                       DATA ACCESS LAYER                       │
│  Supabase Client Wrappers                                     │
│  • /src/lib/supabase/client.ts (browser)                      │
│  • /src/lib/supabase/server.ts (server)                       │
│  • /src/lib/supabase/admin.ts (admin operations)              │
│  • /src/lib/supabase/*-service.ts (domain services)           │
└─────────────────────────┬─────────────────────────────────────┘
                          │
┌─────────────────────────┴─────────────────────────────────────┐
│                      PERSISTENCE LAYER                        │
│  Supabase PostgreSQL + PostgREST                              │
│  • 66 tables (9 domains)                                      │
│  • 276 RLS policies                                           │
│  • 44 migrations                                              │
│  • Views, Functions, Triggers                                 │
└───────────────────────────────────────────────────────────────┘
```

### 3.2 Estrutura de Diretórios

```
/home/jpcardozx/projetos/arco/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth.ts               # Auth endpoints
│   │   │   ├── analytics.ts          # Analytics tracking
│   │   │   ├── webhooks/             # Webhook receivers
│   │   │   │   └── mercadopago/      # Payment webhooks
│   │   │   ├── checkout/             # Payment processing
│   │   │   ├── domain/               # Domain validation
│   │   │   └── emails/               # Email sending
│   │   ├── dashboard/                # Client dashboards
│   │   │   ├── actions.ts            # Server Actions
│   │   │   ├── leads/                # Lead management
│   │   │   ├── campaigns/            # Campaign management
│   │   │   ├── finance/              # Financial dashboard
│   │   │   └── diagnostico/          # Diagnostic tools
│   │   └── quiz/                     # Lead generation quiz
│   ├── lib/                          # Core libraries
│   │   ├── supabase/                 # Supabase integrations
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── server.ts             # Server client
│   │   │   ├── admin.ts              # Admin client
│   │   │   ├── auth.ts               # Auth helpers
│   │   │   ├── leads-service.ts      # Lead CRUD
│   │   │   ├── dashboard-logger.ts   # Activity logging
│   │   │   └── lead-capture.ts       # Lead capture forms
│   │   ├── services/                 # Business services
│   │   ├── payments/                 # Payment integrations
│   │   ├── email/                    # Email services
│   │   ├── analytics/                # Analytics tracking
│   │   └── quiz/                     # Quiz engine
│   ├── types/                        # TypeScript types
│   │   ├── database.types.ts         # Generated from Supabase
│   │   └── *.ts                      # Domain types
│   └── components/                   # React components
├── supabase/                         # Supabase config
│   ├── migrations/                   # Database migrations
│   │   ├── 20251010124137_*.sql      # 44 migration files
│   │   └── ...
│   └── config.toml                   # Supabase CLI config
├── scripts/                          # Utility scripts
│   ├── deploy-backend.sh             # Deployment script
│   └── daily-planning.ts             # Planning automation
└── docs/                             # Documentation
    ├── BACKEND_ARCHITECTURE.md
    ├── SUPABASE_AUDIT_COMPLETE.md
    └── MIGRATIONS_STATUS_20251010.md
```

### 3.3 Padrões de Acesso aos Dados

#### 3.3.1 Client-Side (Browser)
```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Uso em componentes
const { data: leads } = await supabase
  .from('leads')
  .select('*')
  .eq('user_id', user.id)
```

#### 3.3.2 Server-Side (API Routes)
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
```

#### 3.3.3 Admin Operations
```typescript
// src/lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Bypasses RLS
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Uso: Operações que precisam bypass RLS
await supabaseAdmin.from('leads').delete().eq('id', leadId)
```

---

## 4. INFRAESTRUTURA SUPABASE

### 4.1 Configuração do Projeto

| Propriedade | Valor |
|-------------|-------|
| **Project ID** | `vkclegvrqprevcdgosan` |
| **Region** | AWS São Paulo (sa-east-1) |
| **Database** | PostgreSQL 15.x |
| **URL** | `https://vkclegvrqprevcdgosan.supabase.co` |
| **Pooler** | Port 6543 (connection pooling) |
| **Direct** | Port 5432 (direct connection) |

### 4.2 Features Ativas

| Feature | Status | Uso |
|---------|--------|-----|
| **PostgREST API** | ✅ Ativo | Auto-generated REST API from schema |
| **GoTrue Auth** | ✅ Ativo | User authentication & sessions |
| **Storage** | 🟡 Parcial | Custom tables (cloud_files) instead of native |
| **Realtime** | 🔴 Não configurado | Planejado para leads, notifications |
| **Edge Functions** | 🔴 Não configurado | Planejado para process-quiz, send-email |
| **Database Webhooks** | 🔴 Não configurado | Planejado para Slack, n8n |
| **Backups** | ✅ Ativo | Automatic daily backups (Supabase) |

### 4.3 Métricas de Utilização

```
┌──────────────────────────────────────────────────────┐
│         UTILIZAÇÃO ATUAL DO SUPABASE                 │
├──────────────────────────────────────────────────────┤
│ Tabelas: 66 / ilimitadas                            │
│ RLS Policies: 276 / ilimitadas                      │
│ Migrations: 44 aplicadas                            │
│ Storage: ~500MB / 1GB (plano free)                  │
│ Database Size: ~200MB / 500MB (plano free)          │
│ API Requests: ~10K/dia / 50K/dia (plano free)       │
│ Auth Users: ~50 / 50K (plano free)                  │
├──────────────────────────────────────────────────────┤
│ Features Utilizadas: 30%                            │
│ Features Planejadas: 70%                            │
└──────────────────────────────────────────────────────┘
```

---

## 5. SISTEMA DE MIGRATIONS

### 5.1 Estrutura de Migrations

**44 migrations** aplicadas sequencialmente:

```bash
supabase/migrations/
├── 20241001_initial_schema.sql              # Schema inicial
├── 20241015_add_leads_clients.sql           # CRM tables
├── 20241020_add_projects_tasks.sql          # Project management
├── 20241025_add_finance.sql                 # Financial tables
├── 20241030_add_campaigns.sql               # Marketing campaigns
├── 20241105_add_analytics.sql               # Analytics tables
├── 20241110_add_whatsapp.sql                # WhatsApp integration
├── 20241115_add_storage.sql                 # Cloud storage
├── 20241120_add_security.sql                # Security scans
├── ...                                      # (35 migrations)
├── 20251010124137_create_activity_logs.sql  # Activity logging
├── 20251010124138_create_quiz_results.sql   # Quiz system
├── 20251010130000_connect_quiz_to_crm.sql   # ✅ Quiz → CRM integration
└── 20251010130001_add_soft_deletes.sql      # ✅ Soft deletes
```

### 5.2 Naming Convention

```
[TIMESTAMP]_[DESCRIPTIVE_NAME].sql

Exemplo:
20251010130000_connect_quiz_to_crm.sql
│       │     │
│       │     └─ Nome descritivo (snake_case)
│       └─ Hora/Minuto/Segundo (HHMMSS)
└─ Data (YYYYMMDD)
```

### 5.3 Fluxo de Migration

```
┌────────────────────────────────────────────────────────┐
│              FLUXO DE DESENVOLVIMENTO                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. Criar migration:                                   │
│     supabase migration new feature_name                │
│                                                        │
│  2. Escrever SQL:                                      │
│     vim supabase/migrations/[timestamp]_feature.sql    │
│                                                        │
│  3. Testar localmente:                                 │
│     supabase db reset (aplica todas as migrations)     │
│                                                        │
│  4. Verificar:                                         │
│     SELECT * FROM information_schema.tables;           │
│                                                        │
│  5. Deploy para produção:                              │
│     supabase db push                                   │
│                                                        │
│  6. Gerar types TypeScript:                            │
│     pnpm db:types                                      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 5.4 Scripts de Database

```json
{
  "scripts": {
    "db:status": "npx supabase status",
    "db:push": "npx supabase db push",
    "db:reset": "npx supabase db reset",
    "db:migrations": "npx supabase migration list",
    "db:types": "npx supabase gen types typescript --project-id vkclegvrqprevcdgosan > src/types/database.types.ts",
    "db:verify": "npx supabase db execute --file supabase/verify_payment_system.sql",
    "db:studio": "npx supabase studio"
  }
}
```

---

## 6. SERVIÇOS E INTEGRAÇÕES

### 6.1 Serviços Internos

```
src/lib/services/
├── analytics.service.ts          # Google Analytics 4
├── email.service.ts              # Resend API wrapper
├── payment.service.ts            # Mercado Pago integration
├── domain.service.ts             # Domain validation & monitoring
├── quiz.service.ts               # Quiz engine & scoring
└── storage.service.ts            # Cloud file management
```

### 6.2 Integrações Externas

| Serviço | Propósito | Status |
|---------|-----------|--------|
| **Mercado Pago** | Checkout Transparente, payments | ✅ Ativo |
| **Resend** | Emails transacionais profissionais | ✅ Ativo |
| **Google PageSpeed API** | Performance analysis | ✅ Ativo |
| **n8n** | Workflow automation | 🟡 Planejado |
| **Slack** | Notifications | 🟡 Planejado |
| **HubSpot/Pipedrive** | CRM sync | 🔴 Futuro |

### 6.3 API Routes

```typescript
// Payment Processing
POST /api/checkout/create-preference
POST /api/checkout/process-payment
POST /api/webhooks/mercadopago/v2

// Lead Capture
POST /api/lead-magnet
POST /api/presignup
GET  /api/presignup/[token]

// Domain Validation
POST /api/domain/validate
POST /api/domain/capture

// Analytics
POST /api/analytics/track
POST /api/performance/analyze

// Emails
POST /api/emails/send-confirmation

// Bookings
POST /api/agendamentos/create-booking
```

---

## 7. SEGURANÇA E AUTENTICAÇÃO

### 7.1 Row Level Security (RLS)

**276 policies** ativas protegendo todas as tabelas:

```sql
-- Exemplo: Leads RLS Policy
CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT
  USING (
    auth.uid() = user_id 
    AND deleted_at IS NULL
  );

CREATE POLICY "Admins can view all leads" ON leads
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.user_type = 'admin'
    )
  );
```

### 7.2 Autenticação

```
┌─────────────────────────────────────────────────┐
│          FLUXO DE AUTENTICAÇÃO                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. User acessa /login                          │
│  2. Supabase GoTrue autentica                   │
│  3. JWT token gerado (1 hora de validade)       │
│  4. Token armazenado em HTTP-only cookie        │
│  5. Middleware verifica token em cada request   │
│  6. RLS policies aplicadas automaticamente      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 7.3 Níveis de Permissão

| Role | Acesso |
|------|--------|
| **admin** | Tudo (bypass RLS via service_role_key) |
| **manager** | Ver todos leads/clients, não pode deletar |
| **consultant** | Ver próprios leads/clients |
| **client** | Ver apenas próprios dados |
| **anon** | Apenas rotas públicas (quiz, landing pages) |

---

## 8. PERFORMANCE E OTIMIZAÇÃO

### 8.1 Caching Strategy

```typescript
// React Query (TanStack Query)
import { useQuery } from '@tanstack/react-query'

const { data: leads } = useQuery({
  queryKey: ['leads', userId],
  queryFn: () => fetchLeads(userId),
  staleTime: 5 * 60 * 1000, // 5 minutos
  cacheTime: 10 * 60 * 1000, // 10 minutos
})
```

### 8.2 Database Indexes

```sql
-- Performance indexes criados
CREATE INDEX idx_leads_deleted_at ON leads(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_clients_deleted_at ON clients(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_quiz_results_deleted_at ON quiz_results(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_quiz_results_email ON quiz_results(email);
```

### 8.3 Optimistic Updates

```typescript
// Mutação com optimistic update
const mutation = useMutation({
  mutationFn: updateLead,
  onMutate: async (newLead) => {
    await queryClient.cancelQueries({ queryKey: ['leads'] })
    const previousLeads = queryClient.getQueryData(['leads'])
    queryClient.setQueryData(['leads'], (old) => [...old, newLead])
    return { previousLeads }
  },
  onError: (err, newLead, context) => {
    queryClient.setQueryData(['leads'], context.previousLeads)
  },
})
```

---

## 9. MONITORAMENTO E LOGGING

### 9.1 Activity Logs

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exemplo de log
INSERT INTO activity_logs (user_id, action, entity_type, entity_id, metadata)
VALUES (auth.uid(), 'lead_created', 'leads', lead_id, '{"source": "quiz"}');
```

### 9.2 Dashboard Logger Service

```typescript
// src/lib/supabase/dashboard-logger.ts
export async function logDashboardActivity(
  action: string,
  entityType: string,
  entityId?: string,
  metadata?: Record<string, any>
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  await supabase.from('activity_logs').insert({
    user_id: user?.id,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
    ip_address: await getClientIP(),
    user_agent: navigator.userAgent,
  })
}
```

### 9.3 Audit Log

```sql
-- Tabela separada para auditoria crítica
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 10. DEPLOY E CI/CD

### 10.1 Pipeline de Deploy

```
┌────────────────────────────────────────────────────────┐
│              PIPELINE DE DEPLOY                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. Push to GitHub (main branch)                       │
│          ↓                                             │
│  2. GitHub Actions trigger                             │
│          ↓                                             │
│  3. Run tests (pnpm test)                              │
│          ↓                                             │
│  4. Build Next.js (pnpm build)                         │
│          ↓                                             │
│  5. Deploy to Vercel                                   │
│          ↓                                             │
│  6. Apply Supabase migrations (pnpm db:push)           │
│          ↓                                             │
│  7. Generate types (pnpm db:types)                     │
│          ↓                                             │
│  8. ✅ Deploy completo                                 │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 10.2 Scripts de Deploy

```bash
# scripts/deploy-backend.sh
#!/bin/bash

echo "🚀 Starting backend deployment..."

# 1. Build check
pnpm build:check || exit 1

# 2. Apply migrations
pnpm db:push || exit 1

# 3. Regenerate types
pnpm db:types || exit 1

# 4. Deploy to Vercel
vercel --prod || exit 1

echo "✅ Backend deployed successfully!"
```

### 10.3 Ambientes

| Ambiente | URL | Database | Branch |
|----------|-----|----------|--------|
| **Production** | consultingarco.com | Supabase Prod | `main` |
| **Staging** | staging.consultingarco.com | Supabase Staging | `develop` |
| **Local** | localhost:3000 | Supabase Local | feature/* |

---

## 📊 MÉTRICAS ATUAIS

```
┌──────────────────────────────────────────────────────┐
│              BACKEND EM NÚMEROS                      │
├──────────────────────────────────────────────────────┤
│ Tabelas: 66                                          │
│ Migrations: 44 aplicadas                             │
│ RLS Policies: 276 ativas                             │
│ API Routes: 20+ endpoints                            │
│ Server Actions: 15+ actions                          │
│ Services: 10+ domain services                        │
│ TypeScript Files: 200+ arquivos                      │
│ Type Safety: 100% (strict mode)                      │
│ Test Coverage: ~60% (em crescimento)                 │
│ Uptime: 99.9% (Supabase + Vercel)                    │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 ROADMAP TÉCNICO

### Q4 2025
- [ ] Migrar para Supabase Storage nativo
- [ ] Habilitar Realtime para leads/notifications
- [ ] Implementar Edge Functions (3 functions)
- [ ] Consolidar tabelas duplicadas (leads, clients)
- [ ] Adicionar Full Text Search

### Q1 2026
- [ ] Implementar Database Webhooks (Slack, n8n)
- [ ] Adicionar Materialized Views para dashboards
- [ ] Configurar pg_cron para cleanup automático
- [ ] Migrar para Supabase Pro plan
- [ ] Implementar CDC (Change Data Capture)

---

**Última atualização**: 10/10/2025  
**Próxima revisão**: Mensal  
**Maintainer**: ARCO Tech Team
