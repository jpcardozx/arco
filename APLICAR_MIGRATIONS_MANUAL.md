# 🎯 GUIA RÁPIDO: Aplicar Migrations no Supabase Dashboard

## ⚠️ PROBLEMA: Supabase CLI não está linkado

Você não precisa usar o CLI! Vamos aplicar diretamente no Dashboard.

---

## ✅ SOLUÇÃO SIMPLES: Copiar e Colar no SQL Editor

### 1️⃣ Acesse o Supabase SQL Editor

**URL:** https://supabase.com/dashboard/project/[SEU_PROJECT_ID]/sql/new

Substitua `[SEU_PROJECT_ID]` pelo ID do seu projeto Supabase.

---

### 2️⃣ Verifique o que já existe

Cole e execute esta query PRIMEIRO:

```sql
-- Ver todas as tabelas que existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Resultado esperado:** Lista de tabelas (clients, tasks, leads, etc)

---

### 3️⃣ Verifique se `leads` existe

```sql
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'leads'
) as leads_existe;
```

**Se retornar `true`:** A tabela leads existe, pode aplicar a migration
**Se retornar `false`:** Precisa aplicar migrations anteriores primeiro

---

### 4️⃣ CENÁRIO A: Se `leads` NÃO existe

Aplique estas migrations EM ORDEM (copie o conteúdo de cada arquivo e execute):

1. `supabase/migrations/20250104000000_initial_schema.sql`
2. `supabase/migrations/20250104000001_add_client_extended_fields.sql`
3. `supabase/migrations/20250104000002_add_task_extended_fields.sql`
4. `supabase/migrations/20250104000003_add_lead_extended_fields.sql`
5. `supabase/migrations/20250104000004_add_admin_policies.sql`
6. `supabase/migrations/20250104000005_add_users_and_functions.sql`
7. `supabase/migrations/20250104000006_add_audit_log.sql`
8. `supabase/migrations/20250104000007_add_domain_analysis_requests.sql`
9. `supabase/migrations/20250105000001_add_user_dashboard_functions.sql`
10. `supabase/migrations/20250105000002_add_client_dashboard_functions.sql`

---

### 5️⃣ CENÁRIO B: Se `leads` JÁ existe

Aplique apenas as migrations que faltam (provavelmente só estas 3):

1. `supabase/migrations/20250104000007_add_domain_analysis_requests.sql`
2. `supabase/migrations/20250105000001_add_user_dashboard_functions.sql`
3. `supabase/migrations/20250105000002_add_client_dashboard_functions.sql`

---

### 6️⃣ Como aplicar cada migration

Para cada arquivo:

1. Abra o arquivo no VS Code
2. Selecione TODO o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)
4. Cole no Supabase SQL Editor
5. Clique em **"Run"** (ou Ctrl+Enter)
6. Aguarde mensagem de sucesso: ✅ "Success. No rows returned"
7. Repita para a próxima migration

---

### 7️⃣ Validar após aplicar TODAS

Execute esta query para confirmar:

```sql
-- 1. Verificar tabela domain_analysis_requests criada
SELECT COUNT(*) FROM public.domain_analysis_requests;

-- 2. Verificar 6 functions criadas
SELECT routine_name 
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

-- 3. Testar uma function
SELECT * FROM get_user_stats();
```

**Resultado esperado:**
- Query 1: `0` (tabela vazia mas existe)
- Query 2: 6 linhas com os nomes das functions
- Query 3: JSON com estatísticas ou erro de "User not authenticated" (normal se não estiver logado)

---

## 🐛 ERROS COMUNS

### Erro: "relation public.leads does not exist"
**Causa:** Você pulou migrations anteriores  
**Solução:** Aplique o CENÁRIO A completo

### Erro: "function public.handle_updated_at() does not exist"
**Causa:** Migration inicial não foi aplicada  
**Solução:** Aplique `20250104000000_initial_schema.sql` primeiro

### Erro: "policy already exists"
**Causa:** Migration já foi aplicada antes  
**Solução:** Ignore ou pule para próxima migration

---

## ⏱️ TEMPO ESTIMADO

- CENÁRIO A (tudo do zero): ~10 minutos
- CENÁRIO B (só faltantes): ~2 minutos

---

## 🎉 QUANDO TERMINAR

Me avise: **"migrations aplicadas com sucesso"**

Aí eu integro os hooks nos dashboards! 🚀

---

## 💡 POR QUE NÃO USAR LOCAL?

Você perguntou: "pq não usamos local vinculado ao remoto?"

**Resposta:** Poderia, mas requer setup adicional:
1. `npx supabase login` (login na conta Supabase)
2. `npx supabase link --project-ref SEU_PROJECT_ID` (linkar projeto)
3. `npx supabase db push` (aplicar migrations)

**Copiar/colar no Dashboard é mais rápido para 3 migrations!** ✅

Mas se você preferir o CLI, eu te ajudo a configurar.
