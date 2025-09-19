/**
 * ARCO Unified Design System
 * Built on shadcn/ui foundation with executive-grade aesthetics
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Core utility function (from shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ARCO Design Tokens
export const designTokens = {
  // Color palette extending shadcn/ui
  colors: {
    // Primary brand colors (already in tailwind.config)
    primary: {
      50: 'hsl(214 100% 97%)',
      100: 'hsl(214 95% 93%)',
      200: 'hsl(213 97% 87%)',
      300: 'hsl(212 96% 78%)',
      400: 'hsl(213 94% 68%)',
      500: 'hsl(217 91% 60%)', // Primary
      600: 'hsl(221 83% 53%)',
      700: 'hsl(224 76% 48%)',
      800: 'hsl(226 71% 40%)',
      900: 'hsl(224 64% 33%)',
      950: 'hsl(226 55% 21%)',
    },

    // Executive grayscale
    neutral: {
      50: 'hsl(210 20% 98%)',
      100: 'hsl(220 14% 96%)',
      200: 'hsl(220 13% 91%)',
      300: 'hsl(216 12% 84%)',
      400: 'hsl(218 11% 65%)',
      500: 'hsl(220 9% 46%)',
      600: 'hsl(215 14% 34%)',
      700: 'hsl(217 19% 27%)',
      800: 'hsl(215 28% 17%)',
      900: 'hsl(221 39% 11%)',
      950: 'hsl(224 71% 4%)',
    },

    // Status colors
    success: {
      50: 'hsl(138 76% 97%)',
      500: 'hsl(142 71% 45%)',
      600: 'hsl(142 76% 36%)',
    },
    warning: {
      50: 'hsl(48 100% 96%)',
      500: 'hsl(38 92% 50%)',
      600: 'hsl(32 95% 44%)',
    },
    danger: {
      50: 'hsl(0 86% 97%)',
      500: 'hsl(0 84% 60%)',
      600: 'hsl(0 72% 51%)',
    },
  },

  // Typography scale
  typography: {
    fontFamily: {
      sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
  },

  // Spacing system (consistent with shadcn/ui)
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
  },

  // Border radius (consistent with shadcn/ui)
  borderRadius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
  },

  // Shadows (executive depth system)
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    executive: '0 32px 64px -12px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.08)',
  },

  // Animation system
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
}

// Component variants using cva pattern (from shadcn/ui)
export const buttonVariants = {
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    // ARCO custom variants
    executive: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all duration-300',
    premium: 'bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:from-neutral-800 hover:to-neutral-700 shadow-lg hover:shadow-xl',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
    // ARCO custom sizes
    executive: 'h-12 px-8 text-base font-semibold',
  },
}

export const cardVariants = {
  variant: {
    default: 'border bg-card text-card-foreground shadow-sm',
    elevated: 'border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300',
    outline: 'border-2 bg-card text-card-foreground hover:border-primary/50 transition-colors duration-300',
    // ARCO custom variants
    executive: 'bg-gradient-to-br from-white to-neutral-50 border border-neutral-200/50 shadow-executive backdrop-blur-sm',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/60 shadow-glass-lg',
    premium: 'bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 text-white shadow-premium',
  },
}

// Layout composition helpers
export const containerVariants = {
  size: {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  },
  padding: {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  },
}

// Export everything for easy consumption
export { designTokens as tokens }
export type DesignTokens = typeof designTokens