'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Zap, TrendingUp, Clock, Globe, Star, Play } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * ModernHero - World-class hero section with engaging content
 * Inspired by Vercel, Linear, and Stripe design excellence
 */
export function ModernHero() {
    const { t } = useTranslation()
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
    const y = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '50%']), springConfig)
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig)

    // Advanced mouse tracking for immersive parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect) {
                setMousePosition({
                    x: (e.clientX - rect.left - rect.width / 2) / 25,
                    y: (e.clientY - rect.top - rect.height / 2) / 25
                })
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Powerful business impact metrics
    const impactMetrics = [
        {
            value: '847%',
            label: 'Average ROI increase',
            description: 'Performance optimization impact',
            icon: TrendingUp,
            color: 'emerald'
        },
        {
            value: '2.1s',
            label: 'Load time reduction',
            description: 'Core Web Vitals improvement',
            icon: Zap,
            color: 'blue'
        },
        {
            value: '73%',
            label: 'Development velocity',
            description: 'Modern stack benefits',
            icon: Clock,
            color: 'purple'
        }
    ]

    const trustedCompanies = [
        { name: 'Vercel', users: '250K+' },
        { name: 'Shopify', users: '2M+' },
        { name: 'Stripe', users: '100K+' },
        { name: 'Linear', users: '50K+' }
    ]

    return (
        <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
            {/* Revolutionary gradient mesh background */}
            <div className="absolute inset-0">
                {/* Main gradient orbs */}
                <motion.div
                    style={{
                        x: mousePosition.x * 0.5,
                        y: mousePosition.y * 0.5
                    }}
                    className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-3xl"
                />
                <motion.div
                    style={{
                        x: -mousePosition.x * 0.3,
                        y: -mousePosition.y * 0.3
                    }}
                    className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-green-400/20 via-blue-500/30 to-purple-600/20 rounded-full blur-3xl"
                />

                {/* Animated grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }} />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex items-center justify-center min-h-screen px-6"
            >
                <div className="max-w-7xl mx-auto text-center">

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </div>
                            <span className="text-white/90 font-medium text-sm">
                                Trusted by 500+ companies globally
                            </span>
                            <Globe className="w-4 h-4 text-blue-400" />
                        </div>
                    </motion.div>

                    {/* Powerful headline with dynamic emphasis */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 leading-[0.85] tracking-tight">
                            Build{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    faster
                                </span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full origin-left"
                                />
                            </span>
                            <br />
                            <span className="text-white/90">
                                apps that{' '}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5, duration: 0.8 }}
                                    className="relative"
                                >
                                    convert
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 2, duration: 0.8 }}
                                        className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                    />
                                </motion.span>
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-2xl md:text-3xl text-white/70 max-w-5xl mx-auto font-light leading-relaxed"
                        >
                            We transform slow, expensive websites into{' '}
                            <span className="text-blue-400 font-medium">lightning-fast</span>{' '}
                            revenue generators. Modern React architecture that scales,{' '}
                            <span className="text-green-400 font-medium">costs 70% less</span>, and{' '}
                            <span className="text-purple-400 font-medium">converts like crazy</span>.
                        </motion.p>
                    </motion.div>

                    {/* Premium CTAs with social proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="flex flex-col md:flex-row gap-6 justify-center mb-20"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg overflow-hidden shadow-2xl hover:shadow-blue-500/25"
                        >
                            <div className="relative flex items-center justify-center gap-3">
                                <Zap className="w-5 h-5" />
                                Get Free Performance Audit
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                        >
                            <Play className="w-5 h-5" />
                            View Success Stories
                        </motion.button>
                    </motion.div>

                    {/* Powerful impact metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    >
                        {impactMetrics.map((metric, index) => {
                            const Icon = metric.icon
                            const colorClasses = {
                                emerald: 'from-emerald-500 to-green-600',
                                blue: 'from-blue-500 to-indigo-600',
                                purple: 'from-purple-500 to-violet-600'
                            }

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 1.6 + index * 0.2, duration: 0.8 }}
                                    className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`p-3 bg-gradient-to-br ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-2xl`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-4xl font-bold text-white">
                                                {metric.value}
                                            </div>
                                        </div>

                                        <div className="text-white/90 font-semibold text-lg mb-2">
                                            {metric.label}
                                        </div>
                                        <div className="text-white/60 text-sm">
                                            {metric.description}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Trusted by section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2, duration: 0.8 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-white/50 text-sm mb-6 font-medium">
                            Trusted by the same stack as industry leaders
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 opacity-60">
                            {trustedCompanies.map((company, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.4 + index * 0.1 }}
                                    className="flex items-center gap-2 text-white/70"
                                >
                                    <span className="font-semibold">{company.name}</span>
                                    <span className="text-white/40 text-xs">({company.users} users)</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}