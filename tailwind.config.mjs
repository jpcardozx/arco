/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-sans)', 'Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-family-display)', 'Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
        arsenal: ['Arsenal SC', 'serif'],
      },
      colors: {
        arco: {
          teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          }
        },
        // Semantic colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      spacing: {
        18: '4.5rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
        glow: '0 0 20px rgb(59 130 246 / 0.3)',
      },
      blur: {
        xs: '2px',
        '3xl': '64px',
      },
      animationDuration: {
        75: '75ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
      keyframes: {
        wave: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        wave: 'wave 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
