// Design System - Consistent UI Components for ARCO
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, ReactNode } from 'react'
import { cn } from '../lib/utils'

// Typography Components
export const Heading1 = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => (
        <h1
            ref={ref}
            className={cn("text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900", className)}
            {...props}
        >
            {children}
        </h1>
    )
)
Heading1.displayName = "Heading1"

export const Heading2 = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn("text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900", className)}
            {...props}
        >
            {children}
        </h2>
    )
)
Heading2.displayName = "Heading2"

export const Heading3 = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900", className)}
            {...props}
        >
            {children}
        </h3>
    )
)
Heading3.displayName = "Heading3"

export const BodyLarge = forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-lg md:text-xl text-slate-600 leading-relaxed", className)}
            {...props}
        >
            {children}
        </p>
    )
)
BodyLarge.displayName = "BodyLarge"

export const BodyRegular = forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-base text-slate-600 leading-relaxed", className)}
            {...props}
        >
            {children}
        </p>
    )
)
BodyRegular.displayName = "BodyRegular"

// Card Components
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
    variant?: 'default' | 'elevated' | 'outlined'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, variant = 'default', ...props }, ref) => {
        const variants = {
            default: "bg-white rounded-xl border border-slate-200/50 shadow-sm",
            elevated: "bg-white rounded-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300",
            outlined: "bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors duration-300"
        }

        return (
            <div
                ref={ref}
                className={cn(variants[variant], className)}
                {...props}
            >
                {children}
            </div>
        )
    }
)
Card.displayName = "Card"

// Button Components
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
            secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
            outline: "border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 bg-white"
        }

        const sizes = {
            sm: "px-4 py-2 text-sm font-medium rounded-lg",
            md: "px-6 py-3 text-base font-semibold rounded-xl",
            lg: "px-8 py-4 text-lg font-semibold rounded-xl"
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

// Motion Container Component
interface MotionContainerProps {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
    initial?: any
    animate?: any
    transition?: any
    [key: string]: any
}

export const MotionContainer = forwardRef<HTMLDivElement, MotionContainerProps>(
    ({ children, delay = 0, duration = 0.6, className, initial, animate, transition, ...props }, ref) => {
        const motionProps = {
            initial: initial || { opacity: 0, y: 20 },
            animate: animate || { opacity: 1, y: 0 },
            transition: { delay, duration, ...transition },
            className,
            ...props
        }

        return (
            <motion.div ref={ref} {...motionProps}>
                {children}
            </motion.div>
        )
    }
)
MotionContainer.displayName = "MotionContainer"

// Section Wrapper
interface SectionProps {
    children: ReactNode
    className?: string
    background?: 'white' | 'slate' | 'blue'
    id?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
    ({ children, className, background = 'white', id, ...props }, ref) => {
        const backgrounds = {
            white: "bg-white",
            slate: "bg-gradient-to-br from-slate-50 to-white",
            blue: "bg-gradient-to-br from-blue-50 to-white"
        }

        return (
            <section
                ref={ref}
                id={id}
                className={cn("py-16 md:py-24", backgrounds[background], className)}
                {...props}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </section>
        )
    }
)
Section.displayName = "Section"

// Container
export const Container = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
            {...props}
        >
            {children}
        </div>
    )
)
Container.displayName = "Container"

// Grid System
interface GridProps {
    children: ReactNode
    cols?: 1 | 2 | 3 | 4
    gap?: 'sm' | 'md' | 'lg'
    className?: string
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({ children, className, cols = 3, gap = 'md', ...props }, ref) => {
        const colsMap = {
            1: "grid-cols-1",
            2: "grid-cols-1 md:grid-cols-2",
            3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }

        const gapMap = {
            sm: "gap-4",
            md: "gap-6 md:gap-8",
            lg: "gap-8 md:gap-12"
        }

        return (
            <div
                ref={ref}
                className={cn("grid", colsMap[cols], gapMap[gap], className)}
                {...props}
            >
                {children}
            </div>
        )
    }
)
Grid.displayName = "Grid"
