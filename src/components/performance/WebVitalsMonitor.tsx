'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * WEB VITALS MONITOR
 * 
 * Componente para monitorar métricas de performance
 * Integração com analytics para tracking de melhorias
 */

interface VitalMetric {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    delta: number
}

interface WebVitalsDisplayProps {
    className?: string
}

const getVitalRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = {
        CLS: { good: 0.1, poor: 0.25 },
        FCP: { good: 1800, poor: 3000 },
        INP: { good: 200, poor: 500 }, // Interaction to Next Paint thresholds
        LCP: { good: 2500, poor: 4000 },
        TTFB: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[name as keyof typeof thresholds]
    if (!threshold) return 'good'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
}

const formatValue = (name: string, value: number): string => {
    if (name === 'CLS') {
        return value.toFixed(3)
    }
    return Math.round(value).toString() + 'ms'
}

const VitalCard = ({ metric }: { metric: VitalMetric }) => {
    const cardRef = useRef<HTMLDivElement>(null)

    const colorClasses = {
        good: 'border-emerald-500 bg-emerald-50 text-emerald-700',
        'needs-improvement': 'border-yellow-500 bg-yellow-50 text-yellow-700',
        poor: 'border-red-500 bg-red-50 text-red-700'
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border-2 ${colorClasses[metric.rating]} text-center min-w-[120px]`}
        >
            <div className="text-xs font-medium uppercase tracking-wide mb-1">
                {metric.name}
            </div>
            <div className="text-lg font-bold">
                {formatValue(metric.name, metric.value)}
            </div>
            <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${metric.rating === 'good' ? 'bg-emerald-100' :
                    metric.rating === 'needs-improvement' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                {metric.rating.replace('-', ' ')}
            </div>
        </motion.div>
    )
}

export function WebVitalsMonitor({ className = "" }: WebVitalsDisplayProps) {
    const vitalsRef = useRef<Record<string, VitalMetric>>({})
    const [vitals, setVitals] = useState<VitalMetric[]>([])

    useEffect(() => {
        // Dynamic import for web-vitals to avoid SSR issues
        const loadWebVitals = async () => {
            try {
                const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

                const vitalsToCollect = [
                    { fn: onCLS, name: 'CLS' },
                    { fn: onFCP, name: 'FCP' },
                    { fn: onINP, name: 'INP' }, // Interaction to Next Paint (replaces FID)
                    { fn: onLCP, name: 'LCP' },
                    { fn: onTTFB, name: 'TTFB' }
                ]

                vitalsToCollect.forEach(({ fn, name }) => {
                    fn((metric: any) => {
                        const vitalMetric: VitalMetric = {
                            name,
                            value: metric.value,
                            rating: getVitalRating(name, metric.value),
                            delta: metric.delta
                        }

                        vitalsRef.current[name] = vitalMetric
                        setVitals(Object.values(vitalsRef.current))

                        // Send to analytics
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                            ; (window as any).gtag('event', 'web_vital', {
                                metric_name: name,
                                metric_value: Math.round(metric.value),
                                metric_rating: vitalMetric.rating,
                                metric_delta: Math.round(metric.delta)
                            })
                        }
                    })
                })
            } catch (error) {
                console.warn('Web Vitals not available:', error)
            }
        }

        loadWebVitals()
    }, [])

    if (vitals.length === 0) return null

    // Only show in development or if explicitly enabled
    const shouldShow = process.env.NODE_ENV === 'development' ||
        typeof window !== 'undefined' &&
        window.location.search.includes('show-vitals')

    if (!shouldShow) return null

    const averageRating = vitals.reduce((acc: number, vital: VitalMetric) => {
        const score = vital.rating === 'good' ? 3 : vital.rating === 'needs-improvement' ? 2 : 1
        return acc + score
    }, 0) / vitals.length

    const overallRating = averageRating >= 2.5 ? 'good' : averageRating >= 1.5 ? 'needs-improvement' : 'poor'

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className={`fixed bottom-4 right-4 z-50 ${className}`}
        >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${overallRating === 'good' ? 'bg-emerald-500' :
                            overallRating === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                    <span className="text-sm font-medium text-slate-700">Web Vitals</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {vitals.map((vital: VitalMetric) => (
                        <VitalCard key={vital.name} metric={vital} />
                    ))}
                </div>

                <div className="mt-3 text-xs text-slate-500 text-center">
                    Performance monitoring active
                </div>
            </div>
        </motion.div>
    )
}

// Export for optional global integration
export function initWebVitalsTracking() {
    if (typeof window === 'undefined') return

    // Enhanced vitals tracking with business metrics correlation
    const loadAndTrack = async () => {
        try {
            const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

            const vitalsToCollected = [
                { fn: onCLS, name: 'CLS', businessImpact: 'conversion_rate' },
                { fn: onFCP, name: 'FCP', businessImpact: 'bounce_rate' },
                { fn: onINP, name: 'INP', businessImpact: 'user_engagement' }, // Interaction to Next Paint
                { fn: onLCP, name: 'LCP', businessImpact: 'revenue_correlation' },
                { fn: onTTFB, name: 'TTFB', businessImpact: 'server_performance' }
            ]

            vitalsToCollected.forEach(({ fn, name, businessImpact }) => {
                fn((metric: any) => {
                    // Send to analytics with business context
                    if ((window as any).gtag) {
                        ; (window as any).gtag('event', 'web_vital_business', {
                            metric_name: name,
                            metric_value: Math.round(metric.value),
                            business_impact: businessImpact,
                            page_type: 'homepage_optimized',
                            timestamp: Date.now()
                        })
                    }

                    // Console logging for development
                    if (process.env.NODE_ENV === 'development') {
                        console.log(`🚀 ${name}: ${metric.value}ms (${getVitalRating(name, metric.value)})`)
                    }
                })
            })
        } catch (error) {
            console.warn('Web Vitals tracking not available:', error)
        }
    }

    loadAndTrack()
}
