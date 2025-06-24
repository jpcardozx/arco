'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'
import {
    ArrowRight,
    CheckCircle,
    Star,
    TrendingUp,
    Clock,
    Shield
} from 'lucide-react'
import { GitHubWidget } from '../widgets/GitHubWidget'
import { PerformanceDashboard } from '../widgets/PerformanceDashboard'

/**
 * Simplified Hero Section - Conversion Optimized
 * 
 * Focus on single primary CTA and clear value proposition
 * Reduced cognitive load while maintaining professional appeal
 */

interface StatItem {
    value: string
    label: string
    description: string
}

export function SimplifiedHeroSection() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleCTAClick = () => {
        // Track main CTA click
        trackEvent({
            event: 'cta_click',
            category: 'conversion',
            action: 'hero_cta_click',
            label: 'main_cta',
            value: 1
        })

        // Track funnel progression
        trackFunnelStep('hero_cta_click', 'conversion_funnel', {
            cta_type: 'primary',
            section: 'hero',
            timestamp: Date.now()
        })

        // Add scroll to contact or open contact modal here
        const contactSection = document.querySelector('[data-section="contact"]')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }    // Real metrics with specific context - enterprise credibility
    const criticalStats: StatItem[] = [
        {
            value: "1.8s",
            label: "LCP Improvement",
            description: "Shopify Plus project: 4.2s → 1.8s median LCP"
        },
        {
            value: "$340k",
            label: "Monthly Revenue Gain",
            description: "E-commerce client: +127% conversion rate"
        },
        {
            value: "78%",
            label: "Infrastructure Cost Cut",
            description: "SaaS migration: AWS $12k → $2.6k monthly"
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
        <section className="section-hero relative overflow-hidden min-h-screen flex items-center" data-section="hero">
            {/* Technical background with subtle code pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ctext x='5' y='15' font-family='monospace' font-size='8'%3E{'{',%7D%3C/text%3E%3Ctext x='5' y='35' font-family='monospace' font-size='8'%3Ereact%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
            }} />

            <div className="container-custom relative z-10">
                <motion.div
                    className="text-center max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Trust Badge - Simplified */}
                    <motion.div
                        className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-8 shadow-soft"
                        variants={itemVariants}
                    >
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-neutral-700">
                            Especialistas React • Next.js • TypeScript
                        </span>
                    </motion.div>                    {/* Professional headline - technical credibility */}
                    <motion.h1
                        className="heading-xl text-neutral-900 mb-6"
                        variants={itemVariants}
                    >
                        React Performance{' '}
                        <span className="text-gradient">Engineering</span>
                    </motion.h1>

                    {/* Clear technical value proposition */}
                    <motion.p
                        className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-4xl mx-auto font-light leading-relaxed"
                        variants={itemVariants}
                    >
                        Strategic Core Web Vitals optimization and infrastructure modernization for scale.{' '}
                        <strong className="text-neutral-800">Measurable ROI with enterprise-grade technical implementation.</strong>
                    </motion.p>{/* Single primary CTA - no confusion */}
                    <motion.div
                        className="mb-12"
                        variants={itemVariants}
                    >                        <button
                        className="btn btn-primary btn-lg group mb-4"
                        onClick={handleCTAClick}
                    >
                            <TrendingUp className="w-5 h-5" />
                            Get Technical Architecture Audit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Professional value proposition */}
                        <p className="text-sm text-neutral-600">
                            Complete performance analysis • Implementation roadmap • ROI projection
                        </p>
                    </motion.div>

                    {/* Simplified trust indicators */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-8 mb-16"
                        variants={itemVariants}
                    >                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <CheckCircle className="w-4 h-4 text-accent-500" />
                            <span>Enterprise implementation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Shield className="w-4 h-4 text-primary-500" />
                            <span>Performance guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Clock className="w-4 h-4 text-accent-500" />
                            <span>4-6 week delivery</span>
                        </div>
                    </motion.div>
                </motion.div>                {/* Technical metrics with sophisticated design */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {criticalStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            {/* Subtle technical accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl" />

                            <div className="text-center">
                                <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2 font-mono">
                                    {stat.value}
                                </div>
                                <div className="text-lg font-semibold text-slate-700 mb-3">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-slate-600 leading-relaxed">
                                    {stat.description}
                                </div>
                            </div>

                            {/* Technical indicator */}
                            <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-60" />
                        </motion.div>
                    ))}
                </motion.div>                {/* Professional trust indicators */}
                <motion.div
                    className="text-center mt-20"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Enterprise-grade security</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Guaranteed performance gains</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">4-6 week delivery</span>
                        </div>
                    </div>
                </motion.div>

                {/* Technical Credibility Widgets */}
                <motion.div
                    className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <GitHubWidget />
                    <PerformanceDashboard />
                </motion.div>
            </div>
        </section>
    )
}
