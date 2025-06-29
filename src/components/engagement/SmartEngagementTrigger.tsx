'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, Clock, Target } from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

interface EngagementTriggerProps {
    onClose?: () => void
}

/**
 * Smart Engagement Component - Aparece baseado em comportamento
 * 
 * Triggers:
 * - Exit intent (mouse leave)
 * - Long engagement (2+ minutes)
 * - High scroll depth (75%+) without interaction
 */
export function SmartEngagementTrigger({ onClose }: EngagementTriggerProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [triggerReason, setTriggerReason] = useState<'exit_intent' | 'long_engagement' | 'high_scroll' | null>(null)

    useEffect(() => {
        let startTime = Date.now()
        let maxScroll = 0
        let hasInteracted = false

        // Exit intent detection
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 50 && !isVisible) {
                setTriggerReason('exit_intent')
                setIsVisible(true)
                trackEvent('engagement_trigger', 'retention', 'exit_intent_trigger', 'homepage')
            }
        }

        // Scroll tracking
        const handleScroll = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent

                // High scroll without interaction
                if (scrollPercent >= 75 && !hasInteracted && !isVisible) {
                    setTriggerReason('high_scroll')
                    setIsVisible(true)
                    trackEvent('engagement_trigger', 'retention', 'high_scroll_trigger', 'smart_engagement')
                }
            }
        }

        // Interaction tracking
        const handleInteraction = () => {
            hasInteracted = true
        }

        // Long engagement trigger
        const longEngagementTimer = setTimeout(() => {
            if (!isVisible && hasInteracted) {
                setTriggerReason('long_engagement')
                setIsVisible(true)
                trackEvent('engagement_trigger', 'retention', 'long_engagement_trigger', 'smart_engagement')
            }
        }, 120000) // 2 minutes

        document.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('scroll', handleScroll, { passive: true })
        document.addEventListener('click', handleInteraction)

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('click', handleInteraction)
            clearTimeout(longEngagementTimer)
        }
    }, [isVisible])

    const handleClose = () => {
        setIsVisible(false)
        trackEvent('engagement_trigger_close', 'retention', 'trigger_dismissed', triggerReason || 'unknown')
        onClose?.()
    }

    const handleCTAClick = (action: string) => {
        trackEvent('engagement_trigger_cta', 'conversion', action, triggerReason || 'unknown')

        trackFunnelStep('engagement_trigger_conversion', 'retention_funnel', {
            trigger_reason: triggerReason,
            action: action
        })
    }

    const getContent = () => {
        switch (triggerReason) {
            case 'exit_intent':
                return {
                    title: "Technical Architecture Review",
                    subtitle: "Get detailed performance analysis before you go",
                    cta: "Download Technical Audit Framework",
                    description: "47-page comprehensive React optimization guide"
                }
            case 'long_engagement':
                return {
                    title: "Ready for Technical Discussion?",
                    subtitle: "Discuss your architecture challenges with our CTO",
                    cta: "Schedule Technical Consultation",
                    description: "45-minute deep-dive into your current stack"
                }
            case 'high_scroll':
                return {
                    title: "Interested in Implementation?",
                    subtitle: "See detailed case study with similar architecture",
                    cta: "View E-commerce React Optimization",
                    description: "Complete before/after analysis with ROI data"
                }
            default:
                return {
                    title: "Technical Assessment Available",
                    subtitle: "Get specific recommendations for your stack",
                    cta: "Request Architecture Analysis",
                    description: "Customized performance optimization roadmap"
                }
        }
    }

    const content = getContent()

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={handleClose}
                    />

                    {/* Modal */}                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-8 right-8 z-50 w-full max-w-sm"
                    >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden">
                            {/* Sophisticated header */}
                            <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5">
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="flex items-start gap-3 mb-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        {triggerReason === 'exit_intent' && <Clock className="w-5 h-5" />}
                                        {triggerReason === 'long_engagement' && <Target className="w-5 h-5" />}
                                        {triggerReason === 'high_scroll' && <TrendingUp className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold leading-tight">{content.title}</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed mt-1">{content.subtitle}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Professional content */}
                            <div className="p-5">
                                <p className="text-slate-600 text-sm mb-5 leading-relaxed">{content.description}</p>                                <div className="space-y-3">
                                    <button
                                        onClick={() => handleCTAClick('primary_cta')}
                                        className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {content.cta}
                                        <TrendingUp className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => handleCTAClick('secondary_cta')}
                                        className="w-full text-slate-600 px-4 py-2 text-sm font-medium hover:text-slate-800 transition-colors"
                                    >
                                        View Technical Case Studies →
                                    </button>
                                </div>

                                {/* Professional trust indicators */}
                                <div className="mt-5 pt-4 border-t border-slate-200">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>✓ Enterprise-grade</span>
                                        <span>✓ 24h response</span>
                                        <span>✓ No commitment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
