'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, DollarSign, Calendar, ArrowRight, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function OfferSection() {
    const phases = [
        {
            title: 'Reserve Slot',
            price: '$300',
            payment: 'BNPL/PayPal 4×',
            guarantee: 'Refundable if we don\'t accept your project within 7 days',
            features: [
                'Project evaluation & approval',
                'Technical feasibility assessment',
                'Custom optimization roadmap',
                'Priority queue placement'
            ],
            cta: 'Reserve Now',
            urgent: true
        },
        {
            title: 'Site Reboot Lite',
            price: '$900',
            payment: 'On go-live',
            guarantee: 'Mobile LCP < 1.4s or 110% refund',
            features: [
                'PSI score +40 points minimum',
                'Mobile LCP under 1.4s guaranteed',
                'Annual cost reduction ≥ $400',
                'Core Web Vitals optimization',
                'Image & script optimization',
                'Caching implementation'
            ],
            sla: [
                'LCP mobile lab < 1.4s',
                'PSI +40 pts minimum',
                'Cost reduction ≥ $400/year'
            ],
            cta: 'Learn More',
            popular: true
        },
        {
            title: 'Growth Care 90d',
            price: '$400/mo',
            payment: 'Monthly',
            guarantee: 'CRO + schema + blog optimization',
            features: [
                'Conversion rate optimization',
                'Schema markup implementation',
                'SEO blog content strategy',
                'A/B testing setup',
                'Performance monitoring',
                'Monthly optimization reports'
            ],
            cta: 'Add Upsell',
            addon: true
        }
    ]

    const riskMitigations = [
        {
            risk: 'Performance doesn\'t meet targets',
            solution: '110% money-back guarantee',
            confidence: '99%'
        },
        {
            risk: 'Project takes longer than expected',
            solution: 'Fixed timeline with daily updates',
            confidence: '95%'
        },
        {
            risk: 'Technical complications',
            solution: 'Pre-approval technical audit',
            confidence: '97%'
        }
    ]

    return (
        <SectionWrapper background="white" spacing="normal" id="offer">
            <SectionHeader
                eyebrow="Site Reboot Lite Program"
                title="Guaranteed results or 110% refund"
                description="Purpose-built for hotels & dental clinics. Fixed pricing, guaranteed outcomes, minimal risk."
                align="center"
                size="md"
            />

            {/* Main Offer Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {phases.map((phase, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative bg-white rounded-2xl border-2 p-8 ${phase.popular
                                ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-105'
                                : phase.urgent
                                    ? 'border-orange-500 shadow-xl shadow-orange-500/20'
                                    : 'border-gray-200 shadow-lg'
                            }`}
                    >
                        {/* Badge */}
                        {phase.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                    MOST POPULAR
                                </span>
                            </div>
                        )}

                        {phase.urgent && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                    LIMITED SLOTS
                                </span>
                            </div>
                        )}

                        {phase.addon && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                    UPSELL
                                </span>
                            </div>
                        )}

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {phase.title}
                            </h3>
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {phase.price}
                            </div>
                            <p className="text-sm text-gray-600">{phase.payment}</p>
                        </div>

                        {/* Guarantee */}
                        <div className={`p-4 rounded-lg mb-6 ${phase.popular ? 'bg-blue-50 border border-blue-200' :
                                phase.urgent ? 'bg-orange-50 border border-orange-200' :
                                    'bg-gray-50 border border-gray-200'
                            }`}>
                            <p className={`text-sm font-medium ${phase.popular ? 'text-blue-900' :
                                    phase.urgent ? 'text-orange-900' :
                                        'text-gray-900'
                                }`}>
                                {phase.guarantee}
                            </p>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-6">
                            {phase.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${phase.popular ? 'text-blue-600' :
                                            phase.urgent ? 'text-orange-600' :
                                                'text-green-600'
                                        }`} />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* SLA (for main offer) */}
                        {phase.sla && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-green-900 mb-2 text-sm">Guaranteed SLA:</h4>
                                <ul className="space-y-1">
                                    {phase.sla.map((item, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                            <Shield className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-green-800">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <Link
                            href={phase.urgent ? "#reserve" : phase.popular ? "#details" : "#upsell"}
                            className={`block w-full text-center py-4 rounded-xl font-bold transition-all duration-300 ${phase.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                    : phase.urgent
                                        ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            {phase.cta}
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Risk Mitigation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Risk Mitigation & Guarantees
                    </h3>
                    <p className="text-gray-600">
                        We've eliminated the typical risks of performance optimization projects
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {riskMitigations.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center space-x-2 mb-3">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                <span className="font-semibold text-gray-900 text-sm">Risk</span>
                            </div>
                            <p className="text-gray-700 mb-4 text-sm">{item.risk}</p>

                            <div className="flex items-center space-x-2 mb-3">
                                <Shield className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-gray-900 text-sm">Solution</span>
                            </div>
                            <p className="text-gray-700 mb-4 text-sm">{item.solution}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Confidence Level</span>
                                <span className="text-lg font-bold text-green-600">{item.confidence}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-16"
            >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                    <h3 className="text-3xl font-bold mb-4">
                        Ready to eliminate slow speeds?
                    </h3>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join the queue with just $300. Refundable if we can't deliver the results.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="#reserve"
                            className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                        >
                            <DollarSign className="w-5 h-5" />
                            <span>Reserve Your Slot Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>7-day approval</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Shield className="w-4 h-4" />
                                <span>110% guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </SectionWrapper>
    )
}
