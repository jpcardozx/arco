# 🎨 Strategic Velocity V3.0 - Guia Visual de Transformação

## 📱 MOBILE-FIRST LAYOUT

### **Grid Responsivo:**

```
┌─────────────────────────────┐  ← Mobile (< 640px)
│  [Header]                   │
│  [Problema 1]              │  1 coluna
│  [Problema 2]              │
│  [Problema 3]              │
│                             │
│  [Passo 1]                 │  1 coluna
│  [Passo 2]                 │
│  [Passo 3]                 │
│  [Passo 4]                 │
│                             │
│  [Métrica] [Métrica]       │  2x2 grid
│  [Métrica] [Métrica]       │
│                             │
│  [CTA Free]                │  Stack
│  [CTA Paid]                │
└─────────────────────────────┘

┌──────────────┬──────────────┐  ← Tablet (640-1024px)
│ [Problema 1] │ [Problema 2] │  
│ [Problema 3] │              │  2+1 cols
│                             │
│ [Passo 1]    │ [Passo 2]   │  2 cols
│ [Passo 3]    │ [Passo 4]   │
│                             │
│ [CTA Free]   │ [CTA Paid]  │  Side-by-side
└──────────────┴──────────────┘

┌────┬────┬────┬────┐          ← Desktop (>1024px)
│ P1 │ P2 │ P3 │    │          3 cols problemas
│                   │
│ S1 │ S2 │ S3 │ S4 │          4 cols passos
│                   │
│ M1 │ M2 │ M3 │ M4 │          4 cols métricas
│                   │
│  CTA Free  CTA Paid │        2 cols CTAs
└────┴────┴────┴────┘
```

---

## 🎨 COLOR CODING

### **Hierarquia Cromática:**

```
┌─────────────────────────────────────────┐
│ 🔴 VERMELHO - Problema                   │
│ ├─ bg-red-500/20                        │
│ ├─ border-red-500/30                    │
│ └─ text-red-400                         │
│                                         │
│ "Demora muito: 45-90 dias"              │
│ "Preço incerto: 70% desiste"            │
│ "Risco alto: 80% não fecha"             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🟢 TEAL - Passos 1 & 4 (início/fim)     │
│ ├─ bg-teal-500/20                       │
│ ├─ border-teal-500/30                   │
│ └─ text-teal-400                        │
│                                         │
│ Passo 1: Material Gratuito              │
│ Passo 4: Manutenção Mensal              │
│ CTA Free: Checklist                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🟠 LARANJA - Passo 2 (tripwire)         │
│ ├─ bg-orange-500/20                     │
│ ├─ border-orange-500/30                 │
│ └─ text-orange-400                      │
│                                         │
│ Passo 2: Diagnóstico R$ 497             │
│ CTA Paid: Diagnóstico Express           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🟣 ROXO - Passo 3 (pacote)              │
│ ├─ bg-purple-500/20                     │
│ ├─ border-purple-500/30                 │
│ └─ text-purple-400                      │
│                                         │
│ Passo 3: Pacote Fechado R$ 8.900       │
└─────────────────────────────────────────┘
```

---

## 🔄 COMPONENTE: StepCard (Collapsible)

### **Estado Colapsado:**

```
┌─────────────────────────────────────┐
│ [🎯]              [Passo 2]        │ ← Badge
│                                     │
│ Diagnóstico Barato                  │ ← Title (bold)
│                                     │
│ Análise paga de R$ 300-700 em      │ ← Description
│ 3-7 dias. Cliente paga pouco,      │
│ você mostra resultado rápido.      │
│                                     │
│ ▶ Clique para ver mais             │ ← Hint
└─────────────────────────────────────┘
       ↓ CLICK
```

### **Estado Expandido:**

```
┌─────────────────────────────────────┐
│ [🎯]              [Passo 2]        │
│                                     │
│ Diagnóstico Barato                  │
│                                     │
│ Análise paga de R$ 300-700 em      │
│ 3-7 dias. Cliente paga pouco,      │
│ você mostra resultado rápido.      │
│ ─────────────────────────────────   │ ← Divider
│ Exemplo:                            │ ← Novo bloco
│ Diagnóstico Express (R$ 497):      │
│ Análise do site + plano de ação   │
│                                     │
│ ╔═══════════════════════════════╗  │
│ ║ Por que funciona:              ║  │ ← Benefit box
│ ║ Cliente qualifica: tem         ║  │
│ ║ dinheiro, tem urgência         ║  │
│ ╚═══════════════════════════════╝  │
│                                     │
│ ▼ Clique para recolher             │
└─────────────────────────────────────┘
```

**Interação:**
- Click no card inteiro (não só no hint)
- Animação suave (0.3s)
- Height: auto (não fixo)
- Opacity fade-in

---

## 🎯 PROGRESSÃO ESTRATÉGICA (Guide)

### **Visual Flow:**

```
╔═══════════════════════════════════════════════════════╗
║  "Qual o seu momento?" (H3)                          ║
║  Escolha o passo que faz sentido agora:              ║
╚═══════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────┐
│ [✓]  Ainda não sei se preciso                       │ ← Click
│      Baixe o checklist e veja se você está          │
│      perdendo clientes por erros evitáveis          │
│      → Comece pelo checklist gratuito               │ ← Recommendation
└─────────────────────────────────────────────────────┘
       ↓ CLICK
       Sets: recommendedCTA = 'free'
       ↓
┌─────────────────────────────────────────────────────┐
│ ⭐ Recomendado                                       │ ← Badge appears
│ 📄 Começar aprendendo                               │
│ Checklist Gratuito                                  │
│ [Baixar Checklist Grátis]                          │ ← Highlighted
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [✓]  Sei que preciso, mas quero testar              │ ← Click
│      Diagnóstico Express (R$ 497) prova se          │
│      conseguimos aumentar seus resultados           │
│      → Vá direto para o diagnóstico                 │
└─────────────────────────────────────────────────────┘
       ↓ CLICK
       Sets: recommendedCTA = 'paid'
       ↓
┌─────────────────────────────────────────────────────┐
│ ⭐ Mais escolhido                                    │ ← Badge moves
│ 🎯 Começar implementando                            │
│ Diagnóstico Express - R$ 497                        │
│ [Agendar Diagnóstico]                              │ ← Highlighted
└─────────────────────────────────────────────────────┘
```

**Comportamento:**
1. Guide cards são clicáveis (full area)
2. Click → State change (`setRecommendedCTA`)
3. CTA correspondente ganha badge "⭐"
4. Visual feedback: border glow no CTA recomendado

---

## 📊 MÉTRICAS - Compact Grid

### **Layout 2x2 (Mobile) → 4x1 (Desktop):**

```
Mobile:
┌──────────────┬──────────────┐
│   15-20%     │     30%      │
│ Baixam o     │  Agendam     │
│ checklist    │ diagnóstico  │
└──────────────┴──────────────┘
┌──────────────┬──────────────┐
│     20%      │     40%      │
│  Pagam       │   Fecham     │
│ diagnóstico  │   pacote     │
└──────────────┴──────────────┘

Desktop:
┌───────┬───────┬───────┬───────┐
│ 15-20%│  30%  │  20%  │  40%  │
│Baixam │Agendam│Pagam  │Fecham │
└───────┴───────┴───────┴───────┘
```

### **Card Structure:**

```
┌─────────────────┐
│    15-20%       │ ← Value (3xl bold, gradient)
│ Baixam o        │ ← Label (xs bold)
│ checklist       │
│                 │
│ De cada 100     │ ← Description (xs slate-500)
│ visitantes,     │
│ 15-20 baixam    │
└─────────────────┘
```

**Hierarchy:**
1. Value (largest, gradient text)
2. Label (medium, bold)
3. Description (smallest, muted)

---

## 🎯 CTA DUAL - Visual Distinction

### **Free CTA (Teal):**

```
┌───────────────────────────────────────┐
│ 📄 Começar aprendendo                │ ← Badge (teal)
│                                       │
│ Checklist Gratuito                   │ ← Title
│                                       │
│ 15 pontos que fazem você perder      │ ← Description
│ clientes (e como corrigir cada um).  │
│ Leitura de 8 minutos.                │
│                                       │
│ ✓ PDF de 1 página, direto ao ponto  │ ← Features
│ ✓ Pode aplicar hoje mesmo           │
│ ✓ Sem pedir telefone ou reunião     │
│ ✓ Zero spam depois                  │
│                                       │
│ ┌─────────────────────────────────┐  │
│ │ Baixar Checklist Grátis        │  │ ← Button (teal gradient)
│ └─────────────────────────────────┘  │
│                                       │
│ Email instantâneo • Sem contato      │ ← Footer
└───────────────────────────────────────┘
```

### **Paid CTA (Orange/Purple gradient):**

```
┌───────────────────────────────────────┐
│         ⭐ Mais escolhido              │ ← Badge (top, conditional)
│                                       │
│ 🎯 Começar implementando              │ ← Badge (orange)
│                                       │
│ Diagnóstico Express                  │ ← Title
│ R$ 497                               │ ← Price (3xl bold orange)
│                                       │
│ Análise completa do seu site +       │ ← Description
│ campanhas atuais. Plano de ação      │
│ priorizado entregue em 7 dias úteis. │
│                                       │
│ ✓ Análise técnica (site + GA + Ads) │ ← Features
│ ✓ Relatório com 3-5 ações prioritárias│
│ ✓ 30 min de reunião                  │
│ ✓ Útil mesmo se não fechar pacote    │
│                                       │
│ ┌─────────────────────────────────┐  │
│ │ Agendar Diagnóstico             │  │ ← Button (orange→purple)
│ └─────────────────────────────────┘  │
│                                       │
│ Próxima vaga: 3 dias • Garantia      │ ← Footer
└───────────────────────────────────────┘
```

**Distinção Visual:**
- **Free:** Teal/green theme, light vibe
- **Paid:** Orange/purple gradient, premium vibe
- **Recommended:** Badge "⭐" appears on top when selected via guide

---

## ⚠️ TRANSPARÊNCIA CARD

### **Warning Style:**

```
┌──────────────────────────────────────────────────┐
│ Quando isso NÃO funciona                         │ ← H4 center
│ Seja honesto consigo mesmo:                      │ ← Subtitle
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ ⚠ Você tem menos de 10 leads por mês      │  │ ← Warning box
│ │   Foque em SEO orgânico primeiro.          │  │   (red-500/5 bg)
│ │   Tráfego pago só funciona com volume.    │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ ⚠ Orçamento de mídia < R$ 2 mil/mês       │  │
│ │   Valor muito baixo para testar.           │  │
│ │   Economize mais 2-3 meses primeiro.       │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ ⚠ Não consegue atender +50% demanda        │  │
│ │   Resolva capacidade interna primeiro.     │  │
│ │   Mais leads sem estrutura = frustração.   │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

**Design:**
- Card principal: white/5 background
- Sub-cards: red-500/5 com border red-500/20
- Icon: ⚠ (red-400)
- Text hierarchy: bold title + muted advice

---

## 🎨 ANTES VS AGORA (Visual)

### **V2.0 Layout:**
```
Header (educacional técnico)
  ↓
[Card][Card][Card]           ← 3 problemas (genéricos)
[Card][Card][Card][Card]     ← 4 passos (similares)
[Card][Card][Card]           ← 3 princípios (texto denso)
[Card][Card][Card][Card]     ← 4 métricas (ok)
[Card][Card]                 ← 2 CTAs (ok)
[Card]                       ← 1 transparência

= 17 cards visuais similares = Fadiga
```

### **V3.0 Layout:**
```
Header (problema concreto)
  ↓
[RED][RED][RED]              ← 3 problemas (distinct red)
  ↓
[COLLAPSIBLE 4 colors]       ← 4 passos (interactive)
  ↓
[COMPACT GRID 2x2/4x1]       ← 4 métricas (smaller)
[HIGHLIGHT CARD]             ← 1 comparação (teal)
  ↓
[GUIDE 3 scenarios]          ← 3 cards (interactive)
  ↓
[TEAL CTA][ORANGE CTA]       ← 2 CTAs (distinct)
  ↓
[WARNING CARD]               ← 1 transparência (red)

= 7 blocos visuais distintos = Clareza
```

---

## 📐 SPACING SYSTEM

### **Vertical Rhythm:**

```
Section: py-16 sm:py-20 lg:py-28
         ↓
Header:  mb-12 sm:mb-16
         ↓
Block 1: mb-12 sm:mb-16
         ↓
Block 2: mb-12 sm:mb-16
         ↓
Block 3: mb-12 sm:mb-16
         ↓
...
```

**Consistente em todos os blocos:** `mb-12 sm:mb-16`

### **Horizontal Spacing:**

```
Container: px-4 sm:px-0  (mobile padding, desktop auto)
Grid gaps: gap-4 sm:gap-6
Card padding: p-5 (fixo)
```

---

## 🎯 INTERACTIVE STATES

### **Hover:**
```
Card normal:
  bg-white/5 border-white/10

Card hover:
  bg-white/8 border-white/10
  y: -4px (lift)
```

### **Expanded (Collapsible):**
```
Card normal:
  border-white/10

Card expanded:
  border-teal-500/30
  shadow-lg
```

### **Recommended (CTA):**
```
CTA normal:
  border-teal-500/30 (free)
  border-orange-500/30 (paid)

CTA recommended:
  Badge "⭐ Recomendado" (top)
  border glow stronger
```

---

## ✅ DESIGN CHECKLIST

### **Consistência:**
- [x] Todas as cores vêm do sistema (teal/orange/purple/red)
- [x] Todos os cards usam glassmorphism base
- [x] Spacing vertical consistente (mb-12 sm:mb-16)
- [x] Grid gaps consistentes (gap-4 sm:gap-6)

### **Responsividade:**
- [x] Mobile: 1 col, stack, 2x2 metrics
- [x] Tablet: 2 cols, side-by-side CTAs
- [x] Desktop: 3-4 cols, inline
- [x] Touch targets >48px

### **Hierarchy:**
- [x] H2 (3xl→5xl) > H3 (2xl→4xl) > H4 (lg→2xl)
- [x] Value (3xl) > Label (xs bold) > Description (xs muted)
- [x] Title (bold white) > Body (slate-400) > Caption (slate-500)

### **Interatividade:**
- [x] Collapsibles: Click para expandir/recolher
- [x] Guide: Click para recomendar CTA
- [x] Hovers: Lift + color transitions
- [x] Visual feedback em todos os estados

---

## 🚀 RESULTADO VISUAL

**V2.0:** Educacional mas monótono (17 cards similares)  
**V3.0:** Educacional E envolvente (7 blocos distintos + interativo)

**Lead pensa:**
- V2.0: "Muita informação, vou ler depois"
- V3.0: "Interessante, deixa eu explorar" (clicks nos collapsibles)

**Conversão:**
- V2.0: Lead sai educado mas sem ação
- V3.0: Lead é guiado para CTA específico via guide

**Status:** ✅ Design system mantido, UX dramaticamente melhorada.
