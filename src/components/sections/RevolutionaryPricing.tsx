'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Zap, Rocket, Crown, ArrowRight, Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react'

export function RevolutionaryPricing() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const [selectedPlan, setSelectedPlan] = useState('revolution')

    const plans = [
        {
            id: 'audit',
            name: 'Reality Check',
            subtitle: 'See The Damage',
            price: 'FREE',
            originalPrice: '$2,500',
            description: 'Uncover exactly how much you\'re bleeding on digital disasters',
            icon: Calculator,
            color: 'from-slate-600 to-slate-700',
            borderColor: 'border-slate-600',
            textColor: 'text-slate-300',
            popular: false,
            features: [
                'Complete waste analysis',
                'Tool redundancy audit',
                'Performance bottleneck report',
                'ROI opportunity map',
                'Custom savings estimate',
                '30-minute consultation'
            ],
            excluded: [
                'Implementation',
                'Development work',
                'Ongoing support'
            ],
            cta: 'Get Free Audit',
            urgency: 'Limited: 5 audits per week'
        },
        {
            id: 'revolution',
            name: 'Full Revolution',
            subtitle: 'Transform Everything',
            price: '$0',
            subPrice: 'Pays for itself',
            originalPrice: '$150K+',
            description: 'Complete digital transformation that generates its own funding',
            icon: Rocket,
            color: 'from-blue-600 to-purple-600',
            borderColor: 'border-blue-500',
            textColor: 'text-blue-300',
            popular: true,
            features: [
                'Everything in Reality Check',
                'Complete custom development',
                'Tool consolidation & migration',
                'UX/UI revolution',
                'Performance optimization',
                'Team training & handoff',
                'Guaranteed ROI or money back',
                '6-month success guarantee'
            ],
            excluded: [],
            cta: 'Start Revolution',
            urgency: 'Next slot: January 15th'
        },
        {
            id: 'rescue',
            name: 'Emergency Rescue',
            subtitle: 'Crisis Intervention',
            price: '$25K',
            subPrice: '/week',
            originalPrice: '$50K+',
            description: 'For when everything is on fire and you need immediate action',
            icon: Crown,
            color: 'from-red-600 to-orange-600',
            borderColor: 'border-red-500',
            textColor: 'text-red-300',
            popular: false,
            features: [
                'Immediate crisis assessment',
                '24/7 emergency support',
                'Critical system stabilization',
                'Emergency patches & fixes',
                'Disaster prevention protocols',
                'Executive war room access'
            ],
            excluded: [
                'Long-term development',
                'UI/UX improvements',
                'Training programs'
            ],
            cta: 'Emergency Contact',
            urgency: 'Response: Within 2 hours'
        }
    ]

    const guarantees = [
        {
            icon: DollarSign,
            title: 'Self-Funding Guarantee',
            description: 'Your project pays for itself or you get your money back. Period.'
        },
        {
            icon: Clock,
            title: 'On-Time Delivery',
            description: 'We deliver on schedule or you get 25% off. No exceptions.'
        },
        {
            icon: TrendingUp,
            title: 'Performance Promise',
            description: 'We guarantee measurable improvements or we keep working for free.'
        }
    ]

    const selectedPlanData = plans.find(p => p.id === selectedPlan)

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-gradient-to-b from-slate-900 to-black overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-3 bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-400/30 mb-8"
                        whileHover={{ scale: 1.05 }}
                    >
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-green-300 font-semibold">Investment That Pays Back</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Stop Paying for{' '}
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            Digital Disasters
                        </span>
                        <br />
                        Start{' '}
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Profiting
                        </span>{' '}
                        From Solutions
                    </h2>

                    <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                        Unlike traditional agencies that cost money, we{' '}
                        <span className="text-emerald-400 font-semibold">make you money</span>.{' '}
                        Every project is designed to pay for itself.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            className={`relative bg-gradient-to-b ${plan.color} p-1 rounded-3xl ${plan.popular ? 'scale-105' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: plan.popular ? 1.08 : 1.05, y: -10 }}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full font-bold text-sm">
                                    🔥 MOST POPULAR
                                </div>
                            )}

                            <div className="bg-slate-900 rounded-3xl p-8 h-full">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <plan.icon className={`w-16 h-16 ${plan.textColor} mx-auto mb-4`} />
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-slate-400 text-sm mb-4">{plan.subtitle}</p>

                                    <div className="mb-4">
                                        <div className="flex items-baseline justify-center space-x-2">
                                            <span className="text-4xl font-black text-white">{plan.price}</span>
                                            {plan.subPrice && (
                                                <span className="text-slate-400">{plan.subPrice}</span>
                                            )}
                                        </div>
                                        {plan.originalPrice && (
                                            <div className="text-slate-500 line-through text-sm">
                                                Traditional cost: {plan.originalPrice}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-slate-300 text-sm">{plan.description}</p>
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-start space-x-3">
                                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-slate-300 text-sm">{feature}</span>
                                        </div>
                                    ))}

                                    {plan.excluded.map((excluded, excludedIndex) => (
                                        <div key={excludedIndex} className="flex items-start space-x-3 opacity-50">
                                            <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-slate-400 text-sm line-through">{excluded}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="space-y-4">
                                    <motion.button
                                        className={`w-full bg-gradient-to-r ${plan.color} text-white py-4 px-6 rounded-xl font-bold text-lg`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedPlan(plan.id)}
                                    >
                                        <span className="flex items-center justify-center space-x-2">
                                            <span>{plan.cta}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </motion.button>

                                    <div className="text-center">
                                        <div className={`text-xs ${plan.textColor} font-medium`}>
                                            {plan.urgency}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Guarantees */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {guarantees.map((guarantee, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <guarantee.icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-white mb-3">{guarantee.title}</h4>
                            <p className="text-slate-300">{guarantee.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ROI Calculator Teaser */}
                <motion.div
                    className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl p-12 border border-emerald-400/20 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Calculate Your Revolution ROI
                    </h3>
                    <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        Most companies save $127K+ annually while getting solutions 10x better than what they had.{' '}
                        <span className="text-emerald-400 font-semibold">What could you save?</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Average Tool Savings', value: '$127K', color: 'text-emerald-400' },
                            { label: 'Productivity Increase', value: '340%', color: 'text-blue-400' },
                            { label: 'Development Speed', value: '5x Faster', color: 'text-purple-400' },
                            { label: 'Payback Period', value: '2.1 Months', color: 'text-cyan-400' }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-4">
                                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                                <div className="text-slate-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center space-x-3">
                            <Calculator className="w-6 h-6" />
                            <span>Calculate My Savings</span>
                            <Zap className="w-6 h-6" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
