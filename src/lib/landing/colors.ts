/**
 * Landing Page Design System - Color Generator
 * 
 * Generates a sophisticated color palette from campaign colors
 * Creates progressive color variations for elegant visual hierarchy
 */

interface ColorPalette {
  // Primary gradient (hero, CTAs principais)
  primary: {
    from: string;
    via: string;
    to: string;
    solid: string;
  };
  // Secondary gradient (seções alternadas)
  secondary: {
    from: string;
    via: string;
    to: string;
    solid: string;
  };
  // Background variations
  background: {
    primary: string;    // Fundo principal
    secondary: string;  // Fundo alternado
    subtle: string;     // Fundo muito sutil
  };
  // Accent colors
  accent: {
    glow: string;      // Para efeitos de brilho
    border: string;    // Para bordas
    text: string;      // Para textos de destaque
  };
  // Text colors
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}

/**
 * Converts hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL to hex
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Generate sophisticated color palette from campaign colors
 */
export function generateColorPalette(
  primaryColor?: string | null,
  secondaryColor?: string | null
): ColorPalette {
  // Default elegant blue-violet palette
  const defaultPrimary = '#3b82f6'; // blue-500
  const defaultSecondary = '#8b5cf6'; // violet-500

  const primary = primaryColor || defaultPrimary;
  const secondary = secondaryColor || defaultSecondary;

  const primaryRgb = hexToRgb(primary);
  const secondaryRgb = hexToRgb(secondary);

  if (!primaryRgb || !secondaryRgb) {
    // Fallback to default if conversion fails
    return getDefaultPalette();
  }

  const primaryHsl = rgbToHsl(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  const secondaryHsl = rgbToHsl(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);

  // Generate variations
  const primaryLight = hslToHex(primaryHsl.h, primaryHsl.s, Math.min(primaryHsl.l + 35, 95));
  const primaryDark = hslToHex(primaryHsl.h, primaryHsl.s, Math.max(primaryHsl.l - 10, 10));
  
  const secondaryLight = hslToHex(secondaryHsl.h, secondaryHsl.s, Math.min(secondaryHsl.l + 35, 95));
  const secondaryDark = hslToHex(secondaryHsl.h, secondaryHsl.s, Math.max(secondaryHsl.l - 10, 10));

  // Very subtle backgrounds
  const bgPrimary = hslToHex(primaryHsl.h, Math.max(primaryHsl.s - 40, 10), 98);
  const bgSecondary = hslToHex(secondaryHsl.h, Math.max(secondaryHsl.s - 40, 10), 98);
  const bgSubtle = '#ffffff';

  return {
    primary: {
      from: primary,
      via: secondary,
      to: secondaryDark,
      solid: primary,
    },
    secondary: {
      from: secondary,
      via: primary,
      to: primaryDark,
      solid: secondary,
    },
    background: {
      primary: bgPrimary,
      secondary: bgSecondary,
      subtle: bgSubtle,
    },
    accent: {
      glow: `${primary}15`, // 15% opacity
      border: primaryLight,
      text: primary,
    },
    text: {
      primary: '#0f172a', // slate-900
      secondary: '#475569', // slate-600
      muted: '#94a3b8', // slate-400
    },
  };
}

/**
 * Default professional palette (blue-violet)
 */
function getDefaultPalette(): ColorPalette {
  return {
    primary: {
      from: '#3b82f6',
      via: '#8b5cf6',
      to: '#7c3aed',
      solid: '#3b82f6',
    },
    secondary: {
      from: '#8b5cf6',
      via: '#3b82f6',
      to: '#2563eb',
      solid: '#8b5cf6',
    },
    background: {
      primary: '#fafafa',
      secondary: '#f8fafc',
      subtle: '#ffffff',
    },
    accent: {
      glow: '#3b82f615',
      border: '#93c5fd',
      text: '#3b82f6',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
    },
  };
}

/**
 * Generate Tailwind-compatible gradient classes
 */
export function getGradientClasses(palette: ColorPalette, variant: 'primary' | 'secondary' = 'primary'): string {
  const colors = variant === 'primary' ? palette.primary : palette.secondary;
  return `bg-gradient-to-r from-[${colors.from}] via-[${colors.via}] to-[${colors.to}]`;
}

/**
 * Generate inline styles for dynamic colors (Tailwind arbitrary values workaround)
 */
export function getGradientStyle(palette: ColorPalette, variant: 'primary' | 'secondary' = 'primary'): React.CSSProperties {
  const colors = variant === 'primary' ? palette.primary : palette.secondary;
  return {
    backgroundImage: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`,
  };
}
