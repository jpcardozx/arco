/**
 * INTELLIGENT HERO SECTION - CONTENT-DRIVEN APPROACH
 * 
 * Nova abordagem baseada em:
 * - Problem-Insight-Solution framework
 * - Technical thought leadership
 * - Progressive value disclosure
 * - Educational engagement
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Zap, CheckCircle, Play, Star, TrendingUp, Brain, Code, Users } from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

interface InsightCardProps {
    stat: string
    insight: string
    context: string
    delay?: number
}

const InsightCard = ({ stat, insight, context, delay = 0 }: InsightCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
    >
        <div className="text-2xl font-bold text-blue-600 mb-1">{stat}</div>
        <div className="text-sm font-medium text-slate-700 mb-1">{insight}</div>
        <div className="text-xs text-slate-500">{context}</div>
    </motion.div>
)

interface FrameworkPillarProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    technologies: string[]
    delay?: number
}

const FrameworkPillar = ({ icon: Icon, title, description, technologies, delay = 0 }: FrameworkPillarProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay }}
        className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all duration-500"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg">
                <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1">
            {technologies.map((tech, index) => (
                <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-medium"
                >
                    {tech}
                </span>
            ))}
        </div>
    </motion.div>
)

export function IntelligentHeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const [currentInsight, setCurrentInsight] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    // Rotating insights for engagement
    const insights = [
        {
            stat: "73%",
            insight: "of React apps fail Core Web Vitals",
            context: "Google's 2024 HTTP Archive analysis"
        },
        {
            stat: "$1B/year",
            insight: "Amazon's cost per 100ms delay",
            context: "Performance = Revenue correlation"
        },
        {
            stat: "40%",
            insight: "mobile conversion drop per second",
            context: "Google Research, e-commerce study"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentInsight((prev) => (prev + 1) % insights.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (isInView) {
            trackFunnelStep('intelligent_hero_view', 'engagement_funnel', {
                section: 'intelligent_hero',
                timestamp: Date.now(),
                content_type: 'thought_leadership'
            })
        }
    }, [isInView])

    const handleCTAClick = (ctaType: 'audit' | 'framework' | 'case_study') => {
        trackEvent('intelligent_cta_click', 'engagement', 'click', ctaType, 1)
        
        trackFunnelStep('intelligent_cta_click', 'engagement_funnel', {
            cta_type: ctaType,
            location: 'intelligent_hero',
            engagement_level: 'high_intent'
        })
    }

    const frameworkPillars = [
        {
            icon: Code,
            title: "Technical Excellence Engine",
            description: "React 18 Concurrent Features optimization with Server Components strategic implementation",
            technologies: ["React 18", "Suspense", "Server Components", "Edge Computing"]
        },
        {
            icon: Brain,
            title: "Business Intelligence Layer",
            description: "Real-time performance-revenue correlation with automated conversion attribution",
            technologies: ["Core Web Vitals", "Revenue Attribution", "A/B Testing", "Analytics"]
        },
        {
            icon: Users,
            title: "Scale Preparation System",
            description: "Enterprise-grade performance governance with team training and knowledge transfer",
            technologies: ["Performance Budgets", "Monitoring", "Team Training", "Governance"]
        }
    ]

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
            data-section="intelligent-hero"
        >
            {/* Enhanced Background with Subtle Tech Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/6 to-emerald-600/6 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/4 to-blue-600/4 rounded-full blur-3xl" />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto px-6 lg:px-8 relative z-10"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Industry Insight Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span className="mr-2">Industry Insight:</span>
                            <span className="font-bold">{insights[currentInsight].stat}</span>
                            <span className="mx-2">•</span>
                            <span>{insights[currentInsight].insight}</span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column - Problem-Insight-Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            {/* Problem Statement */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                            >
                                Why <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">73% of React apps</span><br />
                                fail Core Web Vitals
                                <br />
                                <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-600 font-normal">
                                    (and the hidden business cost you're not measuring)
                                </span>
                            </motion.h1>

                            {/* Solution Introduction */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed"
                            >
                                Introducing the <strong className="text-emerald-600">ARCO Performance Framework™</strong> —
                                the methodology used by 47 enterprises to achieve sub-1s load times
                                while reducing infrastructure costs by 40%.
                            </motion.p>

                            {/* Authority Signals */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-200 rounded-lg">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-medium text-slate-700">Featured at React Conf 2025</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-200 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm font-medium text-slate-700">Google I/O Performance Track</span>
                                </div>
                            </motion.div>

                            {/* Enhanced CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 mb-8"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCTAClick('audit')}
                                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Zap className="w-5 h-5 mr-2" />
                                    Get Your React Performance Audit
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCTAClick('framework')}
                                    className="group inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 text-lg font-medium rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Explore ARCO Framework™
                                </motion.button>
                            </motion.div>

                            {/* Social Proof with Specificity */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="text-sm text-slate-500"
                            >
                                <strong className="text-slate-700">47 enterprises</strong> including Fortune 500 e-commerce,
                                fintech scale-ups, and B2B SaaS platforms
                            </motion.div>
                        </motion.div>

                        {/* Right Column - ARCO Framework Visualization */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            {/* Framework Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                    The ARCO Trinity Framework™
                                </h2>
                                <p className="text-slate-600">
                                    Three-layer methodology for enterprise React optimization
                                </p>
                            </div>

                            {/* Framework Pillars */}
                            <div className="space-y-6">
                                {frameworkPillars.map((pillar, index) => (
                                    <FrameworkPillar
                                        key={index}
                                        {...pillar}
                                        delay={0.8 + index * 0.2}
                                    />
                                ))}
                            </div>

                            {/* Results Preview */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 1.4 }}
                                className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl"
                            >
                                <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
                                    Typical Results in 47 Days
                                </h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-emerald-600">-73%</div>
                                        <div className="text-xs text-slate-600">Load Time</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">+127%</div>
                                        <div className="text-xs text-slate-600">Conversion</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">-40%</div>
                                        <div className="text-xs text-slate-600">Infrastructure Cost</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
