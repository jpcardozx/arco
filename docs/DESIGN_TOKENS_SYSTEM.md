# Design Tokens System - ARCO Landing Pages

**Data**: 18 de outubro de 2025  
**Fonte**: HeroSection.tsx (Refinado e Aprovado)  
**Status**: ✅ PADRÃO OFICIAL

---

## 🎨 1. COLOR SYSTEM

### Dark Mode (Backgrounds)
```tsx
// Primary Background (Hero, sections escuras)
bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Secondary Background (Alternating sections)
bg-gradient-to-br from-slate-900 via-slate-800/95 to-slate-900
```

### Light Mode (Backgrounds)
```tsx
// Primary Background (sections claras)
bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40

// Secondary Background (alternating)
bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20
```

### Opacity Scale (Refined)
```tsx
// Ultra-Subtle (overlays, textures)
/[0.03] → 3% opacity

// Subtle (cards, borders primary)
/[0.06] → 6% opacity

// Medium (hover states, borders hover)
/[0.08] → 8% opacity - PRIMARY BORDER
/[0.12] → 12% opacity - HOVER BORDER

// Emphasis (accents, highlights)
/[0.18] → 18% opacity
/[0.24] → 24% opacity
```

### Dynamic Color Variables
```tsx
// From useCampaignColors hook
colors.primary.solid    // Cor primária da campanha
colors.secondary.solid  // Cor secundária da campanha

// Gradients
backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`

// Icons with dynamic color
style={{ color: colors.primary.solid }}

// Background with opacity
style={{ backgroundColor: colors.primary.solid }}
className="opacity-[0.08]"

// Borders with dynamic color
style={{ border: `1px solid ${colors.primary.solid}30` }} // 30 = 18.8% opacity
```

---

## 📐 2. SPACING SYSTEM

### Section Padding (Responsive)
```tsx
// Vertical Padding (py)
py-16 sm:py-20 md:py-24 lg:py-32

// Breakdown:
mobile (default): py-16 → 64px
sm (640px+):      py-20 → 80px
md (768px+):      py-24 → 96px
lg (1024px+):     py-32 → 128px
```

### Horizontal Padding (Responsive)
```tsx
// Section Container (px)
px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20

// Breakdown:
mobile (default): px-4  → 16px
sm (640px+):      px-6  → 24px
md (768px+):      px-8  → 32px
lg (1024px+):     px-12 → 48px
xl (1280px+):     px-16 → 64px
2xl (1536px+):    px-20 → 80px
```

### Element Spacing (Gap)
```tsx
// Between major sections
space-y-8 sm:space-y-10 md:space-y-12

// Cards/Items in grid
gap-4 sm:gap-6 md:gap-8

// Between icon and text
gap-2.5 → 10px (standard)
gap-3   → 12px (comfortable)

// List items
space-y-2.5 → 10px between items
space-y-3   → 12px between items
```

### Card Internal Padding
```tsx
// Collapsible trigger
px-5 py-3.5 → Horizontal 20px, Vertical 14px

// Card content
px-5 py-4 → Horizontal 20px, Vertical 16px

// Status badge
px-3.5 py-1.5 → Horizontal 14px, Vertical 6px
```

---

## 🔤 3. TYPOGRAPHY SYSTEM

### Font Sizes (Responsive Headlines)
```tsx
// H1 - Main Hero Title
text-3xl sm:text-4xl md:text-5xl lg:text-6xl

// Breakdown:
mobile:  text-3xl → 30px / 36px line-height
sm:      text-4xl → 36px / 40px
md:      text-5xl → 48px / 1
lg:      text-6xl → 60px / 1

// H2 - Section Titles
text-2xl sm:text-3xl md:text-4xl lg:text-5xl

// Breakdown:
mobile:  text-2xl → 24px / 32px
sm:      text-3xl → 30px / 36px
md:      text-4xl → 36px / 40px
lg:      text-5xl → 48px / 1
```

### Body Text
```tsx
// Paragraph (Hero subtitle, section descriptions)
text-base sm:text-lg md:text-xl

// Breakdown:
mobile:  text-base → 16px / 24px
sm:      text-lg   → 18px / 28px
md:      text-xl   → 20px / 28px

// Small text (feature descriptions, captions)
text-sm → 14px / 20px
text-xs → 12px / 16px
```

### Font Weights
```tsx
font-bold      → 700 (Títulos principais)
font-semibold  → 600 (Sub-títulos, labels)
font-medium    → 500 (Body emphasis, badges)
font-normal    → 400 (Body text padrão)
```

### Text Colors (Dark Mode)
```tsx
// Headlines
text-white

// Body primary
text-slate-400

// Body secondary (descriptions, captions)
text-slate-500

// Accents
text-emerald-400/80 → Success indicators
```

### Text Colors (Light Mode)
```tsx
// Headlines
text-slate-900

// Body primary
text-slate-700

// Body secondary
text-slate-600

// Accents
text-blue-600 → Primary accent
text-emerald-600 → Success
```

### Typography Utilities
```tsx
// Line height
leading-[1.1]     → Tight (headlines)
leading-relaxed   → 1.625 (body text)

// Tracking
tracking-tight    → -0.025em (large headlines)
tracking-wide     → 0.025em (badges, labels)

// Text alignment
text-center       → Centered (hero, section titles)
text-left         → Left (collapsible content, lists)
```

---

## 🎭 4. ANIMATION SYSTEM

### Motion Variants
```tsx
// Standard easing (all animations)
ease: [0.22, 1, 0.36, 1] // Expo Out easing

// Entrance animations
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}

// Stagger delays
delay: 0.1  → First element
delay: 0.2  → Second element
delay: 0.3  → Third element
```

### Transition Durations
```tsx
duration: 0.3  → Quick (hover, toggle)
duration: 0.6  → Medium (badge entrance)
duration: 0.7  → Standard (section elements)
```

### Collapsible Animations
```tsx
// Open/Close animation
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
```

### Hover States
```tsx
// Cards/Buttons
hover:bg-white/[0.06]
hover:border-white/[0.12]
transition-all duration-300

// Icons
transition-transform duration-300
rotate-180 // For chevron
```

---

## 📦 5. COMPONENT PATTERNS

### Cards (Dark Mode)
```tsx
className="
  rounded-xl 
  bg-white/[0.03] 
  border border-white/[0.08] 
  hover:bg-white/[0.06] 
  hover:border-white/[0.12] 
  transition-all duration-300
"
```

### Cards (Light Mode)
```tsx
className="
  rounded-xl 
  bg-white 
  border border-slate-200 
  hover:border-slate-300 
  shadow-sm hover:shadow-md 
  transition-all duration-300
"
```

### Icon Containers
```tsx
// With dynamic gradient
<div 
  className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br"
  style={{
    backgroundImage: `linear-gradient(135deg, ${colors.primary.solid}20 0%, ${colors.secondary.solid}20 100%)`,
    border: `1px solid ${colors.primary.solid}30`
  }}
>
  <Icon className="w-4 h-4" style={{ color: colors.primary.solid }} />
</div>
```

### Status Badges
```tsx
<div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
  <span className="text-xs font-medium text-slate-400 tracking-wide">
    Status Text
  </span>
</div>
```

### Gradient Text
```tsx
<span 
  className="bg-clip-text text-transparent bg-gradient-to-r"
  style={{
    backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
  }}
>
  Gradient Text
</span>
```

### Buttons (Primary CTA)
```tsx
<Button
  size="lg"
  className="h-12 px-8 text-base font-semibold rounded-xl bg-gradient-to-r shadow-lg hover:shadow-xl transition-all duration-300"
  style={{
    backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
  }}
>
  CTA Text
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>
```

### Buttons (Secondary)
```tsx
<Button
  variant="outline"
  size="lg"
  className="h-12 px-8 text-base font-semibold rounded-xl border-2 border-white/[0.12] hover:bg-white/[0.06] text-white transition-all duration-300"
>
  Secondary Action
</Button>
```

---

## 🎯 6. LAYOUT CONSTRAINTS

### Content Max-Width
```tsx
// Hero H1
max-w-4xl mx-auto  → 896px centered

// Hero Paragraph, Collapsibles
max-w-3xl mx-auto  → 768px centered

// CTAs container
max-w-md mx-auto   → 448px centered

// Section container (standard)
max-w-6xl mx-auto  → 1152px centered

// Wide sections (previews, grids)
max-w-7xl mx-auto  → 1280px centered
```

### Container Pattern
```tsx
// Standard section wrapper
<div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</div>
```

### Full-Width Sections
```tsx
// For sections that need edge-to-edge backgrounds
<section className="relative w-full min-h-[100svh]">
  <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
    {/* Content with responsive padding */}
  </div>
</section>
```

---

## 🌈 7. BACKGROUND PATTERNS

### Texture Overlay (Subtle)
```tsx
<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
```

### Gradient Orbs (Dynamic)
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div 
    className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
    style={{ backgroundColor: colors.primary.solid }}
  />
  <div 
    className="absolute bottom-[25%] left-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.06]"
    style={{ backgroundColor: colors.secondary.solid }}
  />
</div>
```

---

## 📋 8. COPY STANDARDS

### Tone of Voice
- **Direto e conversacional**: "Você sabe quanto vai faturar na semana que vem"
- **Evitar jargões**: "Agenda sempre cheia" vs "Otimização de taxa de ocupação"
- **Resultados concretos**: "Reduz falta em 73%" vs "Melhora comparecimento"
- **Urgência sem pressão**: "Vagas Limitadas • Outubro 2025"

### Headline Formula
```
[Benefício Claro] + [Resultado Específico/Número]

✅ "Sistema Completo de Captura Automatizada"
✅ "Veja sua página em 60 segundos"
❌ "Plataforma inovadora de gestão"
```

### Feature Description Pattern
```
[Título Curto] → [Descrição do Benefício Real]

✅ "Agenda sempre cheia"
   "Cliente encontra você no Google, agenda direto. Sem ficar respondendo WhatsApp o dia todo."

❌ "Agendamento online"
   "Nossa plataforma oferece funcionalidade de agendamento."
```

### CTA Best Practices
```
✅ "Quero Minha Página Agora" (ação + benefício)
✅ "Ver Como Funciona" (baixa fricção)
❌ "Enviar" (genérico)
❌ "Clique Aqui" (sem contexto)
```

---

## 🔧 9. IMPLEMENTATION CHECKLIST

### Para cada nova seção:

#### ✅ Layout
- [ ] Padding responsivo: `py-16 sm:py-20 md:py-24 lg:py-32`
- [ ] Container: `px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20`
- [ ] Max-width apropriado com `mx-auto`
- [ ] Full-width background se necessário

#### ✅ Typography
- [ ] H2: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- [ ] Paragraph: `text-base sm:text-lg md:text-xl`
- [ ] Cor: `text-white` (dark) ou `text-slate-900` (light)
- [ ] Line-height: `leading-[1.1]` (títulos) ou `leading-relaxed` (body)

#### ✅ Colors
- [ ] Background: Dark (`from-slate-950`) ou Light (`from-slate-50`)
- [ ] Cards: `bg-white/[0.03]` e `border-white/[0.08]`
- [ ] Hover: `hover:bg-white/[0.06]` e `hover:border-white/[0.12]`
- [ ] Gradient text com `colors.primary.solid` e `colors.secondary.solid`

#### ✅ Animation
- [ ] Motion initial: `{{ opacity: 0, y: 20 }}`
- [ ] Easing: `ease: [0.22, 1, 0.36, 1]`
- [ ] Durations: 0.3s (hover), 0.7s (entrance)
- [ ] Stagger delays: 0.1, 0.2, 0.3

#### ✅ Components
- [ ] Icon containers com gradient dinâmico
- [ ] Status badges com pulse indicator
- [ ] CTAs com `ArrowRight` icon
- [ ] Cards com hover states

#### ✅ Copy
- [ ] Headline direta com número/benefício
- [ ] Features com título + descrição conversacional
- [ ] CTAs com ação + contexto
- [ ] Sem jargões técnicos

---

## 📚 10. EXAMPLES BY SECTION TYPE

### Dark Section (Full-Width)
```tsx
<section className="relative w-full min-h-[100svh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
  {/* Texture */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
  
  {/* Orbs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]" style={{ backgroundColor: colors.primary.solid }} />
  </div>
  
  {/* Content */}
  <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
    {/* Section content */}
  </div>
</section>
```

### Light Section (Contained)
```tsx
<div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
  <div className="max-w-6xl mx-auto">
    {/* Section content */}
  </div>
</div>
```

---

**Última Atualização**: 18/10/2025  
**Aprovado por**: Hero Section Refinement Complete  
**Status**: 🟢 PRODUCTION READY
