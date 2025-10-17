# 🎯 ARCO Strategic Agenda System

**Contexto**: Sistema de agenda estratégica para agência de web dev + tráfego pago  
**Objetivo**: Transformar agenda em ferramenta de gestão de projetos, deadlines e performance  
**Abordagem**: Madura, data-driven, integrada com CRM e dashboards  
**Data**: 9 de outubro de 2025

---

## 🧠 VISÃO ESTRATÉGICA

### Por que não é "só um calendário"?

Em uma agência de web dev + tráfego pago, a agenda é o **hub central** que conecta:

- ✅ **Deadlines de Projetos** - Entrega de sites, landing pages, features
- ✅ **Campanhas de Ads** - Lançamentos, otimizações, relatórios
- ✅ **Client Touchpoints** - Reuniões, alinhamentos, aprovações
- ✅ **Performance Reviews** - Análise semanal/mensal de resultados
- ✅ **Team Sprints** - Planejamento, dailies, retrospectives
- ✅ **Strategic Planning** - OKRs, metas trimestrais, roadmap

**Resultado**: Agenda que não só organiza tempo, mas **impulsiona resultados**.

---

## 🎨 UI/UX DE PONTA - Princípios de Design

### 1. **Context-Aware Interface**
Interface se adapta ao contexto do usuário:
- **Admin**: Visão 360° de todos os projetos + team capacity
- **PM/User**: Projetos atribuídos + client meetings
- **Client**: Apenas seus touchpoints + milestones

### 2. **Information Density Balanced**
- **High-level**: Dashboard com métricas visuais
- **Mid-level**: Timeline com cards informativos
- **Deep-dive**: Modais com todos os detalhes

### 3. **Micro-interactions**
- Drag & drop fluido com feedback visual
- Hover states revelam quick actions
- Animations sutis (Framer Motion)
- Loading states skeleton (não spinners)

### 4. **Smart Defaults**
- Auto-sugestão de slots baseado em patterns
- Template de eventos recorrentes
- Participantes sugeridos por contexto
- Links automáticos (Zoom, Google Meet)

### 5. **Proactive Insights**
- Alertas de conflitos
- Sugestões de otimização de tempo
- Análise de produtividade
- Deadlines em risco

---

## 📊 ARQUITETURA DO SISTEMA

```typescript
┌─────────────────────────────────────────────────────────────────┐
│                    STRATEGIC LAYER                              │
│  • OKR Tracking          • Project Milestones                   │
│  • Client Health Score   • Team Capacity Planning               │
└─────────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    INTELLIGENCE LAYER                           │
│  • AI-powered scheduling • Conflict detection                   │
│  • Smart reminders       • Productivity analytics               │
└─────────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    INTEGRATION LAYER                            │
│  • CRM sync              • Project management                   │
│  • Google Ads API        • Analytics API                        │
│  • Email (Gmail/Outlook) • Slack/Teams                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                   │
│  • Events                • Milestones                           │
│  • Client touchpoints    • Team availability                    │
│  • Campaign schedules    • Deploy schedules                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE                                     │
│  PostgreSQL + Realtime + Edge Functions + Storage               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ DATABASE SCHEMA (Estratégico)

```sql
-- ========================================
-- CORE TABLES
-- ========================================

-- 1. Strategic Events (extends calendar_events)
CREATE TABLE strategic_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Classificação estratégica
  event_type event_type_enum NOT NULL,
  strategic_priority priority_enum DEFAULT 'medium',
  
  -- Vínculos
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES clients(id),
  campaign_id UUID REFERENCES campaigns(id),
  sprint_id UUID REFERENCES sprints(id),
  
  -- Timing
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  
  -- Recorrência
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT, -- RRULE format
  recurrence_exception TIMESTAMPTZ[],
  
  -- Conteúdo
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  meeting_url TEXT,
  
  -- Participantes
  organizer_id UUID REFERENCES auth.users(id),
  required_attendees UUID[],
  optional_attendees UUID[],
  
  -- Resultados
  agenda TEXT[],
  objectives TEXT[],
  outcomes JSONB, -- { decisions: [], action_items: [], next_steps: [] }
  
  -- Preparação
  preparation_required BOOLEAN DEFAULT false,
  preparation_checklist JSONB, -- { items: [{ task, completed, assignee }] }
  
  -- Tracking
  status event_status_enum DEFAULT 'scheduled',
  completion_percentage INTEGER DEFAULT 0,
  actual_start_time TIMESTAMPTZ,
  actual_end_time TIMESTAMPTZ,
  
  -- Notificações
  reminder_settings JSONB, -- { timings: ['15min', '1day'], channels: ['email', 'slack'] }
  
  -- Metadata
  tags TEXT[],
  color TEXT DEFAULT '#3B82F6',
  visibility visibility_enum DEFAULT 'team',
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enums
CREATE TYPE event_type_enum AS ENUM (
  -- Client-facing
  'client_meeting', 'client_presentation', 'client_review', 
  'client_training', 'client_onboarding',
  
  -- Internal - Strategy
  'sprint_planning', 'sprint_review', 'sprint_retro',
  'okr_review', 'quarterly_planning', 'weekly_sync',
  
  -- Internal - Execution
  'design_review', 'code_review', 'deploy',
  'campaign_launch', 'campaign_optimization',
  
  -- Milestones
  'project_kickoff', 'project_milestone', 'project_delivery',
  'campaign_deadline', 'content_deadline',
  
  -- Personal
  'focus_time', 'learning', 'break'
);

CREATE TYPE priority_enum AS ENUM ('critical', 'high', 'medium', 'low');
CREATE TYPE event_status_enum AS ENUM (
  'scheduled', 'in_progress', 'completed', 
  'cancelled', 'rescheduled', 'needs_reschedule'
);
CREATE TYPE visibility_enum AS ENUM ('private', 'team', 'company', 'client');

-- ========================================
-- 2. Project Milestones (Integrated View)
-- ========================================
CREATE TABLE project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  
  name TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  
  -- Auto-create event when milestone is set
  linked_event_id UUID REFERENCES strategic_events(id),
  
  -- Completion tracking
  status milestone_status_enum DEFAULT 'pending',
  completion_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  
  -- Dependencies
  depends_on UUID[], -- Other milestone IDs
  blocks UUID[], -- Other milestone IDs
  
  -- Deliverables
  deliverables JSONB, -- { items: [{ name, status, link }] }
  
  -- Health
  health_status health_enum DEFAULT 'on_track',
  risk_factors TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE milestone_status_enum AS ENUM (
  'pending', 'in_progress', 'completed', 'delayed', 'cancelled'
);
CREATE TYPE health_enum AS ENUM ('on_track', 'at_risk', 'delayed', 'blocked');

-- ========================================
-- 3. Team Capacity Planning
-- ========================================
CREATE TABLE team_capacity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Weekly capacity
  week_start_date DATE NOT NULL,
  total_hours_available INTEGER DEFAULT 40,
  
  -- Allocation
  allocated_hours JSONB, -- { project_id: hours }
  focus_time_hours INTEGER DEFAULT 0,
  meeting_hours INTEGER DEFAULT 0,
  
  -- Utilization
  actual_hours_worked INTEGER DEFAULT 0,
  utilization_percentage INTEGER DEFAULT 0,
  
  -- Availability
  time_off_dates DATE[],
  available_for_new_work BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(user_id, week_start_date)
);

-- ========================================
-- 4. Campaign Schedules (Ads Integration)
-- ========================================
CREATE TABLE campaign_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) NOT NULL,
  
  -- Schedule type
  schedule_type campaign_schedule_type_enum NOT NULL,
  
  -- Timing
  scheduled_date TIMESTAMPTZ NOT NULL,
  
  -- Auto-create event
  linked_event_id UUID REFERENCES strategic_events(id),
  
  -- Details
  action_items TEXT[],
  responsible_user_id UUID REFERENCES auth.users(id),
  
  -- Tracking
  status schedule_status_enum DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  results JSONB, -- { metrics: {}, notes: '' }
  
  -- Notifications
  notify_before INTERVAL DEFAULT '1 day',
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE campaign_schedule_type_enum AS ENUM (
  'launch', 'optimization', 'review', 'budget_adjustment',
  'creative_refresh', 'audience_expansion', 'pause', 'reactivation'
);
CREATE TYPE schedule_status_enum AS ENUM ('pending', 'completed', 'skipped', 'rescheduled');

-- ========================================
-- 5. Strategic Insights (AI-Generated)
-- ========================================
CREATE TABLE agenda_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Scope
  user_id UUID REFERENCES auth.users(id),
  team_id UUID,
  
  -- Insight type
  insight_type insight_type_enum NOT NULL,
  
  -- Content
  title TEXT NOT NULL,
  description TEXT,
  recommendation TEXT,
  
  -- Data
  supporting_data JSONB, -- { metrics: {}, events: [] }
  impact_level impact_level_enum DEFAULT 'medium',
  
  -- Action
  actionable BOOLEAN DEFAULT true,
  action_url TEXT,
  
  -- Status
  viewed BOOLEAN DEFAULT false,
  dismissed BOOLEAN DEFAULT false,
  acted_upon BOOLEAN DEFAULT false,
  
  -- Timing
  relevant_from TIMESTAMPTZ DEFAULT now(),
  relevant_until TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE insight_type_enum AS ENUM (
  'meeting_overload', 'deadline_risk', 'capacity_issue',
  'optimization_opportunity', 'conflict_detected', 'pattern_detected'
);
CREATE TYPE impact_level_enum AS ENUM ('critical', 'high', 'medium', 'low');

-- ========================================
-- VIEWS
-- ========================================

-- Unified Calendar View (All event sources)
CREATE VIEW unified_calendar AS
SELECT 
  se.id,
  se.title,
  se.start_time,
  se.end_time,
  se.event_type,
  se.strategic_priority,
  se.status,
  'event' as source_type,
  
  -- Project info
  p.name as project_name,
  p.status as project_status,
  
  -- Client info
  c.name as client_name,
  
  -- Organizer
  u.email as organizer_email,
  
  se.meeting_url,
  se.color
FROM strategic_events se
LEFT JOIN projects p ON se.project_id = p.id
LEFT JOIN clients c ON se.client_id = c.id
LEFT JOIN auth.users u ON se.organizer_id = u.id

UNION ALL

-- Project milestones as events
SELECT
  pm.id,
  pm.name as title,
  pm.due_date as start_time,
  pm.due_date as end_time,
  'project_milestone' as event_type,
  CASE 
    WHEN pm.health_status = 'delayed' THEN 'critical'::priority_enum
    WHEN pm.health_status = 'at_risk' THEN 'high'::priority_enum
    ELSE 'medium'::priority_enum
  END as strategic_priority,
  pm.status::text as status,
  'milestone' as source_type,
  p.name as project_name,
  p.status as project_status,
  c.name as client_name,
  NULL as organizer_email,
  NULL as meeting_url,
  CASE 
    WHEN pm.health_status = 'on_track' THEN '#10B981'
    WHEN pm.health_status = 'at_risk' THEN '#F59E0B'
    WHEN pm.health_status = 'delayed' THEN '#EF4444'
  END as color
FROM project_milestones pm
LEFT JOIN projects p ON pm.project_id = p.id
LEFT JOIN clients c ON p.client_id = c.id

UNION ALL

-- Campaign schedules as events
SELECT
  cs.id,
  c.name || ' - ' || cs.schedule_type as title,
  cs.scheduled_date as start_time,
  cs.scheduled_date + INTERVAL '1 hour' as end_time,
  'campaign_' || cs.schedule_type as event_type,
  'high'::priority_enum as strategic_priority,
  cs.status::text as status,
  'campaign' as source_type,
  NULL as project_name,
  NULL as project_status,
  cl.name as client_name,
  u.email as organizer_email,
  NULL as meeting_url,
  '#8B5CF6' as color
FROM campaign_schedules cs
LEFT JOIN campaigns c ON cs.campaign_id = c.id
LEFT JOIN clients cl ON c.client_id = cl.id
LEFT JOIN auth.users u ON cs.responsible_user_id = u.id;

-- Team Availability View
CREATE VIEW team_availability AS
SELECT
  u.id as user_id,
  u.email,
  tc.week_start_date,
  tc.total_hours_available,
  tc.allocated_hours,
  tc.actual_hours_worked,
  tc.utilization_percentage,
  tc.available_for_new_work,
  
  -- Calculate meeting load
  (
    SELECT COUNT(*)
    FROM strategic_events se
    WHERE se.organizer_id = u.id
      AND se.start_time >= tc.week_start_date
      AND se.start_time < tc.week_start_date + INTERVAL '7 days'
      AND se.status = 'scheduled'
  ) as scheduled_meetings,
  
  -- Calculate focus time
  (
    SELECT SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600)
    FROM strategic_events se
    WHERE se.organizer_id = u.id
      AND se.event_type = 'focus_time'
      AND se.start_time >= tc.week_start_date
      AND se.start_time < tc.week_start_date + INTERVAL '7 days'
  ) as focus_hours_scheduled
  
FROM auth.users u
LEFT JOIN team_capacity tc ON u.id = tc.user_id;

-- Deadline Dashboard View
CREATE VIEW deadline_dashboard AS
SELECT
  'milestone' as type,
  pm.id,
  pm.name as title,
  pm.due_date,
  pm.health_status,
  p.name as project_name,
  c.name as client_name,
  EXTRACT(DAY FROM (pm.due_date - now())) as days_until,
  CASE
    WHEN pm.due_date < now() THEN 'overdue'
    WHEN pm.due_date < now() + INTERVAL '3 days' THEN 'urgent'
    WHEN pm.due_date < now() + INTERVAL '7 days' THEN 'upcoming'
    ELSE 'future'
  END as urgency
FROM project_milestones pm
LEFT JOIN projects p ON pm.project_id = p.id
LEFT JOIN clients c ON p.client_id = c.id
WHERE pm.status NOT IN ('completed', 'cancelled')

UNION ALL

SELECT
  'campaign' as type,
  cs.id,
  c.name || ' - ' || cs.schedule_type as title,
  cs.scheduled_date as due_date,
  'scheduled' as health_status,
  NULL as project_name,
  cl.name as client_name,
  EXTRACT(DAY FROM (cs.scheduled_date - now())) as days_until,
  CASE
    WHEN cs.scheduled_date < now() THEN 'overdue'
    WHEN cs.scheduled_date < now() + INTERVAL '3 days' THEN 'urgent'
    WHEN cs.scheduled_date < now() + INTERVAL '7 days' THEN 'upcoming'
    ELSE 'future'
  END as urgency
FROM campaign_schedules cs
LEFT JOIN campaigns c ON cs.campaign_id = c.id
LEFT JOIN clients cl ON c.client_id = cl.id
WHERE cs.status = 'pending';

-- ========================================
-- TRIGGERS & FUNCTIONS
-- ========================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_strategic_events_updated_at
  BEFORE UPDATE ON strategic_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_milestones_updated_at
  BEFORE UPDATE ON project_milestones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_capacity_updated_at
  BEFORE UPDATE ON team_capacity
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create event when milestone is created
CREATE OR REPLACE FUNCTION auto_create_milestone_event()
RETURNS TRIGGER AS $$
DECLARE
  new_event_id UUID;
BEGIN
  -- Create strategic event for this milestone
  INSERT INTO strategic_events (
    event_type,
    strategic_priority,
    project_id,
    start_time,
    end_time,
    title,
    description,
    status,
    color,
    created_by
  ) VALUES (
    'project_milestone',
    CASE 
      WHEN NEW.health_status = 'delayed' THEN 'critical'::priority_enum
      WHEN NEW.health_status = 'at_risk' THEN 'high'::priority_enum
      ELSE 'medium'::priority_enum
    END,
    NEW.project_id,
    NEW.due_date,
    NEW.due_date + INTERVAL '1 hour',
    '🎯 ' || NEW.name,
    NEW.description,
    'scheduled',
    '#10B981',
    NEW.created_by
  ) RETURNING id INTO new_event_id;
  
  -- Link event to milestone
  NEW.linked_event_id := new_event_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_milestone_event
  BEFORE INSERT ON project_milestones
  FOR EACH ROW EXECUTE FUNCTION auto_create_milestone_event();

-- Generate insights on event patterns
CREATE OR REPLACE FUNCTION generate_agenda_insights()
RETURNS void AS $$
DECLARE
  v_user RECORD;
  v_meeting_count INTEGER;
BEGIN
  -- For each user, check meeting overload
  FOR v_user IN SELECT id FROM auth.users WHERE role = 'user' OR role = 'admin'
  LOOP
    -- Count meetings this week
    SELECT COUNT(*) INTO v_meeting_count
    FROM strategic_events
    WHERE organizer_id = v_user.id
      AND start_time >= date_trunc('week', now())
      AND start_time < date_trunc('week', now()) + INTERVAL '7 days'
      AND event_type IN ('client_meeting', 'weekly_sync', 'sprint_planning');
    
    -- If too many meetings, create insight
    IF v_meeting_count > 15 THEN
      INSERT INTO agenda_insights (
        user_id,
        insight_type,
        title,
        description,
        recommendation,
        impact_level
      ) VALUES (
        v_user.id,
        'meeting_overload',
        '⚠️ Sobrecarga de reuniões',
        format('Você tem %s reuniões agendadas esta semana', v_meeting_count),
        'Considere delegar algumas reuniões ou agrupar tópicos similares',
        'high'
      );
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

ALTER TABLE strategic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_insights ENABLE ROW LEVEL SECURITY;

-- Strategic Events Policies
CREATE POLICY "Users can view events they're involved in"
  ON strategic_events FOR SELECT
  USING (
    auth.uid() = organizer_id OR
    auth.uid() = ANY(required_attendees) OR
    auth.uid() = ANY(optional_attendees) OR
    visibility IN ('team', 'company')
  );

CREATE POLICY "Users can create events"
  ON strategic_events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their events"
  ON strategic_events FOR UPDATE
  USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete their events"
  ON strategic_events FOR DELETE
  USING (auth.uid() = organizer_id);

-- Admins can see/edit everything
CREATE POLICY "Admins have full access"
  ON strategic_events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Similar policies for other tables...
-- (abbreviated for brevity - full policies in production)

-- ========================================
-- INDEXES (Performance)
-- ========================================

CREATE INDEX idx_strategic_events_organizer ON strategic_events(organizer_id);
CREATE INDEX idx_strategic_events_project ON strategic_events(project_id);
CREATE INDEX idx_strategic_events_client ON strategic_events(client_id);
CREATE INDEX idx_strategic_events_time_range ON strategic_events(start_time, end_time);
CREATE INDEX idx_strategic_events_type ON strategic_events(event_type);
CREATE INDEX idx_strategic_events_status ON strategic_events(status);

CREATE INDEX idx_project_milestones_project ON project_milestones(project_id);
CREATE INDEX idx_project_milestones_due_date ON project_milestones(due_date);
CREATE INDEX idx_project_milestones_status ON project_milestones(status);

CREATE INDEX idx_team_capacity_user ON team_capacity(user_id);
CREATE INDEX idx_team_capacity_week ON team_capacity(week_start_date);

CREATE INDEX idx_campaign_schedules_campaign ON campaign_schedules(campaign_id);
CREATE INDEX idx_campaign_schedules_date ON campaign_schedules(scheduled_date);
CREATE INDEX idx_campaign_schedules_status ON campaign_schedules(status);

CREATE INDEX idx_agenda_insights_user ON agenda_insights(user_id);
CREATE INDEX idx_agenda_insights_type ON agenda_insights(insight_type);
CREATE INDEX idx_agenda_insights_relevant ON agenda_insights(relevant_from, relevant_until);

-- ========================================
-- COMMENTS (Documentation)
-- ========================================

COMMENT ON TABLE strategic_events IS 'Central agenda system integrating client meetings, project milestones, campaign schedules, and team planning';
COMMENT ON TABLE project_milestones IS 'Project delivery milestones auto-synced with strategic events';
COMMENT ON TABLE team_capacity IS 'Weekly team capacity planning and utilization tracking';
COMMENT ON TABLE campaign_schedules IS 'Scheduled campaign actions (launches, optimizations, reviews)';
COMMENT ON TABLE agenda_insights IS 'AI-generated insights about meeting patterns, capacity, and optimization opportunities';

COMMENT ON VIEW unified_calendar IS 'Unified view of all event sources (events, milestones, campaigns) for calendar display';
COMMENT ON VIEW team_availability IS 'Real-time team availability including scheduled meetings and focus time';
COMMENT ON VIEW deadline_dashboard IS 'Dashboard view of upcoming deadlines from milestones and campaign schedules';
```

---

## 🎯 PRÓXIMA PÁGINA: Components & Features

_(Continua no próximo arquivo...)_
