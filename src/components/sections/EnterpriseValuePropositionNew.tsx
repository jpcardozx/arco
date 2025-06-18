'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, TrendingUp, Zap, Target, CheckCircle, DollarSign } from 'lucide-react'

export function EnterpriseValueProposition() {
    const [activePhase, setActivePhase] = useState(0)

    const phases = [
        {
            title: 'Revenue Recovery Audit',
            timeline: '5 business days',
            investment: 'Complimentary',
            description: 'Comprehensive analysis identifying exactly where revenue is leaking and quantifying recovery potential.',
            outcome: 'Prioritized roadmap with quantified impact projections',
            icon: Target,
            features: [
                'Technical performance deep dive',
                'UX friction point mapping',
                'Conversion funnel analysis',
                'Revenue gap quantification'
            ],
            color: 'from-emerald-500 to-green-600'
        },
        {
            title: 'Architecture Modernization',
            timeline: '30-90 days',
            investment: 'ROI-based pricing',
            description: 'Transform legacy systems into scalable, high-performance infrastructure that supports exponential growth.',
            outcome: '10x performance improvements with 60% cost reduction',
            icon: Shield,
            features: [
                'Microservices migration strategy',
                'Cloud-native architecture',
                'DevOps automation pipeline',
                'Performance optimization'
            ],
            color: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'Growth Engineering',
            timeline: 'Ongoing partnership',
            investment: 'Success-based model',
            description: 'Continuous optimization and scaling of your technical growth engine with real-time monitoring.',
            outcome: 'Sustainable 40%+ quarter-over-quarter growth',
            icon: TrendingUp,
            features: [
                'A/B testing infrastructure',
                'Real-time analytics dashboard',
                'Conversion optimization',
                'Scalability engineering'
            ],
            color: 'from-purple-500 to-pink-600'
        }
    ]

    const differentiators = [
        {
            title: 'No Retainers',
            description: 'We\'re compensated based on measurable results, not billable hours',
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        {
            title: 'Technical + Business',
            description: 'Engineering excellence paired with growth strategy expertise',
            icon: Zap,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'Proven Methodology',
            description: 'Battle-tested framework across 47+ enterprise transformations',
            icon: Shield,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        }
    ]

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="text-emerald-600 font-semibold mb-4 tracking-wide uppercase text-lg">
                        How We Work
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                        Three-Phase Approach to
                        <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                            Predictable Growth
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        We don't just fix problems. We build systematic competitive advantages
                        that compound over time.
                    </p>
                </motion.div>

                {/* Phase Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-16"
                >
                    <div className="flex bg-white p-2 rounded-2xl border border-gray-200 shadow-lg">
                        {phases.map((phase, index) => (
                            <button
                                key={index}
                                onClick={() => setActivePhase(index)}
                                className={`relative px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${activePhase === index
                                        ? 'text-white'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {activePhase === index && (
                                    <motion.div
                                        layoutId="activePhase"
                                        className={`absolute inset-0 bg-gradient-to-r ${phase.color} rounded-xl`}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center space-x-2">
                                    {React.createElement(phase.icon, { className: "w-5 h-5" })}
                                    <span className="hidden sm:inline">{phase.title}</span>
                                    <span className="sm:hidden">Phase {index + 1}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Active Phase Details */}
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto mb-20"
                >
                    <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl p-8 lg:p-16">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Content */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${phases[activePhase].color}`}>
                                        {React.createElement(phases[activePhase].icon, { className: "w-8 h-8 text-white" })}
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                                            Phase {activePhase + 1}
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">
                                            {phases[activePhase].title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-xl text-gray-700 leading-relaxed">
                                    {phases[activePhase].description}
                                </p>

                                <div className="space-y-4">
                                    {phases[activePhase].features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                            <span className="text-lg text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Details & CTA */}
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                                        <Clock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                                        <div className="text-sm font-medium text-slate-600 mb-2">Timeline</div>
                                        <div className="text-xl font-bold text-slate-900">
                                            {phases[activePhase].timeline}
                                        </div>
                                    </div>
                                    <div className="text-center p-6 bg-emerald-50 rounded-2xl">
                                        <Target className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                                        <div className="text-sm font-medium text-emerald-600 mb-2">Investment</div>
                                        <div className="text-xl font-bold text-emerald-700">
                                            {phases[activePhase].investment}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200">
                                    <div className="text-sm font-semibold text-emerald-700 mb-3 uppercase tracking-wider">
                                        Expected Outcome
                                    </div>
                                    <div className="text-lg text-gray-800 font-semibold">
                                        {phases[activePhase].outcome}
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full group bg-gradient-to-r ${phases[activePhase].color} text-white font-semibold py-6 px-8 rounded-2xl hover:shadow-lg transition-all duration-300 text-lg`}
                                >
                                    <span className="flex items-center justify-center space-x-3">
                                        <span>Start This Phase</span>
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Differentiators */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <h3 className="text-3xl font-bold text-gray-900 mb-12">Why Enterprises Choose ARCO</h3>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {differentiators.map((diff, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 ${diff.bg} rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                                {React.createElement(diff.icon, { className: `w-12 h-12 ${diff.color} mx-auto mb-6` })}
                                <h4 className="text-xl font-bold text-gray-900 mb-4">
                                    {diff.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {diff.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
