'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Performance Monitor Component - Enterprise Analytics
 * 
 * Real-time Core Web Vitals monitoring for enterprise compliance.
 * Tracks critical metrics: LCP, CLS, INP, TTFB
 * Target: Lighthouse Score 95+ for enterprise credibility
 */

interface WebVitalsMetric {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    target: number
    unit: string
}

interface PerformanceData {
    lcp: WebVitalsMetric
    cls: WebVitalsMetric
    inp: WebVitalsMetric
    ttfb: WebVitalsMetric
    lighthouseScore: number
    lastUpdated: Date
}

export function PerformanceMonitor() {
    const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Initialize performance monitoring
        if (typeof window !== 'undefined') {
            initializeWebVitals()
            setIsVisible(true)
        }
    }, [])

    const initializeWebVitals = () => {
        // Mock data for development - replace with actual Web Vitals API
        const mockData: PerformanceData = {
            lcp: {
                name: 'Largest Contentful Paint',
                value: 1.1,
                rating: 'good',
                target: 1.2,
                unit: 's'
            },
            cls: {
                name: 'Cumulative Layout Shift',
                value: 0.08,
                rating: 'good',
                target: 0.1,
                unit: ''
            },
            inp: {
                name: 'Interaction to Next Paint',
                value: 180,
                rating: 'good',
                target: 200,
                unit: 'ms'
            },
            ttfb: {
                name: 'Time to First Byte',
                value: 320,
                rating: 'good',
                target: 600,
                unit: 'ms'
            },
            lighthouseScore: 96,
            lastUpdated: new Date()
        }

        setPerformanceData(mockData)

        // Real Web Vitals integration would go here
        // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        //   getCLS(onCLS)
        //   getFID(onFID)
        //   getFCP(onFCP)
        //   getLCP(onLCP)
        //   getTTFB(onTTFB)
        // })
    }

    const getRatingColor = (rating: string) => {
        switch (rating) {
            case 'good':
                return 'text-emerald-600 bg-emerald-50 border-emerald-200'
            case 'needs-improvement':
                return 'text-amber-600 bg-amber-50 border-amber-200'
            case 'poor':
                return 'text-red-600 bg-red-50 border-red-200'
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getLighthouseColor = (score: number) => {
        if (score >= 90) return 'text-emerald-600'
        if (score >= 70) return 'text-amber-600'
        return 'text-red-600'
    }

    if (!isVisible || !performanceData) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Performance Monitor
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Lighthouse</span>
                        <span className={`text-sm font-bold ${getLighthouseColor(performanceData.lighthouseScore)}`}>
                            {performanceData.lighthouseScore}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    {Object.entries(performanceData)
                        .filter(([key]) => ['lcp', 'cls', 'inp', 'ttfb'].includes(key))
                        .map(([key, metric]) => (
                            <div
                                key={key}
                                className={`px-2 py-1 rounded border text-xs ${getRatingColor(metric.rating)}`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{metric.name}</span>
                                    <span>
                                        {metric.value}{metric.unit} / {metric.target}{metric.unit}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                    Updated: {performanceData.lastUpdated.toLocaleTimeString()}
                </div>
            </div>
        </motion.div>
    )
}

// Development only - remove in production
export function PerformanceMonitorDev() {
    if (process.env.NODE_ENV === 'production') {
        return null
    }

    return <PerformanceMonitor />
}
