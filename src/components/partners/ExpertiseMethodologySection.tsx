'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Target,
    Zap,
    TrendingUp,
    CheckCircle,
    DollarSign,
    Clock,
    BarChart3,
    ArrowRight
} from 'lucide-react'

// Simplified expertise section focused on business outcomes
export function ExpertiseMethodologySection() {
    const [activeApproach, setActiveApproach] = useState(0)

    // Three core approaches with clear business value
    const approaches = [
        {
            name: "Revenue Recovery Analysis",
            timeframe: "48 hours",
            description: "Identify exactly where your funnel loses money and prioritize fixes by revenue impact",
            process: [
                "Conversion funnel audit with revenue leak mapping",
                "Mobile vs desktop performance gap analysis", 
                "Checkout flow friction point identification",
                "Quick wins vs major improvements prioritization"
            ],
            outcome: "Clear roadmap showing highest-impact improvements first",
            businessValue: "Typical findings: $4,680/month in recoverable revenue",
            icon: DollarSign,
            color: "from-emerald-500 to-teal-600"
        },
        {
            name: "Performance-Revenue Connection",
            timeframe: "7-21 days",
            description: "Fix technical performance issues that directly impact conversions and user experience",
            process: [
                "Core Web Vitals optimization for conversion impact",
                "Mobile performance improvements (0.8s load time target)",
                "Stack consolidation to reduce costs and complexity",
                "Native integrations to eliminate middleware dependencies"
            ],
            outcome: "Measurable performance improvements tied to business metrics",
            businessValue: "Average: 67% conversion improvement + $2,400/month cost savings",
            icon: Zap,
            color: "from-blue-500 to-indigo-600"
        },
        {
            name: "Systematic Implementation",
            timeframe: "4-8 weeks",
            description: "Apply ARCO methodology for sustainable improvements that compound over time",
            process: [
                "Complete funnel optimization using proven framework",
                "Value perception alignment for premium positioning",
                "Systematic testing and measurement setup",
                "Long-term optimization strategy development"
            ],
            outcome: "Self-sustaining optimization system with ongoing improvements",
            businessValue: "Sustainable growth foundation + optimized profit margins",
            icon: Target,
            color: "from-purple-500 to-pink-600"
        }
    ]

    // Real implementation examples with specific outcomes
    const implementations = [
        {
            company: "E-commerce Premium Brand",
            revenue: "$12M annual",
            challenge: "Mobile conversions 67% below desktop performance",
            solution: "Revenue Recovery Analysis + Mobile Optimization",
            implementation: "12-day systematic mobile checkout optimization",
            results: {
                technical: "Mobile conversion: 1.9% → 8.2%",
                business: "$340K additional Q2 revenue",
                timeline: "Results visible in 6 weeks"
            }
        },
        {
            company: "B2B SaaS Platform", 
            revenue: "$8M annual",
            challenge: "High trial volume but low trial-to-paid conversion",
            solution: "Performance-Revenue Connection + UX Optimization",
            implementation: "18-day performance + user experience overhaul",
            results: {
                technical: "Load time: 4.2s → 0.8s, 100% Core Web Vitals",
                business: "287% trial-to-paid improvement",
                timeline: "ROI positive in 3 weeks"
            }
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-5 py-2 mb-6 border border-blue-200">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                            Systematic Revenue Recovery
                        </span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                        Three Approaches to
                        <br />
                        <span className="font-bold text-blue-600">Measurable Revenue Recovery</span>
                    </h2>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Choose the approach that best fits your timeline and business priorities.
                        Each delivers measurable results with clear ROI tracking.
                    </p>
                </motion.div>

                {/* Approach selection tabs */}
                <div className="mb-16">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {approaches.map((approach, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveApproach(index)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                                    activeApproach === index
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                }`}
                            >
                                <approach.icon className="w-4 h-4" />
                                <span>{approach.name}</span>
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeApproach}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
                    >
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${approaches[activeApproach].color} flex items-center justify-center mb-6`}>
                                    {React.createElement(approaches[activeApproach].icon, { className: "w-6 h-6 text-white" })}
                                </div>

                                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                                    {approaches[activeApproach].name}
                                </h3>

                                <div className="flex items-center space-x-2 mb-4">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-600">
                                        {approaches[activeApproach].timeframe}
                                    </span>
                                </div>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {approaches[activeApproach].description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        What We Do:
                                    </h4>
                                    {approaches[activeApproach].process.map((step, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{step}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm font-medium text-green-700 mb-1">Expected Outcome:</p>
                                    <p className="text-green-800">{approaches[activeApproach].outcome}</p>
                                </div>
                            </div>

                            <div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                                        Business Value:
                                    </h4>
                                    <p className="text-blue-800 font-semibold text-lg">
                                        {approaches[activeApproach].businessValue}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Perfect For Companies That:
                                    </h4>
                                    {activeApproach === 0 && (
                                        <ul className="space-y-2 text-slate-700">
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Need to understand revenue leak sources quickly</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Want to prioritize improvements by revenue impact</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Prefer starting with quick wins before major changes</span>
                                            </li>
                                        </ul>
                                    )}
                                    {activeApproach === 1 && (
                                        <ul className="space-y-2 text-slate-700">
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Know they have performance issues affecting conversions</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Want guaranteed performance improvements with ROI tracking</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Need to reduce technical costs while improving results</span>
                                            </li>
                                        </ul>
                                    )}
                                    {activeApproach === 2 && (
                                        <ul className="space-y-2 text-slate-700">
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Ready for comprehensive optimization foundation</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Want sustainable improvements that compound over time</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span>Planning for significant growth and need scalable systems</span>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Real implementation examples */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-light text-slate-900 mb-4">
                            Recent Implementation Examples
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Real companies achieving measurable results using these systematic approaches
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {implementations.map((impl, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900">{impl.company}</h4>
                                        <p className="text-sm text-slate-600">{impl.revenue}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-1">Challenge:</p>
                                        <p className="text-slate-600">{impl.challenge}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-1">Solution:</p>
                                        <p className="text-slate-600">{impl.solution}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-1">Implementation:</p>
                                        <p className="text-slate-600">{impl.implementation}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <p className="text-sm text-green-700 font-medium">{impl.results.technical}</p>
                                        <p className="text-xs text-green-600">Technical Result</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <p className="text-sm text-blue-700 font-medium">{impl.results.business}</p>
                                        <p className="text-xs text-blue-600">Business Impact</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3">
                                        <p className="text-sm text-purple-700 font-medium">{impl.results.timeline}</p>
                                        <p className="text-xs text-purple-600">Timeline to Results</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}