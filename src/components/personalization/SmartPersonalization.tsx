'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Smartphone,
    Monitor,
    Clock,
    TrendingUp,
    Users,
    Code,
    ShoppingCart,
    Building
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

interface UserContext {
    deviceType: 'mobile' | 'desktop' | 'tablet'
    referrer: 'google' | 'linkedin' | 'direct' | 'social' | 'other'
    timeSpent: number
    scrollBehavior: 'quick-scan' | 'detailed-read' | 'focused'
    engagementLevel: 'low' | 'medium' | 'high'
}

interface PersonalizationVariant {
    id: string
    trigger: (context: UserContext) => boolean
    content: {
        headline: string
        description: string
        cta: string
        focusArea: string
        icon: React.ComponentType<{ className?: string }>
    }
}

/**
 * Smart Content Personalization
 * Adapts content based on user behavior and context
 */
export function SmartPersonalization() {
    const [userContext, setUserContext] = useState<UserContext>({
        deviceType: 'desktop',
        referrer: 'direct',
        timeSpent: 0,
        scrollBehavior: 'quick-scan',
        engagementLevel: 'low'
    })

    const [activeVariant, setActiveVariant] = useState<PersonalizationVariant | null>(null)
    const [hasPersonalized, setHasPersonalized] = useState(false)

    const personalizationVariants: PersonalizationVariant[] = [
        {
            id: 'mobile-quick',
            trigger: (context) => context.deviceType === 'mobile' && context.scrollBehavior === 'quick-scan',
            content: {
                headline: 'Mobile-First Performance',
                description: 'Optimize your mobile experience for higher conversions. Quick wins, measurable results.',
                cta: 'Get Mobile Audit',
                focusArea: 'Mobile Optimization',
                icon: Smartphone
            }
        },
        {
            id: 'linkedin-professional',
            trigger: (context) => context.referrer === 'linkedin' && context.engagementLevel === 'high',
            content: {
                headline: 'Enterprise Performance Solutions',
                description: 'Technical leadership demands proven results. We deliver enterprise-grade optimizations.',
                cta: 'Schedule Technical Discussion',
                focusArea: 'Enterprise Solutions',
                icon: Building
            }
        },
        {
            id: 'google-searcher',
            trigger: (context) => context.referrer === 'google' && context.timeSpent > 30,
            content: {
                headline: 'Web Performance Optimization',
                description: 'Found us searching for performance solutions? See how we solve real technical challenges.',
                cta: 'View Case Studies',
                focusArea: 'Performance Optimization',
                icon: TrendingUp
            }
        },
        {
            id: 'technical-deep-dive',
            trigger: (context) => context.scrollBehavior === 'detailed-read' && context.timeSpent > 120,
            content: {
                headline: 'Technical Deep Dive',
                description: 'You appreciate technical detail. Access our advanced optimization methodologies and tools.',
                cta: 'Access Technical Resources',
                focusArea: 'Technical Documentation',
                icon: Code
            }
        },
        {
            id: 'quick-decision',
            trigger: (context) => context.scrollBehavior === 'quick-scan' && context.engagementLevel === 'medium',
            content: {
                headline: 'Quick Performance Wins',
                description: 'Need fast results? Our rapid optimization package delivers immediate improvements.',
                cta: 'See Quick Wins Package',
                focusArea: 'Rapid Optimization',
                icon: Clock
            }
        },
        {
            id: 'ecommerce-focus',
            trigger: (context) => context.referrer === 'google' && context.deviceType === 'desktop',
            content: {
                headline: 'E-commerce Performance',
                description: 'Boost your online store conversion rates with performance optimization proven to increase revenue.',
                cta: 'Calculate Revenue Impact',
                focusArea: 'E-commerce Optimization',
                icon: ShoppingCart
            }
        }
    ]

    useEffect(() => {
        // Detect device type
        const detectDeviceType = (): UserContext['deviceType'] => {
            const width = window.innerWidth
            if (width < 768) return 'mobile'
            if (width < 1024) return 'tablet'
            return 'desktop'
        }

        // Detect referrer
        const detectReferrer = (): UserContext['referrer'] => {
            const referrer = document.referrer.toLowerCase()
            if (referrer.includes('google')) return 'google'
            if (referrer.includes('linkedin')) return 'linkedin'
            if (referrer.includes('facebook') || referrer.includes('twitter') || referrer.includes('instagram')) return 'social'
            if (referrer === '') return 'direct'
            return 'other'
        }

        setUserContext(prev => ({
            ...prev,
            deviceType: detectDeviceType(),
            referrer: detectReferrer()
        }))

        // Track initial context
        trackEvent({
            event: 'user_context_detected',
            category: 'personalization',
            action: 'context_detection',
            label: `${detectDeviceType()}_${detectReferrer()}`,
            value: 1
        })
    }, [])

    useEffect(() => {
        // Update time spent
        const interval = setInterval(() => {
            setUserContext(prev => ({
                ...prev,
                timeSpent: prev.timeSpent + 1
            }))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Track scroll behavior
        let scrollStartTime = Date.now()
        let scrollDepth = 0
        let scrollInteractions = 0

        const handleScroll = () => {
            scrollInteractions++
            const currentScrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            if (currentScrollDepth > scrollDepth) {
                scrollDepth = currentScrollDepth
            }

            // Determine scroll behavior after some interaction
            if (scrollInteractions > 10) {
                const timeSpentScrolling = Date.now() - scrollStartTime
                const scrollSpeed = scrollDepth / (timeSpentScrolling / 1000) // depth per second

                let behavior: UserContext['scrollBehavior'] = 'quick-scan'
                if (scrollSpeed < 10 && scrollDepth > 50) behavior = 'detailed-read'
                else if (scrollSpeed < 20 && scrollDepth > 75) behavior = 'focused'

                setUserContext(prev => ({
                    ...prev,
                    scrollBehavior: behavior,
                    engagementLevel: scrollDepth > 75 ? 'high' : scrollDepth > 25 ? 'medium' : 'low'
                }))
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Find matching personalization variant
        if (!hasPersonalized && userContext.timeSpent > 10) {
            const matchingVariant = personalizationVariants.find(variant =>
                variant.trigger(userContext)
            )

            if (matchingVariant) {
                setActiveVariant(matchingVariant)
                setHasPersonalized(true)

                trackEvent({
                    event: 'content_personalized',
                    category: 'personalization',
                    action: 'variant_activated',
                    label: matchingVariant.id,
                    value: 1
                })

                trackFunnelStep('content_personalized', 'engagement_funnel', {
                    variant_id: matchingVariant.id,
                    user_context: userContext,
                    timestamp: Date.now()
                })
            }
        }
    }, [userContext, hasPersonalized])

    const handlePersonalizedCTA = () => {
        if (activeVariant) {
            trackEvent({
                event: 'personalized_cta_click',
                category: 'conversion',
                action: 'cta_click',
                label: activeVariant.id,
                value: 1
            })

            trackFunnelStep('personalized_cta_click', 'conversion_funnel', {
                variant_id: activeVariant.id,
                user_context: userContext,
                timestamp: Date.now()
            })

            // Route to appropriate action based on variant
            switch (activeVariant.id) {
                case 'mobile-quick':
                    window.location.href = '#assessment'
                    break
                case 'linkedin-professional':
                    window.location.href = '#contact'
                    break
                case 'technical-deep-dive':
                    window.location.href = '#resources'
                    break
                case 'ecommerce-focus':
                    window.location.href = '#roi-calculator'
                    break
                default:
                    window.location.href = '#contact'
            }
        }
    }

    const getContextBadge = () => {
        const badges = []

        if (userContext.deviceType === 'mobile') badges.push('Mobile User')
        if (userContext.referrer === 'linkedin') badges.push('LinkedIn Professional')
        if (userContext.referrer === 'google') badges.push('Active Searcher')
        if (userContext.engagementLevel === 'high') badges.push('Highly Engaged')
        if (userContext.scrollBehavior === 'detailed-read') badges.push('Detail-Oriented')

        return badges[0] || 'Website Visitor'
    }

    return (
        <AnimatePresence>
            {activeVariant && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed bottom-6 right-6 max-w-sm z-50"
                >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                        {/* Personalization Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-blue-600">
                                {getContextBadge()}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <activeVariant.content.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">
                                    {activeVariant.content.headline}
                                </h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    {activeVariant.content.description}
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handlePersonalizedCTA}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                            {activeVariant.content.cta}
                        </button>

                        {/* Dismiss */}
                        <button
                            onClick={() => setActiveVariant(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>

                        {/* Focus Area Tag */}
                        <div className="mt-3 text-center">
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {activeVariant.content.focusArea}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Context Display Component (for debugging/analytics)
export function PersonalizationContext() {
    const [context, setContext] = useState<UserContext | null>(null)

    useEffect(() => {
        // This would be connected to the same context state in production
        // For now, it's a separate component for demonstration
    }, [])

    if (process.env.NODE_ENV !== 'development') return null

    return (
        <div className="fixed top-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg max-w-xs z-50">
            <div className="font-bold mb-2">Personalization Context</div>
            <div>Device: Mobile/Desktop detected</div>
            <div>Referrer: {document.referrer || 'Direct'}</div>
            <div>Behavior: Tracking...</div>
            <div>Engagement: Measuring...</div>
        </div>
    )
}
