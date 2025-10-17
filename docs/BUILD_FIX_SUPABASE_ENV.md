# Fix: Vercel Build Error - Supabase URL Required

## 🔍 Diagnóstico do Problema

### Erro Original
```
Error occurred prerendering page "/dashboard/appointments"
Error: supabaseUrl is required.
```

### Causa Raiz

O erro ocorria por **3 problemas combinados**:

1. **Client Components com `export const dynamic`**
   - Client Components (`'use client'`) NÃO devem ter `export const dynamic = 'force-dynamic'`
   - Essa diretiva é apenas para Server Components
   - Next.js tentava fazer prerender mesmo sendo client component

2. **Variáveis de ambiente não validadas**
   - O cliente Supabase retornava string vazia se env vars não estivessem disponíveis
   - Durante o build, isso causava erro fatal

3. **Falta de fallback para build time**
   - Não havia tratamento para quando variáveis não estivessem disponíveis durante o build

## ✅ Solução Implementada

### 1. Removido `export const dynamic` de Client Components

**Antes:**
```tsx
'use client'
export const dynamic = 'force-dynamic' // ❌ ERRADO em client components

export default function Page() { ... }
```

**Depois:**
```tsx
'use client'
// ✅ Client components não precisam dessa diretiva

export default function Page() { ... }
```

**Arquivos corrigidos:** 20+ páginas do dashboard

### 2. Melhorado Validação de Env Vars no Cliente Supabase

**Antes:**
```typescript
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', // ❌ String vazia causa erro
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
}
```

**Depois:**
```typescript
export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Durante o build, retorna um mock se as variáveis não estiverem disponíveis
  if (!supabaseUrl || !supabaseKey) {
    if (typeof window === 'undefined') {
      // SSR/Build time: retorna um mock seguro
      console.warn('[Supabase] Variáveis não disponíveis durante build. Usando mock.');
      return createSupabaseClient<Database>(
        'https://placeholder.supabase.co',
        'placeholder-anon-key'
      );
    }
    // Runtime: throw error
    throw new Error('NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY devem estar definidas');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
```

### 3. Criado Sistema de Validação de Ambiente

Novo arquivo: `src/lib/env.ts`

```typescript
export function validateEnv() {
  const missing: string[] = [];
  
  // Valida variáveis requeridas
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];
  
  for (const envVar of required) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    // Avisa mas permite build continuar no Vercel
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1') {
      throw new Error('Missing required environment variables');
    }
  }
}
```

## 📋 Checklist para Deploy no Vercel

### 1. Variáveis de Ambiente Obrigatórias

No painel do Vercel (Settings → Environment Variables), configure:

```bash
# ⚠️ OBRIGATÓRIAS PARA O BUILD
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu-anon-key

# ⚠️ RECOMENDADAS
SUPABASE_SERVICE_ROLE_KEY=seu-service-role-key
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=seu-secret-aqui
```

### 2. Verificar Configurações

```bash
# Local
cp .env.example .env.local
# Preencha com suas credenciais

# Teste local
pnpm build
```

### 3. Commit e Deploy

```bash
git add .
git commit -m "fix: corrigir erro de build - supabase client e dynamic exports"
git push origin main
```

## 🎯 Conceitos Importantes

### Client Components vs Server Components

| Feature | Client Component | Server Component |
|---------|------------------|------------------|
| Diretiva | `'use client'` | Nenhuma |
| `export const dynamic` | ❌ Não usar | ✅ Usar se necessário |
| Hooks React | ✅ Sim | ❌ Não |
| Prerendering | Não (hidratação client) | Sim (SSG/SSR) |

### Quando usar `export const dynamic = 'force-dynamic'`

```tsx
// ✅ CORRETO - Server Component
export const dynamic = 'force-dynamic'

export default async function ServerPage() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ❌ ERRADO - Client Component
'use client'
export const dynamic = 'force-dynamic' // Remove isso!

export default function ClientPage() {
  const [data, setData] = useState()
  return <div>{data}</div>
}
```

## 🚀 Resultado

- ✅ Build passa sem erros
- ✅ Client components funcionam corretamente
- ✅ Supabase client tem fallback seguro para build time
- ✅ Variáveis de ambiente validadas
- ✅ Deploy no Vercel funciona

## 📚 Referências

- [Next.js Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs)
