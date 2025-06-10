// ARCO Spacing System - Professional Layout Standards
export const spacing = {
  // Base spacing scale (rem based)
  0: '0rem',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
  36: '9rem',     // 144px
  40: '10rem',    // 160px
  44: '11rem',    // 176px
  48: '12rem',    // 192px
  52: '13rem',    // 208px
  56: '14rem',    // 224px
  60: '15rem',    // 240px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem'     // 384px
} as const;

// Semantic spacing for specific use cases
export const semanticSpacing = {
  // Component spacing
  component: {
    xs: spacing[1],      // 4px - tight elements
    sm: spacing[2],      // 8px - small gaps
    md: spacing[4],      // 16px - default gap
    lg: spacing[6],      // 24px - section spacing
    xl: spacing[8],      // 32px - large sections
    '2xl': spacing[12],  // 48px - major sections
    '3xl': spacing[16],  // 64px - page sections
    '4xl': spacing[24]   // 96px - hero spacing
  },
  
  // Container spacing
  container: {
    xs: spacing[4],      // 16px - mobile padding
    sm: spacing[6],      // 24px - tablet padding  
    md: spacing[8],      // 32px - desktop padding
    lg: spacing[12],     // 48px - large screens
    xl: spacing[16]      // 64px - extra large
  },
  
  // Content spacing
  content: {
    paragraph: spacing[4],    // 16px - between paragraphs
    section: spacing[8],      // 32px - between sections
    page: spacing[16],        // 64px - page margins
    hero: spacing[24]         // 96px - hero spacing
  }
} as const;

export type SpacingToken = typeof spacing;
export type SemanticSpacingToken = typeof semanticSpacing;