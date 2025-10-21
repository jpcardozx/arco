/**
 * Beauty Theme - Design Tokens
 *
 * Sistema de cores e gradientes para Landing Pages de salões de beleza
 * Progressão visual sutil através das seções
 */

export const beautyTheme = {
  // Palette principal
  colors: {
    rose: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e', // Primary accent
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Secondary accent
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24', // Accent gold
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
  },

  // Gradientes por seção
  gradients: {
    hero: {
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0f172a 40%, #3b0764 100%)',
      overlay: 'radial-gradient(circle at 20% 50%, rgba(244, 63, 94, 0.08), transparent 50%)',
    },
    solutionArchitecture: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      overlay: 'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.06), transparent 50%)',
    },
    marketEducation: {
      background: 'linear-gradient(135deg, #3b0764 0%, #0f172a 50%, #0a0a0f 100%)',
      overlay: 'radial-gradient(circle at 50% 80%, rgba(244, 63, 94, 0.05), transparent 50%)',
    },
    processBreakdown: {
      background: 'linear-gradient(135deg, #0a0a0f 0%, rgba(136, 19, 55, 0.2) 50%, #0a0a0f 100%)',
      overlay: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.04), transparent 60%)',
    },
    proof: {
      background: 'linear-gradient(135deg, #0f172a 0%, rgba(107, 33, 168, 0.3) 50%, #0f172a 100%)',
      overlay: 'radial-gradient(circle at 30% 30%, rgba(244, 63, 94, 0.06), transparent 50%)',
    },
    pricing: {
      background: 'linear-gradient(135deg, #0a0a0f 0%, rgba(120, 53, 15, 0.15) 50%, #0a0a0f 100%)',
      overlay: 'radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.05), transparent 50%)',
    },
    faq: {
      background: 'linear-gradient(135deg, rgba(59, 7, 100, 0.2) 0%, #0f172a 50%, #0a0a0f 100%)',
      overlay: 'radial-gradient(circle at 50% 100%, rgba(168, 85, 247, 0.04), transparent 50%)',
    },
  },

  // Texturas
  textures: {
    dots: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
    dotsSize: '48px 48px',

    grid: 'linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
    gridSize: '64px 64px',

    lines: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255, 255, 255, 0.01) 60px, rgba(255, 255, 255, 0.01) 61px)',
  },

  // Sombras com accent colors
  shadows: {
    glowRose: '0 0 20px rgba(244, 63, 94, 0.25), 0 0 40px rgba(244, 63, 94, 0.1)',
    glowPurple: '0 0 20px rgba(168, 85, 247, 0.25), 0 0 40px rgba(168, 85, 247, 0.1)',
    glowGold: '0 0 20px rgba(251, 191, 36, 0.25), 0 0 40px rgba(251, 191, 36, 0.1)',

    softRose: '0 4px 20px rgba(244, 63, 94, 0.15)',
    softPurple: '0 4px 20px rgba(168, 85, 247, 0.15)',
    softGold: '0 4px 20px rgba(251, 191, 36, 0.15)',
  },

  // Glass morphism
  glass: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px) saturate(180%)',
    border: 'rgba(255, 255, 255, 0.08)',
  },
};

// Helper function para aplicar gradiente + overlay
export function getSectionBackground(section: keyof typeof beautyTheme.gradients) {
  const gradient = beautyTheme.gradients[section];
  return {
    background: gradient.background,
    backgroundImage: gradient.overlay,
  };
}

// Helper para texture
export function getSectionTexture(type: 'dots' | 'grid' | 'lines' = 'dots') {
  return {
    backgroundImage: beautyTheme.textures[type],
    backgroundSize: type === 'dots' ? beautyTheme.textures.dotsSize : beautyTheme.textures.gridSize,
  };
}

// Helper para glass morphism
export function getGlassMorphism(opacity: number = 0.03) {
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: beautyTheme.glass.backdropFilter,
    border: `1px solid ${beautyTheme.glass.border}`,
  };
}
