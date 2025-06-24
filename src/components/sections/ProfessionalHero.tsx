'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    ArrowRight,
    TrendingUp,
    Users,
    Target,
    Award,
    CheckCircle,
    Clock,
    Zap,
    DollarSign,
    Calculator,
    Star,
    Globe,
    Shield
} from 'lucide-react'

interface StatItem {
    value: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    description: string
}

interface TrustIndicator {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface SocialProofItem {
    company: string
    metric: string
    improvement: string
    timeframe: string
}

export function ProfessionalHero() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const stats: StatItem[] = [
        {
            value: "300%",
            label: "Average conversion increase",
            icon: TrendingUp,
            description: "Typical improvement in 90 days"
        },
        {
            value: "47 days",
            label: "Average time to positive ROI",
            icon: Clock,
            description: "From project start to measurable returns"
        },
        {
            value: "$2.4M",
            label: "Average savings identified",
            icon: DollarSign,
            description: "In wasted digital spending"
        },
        {
            value: "94%",
            label: "Project success rate",
            icon: Target,
            description: "Exceeding projected ROI targets"
        }
    ]

    const trustIndicators: TrustIndicator[] = [
        { icon: Shield, text: "100% Guaranteed Results" },
        { icon: Award, text: "Fortune 500 Trusted" },
        { icon: Globe, text: "Global Expertise" }
    ]

    const socialProof: SocialProofItem[] = [
        {
            company: "TechCorp Solutions",
            metric: "Revenue increase",
            improvement: "+420%",
            timeframe: "3 months"
        },
        {
            company: "Digital Dynamics",
            metric: "Cost reduction",
            improvement: "-65%",
            timeframe: "2 months"
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const floatingVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    return (<section
        ref={ref}
        className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />                {/* Floating Orbs */}
            <div className="absolute w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse" style={{ top: '20%', left: '10%' }} />
            <div className="absolute w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ top: '60%', right: '15%', animationDelay: '1s' }} />
            <div className="absolute w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse" style={{ bottom: '30%', left: '80%', animationDelay: '2s' }} />

            {/* Enhanced floating elements with motion */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -100 }}
                animate={{
                    opacity: isInView ? 0.15 : 0,
                    scale: isInView ? 1 : 0.8,
                    x: isInView ? 0 : -100,
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 2,
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-96 h-96 -top-48 -left-48 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{
                    opacity: isInView ? 0.1 : 0,
                    scale: isInView ? 1 : 0.8,
                    x: isInView ? 0 : 100,
                    rotate: [0, -15, 15, 0],
                }}
                transition={{
                    duration: 2.5,
                    delay: 0.5,
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-80 h-80 -bottom-40 -right-40 rounded-full bg-gradient-to-br from-accent/8 to-primary/8 blur-3xl"
            />
        </div>

        {/* Main Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
            <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex-1 max-w-3xl"
                >
                    {/* Primary Content */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="space-y-6">
                            {/* Status Badge */}
                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
                            >
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                />
                                Digital Performance Consulting • Guaranteed Results
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6"
                            >
                                <span className="block text-foreground/90 font-light">We Transform</span>
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-normal relative">
                                    Digital Chaos
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: isInView ? 1 : 0 }}
                                        transition={{ duration: 1, delay: 1.2 }}
                                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                                    />
                                </span>
                                <span className="block text-foreground/90 font-light">into Revenue</span>
                            </motion.h1>

                            {/* Value Proposition */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    Stop bleeding money on failed digital projects. We deliver{' '}
                                    <strong className="text-primary font-semibold">self-funding transformations</strong>
                                    {' '}that pay for themselves within 90 days.
                                </p>
                                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                                    <Zap className="w-5 h-5" />
                                    <span>94% of our projects generate positive ROI within 47 days</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Call-to-Action Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-lg group"
                            >
                                <span>Stop Wasting Money - Free Analysis</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-lg"
                            >
                                Emergency Intervention
                            </motion.button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-6 pt-4"
                        >
                            {trustIndicators.map((indicator, index) => {
                                const Icon = indicator.icon
                                return (
                                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Icon className="w-4 h-4 text-emerald-500" />
                                        <span>{indicator.text}</span>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Stats & Social Proof */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex-1 max-w-2xl"
                >
                    {/* Stats Grid */}
                    <motion.div
                        variants={floatingVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-2xl font-bold text-primary mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm font-medium text-foreground mb-2">
                                                {stat.label}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {stat.description}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        variants={floatingVariants}
                        className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-foreground">Recent Success Stories</span>
                        </div>
                        <div className="space-y-4">
                            {socialProof.slice(0, 2).map((proof, index) => (
                                <div key={index} className="border-l-2 border-primary/20 pl-4">
                                    <div className="text-sm font-medium text-foreground">
                                        {proof.company}
                                    </div>
                                    <div className="text-lg font-bold text-primary">
                                        {proof.metric} {proof.improvement}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {proof.timeframe}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </section>
    )
}
