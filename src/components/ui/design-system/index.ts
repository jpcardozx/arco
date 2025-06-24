/**
 * ARCO PATCH 3: Executive Design System - REFINED
 * Premium component library for sophisticated business interfaces
 * Optimized exports with performance and type safety
 */

// Design Tokens and Utilities - Core Foundation
export { designTokens, componentVariants } from './DesignTokens'
export type { DesignTokens, ComponentVariants } from './DesignTokens'

// Core Executive Components - Primary Exports Only
export { ExecutiveButton } from './ExecutiveButton'
export type { ExecutiveButtonProps } from './ExecutiveButton'

export { ExecutiveCard } from './ExecutiveCard'
export type { ExecutiveCardProps } from './ExecutiveCard'

export { ExecutiveInput } from './ExecutiveInput'
export type { ExecutiveInputProps } from './ExecutiveInput'

export { 
  ExecutiveDashboard, 
  ExecutiveMetric 
} from './ExecutiveDashboard'
export type { 
  ExecutiveDashboardProps, 
  ExecutiveMetricProps 
} from './ExecutiveDashboard'

// Design System Utilities
export const themes = {
  executive: {
    background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    text: 'text-white',
    accent: 'text-blue-400',
    border: 'border-slate-700',
    card: 'bg-slate-800/50 border-slate-700'
  },
  premium: {
    background: 'bg-gradient-to-br from-slate-50 via-white to-slate-50',
    text: 'text-slate-900',
    accent: 'text-blue-600',
    border: 'border-slate-200',
    card: 'bg-white border-slate-200'
  },
  glass: {
    background: 'bg-white/80 backdrop-blur-sm',
    text: 'text-slate-900',
    accent: 'text-blue-600',
    border: 'border-white/60',
    card: 'bg-white/60 backdrop-blur-sm border-white/40'
  }
} as const

export const animations = {
  executive: {
    duration: '0.35s',
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    scale: 1.03,
    lift: '-12px'
  },
  smooth: {
    duration: '0.25s',
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    scale: 1.05,
    lift: '-8px'
  },
  subtle: {
    duration: '0.15s',
    easing: 'ease-in-out',
    scale: 1.02,
    lift: '-4px'
  }
} as const

export const spacingPresets = {
  executive: {
    section: 'space-y-12',
    card: 'p-12',
    button: 'px-12 py-5',
    text: 'text-lg'
  },
  premium: {
    section: 'space-y-8',
    card: 'p-8',
    button: 'px-8 py-4',
    text: 'text-base'
  },
  standard: {
    section: 'space-y-6',
    card: 'p-6',
    button: 'px-6 py-3',
    text: 'text-sm'
  }
} as const

// Utility Functions
export const getThemeClasses = (theme: keyof typeof themes) => themes[theme]
export const getAnimationProps = (animation: keyof typeof animations) => animations[animation]
export const getSpacingClasses = (spacingType: keyof typeof spacingPresets) => spacingPresets[spacingType]

// Component Composition Utilities
export const createExecutiveLayout = (variant: 'executive' | 'premium' = 'premium') => ({
  container: `min-h-screen ${themes[variant].background}`,
  content: `container mx-auto px-6 py-8 ${themes[variant].text}`,
  section: spacingPresets.executive.section,
  card: `${themes[variant].card} rounded-xl shadow-xl`
})

export const createExecutiveMetrics = (color: 'primary' | 'success' | 'warning' | 'danger' = 'primary') => {
  const colorMap = {
    primary: 'from-blue-50 to-blue-100 border-blue-200',
    success: 'from-green-50 to-green-100 border-green-200',
    warning: 'from-amber-50 to-amber-100 border-amber-200',
    danger: 'from-red-50 to-red-100 border-red-200'
  }
  
  return {
    background: `bg-gradient-to-br ${colorMap[color]}`,
    hover: 'hover:scale-102 hover:-translate-y-1',
    transition: 'transition-all duration-300'
  }
}
