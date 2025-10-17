/**
 * THREEJS NAVIGATION CONFIG
 * Arquivo central de configuração para customização fácil
 */

export const NAVIGATION_CONFIG = {
  // Performance Settings
  performance: {
    particleCount: 200,
    canvasDpr: [1, 2] as [number, number],
    targetFps: 60,
    enableThreeJs: true, // Toggle Three.js on/off
  },

  // Visual Settings
  visual: {
    blur: {
      initial: 0,
      max: 20,
      scrollDivider: 100, // Higher = slower blur increase
    },
    opacity: {
      initial: 0,
      max: 0.9,
      scrollDivider: 200,
    },
    particles: {
      size: 0.015,
      opacity: 0.6,
      color: '#60a5fa',
      rotationSpeed: 0.05,
      waveAmplitude: 0.0005,
    },
  },

  // Animation Settings
  animation: {
    magnetic: {
      strength: 0.2, // 0-1, higher = stronger attraction
      springDamping: 20,
      springStiffness: 300,
    },
    nav: {
      entryDuration: 0.6,
      entryDelay: 0,
      springDamping: 20,
      springStiffness: 100,
    },
    mobile: {
      staggerDelay: 0.1, // seconds between items
      itemDuration: 0.2,
    },
    cta: {
      gradientDuration: 3, // seconds for gradient loop
      shineDuration: 1.5,
    },
  },

  // Colors (can be overridden per environment)
  colors: {
    logo: {
      from: '#3b82f6', // blue-600
      via: '#8b5cf6',  // purple-600
      to: '#ec4899',   // pink-600
    },
    links: {
      services: '#3b82f6',      // blue-500
      methodology: '#8b5cf6',   // purple-500
      caseStudies: '#06b6d4',   // cyan-500
      about: '#10b981',         // green-500
    },
    background: {
      base: 'rgba(15, 23, 42, 0.9)', // slate-900
      border: 'rgba(255, 255, 255, 0.1)',
    },
  },

  // Feature Flags
  features: {
    magneticHover: true,
    particleField: true,
    dynamicBlur: true,
    mobileMenu: true,
    scrollIndicator: false, // Not implemented yet
  },
} as const;

export type NavigationConfig = typeof NAVIGATION_CONFIG;
