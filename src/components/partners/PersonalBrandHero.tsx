'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, TrendingUp, DollarSign, Clock, CheckCircle, Star, Sparkles, ChevronDown } from 'lucide-react'
import Link from 'next/link'

// Types for stat and FloatingElement props
interface Stat {
    value: string;
    label: string;
    context: string;
    icon: React.ComponentType<any>;
}

interface StatItemProps {
    stat: Stat;
    isActive: boolean;
}

// Memoized stat item component for better performance
const StatItem: React.FC<StatItemProps> = React.memo(function StatItem({ stat, isActive }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className={`transition-all ${isActive ? 'block' : 'hidden'}`}
        >
            <div className="text-center py-8">
                <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {stat.value}
                </motion.div>
                <div className="text-slate-900 font-medium mb-1 text-lg">
                    {stat.label}
                </div>
                <div className="text-sm text-slate-500 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    {stat.context}
                </div>
            </div>
        </motion.div>
    )
})

StatItem.displayName = 'StatItem'

interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
}

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
)

export function PersonalBrandHero() {
    const [currentStat, setCurrentStat] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const heroRef = useRef<HTMLElement | null>(null)
    const isInView = useInView(heroRef, { once: true })

    const stats = [
        {
            value: "1.9% → 8.2%",
            label: "Mobile conversion improvement",
            context: "45 days",
            icon: TrendingUp
        },
        {
            value: "$380k",
            label: "Additional revenue generated",
            context: "6 weeks",
            icon: DollarSign
        },
        {
            value: "4.2s → 0.8s",
            label: "Load time optimization",
            context: "3 weeks",
            icon: Clock
        },
        {
            value: "287%",
            label: "Trial-to-paid improvement",
            context: "B2B SaaS",
            icon: CheckCircle
        }
    ]

    // Auto-rotate stats
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length)
        }, 3500)
        return () => clearInterval(interval)
    }, [stats.length])

    // Mouse tracking for parallax effect
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = heroRef.current?.getBoundingClientRect()
        if (rect) {
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            })
        }
    }, [])

    // Testimonials carousel
    const testimonials = [
        {
            quote: "João Pedro identified exactly where we were losing revenue. Fixed it in 45 days.",
            author: "CEO, Fintech Startup",
            initial: "F"
        },
        {
            quote: "Our conversion rate nearly tripled. Best investment we've made this year.",
            author: "CTO, E-commerce Platform",
            initial: "M"
        }
    ]

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 pt-14 overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
                <motion.div
                    className="absolute top-40 left-1/2 w-64 h-64 bg-amber-200/10 rounded-full blur-2xl"
                    animate={{
                        x: mousePosition.x * 50 - 25,
                        y: mousePosition.y * 50 - 25,
                    }}
                    transition={{ type: "spring", stiffness: 50 }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">

                {/* Main content grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <div className="relative">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                            </div>
                            <span className="text-emerald-700 text-sm font-medium ml-2">Available for new projects</span>
                            <Sparkles className="w-3 h-3 text-emerald-600 ml-1" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Hi, I'm{' '}
                            <span className="relative">
                                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    João Pedro
                                </span>
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-3 bg-emerald-200/40 -rotate-1"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "100%" } : {}}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                />
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                            I help <span className="font-semibold text-slate-800">$2M-$50M companies</span>{' '}
                            <motion.span
                                className="relative inline-block"
                                whileHover={{ scale: 1.05 }}
                            >
                                <strong className="text-slate-900 bg-gradient-to-r from-amber-100 to-amber-50 px-1 rounded">
                                    recover revenue lost to conversion friction
                                </strong>
                            </motion.span>.
                            No fluff, no generic advice — just systematic improvements that directly impact your bottom line.
                        </p>

                        <motion.div
                            className="flex flex-wrap gap-2 mb-8"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {['Conversion Engineering', 'Performance Optimization', 'Revenue Recovery'].map((tag, index) => (
                                <motion.div
                                    key={tag}
                                    className="bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/50 rounded-full px-4 py-1.5 backdrop-blur-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                                >
                                    <span className="text-sm text-slate-700 font-medium">{tag}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href={"/assessment" as any}
                                    className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-emerald-500/25 group"
                                >
                                    Get Free Assessment
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
                                >
                                    View Case Studies
                                </Link>
                            </motion.div>
                        </div>

                        {/* Enhanced trust indicators */}
                        <motion.div
                            className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.3, delay: 0.1 * i }}
                                    >
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    </motion.div>
                                ))}
                            </div>
                            <span className="text-sm text-slate-600">
                                <strong className="text-slate-800">50+</strong> growing companies trust my expertise
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Enhanced dynamic stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <FloatingElement delay={0}>
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 p-8 relative overflow-hidden">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/50 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                                            Recent Results
                                        </h3>
                                        <div className="flex gap-1.5">
                                            {stats.map((_, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => setCurrentStat(index)}
                                                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${index === currentStat
                                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 w-8'
                                                        : 'bg-slate-300 hover:bg-slate-400'
                                                        }`}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    aria-label={`View stat ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {stats.map((stat, index) => (
                                            <StatItem
                                                key={index}
                                                stat={stat}
                                                isActive={index === currentStat}
                                            />
                                        ))}
                                    </AnimatePresence>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                        <motion.div
                                            className="text-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">10+</div>
                                            <div className="text-sm text-slate-600">Years experience</div>
                                        </motion.div>
                                        <motion.div
                                            className="text-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">48h</div>
                                            <div className="text-sm text-slate-600">Assessment delivery</div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </FloatingElement>

                        {/* Enhanced floating testimonial with rotation */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStat % testimonials.length}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-xl shadow-2xl max-w-sm backdrop-blur-sm"
                                whileHover={{ scale: 1.02 }}
                            >
                                <p className="text-sm italic mb-3 leading-relaxed">
                                    "{testimonials[currentStat % testimonials.length].quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-xs font-bold shadow-inner">
                                        {testimonials[currentStat % testimonials.length].initial}
                                    </div>
                                    <span className="text-xs text-slate-300">
                                        {testimonials[currentStat % testimonials.length].author}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Enhanced bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-center mt-24"
                >
                    <motion.div
                        className="bg-gradient-to-r from-slate-50 to-emerald-50/30 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-slate-200/50 shadow-lg relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-teal-100/20 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Curious where your funnel is leaking money?
                            </h3>
                            <p className="text-slate-700 mb-6">
                                Get a complimentary assessment that shows exactly which improvements would have the highest revenue impact.
                            </p>

                            <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
                                {[
                                    { icon: CheckCircle, text: "No sales pitch" },
                                    { icon: Clock, text: "48h delivery" },
                                    { icon: DollarSign, text: "Actionable insights" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.text}
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                    >
                                        <item.icon className="w-4 h-4 text-emerald-500" />
                                        <span>{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}