/**
 * ARCO Unified Design System
 * Built on shadcn/ui foundation with executive-grade aesthetics
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Core utility function (from shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ===== ARCO BRAND COLORS =====
export const colors = {
    // Primary Teal - Innovation & Technology
    teal: {
      50: '#f0fdfa',
      100: '#ccfdf7',
      200: '#99f6e8',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // Main teal
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
    },

    // Secondary Orange - Energy & Growth
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },

    // Supporting Emerald - Success & Growth
    emerald: {
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },

    // Executive Neutral Palette
    neutral: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Semantic Colors
    success: {
        50: '#f0fdf4',
        500: '#22c55e',
        700: '#15803d',
        900: '#14532d'
    },

    warning: {
        50: '#fffbeb', 
        500: '#f59e0b',
        700: '#b45309',
        900: '#78350f'
    },

    error: {
        50: '#fef2f2',
        500: '#ef4444', 
        700: '#b91c1c',
        900: '#7f1d1d'
    },
  info: '#3b82f6',
} as const;

// ===== TYPOGRAPHY SYSTEM =====
export const typography = {
  fonts: {
    sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
    heading: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'], 
    mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'monospace']
  },

  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px  
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  weights: {
    light: '300',
    normal: '400', 
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  lineHeights: {
    tight: '1.25',
    normal: '1.5', 
    relaxed: '1.75'
  }
} as const;

// ===== SPACING SYSTEM =====
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem'     // 256px
} as const;

// ===== BORDER RADIUS =====
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px'
} as const;

// ===== SHADOWS =====
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glow: '0 0 20px rgb(59 130 246 / 0.5)', // ARCO Blue glow
  executive: '0 32px 64px -12px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.08)',
} as const;

// ===== ARCO Stunning Visual System - Harmonized Brand Gradients =====
export const gradients = {
    // Hero Background - Sophisticated multi-dimensional depth
    heroBackground: {
      primary: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 8%, #1e293b 18%, #134e4a 35%, #0f766e 55%, #14b8a6 75%, #042f2e 100%)',
      overlay: 'radial-gradient(ellipse 120% 80% at top left, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0.08) 30%, transparent 60%), radial-gradient(ellipse 100% 70% at bottom right, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)',
      texture: 'conic-gradient(from 45deg at 30% 30%, rgba(20,184,166,0.05) 0deg, transparent 45deg, rgba(249,115,22,0.03) 90deg, transparent 135deg, rgba(16,185,129,0.04) 180deg, transparent 225deg)',
      depth: 'linear-gradient(180deg, transparent 0%, rgba(20,184,166,0.02) 25%, rgba(249,115,22,0.015) 50%, rgba(20,184,166,0.01) 75%, transparent 100%)'
    },

    // Premium CTA System - Stunning visual impact with harmony
    cta: {
      primary: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 20%, #2dd4bf 40%, #10b981 60%, #fb923c 80%, #f97316 100%)',
      hover: 'linear-gradient(135deg, #134e4a 0%, #0f766e 20%, #14b8a6 40%, #059669 60%, #ea580c 80%, #c2410c 100%)',
      shimmer: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 55%, transparent 80%)',
      glow: 'drop-shadow(0 0 25px rgba(20,184,166,0.5)) drop-shadow(0 0 50px rgba(249,115,22,0.25)) drop-shadow(0 0 75px rgba(20,184,166,0.15))',
      reflection: 'linear-gradient(180deg, rgba(20,184,166,0.3) 0%, rgba(249,115,22,0.2) 50%, transparent 100%)'
    },

    // Brand Identity - Refined harmonious ARCO palette
    brand: {
      primary: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 30%, #2dd4bf 50%, #fb923c 70%, #f97316 100%)',
      secondary: 'linear-gradient(135deg, #10b981 0%, #34d399 25%, #5eead4 50%, #fed7aa 75%, #fdba74 100%)',
      accent: 'linear-gradient(135deg, #2dd4bf 0%, #5eead4 20%, #99f6e8 40%, #fed7aa 60%, #fdba74 80%, #fb923c 100%)',
      subtle: 'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(249,115,22,0.08) 50%, rgba(20,184,166,0.06) 100%)',
      vibrant: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 25%, #34d399 50%, #fb923c 75%, #f97316 100%)'
    },

    // Glass morphism - Professional depth with warmth
    glass: {
      light: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(20,184,166,0.02) 100%)',
      medium: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 50%, rgba(249,115,22,0.03) 100%)',
      strong: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.18) 50%, rgba(20,184,166,0.05) 100%)',
      dark: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(20,184,166,0.02) 100%)',
      premium: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(20,184,166,0.05) 30%, rgba(249,115,22,0.03) 70%, rgba(255,255,255,0.08) 100%)'
    },

    // Mesh backgrounds - Advanced multi-layered depth
    mesh: {
      primary: `
        radial-gradient(ellipse 150% 100% at 0% 0%, rgba(20,184,166,0.20) 0px, rgba(20,184,166,0.08) 40%, transparent 70%),
        radial-gradient(ellipse 120% 80% at 100% 0%, rgba(249,115,22,0.15) 0px, rgba(249,115,22,0.06) 35%, transparent 65%),
        radial-gradient(ellipse 130% 90% at 100% 100%, rgba(16,185,129,0.12) 0px, rgba(16,185,129,0.04) 45%, transparent 75%),
        radial-gradient(ellipse 140% 110% at 0% 100%, rgba(251,146,60,0.18) 0px, rgba(251,146,60,0.07) 38%, transparent 68%)
      `,
      subtle: `
        conic-gradient(from 30deg at 25% 75%, rgba(20,184,166,0.04) 0deg, transparent 120deg, rgba(249,115,22,0.02) 180deg, transparent 300deg),
        conic-gradient(from 210deg at 75% 25%, rgba(249,115,22,0.05) 0deg, transparent 150deg, rgba(16,185,129,0.03) 240deg, transparent 360deg)
      `,
      complex: `
        radial-gradient(circle at 20% 20%, rgba(20,184,166,0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(249,115,22,0.06) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(16,185,129,0.07) 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(251,146,60,0.05) 0%, transparent 50%),
        linear-gradient(135deg, rgba(20,184,166,0.02) 0%, transparent 25%, rgba(249,115,22,0.01) 50%, transparent 75%, rgba(20,184,166,0.015) 100%)
      `
    },

    // Atmospheric effects - Environmental depth
    atmosphere: {
      fog: 'linear-gradient(180deg, rgba(20,184,166,0.03) 0%, rgba(249,115,22,0.02) 30%, transparent 60%, rgba(20,184,166,0.01) 100%)',
      mist: 'radial-gradient(ellipse 200% 100% at center top, rgba(255,255,255,0.05) 0%, transparent 70%)',
      aurora: 'linear-gradient(45deg, rgba(20,184,166,0.06) 0%, rgba(249,115,22,0.04) 25%, rgba(16,185,129,0.05) 50%, rgba(251,146,60,0.03) 75%, rgba(20,184,166,0.02) 100%)'
    }
};

// ===== COMPONENT TOKENS =====
export const components = {
  button: {
    heights: {
      sm: '2rem',    // 32px
      md: '2.5rem',  // 40px  
      lg: '3rem'     // 48px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.625rem 1rem', 
      lg: '0.75rem 1.5rem'
    }
  },

  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem'
    },
    background: colors.neutral[50],
    border: colors.neutral[200]
  },

  input: {
    height: '2.5rem',
    padding: '0.5rem 0.75rem',
    border: colors.neutral[300],
    focus: colors.teal[500]
  }
} as const;

// ===== ARCO SPECIFIC THEME =====
export const arcoTheme = {
  name: 'ARCO Professional',
  
  brand: {
    primary: colors.teal[500],
    secondary: colors.orange[500],
    accent: colors.teal[400]
  },

  backgrounds: {
    body: colors.neutral[50],
    surface: '#ffffff',
    elevated: '#fdfdfd',
    muted: colors.neutral[100]
  },

  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[600], 
    muted: colors.neutral[500],
    inverse: '#ffffff'
  },

  borders: {
    light: colors.neutral[200],
    medium: colors.neutral[300],
    strong: colors.neutral[400]
  }
} as const;

// ===== ANIMATIONS & TRANSITIONS =====
export const animations = {
  durations: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  },

  easings: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
} as const;

// ===== BLUR EFFECTS =====
export const blur = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  medium: '16px',
  lg: '24px',
  strong: '40px',
  xl: '64px'
} as const;

// ===== EXPORT UNIFIED TOKENS =====
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  components,
  arcoTheme,
  animations,
  blur
} as const;

export type DesignTokens = typeof designTokens;

export default designTokens;
