'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from './section'
import { Heading } from './heading'
import { Badge } from './badge'
import { cn } from '../../lib/ui-utils'
import { withTranslation } from '../../lib/with-translation'
import { Check, ArrowRight } from 'lucide-react'

interface Feature {
    title: string
    description: string
    icon?: React.ReactNode | string
    imageUrl?: string
    highlight?: boolean
    badge?: string
}

interface FeatureSectionProps {
    title?: string
    subtitle?: string
    description?: string
    features: Feature[]
    layout?: 'grid' | 'list' | 'alternating' | 'columns'
    columns?: 1 | 2 | 3 | 4
    withAnimation?: boolean
    withDividers?: boolean
    className?: string
    theme?: 'light' | 'dark'
    iconSize?: 'sm' | 'md' | 'lg'
    withBackground?: boolean
    align?: 'left' | 'center'
    showActionLink?: boolean
    actionLinkText?: string
    actionLinkHref?: string
    // Provided by withTranslation HOC
    t: (key: string) => string
}

function FeatureSectionComponent({
    title,
    subtitle,
    description,
    features,
    layout = 'grid',
    columns = 3,
    withAnimation = true,
    withDividers = false,
    className,
    theme = 'light',
    iconSize = 'md',
    withBackground = false,
    align = 'center',
    showActionLink = false,
    actionLinkText,
    actionLinkHref = '#',
    t
}: FeatureSectionProps) {
    // Use provided text or translation keys
    const displayTitle = title || t('title')
    const displaySubtitle = subtitle || t('subtitle')
    const displayDescription = description || t('description')
    const displayActionLinkText = actionLinkText || t('actionLink')

    // Generate grid columns class
    const getColumnsClass = () => {
        switch (columns) {
            case 1: return 'grid-cols-1'
            case 2: return 'grid-cols-1 md:grid-cols-2'
            case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            default: return 'grid-cols-1 md:grid-cols-3'
        }
    }

    // Get icon size class
    const getIconSizeClass = () => {
        switch (iconSize) {
            case 'sm': return 'h-10 w-10'
            case 'md': return 'h-12 w-12'
            case 'lg': return 'h-16 w-16'
            default: return 'h-12 w-12'
        }
    }

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }
    }

    // Render a feature based on layout type
    const renderFeature = (feature: Feature, index: number) => {
        const baseFeatureClasses = cn(
            'relative',
            withDividers && layout !== 'alternating' && 'border-neutral-200 dark:border-neutral-800',
            withDividers && layout === 'grid' && index % columns !== columns - 1 && 'border-r',
            withDividers && layout === 'grid' && index < features.length - columns && 'border-b',
            withDividers && layout === 'list' && index !== features.length - 1 && 'border-b',
            feature.highlight && 'bg-blue-50/50 dark:bg-blue-900/20 rounded-xl shadow-sm',
            layout === 'grid' && 'p-6',
            layout === 'list' && 'p-6',
            layout === 'columns' && 'p-6'
        )

        const contentWrapperClasses = cn(
            layout === 'alternating' && 'flex flex-col md:flex-row items-center gap-10',
            index % 2 === 1 && layout === 'alternating' && 'md:flex-row-reverse'
        )

        const animationProps = withAnimation ? {
            variants: itemVariants
        } : {}

        // Helper to render icon
        const renderIcon = () => {
            if (typeof feature.icon === 'string') {
                // If icon is a URL string
                return (
                    <div className={cn(
                        "rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-900/30",
                        getIconSizeClass()
                    )}>
                        <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={iconSize === 'lg' ? 40 : iconSize === 'md' ? 32 : 24}
                            height={iconSize === 'lg' ? 40 : iconSize === 'md' ? 32 : 24}
                            className="object-contain"
                        />
                    </div>
                )
            } else if (feature.icon) {
                // If icon is a React node
                return (
                    <div className={cn(
                        "rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-900/30",
                        getIconSizeClass()
                    )}>
                        {feature.icon}
                    </div>
                )
            } else {
                // Default icon
                return (
                    <div className={cn(
                        "rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-900/30",
                        getIconSizeClass()
                    )}>
                        <Check className={iconSize === 'lg' ? 'h-8 w-8' : iconSize === 'md' ? 'h-6 w-6' : 'h-5 w-5'} />
                    </div>
                )
            }
        }

        // Alternating layout with image
        if (layout === 'alternating') {
            return (
                <motion.div
                    key={index}
                    className={cn("py-10", baseFeatureClasses)}
                    {...animationProps}
                >
                    <div className={contentWrapperClasses}>
                        {/* Image side */}
                        {feature.imageUrl && (
                            <div className="w-full md:w-1/2">
                                <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={feature.imageUrl}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content side */}
                        <div className="w-full md:w-1/2">
                            <div className="flex flex-col gap-4">
                                {feature.badge && (
                                    <Badge variant="outline" size="sm">
                                        {feature.badge}
                                    </Badge>
                                )}
                                <Heading level={3} className="text-xl md:text-2xl">
                                    {feature.title}
                                </Heading>
                                <p className={cn(
                                    "text-neutral-600 dark:text-neutral-400",
                                    feature.highlight && "text-neutral-800 dark:text-neutral-200"
                                )}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )
        }

        // Grid, list or columns layout
        return (
            <motion.div
                key={index}
                className={baseFeatureClasses}
                {...animationProps}
            >
                <div className="flex flex-col gap-4">
                    {feature.badge && (
                        <Badge variant="outline" size="sm">
                            {feature.badge}
                        </Badge>
                    )}

                    <div className="flex items-center gap-4">
                        {renderIcon()}

                        <Heading level={3} className="text-lg md:text-xl">
                            {feature.title}
                        </Heading>
                    </div>

                    <p className={cn(
                        "text-neutral-600 dark:text-neutral-400",
                        feature.highlight && "text-neutral-800 dark:text-neutral-200"
                    )}>
                        {feature.description}
                    </p>
                </div>
            </motion.div>
        )
    }

    return (
        <Section
            className={cn(
                theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900',
                withBackground && theme === 'light' && 'bg-neutral-50',
                withBackground && theme === 'dark' && 'bg-neutral-950',
                className
            )}
        >
            <div className={cn(
                "container mx-auto px-4",
                align === 'center' ? 'text-center' : 'text-left'
            )}>
                {/* Section header */}
                {(displayTitle || displaySubtitle || displayDescription) && (
                    <div className={cn(
                        "max-w-3xl mb-12",
                        align === 'center' ? 'mx-auto' : ''
                    )}>
                        {displaySubtitle && (
                            <p className="text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400 font-medium mb-3">
                                {displaySubtitle}
                            </p>
                        )}

                        {displayTitle && (
                            <Heading level={2} className="text-3xl md:text-4xl mb-4">
                                {displayTitle}
                            </Heading>
                        )}

                        {displayDescription && (
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                {displayDescription}
                            </p>
                        )}
                    </div>
                )}

                {/* Features content */}
                {withAnimation ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className={cn(
                            layout === 'grid' && `grid ${getColumnsClass()} gap-6`,
                            layout === 'list' && 'flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800',
                            layout === 'columns' && `grid ${getColumnsClass()} gap-10`,
                            layout === 'alternating' && 'space-y-16'
                        )}
                    >
                        {features.map((feature, index) => renderFeature(feature, index))}
                    </motion.div>
                ) : (
                    <div className={cn(
                        layout === 'grid' && `grid ${getColumnsClass()} gap-6`,
                        layout === 'list' && 'flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800',
                        layout === 'columns' && `grid ${getColumnsClass()} gap-10`,
                        layout === 'alternating' && 'space-y-16'
                    )}>
                        {features.map((feature, index) => renderFeature(feature, index))}
                    </div>
                )}

                {/* Action link */}
                {showActionLink && (
                    <div className={cn(
                        "mt-12",
                        align === 'center' ? 'text-center' : 'text-left'
                    )}>
                        <a
                            href={actionLinkHref}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                            {displayActionLinkText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                )}
            </div>
        </Section>
    )
}

// Export with translation
export const FeatureSection = withTranslation(FeatureSectionComponent, 'components.featureSection')
