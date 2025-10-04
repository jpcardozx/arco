/**
 * ARCO Brand Colors - Extracted from Real Logo
 * Cores precisas baseadas na identidade visual da marca
 */

// Cores REAIS extraídas da logo ARCO
export const arcoBrandColors = {
  // Verde ARCO - Tom principal da logo (esquerda)
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Verde principal da logo
    600: '#0d9488', // Verde mais escuro da logo
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e'
  },

  // Verde intermediário (A-R)
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Verde intermediário
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },

  // Amarelo dourado (conectores da logo)
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Dourado dos conectores
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },

  // Laranja ARCO (direita da logo)
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Laranja principal (C)
    600: '#ea580c', // Laranja intenso (O)
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407'
  },

  // Cinza profissional (subtítulo da logo)
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Cinza do subtítulo
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  }
} as const;

// Gradientes baseados na transição real da logo
export const arcoGradients = {
  // Gradiente principal da logo (teal → orange)
  primary: 'linear-gradient(135deg, #14b8a6 0%, #10b981 25%, #f59e0b 75%, #f97316 100%)',

  // Variações para diferentes contextos
  hero: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 30%, #f59e0b 70%, #ea580c 100%)',
  card: 'linear-gradient(135deg, #14b8a6 0%, #f97316 100%)',
  button: 'linear-gradient(135deg, #0d9488 0%, #ea580c 100%)',

  // Gradientes sutis para backgrounds
  backgroundLight: 'linear-gradient(135deg, #f0fdfa 0%, #fff7ed 100%)',
  backgroundMedium: 'linear-gradient(135deg, #ccfbf1 0%, #fed7aa 100%)',

  // Gradientes para textos
  text: 'linear-gradient(135deg, #0f766e 0%, #c2410c 100%)',

  // Gradientes para bordas e acentos
  border: 'linear-gradient(135deg, #14b8a6 0%, #f97316 100%)',
  accent: 'linear-gradient(135deg, #5eead4 0%, #fdba74 100%)'
} as const;

// Sombras com cores da marca
export const arcoShadows = {
  teal: '0 10px 15px -3px rgba(20, 184, 166, 0.15), 0 4px 6px -2px rgba(20, 184, 166, 0.05)',
  orange: '0 10px 15px -3px rgba(249, 115, 22, 0.15), 0 4px 6px -2px rgba(249, 115, 22, 0.05)',
  mixed: '0 20px 25px -5px rgba(20, 184, 166, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.1)',
  glow: '0 0 20px rgba(20, 184, 166, 0.3), 0 0 40px rgba(249, 115, 22, 0.2)'
} as const;

// Utilitários para aplicar as cores da marca
export const arcoColorUtils = {
  // Criar variações com transparência
  withOpacity: (color: string, opacity: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  // Classes CSS para usar no Tailwind
  classes: {
    // Backgrounds com gradiente da marca
    bgPrimary: 'bg-gradient-to-r from-teal-600 to-orange-500',
    bgHero: 'bg-gradient-to-br from-teal-50 via-white to-orange-50',
    bgCard: 'bg-gradient-to-br from-teal-500/5 to-orange-500/5',

    // Textos com gradiente
    textPrimary: 'bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent',
    textSecondary: 'text-slate-600',

    // Bordas
    borderPrimary: 'border border-transparent bg-gradient-to-r from-teal-500 to-orange-500',

    // Sombras
    shadowTeal: 'shadow-lg shadow-teal-500/25',
    shadowOrange: 'shadow-lg shadow-orange-500/25',
    shadowMixed: 'shadow-xl shadow-teal-500/10'
  }
} as const;