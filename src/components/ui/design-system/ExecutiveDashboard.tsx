/**
 * ARCO PATCH 3: Executive Dashboard Layout
 * Premium dashboard layout system for sophisticated business intelligence
 * Executive-grade information architecture with responsive design
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExecutiveCard } from './ExecutiveCard'

// Executive Dashboard Props
interface ExecutiveDashboardProps {
    title?: string
    subtitle?: string
    actions?: React.ReactNode
    sidebar?: React.ReactNode
    metrics?: Array<{
        label: string
        value: string | number
        change?: number
        trend?: 'up' | 'down' | 'neutral'
        icon?: React.ReactNode
        color?: 'primary' | 'success' | 'warning' | 'danger'
    }>
    children: React.ReactNode
    variant?: 'default' | 'executive' | 'premium'
    fullHeight?: boolean
    loading?: boolean
}

// Executive Metric Card Props
interface ExecutiveMetricProps {
    label: string
    value: string | number
    change?: number
    trend?: 'up' | 'down' | 'neutral'
    icon?: React.ReactNode
    color?: 'primary' | 'success' | 'warning' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    animated?: boolean
}

// Color variants for metrics
const metricColors = {
    primary: {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        value: 'text-blue-900',
        change: 'text-blue-700'
    },
    success: {
        bg: 'from-green-50 to-green-100',
        border: 'border-green-200',
        icon: 'text-green-600',
        value: 'text-green-900',
        change: 'text-green-700'
    },
    warning: {
        bg: 'from-amber-50 to-amber-100',
        border: 'border-amber-200',
        icon: 'text-amber-600',
        value: 'text-amber-900',
        change: 'text-amber-700'
    },
    danger: {
        bg: 'from-red-50 to-red-100',
        border: 'border-red-200',
        icon: 'text-red-600',
        value: 'text-red-900',
        change: 'text-red-700'
    }
} as const

// Trend indicators
const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
        case 'up':
            return (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            )
        case 'down':
            return (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            )
        default:
            return (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            )
    }
}

/**
 * Executive Metric Card Component
 * Premium metric display with trend indicators and animations
 */
export const ExecutiveMetric: React.FC<ExecutiveMetricProps> = ({
    label,
    value,
    change,
    trend = 'neutral',
    icon,
    color = 'primary',
    size = 'md',
    animated = true
}) => {
    const colors = metricColors[color]

    const sizeClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    }

    const valueSizes = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl'
    }

    const MetricWrapper = animated ? motion.div : 'div'
    const animationProps = animated ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        whileHover: { scale: 1.02, y: -2 },
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
    } : {}

    return (
        <MetricWrapper
            className={`
        bg-gradient-to-br ${colors.bg}
        border ${colors.border}
        rounded-xl shadow-lg hover:shadow-xl
        transition-all duration-300
        ${sizeClasses[size]}
        relative overflow-hidden
        group
      `}
            role="article"
            aria-label={`${label}: ${typeof value === 'number' ? value.toLocaleString() : value}${change !== undefined ? `, ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}%` : ''}`}
            tabIndex={0}
            {...(animated ? animationProps : {})}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative">
                {/* Header with icon and label */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        {icon && (
                            <div className={`${colors.icon} opacity-80`}>
                                {icon}
                            </div>
                        )}
                        <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                            {label}
                        </span>
                    </div>

                    {/* Trend indicator */}
                    {change !== undefined && (
                        <div className={`
              flex items-center space-x-1 text-xs font-semibold
              ${trend === 'up' ? 'text-green-600' :
                                trend === 'down' ? 'text-red-600' : 'text-slate-500'}
            `}>
                            {getTrendIcon(trend)}
                            <span>{change > 0 ? '+' : ''}{change}%</span>
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className={`${valueSizes[size]} font-bold ${colors.value} leading-none`}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
            </div>
        </MetricWrapper>
    )
}

/**
 * Executive Dashboard Layout Component
 * Premium dashboard layout with sophisticated information architecture
 */
export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
    title,
    subtitle,
    actions,
    sidebar,
    metrics = [],
    children,
    variant = 'default',
    fullHeight = false,
    loading = false
}) => {

    // Dashboard header
    const renderHeader = () => {
        if (!title && !subtitle && !actions) return null

        return (
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        {title && (
                            <h1 className={`
                text-3xl font-bold leading-tight
                ${variant === 'executive'
                                    ? 'text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'
                                    : 'text-slate-900'}
              `}>
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className={`
                mt-2 text-lg
                ${variant === 'executive' ? 'text-slate-400' : 'text-slate-600'}
              `}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {actions && (
                        <div className="flex items-center space-x-4">
                            {actions}
                        </div>
                    )}
                </div>
            </motion.div>
        )
    }

    // Metrics grid
    const renderMetrics = () => {
        if (metrics.length === 0) return null

        return (
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.1 + (index * 0.05),
                                ease: [0.23, 1, 0.32, 1]
                            }}
                        >
                            <ExecutiveMetric {...metric} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        )
    }

    // Main content area
    const renderMainContent = () => {
        const contentClasses = sidebar
            ? 'grid grid-cols-1 lg:grid-cols-4 gap-8'
            : 'w-full'

        return (
            <motion.div
                className={contentClasses}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
                {/* Sidebar */}
                {sidebar && (
                    <div className="lg:col-span-1">
                        <ExecutiveCard
                            variant={variant === 'executive' ? 'executive' : 'premium'}
                            padding="lg"
                            hover="glow"
                        >
                            {sidebar}
                        </ExecutiveCard>
                    </div>
                )}

                {/* Main content */}
                <div className={sidebar ? 'lg:col-span-3' : 'w-full'}>          {loading ? (
                    <ExecutiveCard variant="elevated" padding="lg" loading>
                        <div></div>
                    </ExecutiveCard>
                ) : (
                    children
                )}
                </div>
            </motion.div>
        )
    }

    // Dashboard wrapper classes
    const wrapperClasses = [
        'w-full',
        fullHeight ? 'min-h-screen' : '',
        variant === 'executive'
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-50',
        'relative'
    ].filter(Boolean).join(' ')

    const containerClasses = [
        'container mx-auto px-6 py-8',
        fullHeight ? 'min-h-screen' : ''
    ].filter(Boolean).join(' ')

    return (
        <div className={wrapperClasses}>
            {/* Background decoration for executive variant */}
            {variant === 'executive' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                </div>
            )}

            <div className={containerClasses}>
                <div className="relative z-10">
                    {renderHeader()}
                    {renderMetrics()}
                    {renderMainContent()}
                </div>
            </div>
        </div>
    )
}

// Export components
export type { ExecutiveDashboardProps, ExecutiveMetricProps }
