# 🔧 Quick Fix: Enable RLS on Leads Table

## Problema
O PostgREST (Supabase API) não está expondo a tabela `leads` porque ela não tem Row Level Security (RLS) habilitado.

**Erro**: `Could not find the 'name' column of 'leads' in the schema cache`

## Solução

### Opção 1: Via Supabase Dashboard (RECOMENDADO - 2 minutos)

1. **Acesse**: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/editor/sql

2. **Cole o conteúdo do arquivo** `APPLY_LEADS_RLS.sql`

3. **Execute** (botão "Run" ou Ctrl+Enter)

4. **Verifique** as queries de verificação no final do script

5. **Teste** a API novamente:
   ```bash
   curl -X POST http://localhost:3000/api/lead-magnet \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","company":"Test","phone":"11999999999"}'
   ```

### Opção 2: Via Supabase CLI (se auth estiver funcionando)

```bash
npx supabase db push --include-all
```

### Opção 3: Via SQL direto (psql)

```bash
psql "$DATABASE_URL" < APPLY_LEADS_RLS.sql
```

## Verificação

Após aplicar, teste que a tabela está acessível:

```bash
# Via API (service_role)
source .env.local
curl -s "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?limit=1" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
```

**Resposta esperada**: `[]` (array vazio, tabela acessível)

## Por que isso é necessário?

O Supabase usa PostgREST que **só expõe tabelas com RLS habilitado** por segurança. Sem RLS, a API não consegue acessar a tabela, mesmo com credentials válidas.

## Policies Criadas

1. **Service Role Full Access**: API routes com `SUPABASE_SERVICE_ROLE_KEY` têm acesso total
2. **Authenticated Users Read**: Usuários logados podem ver seus leads atribuídos
3. **Anonymous Insert**: Formulários públicos podem criar novos leads

## Próximos Passos

Após aplicar e testar com sucesso:

✅ Lead Magnet API funcionando
✅ Dados salvos no Supabase
✅ Email enviado via Resend
✅ Cache de domínios funcionando

Continue com: `bash scripts/test-tier1-integration.sh`
