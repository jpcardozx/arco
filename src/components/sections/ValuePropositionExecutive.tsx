'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Target, Zap, Award, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'

interface Challenge {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    cost: string
}

interface Solution {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    result: string
    timeframe: string
}

/**
 * Executive Value Proposition - Problem/Solution Clarity
 * Focused on business impact and executive decision-making
 */
export function ValueProposition() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const challenges: Challenge[] = [
        {
            icon: AlertTriangle,
            title: "Performance Bottlenecks",
            description: "Legacy technical debt creating operational inefficiencies and user experience degradation",
            cost: "40% slower time-to-market"
        },
        {
            icon: TrendingUp,
            title: "Infrastructure Inefficiency",
            description: "Over-provisioned cloud resources and non-optimized architecture patterns",
            cost: "65% higher operational costs"
        },
        {
            icon: Target,
            title: "ROI Measurement Gap",
            description: "Limited visibility into technical investment performance and business impact",
            cost: "Difficult to justify tech investments"
        }
    ]

    const solutions: Solution[] = [
        {
            icon: Zap,
            title: "Performance Engineering",
            description: "Systematic Core Web Vitals optimization with measurable business impact tracking",
            result: "Typical 2-4x improvement",
            timeframe: "4-6 week implementation"
        },
        {
            icon: Target,
            title: "Architecture Modernization",
            description: "Strategic migration to modern React patterns with infrastructure cost optimization",
            result: "60-80% cost reduction",
            timeframe: "6-8 week delivery"
        },
        {
            icon: Award,
            title: "Technical ROI Tracking",
            description: "Implementation of performance monitoring and business impact measurement systems",
            result: "Complete visibility",
            timeframe: "Real-time dashboards"
        }
    ]

    return (
        <section ref={ref} className="relative py-20 lg:py-24 bg-gradient-to-br from-neutral-50 to-white" data-section="value-proposition">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Executive Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border bg-primary-50 text-primary-700 border-primary-200 mb-6">
                        <Target className="w-4 h-4" />
                        Strategic Methodology
                    </div>                    <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
                        Technical Performance
                        <br />
                        <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Engineering & Optimization</span>
                    </h2>

                    <p className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-4xl mx-auto">
                        Strategic approach to React performance optimization and infrastructure modernization,
                        delivering measurable ROI through technical excellence.
                    </p>
                </motion.div>                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
                    {/* Problems/Challenges Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="text-center lg:text-left mb-8 border-l-4 border-red-500 pl-6">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-red-700">
                                What's Costing You Money
                            </h3>
                            <p className="text-lg text-neutral-600">
                                Common enterprise challenges we eliminate
                            </p>
                        </div>

                        <div className="space-y-6">
                            {challenges.map((challenge, index) => {
                                const Icon = challenge.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className="flex gap-4 p-6 bg-red-50 border border-red-200 rounded-xl hover:shadow-medium transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-red-600" />
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-red-800 mb-2">
                                                {challenge.title}
                                            </h4>
                                            <p className="text-neutral-700 mb-3 leading-relaxed">
                                                {challenge.description}
                                            </p>
                                            <div className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block">
                                                → {challenge.cost}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>                    {/* Solutions Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="text-center lg:text-left mb-8 border-l-4 border-emerald-500 pl-6">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-emerald-700">
                                How We Make You Money
                            </h3>
                            <p className="text-lg text-neutral-600">
                                Proven solutions with guaranteed ROI
                            </p>
                        </div>

                        <div className="space-y-6">
                            {solutions.map((solution, index) => {
                                const Icon = solution.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                        className="flex gap-4 p-6 bg-emerald-50 border border-emerald-200 rounded-xl hover:shadow-medium transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-emerald-600" />
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-emerald-800 mb-2">
                                                {solution.title}
                                            </h4>
                                            <p className="text-neutral-700 mb-3 leading-relaxed">
                                                {solution.description}
                                            </p>
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                    {solution.result}
                                                </div>
                                                <div className="text-sm text-emerald-600 font-medium">
                                                    {solution.timeframe}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Strategic CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
                        >
                            <div className="mb-6">
                                <h4 className="text-xl font-bold text-blue-800 mb-2">Ready to Stop the Bleeding?</h4>
                                <p className="text-blue-700">
                                    Get a free 15-minute digital audit to identify your biggest revenue leaks
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <span className="flex items-center gap-2">
                                    Start Revenue Recovery
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
