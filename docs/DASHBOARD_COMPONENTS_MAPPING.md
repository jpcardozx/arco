# Mapeamento Completo: Componentes Dashboard por Tipo de Usuário

**Data:** 5 de outubro de 2025  
**Objetivo:** Mapear todos os componentes e identificar quais usam dados reais vs mockados

---

## 🎯 DESCOBERTA IMPORTANTE

Você está **100% CORRETO**! Os componentes especializados já existem em `/src/components/dashboard/` e muitos deles:

1. ✅ **JÁ ESTÃO IMPLEMENTADOS** com interfaces prontas
2. ⚠️ **USAM DADOS MOCKADOS** como fallback
3. 🔄 **ESTÃO PRONTOS** para receber dados reais via props

---

## 📊 INVENTÁRIO COMPLETO DE COMPONENTES

### 🔴 ADMIN DASHBOARD

**Componentes Exclusivos:**
- Nenhum específico (usa componentes gerais)

**Dados Necessários:**
- ✅ AdminStats (implementado em `use-admin.ts`)
- ✅ ConversionMetrics (implementado)
- ✅ MonthlyRevenue (implementado)
- 🟡 System Health (hardcoded)
- 🟡 Audit Log (hook existe mas não usado)

---

### 🔵 USER DASHBOARD (Operadores/Vendedores)

**Componentes Específicos:**
```
src/components/dashboard/
├── TaskModal.tsx              ✅ EXISTE - Modal de criar/editar task
├── stats-grid.tsx            ✅ EXISTE - Grid de métricas genérico
└── [Faltam componentes específicos de user]
```

**Componentes Que Deveriam Existir:**
- ❌ `user-leads-table.tsx` - Tabela de leads do usuário
- ❌ `user-tasks-list.tsx` - Lista de tasks do dia
- ❌ `user-performance-chart.tsx` - Gráfico de performance
- ❌ `user-pipeline-view.tsx` - Visualização do pipeline

**Dados Mockados Atualmente:**
```tsx
// UserDashboard.tsx (linhas 34-129)
const userStats = [...]        // ❌ MOCK
const todayTasks = [...]       // ❌ MOCK  
const recentLeads = [...]      // ❌ MOCK
```

**Componentes Gerais Usados:**
- ✅ `Card`, `Badge`, `Button` (shadcn/ui)
- ✅ Motion (framer-motion)

---

### 🟢 CLIENT DASHBOARD (Clientes Premium)

**Componentes Específicos JÁ IMPLEMENTADOS:**
```
src/components/dashboard/
├── domain-management.tsx          ✅ IMPLEMENTADO (346 linhas)
│   ├── Tab: Overview
│   ├── Tab: DNS Records
│   ├── Tab: Performance
│   └── Tab: Pages Analytics
│
├── client-history-timeline.tsx    ✅ IMPLEMENTADO (282 linhas)
│   ├── Timeline de eventos
│   ├── Ícones por tipo
│   └── Scroll infinito
│
├── data-sharing-consent.tsx       ✅ IMPLEMENTADO
│   ├── LGPD compliance
│   ├── Controle granular
│   └── Toggle switches
│
├── setup-progress.tsx             ✅ IMPLEMENTADO
│   └── Progress bar de onboarding
│
└── client-specific cards/         ✅ IMPLEMENTADOS
    ├── metric-card.tsx
    ├── info-card.tsx
    ├── action-card.tsx
    └── opportunity-card.tsx
```

**Estado Atual:**
- ✅ **UI/UX:** 100% implementada e polida
- ⚠️ **Dados:** Usam props com fallback para mock
- 🔴 **Integração:** Não estão recebendo dados reais

---

## 🔍 ANÁLISE DETALHADA: COMPONENTES CLIENTE

### 1. **DomainManagement** (`domain-management.tsx`)

**Interface de Dados:**
```typescript
interface DomainData {
  domain: string                    // ex: "example.com"
  isVerified: boolean              // ✅ true | ❌ false
  ssl: {
    enabled: boolean
    expiry: string                 // "2025-12-31"
    issuer: string                 // "Let's Encrypt"
  }
  dns: {
    status: 'healthy' | 'warning' | 'error'
    records: {
      type: string                 // A, CNAME, MX, TXT
      name: string
      value: string
      status: 'ok' | 'warning' | 'error'
    }[]
  }
  performance: {
    speed: number       // 0-100 (PageSpeed)
    seo: number         // 0-100
    accessibility: number
    bestPractices: number
  }
  pages: {
    url: string
    title: string
    views: number
    avgTime: string
    bounceRate: number
  }[]
}
```

**Props Aceitas:**
```tsx
<DomainManagement 
  domainData={data}        // ✅ Aceita dados reais
  onRefresh={() => {}}     // ✅ Callback de refresh
  isLoading={false}        // ✅ Loading state
/>
```

**Estado Atual:**
- ✅ Componente totalmente funcional
- ⚠️ Recebe `undefined` como prop (usa mock como fallback)
- 🔴 Precisa receber dados de: `domain_analysis_requests` table

**Dados Reais Necessários:**
```sql
-- Buscar domínio do cliente
SELECT 
  dar.domain,
  dar.ssl_enabled,
  dar.ssl_expiry,
  dar.performance_score,
  dar.seo_score,
  dar.accessibility_score
FROM domain_analysis_requests dar
JOIN users u ON dar.user_id = u.id
WHERE u.id = auth.uid()
AND dar.status = 'analyzed'
ORDER BY dar.created_at DESC
LIMIT 1;

-- DNS Records
SELECT * FROM dns_records 
WHERE domain_id = <domain_id>;

-- Page Analytics
SELECT * FROM page_analytics
WHERE domain_id = <domain_id>
AND date >= CURRENT_DATE - 30
ORDER BY views DESC;
```

---

### 2. **ClientHistoryTimeline** (`client-history-timeline.tsx`)

**Interface de Dados:**
```typescript
interface TimelineEvent {
  id: string
  type: 'message' | 'document' | 'payment' | 'meeting' | 'email' | 'call' | 'milestone'
  title: string
  description: string
  timestamp: string              // ISO format
  metadata?: {
    amount?: number              // Para payments
    status?: 'completed' | 'pending' | 'cancelled'
    participants?: string[]      // Para meetings
  }
}
```

**Props Aceitas:**
```tsx
<ClientHistoryTimeline 
  events={timelineEvents}  // ✅ Aceita array de eventos
  isLoading={false}        // ✅ Loading state
/>
```

**Estado Atual:**
- ✅ Componente totalmente funcional
- ⚠️ Recebe `undefined` (usa 10+ eventos mock como fallback)
- 🔴 Precisa receber dados de: `audit_log` ou nova tabela `client_events`

**Dados Reais Necessários:**
```sql
-- Eventos do cliente
SELECT 
  al.id,
  al.action as type,
  al.table_name || ' ' || al.action as title,
  'User: ' || u.email as description,
  al.created_at as timestamp
FROM audit_log al
JOIN users u ON al.user_id = u.id
WHERE u.client_id = (
  SELECT client_id FROM users WHERE id = auth.uid()
)
ORDER BY al.created_at DESC
LIMIT 50;
```

---

### 3. **DataSharingConsent** (`data-sharing-consent.tsx`)

**Função:**
- LGPD/GDPR compliance
- Permite cliente controlar quais dados compartilhar
- Toggle switches para cada categoria

**Props:**
- Nenhuma (componente standalone)

**Estado Atual:**
- ✅ UI completa e funcional
- ⚠️ Estado local (não persiste no banco)
- 🔴 Precisa: salvar preferências em `user_preferences` table

---

## 📊 COMPARAÇÃO: MOCK vs REAL

### CLIENT DASHBOARD

| Componente | Status UI | Dados Mock | Dados Reais | Integração |
|-----------|-----------|------------|-------------|------------|
| DomainManagement | ✅ 100% | ⚠️ Sim | ❌ Não | 🔴 0% |
| ClientHistoryTimeline | ✅ 100% | ⚠️ Sim | ❌ Não | 🔴 0% |
| DataSharingConsent | ✅ 100% | ⚠️ Estado local | ❌ Não | 🔴 0% |
| Métricas (cards) | ✅ 100% | ❌ Hardcoded | ❌ Não | 🔴 0% |
| Progresso Projeto | ✅ 100% | ❌ Hardcoded | ❌ Não | 🔴 0% |

### USER DASHBOARD

| Componente | Status UI | Dados Mock | Dados Reais | Integração |
|-----------|-----------|------------|-------------|------------|
| Stats Grid | ✅ 100% | ❌ Hardcoded | ❌ Não | 🔴 0% |
| Tasks Lista | ✅ 100% | ❌ Hardcoded | ❌ Não | 🔴 0% |
| Leads Tabela | ✅ 100% | ❌ Hardcoded | ❌ Não | 🔴 0% |
| TaskModal | ✅ 100% | ⚠️ Props | ❌ Não usado | 🟡 50% |

---

## 🎯 CONCLUSÃO CORRETA

Você identificou o ponto crucial:

### ✅ **COMPONENTES JÁ EXISTEM**
- `DomainManagement` → Para CLIENTE
- `ClientHistoryTimeline` → Para CLIENTE
- `DataSharingConsent` → Para CLIENTE
- `TaskModal` → Para USER/ADMIN
- Cards genéricos → Para todos

### ⚠️ **PROBLEMA REAL**
**Não é falta de componentes, é falta de INTEGRAÇÃO DE DADOS!**

Os componentes estão prontos e aceitam dados via props, mas:
1. ClientDashboard não busca dados reais
2. UserDashboard não busca dados reais
3. Ninguém passa props para os componentes
4. Todos usam fallback mock

---

## 🚀 PLANO DE AÇÃO CORRIGIDO

### FASE 1: Criar Hooks de Dados (1h)

**Para USER:**
```typescript
// src/lib/hooks/use-user-stats.ts
export function useUserStats() {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data } = await supabase.rpc('get_user_stats')
      return data
    }
  })
}

// src/lib/hooks/use-user-tasks.ts
export function useUserTasks() {
  return useQuery({
    queryKey: ['user-tasks'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('assigned_to', supabase.auth.getUser().id)
        .order('due_date', { ascending: true })
      return data
    }
  })
}

// src/lib/hooks/use-user-leads.ts
export function useUserLeads() {
  return useQuery({
    queryKey: ['user-leads'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data } = await supabase
        .from('leads')
        .select('*, clients(name)')
        .eq('assigned_to', supabase.auth.getUser().id)
        .order('created_at', { ascending: false })
        .limit(10)
      return data
    }
  })
}
```

**Para CLIENT:**
```typescript
// src/lib/hooks/use-client-domain.ts
export function useClientDomain() {
  return useQuery({
    queryKey: ['client-domain'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data } = await supabase
        .from('domain_analysis_requests')
        .select('*')
        .eq('user_id', supabase.auth.getUser().id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      return transformToDomainData(data)
    }
  })
}

// src/lib/hooks/use-client-timeline.ts
export function useClientTimeline() {
  return useQuery({
    queryKey: ['client-timeline'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data } = await supabase
        .from('audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      return transformToTimelineEvents(data)
    }
  })
}
```

### FASE 2: Integrar nos Dashboards (30min)

**UserDashboard.tsx:**
```tsx
export function UserDashboard() {
  const { data: stats, isLoading: statsLoading } = useUserStats()
  const { data: tasks, isLoading: tasksLoading } = useUserTasks()
  const { data: leads, isLoading: leadsLoading } = useUserLeads()

  if (statsLoading || tasksLoading || leadsLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div>
      {/* Usar stats, tasks, leads reais */}
    </div>
  )
}
```

**ClientDashboard.tsx:**
```tsx
export function ClientDashboard() {
  const { data: domainData } = useClientDomain()
  const { data: timelineEvents } = useClientTimeline()
  const { data: metrics } = useClientMetrics()

  return (
    <Tabs>
      <TabsContent value="domain">
        <DomainManagement 
          domainData={domainData}      // ✅ Dados reais agora!
          onRefresh={refetch}
          isLoading={isLoading}
        />
      </TabsContent>
      
      <TabsContent value="history">
        <ClientHistoryTimeline 
          events={timelineEvents}      // ✅ Dados reais agora!
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  )
}
```

---

## 📋 CHECKLIST ATUALIZADO

### Para USER Dashboard:
- [ ] Criar `use-user-stats.ts`
- [ ] Criar `use-user-tasks.ts`
- [ ] Criar `use-user-leads.ts`
- [ ] Integrar hooks em `UserDashboard.tsx`
- [ ] Remover dados mockados
- [ ] Testar com usuário real

### Para CLIENT Dashboard:
- [ ] Criar `use-client-domain.ts`
- [ ] Criar `use-client-timeline.ts`
- [ ] Criar `use-client-metrics.ts`
- [ ] Passar props para `<DomainManagement />`
- [ ] Passar props para `<ClientHistoryTimeline />`
- [ ] Integrar `<DataSharingConsent />` com backend
- [ ] Testar com cliente real

### SQL Functions:
- [ ] `get_user_stats()`
- [ ] `get_client_domain_data()`
- [ ] `get_client_timeline_events()`

---

## 🎯 INSIGHT CHAVE

**O problema NÃO é falta de componentes.**  
**O problema é que os componentes estão "desconectados" do backend.**

É como ter uma Ferrari pronta, mas sem gasolina no tanque! 🏎️⛽

---

**Tempo estimado para conectar tudo: 1h30min**

Quer começar pela integração do USER ou CLIENT?
