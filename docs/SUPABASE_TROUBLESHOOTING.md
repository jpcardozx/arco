# 🔧 Supabase Troubleshooting Guide

## Problemas Comuns e Soluções

### 1. Docker não está rodando

**Sintoma**: `Error: Cannot connect to Docker daemon`

**Solução**:
```bash
# Verificar se Docker está ativo
docker ps

# Se não estiver, iniciar Docker Desktop manualmente
# Linux:
sudo systemctl start docker

# macOS/Windows:
# Abrir Docker Desktop aplicação
```

**Alternativa**: Usar Supabase Cloud em vez de local:
```bash
# Configurar .env.local com credenciais remotas
NEXT_PUBLIC_SUPABASE_URL=https://vkclegvrqprevcdgosan.supabase.co
```

---

### 2. Porta já em uso

**Sintoma**: `Error: Port 54321 is already in use`

**Solução**:
```bash
# Ver processos usando a porta
lsof -i :54321

# Parar Supabase corretamente
pnpm supabase:stop

# Se não funcionar, matar processo manualmente
kill -9 <PID>

# Reiniciar
pnpm supabase:start
```

**Alternativa**: Mudar porta no `supabase/config.toml`:
```toml
[api]
port = 54321  # Mudar para outra porta, ex: 54421
```

---

### 3. Migration falhou

**Sintoma**: `Error applying migration: syntax error at or near...`

**Diagnóstico**:
```bash
# Ver migrations aplicadas
supabase migration list

# Ver logs detalhados
supabase db dump --data-only
```

**Solução**:
```bash
# Opção 1: Resetar banco local (⚠️ apaga todos os dados)
pnpm supabase:reset

# Opção 2: Reverter migration específica
supabase migration repair <timestamp>

# Opção 3: Editar migration e reaplicar
# 1. Editar arquivo em supabase/migrations/
# 2. pnpm supabase:push
```

**Prevenção**:
```bash
# Sempre validar SQL antes de criar migration
psql -U postgres -d postgres -f supabase/migrations/xxx.sql

# Usar diff automático em vez de criar manual
pnpm supabase:migration
```

---

### 4. Tipos TypeScript desatualizados

**Sintoma**: TypeScript errors sobre propriedades inexistentes

**Solução**:
```bash
# Regenerar tipos após mudanças no schema
pnpm supabase:types

# Verificar se arquivo foi atualizado
cat src/types/supabase.ts | head -n 20
```

**Automação**:
```json
// Adicionar ao package.json
"postmigration": "pnpm supabase:types"
```

---

### 5. RLS Policy bloqueando query

**Sintoma**: Query retorna `[]` vazio, mas dados existem

**Diagnóstico**:
```bash
# 1. Verificar autenticação
const user = await getCurrentUser()
console.log('User:', user)  # Deve ter user.id

# 2. Testar query sem RLS (como admin)
const { data } = await createSupabaseAdminClient()
  .from('clients')
  .select('*')
console.log('Admin query:', data)  # Deve retornar dados
```

**Solução**:
```sql
-- Verificar policies no Studio (http://localhost:54323)
-- Authentication → Policies → clients

-- Adicionar policy faltando
CREATE POLICY "user_select_clients"
ON public.clients
FOR SELECT
USING (user_id = auth.uid());

-- Aplicar
pnpm supabase:push
```

**Debug Policy**:
```sql
-- Testar policy manualmente
SET SESSION AUTHORIZATION 'authenticated';
SET request.jwt.claim.sub TO 'user-uuid-here';
SELECT * FROM clients;
```

---

### 6. Auth session expirou

**Sintoma**: `Error: JWT expired` ou redirecionamento inesperado para login

**Solução**:
```typescript
// Implementar auto-refresh
import { refreshSession } from '@/lib/supabase/auth'

useEffect(() => {
  const interval = setInterval(async () => {
    await refreshSession()
  }, 55 * 60 * 1000) // Refresh cada 55min (token expira em 60min)
  
  return () => clearInterval(interval)
}, [])
```

**Alternativa**: Configurar tempo maior no Supabase Dashboard:
```
Auth → Settings → JWT Expiry → 3600 (1 hora) → 7200 (2 horas)
```

---

### 7. Query muito lenta

**Sintoma**: Queries demorando >2 segundos

**Diagnóstico**:
```sql
-- Ver query plan
EXPLAIN ANALYZE SELECT * FROM clients WHERE status = 'active';

-- Verificar indexes existentes
SELECT * FROM pg_indexes WHERE tablename = 'clients';
```

**Solução**:
```sql
-- Adicionar index em coluna frequentemente filtrada
CREATE INDEX idx_clients_status ON clients(status);

-- Para queries com múltiplos filtros
CREATE INDEX idx_clients_status_priority ON clients(status, priority);

-- Aplicar
pnpm supabase:migration add_indexes
-- Editar migration, adicionar SQL acima
pnpm supabase:push
```

**Otimizações**:
```typescript
// Usar select específico em vez de '*'
const { data } = await supabase
  .from('clients')
  .select('id, name, email, status')  // ✅ Só campos necessários
  // .select('*')  // ❌ Busca tudo

// Implementar paginação
const { data } = await supabase
  .from('clients')
  .select('*')
  .range(0, 9)  // Primeiros 10 registros

// Usar React Query cache
const { data } = useClients()  // ✅ Cached por 5 segundos
```

---

### 8. File upload falhou

**Sintoma**: `Error: Storage bucket not found` ou `403 Forbidden`

**Diagnóstico**:
```bash
# Verificar buckets no Studio
# Storage → Buckets → Ver lista

# Testar upload manual no Studio
# Storage → avatars → Upload File
```

**Solução**:
```sql
-- Criar bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Criar policy de upload
CREATE POLICY "Users can upload own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Aplicar
pnpm supabase:push
```

**Upload helper**:
```typescript
async function uploadAvatar(file: File, userId: string) {
  const supabase = createSupabaseBrowserClient()
  const filePath = `${userId}/avatar.png`
  
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })
  
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)
  
  return publicUrl
}
```

---

### 9. Real-time subscription não funciona

**Sintoma**: `onAuthStateChange` não dispara ou subscription não recebe updates

**Diagnóstico**:
```typescript
// Testar conexão Realtime
const supabase = createSupabaseBrowserClient()
const channel = supabase
  .channel('test')
  .on('presence', { event: 'sync' }, () => {
    console.log('Realtime connected!')
  })
  .subscribe()

// Ver logs de conexão
console.log('Channel status:', channel.state)
```

**Solução**:
```typescript
// Implementar retry logic
const subscription = supabase
  .channel('clients-changes')
  .on(
    'postgres_changes',
    { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'clients' 
    },
    (payload) => {
      console.log('New client:', payload.new)
      // Invalidate cache
      queryClient.invalidateQueries(['clients'])
    }
  )
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('✅ Subscription active')
    } else if (status === 'CHANNEL_ERROR') {
      console.error('❌ Subscription failed, retrying...')
      setTimeout(() => subscription.subscribe(), 3000)
    }
  })

// Cleanup
return () => {
  supabase.removeChannel(subscription)
}
```

**Verificar permissões**:
```sql
-- Habilitar Realtime na tabela
ALTER PUBLICATION supabase_realtime ADD TABLE clients;
```

---

### 10. Build falhou em produção

**Sintoma**: `Error: Cannot find module '@supabase/supabase-js'` em build Vercel

**Diagnóstico**:
```bash
# Verificar instalação local
pnpm list @supabase/supabase-js

# Ver logs detalhados do Vercel
vercel logs <deployment-url>
```

**Solução**:
```bash
# 1. Garantir que está em dependencies (não devDependencies)
pnpm add @supabase/supabase-js @supabase/ssr

# 2. Verificar package.json
cat package.json | grep supabase

# 3. Limpar cache e rebuildar
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build

# 4. Se funcionar local, fazer commit e push
git add package.json pnpm-lock.yaml
git commit -m "fix: ensure supabase deps in production"
git push
```

**Variáveis de ambiente**:
```bash
# Verificar no Vercel Dashboard
# Settings → Environment Variables

# Deve ter:
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Redeploy após adicionar
vercel --prod
```

---

## 🔍 Debug Tools

### 1. Supabase Studio (Local)

```bash
# Acessar Studio
open http://localhost:54323

# Features:
- Table Editor: Ver/editar dados manualmente
- SQL Editor: Executar queries SQL
- Authentication: Ver usuários registrados
- Storage: Gerenciar arquivos
- Logs: Ver logs de queries e erros
```

### 2. Debug Panel (Aplicação)

```typescript
// Pressionar Ctrl+Shift+D no dashboard

// Mostra:
- Connection status
- Current user
- Query log (últimas 50 queries)
- Cache statistics
- Storage info
```

### 3. React Query DevTools

```typescript
// Já integrado em QueryProvider
// Acessível no canto inferior direito em dev mode

// Mostra:
- Queries ativas
- Cache state
- Mutation status
- Refetch controls
```

### 4. PostgreSQL Logs

```bash
# Ver logs do Postgres container
docker logs supabase_db_arco

# Logs em tempo real
docker logs -f supabase_db_arco

# Filtrar por erro
docker logs supabase_db_arco 2>&1 | grep ERROR
```

### 5. Network Inspector

```typescript
// Chrome DevTools → Network → Filter by 'supabase'

// Analisar:
- Request headers (Authorization token)
- Response status (200, 401, 403)
- Response body (data ou error)
- Request timing (TTFB, download time)
```

---

## 📊 Performance Monitoring

### Query Performance

```typescript
// Medir tempo de query
console.time('clients-query')
const { data } = await supabase.from('clients').select('*')
console.timeEnd('clients-query')

// Usar React Query devtools para ver:
- Fetch duration
- Cache hit rate
- Stale time remaining
```

### Database Metrics

```sql
-- Ver queries mais lentas
SELECT 
  query,
  mean_exec_time,
  calls,
  total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Ver tamanho das tabelas
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Connection Pool

```bash
# Ver conexões ativas
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';

# Ver conexões por database
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;
```

---

## 🆘 Quando Pedir Ajuda

### Informações para incluir no issue/ticket:

1. **Versão do CLI**: `pnpm supabase --version`
2. **Status dos serviços**: `pnpm supabase:status`
3. **Logs relevantes**: `docker logs supabase_db_arco | tail -n 50`
4. **Migration atual**: `supabase migration list`
5. **Schema da tabela**: `\d+ clients` (no psql)
6. **Código que falhou**: Snippet do código + erro exato
7. **Tentativas anteriores**: O que já foi tentado

### Links úteis:

- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)
- [Supabase Docs](https://supabase.com/docs)

---

## 🔄 Recovery Procedures

### Resetar ambiente local completo

```bash
# 1. Parar Supabase
pnpm supabase:stop

# 2. Remover containers e volumes
docker rm -f $(docker ps -aq --filter "name=supabase")
docker volume prune -f

# 3. Limpar diretório Supabase
rm -rf supabase/.temp

# 4. Reinicializar
pnpm db:setup
```

### Backup/Restore

```bash
# Backup local
pnpm supabase db dump -f backup.sql

# Restore local
pnpm supabase db reset
psql -U postgres -d postgres -f backup.sql

# Backup produção
supabase db dump --db-url $DATABASE_URL -f prod-backup.sql

# Restore produção (⚠️ CUIDADO)
supabase db push --db-url $DATABASE_URL --include-seed
```

---

**Última atualização**: 2025-01-04  
**Mantido por**: ARCO Team
