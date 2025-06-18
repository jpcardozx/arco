'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
    children: ReactNode
    className?: string
    containerClassName?: string
    background?: 'white' | 'gray' | 'transparent'
    spacing?: 'tight' | 'normal' | 'loose'
    id?: string
}

export function SectionWrapper({
    children,
    className,
    containerClassName,
    background = 'transparent',
    spacing = 'normal',
    id
}: SectionWrapperProps) {
    const backgroundClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        transparent: 'bg-transparent'
    }

    const spacingClasses = {
        tight: 'py-12 sm:py-16',
        normal: 'py-16 sm:py-24',
        loose: 'py-24 sm:py-32'
    }

    return (
        <section
            id={id}
            className={cn(
                backgroundClasses[background],
                spacingClasses[spacing],
                className
            )}
        >
            <div className={cn(
                "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                containerClassName
            )}>
                {children}
            </div>
        </section>
    )
}
