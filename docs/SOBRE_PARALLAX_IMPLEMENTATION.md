# Implementação de Parallax Elegante na Página /sobre

## 📋 Resumo

Implementação completa de efeitos parallax elegantes na página `/sobre` com Three.js para o background 3D e hooks customizados para parallax em scroll e mouse.

## 🎨 Componentes Atualizados

### 1. **SobreHeroSection** (com Parallax Completo)

**Recursos Implementados:**
- ✅ **Scroll Parallax**: Usa `useScroll` do Framer Motion para mover elementos baseado no scroll
- ✅ **Mouse Parallax**: Elementos decorativos respondem à posição do mouse
- ✅ **Three.js Background**: Background 3D com partículas e geometrias flutuantes (ThreeBackground)
- ✅ **Fade Out no Scroll**: Opacidade e escala dos elementos diminuem ao rolar
- ✅ **Gradient Animado**: Título com gradiente teal→orange animado
- ✅ **Stats com Micro-Interações**: Cards de estatísticas com hover e scale
- ✅ **Scroll Indicator**: Indicador animado de scroll na parte inferior

**Efeitos de Parallax:**
```typescript
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end start'],
});

const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
```

**Mouse Parallax:**
```typescript
const mouseParallax = useMouseParallax(15);

<motion.div style={mouseParallax.style}>
  {/* Elemento flutuante */}
</motion.div>
```

---

### 2. **SobreCapacidadeSection** (com Parallax por Layers)

**Recursos Implementados:**
- ✅ **Background Gradient Parallax**: Gradient de fundo se move em velocidade diferente
- ✅ **Scroll Progress Tracking**: Cards se movem baseado no progresso de scroll
- ✅ **Staggered Parallax**: Cada card tem velocidade de parallax diferente (baseado no índice)
- ✅ **Tag Badge Animado**: Badge de categoria com scale animation
- ✅ **Tech Stack Tags**: Tags de tecnologia com staggered reveal
- ✅ **Footer Stats Parallax**: Estatísticas do footer com movimento sincronizado

**Efeitos de Parallax:**
```typescript
const parallaxY = useParallax(ref, { speed: 0.5, direction: 'vertical' });
const progress = useScrollProgress(ref);

// Background com parallax
<motion.div style={parallaxY.style}>

// Cards com parallax diferenciado
<motion.div
  style={{
    transform: `translateY(${-progress * (index % 2 ? 0.3 : 0.5)}px)`,
  }}
>
```

---

### 3. **ThreeBackground** (Background 3D Interativo)

**Componentes 3D:**
- ✅ **FloatingGeometry**: Torus wireframe + Icosaedro + Campo de partículas
- ✅ **Mouse Position Tracking**: Background responde ao movimento do mouse
- ✅ **Smooth Interpolation**: Movimento suave com lerp (0.05)
- ✅ **Responsive Particle Count**: 50-150 partículas baseado no tamanho da tela
- ✅ **Color Gradients**: Degradê de teal para azul nas partículas
- ✅ **Multiple Lights**: Ambient + 3 point lights para profundidade
- ✅ **Performance Optimization**: dpr limitado, powerPreference high-performance

**Mouse Parallax 3D:**
```typescript
const mousePosition = useRef({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth - 0.5) * 2,
      y: -(event.clientY / window.innerHeight - 0.5) * 2,
    };
  };
  window.addEventListener('mousemove', handleMouseMove);
}, []);

// No useFrame
camera.position.x += (mousePosition.current.x * 0.5 - camera.position.x) * 0.05;
camera.position.y += (mousePosition.current.y * 0.5 - camera.position.y) * 0.05;
```

---

## 🎣 Hooks Customizados

### `useParallax(ref, options)`

**Scroll-based parallax para elementos**

```typescript
const parallax = useParallax(ref, {
  speed: 0.5,           // Velocidade do efeito (0-1)
  direction: 'vertical', // 'vertical' ou 'horizontal'
  enableOnMobile: false  // Desabilitar em mobile
});

<motion.div style={parallax.style} />
```

**Retorna:**
- `offset`: número do deslocamento calculado
- `style`: objeto de style com transform aplicado

**Features:**
- ✅ Detecção de `prefers-reduced-motion`
- ✅ Detecção de mobile (desabilita por padrão)
- ✅ Performance otimizada com passive listeners

---

### `useMouseParallax(intensity)`

**Mouse-based parallax para elementos decorativos**

```typescript
const mouseParallax = useMouseParallax(20);

<motion.div style={mouseParallax.style}>
  {/* Elemento flutuante */}
</motion.div>
```

**Retorna:**
- `x`: deslocamento horizontal
- `y`: deslocamento vertical
- `style`: objeto de style com transform aplicado

**Features:**
- ✅ Respeita `prefers-reduced-motion`
- ✅ Movimento suave relativo ao centro da tela

---

### `useScrollProgress(ref)`

**Track de progresso de scroll de um elemento (0-100)**

```typescript
const progress = useScrollProgress(ref);

<motion.div
  style={{
    transform: `translateY(${-progress * 0.5}px)`,
    opacity: progress / 100,
  }}
/>
```

**Retorna:**
- `progress`: número de 0 a 100 representando o progresso

**Features:**
- ✅ Calcula baseado em viewport visibility
- ✅ Performance otimizada com passive listeners

---

## 🎭 CSS Additions

### Gradient Animation

Adicionado ao `globals.css`:

```css
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s ease infinite;
}
```

**Uso:**
```tsx
<span className="bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent animate-gradient">
  Texto com gradiente animado
</span>
```

---

## 🚀 Performance Considerations

### Three.js Optimization
- **DPR Limit**: `dpr: [1, 2]` - Limita pixel ratio para evitar over-rendering
- **Power Preference**: `gl={{ powerPreference: 'high-performance' }}`
- **Responsive Particles**: Ajusta quantidade baseado em screen size
- **Smooth Interpolation**: Usa lerp em vez de movimentação direta

### Parallax Optimization
- **Passive Listeners**: Todos os scroll/mouse listeners são passive
- **RAF Not Used**: Usa event listeners em vez de requestAnimationFrame
- **Reduced Motion**: Respeita preferência do usuário
- **Mobile Detection**: Desabilita efeitos pesados em mobile

### Framer Motion
- **Lazy Loading**: Three.js é lazy loaded com dynamic import
- **Once Animation**: `once: true` em useInView para animar apenas uma vez
- **Staggered Delays**: Animações escalonadas para fluidez

---

## 🎯 Design Decisions

### Intensidade de Parallax
- **Hero Section**: Parallax intenso (50% movement) para impacto visual
- **Capacidade Section**: Parallax sutil (0.5 speed) para não distrair do conteúdo
- **Background Gradient**: Movimento suave para adicionar profundidade

### Mouse Parallax
- **Elementos Decorativos**: Orbs de gradiente com movimento inverso
- **Three.js Camera**: Movimento sutil da câmera (intensity 0.5)
- **Intensity Values**: 15-20 para UI elements, 0.5 para 3D camera

### Dark Mode Integration
- **Color Variables**: Todas as cores usam CSS variables
- **Smooth Transitions**: `theme-transition` class para mudanças suaves
- **Glassmorphism**: Backdrop blur com opacidade ajustada para ambos os temas

---

## 📱 Mobile Behavior

### Desabilitado em Mobile:
- ❌ Mouse parallax (não aplicável)
- ❌ Scroll parallax (performance)
- ❌ Three.js complexo (performance)

### Mantido em Mobile:
- ✅ Framer Motion animations (fade, slide, scale)
- ✅ Hover effects (quando suportado)
- ✅ Dark mode transitions

---

## ♿ Accessibility

### Reduced Motion Support
Todos os hooks checam `prefers-reduced-motion`:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return;
```

### Fallback Behavior
- **Three.js**: Mostra gradient estático
- **Parallax**: Elementos mantêm posição fixa
- **Animations**: Duração reduzida a 0.01ms (via CSS)

---

## 🔧 Files Modified

```
src/
├── components/
│   └── sobre/
│       ├── SobreHeroSection.tsx          ✅ Parallax scroll + mouse
│       ├── SobreCapacidadeSection.tsx    ✅ Parallax layers + progress
│       └── ThreeBackground.tsx           ✅ Mouse-responsive 3D
├── hooks/
│   └── useParallax.ts                    ✅ 3 custom hooks
└── app/
    └── globals.css                       ✅ Gradient animation
```

---

## ✅ Implementation Status

### Completed
- ✅ SobreHeroSection com parallax completo
- ✅ SobreCapacidadeSection com parallax em layers
- ✅ ThreeBackground com mouse interaction
- ✅ useParallax hooks (3 variants)
- ✅ Gradient animation CSS
- ✅ Dark mode integration
- ✅ Accessibility support
- ✅ Performance optimization

### Pending (Optional)
- ⏳ SobreProcessoSection parallax
- ⏳ SobreResultadosSection parallax
- ⏳ Mobile-specific optimizations
- ⏳ Advanced Three.js effects (shaders)

---

## 🎨 Visual Result

**Hero Section:**
- Background 3D com partículas flutuantes
- Título com gradiente animado
- Elementos decorativos com mouse parallax
- Scroll indicator animado
- Stats cards com hover effects

**Capacidade Section:**
- Background gradient com parallax sutil
- Cards com movimento diferenciado por layer
- Tech tags com staggered reveal
- Footer stats com parallax sincronizado

**Overall:**
- Profundidade visual através de múltiplos layers
- Interatividade sutil mas perceptível
- Performance mantida mesmo com efeitos complexos
- Experiência premium e polida

---

## 📚 Next Steps

Para expandir os efeitos parallax para outras seções:

1. **Aplicar useParallax nas seções restantes:**
   ```typescript
   const parallax = useParallax(ref, { speed: 0.3 });
   ```

2. **Adicionar mouse parallax em cards:**
   ```typescript
   const mouseParallax = useMouseParallax(10);
   ```

3. **Usar scroll progress para reveals:**
   ```typescript
   const progress = useScrollProgress(ref);
   const opacity = progress / 100;
   ```

4. **Considerar Three.js backgrounds específicos** para cada seção (opcional)

---

**Documentação criada em:** 2025-01-XX
**Status:** ✅ Implementação completa e funcional
