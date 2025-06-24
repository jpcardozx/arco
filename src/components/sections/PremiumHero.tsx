'use client'

import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BarChart3, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'import { createHref } from '@/utils/navigation';

// Strategic Efficiency Catalyst Hero Section
export function PremiumHero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(heroRef, { once: true })

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const stats = [
        { value: "3.2x", label: "Average ROI achieved by clients in first quarter", icon: TrendingUp },
        { value: "47 days", label: "Typical time to see measurable improvements", icon: BarChart3 },
        { value: "94%", label: "Client satisfaction with performance gains", icon: Users }
    ]

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('/subtle-grid.png')] opacity-[0.02]" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
            >
                <div className="text-center">                    {/* Positioning badge - softer approach */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-5 py-2 mb-8 border border-blue-200"
                    >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                            Performance Engineering for Growing Companies
                        </span>
                    </motion.div>

                    {/* Value-focused headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 leading-tight mb-6 tracking-tight"
                    >
                        Turn your tech stack into
                        <br />
                        <span className="font-normal text-blue-600">a competitive advantage</span>
                    </motion.h1>

                    {/* Outcome-focused value proposition */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
                    >
                        Companies like yours achieve 3x ROI by optimizing what they already have.
                        We help you get more performance from your existing investments — without adding complexity.
                    </motion.p>

                    {/* Social proof insight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12 max-w-3xl mx-auto"
                    >
                        <p className="text-lg text-green-800">
                            <span className="font-medium">"In 45 days, our mobile conversion went from 1.9% to 8.2%</span> —
                            not by adding new tools, but by optimizing what we already had."
                        </p>
                        <p className="text-sm text-green-600 mt-2">— Ipê Real Estate, $380k additional revenue</p>
                    </motion.div>

                    {/* Value-first CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link
                            href={createHref("/stack-calculator")}
                            className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Get Free Stack Efficiency Report
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href={createHref("/case-studies")}
                            className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all duration-300"
                        >
                            See real transformations
                        </Link>
                    </motion.div>

                    {/* Performance metrics - strategic presentation */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                                    <stat.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-3xl font-light text-slate-900 mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-600 leading-tight">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Subtle scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center"
                >
                    <div className="w-1 h-3 bg-slate-400 rounded-full mt-2" />
                </motion.div>
            </motion.div>
        </section>
    )
}


