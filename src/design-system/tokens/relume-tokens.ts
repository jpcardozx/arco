/**
 * Relume Design Tokens - Capturados via Figma MCP
 * Fonte: https://www.figma.com/design/Ckub2SepfepuDUhSG4Cla6/Relume-Figma-Kit--v3.5---Community
 */

export const relumeTokens = {
  // ===== CORES (Capturadas via MCP) =====
  colors: {
    // Cores principais identificadas no Figma
    primary: {
      black: 'rgb(0, 0, 0)',
      white: 'rgb(255, 255, 255)',
      blue: 'rgb(12, 140, 233)',
      blueLight: 'rgb(124, 196, 248)',
      green: 'rgb(25, 143, 81)',
    },

    // Escala de cinzas (capturada do Figma)
    neutral: {
      900: 'rgb(30, 30, 30)',    // Cinza quase preto
      800: 'rgb(44, 44, 44)',     // Cinza muito escuro
      700: 'rgb(56, 56, 56)',     // Cinza escuro 2
      600: 'rgb(59, 59, 59)',     // Cinza médio-escuro
      500: 'rgb(68, 68, 68)',     // Cinza escuro
      400: 'rgb(117, 117, 117)',  // Cinza médio
      300: 'rgb(102, 119, 153)',  // Azul acinzentado
    },

    // Transparências
    alpha: {
      whiteLight: 'rgba(255, 255, 255, 0.4)',
    },
  },

  // ===== TIPOGRAFIA (Capturada via MCP) =====
  typography: {
    // Família de fontes (confirmada: Inter)
    fontFamily: {
      primary: 'Inter, sans-serif',
      system: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    },

    // Tamanhos de fonte (4 variações capturadas)
    fontSize: {
      xs: '11px',    // Pequeno
      sm: '12px',    // Médio-pequeno
      base: '13px',  // Base
      lg: '16px',    // Grande
    },

    // Pesos de fonte (capturados)
    fontWeight: {
      normal: '400',
      medium: '450',
      semibold: '550',
    },

    // Line heights (capturados)
    lineHeight: {
      tight: '16px',
      base: '24px',
    },
  },

  // ===== ESPAÇAMENTOS (Capturados via MCP - baseados em 4px grid) =====
  spacing: {
    1: '4px',    // 0.25rem
    2: '8px',    // 0.5rem
    2.5: '10px', // 0.625rem
    3: '12px',   // 0.75rem
    4: '16px',   // 1rem
    6: '24px',   // 1.5rem
  },

  // ===== COMPONENTES RELUME =====
  components: {
    hero: {
      // Padrão observado nos layouts
      padding: {
        y: '96px',  // py-24
        x: '16px',  // px-4
      },
      maxWidth: '1280px', // container
    },

    section: {
      padding: {
        y: '64px',  // py-16
        x: '16px',  // px-4
      },
    },

    card: {
      borderRadius: '8px',
      padding: '24px',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
  },
} as const;

// ===== MAPEAMENTO PARA TAILWIND =====
export const relumeToTailwind = {
  colors: {
    'relume-primary': relumeTokens.colors.primary.blue,
    'relume-neutral-900': relumeTokens.colors.neutral[900],
    'relume-neutral-800': relumeTokens.colors.neutral[800],
    'relume-neutral-700': relumeTokens.colors.neutral[700],
    'relume-neutral-600': relumeTokens.colors.neutral[600],
    'relume-neutral-500': relumeTokens.colors.neutral[500],
    'relume-neutral-400': relumeTokens.colors.neutral[400],
    'relume-neutral-300': relumeTokens.colors.neutral[300],
  },

  fontSize: {
    'relume-xs': relumeTokens.typography.fontSize.xs,
    'relume-sm': relumeTokens.typography.fontSize.sm,
    'relume-base': relumeTokens.typography.fontSize.base,
    'relume-lg': relumeTokens.typography.fontSize.lg,
  },

  spacing: {
    'relume-1': relumeTokens.spacing[1],
    'relume-2': relumeTokens.spacing[2],
    'relume-2.5': relumeTokens.spacing[2.5],
    'relume-3': relumeTokens.spacing[3],
    'relume-4': relumeTokens.spacing[4],
    'relume-6': relumeTokens.spacing[6],
  },
} as const;

export default relumeTokens;
