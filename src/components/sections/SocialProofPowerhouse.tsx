'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, TrendingUp, Users, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export function SocialProofPowerhouse() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const [liveActivity, setLiveActivity] = useState(0)

    // Simulate live activity counter
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveActivity(prev => prev + Math.floor(Math.random() * 3) + 1)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const liveUpdates = [
        "TechCorp just saved $89K switching from 15 tools to 1 platform",
        "GrowthLab increased conversions by 340% with new UX",
        "StartupX eliminated 92% of bugs with modern architecture",
        "DataFlow reduced load time from 12s to 0.8s",
        "ScaleUp automated 80% of manual processes"
    ]

    const [currentUpdate, setCurrentUpdate] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentUpdate(prev => (prev + 1) % liveUpdates.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const testimonialCards = [
        {
            rating: 5,
            quote: "They eliminated $143K in tool costs and built something 10x better. ROI was instant.",
            author: "Sarah Chen",
            role: "CTO, TechFlow",
            company: "TechFlow Solutions",
            result: "$143K Saved",
            avatar: "SC",
            verified: true
        },
        {
            rating: 5,
            quote: "Finally, a dev team that actually delivers on time. 6 weeks vs 2 years. Incredible.",
            author: "Marcus Rodriguez",
            role: "CEO, GrowthLabs",
            company: "GrowthLabs Inc",
            result: "6 Week Delivery",
            avatar: "MR",
            verified: true
        },
        {
            rating: 5,
            quote: "Our users went from ignoring features to being obsessed. Engagement up 400%.",
            author: "Emily Zhang",
            role: "Product Lead, StartupX",
            company: "StartupX Commerce",
            result: "+400% Engagement",
            avatar: "EZ",
            verified: true
        },
        {
            rating: 5,
            quote: "The technical debt nightmare is over. Performance increased 10x overnight.",
            author: "Alex Kumar",
            role: "Lead Developer, DataFlow",
            company: "DataFlow Analytics",
            result: "10x Performance",
            avatar: "AK",
            verified: true
        }
    ]

    const stats = [
        {
            number: "50+",
            label: "Companies Transformed",
            icon: Users,
            color: "text-blue-400"
        },
        {
            number: "94%",
            label: "Projects Self-Fund",
            icon: TrendingUp,
            color: "text-emerald-400"
        },
        {
            number: "2.1M",
            label: "Waste Eliminated",
            icon: Zap,
            color: "text-purple-400"
        },
        {
            number: "47",
            label: "Average Days to ROI",
            icon: Clock,
            color: "text-cyan-400"
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-gradient-to-b from-black to-slate-950 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Live Activity Banner */}
                <motion.div
                    className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-300 font-semibold">LIVE</span>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentUpdate}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-white font-medium"
                                >
                                    🎉 {liveUpdates[currentUpdate]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="text-emerald-400 font-bold">
                            +{liveActivity + 247} companies this month
                        </div>
                    </div>
                </motion.div>

                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-3 bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/30 mb-8"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-300 font-semibold">Proven Results</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Join Companies That{' '}
                        <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Chose Results
                        </span>
                        <br />
                        Over Excuses
                    </h2>

                    <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                        These companies stopped accepting "that's just how it works" and{' '}
                        <span className="text-emerald-400 font-semibold">revolutionized their entire operation</span>.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                            <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                            <div className="text-slate-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {testimonialCards.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.author}</div>
                                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>

                                {testimonial.verified && (
                                    <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-green-300 text-xs font-medium">Verified</span>
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-lg text-slate-300 italic mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </blockquote>

                            {/* Result Badge */}
                            <div className="flex items-center justify-between">
                                <div className="text-slate-400 text-sm">{testimonial.company}</div>
                                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                                    {testimonial.result}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-400/20 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-8">
                        Why Companies Choose Us Over Traditional Agencies
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {[
                            {
                                title: "We Make You Money",
                                description: "Traditional agencies cost money. We generate profit that pays for the work.",
                                icon: TrendingUp,
                                color: "text-emerald-400"
                            },
                            {
                                title: "We Deliver Fast",
                                description: "4-8 weeks vs 12+ months. No endless consulting cycles or scope creep.",
                                icon: Zap,
                                color: "text-blue-400"
                            },
                            {
                                title: "We Guarantee Results",
                                description: "Money-back guarantee on ROI. Performance guarantees. Success or you don't pay.",
                                icon: CheckCircle,
                                color: "text-purple-400"
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 rounded-xl p-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <benefit.icon className={`w-12 h-12 ${benefit.color} mx-auto mb-4`} />
                                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                                <p className="text-slate-300">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center space-x-3">
                            <span>Join The Revolution</span>
                            <ArrowRight className="w-6 h-6" />
                        </span>
                    </motion.button>

                    <p className="text-slate-400 mt-4">
                        Next available slot: January 15th • 5 companies ahead of you
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
