'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap,
    Target,
    CheckCircle,
    Clock,
    DollarSign,
    ArrowRight,
    Shield,
    ExternalLink
} from 'lucide-react'

interface ServiceTier {
    id: string
    name: string
    price: number
    timeline: string
    description: string
    features: string[]
    guarantee: string
    cta: string
    popular?: boolean
}

export function ValueStaircase() {
    const [selectedTier, setSelectedTier] = useState<string | null>(null)

    const services: ServiceTier[] = [
        {
            id: 'audit',
            name: 'Performance Audit',
            price: 470,
            timeline: '48-72 hours',
            description: 'Comprehensive site analysis with actionable recommendations',
            features: [
                'Complete performance analysis',
                'Mobile & desktop optimization report',
                'Revenue impact calculation',
                'Priority fix recommendations',
                'Implementation roadmap'
            ],
            guarantee: '100% money-back if no issues found',
            cta: 'Get Audit Report',
            popular: true
        },
        {
            id: 'optimization',
            name: 'Full Optimization',
            price: 1870,
            timeline: '1-2 weeks',
            description: 'Complete performance optimization implementation',
            features: [
                'Everything in Audit',
                'Full implementation of fixes',
                'Core Web Vitals optimization',
                'Mobile experience enhancement',
                '30-day performance monitoring'
            ],
            guarantee: 'Guaranteed performance improvement',
            cta: 'Start Optimization'
        },
        {
            id: 'ongoing',
            name: 'Ongoing Partnership',
            price: 2970,
            timeline: 'Monthly',
            description: 'Continuous monitoring and optimization',
            features: [
                'Everything in Optimization',
                'Monthly performance reviews',
                'Continuous optimization',
                'Priority support',
                'Quarterly strategy updates'
            ],
            guarantee: 'Cancel anytime, no questions asked',
            cta: 'Start Partnership'
        }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Stop losing money to slow sites
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Choose your path to faster performance and higher conversions
                    </p>
                </motion.div>

                {/* Service Tiers */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                                relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer
                                ${service.popular ? 'border-blue-500 shadow-2xl scale-105' : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'}
                                ${selectedTier === service.id ? 'ring-4 ring-blue-500/20' : ''}
                            `}
                            onClick={() => setSelectedTier(selectedTier === service.id ? null : service.id)}
                            whileHover={{ y: -5 }}
                        >
                            {/* Popular Badge */}
                            {service.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    Most Popular
                                </div>
                            )}

                            {/* Header */}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-3xl font-bold text-slate-900">${service.price}</span>
                                    {service.id === 'ongoing' && <span className="text-slate-500">/month</span>}
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{service.timeline}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-600 text-center mb-6">{service.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-6">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Guarantee */}
                            <div className="flex items-center gap-2 text-sm text-slate-600 mb-6 p-3 bg-slate-50 rounded-lg">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span>{service.guarantee}</span>
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2
                                    ${service.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                    }
                                `}
                            >
                                {service.cta}
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>30-day guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>Proven results</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-green-500" />
                            <span>Fast delivery</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
