/**
 * ARCO Unified Design System - Executive Enhancement v2.0
 * 
 * Sistema maduro que integra os tokens técnicos existentes com os padrões executivos,
 * eliminando redundâncias e criando uma base sólida para a refatoração da homepage.
 * 
 * PHILOSOPHY:
 * - Consolidação ao invés de multiplicação
 * - Semântica clara e intuitiva
 * - Performance e manutenibilidade
 * - Executive-first, technically sound
 */

import { technicalTokens } from './tokens/technical'

// ====================================================================
// 1. UNIFIED SEMANTIC SYSTEM
// ====================================================================

/**
 * Semantic Color System
 * Unifica technicalTokens com padrões executivos
 */
export const semanticColors = {
  // Executive Brand Hierarchy
  brand: {
    primary: technicalTokens.colors.accent.blue.primary,
    secondary: technicalTokens.colors.surface.interactive,
    accent: technicalTokens.colors.accent.emerald.primary,
    muted: technicalTokens.colors.status.neutral.primary,
  },

  // Executive Communication States
  communication: {
    success: technicalTokens.colors.status.success.primary,
    warning: technicalTokens.colors.status.warning.primary,
    error: technicalTokens.colors.status.error.primary,
    info: technicalTokens.colors.status.info.primary,
    neutral: technicalTokens.colors.status.neutral.primary,
  },

  // Executive Surface Hierarchy
  surface: {
    canvas: technicalTokens.colors.surface.canvas,
    elevated: technicalTokens.colors.surface.elevated,
    interactive: technicalTokens.colors.surface.interactive,
    overlay: technicalTokens.colors.surface.overlay,
    border: technicalTokens.colors.surface.border,
  },

  // Executive Text Hierarchy
  text: {
    primary: 'hsl(0, 0%, 98%)',           // High contrast for attention
    secondary: 'hsl(220, 9%, 78%)',       // Supporting information
    tertiary: 'hsl(220, 9%, 64%)',        // Metadata and labels
    muted: 'hsl(220, 9%, 46%)',          // Disabled states
    inverse: 'hsl(220, 26%, 9%)',        // On light backgrounds
  }
} as const

/**
 * Executive Typography Scale
 * Consolidação semântica dos tamanhos técnicos
 */
export const executiveTypography = {
  // Executive Headline System
  headlines: {
    hero: technicalTokens.typography.scale.display.xl,      // 72px - Primary hero
    primary: technicalTokens.typography.scale.display.lg,   // 60px - Section heroes  
    secondary: technicalTokens.typography.scale.display.base, // 48px - Section headers
    tertiary: technicalTokens.typography.scale.metric.lg,   // 36px - Subsection headers
  },

  // Executive Body System
  body: {
    large: {
      fontSize: '1.125rem',
      lineHeight: '1.625',
      fontWeight: '400',
    },
    regular: {
      fontSize: '1rem', 
      lineHeight: '1.5',
      fontWeight: '400',
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.5', 
      fontWeight: '400',
    },
  },

  // Executive Metric System  
  metrics: {
    large: technicalTokens.typography.scale.metric.xl,      // 48px - Primary metrics
    medium: technicalTokens.typography.scale.metric.lg,     // 36px - Secondary metrics
    small: technicalTokens.typography.scale.metric.base,    // 30px - Supporting metrics
  },

  // Executive Label System
  labels: {
    emphasis: {
      fontSize: '0.875rem',
      lineHeight: '1.25',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    regular: {
      fontSize: '0.75rem',
      lineHeight: '1.25',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
  }
} as const

/**
 * Executive Spacing System
 * Consolidação semântica dos espaçamentos técnicos
 */
export const executiveSpacing = {
  // Component Spacing
  component: {
    xs: technicalTokens.spacing.component.xs,     // 4px - Tight elements
    sm: technicalTokens.spacing.component.sm,     // 8px - Related elements  
    base: technicalTokens.spacing.component.base, // 12px - Standard spacing
    md: technicalTokens.spacing.component.md,     // 16px - Section spacing
    lg: technicalTokens.spacing.component.lg,     // 24px - Large spacing
    xl: technicalTokens.spacing.component.xl,     // 32px - Extra large
  },

  // Layout Spacing
  layout: {
    section: technicalTokens.spacing.layout.base,   // 48px - Standard sections
    hero: technicalTokens.spacing.layout.lg,        // 96px - Hero sections  
    major: technicalTokens.spacing.layout.xl,       // 128px - Major transitions
    massive: technicalTokens.spacing.layout['2xl'], // 192px - Page transitions
  },

  // Executive-specific spacing
  executive: {
    scan: '1.5rem',      // 24px - Scannable spacing for executives
    decision: '2rem',    // 32px - Decision point spacing
    transition: '3rem',  // 48px - Section transitions
    attention: '4rem',   // 64px - Attention reset spacing
  }
} as const

/**
 * Executive Motion System
 * Timing e easing otimizados para atenção executiva
 */
export const executiveMotion = {
  // Executive-tuned durations
  duration: {
    instant: technicalTokens.motion.duration.instant,    // 0ms
    immediate: technicalTokens.motion.duration.fast,     // 150ms - Quick feedback
    considered: technicalTokens.motion.duration.base,    // 250ms - Standard
    deliberate: technicalTokens.motion.duration.slow,    // 350ms - Intentional
    executive: '400ms',                                   // 400ms - Executive pace
  },

  // Executive-tuned easing
  easing: {
    executive: technicalTokens.motion.easing.smooth,     // Elegant, professional
    sharp: technicalTokens.motion.easing.sharp,          // Precise, technical
    gentle: technicalTokens.motion.easing.ease,          // Approachable
    spring: technicalTokens.motion.easing.spring,        // Engaging
  },

  // Executive motion presets
  presets: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94] // smooth
      }
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.25, 
        ease: [0.4, 0, 0.2, 1] // ease
      }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { 
        duration: 0.35, 
        ease: [0.4, 0, 0.6, 1] // sharp
      }
    }
  }
} as const

/**
 * Executive Elevation System
 * Shadows e elevação para hierarquia visual
 */
export const executiveElevation = {
  // Standard elevation scale
  shadow: {
    none: 'none',
    subtle: technicalTokens.elevation.shadow.xs,
    soft: technicalTokens.elevation.shadow.sm,
    medium: technicalTokens.elevation.shadow.base,
    strong: technicalTokens.elevation.shadow.md,
    dramatic: technicalTokens.elevation.shadow.lg,
    floating: technicalTokens.elevation.shadow.xl,
  },

  // Executive-specific elevations
  executive: {
    card: technicalTokens.elevation.shadow.sm,
    cardHover: technicalTokens.elevation.shadow.md,
    modal: technicalTokens.elevation.shadow.lg,
    popover: technicalTokens.elevation.shadow.xl,
  },

  // Glow effects for status/accent
  glow: {
    success: technicalTokens.elevation.glow.emerald,
    info: technicalTokens.elevation.glow.blue,
    warning: technicalTokens.elevation.glow.amber,
    accent: technicalTokens.elevation.glow.purple,
  }
} as const

// ====================================================================
// 2. EXECUTIVE COMPONENT PATTERNS
// ====================================================================

/**
 * Executive Component Design Patterns
 * Padrões consolidados para componentes executivos
 */
export const executivePatterns = {
  // Hero Section Pattern
  hero: {
    container: 'executive-container',
    spacing: 'py-20 lg:py-32',
    background: 'executive-grid-pattern',
    content: {
      badge: 'executive-status-info mb-6',
      headline: 'executive-headline-primary mb-6',
      description: 'executive-body-large mb-8 max-w-3xl',
      actions: 'flex flex-col sm:flex-row gap-4 mb-12',
      indicators: 'flex flex-wrap items-center gap-8 opacity-70'
    }
  },

  // Card Pattern
  card: {
    base: 'executive-card',
    interactive: 'executive-card executive-card-interactive',
    content: {
      header: 'executive-subheadline mb-3',
      body: 'executive-body-regular mb-4',
      footer: 'mt-auto',
      status: 'executive-status-success'
    }
  },

  // Section Pattern
  section: {
    container: 'executive-section-padding',
    wrapper: 'executive-container',
    header: {
      wrapper: 'text-center mb-16',
      badge: 'executive-status-info mb-4 inline-block',
      headline: 'executive-headline-secondary mb-4',
      description: 'executive-body-large max-w-2xl mx-auto'
    }
  }
} as const

// ====================================================================
// 3. EXECUTIVE THEME INTEGRATION
// ====================================================================

/**
 * Executive Theme System
 * Integração com globals.css mantendo consistência
 */
export const executiveTheme = {
  // Light theme mapping
  light: {
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(220, 15%, 12%)',
    card: 'hsl(0, 0%, 100%)',
    border: 'hsl(220, 13%, 91%)',
    primary: semanticColors.brand.primary,
    secondary: semanticColors.brand.secondary,
    accent: semanticColors.brand.accent,
    muted: semanticColors.brand.muted,
  },

  // Dark theme mapping  
  dark: {
    background: technicalTokens.colors.surface.canvas,
    foreground: semanticColors.text.primary,
    card: technicalTokens.colors.surface.elevated,
    border: technicalTokens.colors.surface.border,
    primary: semanticColors.brand.primary,
    secondary: semanticColors.brand.secondary,
    accent: semanticColors.brand.accent,
    muted: semanticColors.brand.muted,
  }
} as const

// ====================================================================
// 4. UTILITY FUNCTIONS
// ====================================================================

/**
 * Design System Utilities
 * Funções para facilitar uso do sistema
 */
export const designSystem = {
  // Get semantic color
  color: (path: string) => {
    const keys = path.split('.')
    let value: any = semanticColors
    
    for (const key of keys) {
      value = value?.[key]
      if (!value) return null
    }
    
    return typeof value === 'string' ? value : null
  },

  // Get typography style
  typography: (category: string, size: string) => {
    const scale = (executiveTypography as any)[category]
    return scale?.[size] || null
  },

  // Get spacing value
  spacing: (category: string, size: string) => {
    const scale = (executiveSpacing as any)[category]
    return scale?.[size] || null
  },

  // Get elevation
  elevation: (type: string, level: string) => {
    const scale = (executiveElevation as any)[type]
    return scale?.[level] || null
  },

  // Get motion preset
  motion: (preset: string) => {
    return (executiveMotion.presets as any)[preset] || null
  }
} as const

// ====================================================================
// 5. CSS-IN-JS INTEGRATION
// ====================================================================

/**
 * CSS Variables Export
 * Para integração com globals.css
 */
export const cssVariables = {
  // Executive semantic colors
  ...Object.entries(semanticColors.brand).reduce((acc, [key, value]) => {
    acc[`--executive-brand-${key}`] = value
    return acc
  }, {} as Record<string, string>),

  // Executive spacing
  ...Object.entries(executiveSpacing.component).reduce((acc, [key, value]) => {
    acc[`--executive-spacing-${key}`] = value
    return acc
  }, {} as Record<string, string>),

  // Executive motion
  ...Object.entries(executiveMotion.duration).reduce((acc, [key, value]) => {
    acc[`--executive-duration-${key}`] = value
    return acc
  }, {} as Record<string, string>),

  // Executive elevation
  ...Object.entries(executiveElevation.shadow).reduce((acc, [key, value]) => {
    acc[`--executive-shadow-${key}`] = value
    return acc
  }, {} as Record<string, string>),
} as const

/**
 * Export consolidated system
 */
export const executiveDesignSystem = {
  colors: semanticColors,
  typography: executiveTypography,
  spacing: executiveSpacing,
  motion: executiveMotion,
  elevation: executiveElevation,
  patterns: executivePatterns,
  theme: executiveTheme,
  utils: designSystem,
  cssVars: cssVariables,
} as const

export default executiveDesignSystem

// ====================================================================
// 6. TYPE DEFINITIONS
// ====================================================================

export type SemanticColorPath = 
  | `brand.${keyof typeof semanticColors.brand}`
  | `communication.${keyof typeof semanticColors.communication}`
  | `surface.${keyof typeof semanticColors.surface}`
  | `text.${keyof typeof semanticColors.text}`

export type ExecutiveSpacingPath =
  | `component.${keyof typeof executiveSpacing.component}`
  | `layout.${keyof typeof executiveSpacing.layout}`
  | `executive.${keyof typeof executiveSpacing.executive}`

export type ExecutiveMotionPreset = keyof typeof executiveMotion.presets

export type ExecutiveElevationPath =
  | `shadow.${keyof typeof executiveElevation.shadow}`
  | `executive.${keyof typeof executiveElevation.executive}`
  | `glow.${keyof typeof executiveElevation.glow}`
