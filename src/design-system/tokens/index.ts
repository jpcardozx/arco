/**
 * ARCO Design System - Enterprise-Grade Design Tokens
 * 
 * Sistema de tokens completo para garantir consistência visual e
 * performance otimizada em todos os componentes.
 * 
 * @version 1.0.0
 * @author ARCO UI/UX Team
 */

export const tokens = {
  /**
   * Sistema de cores com escala semântica
   * Baseado em HSL para melhor manipulação e acessibilidade
   */
  colors: {
    primary: {
      25: 'hsl(213, 100%, 98%)',
      50: 'hsl(213, 100%, 97%)',
      100: 'hsl(213, 96%, 93%)',
      200: 'hsl(213, 94%, 87%)',
      300: 'hsl(213, 94%, 78%)',
      400: 'hsl(213, 94%, 68%)',
      500: 'hsl(213, 94%, 58%)', // Base color
      600: 'hsl(213, 87%, 48%)',
      700: 'hsl(213, 82%, 39%)',
      800: 'hsl(213, 78%, 31%)',
      900: 'hsl(213, 94%, 20%)',
      950: 'hsl(213, 94%, 12%)',
    },
    
    semantic: {
      success: {
        background: 'hsl(142, 76%, 96%)',
        border: 'hsl(142, 76%, 86%)',
        text: 'hsl(142, 76%, 36%)',
        icon: 'hsl(142, 76%, 46%)',
      },
      warning: {
        background: 'hsl(38, 92%, 96%)',
        border: 'hsl(38, 92%, 86%)',
        text: 'hsl(38, 92%, 40%)',
        icon: 'hsl(38, 92%, 50%)',
      },
      error: {
        background: 'hsl(0, 84%, 96%)',
        border: 'hsl(0, 84%, 86%)',
        text: 'hsl(0, 84%, 50%)',
        icon: 'hsl(0, 84%, 60%)',
      },
      info: {
        background: 'hsl(213, 94%, 96%)',
        border: 'hsl(213, 94%, 86%)',
        text: 'hsl(213, 94%, 48%)',
        icon: 'hsl(213, 94%, 58%)',
      },
    },
    
    neutral: {
      25: 'hsl(220, 20%, 98%)',
      50: 'hsl(220, 20%, 96%)',
      100: 'hsl(220, 16%, 94%)',
      200: 'hsl(220, 13%, 87%)',
      300: 'hsl(220, 11%, 78%)',
      400: 'hsl(220, 9%, 64%)',
      500: 'hsl(220, 8%, 51%)',
      600: 'hsl(220, 9%, 41%)',
      700: 'hsl(220, 11%, 32%)',
      800: 'hsl(220, 15%, 23%)',
      900: 'hsl(220, 20%, 14%)',
      950: 'hsl(220, 26%, 9%)',
    }
  },

  /**
   * Sistema de espaçamento consistente
   * Baseado em rem para responsividade automática
   */
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
    96: '24rem',      // 384px
  },

  /**
   * Sistema tipográfico avançado
   * Inclui line-height e letter-spacing otimizados
   */
  typography: {
    fontFamilies: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      serif: ['EB Garamond', 'Georgia', 'serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    
    fontSizes: {
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.05em' }],
      '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.075em' }],
      '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.075em' }],
      '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.075em' }],
    },
    
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  /**
   * Sistema de sombras consistente
   * Otimizado para performance com blur mínimo
   */
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  /**
   * Sistema de border radius
   */
  radii: {
    none: '0px',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },

  /**
   * Sistema de transições otimizadas
   * Usando cubic-bezier para animações fluidas
   */
  transitions: {
    fast: {
      duration: '150ms',
      timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    normal: {
      duration: '250ms',
      timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    slow: {
      duration: '350ms',
      timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    bounce: {
      duration: '500ms',
      timingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },

  /**
   * Breakpoints para design responsivo
   */
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-index scale para layering consistente
   */
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

/**
 * Type definitions para TypeScript
 */
export type DesignTokens = typeof tokens;
export type ColorScale = keyof typeof tokens.colors.primary;
export type SpacingScale = keyof typeof tokens.spacing;
export type FontSize = keyof typeof tokens.typography.fontSizes;
export type FontWeight = keyof typeof tokens.typography.fontWeights;
export type Shadow = keyof typeof tokens.shadows;
export type Radius = keyof typeof tokens.radii;
export type Breakpoint = keyof typeof tokens.breakpoints;

/**
 * Helper functions para uso dos tokens
 */
export const getToken = {
  color: (path: string) => {
    const keys = path.split('.');
    let value: unknown = tokens.colors;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  },
  
  spacing: (key: SpacingScale) => tokens.spacing[key],
  
  fontSize: (key: FontSize) => tokens.typography.fontSizes[key],
  
  shadow: (key: Shadow) => tokens.shadows[key],
  
  radius: (key: Radius) => tokens.radii[key],
} as const;

export default tokens;
