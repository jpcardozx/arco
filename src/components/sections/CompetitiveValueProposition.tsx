'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, Clock, Shield, TrendingUp, CheckCircle, Target } from 'lucide-react'

export function CompetitiveValueProposition() {
    const [activeApproach, setActiveApproach] = useState(0)

    const approaches = [
        {
            problem: "Deployment Paralysis",
            situation: "Features take 3+ weeks to ship due to complex deployment pipelines",
            impact: "$200K+ monthly in lost velocity",
            solution: "Automated CI/CD with feature flags and zero-downtime deployments",
            timeline: "6-8 weeks",
            roi: "400% ROI in first quarter",
            icon: Clock,
            color: "emerald"
        },
        {
            problem: "Database Bottlenecks",
            situation: "Query performance degrades under load, blocking new features",
            impact: "Engineering team spends 40% time on performance firefighting",
            solution: "Read replicas, query optimization, and intelligent caching layers",
            timeline: "8-12 weeks",
            roi: "300% productivity increase",
            icon: TrendingUp,
            color: "blue"
        },
        {
            problem: "Scaling Infrastructure",
            situation: "AWS costs growing 20%+ monthly while performance degrades",
            impact: "$50K+ monthly in unnecessary cloud spend",
            solution: "Right-sized infrastructure with auto-scaling and cost optimization",
            timeline: "4-6 weeks",
            roi: "60% cost reduction maintained",
            icon: DollarSign,
            color: "emerald"
        }
    ]

    const competitiveEdge = [
        {
            advantage: "Ex-FAANG Engineering Leadership",
            description: "Architecture decisions tested at Uber, Stripe, and Airbnb scale",
            icon: Shield
        },
        {
            advantage: "Zero-Downtime Transformation",
            description: "47 consecutive migrations without business interruption",
            icon: Target
        },
        {
            advantage: "Measurable Business Impact",
            description: "$180M+ in measurable ROI across client transformations",
            icon: TrendingUp
        }
    ]

    return (
        <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
            {/* Clean Background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-96 h-96 bg-white/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-gray-100/30 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >                        <div className="inline-flex items-center px-4 py-2 bg-blue-900 border border-blue-200 rounded-full text-white text-sm font-medium mb-8 shadow-sm">
                            <Target className="w-4 h-4 mr-2" />
                            <span className="font-semibold">
                                Systematic Architecture Transformation • Proven ROI • Enterprise Grade
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            We Don't Just Fix Bugs.
                            <span className="block text-blue-700">
                                We Eliminate Competitive Disadvantages
                            </span>
                        </h2>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                            Your competitors are shipping features 6x faster because they solved these problems 12 months ago.
                            We bring that same systematic approach to your architecture—without the 18-month rebuild timeline.
                        </p>
                    </motion.div>

                    {/* Problem-Solution Matrix */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-20"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Approach Selector */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Common Growth Bottlenecks We Solve:</h3>
                                {approaches.map((approach, index) => {
                                    const Icon = approach.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setActiveApproach(index)}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${activeApproach === index
                                                ? 'bg-white border-emerald-300 shadow-xl'
                                                : 'bg-white/60 border-slate-200 hover:border-emerald-200 shadow-lg hover:shadow-xl'
                                                }`}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${approach.color === 'emerald' ? 'bg-emerald-100' : 'bg-blue-100'
                                                    }`}>
                                                    <Icon className={`w-6 h-6 ${approach.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                                        {approach.problem}
                                                    </h4>
                                                    <p className="text-sm text-slate-600 mb-2">
                                                        {approach.situation}
                                                    </p>
                                                    <div className="text-sm font-medium text-red-600">
                                                        Cost: {approach.impact}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Solution Details */}
                            <motion.div
                                key={activeApproach}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl"
                            >
                                <div className="mb-6">
                                    <h4 className="text-2xl font-bold text-slate-900 mb-4">
                                        Our Solution for {approaches[activeApproach].problem}
                                    </h4>
                                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                        {approaches[activeApproach].solution}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                                            {approaches[activeApproach].timeline}
                                        </div>
                                        <div className="text-sm text-emerald-700">Implementation</div>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            {approaches[activeApproach].roi}
                                        </div>
                                        <div className="text-sm text-blue-700">Measured Impact</div>
                                    </div>
                                </div>

                                <button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center group">
                                    Get Detailed Approach for This Problem
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Competitive Advantages */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                Why Series B+ CTOs Choose Us Over Consultants
                            </h3>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                We've solved these exact problems at scale. Our approach isn't theoretical—it's battle-tested at companies processing billions of requests.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {competitiveEdge.map((edge, index) => {
                                const Icon = edge.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                        className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full mb-6">
                                            <Icon className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-slate-900 mb-3">
                                            {edge.advantage}
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {edge.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
