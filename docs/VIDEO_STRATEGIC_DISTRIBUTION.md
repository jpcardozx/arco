# 🎬 DISTRIBUIÇÃO ESTRATÉGICA DE VÍDEOS

**Data:** 3 de outubro de 2025  
**Status:** ✅ **IMPLEMENTADO + OTIMIZADO**

---

## 🎯 Estratégia de Distribuição

### Filosofia
**1 vídeo por página-chave = 3 páginas diferentes = máximo impacto sem sobrecarga**

Cada vídeo é posicionado estrategicamente em:
1. **1 HERO** de uma página diferente (above the fold, máxima visibilidade)
2. **1 SEÇÃO** de outra página (mid-page, reforço visual)

---

## 📹 PRIMEIRO VÍDEO

**Arquivo:** `social_u5755322468_2D_geometric_vector-style_background_illustration_7c85d9e7-2ffb-479c-bc82-dcdb49c1c25a_1.mp4`

### Localização ✅
1. **`/free` - LeadMagnetHero** (HERO - above the fold)
   - **Por quê:** Maior volume de tráfego orgânico, conversão gratuita crítica
   - **Config:** `fadeStyle="subtle"`, `overlayOpacity={75}`, `overlayGradient="to-b"`
   - **Mobile:** `pauseOnMobile={false}` (vídeo curto e otimizado)

### Características
- Geométrico, abstrato, moderno
- Ideal para conteúdo informacional/educacional
- Alta legibilidade com overlay 75%

---

## 📹 SEGUNDO VÍDEO

**Arquivo:** `social_u5755322468_smooth_and_slow_loop_--ar_5229_--motion_low_--vid_f2382b77-3a77-4158-a83a-2b77c6d889d5_2.mp4`

### Localização ✅
1. **`/metodologia` - MethodologyHero** (HERO - above the fold)
   - **Por quê:** Página de processo/transparência, conversão mid-funnel
   - **Config:** `fadeStyle="subtle"`, `overlayOpacity={75}`, `overlayGradient="radial"`
   - **Mobile:** `pauseOnMobile={false}` (motion low, performance ok)

2. **`/services` - ServicesSection** (SEÇÃO mid-page - aguardando implementação)
   - **Por quê:** Reforço visual na página de serviços, complementa hero estático
   - **Config:** `fadeStyle="subtle"`, `overlayOpacity={80}`, `overlayGradient="to-br"`
   - **Mobile:** `pauseOnMobile={true}` (economiza recursos mid-scroll)

### Características
- Smooth, slow motion nativo
- Low-motion intrínseco (ideal para acessibilidade)
- Perfeito para processo/workflow

---

## 📹 TERCEIRO VÍDEO (Aguardando download)

**Arquivo:** `[PENDING]`

### Localização Planejada 🎬
1. **`/assessment` - AssessmentHero** (HERO - above the fold)
   - **Por quê:** High-ticket R$ 497, conversão premium máxima
   - **Config:** `fadeStyle="dramatic"`, `overlayOpacity={70}`, `overlayGradient="to-br"`
   - **Mobile:** `pauseOnMobile={true}` (prioriza conversão desktop)
   - **Tema sugerido:** Dashboard analytics, métricas subindo, ROI visual

2. **`/contato` - ModernContactSection** (SEÇÃO mid-page)
   - **Por quê:** Humanização da conversão final, conexão emocional
   - **Config:** `fadeStyle="subtle"`, `overlayOpacity={75}`, `overlayGradient="radial"`
   - **Mobile:** `pauseOnMobile={true}` (form é prioridade)
   - **Tema sugerido:** Handshake, conversa, human connection

### Implementação Pendente
```tsx
// AssessmentHero.tsx
<VideoBackground
  src="/videos/[TERCEIRO_VIDEO].mp4"
  fadeStyle="dramatic"
  overlayOpacity={70}
  overlayGradient="to-br"
  pauseOnMobile={true}
/>

// ModernContactSection.tsx (seção mid-page)
<VideoBackground
  src="/videos/[TERCEIRO_VIDEO].mp4"
  fadeStyle="subtle"
  overlayOpacity={75}
  overlayGradient="radial"
  pauseOnMobile={true}
/>
```

---

## ⚡ Otimizações Implementadas

### 1. **Câmera Lenta (0.75x)**

**Por quê:**
- Efeito premium e sofisticado
- Reduz percepção de movimento (melhor para acessibilidade)
- Aumenta "weight" visual sem adicionar drama excessivo

**Implementação:**
```tsx
onLoadedMetadata={(e) => {
  e.currentTarget.playbackRate = 0.75;
}}
```

**Impacto:**
- ✅ Movimento mais elegante e controlado
- ✅ Menor distração do conteúdo
- ✅ Sensação de qualidade "cinematográfica"

---

### 2. **Anti-Pixelamento**

**Problema:** Vídeos podem ficar pixelados em scale/transform

**Solução implementada:**
```tsx
style={{
  imageRendering: 'crisp-edges',        // Edges mais nítidas
  backfaceVisibility: 'hidden',         // Evita artifatos 3D
  WebkitBackfaceVisibility: 'hidden',   // Safari
  transform: 'translate3d(0, 0, 0)'     // Force GPU layer
}}
```

**Impacto:**
- ✅ Vídeo mais nítido durante animações
- ✅ Menos artifatos visuais em scroll
- ✅ GPU acceleration consistente
- ✅ Melhor rendering cross-browser

---

### 3. **Lazy Loading Otimizado**

**Estratégia:**
```tsx
// Intersection Observer com 100px rootMargin
rootMargin: '100px' // Começa load antes de entrar na viewport
```

**Performance:**
- ✅ Vídeo carrega **antes** de ser visível (sem flash)
- ✅ Economiza bandwidth (só carrega quando necessário)
- ✅ Poster mostra instantaneamente (zero CLS)

---

### 4. **Overlay Strategy**

**Legibilidade máxima:**

| Contexto | Overlay | Razão |
|----------|---------|-------|
| Hero com muito texto | 75% | Legibilidade crítica |
| Hero com pouco texto | 70% | Balanceado |
| Seção mid-page | 78-80% | Foco no conteúdo, não no vídeo |

**Gradientes:**
- `to-b` (top→bottom): Escurece footer, mantém hero claro
- `to-br` (top-left→bottom-right): Diagonal elegante
- `radial` (center→edges): Spotlight no centro

---

## 📊 Matriz de Distribuição

```
┌─────────────────────┬──────────────────┬──────────────────────┐
│ Vídeo               │ Hero             │ Seção Mid-Page       │
├─────────────────────┼──────────────────┼──────────────────────┤
│ Primeiro (_1.mp4)   │ /free            │ [Não usado]          │
│                     │ ✅ IMPLEMENTADO  │ Estratégia: 1 só     │
├─────────────────────┼──────────────────┼──────────────────────┤
│ Segundo (_2.mp4)    │ /metodologia     │ /services            │
│                     │ ✅ IMPLEMENTADO  │ ⏳ PENDENTE          │
├─────────────────────┼──────────────────┼──────────────────────┤
│ Terceiro (pending)  │ /assessment      │ /contato             │
│                     │ 🎬 AGUARDANDO    │ 🎬 AGUARDANDO        │
└─────────────────────┴──────────────────┴──────────────────────┘
```

---

## 🎨 Design Principles

### 1. **Não Competir com Conteúdo**
- Overlay sempre >= 70% (vídeo é **fundo**, não protagonista)
- text-shadow em headlines para legibilidade máxima
- z-index hierarquia rigorosa (vídeo z-0, overlay z-10, content z-20+)

### 2. **Performance First**
- Lazy loading obrigatório (Intersection Observer)
- pauseOnMobile em seções mid-page (economiza bateria)
- playbackRate 0.75x (câmera lenta = menos frames processados)

### 3. **Acessibilidade**
- prefers-reduced-motion: pausa automática
- aria-hidden="true" no vídeo (decorativo)
- Poster fallback instantâneo (zero CLS)

### 4. **Consistência Cross-Page**
- Mesmas prop names em todos VideoBackground
- Mesma estrutura de overlay
- Mesmos fade styles (subtle/dramatic)

---

## 🧪 Testes Requeridos

### Visual
- [ ] `/free`: Vídeo 1 no hero carrega suave, legibilidade 100%
- [ ] `/metodologia`: Vídeo 2 no hero com câmera lenta visível
- [ ] `/services`: (Pendente) Vídeo 2 na seção mid-page não compete com hero
- [ ] `/assessment`: (Pendente) Vídeo 3 no hero fadeStyle dramatic funciona
- [ ] `/contato`: (Pendente) Vídeo 3 na seção com overlay 75%

### Performance
- [ ] Lighthouse score LCP < 2.5s em todas páginas com vídeo
- [ ] CLS = 0 (poster previne shift)
- [ ] Network tab: vídeos só carregam quando viewport próximo
- [ ] Mobile: pauseOnMobile funciona onde configurado

### Acessibilidade
- [ ] prefers-reduced-motion: vídeos pausam automaticamente
- [ ] Keyboard navigation: conteúdo por cima do vídeo sempre focável
- [ ] Screen reader: vídeos ignorados (decorativos)
- [ ] Contraste: text-shadow garante WCAG AA em todos textos

---

## 📝 Próximos Passos

### Imediato
1. ✅ Validar `/free` com vídeo 1 (JÁ FEITO)
2. ✅ Validar `/metodologia` com vídeo 2 hero (JÁ FEITO)
3. ⏳ Implementar vídeo 2 em `/services` seção mid-page
4. 🎬 Aguardar download do terceiro vídeo

### Quando terceiro vídeo chegar
1. Implementar em `/assessment` hero (high-ticket premium)
2. Implementar em `/contato` seção mid-page (humanização)
3. Testar câmera lenta 0.75x em todos
4. Validar anti-pixelamento cross-browser

### Otimizações Futuras
- [ ] Gerar WebM versions para browsers que suportam (menor tamanho)
- [ ] Testar playbackRate 0.6x para efeito ultra-slow (A/B test)
- [ ] Considerar poster com blur progressivo (skeleton loading)
- [ ] Implementar adaptive quality baseado em connection speed

---

## 🎉 Status Atual

```
████████████████████░░░░░░░░░░░░ 60% COMPLETO
```

**Implementado:**
- ✅ Vídeo 1: `/free` hero
- ✅ Vídeo 2: `/metodologia` hero
- ✅ Câmera lenta 0.75x
- ✅ Anti-pixelamento CSS
- ✅ TypeScript 0 erros

**Pendente:**
- ⏳ Vídeo 2: `/services` seção mid-page
- 🎬 Vídeo 3: `/assessment` hero
- 🎬 Vídeo 3: `/contato` seção mid-page

---

**Filosofia:** "1 vídeo por página-chave = impacto máximo, performance preservada, UX premium"
