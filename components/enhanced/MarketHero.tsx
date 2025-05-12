'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart2, DollarSign, TrendingUp } from 'lucide-react'

export default function MarketHero() {
    // Scroll animation setup
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Scroll-driven animations
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

    // Market metrics with animated counters
    const [marketMetrics, setMarketMetrics] = useState([
        { value: 0, target: 127, unit: '%', label: 'Average Revenue Growth' },
        { value: 0, target: 63, unit: '%', label: 'Reduction in Decision Cycles' },
        { value: 0, target: 4.7, decimals: 1, unit: 'x', label: 'Average ROI' }
    ])

    // Animated counter effect
    useEffect(() => {
        const timers = marketMetrics.map((stat, index) => {
            return setInterval(() => {
                setMarketMetrics(prev =>
                    prev.map((s, i) => {
                        if (i === index) {
                            const increment = s.decimals ? 0.1 : 1;
                            const newValue = Math.min(s.value + increment, s.target);
                            return { ...s, value: newValue }
                        }
                        return s
                    })
                )
            }, 30 + (index * 10))
        })

        return () => timers.forEach(timer => clearInterval(timer))
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-[95vh] overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-white"
        >
            {/* Background elements */}
            <div className="absolute inset-0 opacity-40">
                <div className="portfolio-grid-pattern absolute inset-0 opacity-20"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('/texture3.png')] opacity-10 mix-blend-soft-light"></div>
            </div>

            {/* Main content */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 mx-auto max-w-7xl px-6 py-32"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center bg-blue-900/30 backdrop-blur-sm border border-blue-800/30 px-4 py-1.5 rounded-full text-blue-400 text-sm mb-6"
                    >
                        <span className="text-xs font-mono tracking-wide">STRATEGIC MARKET PERCEPTION</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl md:text-6xl lg:text-7xl portfolio-font-serif font-medium text-white mb-8 leading-tight tracking-tight"
                    >
                        <span className="block">Transform how your</span>
                        <span className="text-blue-400">market perceives value</span>
                        <span className="block">into measurable growth</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-10 portfolio-text-balance"
                    >
                        Pioneering a systematic approach that realigns perception with
                        actual value, helping companies unlock significant untapped revenue.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/diagnose"
                            className="portfolio-button portfolio-button-primary group"
                        >
                            <span>Diagnose Your Perception Gap</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#case-studies"
                            className="portfolio-button portfolio-button-secondary group"
                        >
                            <span>Explore Our Methodology</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Market metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="mt-16 md:mt-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {marketMetrics.map((metric, index) => (
                            <div key={index} className="flex flex-col items-center p-6 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50">
                                <div className="mb-3">
                                    {index === 0 ? <TrendingUp className="h-6 w-6 text-blue-400" /> :
                                        index === 1 ? <BarChart2 className="h-6 w-6 text-blue-400" /> :
                                            <DollarSign className="h-6 w-6 text-blue-400" />}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {metric.decimals ? metric.value.toFixed(1) : Math.floor(metric.value)}
                                    <span className="text-blue-400 ml-1">{metric.unit}</span>
                                </div>
                                <div className="text-sm text-neutral-400 text-center">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
