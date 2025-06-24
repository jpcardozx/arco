/**
 * ARCO PATCH 1: Font Loading Strategy
 * Variable fonts with display: swap + subsetting
 * Target: Zero layout shift, <200ms font load
 */

import { Inter, JetBrains_Mono } from 'next/font/google'

// Primary font: Inter Variable
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
  preload: true,
  adjustFontFallback: true,
})

// Monospace font for code/terminal sections
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  fallback: ['ui-monospace', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Code', 'Droid Sans Mono', 'Courier New', 'monospace'],
  preload: false, // Only load when needed
})

/**
 * Font optimization utilities
 */
export const fontConfig = {
  // CSS variables for consistent usage
  primary: 'var(--font-inter)',
  mono: 'var(--font-jetbrains-mono)',
  
  // Performance-optimized font classes
  classes: {
    primary: inter.className,
    mono: jetbrainsMono.className,
    variable: `${inter.variable} ${jetbrainsMono.variable}`,
  },
  
  // Critical font preload headers
  preloadHeaders: [
    // Inter will be auto-preloaded by Next.js due to preload: true
    // Manual preloads for critical text only if needed
  ]
}

/**
 * Critical CSS for above-the-fold content
 * Inlined to prevent render blocking
 */
export const criticalCSS = `
  /* Critical reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  /* Prevent layout shift */
  html {
    font-family: ${fontConfig.primary}, system-ui, sans-serif;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
  }
  
  body {
    margin: 0;
    background-color: #0f172a;
    color: #ffffff;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Hero section critical styles */
  .hero-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }
  
  /* Critical loading states */
  .loading-skeleton {
    background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* CLS prevention */
  .preserve-aspect {
    aspect-ratio: 16/9;
  }
  
  .preserve-height {
    min-height: 200px;
  }
`

/**
 * Performance monitoring CSS
 */
export const performanceCSS = `
  /* Mark LCP elements for monitoring */
  [data-lcp] {
    content-visibility: auto;
    contain-intrinsic-size: 0 200px;
  }
  
  /* Optimize animations for 60fps */
  @media (prefers-reduced-motion: no-preference) {
    .smooth-animation {
      will-change: transform, opacity;
      transform: translateZ(0);
    }
  }
  
  /* Respect user preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
