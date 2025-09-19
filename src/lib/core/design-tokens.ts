// Design tokens for ARCO's S-Tier design system
export const designTokens = {
  sections: {
    tight: 'py-4',
    normal: 'py-8',
    spacious: 'py-12',
    relaxed: 'py-16',
    luxurious: 'py-24'
  },
  containers: {
    sm: 'max-w-2xl mx-auto px-4',
    md: 'max-w-4xl mx-auto px-6',
    lg: 'max-w-6xl mx-auto px-8',
    xl: 'max-w-7xl mx-auto px-12',
    wide: 'max-w-8xl mx-auto px-16',
    full: 'w-full px-4 sm:px-6 lg:px-8'
  },
  gaps: {
    tight: 'gap-4',
    normal: 'gap-6',
    spacious: 'gap-8',
    relaxed: 'gap-12',
    luxurious: 'gap-16'
  },
  cards: {
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12'
    },
    radius: {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl'
    }
  },
  typography: {
    section: 'space-y-6',
    heading: 'leading-tight tracking-tight',
    body: 'leading-relaxed'
  },
  colors: {
    primary: {
      50: '#f0fdf4',
      500: '#10b981',
      600: '#059669',
      900: '#064e3b'
    },
    accent: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a'
    },
    emerald: {
      gradient: 'bg-gradient-to-r from-emerald-500 to-teal-600'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  }
};

export type DesignTokens = typeof designTokens;