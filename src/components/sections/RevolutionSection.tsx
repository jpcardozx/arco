'use client'

import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { AlertTriangle, DollarSign, Clock, Zap, Target, Flame, TrendingDown } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function RevolutionSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    // Animated counter component
    const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
        const countRef = useRef<HTMLSpanElement>(null)

        useGSAP(() => {
            if (isInView && countRef.current) {
                gsap.fromTo(countRef.current,
                    { textContent: 0 },
                    {
                        textContent: end,
                        duration,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        onUpdate: function () {
                            if (countRef.current) {
                                countRef.current.textContent = Math.floor(Number(this.targets()[0].textContent)).toLocaleString() + suffix
                            }
                        }
                    }
                )
            }
        }, [isInView])

        return <span ref={countRef}>0{suffix}</span>
    }

    const problems = [
        {
            icon: Flame,
            title: "Your Tools Are Bleeding Money",
            problem: "Companies waste $127K annually on redundant SaaS subscriptions",
            solution: "We consolidate 15+ tools into 3 custom solutions",
            savings: "$89K",
            color: "from-red-500 to-orange-500",
            bgColor: "bg-red-500/10"
        },
        {
            icon: Clock,
            title: "Development Hell Never Ends",
            problem: "9-month projects that take 2+ years and deliver 40% of promises",
            solution: "4-8 week guaranteed delivery with full feature completion",
            savings: "18 Months",
            color: "from-orange-500 to-yellow-500",
            bgColor: "bg-orange-500/10"
        },
        {
            icon: TrendingDown,
            title: "Features That Users Ignore",
            problem: "73% of features are never used because they don't solve real problems",
            solution: "User-obsessed design that increases engagement by 340%",
            savings: "73%",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10"
        },
        {
            icon: AlertTriangle,
            title: "Technical Debt Avalanche",
            problem: "Legacy systems that crash, scale poorly, and cost $23K/month to maintain",
            solution: "Modern architecture that reduces maintenance costs by 89%",
            savings: "$276K",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10"
        }
    ]

    const testimonials = [
        {
            quote: "They eliminated $143K in tool costs and built something 10x better. ROI was instant.",
            author: "Sarah Chen",
            role: "CTO, TechFlow",
            avatar: "SC"
        },
        {
            quote: "Finally, a dev team that actually delivers on time. 6 weeks vs 2 years. Incredible.",
            author: "Marcus Rodriguez",
            role: "CEO, GrowthLabs",
            avatar: "MR"
        },
        {
            quote: "Our users went from ignoring features to being obsessed. Engagement up 400%.",
            author: "Emily Zhang",
            role: "Product Lead, StartupX",
            avatar: "EZ"
        }
    ]

    return (
        <motion.section
            id="revolution-section"
            ref={sectionRef}
            style={{ y, opacity }}
            className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Shocking stats header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-red-400/30 mb-8"
                        whileHover={{ scale: 1.05 }}
                    >
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300 font-semibold">The Hidden Disaster</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Your Company Is{' '}
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            Hemorrhaging Money
                        </span>
                        <br />
                        On Digital "Solutions"
                    </h2>

                    <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-12">
                        While you're stuck in vendor hell, your competitors are{' '}
                        <span className="text-emerald-400 font-semibold">racing ahead with custom solutions</span>{' '}
                        that actually work.
                    </p>

                    {/* Shocking stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-400/20"
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <DollarSign className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <div className="text-4xl font-black text-red-400 mb-2">
                                $<AnimatedCounter end={2400000} suffix="" />
                            </div>
                            <div className="text-slate-300 font-medium">Wasted annually on failed projects</div>
                        </motion.div>

                        <motion.div
                            className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/20"
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <Clock className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                            <div className="text-4xl font-black text-orange-400 mb-2">
                                <AnimatedCounter end={67} suffix="%" />
                            </div>
                            <div className="text-slate-300 font-medium">Of projects fail or run over budget</div>
                        </motion.div>

                        <motion.div
                            className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20"
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <TrendingDown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <div className="text-4xl font-black text-purple-400 mb-2">
                                <AnimatedCounter end={89} suffix="%" />
                            </div>
                            <div className="text-slate-300 font-medium">Teams stuck in technical debt</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Problem/Solution Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {problems.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`${item.bgColor} backdrop-blur-sm rounded-3xl p-8 border border-white/10 group hover:border-white/20 transition-all duration-300`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color}`}>
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-red-500/20 rounded-xl p-4 border border-red-400/30">
                                    <div className="text-red-300 font-semibold mb-2">❌ The Problem:</div>
                                    <div className="text-slate-300">{item.problem}</div>
                                </div>

                                <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-400/30">
                                    <div className="text-emerald-300 font-semibold mb-2">✅ Our Solution:</div>
                                    <div className="text-slate-300">{item.solution}</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">{item.savings}</div>
                                    <div className="text-slate-400">Immediate Savings</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Social proof */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-12">
                        Companies That Stopped The Bleeding
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="mb-6">
                                    <div className="text-lg text-slate-300 italic mb-4">
                                        "{testimonial.quote}"
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.author}</div>
                                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <motion.button
                        className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center space-x-3">
                            <Target className="w-6 h-6" />
                            <span>Stop The Bleeding Now</span>
                            <Zap className="w-6 h-6" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    )
}
