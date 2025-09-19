/**
 * ARCO Design System - Professional Design Tokens
 * Brand identity e sistema visual consistente
 */

// ===== ARCO BRAND COLORS =====
export const colors = {
  // Primary Brand Colors (ARCO Blue)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main ARCO Blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },

  // Secondary Colors (ARCO Orange/Accent)
  secondary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // ARCO Orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12'
  },

  // Neutral System (Professional Grays)
  neutral: {
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
    950: '#0a0a0a'
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
  }
} as const;

// ===== TYPOGRAPHY SYSTEM =====
export const typography = {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Inter', 'system-ui', 'sans-serif'], 
    mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace']
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
  glow: '0 0 20px rgb(59 130 246 / 0.5)' // ARCO Blue glow
} as const;

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
    focus: colors.primary[500]
  }
} as const;

// ===== ARCO SPECIFIC THEME =====
export const arcoTheme = {
  name: 'ARCO Professional',
  
  brand: {
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    accent: colors.primary[400]
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

// ===== EXPORT UNIFIED TOKENS =====
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  arcoTheme,
  animations
} as const;

export default designTokens;
