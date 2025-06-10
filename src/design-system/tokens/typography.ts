// ARCO Typography System - Professional & Technical
export const typography = {
  // Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Charter', 'Georgia', 'serif'], 
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
    display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
  },
  
  // Font Sizes - Professional Scale
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }]
  },
  
  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
} as const;

// Semantic Typography Styles for ARCO
export const textStyles = {
  // Headlines
  'display-large': {
    fontSize: '3.75rem',
    lineHeight: '1',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    fontFamily: 'display'
  },
  'display-medium': {
    fontSize: '3rem',
    lineHeight: '1',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    fontFamily: 'display'
  },
  'display-small': {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    fontFamily: 'display'
  },
  
  // Headings
  'heading-1': {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    fontFamily: 'sans'
  },
  'heading-2': {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    fontFamily: 'sans'
  },
  'heading-3': {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: '600',
    fontFamily: 'sans'
  },
  
  // Body Text
  'body-large': {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: '400',
    fontFamily: 'sans'
  },
  'body-medium': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '400',
    fontFamily: 'sans'
  },
  'body-small': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
    fontFamily: 'sans'
  },
  
  // Labels & UI Text
  'label-large': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '500',
    letterSpacing: '0.025em',
    fontFamily: 'sans'
  },
  'label-medium': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: '500',
    letterSpacing: '0.025em',
    fontFamily: 'sans'
  },
  
  // Technical/Code
  'code-large': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '400',
    fontFamily: 'mono'
  },
  'code-medium': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
    fontFamily: 'mono'
  }
} as const;

export type TypographyToken = typeof typography;
export type TextStyle = keyof typeof textStyles;