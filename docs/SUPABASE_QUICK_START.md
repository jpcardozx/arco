# 🚀 Guia de Início Rápido - Backend Supabase

## Pré-requisitos

- Docker Desktop instalado e rodando
- Node.js 18+ e pnpm 9+
- Arquivo `.env.local` configurado com credenciais Supabase

## Setup Inicial (Primeira Vez)

### Opção 1: Setup Automático (Recomendado)

```bash
# Configura tudo de uma vez: inicia Supabase, aplica migrations, gera tipos e popula dados
pnpm db:setup
```

Este comando executa automaticamente:
1. ✅ Inicia local Supabase stack (Docker)
2. ✅ Aplica migration inicial (cria tabelas clients, tasks, leads)
3. ✅ Gera tipos TypeScript do schema
4. ✅ Popula banco com dados de desenvolvimento

### Opção 2: Setup Manual (Passo a Passo)

```bash
# 1. Iniciar Supabase local
pnpm supabase:start

# 2. Aplicar migration
pnpm supabase:push

# 3. Gerar tipos TypeScript
pnpm supabase:types

# 4. Popular dados de teste
pnpm db:seed
```

## Verificação

Após o setup, acesse:

- **Supabase Studio**: http://localhost:54323
- **API Local**: http://localhost:54321
- **Database**: `postgresql://postgres:postgres@localhost:54322/postgres`

### Credenciais de Teste

```
Email: dev@arco.com
Password: arco123456
```

## Comandos Diários

```bash
# Iniciar ambiente local
pnpm supabase:start

# Ver status dos serviços
pnpm supabase:status

# Parar ambiente
pnpm supabase:stop

# Resetar banco (⚠️ apaga todos os dados)
pnpm supabase:reset
```

## Workflow de Desenvolvimento

### 1. Criar Nova Migration

```bash
# Criar arquivo de migration vazio
pnpm supabase:migration new_migration_name

# Exemplo: adicionar coluna
pnpm supabase:migration add_avatar_to_clients
```

Edite o arquivo criado em `supabase/migrations/` e aplique:

```bash
pnpm supabase:push
pnpm supabase:types  # Regenera tipos
```

### 2. Usar Hooks no Componente

```tsx
import { useClients, useCreateClient } from '@/lib/hooks/use-database'

export function ClientsPage() {
  const { data: clients, isLoading } = useClients()
  const createClient = useCreateClient()

  const handleCreate = () => {
    createClient.mutate({
      name: 'João Silva',
      email: 'joao@example.com',
      company: 'Empresa A',
      status: 'active',
      priority: 'high',
    })
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      {clients?.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
      <Button onClick={handleCreate}>Criar Cliente</Button>
    </div>
  )
}
```

### 3. Autenticação

```tsx
import { signInWithEmail, signUpWithEmail, signOut } from '@/lib/supabase/auth'

// Login
const user = await signInWithEmail('dev@arco.com', 'arco123456')

// Cadastro
const newUser = await signUpWithEmail('novo@example.com', 'senha123', {
  full_name: 'João Silva',
})

// Logout
await signOut()
```

### 4. Debug Panel

Pressione `Ctrl+Shift+D` no dashboard para abrir o painel de debug.

Mostra:
- ✅ Status da conexão
- 👤 Usuário autenticado
- 📊 Log de queries
- 💾 Cache do React Query
- 📦 Storage buckets

## Estrutura do Projeto

```
/home/jpcardozx/projetos/arco/
├── supabase/
│   ├── config.toml              # Configuração local
│   └── migrations/
│       └── 20250104000000_initial_schema.sql  # Schema inicial
├── src/
│   ├── types/
│   │   └── supabase.ts          # Tipos gerados automaticamente
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Factory de clientes (browser/server/admin)
│   │   │   └── auth.ts          # Helpers de autenticação
│   │   └── hooks/
│   │       └── use-database.ts  # React Query hooks
│   └── components/
│       ├── providers/
│       │   └── query-provider.tsx  # TanStack Query wrapper
│       └── debug/
│           └── supabase-debug-panel.tsx  # Painel de debug
└── scripts/
    └── seed-database.ts         # Script de seed
```

## Dados de Desenvolvimento

O script `db:seed` cria:

- **1 usuário**: dev@arco.com / arco123456
- **3 clientes**: João Silva, Maria Santos, Pedro Oliveira
- **3 tasks**: Reunião, Análise ROI, Proposta Comercial
- **3 leads**: Ana Costa, Carlos Mendes, Fernanda Lima

## Integração com Next.js

### 1. Adicionar QueryProvider ao Layout

```tsx
// src/app/layout.tsx
import { QueryProvider } from '@/components/providers/query-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
```

### 2. Adicionar Debug Panel ao Dashboard

```tsx
// src/app/dashboard/layout.tsx
import { SupabaseDebugPanel } from '@/components/debug/supabase-debug-panel'

export default function DashboardLayout({ children }) {
  return (
    <div>
      {children}
      {process.env.NODE_ENV === 'development' && <SupabaseDebugPanel />}
    </div>
  )
}
```

## Solução de Problemas

### Docker não está rodando
```bash
# Verificar se Docker está ativo
docker ps

# Iniciar Docker Desktop manualmente
```

### Porta já em uso
```bash
# Ver serviços Supabase ativos
pnpm supabase:status

# Parar serviços
pnpm supabase:stop

# Reiniciar
pnpm supabase:start
```

### Migration falhou
```bash
# Resetar banco local (⚠️ apaga dados)
pnpm supabase:reset

# Aplicar migrations novamente
pnpm supabase:push
```

### Tipos desatualizados
```bash
# Regenerar tipos após mudanças no schema
pnpm supabase:types
```

### RLS Policy bloqueando query
```bash
# 1. Verificar se usuário está autenticado
const user = await getCurrentUser()
console.log('User:', user)

# 2. Verificar policies no Studio
# http://localhost:54323 → Authentication → Policies

# 3. Testar query com service role (bypassa RLS)
const { data } = await createSupabaseAdminClient()
  .from('clients')
  .select('*')
```

## Deploy para Produção

### 1. Linkar projeto remoto

```bash
pnpm supabase:link
```

### 2. Aplicar migrations

```bash
# Aplicar para produção
supabase db push --remote
```

### 3. Atualizar variáveis no Vercel

```bash
NEXT_PUBLIC_SUPABASE_URL=https://vkclegvrqprevcdgosan.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### 4. Deploy

```bash
# Vercel detecta mudanças automaticamente
git push origin main
```

## Próximos Passos

1. ✅ Substituir mock services por hooks reais
2. ✅ Criar páginas de auth (login/signup)
3. ✅ Implementar Server Actions para mutations
4. ✅ Configurar Storage para upload de arquivos
5. ✅ Adicionar Realtime subscriptions
6. ✅ Implementar Edge Functions (se necessário)

## Referências

- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/reference/cli)

---

**Suporte**: Em caso de dúvidas, consulte o painel de debug (`Ctrl+Shift+D`) ou os logs em `supabase/logs/`.
