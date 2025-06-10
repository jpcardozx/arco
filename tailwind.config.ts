// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { tokens } from './src/design-system/tokens'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        neutral: tokens.colors.neutral,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        error: tokens.colors.semantic.error,
        info: tokens.colors.semantic.info,
      },
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamilies,
      fontSize: tokens.typography.fontSizes,
      fontWeight: tokens.typography.fontWeights,
      boxShadow: tokens.shadows,
      borderRadius: tokens.radii,
      screens: tokens.breakpoints,
      zIndex: tokens.zIndex,
      transitionDuration: {
        fast: tokens.transitions.fast.duration,
        normal: tokens.transitions.normal.duration,
        slow: tokens.transitions.slow.duration,
        bounce: tokens.transitions.bounce.duration,
      },
      transitionTimingFunction: {
        fast: tokens.transitions.fast.timingFunction,
        normal: tokens.transitions.normal.timingFunction,
        slow: tokens.transitions.slow.timingFunction,
        bounce: tokens.transitions.bounce.timingFunction,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
} satisfies Config