/**
 * Technical Theme Tokens
 * Extends the base design system with technical/enterprise specific tokens
 */

export const technicalTokens = {
  colors: {
    technical: {
      // Dark theme for technical credibility
      surface: {
        primary: 'hsl(220, 26%, 9%)',   // slate-900
        secondary: 'hsl(220, 26%, 12%)', // slate-850  
        tertiary: 'hsl(220, 26%, 15%)',  // slate-800
        accent: 'hsl(220, 26%, 18%)',    // slate-750
        overlay: 'hsl(220, 26%, 9%, 0.95)' // Modal/overlay
      },
      
      // Status indicators for systems
      status: {
        active: 'hsl(142, 71%, 45%)',    // emerald-500
        pending: 'hsl(43, 96%, 56%)',    // amber-400  
        error: 'hsl(0, 84%, 60%)',       // red-500
        warning: 'hsl(25, 95%, 53%)',    // orange-500
        info: 'hsl(199, 89%, 48%)',      // sky-500
        idle: 'hsl(220, 9%, 46%)'        // gray-500
      },

      // Technical accent colors
      accent: {
        primary: 'hsl(199, 89%, 48%)',   // sky-500 (trust)
        secondary: 'hsl(142, 71%, 45%)', // emerald-500 (success)
        tertiary: 'hsl(262, 83%, 58%)',  // purple-500 (innovation)
        quaternary: 'hsl(294, 72%, 56%)' // fuchsia-500 (premium)
      },

      // Text hierarchy for technical content
      text: {
        primary: 'hsl(0, 0%, 98%)',      // Almost white
        secondary: 'hsl(220, 9%, 78%)',  // gray-300
        tertiary: 'hsl(220, 9%, 64%)',   // gray-400  
        disabled: 'hsl(220, 9%, 46%)',   // gray-500
        inverse: 'hsl(220, 26%, 9%)'     // For light backgrounds
      },

      // Border colors for technical components
      border: {
        subtle: 'hsl(220, 13%, 18%)',    // gray-800
        default: 'hsl(220, 13%, 24%)',   // gray-700
        emphasis: 'hsl(220, 9%, 34%)',   // gray-600
        focus: 'hsl(199, 89%, 48%)',     // sky-500
        error: 'hsl(0, 84%, 60%)'        // red-500
      }
    }
  },

  // Technical typography scale
  typography: {
    technical: {
      fontFamilies: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        system: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      
      sizes: {
        // Hero sizes for impact
        'hero-xl': { fontSize: '4.5rem', lineHeight: '1.1', letterSpacing: '-0.02em' },
        'hero-lg': { fontSize: '3.75rem', lineHeight: '1.1', letterSpacing: '-0.02em' },
        'hero-md': { fontSize: '3rem', lineHeight: '1.2', letterSpacing: '-0.01em' },
        
        // Technical sizes
        'code-lg': { fontSize: '1.125rem', lineHeight: '1.7', fontFamily: 'mono' },
        'code-md': { fontSize: '1rem', lineHeight: '1.7', fontFamily: 'mono' },
        'code-sm': { fontSize: '0.875rem', lineHeight: '1.7', fontFamily: 'mono' },
        
        // Metric sizes
        'metric-xl': { fontSize: '2.25rem', lineHeight: '1.2', fontWeight: '700' },
        'metric-lg': { fontSize: '1.875rem', lineHeight: '1.3', fontWeight: '600' },
        'metric-md': { fontSize: '1.5rem', lineHeight: '1.4', fontWeight: '600' }
      }
    }
  },

  // Technical spacing for components
  spacing: {
    technical: {
      'component-xs': '0.5rem',   // 8px
      'component-sm': '0.75rem',  // 12px  
      'component-md': '1rem',     // 16px
      'component-lg': '1.5rem',   // 24px
      'component-xl': '2rem',     // 32px
      'component-2xl': '3rem',    // 48px
      
      'section-sm': '4rem',       // 64px
      'section-md': '6rem',       // 96px
      'section-lg': '8rem',       // 128px
      'section-xl': '10rem'       // 160px
    }
  },

  // Animation timings for technical feel
  animations: {
    technical: {
      instant: '0ms',
      fast: '150ms',
      normal: '250ms', 
      slow: '400ms',
      deliberate: '600ms',
      
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    }
  },

  // Technical shadows for depth
  shadows: {
    technical: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.5)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -1px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -2px rgb(0 0 0 / 0.3)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.6), 0 10px 10px -5px rgb(0 0 0 / 0.2)',
      glow: '0 0 20px rgb(59 130 246 / 0.3)', // Blue glow
      glowGreen: '0 0 20px rgb(34 197 94 / 0.3)' // Green glow
    }
  }
}

export default technicalTokens
