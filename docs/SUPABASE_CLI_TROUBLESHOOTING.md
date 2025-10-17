# 🚨 SUPABASE CLI TRAVANDO - SOLUÇÃO MANUAL

## Problema
O comando `supabase db push` está travando/timeout ao tentar aplicar migrations.

## Solução: Aplicar SQL Manualmente no Dashboard

### Passo 1: Abrir SQL Editor
1. Acesse: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/sql
2. Clique em "New Query"

### Passo 2: Aplicar Migration de Soft Deletes
Copie e cole o conteúdo do arquivo:
```
/home/jpcardozx/projetos/arco/supabase/migrations/20251010130001_add_soft_deletes_MANUAL.sql
```

Clique em **RUN** ou pressione `Ctrl+Enter`

### Passo 3: Verificar Sucesso
Execute esta query para confirmar:
```sql
SELECT 
  table_name,
  column_name
FROM information_schema.columns
WHERE column_name IN ('deleted_at', 'deleted_by')
AND table_schema = 'public'
ORDER BY table_name;
```

Você deve ver as colunas `deleted_at` e `deleted_by` nas tabelas:
- leads
- clients
- quiz_results
- projects
- campaigns

### Passo 4: Testar Soft Delete
```sql
-- Teste rápido
SELECT soft_delete('leads', 'algum-uuid-aqui', auth.uid());

-- Ver itens ativos
SELECT COUNT(*) FROM active_leads;
```

## Status das Migrations

✅ **20251010130000_connect_quiz_to_crm.sql** - APLICADA COM SUCESSO
- Quiz agora cria leads automaticamente
- Trigger `quiz_to_lead_trigger` ativo
- Views `quiz_leads_detailed` e `quiz_conversion_funnel` criadas

⏳ **20251010130001_add_soft_deletes.sql** - PENDENTE (aplicar manualmente)
- Soft deletes em 5 tabelas principais
- Views de itens ativos
- Function `soft_delete()` para marcar como deletado

## Próximos Passos Após Aplicar

1. **Testar Quiz → Lead Flow**
   ```bash
   # Acesse o quiz
   http://localhost:3000/quiz
   
   # Complete o quiz e verifique se criou lead
   # No SQL Editor:
   SELECT * FROM quiz_leads_detailed ORDER BY quiz_completed_at DESC LIMIT 5;
   ```

2. **Verificar Funil de Conversão**
   ```sql
   SELECT * FROM quiz_conversion_funnel;
   ```

3. **Testar Soft Delete**
   ```sql
   -- Soft delete
   SELECT soft_delete('leads', (SELECT id FROM leads LIMIT 1), auth.uid());
   
   -- Ver apenas ativos
   SELECT COUNT(*) FROM active_leads;
   ```

## Alternativa: Usar psql Direto (se CLI continuar travando)

```bash
# Criar arquivo .pgpass para não precisar digitar senha toda vez
echo "db.vkclegvrqprevcdgosan.supabase.co:5432:postgres:postgres:Arco@1961@arco" > ~/.pgpass
chmod 600 ~/.pgpass

# Aplicar migration
psql -h db.vkclegvrqprevcdgosan.supabase.co -p 5432 -U postgres -d postgres -f supabase/migrations/20251010130001_add_soft_deletes_MANUAL.sql
```

## Por Que o CLI Está Travando?

Possíveis causas:
1. **Timeout de rede** - Conexão lenta com AWS São Paulo
2. **Lock no banco** - Alguma transação não finalizada
3. **Bug do CLI** - Versão desatualizada do Supabase CLI

**Recomendação**: Use o SQL Editor do dashboard para migrations críticas.
