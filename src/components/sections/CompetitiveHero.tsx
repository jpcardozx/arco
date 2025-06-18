'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, TrendingUp, Shield, Clock } from 'lucide-react'

export function CompetitiveHero() {
    const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)

    return (
        <section className="relative min-h-screen flex items-center pt-28 bg-white overflow-hidden">
            {/* Clean Professional Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gray-100/30 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/30 to-gray-50/50"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Strategic Positioning */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >                        <div className="inline-flex items-center px-6 py-3 bg-blue-900 border border-blue-200 rounded-full text-white text-sm font-medium mb-8 shadow-sm">
                            <Shield className="w-4 h-4 mr-2" />
                            <span className="font-semibold">
                                Ex-FAANG Architecture Team • Series B+ Specialists • Zero Rebuilds
                            </span>
                        </div>                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight mb-8">
                            Stop Losing
                            <span className="block text-blue-700">
                                $200K+ Monthly
                            </span>
                            to Technical Debt
                        </h1>

                        <div className="max-w-4xl mx-auto mb-12">
                            <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-6">
                                While competitors ship features in days, your engineering team is stuck in 3-week deployment cycles.
                                Your architecture decisions from 18 months ago are now your biggest competitive disadvantage.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We fix this without stopping feature development. The same systematic approach that helped <strong>47 post-Series A companies</strong> scale from $5M to $50M+ ARR without complete system rebuilds.
                            </p>
                        </div>
                    </motion.div>

                    {/* Proof Metrics with Impact Context */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
                    >
                        {[
                            {
                                metric: "47 Companies",
                                context: "Series A → Profitable",
                                detail: "Without rebuilding from scratch",
                                icon: TrendingUp,
                                color: "emerald"
                            },
                            {
                                metric: "$2.3M Avg",
                                context: "Technical Debt ROI",
                                detail: "18-month measured impact",
                                icon: Zap,
                                color: "blue"
                            },
                            {
                                metric: "Zero Downtime",
                                context: "Migration Track Record",
                                detail: "99.99% uptime maintained",
                                icon: Shield,
                                color: "emerald"
                            },
                            {
                                metric: "6x Faster",
                                context: "Deploy Velocity",
                                detail: "From commit to production",
                                icon: Clock,
                                color: "blue"
                            }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    onHoverStart={() => setHoveredMetric(index)}
                                    onHoverEnd={() => setHoveredMetric(null)} className={`text-center p-6 bg-white rounded-2xl border transition-all duration-300 cursor-pointer
                                        ${hoveredMetric === index
                                            ? 'border-slate-300 shadow-xl scale-105'
                                            : 'border-slate-200 shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-slate-100">
                                        <Icon className="w-6 h-6 text-slate-700" />
                                    </div>
                                    <div className="text-2xl font-bold mb-2 text-slate-900">
                                        {item.metric}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-700 mb-1">
                                        {item.context}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {item.detail}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Premium Call-to-Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">                            <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                        >
                            <span className="flex items-center text-lg">
                                Get $50K+ Debt Assessment (Free)
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </motion.button>

                            <div className="text-center sm:text-left">
                                <div className="text-sm text-slate-600 font-medium mb-1">30-minute analysis</div>
                                <div className="text-xs text-slate-500">Identify your top 3 architecture bottlenecks</div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 underline decoration-slate-300 hover:decoration-slate-600 underline-offset-4">
                                See case studies: How Klarna reduced deploy time by 85%
                            </button>
                        </div>
                    </motion.div>

                    {/* Trust Indicators with Specificity */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="border-t border-slate-200 pt-12"
                    >
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-8 mb-6">                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                                <span>Ex-Uber/Stripe/Airbnb Engineers</span>
                            </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                                    <span>SOC 2 Type II Certified</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                                    <span>$500M+ ARR Collectively Scaled</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mb-6 font-medium tracking-wide uppercase">
                                Vetted by Series B+ CTOs
                            </p>
                        </div>

                        {/* Placeholder for company logos - more sophisticated than generic bars */}
                        <div className="flex items-center justify-center gap-12 opacity-40">
                            <div className="h-8 w-24 bg-slate-300 rounded"></div>
                            <div className="h-8 w-32 bg-slate-300 rounded"></div>
                            <div className="h-8 w-28 bg-slate-300 rounded"></div>
                            <div className="h-8 w-36 bg-slate-300 rounded"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
