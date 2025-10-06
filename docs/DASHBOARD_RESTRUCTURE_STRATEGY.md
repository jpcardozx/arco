# 🚨 DASHBOARD RESTRUCTURE - Alinhamento com Negócio Real

## 🎯 DIAGNÓSTICO CRÍTICO

### ❌ PROBLEMAS IDENTIFICADOS

#### 1. **Desconexão com o Negócio Real**
```
ATUAL: CRM genérico (clients, leads, tasks)
REAL:  Agência de Performance Web + Tráfego Pago

❌ Não há tracking de projetos web
❌ Não há métricas de performance (LCP, FID, CLS)
❌ Não há gestão de campanhas de tráfego
❌ Não há ROI calculado por projeto
❌ Não há Core Web Vitals monitorados
```

#### 2. **Dashboards Sem Coesão**
```
ADMIN:     Stats genéricos (users, clients, tasks)
USER:      Produtividade genérica (my_leads, my_tasks)
CLIENT:    Métricas desconectadas (leads_generated)

❌ Não há fluxo de trabalho unificado
❌ Não há KPIs específicos de agência web
❌ Não há tracking de entrega de projetos
❌ Não há métricas de performance técnica
```

#### 3. **UI/UX Pobre e Desatualizado**
```
❌ Sem design system coeso
❌ Sem micro-interações significativas
❌ Sem feedback visual de progresso
❌ Sem gamification para engajamento
❌ Sem personalização por perfil
```

---

## 🎯 MODELO DE NEGÓCIO REAL

### **ARCO = Agência de Performance Web + Tráfego Pago**

```
┌────────────────────────────────────────────────────────────┐
│                    JORNADA DO CLIENTE                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. CAPTAÇÃO (URL Analyzer)                               │
│     └─ Lead anônimo analisa domínio                       │
│     └─ Lighthouse scores revelam problemas                │
│     └─ CTA: "Receba auditoria completa grátis"           │
│                                                            │
│  2. QUALIFICAÇÃO (Discovery Call)                         │
│     └─ Lead vira oportunidade                             │
│     └─ Diagnóstico técnico + negócio                      │
│     └─ Proposta customizada                               │
│                                                            │
│  3. ONBOARDING (Projeto Iniciado)                         │
│     └─ Cliente vira projeto ativo                         │
│     └─ Kickoff + Setup                                    │
│     └─ Acesso ao dashboard premium                        │
│                                                            │
│  4. EXECUÇÃO (Desenvolvimento)                            │
│     └─ Sprints semanais                                   │
│     └─ Deploy contínuo                                    │
│     └─ Métricas em tempo real                             │
│                                                            │
│  5. LANÇAMENTO (Go-Live)                                  │
│     └─ Performance validada                               │
│     └─ Core Web Vitals green                              │
│     └─ Campanhas de tráfego iniciadas                     │
│                                                            │
│  6. GROWTH (Tráfego Pago)                                 │
│     └─ Campanhas Google Ads                               │
│     └─ Campanhas Meta Ads                                 │
│     └─ Otimização contínua (CRO)                          │
│                                                            │
│  7. RETENÇÃO (Suporte Contínuo)                           │
│     └─ Manutenção técnica                                 │
│     └─ Otimizações mensais                                │
│     └─ Consultoria estratégica                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🏗️ NOVA ARQUITETURA DE DASHBOARDS

### 1️⃣ **AGENCY DASHBOARD (ex-Admin)**
**Usuário:** CEO, Head of Ops, Project Managers  
**Foco:** Visão macro da operação da agência

#### KPIs Críticos
```typescript
interface AgencyMetrics {
  // REVENUE & GROWTH
  mrr: number                    // Monthly Recurring Revenue
  newMRR: number                 // New MRR this month
  churnMRR: number               // Lost MRR (churn)
  ltv: number                    // Customer Lifetime Value
  cac: number                    // Customer Acquisition Cost
  
  // PROJECTS & DELIVERY
  activeProjects: number         // Projetos em execução
  avgDeliveryTime: number        // Tempo médio de entrega (dias)
  onTimeDelivery: number         // % entregues no prazo
  projectsCompleted: number      // Projetos finalizados (mês)
  
  // PIPELINE & CONVERSION
  pipelineValue: number          // Valor total do pipeline
  conversionRate: number         // % leads → clientes
  avgProjectValue: number        // Ticket médio
  
  // PERFORMANCE TRACKING
  avgLCPImprovement: number      // Melhoria média LCP (ms)
  avgFIDImprovement: number      // Melhoria média FID (ms)
  avgCLSImprovement: number      // Melhoria média CLS (score)
  clientsSatisfaction: number    // NPS médio
  
  // PAID TRAFFIC
  totalAdSpend: number           // Gasto total em ads
  avgROAS: number                // Return on Ad Spend
  leadsFromAds: number           // Leads de tráfego pago
  costPerLead: number            // Custo por lead
}
```

#### Views Principais
1. **Executive Summary** - MRR, pipeline, delivery rate
2. **Projects Pipeline** - Kanban (Discovery → Dev → Testing → Live → Growth)
3. **Team Performance** - Produtividade por dev/PM
4. **Financial Dashboard** - Revenue, expenses, profit
5. **Client Health** - NPS, churn risk, upsell opportunities

---

### 2️⃣ **DEVELOPER DASHBOARD (ex-User)**
**Usuário:** Devs, Designers, Tech Leads  
**Foco:** Produtividade técnica e qualidade de entrega

#### KPIs Críticos
```typescript
interface DeveloperMetrics {
  // MY PROJECTS
  assignedProjects: number       // Projetos atribuídos
  tasksToday: number             // Tasks de hoje
  blockedTasks: number           // Tasks bloqueadas
  reviewPending: number          // PRs aguardando review
  
  // PERFORMANCE QUALITY
  avgLightScore: number          // Lighthouse médio dos meus projetos
  codeQualityScore: number       // Sonar/lint score
  bugsReported: number           // Bugs em produção (último mês)
  hotfixesDone: number           // Hotfixes necessários
  
  // DELIVERY METRICS
  velocityPoints: number         // Story points entregues (sprint)
  commitFrequency: number        // Commits/dia
  deploysThisWeek: number        // Deploys realizados
  avgPRTime: number              // Tempo médio PR (horas)
  
  // LEARNING & GROWTH
  newTechsUsed: string[]         // Novas tecnologias (mês)
  certifications: string[]       // Certificações
  mentoringHours: number         // Horas de mentoria
}
```

#### Views Principais
1. **My Sprint** - Tasks, PRs, blockers
2. **Code Quality** - Lighthouse, Sonar, lint reports
3. **Project Boards** - Kanban técnico por projeto
4. **Performance Lab** - Core Web Vitals de projetos ativos
5. **Knowledge Base** - Docs, snippets, best practices

---

### 3️⃣ **CLIENT DASHBOARD (Premium)**
**Usuário:** Clientes da agência  
**Foco:** ROI, performance do site, campanhas, transparência

#### KPIs Críticos
```typescript
interface ClientMetrics {
  // PROJECT PROGRESS
  projectPhase: 'discovery' | 'development' | 'testing' | 'live' | 'growth'
  completionPercent: number      // % do projeto concluído
  nextMilestone: string          // Próxima entrega
  daysToLaunch: number           // Dias para go-live
  
  // WEBSITE PERFORMANCE
  currentLCP: number             // LCP atual (ms)
  currentFID: number             // FID atual (ms)
  currentCLS: number             // CLS atual (score)
  lighthouseScore: number        // Score geral
  performanceGrade: 'A' | 'B' | 'C' | 'D' | 'F'
  
  // TRAFFIC & CONVERSIONS
  monthlyVisitors: number        // Visitantes/mês
  conversionRate: number         // Taxa de conversão
  leadsGenerated: number         // Leads gerados
  costPerLead: number            // Custo por lead
  
  // PAID CAMPAIGNS (se ativo)
  activeCampaigns: number        // Campanhas ativas
  monthlyAdSpend: number         // Gasto mensal em ads
  roas: number                   // Return on Ad Spend
  impressions: number            // Impressões
  clicks: number                 // Cliques
  ctr: number                    // Click-through rate
  
  // BUSINESS IMPACT
  revenueImpact: number          // Estimativa de impacto na receita
  roi: number                    // ROI calculado
  timeSaved: number              // Tempo economizado (horas)
}
```

#### Tabs Principais
1. **Overview** - Project progress, performance grade, ROI
2. **Performance** - Core Web Vitals, Lighthouse, comparação
3. **Traffic & Leads** - Analytics integrado (GA4)
4. **Campaigns** - Google Ads + Meta Ads dashboard
5. **Reports** - Relatórios mensais, benchmarks
6. **Support** - Tickets, chat, knowledge base

---

## 🎨 DESIGN SYSTEM RENOVADO

### Princípios de Design

#### 1. **Data-Driven Visualization**
```
❌ Cards estáticos com números
✅ Gráficos interativos com drill-down
✅ Sparklines para tendências
✅ Heatmaps para performance
✅ Real-time updates (websockets)
```

#### 2. **Progressive Disclosure**
```
❌ Tudo visível de uma vez
✅ Níveis de informação (overview → details → deep dive)
✅ Expandable sections
✅ Modal overlays para contexto
✅ Tooltips inteligentes
```

#### 3. **Action-Oriented UX**
```
❌ Dashboards passivos (só exibem dados)
✅ Call-to-actions contextuais
✅ Quick actions (aprovar, comentar, escalar)
✅ Drag & drop para workflow
✅ Shortcuts de teclado
```

#### 4. **Gamification & Engagement**
```
✅ Achievement system (badges)
✅ Leaderboards (friendly competition)
✅ Streaks (dias consecutivos de deploy)
✅ Level up (skill progression)
✅ Challenges semanais
```

#### 5. **Personalization**
```
✅ Tema customizável (light/dark/auto)
✅ Widgets reordenáveis (drag & drop)
✅ Filtros salvos
✅ Notificações customizadas
✅ Dashboard favoritos
```

---

## 🗄️ NOVA ESTRUTURA DE BANCO DE DADOS

### Tabelas Core (Novas)

```sql
-- ============================================
-- PROJECTS (Core da agência)
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  -- Project Info
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('website', 'webapp', 'ecommerce', 'landing')),
  status TEXT CHECK (status IN ('discovery', 'development', 'testing', 'staging', 'live', 'growth', 'maintenance')),
  
  -- Timeline
  kickoff_date DATE,
  expected_launch DATE,
  actual_launch DATE,
  
  -- Team
  project_manager_id UUID REFERENCES users(id),
  tech_lead_id UUID REFERENCES users(id),
  designer_id UUID REFERENCES users(id),
  
  -- Financial
  contract_value DECIMAL(10,2),
  paid_amount DECIMAL(10,2),
  pending_amount DECIMAL(10,2),
  
  -- Progress Tracking
  completion_percent INTEGER DEFAULT 0,
  milestones JSONB,
  
  -- URLs
  production_url TEXT,
  staging_url TEXT,
  github_repo TEXT,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PERFORMANCE_METRICS (Core Web Vitals)
-- ============================================
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  
  -- Lighthouse Scores
  performance_score INTEGER CHECK (performance_score >= 0 AND performance_score <= 100),
  accessibility_score INTEGER CHECK (accessibility_score >= 0 AND accessibility_score <= 100),
  best_practices_score INTEGER CHECK (best_practices_score >= 0 AND best_practices_score <= 100),
  seo_score INTEGER CHECK (seo_score >= 0 AND seo_score <= 100),
  
  -- Core Web Vitals
  lcp DECIMAL(8,2),              -- Largest Contentful Paint (ms)
  fid DECIMAL(8,2),              -- First Input Delay (ms)
  cls DECIMAL(6,4),              -- Cumulative Layout Shift (score)
  fcp DECIMAL(8,2),              -- First Contentful Paint (ms)
  ttfb DECIMAL(8,2),             -- Time to First Byte (ms)
  
  -- Context
  device_type TEXT CHECK (device_type IN ('mobile', 'desktop', 'tablet')),
  connection_type TEXT,
  user_agent TEXT,
  
  -- Metadata
  measured_at TIMESTAMPTZ DEFAULT NOW(),
  baseline BOOLEAN DEFAULT false,  -- É baseline inicial?
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAMPAIGNS (Tráfego Pago)
-- ============================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES clients(id),
  
  -- Campaign Info
  name TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('google_ads', 'meta_ads', 'linkedin_ads', 'tiktok_ads')),
  type TEXT CHECK (type IN ('search', 'display', 'shopping', 'video', 'social')),
  status TEXT CHECK (status IN ('draft', 'pending', 'active', 'paused', 'completed')),
  
  -- Budget
  daily_budget DECIMAL(10,2),
  total_budget DECIMAL(10,2),
  spent_amount DECIMAL(10,2) DEFAULT 0,
  
  -- Dates
  start_date DATE,
  end_date DATE,
  
  -- Targeting
  target_audience JSONB,
  keywords JSONB,
  locations JSONB,
  
  -- URLs
  landing_page_url TEXT,
  tracking_params JSONB,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAMPAIGN_METRICS (Métricas diárias)
-- ============================================
CREATE TABLE campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  
  -- Core Metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  
  -- Calculated Metrics
  ctr DECIMAL(6,4),              -- Click-Through Rate
  cpc DECIMAL(8,2),              -- Cost Per Click
  cpa DECIMAL(10,2),             -- Cost Per Acquisition
  roas DECIMAL(8,2),             -- Return on Ad Spend
  
  -- Quality Metrics
  quality_score DECIMAL(4,2),
  relevance_score DECIMAL(4,2),
  
  -- Date
  date DATE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, date)
);

-- ============================================
-- SPRINTS (Gestão Ágil)
-- ============================================
CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  
  -- Sprint Info
  name TEXT NOT NULL,
  number INTEGER,
  status TEXT CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  
  -- Dates
  start_date DATE,
  end_date DATE,
  
  -- Planning
  story_points INTEGER,
  velocity INTEGER,
  
  -- Goals
  goals TEXT[],
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TASKS (Tasks técnicas de projetos)
-- ============================================
-- Modificar tabela tasks existente para conectar com projects
ALTER TABLE tasks ADD COLUMN project_id UUID REFERENCES projects(id);
ALTER TABLE tasks ADD COLUMN sprint_id UUID REFERENCES sprints(id);
ALTER TABLE tasks ADD COLUMN story_points INTEGER;
ALTER TABLE tasks ADD COLUMN type TEXT CHECK (type IN ('feature', 'bug', 'hotfix', 'refactor', 'docs', 'test'));
ALTER TABLE tasks ADD COLUMN tech_stack TEXT[];
ALTER TABLE tasks ADD COLUMN git_branch TEXT;
ALTER TABLE tasks ADD COLUMN pr_url TEXT;

-- ============================================
-- CLIENT_REPORTS (Relatórios mensais)
-- ============================================
CREATE TABLE client_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES clients(id),
  
  -- Report Info
  period_start DATE,
  period_end DATE,
  report_type TEXT CHECK (report_type IN ('monthly', 'quarterly', 'campaign', 'performance')),
  
  -- Metrics Summary
  metrics_summary JSONB,
  
  -- Files
  pdf_url TEXT,
  
  -- Status
  generated_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔄 MIGRAÇÃO & ROLLOUT

### Fase 1: Backend Foundation (Semana 1)
```bash
✅ Criar novas tabelas (projects, performance_metrics, campaigns, etc.)
✅ Migrar dados existentes (clients → projects)
✅ Criar SQL functions otimizadas
✅ Setup RLS policies por role
✅ Regenerar TypeScript types
```

### Fase 2: Agency Dashboard (Semana 2)
```bash
✅ Refatorar AdminDashboard → AgencyDashboard
✅ Implementar novos KPIs (MRR, pipeline, delivery)
✅ Criar Projects Pipeline (Kanban)
✅ Integrar Performance Tracking
✅ Dashboard financeiro
```

### Fase 3: Developer Dashboard (Semana 3)
```bash
✅ Refatorar UserDashboard → DeveloperDashboard
✅ Sprint Board com tasks técnicas
✅ Performance Lab (Lighthouse integration)
✅ Code Quality metrics
✅ PR/Deploy tracking
```

### Fase 4: Client Dashboard Premium (Semana 4)
```bash
✅ Refatorar ClientDashboard com novo design
✅ Project Progress visual
✅ Performance Dashboard (Core Web Vitals)
✅ Campaigns Dashboard (Google Ads + Meta)
✅ Reports & Downloads
```

### Fase 5: Design System & UX (Semana 5-6)
```bash
✅ Implementar novo design system
✅ Micro-interações e animações
✅ Gamification system
✅ Personalization features
✅ Mobile optimization
```

---

## 📊 MÉTRICAS DE SUCESSO DA REESTRUTURAÇÃO

### Business Metrics
- **Time to Value:** Reduzir de 60 dias → 30 dias (sales cycle)
- **Client Satisfaction:** Aumentar NPS de 6/10 → 9/10
- **Churn Rate:** Reduzir de >15% → <5%
- **Upsell Rate:** Aumentar de 20% → 50%

### Product Metrics
- **Dashboard Engagement:** 80% clientes acessam semanalmente
- **Feature Adoption:** 70% dos clientes usam campanhas/reports
- **Support Tickets:** Reduzir em 40% (self-service)

### Technical Metrics
- **Performance:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Uptime:** 99.9% uptime
- **API Response:** p95 < 200ms

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### 1. **Validação com Stakeholders** (1 dia)
- [ ] Apresentar proposta para CEO/CTO
- [ ] Validar KPIs com equipe de vendas
- [ ] Revisar com desenvolvedores (feasibility)
- [ ] Ajustar prioridades conforme feedback

### 2. **Setup do Projeto** (1 dia)
- [ ] Criar branch `feature/dashboard-restructure`
- [ ] Documentar ADRs (Architecture Decision Records)
- [ ] Setup tracking de progresso (Linear/Jira)
- [ ] Definir critérios de aceitação

### 3. **Kickoff Técnico** (1 dia)
- [ ] Design review (Figma prototypes)
- [ ] Backend schema review
- [ ] API contracts definition
- [ ] Test strategy definition

### 4. **Execução** (6 semanas)
- [ ] Seguir roadmap Fase 1-5
- [ ] Daily standups com equipe
- [ ] Weekly demos para stakeholders
- [ ] Continuous deployment (feature flags)

---

## 💡 REFERÊNCIAS & INSPIRAÇÕES

### Dashboards de Agências Web
- **Webflow Dashboard** - Client collaboration
- **Vercel Dashboard** - Performance metrics
- **Netlify Dashboard** - Deploy tracking

### Dashboards de Tráfego Pago
- **Google Ads Dashboard** - Campaign management
- **Facebook Business Manager** - Multi-account view
- **HubSpot Dashboard** - Marketing automation

### Dashboards Técnicos
- **Linear** - Sprint planning & velocity
- **GitHub Projects** - Kanban técnico
- **Sentry Dashboard** - Error tracking & performance

---

**Documento criado em:** 2025-01-05  
**Autor:** ARCO Development Team  
**Status:** 🚨 CRÍTICO - Aprovação pendente  
**Próxima Ação:** Apresentar para stakeholders
