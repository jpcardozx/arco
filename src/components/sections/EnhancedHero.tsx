'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Clock,
    DollarSign,
    Target,
    ArrowRight,
    Shield,
    Award,
    Globe,
    CheckCircle,
    Star,
    Users,
    Zap
} from 'lucide-react'

interface StatItem {
    value: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    description: string
    color: string
}

export function EnhancedHero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const stats: StatItem[] = [
        {
            value: "300%",
            label: "Average conversion increase",
            icon: TrendingUp,
            description: "Typical improvement in 90 days",
            color: "primary"
        },
        {
            value: "47 days",
            label: "Average time to positive ROI",
            icon: Clock,
            description: "From project start to measurable returns",
            color: "accent"
        },
        {
            value: "$2.4M",
            label: "Average savings identified",
            icon: DollarSign,
            description: "In wasted digital spending",
            color: "primary"
        },
        {
            value: "94%",
            label: "Project success rate",
            icon: Target,
            description: "Exceeding projected ROI targets",
            color: "accent"
        }
    ]

    const trustIndicators = [
        { icon: Shield, text: "100% Guaranteed Results", color: "text-accent-600" },
        { icon: Award, text: "Fortune 500 Trusted", color: "text-primary-600" },
        { icon: Globe, text: "Global Expertise", color: "text-neutral-600" }
    ]

    const socialProof = [
        { company: "TechCorp", metric: "+420% Revenue", timeframe: "3 months" },
        { company: "DigitalDynamics", metric: "-65% Costs", timeframe: "2 months" },
        { company: "InnovateLabs", metric: "+180% Efficiency", timeframe: "6 weeks" }
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
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section className="section-hero">
            <div className="container-custom">
                <motion.div
                    className="text-center max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Trust Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-8 shadow-soft"
                        variants={itemVariants}
                    >
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-neutral-700">
                            Trusted by 500+ Enterprise Leaders
                        </span>
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white" />
                            ))}
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        className="heading-xl text-neutral-900 mb-6"
                        variants={itemVariants}
                    >
                        Stop Wasting on{' '}
                        <span className="text-gradient">Failed Digital Projects</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-xl md:text-2xl text-neutral-600 mb-4 max-w-4xl mx-auto font-light"
                        variants={itemVariants}
                    >
                        ARCO delivers self-funding transformations with guaranteed ROI.{' '}
                        <strong className="text-neutral-800">94% of projects pay for themselves within 47 days.</strong>
                    </motion.p>

                    {/* Emergency CTA */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl px-6 py-3 mb-12"
                        variants={itemVariants}
                    >
                        <Zap className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 font-semibold">Emergency intervention available</span>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-8 mb-12"
                        variants={itemVariants}
                    >
                        {trustIndicators.map((indicator, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 group"
                            >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-white to-neutral-50 shadow-soft group-hover:shadow-medium transition-all duration-300">
                                    <indicator.icon className={`w-5 h-5 ${indicator.color}`} />
                                </div>
                                <span className="font-semibold text-neutral-700">{indicator.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                        variants={itemVariants}
                    >
                        <button className="btn btn-primary btn-lg group">
                            Get Emergency Intervention
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn btn-secondary btn-lg">
                            Calculate Your ROI
                        </button>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto"
                        variants={itemVariants}
                    >
                        {socialProof.map((proof, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-4 text-center group hover:glow transition-all duration-300"
                            >
                                <div className="text-2xl font-bold text-neutral-900 mb-1">{proof.metric}</div>
                                <div className="text-sm text-neutral-600 mb-1">{proof.company}</div>
                                <div className="text-xs text-neutral-500">in {proof.timeframe}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="card-stat group"
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${stat.color === 'primary'
                                    ? 'bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300'
                                    : 'bg-gradient-to-br from-accent-100 to-accent-200 group-hover:from-accent-200 group-hover:to-accent-300'
                                } transition-all duration-300`}>
                                <stat.icon className={`w-8 h-8 ${stat.color === 'primary' ? 'text-primary-600' : 'text-accent-600'
                                    }`} />
                            </div>

                            <div className="text-4xl font-bold text-neutral-900 mb-3">{stat.value}</div>
                            <div className="text-lg font-semibold text-neutral-800 mb-3">{stat.label}</div>
                            <div className="text-sm text-neutral-600 leading-relaxed">{stat.description}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="inline-flex items-center gap-2 text-neutral-600 mb-4">
                        <CheckCircle className="w-4 h-4 text-accent-500" />
                        <span className="text-sm">No upfront costs • Results guaranteed • 30-day transformation</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
