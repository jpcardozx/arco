# 🔧 Plano de Ação: Correção de Erros TypeCheck

**Data**: 16 de outubro de 2025  
**Status**: ✅ Conexão Restaurada | ⚠️ Erros TypeCheck Remanescentes

---

## ✅ Correções Implementadas

### 1. Conexão com Supabase
- ✅ Login no Supabase CLI realizado
- ✅ Projeto vinculado: `vkclegvrqprevcdgosan`
- ✅ Tipos TypeScript regenerados

### 2. Tabela analytics_events
- ✅ Migração criada: `supabase/migrations/20251016000000_create_analytics_events.sql`
- ✅ Tipos adicionados manualmente
- ✅ RLS policies configuradas

### 3. Limpeza de Arquivos
- ✅ `src/lib/supabase/database.types.ts` - limpo e funcionando
- ✅ `src/types/database.types.ts` - corrigido

---

## ⚠️ Erros Remanescentes (Total: ~100 erros)

### Categoria 1: Tabelas não reconhecidas pelo Supabase Client

**Problema**: O tipo inferido do createClient ainda usa uma lista limitada de 40 tabelas.

**Tabelas afetadas:**
- `consultoria_bookings`
- `consultoria_types`
- `qualification_responses`
- `discount_codes`
- `notification_queue`
- `analytics_events`

**Arquivos com erros:**
- `src/app/agendamentos/confirmacao/[bookingId]/page.tsx`
- `src/app/api/agendamentos/create-booking/route.ts`
- `src/app/api/emails/send-confirmation/route.ts`

**Solução**:
```typescript
// Opção 1: Usar type assertion nas queries
const { data } = await supabase
  .from('consultoria_bookings' as any)
  .select('*')

// Opção 2: Atualizar createClient para aceitar Database completo
export const createClient = () => createSupabaseClient<Database>(...)

// Opção 3: Criar cliente tipado específico
export const createBookingClient = () => createSupabaseClient<Database>(...)
```

---

### Categoria 2: Queries sem joins explícitos

**Problema**: TypeScript não consegue inferir tipos de relacionamentos automáticos.

**Exemplo de erro:**
```
Property 'user_profiles' does not exist on type 'NonNullable<ResultOne>'.
```

**Solução**:
```typescript
// ❌ Antes
const { data } = await supabase
  .from('consultoria_bookings')
  .select('*')
  .eq('id', bookingId)
  .single()

// ✅ Depois  
const { data } = await supabase
  .from('consultoria_bookings')
  .select(`
    *,
    user_profiles(*),
    consultoria_types(*)
  `)
  .eq('id', bookingId)
  .single()

// E tipar o resultado
type BookingWithRelations = Database['public']['Tables']['consultoria_bookings']['Row'] & {
  user_profiles: Database['public']['Tables']['user_profiles']['Row']
  consultoria_types: Database['public']['Tables']['consultoria_types']['Row']
}
```

---

### Categoria 3: Enums e Propriedades específicas

**Erro:**
```
Argument of type 'string' is not assignable to parameter of type 
'NonNullable<"pending_payment" | "confirmed" | "completed" | "cancelled" | "no_show" | null>'.
```

**Arquivos afetados:**
- `src/app/api/agendamentos/create-booking/route.ts:343`

**Solução**:
```typescript
// Definir tipo para status
type BookingStatus = Database['public']['Tables']['consultoria_bookings']['Row']['booking_status']

// Usar o tipo
const status: BookingStatus = 'confirmed'
```

---

### Categoria 4: Resend Email API

**Erro:**
```
Type 'string | undefined' is not assignable to type 'string'.
```

**Arquivo**: `src/app/api/emails/send-confirmation/route.ts:169`

**Solução**:
```typescript
// Garantir que from seja sempre string
const from = process.env.RESEND_FROM_EMAIL || 'arco@consultingarco.com'

await resend.emails.send({
  from, // agora é garantido ser string
  to: email,
  subject: subject,
  html: html
})
```

---

## 📝 Checklist de Implementação

### Fase 1: Correções Críticas do Cliente Supabase
- [ ] Atualizar `src/lib/supabase/client.ts` para usar `Database` completo
- [ ] Atualizar `src/lib/supabase/server.ts` para usar `Database` completo  
- [ ] Atualizar `src/lib/supabase/admin.ts` para usar `Database` completo

### Fase 2: Correções nas Queries de Agendamento
- [ ] Corrigir `src/app/agendamentos/confirmacao/[bookingId]/page.tsx`
  - Adicionar joins explícitos
  - Tipar resultado com relacionamentos
- [ ] Corrigir `src/app/api/agendamentos/create-booking/route.ts`
  - Adicionar joins explícitos
  - Corrigir tipos de enum
  - Tipar inserts corretamente
- [ ] Corrigir `src/app/api/emails/send-confirmation/route.ts`
  - Adicionar joins explícitos
  - Corrigir tipo do from no Resend

### Fase 3: Aplicar Migração analytics_events
- [ ] Aplicar migração `20251016000000_create_analytics_events.sql` no banco
- [ ] Regerarseguir tipos após aplicação
- [ ] Testar queries com nova tabela

### Fase 4: Validação
- [ ] Rodar `pnpm typecheck` e verificar erros reduzidos a zero
- [ ] Testar sistema de agendamentos em desenvolvimento
- [ ] Testar envio de emails
- [ ] Validar analytics_events funcionando

---

## 🔍 Comandos Úteis

```bash
# Verificar erros TypeScript
pnpm typecheck

# Verificar apenas arquivos de agendamento
pnpm tsc --noEmit src/app/agendamentos/**/*.tsx src/app/api/agendamentos/**/*.ts

# Aplicar migrações
pnpm supabase db push --include-all

# Regenerar tipos
pnpm supabase gen types typescript --linked > src/lib/supabase/database.types.ts

# Limpar e verificar
pnpm clean && pnpm typecheck
```

---

## 📊 Progresso Estimado

- ✅ Fase 0: Conexão e Setup (100%)
- ⏳ Fase 1: Correções Cliente (0%)
- ⏳ Fase 2: Correções Queries (0%)
- ⏳ Fase 3: Migração Analytics (50% - criada, falta aplicar)
- ⏳ Fase 4: Validação (0%)

**Total**: ~12% completo

---

## 🎯 Próximos Passos Imediatos

1. **Atualizar createClient** para aceitar todas as tabelas do Database
2. **Corrigir create-booking/route.ts** - arquivo com mais erros
3. **Adicionar joins explícitos** nas queries de relacionamento
4. **Aplicar migração analytics_events** quando conexão estável

---

## 📚 Referências

- [Supabase TypeScript Support](https://supabase.com/docs/guides/api/generating-types)
- [Supabase Joins & Relations](https://supabase.com/docs/guides/api/joins-and-nesting)
- [Access Control Documentation](https://supabase.com/docs/guides/platform/access-control)
