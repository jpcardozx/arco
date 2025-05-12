'use client'

import React, { useRef } from 'react'
import { cn } from '../../lib/ui-utils'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements
    containerClassName?: string
    maxWidth?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    withParallax?: boolean
    parallaxIntensity?: 'light' | 'medium' | 'heavy'
    divider?: 'none' | 'top' | 'bottom' | 'both'
}

/**
 * Enhanced Section component with parallax effect and layout options
 */
export function Section({
    as = 'section',
    children,
    className,
    containerClassName,
    maxWidth = 'default',
    withParallax = false,
    parallaxIntensity = 'medium',
    divider = 'none',
    ...props
}: SectionProps) {
    const Component = as
    const sectionRef = useRef<HTMLDivElement>(null)

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Configure parallax intensity
    const intensityConfig = {
        light: 50,
        medium: 100,
        heavy: 150
    }

    const intensity = intensityConfig[parallaxIntensity]
    const y = withParallax ? useTransform(scrollYProgress, [0, 1], [intensity, -intensity]) : undefined

    // Configure max width
    const maxWidthConfig = {
        default: 'max-w-7xl',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full'
    }

    // Configure dividers
    const dividerStyles = {
        top: "border-t border-neutral-200",
        bottom: "border-b border-neutral-200",
        both: "border-t border-b border-neutral-200",
        none: ""
    }

    return (
        <Component
            ref={sectionRef}
            className={cn(
                "relative w-full",
                dividerStyles[divider],
                className
            )}
            {...props}
        >
            {withParallax ? (
                <motion.div
                    className={cn(
                        "container mx-auto px-4 sm:px-6 py-16 md:py-24",
                        maxWidthConfig[maxWidth],
                        containerClassName
                    )}
                    style={{ y }}
                >
                    {children}
                </motion.div>
            ) : (
                <div
                    className={cn(
                        "container mx-auto px-4 sm:px-6 py-16 md:py-24",
                        maxWidthConfig[maxWidth],
                        containerClassName
                    )}
                >
                    {children}
                </div>
            )}
        </Component>
    )
}
