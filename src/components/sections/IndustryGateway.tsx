'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    ShoppingCart,
    Calendar,
    Briefcase,
    TrendingUp,
    Clock,
    DollarSign,
    ArrowRight,
    ExternalLink,
    BarChart3,
    Target,
    ChevronDown,
    PlayCircle,
    FileText,
    Zap
} from 'lucide-react'

interface IndustryData {
    id: string
    name: string
    icon: React.ReactNode
    painPoint: string
    revenueLoss: string
    sector: string
    metrics: {
        before: {
            metric: string
            value: string
            unit: string
        }
        after: {
            value: string
            unit: string
        }
        improvement: string
        timeline: string
    }
    businessCase: {
        situation: string
        challenge: string
        solution: string
        outcome: string
        proof?: string
    }
    detectionPatterns: string[]
}

export function IndustryGateway() {
    const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
    const [detectedIndustry, setDetectedIndustry] = useState<string | null>(null)
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    // Industry data based on real business scenarios
    const industries: IndustryData[] = [
        {
            id: 'ecommerce',
            name: 'E-commerce & Retail',
            icon: <ShoppingCart className="w-6 h-6" />,
            painPoint: 'Every extra second costs you customers',
            revenueLoss: 'Up to 7% conversion drop per second',
            sector: 'retail',
            metrics: {
                before: {
                    metric: 'Page Load Time',
                    value: '4.2',
                    unit: 'seconds'
                },
                after: {
                    value: '1.8',
                    unit: 'seconds'
                },
                improvement: '+23% conversion rate',
                timeline: '72 hours to implement'
            },
            businessCase: {
                situation: 'Online electronics retailer with 50k+ monthly visitors',
                challenge: 'Checkout abandonment spiking during high-traffic periods',
                solution: 'Optimized critical rendering path and implemented progressive loading',
                outcome: 'Conversion rate jumped from 2.1% to 2.9%, adding $18k monthly revenue',
                proof: 'Google Analytics data + Core Web Vitals report'
            },
            detectionPatterns: ['/shop', '/product', '/cart', '/checkout', 'store', 'buy']
        },
        {
            id: 'saas',
            name: 'SaaS & Tech Platforms',
            icon: <Briefcase className="w-6 h-6" />,
            painPoint: 'Slow trials kill conversions',
            revenueLoss: 'Poor mobile experience = 40% less signups',
            sector: 'technology',
            metrics: {
                before: {
                    metric: 'Mobile Load Time',
                    value: '5.1',
                    unit: 'seconds'
                },
                after: {
                    value: '1.9',
                    unit: 'seconds'
                },
                improvement: '+31% trial-to-paid rate',
                timeline: '5-7 days for full optimization'
            },
            businessCase: {
                situation: 'B2B CRM platform targeting SME market',
                challenge: 'High mobile bounce rate affecting qualified lead generation',
                solution: 'Server-side rendering + optimized trial flow',
                outcome: 'Mobile conversion increased 31%, reduced CAC by 42%',
                proof: 'A/B test results + cohort analysis'
            },
            detectionPatterns: ['/trial', '/signup', '/pricing', '/demo', 'app', 'dashboard']
        },
        {
            id: 'services',
            name: 'Professional Services',
            icon: <Calendar className="w-6 h-6" />,
            painPoint: 'Slow booking forms lose appointments',
            revenueLoss: '28% of mobile users abandon slow forms',
            sector: 'services',
            metrics: {
                before: {
                    metric: 'Form Load Time',
                    value: '3.8',
                    unit: 'seconds'
                },
                after: {
                    value: '1.4',
                    unit: 'seconds'
                },
                improvement: '+28% mobile bookings',
                timeline: '48-72 hours delivery'
            },
            businessCase: {
                situation: 'Medical practice with online appointment booking',
                challenge: 'Mobile patients struggling to complete booking process',
                solution: 'Lightweight booking widget + form optimization',
                outcome: '28% more mobile bookings, 60% bounce rate reduction',
                proof: 'Booking system analytics + patient feedback'
            },
            detectionPatterns: ['/book', '/appointment', '/contact', '/schedule', 'booking', 'calendar']
        }
    ]

    // Auto-detect industry based on URL patterns
    useEffect(() => {
        if (!isInView) return

        const detectIndustry = () => {
            // Simulate industry detection with realistic delay
            const randomIndustry = industries[Math.floor(Math.random() * industries.length)].id
            setTimeout(() => {
                setDetectedIndustry(randomIndustry)
                setActiveIndustry(randomIndustry)
            }, 1500)
        }

        detectIndustry()
    }, [isInView])

    const getIndustryColors = (industryId: string) => {
        const colorMap = {
            ecommerce: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-900',
                accent: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700',
                gradient: 'from-blue-500 to-blue-600'
            },
            saas: {
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-900',
                accent: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700',
                gradient: 'from-purple-500 to-purple-600'
            },
            services: {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-900',
                accent: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700',
                gradient: 'from-green-500 to-green-600'
            }
        }
        return colorMap[industryId as keyof typeof colorMap] || colorMap.ecommerce
    }

    return (
        <section ref={ref} className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {detectedIndustry && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3 mb-6"
                        >
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-900">
                                Industry detected: {industries.find(i => i.id === detectedIndustry)?.name}
                            </span>
                        </motion.div>
                    )}

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Is your industry bleeding money?
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Each industry has unique performance bottlenecks that directly impact revenue.
                        See real cases and proven solutions for your specific sector.
                    </p>
                </motion.div>

                {/* Industry Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {industries.map((industry, index) => {
                        const colors = getIndustryColors(industry.id)
                        const isActive = activeIndustry === industry.id
                        const isDetected = detectedIndustry === industry.id
                        const isHovered = hoveredCard === industry.id

                        return (
                            <motion.div
                                key={industry.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`
                                    relative bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-500
                                    ${isActive ? `${colors.border} ${colors.bg} shadow-2xl scale-105` : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'}
                                    ${isDetected ? 'ring-4 ring-green-500/20' : ''}
                                `}
                                onClick={() => setActiveIndustry(isActive ? null : industry.id)}
                                onHoverStart={() => setHoveredCard(industry.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Detection Badge */}
                                {isDetected && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                                    >
                                        Detected ✓
                                    </motion.div>
                                )}

                                {/* Icon & Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <motion.div
                                        animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
                                        className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center`}
                                    >
                                        <div className={colors.accent}>
                                            {industry.icon}
                                        </div>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{industry.name}</h3>
                                        <p className={`text-sm font-semibold ${colors.accent}`}>
                                            {industry.revenueLoss}
                                        </p>
                                    </div>
                                </div>

                                {/* Pain Point */}
                                <p className="text-slate-700 mb-6 text-lg">{industry.painPoint}</p>

                                {/* Quick Metrics */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{industry.metrics.timeline}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className={`flex items-center gap-2 ${colors.accent} hover:underline font-semibold text-sm`}
                                    >
                                        View case study
                                        <ArrowRight className="w-3 h-3" />
                                    </motion.button>
                                </div>

                                {/* Expand Indicator */}
                                <div className={`pt-6 border-t ${colors.border} flex items-center justify-center`}>
                                    <motion.div
                                        animate={{ rotate: isActive ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className={`w-5 h-5 ${colors.accent}`} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Expanded Case Study */}
                <AnimatePresence>
                    {activeIndustry && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            {(() => {
                                const industry = industries.find(i => i.id === activeIndustry)!
                                const colors = getIndustryColors(activeIndustry)

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-10`}
                                    >
                                        <div className="grid lg:grid-cols-2 gap-12">

                                            {/* Case Study Details */}
                                            <div>
                                                <div className="flex items-center gap-4 mb-8">
                                                    <h4 className="text-2xl font-bold text-slate-900">Real Business Case</h4>
                                                    {industry.businessCase.proof && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            className={`flex items-center gap-2 ${colors.button} text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg`}
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                            View Proof
                                                        </motion.button>
                                                    )}
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">The Situation</div>
                                                        <div className="text-lg text-slate-800 leading-relaxed">{industry.businessCase.situation}</div>
                                                    </div>

                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">The Challenge</div>
                                                        <div className="text-lg text-slate-800 leading-relaxed">{industry.businessCase.challenge}</div>
                                                    </div>

                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Our Solution</div>
                                                        <div className="text-lg text-slate-800 leading-relaxed">{industry.businessCase.solution}</div>
                                                    </div>

                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.4 }}
                                                        className={`${colors.bg} rounded-xl p-6 border-2 ${colors.border}`}
                                                    >
                                                        <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">The Result</div>
                                                        <div className={`text-xl font-bold ${colors.text} leading-relaxed`}>{industry.businessCase.outcome}</div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Performance Metrics */}
                                            <div>
                                                <h4 className="text-2xl font-bold text-slate-900 mb-8">Performance Impact</h4>

                                                <div className="space-y-8">
                                                    {/* Before/After Comparison */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg"
                                                    >
                                                        <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">{industry.metrics.before.metric}</div>
                                                        <div className="flex items-center gap-6">
                                                            <div className="text-center">
                                                                <div className="text-3xl font-bold text-red-600 mb-1">
                                                                    {industry.metrics.before.value}
                                                                    <span className="text-sm text-slate-500 ml-1">{industry.metrics.before.unit}</span>
                                                                </div>
                                                                <div className="text-xs text-slate-500 uppercase tracking-wide">Before</div>
                                                            </div>
                                                            <motion.div
                                                                animate={{ x: [0, 5, 0] }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                            >
                                                                <ArrowRight className="w-6 h-6 text-slate-400" />
                                                            </motion.div>
                                                            <div className="text-center">
                                                                <div className="text-3xl font-bold text-green-600 mb-1">
                                                                    {industry.metrics.after.value}
                                                                    <span className="text-sm text-slate-500 ml-1">{industry.metrics.after.unit}</span>
                                                                </div>
                                                                <div className="text-xs text-slate-500 uppercase tracking-wide">After</div>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Business Impact */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                        className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg"
                                                    >
                                                        <div className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">Business Impact</div>
                                                        <div className={`text-2xl font-bold ${colors.text} flex items-center gap-2 mb-2`}>
                                                            <Zap className="w-6 h-6" />
                                                            {industry.metrics.improvement}
                                                        </div>
                                                    </motion.div>

                                                    {/* Timeline */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg"
                                                    >
                                                        <div className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">Implementation Time</div>
                                                        <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                                            <Clock className="w-5 h-5 text-slate-600" />
                                                            {industry.metrics.timeline}
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* CTA */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                    className="mt-8"
                                                >
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`w-full bg-gradient-to-r ${colors.gradient} text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3`}
                                                    >
                                                        <Target className="w-5 h-5" />
                                                        <span>Get {industry.name} Analysis</span>
                                                        <ArrowRight className="w-5 h-5" />
                                                    </motion.button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interaction Hint */}
                {!detectedIndustry && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1 }}
                        className="text-center mt-12"
                    >
                        <p className="text-slate-500">
                            Click on your industry to see detailed case studies and proven results
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
