# 🚀 QUICK START - Dashboard Backend

## ⚡ APLICAR MIGRATIONS (ESCOLHA 1 OPÇÃO)

### Opção 1: Script Automático ⭐ RECOMENDADO
```bash
bash scripts/apply-dashboard-migrations.sh
```

### Opção 2: Supabase CLI Manual
```bash
supabase db push
```

### Opção 3: Supabase Dashboard (Manual - Se necessário)
1. Abra: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new
2. Copie e execute EM ORDEM:
   - `supabase/migrations/20250104000007_add_domain_analysis_requests.sql`
   - `supabase/migrations/20250105000001_add_user_dashboard_functions.sql`
   - `supabase/migrations/20250105000002_add_client_dashboard_functions.sql`

---

## ✅ VALIDAR (Após aplicar)

Execute no Supabase SQL Editor:

```sql
-- Verificar se 6 functions foram criadas
SELECT routine_name FROM information_schema.routines 
WHERE routine_name IN (
  'get_user_stats', 'get_user_tasks', 'get_user_leads',
  'get_client_metrics', 'get_client_domain', 'get_client_timeline'
);
```

**Resultado esperado:** 6 linhas

---

## 🔄 REGENERAR TYPES (Opcional mas recomendado)

```bash
# Se tiver script configurado
npm run supabase:types

# Ou manual
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

---

## 📦 O QUE FOI CRIADO

- ✅ 6 SQL Functions (3 user + 3 client)
- ✅ 6 React Query Hooks
- ✅ Scripts de deploy automatizados
- ✅ Documentação completa

---

## 🎯 PRÓXIMOS PASSOS

Depois que você aplicar as migrations:
1. Me avise: "migrations aplicadas"
2. Eu integro os hooks nos dashboards
3. Testamos juntos
4. Deploy 🚀

---

## 📖 DOCUMENTAÇÃO DETALHADA

- **Guia Completo:** `docs/IMPLEMENTATION_GUIDE_DASHBOARD_BACKEND.md`
- **Resumo:** `docs/DASHBOARD_BACKEND_COMPLETE_SUMMARY.md`

---

## 🆘 PROBLEMAS?

- **Script não funciona?** Use Supabase Dashboard (Opção 2)
- **Erro de permissão?** Verifique se está logado no Supabase CLI
- **Functions não aparecem?** Aguarde 10 segundos e tente validar novamente

---

**Tudo pronto! Aguardando você aplicar as migrations** 🎉
