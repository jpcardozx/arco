'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart3,
    Target,
    Users,
    Clock,
    TrendingUp,
    ArrowRight,
    CheckCircle,
    Zap,
    Shield
} from 'lucide-react'

interface ExecutiveService {
    id: string
    name: string
    category: string
    timeframe: string
    businessValue: string
    keyBenefits: string[]
    ideal: string
    cta: string
    featured?: boolean
    icon: React.ComponentType<{ className?: string }>
}

export function ValueStaircaseExecutive() {
    const [selectedService, setSelectedService] = useState<string>('assessment')

    const services: ExecutiveService[] = [
        {
            id: 'assessment',
            name: 'Revenue Leak Analysis',
            category: 'Immediate Insight',
            timeframe: '3-5 days',
            businessValue: 'Identify $50K-$500K in lost revenue opportunities',
            keyBenefits: [
                'Quantified revenue leak assessment',
                'Priority-ranked improvement roadmap',
                'Risk-free performance validation'
            ],
            ideal: 'C-level seeking data-driven performance insights',
            cta: 'Get Free Analysis',
            featured: false,
            icon: BarChart3
        },
        {
            id: 'optimization',
            name: 'Revenue Recovery',
            category: 'Direct Impact',
            timeframe: '2-4 weeks',
            businessValue: 'Self-funding improvements with 3-6x ROI',
            keyBenefits: [
                'Measurable conversion improvements',
                'Enhanced user experience',
                'Performance monitoring system'
            ],
            ideal: 'Organizations ready for immediate revenue transformation',
            cta: 'Start Recovery',
            featured: true,
            icon: Target
        },
        {
            id: 'partnership',
            name: 'Growth Partnership',
            category: 'Sustained Excellence',
            timeframe: 'Ongoing',
            businessValue: 'Continuous competitive advantage through optimization',
            keyBenefits: [
                'Monthly optimization cycles',
                'Proactive issue resolution',
                'Strategic performance leadership'
            ],
            ideal: 'Enterprises seeking long-term competitive advantage',
            cta: 'Discuss Partnership',
            featured: false,
            icon: TrendingUp
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/80 to-blue-50/90" />
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-200" />
                <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse animation-delay-400" />
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-600" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                            <Shield className="w-4 h-4" />
                            Value Progression System
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Choose Your Revenue Recovery Path
                        </h2>

                        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Executive-designed service progression that delivers measurable results
                            at every stage, from initial assessment to sustained growth partnership.
                        </p>
                    </motion.div>

                    {/* Service Cards */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            const isSelected = selectedService === service.id

                            return (
                                <motion.div
                                    key={service.id}
                                    layoutId={`service-${service.id}`}
                                    className={`bg-white rounded-2xl shadow-soft border transition-all duration-300 p-6 cursor-pointer ${isSelected
                                            ? 'border-primary-300 shadow-medium ring-2 ring-primary-100 scale-105'
                                            : 'border-neutral-200 hover:border-primary-200 hover:shadow-medium'
                                        } ${service.featured ? 'ring-2 ring-accent-200 border-accent-300' : ''}`}
                                    onClick={() => setSelectedService(service.id)}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Service Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center relative ${service.featured
                                                ? 'bg-gradient-to-br from-accent-100 to-accent-200'
                                                : 'bg-gradient-to-br from-primary-100 to-primary-200'
                                            }`}>
                                            <Icon className={`w-7 h-7 ${service.featured ? 'text-accent-600' : 'text-primary-600'
                                                }`} />
                                            {service.featured && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                                                    <Zap className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-primary-600 mb-1">{service.category}</div>
                                            <div className="flex items-center gap-1 text-xs text-neutral-500">
                                                <Clock className="w-3 h-3" />
                                                {service.timeframe}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Service Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-neutral-900">{service.name}</h3>

                                        <div className="text-neutral-600 font-medium">
                                            {service.businessValue}
                                        </div>

                                        {/* Key Benefits */}
                                        <div className="space-y-2">
                                            {service.keyBenefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-neutral-600">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Progressive Detail */}
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Users className="w-4 h-4 text-primary-600 mt-0.5" />
                                                        <span className="text-sm text-neutral-600">
                                                            Ideal for: {service.ideal}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Service CTA */}
                                    <div className="mt-6">
                                        <motion.button
                                            className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${service.featured
                                                    ? 'bg-accent-600 text-white hover:bg-accent-700 shadow-soft hover:shadow-medium'
                                                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-medium'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {service.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Bottom Summary */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 lg:p-12 shadow-soft border border-neutral-100 text-center"
                    >
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                            Not sure which path fits your needs?
                        </h3>
                        <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Every engagement starts with a complimentary strategic assessment
                            to determine the optimal approach for your organization.
                        </p>

                        <motion.button
                            className="btn btn-secondary btn-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Schedule Strategy Call
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
