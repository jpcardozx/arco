'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    size?: 'sm' | 'md' | 'lg'
    children?: ReactNode
    className?: string
    animated?: boolean
}

export function SectionHeader({
    eyebrow,
    title,
    description,
    align = 'left',
    size = 'md',
    children,
    className,
    animated = true
}: SectionHeaderProps) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center mx-auto'
    }

    const titleSizes = {
        sm: 'text-2xl sm:text-3xl',
        md: 'text-3xl sm:text-4xl lg:text-5xl',
        lg: 'text-4xl sm:text-5xl lg:text-6xl'
    }

    const maxWidths = {
        left: 'max-w-4xl',
        center: 'max-w-3xl'
    }

    const content = (
        <div className={cn(
            maxWidths[align],
            alignClasses[align],
            className
        )}>
            {eyebrow && (
                <div className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mb-4">
                    {eyebrow}
                </div>
            )}

            <h2 className={cn(
                titleSizes[size],
                "font-bold text-gray-900 leading-tight mb-4"
            )}>
                {title}
            </h2>

            {description && (
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                    {description}
                </p>
            )}

            {children}
        </div>
    )

    if (!animated) {
        return content
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
        >
            {content}
        </motion.div>
    )
}
