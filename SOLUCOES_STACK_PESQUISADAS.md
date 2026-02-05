# SOLUÇÕES BASEADAS EM PESQUISA - STACK OPTIMIZATION

**Data:** 2025-10-28
**Contexto:** Next.js 15 + React 19 + bibliotecas problemáticas (SSR/SSG)

---

## 1. PROBLEMA: react-type-animation + Next.js 15 SSR

### ✅ Solução Oficial (react-type-animation docs)

```typescript
// components/AnimatedText.tsx
'use client';

import { TypeAnimation } from 'react-type-animation';

export const AnimatedText = () => {
  return (
    <TypeAnimation
      sequence={['Text 1', 1000, 'Text 2', 1000]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      preRenderFirstString={true} // ✅ CHAVE: SEO benefit + SSR support
    />
  );
};

// app/page.tsx
import dynamic from 'next/dynamic';

const AnimatedText = dynamic(
  () => import('@/components/AnimatedText'),
  { ssr: false } // Carrega apenas no client
);
```

**Benefícios:**
- ✅ `preRenderFirstString={true}` → primeira string renderizada no HTML (SEO)
- ✅ Zero `appendChild` errors
- ✅ Lighthouse score mantido

---

## 2. PROBLEMA: Framer Motion SSR + Bundle Size

### 🎯 Alternativas Leves Pesquisadas

#### Opção A: Motion One (by Framer creators)
```typescript
// Biblioteca: motion (não framer-motion)
// Bundle: ~5KB (vs 50KB+ framer-motion)

import { animate } from "motion"

animate(
  "#target",
  { opacity: [0, 1], y: [50, 0] },
  { duration: 0.3, easing: "ease-out" }
)
```

**Trade-off:**
- ✅ 90% menor que framer-motion
- ✅ SSR-safe por padrão
- ❌ API diferente (migração necessária)

#### Opção B: AutoAnimate
```typescript
import { useAutoAnimate } from '@formkit/auto-animate/react'

function MyComponent() {
  const [parent] = useAutoAnimate()
  return <div ref={parent}>{/* content */}</div>
}
```

**Benefícios:**
- ✅ Zero config
- ✅ 3KB total
- ✅ SSR-safe
- ❌ Menos controle sobre animações

#### Opção C: React Spring (Production-ready)
```typescript
import { useSpring, animated } from '@react-spring/web'

function MyComponent() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })
  return <animated.div style={props}>Content</animated.div>
}
```

**Características:**
- ✅ Bundle: ~15KB
- ✅ Physics-based (natural)
- ✅ SSR support oficial
- ✅ TypeScript nativo

### 📊 Comparação: Framer Motion vs Alternativas

| Biblioteca | Bundle Size | SSR Support | TypeScript | Manutenção |
|------------|-------------|-------------|------------|------------|
| Framer Motion | ~50KB | Sim* | ✅ | Alta |
| Motion One | ~5KB | ✅ | ✅ | Alta |
| React Spring | ~15KB | ✅ | ✅ | Alta |
| AutoAnimate | ~3KB | ✅ | ✅ | Média |
| CSS + Tailwind | 0KB | ✅ | N/A | N/A |

*Framer Motion funciona com SSR, mas causa problemas com worker threads no Next.js 15

---

## 3. PROBLEMA: Three.js + @react-three/fiber SSR

### 🎯 Alternativas Leves

#### Opção A: Pixi.js (2D rendering)
```typescript
// Para efeitos visuais 2D (partículas, backgrounds)
// Bundle: ~350KB (vs 600KB+ Three.js)

import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
  width: 800,
  height: 600,
  transparent: true
})
```

**Uso recomendado:**
- Backgrounds animados
- Particle effects
- Efeitos 2D premium

#### Opção B: Anime.js (lightweight)
```typescript
// Para animações complexas sem 3D
// Bundle: ~9KB

import anime from 'animejs/lib/anime.es.js';

anime({
  targets: '.element',
  translateY: [100, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1200
});
```

#### Opção C: CSS 3D Transforms + GPU
```css
/* Zero JS, 100% GPU accelerated */
.card {
  transform: perspective(1000px) rotateY(45deg);
  transform-style: preserve-3d;
  will-change: transform;
}
```

**2025 Trend:** CSS animations com `transform` e `opacity` (GPU-accel) + minimal JS

---

## 4. PROBLEMA: DataCloneError (Worker Threads + Next.js 15)

### ✅ Solução Confirmada (GitHub Issue #69096)

```javascript
// next.config.mjs
export default {
  experimental: {
    // workerThreads: true, // ❌ DESABILITAR temporariamente
    // cpus: 4,
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Fix para serialização
      config.output.publicPath = "";
    }
    return config;
  },
}
```

**Alternativa sem perder paralelização:**
```javascript
// Usar apenas em produção
experimental: {
  workerThreads: process.env.NODE_ENV !== 'production',
}
```

---

## 5. RECOMENDAÇÕES FINAIS BASEADAS EM PESQUISA

### 🎯 Stack Otimizada 2025 para Next.js 15

#### Animações (substituir múltiplas libs por UMA)
```json
{
  "dependencies": {
    // ANTES (redundante):
    "framer-motion": "^11.x",           // 50KB
    "react-type-animation": "^3.x",     // 8KB
    "@lottiefiles/react-lottie": "^3.x", // 80KB

    // DEPOIS (consolidado):
    "motion": "^11.x",                  // 5KB - replace framer-motion
    // OU
    "@react-spring/web": "^9.x",        // 15KB - physics-based

    // Typing: usar CSS + JS puro
    // Lottie: manter apenas se necessário
  }
}
```

#### 3D/Efeitos Visuais
```json
{
  "dependencies": {
    // ANTES:
    "three": "^0.x",                    // 600KB
    "@react-three/fiber": "^9.x",       // 100KB
    "@react-three/drei": "^10.x",       // 200KB

    // DEPOIS:
    "pixi.js": "^8.x",                  // 350KB (2D only)
    "anime.js": "^3.x",                 // 9KB (complex animations)
    // + CSS 3D transforms (0KB)
  }
}
```

#### Analytics (consolidar)
```json
{
  "dependencies": {
    // ANTES:
    "posthog-js": "^1.x",
    "@vercel/analytics": "^1.x",
    // + Meta Pixel inline

    // DEPOIS (escolher UM):
    "posthog-js": "^1.x"  // Se precisa session replay
    // OU
    "@vercel/analytics": "^1.x"  // Se só precisa métricas
  }
}
```

---

## 6. PLANO DE MIGRAÇÃO (Priorizado)

### Fase 1: Quick Wins (1-2h)
```bash
# 1. Desabilitar worker threads (já feito)
# 2. Dynamic imports para componentes problemáticos
# 3. Adicionar preRenderFirstString em TypeAnimation
```

### Fase 2: Substituir bibliotecas (4-6h)
```bash
# 1. Framer Motion → Motion One
pnpm remove framer-motion
pnpm add motion

# 2. Consolidar analytics (escolher 1)
# 3. Remover Three.js de páginas não-críticas
```

### Fase 3: CSS-first approach (1 semana)
```bash
# 1. Migrar 80% das animações para CSS + Tailwind
# 2. Usar Anime.js apenas para timeline complexas
# 3. Pixi.js apenas para hero sections premium
```

---

## 7. CONFIGURAÇÃO NEXT.JS 15 OTIMIZADA (Baseada em Pesquisa)

```javascript
// next.config.mjs - Production-ready 2025
export default {
  reactStrictMode: true,

  // Server-side externals (browser-only libs)
  serverExternalPackages: [
    'posthog-js',
    'pixi.js',
    '@react-spring/web',
  ],

  experimental: {
    typedRoutes: true,
    optimizeCss: true,
    forceSwcTransforms: true,
    scrollRestoration: true,

    // ⚠️ Desabilitar até Next.js 15.1 fix
    // workerThreads: false,

    // Otimizações de bundle
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },

  // Webpack minimal config
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.output.publicPath = ""; // Fix DataCloneError
    }
    return config;
  },

  // Performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        ],
      },
    ];
  },
};
```

---

## 8. MÉTRICAS DE SUCESSO

### Antes (Estado Atual)
- Bundle size: ~2.4GB node_modules
- Build time: 108s
- First Load JS: ~500KB+
- Bibliotecas de animação: 3-4

### Depois (Target)
- Bundle size: ~800MB node_modules (67% redução)
- Build time: ~40s (63% redução)
- First Load JS: ~150KB (70% redução)
- Bibliotecas de animação: 1 (Motion One ou React Spring)

---

## 9. COMANDOS ÚTEIS

```bash
# Análise de bundle atual
ANALYZE=true pnpm run build

# Teste sem worker threads
NODE_OPTIONS='--max-old-space-size=4096' next build

# Verificar deps não usadas
npx knip

# Bundle size de cada lib
npx bundlephobia <package-name>

# Migration helper
npx jscodeshift -t motion-codemod.js src/
```

---

## 10. REFERÊNCIAS

- [Next.js 15 SSR Best Practices](https://nextjs.org/docs/app/building-your-application/rendering)
- [Motion One Docs](https://motion.dev/)
- [React Spring Next.js Guide](https://www.react-spring.dev/)
- [GitHub Issue #69096 - Worker Threads](https://github.com/vercel/next.js/issues/69096)
- [Pixi.js Performance Guide](https://pixijs.com/guides/basics/performance-tips)

---

**Recomendação Final:** Começar com Fase 1 (quick wins) + substituir Framer Motion por Motion One.
Economia estimada: ~200KB bundle + build 40% mais rápido.
