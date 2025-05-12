'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Typography Components
export function Heading1({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <h1 className={`heading-1 text-4xl md:text-5xl lg:text-6xl font-serif ${className}`}>{children}</h1>
}

export function Heading2({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <h2 className={`heading-2 text-3xl md:text-4xl font-serif ${className}`}>{children}</h2>
}

export function Heading3({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <h3 className={`heading-3 text-2xl md:text-3xl font-serif ${className}`}>{children}</h3>
}

export function BodyLarge({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <p className={`body-large text-lg md:text-xl ${className}`}>{children}</p>
}

export function BodyRegular({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <p className={`body-regular ${className}`}>{children}</p>
}

export function Caption({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <p className={`caption text-sm ${className}`}>{children}</p>
}

// Card Components
type CardVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'

interface CardProps {
    children: ReactNode
    className?: string
    variant?: CardVariant
    animate?: boolean
}

export function Card({ children, className = '', variant = 'primary', animate = false }: CardProps) {
    const baseClasses = 'rounded-lg overflow-hidden'

    const variantClasses = {
        primary: 'bg-white border border-neutral-200 shadow-sm',
        secondary: 'bg-neutral-50 border border-neutral-100',
        outline: 'border border-neutral-200 bg-transparent',
        ghost: 'bg-white/50 backdrop-blur-sm border border-white/20',
        dark: 'bg-neutral-900 border border-neutral-800 text-white'
    }

    const Component = animate ? motion.div : 'div'
    const animationProps = animate ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    } : {}

    return (
        <Component
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...animationProps}
        >
            {children}
        </Component>
    )
}

// Button Components
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
    children: ReactNode
    href?: string
    onClick?: () => void
    className?: string
    variant?: ButtonVariant
    size?: ButtonSize
    animate?: boolean
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
}

export function Button({
    children,
    href,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    animate = false,
    icon,
    iconPosition = 'right'
}: ButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200'

    const variantClasses = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg',
        secondary: 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300',
        outline: 'bg-transparent border border-neutral-300 text-neutral-800 hover:bg-neutral-50',
        ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-900',
        link: 'p-0 bg-transparent text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline'
    }

    const sizeClasses = {
        sm: 'text-sm px-4 py-2 rounded-lg',
        md: variant === 'link' ? '' : 'px-6 py-3 rounded-lg',
        lg: 'text-lg px-8 py-4 rounded-xl'
    }

    const iconClasses = icon ? (
        iconPosition === 'left' ? 'flex-row gap-2' : 'flex-row gap-2'
    ) : ''

    const Component = animate ? motion.div : 'div'
    const animationProps = animate ? {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 }
    } : {}

    const content = (
        <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </>
    )

    if (href) {
        return (
            <Component {...animationProps}>
                <Link
                    href={href}
                    className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${iconClasses} ${className}`}
                >
                    {content}
                </Link>
            </Component>
        )
    }

    return (
        <Component {...animationProps}>
            <button
                onClick={onClick}
                className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${iconClasses} ${className}`}
            >
                {content}
            </button>
        </Component>
    )
}

// Section Components
interface SectionProps {
    children: ReactNode
    className?: string
    dark?: boolean
    border?: boolean
    withContainer?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function Section({
    children,
    className = '',
    dark = false,
    border = false,
    withContainer = true,
    maxWidth = 'xl'
}: SectionProps) {
    const baseClasses = 'py-16 md:py-24'

    const colorClasses = dark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'
    const borderClasses = border ? (dark ? 'border-t border-neutral-800' : 'border-t border-neutral-100') : ''

    const maxWidthClasses = {
        sm: 'max-w-3xl',
        md: 'max-w-4xl',
        lg: 'max-w-5xl',
        xl: 'max-w-6xl',
        '2xl': 'max-w-7xl',
        'full': 'max-w-full'
    }

    return (
        <section className={`${baseClasses} ${colorClasses} ${borderClasses} ${className}`}>
            {withContainer ? (
                <div className={`container mx-auto px-6 ${maxWidthClasses[maxWidth]}`}>
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    )
}

// Grid Layout Components
interface GridProps {
    children: ReactNode
    className?: string
    cols?: 1 | 2 | 3 | 4 | 5
    gap?: 'sm' | 'md' | 'lg'
}

export function Grid({ children, className = '', cols = 3, gap = 'md' }: GridProps) {
    const baseClasses = 'grid'

    const colClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
    }

    const gapClasses = {
        sm: 'gap-4',
        md: 'gap-6 md:gap-8',
        lg: 'gap-8 md:gap-12'
    }

    return (
        <div className={`${baseClasses} ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
            {children}
        </div>
    )
}

// Stat display component
interface StatProps {
    value: string
    label: string
    className?: string
    textSize?: 'sm' | 'md' | 'lg'
    accentColor?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
}

export function Stat({ value, label, className = '', textSize = 'md', accentColor = 'primary' }: StatProps) {
    const baseClasses = 'text-center'

    const textSizeClasses = {
        sm: 'text-2xl font-bold mb-1',
        md: 'text-3xl font-bold mb-1',
        lg: 'text-4xl font-bold mb-2'
    }

    const accentColorClasses = {
        primary: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-amber-600',
        error: 'text-red-600',
        neutral: 'text-neutral-800 dark:text-neutral-200'
    }

    return (
        <div className={`${baseClasses} ${className}`}>
            <p className={`${textSizeClasses[textSize]} ${accentColorClasses[accentColor]}`}>
                {value}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {label}
            </p>
        </div>
    )
}
