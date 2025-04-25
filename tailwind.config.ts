// tailwind.config.ts
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default <Config>{
  /** ----------------------------------------------------------------
   * 1. Onde o Tailwind deve buscar classes (Next.js / app dir)
   * ---------------------------------------------------------------- */
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],

  /** ----------------------------------------------------------------
   * 2. Ative "class" dark-mode (preferível em sites institucionais)
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
        /* brand greens */
        brand: {
          deep : '#014737',
          mid  : '#0f766e',
          light: '#9ae6b4',
        },
        /* surface layers */
        surface: {
          base : '#ffffff',
          tint : '#f7fdfb',
          dark : '#0a0a0a',
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
  },

  /** ----------------------------------------------------------------
   * 4. Safelist – classes geradas dinamicamente (CVA, Markdown)
   * ---------------------------------------------------------------- */
  safelist: [
    { pattern: /bg-brand-(deep|mid|light)/ },
    { pattern: /text-brand-(deep|mid|light)/ },
    { pattern: /ring-brand-(deep|mid)/ },
    { pattern: /shadow-(card|glass)/ },
  ],

  /** ----------------------------------------------------------------
   * 5. Plugins – oficiais + radial-mask utilitário
   * ---------------------------------------------------------------- */
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

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
