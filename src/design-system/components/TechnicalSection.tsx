/**
 * TechnicalSection - Base component for technical-themed sections
 * Integrates design system tokens with technical aesthetics
 */

import React from 'react'
import { motion } from 'framer-motion'
import { technicalTokens } from '../tokens/technical'
import { cn } from '../../lib/utils'

interface TechnicalSectionProps {
    children: React.ReactNode
    className?: string
    variant?: 'dark' | 'darker' | 'darkest'
    padding?: 'sm' | 'md' | 'lg' | 'xl'
    showGrid?: boolean
    showAccents?: boolean
    maxWidth?: 'container' | 'wide' | 'full'
}

interface TechnicalHeaderProps {
    badge?: {
        icon?: React.ComponentType<{ className?: string }>
        text: string
        variant?: 'primary' | 'success' | 'info'
    }
    headline: string
    subheadline?: string
    description?: string
    align?: 'left' | 'center'
    className?: string
}

const variants = {
    dark: technicalTokens.colors.surface.canvas,
    darker: technicalTokens.colors.surface.elevated,
    darkest: technicalTokens.colors.surface.overlay
}

const paddingVariants = {
    sm: technicalTokens.spacing.layout.sm,
    md: technicalTokens.spacing.layout.base,
    lg: technicalTokens.spacing.layout.md,
    xl: technicalTokens.spacing.layout.lg
}

const maxWidthVariants = {
    container: 'max-w-7xl',
    wide: 'max-w-8xl',
    full: 'max-w-none'
}

export function TechnicalSection({
    children,
    className = '',
    variant = 'dark',
    padding = 'lg',
    showGrid = true,
    showAccents = true,
    maxWidth = 'container'
}: TechnicalSectionProps) {
    return (
        <section
            className={cn(
                'relative overflow-hidden',
                className
            )}
            style={{
                backgroundColor: variants[variant],
                paddingTop: paddingVariants[padding],
                paddingBottom: paddingVariants[padding]
            }}
        >
            {/* Technical Grid Background */}
            {showGrid && (
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                linear-gradient(${technicalTokens.colors.surface.border} 1px, transparent 1px),
                linear-gradient(90deg, ${technicalTokens.colors.surface.border} 1px, transparent 1px)
              `,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>
            )}

            {/* Technical Accent Elements */}
            {showAccents && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: technicalTokens.colors.accent.blue.primary }}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full animate-pulse"
                        style={{ backgroundColor: technicalTokens.colors.accent.emerald.primary }}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: technicalTokens.colors.accent.purple.primary }}
                    />
                </div>
            )}

            {/* Content Container */}
            <div className={cn('container mx-auto px-6 lg:px-8 relative z-10', maxWidthVariants[maxWidth])}>
                {children}
            </div>
        </section>
    )
}

export function TechnicalHeader({
    badge,
    headline,
    subheadline,
    description,
    align = 'center',
    className = ''
}: TechnicalHeaderProps) {
    const alignmentClasses = align === 'center' ? 'text-center' : 'text-left'
    const maxWidthClasses = align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl'

    const badgeVariants = {
        primary: {
            bg: technicalTokens.colors.surface.accent,
            border: technicalTokens.colors.surface.border,
            text: technicalTokens.colors.accent.blue.primary
        },
        success: {
            bg: technicalTokens.colors.surface.accent,
            border: technicalTokens.colors.surface.border,
            text: technicalTokens.colors.accent.emerald.primary
        },
        info: {
            bg: technicalTokens.colors.surface.accent,
            border: technicalTokens.colors.surface.border,
            text: technicalTokens.colors.accent.purple.primary
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={cn(alignmentClasses, 'mb-16', className)}
        >
            {/* Technical Badge */}
            {badge && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={cn(
                        'inline-flex items-center px-4 py-2 mb-8 rounded-lg text-sm font-medium border shadow-sm',
                        align === 'center' ? '' : 'mb-6'
                    )}
                    style={{
                        backgroundColor: badgeVariants[badge.variant || 'primary'].bg,
                        borderColor: badgeVariants[badge.variant || 'primary'].border,
                        color: badgeVariants[badge.variant || 'primary'].text
                    }}
                >
                    {badge.icon && <badge.icon className="w-4 h-4 mr-2" />}
                    <span className="font-semibold">{badge.text}</span>
                </motion.div>
            )}

            {/* Main Headline */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={cn('font-bold leading-tight mb-6', maxWidthClasses)} style={{
                    fontSize: technicalTokens.typography.scale.display.lg?.fontSize || '3.75rem',
                    lineHeight: technicalTokens.typography.scale.display.lg?.lineHeight || '1',
                    letterSpacing: technicalTokens.typography.scale.display.lg?.letterSpacing || '-0.03em',
                    color: technicalTokens.colors.status.neutral.foreground
                }}
            >
                {headline.includes('<span>') ? (
                    <span dangerouslySetInnerHTML={{ __html: headline }} />
                ) : (
                    headline
                )}
            </motion.h2>

            {/* Subheadline */}
            {subheadline && (
                <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={cn('text-xl font-semibold mb-4', maxWidthClasses)}
                    style={{ color: technicalTokens.colors.status.neutral.muted }}
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
                    className={cn('text-lg leading-relaxed', maxWidthClasses)}
                    style={{ color: technicalTokens.colors.status.neutral.primary }}
                >
                    {description}
                </motion.p>
            )}

            {/* Technical Divider */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={cn('h-0.5 mt-8', align === 'center' ? 'mx-auto w-24' : 'w-16')}
                style={{
                    background: `linear-gradient(90deg, transparent, ${technicalTokens.colors.accent.blue.primary}, transparent)`
                }}
            />
        </motion.div>
    )
}
