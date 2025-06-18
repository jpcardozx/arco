'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MotionContainer } from '../../design-system/components'

interface PremiumSectionProps {
    children: React.ReactNode
    className?: string
    background?: 'white' | 'neutral' | 'dark' | 'enterprise'
    spacing?: 'compact' | 'standard' | 'spacious'
    maxWidth?: 'content' | 'wide' | 'full'
}

interface SectionHeaderProps {
    badge?: {
        icon?: React.ComponentType<{ className?: string }>
        text: string
        variant?: 'neutral' | 'accent' | 'enterprise'
    }
    headline: string
    subheadline?: string
    description?: string
    align?: 'left' | 'center'
    className?: string
}

const backgroundVariants = {
    white: "bg-white",
    neutral: "bg-gray-50/30",
    dark: "bg-slate-900",
    enterprise: "bg-white border-t border-gray-200/60"
}

const spacingVariants = {
    compact: "py-12 lg:py-16",
    standard: "py-16 lg:py-20",
    spacious: "py-20 lg:py-28"
}

const maxWidthVariants = {
    content: "max-w-5xl",
    wide: "max-w-6xl",
    full: "max-w-none"
}

export function PremiumSection({
    children,
    className = "",
    background = "white",
    spacing = "standard",
    maxWidth = "content"
}: PremiumSectionProps) {
    return (
        <section className={`
            ${backgroundVariants[background]} 
            ${spacingVariants[spacing]} 
            ${className}
        `}>
            {/* Premium Background Effects */}
            {background === 'enterprise' && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.03),transparent_50%)]" />
                </div>
            )}

            <MotionContainer className={`relative z-10 ${maxWidthVariants[maxWidth]} mx-auto`}>
                {children}
            </MotionContainer>
        </section>
    )
}

export function SectionHeader({
    badge,
    headline,
    subheadline,
    description,
    align = "center",
    className = ""
}: SectionHeaderProps) {
    const alignmentClasses = align === 'center' ? 'text-center' : 'text-left'
    const maxWidthClasses = align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${alignmentClasses} mb-16 ${className}`}
        >
            {/* Premium Badge */}
            {badge && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/60 rounded-full text-emerald-700 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 ${align === 'center' ? '' : 'mb-6'}`}
                >
                    {badge.icon && <badge.icon className="w-4 h-4 mr-2" />}
                    <span className="bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent font-semibold">
                        {badge.text}
                    </span>
                </motion.div>
            )}            {/* Main Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 ${maxWidthClasses}`}
            >
                {headline.includes('<span>') ? (
                    <span dangerouslySetInnerHTML={{ __html: headline }} />
                ) : (
                    headline
                )}
            </motion.h2>

            {/* Subtitle */}
            {subheadline && (
                <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`text-xl font-semibold text-slate-700 mb-4 ${maxWidthClasses}`}
                >
                    {subheadline}
                </motion.h3>
            )}

            {/* Description */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`text-lg text-slate-600 leading-relaxed ${maxWidthClasses}`}
                >
                    {description}
                </motion.p>
            )}

            {/* Elegant Divider */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent mt-8 ${align === 'center' ? 'mx-auto w-24' : 'w-16'}`}
            />
        </motion.div>
    )
}
