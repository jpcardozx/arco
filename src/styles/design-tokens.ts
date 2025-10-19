/**
 * Design Tokens - Landing Page Beauty/Wellness
 * Paleta otimizada para salões de beleza, manicures, estética
 */

export const designTokens = {
  // Paleta Beauty (rosa, coral, nude, dourado)
  colors: {
    // Primary - Rosa/Coral (confiança, feminino, beleza)
    primary: {
      50: '#FFF1F2',   // rosa muito claro (backgrounds)
      100: '#FFE4E6',  // rosa claro
      200: '#FECDD3',  // rosa suave
      300: '#FDA4AF',  // rosa médio
      400: '#FB7185',  // coral vibrante
      500: '#F43F5E',  // rosa forte (CTAs principais)
      600: '#E11D48',  // rosa escuro
      700: '#BE123C',  // rosa profundo
      800: '#9F1239',  // rosa muito escuro
      900: '#881337',  // rosa quase preto
    },

    // Accent - Dourado (premium, qualidade, valor)
    accent: {
      50: '#FFFBEB',   // dourado muito claro
      100: '#FEF3C7',  // dourado claro
      200: '#FDE68A',  // dourado suave
      300: '#FCD34D',  // dourado médio
      400: '#FBBF24',  // dourado vibrante
      500: '#F59E0B',  // dourado forte (highlights)
      600: '#D97706',  // dourado escuro
      700: '#B45309',  // dourado profundo
      800: '#92400E',  // dourado muito escuro
      900: '#78350F',  // dourado quase preto
    },

    // Neutral - Nude/Bege (elegante, sofisticado)
    neutral: {
      50: '#FAFAF9',   // quase branco
      100: '#F5F5F4',  // cinza muito claro
      200: '#E7E5E4',  // bege claro
      300: '#D6D3D1',  // bege médio
      400: '#A8A29E',  // bege escuro
      500: '#78716C',  // cinza médio
      600: '#57534E',  // cinza escuro
      700: '#44403C',  // cinza profundo
      800: '#292524',  // cinza muito escuro
      900: '#1C1917',  // preto suave
    },

    // Success - Verde suave (confirmação, sucesso)
    success: {
      50: '#F0FDF4',
      500: '#22C55E',
      700: '#15803D',
    },

    // Warning - Laranja suave (atenção)
    warning: {
      50: '#FFF7ED',
      500: '#F97316',
      700: '#C2410C',
    },

    // Error - Vermelho suave (erro, urgência)
    error: {
      50: '#FEF2F2',
      500: '#EF4444',
      700: '#B91C1C',
    },

    // Semantic colors
    background: '#FAFAF9',     // neutral.50
    surface: '#FFFFFF',
    text: {
      primary: '#1C1917',      // neutral.900
      secondary: '#57534E',    // neutral.600
      tertiary: '#A8A29E',     // neutral.400
      inverse: '#FFFFFF',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'Cal Sans, Inter, system-ui, sans-serif', // Headlines com personalidade
    },
    fontSize: {
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
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  // Spacing (8px base)
  spacing: {
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
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(244, 63, 94, 0.3)', // primary glow
    'glow-accent': '0 0 20px rgba(245, 158, 11, 0.3)', // accent glow
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Utilitários para uso fácil
export const {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
} = designTokens;
