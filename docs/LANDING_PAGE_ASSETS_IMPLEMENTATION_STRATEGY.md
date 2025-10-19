# 🚀 Landing Page Assets Implementation Strategy

**Data**: 2025-10-19
**Versão**: 1.0
**Status**: Em Progresso

---

## 📋 Visão Geral Executiva

### Objetivo Principal
Integrar **4 ícones premium + 3 imagens de alta qualidade** na página inicial do salão de beleza com **estilo Modern Elegant**, mantendo UI/UX premium, responsividade total e performance otimizada.

### Decisões Confirmadas pelo Usuário ✅
```
✅ Ícones (4/4):
  • Figma - Beauty & Spa Icons (🧴)
  • Flaticon - Hair Salon Pack (✂️)
  • Flaticon - Nail Care Pack (✨)
  • Flaticon - Manicure Pack (💅)

✅ Imagens (3/3):
  • Professional Hair Salon Interior - Hero Background (🏢)
  • Luxury Manicure Close-up - Testimonials Section (💎)
  • Professional Beauty Team - Team Section (👥)

✅ Estilo Visual:
  • Modern Elegant (Gradientes suaves + Tipografia premium)
```

---

## 🛠️ Recursos Disponíveis & Estratégia de Uso

### 1. **MCPs (Model Context Protocol)**
**O que são**: Protocolos de integração com ferramentas externas

#### MCPs Pertinentes ao Projeto:
- **chrome-devtools** ✅ (Já ativo)
  - Uso: Testar UI/UX em tempo real, take screenshots, validate responsive
  - Aplicação: Testar cada integração antes/depois

- **figma-remote-mcp** ✅ (Disponível)
  - Uso: Exportar ícones diretamente do Figma Community Pack
  - Aplicação: Download automatizado do Beauty & Spa Icons
  - Comandos: `get_design_context`, `get_screenshot`

**Ação**: Usar figma-remote-mcp para extrair Beauty & Spa Icons do Figma Community Pack

---

### 2. **Agents (Task Sub-agents)**
**O que são**: Agentes especializados que completam tarefas autônomas

#### Agents Pertinentes:
- **general-purpose** ✅
  - Uso: Pesquisa complexa, multi-step tasks, web scraping
  - Aplicação: Pesquisar e validar fontes de assets, verificar disponibilidade

- **Explore** ✅
  - Uso: Exploração de codebases, busca por padrões
  - Aplicação: Analisar estrutura de componentes existentes, encontrar patterns de estilos
  - Nível: `medium` (buscar componentes de imagens, gallery patterns)

**Ação**: Usar Explore Agent para encontrar padrões de galeria/grid existentes no projeto

---

### 3. **Hooks Customizados**
**O que são**: Funções React reutilizáveis para lógica compartilhada

#### Hooks a Criar:
- `useImageOptimization()` - Lazy loading + formato WebP
- `useResponsiveGrid()` - Grid adaptativo por breakpoint
- `useAssetLoader()` - Carregamento progressivo de assets
- `useModernElegantTheme()` - Aplicar estilo visual global

**Ação**: Criar 4 hooks customizados na pasta `/src/hooks/`

---

### 4. **Skills**
**O que são**: Capacidades especializadas (canvas-design disponível)

#### Skills Pertinentes:
- **canvas-design** ✅
  - Uso: Criar visualizações de design system e mockups
  - Aplicação: Gerar visual do layout final com assets integrados
  - Saída: PNG/PDF com design aprovado

**Ação**: Usar canvas-design para criar mockup final do landing page com todos os assets

---

### 5. **Slash Commands**
**O que são**: Atalhos que disparam workflows complexos

#### Commands a Considerar (se necessário criar):
- `/optimize-images` - Otimizar todas as imagens para web
- `/test-responsive` - Testar em múltiplos breakpoints
- `/generate-design-tokens` - Gerar tokens do Modern Elegant style

**Ação**: Verificar se existem; criar se necessário

---

### 6. **Settings/Configurações**
**O que são**: Configurações persistentes do ambiente

#### Settings Relevantes:
- Status line config para Claude Code (se aplicável)
- Preferências de formatação de código
- Temas e paletas de cores configuráveis

**Ação**: Revisar settings existentes; não criar novos

---

## 🏗️ Arquitetura de Implementação

### A. Estrutura de Pastas
```
src/
├── app/
│   ├── page.tsx (LANDING PAGE - Integração Principal)
│   └── choice-make/
│       └── page.tsx (✅ Já criada e pronta)
├── components/
│   ├── landing/
│   │   ├── HeroWithImageSection.tsx (NEW - Com imagem de fundo)
│   │   ├── ServicesIconsGrid.tsx (NEW - Grid de ícones)
│   │   ├── TestimonialsWithImage.tsx (NEW - Com imagem de unhas)
│   │   └── TeamSectionWithImage.tsx (NEW - Com imagem do time)
│   ├── ui/
│   │   └── image-optimized.tsx (NEW - Componente otimizado de imagem)
│   └── sections/ (Existentes)
├── hooks/
│   ├── useImageOptimization.ts (NEW)
│   ├── useResponsiveGrid.ts (NEW)
│   ├── useAssetLoader.ts (NEW)
│   └── useModernElegantTheme.ts (NEW)
├── lib/
│   ├── design-tokens-modern-elegant.ts (NEW)
│   └── asset-manifest.ts (NEW - Registro de assets)
├── public/
│   ├── landing/ (Existente)
│   │   ├── icons/ (NEW - Ícones SVG/PNG)
│   │   │   ├── manicure.svg
│   │   │   ├── nail-care.svg
│   │   │   ├── beauty-spa.svg
│   │   │   └── hair-salon.svg
│   │   └── images/ (NEW - Imagens otimizadas)
│   │       ├── hero-salon-interior.jpg
│   │       ├── testimonials-manicure.jpg
│   │       └── team-professionals.jpg
└── docs/
    ├── LANDING_PAGE_ASSETS_IMPLEMENTATION_STRATEGY.md (THIS FILE)
    ├── DESIGN_SYSTEM_MODERN_ELEGANT.md (NEW)
    └── IMPLEMENTATION_WORKFLOW.md (NEW)
```

### B. Componentes a Criar (Compostos)

#### 1. **HeroWithImageSection.tsx**
```tsx
// Props: backgroundImage, title, subtitle
// Features:
// - Imagem de fundo otimizada
// - Overlay elegante (gradiente)
// - Responsive (mobile: 100vh, tablet: 80vh, desktop: 100vh)
// - Loading state com skeleton
```

#### 2. **ServicesIconsGrid.tsx**
```tsx
// Props: icons: Icon[], columns?: number
// Features:
// - Grid responsivo (1 col mobile, 2 tablets, 4+ desktop)
// - Hover effects elegantes
// - Icons em SVG com fallback PNG
// - Lazy loading por viewport
```

#### 3. **TestimonialsWithImage.tsx**
```tsx
// Props: image, testimonials, layout?: 'side-by-side' | 'stacked'
// Features:
// - Imagem de luxo (manicure close-up)
// - Side-by-side no desktop, stacked no mobile
// - Image placeholder blur effect
```

#### 4. **TeamSectionWithImage.tsx**
```tsx
// Props: image, members, title
// Features:
// - Imagem de equipe profissional
// - Member cards com overlay
// - Responsivo e acessível
```

#### 5. **ImageOptimized.tsx**
```tsx
// Props: src, alt, priority?, fill?, quality?
// Features:
// - Next.js Image component wrapper
// - WebP support
// - Lazy loading
// - Fallback para browsers antigos
// - Blur placeholder automático
```

---

## 📊 Plano de Implementação Faseado

### **Fase 1: Setup & Preparação (1-2 horas)**
- [ ] Criar estrutura de pastas
- [ ] Criar hooks customizados (4 hooks)
- [ ] Criar componentes base vazios (5 componentes)
- [ ] Documentar design tokens do Modern Elegant
- **Saída**: Estrutura pronta para assets

### **Fase 2: Assets & Otimização (2-3 horas)**
- [ ] Baixar 4 ícones das fontes (Figma + Flaticon)
- [ ] Baixar 3 imagens do Unsplash
- [ ] Otimizar ícones (SVG minify, PNG compress)
- [ ] Otimizar imagens (JPEG → WebP, resize, compress)
- [ ] Criar asset manifest (registro de tudo)
- **Saída**: Assets prontos para uso

### **Fase 3: Integração Visual (2-3 horas)**
- [ ] Preencher HeroWithImageSection (hero-salon)
- [ ] Preencher ServicesIconsGrid (4 ícones)
- [ ] Preencher TestimonialsWithImage (manicure)
- [ ] Preencher TeamSectionWithImage (team)
- [ ] Aplicar Modern Elegant styling globalmente
- **Saída**: Page com todos assets integrados

### **Fase 4: QA & Otimização (1-2 horas)**
- [ ] Testar responsividade (mobile/tablet/desktop)
- [ ] Testar performance (Lighthouse)
- [ ] Testar acessibilidade (contrast, semantics)
- [ ] Otimizar Core Web Vitals
- [ ] Testar em múltiplos browsers
- **Saída**: Landing page pronta para produção

### **Fase 5: Documentação & Deploy (30 min - 1 hora)**
- [ ] Documentar workflow completo
- [ ] Criar guia de manutenção
- [ ] Commit & Push (com mensagem clara)
- [ ] Verificar build final
- **Saída**: Documentação + Code committed

---

## 🎨 Design System: Modern Elegant

### Paleta de Cores
```
Primary:
  - Preto/Charcoal: #0F0F1F (backgrounds)
  - Dourado/Amber: #D4AF37 (accents)
  - Branco: #FFFFFF (text)

Secondary:
  - Cinza claro: #F5F5F5 (backgrounds secundários)
  - Cinza escuro: #2A2A3F (borders)

Gradientes:
  - Hero: linear-gradient(135deg, #0F0F1F 0%, #1A1A2E 50%, #0F0F1F 100%)
  - Accent: linear-gradient(135deg, #D4AF37 0%, #E6C757 100%)
  - Text: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)
```

### Tipografia
```
Headlines: 'Poppins' ou 'Playfair Display' (bold, 700)
Body: 'Inter' ou 'Outfit' (regular, 400)
Accents: Letter spacing aumentado (+0.05em)
```

### Espaçamento
```
Base unit: 8px (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
Padding padrão: 24px horizontal, 32px vertical
Border radius: 8px (cards), 12px (buttons), 16px (large elements)
```

### Sombras
```
Light: 0 2px 4px rgba(0, 0, 0, 0.04)
Medium: 0 4px 12px rgba(0, 0, 0, 0.08)
Heavy: 0 12px 32px rgba(0, 0, 0, 0.16)
```

### Animações
```
Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
Hover scale: 1.02 (subtle)
Fade in: 600ms ease-out
Slide in: 400ms ease-out
```

---

## 🔄 Workflow de Cada Fase

### Fase 1 Detalhada: Setup & Preparação

**1.1 - Criar Estrutura**
```bash
mkdir -p src/components/landing
mkdir -p src/hooks
mkdir -p public/landing/icons
mkdir -p public/landing/images
mkdir -p docs
```

**1.2 - Criar Hooks** (4 hooks)
- `useImageOptimization`: Para lazy loading + WebP
- `useResponsiveGrid`: Para grid adaptativo
- `useAssetLoader`: Para carregamento progressivo
- `useModernElegantTheme`: Para aplicar estilo global

**1.3 - Criar Componentes Vazios** (5 componentes)
- Todos com TypeScript, Props bem definidas, JSDoc

**1.4 - Documentar Design Tokens**
- Criar arquivo `design-tokens-modern-elegant.ts`
- Exportar cores, fonts, spacing, shadows, animations

---

### Fase 2 Detalhada: Assets & Otimização

**2.1 - Download de Ícones**
```
✂️ Hair Salon Pack (Flaticon)
  → URL: https://www.flaticon.com/packs/hair-salon
  → Format: SVG preferred
  → Action: Manual download + commit

💅 Manicure Pack (Flaticon)
  → URL: https://www.flaticon.com/packs/manicure-pedicure-nail-art-tools
  → Format: SVG preferred

✨ Nail Care Pack (Flaticon)
  → URL: https://www.flaticon.com/packs/nail-care
  → Format: SVG preferred

🧴 Beauty & Spa Icons (Figma)
  → URL: Figma Community Pack
  → Format: SVG (export from Figma)
  → Action: Use figma-remote-mcp if possible
```

**2.2 - Download de Imagens**
```
🏢 Professional Hair Salon Interior
  → Photographer: Toa Heftiba
  → URL: https://unsplash.com/@heftiba
  → Size: 3000x2000px+ (high res)
  → Format: JPEG (convert to WebP)

💎 Luxury Manicure Close-up
  → URL: https://unsplash.com/s/photos/manicure
  → Size: 2000x1500px+ (high res)
  → Format: JPEG (convert to WebP)

👥 Professional Beauty Team
  → URL: https://unsplash.com/s/photos/beauty-salon
  → Size: 3000x2000px+ (high res)
  → Format: JPEG (convert to WebP)
```

**2.3 - Otimização**
```
Ícones SVG:
  → Minify: 50-70% size reduction
  → Check: viewBox, proper scaling
  → Test: Rendering em diferentes sizes (24px, 32px, 48px)

Imagens:
  → Resize: 3000px → 2560px (para desktop max-width)
  → Convert: JPEG → WebP (60-70% size reduction)
  → Compress: Tinypng level, quality 80-85
  → Add: Placeholder blur (10px placeholder)
  → Formats: Oferecer .webp + .jpg fallback
```

**2.4 - Criar Asset Manifest**
```ts
// lib/asset-manifest.ts
export const ICONS = {
  manicure: { src: '/landing/icons/manicure.svg', alt: 'Manicure Service' },
  hairSalon: { src: '/landing/icons/hair-salon.svg', alt: 'Hair Salon Service' },
  // ...
}

export const IMAGES = {
  heroSalon: { src: '/landing/images/hero-salon.webp', alt: '...' },
  // ...
}
```

---

### Fase 3 Detalhada: Integração Visual

**3.1 - HeroWithImageSection**
```tsx
import Image from 'next/image'

export function HeroWithImageSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/landing/images/hero-salon.webp"
        alt="Professional Hair Salon"
        fill
        priority
        quality={85}
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay Elegante */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Content aqui */}
      </div>
    </section>
  )
}
```

**3.2 - ServicesIconsGrid**
```tsx
export function ServicesIconsGrid() {
  const icons = [
    { id: 'manicure', name: 'Manicure', emoji: '💅' },
    { id: 'nailCare', name: 'Nail Care', emoji: '✨' },
    // ... 4 icons total
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {icons.map(icon => (
        <IconCard key={icon.id} icon={icon} />
      ))}
    </div>
  )
}
```

**3.3 - TestimonialsWithImage**
```tsx
export function TestimonialsWithImage() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Image - Left */}
      <ImageOptimized
        src="/landing/images/testimonials-manicure.webp"
        alt="Luxury Nails"
        quality={85}
        className="rounded-xl shadow-lg"
      />

      {/* Content - Right */}
      <div>
        {/* Testimonials content */}
      </div>
    </section>
  )
}
```

**3.4 - Aplicar Modern Elegant**
```tsx
// Usar classes Tailwind com design tokens
// Exemplo:
className={cn(
  'bg-gradient-to-br from-slate-950 to-slate-900',
  'text-white',
  'border border-amber-500/20',
  'rounded-xl',
  'shadow-lg shadow-black/20',
  'transition-all duration-300',
  'hover:shadow-xl hover:shadow-amber-500/10',
)}
```

---

## ✅ Checklist de QA (Fase 4)

### Responsividade
- [ ] Mobile (320px): All content visible, no overflow
- [ ] Tablet (768px): Proper grid columns
- [ ] Desktop (1024px+): Full layout optimal
- [ ] Landscape mobile: Content still good

### Performance
- [ ] Lighthouse: Score > 90
- [ ] FCP: < 1.8s
- [ ] LCP: < 2.5s
- [ ] CLS: < 0.1
- [ ] Images: < 150KB each (with WebP)

### Acessibilidade
- [ ] Contrast ratio: > 4.5:1
- [ ] Images: All have alt text
- [ ] Semantics: Proper h1, h2, etc.
- [ ] Keyboard nav: Works fully
- [ ] Screen reader: Tested

### Visual QA
- [ ] Colors match Modern Elegant palette
- [ ] Icons render correctly (all sizes)
- [ ] Images loaded with proper aspect ratios
- [ ] Hover states work smoothly
- [ ] No layout shift (CLS ok)

---

## 🎯 Success Criteria

### Pré-requisitos ✅
- [x] UI/UX da página /choice-make premium
- [x] User choices confirmadas (4 icons, 3 images, 1 style)

### Objetivos da Implementação
- [ ] ✅ Landing page com todos 4 ícones integrados
- [ ] ✅ Landing page com todas 3 imagens integradas
- [ ] ✅ Estilo Modern Elegant aplicado globalmente
- [ ] ✅ Responsividade 100% (mobile/tablet/desktop)
- [ ] ✅ Performance otimizada (Lighthouse > 90)
- [ ] ✅ Zero layout shifts (CLS < 0.1)
- [ ] ✅ Todas imagens em WebP + JPEG fallback
- [ ] ✅ Documentação completa

---

## 📚 Recursos & Documentação

### Links Pertinentes
- Flaticon Beauty Packs: https://www.flaticon.com/search/beauty-salon
- Unsplash Beauty Collection: https://unsplash.com/t/fashion-beauty
- Next.js Image Optimization: https://nextjs.org/docs/app/api-reference/components/image
- Tailwind CSS v4: https://tailwindcss.com/blog/tailwindcss-v4
- shadcn/ui Components: https://ui.shadcn.com

### Files a Documentar
- [x] THIS FILE: LANDING_PAGE_ASSETS_IMPLEMENTATION_STRATEGY.md
- [ ] DESIGN_SYSTEM_MODERN_ELEGANT.md (Colors, Typography, Spacing)
- [ ] IMPLEMENTATION_WORKFLOW.md (Step-by-step execution)
- [ ] ASSET_MANIFEST.md (Registry of all assets)

---

## 🚀 Próximos Passos Imediatos

1. ✅ Ler e revisar este documento
2. ✅ Confirmar planejamento com usuário
3. 🔄 Iniciar Fase 1 (Setup & Preparação)
4. 🔄 Executar Fase 2 (Assets)
5. 🔄 Executar Fase 3 (Integração)
6. 🔄 Executar Fase 4 (QA)
7. 🔄 Executar Fase 5 (Docs & Deploy)

---

**Autor**: Claude Code
**Última atualização**: 2025-10-19
**Status**: 🟡 Planejado - Aguardando aprovação para início
