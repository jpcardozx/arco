/**
 * ARCO PATCH 3: Enterprise Design System Foundation
 * Premium design tokens for executive-grade interface
 * Sophisticated color palette with accessibility & psychology
 */

export const designTokens = {
  // Enterprise Color System - Premium Psychology
  colors: {
    // Primary Brand - Authority & Trust
    primary: {
      50: '#eff6ff',   // Ice blue - subtle highlights
      100: '#dbeafe',  // Light blue - backgrounds
      200: '#bfdbfe',  // Medium blue - borders
      300: '#93c5fd',  // Active blue - interactive
      400: '#60a5fa',  // Bright blue - attention
      500: '#3b82f6',  // Core blue - primary actions
      600: '#2563eb',  // Deep blue - authority
      700: '#1d4ed8',  // Dark blue - emphasis
      800: '#1e40af',  // Darker blue - strong contrast
      900: '#1e3a8a',  // Darkest blue - maximum authority
      950: '#172554'   // Executive blue - premium depth
    },

    // Secondary - Innovation & Growth
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Core cyan - innovation
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },

    // Success - Achievement & ROI
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',  // Core green - positive outcomes
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },

    // Warning - Urgency & Opportunity
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',  // Core amber - attention without alarm
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },

    // Danger - Critical Issues & Risk
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',  // Core red - urgent action needed
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },

    // Executive Neutrals - Sophisticated Grayscale
    slate: {
      50: '#f8fafc',   // Pure light - backgrounds
      100: '#f1f5f9',  // Light gray - subtle divisions
      200: '#e2e8f0',  // Medium light - borders
      300: '#cbd5e1',  // Light medium - disabled states
      400: '#94a3b8',  // Medium - placeholders
      500: '#64748b',  // Base gray - secondary text
      600: '#475569',  // Dark medium - primary text
      700: '#334155',  // Dark - headings
      800: '#1e293b',  // Darker - strong emphasis
      900: '#0f172a',  // Darkest - maximum contrast
      950: '#020617'   // Executive black - premium depth
    },

    // Executive Dark Theme - Premium Night Mode
    dark: {
      bg: {
        primary: '#020617',     // Executive black
        secondary: '#0f172a',   // Dark slate
        tertiary: '#1e293b',    // Medium dark
        elevated: '#334155',    // Elevated surfaces
        overlay: '#475569'      // Modal overlays
      },
      text: {
        primary: '#f8fafc',     // High contrast white
        secondary: '#e2e8f0',   // Medium contrast
        tertiary: '#cbd5e1',    // Lower contrast
        disabled: '#94a3b8'     // Disabled state
      },
      border: {
        primary: '#334155',     // Primary borders
        secondary: '#1e293b',   // Subtle borders
        focus: '#3b82f6',       // Focus indicators
        danger: '#ef4444'       // Error states
      }
    }
  },

  // Executive Typography - Professional Hierarchy
  typography: {
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],     // Headings - modern, technical
      body: ['Inter', 'system-ui', 'sans-serif'],        // Body text - readable
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'] // Code - technical precision
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px - captions
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px - small text
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px - body
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px - large body
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px - subtitle
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px - section heading
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px - page heading
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px - hero heading
      '5xl': ['3rem', { lineHeight: '1' }],         // 48px - display
      '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px - large display
      '7xl': ['4.5rem', { lineHeight: '1' }]        // 72px - hero display
    },

    fontWeight: {
      light: '300',     // Light emphasis
      normal: '400',    // Body text
      medium: '500',    // Slight emphasis
      semibold: '600',  // Strong emphasis
      bold: '700',      // Headings
      extrabold: '800'  // Hero elements
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // Sophisticated Spacing System
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem'       // 384px
  },

  // Executive Animation System
  animation: {
    duration: {
      instant: '50ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
      glacial: '1000ms'
    },
    
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      executive: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Sophisticated easing
      elegant: 'cubic-bezier(0.23, 1, 0.32, 1)',         // Smooth, premium feel
      sharp: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'      // Precise, professional
    }
  },

  // Executive Border Radius System
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px - subtle
    DEFAULT: '0.25rem', // 4px - standard
    md: '0.375rem',   // 6px - medium
    lg: '0.5rem',     // 8px - pronounced
    xl: '0.75rem',    // 12px - large
    '2xl': '1rem',    // 16px - very large
    '3xl': '1.5rem',  // 24px - extra large
    full: '9999px'    // Pill shape
  },

  // Executive Shadow System - Depth & Hierarchy
  boxShadow: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',                           // Subtle depth
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Light elevation
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Standard depth
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',    // Medium elevation
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',   // High elevation
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',                     // Premium depth
    '2xl': '0 50px 100px -20px rgb(0 0 0 / 0.25)',                 // Hero depth
    executive: '0 32px 64px -12px rgb(0 0 0 / 0.25)',              // Executive premium
    elegant: '0 20px 40px -8px rgb(0 0 0 / 0.15)',                 // Elegant floating
    none: '0 0 #0000'                                               // No shadow
  },

  // Executive Breakpoints - Device-First Design
  screens: {
    xs: '475px',      // Large phones
    sm: '640px',      // Small tablets
    md: '768px',      // Tablets
    lg: '1024px',     // Small laptops
    xl: '1280px',     // Laptops
    '2xl': '1536px',  // Large screens
    '3xl': '1920px',  // Executive displays
    '4xl': '2560px'   // Ultra-wide displays
  },

  // Accessibility tokens for WCAG 2.1 AAA compliance
  accessibility: {
    focusRing: {
      primary: 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900',
      secondary: 'ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-900',
      danger: 'ring-2 ring-red-500 ring-offset-2 ring-offset-slate-900'
    },
    contrast: {
      high: 'contrast-125',
      normal: 'contrast-100',
      enhanced: 'contrast-150'
    },
    touchTargets: {
      minimum: 'min-h-[44px] min-w-[44px]', // 44px minimum for executive mobile
      comfortable: 'min-h-[48px] min-w-[48px]',
      spacious: 'min-h-[56px] min-w-[56px]'
    }
  },

  // Executive micro-interactions
  interactions: {
    hover: {
      executive: 'hover:scale-105 hover:-translate-y-1 hover:shadow-2xl',
      subtle: 'hover:scale-102 hover:-translate-y-0.5 hover:shadow-lg',
      premium: 'hover:scale-103 hover:shadow-xl hover:brightness-110'
    },
    press: {
      executive: 'active:scale-95 active:translate-y-0',
      subtle: 'active:scale-98',
      firm: 'active:scale-90'
    },
    focus: {
      executive: 'focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2',
      accessible: 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
    }
  },

  // Executive loading states
  loading: {
    skeleton: {
      base: 'animate-pulse bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:400%_100%]',
      card: 'animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:400%_100%]',
      text: 'animate-pulse bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 bg-[length:400%_100%]'
    },
    spinner: {
      executive: 'animate-spin text-blue-500',
      fast: 'animate-spin duration-500',
      slow: 'animate-spin duration-1000'
    }
  }
} as const

// Executive Component Variants
export const componentVariants = {
  // Button Variants - Executive Actions
  button: {
    primary: {
      base: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      loading: 'bg-primary-400 cursor-wait',
      disabled: 'bg-slate-300 text-slate-500 cursor-not-allowed'
    },
    secondary: {
      base: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500',
      loading: 'bg-slate-400 cursor-wait',
      disabled: 'bg-slate-200 text-slate-400 cursor-not-allowed'
    },
    success: {
      base: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
      loading: 'bg-success-400 cursor-wait',
      disabled: 'bg-success-200 text-success-400 cursor-not-allowed'
    },
    danger: {
      base: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
      loading: 'bg-danger-400 cursor-wait',
      disabled: 'bg-danger-200 text-danger-400 cursor-not-allowed'
    },
    ghost: {
      base: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-500',
      loading: 'text-slate-400 cursor-wait',
      disabled: 'text-slate-300 cursor-not-allowed'
    }
  },

  // Card Variants - Executive Information Architecture
  card: {
    elevated: 'bg-white shadow-lg border border-slate-200 rounded-xl',
    flat: 'bg-white border border-slate-200 rounded-lg',
    dark: 'bg-slate-900 border border-slate-700 rounded-xl',
    glass: 'bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl',
    executive: 'bg-white shadow-executive border border-slate-100 rounded-2xl'
  },

  // Input Variants - Executive Data Entry
  input: {
    default: 'bg-white border-slate-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'bg-white border-danger-300 focus:border-danger-500 focus:ring-danger-500',
    success: 'bg-white border-success-300 focus:border-success-500 focus:ring-success-500',
    dark: 'bg-slate-900 border-slate-700 text-white focus:border-primary-500 focus:ring-primary-500'
  }
} as const

export type DesignTokens = typeof designTokens
export type ComponentVariants = typeof componentVariants
