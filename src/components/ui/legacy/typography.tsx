/**
 * Legacy Layout Components
 * 
 * Componentes temporários para manter compatibilidade
 * com componentes legados enquanto migramos para o novo design system
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

// Section Component
export interface SectionProps extends React.HTMLAttributes<HTMLElement> { }

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, ...props }, ref) => (
        <section
            ref={ref}
            className={cn('py-16 px-4', className)}
            {...props}
        >
            {children}
        </section>
    )
)
Section.displayName = 'Section'

// Heading Components
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const Heading2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, children, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn('text-3xl font-bold', className)}
            {...props}
        >
            {children}
        </h2>
    )
)
Heading2.displayName = 'Heading2'

export const Heading3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, children, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('text-2xl font-semibold', className)}
            {...props}
        >
            {children}
        </h3>
    )
)
Heading3.displayName = 'Heading3'

// Typography Components
export interface BodyRegularProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export const BodyRegular = React.forwardRef<HTMLParagraphElement, BodyRegularProps>(
    ({ className, children, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-base leading-relaxed', className)}
            {...props}
        >
            {children}
        </p>
    )
)
BodyRegular.displayName = 'BodyRegular'

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> { }

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
    ({ className, children, ...props }, ref) => (
        <span
            ref={ref}
            className={cn('text-sm text-neutral-600', className)}
            {...props}
        >
            {children}
        </span>
    )
)
Caption.displayName = 'Caption'
