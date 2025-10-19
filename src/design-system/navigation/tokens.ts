/**
 * Navigation Design Tokens
 *
 * Tokens reutilizáveis para todos os componentes de navegação
 * Facilita manutenção e consistência visual em todo o projeto
 */

export const navigationTokens = {
  // Heights & Spacing
  height: {
    mobile: {
      default: '64px',
      scrolled: '56px',
    },
    desktop: {
      default: '80px',
      scrolled: '68px',
    },
  },

  padding: {
    x: {
      mobile: '1rem',      // 16px
      tablet: '1.5rem',    // 24px
      desktop: '2rem',     // 32px
    },
    y: {
      default: '1rem',     // 16px
      scrolled: '0.75rem', // 12px
    },
  },

  // Logo
  logo: {
    height: {
      mobile: {
        default: '40px',
        scrolled: '36px',
      },
      desktop: {
        default: '44px',
        scrolled: '40px',
      },
    },
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },

  // Colors - Refined palette (clara mas não estourada)
  colors: {
    light: {
      background: {
        default: 'rgba(248, 250, 252, 0.05)',    // slate-50 muito sutil
        scrolled: 'rgba(248, 250, 252, 0.98)',   // slate-50 quase opaco
        hover: 'rgba(0, 0, 0, 0.04)',
      },
      text: {
        primary: '#0f172a',    // slate-900
        secondary: '#475569',  // slate-600
        muted: '#94a3b8',      // slate-400
        inverse: '#ffffff',    // white
      },
      border: {
        default: 'rgba(0, 0, 0, 0.06)',
        hover: 'rgba(0, 0, 0, 0.1)',
      },
      accent: {
        primary: '#0f172a',    // slate-900 (profissional)
        secondary: '#1e293b',  // slate-800
        tertiary: '#334155',   // slate-700
      },
    },

    // Dark Mode (not scrolled)
    dark: {
      background: {
        default: 'rgba(15, 23, 42, 0.4)',        // dark sutil
        scrolled: 'rgba(248, 250, 252, 0.98)',   // slate-50 when scrolled
        hover: 'rgba(255, 255, 255, 0.08)',
      },
      text: {
        primary: '#ffffff',
        secondary: '#e2e8f0',  // slate-200
        muted: '#cbd5e1',      // slate-300
        inverse: '#0f172a',    // slate-900
      },
      border: {
        default: 'rgba(255, 255, 255, 0.1)',
        hover: 'rgba(255, 255, 255, 0.18)',
      },
      accent: {
        primary: '#ffffff',    // white (clean)
        secondary: '#f8fafc',  // slate-50
        tertiary: '#e2e8f0',   // slate-200
      },
    },
  },

  // Glassmorphism
  glassmorphism: {
    blur: {
      default: '16px',
      scrolled: '24px',
    },
    saturation: {
      default: '160%',
      scrolled: '200%',
    },
  },

  // Shadows
  shadow: {
    default: 'none',
    scrolled: '0 4px 24px rgba(0, 0, 0, 0.08)',
    hover: '0 8px 32px rgba(20, 184, 166, 0.15)',
  },

  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Z-index
  zIndex: {
    navbar: 50,
    dropdown: 60,
    overlay: 70,
    modal: 80,
  },

  // Border radius
  radius: {
    sm: '0.5rem',   // 8px
    md: '0.75rem',  // 12px
    lg: '1rem',     // 16px
    xl: '1.5rem',   // 24px
  },
} as const;

/**
 * Navigation Variants
 * Pre-configured combinations for common use cases
 */
export const navigationVariants = {
  // Landing Pages - focus on conversion
  landing: {
    style: 'minimal',
    showParticles: false,
    ctaPrimary: 'Login',
    ctaSecondary: 'Começar Projeto',
    links: ['Soluções', 'Como Funciona', 'Cases', 'Contato'],
  },

  // Corporate/Portfolio - professional
  corporate: {
    style: 'premium',
    showParticles: true,
    ctaPrimary: 'Agendar Conversa',
    ctaSecondary: null,
    links: ['Desenvolvedor', 'Serviços', 'Agendamentos', 'Contato'],
  },

  // Dashboard - minimal, functional
  dashboard: {
    style: 'minimal',
    showParticles: false,
    ctaPrimary: null,
    ctaSecondary: null,
    links: ['Dashboard', 'Agendamentos', 'Clientes', 'Configurações'],
  },
} as const;

export type NavigationVariant = keyof typeof navigationVariants;
export type NavigationTheme = 'light' | 'dark' | 'auto';
