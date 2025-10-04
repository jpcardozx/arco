# 🛠️ SUPABASE CLI - GUIA COMPLETO

**Data:** 4 de outubro de 2025  
**Versão CLI:** 2.48.3  
**Status:** ✅ INSTALADO E RODANDO

---

## 📊 STATUS ATUAL

### Ambiente Local Ativo ✅

```
API URL:         http://127.0.0.1:54321
Database URL:    postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL:      http://127.0.0.1:54323
GraphQL URL:     http://127.0.0.1:54321/graphql/v1
```

---

## 🚀 COMANDOS ESSENCIAIS

### 1. Status & Info

```bash
# Ver status dos serviços
npx supabase status

# Ver logs em tempo real
npx supabase logs

# Logs de um serviço específico
npx supabase logs -f api
npx supabase logs -f db
npx supabase logs -f auth
```

### 2. Database Management

```bash
# Aplicar migrations pendentes
npx supabase db push

# Criar nova migration
npx supabase migration new nome_da_migration

# Listar migrations aplicadas
npx supabase migration list

# Reset database (cuidado! apaga tudo)
npx supabase db reset

# Dump do schema atual
npx supabase db dump -f supabase/schema.sql

# Diff entre local e remoto
npx supabase db diff
```

### 3. Migrations

```bash
# Criar migration
npx supabase migration new add_feature

# Ver migrations pendentes
npx supabase migration list

# Aplicar migrations
npx supabase db push

# Squash migrations (combinar várias em uma)
npx supabase migration repair
```

### 4. Types Generation

```bash
# Gerar types TypeScript
npx supabase gen types typescript --local > src/types/supabase.ts

# Gerar types a partir do remoto
npx supabase gen types typescript --project-id seu-project-id > src/types/supabase.ts
```

### 5. Functions (Edge Functions)

```bash
# Criar nova function
npx supabase functions new function-name

# Servir function localmente
npx supabase functions serve function-name

# Deploy function
npx supabase functions deploy function-name
```

### 6. Start/Stop Services

```bash
# Iniciar Supabase local
npx supabase start

# Parar Supabase local
npx supabase stop

# Restart
npx supabase stop && npx supabase start
```

### 7. Link com Projeto Remoto

```bash
# Linkar com projeto no Supabase Cloud
npx supabase link --project-ref your-project-ref

# Fazer pull das migrations do remoto
npx supabase db pull

# Push para o remoto
npx supabase db push --linked
```

---

## 🎯 WORKFLOWS COMUNS

### Workflow 1: Criar Nova Feature com Migration

```bash
# 1. Criar migration
npx supabase migration new add_payments_table

# 2. Editar o arquivo SQL criado
# supabase/migrations/[timestamp]_add_payments_table.sql

# 3. Aplicar localmente
npx supabase db push

# 4. Testar no Studio
# Abrir: http://127.0.0.1:54323

# 5. Gerar types atualizados
npx supabase gen types typescript --local > src/types/supabase.ts

# 6. Commit
git add supabase/migrations/
git commit -m "feat: add payments table"
```

### Workflow 2: Aplicar Migrations do Projeto

```bash
# 1. Ver migrations pendentes
npx supabase migration list

# 2. Aplicar todas
npx supabase db push

# 3. Verificar no Studio
# http://127.0.0.1:54323

# 4. Ver logs se algo deu errado
npx supabase logs -f db
```

### Workflow 3: Debug de RLS

```bash
# 1. Abrir Studio
# http://127.0.0.1:54323

# 2. SQL Editor > Testar policies
SELECT * FROM clients; -- Como authenticated user

# 3. Ver policies aplicadas
SELECT * FROM pg_policies WHERE tablename = 'clients';

# 4. Testar como admin
SELECT set_config('request.jwt.claims', '{"role":"admin"}', true);
SELECT * FROM clients;
```

### Workflow 4: Reset & Re-apply

```bash
# 1. Reset completo (apaga tudo)
npx supabase db reset

# 2. Migrations são aplicadas automaticamente
# Aguardar...

# 3. Verificar
npx supabase status

# 4. Ver no Studio
# http://127.0.0.1:54323
```

---

## 🔧 TROUBLESHOOTING

### Migration Falha

```bash
# Ver erro detalhado
npx supabase logs -f db

# Marcar migration como revertida
npx supabase migration repair --status reverted

# Tentar novamente
npx supabase db push
```

### Tipos Desatualizados

```bash
# Regenerar types
npx supabase gen types typescript --local > src/types/supabase.ts

# Restart TypeScript server no VSCode
Ctrl+Shift+P > TypeScript: Restart TS Server
```

### Serviços não iniciam

```bash
# Parar tudo
npx supabase stop

# Limpar containers Docker
docker ps -a | grep supabase | awk '{print $1}' | xargs docker rm -f

# Iniciar novamente
npx supabase start
```

### Port já em uso

```bash
# Ver o que está usando a porta
lsof -i :54321

# Mudar porta no config.toml
# [api]
# port = 54325

# Restart
npx supabase stop && npx supabase start
```

---

## 📋 CHECKLIST DE VALIDAÇÃO

### Antes de Aplicar Migrations

- [ ] Backup do banco (se produção)
- [ ] Testar localmente primeiro
- [ ] Ver diff: `npx supabase db diff`
- [ ] Revisar SQL das migrations
- [ ] Verificar dependencies entre migrations

### Depois de Aplicar Migrations

- [ ] Verificar status: `npx supabase status`
- [ ] Testar no Studio: http://127.0.0.1:54323
- [ ] Gerar types: `npx supabase gen types typescript --local`
- [ ] Testar queries no código
- [ ] Verificar RLS: tentar CRUD como user/admin
- [ ] Ver audit log se implementado

---

## 🎯 PARA APLICAR AS MIGRATIONS CRIADAS

### Opção 1: Script Automático (Recomendado)

```bash
./scripts/apply-backend-migrations.sh
```

### Opção 2: Manual

```bash
# 1. Ver migrations pendentes
npx supabase migration list

# Deve mostrar:
# ✗ 20250104000004_add_admin_policies
# ✗ 20250104000005_add_users_and_functions
# ✗ 20250104000006_add_audit_log

# 2. Aplicar
npx supabase db push

# 3. Verificar
npx supabase migration list

# Deve mostrar:
# ✓ 20250104000004_add_admin_policies
# ✓ 20250104000005_add_users_and_functions
# ✓ 20250104000006_add_audit_log

# 4. Abrir Studio para verificar
open http://127.0.0.1:54323

# Ou no Linux:
xdg-open http://127.0.0.1:54323
```

### Opção 3: Via Studio SQL Editor

```bash
# 1. Abrir Studio
open http://127.0.0.1:54323

# 2. Ir em SQL Editor

# 3. Copiar e colar cada migration e executar
# - 20250104000004_add_admin_policies.sql
# - 20250104000005_add_users_and_functions.sql
# - 20250104000006_add_audit_log.sql
```

---

## 🧪 TESTES PÓS-MIGRATION

### 1. Verificar Tabelas Criadas

```sql
-- No Studio SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Deve incluir:
-- ✓ clients
-- ✓ tasks
-- ✓ leads
-- ✓ users      (NOVO)
-- ✓ audit_log  (NOVO)
```

### 2. Verificar Funções RPC

```sql
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public';

-- Deve incluir:
-- ✓ get_admin_stats
-- ✓ get_conversion_metrics
-- ✓ get_monthly_revenue
-- ✓ get_recent_activity
-- ✓ get_audit_log
-- ✓ get_record_history
-- ✓ cleanup_old_audit_logs
```

### 3. Testar RLS

```sql
-- Como user normal
SET request.jwt.claims = '{"sub": "user-id", "role": "user"}';
SELECT * FROM clients; -- Vê só seus dados

-- Como admin
SET request.jwt.claims = '{"sub": "admin-id", "role": "admin"}';
SELECT * FROM clients; -- Vê TODOS os dados
```

### 4. Testar Funções

```sql
-- Stats gerais
SELECT * FROM get_admin_stats();

-- Conversão
SELECT * FROM get_conversion_metrics();

-- Revenue
SELECT get_monthly_revenue();
```

### 5. Testar Audit Log

```sql
-- Inserir teste
INSERT INTO clients (name, email, created_by)
VALUES ('Teste Audit', 'teste@test.com', auth.uid());

-- Ver se registrou
SELECT * FROM audit_log 
ORDER BY created_at DESC 
LIMIT 1;

-- Deve mostrar INSERT em clients
```

---

## 📊 COMANDOS ÚTEIS DO DIA-A-DIA

```bash
# Quick status
npx supabase status

# Quick logs
npx supabase logs -f api

# Quick reset (desenvolvimento)
npx supabase db reset

# Quick types generation
npx supabase gen types typescript --local > src/types/supabase.ts

# Quick migration
npx supabase migration new feature_name
npx supabase db push

# Quick backup (snapshot)
npx supabase db dump -f backup-$(date +%Y%m%d).sql
```

---

## 🎓 DICAS PROFISSIONAIS

### 1. Sempre testar localmente primeiro

```bash
# NUNCA faça direto em produção
npx supabase db push --linked  # ❌ Perigoso

# Sempre teste local primeiro
npx supabase db push            # ✅ Local
# Testar tudo...
# Só depois push para produção
```

### 2. Use migrations descritivas

```bash
# ❌ Ruim
npx supabase migration new update

# ✅ Bom
npx supabase migration new add_payment_processing_with_stripe
```

### 3. Documente suas migrations

```sql
-- Migration: Add Payment Processing
-- Description: Integra Stripe para processar pagamentos
-- Author: João
-- Date: 2025-10-04
-- Dependencies: clients table

CREATE TABLE payments (...);
```

### 4. Backup antes de mudanças grandes

```bash
# Backup local
npx supabase db dump -f backup-before-migration.sql

# Se algo der errado, restore
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres < backup-before-migration.sql
```

### 5. Use branching de migrations

```bash
# Feature branch
git checkout -b feat/add-payments

# Criar migration
npx supabase migration new add_payments

# Testar
npx supabase db push

# Merge para main só quando testado
git checkout main
git merge feat/add-payments
```

---

## 🚀 EXECUTAR AGORA

```bash
# 1. Verificar que está tudo rodando
npx supabase status

# 2. Aplicar as 3 migrations críticas
./scripts/apply-backend-migrations.sh

# OU manualmente:
npx supabase db push

# 3. Abrir Studio para verificar
xdg-open http://127.0.0.1:54323

# 4. Gerar types atualizados
npx supabase gen types typescript --local > src/types/supabase.ts

# 5. Testar no frontend
pnpm dev
```

---

## 📚 RECURSOS

- **Docs Oficiais:** https://supabase.com/docs/guides/cli
- **Studio Local:** http://127.0.0.1:54323
- **API Docs:** http://127.0.0.1:54321/docs
- **GitHub:** https://github.com/supabase/cli

---

**Status:** ✅ CLI INSTALADO E PRONTO PARA USO  
**Próximo passo:** Executar `./scripts/apply-backend-migrations.sh`
