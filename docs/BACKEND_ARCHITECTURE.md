# 🏗️ ARCO - Arquitetura e Documentação do Backend

> **Data:** 06 de outubro de 2025  
> **Status:** ✅ Documentação Completa  
> **Arquitetura:** Supabase + Next.js 15 + Server Actions + RLS

---

## 📋 ÍNDICE

1. [Estrutura de Dados](#estrutura-de-dados)
2. [Fluxo de Informação](#fluxo-de-informação)
3. [Segurança e RLS](#segurança-e-rls)
4. [Sistema de Usuários](#sistema-de-usuários)
5. [Índice ARCO (Pollution Index)](#índice-arco)
6. [Integração Frontend-Backend](#integração-frontend-backend)

---

## 1. ESTRUTURA DE DADOS

### 🗄️ Database Schema (21 Tabelas)

#### **Tabelas Core - Usuários e Autenticação**

```sql
-- user_profiles: Perfis de usuário com sistema de tiers
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,                    -- Referencia auth.users
  tier TEXT CHECK (tier IN ('free', 'paid')),
  user_type TEXT CHECK (user_type IN ('client', 'admin')),
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Subscription (Stripe)
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status TEXT,
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  
  -- Quotas e Limites
  monthly_analysis_count INT DEFAULT 0,
  storage_used_mb NUMERIC(10,2) DEFAULT 0,
  monthly_support_tickets INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Campos Importantes:**
- `tier`: 'free' | 'paid' - Define limites de uso
- `user_type`: 'client' | 'admin' - Define permissões
- `monthly_analysis_count`: Contador de análises no mês
- `storage_used_mb`: Storage usado (limite por tier)

#### **Tabelas de Análise - Core do ARCO**

```sql
-- analysis_requests: Solicitações de análise Lighthouse
CREATE TABLE analysis_requests (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  arco_index INT CHECK (arco_index >= 0 AND arco_index <= 100),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- analysis_results: Resultados detalhados da análise
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY,
  analysis_id UUID REFERENCES analysis_requests(id),
  
  -- Core Web Vitals
  lcp NUMERIC(6,2),  -- Largest Contentful Paint
  fid NUMERIC(6,2),  -- First Input Delay
  cls NUMERIC(4,3),  -- Cumulative Layout Shift
  
  -- Lighthouse Scores (0-100)
  lighthouse_performance INT,
  lighthouse_accessibility INT,
  lighthouse_best_practices INT,
  lighthouse_seo INT,
  lighthouse_pwa INT,
  
  -- Raw Data
  raw_lighthouse_json JSONB,  -- Resultado completo do Lighthouse
  crux_data JSONB,             -- Dados do Chrome UX Report
  
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Relação entre tabelas:**
1. Usuário solicita análise → cria registro em `analysis_requests`
2. Sistema processa análise → atualiza `status` e `arco_index`
3. Resultados detalhados → salvos em `analysis_results`

#### **Tabelas de Monitoramento**

```sql
-- performance_metrics: Métricas diárias de performance
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  date DATE NOT NULL,
  
  -- Core Web Vitals
  lcp NUMERIC(6,2),
  fid NUMERIC(6,2),
  cls NUMERIC(4,3),
  
  -- Scores
  lighthouse_score INT,
  arco_index INT,              -- ÍNDICE ARCO!
  
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, date)     -- Uma medição por projeto por dia
);

-- uptime_checks: Verificações de disponibilidade
CREATE TABLE uptime_checks (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  timestamp TIMESTAMPTZ DEFAULT now(),
  status_code INT,
  response_time_ms INT,
  is_up BOOLEAN NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- domain_monitoring: Saúde do domínio
CREATE TABLE domain_monitoring (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  ssl_expires_at TIMESTAMPTZ,
  ssl_valid BOOLEAN,
  dns_valid BOOLEAN,
  blacklist_status TEXT,
  last_checked TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### **Tabelas de Crescimento e Campanhas**

```sql
-- campaigns: Campanhas de marketing
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES user_profiles(id),
  project_id UUID REFERENCES projects(id),
  name TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('google_ads', 'meta_ads', 'linkedin_ads', 'tiktok_ads')),
  external_campaign_id TEXT,
  budget_total NUMERIC(10,2),
  budget_daily NUMERIC(10,2),
  status TEXT CHECK (status IN ('active', 'paused', 'ended')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- campaign_metrics: Métricas de campanha (entrada manual V1)
CREATE TABLE campaign_metrics (
  id UUID PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id),
  date DATE NOT NULL,
  
  -- Métricas
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  cost NUMERIC(10,2),
  revenue NUMERIC(10,2),
  
  -- Calculados
  ctr NUMERIC(5,2),     -- Click-through rate
  cpc NUMERIC(8,2),     -- Cost per click
  cpa NUMERIC(10,2),    -- Cost per acquisition
  roas NUMERIC(8,2),    -- Return on ad spend
  
  -- Mágico de Oz
  manually_entered BOOLEAN DEFAULT true,
  entered_by UUID REFERENCES user_profiles(id),
  
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(campaign_id, date)
);
```

#### **Tabelas de Suporte e Operações**

```sql
-- projects: Projetos do usuário
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed', 'on_hold', 'cancelled')),
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- support_tickets: Sistema de suporte
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  subject TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- support_ticket_messages: Mensagens do ticket
CREATE TABLE support_ticket_messages (
  id UUID PRIMARY KEY,
  ticket_id UUID REFERENCES support_tickets(id),
  sender_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- storage_items: Arquivos do usuário
CREATE TABLE storage_items (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size_mb NUMERIC(10,2) NOT NULL,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### **Tabelas de Insights e Recomendações**

```sql
-- playbooks: Planos de ação
CREATE TABLE playbooks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  priority INT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- agency_insights: Insights automáticos
CREATE TABLE agency_insights (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 2. FLUXO DE INFORMAÇÃO

### 📊 Diagrama de Fluxo

```
┌─────────────────────────────────────────────────────────────┐
│                      USUÁRIO (Frontend)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js Server Actions / API Routes             │
│  - getUserAnalyses()                                          │
│  - getARCOIndexHistory()                                      │
│  - requestAnalysis()                                          │
│  - getPerformanceMetrics()                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supabase Client (Server)                    │
│  - createServerClient()                                       │
│  - Autenticação via cookies                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Row Level Security (RLS)                   │
│  - Valida auth.uid()                                          │
│  - Verifica tier e user_type                                  │
│  - Aplica policies de acesso                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                         │
│  - Executa query                                              │
│  - Retorna dados filtrados                                    │
└─────────────────────────────────────────────────────────────┘
```

### 🔄 Fluxo de Análise Completo

1. **Solicitação** (Frontend)
   ```typescript
   // Usuário clica em "Analisar Site"
   const result = await requestAnalysis('https://example.com')
   ```

2. **Server Action** (Backend)
   ```typescript
   export async function requestAnalysis(url: string) {
     const supabase = await createServerClient()
     
     // Verifica quota do usuário
     const { data: profile } = await supabase
       .from('user_profiles')
       .select('tier, monthly_analysis_count')
       .single()
     
     // Free tier: máximo 3 análises/mês
     if (profile.tier === 'free' && profile.monthly_analysis_count >= 3) {
       throw new Error('Quota excedida. Upgrade para Paid.')
     }
     
     // Cria request
     const { data } = await supabase
       .from('analysis_requests')
       .insert({
         url,
         status: 'pending'
       })
       .select()
       .single()
     
     // Incrementa contador
     await supabase
       .from('user_profiles')
       .update({ monthly_analysis_count: profile.monthly_analysis_count + 1 })
       .eq('id', profile.id)
     
     // Dispara análise assíncrona (Edge Function / Webhook)
     await triggerLighthouseAnalysis(data.id, url)
     
     return data
   }
   ```

3. **Processamento** (Edge Function - não implementado ainda)
   ```typescript
   // supabase/functions/lighthouse-scan/index.ts
   import lighthouse from 'lighthouse'
   import puppeteer from 'puppeteer'
   
   export async function analyzeSite(analysisId: string, url: string) {
     // 1. Lança browser
     const browser = await puppeteer.launch()
     
     // 2. Executa Lighthouse
     const result = await lighthouse(url, {
       port: browser.wsEndpoint().port
     })
     
     // 3. Calcula ARCO Index
     const arcoIndex = calculateARCOIndex(result.lhr)
     
     // 4. Salva resultados
     await supabase
       .from('analysis_requests')
       .update({
         status: 'completed',
         arco_index: arcoIndex
       })
       .eq('id', analysisId)
     
     await supabase
       .from('analysis_results')
       .insert({
         analysis_id: analysisId,
         lighthouse_performance: result.lhr.categories.performance.score * 100,
         lighthouse_accessibility: result.lhr.categories.accessibility.score * 100,
         lighthouse_seo: result.lhr.categories.seo.score * 100,
         lcp: result.lhr.audits['largest-contentful-paint'].numericValue,
         fid: result.lhr.audits['max-potential-fid'].numericValue,
         cls: result.lhr.audits['cumulative-layout-shift'].numericValue,
         raw_lighthouse_json: result.lhr
       })
     
     await browser.close()
   }
   ```

4. **Frontend Update** (Realtime)
   ```typescript
   // Componente escuta mudanças via Supabase Realtime
   useEffect(() => {
     const subscription = supabase
       .channel('analysis_updates')
       .on(
         'postgres_changes',
         {
           event: 'UPDATE',
           schema: 'public',
           table: 'analysis_requests',
           filter: `id=eq.${analysisId}`
         },
         (payload) => {
           if (payload.new.status === 'completed') {
             // Atualiza UI
             setAnalysis(payload.new)
           }
         }
       )
       .subscribe()
     
     return () => subscription.unsubscribe()
   }, [analysisId])
   ```

---

## 3. SEGURANÇA E RLS

### 🔐 Row Level Security Policies

#### **Princípio:** Cada usuário só vê seus próprios dados, exceto admins.

```sql
-- ============================================
-- ENABLE RLS
-- ============================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USER PROFILES
-- ============================================

-- Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins podem ver todos os perfis
CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================
-- ANALYSIS REQUESTS
-- ============================================

-- Usuários podem ver suas próprias análises
CREATE POLICY "Users can view own analyses"
  ON analysis_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Usuários podem criar análises
CREATE POLICY "Users can create analyses"
  ON analysis_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins podem ver todas as análises
CREATE POLICY "Admins can view all analyses"
  ON analysis_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================
-- PROJECTS
-- ============================================

-- Usuários podem ver seus próprios projetos
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Usuários podem criar projetos
CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar seus próprios projetos
CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- TIER-BASED ACCESS
-- ============================================

-- Análises de paid users têm mais dados disponíveis
CREATE POLICY "Paid users can access detailed metrics"
  ON analysis_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM analysis_requests ar
      JOIN user_profiles up ON ar.user_id = up.id
      WHERE ar.id = analysis_results.analysis_id
      AND (
        up.id = auth.uid() AND up.tier = 'paid'
        OR up.user_type = 'admin'
      )
    )
  );
```

### 🔒 Tier-Based Limits

```typescript
// src/lib/tier-limits.ts
export const TIER_LIMITS = {
  free: {
    monthly_analyses: 3,
    storage_mb: 100,
    support_tickets: 1,
    features: {
      lighthouse_analysis: true,
      arco_index: true,
      detailed_metrics: false,      // ❌
      uptime_monitoring: false,      // ❌
      campaign_tracking: false,      // ❌
      priority_support: false        // ❌
    }
  },
  paid: {
    monthly_analyses: 50,
    storage_mb: 5000,
    support_tickets: 10,
    features: {
      lighthouse_analysis: true,
      arco_index: true,
      detailed_metrics: true,        // ✅
      uptime_monitoring: true,       // ✅
      campaign_tracking: true,       // ✅
      priority_support: true         // ✅
    }
  }
}

// Middleware de validação
export function checkQuota(tier: string, resource: string) {
  const limits = TIER_LIMITS[tier as keyof typeof TIER_LIMITS]
  // Verifica se usuário tem permissão para acessar recurso
  return limits.features[resource as keyof typeof limits.features]
}
```

---

## 4. SISTEMA DE USUÁRIOS

### 👥 Hierarquia de Usuários

```
┌─────────────────────────────────────┐
│           ADMIN                      │
│  - Acesso total                      │
│  - Vê dados de todos os usuários    │
│  - Pode alterar roles                │
│  - Acessa analytics global           │
└─────────────────────────────────────┘
                │
                │
┌─────────────────────────────────────┐
│           PAID USER                  │
│  - 50 análises/mês                   │
│  - 5GB storage                       │
│  - Métricas detalhadas               │
│  - Uptime monitoring                 │
│  - Campaign tracking                 │
│  - Suporte prioritário               │
└─────────────────────────────────────┘
                │
                │
┌─────────────────────────────────────┐
│           FREE USER                  │
│  - 3 análises/mês                    │
│  - 100MB storage                     │
│  - ARCO Index básico                 │
│  - Sem monitoring                    │
│  - Suporte limitado                  │
└─────────────────────────────────────┘
```

### 🔄 Fluxo de Autenticação

```typescript
// 1. Login via Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// 2. Após login, trigger automático cria user_profile
-- SQL Trigger
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, tier, user_type)
  VALUES (NEW.id, 'free', 'client');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

// 3. Frontend verifica role
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'

function Dashboard() {
  const { user, loading } = useCurrentUser()
  
  if (user?.role === 'admin') {
    return <AdminDashboard />
  }
  
  return <UserDashboard />
}

// 4. Middleware protege rotas
// src/middleware.ts
export async function middleware(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('id', user?.id)
      .single()
    
    if (profile?.user_type !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}
```

---

## 5. ÍNDICE ARCO (Pollution Index)

### 🎯 O Que É o ARCO Index?

O **ARCO Index** é uma métrica proprietária que combina múltiplos fatores de performance web em um único score de 0-100, representando a "poluição digital" de um site.

**Quanto MAIOR o índice, MELHOR a performance** (menos "poluição").

### 📊 Cálculo do ARCO Index

```typescript
/**
 * Calcula o ARCO Index baseado nos resultados do Lighthouse
 * 
 * @param lighthouseResult - Resultado completo do Lighthouse
 * @returns ARCO Index (0-100)
 */
export function calculateARCOIndex(lighthouseResult: LighthouseResult): number {
  // Pesos para cada categoria
  const weights = {
    performance: 0.35,      // 35% - Mais importante
    accessibility: 0.20,    // 20%
    bestPractices: 0.20,    // 20%
    seo: 0.15,              // 15%
    pwa: 0.10               // 10% - Menos importante
  }
  
  // Extrai scores do Lighthouse (0-1)
  const scores = {
    performance: lighthouseResult.categories.performance.score || 0,
    accessibility: lighthouseResult.categories.accessibility.score || 0,
    bestPractices: lighthouseResult.categories['best-practices'].score || 0,
    seo: lighthouseResult.categories.seo.score || 0,
    pwa: lighthouseResult.categories.pwa.score || 0
  }
  
  // Pontuação base (0-70)
  let baseScore = 0
  baseScore += scores.performance * weights.performance
  baseScore += scores.accessibility * weights.accessibility
  baseScore += scores.bestPractices * weights.bestPractices
  baseScore += scores.seo * weights.seo
  baseScore += scores.pwa * weights.pwa
  
  // Converte para 0-70
  baseScore = baseScore * 70
  
  // Bonificações Core Web Vitals (0-30)
  let cwvBonus = 0
  
  // LCP (Largest Contentful Paint)
  const lcp = lighthouseResult.audits['largest-contentful-paint'].numericValue
  if (lcp < 2500) cwvBonus += 10      // Excelente
  else if (lcp < 4000) cwvBonus += 5  // Bom
  
  // FID (First Input Delay) ou TBT (Total Blocking Time)
  const tbt = lighthouseResult.audits['total-blocking-time'].numericValue
  if (tbt < 200) cwvBonus += 10
  else if (tbt < 600) cwvBonus += 5
  
  // CLS (Cumulative Layout Shift)
  const cls = lighthouseResult.audits['cumulative-layout-shift'].numericValue
  if (cls < 0.1) cwvBonus += 10       // Excelente
  else if (cls < 0.25) cwvBonus += 5  // Bom
  
  // Score final (0-100)
  const arcoIndex = Math.round(baseScore + cwvBonus)
  
  return Math.min(100, Math.max(0, arcoIndex))
}
```

### 📈 Onde o ARCO Index Aparece

#### **Backend (Database)**

1. **Tabela `analysis_requests`**
   ```sql
   SELECT id, url, arco_index, created_at
   FROM analysis_requests
   WHERE user_id = auth.uid()
   ORDER BY created_at DESC;
   ```

2. **Tabela `performance_metrics`** (histórico diário)
   ```sql
   SELECT date, arco_index
   FROM performance_metrics
   WHERE project_id = $1
   ORDER BY date DESC
   LIMIT 30;  -- Últimos 30 dias
   ```

#### **Frontend (Componentes)**

1. **Dashboard Principal** (`/dashboard`)
   ```tsx
   // src/app/dashboard/page.tsx
   import { getUserAnalyses } from './actions'
   
   export default async function Dashboard() {
     const analyses = await getUserAnalyses()
     const latestArcoIndex = analyses[0]?.arco_index || 0
     
     return (
       <div className="arco-hero">
         <div className="arco-score">{latestArcoIndex}</div>
         <div className="arco-grade">
           {getGrade(latestArcoIndex)}
         </div>
       </div>
     )
   }
   
   function getGrade(score: number): string {
     if (score >= 90) return 'A+'
     if (score >= 80) return 'A'
     if (score >= 70) return 'B'
     if (score >= 60) return 'C'
     return 'D'
   }
   ```

2. **Página de Overview** (`/dashboard/overview`)
   ```tsx
   // Gráfico de evolução do ARCO Index
   import { getARCOIndexHistory } from '../actions'
   import { AreaChart } from 'recharts'
   
   export default async function Overview() {
     const history = await getARCOIndexHistory(30)  // Últimos 30 dias
     
     return (
       <AreaChart data={history}>
         <Area
           type="monotone"
           dataKey="arco_index"
           stroke="#8884d8"
           fill="#8884d8"
         />
       </AreaChart>
     )
   }
   ```

3. **Página de Diagnóstico** (`/dashboard/diagnostico`)
   ```tsx
   // Lista de análises com ARCO Index
   <Table>
     <TableHead>
       <TableRow>
         <TableCell>URL</TableCell>
         <TableCell>ARCO Index</TableCell>
         <TableCell>Status</TableCell>
         <TableCell>Data</TableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {analyses.map(analysis => (
         <TableRow key={analysis.id}>
           <TableCell>{analysis.url}</TableCell>
           <TableCell>
             <Badge variant={getBadgeVariant(analysis.arco_index)}>
               {analysis.arco_index}
             </Badge>
           </TableCell>
           <TableCell>{analysis.status}</TableCell>
           <TableCell>{formatDate(analysis.created_at)}</TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
   ```

### 🎨 Visualização do ARCO Index

```
┌────────────────────────────────────────┐
│         ARCO INDEX: 87                 │
│                                        │
│         [████████░░] A                 │
│                                        │
│  Performance:       92 ✓               │
│  Accessibility:     85 ✓               │
│  Best Practices:    88 ✓               │
│  SEO:               84 ✓               │
│  PWA:               70 ⚠               │
│                                        │
│  Core Web Vitals:                      │
│  • LCP: 1.8s     ✓ Excelente           │
│  • FID: 45ms     ✓ Excelente           │
│  • CLS: 0.08     ✓ Excelente           │
└────────────────────────────────────────┘
```

---

## 6. INTEGRAÇÃO FRONTEND-BACKEND

### 🔌 Server Actions (Next.js 15)

```typescript
// src/app/dashboard/actions.ts
'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Busca todas as análises do usuário
 */
export async function getUserAnalyses() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('analysis_requests')
    .select(`
      id,
      url,
      status,
      arco_index,
      created_at,
      analysis_results (
        lighthouse_performance,
        lighthouse_accessibility,
        lighthouse_seo,
        lcp,
        fid,
        cls
      )
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

/**
 * Busca histórico do ARCO Index
 */
export async function getARCOIndexHistory(days: number = 30) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('performance_metrics')
    .select('date, arco_index')
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('date', { ascending: true })
  
  if (error) throw error
  return data
}

/**
 * Solicita nova análise
 */
export async function requestAnalysis(url: string) {
  const supabase = await createServerClient()
  
  // Valida URL
  if (!url.startsWith('http')) {
    throw new Error('URL inválida')
  }
  
  // Verifica quota
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('tier, monthly_analysis_count')
    .single()
  
  if (!profile) throw new Error('Perfil não encontrado')
  
  const limits = {
    free: 3,
    paid: 50
  }
  
  if (profile.monthly_analysis_count >= limits[profile.tier as keyof typeof limits]) {
    throw new Error('Quota excedida')
  }
  
  // Cria análise
  const { data, error } = await supabase
    .from('analysis_requests')
    .insert({ url, status: 'pending' })
    .select()
    .single()
  
  if (error) throw error
  
  // Incrementa contador
  await supabase
    .from('user_profiles')
    .update({
      monthly_analysis_count: profile.monthly_analysis_count + 1
    })
    .eq('id', profile.id)
  
  // Revalida cache
  revalidatePath('/dashboard/diagnostico')
  
  return data
}
```

### 🎣 Hooks Personalizados

```typescript
// src/lib/hooks/use-analyses.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserAnalyses } from '@/app/dashboard/actions'

export function useAnalyses() {
  return useQuery({
    queryKey: ['analyses'],
    queryFn: getUserAnalyses,
    refetchInterval: 30000  // Atualiza a cada 30s
  })
}

// Uso no componente
function DiagnosticosPage() {
  const { data: analyses, isLoading, error } = useAnalyses()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return <AnalysesTable data={analyses} />
}
```

---

## 📝 RESUMO

### ✅ O Que Está Implementado

- [x] 21 tabelas no banco de dados
- [x] 70+ índices otimizados
- [x] 60+ RLS policies
- [x] Sistema de tiers (free/paid)
- [x] Sistema de roles (client/admin)
- [x] Tipos TypeScript completos
- [x] ARCO Index definido e documentado
- [x] Estrutura de Server Actions
- [x] Integração Supabase + Next.js

### ⚠️ O Que Falta Implementar

- [ ] Edge Functions para processamento Lighthouse
- [ ] Webhooks para trigger automático
- [ ] Substituir mock data por dados reais no frontend
- [ ] Sistema de background jobs (Inngest)
- [ ] Realtime subscriptions
- [ ] Rate limiting (Upstash Redis)
- [ ] Monitoramento de uptime (cron jobs)
- [ ] Integração com APIs externas (Google Ads, Meta Ads)

### 🎯 Próximos Passos

1. Criar Edge Function para análise Lighthouse
2. Implementar Server Actions faltantes
3. Substituir dados mock no frontend
4. Adicionar componentes de Empty State
5. Implementar Realtime para updates ao vivo
6. Criar sistema de notificações
7. Adicionar testes E2E

---

**Documentação criada em:** 06 de outubro de 2025  
**Última atualização:** 06 de outubro de 2025  
**Versão:** 1.0.0
