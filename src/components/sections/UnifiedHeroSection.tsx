'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Zap, CheckCircle, Play, Star } from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

/**
 * UNIFIED HERO SECTION - Consolidação estratégica
 * 
 * OBJETIVOS:
 * - Single source of truth para hero
 * - Performance optimized (LCP < 1.8s)
 * - Conversion focused messaging
 * - Simplified interaction tracking
 */

interface MetricCardProps {
    value: string
    label: string
    sublabel: string
}

const MetricCard = ({ value, label, sublabel }: MetricCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
        <div className="text-lg font-semibold text-slate-700 mb-1">{label}</div>
        <div className="text-sm text-slate-500">{sublabel}</div>
    </motion.div>
)

export function UnifiedHeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    // Simplified analytics - only essential tracking
    useEffect(() => {
        if (isInView) {
            trackFunnelStep('hero_view', 'conversion_funnel', {
                section: 'unified_hero',
                timestamp: Date.now()
            })
        }
    }, [isInView])

    const handleCTAClick = (ctaType: 'primary' | 'secondary') => {
        trackEvent({
            event: 'cta_click',
            category: 'conversion',
            action: 'click',
            label: `hero_${ctaType}`,
            custom_parameters: {
                type: ctaType,
                location: 'hero',
                text: ctaType === 'primary' ? 'Get Free Technical Audit' : 'View Success Stories'
            }
        })
    }

    const metrics = [
        { value: '312%', label: 'Average ROI', sublabel: '12-month period' },
        { value: '47 days', label: 'Time to Results', sublabel: 'Proven methodology' },
        { value: '$127K+', label: 'Revenue Impact', sublabel: 'Per optimization' }
    ]

    const trustSignals = [
        'Zero-risk audit',
        'Results guaranteed',
        'Used by 47+ companies',
        'Technical excellence'
    ]

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
            data-section="hero"
        >
            {/* Optimized Background - Single gradient overlay */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/8 to-emerald-600/8 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/6 to-blue-600/6 rounded-full blur-3xl" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto px-6 lg:px-8 relative z-10"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column - Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            {/* Authority Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-8"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Proven System • Enterprise Grade • Results Guaranteed
                            </motion.div>

                            {/* Problem-Focused Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                            >
                                Stop losing{' '}
                                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                    $50K/month
                                </span>
                                <br />
                                to slow websites
                            </motion.h1>

                            {/* Solution-Focused Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed"
                            >
                                Get <strong className="text-emerald-600">3.2x ROI in 47 days</strong> with our proven React optimization system.
                                No consultants. No theory. Just measurable results.
                            </motion.p>

                            {/* Trust Signals */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="grid grid-cols-2 gap-3 mb-8"
                            >
                                {trustSignals.map((signal, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <span>{signal}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* CTA Buttons - Conversion Focused */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 mb-8"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCTAClick('primary')}
                                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Zap className="w-5 h-5 mr-2" />
                                    Get Free $2K Technical Audit
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCTAClick('secondary')}
                                    className="group inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 text-lg font-medium rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    View Success Stories
                                </motion.button>
                            </motion.div>

                            {/* Social Proof */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="flex items-center gap-2 text-sm text-slate-500"
                            >
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <span>Trusted by 500+ growth companies</span>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Metrics & Social Proof */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Core Metrics */}
                            <div className="grid gap-6">
                                {metrics.map((metric, index) => (
                                    <MetricCard key={index} {...metric} />
                                ))}
                            </div>

                            {/* Client Logos Placeholder */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 1.0 }}
                                className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30"
                            >
                                <p className="text-sm text-slate-500 mb-4 text-center">Trusted by industry leaders</p>
                                <div className="grid grid-cols-3 gap-4 items-center opacity-60">
                                    {/* Placeholder for client logos */}
                                    <div className="h-8 bg-slate-200 rounded"></div>
                                    <div className="h-8 bg-slate-200 rounded"></div>
                                    <div className="h-8 bg-slate-200 rounded"></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center"
                >
                    <div className="w-1 h-3 bg-slate-400 rounded-full mt-2" />
                </motion.div>
            </motion.div>
        </section>
    )
}
