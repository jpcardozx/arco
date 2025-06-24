'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from './analytics'

/**
 * A/B TESTING FRAMEWORK
 * 
 * Sistema para testes A/B entre homepage atual e otimizada
 * Coleta métricas de conversão e performance
 */

export type ABVariant = 'control' | 'optimized'

interface ABTestConfig {
    testName: string
    trafficSplit: number // 0.5 = 50/50 split
    variants: {
        control: string
        optimized: string
    }
}

interface ABTestResult {
    variant: ABVariant
    userId: string
    sessionId: string
    startTime: number
}

class ABTestManager {
    private config: ABTestConfig
    private storageKey: string

    constructor(config: ABTestConfig) {
        this.config = config
        this.storageKey = `ab_test_${config.testName}`
    }

    private generateUserId(): string {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    getVariant(): ABTestResult {
        // Check if user already has a variant assigned
        const existingTest = this.getExistingTest()
        if (existingTest) {
            return existingTest
        }

        // Assign new variant based on traffic split
        const random = Math.random()
        const variant: ABVariant = random < this.config.trafficSplit ? 'control' : 'optimized'

        const result: ABTestResult = {
            variant,
            userId: this.generateUserId(),
            sessionId: this.generateSessionId(),
            startTime: Date.now()
        }

        // Store for consistency
        this.storeTest(result)

        // Track assignment
        this.trackVariantAssignment(result)

        return result
    }

    private getExistingTest(): ABTestResult | null {
        try {
            const stored = localStorage.getItem(this.storageKey)
            if (stored) {
                return JSON.parse(stored)
            }
        } catch (error) {
            console.warn('Error reading A/B test from storage:', error)
        }
        return null
    }

    private storeTest(result: ABTestResult): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(result))
        } catch (error) {
            console.warn('Error storing A/B test:', error)
        }
    }

    private trackVariantAssignment(result: ABTestResult): void {
        trackEvent({
            event: 'ab_test_assignment',
            category: 'experiment',
            action: 'variant_assigned',
            label: `${this.config.testName}_${result.variant}`,
            custom_parameters: {
                test_name: this.config.testName,
                variant: result.variant,
                user_id: result.userId,
                session_id: result.sessionId
            }
        })
    }

    trackConversion(conversionType: string, value?: number): void {
        const test = this.getExistingTest()
        if (!test) return

        trackEvent({
            event: 'ab_test_conversion',
            category: 'experiment',
            action: 'conversion',
            label: `${this.config.testName}_${test.variant}_${conversionType}`,
            value,
            custom_parameters: {
                test_name: this.config.testName,
                variant: test.variant,
                conversion_type: conversionType,
                user_id: test.userId,
                session_id: test.sessionId,
                time_to_conversion: Date.now() - test.startTime
            }
        })
    }

    trackEngagement(engagementType: string, data?: Record<string, any>): void {
        const test = this.getExistingTest()
        if (!test) return

        trackEvent({
            event: 'ab_test_engagement',
            category: 'experiment',
            action: 'engagement',
            label: `${this.config.testName}_${test.variant}_${engagementType}`,
            custom_parameters: {
                test_name: this.config.testName,
                variant: test.variant,
                engagement_type: engagementType,
                user_id: test.userId,
                session_id: test.sessionId,
                time_to_engagement: Date.now() - test.startTime,
                ...data
            }
        })
    }
}

// Default A/B test configuration
const defaultConfig: ABTestConfig = {
    testName: 'homepage_optimization',
    trafficSplit: 0.5, // 50/50 split
    variants: {
        control: 'original_homepage',
        optimized: 'unified_homepage'
    }
}

// Global A/B test manager instance
let abTestManager: ABTestManager | null = null

export function useABTest(config: ABTestConfig = defaultConfig): {
    variant: ABVariant | null
    trackConversion: (type: string, value?: number) => void
    trackEngagement: (type: string, data?: Record<string, any>) => void
    isOptimized: boolean
} {
    const [variant, setVariant] = useState<ABVariant | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize A/B test manager
            abTestManager = new ABTestManager(config)
            const result = abTestManager.getVariant()
            setVariant(result.variant)
        }
    }, [config])

    const trackConversion = (type: string, value?: number) => {
        abTestManager?.trackConversion(type, value)
    }

    const trackEngagement = (type: string, data?: Record<string, any>) => {
        abTestManager?.trackEngagement(type, data)
    }

    return {
        variant,
        trackConversion,
        trackEngagement,
        isOptimized: variant === 'optimized'
    }
}

// Helper component for A/B test conditional rendering
export function ABTestVariant({
    variant,
    children
}: {
    variant: ABVariant
    children: React.ReactNode
}) {
    const { variant: currentVariant } = useABTest()

    if (currentVariant === variant) {
        return <>{children}</>
    }

    return null
}

// Performance comparison component
export function ABTestPerformanceTracker() {
    const { variant, trackEngagement } = useABTest()

    useEffect(() => {
        if (!variant) return

        // Track Core Web Vitals for A/B test
        const trackWebVitalsForAB = async () => {
            try {
                const { onLCP, onCLS, onINP } = await import('web-vitals')

                onLCP(metric => {
                    trackEngagement('lcp_measured', {
                        lcp_value: metric.value,
                        lcp_rating: metric.value <= 2500 ? 'good' : metric.value <= 4000 ? 'needs-improvement' : 'poor'
                    })
                })

                onCLS(metric => {
                    trackEngagement('cls_measured', {
                        cls_value: metric.value,
                        cls_rating: metric.value <= 0.1 ? 'good' : metric.value <= 0.25 ? 'needs-improvement' : 'poor'
                    })
                })

                onINP(metric => {
                    trackEngagement('inp_measured', {
                        inp_value: metric.value,
                        inp_rating: metric.value <= 200 ? 'good' : metric.value <= 500 ? 'needs-improvement' : 'poor'
                    })
                })
            } catch (error) {
                console.warn('Web Vitals not available for A/B test:', error)
            }
        }

        trackWebVitalsForAB()

        // Track scroll behavior
        let maxScroll = 0
        const handleScroll = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent

                // Track milestone scrolls
                if (scrollPercent >= 25 && scrollPercent < 50) {
                    trackEngagement('scroll_25')
                } else if (scrollPercent >= 50 && scrollPercent < 75) {
                    trackEngagement('scroll_50')
                } else if (scrollPercent >= 75 && scrollPercent < 90) {
                    trackEngagement('scroll_75')
                } else if (scrollPercent >= 90) {
                    trackEngagement('scroll_90')
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [variant, trackEngagement])

    return null // This is a tracking component, no UI
}

export default ABTestManager
