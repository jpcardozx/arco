'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendingUp, Clock, Shield, Terminal } from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'
import { useContent } from '../../lib/content'

/**
 * CONSOLIDATED HERO SECTION - TECHNICAL AUTHORITY
 * 
 * OBJECTIVES:
 * - Single source of truth for messaging
 * - Technical credibility without sensationalism  
 * - Specific value proposition for CTOs/engineering leaders
 * - Measurable metrics with real context
 * - Professional CTA flow
 */

interface TechnicalMetric {
    value: string
    label: string
    desc: string
}

export function ConsolidatedHeroSection() {
    const [isVisible, setIsVisible] = useState(false)
    const content = useContent()

    useEffect(() => {
        setIsVisible(true)
        
        // Clean analytics tracking
        trackFunnelStep('hero_view', 'conversion_funnel', {
            section: 'consolidated_hero',
            messaging_version: 'technical_authority',
            timestamp: Date.now()
        })
    }, [])

    const handlePrimaryCTA = () => {
        trackEvent('cta_click', 'conversion', 'primary_cta', 'technical_architecture_audit', 1)

        // Scroll to immediate value or open contact modal
        const contactSection = document.querySelector('[data-section="contact"]')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleSecondaryCTA = () => {
        trackEvent('cta_click', 'engagement', 'secondary_cta', 'case_studies', 1)

        const casesSection = document.querySelector('[data-section="cases"]')
        if (casesSection) {
            casesSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const technicalMetrics: TechnicalMetric[] = [
        {
            value: content.hero.metrics.performance.value,
            label: content.hero.metrics.performance.label,
            desc: content.hero.metrics.performance.desc
        },
        {
            value: content.hero.metrics.revenue.value,
            label: content.hero.metrics.revenue.label,
            desc: content.hero.metrics.revenue.desc
        },
        {
            value: content.hero.metrics.infrastructure.value,
            label: content.hero.metrics.infrastructure.label,
            desc: content.hero.metrics.infrastructure.desc
        },
        {
            value: content.hero.metrics.deployment.value,
            label: content.hero.metrics.deployment.label,
            desc: content.hero.metrics.deployment.desc
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section 
            className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden" 
            data-section="hero"
        >
            {/* Clean background - no overwhelming effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/8 to-emerald-600/8 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/6 to-blue-600/6 rounded-full blur-3xl" />
                
                {/* Subtle grid pattern for technical feel */}
                <div 
                    className="absolute inset-0 opacity-[0.02]" 
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ctext x='5' y='15' font-family='monospace' font-size='8'%3E{%7D%3C/text%3E%3Ctext x='5' y='35' font-family='monospace' font-size='8'%3Ereact%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }} 
                />
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {/* Professional authority badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm"
                        variants={itemVariants}
                    >
                        <Terminal className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700">
                            {content.hero.badge}
                        </span>
                    </motion.div>

                    {/* Technical headline - clear and specific */}
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                        variants={itemVariants}
                    >
                        {content.hero.headline}
                    </motion.h1>

                    {/* Professional value proposition */}
                    <motion.p
                        className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        {content.hero.subheadline}
                    </motion.p>

                    {/* Professional guarantees */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-6 mb-12"
                        variants={itemVariants}
                    >
                        {content.hero.guarantees.map((guarantee, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                <span>{guarantee}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Professional CTAs - specific value */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                        variants={itemVariants}
                    >
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePrimaryCTA}
                            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <TrendingUp className="w-5 h-5 mr-2" />
                            {content.hero.cta.primary}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSecondaryCTA}
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 text-lg font-medium rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                        >
                            {content.hero.cta.secondary}
                        </motion.button>
                    </motion.div>

                    {/* Technical credibility section */}
                    <motion.div
                        className="border-t border-slate-200 pt-12"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-center gap-8 mb-8">
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <Shield className="w-4 h-4 text-blue-600" />
                                <span>Enterprise-grade implementation</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Performance guaranteed</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>4-6 week delivery</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Technical metrics with real context */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {technicalMetrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            {/* Technical accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-t-2xl" />

                            <div className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 font-mono">
                                    {metric.value}
                                </div>
                                <div className="text-lg font-semibold text-slate-700 mb-3">
                                    {metric.label}
                                </div>
                                <div className="text-sm text-slate-600 leading-relaxed">
                                    {metric.desc}
                                </div>
                            </div>

                            {/* Technical indicator */}
                            <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-60" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
