import { useEffect, useState } from 'react'

export type Locale = 'en' | 'pt' | 'es' | 'fr'

export interface Translation {
  [key: string]: any
}

export const translations: Record<Locale, Translation> = {
  en: {
    hero: {
      badge: 'Next.js • React • TypeScript Specialists',
      headline: 'Performance',
      subheadline: 'that converts',
      description: 'We optimize Core Web Vitals, reduce hosting costs, and modernize tech stacks. Faster sites, lower costs, better user experience.',
      cta: {
        primary: 'Analyze my site',
        secondary: 'View case studies'
      }
    },
    metrics: {
      costReduction: {
        value: '68%',
        label: 'Average hosting cost reduction',
        context: 'Through stack optimization & API efficiency'
      },
      performance: {
        value: '2.8s',
        label: 'Core Web Vitals improvement',
        context: 'Better user experience & retention'
      },
      development: {
        value: '45%',
        label: 'Faster development cycles',
        context: 'Modern stack & clean architecture'
      }
    },
    valueProposition: {
      badge: 'Performance & Cost Optimization',
      headline: 'Faster sites,',
      subheadline: 'lower costs',
      description: 'We specialize in optimizing Core Web Vitals, reducing hosting costs, and modernizing tech stacks. More conversions, less spending, better experience.',
      challenges: {
        title: 'The main problems we solve',
        subtitle: 'Slow sites, high costs, and outdated stacks hurt your business more than you think'
      }
    },
    challenges: [
      {
        category: 'Performance',
        problem: 'Slow sites hurt conversions',
        currentState: 'Poor Core Web Vitals',
        impact: '7% conversion loss per 100ms',
        painPoints: [
          'Low Lighthouse scores',
          'High bounce rate',
          'Poor SEO rankings',
          'Bad user experience'
        ]
      },
      {
        category: 'Costs',
        problem: 'Expensive hosting & APIs',
        currentState: 'Inefficient stacks',
        impact: '$3-12k/month unnecessary',
        painPoints: [
          'Server over-provisioning',
          'Poorly optimized APIs',
          'Misconfigured bundlers',
          'Slow database queries'
        ]
      },
      {
        category: 'Development',
        problem: 'Outdated tech stack',
        currentState: 'Legacy dependencies',
        impact: '40% slower releases',
        painPoints: [
          'Long build times',
          'Poor developer experience',
          'Compatibility bugs',
          'Complex maintenance'
        ]
      }
    ]
  },
  pt: {
    hero: {
      badge: 'Especialistas Next.js • React • TypeScript',
      headline: 'Performance',
      subheadline: 'que converte',
      description: 'Otimizamos Core Web Vitals, reduzimos custos de hosting e modernizamos stacks. Mais velocidade, menos gastos, melhor experiência do usuário.',
      cta: {
        primary: 'Analisar meu site',
        secondary: 'Ver casos de sucesso'
      }
    },
    metrics: {
      costReduction: {
        value: '68%',
        label: 'Redução média de custos de hosting',
        context: 'Através de otimização de stack & eficiência de API'
      },
      performance: {
        value: '2.8s',
        label: 'Melhoria em Core Web Vitals',
        context: 'Melhor experiência do usuário & retenção'
      },
      development: {
        value: '45%',
        label: 'Ciclos de desenvolvimento mais rápidos',
        context: 'Stack moderna & arquitetura limpa'
      }
    },
    valueProposition: {
      badge: 'Otimização de Performance & Custos',
      headline: 'Sites mais rápidos,',
      subheadline: 'custos menores',
      description: 'Especializamos em otimizar Core Web Vitals, reduzir custos de hosting e modernizar stacks. Mais conversões, menos gastos, melhor experiência.',
      challenges: {
        title: 'Os principais problemas que resolvemos',
        subtitle: 'Sites lentos, custos altos e stacks desatualizadas prejudicam seu negócio mais do que você imagina'
      }
    },
    challenges: [
      {
        category: 'Performance',
        problem: 'Sites lentos afetam conversões',
        currentState: 'Core Web Vitals ruins',
        impact: '7% de conversão perdida a cada 100ms',
        painPoints: [
          'Lighthouse scores baixos',
          'Alta taxa de rejeição',
          'SEO prejudicado',
          'Experiência do usuário ruim'
        ]
      },
      {
        category: 'Custos',
        problem: 'Hosting e APIs caros',
        currentState: 'Stacks ineficientes',
        impact: 'R$ 15-50k/mês desnecessários',
        painPoints: [
          'Over-provisioning de servidores',
          'APIs mal otimizadas',
          'Bundlers mal configurados',
          'Consultas SQL lentas'
        ]
      },
      {
        category: 'Desenvolvimento',
        problem: 'Stack desatualizada',
        currentState: 'Dependências obsoletas',
        impact: '40% mais tempo para releases',
        painPoints: [
          'Build times longos',
          'Developer experience ruim',
          'Bugs de compatibilidade',
          'Manutenção complexa'
        ]
      }
    ]
  },
  es: {
    hero: {
      badge: 'Especialistas Next.js • React • TypeScript',
      headline: 'Performance',
      subheadline: 'que convierte',
      description: 'Optimizamos Core Web Vitals, reducimos costos de hosting y modernizamos stacks. Más velocidad, menos gastos, mejor experiencia de usuario.',
      cta: {
        primary: 'Analizar mi sitio',
        secondary: 'Ver casos de éxito'
      }
    }
    // ... más traducciones
  },
  fr: {
    hero: {
      badge: 'Spécialistes Next.js • React • TypeScript',
      headline: 'Performance',
      subheadline: 'qui convertit',
      description: 'Nous optimisons Core Web Vitals, réduisons les coûts d\'hébergement et modernisons les stacks. Plus de vitesse, moins de dépenses, meilleure expérience utilisateur.',
      cta: {
        primary: 'Analyser mon site',
        secondary: 'Voir les études de cas'
      }
    }
    // ... plus de traductions
  }
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Detect user's preferred language
    const detectLocale = (): Locale => {
      // Priority: URL param > localStorage > browser language > default
      const urlParams = new URLSearchParams(window.location.search)
      const urlLang = urlParams.get('lang') as Locale
      if (urlLang && translations[urlLang]) {
        return urlLang
      }

      const savedLang = localStorage.getItem('preferred-language') as Locale
      if (savedLang && translations[savedLang]) {
        return savedLang
      }

      const browserLang = navigator.language.split('-')[0] as Locale
      if (browserLang && translations[browserLang]) {
        return browserLang
      }

      // Default to English for international reach
      return 'en'
    }

    const detectedLocale = detectLocale()
    setLocale(detectedLocale)
    setIsLoading(false)

    // Save preference
    localStorage.setItem('preferred-language', detectedLocale)
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('preferred-language', newLocale)
    
    // Update URL without reload
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.history.replaceState({}, '', url.toString())
  }

  return {
    locale,
    setLocale: changeLocale,
    t,
    isLoading,
    availableLocales: Object.keys(translations) as Locale[]
  }
}
