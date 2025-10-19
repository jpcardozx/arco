/**
 * Design Tokens - Modern Elegant Style System
 * Centralizado para evitar retrabalho e manter consistência
 */

export const COLORS = {
  // Primary Colors
  charcoal: '#0F0F1F',
  deepNavy: '#1A1A2E',
  premiumGold: '#D4AF37',
  warmGold: '#E6C757',

  // Secondary Colors
  pure: '#FFFFFF',
  soft: '#F5F5F5',
  lightGray: '#E8E8E8',
  darkGray: '#2A2A3F',
  slate900: '#0F172A',
  slate800: '#1E293B',

  // Status Colors (if needed)
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const

export const GRADIENTS = {
  hero: 'linear-gradient(135deg, #0F0F1F 0%, #1A1A2E 50%, #0F0F1F 100%)',
  accent: 'linear-gradient(135deg, #D4AF37 0%, #E6C757 100%)',
  text: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
  hover: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)',
  gold: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, transparent 100%)',
} as const

export const SHADOWS = {
  none: 'none',
  subtle: '0 2px 4px rgba(0, 0, 0, 0.04)',
  light: '0 4px 12px rgba(0, 0, 0, 0.08)',
  medium: '0 8px 24px rgba(0, 0, 0, 0.12)',
  heavy: '0 12px 32px rgba(0, 0, 0, 0.16)',
  extraHeavy: '0 16px 48px rgba(0, 0, 0, 0.20)',
  goldShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
  darkShadow: '0 4px 16px rgba(15, 15, 31, 0.30)',
} as const

export const TYPOGRAPHY = {
  fonts: {
    display: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
    accent: '"Outfit", sans-serif',
  },
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const

export const SPACING = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const

export const BORDER_RADIUS = {
  none: '0px',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const

export const TRANSITIONS = {
  instant: '0ms',
  quick: '150ms',
  fast: '300ms',
  normal: '500ms',
  slow: '700ms',
  extraSlow: '1000ms',
} as const

export const EASING = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const BREAKPOINTS = {
  mobile: '320px',
  mobileLg: '640px',
  tablet: '768px',
  tabletLg: '1024px',
  desktop: '1280px',
  desktopXl: '1536px',
} as const

/**
 * Component-specific design tokens
 */

export const COMPONENTS = {
  // Hero Section
  hero: {
    height: {
      mobile: '100vh',
      tablet: '80vh',
      desktop: '100vh',
    },
    overlayGradient: 'linear-gradient(135deg, rgba(15, 15, 31, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%)',
  },

  // Icon Cards
  iconCard: {
    padding: SPACING[6], // 24px
    borderRadius: BORDER_RADIUS.md, // 12px
    border: '1px solid rgba(212, 175, 55, 0.2)',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    hoverScale: 1.03,
    hoverBorderOpacity: 0.6,
  },

  // Buttons
  button: {
    primary: {
      padding: `${SPACING[3]} ${SPACING[6]}`, // 12px 24px
      borderRadius: BORDER_RADIUS.md,
      fontSize: TYPOGRAPHY.sizes.base,
      fontWeight: TYPOGRAPHY.weights.semibold,
      transition: `all ${TRANSITIONS.fast} ${EASING.easeInOut}`,
    },
    secondary: {
      padding: `${SPACING[3]} ${SPACING[6]}`,
      borderRadius: BORDER_RADIUS.md,
      fontSize: TYPOGRAPHY.sizes.base,
      fontWeight: TYPOGRAPHY.weights.semibold,
    },
  },

  // Cards
  card: {
    padding: SPACING[8], // 32px
    borderRadius: BORDER_RADIUS.lg, // 16px
    border: '1px solid rgba(212, 175, 55, 0.2)',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    boxShadow: SHADOWS.medium,
  },

  // Section Spacing
  section: {
    paddingTop: {
      mobile: SPACING[8],
      tablet: SPACING[12],
      desktop: SPACING[16],
    },
    paddingBottom: {
      mobile: SPACING[8],
      tablet: SPACING[12],
      desktop: SPACING[16],
    },
  },
} as const

/**
 * Tailwind CSS class helpers (if using cx or cn utility)
 */

export const TAILWIND_CLASSES = {
  // Backgrounds
  bgHero: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
  bgCard: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',

  // Borders
  borderCard: 'border border-slate-700/50',
  borderAccent: 'border border-amber-500/20',

  // Shadows
  shadowCard: 'shadow-lg',
  shadowCardHover: 'shadow-xl shadow-black/20',

  // Text
  textWhite: 'text-white',
  textGray: 'text-slate-400',
  textGold: 'text-amber-500',

  // Radius
  radiusCard: 'rounded-xl',
  radiusLarge: 'rounded-2xl',

  // Transitions
  transitionSmooth: 'transition-all duration-300 ease-out',

  // Hover Effects
  hoverScale: 'hover:scale-105 transition-transform duration-300',
  hoverGold: 'hover:text-amber-500 transition-colors duration-300',
} as const
