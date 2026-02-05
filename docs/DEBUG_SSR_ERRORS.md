# 🔍 Debug de Erros SSR - Guia Senior

## 🎯 Problema Resolvido: Internal Server Error 500

### **Causa Raiz**
Componentes acessando APIs do browser (`window`, `document`, `localStorage`) durante Server-Side Rendering (SSR).

### **Sintomas**
- ✅ Dev server funciona em `pnpm dev`
- ❌ Build falha ou páginas retornam 500
- ❌ Erro genérico "Internal Server Error" sem detalhes

---

## 🛠️ Como Senior Debugga

### **1. Análise de Logs (Método Definitivo)**

```bash
# Terminal onde pnpm dev está rodando mostrará:
Error: window is not defined
  at PremiumHero (./src/components/agendamentos/PremiumHero.tsx:145)
```

### **2. Build Verbose para Ver Stack Trace**

```bash
# Ver stack trace completo
NODE_OPTIONS='--trace-warnings --max-old-space-size=4096' \
NEXT_DEBUG=1 \
pnpm build 2>&1 | tee build-debug.log

# Filtrar erros específicos
grep -A 10 "TypeError" build-debug.log
grep "Error occurred prerendering" build-debug.log
```

### **3. Grep Estratégico - Encontrar Culpados**

```bash
# Buscar acessos unsafe a window
grep -r "window\." src --include="*.tsx" --include="*.ts" \
  | grep -v "typeof window" \
  | grep -v "// "

# Buscar acessos unsafe a document  
grep -r "document\." src --include="*.tsx" --include="*.ts" \
  | grep -v "typeof document" \
  | grep -v "// "

# Buscar Canvas (Three.js) sem ssr: false
grep -r "Canvas" src --include="*.tsx" -A 2 \
  | grep -v "ssr: false"
```

### **4. Teste Isolado de Rota**

```bash
# Testar rota específica
curl -s http://localhost:3000/agendamentos

# Ver resposta completa
curl -i http://localhost:3000/agendamentos
```

---

## ✅ Padrões de Correção

### **Pattern 1: Proteção Simples**
```typescript
// ❌ ERRADO
const width = window.innerWidth

// ✅ CORRETO
const width = typeof window !== 'undefined' ? window.innerWidth : 0
```

### **Pattern 2: useEffect para Side Effects**
```typescript
// ❌ ERRADO
const handleClick = () => {
  document.getElementById('section')?.scrollIntoView()
}

// ✅ CORRETO
const handleClick = () => {
  if (typeof document !== 'undefined') {
    document.getElementById('section')?.scrollIntoView()
  }
}
```

### **Pattern 3: useEffect para Event Listeners**
```typescript
// ❌ ERRADO
window.addEventListener('scroll', handleScroll)

// ✅ CORRETO
useEffect(() => {
  if (typeof window === 'undefined') return
  
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### **Pattern 4: Dynamic Import para Three.js/Canvas**
```typescript
// ❌ ERRADO - Component com Canvas
export function MyComponent() {
  return <Canvas>...</Canvas>
}

// ✅ CORRETO - Dynamic import com ssr: false
const MyComponent = dynamic(() => import('./MyComponent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})
```

### **Pattern 5: Guarda em Renders Condicionais**
```typescript
// ❌ ERRADO
const MyComponent = () => {
  const data = localStorage.getItem('key')
  return <div>{data}</div>
}

// ✅ CORRETO
const MyComponent = () => {
  const [data, setData] = useState<string | null>(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(localStorage.getItem('key'))
    }
  }, [])
  
  return <div>{data}</div>
}
```

---

## 🔧 Next.config Otimizado para Debug

```javascript
const nextConfig = {
  // ... outras configs
  
  // Logging detalhado
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Desabilitar otimizações durante debug
  webpack: (config, { dev, isServer }) => {
    if (isServer && dev) {
      // Ver código real, não minificado
      config.optimization.minimize = false
      
      // Logs de infraestrutura
      config.infrastructureLogging = {
        level: 'error',
        debug: /PackFileCache/,
      }
    }
    
    return config
  },
}
```

---

## 📊 Checklist de Debugging

- [ ] Verificar logs do terminal `pnpm dev`
- [ ] Rodar build verbose: `NODE_OPTIONS='--trace-warnings' pnpm build`
- [ ] Grep por `window.` e `document.` unsafe
- [ ] Verificar componentes com Three.js/Canvas
- [ ] Testar rota isolada com curl
- [ ] Adicionar `typeof window !== 'undefined'` guards
- [ ] Mover lógica browser-only para `useEffect`
- [ ] Usar `dynamic import` com `ssr: false` quando necessário

---

## 🎓 Lições Aprendidas

1. **SSR executa código no servidor** - `window`, `document`, `navigator` não existem
2. **Build errors são mais explícitos** que runtime errors
3. **Grep é seu melhor amigo** para encontrar culpados
4. **TypeScript + typeof guards** = código seguro
5. **useEffect é o local correto** para APIs do browser

---

## 🔗 Recursos

- [Next.js SSR vs CSR](https://nextjs.org/docs/pages/building-your-application/rendering)
- [Dynamic Imports](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading)
- [React useEffect](https://react.dev/reference/react/useEffect)

---

**✅ Status:** Todos os componentes de `/agendamentos` corrigidos
- ✅ `PremiumHero.tsx` 
- ✅ `Hero.tsx`
- ✅ `AgendamentosHero.tsx`
- ✅ `page.tsx`
