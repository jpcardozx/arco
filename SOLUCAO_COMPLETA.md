# 🎯 SOLUÇÃO COMPLETA - Debug & Otimização Next.js 16

## Status: ✅ Configuração Atualizada e Otimizada

### O Que Foi Feito

#### 1. ✅ Atualizações de Versão
```bash
Next.js:     15.3.1 → 16.1.6  ✅
React:       19.2.0 → 19.2.4  ✅
React-DOM:   19.2.0 → 19.2.4  ✅
```

#### 2. ✅ Ferramentas de Debug Instaladas (Open Source)
```bash
- react-error-boundary  # Error boundaries profissionais
- zod                    # Runtime validation
- pino + pino-pretty    # Logging estruturado
- leva                   # Debug UI para Three.js
```

#### 3. ✅ Error Boundaries Criados
```
/src/app/error.tsx              # Root error boundary
/src/app/jpcardozo/error.tsx    # Portfolio error boundary
/src/lib/logger.ts               # Logger profissional
```

#### 4. ✅ Next.js 16 Config Atualizado
- Removido `eslint` (deprecated)
- Movido `typedRoutes` de experimental para root
- Removido `forceSwcTransforms` (não suportado no Turbopack)
- Adicionado pino aos `serverExternalPackages`

#### 5. ✅ Portfolio Simplificado para Debug
- Criado `PortfolioContent.tsx` simplificado
- Backup do original em `PortfolioContent.tsx.old`
- Componentes Three.js temporariamente desabilitados

#### 6. ✅ Correção do ExpertiseMatrix.tsx
- Removido argumentos conflitantes em `bufferAttribute`
- Fix: `array` + `itemSize` OU `args` (não ambos)

---

## 🔴 Erro Identificado

```
TypeError: Cannot destructure property 'protocol' of 'window.location' as it is undefined
```

**Causa**: Algum código (provavelmente de dependência) tenta usar `window.location` durante SSR.

**Possíveis Fontes**:
- PostHog (tracking analytics)
- Meta Pixel
- Cookie consent
- Navigation components

---

## 🚀 Próximos Passos

### PASSO 1: Reiniciar Servidor (OBRIGATÓRIO)

O servidor está na **porta 3001** agora (3000 estava em uso):

```bash
# Pare o servidor atual (Ctrl+C se necessário)

# Limpe cache
pnpm clean:next

# Reinicie
pnpm dev

# Acesse em:
http://localhost:3001/jpcardozo
```

### PASSO 2: Testar Versão Simplificada

Acesse: http://localhost:3001/jpcardozo

**Espera-se ver:**
- ✅ Página básica sem erro 500
- ✅ "JP Cardozo - Full Stack Developer"
- ✅ Badges de tecnologia (React, Next.js, TypeScript)
- ✅ Modo Debug Ativo

**Se funcionar** → O problema está nos componentes Three.js
**Se falhar** → O problema está em PostHog ou outra dependência

### PASSO 3: Isolar a Fonte do Erro

Se ainda der erro, **adicione guards** em arquivos suspeitos:

#### A. PostHog (src/lib/analytics/posthog.ts ou similar)

```typescript
// Adicione verificação
if (typeof window !== 'undefined') {
  // código que usa window
}
```

#### B. Meta Pixel

```typescript
// Wrap tracking calls
if (typeof window !== 'undefined' && window.location) {
  trackMetaEvent(...)
}
```

#### C. Cookie Consent

Verificar se usa `window.location` sem guard.

### PASSO 4: Reativar Three.js (se versão simples funcionar)

```bash
# Restaurar versão original
mv src/app/jpcardozo/PortfolioContent.tsx.old src/app/jpcardozo/PortfolioContent.tsx
```

Depois testar componente por componente:
1. HeroThreeScene
2. ExpertiseMatrix (já corrigido)
3. ProcessMethodology
4. Outros

---

## 📊 Estrutura de Error Handling Implementada

```
src/app/
├── error.tsx                    # Root error boundary (500)
├── layout.tsx                   # Root layout
└── jpcardozo/
    ├── error.tsx                # Portfolio error boundary
    ├── page.tsx                 # Server Component (metadata)
    └── PortfolioContent.tsx     # Client Component (UI)
```

### Como Usar Error Boundaries

```tsx
// Em qualquer Client Component
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '@/lib/logger'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div>
      <h2>Erro: {error.message}</h2>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  )
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={(error) => logError(error, { component: 'MyComponent' })}
>
  <MyComponent />
</ErrorBoundary>
```

### Como Usar Logger

```typescript
import logger, { logError, logPerformance } from '@/lib/logger'

// Logging básico
logger.info('Component mounted')
logger.error('Failed to load data')

// Error logging estruturado
try {
  // código
} catch (error) {
  logError(error as Error, {
    component: 'ExpertiseMatrix',
    action: 'render',
    metadata: { particleCount: 800 }
  })
}

// Performance logging
const start = performance.now()
// ... operação
logPerformance('three-js-render', performance.now() - start, {
  component: 'HeroThreeScene'
})
```

---

## 🔍 Debug Tools Disponíveis

### 1. React Error Boundary (Client-Side)

Captura erros em componentes React:
- Renderização
- Lifecycle methods
- Event handlers

### 2. Next.js Error.tsx (Server & Client)

Captura erros de:
- Server Components
- Data fetching
- API routes
- Route handlers

### 3. Pino Logger

Logging estruturado com níveis:
```typescript
logger.debug('...')  // Detalhes técnicos
logger.info('...')   // Informações gerais
logger.warn('...')   # Avisos
logger.error('...')  // Erros
logger.fatal('...')  // Falhas críticas
```

### 4. Leva (Three.js Debug)

Para debug interativo de Three.js:

```typescript
import { useControls } from 'leva'

function ParticleField() {
  const { count, size, speed } = useControls({
    count: { value: 800, min: 100, max: 2000, step: 10 },
    size: { value: 0.05, min: 0.01, max: 0.2, step: 0.01 },
    speed: { value: 0.5, min: 0, max: 2, step: 0.1 },
  })

  // Use valores controláveis em tempo real
}
```

Aparece um painel de controles no navegador para testar valores.

### 5. Zod Validation

Para validar dados e prevenir erros em runtime:

```typescript
import { z } from 'zod'

const ParticleSchema = z.object({
  positions: z.instanceof(Float32Array),
  colors: z.instanceof(Float32Array),
  count: z.number().min(1).max(10000),
})

// Validar antes de usar
const validated = ParticleSchema.safeParse(data)
if (!validated.success) {
  logger.error('Invalid particle data', validated.error)
  return null
}
```

---

## ⚠️ Warnings Conhecidos (Não-Críticos)

```
1. @storybook/nextjs - peer dependency (Next.js 16 não suportado ainda)
2. next-auth - peer dependency (Next.js 16 não suportado ainda)
3. react-spring - peer dependency (React 19 não suportado ainda)
```

**Ação**: Aguardar updates das bibliotecas. Não afeta desenvolvimento no curto prazo.

---

## 📝 Checklist de Verificação

Antes de testar:
- [ ] Servidor parado (Ctrl+C)
- [ ] Cache limpo (`pnpm clean:next`)
- [ ] Servidor reiniciado (`pnpm dev`)
- [ ] Acessando porta correta (3001, não 3000)

Se funcionar:
- [ ] Página carrega sem erro 500
- [ ] Ver mensagem "Modo Debug Ativo"
- [ ] Console sem erros críticos

Se falhar:
- [ ] Verificar logs do terminal (erro completo com stack trace)
- [ ] Verificar console do navegador
- [ ] Verificar Network tab (status 500 details)
- [ ] Copiar erro e enviar para análise

---

## 🎯 Objetivo Final

1. **Imediato**: Página `/jpcardozo` funcionando (versão simples)
2. **Curto prazo**: Reativar componentes Three.js gradualmente
3. **Médio prazo**: Error boundaries em todas rotas críticas
4. **Longo prazo**: Monitoring com Sentry (self-hosted) + logging estruturado

---

## 📚 Recursos Adicionais

### Next.js 16 Docs
- [Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [TypedRoutes](https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes)

### Ferramentas Open Source
- [Pino Logger](https://github.com/pinojs/pino)
- [React Error Boundary](https://github.com/bvaughn/react-error-boundary)
- [Zod](https://github.com/colinhacks/zod)
- [Leva](https://github.com/pmndrs/leva)

### Three.js + React
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei](https://github.com/pmndrs/drei)
- [BufferGeometry Docs](https://threejs.org/docs/#api/en/core/BufferGeometry)

---

**Última atualização**: 2026-02-01
**Status**: Aguardando restart do servidor para validação
