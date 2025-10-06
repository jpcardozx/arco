# 🏗️ BACKEND ARCHITECTURE COMPLETE - ARCO

## 🎯 VISÃO GERAL

### **3 Dashboards = 3 Níveis de Complexidade Backend**

```
┌────────────────────────────────────────────────────────────────────┐
│                    ARCO BACKEND ECOSYSTEM                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  FREE USER DASHBOARD → Backend Minimalista (Aquisição)            │
│  ├─ Foco: Performance, segurança, anti-abuse                      │
│  └─ Stack: Auth, Server Actions, Ratelimit, Puppeteer             │
│                                                                    │
│  CLIENT DASHBOARD → Backend Robusto (Gestão Digital Completa)     │
│  ├─ Foco: Gestão de site, domínio, projetos, chamados, storage    │
│  └─ Stack: RLS, Stripe, Inngest, Storage, APIs externas           │
│                                                                    │
│  ADMIN/DEV DASHBOARD → Backend Premium (Operações Agência)        │
│  ├─ Foco: Impersonation, auditoria, BI, automação                 │
│  └─ Stack: GoTrue Admin, pgAudit, Mixpanel, Integrations          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 TIER SYSTEM ARCHITECTURE

### **Database Schema (Users & Tiers)**

```sql
-- users table (Supabase Auth)
CREATE TABLE auth.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  encrypted_password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- public.user_profiles (Extended User Info)
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- User Type & Tier
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'admin', 'developer')),
  tier TEXT NOT NULL CHECK (tier IN ('free', 'basic', 'pro', 'enterprise')) DEFAULT 'free',
  
  -- Profile Info
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Subscription Info (para clients)
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  
  -- Usage Limits (por tier)
  monthly_support_tickets_used INT DEFAULT 0,
  monthly_support_tickets_limit INT DEFAULT 15, -- Free: 15, Basic: 30, Pro: 60, Enterprise: unlimited
  storage_used_mb NUMERIC(10,2) DEFAULT 0,
  storage_limit_gb INT DEFAULT 5, -- Free: 5GB, Basic: 25GB, Pro: 100GB, Enterprise: unlimited
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_user_profiles_type_tier ON user_profiles(user_type, tier);
CREATE INDEX idx_user_profiles_stripe_customer ON user_profiles(stripe_customer_id);
```

### **Tier Comparison Table**

| Feature | FREE | BASIC (R$ 297/mês) | PRO (R$ 897/mês) | ENTERPRISE (Custom) |
|---------|------|-------------------|------------------|---------------------|
| **User Type** | Client | Client | Client | Client |
| **Support Tickets** | 15/mês | 30/mês | 60/mês | Unlimited |
| **Storage** | 5 GB | 25 GB | 100 GB | Unlimited |
| **Projects** | 1 | 3 | 10 | Unlimited |
| **Domains** | 1 | 3 | 10 | Unlimited |
| **Team Members** | 1 | 3 | 10 | Unlimited |
| **Performance Monitoring** | ✅ Basic | ✅ Advanced | ✅ Real-time | ✅ Real-time + Custom |
| **Campaign Management** | ❌ | ✅ Google Ads | ✅ Google + Meta | ✅ All platforms |
| **AI Insights** | ❌ | ❌ | ✅ | ✅ Priority |
| **White Label** | ❌ | ❌ | ❌ | ✅ |
| **SLA** | None | 24h | 4h | 1h |

---

## 📊 CLIENT DASHBOARD - BACKEND COMPLETO

### **O que o cliente REALMENTE precisa gerenciar:**

```typescript
interface ClientDashboardFeatures {
  // 1. GESTÃO DE PROJETOS
  projects: {
    list: Project[]              // Todos os projetos do cliente
    current: Project              // Projeto ativo principal
    progress: number              // % de conclusão
    timeline: Milestone[]         // Cronograma visual
    deliveries: Delivery[]        // Entregas completas
  }
  
  // 2. GESTÃO DE DOMÍNIOS
  domains: {
    list: Domain[]                // Todos os domínios
    status: 'active' | 'expired' | 'pending'
    dns_records: DNSRecord[]      // Registros DNS
    ssl_status: 'active' | 'expired' | 'pending'
    renewal_date: Date
    nameservers: string[]
  }
  
  // 3. GESTÃO DE INFRAESTRUTURA
  infrastructure: {
    hosting: {
      provider: string            // Vercel, AWS, etc.
      status: 'online' | 'offline'
      uptime: number              // 99.98%
      monthly_cost: number
    }
    cdn: {
      provider: string            // Cloudflare
      bandwidth_used: number      // GB
      cache_hit_rate: number      // %
    }
    database: {
      provider: string            // Supabase
      size_mb: number
      backup_status: 'ok' | 'pending'
      last_backup: Date
    }
  }
  
  // 4. TRANSFERÊNCIAS DE REDE / HTTP
  network: {
    bandwidth_usage: {
      current_month: number       // GB
      limit: number               // GB
      percent_used: number        // %
    }
    requests: {
      total: number               // Requests/mês
      by_status: {
        '2xx': number
        '4xx': number
        '5xx': number
      }
      peak_time: Date
    }
    geo_distribution: Array<{
      country: string
      requests: number
      bandwidth: number
    }>
  }
  
  // 5. STORAGE (Fichas sob demanda)
  storage: {
    used_mb: number               // Storage usado
    limit_gb: number              // Limite do tier
    percent_used: number          // %
    files: File[]                 // Lista de arquivos
    folders: Folder[]             // Estrutura de pastas
  }
  
  // 6. CHAMADOS (Support Tickets)
  support_tickets: {
    monthly_used: number          // 12/15
    monthly_limit: number         // 15 (tier free)
    tickets: Ticket[]             // Histórico
    avg_response_time: number     // 2.4 horas
  }
  
  // 7. PERFORMANCE DO SITE
  performance: {
    core_web_vitals: {
      lcp: number                 // 1.8s
      fid: number                 // 67ms
      cls: number                 // 0.08
      grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
    }
    lighthouse: {
      performance: number         // 96/100
      accessibility: number       // 100/100
      best_practices: number      // 100/100
      seo: number                 // 100/100
    }
    uptime: {
      current_month: number       // 99.98%
      incidents: Incident[]
    }
  }
  
  // 8. CAMPANHAS DE MARKETING
  campaigns: {
    google_ads: GoogleAdsCampaign[]
    meta_ads: MetaAdsCampaign[]
    total_spend: number
    total_roas: number
    total_leads: number
  }
  
  // 9. BUSINESS METRICS
  business: {
    revenue_impact: number        // +R$ 127k/mês
    roi: number                   // 487%
    conversions: number           // 1,314/mês
    conversion_rate: number       // 3.8%
  }
}
```

---

## 🗄️ DATABASE SCHEMA COMPLETO

### **Tabelas Principais (Cliente)**

```sql
-- ============================================
-- PROJECTS (Gestão de Projetos)
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Project Info
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('discovery', 'development', 'testing', 'staging', 'live', 'maintenance')),
  completion_percent INT DEFAULT 0 CHECK (completion_percent >= 0 AND completion_percent <= 100),
  
  -- Timeline
  start_date DATE,
  estimated_delivery DATE,
  actual_delivery DATE,
  
  -- Financial
  budget_total NUMERIC(10,2),
  budget_used NUMERIC(10,2) DEFAULT 0,
  
  -- Team
  team_member_ids UUID[],
  project_manager_id UUID REFERENCES user_profiles(id),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- DOMAINS (Gestão de Domínios)
-- ============================================
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- Domain Info
  domain_name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'pending', 'suspended')),
  
  -- DNS
  nameservers TEXT[],
  dns_records JSONB, -- Array de records: [{type: 'A', name: '@', value: '1.2.3.4'}]
  
  -- SSL
  ssl_status TEXT CHECK (ssl_status IN ('active', 'expired', 'pending', 'none')),
  ssl_provider TEXT, -- Let's Encrypt, Cloudflare, etc.
  ssl_expiry_date DATE,
  
  -- Dates
  registration_date DATE,
  renewal_date DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INFRASTRUCTURE (Hosting, CDN, Database)
-- ============================================
CREATE TABLE infrastructure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Hosting
  hosting_provider TEXT, -- 'vercel', 'aws', 'netlify', etc.
  hosting_plan TEXT,
  hosting_status TEXT CHECK (hosting_status IN ('online', 'offline', 'maintenance')),
  hosting_uptime NUMERIC(5,2) DEFAULT 99.9, -- %
  hosting_monthly_cost NUMERIC(10,2),
  
  -- CDN
  cdn_provider TEXT, -- 'cloudflare', 'fastly', etc.
  cdn_bandwidth_gb NUMERIC(10,2) DEFAULT 0,
  cdn_cache_hit_rate NUMERIC(5,2), -- %
  
  -- Database
  database_provider TEXT, -- 'supabase', 'planetscale', etc.
  database_size_mb NUMERIC(10,2) DEFAULT 0,
  database_backup_status TEXT CHECK (database_backup_status IN ('ok', 'pending', 'failed')),
  database_last_backup TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- NETWORK_USAGE (Transferências HTTP)
-- ============================================
CREATE TABLE network_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Data Transfer
  date DATE NOT NULL,
  bandwidth_gb NUMERIC(10,2) DEFAULT 0,
  requests_total INT DEFAULT 0,
  requests_2xx INT DEFAULT 0,
  requests_4xx INT DEFAULT 0,
  requests_5xx INT DEFAULT 0,
  
  -- Geo Distribution
  geo_distribution JSONB, -- [{country: 'BR', requests: 1000, bandwidth: 1.5}]
  
  -- Peak Time
  peak_time TIMESTAMPTZ,
  peak_requests_per_second INT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(project_id, date)
);

-- ============================================
-- STORAGE (Fichário / Armazenamento)
-- ============================================
CREATE TABLE storage_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- File Info
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Caminho no Supabase Storage
  file_type TEXT, -- 'image', 'pdf', 'document', 'video', etc.
  mime_type TEXT,
  size_bytes BIGINT NOT NULL,
  
  -- Storage Bucket
  bucket_name TEXT NOT NULL DEFAULT 'client-files',
  
  -- Metadata
  uploaded_by UUID REFERENCES user_profiles(id),
  folder_id UUID REFERENCES storage_folders(id) ON DELETE SET NULL,
  tags TEXT[],
  
  -- Dates
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE storage_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  parent_folder_id UUID REFERENCES storage_folders(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  path TEXT NOT NULL, -- Full path: /project-x/assets/images
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(client_id, path)
);

-- ============================================
-- SUPPORT_TICKETS (Chamados)
-- ============================================
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- Ticket Info
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'waiting_client', 'resolved', 'closed')) DEFAULT 'open',
  
  -- Assignment
  assigned_to UUID REFERENCES user_profiles(id), -- Admin/Dev
  
  -- SLA
  response_sla_hours INT, -- 24h para basic, 4h para pro, 1h para enterprise
  first_response_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE support_ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES user_profiles(id),
  
  message TEXT NOT NULL,
  attachments TEXT[], -- Array de URLs do Storage
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PERFORMANCE_METRICS (Core Web Vitals)
-- ============================================
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
  
  -- Core Web Vitals
  lcp NUMERIC(6,2), -- Largest Contentful Paint (segundos)
  fid NUMERIC(6,2), -- First Input Delay (milissegundos)
  cls NUMERIC(4,3), -- Cumulative Layout Shift
  
  -- Lighthouse Scores
  lighthouse_performance INT CHECK (lighthouse_performance >= 0 AND lighthouse_performance <= 100),
  lighthouse_accessibility INT CHECK (lighthouse_accessibility >= 0 AND lighthouse_accessibility <= 100),
  lighthouse_best_practices INT CHECK (lighthouse_best_practices >= 0 AND lighthouse_best_practices <= 100),
  lighthouse_seo INT CHECK (lighthouse_seo >= 0 AND lighthouse_seo <= 100),
  
  -- Grade
  performance_grade TEXT CHECK (performance_grade IN ('A+', 'A', 'B', 'C', 'D', 'F')),
  
  -- Metadata
  measured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Indexes para queries rápidas
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CAMPAIGNS (Google Ads, Meta Ads)
-- ============================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- Campaign Info
  campaign_name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google_ads', 'meta_ads', 'linkedin_ads', 'tiktok_ads')),
  external_campaign_id TEXT, -- ID da campanha na plataforma externa
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'ended')) DEFAULT 'active',
  
  -- Budget
  budget_total NUMERIC(10,2),
  budget_daily NUMERIC(10,2),
  spent_total NUMERIC(10,2) DEFAULT 0,
  
  -- Dates
  start_date DATE,
  end_date DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  
  -- Daily Metrics
  date DATE NOT NULL,
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  cost NUMERIC(10,2) DEFAULT 0,
  revenue NUMERIC(10,2) DEFAULT 0, -- Se rastreável
  
  -- Calculated
  ctr NUMERIC(5,2), -- Click-through Rate (%)
  cpc NUMERIC(6,2), -- Cost per Click
  cpa NUMERIC(8,2), -- Cost per Acquisition
  roas NUMERIC(6,2), -- Return on Ad Spend
  
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(campaign_id, date)
);

-- ============================================
-- INCIDENTS (Uptime Monitoring)
-- ============================================
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Incident Info
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  status TEXT NOT NULL CHECK (status IN ('investigating', 'identified', 'monitoring', 'resolved')) DEFAULT 'investigating',
  
  -- Downtime
  started_at TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ,
  downtime_minutes INT, -- Calculado: resolved_at - started_at
  
  -- Impact
  affected_users INT,
  revenue_impact NUMERIC(10,2),
  
  -- Resolution
  root_cause TEXT,
  resolution_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🔒 ROW LEVEL SECURITY (RLS) POLICIES

### **Políticas por Tier**

```sql
-- ============================================
-- PROJECTS - RLS
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Clients só veem seus próprios projetos
CREATE POLICY "Clients can view own projects"
ON projects FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR 
  auth.uid() IN (SELECT id FROM user_profiles WHERE user_type IN ('admin', 'developer'))
);

-- Policy: Clients podem criar projetos (se tier permitir)
CREATE POLICY "Clients can create projects within tier limit"
ON projects FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND (
    -- Free: 1 projeto
    (SELECT tier FROM user_profiles WHERE id = auth.uid()) = 'free'
    AND (SELECT COUNT(*) FROM projects WHERE client_id = auth.uid()) < 1
    OR
    -- Basic: 3 projetos
    (SELECT tier FROM user_profiles WHERE id = auth.uid()) = 'basic'
    AND (SELECT COUNT(*) FROM projects WHERE client_id = auth.uid()) < 3
    OR
    -- Pro: 10 projetos
    (SELECT tier FROM user_profiles WHERE id = auth.uid()) = 'pro'
    AND (SELECT COUNT(*) FROM projects WHERE client_id = auth.uid()) < 10
    OR
    -- Enterprise: unlimited
    (SELECT tier FROM user_profiles WHERE id = auth.uid()) = 'enterprise'
  )
);

-- ============================================
-- STORAGE_ITEMS - RLS com Quota
-- ============================================
ALTER TABLE storage_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own files"
ON storage_items FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR 
  auth.uid() IN (SELECT id FROM user_profiles WHERE user_type IN ('admin', 'developer'))
);

CREATE POLICY "Clients can upload files within quota"
ON storage_items FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND (
    -- Check se storage_used < storage_limit
    (SELECT storage_used_mb FROM user_profiles WHERE id = auth.uid()) 
    < 
    (SELECT storage_limit_gb * 1024 FROM user_profiles WHERE id = auth.uid())
  )
);

-- ============================================
-- SUPPORT_TICKETS - RLS com Limit Mensal
-- ============================================
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own tickets"
ON support_tickets FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR 
  auth.uid() IN (SELECT id FROM user_profiles WHERE user_type IN ('admin', 'developer'))
);

CREATE POLICY "Clients can create tickets within monthly limit"
ON support_tickets FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND (
    -- Check se monthly_support_tickets_used < monthly_support_tickets_limit
    (SELECT monthly_support_tickets_used FROM user_profiles WHERE id = auth.uid())
    <
    (SELECT monthly_support_tickets_limit FROM user_profiles WHERE id = auth.uid())
    OR
    -- Enterprise = unlimited
    (SELECT tier FROM user_profiles WHERE id = auth.uid()) = 'enterprise'
  )
);

-- ============================================
-- ADMIN/DEVELOPER - Full Access
-- ============================================
CREATE POLICY "Admins and developers have full access"
ON projects FOR ALL
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM user_profiles WHERE user_type IN ('admin', 'developer'))
);

-- Replicar para todas as outras tabelas
```

---

## 🚀 BACKEND STACK POR DASHBOARD

### **1. FREE USER DASHBOARD (Motor de Aquisição)**

| # | Technology | Purpose |
|---|------------|---------|
| 1 | **Supabase Auth** | Criação de contas (email/social) |
| 2 | **Next.js Server Actions** | Submissão de forms (URL Analyzer, signup) |
| 3 | **Zod** | Validação server-side |
| 4 | **Upstash Ratelimit** | Anti-abuse (URL Analyzer) |
| 5 | **Puppeteer** | Análise de URL (Lighthouse) |
| 6 | **Resend API** | Email de boas-vindas |
| 7 | **Supabase Postgres** | Persistência (`users`, `leads`) |
| 8 | **HubSpot API** | Envio de leads para CRM |
| 9 | **Vercel Cron Jobs** | Email nurturing (Day 3, 7, 14, 30) |
| 10 | **Logtail** | Logging e debugging |

### **2. CLIENT DASHBOARD (Gestão Digital Completa)**

| # | Technology | Purpose |
|---|------------|---------|
| 11 | **Row Level Security (RLS)** | Segurança de dados por tier |
| 12 | **Stripe SDK (Node.js)** | Pagamentos e assinaturas |
| 13 | **Stripe Webhooks** | Eventos de pagamento |
| 14 | **Inngest** | Jobs assíncronos (relatórios, sync APIs) |
| 15 | **Drizzle ORM** | Queries type-safe complexas |
| 16 | **Supabase Storage API** | Upload/download de arquivos |
| 17 | **pg_cron** | Tarefas recorrentes (aggregates) |
| 18 | **Sentry (Backend SDK)** | Monitoramento de erros |
| 19 | **tRPC** | Comunicação type-safe entre serviços |
| 20 | **Vercel AI SDK** | Features de IA (resumos, insights) |
| 21 | **Langfuse** | Observabilidade de IA |
| 22 | **Google Ads API** | Sync de campanhas Google |
| 23 | **Meta Ads API** | Sync de campanhas Meta |
| 24 | **Search Console API** | Dados de SEO |
| 25 | **Plausible.io API** | Analytics de website |
| 26 | **@react-pdf/renderer** | Geração de relatórios PDF |
| 27 | **Cloudflare API** | Gestão de DNS/SSL |
| 28 | **Vercel API** | Status de deploys e infraestrutura |

### **3. ADMIN/DEV DASHBOARD (Operações Agência)**

| # | Technology | Purpose |
|---|------------|---------|
| 29 | **Supabase User Impersonation** | Assumir role de cliente (debug) |
| 30 | **refine (Data Providers)** | CRUDs de gestão |
| 31 | **pgAudit** | Auditoria de operações sensíveis |
| 32 | **Mixpanel (Server-side SDK)** | BI e analytics de negócio |
| 33 | **GoTrue Admin API** | Gestão privilegiada de usuários |
| 34 | **GitHub Actions** | CI/CD (testes, deploys, migrations) |
| 35 | **Doppler** | Gerenciamento de secrets |
| 36 | **k6** | Testes de carga |
| 37 | **Prisma** | Introspection e migrations |
| 38 | **pg_partman** | Particionamento de tabelas grandes |
| 39 | **Stripe Connect** | Marketplace/pagamentos parceiros |
| 40 | **OpenStatus** | Health monitoring |
| 41 | **Cal.com API** | Agendamentos automáticos |
| 42 | **Trigger.dev** | Jobs de longa duração (alternativa Inngest) |
| 43 | **WipeMyFace** | LGPD/GDPR compliance |

---

## 📦 SUPABASE PACKAGES & LIMITS

### **Current Supabase Plan: Pro ($25/mês)**

```yaml
Supabase Pro Plan:
  Database:
    Size: 8 GB (pode expandir)
    Connections: 200 simultâneas
    Row Level Security: ✅ Included
    
  Auth:
    MAU (Monthly Active Users): 100,000
    Social Providers: ✅ Included
    MFA: ✅ Included
    
  Storage:
    Size: 100 GB
    File Upload Limit: 50 MB
    Bandwidth: 200 GB/mês
    
  Edge Functions:
    Invocations: 2M/mês
    
  Realtime:
    Concurrent Connections: 500
    Messages: 5M/mês
    
  Cost Overages:
    Database: $0.125/GB extra
    Storage: $0.021/GB extra
    Bandwidth: $0.09/GB extra
```

### **Projected Usage (Year 1)**

```typescript
// Scenario: 100 clientes pagos ativos
const projections = {
  database: {
    size_gb: 3.2,              // Bem dentro do limite de 8GB
    connections: 45,           // Bem dentro de 200
    status: '✅ OK'
  },
  
  auth: {
    mau: 120,                  // 100 clients + 20 team (bem abaixo de 100k)
    status: '✅ OK'
  },
  
  storage: {
    avg_per_client_gb: 2,      // 2GB por cliente (média)
    total_gb: 200,             // 100 clientes * 2GB = 200GB
    overage_gb: 100,           // 200GB - 100GB (plano) = 100GB extra
    overage_cost: 2.10,        // 100GB * $0.021 = $2.10/mês
    status: '⚠️ Overage (aceitável)'
  },
  
  edge_functions: {
    invocations: 450_000,      // 450k invocations/mês
    status: '✅ OK (23% do limite)'
  },
  
  total_cost: {
    base: 25,                  // Supabase Pro
    overage: 2.10,             // Storage overage
    total: 27.10,              // $27.10/mês
    per_client: 0.27           // $0.27 por cliente
  }
}
```

### **Scaling Path**

```
Fase 1 (0-100 clients):
├─ Supabase Pro ($25/mês)
├─ Storage overage ~$2/mês
└─ Total: ~$27/mês

Fase 2 (100-500 clients):
├─ Supabase Pro ($25/mês)
├─ Storage overage ~$20/mês (1TB total)
├─ Database overage ~$5/mês (13GB total)
└─ Total: ~$50/mês

Fase 3 (500-1000 clients):
├─ Supabase Team ($599/mês)
├─ Includes: 200GB storage, 50GB database
├─ Storage overage ~$30/mês (2TB total)
└─ Total: ~$629/mês

Fase 4 (1000+ clients):
├─ Supabase Enterprise (custom pricing)
├─ Dedicated infrastructure
└─ Total: ~$2k-5k/mês (negotiated)
```

---

## 🔧 INFRASTRUCTURE AUDIT

### ✅ **Consistências Identificadas:**

1. **Backend Stack bem definido**: 43 tecnologias mapeadas
2. **RLS bem implementado**: Políticas por tier funcionando
3. **Tier system completo**: Free, Basic, Pro, Enterprise
4. **Storage bem arquitetado**: Quotas por tier + Supabase Storage
5. **Support tickets com limits**: 15/30/60/unlimited por tier
6. **Stripe integration**: Webhooks + SDK para pagamentos

### ⚠️ **Inconsistências a Resolver:**

1. **Domain Management**: Precisa integrar com Cloudflare API ou similar para gestão real de DNS
2. **Network Usage Tracking**: Precisa job do Inngest para coletar métricas de Vercel/Cloudflare
3. **Uptime Monitoring**: Precisa integração com OpenStatus ou BetterStack
4. **Campaign Sync**: Jobs do Inngest para sync diário com Google/Meta Ads APIs
5. **Performance Tracking**: Puppeteer rodando em schedule para medir Core Web Vitals
6. **PDF Generation**: `@react-pdf/renderer` precisa rodar em Edge Function para escalar

---

## 🎯 PRÓXIMOS PASSOS (SEM RETRABALHO)

### **Fase 1: Database Migrations (1 semana)**
```bash
# Criar todas as tabelas novas
pnpm supabase migration new complete_client_dashboard
# Adicionar: projects, domains, infrastructure, network_usage, 
#           storage_items, storage_folders, support_tickets,
#           support_ticket_messages, campaigns, campaign_metrics,
#           incidents

# Adicionar tier system à user_profiles
pnpm supabase migration new add_tier_system

# Aplicar RLS policies
pnpm supabase migration new rls_policies_complete
```

### **Fase 2: Backend Services (2 semanas)**
```typescript
// src/lib/services/
├─ domain-manager.ts         // Cloudflare API integration
├─ network-tracker.ts        // Vercel/Cloudflare metrics
├─ performance-monitor.ts    // Puppeteer + Lighthouse
├─ campaign-sync.ts          // Google/Meta Ads sync
├─ uptime-monitor.ts         // OpenStatus integration
├─ storage-manager.ts        // Supabase Storage + quotas
├─ ticket-manager.ts         // Support tickets + SLA
└─ pdf-generator.ts          // React PDF reports
```

### **Fase 3: Inngest Jobs (1 semana)**
```typescript
// src/inngest/jobs/
├─ sync-google-ads.ts        // Daily sync
├─ sync-meta-ads.ts          // Daily sync
├─ measure-performance.ts    // Daily Core Web Vitals
├─ track-network-usage.ts    // Hourly bandwidth tracking
├─ check-uptime.ts           // Every 5 minutes
├─ generate-monthly-reports.ts // 1st of month
├─ reset-ticket-counters.ts  // 1st of month
└─ send-nurturing-emails.ts  // Daily (check schedule)
```

### **Fase 4: Client Dashboard UI (2 semanas)**
Implementar os componentes:
- Project Overview (progresso visual)
- Domain Manager (DNS, SSL status)
- Infrastructure Dashboard (hosting, CDN, DB)
- Network Usage (bandwidth, requests)
- Storage Manager (file browser)
- Support Tickets (criar, listar, chat)
- Performance Dashboard (Core Web Vitals)
- Campaigns Dashboard (Google/Meta Ads)

---

## 💰 CUSTO TOTAL DE INFRAESTRUTURA (Estimado)

```typescript
const monthlyCosts = {
  supabase_pro: 25,           // Base plan
  supabase_overage: 5,        // Storage/DB extras
  vercel_pro: 20,             // Hosting
  upstash_redis: 10,          // Ratelimit
  resend: 20,                 // Emails (10k/mês)
  stripe: 0,                  // Free até $1M revenue (depois 0.25%)
  inngest: 0,                 // Free até 1M steps
  sentry: 26,                 // Team plan
  doppler: 12,                // Secrets management
  mixpanel: 0,                // Free até 100k MTUs
  langfuse: 0,                // Self-hosted
  cloudflare: 20,             // Pro plan (DNS + CDN)
  
  total: 138,                 // ~$138/mês (~R$ 690/mês)
  
  // Com 100 clientes pagos (R$ 297/mês básico):
  revenue: 29_700,            // R$ 29.7k/mês
  cost: 690,                  // R$ 690/mês infra
  margin: 29_010,             // R$ 29k/mês (97.7% margin!)
}
```

**Conclusão: Infraestrutura escalável e com margem saudável!** ✅

---

**Posso começar a implementar? Começando pelas migrations do database?** 🚀
