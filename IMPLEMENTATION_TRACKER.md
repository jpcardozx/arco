# 🚀 ARCO - Implementation Tracker

**Estratégia**: Patches progressivos por módulo
**Abordagem**: Aproveitar libs/deps + Amadurecer funcionalidades
**Timeline**: 3 Fases → 9 Módulos → 27 Patches

---

## 📊 Dashboard Geral

| Fase | Módulos | Patches | Status | Progresso |
|------|---------|---------|--------|-----------|
| **FASE 1: Copy & Storytelling** | 3 | 9 | 🟡 | 0/9 (0%) |
| **FASE 2: Visual & UX** | 3 | 9 | ⏳ | 0/9 (0%) |
| **FASE 3: Features & Libs** | 3 | 9 | ⏳ | 0/9 (0%) |
| **TOTAL** | **9** | **27** | ⏳ | **0/27 (0%)** |

---

## 🎯 FASE 1: Copy & Storytelling (4h)

**Objetivo**: Copy profissional + Fluxo narrativo coeso
**Libs utilizadas**: Framer Motion (transições), React Hook Form (validação)

---

### 📦 MÓDULO 1.1: Professional Copy (1.5h)

#### Patch 1.1.1: Hero Section Copy ⏳
**Tempo**: 20min | **Prioridade**: P0

**Alterações**:
```tsx
// src/components/sections/PremiumHeroSection.tsx

// ❌ Antes
badge: { text: "Soluções Premium" }
title: "Leads qualificados em 7 dias para prestadores locais"
subtitle: "Operação contínua com web de captação..."

// ✅ Depois
badge: { text: "Performance-Driven Lead Generation" }
title: "Prestadores de Serviços Locais: +350% em Leads Qualificados"
subtitle: "Metodologia comprovada em 200+ empresas. Implementação express em 48h, primeiros resultados em 7 dias. ROI médio de 420% documentado."
```

**Libs aproveitadas**:
- Framer Motion: Animação do badge com `whileHover`

**Checklist**:
- [ ] Atualizar props do componente
- [ ] Testar responsividade mobile
- [ ] Validar contraste WCAG AA
- [ ] Commit: "feat(hero): professional B2B copy"

---

#### Patch 1.1.2: ROI Calculator Copy ⏳
**Tempo**: 25min | **Prioridade**: P0

**Alterações**:
```tsx
// src/components/sections/ROICalculator.tsx

// Header
badge: "Diagnóstico de Oportunidade"
title: "Análise Técnica de Performance"
subtitle: "Calculadora baseada em métricas Core Web Vitals e benchmarks de indústria específicos."

// Inputs labels (mais profissionais)
"Receita Mensal Online (R$)"
"LCP Atual (segundos) - Medir via PageSpeed Insights"
"Percentual de Tráfego Mobile (%)"
"Segmento de Atuação"

// CTA
"Gerar Relatório de Oportunidade" // vs "Ver Plano"
```

**Libs aproveitadas**:
- React Hook Form: Validação de inputs
- Zod: Schema validation

**Nova funcionalidade**:
```tsx
// Adicionar validação com zod
import { z } from 'zod';

const roiSchema = z.object({
  monthlyRevenue: z.number().min(1000, "Receita mínima: R$ 1.000"),
  currentLoadTime: z.number().min(0.5).max(10, "LCP inválido"),
  mobileTrafficPercentage: z.number().min(0).max(100),
  industry: z.enum(['ecommerce', 'saas', 'finance', 'healthcare', 'education', 'real_estate'])
});

// Feedback visual de validação
{errors.monthlyRevenue && (
  <p className="text-sm text-red-400 mt-1">{errors.monthlyRevenue.message}</p>
)}
```

**Checklist**:
- [ ] Instalar react-hook-form + zod (já instalados)
- [ ] Implementar validação
- [ ] Atualizar copy
- [ ] Adicionar tooltips explicativos (Radix Tooltip)
- [ ] Commit: "feat(calculator): validation + professional copy"

---

#### Patch 1.1.3: ValueProp & Stories Copy ⏳
**Tempo**: 20min | **Prioridade**: P1

**Alterações**:
```tsx
// UnifiedValueProposition
badge: "Especialização Vertical"
title: "Metodologia ARCO: Diferencial Comprovado"
subtitle: "Foco exclusivo em prestadores de serviços locais. Conhecimento profundo das necessidades específicas do segmento."

// OptimizedClientStories
badge: "Case Studies Documentados"
title: "Resultados Mensuráveis em 3 Segmentos"
subtitle: "Análises técnicas com métricas Core Web Vitals, taxas de conversão e ROI documentados em períodos de 90 dias."
```

**Checklist**:
- [ ] Atualizar copy ValueProp
- [ ] Atualizar copy Stories
- [ ] Commit: "feat(content): professional B2B copy across sections"

---

### 📦 MÓDULO 1.2: TransitionBridge System (1.5h)

#### Patch 1.2.1: Criar TransitionBridge Component ⏳
**Tempo**: 30min | **Prioridade**: P0

**Implementação**:
```tsx
// src/components/sections/TransitionBridge.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface TransitionBridgeProps {
  question?: string;
  statement?: string;
  context?: string;
  variant?: 'question' | 'statement' | 'minimal';
  showArrow?: boolean;
}

export const TransitionBridge: React.FC<TransitionBridgeProps> = ({
  question,
  statement,
  context,
  variant = 'question',
  showArrow = true
}) => {
  const content = question || statement;

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {variant === 'question' && content && (
            <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-3 leading-tight">
              {content}
            </h3>
          )}

          {variant === 'statement' && content && (
            <p className="text-xl lg:text-2xl font-medium text-slate-300 mb-3">
              {content}
            </p>
          )}

          {context && (
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              {context}
            </p>
          )}

          {showArrow && (
            <motion.div
              className="mt-8 flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-teal-500/30 flex items-center justify-center backdrop-blur-sm bg-teal-500/5">
                <ArrowDown className="w-6 h-6 text-teal-500" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
```

**Libs aproveitadas**:
- Framer Motion: Animação suave do arrow
- Lucide React: Ícone ArrowDown

**Checklist**:
- [ ] Criar componente
- [ ] Adicionar a `sections/index.ts`
- [ ] Testar 3 variantes
- [ ] Commit: "feat(navigation): add TransitionBridge component"

---

#### Patch 1.2.2: Integrar Bridges na Homepage ⏳
**Tempo**: 30min | **Prioridade**: P0

**Implementação**:
```tsx
// src/app/page.tsx

import {
  PremiumHeroSection,
  TransitionBridge,  // Novo
  ROICalculator,
  UnifiedValueProposition,
  OptimizedClientStories,
  FigmaFinalCTA
} from '@/components/sections';

export default function HomePage() {
  return (
    <MainLayout>
      <PremiumHeroSection {...} />

      {/* Bridge 1: Hero → Calculator */}
      <TransitionBridge
        question="Qual o impacto exato da performance no seu negócio?"
        context="Utilize nossa calculadora baseada em benchmarks de indústria para quantificar a oportunidade de recuperação de receita."
        variant="question"
      />

      <ROICalculator />

      {/* Bridge 2: Calculator → Stories */}
      <TransitionBridge
        statement="Empresas como a sua já estão recuperando receita com nossa metodologia."
        context="Análise técnica de 3 implementações reais com métricas documentadas ao longo de 90 dias."
        variant="statement"
      />

      <OptimizedClientStories />

      {/* Bridge 3: Stories → ValueProp */}
      <TransitionBridge
        question="O que diferencia a abordagem ARCO?"
        context="Metodologia especializada vs agências generalistas. Conheça nosso diferencial técnico."
        variant="question"
      />

      <UnifiedValueProposition />

      <FigmaFinalCTA />
      <WebVitalsMonitor />
    </MainLayout>
  );
}
```

**Checklist**:
- [ ] Adicionar 3 bridges
- [ ] Ajustar spacing entre seções
- [ ] Testar scroll behavior
- [ ] Commit: "feat(home): integrate storytelling bridges"

---

#### Patch 1.2.3: Smooth Scroll Navigation ⏳
**Tempo**: 30min | **Prioridade**: P2

**Implementação**:
```tsx
// src/lib/scroll-utils.ts (novo)
export const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Hook para tracking de seção visível
export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
```

**Libs aproveitadas**:
- React: Intersection Observer API
- Framer Motion: Scroll-triggered animations

**Checklist**:
- [ ] Criar scroll utilities
- [ ] Implementar useActiveSection hook
- [ ] Atualizar CTAs com scroll suave
- [ ] Commit: "feat(navigation): smooth scroll + active section tracking"

---

### 📦 MÓDULO 1.3: Enhanced CTAs (1h)

#### Patch 1.3.1: CTA Hierarchy System ⏳
**Tempo**: 20min | **Prioridade**: P1

**Problema atual**: 4 CTAs genéricos "Agendar Análise"

**Solução**: CTAs progressivos por seção
```tsx
// src/components/ui/progressive-cta.tsx
interface ProgressiveCTAProps {
  stage: 'awareness' | 'consideration' | 'decision';
  primaryText: string;
  secondaryText?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const ProgressiveCTA: React.FC<ProgressiveCTAProps> = ({
  stage,
  primaryText,
  secondaryText,
  ...props
}) => {
  const stageConfig = {
    awareness: {
      icon: '📊',
      urgency: 'low',
      color: 'teal'
    },
    consideration: {
      icon: '🎯',
      urgency: 'medium',
      color: 'blue'
    },
    decision: {
      icon: '🚀',
      urgency: 'high',
      color: 'orange'
    }
  };

  const config = stageConfig[stage];

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        size="lg"
        className={`bg-gradient-to-r from-${config.color}-600 to-${config.color}-500`}
        {...props}
      >
        <span className="mr-2">{config.icon}</span>
        {primaryText}
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      {secondaryText && (
        <p className="text-sm text-slate-400 mt-2">{secondaryText}</p>
      )}
    </motion.div>
  );
};
```

**Aplicação**:
```tsx
// Hero
<ProgressiveCTA
  stage="awareness"
  primaryText="Calcular Meu ROI"
  secondaryText="Diagnóstico gratuito em 2 minutos"
  href="#roi-calculator"
/>

// Calculator Results
<ProgressiveCTA
  stage="consideration"
  primaryText="Ver Metodologia Completa"
  secondaryText="Entenda como recuperar R$ X/mês"
  href="#methodology"
/>

// Final CTA
<ProgressiveCTA
  stage="decision"
  primaryText="Solicitar Análise Personalizada"
  secondaryText="Especialista responde em até 4h"
  onClick={() => trackEvent('cta_final_click')}
/>
```

**Checklist**:
- [ ] Criar ProgressiveCTA component
- [ ] Atualizar CTAs em 4 seções
- [ ] Integrar tracking (useTracking)
- [ ] Commit: "feat(cta): progressive hierarchy system"

---

#### Patch 1.3.2: Scarcity & Urgency Elements ⏳
**Tempo**: 25min | **Prioridade**: P2

**Implementação**:
```tsx
// src/components/ui/urgency-badge.tsx
import { Clock, Users } from 'lucide-react';

interface UrgencyBadgeProps {
  type: 'limited-slots' | 'time-sensitive' | 'social-proof';
  value: string | number;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ type, value }) => {
  const config = {
    'limited-slots': {
      icon: Users,
      prefix: 'Apenas',
      suffix: 'vagas disponíveis este mês',
      color: 'orange'
    },
    'time-sensitive': {
      icon: Clock,
      prefix: 'Oferta válida por',
      suffix: '',
      color: 'red'
    },
    'social-proof': {
      icon: Users,
      prefix: '',
      suffix: 'empresas já utilizam',
      color: 'emerald'
    }
  };

  const { icon: Icon, prefix, suffix, color } = config[type];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${color}-500/10 border border-${color}-500/30`}>
      <Icon className={`w-4 h-4 text-${color}-500`} />
      <span className="text-sm font-medium text-white">
        {prefix} <strong>{value}</strong> {suffix}
      </span>
    </div>
  );
};
```

**Aplicação**:
```tsx
// Final CTA
<UrgencyBadge type="limited-slots" value={3} />
<UrgencyBadge type="time-sensitive" value="48h" />
```

**Libs aproveitadas**:
- Lucide React: Icons
- React CountUp: Números animados

**Checklist**:
- [ ] Criar UrgencyBadge component
- [ ] Adicionar em Final CTA
- [ ] A/B test diferentes mensagens
- [ ] Commit: "feat(cta): urgency and scarcity elements"

---

#### Patch 1.3.3: CTA Analytics Integration ⏳
**Tempo**: 15min | **Prioridade**: P2

**Implementação**:
```tsx
// src/lib/useTracking.ts (já existe, melhorar)

// Adicionar eventos específicos
export const trackCTAClick = (
  ctaId: string,
  stage: 'awareness' | 'consideration' | 'decision',
  metadata?: Record<string, any>
) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_id: ctaId,
      funnel_stage: stage,
      ...metadata
    });
  }

  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', 'CTA Click', {
      ctaId,
      stage,
      ...metadata
    });
  }

  // Console log em dev
  if (process.env.NODE_ENV === 'development') {
    console.log('[CTA Click]', { ctaId, stage, metadata });
  }
};

// Hook para tracking automático
export const useCtaTracking = (ctaId: string, stage: string) => {
  const handleClick = useCallback((metadata?: Record<string, any>) => {
    trackCTAClick(ctaId, stage as any, metadata);
  }, [ctaId, stage]);

  return { trackClick: handleClick };
};
```

**Libs aproveitadas**:
- @vercel/analytics (já instalado)
- Google Analytics Data API (já instalado)

**Checklist**:
- [ ] Melhorar useTracking
- [ ] Integrar em todos CTAs
- [ ] Testar eventos no console
- [ ] Commit: "feat(analytics): CTA tracking integration"

---

## 🎨 FASE 2: Visual & UX (5h)

**Objetivo**: Design unificado + Hierarquia visual + Micro-interactions
**Libs utilizadas**: Framer Motion, Radix UI, Tailwind utilities

---

### 📦 MÓDULO 2.1: Dark Theme Unification (1.5h)

#### Patch 2.1.1: ValueProp Dark Theme ⏳
**Tempo**: 30min | **Prioridade**: P0

**Alterações**:
```tsx
// src/components/sections/UnifiedValueProposition.tsx

// ❌ Antes
<section className="py-24 bg-gradient-to-b from-white to-slate-50">
  <Card className="border-2 border-slate-200 bg-white/80">
    <div className="text-slate-900">

// ✅ Depois
<section className="arco-section bg-gradient-to-b from-slate-950 to-slate-900">
  <Card className="border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
    <div className="text-white">
```

**Mapeamento de cores**:
```tsx
// Criar utility para conversão automática
const darkThemeMap = {
  'bg-white': 'bg-slate-900',
  'bg-slate-50': 'bg-slate-800',
  'text-slate-900': 'text-white',
  'text-slate-600': 'text-slate-300',
  'text-slate-500': 'text-slate-400',
  'border-slate-200': 'border-slate-700/50',
  'bg-blue-50': 'bg-blue-500/10',
  'bg-purple-50': 'bg-purple-500/10',
};
```

**Checklist**:
- [ ] Converter ValueProp para dark
- [ ] Ajustar contraste WCAG AA
- [ ] Testar legibilidade
- [ ] Commit: "feat(theme): unify dark theme - ValueProp"

---

#### Patch 2.1.2: Global Theme System ⏳
**Tempo**: 45min | **Prioridade**: P1

**Implementação**:
```tsx
// src/lib/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}  // Force dark
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// src/app/layout.tsx
import { ThemeProvider } from '@/lib/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Libs aproveitadas**:
- next-themes (já instalado)

**Checklist**:
- [ ] Configurar ThemeProvider
- [ ] Forçar dark mode
- [ ] Remover light mode styles
- [ ] Commit: "feat(theme): enforce dark mode globally"

---

#### Patch 2.1.3: Color Palette Documentation ⏳
**Tempo**: 15min | **Prioridade**: P2

**Criar arquivo**:
```tsx
// src/design-system/color-palette.ts
export const colorPalette = {
  // Primary
  teal: {
    50: '#f0fdfa',
    500: '#14b8a6',  // Main
    600: '#0d9488',
  },

  // Secondary
  orange: {
    50: '#fff7ed',
    500: '#f97316',  // Main
    600: '#ea580c',
  },

  // Semantic
  success: {
    500: '#10b981',
  },
  warning: {
    500: '#f59e0b',
  },
  error: {
    500: '#ef4444',
  },

  // Neutrals (dark theme)
  slate: {
    950: '#020617',  // Background primary
    900: '#0f172a',  // Background secondary
    800: '#1e293b',  // Surface
    700: '#334155',  // Border
    400: '#94a3b8',  // Text secondary
    300: '#cbd5e1',  // Text primary
  },
} as const;

// Exportar como CSS variables
export const colorsToCSSVars = () => {
  return Object.entries(colorPalette).flatMap(([color, shades]) =>
    Object.entries(shades).map(([shade, value]) =>
      `--color-${color}-${shade}: ${value};`
    )
  ).join('\n');
};
```

**Checklist**:
- [ ] Documentar paleta
- [ ] Exportar CSS vars
- [ ] Commit: "docs(design): color palette documentation"

---

### 📦 MÓDULO 2.2: Visual Hierarchy (2h)

#### Patch 2.2.1: Typography Scale ⏳
**Tempo**: 30min | **Prioridade**: P0

**Problema**: Headers sem hierarquia consistente

**Solução**:
```tsx
// src/styles/typography.css
.arco-h1 {
  @apply text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight;
}

.arco-h2 {
  @apply text-4xl lg:text-5xl font-bold text-white leading-tight;
}

.arco-h3 {
  @apply text-2xl lg:text-3xl font-semibold text-white;
}

.arco-body-large {
  @apply text-lg text-slate-300 leading-relaxed;
}

.arco-body {
  @apply text-base text-slate-400 leading-normal;
}

.arco-caption {
  @apply text-sm text-slate-500;
}
```

**Aplicar**:
```tsx
// Antes
<h2 className="text-4xl lg:text-5xl font-bold text-white">

// Depois
<h2 className="arco-h2">
```

**Checklist**:
- [ ] Criar typography classes
- [ ] Aplicar em todos headers
- [ ] Validar hierarquia visual
- [ ] Commit: "feat(design): consistent typography scale"

---

#### Patch 2.2.2: Enhanced Metric Cards ⏳
**Tempo**: 45min | **Prioridade**: P1

**Melhorar**:
```tsx
// src/components/ui/metric-card.tsx
interface MetricCardProps {
  value: string | number;
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  emphasis?: 'high' | 'medium' | 'low';  // Novo
  trend?: 'up' | 'down' | 'neutral';     // Novo
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  subtext,
  icon,
  emphasis = 'medium',
  trend
}) => {
  const emphasisStyles = {
    high: 'text-6xl',      // Destaque
    medium: 'text-4xl',    // Normal
    low: 'text-3xl'        // Secundário
  };

  const trendIcons = {
    up: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    down: <TrendingDown className="w-5 h-5 text-red-500" />,
    neutral: null
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="arco-card p-6"
    >
      {icon && <div className="mb-4">{icon}</div>}

      <div className="flex items-baseline gap-2">
        <div className={`font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent ${emphasisStyles[emphasis]}`}>
          {value}
        </div>
        {trend && trendIcons[trend]}
      </div>

      <div className="arco-body mt-2">{label}</div>
      {subtext && <div className="arco-caption mt-1">{subtext}</div>}
    </motion.div>
  );
};
```

**Libs aproveitadas**:
- Framer Motion: Animations
- Lucide React: Trend icons
- React CountUp: Número animado no value

**Aplicar em**:
- ValueProp metrics
- ClientStories overall stats
- ROI Calculator results

**Checklist**:
- [ ] Criar MetricCard component
- [ ] Adicionar emphasis levels
- [ ] Integrar React CountUp
- [ ] Atualizar 3 seções
- [ ] Commit: "feat(ui): enhanced metric cards with hierarchy"

---

#### Patch 2.2.3: Visual Focus States ⏳
**Tempo**: 30min | **Prioridade**: P2

**Implementação**:
```css
/* src/styles/focus-states.css */

/* Keyboard navigation */
*:focus-visible {
  @apply outline-none ring-2 ring-teal-500 ring-offset-2 ring-offset-slate-950;
}

/* Interactive elements */
.arco-interactive {
  @apply transition-all duration-200 hover:scale-[1.02] active:scale-[0.98];
}

.arco-button-focus {
  @apply focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2;
}

/* Cards */
.arco-card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-1;
}
```

**Aplicar**:
```tsx
<Button className="arco-button-focus arco-interactive">
<Card className="arco-card-hover">
```

**Checklist**:
- [ ] Criar focus states
- [ ] Aplicar em buttons/cards/links
- [ ] Testar navegação por teclado
- [ ] Commit: "feat(a11y): visual focus states"

---

### 📦 MÓDULO 2.3: Micro-interactions (1.5h)

#### Patch 2.3.1: Form Interactions ⏳
**Tempo**: 30min | **Prioridade**: P1

**ROI Calculator - Feedback visual**:
```tsx
// Adicionar estados visuais aos inputs
const [inputState, setInputState] = useState<'idle' | 'valid' | 'invalid'>('idle');

<div className={`relative ${inputState === 'valid' ? 'ring-2 ring-emerald-500' : inputState === 'invalid' ? 'ring-2 ring-red-500' : ''}`}>
  <input
    type="number"
    value={inputs.monthlyRevenue}
    onChange={(e) => {
      const value = parseInt(e.target.value);
      handleInputChange('monthlyRevenue', value);

      // Validação visual
      if (value >= 1000) {
        setInputState('valid');
      } else {
        setInputState('invalid');
      }
    }}
    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
  />

  {/* Ícone de validação */}
  {inputState === 'valid' && (
    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
  )}
  {inputState === 'invalid' && (
    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
  )}
</div>
```

**Libs aproveitadas**:
- React Hook Form: Estados de validação
- Lucide React: Icons de feedback

**Checklist**:
- [ ] Adicionar estados visuais
- [ ] Implementar ícones de validação
- [ ] Testar fluxo completo
- [ ] Commit: "feat(form): visual feedback on validation"

---

#### Patch 2.3.2: Loading States ⏳
**Tempo**: 25min | **Prioridade**: P2

**Implementação**:
```tsx
// src/components/ui/loading-spinner.tsx
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeMap[size]} animate-spin rounded-full border-2 border-slate-700 border-t-teal-500`} />
  );
};

// Skeleton loader
export const SkeletonCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-slate-800 rounded w-1/2"></div>
  </div>
);
```

**Aplicar em**:
- ROI Calculator (calculando)
- Client Stories (carregando cases)

**Libs aproveitadas**:
- Framer Motion: Stagger animations
- CSS animations: Pulse effect

**Checklist**:
- [ ] Criar loading components
- [ ] Adicionar em async operations
- [ ] Commit: "feat(ui): loading states and skeletons"

---

#### Patch 2.3.3: Success/Error Feedback ⏳
**Tempo**: 35min | **Prioridade**: P1

**Implementação**:
```tsx
// Usar sonner (já instalado)
import { toast } from 'sonner';

// ROI Calculator - Após cálculo
const handleCalculate = () => {
  const results = calculateROI(inputs);
  setResults(results);

  // Toast de sucesso
  toast.success('Diagnóstico gerado com sucesso!', {
    description: `Oportunidade identificada: R$ ${results.potentialRecovery.toLocaleString()}/mês`,
    action: {
      label: 'Ver Relatório',
      onClick: () => scrollToSection('results')
    }
  });
};

// Error handling
try {
  // ... validação
} catch (error) {
  toast.error('Erro na validação', {
    description: error.message
  });
}
```

**Libs aproveitadas**:
- Sonner (já instalado): Toast notifications
- React Hot Toast (alternativa, já instalado)

**Checklist**:
- [ ] Configurar Sonner
- [ ] Adicionar success/error toasts
- [ ] Customizar estilos (dark theme)
- [ ] Commit: "feat(feedback): toast notifications with Sonner"

---

## 🚀 FASE 3: Features & Libs (6h)

**Objetivo**: Amadurecer funcionalidades + Aproveitar libs instaladas
**Libs utilizadas**: Zustand, SWR, React Query, Chart.js

---

### 📦 MÓDULO 3.1: State Management (2h)

#### Patch 3.1.1: Zustand Global Store ⏳
**Tempo**: 45min | **Prioridade**: P1

**Implementação**:
```tsx
// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ROIState {
  lastCalculation: ROIResults | null;
  userInputs: ROIInputs | null;
  setCalculation: (inputs: ROIInputs, results: ROIResults) => void;
  clearCalculation: () => void;
}

export const useROIStore = create<ROIState>()(
  persist(
    (set) => ({
      lastCalculation: null,
      userInputs: null,
      setCalculation: (inputs, results) => set({
        userInputs: inputs,
        lastCalculation: results
      }),
      clearCalculation: () => set({
        lastCalculation: null,
        userInputs: null
      })
    }),
    {
      name: 'arco-roi-storage',
    }
  )
);

// Hook de analytics
interface AnalyticsState {
  events: Array<{ event: string; timestamp: number; metadata?: any }>;
  trackEvent: (event: string, metadata?: any) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  events: [],
  trackEvent: (event, metadata) => set((state) => ({
    events: [...state.events, { event, timestamp: Date.now(), metadata }]
  }))
}));
```

**Libs aproveitadas**:
- Zustand (já instalado)
- LocalStorage persistence

**Benefícios**:
- Compartilhar resultado ROI entre seções
- Persistir inputs do usuário
- Analytics em memória

**Checklist**:
- [ ] Criar Zustand stores
- [ ] Integrar em ROICalculator
- [ ] Persistir em localStorage
- [ ] Commit: "feat(state): Zustand global store"

---

#### Patch 3.1.2: Form State with React Hook Form ⏳
**Tempo**: 45min | **Prioridade**: P0

**Refatorar ROICalculator**:
```tsx
// src/components/sections/ROICalculator.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const roiFormSchema = z.object({
  monthlyRevenue: z.number().min(1000, 'Receita mínima: R$ 1.000'),
  currentLoadTime: z.number().min(0.5).max(10, 'LCP deve estar entre 0.5s e 10s'),
  mobileTrafficPercentage: z.number().min(0).max(100),
  industry: z.enum(['ecommerce', 'saas', 'finance', 'healthcare', 'education', 'real_estate'])
});

type ROIFormData = z.infer<typeof roiFormSchema>;

export const ROICalculator: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ROIFormData>({
    resolver: zodResolver(roiFormSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: ROIFormData) => {
    const results = calculateROI(data);
    setResults(results);
    useROIStore.getState().setCalculation(data, results);
    toast.success('Diagnóstico gerado!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('monthlyRevenue', { valueAsNumber: true })} />
      {errors.monthlyRevenue && <p className="text-red-400">{errors.monthlyRevenue.message}</p>}

      <Button type="submit" disabled={!isValid}>
        Gerar Relatório
      </Button>
    </form>
  );
};
```

**Libs aproveitadas**:
- React Hook Form (já instalado)
- Zod (já instalado)
- @hookform/resolvers (já instalado)

**Checklist**:
- [ ] Refatorar form com RHF
- [ ] Adicionar Zod validation
- [ ] Integrar com Zustand
- [ ] Commit: "refactor(calculator): React Hook Form + Zod"

---

#### Patch 3.1.3: URL State Persistence ⏳
**Tempo**: 30min | **Prioridade**: P2

**Implementação**:
```tsx
// src/lib/use-url-state.ts
import { useRouter, useSearchParams } from 'next/navigation';

export const useURLState = <T,>(key: string, defaultValue: T) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get(key)
    ? JSON.parse(searchParams.get(key)!)
    : defaultValue;

  const setValue = (newValue: T) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, JSON.stringify(newValue));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return [value, setValue] as const;
};

// Uso em ROICalculator
const [results, setResults] = useURLState<ROIResults | null>('roi-results', null);

// Permite compartilhar URL com resultados
// https://arco.com?roi-results={...}
```

**Benefícios**:
- Compartilhar diagnóstico via URL
- Reload da página mantém estado
- Deep linking

**Checklist**:
- [ ] Criar useURLState hook
- [ ] Integrar em Calculator
- [ ] Testar share functionality
- [ ] Commit: "feat(state): URL state persistence"

---

### 📦 MÓDULO 3.2: Data Fetching & Caching (2h)

#### Patch 3.2.1: SWR for Case Studies ⏳
**Tempo**: 45min | **Prioridade**: P2

**Problema**: Case studies hardcoded

**Solução**: Buscar de API/CMS
```tsx
// src/lib/api/case-studies.ts
export async function fetchCaseStudies(industry?: string) {
  const res = await fetch(`/api/case-studies?industry=${industry || 'all'}`);
  return res.json();
}

// src/components/sections/OptimizedClientStories.tsx
import useSWR from 'swr';

export const OptimizedClientStories: React.FC = () => {
  const { data: caseStudies, error, isLoading } = useSWR(
    '/api/case-studies',
    fetchCaseStudies,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000  // 1min cache
    }
  );

  if (isLoading) return <SkeletonCard />;
  if (error) return <ErrorState />;

  return (
    <section>
      {caseStudies.map((study) => (
        <CaseStudyCard key={study.id} {...study} />
      ))}
    </section>
  );
};
```

**Libs aproveitadas**:
- SWR (já instalado)
- Next.js API routes

**Criar API**:
```tsx
// src/app/api/case-studies/route.ts
import { NextResponse } from 'next/server';

const CASE_STUDIES = [
  { id: 1, company: 'TechCommerce', industry: 'ecommerce', ... },
  { id: 2, company: 'FinanceFlow', industry: 'saas', ... },
  { id: 3, company: 'RetailMax', industry: 'retail', ... },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const industry = searchParams.get('industry');

  const filtered = industry && industry !== 'all'
    ? CASE_STUDIES.filter((c) => c.industry === industry)
    : CASE_STUDIES;

  return NextResponse.json(filtered);
}
```

**Checklist**:
- [ ] Criar API route
- [ ] Integrar SWR
- [ ] Adicionar loading/error states
- [ ] Commit: "feat(data): SWR for case studies"

---

#### Patch 3.2.2: React Query for Analytics ⏳
**Tempo**: 45min | **Prioridade**: P3

**Implementação**:
```tsx
// src/lib/queries/analytics.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await fetch('/api/analytics/summary');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,  // 5min
    refetchInterval: 30 * 60 * 1000  // 30min auto-refresh
  });
};

export const useTrackEvent = () => {
  return useMutation({
    mutationFn: async (event: { name: string; metadata?: any }) => {
      await fetch('/api/analytics/track', {
        method: 'POST',
        body: JSON.stringify(event)
      });
    }
  });
};

// Uso em componentes
const { data: analytics } = useAnalytics();
const { mutate: trackEvent } = useTrackEvent();

<Button onClick={() => trackEvent({ name: 'cta_click', metadata: { stage: 'hero' } })}>
```

**Libs aproveitadas**:
- @tanstack/react-query (já instalado)
- @tanstack/react-query-devtools (já instalado, dev mode)

**Checklist**:
- [ ] Setup React Query Provider
- [ ] Criar analytics queries
- [ ] Adicionar devtools
- [ ] Commit: "feat(analytics): React Query integration"

---

#### Patch 3.2.3: Optimistic Updates ⏳
**Tempo**: 30min | **Prioridade**: P3

**Implementação**:
```tsx
// Formulário de contato com optimistic update
const { mutate } = useMutation({
  mutationFn: submitContactForm,
  onMutate: async (newData) => {
    // Cancelar refetch
    await queryClient.cancelQueries({ queryKey: ['contacts'] });

    // Snapshot do estado anterior
    const previousContacts = queryClient.getQueryData(['contacts']);

    // Optimistic update (mostrar sucesso imediato)
    queryClient.setQueryData(['contacts'], (old: any) => [...old, newData]);

    toast.success('Mensagem enviada!');

    return { previousContacts };
  },
  onError: (err, newData, context) => {
    // Rollback em caso de erro
    queryClient.setQueryData(['contacts'], context?.previousContacts);
    toast.error('Erro ao enviar. Tente novamente.');
  }
});
```

**Benefício**: UX instantâneo

**Checklist**:
- [ ] Implementar optimistic updates
- [ ] Testar rollback em erro
- [ ] Commit: "feat(ux): optimistic UI updates"

---

### 📦 MÓDULO 3.3: Advanced Features (2h)

#### Patch 3.3.1: Charts Integration ⏳
**Tempo**: 45min | **Prioridade**: P2

**ROI Calculator - Visualização de dados**:
```tsx
// src/components/sections/ROIChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ROIChartProps {
  results: ROIResults;
}

export const ROIChart: React.FC<ROIChartProps> = ({ results }) => {
  const data = {
    labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 6', 'Mês 12'],
    datasets: [
      {
        label: 'Receita Recuperada Acumulada',
        data: [
          results.potentialRecovery,
          results.potentialRecovery * 2,
          results.potentialRecovery * 3,
          results.potentialRecovery * 6,
          results.annualRecovery
        ],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Projeção de Recuperação de Receita', color: '#fff' }
    },
    scales: {
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      },
      x: {
        ticks: { color: '#94a3b8' },
        grid: { display: false }
      }
    }
  };

  return <Line data={data} options={options} />;
};
```

**Libs aproveitadas**:
- react-chartjs-2 (já instalado)
- chart.js (já instalado)

**Benefícios**:
- Visualização clara de ROI
- Projeção em timeline
- Mais persuasivo

**Checklist**:
- [ ] Criar ROIChart component
- [ ] Integrar em Calculator
- [ ] Customizar theme dark
- [ ] Commit: "feat(viz): ROI projection chart"

---

#### Patch 3.3.2: PDF Report Generation ⏳
**Tempo**: 45min | **Prioridade**: P2

**Implementação**:
```tsx
// src/lib/generate-pdf-report.ts
import { jsPDF } from 'jspdf';

export const generateROIReport = (inputs: ROIInputs, results: ROIResults) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.text('Diagnóstico de Oportunidade ARCO', 20, 20);

  // Inputs
  doc.setFontSize(14);
  doc.text('Dados da Análise:', 20, 40);
  doc.setFontSize(10);
  doc.text(`Receita Mensal: R$ ${inputs.monthlyRevenue.toLocaleString()}`, 20, 50);
  doc.text(`LCP Atual: ${inputs.currentLoadTime}s`, 20, 60);
  doc.text(`Tráfego Mobile: ${inputs.mobileTrafficPercentage}%`, 20, 70);

  // Results
  doc.setFontSize(14);
  doc.text('Oportunidade Identificada:', 20, 90);
  doc.setFontSize(16);
  doc.setTextColor(239, 68, 68);  // Red
  doc.text(`Perda Mensal: R$ ${results.currentLoss.toLocaleString()}`, 20, 100);
  doc.setTextColor(16, 185, 129);  // Green
  doc.text(`Recuperação Potencial: R$ ${results.potentialRecovery.toLocaleString()}`, 20, 110);

  // ROI
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`ROI Anual: ${results.roi}%`, 20, 130);
  doc.text(`Payback: ${results.paybackPeriod} meses`, 20, 140);

  // Metodologia
  doc.setFontSize(10);
  doc.text('Cálculo baseado em 7% de perda por 100ms acima de 1.8s LCP,', 20, 160);
  doc.text('com multiplicadores por indústria e suposição de 80% de recuperação.', 20, 170);

  // Footer
  doc.text('ARCO - Performance-Driven Lead Generation', 20, 280);
  doc.text(new Date().toLocaleDateString('pt-BR'), 160, 280);

  return doc;
};

// Uso em ROICalculator
<Button onClick={() => {
  const pdf = generateROIReport(inputs, results);
  pdf.save(`arco-diagnostico-${Date.now()}.pdf`);
  trackEvent('pdf_download', { results });
}}>
  <Download className="w-4 h-4 mr-2" />
  Baixar Relatório PDF
</Button>
```

**Libs necessárias**:
```bash
pnpm add jspdf
```

**Checklist**:
- [ ] Instalar jsPDF
- [ ] Implementar generateROIReport
- [ ] Adicionar botão download
- [ ] Track downloads
- [ ] Commit: "feat(export): PDF report generation"

---

#### Patch 3.3.3: Email Capture & Lead Form ⏳
**Tempo**: 30min | **Prioridade**: P1

**Implementação**:
```tsx
// src/components/forms/LeadCaptureForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().min(2, 'Nome da empresa obrigatório'),
  industry: z.enum(['ecommerce', 'saas', 'finance', 'healthcare', 'education', 'real_estate']),
  monthlyRevenue: z.enum(['<10k', '10k-50k', '50k-100k', '100k+'])
});

type LeadFormData = z.infer<typeof leadSchema>;

export const LeadCaptureForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema)
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Análise solicitada! Retornamos em até 4h.', {
        duration: 5000
      });
      trackEvent('lead_captured', { industry: data.industry });
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <input {...register('name')} placeholder="Nome completo" />
      {errors.name && <p className="text-red-400">{errors.name.message}</p>}

      <input {...register('email')} type="email" placeholder="Email profissional" />
      {errors.email && <p className="text-red-400">{errors.email.message}</p>}

      <input {...register('company')} placeholder="Empresa" />
      {errors.company && <p className="text-red-400">{errors.company.message}</p>}

      <select {...register('industry')}>
        <option value="ecommerce">E-commerce</option>
        <option value="saas">SaaS</option>
        {/* ... */}
      </select>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" /> : 'Solicitar Análise'}
      </Button>
    </form>
  );
};
```

**API Route**:
```tsx
// src/app/api/leads/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  // Validar
  // Salvar em banco (Prisma)
  // Enviar email (Resend, SendGrid)
  // Integrar CRM (webhook)

  return NextResponse.json({ success: true });
}
```

**Libs aproveitadas**:
- React Hook Form
- Zod
- Prisma (já instalado) - salvar leads
- (Futuro: Resend/SendGrid para email)

**Checklist**:
- [ ] Criar LeadCaptureForm
- [ ] Implementar API route
- [ ] Integrar com Final CTA
- [ ] Commit: "feat(leads): capture form with validation"

---

## 📊 Progress Tracking Summary

### Por Fase:

| Fase | Patches | Completos | Progresso |
|------|---------|-----------|-----------|
| **Fase 1** | 9 | 0 | ⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% |
| **Fase 2** | 9 | 0 | ⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% |
| **Fase 3** | 9 | 0 | ⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% |

### Por Módulo:

**FASE 1: Copy & Storytelling**
- [⏳] Módulo 1.1: Professional Copy (0/3)
- [⏳] Módulo 1.2: TransitionBridge (0/3)
- [⏳] Módulo 1.3: Enhanced CTAs (0/3)

**FASE 2: Visual & UX**
- [⏳] Módulo 2.1: Dark Theme (0/3)
- [⏳] Módulo 2.2: Visual Hierarchy (0/3)
- [⏳] Módulo 2.3: Micro-interactions (0/3)

**FASE 3: Features & Libs**
- [⏳] Módulo 3.1: State Management (0/3)
- [⏳] Módulo 3.2: Data Fetching (0/3)
- [⏳] Módulo 3.3: Advanced Features (0/3)

---

## 🎯 Próximo Passo

Iniciar **FASE 1 - Patch 1.1.1** (Hero Section Copy)?

**Tempo**: 20min
**Libs**: Nenhuma nova instalação
**Risco**: Baixo (apenas texto)
**Impacto**: Alto (primeira impressão)
