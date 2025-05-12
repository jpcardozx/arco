// tailwind.config.ts
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { nextui } from '@nextui-org/react'
import animatePlugin from 'tailwindcss-animate'

export default <Config>{
  /** ----------------------------------------------------------------
   * 1. Where Tailwind should look for classes (Next.js / app dir)
   * ---------------------------------------------------------------- */
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  /** ----------------------------------------------------------------
   * 2. Use "class" dark-mode (preferable for institutional sites)
   * ---------------------------------------------------------------- */
  darkMode: 'class',

  /** ----------------------------------------------------------------
   * 3. Design tokens – cores, tipografia, sombras, etc.
   *    A maioria já vira CSS vars em v4; aqui criamos utilitários
   *    para DX (auto-complete, lint, Storybook, etc.)
   * ---------------------------------------------------------------- */
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm:  '1.5rem',
        lg:  '3.5rem',
        xl:  '4.5rem',
        '2xl':'5rem',
      },
    },

    extend: {
      /* ---- COLOR SYSTEM ----------------------------------------- */
      colors: {
        /* brand colors */
        brand: {
          primary: '#1A365D', // deep navy blue
          secondary: '#2C5282', // professional blue
          accent: '#90CDF4', // subtle highlight
        },
        /* surface layers */
        surface: {
          base: '#ffffff',
          tint: '#F7FAFC',
          dark: '#1A202C',
          muted: '#E2E8F0',
        },
        /* text */
        text: {
          primary  : '#0f172a',
          secondary: '#344054',
          inverted : '#f8fafc',
        },
        ringSubtle: 'rgba(4,120,87,.15)',
      },

      /* ---- TYPOGRAPHY ------------------------------------------- */
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans : ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono : ['var(--font-mono)', 'monospace'],
      },

      /* ---- BOX SHADOWS ------------------------------------------ */
      boxShadow: {
        card : '0 8px 28px rgba(15,118,110,.12)',
        inner: 'inset 0 1px 2px rgba(0,0,0,.05)',
        glass: '0 1px 4px rgba(255,255,255,.25), 0 3px 12px rgba(15,118,110,.15)',
      },

      /* ---- BORDER RADIUS & SPACING ------------------------------ */
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },

      /* ---- ANIMATIONS ------------------------------------------- */
      keyframes: {
        'fade-in': { from:{ opacity:0 }, to:{ opacity:1 } },
        float: {
          '0%,100%':{ transform:'translateY(-2%)' },
          '50%'   :{ transform:'translateY(2%)'  },
        },
      },
      animation: {
        'fade-in'  : 'fade-in 450ms ease-out both',
        float      : 'float 6s ease-in-out infinite',
      },

      /* ---- Z-INDEX ---------------------------------------------- */
      zIndex: {
        60: '60',
        70: '70',
      },
    },
  },  /** ----------------------------------------------------------------
   * 4. Safelist – dynamically generated classes (CVA, Markdown)
   * ---------------------------------------------------------------- */
  safelist: [
    { pattern: /bg-brand-(deep|mid|light)/ },
    { pattern: /text-brand-(deep|mid|light)/ },
    { pattern: /ring-brand-(deep|mid)/ },
    { pattern: /shadow-(card|glass)/ },
    'animate-in', 
    'fade-in', 
    'slide-in-from-top', 
    'slide-in-from-bottom',
    'slide-in-from-left',
    'slide-in-from-right',
    'zoom-in',
    'zoom-out',
  ],

  /** ----------------------------------------------------------------
   * 5. Plugins – official + NextUI + animation utilities
   * ---------------------------------------------------------------- */
  plugins: [
    require('@tailwindcss/typography'),
    nextui(),
    animatePlugin,

    /* radial-mask:bg-[mask-radial] */
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        { 'mask-radial': (value) => ({
            maskImage: `radial-gradient(${value})`,
          }) },
        { values: {
            soft   : 'circle at 60% 20%, #000 40%, transparent 86%',
            centered: 'circle, #000 60%, transparent 100%',
          }
        }
      )
    }),
  ],
}
