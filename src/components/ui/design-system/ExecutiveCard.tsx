/**
 * ARCO PATCH 3: Executive Card Component
 * Premium card system for sophisticated information architecture
 * Multi-variant design for executive-grade interfaces
 */

'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { designTokens, componentVariants } from './DesignTokens'

// Executive Card Props Interface
interface ExecutiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'elevated' | 'flat' | 'dark' | 'glass' | 'executive' | 'premium' | 'gradient'
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'executive'
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'executive'
    hover?: boolean | 'lift' | 'glow' | 'scale' | 'executive'
    border?: boolean | 'subtle' | 'prominent' | 'premium'
    shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'executive'
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'executive'
    backdrop?: boolean
    gradient?: boolean
    interactive?: boolean
    loading?: boolean
    children: React.ReactNode
}

// Premium Card Variants
const premiumVariants = {
    executive: `
    bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
    border border-slate-700/50
    shadow-executive
    backdrop-blur-xl
    relative overflow-hidden
    before:absolute before:inset-0 
    before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-white/5
    before:pointer-events-none
  `,
    premium: `
    bg-gradient-to-br from-white via-slate-50/80 to-white
    border border-slate-200/60
    shadow-xl
    backdrop-blur-sm
    relative overflow-hidden
    before:absolute before:inset-[1px] 
    before:bg-gradient-to-br before:from-white/60 before:via-white/40 before:to-white/60
    before:rounded-[inherit]
    before:pointer-events-none
  `,
    gradient: `
    bg-gradient-to-br from-blue-50 via-white to-purple-50
    border border-blue-200/40
    shadow-lg
    relative overflow-hidden
    before:absolute before:inset-0 
    before:bg-gradient-to-br before:from-blue-500/5 before:via-transparent before:to-purple-500/5
    before:pointer-events-none
  `
} as const

// Size Variants
const sizeVariants = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    executive: 'max-w-4xl'
} as const

// Padding Variants
const paddingVariants = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
    executive: 'p-12'
} as const

// Border Variants
const borderVariants = {
    subtle: 'border border-slate-200/60',
    prominent: 'border-2 border-slate-300',
    premium: 'border border-gradient-to-r from-blue-200 via-purple-200 to-blue-200'
} as const

// Shadow Variants
const shadowVariants = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    executive: 'shadow-executive'
} as const

// Rounded Variants
const roundedVariants = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    executive: 'rounded-3xl'
} as const

// Hover Animation Variants
const hoverAnimations = {
    lift: {
        whileHover: { y: -8, scale: 1.02 },
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    glow: {
        whileHover: {
            boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
        },
        transition: { duration: 0.35 }
    },
    scale: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 }
    },
    executive: {
        whileHover: {
            y: -12,
            scale: 1.03,
            boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25)'
        },
        transition: {
            duration: 0.35,
            ease: [0.23, 1, 0.32, 1]
        }
    }
} as const

/**
 * Executive Card Component
 * Premium card with sophisticated variants and animations
 */
export const ExecutiveCard = forwardRef<HTMLDivElement, ExecutiveCardProps>(
    ({
        variant = 'elevated',
        size,
        padding = 'md',
        hover = false,
        border = true,
        shadow = true,
        rounded = 'xl',
        backdrop = false,
        gradient = false,
        interactive = false,
        loading = false,
        className = '',
        children,
        ...props
    }, ref) => {

        // Get base variant styles
        const getVariantStyles = () => {
            if (variant === 'executive' || variant === 'premium' || variant === 'gradient') {
                return premiumVariants[variant]
            }
            return componentVariants.card[variant as keyof typeof componentVariants.card]
        }

        // Build className
        const cardClassName = [
            // Base styles
            'relative',
            loading ? 'animate-pulse' : '',

            // Size
            size ? sizeVariants[size] : '',

            // Padding
            paddingVariants[padding],

            // Rounded
            roundedVariants[rounded],

            // Variant styles
            getVariantStyles(),

            // Border
            typeof border === 'string' ? borderVariants[border] :
                border ? 'border border-slate-200' : '',

            // Shadow
            typeof shadow === 'string' ? shadowVariants[shadow] :
                shadow ? 'shadow-lg' : '',

            // Backdrop
            backdrop ? 'backdrop-blur-sm' : '',

            // Interactive
            interactive ? 'cursor-pointer transition-all duration-300' : 'transition-all duration-300',

            // Custom className
            className
        ].filter(Boolean).join(' ')

        // Animation props
        const getAnimationProps = () => {
            if (!hover) return {}
            if (typeof hover === 'string' && hover in hoverAnimations) {
                return hoverAnimations[hover as keyof typeof hoverAnimations]
            }
            return hoverAnimations.lift // Default hover
        }

        const animationProps = getAnimationProps()

        // Loading skeleton
        if (loading) {
            return (
                <div ref={ref} className={cardClassName} {...props}>
                    <div className="space-y-4">
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
                    </div>
                </div>
            )
        }    // Render with or without animation
        if (hover === false) {
            return (
                <div ref={ref} className={cardClassName} {...props}>
                    {children}
                </div>
            )
        }

        return (
            <motion.div
                ref={ref}
                className={cardClassName}
                {...(animationProps as any)}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

ExecutiveCard.displayName = 'ExecutiveCard'

// Premium Card Presets
export const PremiumCard = (props: Omit<ExecutiveCardProps, 'variant'>) => (
    <ExecutiveCard variant="premium" hover="executive" shadow="executive" {...props} />
)

export const ExecutiveDashboardCard = (props: Omit<ExecutiveCardProps, 'variant' | 'padding'>) => (
    <ExecutiveCard
        variant="executive"
        padding="executive"
        hover="glow"
        rounded="executive"
        {...props}
    />
)

export const GlassCard = (props: Omit<ExecutiveCardProps, 'variant'>) => (
    <ExecutiveCard variant="glass" backdrop hover="lift" {...props} />
)

export const MetricCard = (props: Omit<ExecutiveCardProps, 'variant' | 'size'>) => (
    <ExecutiveCard
        variant="gradient"
        size="md"
        hover="scale"
        interactive
        {...props}
    />
)

// Export types
export type { ExecutiveCardProps }
