/**
 * ARCO PATCH 3: Executive Input Component
 * Premium input system with sophisticated validation and micro-interactions
 * Executive-grade form controls with accessibility and UX excellence
 */

'use client'

import React, { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { designTokens, componentVariants } from './DesignTokens'

// Executive Input Props Interface
interface ExecutiveInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string
    description?: string
    error?: string
    success?: string
    hint?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'executive'
    variant?: 'default' | 'executive' | 'premium' | 'minimal'
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    loading?: boolean
    showPasswordToggle?: boolean
    focusRing?: boolean
    animated?: boolean
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    prefix?: string
    suffix?: string
}

// Premium Input Variants
const premiumVariants = {
    executive: {
        base: `
      bg-slate-900/50 border-slate-700/60 text-white
      placeholder-slate-400
      focus:bg-slate-900/70 focus:border-blue-500/60 focus:ring-blue-500/20
      hover:border-slate-600/80
      backdrop-blur-sm
      transition-all duration-300
    `,
        error: `
      bg-slate-900/50 border-red-500/60 text-white
      focus:border-red-500 focus:ring-red-500/20
    `,
        success: `
      bg-slate-900/50 border-green-500/60 text-white
      focus:border-green-500 focus:ring-green-500/20
    `
    },
    premium: {
        base: `
      bg-white/90 border-slate-300/60 text-slate-900
      placeholder-slate-500
      focus:bg-white focus:border-blue-500 focus:ring-blue-500/20
      hover:border-slate-400/80
      backdrop-blur-sm
      shadow-sm hover:shadow-md
      transition-all duration-300
    `,
        error: `
      bg-white/90 border-red-400/60 text-slate-900
      focus:border-red-500 focus:ring-red-500/20
    `,
        success: `
      bg-white/90 border-green-400/60 text-slate-900
      focus:border-green-500 focus:ring-green-500/20
    `
    },
    minimal: {
        base: `
      bg-transparent border-0 border-b-2 border-slate-300 text-slate-900
      placeholder-slate-400 rounded-none
      focus:border-blue-500 focus:ring-0
      transition-all duration-300
    `,
        error: `
      bg-transparent border-0 border-b-2 border-red-500 text-slate-900
      focus:border-red-600 focus:ring-0
    `,
        success: `
      bg-transparent border-0 border-b-2 border-green-500 text-slate-900
      focus:border-green-600 focus:ring-0
    `
    }
} as const

// Size Variants
const sizeVariants = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
    xl: 'px-6 py-4 text-lg',
    executive: 'px-8 py-5 text-lg'
} as const

// Rounded Variants
const roundedVariants = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
} as const

// Animation Variants
const inputAnimations = {
    scale: {
        whileFocus: { scale: 1.02 },
        transition: { duration: 0.2 }
    },
    glow: {
        whileFocus: {
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.05)'
        },
        transition: { duration: 0.3 }
    }
} as const

/**
 * Executive Input Component
 * Premium input with sophisticated styling and interactions
 */
export const ExecutiveInput = forwardRef<HTMLInputElement, ExecutiveInputProps>(
    ({
        label,
        description,
        error,
        success,
        hint,
        size = 'md',
        variant = 'default',
        leftIcon,
        rightIcon,
        loading = false,
        showPasswordToggle = false,
        focusRing = true,
        animated = true,
        rounded = 'lg',
        prefix,
        suffix,
        type = 'text',
        className = '',
        disabled,
        ...props
    }, ref) => {

        const [showPassword, setShowPassword] = useState(false)
        const [isFocused, setIsFocused] = useState(false)

        const inputType = type === 'password' && showPassword ? 'text' : type

        // Get variant styles
        const getVariantStyles = () => {
            if (variant in premiumVariants) {
                const variantStyles = premiumVariants[variant as keyof typeof premiumVariants]
                if (error) return variantStyles.error
                if (success) return variantStyles.success
                return variantStyles.base
            }

            const baseVariant = componentVariants.input.default
            if (error) return componentVariants.input.error
            if (success) return componentVariants.input.success
            return baseVariant
        }

        // Build input className
        const inputClassName = [
            // Base styles
            'w-full font-medium',
            'border transition-all duration-200',
            'focus:outline-none',

            // Size
            sizeVariants[size],

            // Rounded
            roundedVariants[rounded],

            // Variant styles
            getVariantStyles(),

            // Focus ring
            focusRing && !error && !success ? 'focus:ring-2 focus:ring-offset-1' : '',

            // Icons padding adjustments
            leftIcon ? 'pl-12' : '',
            rightIcon || showPasswordToggle ? 'pr-12' : '',

            // Disabled state
            disabled ? 'opacity-50 cursor-not-allowed' : '',

            // Loading state
            loading ? 'animate-pulse' : '',

            // Custom className
            className
        ].filter(Boolean).join(' ')

        // Label with animation
        const renderLabel = () => {
            if (!label) return null

            return (
                <motion.label
                    className={`
            block text-sm font-semibold mb-2
            ${variant === 'executive' ? 'text-slate-200' : 'text-slate-700'}
            ${error ? 'text-red-600' : success ? 'text-green-600' : ''}
          `}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </motion.label>
            )
        }

        // Description text
        const renderDescription = () => {
            if (!description) return null

            return (
                <p className={`
          text-xs mb-2
          ${variant === 'executive' ? 'text-slate-400' : 'text-slate-600'}
        `}>
                    {description}
                </p>
            )
        }

        // Status message (error, success, hint)
        const renderStatusMessage = () => {
            const message = error || success || hint
            if (!message) return null

            const getIcon = () => {
                if (error) return <AlertCircle className="w-4 h-4" />
                if (success) return <CheckCircle className="w-4 h-4" />
                return <Info className="w-4 h-4" />
            }

            const getColorClass = () => {
                if (error) return 'text-red-600'
                if (success) return 'text-green-600'
                return variant === 'executive' ? 'text-slate-400' : 'text-slate-600'
            }

            return (
                <motion.div
                    className={`flex items-center mt-2 text-xs ${getColorClass()}`}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {getIcon()}
                    <span className="ml-1">{message}</span>
                </motion.div>
            )
        }

        // Input wrapper with icons
        const renderInputWrapper = () => {
            const WrapperComponent = animated ? motion.div : 'div'
            const animationProps = animated ? {
                ...inputAnimations.glow,
                animate: isFocused ? { ...inputAnimations.glow.whileFocus } : {}
            } : {}

            return (
                <WrapperComponent
                    className="relative"
                    {...(animated ? animationProps : {})}
                >
                    {/* Prefix */}
                    {prefix && (
                        <div className={`
              absolute left-0 inset-y-0 flex items-center px-3
              ${variant === 'executive' ? 'text-slate-400' : 'text-slate-500'}
              text-sm font-medium
            `}>
                            {prefix}
                        </div>
                    )}

                    {/* Left Icon */}
                    {leftIcon && (
                        <div className={`
              absolute left-3 inset-y-0 flex items-center pointer-events-none
              ${variant === 'executive' ? 'text-slate-400' : 'text-slate-500'}
              ${isFocused ? (variant === 'executive' ? 'text-blue-400' : 'text-blue-600') : ''}
              transition-colors duration-200
            `}>
                            {leftIcon}
                        </div>
                    )}

                    {/* Input Field */}
                    <input
                        ref={ref}
                        type={inputType}
                        className={inputClassName}
                        disabled={disabled || loading}
                        onFocus={(e) => {
                            setIsFocused(true)
                            props.onFocus?.(e)
                        }}
                        onBlur={(e) => {
                            setIsFocused(false)
                            props.onBlur?.(e)
                        }}
                        {...props}
                    />

                    {/* Right Icon / Password Toggle */}
                    {(rightIcon || showPasswordToggle) && (
                        <div className="absolute right-3 inset-y-0 flex items-center">
                            {showPasswordToggle && type === 'password' ? (
                                <button
                                    type="button"
                                    className={`
                    ${variant === 'executive' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}
                    transition-colors duration-200 focus:outline-none
                  `}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            ) : rightIcon ? (
                                <div className={`
                  ${variant === 'executive' ? 'text-slate-400' : 'text-slate-500'}
                  ${isFocused ? (variant === 'executive' ? 'text-blue-400' : 'text-blue-600') : ''}
                  transition-colors duration-200
                `}>
                                    {rightIcon}
                                </div>
                            ) : null}
                        </div>
                    )}

                    {/* Suffix */}
                    {suffix && (
                        <div className={`
              absolute right-0 inset-y-0 flex items-center px-3
              ${variant === 'executive' ? 'text-slate-400' : 'text-slate-500'}
              text-sm font-medium
            `}>
                            {suffix}
                        </div>
                    )}
                </WrapperComponent>
            )
        }

        return (
            <div className="w-full">
                {renderLabel()}
                {renderDescription()}
                {renderInputWrapper()}
                {renderStatusMessage()}
            </div>
        )
    }
)

ExecutiveInput.displayName = 'ExecutiveInput'

// Premium Input Presets
export const PremiumInput = (props: Omit<ExecutiveInputProps, 'variant'>) => (
    <ExecutiveInput variant="premium" animated focusRing {...props} />
)

export const ExecutiveFormInput = (props: Omit<ExecutiveInputProps, 'variant' | 'size'>) => (
    <ExecutiveInput variant="executive" size="lg" animated {...props} />
)

export const MinimalInput = (props: Omit<ExecutiveInputProps, 'variant'>) => (
    <ExecutiveInput variant="minimal" rounded="sm" {...props} />
)

// Export types
export type { ExecutiveInputProps }
