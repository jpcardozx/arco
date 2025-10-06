# 🚀 ARCO V1.0 - MVP BLUEPRINT DEFINITIVO

## 🎯 FILOSOFIA DO MVP

**"Ship fast, learn faster"**

- ✅ **3 camadas** (Free User / Paid Client / Admin)
- ✅ **2 tiers iniciais** (Free / Paid - R$ 497/mês)
- ✅ **"Mágico de Oz"** (input manual de métricas antes da automação)
- ✅ **24 funcionalidades core** (score 8-10 apenas)
- ✅ **6 semanas de desenvolvimento**

---

## 📊 SCORE DE RELEVÂNCIA V1

| Score | Descrição | Ação |
|-------|-----------|------|
| **10** | **Crítico** - Inegociável para lançamento | Implementar AGORA |
| **9** | **Essencial** - Fundamental para V1 coeso | Implementar AGORA |
| **8** | **Recomendado** - Pode ser fast-follow | Implementar se tempo permitir |
| **7** | **Nice to have** - V1.1 ou posterior | NÃO implementar no MVP |

---

## 🎨 CAMADA 1: PORTAL DE DIAGNÓSTICO (Free User)

**Objetivo:** Motor de aquisição de alta performance que entrega valor inquestionável

### **Funcionalidades (8 itens)**

| # | Página/Funcionalidade | Score | Descrição Estratégica | Stack |
|---|---------------------|-------|----------------------|-------|
| 1 | **Nova Análise Técnica** | **10** | Ponto de entrada. Formulário simples (URL + email) para auditoria técnica completa. | Next.js Server Actions, React Hook Form, Zod, Cloudflare Turnstile |
| 2 | **Relatório de Diagnóstico** | **10** | Momento "Uau!". ARCO Index + principais problemas traduzidos em impacto de negócio. | Puppeteer, Tremor, Shadcn/ui |
| 3 | **Análise de Performance** | **9** | Core Web Vitals detalhado com impacto na conversão e UX. | Puppeteer (Lighthouse), Recharts |
| 4 | **Análise de Segurança** | **8** | Headers de segurança + vulnerabilidades conhecidas. | OSV.dev API, Headers check |
| 5 | **Sumário de Otimizações** | **9** | Ponte entre diagnóstico e proposta de valor. Lista "Playbooks" aplicáveis. | MDX, Drizzle ORM |
| 6 | **Comparativo de Planos** | **10** | Página de conversão com tiers + Stripe checkout integrado. | Stripe.js (Elements), Shadcn/ui |
| 7 | **Configurações da Conta** | **8** | Gestão de dados básicos + LGPD compliance (excluir conta). | Supabase Auth, Server Actions |
| 8 | **Agendamento (CTA)** | **8** | CTA integrado para agendar chamada técnica. | Cal.com API |

### **Backend (Free User)**

```typescript
// Database Tables
tables_free_user = [
  'auth.users',                    // Supabase Auth
  'user_profiles',                 // Extended profile
  'analysis_requests',             // URL submissions
  'analysis_results',              // Lighthouse results + ARCO Index
  'playbooks',                     // Optimization recommendations
]

// Stack
stack_free_user = {
  auth: 'Supabase Auth',
  forms: 'React Hook Form + Zod',
  ratelimit: 'Upstash Redis',      // Max 3 análises/dia por IP
  analysis: 'Puppeteer (Lighthouse)',
  email: 'Resend API',
  storage: 'Supabase Postgres',
}
```

---

## 💼 CAMADA 2: CENTRAL DO CLIENTE (Paid Client)

**Objetivo:** Interface da parceria com transparência total e prova de ROI contínua

### **Funcionalidades (8 itens)**

| # | Página/Funcionalidade | Score | Descrição Estratégica | Stack |
|---|---------------------|-------|----------------------|-------|
| 1 | **Painel Estratégico** | **10** | Coração da experiência. ARCO Index histórico + "Foco da Semana" da agência. | TanStack Query, Recharts, Drizzle ORM |
| 2 | **Monitoramento de Saúde** | **10** | Hub de Uptime + Performance + Security. "Paz de espírito" do cliente. | Inngest, BetterStack API, Puppeteer |
| 3 | **Análise de Crescimento** | **9** | Dashboard unificado: Ads + Analytics = CPL + ROI. | Google/Meta Ads APIs, Plausible API |
| 4 | **Gestão de Projetos** | **9** | Transparência total: projetos ativos + status + cronograma. | TanStack Table, Drizzle ORM |
| 5 | **Central de Suporte** | **10** | Sistema de tickets robusto para comunicação ágil. | Supabase Realtime, Resend API, RLS |
| 6 | **Gestão de Faturamento** | **10** | Portal self-service para assinatura + faturas. | Stripe Customer Portal, Stripe SDK |
| 7 | **Repositório de Arquivos** | **8** | Cofre digital: relatórios, contratos, ativos. | Supabase Storage, RLS, TanStack Table |
| 8 | **Análises da Agência** | **9** | Publicação de análises e diretrizes (consultoria humana). | CRUD Admin, MDX |

### **Backend (Paid Client)**

```typescript
// Database Tables
tables_paid_client = [
  'projects',                      // Client projects
  'project_milestones',            // Timeline tracking
  'performance_metrics',           // Daily Core Web Vitals
  'uptime_checks',                 // Uptime monitoring
  'security_scans',                // Security audits
  'campaigns',                     // Marketing campaigns
  'campaign_metrics',              // Daily ad metrics (manual input V1!)
  'analytics_data',                // Web analytics (manual input V1!)
  'support_tickets',               // Support system
  'support_messages',              // Ticket conversation
  'storage_items',                 // File repository
  'agency_insights',               // Published analyses
  'subscriptions',                 // Stripe subscriptions
  'invoices',                      // Stripe invoices
]

// Stack
stack_paid_client = {
  database: 'Drizzle ORM',
  jobs: 'Inngest',                 // Async jobs (monitoring, reports)
  payments: 'Stripe SDK',
  storage: 'Supabase Storage',
  realtime: 'Supabase Realtime',   // Live ticket updates
  monitoring: 'BetterStack API',
  ads: 'Google/Meta Ads APIs',
  analytics: 'Plausible API',
  pdf: '@react-pdf/renderer',
}
```

### **TIER SYSTEM SIMPLIFICADO (V1)**

```sql
-- user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  
  -- Tier (V1: só Free ou Paid)
  tier TEXT NOT NULL CHECK (tier IN ('free', 'paid')) DEFAULT 'free',
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'admin')),
  
  -- Profile
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Subscription (Stripe)
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  
  -- Usage Limits (V1: limites simples)
  monthly_analysis_count INT DEFAULT 0,        -- Free: 3/mês, Paid: unlimited
  storage_used_mb NUMERIC(10,2) DEFAULT 0,     -- Free: 0GB, Paid: 10GB
  monthly_support_tickets INT DEFAULT 0,       -- Free: 0, Paid: unlimited
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### **PRICING (V1)**

| Feature | FREE | PAID (R$ 497/mês) |
|---------|------|-------------------|
| **Análises Técnicas** | 3/mês | Unlimited |
| **ARCO Index** | ✅ Current | ✅ Histórico completo |
| **Monitoramento** | ❌ | ✅ Uptime + Performance + Security |
| **Projetos** | ❌ | ✅ Unlimited |
| **Suporte** | ❌ | ✅ Tickets + SLA 4h |
| **Storage** | ❌ | ✅ 10GB |
| **Campanhas** | ❌ | ✅ Gestão + Métricas |
| **Relatórios** | ❌ | ✅ Mensais (PDF) |
| **Análises Agência** | ❌ | ✅ Consultoria semanal |

---

## 🛠️ CAMADA 3: PAINEL DE CONTROLE (Admin)

**Objetivo:** Sistema operacional da agência para gestão eficiente e automação de processos

### **Funcionalidades (8 itens)**

| # | Página/Funcionalidade | Score | Descrição Estratégica | Stack |
|---|---------------------|-------|----------------------|-------|
| 1 | **Gestão de Clientes** | **10** | CRUD central para gerenciar todos os usuários (free/paid) + tiers + status. | refine, Drizzle ORM, TanStack Table |
| 2 | **Perfil do Cliente** | **10** | Visão 360º + **Impersonation** (assumir conta do cliente para debug). | Supabase Admin API, JWT logic |
| 3 | **Operações Globais** | **9** | Painel central: todos os projetos + todos os tickets (alocação de recursos). | refine, TanStack Table |
| 4 | **Input Manual de Métricas** | **10** | **CRÍTICO V1!** "Mágico de Oz" para alimentar métricas de Ads/Analytics manualmente. | refine (Forms), Server Actions |
| 5 | **Pipeline de Vendas** | **8** | Visualizar leads + diagnósticos + status no funil (prospecção → fechamento). | refine, Drizzle ORM |
| 6 | **Gerador de Propostas** | **8** | Usa diagnóstico do lead para gerar proposta comercial (draft). | Vercel AI SDK, @react-pdf/renderer |
| 7 | **Painel da Agência** | **9** | Overview do negócio: MRR, Churn, ARCO Index médio do portfólio. | Stripe API, PostgreSQL Functions |
| 8 | **Gestão de Conteúdo** | **8** | CMS interno para criar Playbooks + Base de Conhecimento. | Tiptap, MDX, Drizzle ORM |

### **Backend (Admin)**

```typescript
// Admin-only Tables
tables_admin = [
  'leads',                         // Sales pipeline
  'proposals',                     // Generated proposals
  'playbooks',                     // Optimization playbooks
  'knowledge_base',                // Help articles
  'agency_metrics',                // MRR, Churn, etc.
  'manual_metrics_input',          // 🎩 Mágico de Oz table!
]

// Stack
stack_admin = {
  crud: 'refine',                  // Admin interface generator
  impersonation: 'Supabase Admin API',
  cms: 'Tiptap',
  ai: 'Vercel AI SDK',
  pdf: '@react-pdf/renderer',
  bi: 'Stripe API + PostgreSQL Functions',
}
```

### **IMPERSONATION (Debug de Cliente)**

```typescript
// src/lib/admin/impersonate-client.ts
export async function impersonateClient(adminId: string, clientId: string) {
  // 1. Verificar se admin tem permissão
  const admin = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.id, adminId),
  })
  
  if (admin?.user_type !== 'admin') {
    throw new Error('Unauthorized')
  }
  
  // 2. Criar JWT temporário com role do cliente
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: client.email,
  })
  
  // 3. Logar evento de impersonation (audit)
  await db.insert(auditLog).values({
    admin_id: adminId,
    action: 'impersonate_client',
    target_user_id: clientId,
    timestamp: new Date(),
  })
  
  return data.properties.action_link
}
```

---

## 🔒 ROW LEVEL SECURITY (RLS) - SIMPLIFICADO V1

```sql
-- ============================================
-- PROJECTS - RLS
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Clients só veem seus projetos
CREATE POLICY "Clients can view own projects"
ON projects FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR 
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- ============================================
-- SUPPORT_TICKETS - RLS
-- ============================================
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own tickets"
ON support_tickets FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR 
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- Clients PAID podem criar tickets (ilimitado)
CREATE POLICY "Paid clients can create tickets"
ON support_tickets FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
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
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- Upload com quota check
CREATE POLICY "Paid clients can upload within quota"
ON storage_items FOR INSERT
TO authenticated
WITH CHECK (
  client_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND tier = 'paid'
    AND storage_used_mb < 10240  -- 10GB = 10240MB
  )
);

-- ============================================
-- ADMIN - Full Access
-- ============================================
CREATE POLICY "Admins have full access to all tables"
ON projects FOR ALL
TO authenticated
USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- Replicar policy de admin para todas as tabelas
```

---

## 🗄️ DATABASE SCHEMA FINAL (V1)

### **Core Tables (13 tabelas)**

```sql
-- 1. USER_PROFILES (tier system)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  tier TEXT NOT NULL CHECK (tier IN ('free', 'paid')) DEFAULT 'free',
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'admin')),
  full_name TEXT,
  company_name TEXT,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
  monthly_analysis_count INT DEFAULT 0,
  storage_used_mb NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. ANALYSIS_REQUESTS (free user analyses)
CREATE TABLE analysis_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  arco_index INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ANALYSIS_RESULTS (Lighthouse results)
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES analysis_requests(id),
  lcp NUMERIC(6,2),
  fid NUMERIC(6,2),
  cls NUMERIC(4,3),
  lighthouse_performance INT,
  lighthouse_accessibility INT,
  lighthouse_seo INT,
  security_score INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PLAYBOOKS (optimization recommendations)
CREATE TABLE playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('performance', 'security', 'seo', 'accessibility')),
  content TEXT,  -- MDX
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PROJECTS (client projects)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id),
  name TEXT NOT NULL,
  status TEXT CHECK (status IN ('discovery', 'development', 'live', 'maintenance')),
  completion_percent INT DEFAULT 0,
  start_date DATE,
  estimated_delivery DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROJECT_MILESTONES (timeline)
CREATE TABLE project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PERFORMANCE_METRICS (daily monitoring)
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  date DATE NOT NULL,
  lcp NUMERIC(6,2),
  fid NUMERIC(6,2),
  cls NUMERIC(4,3),
  lighthouse_score INT,
  arco_index INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, date)
);

-- 8. UPTIME_CHECKS (monitoring)
CREATE TABLE uptime_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  timestamp TIMESTAMPTZ NOT NULL,
  status_code INT,
  response_time_ms INT,
  is_up BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. CAMPAIGNS (marketing campaigns)
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES user_profiles(id),
  project_id UUID REFERENCES projects(id),
  name TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('google_ads', 'meta_ads')),
  budget_total NUMERIC(10,2),
  status TEXT CHECK (status IN ('active', 'paused', 'ended')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. CAMPAIGN_METRICS (manual input V1!)
CREATE TABLE campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  date DATE NOT NULL,
  impressions INT,
  clicks INT,
  conversions INT,
  cost NUMERIC(10,2),
  revenue NUMERIC(10,2),
  manually_entered BOOLEAN DEFAULT true,  -- 🎩 Flag do Mágico de Oz
  entered_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- 11. SUPPORT_TICKETS
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES user_profiles(id),
  project_id UUID REFERENCES projects(id),
  subject TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. STORAGE_ITEMS (file repository)
CREATE TABLE storage_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES user_profiles(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  size_bytes BIGINT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. AGENCY_INSIGHTS (published analyses)
CREATE TABLE agency_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES user_profiles(id),
  title TEXT NOT NULL,
  content TEXT,  -- MDX
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🚀 ROADMAP DE IMPLEMENTAÇÃO (6 SEMANAS)

### **Semana 1: Foundation** ✅ 80% COMPLETE
- [x] Supabase setup (auth, database)
- [x] Database migrations (21 tables - expandido!)
- [x] RLS policies (60+ policies - completo!)
- [x] Indexes optimization (70+ indexes)
- [x] Storage bucket configuration
- [ ] TypeScript types generation
- [ ] Drizzle schema creation
- [ ] Stripe integration setup

### **Semana 2: Free User Portal**
- [ ] Landing page + URL Analyzer form
- [ ] Puppeteer integration (Lighthouse)
- [ ] ARCO Index calculation
- [ ] Relatório de diagnóstico UI
- [ ] Comparativo de planos + Stripe checkout

### **Semana 3: Paid Client Dashboard (Parte 1)**
- [ ] Authentication flow
- [ ] Painel Estratégico (ARCO Index histórico)
- [ ] Monitoramento de Saúde (Uptime + Performance)
- [ ] Inngest setup (jobs assíncronos)

### **Semana 4: Paid Client Dashboard (Parte 2)**
- [ ] Análise de Crescimento (Ads + Analytics)
- [ ] Gestão de Projetos
- [ ] Central de Suporte (tickets)
- [ ] Gestão de Faturamento (Stripe Portal)

### **Semana 5: Admin Panel**
- [ ] refine setup
- [ ] Gestão de Clientes (CRUD)
- [ ] Perfil do Cliente + Impersonation
- [ ] Input Manual de Métricas (🎩 Mágico de Oz)
- [ ] Pipeline de Vendas

### **Semana 6: Polish & Launch**
- [ ] Repositório de Arquivos (Storage)
- [ ] Análises da Agência (MDX)
- [ ] Painel da Agência (BI)
- [ ] Gestão de Conteúdo (Playbooks)
- [ ] Testing + Bug fixes
- [ ] Deploy production

---

## 💰 CUSTO DE INFRAESTRUTURA (V1)

```typescript
const monthlyInfrastructureCost = {
  supabase_pro: 25,              // Database + Auth + Storage
  vercel_pro: 20,                // Hosting
  upstash_redis: 10,             // Ratelimit
  resend: 20,                    // Emails (10k/mês)
  stripe: 0,                     // Free (2.9% + R$0.39 por transação)
  inngest: 0,                    // Free tier (até 1M steps)
  betterstack: 20,               // Uptime monitoring
  sentry: 26,                    // Error monitoring
  
  total: 121,                    // ~$121/mês (~R$ 600/mês)
  
  // Break-even (1 cliente pago):
  client_mrr: 497,               // R$ 497/mês
  infrastructure: 600,           // R$ 600/mês
  break_even_clients: 2,         // 2 clientes pagos = R$ 994/mês
  
  // Com 10 clientes pagos:
  revenue: 4_970,                // R$ 4.970/mês
  cost: 600,                     // R$ 600/mês
  margin: 4_370,                 // R$ 4.370/mês (88% margin!)
}
```

---

## ✅ CONCLUSÃO: POR QUE ESSA PROPOSTA É MELHOR?

### **1. Realismo**
- ✅ Input manual de métricas (não precisa integrar tudo dia 1)
- ✅ 2 tiers apenas (Free/Paid - não 4 tiers complexos)
- ✅ 24 funcionalidades core (não 40+)

### **2. Velocidade**
- ✅ 6 semanas (não 12)
- ✅ Usa refine (CRUD automático)
- ✅ Usa Stripe Portal (não custom billing UI)

### **3. Custo-Benefício**
- ✅ R$ 600/mês de infra (não R$ 1k+)
- ✅ Break-even com 2 clientes (não 10)
- ✅ 88% margin com 10 clientes

### **4. Aprendizado**
- ✅ Lança rápido, valida, itera
- ✅ "Mágico de Oz" permite aprender o que clientes precisam
- ✅ Automação incremental (não tudo de uma vez)

---

## 🎯 PRÓXIMA AÇÃO

**Posso começar a implementar?**

Ordem sugerida:
1. ✅ Database migrations (Semana 1)
2. ✅ Free User Portal (Semana 2)
3. ✅ Paid Client Dashboard (Semanas 3-4)
4. ✅ Admin Panel (Semana 5)
5. ✅ Polish (Semana 6)

**Começamos pelas migrations?** 🚀
