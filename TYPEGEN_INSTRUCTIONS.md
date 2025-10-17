# 🔧 Instruções para Regenerar Tipos do Supabase

## 📋 Passo a Passo

### 1️⃣ Executar SQL no Dashboard do Supabase

1. Acesse o **Dashboard do Supabase**: https://supabase.com/dashboard
2. Selecione seu projeto **ARCO**
3. Vá em **SQL Editor** (ícone de banco de dados no menu lateral)
4. Clique em **New Query**
5. Copie todo o conteúdo do arquivo `sql/fix-missing-fields.sql`
6. Cole no editor SQL
7. Clique em **Run** (ou pressione `Ctrl+Enter`)
8. Aguarde a mensagem de sucesso

### 2️⃣ Regenerar os Tipos do TypeScript

Execute no terminal:

```bash
# Opção 1: Usando Supabase CLI (recomendado)
npx supabase gen types typescript --project-id SEU_PROJECT_ID > src/lib/supabase/database.types.ts

# Opção 2: Usando link direto (se tiver configurado)
npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

**⚠️ Onde encontrar o PROJECT_ID:**
- Dashboard do Supabase → Settings → General → Reference ID

### 3️⃣ Adicionar Exports de Tipos Helper

Abra o arquivo `src/lib/supabase/database.types.ts` e adicione **ao final** do arquivo:

```typescript
// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update']

export type Enums<T extends keyof Database['public']['Enums']> = 
  Database['public']['Enums'][T]
```

### 4️⃣ Atualizar o arquivo src/types/database.types.ts

Abra `src/types/database.types.ts` e atualize para:

```typescript
// Re-export database types from lib/supabase
export type { Database, Json } from '../lib/supabase/database.types'

// Re-export helper types
export type { 
  Tables, 
  TablesInsert, 
  TablesUpdate, 
  Enums 
} from '../lib/supabase/database.types'
```

### 5️⃣ Rodar Typecheck

Execute no terminal:

```bash
pnpm typecheck
```

Você deve ver uma **redução significativa** nos erros! 🎉

---

## 🔍 Verificação das Tabelas Criadas/Atualizadas

As seguintes tabelas foram atualizadas:

### ✅ user_profiles
- ✨ Novo campo: `role` (user, admin, manager, consultant)
- ✨ Novo campo: `email` (sincronizado de auth.users)

### ✅ consultant_availability
- ✨ Novo campo: `max_bookings_per_slot` (número máximo de agendamentos por slot)

### ✅ discount_codes
- ✨ Novo campo: `description` (descrição legível do cupom)

### ✅ Tabelas já existentes (verificadas):
- ✅ analytics_events
- ✅ consultoria_bookings
- ✅ qualification_responses

---

## 🛡️ Row Level Security (RLS)

Todas as tabelas agora têm políticas RLS configuradas:

- **consultant_availability**: Leitura pública, escrita autenticada
- **consultoria_bookings**: Usuários veem seus próprios, admins veem todos
- **qualification_responses**: Apenas usuários autenticados
- **analytics_events**: Insert público, leitura apenas admins
- **discount_codes**: Leitura de códigos ativos, CRUD apenas admins

---

## 🚀 Comandos Rápidos

```bash
# Regenerar tipos
npx supabase gen types typescript --project-id YOUR_ID > src/lib/supabase/database.types.ts

# Verificar erros
pnpm typecheck

# Compilar projeto
pnpm build

# Rodar dev
pnpm dev
```

---

## 📊 Progresso Esperado

**Antes:** 76 erros TypeScript  
**Depois dos 3 arquivos principais:** 13 erros  
**Depois desta regeneração:** ~0-3 erros 🎯

---

## 🆘 Troubleshooting

### Erro: "Project ID not found"
```bash
# Configure o link primeiro
npx supabase link --project-ref YOUR_PROJECT_ID
```

### Erro: "Invalid credentials"
```bash
# Faça login novamente
npx supabase login
```

### Tipos não atualizando
```bash
# Force reload do TypeScript server no VSCode
# Pressione: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## 📝 Notas Importantes

1. **Sempre faça backup** antes de executar SQL em produção
2. O arquivo `database.types.ts` é **gerado automaticamente** - não edite manualmente (exceto para adicionar os helpers no final)
3. Execute `pnpm typecheck` após cada mudança para verificar
4. Se ainda houver erros, verifique se as tabelas existem no Supabase Dashboard

---

**Última atualização:** 16 de outubro de 2025
