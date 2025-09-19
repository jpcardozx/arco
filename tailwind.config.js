const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '4rem',
  			xl: '5rem',
  			'2xl': '6rem'
  		},
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': 'hsl(var(--primary-50))',
  				'100': 'hsl(var(--primary-100))',
  				'200': 'hsl(var(--primary-200))',
  				'300': 'hsl(var(--primary-300))',
  				'400': 'hsl(var(--primary-400))',
  				'500': 'hsl(var(--primary-500))',
  				'600': 'hsl(var(--primary-600))',
  				'700': 'hsl(var(--primary-700))',
  				'800': 'hsl(var(--primary-800))',
  				'900': 'hsl(var(--primary-900))',
  				'950': 'hsl(var(--primary-950))',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			arco: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				'950': '#172554'
  			},
  			glass: {
  				'50': 'rgba(255, 255, 255, 0.95)',
  				'100': 'rgba(255, 255, 255, 0.90)',
  				'200': 'rgba(255, 255, 255, 0.80)',
  				'300': 'rgba(255, 255, 255, 0.70)',
  				'400': 'rgba(255, 255, 255, 0.60)',
  				'500': 'rgba(255, 255, 255, 0.50)',
  				'600': 'rgba(255, 255, 255, 0.40)',
  				'700': 'rgba(255, 255, 255, 0.30)',
  				'800': 'rgba(255, 255, 255, 0.20)',
  				'900': 'rgba(255, 255, 255, 0.10)',
  				'950': 'rgba(255, 255, 255, 0.05)'
  			},
  			'glass-dark': {
  				'50': 'rgba(0, 0, 0, 0.95)',
  				'100': 'rgba(0, 0, 0, 0.90)',
  				'200': 'rgba(0, 0, 0, 0.80)',
  				'300': 'rgba(0, 0, 0, 0.70)',
  				'400': 'rgba(0, 0, 0, 0.60)',
  				'500': 'rgba(0, 0, 0, 0.50)',
  				'600': 'rgba(0, 0, 0, 0.40)',
  				'700': 'rgba(0, 0, 0, 0.30)',
  				'800': 'rgba(0, 0, 0, 0.20)',
  				'900': 'rgba(0, 0, 0, 0.10)',
  				'950': 'rgba(0, 0, 0, 0.05)'
  			},
  			success: {
  				'50': '#ecfdf5',
  				'100': '#d1fae5',
  				'200': '#a7f3d0',
  				'300': '#6ee7b7',
  				'400': '#34d399',
  				'500': '#10b981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065f46',
  				'900': '#064e3b',
  				'950': '#022c22'
  			},
  			warning: {
  				'50': '#fefce8',
  				'100': '#fef9c3',
  				'200': '#fef08a',
  				'300': '#fde047',
  				'400': '#facc15',
  				'500': '#eab308',
  				'600': '#ca8a04',
  				'700': '#a16207',
  				'800': '#854d0e',
  				'900': '#713f12',
  				'950': '#422006'
  			},
  			error: {
  				'50': '#fef2f2',
  				'100': '#fee2e2',
  				'200': '#fecaca',
  				'300': '#fca5a5',
  				'400': '#f87171',
  				'500': '#ef4444',
  				'600': '#dc2626',
  				'700': '#b91c1c',
  				'800': '#991b1b',
  				'900': '#7f1d1d',
  				'950': '#450a0a'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter Variable',
  				'Inter',
                    ...fontFamily.sans
                ],
  			mono: [
  				'JetBrains Mono Variable',
  				'JetBrains Mono',
                    ...fontFamily.mono
                ],
  			display: [
  				'Inter Variable',
  				'Inter',
                    ...fontFamily.sans
                ]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'9xl': [
  				'8rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'display-xl': [
  				'4.5rem',
  				{
  					lineHeight: '1.1',
  					fontWeight: '800'
  				}
  			],
  			'display-lg': [
  				'3.75rem',
  				{
  					lineHeight: '1.1',
  					fontWeight: '700'
  				}
  			],
  			'display-md': [
  				'3rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '600'
  				}
  			],
  			'headline-xl': [
  				'2.25rem',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			],
  			'headline-lg': [
  				'1.875rem',
  				{
  					lineHeight: '1.3',
  					fontWeight: '500'
  				}
  			],
  			'headline-md': [
  				'1.5rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500'
  				}
  			],
  			'body-xl': [
  				'1.25rem',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			'body-lg': [
  				'1.125rem',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			'body-md': [
  				'1rem',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			caption: [
  				'0.875rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500'
  				}
  			],
  			overline: [
  				'0.75rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '600',
  					letterSpacing: '0.05em'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'fade-in-up': 'fade-in-up 0.5s ease-out',
  			'scale-in': 'scale-in 0.2s ease-out',
  			'slide-in-right': 'slide-in-right 0.3s ease-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'float': 'float 6s ease-in-out infinite',
  			'glow': 'glow 2s ease-in-out infinite alternate',
  			'ping-delay-100': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.1s',
  			'ping-delay-200': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.2s'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'float': {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'glow': {
  				'0%': {
  					boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
  				},
  				'100%': {
  					boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)'
  				}
  			}
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  			'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  			inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  			glow: '0 0 20px rgb(59 130 246 / 0.3)',
  			'glow-lg': '0 0 40px rgb(59 130 246 / 0.4)',
  			premium: '0 8px 32px rgb(0 0 0 / 0.12), 0 4px 16px rgb(0 0 0 / 0.08)',
  			'glass-sm': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			'glass-md': '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			'glass-lg': '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			'glass-xl': '0 25px 50px -12px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.08)',
  			'glass-executive': '0 32px 64px -12px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  			'glass-brutal': '0 0 0 1px rgb(255 255 255 / 0.15), 0 8px 32px rgb(0 0 0 / 0.3)',
  			'depth-1': '0 1px 3px rgb(0 0 0 / 0.08)',
  			'depth-2': '0 4px 12px rgb(0 0 0 / 0.10)',
  			'depth-3': '0 8px 25px rgb(0 0 0 / 0.12)',
  			'depth-4': '0 16px 40px rgb(0 0 0 / 0.15)',
  			'depth-brutal': '0 32px 60px rgb(0 0 0 / 0.25)'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}