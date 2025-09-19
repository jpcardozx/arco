/**
 * ARCO Modern Layout Components
 * Built on shadcn/ui foundation with executive aesthetics
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants, cardVariants, containerVariants } from '@/lib/design-tokens'
import { VariantProps, cva } from 'class-variance-authority'

// Container Component
const containerClass = cva(
    'mx-auto',
    {
        variants: containerVariants,
        defaultVariants: {
            size: 'lg',
            padding: 'md',
        },
    }
)

interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerClass> { }

export function Container({ className, size, padding, ...props }: ContainerProps) {
    return (
        <div
            className={cn(containerClass({ size, padding }), className)}
            {...props}
        />
    )
}

// Section Component
const sectionClass = cva(
    'relative',
    {
        variants: {
            padding: {
                none: 'py-0',
                sm: 'py-8 sm:py-12',
                md: 'py-12 sm:py-16',
                lg: 'py-16 sm:py-20',
                xl: 'py-20 sm:py-24',
                '2xl': 'py-24 sm:py-32',
            },
            background: {
                transparent: 'bg-transparent',
                white: 'bg-white',
                neutral: 'bg-neutral-50',
                dark: 'bg-neutral-900',
                gradient: 'bg-gradient-to-br from-primary-50 via-white to-neutral-50',
                executive: 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900',
            },
        },
        defaultVariants: {
            padding: 'lg',
            background: 'transparent',
        },
    }
)

interface SectionProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionClass> { }

export function Section({ className, padding, background, ...props }: SectionProps) {
    return (
        <section
            className={cn(sectionClass({ padding, background }), className)}
            {...props}
        />
    )
}

// Grid Component
const gridClass = cva(
    'grid',
    {
        variants: {
            cols: {
                1: 'grid-cols-1',
                2: 'grid-cols-1 md:grid-cols-2',
                3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
                6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
                12: 'grid-cols-12',
            },
            gap: {
                sm: 'gap-4',
                md: 'gap-6',
                lg: 'gap-8',
                xl: 'gap-12',
            },
        },
        defaultVariants: {
            cols: 3,
            gap: 'md',
        },
    }
)

interface GridProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridClass> { }

export function Grid({ className, cols, gap, ...props }: GridProps) {
    return (
        <div
            className={cn(gridClass({ cols, gap }), className)}
            {...props}
        />
    )
}

// Typography Components
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({
    as: Component = 'h2',
    className,
    ...props
}: HeadingProps) {
    const headingClasses = {
        h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
        h6: 'scroll-m-20 text-base font-semibold tracking-tight',
    }

    return (
        <Component
            className={cn(headingClasses[Component], className)}
            {...props}
        />
    )
}

export function Text({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
        />
    )
}

export function Lead({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('text-xl text-muted-foreground', className)}
            {...props}
        />
    )
}

export function Large({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('text-lg font-semibold', className)}
            {...props}
        />
    )
}

export function Small({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <small
            className={cn('text-sm font-medium leading-none', className)}
            {...props}
        />
    )
}

export function Muted({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
}

// Executive Card Component
interface ExecutiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'executive' | 'glass' | 'premium'
}

export function ExecutiveCard({
    className,
    variant = 'default',
    ...props
}: ExecutiveCardProps) {
    return (
        <div
            className={cn(cardVariants.variant[variant], 'rounded-lg p-6', className)}
            {...props}
        />
    )
}

// Flex utilities
export function Flex({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex', className)}
            {...props}
        />
    )
}

export function Center({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex items-center justify-center', className)}
            {...props}
        />
    )
}

export function Stack({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex flex-col space-y-4', className)}
            {...props}
        />
    )
}