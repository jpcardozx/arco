'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    ChartBarIcon,
    ShieldCheckIcon,
    CpuChipIcon,
    RocketLaunchIcon,
    ArrowTrendingUpIcon,
    BuildingOffice2Icon,
    UserGroupIcon,
    CheckCircleIcon,
    PlayCircleIcon
} from '@heroicons/react/24/outline'

interface TechnicalAuthoritySectionProps {
    isAuthenticated: boolean
    userTier: 'free' | 'premium' | 'enterprise'
    onCTAClick: () => void
}

interface TechnicalMetric {
    label: string
    value: string
    trend: string
    icon: React.ElementType
    description: string
    proofPoint: string
}

interface ClientTestimonial {
    company: string
    role: string
    quote: string
    metrics: string
    logo?: string
}

interface CaseStudyHighlight {
    title: string
    challenge: string
    solution: string
    results: string[]
    timeline: string
    industry: string
}

const technicalMetrics: TechnicalMetric[] = [
    {
        label: "Performance Lift",
        value: "247%",
        trend: "+23% vs Q3",
        icon: ChartBarIcon,
        description: "Average conversion improvement across B2B SaaS clients",
        proofPoint: "Validated across 120+ implementations"
    },
    {
        label: "Security Score",
        value: "99.7%",
        trend: "SOC 2 Compliant",
        icon: ShieldCheckIcon,
        description: "Enterprise-grade security implementation",
        proofPoint: "Fortune 500 approved architecture"
    },
    {
        label: "API Response",
        value: "47ms",
        trend: "P99 latency",
        icon: CpuChipIcon,
        description: "Real-time technical intelligence delivery",
        proofPoint: "Sub-100ms guarantee"
    },
    {
        label: "Scale Factor",
        value: "10M+",
        trend: "Daily analyses",
        icon: RocketLaunchIcon,
        description: "Domain intelligence processing capacity",
        proofPoint: "Handles enterprise traffic spikes"
    }
]

const clientTestimonials: ClientTestimonial[] = [
    {
        company: "TechVanguard Solutions",
        role: "VP of Engineering",
        quote: "ARCO's technical depth transformed our entire market approach. Their intelligence platform revealed competitive gaps we couldn't see.",
        metrics: "340% pipeline acceleration",
    },
    {
        company: "ScaleFlow Dynamics",
        role: "Chief Technology Officer",
        quote: "The level of technical sophistication is unprecedented. Real intelligence, not marketing fluff.",
        metrics: "180% conversion improvement",
    },
    {
        company: "Enterprise Systems Corp",
        role: "Head of Digital Strategy",
        quote: "Finally, a consultancy that speaks our language. Technical precision meets strategic clarity.",
        metrics: "67% faster market entry",
    }
]

const caseStudyHighlights: CaseStudyHighlight[] = [
    {
        title: "B2B SaaS Market Dominance",
        challenge: "Mid-stage startup struggling with enterprise customer acquisition despite superior product",
        solution: "Technical Authority Framework + Competitive Intelligence API integration",
        results: [
            "Enterprise pipeline: 0 → 47 qualified prospects in 90 days",
            "Deal size average: +234% increase",
            "Sales cycle: 67% reduction in length"
        ],
        timeline: "90-day implementation",
        industry: "Enterprise Software"
    },
    {
        title: "Technical Product Launch",
        challenge: "Developer-first product with 2% conversion despite high traffic",
        solution: "Developer Psychology Architecture + Technical Credibility System",
        results: [
            "Conversion rate: 2.1% → 14.7%",
            "Developer signup quality: +340% improvement",
            "Technical documentation engagement: +127%"
        ],
        timeline: "60-day transformation",
        industry: "Developer Tools"
    }
]

export function TechnicalAuthoritySection({
    isAuthenticated,
    userTier,
    onCTAClick
}: TechnicalAuthoritySectionProps) {
    const [activeMetric, setActiveMetric] = useState(0)
    const [showFullCaseStudy, setShowFullCaseStudy] = useState(false)
    const { scrollYProgress } = useScroll()

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    // Auto-cycle through metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMetric((prev) => (prev + 1) % technicalMetrics.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const handleCTAClick = () => {
        // Track different engagement based on authentication status
        if (isAuthenticated) {
            // Navigate to premium dashboard or features
            window.location.href = '/dashboard'
        } else {
            onCTAClick()
        }
    }

    const CTAText = () => {
        if (isAuthenticated) {
            return userTier === 'enterprise' ? 'Access Advanced Analytics' : 'Upgrade to Enterprise'
        }
        return 'Experience Technical Intelligence'
    }

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-10"
            >
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ y: textY }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-3 mb-8">
                        <CpuChipIcon className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-200 font-medium">Technical Intelligence Platform</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
                        Technical Authority
                        <br />
                        <span className="text-blue-400">That Converts</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Beyond surface-level marketing. Real technical intelligence, competitive analysis,
                        and strategic frameworks that enterprise buyers actually trust.
                    </p>

                    {/* Real-time Metrics Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {technicalMetrics.map((metric, index) => (
                            <motion.div
                                key={metric.label}
                                className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer ${activeMetric === index
                                        ? 'bg-blue-500/20 border-blue-400/50 scale-105'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                                onHoverStart={() => setActiveMetric(index)}
                            >                <div className="flex items-center justify-between mb-3">
                                    {React.createElement(metric.icon, {
                                        className: `w-6 h-6 ${activeMetric === index ? 'text-blue-400' : 'text-slate-400'}`
                                    })}
                                    <span className="text-xs text-green-400 font-medium">{metric.trend}</span>
                                </div>
                                <div className={`text-2xl font-bold mb-1 ${activeMetric === index ? 'text-white' : 'text-slate-200'}`}>
                                    {metric.value}
                                </div>
                                <div className="text-sm text-slate-400">{metric.label}</div>
                                {activeMetric === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 pt-3 border-t border-blue-400/30"
                                    >
                                        <p className="text-xs text-blue-200">{metric.description}</p>
                                        <p className="text-xs text-slate-400 mt-1">{metric.proofPoint}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Social Proof Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Trusted by Technical Leaders
                        </h2>
                        <p className="text-slate-300 text-lg">
                            When CTOs, VPs of Engineering, and technical founders need results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {clientTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.company}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <BuildingOffice2Icon className="w-6 h-6 text-blue-400" />
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.company}</div>
                                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                                    </div>
                                </div>

                                <blockquote className="text-slate-200 mb-4">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-green-400">{testimonial.metrics}</span>
                                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Case Study Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <ArrowTrendingUpIcon className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Case Study Spotlight</h3>
                                <p className="text-slate-300">Real implementation, measurable results</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-4">{caseStudyHighlights[0].title}</h4>
                                <p className="text-slate-300 mb-6">{caseStudyHighlights[0].challenge}</p>

                                <div className="space-y-3">
                                    {caseStudyHighlights[0].results.map((result, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-slate-200">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-xl p-6">
                                    <div className="text-sm text-slate-400 mb-2">Implementation Timeline</div>
                                    <div className="text-xl font-bold text-white">{caseStudyHighlights[0].timeline}</div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6">
                                    <div className="text-sm text-slate-400 mb-2">Industry</div>
                                    <div className="text-xl font-bold text-white">{caseStudyHighlights[0].industry}</div>
                                </div>

                                <button
                                    onClick={() => setShowFullCaseStudy(true)}
                                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    <PlayCircleIcon className="w-5 h-5" />
                                    View Full Case Study
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="text-center"
                >
                    <div className="max-w-3xl mx-auto mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready for Technical Intelligence?
                        </h3>
                        <p className="text-xl text-slate-300">
                            {isAuthenticated ?
                                'Access deeper analytics and exclusive technical frameworks' :
                                'Join technical leaders who choose substance over surface-level marketing'
                            }
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.button
                            onClick={handleCTAClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25"
                        >
                            <CTAText />
                        </motion.button>

                        <button className="flex items-center gap-2 px-6 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300">
                            <PlayCircleIcon className="w-5 h-5" />
                            Watch Technical Demo
                        </button>
                    </div>

                    {!isAuthenticated && (
                        <p className="text-sm text-slate-400 mt-4">
                            No commitment required • Technical analysis in under 60 seconds
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
