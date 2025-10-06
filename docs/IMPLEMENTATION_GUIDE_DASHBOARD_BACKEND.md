# 📋 INSTRUÇÕES DE IMPLEMENTAÇÃO - Dashboard Backend

## 🎯 RESUMO EXECUTIVO

Criamos **2 migrations SQL** e **6 React Query hooks** para conectar os dashboards ao backend. 

**Status Atual:**
- ✅ 2 migrations SQL criadas
- ✅ 6 hooks React Query criados
- ❌ Migrations precisam ser aplicadas no Supabase
- ❌ Dashboards precisam ser integrados

## 📦 ARQUIVOS CRIADOS

### Migrations SQL (Aplicar no Supabase Dashboard)
```
supabase/migrations/20250105000001_add_user_dashboard_functions.sql
supabase/migrations/20250105000002_add_client_dashboard_functions.sql
```

### Hooks React Query (Já criados e prontos)
```
src/lib/hooks/use-user-stats.ts
src/lib/hooks/use-user-tasks.ts
src/lib/hooks/use-user-leads.ts
src/lib/hooks/use-client-metrics.ts
src/lib/hooks/use-client-domain.ts
src/lib/hooks/use-client-timeline.ts
```

---

## 🚀 PASSO 1: APLICAR MIGRATIONS NO SUPABASE

### Opção A: Via Supabase Dashboard (RECOMENDADO)

1. **Acesse o Supabase Dashboard:**
   - https://supabase.com/dashboard/project/[SEU_PROJECT_ID]/sql/new

2. **Aplique a Migration 1 (User Dashboard):**
   - Copie o conteúdo de: `supabase/migrations/20250105000001_add_user_dashboard_functions.sql`
   - Cole no SQL Editor
   - Execute (Run)
   - Verifique se aparece "Success"

3. **Aplique a Migration 2 (Client Dashboard):**
   - Copie o conteúdo de: `supabase/migrations/20250105000002_add_client_dashboard_functions.sql`
   - Cole no SQL Editor
   - Execute (Run)
   - Verifique se aparece "Success"

### Opção B: Via Supabase CLI (Automático)

```bash
# Push das migrations para o Supabase
supabase db push

# Verificar se as functions foram criadas
supabase db remote list
```

---

## 🔍 PASSO 2: VALIDAR FUNCTIONS NO SUPABASE

Execute este comando SQL no Supabase Dashboard para validar:

```sql
-- Verificar se as 6 novas functions foram criadas
SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
    'get_user_stats',
    'get_user_tasks',
    'get_user_leads',
    'get_client_metrics',
    'get_client_domain',
    'get_client_timeline'
)
ORDER BY routine_name;
```

**Resultado esperado:** 6 linhas com as functions criadas.

---

## ⚙️ PASSO 3: ATUALIZAR DATABASE TYPES (OPCIONAL MAS RECOMENDADO)

Para eliminar os erros TypeScript nos hooks:

```bash
# Gerar types atualizados do Supabase
npx supabase gen types typescript --project-id [SEU_PROJECT_ID] > src/types/database.ts

# Ou se tiver configurado no package.json
npm run supabase:types
```

---

## 🎨 PASSO 4: INTEGRAR HOOKS NOS DASHBOARDS

Vou fazer isso agora via terminal. Os dashboards serão atualizados para consumir dados reais.

---

## 📊 O QUE CADA FUNCTION FAZ

### **User Dashboard (Operadores)**

1. **`get_user_stats()`** - Estatísticas do usuário
   - Retorna: `{ my_leads, new_today, my_tasks, urgent_tasks, appointments_today, conversions_month }`
   - Segurança: Filtra por `auth.uid()`
   - Usa: `leads`, `tasks` tables

2. **`get_user_tasks(p_date)`** - Tasks do dia
   - Retorna: Array de tasks com JOIN em clients
   - Segurança: Filtra por `auth.uid()`
   - Ordenado por: prioridade + data

3. **`get_user_leads(p_limit)`** - Leads recentes
   - Retorna: Array de leads com JOIN em clients
   - Segurança: Filtra por `auth.uid()`
   - Ordenado por: created_at DESC

### **Client Dashboard (Clientes)**

4. **`get_client_metrics()`** - Métricas de conversão
   - Retorna: `{ leads_generated, conversions, conversion_rate, page_views, period }`
   - Segurança: Filtra por `auth.uid()`
   - Período: Últimos 30 dias

5. **`get_client_domain()`** - Análise de domínio
   - Retorna: JSON com SSL, DNS, Performance
   - Segurança: Filtra por `auth.uid()`
   - Fonte: `domain_analysis_requests` table

6. **`get_client_timeline(p_limit)`** - Timeline de eventos
   - Retorna: Array de eventos do audit_log
   - Segurança: Filtra por `auth.uid()`
   - Fonte: `audit_log` table

---

## 🔒 SEGURANÇA

Todas as functions usam:
- ✅ `SECURITY DEFINER` - Execução com privilégios elevados
- ✅ `auth.uid()` - Filtro automático por usuário autenticado
- ✅ `SET search_path = public` - Previne SQL injection
- ✅ `GRANT EXECUTE TO authenticated` - Apenas usuários logados

---

## 📈 PRÓXIMOS PASSOS

1. ✅ Você aplica as migrations no Supabase Dashboard (SQL Editor)
2. ✅ Valida se as 6 functions foram criadas
3. ✅ Eu integro os hooks nos dashboards (UserDashboard.tsx e ClientDashboard.tsx)
4. ✅ Testamos em dev para validar dados reais
5. ✅ Deploy no Vercel

---

## 🐛 TROUBLESHOOTING

### "User not authenticated"
- Verifique se o usuário está logado: `auth.uid()` não deve retornar NULL
- Confirme que o token JWT está válido

### "Function does not exist"
- Execute a query de validação do PASSO 2
- Verifique se as migrations foram aplicadas com sucesso

### "Permission denied"
- Verifique se o GRANT EXECUTE foi aplicado
- Confirme que o usuário tem role `authenticated`

### "No data returned"
- Verifique se existem dados nas tabelas: `leads`, `tasks`, `domain_analysis_requests`
- Execute queries manuais para debug:
  ```sql
  SELECT * FROM leads WHERE assigned_to = auth.uid() LIMIT 5;
  SELECT * FROM tasks WHERE assigned_to = auth.uid() LIMIT 5;
  ```

---

## ✨ EXEMPLO DE USO DOS HOOKS

```typescript
// UserDashboard.tsx
import { useUserStats, useUserTasks, useUserLeads } from '@/lib/hooks'

function UserDashboard() {
  const { data: stats, isLoading: statsLoading } = useUserStats()
  const { data: tasks, isLoading: tasksLoading } = useUserTasks(new Date())
  const { data: leads, isLoading: leadsLoading } = useUserLeads(10)

  if (statsLoading) return <DashboardSkeleton />

  return (
    <div>
      <h1>Minhas Estatísticas</h1>
      <p>Leads: {stats?.my_leads}</p>
      <p>Tasks: {stats?.my_tasks}</p>
      {/* ... */}
    </div>
  )
}
```

---

## 📞 SUPORTE

Se algo não funcionar:
1. Copie o erro exato
2. Execute a query de validação do PASSO 2
3. Me avise e eu ajusto

**Arquitetura Limpa ✓ Segurança ✓ Performance ✓**
