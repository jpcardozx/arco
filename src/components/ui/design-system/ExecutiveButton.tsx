/**
 * ARCO PATCH 3: Executive Button Component
 * Premium button system with sophisticated variants and micro-interactions
 * Psychology-driven design for executive decision-making
 */

'use client'

import React, { forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { designTokens, componentVariants } from './DesignTokens'

// Executive Button Props Interface - Enhanced with Accessibility
interface ExecutiveButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'executive' | 'premium'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'executive'
    loading?: boolean
    loadingText?: string
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    gradient?: boolean
    pulse?: boolean
    executiveLevel?: boolean
    fullWidth?: boolean
    elevated?: boolean
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    animation?: 'none' | 'subtle' | 'smooth' | 'executive'
    focusRing?: boolean
    className?: string
    children: React.ReactNode

    // Enhanced accessibility props
    ariaLabel?: string
    ariaDescribedBy?: string
    role?: string
    tabIndex?: number
    focusRingColor?: 'primary' | 'secondary' | 'danger'
    highContrast?: boolean
}

// Executive Animation Variants
const buttonAnimations = {
    none: {},
    subtle: {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.15, ease: 'easeInOut' }
    },
    smooth: {
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 },
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    executive: {
        whileHover: {
            scale: 1.03,
            y: -3,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        },
        whileTap: { scale: 0.97 },
        transition: {
            duration: 0.35,
            ease: [0.23, 1, 0.32, 1] // Executive easing
        }
    }
} as const

// Premium Variant Styles
const executiveVariants = {
    executive: {
        base: `
      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
      text-white font-semibold tracking-wide
      border border-slate-700
      shadow-executive
      hover:from-slate-800 hover:via-slate-700 hover:to-slate-800
      hover:border-slate-600
      focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
      relative overflow-hidden
      before:absolute before:inset-0 
      before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      before:transition-transform before:duration-700 before:ease-out
    `,
        loading: 'opacity-70 cursor-wait',
        disabled: 'opacity-50 cursor-not-allowed grayscale'
    },
    premium: {
        base: `
      bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600
      text-white font-semibold tracking-wide
      border-0 shadow-xl
      hover:from-blue-500 hover:via-blue-400 hover:to-purple-500
      hover:shadow-2xl
      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      relative overflow-hidden
      before:absolute before:inset-0 
      before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      before:transition-transform before:duration-700 before:ease-out
    `,
        loading: 'opacity-70 cursor-wait',
        disabled: 'opacity-50 cursor-not-allowed grayscale'
    }
} as const

// Size Variants
const sizeVariants = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
    executive: 'px-12 py-5 text-lg font-semibold tracking-wide'
} as const

// Rounded Variants
const roundedVariants = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
} as const

/**
 * Executive Button Component
 * Premium button with sophisticated animations and variants
 */
export const ExecutiveButton = forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        loading = false,
        loadingText,
        icon,
        iconPosition = 'left',
        fullWidth = false,
        elevated = false,
        gradient = false,
        rounded = 'lg',
        animation = 'smooth',
        focusRing = true,
        disabled,
        className = '',
        children,
        ...props
    }, ref) => {

        // Get base variant styles
        const getVariantStyles = () => {
            if (variant === 'executive' || variant === 'premium') {
                const execVariant = executiveVariants[variant]
                if (loading) return execVariant.loading
                if (disabled) return execVariant.disabled
                return execVariant.base
            }

            const baseVariant = componentVariants.button[variant as keyof typeof componentVariants.button]
            if (loading) return baseVariant.loading
            if (disabled) return baseVariant.disabled
            return baseVariant.base
        }

        // Build className
        const buttonClassName = [
            // Base styles
            'inline-flex items-center justify-center',
            'font-medium transition-all duration-250',
            'focus:outline-none',

            // Size
            sizeVariants[size],

            // Rounded
            roundedVariants[rounded],

            // Variant styles
            getVariantStyles(),

            // Full width
            fullWidth ? 'w-full' : '',

            // Elevated
            elevated ? 'shadow-lg hover:shadow-xl' : '',

            // Focus ring
            focusRing ? 'focus:ring-2 focus:ring-offset-2' : '',

            // Custom className
            className
        ].filter(Boolean).join(' ')

        // Animation props
        const animationProps = animation !== 'none' ? buttonAnimations[animation] : {}

        // Button content
        const buttonContent = (
            <>
                {/* Loading spinner */}
                {loading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}

                {/* Left icon */}
                {!loading && icon && iconPosition === 'left' && (
                    <span className="mr-2 flex-shrink-0">
                        {icon}
                    </span>
                )}

                {/* Button text */}
                <span className="flex-1">
                    {loading && loadingText ? loadingText : children}
                </span>

                {/* Right icon */}
                {!loading && icon && iconPosition === 'right' && (
                    <span className="ml-2 flex-shrink-0">
                        {icon}
                    </span>
                )}
            </>
        )

        // Render with or without animation
        if (animation === 'none') {
            return (
                <button
                    ref={ref}
                    className={buttonClassName}
                    disabled={disabled || loading}
                    {...props}
                >
                    {buttonContent}
                </button>
            )
        } return (
            <motion.button
                ref={ref}
                className={buttonClassName}
                disabled={disabled || loading}
                {...(animationProps as any)}
                {...(props as any)}
            >
                {buttonContent}
            </motion.button>
        )
    }
)

ExecutiveButton.displayName = 'ExecutiveButton'

// Premium Button Presets
export const PremiumButton = (props: Omit<ExecutiveButtonProps, 'variant'>) => (
    <ExecutiveButton variant="premium" animation="executive" elevated {...props} />
)

export const ExecutivePrimaryButton = (props: Omit<ExecutiveButtonProps, 'variant'>) => (
    <ExecutiveButton variant="executive" animation="executive" size="executive" {...props} />
)

export const CallToActionButton = (props: Omit<ExecutiveButtonProps, 'variant' | 'size'>) => (
    <ExecutiveButton
        variant="premium"
        size="xl"
        animation="executive"
        elevated
        rounded="xl"
        {...props}
    />
)

// Export types
export type { ExecutiveButtonProps }
