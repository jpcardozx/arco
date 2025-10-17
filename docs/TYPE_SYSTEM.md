# Sistema de Tipagem TypeScript - Supabase

## 🎯 Objetivo

Garantir **type safety completo** em todas as interações com o banco de dados Supabase, evitando erros de runtime causados por:
- Nomes de colunas incorretos
- Tipos incompatíveis
- Estruturas de dados desatualizadas

## 📋 Arquivos Principais

### 1. `src/types/database.types.ts`
**Tipos gerados automaticamente** do schema do Supabase.

- ✅ **NUNCA edite manualmente**
- ✅ Regenere após cada migration aplicada
- ✅ Fonte única da verdade para estrutura do DB

### 2. `src/lib/supabase/client.ts`
**Clientes Supabase tipados** para uso em diferentes contextos.

#### **Browser Client** (Client Components)
```typescript
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const supabase = createSupabaseBrowserClient();
const { data } = await supabase.from('webhook_events').select('*');
```

#### **Server Client** (API Routes, Server Components)
```typescript
import { createSupabaseServerClient } from '@/lib/supabase/client';

const supabase = createSupabaseServerClient();
const { data } = await supabase.from('webhook_events').select('*');
```

#### **Admin Client** (Webhooks, Scripts)
```typescript
import { getSupabaseAdmin } from '@/lib/supabase/client';

const supabase = getSupabaseAdmin();
const { data } = await supabase.from('webhook_events').select('*');
```

### 3. Tipos Auxiliares

```typescript
import type { 
  Tables, 
  TablesInsert, 
  TablesUpdate,
  WebhookEvent,
  WebhookEventInsert 
} from '@/lib/supabase/client';

// Tipo de uma linha completa
type Event = Tables<'webhook_events'>;

// Tipo para inserção (campos opcionais)
type EventInsert = TablesInsert<'webhook_events'>;

// Tipo para atualização (todos campos opcionais)
type EventUpdate = TablesUpdate<'webhook_events'>;

// Atalhos para tipos comuns
const event: WebhookEvent = { ... };
const insert: WebhookEventInsert = { ... };
```

## 🔄 Workflow: Aplicar Migrations

### 1. Criar Migration
```bash
npx supabase migration new nome_da_migration
```

### 2. Editar SQL
```sql
-- supabase/migrations/XXXXXXX_nome_da_migration.sql
CREATE TABLE ...
ALTER TABLE ...
```

### 3. Aplicar no Banco
```bash
npx supabase db push
```

### 4. **CRITICAL**: Regenerar Tipos
```bash
pnpm types:generate
```

### 5. Verificar Mudanças
```bash
git diff src/types/database.types.ts
```

### 6. Atualizar Código
TypeScript vai **automaticamente sinalizar** todos os lugares que precisam ser atualizados.

## ✅ Checklist de Type Safety

- [ ] Após cada migration, executei `pnpm types:generate`?
- [ ] Todos os erros de TypeScript foram resolvidos?
- [ ] Usei um dos clientes tipados do `@/lib/supabase/client`?
- [ ] Não criei instâncias manuais de `createClient`?
- [ ] Não usei `any` para contornar erros de tipo?

## 🚫 Anti-Patterns (NÃO FAÇA)

### ❌ Criar cliente manualmente
```typescript
// ERRADO
const supabase = createClient(url, key);
```

### ❌ Usar tipos genéricos
```typescript
// ERRADO
const { data } = await supabase.from('webhook_events').select('*');
// data tem tipo 'any'
```

### ❌ Ignorar erros de tipo
```typescript
// ERRADO
const insertData = {
  type: event.type,  // Coluna não existe!
} as any;
```

## ✅ Best Practices

### ✅ Sempre use clientes tipados
```typescript
import { getSupabaseAdmin } from '@/lib/supabase/client';

const supabase = getSupabaseAdmin();
```

### ✅ Use tipos auxiliares
```typescript
import type { WebhookEventInsert } from '@/lib/supabase/client';

const insert: WebhookEventInsert = {
  gateway: 'mercadopago',
  gateway_event_id: requestId,
  event_type: 'payment',  // TypeScript valida!
  payload: event,
  processed: false,
};
```

### ✅ Deixe TypeScript validar
```typescript
// TypeScript vai AVISAR se usar coluna errada
const { data } = await supabase
  .from('webhook_events')
  .select('id, event_type, wrong_column');  // ❌ Erro de compilação!
```

## 🔧 Comandos Úteis

```bash
# Regenerar tipos do Supabase
pnpm types:generate

# Verificar erros de tipo
pnpm type-check

# Build (vai falhar se houver erros de tipo)
pnpm build
```

## 📊 Benefícios

1. ✅ **Erros detectados em tempo de compilação** (não em produção!)
2. ✅ **Autocomplete completo** no VSCode
3. ✅ **Refactoring seguro** (renomear colunas atualiza todo código)
4. ✅ **Documentação automática** (tipos são documentação viva)
5. ✅ **Confiança no código** (se compila, funciona!)

## 🐛 Problemas Comuns

### Erro: "Property 'X' does not exist"
**Causa**: Tipos desatualizados  
**Solução**: `pnpm types:generate`

### Erro: "Type 'X' is not assignable to type 'Y'"
**Causa**: Estrutura de dados incompatível  
**Solução**: Ajustar código para match com schema real

### Erro: "Cannot find module '@/types/database.types'"
**Causa**: Tipos não foram gerados  
**Solução**: `pnpm types:generate`

## 📝 Exemplo Completo

```typescript
// src/lib/example.ts
import { getSupabaseAdmin, type WebhookEventInsert } from '@/lib/supabase/client';

export async function storeWebhook(
  eventType: string,
  payload: unknown,
  requestId: string
): Promise<string> {
  const supabase = getSupabaseAdmin();
  
  // TypeScript valida TODA essa estrutura!
  const insert: WebhookEventInsert = {
    gateway: 'mercadopago',
    gateway_event_id: requestId,
    event_type: eventType,
    processed: false,
    payload: payload as any,  // JSON genérico
  };
  
  const { data, error } = await supabase
    .from('webhook_events')
    .insert(insert)
    .select('id')
    .single();
  
  if (error) throw error;
  
  return data.id;  // TypeScript sabe que data.id é string!
}
```

## 🎓 Regra de Ouro

> **Se o TypeScript não reclama, está correto!**
> 
> Se você precisa usar `as any` ou `@ts-ignore`, algo está errado no design.
