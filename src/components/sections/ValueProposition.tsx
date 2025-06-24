'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Target, BarChart3, Lightbulb, Clock, Award } from 'lucide-react'

export function ValueProposition() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const problems = [
        {
            icon: TrendingUp,
            title: "Revenue Hemorrhaging",
            description: "Digital investments bleeding money with no clear ROI tracking",
            impact: "Millions lost on failed implementations"
        },
        {
            icon: Clock,
            title: "Legacy System Chaos",
            description: "Disconnected tools creating operational bottlenecks",
            impact: "Teams drowning in inefficiency"
        },
        {
            icon: BarChart3,
            title: "Data Desert",
            description: "Mountains of data but zero actionable business intelligence",
            impact: "Flying blind on critical decisions"
        }
    ]

    const solutions = [
        {
            icon: Target,
            title: "Self-Funding Optimization",
            description: "Revenue-generating improvements that pay for themselves",
            result: "Average 300% ROI within 90 days",
            methodology: "Performance engineering"
        },
        {
            icon: Lightbulb,
            title: "Emergency Digital Triage",
            description: "Rapid identification and fixing of critical revenue leaks",
            result: "Stop bleeding money in 30 days",
            methodology: "Revenue rescue protocols"
        },
        {
            icon: Award,
            title: "Executive Command Center",
            description: "Real-time business intelligence that drives instant decisions",
            result: "Complete ROI visibility",
            methodology: "Business intelligence"
        }
    ]

    return (
        <section ref={ref} className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-emerald-600/10" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium mb-6 backdrop-blur-sm">
                            <Target className="w-4 h-4 mr-2" />
                            Strategic Methodology
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            From Problem Identification
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">to Measurable Solutions</span>
                        </h2>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Our structured approach transforms digital challenges into growth opportunities,
                            delivering measurable results with direct revenue impact.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* Problems Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Common Challenges We Identify
                                </h3>
                                <p className="text-slate-300">
                                    Recurring problems that limit B2B enterprise growth
                                </p>
                            </div>

                            <div className="space-y-6">
                                {problems.map((problem, index) => {
                                    const Icon = problem.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                            className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                                                    <Icon className="w-6 h-6 text-red-400" />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-white mb-2">
                                                        {problem.title}
                                                    </h4>
                                                    <p className="text-slate-300 mb-3">
                                                        {problem.description}
                                                    </p>
                                                    <div className="text-sm text-red-400 font-medium">
                                                        → {problem.impact}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Solutions Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Strategic Solutions Applied
                                </h3>
                                <p className="text-slate-300">
                                    Proven methodologies that generate consistent results
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
                                            className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-emerald-500/20 p-3 rounded-lg border border-emerald-500/30">
                                                    <Icon className="w-6 h-6 text-emerald-400" />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-white mb-2">
                                                        {solution.title}
                                                    </h4>
                                                    <p className="text-slate-300 mb-3">
                                                        {solution.description}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm text-emerald-400 font-medium">
                                                            ✓ {solution.result}
                                                        </div>
                                                        <div className="text-xs text-slate-400 bg-white/10 px-2 py-1 rounded border border-white/20">
                                                            {solution.methodology}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-20 text-center"
                    >
                        <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl p-8 text-white backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">
                                Ready to transform your challenges into opportunities?
                            </h3>
                            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                                Strategic analysis to identify the biggest growth opportunities for your enterprise
                            </p>
                            <button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                                Request Strategic Analysis
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}