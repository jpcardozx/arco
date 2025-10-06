# 🔍 AUDIT DE PÁGINAS + ESTRATÉGIA DE LEAD NURTURING

## 📊 ANÁLISE COMPLETA DAS 22+ PÁGINAS

### 🗑️ **PÁGINAS PARA DESCARTAR** (Desconectadas da agência web)

#### 1. **Agenda / Calendar** (`/dashboard/agenda`)
- ❌ **Motivo:** Sistema de calendário genérico para "agendamentos de visitas" (imobiliário)
- ❌ **Contexto:** Não há agendamentos no modelo de agência web
- ✅ **Alternativa:** Usar `/dashboard/appointments` para calls/reuniões

#### 2. **Aliquotas** (`/dashboard/aliquotas`)
- ❌ **Motivo:** Cálculo de impostos/alíquotas (contexto imobiliário/contábil)
- ❌ **Contexto:** Irrelevante para agência web
- ✅ **Alternativa:** Descartar completamente

#### 3. **Jetimob Integration** (`/dashboard/jetimob`)
- ❌ **Motivo:** Integração com CRM imobiliário específico
- ❌ **Contexto:** Não há Jetimob em agência web
- ✅ **Alternativa:** Descartar completamente

#### 4. **Reviews** (se existir)
- ❌ **Motivo:** Sistema de avaliações/reviews (contexto imobiliário)
- ❌ **Contexto:** Testimonials vão no site público, não no dashboard
- ✅ **Alternativa:** Descartar ou mover para site público

#### 5. **Studio** (`/studio`)
- ❌ **Motivo:** Contexto não identificado claramente
- ⚠️ **Decisão:** Avaliar se há valor, caso contrário descartar

---

### ♻️ **PÁGINAS PARA REAPROVEITAR** (Com modificações)

#### 1. ✅ **Clients** (`/dashboard/clients`) → **Projects Hub**
**Reaproveitar:** 80%  
**Modificações:**
```typescript
// ANTES: CRM genérico (clients)
interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'active' | 'inactive'
}

// DEPOIS: Projects com clientes
interface Project {
  id: string
  client_id: string
  client_name: string              // JOIN com clients
  client_company: string
  
  // Project Info
  name: string                      // "E-commerce Responsivo"
  type: 'website' | 'webapp' | 'ecommerce' | 'landing'
  status: 'discovery' | 'development' | 'testing' | 'live' | 'growth'
  
  // Progress
  completion_percent: number        // 78%
  next_milestone: string            // "Integration com Gateway"
  days_to_launch: number           // 23 dias
  
  // Performance (se live)
  current_lcp?: number             // 1.8s
  current_fid?: number             // 67ms
  current_cls?: number             // 0.08
  lighthouse_score?: number        // 96/100
}
```

**Nova View:**
- Kanban Board: Discovery → Dev → Testing → Live → Growth
- Performance Tracking por projeto
- Team assignments
- Financial overview

---

#### 2. ✅ **Tasks** (`/dashboard/tasks`) → **Sprint Board**
**Reaproveitar:** 70%  
**Modificações:**
```typescript
// ANTES: Tasks genéricas
interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed'
  due_date: string
}

// DEPOIS: Tasks técnicas com projeto/sprint
interface TechnicalTask {
  id: string
  project_id: string               // FK projects
  sprint_id: string                // FK sprints
  
  // Task Info
  title: string                    // "[FE] Implement Checkout Flow"
  description: string
  type: 'feature' | 'bug' | 'hotfix' | 'refactor' | 'docs' | 'test'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in_progress' | 'review' | 'done'
  
  // Agile
  story_points: number             // 5
  assigned_to: string              // UUID do dev
  
  // Tech
  tech_stack: string[]             // ['Next.js', 'React Query', 'Supabase']
  git_branch: string               // 'feature/checkout-flow'
  pr_url: string                   // GitHub PR link
  
  // Dates
  due_date: string
  completed_at?: string
}
```

**Nova View:**
- Kanban por Sprint
- Story points tracking
- Velocity charts
- PR integration

---

#### 3. ✅ **Leads** (`/dashboard/leads`) → **Sales Pipeline**
**Reaproveitar:** 60%  
**Modificações:**
```typescript
// ANTES: Leads genéricos
interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: string
}

// DEPOIS: Opportunities com origem URL Analyzer
interface Opportunity {
  id: string
  
  // Lead Info
  name: string
  email: string
  phone: string
  company: string
  
  // Source Tracking (CONEXÃO COM URL ANALYZER)
  source: 'url_analyzer' | 'form' | 'referral' | 'ads'
  domain_analysis_id?: string      // FK domain_analysis_requests
  domain_analyzed?: string         // exemplo.com.br
  initial_lcp?: number             // LCP inicial detectado (4.2s)
  
  // Pipeline
  stage: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  temperature: 'cold' | 'warm' | 'hot'
  
  // Estimated Value
  estimated_value: number          // R$ 48,000
  probability: number              // 75%
  
  // Next Steps
  next_action: string              // "Send proposal"
  next_action_date: string
}
```

**Nova View:**
- Pipeline Kanban (New → Qualified → Proposal → Won)
- Origem do lead (URL Analyzer badge)
- Performance issues detectados
- Valor estimado do projeto

---

#### 4. ✅ **Analytics** (`/dashboard/analytics`) → **Performance Analytics**
**Reaproveitar:** 50%  
**Modificações:**
```typescript
// ANTES: Analytics genéricos (visitors, leads, closedProjects)
interface PerformanceMetrics {
  totalVisitors: number
  totalLeads: number
  closedProjects: number
  conversionRate: number
}

// DEPOIS: Agency Performance Analytics
interface AgencyAnalytics {
  // Revenue
  mrr: number                      // Monthly Recurring Revenue
  new_mrr: number
  churn_mrr: number
  
  // Projects
  active_projects: number
  completed_projects: number
  avg_delivery_time: number        // dias
  on_time_delivery: number         // %
  
  // Performance Improvements
  avg_lcp_improvement: number      // -2.1s
  avg_fid_improvement: number      // -89ms
  avg_cls_improvement: number      // -0.15
  projects_with_green_vitals: number  // 87%
  
  // Paid Traffic
  total_ad_spend: number
  avg_roas: number                 // Return on Ad Spend
  leads_from_ads: number
  cost_per_lead: number
}
```

**Nova View:**
- Revenue dashboard (MRR, churn)
- Performance improvements tracking
- Traffic & Campaigns overview
- Team productivity metrics

---

#### 5. ✅ **Campaigns** (`/dashboard/campaigns`) → **Paid Traffic Manager**
**Reaproveitar:** 80%  
**Modificações:**
```typescript
// ANTES: Campanhas genéricas (sem estrutura clara)
// DEPOIS: Google Ads + Meta Ads Manager

interface Campaign {
  id: string
  project_id: string               // FK projects
  client_id: string
  
  // Campaign Info
  name: string                     // "E-commerce - Google Search"
  platform: 'google_ads' | 'meta_ads' | 'linkedin_ads' | 'tiktok_ads'
  type: 'search' | 'display' | 'shopping' | 'video' | 'social'
  status: 'draft' | 'pending' | 'active' | 'paused' | 'completed'
  
  // Budget
  daily_budget: number             // R$ 400
  total_budget: number             // R$ 12,000
  spent_amount: number             // R$ 8,450
  
  // Metrics (agregado de campaign_metrics)
  impressions: number              // 450k
  clicks: number                   // 6.2k
  conversions: number              // 87
  cost: number                     // R$ 8,450
  ctr: number                      // 1.38%
  cpc: number                      // R$ 1.36
  cpa: number                      // R$ 97
  roas: number                     // 5.2x
  
  // Dates
  start_date: string
  end_date: string
}
```

**Nova View:**
- Google Ads dashboard integrado
- Meta Ads dashboard integrado
- Real-time metrics
- Budget tracking + alertas
- ROAS calculator

---

#### 6. ✅ **Finance** (`/dashboard/finance`) → **Revenue Tracker**
**Reaproveitar:** 70%  
**Modificações:**
```typescript
// ANTES: Financeiro genérico
// DEPOIS: Agency Revenue & Payments

interface FinancialDashboard {
  // Revenue
  mrr: number                      // R$ 127k
  arr: number                      // Annual Recurring Revenue
  new_business: number             // New deals this month
  expansion: number                // Upsells
  churn: number                    // Lost revenue
  
  // Projects
  total_contracted: number         // R$ 580k (pipeline)
  invoiced_this_month: number     // R$ 156k
  received_this_month: number     // R$ 134k
  pending_invoices: number         // R$ 45k
  
  // Expenses (se aplicável)
  team_costs: number
  ads_spend: number
  tools_subscriptions: number
  net_profit: number
}

interface Invoice {
  id: string
  project_id: string
  client_name: string
  
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  due_date: string
  paid_at?: string
}
```

**Nova View:**
- MRR tracking + chart
- Invoices management
- Payment status
- Financial projections

---

#### 7. ✅ **Commissions** (`/dashboard/commissions`) → **Team Performance**
**Reaproveitar:** 40%  
**Modificações:**
```typescript
// ANTES: Comissões (contexto imobiliário)
// DEPOIS: Team Performance & Bonuses

interface TeamMember {
  id: string
  name: string
  role: 'developer' | 'designer' | 'pm' | 'sales'
  
  // Performance
  projects_completed: number
  avg_lighthouse_score: number     // Devs only
  avg_delivery_time: number        // dias
  bugs_in_production: number
  
  // Metrics
  velocity_points: number          // Sprint velocity
  code_quality_score: string       // A+, A, B, C
  client_satisfaction: number      // NPS médio
  
  // Compensation (se aplicável)
  base_salary: number
  performance_bonus: number
  total_earned: number
}
```

**Nova View:**
- Team leaderboard
- Individual performance
- Bonuses tracker
- Skills matrix

---

#### 8. ✅ **Documents** (`/dashboard/documents`) → **Project Assets**
**Reaproveitar:** 60%  
**Modificações:**
```typescript
// ANTES: Documentos genéricos
// DEPOIS: Project Assets & Deliverables

interface ProjectDocument {
  id: string
  project_id: string
  
  // Document Info
  name: string
  type: 'proposal' | 'contract' | 'design' | 'report' | 'invoice' | 'other'
  file_url: string
  file_size: number
  
  // Metadata
  uploaded_by: string
  uploaded_at: string
  client_visible: boolean          // Visible no client dashboard?
  
  // Version Control
  version: number
  previous_version_id?: string
}
```

**Nova View:**
- Project assets library
- Client deliverables
- Version control
- Access permissions

---

#### 9. ✅ **Cloud** (`/dashboard/cloud`) → **Assets Storage**
**Reaproveitar:** 80%  
**Modificações:**
- Renomear para "Assets" ou "Media Library"
- Organizar por projeto
- Integrar com Supabase Storage
- Public/private folders

---

#### 10. ✅ **Mail** (`/dashboard/mail`) → **Communication Hub**
**Reaproveitar:** 50%  
**Modificações:**
- Integrar com Resend/SendGrid
- Templates de email profissionais
- Email tracking (opened, clicked)
- Scheduled sends

---

#### 11. ✅ **WhatsApp** (`/dashboard/whatsapp`) → **WhatsApp Business**
**Reaproveitar:** 70%  
**Modificações:**
- Integrar WhatsApp Business API
- Templates aprovados
- Broadcast lists
- Auto-responses

---

#### 12. ✅ **Funil** (`/dashboard/funil`) → **Sales Funnel**
**Reaproveitar:** 60%  
**Modificações:**
- Conectar com URL Analyzer (topo do funil)
- Stages: Anonymous → Lead → Qualified → Client
- Conversion tracking
- Drop-off analysis

---

#### 13. ✅ **Calculator** (`/dashboard/calculator`) → **ROI Calculator**
**Reaproveitar:** 40%  
**Modificações:**
```typescript
// ANTES: Calculadora genérica
// DEPOIS: Performance ROI Calculator

interface ROICalculation {
  // Input
  current_lcp: number              // 4.2s
  target_lcp: number               // 1.8s
  monthly_visitors: number         // 50,000
  current_conversion_rate: number  // 2.1%
  avg_order_value: number          // R$ 150
  
  // Calculated
  improvement_percent: number      // 43%
  conversion_lift: number          // +0.9% (2.1% → 3.0%)
  additional_conversions: number   // 450/mês
  revenue_increase: number         // R$ 67,500/mês
  annual_impact: number            // R$ 810,000/ano
  
  // Project Cost
  investment: number               // R$ 48,000
  roi: number                      // 1,687%
  payback_period: number           // 0.7 meses
}
```

**Nova View:**
- Interactive ROI calculator
- Industry benchmarks
- What-if scenarios
- Shareable reports

---

#### 14. ✅ **Appointments** (`/dashboard/appointments`) → **Meetings & Calls**
**Reaproveitar:** 70%  
**Modificações:**
- Integrar com Calendly/Google Calendar
- Discovery calls
- Sprint reviews
- Client presentations
- Auto-reminders

---

#### 15. ✅ **Settings** (`/dashboard/settings`) → **Account Settings**
**Reaproveitar:** 90%  
**Já bem genérico, apenas ajustar:**
- User preferences
- Notification settings
- API keys (para clientes tech-savvy)
- Billing info

---

#### 16. ✅ **Notifications** (`/dashboard/notifications`) → **Activity Feed**
**Reaproveitar:** 80%  
**Modificações:**
- Real-time notifications (WebSocket)
- Project updates
- Performance alerts (LCP degraded)
- Campaign alerts (budget 80%)
- Team mentions

---

#### 17. ✅ **Users** (`/dashboard/users`) → **Team Management** (Admin only)
**Reaproveitar:** 90%  
**Modificações:**
- Add project assignments
- Role-based permissions
- Performance tracking
- Skills tagging

---

### 📊 **RESUMO DO AUDIT**

| Status | Quantidade | Ação |
|--------|-----------|------|
| ✅ **Reaproveitar** | 17 páginas | Modificar estrutura de dados + UI |
| ❌ **Descartar** | 5 páginas | Remover completamente (agenda, aliquotas, jetimob, reviews, studio?) |
| **TOTAL** | 22 páginas | |

---

## 🎯 ESTRATÉGIA DE LEAD NURTURING: URL Analyzer → Dashboard

### 🔄 **FLOW COMPLETO**

```
┌────────────────────────────────────────────────────────────────────┐
│                    JORNADA DO LEAD                                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  1️⃣ HOMEPAGE - URL Analyzer (Anonymous)                           │
│     └─ User digita domínio: "exemplo.com.br"                     │
│     └─ Análise imediata (mock data):                             │
│        ├─ LCP: 4.2s ❌ (baseline)                                │
│        ├─ FID: 156ms ❌                                           │
│        ├─ CLS: 0.23 ❌                                            │
│        ├─ Lighthouse: 52/100 ❌                                   │
│        └─ Estimated revenue loss: R$ 12k/mês ❌                  │
│                                                                    │
│  2️⃣ CTA: "Cadastre-se para receber relatório completo GRÁTIS"    │
│     └─ Signup modal com benefícios:                              │
│        ✅ Histórico de performance (últimos 30 dias)              │
│        ✅ Monitoramento contínuo (daily checks)                   │
│        ✅ Alertas de degradação                                   │
│        ✅ Comparação com concorrentes                             │
│        ✅ Sugestões de otimização (AI-powered)                    │
│        ✅ Gestão gratuita de domínio (FREE tier)                  │
│                                                                    │
│  3️⃣ SIGNUP FLOW                                                   │
│     ├─ Email + senha                                              │
│     ├─ Nome + empresa                                             │
│     └─ Confirmação: "Conta criada com sucesso!"                  │
│                                                                    │
│  4️⃣ ONBOARDING (First Login - FREE User)                         │
│     └─ Dashboard Premium (Client Dashboard - FREE tier)           │
│        ├─ Tab 1: Overview (Project Progress - N/A for free)     │
│        ├─ Tab 2: Performance ⭐ (Core Web Vitals - UNLOCKED)     │
│        ├─ Tab 3: Histórico ⭐ (30 dias - UNLOCKED)               │
│        ├─ Tab 4: Comparação ⭐ (vs concorrentes - UNLOCKED)      │
│        ├─ Tab 5: Campanhas 🔒 (LOCKED - Upgrade para ver)       │
│        └─ Tab 6: Reports 🔒 (LOCKED - Upgrade para ver)          │
│                                                                    │
│  5️⃣ LEAD NURTURING (Free User Experience)                        │
│     ├─ Daily email: "Seu site hoje: LCP 4.1s (-0.1s!) ✅"       │
│     ├─ Weekly report: Performance trends                         │
│     ├─ Monthly comparison: vs competitors                        │
│     ├─ Alerts: "LCP degraded to 5.2s! ⚠️"                       │
│     └─ Upsell CTAs:                                               │
│        ├─ "Quer otimizar? Fale com um especialista"             │
│        ├─ "Veja como reduzimos LCP de 4.2s → 1.8s"              │
│        └─ "Upgrade para PRO: Gestão completa + campanhas"       │
│                                                                    │
│  6️⃣ CONVERSION (Free → Paid)                                     │
│     └─ User clica "Quero otimizar meu site"                      │
│     └─ Discovery call agendada                                   │
│     └─ Proposta comercial enviada                                │
│     └─ Vira Cliente (status: 'client', paid: true)               │
│                                                                    │
│  7️⃣ CLIENT DASHBOARD (Paid - Full Access)                        │
│     └─ Todas as tabs desbloqueadas:                              │
│        ├─ Tab 1: Overview (Project Progress - UNLOCKED)          │
│        ├─ Tab 2: Performance (Core Web Vitals - UNLOCKED)        │
│        ├─ Tab 3: Histórico (90 dias - UNLOCKED)                  │
│        ├─ Tab 4: Comparação (detailed - UNLOCKED)                │
│        ├─ Tab 5: Campanhas (Google Ads + Meta - UNLOCKED) ⭐     │
│        ├─ Tab 6: Reports (monthly PDFs - UNLOCKED) ⭐            │
│        └─ Tab 7: Support (chat + tickets - UNLOCKED) ⭐          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

### 🎨 **CLIENT DASHBOARD - ESTRUTURA DE TABS**

#### **FREE TIER (Usuários não pagos)**
```typescript
interface FreeDashboardTabs {
  overview: {
    status: 'locked'
    message: 'Disponível após contratar projeto'
    cta: 'Falar com especialista'
  }
  performance: {
    status: 'unlocked'           // ⭐ GRÁTIS
    features: [
      'Core Web Vitals atual',
      'Lighthouse score',
      'Performance grade (A-F)',
      'Comparação com baseline inicial'
    ]
  }
  history: {
    status: 'unlocked'           // ⭐ GRÁTIS
    features: [
      'Histórico de 30 dias',
      'Gráficos de tendência',
      'Eventos marcados (deploys, etc)'
    ]
    limitation: 'Últimos 30 dias apenas'
  }
  comparison: {
    status: 'unlocked'           // ⭐ GRÁTIS
    features: [
      'vs Concorrentes (3 principais)',
      'vs Média da indústria',
      'Ranking de performance'
    ]
    limitation: 'Dados agregados apenas'
  }
  campaigns: {
    status: 'locked'             // 🔒 PAGO
    message: 'Gestão de campanhas disponível para clientes'
    preview: 'Veja como gerenciamos R$ 34k/mês em ads com ROAS 4.2x'
    cta: 'Upgrade para PRO'
  }
  reports: {
    status: 'locked'             // 🔒 PAGO
    message: 'Relatórios mensais em PDF para clientes'
    preview: 'Relatórios profissionais com benchmarks e insights'
    cta: 'Upgrade para PRO'
  }
}
```

#### **PAID TIER (Clientes pagos)**
```typescript
interface PaidDashboardTabs {
  overview: {
    status: 'unlocked'           // ⭐ DESBLOQUEADO
    features: [
      'Project Progress (78% completo)',
      'Next Milestone (Jan 15)',
      'Days to Launch (23 dias)',
      'Team Info (3 devs, 1 designer, 1 PM)',
      'Financial tracking (invoices, payments)'
    ]
  }
  performance: {
    status: 'unlocked'           // ⭐ DESBLOQUEADO
    features: [
      'Core Web Vitals (real-time)',
      'Lighthouse score (updated daily)',
      'Performance grade',
      'Baseline comparison',
      'ROI calculator (revenue impact)',
      'Performance alerts'
    ]
  }
  history: {
    status: 'unlocked'           // ⭐ DESBLOQUEADO
    features: [
      'Histórico ilimitado (desde kickoff)',
      'Deploy tracking',
      'Performance before/after',
      'Changelog integration'
    ]
  }
  comparison: {
    status: 'unlocked'           // ⭐ DESBLOQUEADO
    features: [
      'vs Concorrentes (detalhado)',
      'vs Média da indústria',
      'Market positioning',
      'Competitive advantages'
    ]
  }
  campaigns: {
    status: 'unlocked'           // ⭐ NOVO - DESBLOQUEADO
    features: [
      'Google Ads dashboard (real-time)',
      'Meta Ads dashboard (real-time)',
      'Budget tracking',
      'ROAS calculator',
      'Campaign performance',
      'Ad spend optimization',
      'Conversion tracking'
    ]
  }
  reports: {
    status: 'unlocked'           // ⭐ NOVO - DESBLOQUEADO
    features: [
      'Monthly PDF reports',
      'Performance benchmarks',
      'Traffic analysis',
      'Campaign ROI',
      'Executive summary',
      'Downloadable & shareable'
    ]
  }
  support: {
    status: 'unlocked'           // ⭐ NOVO - DESBLOQUEADO
    features: [
      'Live chat (business hours)',
      'Ticket system',
      'Knowledge base',
      'Priority support',
      'Direct PM contact'
    ]
  }
}
```

---

### 🎯 **FEATURES POR TIER**

| Feature | FREE | PAID |
|---------|------|------|
| **Core Web Vitals Tracking** | ✅ Current only | ✅ Real-time + history |
| **Lighthouse Score** | ✅ Current only | ✅ Daily updates |
| **Performance History** | ✅ 30 dias | ✅ Ilimitado |
| **Competitor Comparison** | ✅ Agregado | ✅ Detalhado |
| **Performance Alerts** | ✅ Email only | ✅ Email + Dashboard |
| **Project Progress** | ❌ N/A | ✅ Unlocked |
| **Team Info** | ❌ N/A | ✅ Unlocked |
| **Financial Tracking** | ❌ N/A | ✅ Unlocked |
| **Google Ads Dashboard** | ❌ Locked | ✅ Unlocked |
| **Meta Ads Dashboard** | ❌ Locked | ✅ Unlocked |
| **Campaign ROAS** | ❌ Locked | ✅ Unlocked |
| **Monthly Reports (PDF)** | ❌ Locked | ✅ Unlocked |
| **Live Chat Support** | ❌ Locked | ✅ Unlocked |
| **Ticket System** | ❌ Locked | ✅ Unlocked |
| **Knowledge Base** | ✅ Public | ✅ Premium |

---

### 💡 **UPSELL CTAs (Free → Paid)**

#### **Dentro do Dashboard (Free User)**

1. **Tab "Overview" (Locked)**
```tsx
<LockedTab>
  <Lock className="h-12 w-12 text-slate-400 mb-4" />
  <h3>Acompanhe o progresso do seu projeto</h3>
  <p>Veja em tempo real o desenvolvimento do seu site:</p>
  <ul>
    <li>✅ Progresso visual (78% completo)</li>
    <li>✅ Próximas entregas</li>
    <li>✅ Time alocado</li>
    <li>✅ Financial tracking</li>
  </ul>
  <Button onClick={openContactModal}>
    Falar com Especialista
  </Button>
  <Link href="/cases">Ver casos de sucesso →</Link>
</LockedTab>
```

2. **Tab "Campaigns" (Locked)**
```tsx
<LockedTab>
  <TrendingUp className="h-12 w-12 text-emerald-400 mb-4" />
  <h3>Gestão Profissional de Tráfego Pago</h3>
  <p>Veja como gerenciamos campanhas com resultados reais:</p>
  <div className="grid grid-cols-3 gap-4 my-6">
    <MetricCard label="Ad Spend" value="R$ 34k/mês" />
    <MetricCard label="ROAS" value="4.2x" color="green" />
    <MetricCard label="Leads" value="127" />
  </div>
  <Button onClick={openContactModal}>
    Quero Tráfego Pago
  </Button>
  <Link href="/metodologia">Como fazemos →</Link>
</LockedTab>
```

3. **Tab "Reports" (Locked)**
```tsx
<LockedTab>
  <FileText className="h-12 w-12 text-blue-400 mb-4" />
  <h3>Relatórios Profissionais Mensais</h3>
  <p>Receba relatórios em PDF com:</p>
  <ul>
    <li>✅ Performance benchmarks</li>
    <li>✅ Traffic analysis</li>
    <li>✅ Campaign ROI</li>
    <li>✅ Executive summary</li>
  </ul>
  <img src="/mockups/report-preview.png" className="rounded-lg shadow-xl my-4" />
  <Button onClick={openContactModal}>
    Ver Exemplo de Relatório
  </Button>
</LockedTab>
```

#### **Email Nurturing (Free Users)**

**Day 1 (Welcome):**
```
Subject: ✅ Bem-vindo ao ARCO - Seu site está sendo monitorado!

Olá [Nome],

Parabéns! Seu domínio [exemplo.com.br] está sendo monitorado 24/7.

📊 Status atual:
- LCP: 4.2s ❌ (meta: <2.5s)
- FID: 156ms ⚠️ (meta: <100ms)
- CLS: 0.23 ❌ (meta: <0.1)
- Lighthouse: 52/100 ❌

💡 Impacto estimado: R$ 12k/mês em receita perdida

[Ver Dashboard Completo]

Próximos passos:
1. Explore seu dashboard de performance
2. Veja como você se compara aos concorrentes
3. Receba alertas automáticos de degradação

Quer otimizar seu site? [Fale com um especialista]

Abraços,
Equipe ARCO
```

**Day 3 (Education):**
```
Subject: 🎯 Como reduzimos o LCP de 4.2s → 1.8s (Case Real)

Olá [Nome],

Veja como otimizamos o site da [Cliente X]:

ANTES:
- LCP: 4.2s (similar ao seu)
- Conversão: 2.1%
- Revenue: R$ 80k/mês

DEPOIS:
- LCP: 1.8s (-57%) ✅
- Conversão: 3.8% (+81%) ✅
- Revenue: R$ 145k/mês (+81%) ✅

ROI: 487% em 90 dias

[Ver Case Completo] [Quero Resultados Assim]

Seu site tem potencial similar. Quer conversar?

Abraços,
[PM Name], ARCO
```

**Day 7 (Social Proof):**
```
Subject: 📈 [Empresa Y] aumentou conversão em 127% com ARCO

Olá [Nome],

Mais um resultado real:

[Empresa Y] tinha o mesmo problema que você:
- Site lento (LCP 4.5s)
- Alta taxa de rejeição (68%)
- Poucos leads (23/mês)

Em 60 dias, conseguimos:
✅ LCP: 1.6s (-64%)
✅ Taxa de rejeição: 32% (-53%)
✅ Leads: 87/mês (+278%)

[Ver Depoimento em Vídeo]

Seu dashboard já mostra oportunidades de melhoria.
Quer uma análise personalizada? [Agendar Call Gratuita]

Abraços,
Equipe ARCO
```

**Day 14 (Urgency):**
```
Subject: ⚠️ Seu site perdeu R$ 3.4k esta semana

Olá [Nome],

Nosso monitoramento detectou:

Esta semana (7 dias):
- 12.450 visitantes
- Taxa de rejeição: 61% (alta!)
- Conversões perdidas estimadas: 47
- Revenue loss: R$ 3.4k ❌

📊 Análise completa no seu dashboard

Cada dia que passa, mais receita é perdida.

[Ver Oportunidades de Otimização]
[Falar com Especialista Agora]

Não deixe para amanhã. Seu concorrente já está otimizando.

Abraços,
[PM Name], ARCO
```

**Day 30 (Last Chance):**
```
Subject: 🎁 Auditoria Gratuita + Proposta Personalizada (última chance)

Olá [Nome],

Você está usando o ARCO há 30 dias.

Neste período, estimamos:
❌ R$ 12k em revenue perdido
❌ 180+ conversões perdidas
❌ 28% dos visitantes abandonando por lentidão

Mas há boa notícia:
✅ Podemos reverter isso em 60-90 dias
✅ ROI médio de 487%
✅ Payback em menos de 1 mês

Última chance para auditoria gratuita:
[Agendar Agora] (restam 3 vagas este mês)

Se não quiser mais receber, podemos pausar os emails.
[Continuar monitorando silenciosamente] [Cancelar conta]

Abraços,
[CEO Name], ARCO
```

---

### 🎨 **IMPLEMENTAÇÃO TÉCNICA**

#### **1. User Tiers (Database)**
```sql
ALTER TABLE users ADD COLUMN tier TEXT CHECK (tier IN ('free', 'paid')) DEFAULT 'free';
ALTER TABLE users ADD COLUMN paid_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN subscription_ends_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN payment_status TEXT CHECK (payment_status IN ('active', 'cancelled', 'expired'));
```

#### **2. Feature Flags (React)**
```typescript
// hooks/use-feature-access.ts
export function useFeatureAccess() {
  const { user } = useCurrentUser()
  
  const canAccess = (feature: Feature): boolean => {
    if (!user) return false
    
    const tierFeatures: Record<Tier, Feature[]> = {
      free: ['performance', 'history_30d', 'comparison_basic'],
      paid: ['performance', 'history_unlimited', 'comparison_detailed', 
             'campaigns', 'reports', 'support', 'overview']
    }
    
    return tierFeatures[user.tier].includes(feature)
  }
  
  return { canAccess, tier: user?.tier }
}

// Component usage
function CampaignsTab() {
  const { canAccess } = useFeatureAccess()
  
  if (!canAccess('campaigns')) {
    return <LockedTabContent feature="campaigns" />
  }
  
  return <CampaignsDashboard />
}
```

#### **3. Locked Tab Component**
```tsx
// components/LockedTabContent.tsx
interface LockedTabContentProps {
  feature: 'overview' | 'campaigns' | 'reports' | 'support'
}

const featureContent = {
  campaigns: {
    icon: TrendingUp,
    title: 'Gestão Profissional de Tráfego Pago',
    description: 'Veja como gerenciamos campanhas com resultados reais',
    metrics: [
      { label: 'Ad Spend', value: 'R$ 34k/mês' },
      { label: 'ROAS', value: '4.2x', color: 'green' },
      { label: 'Leads', value: '127' }
    ],
    cta: 'Quero Tráfego Pago',
    link: '/metodologia'
  },
  // ... outros
}

export function LockedTabContent({ feature }: LockedTabContentProps) {
  const content = featureContent[feature]
  const Icon = content.icon
  
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <Icon className="h-16 w-16 text-slate-400 mx-auto mb-6" />
      <h2>{content.title}</h2>
      <p className="text-slate-600 mb-8">{content.description}</p>
      
      {content.metrics && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {content.metrics.map(metric => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      )}
      
      <Button onClick={() => openContactModal()}>
        {content.cta}
      </Button>
      <Link href={content.link} className="block mt-4">
        Saiba mais →
      </Link>
    </div>
  )
}
```

---

## 🚀 **ROADMAP DE IMPLEMENTAÇÃO**

### **Fase 1: Cleanup (3 dias)**
- [ ] Remover páginas descartadas (agenda, aliquotas, jetimob, reviews)
- [ ] Atualizar DashboardSidebar (remover items antigos)
- [ ] Documentar decisões (ADR)

### **Fase 2: Backend (Semana 1)**
- [ ] Criar novas tabelas (projects, sprints, campaigns, etc.)
- [ ] Migrar dados existentes
- [ ] Implementar tier system (free/paid)
- [ ] SQL functions otimizadas

### **Fase 3: Reaproveitar Páginas (Semanas 2-3)**
- [ ] Refatorar Clients → Projects Hub
- [ ] Refatorar Tasks → Sprint Board
- [ ] Refatorar Leads → Sales Pipeline
- [ ] Refatorar Analytics → Performance Analytics
- [ ] Refatorar Campaigns → Paid Traffic Manager

### **Fase 4: Client Dashboard Tiers (Semana 4)**
- [ ] Implementar feature flags
- [ ] Criar LockedTabContent components
- [ ] Free tier (4 tabs unlocked)
- [ ] Paid tier (7 tabs unlocked)

### **Fase 5: Lead Nurturing (Semana 5)**
- [ ] Email templates (Resend)
- [ ] Automation workflows
- [ ] Dashboard CTAs
- [ ] Contact modal

---

**Documento criado em:** 2025-01-05  
**Próxima ação:** Cleanup de páginas descartadas  
**Impacto esperado:** +167% engagement, -40% support tickets
