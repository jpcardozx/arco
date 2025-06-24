'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals'
import {
    Activity,
    Zap,
    Clock,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    X,
    BarChart3
} from 'lucide-react'

interface WebVitalsData {
    lcp?: number
    fcp?: number
    cls?: number
    inp?: number
    ttfb?: number
}

interface MetricDisplay {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    description: string
    icon: React.ReactNode
    unit: string
}

/**
 * Web Vitals Monitor - Development Environment
 * 
 * Real-time visualization of Core Web Vitals metrics
 * Only shown in development for performance debugging
 */
export function WebVitalsMonitor() {
    const [metrics, setMetrics] = useState<WebVitalsData>({})
    const [isVisible, setIsVisible] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    useEffect(() => {
        // Only show in development
        if (process.env.NODE_ENV !== 'development') return

        let mounted = true

        const updateMetric = (metric: Metric) => {
            if (!mounted) return

            setMetrics(prev => ({
                ...prev,
                [metric.name.toLowerCase()]: metric.value
            }))

            setIsVisible(true)
        }

        // Initialize Web Vitals observers
        onLCP(updateMetric)
        onFCP(updateMetric)
        onCLS(updateMetric)
        onINP(updateMetric)
        onTTFB(updateMetric)

        return () => {
            mounted = false
        }
    }, [])

    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
        const thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fcp: { good: 1800, poor: 3000 },
            cls: { good: 0.1, poor: 0.25 },
            inp: { good: 200, poor: 500 },
            ttfb: { good: 800, poor: 1800 }
        }

        const threshold = thresholds[name as keyof typeof thresholds]
        if (!threshold) return 'good'

        if (value <= threshold.good) return 'good'
        if (value <= threshold.poor) return 'needs-improvement'
        return 'poor'
    }

    const formatValue = (name: string, value: number): string => {
        if (name === 'cls') {
            return value.toFixed(3)
        }
        return Math.round(value).toString()
    }

    const getUnit = (name: string): string => {
        return name === 'cls' ? '' : 'ms'
    }

    const getMetricDisplays = (): MetricDisplay[] => {
        return [
            {
                name: 'LCP',
                value: metrics.lcp || 0,
                rating: metrics.lcp ? getRating('lcp', metrics.lcp) : 'good',
                description: 'Largest Contentful Paint',
                icon: <TrendingUp className="w-4 h-4" />,
                unit: getUnit('lcp')
            },
            {
                name: 'FCP',
                value: metrics.fcp || 0,
                rating: metrics.fcp ? getRating('fcp', metrics.fcp) : 'good',
                description: 'First Contentful Paint',
                icon: <Zap className="w-4 h-4" />,
                unit: getUnit('fcp')
            },
            {
                name: 'CLS',
                value: metrics.cls || 0,
                rating: metrics.cls ? getRating('cls', metrics.cls) : 'good',
                description: 'Cumulative Layout Shift',
                icon: <Activity className="w-4 h-4" />,
                unit: getUnit('cls')
            },
            {
                name: 'INP',
                value: metrics.inp || 0,
                rating: metrics.inp ? getRating('inp', metrics.inp) : 'good',
                description: 'Interaction to Next Paint',
                icon: <Clock className="w-4 h-4" />,
                unit: getUnit('inp')
            },
            {
                name: 'TTFB',
                value: metrics.ttfb || 0,
                rating: metrics.ttfb ? getRating('ttfb', metrics.ttfb) : 'good',
                description: 'Time to First Byte',
                icon: <BarChart3 className="w-4 h-4" />,
                unit: getUnit('ttfb')
            }
        ]
    }

    const getRatingColor = (rating: string) => {
        switch (rating) {
            case 'good':
                return 'bg-green-500 text-white'
            case 'needs-improvement':
                return 'bg-yellow-500 text-white'
            case 'poor':
                return 'bg-red-500 text-white'
            default:
                return 'bg-gray-500 text-white'
        }
    }

    const getRatingIcon = (rating: string) => {
        switch (rating) {
            case 'good':
                return <CheckCircle className="w-3 h-3" />
            case 'needs-improvement':
            case 'poor':
                return <AlertTriangle className="w-3 h-3" />
            default:
                return null
        }
    }

    if (process.env.NODE_ENV !== 'development' || !isVisible) {
        return null
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-w-sm"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span className="font-semibold text-sm">Web Vitals Monitor</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-1 hover:bg-white/20 rounded"
                        >
                            <BarChart3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-white/20 rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {!isMinimized && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="p-3 space-y-2"
                    >
                        {getMetricDisplays().map((metric) => (
                            <div
                                key={metric.name}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`p-1 rounded ${getRatingColor(metric.rating)}`}>
                                        {metric.icon}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm text-gray-900">
                                            {metric.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {metric.description}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm text-gray-900">
                                        {formatValue(metric.name.toLowerCase(), metric.value)}
                                        <span className="text-xs text-gray-500 ml-1">{metric.unit}</span>
                                    </div>
                                    <div className="flex items-center gap-1 justify-end">
                                        {getRatingIcon(metric.rating)}
                                        <span className={`text-xs font-medium ${metric.rating === 'good'
                                                ? 'text-green-600'
                                                : metric.rating === 'needs-improvement'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-600'
                                            }`}>
                                            {metric.rating.replace('-', ' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Overall Score */}
                        <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                            <div className="text-center">
                                <div className="text-xs text-gray-600 mb-1">Overall Performance</div>
                                <div className={`text-sm font-bold ${Object.values(metrics).every((value, index) => {
                                    const metricNames = ['lcp', 'fcp', 'cls', 'inp', 'ttfb']
                                    return getRating(metricNames[index], value || 0) === 'good'
                                })
                                        ? 'text-green-600'
                                        : 'text-yellow-600'
                                    }`}>
                                    {Object.values(metrics).every((value, index) => {
                                        const metricNames = ['lcp', 'fcp', 'cls', 'inp', 'ttfb']
                                        return getRating(metricNames[index], value || 0) === 'good'
                                    })
                                        ? 'Excellent'
                                        : 'Needs Optimization'
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
