'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, AlertTriangle, DollarSign, Clock, Zap, Shield, Target, BarChart3 } from 'lucide-react'

export function InteractiveValueProposition() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const problems = [
        {
            icon: AlertTriangle,
            title: "Digital Projects Failing",
            description: "67% of digital transformation projects fail or exceed budget",
            impact: "$900B wasted annually on failed initiatives",
            color: "red"
        },
        {
            icon: DollarSign,
            title: "Revenue Leaking Daily",
            description: "Poor conversion rates and broken funnels bleeding money",
            impact: "Average company loses 23% potential revenue",
            color: "orange"
        },
        {
            icon: Clock,
            title: "Time to Market Delays",
            description: "Slow deployment cycles missing market opportunities",
            impact: "6+ months to see any ROI (if any)",
            color: "yellow"
        }
    ]

    const solutions = [
        {
            icon: Zap,
            title: "Self-Funding Transformation",
            description: "Projects that pay for themselves before completion",
            result: "47-day average ROI",
            guarantee: "Money-back guarantee",
            color: "emerald"
        },
        {
            icon: Target,
            title: "Revenue-First Approach",
            description: "Every change directly impacts bottom line performance",
            result: "3.2x average revenue increase",
            guarantee: "Performance guarantee",
            color: "blue"
        },
        {
            icon: Shield,
            title: "Risk-Free Implementation",
            description: "Phased rollout with continuous monitoring and optimization",
            result: "94% project success rate",
            guarantee: "Success guarantee",
            color: "purple"
        }
    ]

    const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
        const colorMap: Record<string, Record<string, string>> = {
            red: {
                bg: 'bg-red-50 hover:bg-red-100',
                text: 'text-red-600',
                border: 'border-red-200'
            },
            orange: {
                bg: 'bg-orange-50 hover:bg-orange-100',
                text: 'text-orange-600',
                border: 'border-orange-200'
            },
            yellow: {
                bg: 'bg-yellow-50 hover:bg-yellow-100',
                text: 'text-yellow-600',
                border: 'border-yellow-200'
            },
            emerald: {
                bg: 'bg-emerald-50 hover:bg-emerald-100',
                text: 'text-emerald-600',
                border: 'border-emerald-200'
            },
            blue: {
                bg: 'bg-blue-50 hover:bg-blue-100',
                text: 'text-blue-600',
                border: 'border-blue-200'
            },
            purple: {
                bg: 'bg-purple-50 hover:bg-purple-100',
                text: 'text-purple-600',
                border: 'border-purple-200'
            }
        }
        return colorMap[color][type]
    }

    return (
        <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 rounded-full text-red-700 text-sm font-medium mb-6">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            The Digital Transformation Crisis
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                            Stop the Financial
                            <br />
                            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Bleeding</span>
                        </h2>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Most companies are hemorrhaging money on failed digital projects.
                            We've developed a methodology that turns transformation into profit.
                        </p>
                    </motion.div>

                    {/* Before/After Comparison */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-20">

                        {/* Problems - Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-slate-900 mb-4 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                        <span className="text-red-600 font-bold">✕</span>
                                    </div>
                                    The Old Way (Bleeding Money)
                                </h3>
                                <p className="text-slate-600 text-lg">
                                    Traditional digital transformation approaches that drain budgets
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
                                            className={`group ${getColorClasses(problem.color, 'bg')} border ${getColorClasses(problem.color, 'border')} rounded-xl p-6 transition-all duration-300 cursor-pointer`}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                                                    <Icon className={`w-6 h-6 ${getColorClasses(problem.color, 'text')}`} />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                                        {problem.title}
                                                    </h4>
                                                    <p className="text-slate-600 mb-3">
                                                        {problem.description}
                                                    </p>
                                                    <div className={`text-sm ${getColorClasses(problem.color, 'text')} font-bold`}>
                                                        💸 {problem.impact}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Solutions - Right Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-slate-900 mb-4 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                    </div>
                                    The ARCO Way (Revenue Growth)
                                </h3>
                                <p className="text-slate-600 text-lg">
                                    Self-funding transformation that generates ROI during implementation
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
                                            className={`group ${getColorClasses(solution.color, 'bg')} border ${getColorClasses(solution.color, 'border')} rounded-xl p-6 transition-all duration-300 cursor-pointer hover:shadow-lg`}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                                                    <Icon className={`w-6 h-6 ${getColorClasses(solution.color, 'text')}`} />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                                        {solution.title}
                                                    </h4>
                                                    <p className="text-slate-600 mb-3">
                                                        {solution.description}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className={`text-sm ${getColorClasses(solution.color, 'text')} font-bold`}>
                                                            🚀 {solution.result}
                                                        </div>
                                                        <div className="text-xs bg-white px-2 py-1 rounded-full border">
                                                            {solution.guarantee}
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

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center"
                    >
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                                        backgroundSize: '40px 40px'
                                    }}
                                />
                            </div>

                            <div className="relative">
                                <h3 className="text-3xl font-bold mb-4">
                                    Ready to Transform Waste into Wealth?
                                </h3>
                                <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-lg">
                                    Emergency financial audit to stop the bleeding and identify immediate revenue opportunities
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                                        Stop The Bleeding - Free Analysis
                                    </button>
                                    <button className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/50">
                                        Emergency Intervention
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
