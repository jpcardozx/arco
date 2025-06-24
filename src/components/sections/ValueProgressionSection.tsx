'use client'

import { motion } from 'framer-motion'
import {
    Search,
    Zap,
    Users,
    Clock,
    Target,
    TrendingUp,
    ArrowRight,
    CheckCircle,
    Phone
} from 'lucide-react'

interface ServiceTier {
    name: string
    timeline: string
    title: string
    description: string
    features: string[]
    icon: React.ComponentType<{ className?: string }>
    ctaText: string
    ctaStyle: 'primary' | 'accent' | 'secondary'
    idealFor: string
    pricing?: string
    badge?: string
}

export function ValueProgressionSection() {
    const serviceTiers: ServiceTier[] = [
        {
            name: "Immediate Insight",
            timeline: "3-5 days",
            title: "Revenue Leak Analysis",
            description: "Identify $50K-$500K in lost revenue opportunities with comprehensive analysis",
            features: [
                "Quantified revenue leak assessment with exact dollar impact",
                "Priority-ranked improvement roadmap with quick wins",
                "Risk-free performance validation and benchmarking",
                "Executive-ready strategic recommendations report"
            ],
            icon: Search,
            ctaText: "Get Free Analysis",
            ctaStyle: "secondary",
            idealFor: "C-level executives seeking data-driven performance insights and quick wins"
        },
        {
            name: "Direct Impact",
            timeline: "2-4 weeks",
            title: "Revenue Recovery",
            description: "Self-funding improvements with 3-6x ROI through targeted optimization",
            features: [
                "Measurable conversion improvements with real-time tracking",
                "Enhanced user experience with conversion-focused design",
                "Performance monitoring system with automated alerts",
                "Strategic optimization roadmap for sustained growth"
            ],
            icon: Zap,
            ctaText: "Start Recovery",
            ctaStyle: "primary",
            idealFor: "Organizations ready for immediate revenue transformation and growth"
        },
        {
            name: "Sustained Excellence",
            timeline: "Ongoing",
            title: "Growth Partnership",
            description: "Continuous competitive advantage through strategic optimization partnership",
            features: [
                "Monthly optimization cycles with proactive improvements",
                "Proactive issue resolution and performance monitoring",
                "Strategic performance leadership and market advantage",
                "Dedicated optimization team and executive reporting"
            ],
            icon: Users,
            ctaText: "Discuss Partnership",
            ctaStyle: "accent",
            idealFor: "Enterprises seeking long-term competitive advantage and market leadership"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Value Progression <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">System</span>
                        </h2>                        <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                            Choose Your Revenue Recovery Path
                        </h3>
                        <p className="text-xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
                            Executive-designed service progression that delivers measurable results at every stage,
                            from initial assessment to sustained growth partnership. Each tier builds upon the previous,
                            ensuring continuous value delivery and ROI optimization.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Service Tiers */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {serviceTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            className={`card relative overflow-hidden group ${index === 1 ? 'ring-2 ring-primary-200 scale-105' : ''
                                }`}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {index === 1 && (
                                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-2 text-sm font-semibold rounded-bl-xl">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-neutral-100 to-neutral-200' :
                                    index === 1 ? 'bg-gradient-to-br from-primary-100 to-primary-200' :
                                        'bg-gradient-to-br from-accent-100 to-accent-200'
                                    }`}>
                                    <tier.icon className={`w-8 h-8 ${index === 0 ? 'text-neutral-600' :
                                        index === 1 ? 'text-primary-600' :
                                            'text-accent-600'
                                        }`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{tier.timeline}</span>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold text-neutral-900 mb-4">
                                {tier.title}
                            </h4>

                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                {tier.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                                <div className="text-sm text-neutral-600 mb-1">Ideal for:</div>
                                <div className="font-medium text-neutral-800">{tier.idealFor}</div>
                            </div>

                            <button className={`btn w-full ${tier.ctaStyle === 'primary' ? 'btn-primary' :
                                tier.ctaStyle === 'accent' ? 'btn-accent' :
                                    'btn-secondary'
                                }`}>
                                {tier.ctaText}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))
                    }
                </motion.div >

                {/* Bottom CTA */}
                < motion.div
                    className="text-center bg-white rounded-2xl p-12 shadow-soft"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Not sure which path fits your organization's needs?
                    </h3>
                    <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Every engagement starts with a complimentary strategic assessment to determine
                        the optimal approach for your organization. We'll analyze your current performance,
                        identify immediate opportunities, and recommend the perfect path forward.
                    </p>
                    <button className="btn btn-primary btn-lg">
                        <Phone className="w-5 h-5" />
                        Schedule Strategy Call
                    </button>
                </motion.div >
            </div >
        </section >
    )
}
