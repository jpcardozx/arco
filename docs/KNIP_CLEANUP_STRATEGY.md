# 🧹 Estratégia de Limpeza com Knip - ARCO

**Data**: 28 de outubro de 2025  
**Objetivo**: Manter código essencial, deletar redundâncias  
**Ferramentas**: Knip 5.66.0 + Análise Manual

---

## 📊 Situação Atual

### Achados do Knip
- **391 exports não utilizados**
- **161 tipos/interfaces não utilizados**
- **19 exports duplicados**

---

## 🎯 Abordagem Estratégica em 4 Fases

### **FASE 1: Segurança (KEEP)** ✅
**Objetivo**: Identificar o que É ESSENCIAL e NUNCA deletar

#### 1.1 Core Production Pages ✅
```
MANTER 100%:
├── src/app/page.tsx                    # Homepage
├── src/app/layout.tsx                  # Root layout
├── src/app/lp/[slug]/page.tsx         # Landing pages dinâmicas
├── src/app/agendamentos/page.tsx      # Sistema de agendamentos
├── src/app/checkout/[planId]/page.tsx # Checkout
├── src/app/dashboard/**/*.tsx          # 26 páginas dashboard
└── src/app/free/page.tsx              # Lead magnet
```

**Justificativa**: São rotas ativas em produção

---

#### 1.2 Design System Base (shadcn/ui) ⚠️
```typescript
MANTER (uso confirmado):
✅ Button              -> Usado em 20+ componentes
✅ Card                -> Usado em dashboard inteiro
✅ Input               -> Formulários essenciais
✅ Label               -> Formulários essenciais
✅ Form                -> React Hook Form integration
✅ Dialog              -> Modais essenciais
✅ Toast               -> Sistema de notificações
✅ Tabs                -> Dashboard navigation
✅ Accordion           -> FAQs, collapsibles
✅ Avatar              -> User profiles
✅ Checkbox            -> Formulários
✅ Switch              -> Settings toggles
✅ Progress            -> Loading states

DELETAR (não usados):
❌ DropdownMenu exports não usados (7 exports)
❌ Select exports não usados (SelectGroup, SelectLabel, etc)
❌ Table exports não usados (TableFooter, TableCaption)
❌ ScrollArea (ScrollBar export)
❌ Portfolio components (não são shadcn, custom unused)
```

**Estratégia**: 
- Manter componente principal se usado
- Deletar sub-exports não utilizados
- Criar barrel exports limpos

---

#### 1.3 Analytics & Tracking ⚠️
```typescript
MANTER:
✅ Meta Pixel (MetaPixel, MetaPixelScript)
✅ AnalyticsProvider
✅ PrivacyConsentBanner
✅ Meta Conversions API (core functions)
✅ PostHog (usado em 5+ lugares)

DELETAR:
❌ EMQ_THRESHOLDS (not used anywhere)
❌ calculateEMQScore (complex, unused)
❌ getMissingIdentifiers
❌ getEMQStats
❌ trackErrorClick (session-quality.ts)
❌ trackFormFocus/Blur (unused)
❌ trackQuickBack (unused)
❌ getSessionQuality (unused)
```

**Razão**: Analytics tem muitas features "nice to have" não implementadas

---

#### 1.4 Email System 📧
```typescript
MANTER:
✅ EMAIL_CONFIG (core config)
✅ ResendProvider (production email sender)
✅ validateEmailDomain (anti-spam)

DELETAR (over-engineered, not used):
❌ EMAIL_SETTINGS (duplicado)
❌ TEMPLATE_DEFAULTS (unused)
❌ BaseEmailTemplate, WelcomeEmailTemplate
❌ createDefaultEmailTemplate
❌ getEmailSequence (automation não implementada)
❌ getLeadEmails, unsubscribeLead
❌ trackEmailOpen, trackEmailClick
❌ 50+ tipos/interfaces de email não usados
```

**Razão**: Sistema de email automation foi planejado mas não implementado

---

### **FASE 2: Análise de Duplicação** 🔍

#### 2.1 Exports Duplicados (19 encontrados)

```typescript
PROBLEMA: Mesmo componente exportado 2x

Exemplo:
// default export + named export
export function Button() {}
export default Button

Solução:
// Escolher UM padrão:
export default function Button() {}  // OU
export function Button() {}          // preferred
```

**Ação**: Padronizar todos para **named exports** (Next.js 15 best practice)

---

#### 2.2 Tipos Duplicados (Database)

```typescript
DELETAR:
❌ src/types/database.types.ts (6,286 linhas)
   -> Substituído por types/supabase.ts (mais recente)

❌ Constants (duplicado em 2 arquivos)
   database.types.ts:6286
   supabase.ts:5691
```

**Ação**: Deletar `database.types.ts`, manter apenas `supabase.ts`

---

### **FASE 3: Design System Cleanup** 🎨

#### 3.1 Design Tokens

```typescript
SITUAÇÃO:
src/design-system/tokens.ts (352 linhas)

Exports não usados:
❌ colors (15:14)          -> Duplicado em theme.tsx
❌ typography (95:14)      -> Não usado
❌ spacing (133:14)        -> Tailwind nativo
❌ borderRadius (155:14)   -> Tailwind nativo
❌ shadows (167:14)        -> Não usado
❌ gradients (179:14)      -> Inline nos componentes
❌ components (245:14)     -> Não usado
❌ animations (309:14)     -> Framer Motion
❌ blur (325:14)           -> Não usado

MANTER:
✅ arcoTheme (278:14)      -> Usado no ThemeProvider
```

**Ação**: 
1. Consolidar `tokens.ts` em um único objeto `designTokens`
2. Deletar exports individuais não usados
3. Migrar valores usados para Tailwind config

---

#### 3.2 Componentes Custom Não Usados

```typescript
DELETAR:
❌ src/components/ui/portfolio-card.tsx (145 linhas)
   - PortfolioIcon
   - portfolioCardVariants
   - portfolioIconVariants
   - portfolioBadgeVariants
   -> Feature não implementada

❌ src/components/ui/premium-button.tsx
   - SecondaryButton
   - GradientButton
   -> Substituídos por Button variants

❌ src/components/ui/progress-ring.tsx
   - MultiRingProgress
   -> Feature não implementada

❌ src/components/ui/textarea.tsx
   - TextareaProps (tipo exportado mas component não usado)
```

---

### **FASE 4: Hooks & Utilities** 🪝

#### 4.1 Hooks Não Usados

```typescript
DELETAR:
❌ useGradientStyle (useCampaignColors.ts)
❌ useMouseParallax (useParallax.ts)
❌ useScrollProgress (useParallax.ts)
❌ useTopPages (use-analytics-data.ts)
❌ useTrafficSources (use-analytics-data.ts)
❌ useWhatsApp default export (duplicado)

MANTER:
✅ useCurrentUser (usado em 10+ lugares)
✅ useDashboardUser
✅ useMetaTracking
✅ useRealtimeChecklist
```

---

#### 4.2 Lib Utils Não Usados

```typescript
DELETAR (lib/):

❌ lib/analytics/emq-monitoring.ts (525 linhas)
   -> Sistema EMQ não implementado

❌ lib/analytics/session-quality.ts (537 linhas)
   -> Rage clicks, dead clicks não rastreados

❌ lib/email/disposable-domains.ts (230 linhas)
   -> blockDomain, validateBulkEmails não usados

❌ lib/leads/email-automation.ts (308 linhas)
   -> Sistema de sequences não implementado

❌ lib/leads/lead-scoring.ts (220 linhas)
   -> getHotLeads, getWarmLeads não implementados

❌ lib/google-search-console.ts
   -> getSearchAnalytics, findOpportunities não usados

❌ lib/payments/mercadopago/orders.ts
   -> getPayment, getOrderStatus não usados

❌ lib/auth/password-authorization.ts
   -> validateCurrentPassword, RBACManager não usados

MANTER:
✅ lib/supabase/* (core database)
✅ lib/analytics/posthog-config.ts (essencial)
✅ lib/tracking/meta-conversions-api.ts (essencial)
✅ lib/payments/mercadopago/client.ts (essencial)
```

---

## 📋 Plano de Execução

### Passo 1: Backup & Safety
```bash
# Criar branch de limpeza
git checkout -b cleanup/knip-phase-1

# Garantir que build funciona antes
pnpm build
```

---

### Passo 2: Quick Wins (1h)

#### 2.1 Deletar Arquivos Inteiros Não Usados
```bash
# Deletar arquivos que não têm nenhum import
rm src/lib/analytics/emq-monitoring.ts
rm src/lib/analytics/session-quality.ts
rm src/lib/leads/email-automation.ts
rm src/lib/leads/lead-scoring.ts
rm src/lib/google-search-console.ts
rm src/lib/auth/password-authorization.ts
rm src/types/database.types.ts
rm src/components/ui/portfolio-card.tsx
rm src/components/ui/premium-button.tsx
rm src/components/ui/progress-ring.tsx
```

**Validação**: `pnpm build` deve continuar funcionando

---

### Passo 3: Refatorar Exports (2h)

#### 3.1 Components UI - Manter apenas exports usados

**Exemplo - dropdown-menu.tsx**:
```typescript
// ANTES (193 linhas, 7 exports não usados)
export { DropdownMenuShortcut }
export { DropdownMenuPortal }
export { DropdownMenuSub }
// ... 7 exports

// DEPOIS (remover exports não importados)
// Manter apenas:
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
```

**Aplicar em**:
- dropdown-menu.tsx
- select.tsx
- table.tsx
- toast.tsx
- scroll-area.tsx

---

#### 3.2 Design System Tokens

**Consolidar tokens.ts**:
```typescript
// ANTES: 10 exports individuais
export const colors = {...}
export const typography = {...}
export const spacing = {...}
// ...

// DEPOIS: 1 export consolidado
export const designTokens = {
  colors: {...},     // Mover para tailwind.config
  arcoTheme: {...}   // Manter apenas isso
} as const

export default designTokens
```

---

### Passo 4: Type Cleanup (1h)

#### 4.1 Deletar Tipos Não Usados

**Estratégia**:
```typescript
// src/types/agendamentos.ts
// Manter apenas tipos usados em:
// - src/app/agendamentos/**
// - src/components/agendamentos/**

// Deletar:
❌ CloudFileWithUrl (não usado)
❌ LeadData (duplicado em 3 lugares)
❌ LeadStats (não usado)
// ... (140+ tipos)
```

**Ferramenta**: Knip já mapeou tudo

---

### Passo 5: Validação Final (30min)

```bash
# 1. TypeCheck
pnpm typecheck

# 2. Build
pnpm build

# 3. Knip novamente
pnpm knip

# 4. Tests
pnpm test:unit

# 5. Lint
pnpm lint
```

---

## 🎯 Métricas de Sucesso

### Antes da Limpeza:
- **391** exports não usados
- **161** tipos não usados
- **19** duplicações
- **~50 arquivos** com código morto

### Meta Após Limpeza:
- **< 50** exports não usados (apenas utils futuros)
- **< 20** tipos não usados (apenas database types)
- **0** duplicações
- **~15 arquivos deletados**

### Ganhos Esperados:
- **-15% bundle size** (remover código morto)
- **-20% tempo de build** (menos arquivos)
- **+50% clareza** (código limpo)
- **0 risco** (manter produção intacta)

---

## 🚨 Regras de Ouro

### ✅ SEMPRE MANTER:
1. Tudo em `src/app/**` (rotas Next.js)
2. Componentes usados em produção
3. shadcn/ui base components (Button, Card, Input, etc)
4. Analytics essenciais (Meta, PostHog)
5. Supabase/Database core
6. Payment system (MercadoPago)

### ❌ DELETAR SEM MEDO:
1. Arquivos sem nenhum import ativo
2. Features planejadas mas não implementadas
3. Exports duplicados (escolher um padrão)
4. Tipos de arquivos deletados
5. Utils com 0 usage no grep

### ⚠️ ANALISAR CASO A CASO:
1. Hooks (podem ser usados via dynamic import)
2. API routes (podem ser chamadas por frontend)
3. Componentes de landing page (verificar todas LPs)
4. Email templates (verificar se enviados)

---

## 📝 Checklist de Segurança

Antes de deletar qualquer arquivo:

- [ ] Verificar `grep` no projeto inteiro
- [ ] Verificar se está em `tsconfig paths`
- [ ] Verificar se é importado dinamicamente
- [ ] Verificar se é usado em API routes
- [ ] Verificar se é usado em testes
- [ ] Verificar se é usado em Storybook

---

## 🔄 Processo Iterativo

### Iteração 1 (Esta Semana):
- ✅ Criar knip.json
- ✅ Documentar estratégia
- 🔲 Deletar arquivos 100% não usados (15 arquivos)
- 🔲 Remover exports duplicados
- 🔲 Build + validação

### Iteração 2 (Próxima Semana):
- 🔲 Refatorar design-system/tokens.ts
- 🔲 Limpar tipos não usados
- 🔲 Consolidar email types
- 🔲 Documentar breaking changes

### Iteração 3 (Manutenção):
- 🔲 Configurar Knip no CI/CD
- 🔲 Pre-commit hook com Knip
- 🔲 Monitoramento mensal

---

## 🎓 Lições Aprendidas

### Por que acumulamos código morto?

1. **Over-engineering**: Features planejadas não implementadas
2. **Copy-paste**: shadcn/ui traz todos exports
3. **Refactoring**: Criamos novo código, não deletamos antigo
4. **Database types**: Regeneração duplica tipos

### Como evitar no futuro?

1. **Knip semanal**: `pnpm knip` antes de PR
2. **Code review**: Questionar exports não usados
3. **YAGNI**: You Aren't Gonna Need It
4. **Tests**: Código sem teste = candidato a deletar

---

## 🚀 Próximos Passos

### Opção A: Automática (Rápida, Arriscada)
```bash
# Knip pode deletar automaticamente
pnpm knip --fix

# ⚠️ NÃO RECOMENDADO sem revisão manual
```

### Opção B: Manual (Lenta, Segura) ✅ RECOMENDADA
```bash
# 1. Revisar cada arquivo listado
pnpm knip > knip-report.txt

# 2. Deletar manualmente após análise
# 3. Build após cada grupo de deleções
# 4. Commit incremental
```

### Opção C: Híbrida (Balanceada) 🎯 ESCOLHIDA
```bash
# 1. Deletar arquivos 100% não usados (safe)
# 2. Refatorar exports (manual)
# 3. Validar continuamente
```

---

## ✅ Aprovação para Começar?

**Proposta**: Começar com **Passo 2** (Quick Wins)

Deletar apenas arquivos com:
- ✅ 0 imports ativos
- ✅ Features não implementadas
- ✅ Código duplicado óbvio

**Tempo estimado**: 1-2 horas  
**Risco**: Baixíssimo  
**Ganho**: Imediato (build mais rápido)

Posso prosseguir?
