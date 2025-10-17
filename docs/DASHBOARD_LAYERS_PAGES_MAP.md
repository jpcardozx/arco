# 🗺️ MAPA COMPLETO - Páginas por Layer do Dashboard

**Data**: 9 de outubro de 2025  
**Status**: Documentação Completa  
**Total de Páginas**: 44+ páginas funcionais

---

## 📊 VISÃO GERAL DOS LAYERS

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD HIERARCHY                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔴 LAYER 1: ADMIN (20+ páginas)                           │
│     └─ Acesso total ao sistema                              │
│     └─ Gestão de usuários, finanças, operações             │
│                                                              │
│  🟡 LAYER 2: USER/EMPLOYEE (15+ páginas)                   │
│     └─ Operações do dia-a-dia                               │
│     └─ Gestão de leads, tarefas, campanhas                 │
│                                                              │
│  🟢 LAYER 3: CLIENT (8+ páginas)                           │
│     └─ Visão executiva do projeto                          │
│     └─ Analytics, documentos, suporte                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔴 LAYER 1: ADMIN DASHBOARD

**Component Principal**: `src/app/dashboard/components/AdminDashboard.tsx`  
**Acesso**: Apenas usuários com `role = 'admin'`  
**Total de Páginas**: 20+

### 📍 **Página Principal**
- **Rota**: `/dashboard`
- **Arquivo**: `src/app/dashboard/page.tsx`
- **Features**:
  - ✅ Estatísticas globais (usuários, clientes, receita)
  - ✅ Métricas de conversão
  - ✅ Atividade recente
  - ✅ Refresh manual de dados

---

### 👥 **Gestão de Pessoas**

#### 1. **Users Management**
- **Rota**: `/dashboard/users`
- **Arquivo**: `src/app/dashboard/users/page.tsx`
- **Features**:
  - ✅ CRUD completo de usuários
  - ✅ Gerenciamento de roles (admin/user/client)
  - ✅ Controle de permissões
  - ✅ Histórico de atividades
  - 🟡 Pendência: Bulk operations

#### 2. **Leads Management**
- **Rota**: `/dashboard/leads`
- **Arquivo**: `src/app/dashboard/leads/page.tsx`
- **Features**:
  - ✅ Pipeline de vendas
  - ✅ Filtros avançados
  - ✅ Qualificação de leads
  - ✅ Atribuição de vendedores

---

### 💰 **Finanças & Comercial**

#### 3. **Finance Dashboard**
- **Rota**: `/dashboard/finance`
- **Arquivo**: `src/app/dashboard/finance/page.tsx`
- **Features**:
  - ✅ Relatórios financeiros mensais
  - ✅ Controle de receitas e despesas
  - ✅ Alíquotas tributárias
  - 🟡 Pendência: PDF export

#### 4. **Commissions**
- **Rota**: `/dashboard/commissions`
- **Arquivo**: `src/app/dashboard/commissions/page.tsx`
- **Features**:
  - ✅ Cálculo automático de comissões
  - ✅ Metas por período
  - ✅ Performance de vendedores
  - ✅ Histórico de pagamentos

---

### 📊 **Analytics & Growth**

#### 5. **Analytics Dashboard**
- **Rota**: `/dashboard/analytics`
- **Arquivo**: `src/app/dashboard/analytics/page.tsx`
- **Features**:
  - ✅ Métricas de tráfego
  - ✅ Conversões por fonte
  - ✅ Funil de vendas
  - 🟡 Pendência: Google Analytics API

#### 6. **Crescimento**
- **Rota**: `/dashboard/crescimento`
- **Arquivo**: `src/app/dashboard/crescimento/page.tsx`
- **Features**:
  - ✅ Growth metrics
  - ✅ KPIs mensais
  - ✅ Comparação de períodos

#### 7. **Diagnóstico**
- **Rota**: `/dashboard/diagnostico`
- **Arquivo**: `src/app/dashboard/diagnostico/page.tsx`
- **Features**:
  - ✅ Health check do sistema
  - ✅ Análise de performance
  - ✅ Recomendações de otimização

#### 8. **Funil de Vendas**
- **Rota**: `/dashboard/funil`
- **Arquivo**: `src/app/dashboard/funil/page.tsx`
- **Features**:
  - ✅ Visualização do pipeline
  - ✅ Taxa de conversão por etapa
  - ✅ Previsão de fechamento

#### 9. **Saúde do Negócio**
- **Rota**: `/dashboard/saude`
- **Arquivo**: `src/app/dashboard/saude/page.tsx`
- **Features**:
  - ✅ Indicadores de saúde financeira
  - ✅ Churn rate
  - ✅ Customer lifetime value

---

### 📱 **Comunicação & Marketing**

#### 10. **WhatsApp Integration**
- **Rota**: `/dashboard/whatsapp`
- **Arquivo**: `src/app/dashboard/whatsapp/page.tsx`
- **Features**:
  - ✅ Gerenciamento de conversas
  - ✅ Templates de mensagens
  - ✅ Automação de campanhas
  - 🟡 Pendência: WhatsApp Business API integration

#### 11. **Campaigns**
- **Rota**: `/dashboard/campaigns`
- **Arquivo**: `src/app/dashboard/campaigns/page.tsx`
- **Features**:
  - ✅ Criação de campanhas
  - ✅ Segmentação de público
  - ✅ Tracking de resultados
  - 🟡 Pendência: Email automation

#### 12. **Mail Center**
- **Rota**: `/dashboard/mail`
- **Arquivo**: `src/app/dashboard/mail/page.tsx`
- **Features**:
  - ✅ Central de emails
  - ✅ Templates profissionais
  - ✅ Histórico de envios

---

### 🗂️ **Operações & Documentos**

#### 13. **Documents Management**
- **Rota**: `/dashboard/documents`
- **Arquivo**: `src/app/dashboard/documents/page.tsx`
- **Features**:
  - ✅ Upload de documentos
  - ✅ Organização por categorias
  - ✅ Controle de versões
  - ✅ Permissões granulares

#### 14. **Cloud Storage**
- **Rota**: `/dashboard/cloud`
- **Arquivo**: `src/app/dashboard/cloud/page.tsx`
- **Features**:
  - ✅ Storage management
  - ✅ Compartilhamento de arquivos
  - 🟡 Pendência: AWS S3 integration

#### 15. **Operações**
- **Rota**: `/dashboard/operacoes`
- **Arquivo**: `src/app/dashboard/operacoes/page.tsx`
- **Features**:
  - ✅ Dashboard operacional
  - ✅ Tarefas em andamento
  - ✅ Suporte tickets
  - ✅ Gestão de arquivos

---

### 📅 **Agendamento & Tarefas**

#### 16. **Tasks Management**
- **Rota**: `/dashboard/tasks`
- **Arquivo**: `src/app/dashboard/tasks/page.tsx`
- **Features**:
  - ✅ Kanban board
  - ✅ Priorização de tarefas
  - ✅ Atribuição de responsáveis
  - ✅ Deadlines e notificações

#### 17. **Appointments**
- **Rota**: `/dashboard/appointments`
- **Arquivo**: `src/app/dashboard/appointments/page.tsx`
- **Features**:
  - ✅ Calendário de agendamentos
  - ✅ Integração com Google Calendar
  - ✅ Lembretes automáticos
  - ✅ Video calls integration

---

### 📋 **Checklists & Ações**

#### 18. **Checklist Manager**
- **Rota**: `/dashboard/checklist`
- **Arquivo**: `src/app/dashboard/checklist/page.tsx`
- **Features**:
  - ✅ Criação de checklists
  - ✅ Templates predefinidos
  - ✅ Tracking de progresso
  - ✅ Notificações de pendências

#### 19. **Checklist Individual**
- **Rota**: `/dashboard/checklist/[id]`
- **Arquivo**: `src/app/dashboard/checklist/[id]/page.tsx`
- **Features**:
  - ✅ Visualização detalhada
  - ✅ Edição inline
  - ✅ Comentários e anexos
  - ✅ Histórico de alterações

#### 20. **Plano de Ação**
- **Rota**: `/dashboard/plano-de-acao`
- **Arquivo**: `src/app/dashboard/plano-de-acao/page.tsx`
- **Features**:
  - ✅ Roadmap estratégico
  - ✅ Milestones e objetivos
  - ✅ Progress tracking

---

### ⚙️ **Configurações**

#### 21. **Settings**
- **Rota**: `/dashboard/settings`
- **Arquivo**: `src/app/dashboard/settings/page.tsx`
- **Features**:
  - ✅ Configurações globais do sistema
  - ✅ Integrações de terceiros
  - ✅ Preferências de notificação
  - ✅ Customização de interface

---

## 🟡 LAYER 2: USER/EMPLOYEE DASHBOARD

**Component Principal**: `src/app/dashboard/components/UserDashboard.tsx`  
**Acesso**: Usuários com `role = 'user'` (funcionários)  
**Total de Páginas**: 15+

### 📍 **Página Principal**
- **Rota**: `/dashboard`
- **Features**:
  - ✅ Tarefas atribuídas
  - ✅ Leads em follow-up
  - ✅ Métricas pessoais
  - ✅ Notificações pendentes

---

### 👔 **Vendas & Leads**

#### 1. **Leads Management**
- **Rota**: `/dashboard/leads`
- **Features**:
  - ✅ Leads atribuídos ao usuário
  - ✅ Pipeline pessoal
  - ✅ Follow-up tracking
  - ❌ Não pode ver leads de outros

#### 2. **Campaigns (Read-only)**
- **Rota**: `/dashboard/campaigns`
- **Features**:
  - ✅ Visualizar campanhas ativas
  - ❌ Não pode criar/editar
  - ✅ Pode executar ações designadas

---

### 📅 **Produtividade**

#### 3. **Tasks (Personal)**
- **Rota**: `/dashboard/tasks`
- **Features**:
  - ✅ Tarefas pessoais
  - ✅ Deadlines e prioridades
  - ❌ Não pode atribuir para outros

#### 4. **Appointments**
- **Rota**: `/dashboard/appointments`
- **Features**:
  - ✅ Calendário pessoal
  - ✅ Agendamento com leads
  - ✅ Integração com Google Calendar

#### 5. **Checklist (Assigned)**
- **Rota**: `/dashboard/checklist`
- **Features**:
  - ✅ Checklists atribuídos
  - ✅ Marcar como concluído
  - ❌ Não pode criar novos

---

### 📊 **Analytics (Limited)**

#### 6. **Analytics (Personal)**
- **Rota**: `/dashboard/analytics`
- **Features**:
  - ✅ Performance pessoal
  - ✅ Conversões próprias
  - ❌ Não vê métricas globais

#### 7. **Crescimento (Personal)**
- **Rota**: `/dashboard/crescimento`
- **Features**:
  - ✅ Evolução pessoal
  - ✅ Metas individuais

---

### 📱 **Comunicação**

#### 8. **WhatsApp (Limited)**
- **Rota**: `/dashboard/whatsapp`
- **Features**:
  - ✅ Conversas atribuídas
  - ✅ Templates aprovados
  - ❌ Não pode criar templates

#### 9. **Mail (Personal)**
- **Rota**: `/dashboard/mail`
- **Features**:
  - ✅ Emails pessoais
  - ✅ Templates da empresa

---

### 🗂️ **Documentos**

#### 10. **Documents (Read-only)**
- **Rota**: `/dashboard/documents`
- **Features**:
  - ✅ Visualizar documentos compartilhados
  - ❌ Upload limitado

#### 11. **Cloud (Limited)**
- **Rota**: `/dashboard/cloud`
- **Features**:
  - ✅ Pasta pessoal
  - ✅ Pastas compartilhadas (read)

---

### ⚙️ **Configurações**

#### 12. **Settings (Personal)**
- **Rota**: `/dashboard/settings`
- **Features**:
  - ✅ Preferências pessoais
  - ✅ Notificações
  - ❌ Sem configurações globais

---

## 🟢 LAYER 3: CLIENT DASHBOARD

**Component Principal**: `src/app/dashboard/components/ClientDashboard.tsx`  
**Acesso**: Usuários com `role = 'client'` (clientes pagos)  
**Total de Páginas**: 8+

### 📍 **Página Principal**
- **Rota**: `/dashboard`
- **Features**:
  - ✅ Overview do projeto
  - ✅ Progress tracking
  - ✅ Próximos milestones
  - ✅ Timeline de entregas

---

### 📊 **Performance & Analytics**

#### 1. **Analytics Dashboard**
- **Rota**: `/dashboard/analytics`
- **Features**:
  - ✅ Métricas de performance do site
  - ✅ Core Web Vitals
  - ✅ Lighthouse score
  - ✅ ROI calculator
  - 🟡 Pendência: Google Analytics API

#### 2. **Crescimento**
- **Rota**: `/dashboard/crescimento`
- **Features**:
  - ✅ Leads gerados
  - ✅ Conversões
  - ✅ Comparação de períodos (7d, 30d, 90d)
  - ✅ Growth charts

---

### 🎯 **Gestão de Projeto**

#### 3. **Plano de Ação**
- **Rota**: `/dashboard/plano-de-acao`
- **Features**:
  - ✅ Roadmap do projeto
  - ✅ Milestones e deadlines
  - ✅ Status de entregáveis
  - ✅ Progress tracking

#### 4. **Checklist do Projeto**
- **Rota**: `/dashboard/checklist`
- **Features**:
  - ✅ Checklists do projeto
  - ✅ Visualização de progresso
  - ❌ Não pode editar (apenas visualizar)

---

### 🌐 **Domínio & Performance**

#### 5. **Diagnóstico (Site Health)**
- **Rota**: `/dashboard/diagnostico`
- **Features**:
  - ✅ Health check do site
  - ✅ DNS status
  - ✅ SSL certificate check
  - ✅ Performance metrics
  - ✅ Security scan

#### 6. **Saúde do Negócio**
- **Rota**: `/dashboard/saude`
- **Features**:
  - ✅ Business metrics
  - ✅ Customer satisfaction
  - ✅ Performance trends

---

### 📁 **Documentos & Comunicação**

#### 7. **Documents**
- **Rota**: `/dashboard/documents`
- **Features**:
  - ✅ Relatórios mensais
  - ✅ Documentos do projeto
  - ✅ Contratos e propostas
  - ✅ Download de arquivos

#### 8. **Support (Read-only)**
- **Rota**: `/dashboard/operacoes?tab=suporte`
- **Features**:
  - ✅ Abrir tickets de suporte
  - ✅ Chat direto com time
  - ✅ Central de ajuda
  - ✅ Histórico de tickets

---

### ⚙️ **Configurações**

#### 9. **Settings**
- **Rota**: `/dashboard/settings`
- **Features**:
  - ✅ Preferências de conta
  - ✅ Notificações
  - ✅ Usuários da empresa (se enterprise)
  - ✅ Data sharing consent

---

## 🔐 CONTROLE DE ACESSO (RBAC)

### Matriz de Permissões

| Página/Feature | Admin | User | Client |
|----------------|-------|------|--------|
| **Users Management** | ✅ Full | ❌ None | ❌ None |
| **Finance** | ✅ Full | ❌ None | ❌ None |
| **Commissions** | ✅ Full | ✅ View Own | ❌ None |
| **Leads** | ✅ All Leads | ✅ Own Leads | ❌ None |
| **Analytics** | ✅ Global | ✅ Personal | ✅ Own Project |
| **WhatsApp** | ✅ Full | ✅ Limited | ❌ None |
| **Campaigns** | ✅ Create/Edit | ✅ Execute | ❌ None |
| **Tasks** | ✅ Assign All | ✅ Own Tasks | ❌ None |
| **Documents** | ✅ Full | ✅ Limited | ✅ Own Project |
| **Settings** | ✅ Global | ✅ Personal | ✅ Personal |
| **Checklist** | ✅ Create/Edit | ✅ Assigned | ✅ View Only |
| **Crescimento** | ✅ All Clients | ✅ Personal | ✅ Own Project |
| **Diagnóstico** | ✅ All Sites | ❌ None | ✅ Own Site |

---

## 🎯 ROUTING LOGIC

```typescript
// src/app/dashboard/components/MainDashboard.tsx

export default function MainDashboard() {
  const { user } = useCurrentUser()
  const dashboardView = getDashboardView(user.role)
  
  switch (dashboardView) {
    case 'admin':
      return <AdminDashboard userName={userName} />
      // Acesso: 20+ páginas
      
    case 'user':
      return <UserDashboard userName={userName} />
      // Acesso: 15+ páginas (subset do admin)
      
    case 'client':
      return <ClientDashboard userName={userName} />
      // Acesso: 8+ páginas (foco em resultados)
      
    default:
      return <ClientDashboard userName={userName} />
  }
}
```

---

## 📊 RESUMO DE INTEGRAÇÃO SUPABASE

### Funções RPC Principais

| Layer | RPC Function | Status | Descrição |
|-------|--------------|--------|-----------|
| Admin | `get_admin_stats()` | ✅ | Estatísticas globais |
| Admin | `get_conversion_metrics()` | ✅ | Métricas de conversão |
| Admin | `get_monthly_revenue()` | ✅ | Receita mensal |
| User | `get_user_leads()` | ✅ | Leads do usuário |
| User | `get_user_tasks()` | ✅ | Tarefas pessoais |
| Client | `get_client_metrics()` | ✅ | Métricas do projeto |
| Client | `get_client_domain()` | ✅ | Info do domínio |
| Client | `get_client_timeline()` | ✅ | Timeline do projeto |

### Row Level Security (RLS)

```sql
-- Admin: Bypass RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can see everything"
  ON users FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- User: Own data only
CREATE POLICY "Users can see their own data"
  ON leads FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid());

-- Client: Project data only
CREATE POLICY "Clients can see their project data"
  ON client_metrics FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());
```

---

## 🚀 PRÓXIMOS PASSOS

### Curto Prazo (Sprint Atual)
- [ ] Finalizar WhatsApp Business API integration
- [ ] Completar Google Analytics API integration
- [ ] Implementar PDF export para relatórios
- [ ] Adicionar bulk operations em Users

### Médio Prazo (Próximo Mês)
- [ ] Email automation completa
- [ ] AWS S3 integration para Cloud
- [ ] Advanced filtering em todas as listas
- [ ] Mobile responsive para todas as páginas

### Longo Prazo (Q1 2026)
- [ ] Real-time collaboration features
- [ ] Advanced AI insights
- [ ] Multi-language support
- [ ] White-label dashboard option

---

## 📝 NOTAS TÉCNICAS

### Stack Principal
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth + RBAC
- **State**: React Query + Context
- **UI**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts

### Performance
- ✅ Server Components para páginas estáticas
- ✅ Client Components com lazy loading
- ✅ React Query cache com stale-while-revalidate
- ✅ Optimistic updates em mutations
- ✅ Skeleton loaders em todas as páginas

### Segurança
- ✅ RLS habilitado em todas as tabelas
- ✅ JWT validation em todas as rotas
- ✅ CORS configurado corretamente
- ✅ XSS protection
- ✅ CSRF tokens em forms

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- `DASHBOARD_ARCHITECTURE_COMPLETE.md` - Arquitetura técnica detalhada
- `DASHBOARD_TIERS_REVISED.md` - Estratégia de tiers revisada
- `RBAC_DASHBOARD_SYSTEM.md` - Sistema de controle de acesso
- `DASHBOARD_PAGES_AUDIT_STRATEGY.md` - Auditoria e estratégia de páginas
- `BACKEND_SUPABASE_COMPLETE.md` - Integração Supabase completa

---

**Última Atualização**: 9 de outubro de 2025  
**Mantenedor**: Equipe ARCO  
**Status**: ✅ Documentação Completa e Atualizada
