/**
 * ARCO Technical Theme Tokens
 * Enterprise-grade design tokens for technical applications
 * Harmonized with globals.css design system
 */

// Type definitions for design tokens
interface ColorVariant {
  primary: string;
  muted: string;
  foreground: string;
}

interface SurfaceColors {
  canvas: string;
  elevated: string;
  overlay: string;
  accent: string;
  interactive: string;
  border: string;
}

interface StatusColors {
  success: ColorVariant;
  warning: ColorVariant;
  error: ColorVariant;
  info: ColorVariant;
  neutral: ColorVariant;
}

interface AccentColors {
  blue: ColorVariant;
  emerald: ColorVariant;
  purple: ColorVariant;
  amber: ColorVariant;
}

interface TechnicalColors {
  surface: SurfaceColors;
  status: StatusColors;
  accent: AccentColors;
}

interface TypographyStyle {
  fontSize: string;
  lineHeight: string;
  fontFamily?: string;
  fontWeight?: string;
  letterSpacing?: string;
}

interface TypographyScale {
  xs?: TypographyStyle;
  sm?: TypographyStyle;
  base: TypographyStyle;
  lg?: TypographyStyle;
  xl?: TypographyStyle;
}

interface TypographyScales {
  code: TypographyScale;
  metric: TypographyScale;
  display: TypographyScale;
}

interface SpacingScale {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

interface SpacingScales {
  component: SpacingScale;
  layout: SpacingScale;
}

interface MotionDuration {
  instant: string;
  fast: string;
  base: string;
  slow: string;
  slower: string;
  slowest: string;
}

interface MotionEasing {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  sharp: string;
  spring: string;
  anticipate: string;
  smooth: string;
}

interface Motion {
  duration: MotionDuration;
  easing: MotionEasing;
}

interface ShadowScale {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
}

interface GlowEffects {
  blue: string;
  emerald: string;
  purple: string;
  amber: string;
}

interface InnerShadows {
  sm: string;
  base: string;
  lg: string;
}

interface Elevation {
  shadow: ShadowScale;
  glow: GlowEffects;
  inner: InnerShadows;
}

interface RadiusScale {
  none: string;
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

interface OpacityScale {
  disabled: string;
  secondary: string;
  primary: string;
  overlay: string;
  solid: string;
}

interface ZIndexScale {
  hide: string;
  auto: string;
  base: string;
  docked: string;
  dropdown: string;
  sticky: string;
  banner: string;
  overlay: string;
  modal: string;
  popover: string;
  skipLink: string;
  toast: string;
  tooltip: string;
}

interface TechnicalTokens {
  colors: TechnicalColors;
  typography: {
    fontFamily: {
      mono: string[];
      sans: string[];
      display: string[];
    };
    scale: TypographyScales;
  };
  spacing: SpacingScales;
  motion: Motion;
  elevation: Elevation;
  radius: RadiusScale;
  opacity: OpacityScale;
  zIndex: ZIndexScale;
}

export const technicalTokens: TechnicalTokens = {
  // Core semantic colors extending base system
  colors: {
    // Technical surface hierarchy (extends base background/card)
    surface: {
      canvas: 'hsl(240, 10%, 3.9%)',      // Primary background
      elevated: 'hsl(240, 6%, 6%)',       // Cards, modals
      overlay: 'hsl(240, 8%, 8%)',        // Overlays, popovers
      accent: 'hsl(240, 5%, 11%)',        // Hover states
      interactive: 'hsl(240, 4%, 15%)',   // Buttons, inputs
      border: 'hsl(240, 3.7%, 15.9%)'     // Consistent with globals.css
    },

    // Technical status system (extends destructive, etc.)
    status: {
      success: {
        primary: 'hsl(142, 71%, 45%)',
        muted: 'hsl(142, 71%, 15%)',
        foreground: 'hsl(142, 71%, 95%)'
      },
      warning: {
        primary: 'hsl(38, 92%, 50%)',
        muted: 'hsl(38, 92%, 15%)',
        foreground: 'hsl(38, 92%, 95%)'
      },
      error: {
        primary: 'hsl(0, 84%, 60%)',
        muted: 'hsl(0, 84%, 15%)',
        foreground: 'hsl(0, 84%, 95%)'
      },
      info: {
        primary: 'hsl(199, 89%, 48%)',
        muted: 'hsl(199, 89%, 15%)',
        foreground: 'hsl(199, 89%, 95%)'
      },
      neutral: {
        primary: 'hsl(240, 5%, 64.9%)',
        muted: 'hsl(240, 3.7%, 15.9%)',
        foreground: 'hsl(240, 5%, 84.9%)'
      }
    },

    // Technical accent palette
    accent: {
      blue: {
        primary: 'hsl(217, 91%, 60%)',
        muted: 'hsl(217, 91%, 15%)',
        foreground: 'hsl(217, 91%, 95%)'
      },
      emerald: {
        primary: 'hsl(142, 71%, 45%)',
        muted: 'hsl(142, 71%, 15%)',
        foreground: 'hsl(142, 71%, 95%)'
      },
      purple: {
        primary: 'hsl(262, 83%, 58%)',
        muted: 'hsl(262, 83%, 15%)',
        foreground: 'hsl(262, 83%, 95%)'
      },
      amber: {
        primary: 'hsl(43, 96%, 56%)',
        muted: 'hsl(43, 96%, 15%)',
        foreground: 'hsl(43, 96%, 95%)'
      }
    }
  },

  // Technical typography extending base system
  typography: {
    // Font stacks optimized for technical content
    fontFamily: {
      mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', 'monospace'],
      sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      display: ['Cal Sans', 'SF Pro Display', 'Inter', 'sans-serif']
    },

    // Technical scale for code, metrics, and data
    scale: {
      // Code typography
      code: {
        xs: { fontSize: '0.75rem', lineHeight: '1.5', fontFamily: 'mono' },
        sm: { fontSize: '0.875rem', lineHeight: '1.6', fontFamily: 'mono' },
        base: { fontSize: '1rem', lineHeight: '1.7', fontFamily: 'mono' },
        lg: { fontSize: '1.125rem', lineHeight: '1.7', fontFamily: 'mono' }
      },

      // Metric/data display
      metric: {
        sm: { fontSize: '1.25rem', lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' },
        base: { fontSize: '1.875rem', lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' },
        lg: { fontSize: '2.25rem', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' },
        xl: { fontSize: '3rem', lineHeight: '1', fontWeight: '700', letterSpacing: '-0.03em' }
      },

      // Display typography
      display: {
        sm: { fontSize: '2.25rem', lineHeight: '1.2', fontWeight: '600', fontFamily: 'display', letterSpacing: '-0.02em' },
        base: { fontSize: '3rem', lineHeight: '1.1', fontWeight: '600', fontFamily: 'display', letterSpacing: '-0.03em' },
        lg: { fontSize: '3.75rem', lineHeight: '1', fontWeight: '700', fontFamily: 'display', letterSpacing: '-0.03em' },
        xl: { fontSize: '4.5rem', lineHeight: '1', fontWeight: '700', fontFamily: 'display', letterSpacing: '-0.04em' }
      }
    }
  },

  // Technical spacing system
  spacing: {
    // Component-specific spacing
    component: {
      xs: '0.25rem',    // 4px - tight spacing
      sm: '0.5rem',     // 8px - small spacing
      base: '0.75rem',  // 12px - default spacing
      md: '1rem',       // 16px - medium spacing
      lg: '1.5rem',     // 24px - large spacing
      xl: '2rem',       // 32px - extra large spacing
      '2xl': '3rem'     // 48px - section spacing
    },

    // Layout spacing
    layout: {
      xs: '1rem',       // 16px - minimal sections
      sm: '2rem',       // 32px - small sections
      base: '3rem',     // 48px - default sections
      md: '4rem',       // 64px - medium sections
      lg: '6rem',       // 96px - large sections
      xl: '8rem',       // 128px - hero sections
      '2xl': '12rem'    // 192px - major sections
    }
  },

  // Technical animation system
  motion: {
    // Duration scale
    duration: {
      instant: '0ms',
      fast: '150ms',      // Quick micro-interactions
      base: '250ms',      // Default transitions
      slow: '350ms',      // Deliberate animations
      slower: '500ms',    // Complex animations
      slowest: '750ms'    // Page transitions
    },

    // Easing functions for technical feel
    easing: {
      // Standard easing
      linear: 'linear',
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

      // Technical easing
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',        // Precise, technical
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // Bouncy, playful
      anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Anticipation
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth, elegant
    }
  },

  // Technical elevation system
  elevation: {
    // Standard shadows for technical UI
    shadow: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      base: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
      md: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
      lg: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
      xl: '0 25px 50px -12px rgb(0 0 0 / 0.6)'
    },

    // Technical glow effects
    glow: {
      blue: '0 0 20px hsl(217, 91%, 60% / 0.3), 0 0 40px hsl(217, 91%, 60% / 0.1)',
      emerald: '0 0 20px hsl(142, 71%, 45% / 0.3), 0 0 40px hsl(142, 71%, 45% / 0.1)',
      purple: '0 0 20px hsl(262, 83%, 58% / 0.3), 0 0 40px hsl(262, 83%, 58% / 0.1)',
      amber: '0 0 20px hsl(43, 96%, 56% / 0.3), 0 0 40px hsl(43, 96%, 56% / 0.1)'
    },

    // Inner shadows for depth
    inner: {
      sm: 'inset 0 1px 2px 0 rgb(0 0 0 / 0.3)',
      base: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
      lg: 'inset 0 4px 8px 0 rgb(0 0 0 / 0.4)'
    }
  },

  // Technical border radius system
  radius: {
    none: '0',
    xs: '0.125rem',     // 2px
    sm: '0.25rem',      // 4px
    base: '0.375rem',   // 6px
    md: '0.5rem',       // 8px - matches globals.css
    lg: '0.75rem',      // 12px
    xl: '1rem',         // 16px
    '2xl': '1.5rem',    // 24px
    full: '9999px'
  },

  // Technical opacity scale
  opacity: {
    disabled: '0.38',
    secondary: '0.6',
    primary: '0.87',
    overlay: '0.9',
    solid: '1'
  },

  // Technical z-index scale
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800'
  }
}

// Utility functions for token usage with proper types
export const getColor = (path: string): string | null => {
  const keys = path.split('.')
  let value: any = technicalTokens.colors
  
  for (const key of keys) {
    value = value?.[key]
    if (!value) return null
  }
  
  return typeof value === 'string' ? value : null
}

export const getTypography = (
  category: keyof TypographyScales, 
  size: string
): TypographyStyle | null => {
  const scale = technicalTokens.typography.scale[category]
  return (scale as any)?.[size] || null
}

export const getSpacing = (
  category: keyof SpacingScales, 
  size: string
): string | null => {
  const scale = technicalTokens.spacing[category]
  return (scale as any)?.[size] || null
}

// CSS-in-JS helpers with proper typing
export const cssVariables = {
  // Generate CSS custom properties
  toCSSVariables: (): Record<string, string> => {
    const vars: Record<string, string> = {}
    
    // Colors
    const processColors = (obj: any, prefix: string = '') => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          vars[`--color-${prefix}${key}`] = value
        } else if (typeof value === 'object' && value !== null) {
          processColors(value, `${prefix}${key}-`)
        }
      }
    }
    
    processColors(technicalTokens.colors)
    
    // Shadows
    for (const [name, value] of Object.entries(technicalTokens.elevation.shadow)) {
      vars[`--shadow-${name}`] = value
    }
    
    // Motion
    for (const [name, value] of Object.entries(technicalTokens.motion.duration)) {
      vars[`--duration-${name}`] = value
    }
    
    for (const [name, value] of Object.entries(technicalTokens.motion.easing)) {
      vars[`--ease-${name}`] = value
    }
    
    return vars
  }
}

// Type-safe color path type for better DX
export type ColorPath = 
  | `surface.${keyof SurfaceColors}`
  | `status.${keyof StatusColors}.${keyof ColorVariant}`
  | `accent.${keyof AccentColors}.${keyof ColorVariant}`

// Type-safe getters with string literal types
export const getColorTyped = (path: ColorPath): string | null => {
  return getColor(path)
}

export default technicalTokens