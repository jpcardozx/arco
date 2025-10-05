# 🎯 Dashboard Estratégico ARCO - Retenção & Engajamento

**Objetivo**: Dashboard que estimula retorno frequente, engajamento, confiança e retenção de clientes

**Data**: 2025-10-04  
**Versão**: 1.0

---

## 🧠 Psicologia de Retenção

### Princípios Fundamentais:

1. **Progress Tracking** → Usuário vê evolução constante
2. **Social Proof** → Comparação com benchmarks
3. **Gamification** → Conquistas e recompensas
4. **Personalization** → Dashboard único para cada cliente
5. **FOMO (Fear of Missing Out)** → Urgência e escassez
6. **Dopamine Triggers** → Notificações e surpresas positivas

---

## 📊 Dashboard Architecture

### 1. **Hero Section - "Your Performance at a Glance"**

**Objetivo**: Primeiras impressões que geram "wow effect"

```typescript
interface HeroMetrics {
  // Métricas principais (grandes e visuais)
  totalROI: {
    value: number          // Ex: 347%
    trend: 'up' | 'down'   // +23% vs mês passado
    visual: 'gauge' | 'chart'
  }
  
  activeProjects: {
    count: number          // Ex: 5
    status: 'on_track' | 'at_risk' | 'delayed'
    urgentActions: number  // Quantas ações precisam de atenção
  }
  
  upcomingDeadlines: {
    next24h: Task[]        // Próximas 24h
    next7days: Task[]      // Próxima semana
    overdue: Task[]        // Atrasadas (vermelho)
  }
  
  recentWins: {           // Últimas conquistas
    type: 'milestone' | 'roi_goal' | 'deadline_met'
    title: string
    date: Date
    celebration: 'confetti' | 'badge' | 'animation'
  }[]
}
```

**Visual**:
- Cards grandes com números impressionantes
- Gráficos animados (Chart.js / Recharts)
- Cores vibrantes para métricas positivas
- Alertas vermelhos para urgência

---

### 2. **Activity Feed - "What's Happening Now"**

**Objetivo**: Sensação de movimento, plataforma viva

```typescript
interface ActivityFeed {
  realtime: boolean  // WebSocket updates
  
  items: {
    type: 'team_update' | 'milestone' | 'comment' | 'file_upload' | 'deadline'
    actor: {
      name: string
      avatar: string
      role: 'arco_team' | 'client'
    }
    action: string          // "completou análise de ROI"
    target: string          // "Campanha Google Ads Q4"
    timestamp: Date         // "2 minutos atrás"
    priority: 'high' | 'medium' | 'low'
  }[]
  
  filters: {
    showOnlyTeam: boolean
    showOnlyClient: boolean
    showOnlyUrgent: boolean
  }
}
```

**Features**:
- ✅ Real-time updates (Supabase Realtime)
- ✅ Notificações push (com permissão)
- ✅ Badge com contador de não lidos
- ✅ Animação de "novo item" (slide in)

---

### 3. **Progress Bars - "Your Journey"**

**Objetivo**: Visualização de progresso estimula retorno

```typescript
interface ProgressTracking {
  projects: {
    id: string
    name: string
    phases: {
      name: string              // "Discovery", "Execution", "Results"
      status: 'completed' | 'current' | 'pending'
      progress: number          // 0-100
      estimatedCompletion: Date
    }[]
    overallProgress: number     // 0-100
    nextMilestone: {
      title: string
      dueDate: Date
      daysRemaining: number
    }
  }[]
  
  goals: {
    type: 'roi' | 'leads' | 'revenue' | 'engagement'
    target: number
    current: number
    progress: number  // 0-100
    trend: 'up' | 'down' | 'stable'
    projectedCompletion: Date
    onTrack: boolean
  }[]
}
```

**Visual**:
- Progress bars animados (framer-motion)
- Cores graduais: vermelho → amarelo → verde
- Celebração quando atinge 100%
- Projeção: "No ritmo atual, atingirá meta em 12 dias"

---

### 4. **Insights & Recommendations - "What You Should Do Next"**

**Objetivo**: Orientação proativa, cliente nunca fica perdido

```typescript
interface SmartInsights {
  urgentActions: {
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    effort: 'quick' | 'moderate' | 'complex'
    deadline: Date
    actionButton: {
      label: string
      onClick: () => void
    }
  }[]
  
  opportunities: {
    type: 'optimization' | 'expansion' | 'cost_saving'
    title: string
    potentialImpact: string   // "Pode aumentar ROI em 15%"
    reasoning: string         // Por que é relevante
    source: 'ai' | 'team' | 'data_analysis'
  }[]
  
  trends: {
    metric: string
    direction: 'improving' | 'declining' | 'stable'
    changePercent: number
    recommendation: string
  }[]
}
```

**Features**:
- ✅ AI-powered recommendations (GPT-4)
- ✅ Priorização automática (urgência x impacto)
- ✅ One-click actions
- ✅ "Snooze" para adiar recomendações

---

### 5. **Social Proof & Benchmarks**

**Objetivo**: Comparação saudável estimula engajamento

```typescript
interface Benchmarking {
  industryAverage: {
    metric: string
    yourValue: number
    average: number
    topPerformers: number  // Top 10%
    position: 'above' | 'average' | 'below'
  }[]
  
  similarClients: {
    anonymized: true
    comparison: {
      metric: string
      yourRank: number  // "Você está no top 25%"
      totalClients: number
    }[]
  }
  
  achievements: {
    badge: string
    title: string         // "Early Adopter", "ROI Champion"
    unlockedAt: Date
    rarity: 'common' | 'rare' | 'legendary'
  }[]
}
```

**Gamification Elements**:
- 🏆 Badges desbloqueáveis
- 📈 Leaderboard anônimo
- 🎯 Challenges semanais ("Agende 3 reuniões esta semana")
- ✨ Recompensas (descontos, features beta, etc)

---

### 6. **Interactive Reports - "Dive Deeper"**

**Objetivo**: Exploração de dados sem sair da plataforma

```typescript
interface InteractiveReports {
  roiCalculator: {
    interactive: true
    scenarios: {
      optimistic: number
      realistic: number
      conservative: number
    }
    sliders: {
      investment: number
      timeframe: number
      conversionRate: number
    }
    output: {
      charts: ChartConfig[]
      downloadPDF: () => void
      shareLink: string
    }
  }
  
  customDashboards: {
    templates: ReportTemplate[]
    userCreated: CustomReport[]
    widgets: {
      type: 'chart' | 'kpi' | 'table' | 'heatmap'
      draggable: true
      resizable: true
    }[]
  }
  
  exportOptions: {
    pdf: boolean
    csv: boolean
    googleSheets: boolean
    scheduled: {
      frequency: 'daily' | 'weekly' | 'monthly'
      recipients: string[]
    }
  }
}
```

**Features**:
- ✅ Drag & drop widgets
- ✅ Filtros dinâmicos
- ✅ Exportação com branding
- ✅ Reports agendados por email

---

### 7. **Communication Hub**

**Objetivo**: Centralizar comunicação cliente-ARCO

```typescript
interface CommunicationHub {
  inbox: {
    unreadCount: number
    threads: {
      id: string
      subject: string
      participants: User[]
      lastMessage: {
        content: string
        sender: User
        timestamp: Date
        attachments: File[]
      }
      tags: string[]
      priority: 'high' | 'normal' | 'low'
    }[]
  }
  
  scheduler: {
    availableSlots: {
      date: Date
      times: string[]
    }[]
    upcomingMeetings: {
      title: string
      date: Date
      participants: User[]
      meetingLink: string
      agenda: string
    }[]
  }
  
  knowledge: {
    faq: {
      category: string
      questions: {
        q: string
        a: string
        helpful: number
      }[]
    }[]
    tutorials: Video[]
    documentation: Document[]
  }
}
```

**Features**:
- ✅ Chat em tempo real (Supabase Realtime)
- ✅ Agendamento de reuniões (Calendly-like)
- ✅ Knowledge base searchable
- ✅ Video calls integrados (Whereby API)

---

### 8. **Personalization Engine**

**Objetivo**: Dashboard único para cada cliente

```typescript
interface Personalization {
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    primaryMetric: 'roi' | 'leads' | 'revenue'
    widgetLayout: WidgetPosition[]
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
      frequency: 'realtime' | 'daily' | 'weekly'
    }
  }
  
  aiAssistant: {
    name: string  // "Olá João, aqui está seu resumo diário"
    tone: 'professional' | 'friendly' | 'casual'
    insights: string[]
    suggestions: string[]
  }
  
  customization: {
    logo: string
    brandColors: string[]
    customDomain: boolean  // dashboard.clientcompany.com
  }
}
```

**AI Features**:
- ✅ Resumo diário personalizado (GPT-4)
- ✅ Alertas inteligentes (detecta anomalias)
- ✅ Sugestões contextuais
- ✅ Tone matching (profissional vs casual)

---

## 🔧 Backend Requirements

### Database Tables

```sql
-- Activity Feed
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  actor_id UUID REFERENCES users(id),
  type TEXT,  -- 'milestone', 'comment', etc
  action TEXT,
  target TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress Tracking
CREATE TABLE project_progress (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  phase TEXT,
  progress_percent INT CHECK (progress_percent BETWEEN 0 AND 100),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Goals & KPIs
CREATE TABLE client_goals (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  type TEXT,  -- 'roi', 'leads', etc
  target_value NUMERIC,
  current_value NUMERIC,
  deadline DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Achievements/Badges
CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  badge_type TEXT,
  title TEXT,
  description TEXT,
  rarity TEXT,  -- 'common', 'rare', 'legendary'
  unlocked_at TIMESTAMP DEFAULT NOW()
);

-- Recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  type TEXT,  -- 'urgent_action', 'opportunity'
  title TEXT,
  description TEXT,
  impact TEXT,  -- 'high', 'medium', 'low'
  status TEXT,  -- 'pending', 'dismissed', 'completed'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Benchmarks
CREATE TABLE benchmarks (
  id UUID PRIMARY KEY,
  industry TEXT,
  metric TEXT,
  average_value NUMERIC,
  top_10_percent_value NUMERIC,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Custom Reports
CREATE TABLE custom_reports (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  name TEXT,
  layout JSONB,  -- Widget positions
  filters JSONB,
  schedule JSONB,  -- Auto-send config
  created_at TIMESTAMP DEFAULT NOW()
);

-- Communication
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  thread_id UUID,
  sender_id UUID REFERENCES users(id),
  content TEXT,
  attachments JSONB,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Preferences
CREATE TABLE client_preferences (
  client_id UUID PRIMARY KEY REFERENCES clients(id),
  theme TEXT,
  primary_metric TEXT,
  widget_layout JSONB,
  notifications JSONB,
  ai_assistant_config JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### API Endpoints Necessários

```typescript
// Dashboard Data
GET /api/dashboard/:clientId
  → Returns: HeroMetrics, ActivityFeed, Progress, Insights

// Activity Feed (Realtime)
GET /api/activity/:clientId?realtime=true
POST /api/activity
  → Create new activity entry

// Progress
GET /api/progress/:projectId
PUT /api/progress/:projectId
  → Update progress percentage

// Goals
GET /api/goals/:clientId
POST /api/goals
PUT /api/goals/:goalId
  → Update current value

// Recommendations (AI-powered)
GET /api/recommendations/:clientId
POST /api/recommendations/dismiss/:id
POST /api/recommendations/complete/:id

// Benchmarks
GET /api/benchmarks/:industry
GET /api/benchmarks/ranking/:clientId

// Custom Reports
GET /api/reports/:clientId
POST /api/reports
PUT /api/reports/:reportId
DELETE /api/reports/:reportId
POST /api/reports/:reportId/export

// Communication
GET /api/messages/:clientId
POST /api/messages
PUT /api/messages/:messageId/read

// Personalization
GET /api/preferences/:clientId
PUT /api/preferences/:clientId
```

---

### Supabase Features a Usar

1. **Realtime Subscriptions**
```typescript
// Activity Feed em tempo real
supabase
  .channel('activity')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'activity_logs',
    filter: `client_id=eq.${clientId}`
  }, (payload) => {
    // Update UI instantly
    setActivities(prev => [payload.new, ...prev])
  })
  .subscribe()
```

2. **Storage para Assets**
```typescript
// Upload de logos, documentos, etc
await supabase.storage
  .from('client-assets')
  .upload(`${clientId}/logo.png`, file)
```

3. **Edge Functions para AI**
```typescript
// Gerar insights personalizados
const { data } = await supabase.functions.invoke('generate-insights', {
  body: { clientId, metrics }
})
```

4. **RLS Policies**
```sql
-- Clientes só veem seus próprios dados
CREATE POLICY "clients_own_data" ON activity_logs
FOR SELECT USING (
  client_id = (SELECT id FROM clients WHERE user_id = auth.uid())
);
```

---

## 🎨 UI/UX Best Practices

### 1. Loading States
```typescript
// Skeleton loaders para melhor perceived performance
<Skeleton className="h-32 w-full" />  // Enquanto carrega métricas

// Optimistic updates
const { mutate } = useUpdateProgress({
  onMutate: async (newProgress) => {
    // Update UI imediatamente
    queryClient.setQueryData(['progress'], newProgress)
  }
})
```

### 2. Animações
```typescript
// Framer Motion para transições suaves
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Dashboard content */}
</motion.div>
```

### 3. Empty States
```typescript
// Quando não há dados, guiar o usuário
{activities.length === 0 && (
  <EmptyState
    icon={<Activity />}
    title="Nenhuma atividade ainda"
    description="Quando sua equipe começar a trabalhar, você verá atualizações aqui"
    action={{
      label: "Agendar primeira reunião",
      onClick: () => router.push('/schedule')
    }}
  />
)}
```

### 4. Feedback Imediato
```typescript
// Toast notifications para ações
toast.success('Meta atualizada com sucesso!')
toast.error('Erro ao salvar. Tente novamente.')
toast.info('Novo relatório disponível')
```

---

## 📈 Métricas de Sucesso (Dashboard Health)

### KPIs para medir retenção:

```typescript
interface DashboardMetrics {
  engagement: {
    dailyActiveUsers: number      // DAU
    weeklyActiveUsers: number     // WAU
    monthlyActiveUsers: number    // MAU
    sessionDuration: number       // Minutos médios por sessão
    pageViewsPerSession: number
    returnRate: number            // % que voltam após 7 dias
  }
  
  features: {
    mostUsedWidgets: string[]
    customReportsCreated: number
    averageReportExports: number
    chatMessagesPerUser: number
  }
  
  retention: {
    day1: number   // % que voltam no dia seguinte
    day7: number   // % que voltam após 7 dias
    day30: number  // % que voltam após 30 dias
    churnRate: number
  }
  
  satisfaction: {
    nps: number                   // Net Promoter Score
    avgRating: number             // 1-5 stars
    featureRequests: number
    supportTickets: number
  }
}
```

### Alertas Automáticos:

```typescript
// Detectar quando cliente está em risco
if (
  lastLoginDaysAgo > 7 &&
  sessionDuration < 2 minutes &&
  pageViews < 3
) {
  // Trigger: Email de re-engagement
  sendReEngagementEmail(client)
  
  // Criar tarefa para CSM
  createTask({
    title: `Cliente ${client.name} inativo há 7 dias`,
    priority: 'high',
    assignedTo: client.csm_id
  })
}
```

---

## 🚀 Roadmap de Implementação

### Sprint 1 (Semana 1-2): **Foundation**
- ✅ Database schema (9 tabelas)
- ✅ Basic API endpoints (CRUD)
- ✅ Hero Section + Métricas principais
- ✅ Activity Feed básico

### Sprint 2 (Semana 3-4): **Progress & Goals**
- ⏳ Progress bars animados
- ⏳ Goal tracking system
- ⏳ Benchmarking básico
- ⏳ Recommendations engine (manual)

### Sprint 3 (Semana 5-6): **Communication & Personalization**
- ⏳ Chat em tempo real
- ⏳ Meeting scheduler
- ⏳ Theme customization
- ⏳ Widget drag & drop

### Sprint 4 (Semana 7-8): **AI & Advanced Features**
- ⏳ GPT-4 insights
- ⏳ Anomaly detection
- ⏳ Custom reports builder
- ⏳ Gamification (badges)

### Sprint 5 (Semana 9-10): **Polish & Launch**
- ⏳ Performance optimization
- ⏳ Mobile responsive
- ⏳ A/B testing setup
- ⏳ Analytics tracking
- ⏳ Beta launch

---

## 💡 Insights Estratégicos

### Por que clientes voltam:

1. **Dopamine Hits**: Notificações de progresso, badges desbloqueados
2. **FOMO**: "3 novas recomendações disponíveis"
3. **Social Proof**: "Você está no top 15% dos clientes"
4. **Utility**: Precisam acessar dados para tomar decisões
5. **Curiosity**: "Novo insight disponível"

### Como estimular retorno diário:

- ✅ **Email digest diário**: "Seu resumo de ontem + o que fazer hoje"
- ✅ **Push notifications**: Apenas para ações urgentes (não spam)
- ✅ **Streak tracking**: "Você acessou 7 dias seguidos! 🔥"
- ✅ **Weekly challenges**: "Complete 3 ações esta semana para desbloquear badge"
- ✅ **Progress updates**: "Seu projeto avançou 15% esta semana"

### Como gerar confiança:

- ✅ **Transparência total**: Mostrar progresso real, não mascarado
- ✅ **Comunicação proativa**: Avisar sobre atrasos antes do cliente perguntar
- ✅ **Data ownership**: Cliente pode exportar tudo a qualquer momento
- ✅ **Human touch**: Sempre mostrar quem da equipe ARCO está trabalhando
- ✅ **ROI visibility**: Números concretos de retorno

---

## 🎯 Próxima Ação Recomendada

**Prioridade 1**: Implementar **Hero Section + Activity Feed**
- Impacto imediato na primeira impressão
- Features mais visíveis
- Dados já existem no sistema

**Tempo estimado**: 3-5 dias  
**Dependências**: Fase 3 completa (Auth + Hooks funcionando)

---

**Criado por**: AI Assistant (GitHub Copilot)  
**Aprovado por**: _Aguardando aprovação_  
**Status**: 📋 **DRAFT - Aguardando implementação**
