# 🎨 Design System: Modern Elegant

**Status**: Produção
**Versão**: 1.0
**Aplicado em**: Landing Page Assets Integration

---

## 📐 Sistema de Design Completo

### 1. Paleta de Cores

#### Cores Primárias
```
Charcoal Black:    #0F0F1F   (Backgrounds principais)
Deep Navy:         #1A1A2E   (Backgrounds secundários)
Premium Gold:      #D4AF37   (Accents principais)
Warm Gold:         #E6C757   (Accents hover)
Pure White:        #FFFFFF   (Text principal)
Soft White:        #F5F5F5   (Text secundário)
```

#### Cores Secundárias
```
Light Gray:        #E8E8E8   (Borders claras)
Dark Gray:         #2A2A3F   (Borders escuras)
Slate 900:         #0F172A   (Backgrounds depth)
Slate 800:         #1E293B   (Elements hover)
```

#### Gradientes de Marca
```
Hero Gradient:
  from: #0F0F1F
  via:  #1A1A2E (50%)
  to:   #0F0F1F
  Direction: 135deg
  CSS: linear-gradient(135deg, #0F0F1F 0%, #1A1A2E 50%, #0F0F1F 100%)

Accent Gradient:
  from: #D4AF37
  to:   #E6C757
  Direction: 135deg
  CSS: linear-gradient(135deg, #D4AF37 0%, #E6C757 100%)

Text Gradient:
  from: #FFFFFF
  to:   #F5F5F5
  Direction: 135deg
  CSS: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)

Hover Gradient:
  from: rgba(212, 175, 55, 0.1)
  to:   transparent
  CSS: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)
```

#### Cores por Seção (Para Componentes Específicos)

**Services Icons Grid**
```
Icon 1 (Manicure):  Pink   (#EC4899)
Icon 2 (Nail Care):  Amber  (#F59E0B)
Icon 3 (Spa):        Purple (#A855F7)
Icon 4 (Hair):       Cyan   (#06B6D4)
```

---

### 2. Tipografia

#### Fontes Recomendadas
```
Headlines (h1, h2, h3):
  Font Family: 'Poppins' ou 'Playfair Display'
  Weight: 700 (bold)
  Letter Spacing: +0.03em
  Line Height: 1.2

Body (p, span, text):
  Font Family: 'Inter' ou 'Outfit'
  Weight: 400 (regular)
  Letter Spacing: 0
  Line Height: 1.6

Accents (Badges, Labels):
  Font Family: 'Inter' ou 'Outfit'
  Weight: 600 (semibold)
  Letter Spacing: +0.05em
  Line Height: 1.4
```

#### Escala Tipográfica
```
h1: 48px / 3.5rem (Desktop), 32px / 2rem (Mobile)
h2: 36px / 2.25rem (Desktop), 24px / 1.5rem (Mobile)
h3: 28px / 1.75rem (Desktop), 20px / 1.25rem (Mobile)
h4: 24px / 1.5rem (Desktop), 18px / 1.125rem (Mobile)
p:  16px / 1rem (Desktop), 14px / 0.875rem (Mobile)
small: 12px / 0.75rem (Desktop), 11px / 0.688rem (Mobile)
```

#### Variações
```
Display (Extra Large):
  Size: 64px / 4rem
  Weight: 700
  Use: Hero sections, major titles

Large:
  Size: 48px / 3rem
  Weight: 700
  Use: Page titles, section headers

Regular:
  Size: 16px / 1rem
  Weight: 400
  Use: Body copy, descriptions

Small:
  Size: 14px / 0.875rem
  Weight: 400
  Use: Secondary text, captions

Tiny:
  Size: 12px / 0.75rem
  Weight: 600
  Use: Labels, badges, hints
```

---

### 3. Espaçamento & Grid

#### Base Unit
```
Base: 8px (1 unit)
0.25rem = 2px
0.5rem = 4px
1rem = 8px  (base)
1.5rem = 12px
2rem = 16px
3rem = 24px
4rem = 32px
6rem = 48px
8rem = 64px
12rem = 96px
```

#### Padding Padrão por Elemento
```
Buttons:
  Horizontal: 24px / 1.5rem
  Vertical: 12px / 0.75rem

Cards:
  Padding: 32px / 2rem (Desktop), 24px / 1.5rem (Mobile)

Sections:
  Padding Top/Bottom: 64px / 4rem (Desktop), 48px / 3rem (Tablet), 32px / 2rem (Mobile)
  Padding Left/Right: 32px / 2rem (Desktop), 24px / 1.5rem (Mobile)

Container:
  Max Width: 1280px (7xl)
  Horizontal Padding: 32px
  Resulting: 1216px content width
```

#### Gaps (Grid & Flex)
```
Grid/Flex Gaps:
  Tight: 12px / 0.75rem
  Normal: 16px / 1rem
  Comfortable: 24px / 1.5rem
  Spacious: 32px / 2rem
  Extra: 48px / 3rem
```

---

### 4. Border Radius

#### Escala de Arredondamento
```
Sharp:        0px (no rounding)
Subtle:       4px / 0.25rem
Small:        8px / 0.5rem
Medium:       12px / 0.75rem
Large:        16px / 1rem
Extra Large:  24px / 1.5rem
Full:         9999px (circles, pills)
```

#### Aplicação
```
Buttons:              12px (0.75rem)
Card elements:        12px (0.75rem)
Images (general):     16px (1rem)
Images (hero):        0px (full bleed)
Badges/Pills:         24px (1.5rem) ou full
Input fields:         8px (0.5rem)
Large sections:       20px (1.25rem)
Avatars:              9999px (full circle)
```

---

### 5. Sombras

#### Shadow Scale
```
None:      box-shadow: none

Subtle:
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04)
  Use: Slight elevation

Light:
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
  Use: Cards, buttons

Medium:
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12)
  Use: Modals, dropdowns

Heavy:
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16)
  Use: Hero images, large modals

Extra Heavy:
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.20)
  Use: Floating elements, emphasis
```

#### Sombra com Accent Color
```
Gold Shadow (For premium feel):
  box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15)
  Use: Special cards, highlighted elements

Dark Shadow (For depth):
  box-shadow: 0 4px 16px rgba(15, 15, 31, 0.30)
  Use: Modals, overlays
```

---

### 6. Animações & Transições

#### Durations
```
Instant:    0ms
Quick:      150ms
Fast:       300ms (DEFAULT)
Normal:     500ms
Slow:       700ms
Extra Slow: 1000ms
```

#### Easing Functions
```
Linear:       cubic-bezier(0, 0, 1, 1)
Ease-In:      cubic-bezier(0.4, 0, 1, 1)
Ease-Out:     cubic-bezier(0, 0, 0.2, 1)
Ease-In-Out:  cubic-bezier(0.4, 0, 0.2, 1) ⭐ DEFAULT

Bounce:       cubic-bezier(0.34, 1.56, 0.64, 1)
Elastic:      cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

#### Transition Presets
```
Default Transition:
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
  Use: General elements, multi-property

Fade In:
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)
  Use: Elements appearing

Slide In:
  transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)
  Use: Elements entering from sides

Scale:
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1)
  Use: Buttons, interactive elements

Color:
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
              color 300ms cubic-bezier(0.4, 0, 0.2, 1)
  Use: Color changes on hover/focus
```

#### Hover & Interactive States
```
Buttons:
  Default: No transform, 1 brightness
  Hover:   scale(1.02) + brightness(1.1)
  Active:  scale(0.98)
  Duration: 300ms ease-out

Cards:
  Default: shadow-light, 0 transform
  Hover:   shadow-heavy, translateY(-4px)
  Duration: 400ms ease-out

Images:
  Default: opacity 1, scale 1
  Hover:   opacity 0.95, scale 1.03
  Duration: 500ms ease-out

Text Links:
  Default: text-current, no underline
  Hover:   text-gold, underline
  Duration: 300ms ease-out
```

#### Keyframe Animations
```
Fade In (600ms):
  0%:   opacity 0
  100%: opacity 1

Slide Up (400ms):
  0%:   opacity 0, translateY(20px)
  100%: opacity 1, translateY(0)

Pulse (2000ms, loop):
  0%:   opacity 1
  50%:  opacity 0.5
  100%: opacity 1

Shimmer (1500ms, loop):
  0%:   backgroundPosition: -1000px 0
  100%: backgroundPosition: 1000px 0
```

---

### 7. Responsive Breakpoints

#### Tailwind Breakpoints (Padrão)
```
Mobile (default):     < 640px    (sm removed)
Mobile+:              ≥ 640px    (not used, use md)
Tablet:               ≥ 768px    (md) ⭐ START HERE
Tablet Large:         ≥ 1024px   (lg)
Desktop:              ≥ 1280px   (xl)
Desktop Large:        ≥ 1536px   (2xl)
```

#### Aplicação por Componente

**Hero Section**
```
Mobile (320px):    100vh, single column
Tablet (768px):    80vh, can show 2 cols if layout allows
Desktop (1024px+): 100vh or full content, optimal layout
```

**Services Icons Grid**
```
Mobile:     1 column (stack)
Tablet:     2 columns (2x2 grid)
Desktop:    4 columns (1x4 or 2x2 grid)
Desktop+:   4 columns (1x4 grid) or 5-6 if space
```

**Testimonials Section**
```
Mobile:     Stacked (image top, content bottom)
Tablet:     Side-by-side (image 40%, content 60%)
Desktop:    Side-by-side (image 45%, content 55%)
```

**Team Section**
```
Mobile:     1 column
Tablet:     2 columns
Desktop:    3 columns
Desktop+:   4 columns or 3 with larger cards
```

---

### 8. Component Specifications

#### Hero Section with Image
```
Layout:     Fullscreen container with background image
Image:      Cover, centered, with gradient overlay
Overlay:    linear-gradient(135deg, rgba(15, 15, 31, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%)
Content:    Centered text, 64px bottom padding
Title:      h1, white, 48px desktop / 32px mobile
Subtitle:   p, soft white, 18px, 1.8 line-height
CTA:        Button with gold accent gradient
```

#### Services Icons Grid
```
Container:  max-w-6xl mx-auto
Grid:       gap-8 / 2rem
Columns:    1 / 2 / 4 (mobile / tablet / desktop)
Icon Card:
  - Border: 1px solid rgba(212, 175, 55, 0.2)
  - BG:     rgba(212, 175, 55, 0.05)
  - Hover:  scale(1.03), shadow-heavy, border-opacity +50%
  - Radius: 12px
  - Padding: 24px
  - Min-height: 160px (with flexbox center)
Icon:       48px / 3rem, color by category
Label:      18px semibold, white
Desc:       14px, gray-400, optional
```

#### Testimonials Section
```
Layout:     Grid 1 / 2 columns (mobile / desktop)
Gap:        32px / 2rem
Image:
  - Aspect: 4/3 or 3/2
  - Radius: 16px
  - Shadow: shadow-heavy
  - Responsive: 100% mobile, ~45% desktop
Content:
  - Padding: 32px desktop, 24px mobile
  - BG:      rgba(212, 175, 55, 0.05)
  - Radius:  12px
  - Border:  1px solid rgba(212, 175, 55, 0.2)
Testimonials: Array of quote cards
  - Each: p tag, italic, 16px, white
  - Author: 14px semibold, gold
  - Rating: 5 stars, gold color
```

#### Team Section
```
Layout:     Grid 1 / 2 / 3 columns (mobile / tablet / desktop)
Gap:        24px / 1.5rem
Header:
  - Title: h2, white, gold gradient text
  - Desc: p, gray-400, 18px, max-w-2xl
Members:    Array of cards
  - Image: Circle (120px), background member photo
  - Name: 18px semibold white
  - Role: 14px gray-400
  - Hover: scale(1.05), shadow-heavy
```

#### Images (General)
```
Loading:    Blur placeholder (10px blur)
Fallback:   Gray background with icon
Format:     WebP (primary) + JPEG (fallback)
Lazy:       Default (loading="lazy")
Quality:    85% (WebP), 80% (JPEG)
Responsive:
  - Mobile:   100vw or max-w-full
  - Tablet:   768px (60vw)
  - Desktop:  1280px (100% container width)
Aspect:     Maintain original (no distortion)
```

---

### 9. Accessibility

#### Color Contrast
```
Text on Background: Minimum 4.5:1 (WCAG AA)
Large Text (18px+): Minimum 3:1 (WCAG AA)
Gold on Dark:       ✅ 7.2:1 (exceeds AA)
White on Dark:      ✅ 21:1 (exceeds AAA)
```

#### Focus States
```
Buttons:    2px solid gold outline, 2px offset
Links:      2px solid gold underline
Inputs:     2px solid gold border
All Focus:  Outline offset: 2px
            Duration: 150ms ease-out
```

#### Semantic HTML
```
Titles:     <h1>, <h2>, <h3> (proper hierarchy)
Navigation: <nav> tags
Images:     All <img> with alt text
Buttons:    <button> type="button" or type="submit"
Links:      <a> with meaningful text
Forms:      <label>, <input>, <select> properly paired
```

#### Keyboard Navigation
```
Tab Order:  Logical (left → right, top → bottom)
Skip Link:  Optional (for long pages)
Focus Trap: None (unless modal)
Escape Key: Close modals, dropdowns
Enter Key:  Submit forms, click buttons
```

---

### 10. CSS Classes (Tailwind)

#### Reusable Utility Classes
```typescript
// Hero Background
'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'

// Card Container
'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl shadow-lg'

// Button Primary
'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20 transition-all duration-300 rounded-xl'

// Button Secondary
'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 transition-all duration-300 rounded-xl'

// Text Gradient
'bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'

// Hover Scale
'hover:scale-105 transition-transform duration-300'

// Icon Hover
'hover:text-amber-500 transition-colors duration-300'

// Section Padding
'py-16 md:py-24 lg:py-32 px-4 md:px-8'

// Container
'max-w-6xl mx-auto px-4 md:px-8'
```

---

## 📋 Checklist de Implementação

- [ ] Importar design tokens em todos componentes
- [ ] Aplicar cores primárias (Charcoal + Gold)
- [ ] Aplicar tipografia (Poppins headlines, Inter body)
- [ ] Aplicar espaçamento (base 8px)
- [ ] Aplicar border radius (12-16px padrão)
- [ ] Aplicar sombras elegantes
- [ ] Testar animações (300ms ease-out padrão)
- [ ] Validar responsive em 3 breakpoints (320px / 768px / 1024px)
- [ ] Verificar contraste de cores (mín 4.5:1)
- [ ] Testar teclado + screen reader

---

**Autor**: Claude Code
**Versão**: 1.0
**Última atualização**: 2025-10-19
**Status**: 🟢 Pronto para implementação
