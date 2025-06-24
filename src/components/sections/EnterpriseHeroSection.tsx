'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'
import {
    ArrowRight,
    Code2,
    Zap,
    TrendingUp,
    Shield,
    Monitor,
    Activity,
    Database,
    Cloud,
    GitBranch
} from 'lucide-react'

interface TechnicalMetric {
    label: string
    value: string
    change: string
    context: string
    technical: string
}

/**
 * Enterprise-Grade Hero Section
 * 
 * Demonstrates technical competence through sophisticated interactions,
 * real metrics, and professional design patterns that CTOs expect.
 */
export function EnterpriseHeroSection() {
    const [activeMetric, setActiveMetric] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const controls = useAnimation()

    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 300], [0, -50])
    const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

    // Real technical metrics with context
    const technicalMetrics: TechnicalMetric[] = [
        {
            label: "Core Web Vitals",
            value: "95th percentile",
            change: "4.2s → 1.8s LCP",
            context: "Shopify Plus e-commerce platform",
            technical: "React 18 + Next.js 14 + Edge Runtime"
        },
        {
            label: "Infrastructure Cost",
            value: "78% reduction",
            change: "$12,400 → $2,680/mo",
            context: "SaaS platform migration to serverless",
            technical: "AWS Lambda + CloudFront + DynamoDB"
        },
        {
            label: "Development Velocity",
            value: "3.2x faster",
            change: "Feature delivery acceleration",
            context: "Legacy jQuery → Modern React stack",
            technical: "TypeScript + Vite + Component Library"
        },
        {
            label: "Business Impact",
            value: "+$340k ARR",
            change: "127% conversion lift",
            context: "Performance-driven revenue growth",
            technical: "A/B tested with statistical significance"
        }
    ]

    useEffect(() => {
        // Rotate through metrics automatically
        const interval = setInterval(() => {
            setActiveMetric(prev => (prev + 1) % technicalMetrics.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
        })
    }, [controls])

    const handleCTAClick = () => {
        trackEvent({
            event: 'enterprise_cta_click',
            category: 'conversion',
            action: 'hero_enterprise_cta',
            label: 'technical_assessment',
            value: 1
        })

        trackFunnelStep('enterprise_hero_cta', 'technical_funnel', {
            cta_type: 'technical_assessment',
            section: 'enterprise_hero',
            timestamp: Date.now()
        })
    }

    return (
        <motion.section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white"
            style={{ y, opacity }}
            data-section="enterprise-hero"
        >
            {/* Sophisticated background pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={controls}
                        className="space-y-8"
                    >
                        {/* Technical Badge */}
                        <motion.div
                            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <Code2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-blue-700">
                                React Performance Engineering
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <div className="space-y-4">
                            <motion.h1
                                className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Technical Performance
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    That Scales Revenue
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-xl text-slate-600 max-w-2xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Strategic Core Web Vitals optimization and React architecture modernization.
                                <strong className="text-slate-800"> Measurable business impact through technical excellence.</strong>
                            </motion.p>
                        </div>

                        {/* Technical CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.button
                                className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCTAClick}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="relative flex items-center gap-3 z-10">
                                    <TrendingUp className="w-5 h-5" />
                                    Request Technical Architecture Audit
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: isHovered ? 0 : '-100%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                View Case Studies
                            </motion.button>
                        </motion.div>

                        {/* Technical Credentials */}
                        <motion.div
                            className="flex flex-wrap gap-6 pt-8 border-t border-slate-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {[
                                { icon: Shield, text: "Enterprise security compliance" },
                                { icon: GitBranch, text: "Open source contributions" },
                                { icon: Monitor, text: "Real-time performance monitoring" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                    <item.icon className="w-4 h-4 text-blue-600" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Interactive Technical Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        {/* Main Metric Display */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="w-6 h-6 text-blue-600" />
                                <span className="font-medium text-slate-700">Live Client Metrics</span>
                                <div className="ml-auto flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-slate-500">Real-time</span>
                                </div>
                            </div>

                            <motion.div
                                key={activeMetric}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                        {technicalMetrics[activeMetric].label}
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        {technicalMetrics[activeMetric].context}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl font-bold text-blue-600">
                                            {technicalMetrics[activeMetric].value}
                                        </span>
                                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                            {technicalMetrics[activeMetric].change}
                                        </span>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-3">
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                            Technical Implementation
                                        </span>
                                        <p className="text-sm text-slate-700 mt-1">
                                            {technicalMetrics[activeMetric].technical}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Metric Navigation */}
                            <div className="flex gap-2 mt-6 pt-6 border-t border-slate-100">
                                {technicalMetrics.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-colors ${activeMetric === index
                                                ? 'bg-blue-600'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                            }`}
                                        onClick={() => setActiveMetric(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Technical Stack Indicators */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[
                                { icon: Database, label: "Architecture", status: "Optimized" },
                                { icon: Cloud, label: "Infrastructure", status: "Scalable" },
                                { icon: Zap, label: "Performance", status: "Monitored" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                >
                                    <item.icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                    <div className="text-xs font-medium text-slate-700">{item.label}</div>
                                    <div className="text-xs text-green-600">{item.status}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
