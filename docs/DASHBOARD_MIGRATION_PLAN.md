# 🔄 DASHBOARD MIGRATION PLAN - Legacy → MVP V1.0

## 📊 SITUAÇÃO ATUAL: Dashboard Legacy Descoberto

### ❌ ESTRUTURA ANTIGA (Deve ser Descartada/Refatorada)

```
src/app/dashboard/
├── page.tsx                    ❌ Dashboard genérico (sem ARCO context)
├── layout.tsx                  ⚠️ Manter estrutura, refatorar conteúdo
│
├── leads/                      ❌ Sistema de leads antigo
│   ├── page.tsx
│   └── page-enhanced.tsx
│
├── tasks/                      ❌ Gestão de tarefas genérica
│   ├── page.tsx
│   ├── TasksPageProfessional.tsx
│   └── collaborative/page.tsx
│
├── clients/                    ❌ CRUD antigo de clientes
├── campaigns/                  ❌ Dashboard de campanhas antigo
├── analytics/                  ❌ Analytics genérico
├── finance/                    ❌ Financeiro antigo
├── documents/                  ❌ Documentos antigo
├── cloud/                      ❌ Storage antigo
├── calculator/                 ❌ Calculadora genérica
├── appointments/               ❌ Agenda antiga
├── agenda/                     ❌ Agenda antiga (duplicado?)
├── aliquotas/                  ❌ Alíquotas (específico de contabilidade?)
├── commissions/                ❌ Comissões
├── users/                      ❌ Usuários antigo
├── settings/                   ⚠️ Pode ser reaproveitado parcialmente
├── notifications/              ⚠️ Pode ser reaproveitado
├── mail/                       ❌ Email client antigo
├── whatsapp/                   ❌ WhatsApp integration antiga
└── funil/                      ❌ Funil antigo
```

### ✅ NOVA ESTRUTURA MVP V1.0 (ARCO-Focused)

```
src/app/dashboard/
├── (free)/                     🆓 Free User Portal
│   ├── layout.tsx              → Sidebar com tier badge
│   ├── diagnostico/
│   │   ├── page.tsx            → Lista de análises
│   │   └── [id]/
│   │       ├── page.tsx        → Relatório consolidado
│   │       ├── performance/    → Core Web Vitals
│   │       ├── seguranca/      → Vulnerabilities
│   │       └── dominio/        → DNS + SSL
│   │
│   ├── plano-de-acao/
│   │   ├── page.tsx            → Lista de playbooks
│   │   └── simulador/          → Impact simulator
│   │
│   └── planos/
│       └── page.tsx            → Upgrade to paid (Stripe)
│
├── (paid)/                     💎 Paid Client Dashboard
│   ├── layout.tsx              → Sidebar com features avançadas
│   ├── overview/
│   │   └── page.tsx            → ARCO Index + Weekly Focus
│   │
│   ├── saude/
│   │   └── page.tsx            → Tabs: Performance, Segurança, Domínio
│   │
│   ├── crescimento/
│   │   └── page.tsx            → Tabs: Website, Ads
│   │
│   ├── operacoes/
│   │   └── page.tsx            → Tabs: Projetos, Suporte, Arquivos
│   │
│   ├── faturamento/
│   │   └── page.tsx            → Stripe Customer Portal
│   │
│   ├── equipe/
│   │   └── page.tsx            → Team management
│   │
│   └── integracoes/
│       └── page.tsx            → API connections
│
└── (admin)/                    🔧 Admin Panel
    ├── layout.tsx              → Sidebar com admin tools
    ├── overview/
    │   └── page.tsx            → MRR + Churn + Agency metrics
    │
    ├── clientes/
    │   ├── page.tsx            → User list (Refine)
    │   └── [id]/
    │       └── page.tsx        → 360º view + Impersonation
    │
    ├── vendas/
    │   └── page.tsx            → Leads Kanban
    │
    ├── propostas/
    │   └── page.tsx            → AI Proposal Generator
    │
    ├── operacoes/
    │   └── page.tsx            → All projects + tickets
    │
    ├── conteudo/
    │   └── page.tsx            → CMS for playbooks
    │
    └── configuracoes/
        └── page.tsx            → Platform settings
```

---

## 🚧 ESTRATÉGIA DE MIGRAÇÃO

### **Opção 1: Clean Slate (RECOMENDADA)**
✅ **Vantagens:**
- Código limpo e organizado desde o início
- Arquitetura consistente com novo schema
- Sem dívida técnica
- TypeScript types desde o início

❌ **Desvantagens:**
- Precisa reescrever tudo
- Tempo de desenvolvimento maior

**Decisão:** Criar nova estrutura em paralelo, testar, depois substituir.

### **Opção 2: Refatoração Gradual**
✅ **Vantagens:**
- Mantém funcionalidades existentes rodando
- Migração incremental

❌ **Desvantagens:**
- Código inconsistente durante migração
- Duas arquiteturas coexistindo
- Confusão para desenvolvedores

**Decisão:** NÃO RECOMENDADO para este projeto.

---

## 📋 PLANO DE AÇÃO: Clean Slate Migration

### **Fase 1: Backup & Análise** (1 hora)

1. **Criar backup do dashboard antigo**
   ```bash
   mkdir -p src/app/dashboard-legacy
   mv src/app/dashboard/* src/app/dashboard-legacy/
   ```

2. **Auditar componentes reutilizáveis**
   - `DashboardHeader.tsx` → pode ser adaptado
   - `QuickActions.tsx` → pode ser adaptado
   - `LeadModal.tsx` → descartar (novo schema diferente)
   - `OptimizedDashboard.tsx` → descartar

3. **Identificar lógica de negócio**
   - Auth middleware → migrar para novo dashboard
   - Permission checks → adaptar para novo RLS
   - Data fetching → reescrever com Drizzle

---

### **Fase 2: Criar Nova Estrutura** (2 horas)

#### **2.1. Route Groups Setup**
```bash
mkdir -p src/app/dashboard/{(free),(paid),(admin)}
```

#### **2.2. Shared Components**
Criar componentes compartilhados:
- `src/components/dashboard/sidebar.tsx` → Navigation
- `src/components/dashboard/tier-badge.tsx` → Free/Paid/Admin badge
- `src/components/dashboard/user-menu.tsx` → Profile dropdown
- `src/components/dashboard/notification-bell.tsx` → Notifications

#### **2.3. Layouts**
- `(free)/layout.tsx` → Sidebar com links do Free tier
- `(paid)/layout.tsx` → Sidebar com links do Paid tier
- `(admin)/layout.tsx` → Sidebar com links do Admin

---

### **Fase 3: Migrar Funcionalidades Críticas** (3 horas)

#### **3.1. Sistema de Autenticação**
**O que preservar do antigo:**
- Middleware de auth (se estiver bem feito)
- Session management

**O que reescrever:**
- User profile fetching (agora usa `user_profiles`)
- Tier checking (free vs paid vs admin)

#### **3.2. Análises (Leads Antigo → Analysis Requests Novo)**
**Dashboard antigo:**
```typescript
// src/app/dashboard/leads/page.tsx
const leads = await getLeads(); // Tabela antiga
```

**Dashboard novo:**
```typescript
// src/app/dashboard/(free)/diagnostico/page.tsx
const analyses = await getAnalysisRequests(userId);
// Usa tabela analysis_requests
```

**Migration Path:**
1. Criar Server Action `getAnalysisRequests()`
2. Criar componente `AnalysisList` (similar ao antigo LeadsList)
3. Adaptar filtros e ordenação

#### **3.3. Tarefas (Tasks Antigo → Projects Novo)**
**Dashboard antigo:**
```typescript
// src/app/dashboard/tasks/page.tsx
const tasks = await getTasks(); // Tabela antiga
```

**Dashboard novo:**
```typescript
// src/app/dashboard/(paid)/operacoes/page.tsx
const projects = await getProjects(userId);
// Usa tabela projects + project_milestones
```

**Migration Path:**
1. Não migrar tasks antigas
2. Criar sistema novo de Projects desde zero
3. Estrutura diferente (Project → Milestones, não Tasks)

---

### **Fase 4: Implementar Novas Features** (12 horas)

#### **4.1. Free User Portal** (4 horas)
- [ ] `/diagnostico` - Lista de análises
- [ ] `/diagnostico/[id]` - Relatório consolidado
- [ ] `/diagnostico/[id]/performance` - Core Web Vitals
- [ ] `/diagnostico/[id]/seguranca` - Vulnerabilities
- [ ] `/diagnostico/[id]/dominio` - DNS + SSL
- [ ] `/plano-de-acao` - Playbooks list
- [ ] `/plano-de-acao/simulador` - Impact simulator
- [ ] `/planos` - Upgrade page

#### **4.2. Paid Client Dashboard** (5 horas)
- [ ] `/overview` - ARCO Index + Weekly Focus
- [ ] `/saude` - Monitoramento (3 tabs)
- [ ] `/crescimento` - Analytics + Ads (2 tabs)
- [ ] `/operacoes` - Projetos + Suporte + Arquivos (3 tabs)
- [ ] `/faturamento` - Stripe Customer Portal
- [ ] `/equipe` - Team management
- [ ] `/integracoes` - API connections

#### **4.3. Admin Panel** (3 horas)
- [ ] `/admin/overview` - Agency metrics
- [ ] `/admin/clientes` - User list (Refine)
- [ ] `/admin/clientes/[id]` - 360º view
- [ ] `/admin/vendas` - Leads Kanban
- [ ] `/admin/propostas` - AI Generator
- [ ] `/admin/operacoes` - All projects + tickets
- [ ] `/admin/conteudo` - CMS
- [ ] `/admin/configuracoes` - Settings

---

### **Fase 5: Testing & Cleanup** (2 horas)

1. **Testar fluxos completos**
   - Free user: signup → analysis → report → upgrade
   - Paid user: all features accessible
   - Admin: impersonation → manual input → proposal generation

2. **Remover dashboard antigo**
   ```bash
   rm -rf src/app/dashboard-legacy/
   ```

3. **Update navigation**
   - Navbar links apontando para novo dashboard
   - Footer links
   - Assessment form redirect after submit

---

## 🔍 COMPONENTES REUTILIZÁVEIS: Análise Detalhada

### ✅ **Manter e Adaptar**

| Componente Antigo | Novo Uso | Modificações Necessárias |
|-------------------|----------|--------------------------|
| `DashboardHeader.tsx` | Header do novo dashboard | Adaptar para tier system (Free/Paid/Admin) |
| `QuickActions.tsx` | Quick actions no `/overview` | Adaptar ações para ARCO context |
| Notification system | Bell icon no header | Adaptar para novos eventos (analysis complete, uptime down, etc.) |

### ❌ **Descartar Completamente**

| Componente Antigo | Motivo |
|-------------------|--------|
| `LeadModal.tsx` | Schema diferente (leads antigo ≠ analysis_requests novo) |
| `OptimizedDashboard.tsx` | Estrutura genérica, não ARCO-focused |
| `AdminDashboard.tsx` | Admin antigo não tem conceito de impersonation |
| `PasswordChangeForm.tsx` | Pode usar Supabase Auth UI nativo |

---

## 📊 COMPARATIVO: Antigo vs Novo

| Feature | Dashboard Antigo | Dashboard Novo (MVP V1.0) |
|---------|------------------|---------------------------|
| **Foco** | Gestão genérica de agência | Diagnóstico técnico ARCO-focused |
| **Tiers** | Não tem conceito de tiers | Free vs Paid com features distintas |
| **Análises** | Leads genéricos | Lighthouse + ARCO Index |
| **Monitoramento** | Não tem | Performance + Uptime + Security + Domínio |
| **Projetos** | Tasks genéricas | Projects + Milestones |
| **Suporte** | Não tem | Ticket system com chat |
| **Storage** | Upload genérico | Storage com quotas por tier |
| **Admin** | CRUD genérico | Impersonation + AI Proposals + Manual Metrics |
| **Integrações** | Não tem | Conexões com APIs externas |

---

## 🎯 DECISÃO FINAL

### ✅ **CLEAN SLATE MIGRATION**

**Motivos:**
1. **Schema completamente diferente** - Tabelas antigas (leads, tasks, clients) não mapeiam para novas (analysis_requests, projects, user_profiles)
2. **Lógica de negócio diferente** - ARCO Index é único, não é CRM genérico
3. **Tiers system** - Free vs Paid é central na nova arquitetura
4. **Código limpo** - Melhor começar do zero que carregar dívida técnica

**Exceções (Componentes a Preservar):**
- Layout structure (sidebar + header)
- Auth middleware
- Notification system (adaptar events)

---

## 📅 TIMELINE: Migração Completa

| Semana | Fase | Tempo | Status |
|--------|------|-------|--------|
| **Semana 2** | Free User Portal | 4h | ⏳ Pending |
| **Semana 3** | Paid Client Dashboard (Monitoramento) | 5h | ⏳ Pending |
| **Semana 4** | Paid Client Dashboard (Crescimento + Operações) | 5h | ⏳ Pending |
| **Semana 5** | Admin Panel | 3h | ⏳ Pending |
| **Semana 6** | Testing & Cleanup | 2h | ⏳ Pending |
| **TOTAL** | - | **19 horas** | - |

---

## 🚀 PRÓXIMO PASSO IMEDIATO

**Antes de começar migração, completar Semana 1:**
1. ✅ TypeScript types generation
2. ✅ Drizzle schema creation
3. ✅ Stripe integration setup

**Depois, Semana 2:**
1. Criar backup: `mv src/app/dashboard src/app/dashboard-legacy`
2. Criar nova estrutura: `mkdir -p src/app/dashboard/{(free),(paid),(admin)}`
3. Implementar Free User Portal
4. Integrar com Puppeteer + Database

---

**Status:** ✅ Migration Plan Complete  
**Recomendação:** Clean Slate Migration  
**Tempo Estimado:** 19 horas (distribuído em 5 semanas)  
**Risk Level:** 🟢 Low (novo schema é independente do antigo)
