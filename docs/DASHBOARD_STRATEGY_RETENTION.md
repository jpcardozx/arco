# 🎯 Dashboard de Clientes - Estratégia de Retenção e Engajamento

**Objetivo**: Criar um dashboard que estimule **retorno frequente**, **engajamento alto**, **confiança profunda** e **retenção de longo prazo**

**Data**: 2025-10-04  
**Status**: Planejamento Estratégico

---

## 🧠 Psicologia do Usuário - Por que voltar?

### Gatilhos de Retorno (Hooks)

1. **🎁 Valor Imediato** - "O que eu ganho HOJE?"
2. **📊 Progresso Visível** - "Como eu estou evoluindo?"
3. **⚡ Ações Rápidas** - "Consigo fazer isso em 30 segundos?"
4. **🔔 Notificações Relevantes** - "Algo importante aconteceu?"
5. **🎯 Metas & Conquistas** - "Estou atingindo meus objetivos?"
6. **📈 ROI Tangível** - "Quanto dinheiro eu estou ganhando/economizando?"
7. **🤝 Status & Reconhecimento** - "Sou um cliente valorizado?"

---

## 🏗️ Arquitetura do Dashboard

### 1. **Executive Summary Dashboard** (Página Principal)

#### A. Hero Metrics (Acima da Dobra)
```
┌─────────────────────────────────────────────────┐
│  💎 Seu Score ARCO: 87/100 (+5 este mês)      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 87%        │
│                                                 │
│  📊 Impacto Real:                              │
│  • +127% tráfego vs mês passado                │
│  • R$ 43.2K em conversões este mês             │
│  • 23 leads qualificados capturados            │
└─────────────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `client_metrics` (métricas agregadas por período)
- Cálculo real-time de score baseado em:
  - Engajamento com plataforma
  - Performance das campanhas
  - Taxa de conversão
  - Cumprimento de metas

#### B. Action Cards (Centro - 3 Cards)
```
┌───────────┐ ┌───────────┐ ┌───────────┐
│ 🚀 AÇÃO   │ │ 📈 INSIGHT │ │ ⚡ RÁPIDO │
│ URGENTE   │ │ RELEVANTE │ │ GANHO     │
└───────────┘ └───────────┘ └───────────┘
```

**Tipos de Actions**:
1. **Urgente** (vermelho) - Requer ação imediata
2. **Insight** (azul) - Oportunidade identificada
3. **Quick Win** (verde) - Ação rápida com alto ROI

**Implementação**:
- Tabela: `client_actions`
- Sistema de priorização automática
- Dismiss/Complete tracking

#### C. Progress Tracker (Barra Lateral Direita)
```
┌────────────────────────┐
│ 🎯 Metas do Mês       │
│                        │
│ ✅ 10K visitas         │
│ ⏳ 50 leads (38/50)    │
│ 🔄 R$20K revenue (60%) │
└────────────────────────┘
```

**Implementação**:
- Tabela: `client_goals` (metas configuráveis)
- Tabela: `goal_progress` (tracking diário)
- Gamificação: badges, streaks, conquistas

---

### 2. **Performance Analytics** (Métricas Profundas)

#### A. Real-Time Dashboard
```
┌─────────────────────────────────────┐
│  🔴 LIVE NOW                        │
│                                     │
│  • 47 visitantes ativos             │
│  • 3 conversões nas últimas 2h      │
│  • Taxa de conversão: 2.8% (↑0.4%) │
└─────────────────────────────────────┘
```

**Implementação**:
- Integração com Google Analytics 4 via API
- WebSocket para updates real-time
- Tabela: `realtime_events`

#### B. Comparative Reports
```
┌───────────────────────────────────────┐
│  📊 Comparativo de Performance        │
│                                       │
│  Você vs Indústria:                   │
│  • Taxa conversão: 2.8% vs 1.9% ✅   │
│  • Custo/Lead: R$12 vs R$18 ✅       │
│  • Bounce Rate: 42% vs 55% ✅        │
└───────────────────────────────────────┘
```

**Implementação**:
- Tabela: `industry_benchmarks`
- Cálculos comparativos automáticos
- Atualizações mensais

#### C. Predictive Analytics
```
┌───────────────────────────────────────┐
│  🔮 Projeções Inteligentes            │
│                                       │
│  Se manter ritmo atual:               │
│  • ~140 leads até fim do mês         │
│  • ~R$67K revenue estimado           │
│  • ROI projetado: 340%               │
│                                       │
│  💡 Recomendação: Aumentar budget    │
│     em 20% para maximizar momentum   │
└───────────────────────────────────────┘
```

**Implementação**:
- Machine Learning simples (regressão linear)
- Tabela: `predictions` (histórico de previsões)
- Tabela: `recommendations` (ações sugeridas)

---

### 3. **Lead Management** (CRM Integrado)

#### A. Lead Pipeline Visual
```
┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
│ NEW │──▶│QUAL │──▶│NEGO │──▶│ WIN │
│ 23  │   │ 15  │   │  8  │   │  3  │
└─────┘   └─────┘   └─────┘   └─────┘
  ↓         ↓         ↓         ↓
R$276K   R$180K    R$96K    R$36K
```

**Implementação**:
- Drag-and-drop Kanban board
- Tabela: `leads` (já existe)
- Tabela: `lead_activities` (histórico de interações)
- Notificações automáticas de mudança de estágio

#### B. Lead Scoring Automático
```
┌────────────────────────────────────┐
│  🎯 Lead Scoring                   │
│                                    │
│  Carlos Mendes        Score: 85/100│
│  ├─ Engajamento: 30pts             │
│  ├─ Budget fit: 25pts              │
│  ├─ Timeline: 20pts                │
│  └─ Authority: 10pts               │
│                                    │
│  💡 Alta probabilidade de conversão│
│     Ação recomendada: Ligar hoje   │
└────────────────────────────────────┘
```

**Implementação**:
- Algoritmo de scoring customizável
- Tabela: `lead_scoring_rules`
- Tabela: `lead_scores` (histórico)

#### C. Communication Hub
```
┌────────────────────────────────────┐
│  💬 Histórico de Comunicação       │
│                                    │
│  📧 Email enviado - 2h atrás       │
│  📞 Ligação - ontem 15:30 (12min)  │
│  💬 WhatsApp - 3 dias atrás        │
│  📝 Nota adicionada - 1 semana     │
└────────────────────────────────────┘
```

**Implementação**:
- Tabela: `lead_interactions`
- Integração com email (via webhook)
- Widget de WhatsApp tracking
- Timeline visual

---

### 4. **Campaign Manager** (Gestão de Campanhas)

#### A. Active Campaigns
```
┌────────────────────────────────────────┐
│  🚀 Campanhas Ativas                   │
│                                        │
│  [Google Ads] Serviços Premium         │
│  • Budget: R$5,000 | Gasto: R$3,240   │
│  • CTR: 3.2% | CPC: R$1.80            │
│  • Conversões: 18 (↑6 vs ontem)       │
│  • Status: ✅ Performance Excelente    │
│                                        │
│  [Meta Ads] Retargeting                │
│  • Budget: R$2,000 | Gasto: R$1,890   │
│  • CTR: 1.8% | CPC: R$0.95            │
│  • Conversões: 12 (↓2 vs ontem)       │
│  • Status: ⚠️ Precisa otimização      │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `campaigns`
- Tabela: `campaign_metrics` (métricas diárias)
- Integração com Google Ads API
- Integração com Meta Ads API

#### B. A/B Testing Dashboard
```
┌────────────────────────────────────┐
│  🧪 Testes Ativos                  │
│                                    │
│  Landing Page: Hero Section        │
│  • Variante A: "Aumente Vendas"   │
│    Conv: 2.3% | Visitas: 1,240    │
│                                    │
│  • Variante B: "Dobre Resultados"  │
│    Conv: 3.1% | Visitas: 1,198    │
│                                    │
│  🏆 Vencedor: Variante B (+34.7%)  │
│     Implementar em toda campanha?  │
│     [SIM] [VER MAIS] [ADIAR]      │
└────────────────────────────────────┘
```

**Implementação**:
- Tabela: `ab_tests`
- Tabela: `ab_test_results`
- Cálculo de significância estatística
- Recomendações automáticas

---

### 5. **Financial Dashboard** (ROI & Faturamento)

#### A. Revenue Tracker
```
┌────────────────────────────────────────┐
│  💰 Receita Gerada                     │
│                                        │
│  Este Mês:     R$ 43,200 (↑23%)       │
│  Último Mês:   R$ 35,100               │
│  Projetado:    R$ 67,000               │
│                                        │
│  📊 [GRÁFICO DE BARRAS INTERATIVO]    │
│     Jan  Fev  Mar  Abr  Mai  Jun      │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `revenue_tracking`
- Integration com sistema de pagamentos
- Conversão de leads em revenue

#### B. ROI Calculator Real-Time
```
┌────────────────────────────────────────┐
│  📈 Retorno Sobre Investimento         │
│                                        │
│  Investimento Total:  R$ 8,500         │
│  Receita Gerada:      R$ 43,200        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│  ROI: 408%                             │
│  Lucro Líquido: R$ 34,700              │
│                                        │
│  💡 Cada R$1 investido retornou R$5.08 │
└────────────────────────────────────────┘
```

**Implementação**:
- Cálculo automático baseado em:
  - Investimento em serviços ARCO
  - Receita atribuída às campanhas
  - Custos de anúncios

#### C. Payment History
```
┌────────────────────────────────────────┐
│  💳 Histórico de Pagamentos            │
│                                        │
│  ✅ Maio 2025    R$ 5,000  (Pago)     │
│  ✅ Abril 2025   R$ 5,000  (Pago)     │
│  ⏰ Junho 2025   R$ 5,000  (Pendente) │
│                                        │
│  [PAGAR FATURA] [BAIXAR NFe]          │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `invoices`
- Tabela: `payments`
- Integração com gateway de pagamento
- Geração automática de NFe

---

### 6. **Content Hub** (Recursos & Educação)

#### A. Knowledge Base
```
┌────────────────────────────────────────┐
│  📚 Base de Conhecimento               │
│                                        │
│  🔥 Trending:                          │
│  • Como otimizar Google Ads (15min)   │
│  • Estratégias de Remarketing (10min) │
│  • SEO para E-commerce (20min)        │
│                                        │
│  📖 Seu Progresso:                     │
│  • 12 artigos lidos                    │
│  • 3 vídeos assistidos                 │
│  • 🏆 Badge: Estudante Dedicado        │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `knowledge_articles`
- Tabela: `user_reading_progress`
- Sistema de badges/conquistas

#### B. Case Studies
```
┌────────────────────────────────────────┐
│  🎯 Casos de Sucesso                   │
│                                        │
│  E-commerce de Moda (+340% vendas)    │
│  • Similar ao seu negócio              │
│  • Estratégia: Google Shopping + Meta │
│  • Resultado: R$ 240K → R$ 1.05M/mês  │
│                                        │
│  [LER CASO COMPLETO]                   │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `case_studies`
- Matching automático baseado em setor
- Call-to-action para replicar estratégia

#### C. Webinars & Events
```
┌────────────────────────────────────────┐
│  🎥 Próximos Eventos                   │
│                                        │
│  [LIVE] Estratégias 2025               │
│  📅 Amanhã, 15h | 60 min              │
│  👥 12 vagas restantes                 │
│  [GARANTIR VAGA]                       │
│                                        │
│  Workshop: Landing Pages               │
│  📅 15/10 | Online | Gratuito         │
│  [INSCREVER-SE]                        │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `events`
- Tabela: `event_registrations`
- Sistema de notificações

---

### 7. **Support & Communication**

#### A. Ticket System
```
┌────────────────────────────────────────┐
│  🎫 Seus Tickets                       │
│                                        │
│  #2847 - Ajuste em campanha           │
│  Status: ✅ Resolvido (2h atrás)      │
│                                        │
│  #2853 - Dúvida sobre relatório       │
│  Status: ⏰ Em andamento (SLA: 1h)    │
│                                        │
│  [ABRIR NOVO TICKET]                   │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `support_tickets`
- Tabela: `ticket_messages`
- SLA tracking automático
- Notificações de atualização

#### B. Live Chat Integration
```
┌────────────────────────────────────────┐
│  💬 Chat com Especialista              │
│                                        │
│  🟢 Online agora                       │
│  Tempo médio de resposta: 2 min       │
│                                        │
│  [INICIAR CONVERSA]                    │
│                                        │
│  Horário: Seg-Sex 9h-18h              │
└────────────────────────────────────────┘
```

**Implementação**:
- Integração com Intercom/Crisp
- Tabela: `chat_conversations`
- Bot automático para FAQ

#### C. Account Manager
```
┌────────────────────────────────────────┐
│  👤 Seu Account Manager                │
│                                        │
│  Ana Paula Souza                       │
│  📧 ana@arco.com                       │
│  📞 (11) 99999-9999                    │
│  🕒 Última reunião: 15/09              │
│                                        │
│  📅 Próxima reunião: 20/10 às 15h     │
│  [REAGENDAR] [CANCELAR]                │
└────────────────────────────────────────┘
```

**Implementação**:
- Tabela: `account_managers`
- Tabela: `meetings`
- Integração com Google Calendar

---

## 🗄️ Schema do Banco de Dados

### Tabelas Novas Necessárias

```sql
-- 1. Métricas do Cliente
CREATE TABLE client_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  date DATE NOT NULL,
  
  -- Traffic metrics
  sessions INT DEFAULT 0,
  pageviews INT DEFAULT 0,
  bounce_rate DECIMAL(5,2),
  avg_session_duration INT, -- seconds
  
  -- Conversion metrics
  conversions INT DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  revenue DECIMAL(12,2) DEFAULT 0,
  
  -- Campaign metrics
  ad_spend DECIMAL(12,2) DEFAULT 0,
  leads_generated INT DEFAULT 0,
  cost_per_lead DECIMAL(10,2),
  
  -- Engagement
  arco_score INT DEFAULT 50, -- 0-100
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Metas do Cliente
CREATE TABLE client_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  goal_type VARCHAR(50) NOT NULL, -- 'traffic', 'leads', 'revenue', 'conversion_rate'
  target_value DECIMAL(12,2) NOT NULL,
  current_value DECIMAL(12,2) DEFAULT 0,
  period VARCHAR(20) DEFAULT 'monthly', -- 'daily', 'weekly', 'monthly', 'quarterly'
  
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'failed'
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Ações Recomendadas
CREATE TABLE client_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  action_type VARCHAR(20) NOT NULL, -- 'urgent', 'insight', 'quick_win'
  priority INT DEFAULT 5, -- 1-10
  
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'dismissed'
  
  -- Metadata
  estimated_impact VARCHAR(50), -- 'high', 'medium', 'low'
  estimated_time VARCHAR(50), -- '5min', '30min', '2h'
  
  completed_at TIMESTAMP,
  dismissed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Campanhas
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  name VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL, -- 'google_ads', 'meta_ads', 'linkedin', etc
  campaign_type VARCHAR(50), -- 'search', 'display', 'shopping', 'video'
  
  budget DECIMAL(12,2),
  daily_budget DECIMAL(12,2),
  
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'completed'
  
  start_date DATE NOT NULL,
  end_date DATE,
  
  external_id VARCHAR(255), -- ID na plataforma externa
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Métricas de Campanhas (diárias)
CREATE TABLE campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  date DATE NOT NULL,
  
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  ctr DECIMAL(5,2),
  cpc DECIMAL(10,2),
  spend DECIMAL(12,2) DEFAULT 0,
  conversions INT DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  cost_per_conversion DECIMAL(10,2),
  revenue DECIMAL(12,2) DEFAULT 0,
  roas DECIMAL(10,2), -- Return on Ad Spend
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Testes A/B
CREATE TABLE ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  element_tested VARCHAR(100), -- 'hero_section', 'cta_button', 'headline'
  
  variant_a_name VARCHAR(100) DEFAULT 'Control',
  variant_b_name VARCHAR(100) DEFAULT 'Variation',
  
  variant_a_data JSONB, -- configuração da variante A
  variant_b_data JSONB, -- configuração da variante B
  
  status VARCHAR(20) DEFAULT 'running', -- 'running', 'completed', 'paused'
  winner VARCHAR(10), -- 'A', 'B', 'tie'
  confidence_level DECIMAL(5,2), -- 0-100%
  
  start_date TIMESTAMP DEFAULT NOW(),
  end_date TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 7. Resultados de Testes A/B
CREATE TABLE ab_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES ab_tests(id),
  
  variant VARCHAR(1) NOT NULL, -- 'A' or 'B'
  visitors INT DEFAULT 0,
  conversions INT DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Interações com Leads
CREATE TABLE lead_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  
  interaction_type VARCHAR(50) NOT NULL, -- 'email', 'call', 'whatsapp', 'meeting', 'note'
  direction VARCHAR(20), -- 'inbound', 'outbound'
  
  subject VARCHAR(255),
  content TEXT,
  duration INT, -- minutos (para calls/meetings)
  
  outcome VARCHAR(100), -- 'interested', 'not_interested', 'callback', etc
  next_action VARCHAR(255),
  
  performed_by UUID, -- user_id que fez a interação
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Scoring de Leads
CREATE TABLE lead_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  
  total_score INT NOT NULL, -- 0-100
  
  -- Breakdown
  engagement_score INT,
  budget_fit_score INT,
  timeline_score INT,
  authority_score INT,
  
  calculated_at TIMESTAMP DEFAULT NOW()
);

-- 10. Base de Conhecimento
CREATE TABLE knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  
  category VARCHAR(100), -- 'seo', 'ads', 'analytics', 'strategy'
  content_type VARCHAR(50), -- 'article', 'video', 'tutorial', 'case_study'
  
  reading_time INT, -- minutos
  difficulty VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
  
  views INT DEFAULT 0,
  helpful_count INT DEFAULT 0,
  
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 11. Progresso de Leitura
CREATE TABLE user_reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  article_id UUID REFERENCES knowledge_articles(id),
  
  progress_percent INT DEFAULT 0, -- 0-100
  completed BOOLEAN DEFAULT FALSE,
  
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 12. Tickets de Suporte
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  
  assigned_to UUID, -- user_id do atendente
  
  sla_deadline TIMESTAMP, -- prazo de resposta SLA
  resolved_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 13. Mensagens de Tickets
CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id),
  
  sender_type VARCHAR(20) NOT NULL, -- 'client', 'support'
  sender_id UUID NOT NULL,
  
  message TEXT NOT NULL,
  attachments JSONB, -- array de URLs
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- 14. Eventos (Webinars, Workshops)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50), -- 'webinar', 'workshop', 'training', 'consultation'
  
  start_datetime TIMESTAMP NOT NULL,
  end_datetime TIMESTAMP NOT NULL,
  
  max_attendees INT,
  current_attendees INT DEFAULT 0,
  
  meeting_link VARCHAR(500), -- Zoom/Meet link
  
  status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'live', 'completed', 'cancelled'
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 15. Inscrições em Eventos
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  client_id UUID REFERENCES clients(id),
  
  status VARCHAR(20) DEFAULT 'registered', -- 'registered', 'attended', 'no_show', 'cancelled'
  
  registered_at TIMESTAMP DEFAULT NOW(),
  attended_at TIMESTAMP,
  cancelled_at TIMESTAMP
);

-- 16. Reuniões com Account Manager
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  account_manager_id UUID NOT NULL,
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  scheduled_at TIMESTAMP NOT NULL,
  duration INT DEFAULT 60, -- minutos
  
  meeting_link VARCHAR(500),
  meeting_notes TEXT,
  
  status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'rescheduled', 'cancelled'
  
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 17. Receita Tracking
CREATE TABLE revenue_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  source VARCHAR(100), -- 'conversion', 'sale', 'subscription', 'upsell'
  amount DECIMAL(12,2) NOT NULL,
  
  campaign_id UUID REFERENCES campaigns(id), -- opcional, se atribuível
  lead_id UUID REFERENCES leads(id), -- opcional, se veio de lead
  
  transaction_date DATE NOT NULL,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- 18. Invoices/Faturas
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'overdue', 'cancelled'
  
  nfe_url VARCHAR(500), -- URL da Nota Fiscal
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 19. Pagamentos
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id),
  client_id UUID REFERENCES clients(id),
  
  amount DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(50), -- 'credit_card', 'boleto', 'pix', 'bank_transfer'
  
  transaction_id VARCHAR(255), -- ID do gateway
  gateway VARCHAR(50), -- 'stripe', 'pagarme', 'mercadopago'
  
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'failed', 'refunded'
  
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 20. Account Managers
CREATE TABLE account_managers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  avatar_url VARCHAR(500),
  
  bio TEXT,
  specialties TEXT[], -- Array de especialidades
  
  active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 21. Atribuição de Account Managers
CREATE TABLE client_account_managers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  account_manager_id UUID REFERENCES account_managers(id),
  
  assigned_at TIMESTAMP DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);
```

---

## 🔔 Sistema de Notificações

### Push Notifications (PWA)
```javascript
// Triggers para notificações:
1. Nova conversão detectada
2. Meta atingida
3. Anomalia em campanha (performance caiu >20%)
4. Novo lead qualificado
5. Ticket respondido
6. Reunião em 1 hora
7. Fatura vencendo em 3 dias
8. Novo artigo publicado (tema de interesse)
```

**Implementação**:
- Service Worker para PWA
- Tabela: `notifications`
- Tabela: `notification_preferences` (usuário controla o que recebe)

---

## 🎮 Gamificação

### Sistema de Conquistas
```
🏆 Badges:
- 🔥 Streak de 7 dias seguidos acessando
- 📈 Meta Batida: Atingiu 100% da meta mensal
- 🎯 Precisão Total: Taxa de conversão acima da indústria
- 📚 Estudante: Leu 10 artigos
- ⚡ Relâmpago: Completou 5 quick wins em 1 dia
- 💎 VIP: Cliente há 12 meses
```

**Implementação**:
- Tabela: `achievements`
- Tabela: `user_achievements`
- Sistema de XP/Levels opcional

---

## 📱 Mobile-First

### PWA Features
- ✅ Instalável (Add to Home Screen)
- ✅ Offline-first (cache de dados essenciais)
- ✅ Push notifications
- ✅ Biometric authentication
- ✅ Share API integration

---

## 🔐 Segurança & RLS

### Políticas de Acesso
```sql
-- Cada cliente vê APENAS seus dados
CREATE POLICY "Clients see only their data"
ON client_metrics
FOR SELECT
USING (client_id IN (
  SELECT id FROM clients WHERE created_by = auth.uid()
));

-- Account Managers veem dados dos clientes atribuídos
CREATE POLICY "Account managers see assigned clients"
ON client_metrics
FOR SELECT
USING (
  client_id IN (
    SELECT client_id 
    FROM client_account_managers 
    WHERE account_manager_id = auth.uid() AND active = TRUE
  )
);
```

---

## 📊 KPIs de Sucesso do Dashboard

### Métricas de Engajamento
1. **DAU/MAU Ratio** - Usuários ativos diários vs mensais
   - Target: >40% (excelente)
2. **Sessões por Usuário** - Quantas vezes voltam por semana
   - Target: >3x/semana
3. **Tempo Médio na Plataforma**
   - Target: >8 minutos/sessão
4. **Feature Adoption Rate** - % de features utilizadas
   - Target: >60%
5. **Net Promoter Score (NPS)**
   - Target: >50 (promoters)

### Métricas de Retenção
1. **Churn Rate** - Taxa de cancelamento
   - Target: <5%/mês
2. **Customer Lifetime Value (LTV)**
   - Target: >R$50,000
3. **Retention Rate D7/D30**
   - Target: D7 >70%, D30 >50%

---

## 🚀 Roadmap de Implementação

### Sprint 1 (2 semanas) - MVP
- ✅ Auth completo (login, signup, reset)
- ✅ Executive Summary Dashboard (hero metrics)
- [ ] Client Metrics tracking (tabela + CRUD)
- [ ] Goals sistema (definir e tracking)
- [ ] Actions recomendadas (manual)

### Sprint 2 (2 semanas) - Analytics
- [ ] Performance Analytics dashboard
- [ ] Integration com Google Analytics 4
- [ ] Comparative Reports (vs indústria)
- [ ] Basic charts (recharts)

### Sprint 3 (2 semanas) - CRM
- [ ] Lead Pipeline Kanban
- [ ] Lead Interactions timeline
- [ ] Communication Hub
- [ ] Lead Scoring automático

### Sprint 4 (2 semanas) - Campaigns
- [ ] Campaign Manager dashboard
- [ ] Campaign Metrics tracking
- [ ] A/B Testing sistema
- [ ] Integração Google Ads (básica)

### Sprint 5 (2 semanas) - Financial
- [ ] Revenue Tracker
- [ ] ROI Calculator
- [ ] Invoices/Payments
- [ ] Payment Gateway integration

### Sprint 6 (2 semanas) - Content & Support
- [ ] Knowledge Base
- [ ] Ticket System
- [ ] Live Chat integration
- [ ] Events/Webinars

### Sprint 7 (1 semana) - Gamification
- [ ] Achievement system
- [ ] Badges & Streaks
- [ ] Leaderboard (opcional)

### Sprint 8 (1 semana) - Polish
- [ ] PWA setup
- [ ] Push Notifications
- [ ] Mobile optimization
- [ ] Performance optimization

---

## 💡 Diferenciais Competitivos

### Por que este dashboard vence:

1. **Valor Imediato** - Cliente vê ROI em tempo real
2. **Actionable Insights** - Não só métricas, mas AÇÕES
3. **Educação Integrada** - Aprende enquanto usa
4. **Gamificação Sutil** - Engajamento sem ser forçado
5. **Comunicação Fluida** - Suporte integrado, não isolado
6. **Predictive** - Não só reativo, mas proativo
7. **Mobile-First** - Acessível de qualquer lugar
8. **Transparência Total** - Cliente vê tudo, confia mais

---

## 🎯 Conclusão

Este dashboard não é apenas um "painel de métricas". É uma **ferramenta estratégica** que:

1. ✅ **Gera retorno frequente** (notificações + valor diário)
2. ✅ **Aumenta engajamento** (gamificação + ações rápidas)
3. ✅ **Constrói confiança** (transparência + ROI visível)
4. ✅ **Estimula retenção** (educação + suporte integrado)

**Próximo passo**: Implementar Sprint 1 (MVP) com as features essenciais.

Quer que eu comece a implementar? 🚀
