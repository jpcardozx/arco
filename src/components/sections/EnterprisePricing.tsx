'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, DollarSign, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

/**
 * Enterprise Pricing Component
 * 
 * Professional service tiers with transparent value progression
 * and enterprise-appropriate pricing levels.
 */

interface ServiceTier {
    name: string
    price: string
    description: string
    popular?: boolean
    features: string[]
    deliverables: string[]
    timeline: string
    guarantee: string
    ctaText: string
    ctaLink: string
}

interface InvestmentBenefit {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
}

const serviceTiers: ServiceTier[] = [
    {
        name: 'Infrastructure Assessment',
        price: '$4,500',
        description: 'Comprehensive 10-day analysis with strategic roadmap',
        popular: true,
        features: [
            'Complete technical discovery and baseline',
            'Business impact analysis with ROI projections',
            'Prioritized optimization roadmap',
            'Executive presentation (C-level appropriate)',
            '90-day implementation timeline',
            'Interactive monitoring dashboard'
        ],
        deliverables: [
            '25-page detailed technical report',
            '3-page executive summary',
            'ROI calculator with scenario modeling',
            'Implementation playbook',
            'Performance monitoring setup'
        ],
        timeline: '10 business days',
        guarantee: 'Actionable insights with clear ROI path or full refund',
        ctaText: 'Request Assessment',
        ctaLink: '/diagnose'
    },
    {
        name: 'Strategic Implementation',
        price: '$25,000 - $75,000',
        description: 'Full optimization execution with performance guarantees',
        features: [
            'Everything in Infrastructure Assessment',
            'Complete implementation of recommendations',
            'Performance engineering and optimization',
            'Team training and knowledge transfer',
            'Change management support',
            'Ongoing monitoring and adjustment'
        ],
        deliverables: [
            'Optimized infrastructure architecture',
            'Performance targets achievement',
            'Team capability development',
            'Documentation and procedures',
            '6-month support and optimization'
        ],
        timeline: '6-12 weeks',
        guarantee: 'Performance targets met or continued work at no cost',
        ctaText: 'Discuss Implementation',
        ctaLink: '/contact'
    },
    {
        name: 'Ongoing Optimization',
        price: '$8,000 - $15,000/month',
        description: 'Continuous improvement with dedicated expertise',
        features: [
            'Quarterly infrastructure assessments',
            'Continuous performance monitoring',
            'Monthly optimization recommendations',
            'Priority support and consultation',
            'Technology stack evolution planning',
            'Industry benchmarking reports'
        ],
        deliverables: [
            'Monthly optimization reports',
            'Quarterly strategic reviews',
            'Performance trend analysis',
            'Technology roadmap updates',
            'Best practices documentation'
        ],
        timeline: 'Ongoing engagement',
        guarantee: 'Sustained performance improvement or service adjustment',
        ctaText: 'Explore Partnership',
        ctaLink: '/partnership'
    }
]

const investmentBenefits: InvestmentBenefit[] = [
    {
        title: 'Transparent ROI Methodology',
        description: 'Every recommendation includes detailed cost-benefit analysis with conservative projections',
        icon: TrendingUp
    },
    {
        title: 'Performance Guarantees',
        description: 'Specific metrics with financial backing ensure accountability and risk mitigation',
        icon: Shield
    },
    {
        title: 'Fixed-Fee Predictability',
        description: 'No scope creep or hourly billing uncertainties - transparent investment planning',
        icon: DollarSign
    }
]

export function EnterprisePricing() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    }

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-20"
                >
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-full px-6 py-3 mb-8">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-700 font-medium">
                                Investment-Grade Service Architecture
                            </span>
                        </div>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight"
                    >
                        Progressive Value
                        <br />
                        <span className="text-blue-600">Architecture</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
                    >
                        Start with comprehensive assessment, scale to full implementation.
                        <strong className="text-slate-800"> Each tier delivers measurable value</strong>
                        with transparent ROI and performance guarantees.
                    </motion.p>
                </motion.div>

                {/* Service Tiers */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid lg:grid-cols-3 gap-8 mb-20"
                >
                    {serviceTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${tier.popular
                                    ? 'border-blue-500 ring-4 ring-blue-100 scale-105'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Recommended Start
                                    </div>
                                </div>
                            )}

                            {/* Tier Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                    {tier.name}
                                </h3>
                                <div className="text-4xl font-bold text-blue-600 mb-3">
                                    {tier.price}
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {tier.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                                    Service Features
                                </h4>
                                <ul className="space-y-3">
                                    {tier.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Deliverables */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                                    Key Deliverables
                                </h4>
                                <ul className="space-y-2">
                                    {tier.deliverables.map((deliverable, deliverableIndex) => (
                                        <li key={deliverableIndex} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-slate-600 text-sm">{deliverable}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Timeline & Guarantee */}
                            <div className="space-y-4 mb-8">
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-slate-600" />
                                        <span className="text-sm font-semibold text-slate-800">
                                            Timeline
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600">{tier.timeline}</p>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-semibold text-green-800">
                                            Performance Guarantee
                                        </span>
                                    </div>
                                    <p className="text-sm text-green-700">{tier.guarantee}</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={tier.ctaLink}
                                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 group flex items-center justify-center gap-3 ${tier.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                                        }`}
                                >
                                    {tier.ctaText}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Investment Benefits */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="mb-20"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Investment Protection Framework
                        </h3>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Enterprise-grade accountability with transparent methodologies and measurable outcomes.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {investmentBenefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                                    <benefit.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-4">
                                    {benefit.title}
                                </h4>
                                <p className="text-slate-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Value Progression */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 text-center text-white"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">
                            Client Success Progression
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-blue-300">
                                    Assessment to Implementation
                                </h4>
                                <p className="text-slate-200 mb-4">
                                    65% of assessment clients proceed to full implementation within 90 days
                                </p>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li>• Clear ROI validation through assessment</li>
                                    <li>• Risk mitigation through phased approach</li>
                                    <li>• Established working relationship and trust</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-blue-300">
                                    Implementation to Partnership
                                </h4>
                                <p className="text-slate-200 mb-4">
                                    40% of implementation clients engage ongoing optimization services
                                </p>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li>• Sustained competitive advantage</li>
                                    <li>• Continuous technology evolution</li>
                                    <li>• Dedicated expertise and priority support</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
