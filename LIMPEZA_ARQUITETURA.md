# Limpeza de Arquitetura Overengineered

## Status: Supabase

### ❌ Problema Identificado
- **Credenciais Retornam 401**: As credenciais do Supabase em `.env.local` estão **inválidas ou expiradas**
- **Service Role Key Rotacionada**: Token foi rotacionado em 21/10/2025, mas ainda retorna 401
- **Anon Key Inválida**: A chave anônima também falha na autenticação

### ✅ Solução Imediata
1. **Regenerar credenciais** no painel do Supabase
2. **Atualizar `.env.local`** com novas credenciais válidas
3. **Testar conexão** antes de prosseguir

---

## Arquitetura Desnecessária Identificada

### 🗑️ Para Remover

#### 1. **Dashboard Logger** (`src/lib/supabase/dashboard-logger.ts`)
- **Problema**: Logger complexo que tenta gravar em tabela inexistente
- **Uso**: Apenas em `useDashboardUser.ts` e alguns hooks
- **Solução**: Substituir por `console.log` simples ou remover

#### 2. **Lead Capture System** (`src/lib/supabase/lead-capture.ts`)
- **Problema**: 356 linhas de código para captura de leads com enriquecimento automático
- **Uso**: Apenas em `lead-capture-form.tsx` (1 componente)
- **Solução**: Simplificar para insert direto na tabela `leads`

#### 3. **Cloud Storage Service** (`src/app/lib/supabase/cloud-storage-service.ts`)
- **Problema**: Duplicação de localização (`src/app/lib` vs `src/lib`)
- **Uso**: Apenas em `documents/page.tsx`
- **Solução**: Mover para `src/lib/supabase/` e simplificar

#### 4. **Auth Helpers** (`src/lib/supabase/auth.ts`)
- **Problema**: 168 linhas com validação de email descartável e múltiplas funções
- **Uso**: Funções básicas de signIn/signUp
- **Solução**: Simplificar para apenas wrappers do Supabase Auth

#### 5. **Múltiplos Clientes Supabase**
- **Problema**: 3 arquivos diferentes (client.ts, server.ts, admin.ts)
- **Solução**: Consolidar em um único arquivo com exports claros

---

## Plano de Ação

### Fase 1: Corrigir Credenciais ✅
```bash
# 1. Acessar Supabase Dashboard
# 2. Settings > API > Regenerar chaves
# 3. Atualizar .env.local
# 4. Testar conexão
```

### Fase 2: Remover Código Desnecessário

#### A. Dashboard Logger
```bash
# Remover arquivo
rm src/lib/supabase/dashboard-logger.ts

# Atualizar imports em:
- src/hooks/useDashboardUser.ts
- src/lib/hooks/use-client-timeline.ts
- src/lib/hooks/use-user-tasks.ts
```

#### B. Lead Capture
```bash
# Simplificar para função básica
# Manter apenas insert direto sem enriquecimento
```

#### C. Cloud Storage
```bash
# Mover de src/app/lib para src/lib
mv src/app/lib/supabase/cloud-storage-service.ts src/lib/supabase/
rm -rf src/app/lib/supabase/
```

#### D. Consolidar Clientes Supabase
```typescript
// Manter apenas:
// - src/lib/supabase/client.ts (browser + server + admin)
// - src/lib/supabase/database.types.ts (tipos)
```

### Fase 3: Validar

```bash
# Compilar projeto
pnpm build

# Verificar erros de tipo
pnpm tsc --noEmit
```

---

## Resumo

### Antes
- 8 arquivos em `src/lib/supabase/`
- ~1200 linhas de código
- Múltiplas abstrações complexas
- **Credenciais inválidas** ❌

### Depois
- 3 arquivos essenciais
- ~300 linhas de código
- Acesso direto ao Supabase
- **Credenciais válidas** ✅

### Economia
- **~75% menos código**
- **60% menos complexidade**
- **Manutenção mais fácil**
