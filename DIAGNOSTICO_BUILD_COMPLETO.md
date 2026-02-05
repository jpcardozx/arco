# DIAGNÓSTICO COMPLETO - BUILD FAILURE

**Data:** 2025-10-28
**Status:** Build falha em geração de páginas estáticas (SSG)

---

## 1. PROBLEMA RAIZ

### Erro Atual
```
TypeError: r.appendChild is not a function
Location: /assessment page
Phase: Static Site Generation (SSG)
```

### Causa
Bibliotecas manipulando DOM durante renderização no servidor (SSR/SSG), incompatível com Next.js 15.

---

## 2. BIBLIOTECAS PROBLEMÁTICAS

### Browser-only dependencies usadas no código:
```json
{
  "react-type-animation": "DOM manipulation direto",
  "react-intersection-observer": "IntersectionObserver API",
  "framer-motion": "window.scroll, useScroll, useTransform",
  "@lottiefiles/react-lottie-player": "Canvas/WebGL",
  "@react-three/drei": "WebGL/Three.js",
  "@react-three/fiber": "WebGL/Three.js",
  "posthog-js": "Browser analytics"
}
```

---

## 3. ESTATÍSTICAS DO PROJETO

### Páginas
- **Total:** 56 páginas
- **Com 'use client':** 42 (75%)
- **Com force-dynamic:** 30 (54%)
- **SEM proteção SSR:** 10 (18%)

### Código
- **Componentes:** 265 arquivos tsx
- **Linhas totais:** ~39.000 linhas
- **node_modules:** 2.4GB
- **Build output:** 698MB

---

## 4. CORREÇÕES JÁ APLICADAS

### ✅ Resolvidos
1. `self is not defined` → serverExternalPackages no next.config.mjs
2. Import estático posthog-js → removido do AnalyticsProvider
3. Arquivos faltando → 6 stubs criados
4. DataCloneError genérico → worker threads desabilitado

### 🔧 Modificações Temporárias
- Edge runtime desabilitado em 4 rotas API
- Layout simplificado (Analytics/MetaPixel removidos)
- Worker threads desabilitado (perde paralelização)

---

## 5. PÁGINAS SEM PROTEÇÃO SSR (Risco de Falha)

```
1. dashboard/saude/page.tsx
2. dashboard/diagnostico/[id]/page.tsx
3. dashboard/diagnostico/page.tsx
4. dashboard/plano-de-acao/page.tsx
5. dashboard/overview/page.tsx
6. dashboard/operacoes/page.tsx
7. lp/salao-beleza-2024/page.tsx
8. lp/[slug]/success/page.tsx
9. lp/[slug]/page.tsx
10. metodologia/page.tsx
```

---

## 6. ESTRATÉGIA DE CORREÇÃO

### Opção A: Fix Cirúrgico (RECOMENDADO)
**Tempo estimado:** 2-3 horas
**Impacto:** Mínimo

```typescript
// Para cada página com problema:
export const dynamic = 'force-dynamic';

// Para componentes com DOM:
const ProblematicComponent = dynamic(
  () => import('./Component'),
  { ssr: false }
);
```

**Prós:**
- Build passa imediatamente
- Maioria das páginas mantém SSG
- Performance preservada

**Contras:**
- Páginas affected perdem SSG
- Precisa aplicar em ~10 páginas

### Opção B: Desabilitar SSG Globalmente
**Tempo estimado:** 5 minutos
**Impacto:** Alto

```typescript
// next.config.mjs
export default {
  output: 'export', // ou 'standalone'
  // Força tudo ser dynamic
}
```

**Prós:**
- Solução rápida
- Sem análise página-a-página

**Contras:**
- Perde SSG em TODAS as páginas
- Performance degradada
- SEO impactado

### Opção C: Remover Dependências Problemáticas
**Tempo estimado:** 1-2 semanas
**Impacto:** Alto

- Remover react-type-animation
- Remover @react-three (265 componentes afetados)
- Simplificar animações
- Rebuild UI sem framer-motion

**Prós:**
- Bundle menor
- Build mais rápido
- Menos complexidade

**Contras:**
- Refatoração massiva
- Perda de features visuais

---

## 7. PLANO DE AÇÃO IMEDIATO

### Fase 1: Build Funcional (30min)
1. Adicionar `export const dynamic = 'force-dynamic'` nas 10 páginas sem proteção
2. Testar build completo
3. Documentar páginas que ainda falharem

### Fase 2: Otimização (2h)
1. Lazy load componentes com Three.js (dynamic import + ssr:false)
2. Lazy load TypeAnimation
3. Re-habilitar worker threads

### Fase 3: Restauração (1h)
1. Re-habilitar edge runtime (se possível)
2. Restaurar Analytics/MetaPixel no layout
3. Testes E2E

---

## 8. GARGALOS ARQUITETURAIS (Visão Macro)

### Complexidade Desnecessária
- 265 componentes para site de conversão
- 64+ dependências pesadas (animations, 3D, analytics)
- Múltiplas bibliotecas para mesma função (animações)

### Dependências Conflitantes
- Next.js 15 + Three.js/framer-motion = SSR hell
- PostHog + Meta Pixel + Google Analytics = redundância
- Edge runtime + Supabase realtime = incompatibilidade

### Build Performance
- 108s compilação (target: <30s)
- 2.4GB node_modules (target: <500MB)
- Worker threads causam DataCloneError

---

## 9. RECOMENDAÇÃO FINAL

**Ação Imediata:** Aplicar Opção A (Fix Cirúrgico)

**Refatoração Estratégica (Médio Prazo):**
1. Audit de dependências (remover 50%+)
2. Consolidar bibliotecas de animação (só framer-motion OU gsap)
3. Remover Three.js de páginas não-críticas
4. Simplificar analytics (PostHog OU Meta, não ambos)

**Resultado Esperado:**
- Build time: 108s → ~40s
- node_modules: 2.4GB → ~800MB
- Componentes: 265 → ~80
- Build passa sem erros

---

## 10. COMANDOS ÚTEIS

```bash
# Build atual (com erros)
pnpm run build

# Análise de bundle
ANALYZE=true pnpm run build

# Verificar dependências não usadas
npx knip

# Audit de segurança
pnpm audit

# Limpar tudo e rebuildar
pnpm clean:all && pnpm install && pnpm run build
```

---

**Próximo passo:** Executar Fase 1 do Plano de Ação?
