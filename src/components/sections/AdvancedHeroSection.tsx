'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Zap, CheckCircle, Play, Star, Terminal, Code2, Database, Cpu, Lock, Users, Shield } from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'
import { useAuth } from '../../contexts/AuthContext'

/**
 * ADVANCED HERO SECTION - Technical Intelligence Focus
 * 
 * OBJECTIVES:
 * - Technical credibility and authority
 * - Integrated authentication CTA
 * - Real value demonstration
 * - Performance optimized (LCP < 1.8s)
 */

interface MetricCardProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
    sublabel: string
    gradient: string
}

const MetricCard = ({ icon: Icon, value, label, sublabel, gradient }: MetricCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
    >
        <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-white" />
            <span className="text-sm font-medium text-white/80">{label}</span>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="text-sm text-white/70">{sublabel}</div>
    </motion.div>
)

export function AdvancedHeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const { isAuthenticated, user } = useAuth()
    const [showAuthModal, setShowAuthModal] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    useEffect(() => {
        if (isInView) {
            trackEvent({
                event: 'hero_section_viewed',
                category: 'engagement',
                action: 'view'
            })
        }
    }, [isInView, isAuthenticated, user])

    const handleCTAClick = (action: string) => {
        if (isAuthenticated) {
            trackEvent({
                event: 'authenticated_cta_click',
                category: 'conversion',
                action: action
            })
            // Scroll to intelligence hub
            document.getElementById('technical-intelligence')?.scrollIntoView({ behavior: 'smooth' })
        } else {
            trackEvent({
                event: 'unauthenticated_cta_click',
                category: 'conversion',
                action: action
            })
            setShowAuthModal(true)
            window.dispatchEvent(new CustomEvent('openAuthModal'))
        }
    }

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

                {/* Code-like grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div className="h-full w-full"
                        style={{
                            backgroundImage: `
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
                             `,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
            >
                <div className="text-center">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur border border-blue-500/30 rounded-full px-6 py-3 mb-8"
                    >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-blue-400">
                            {isAuthenticated
                                ? `${user?.tier?.toUpperCase()} User - Intelligence Suite Active`
                                : 'Technical Intelligence Suite - Live Demo Available'
                            }
                        </span>
                        {!isAuthenticated && <Lock className="w-4 h-4 text-blue-400" />}
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                    >
                        Real{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Technical Intelligence
                        </span>
                        <br />
                        Not Marketing Fluff
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto mb-12"
                    >
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
                            Domain analysis, security auditing, competitive intelligence, and performance monitoring
                            built with <span className="text-blue-400 font-semibold">Python</span>,
                            powered by <span className="text-green-400 font-semibold">real APIs</span>.
                        </p>
                        <p className="text-lg text-slate-400">
                            Stop paying for generic consulting. Get technical insights that actually matter.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <button
                            onClick={() => handleCTAClick('primary_demo')}
                            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-3"
                        >
                            <Terminal className="w-5 h-5" />
                            {isAuthenticated ? 'Access Intelligence Suite' : 'Start Technical Analysis'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => handleCTAClick('live_demo')}
                            className="group bg-slate-800/50 backdrop-blur border border-slate-600/50 hover:border-slate-500/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3"
                        >
                            <Play className="w-5 h-5" />
                            Watch Live Demo
                        </button>
                    </motion.div>

                    {/* Live Metrics Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        <MetricCard
                            icon={Shield}
                            value="247+"
                            label="Security Audits"
                            sublabel="This month"
                            gradient="from-green-600/80 to-emerald-600/80"
                        />
                        <MetricCard
                            icon={Zap}
                            value="<1.8s"
                            label="Analysis Speed"
                            sublabel="Average completion"
                            gradient="from-yellow-600/80 to-orange-600/80"
                        />
                        <MetricCard
                            icon={Database}
                            value="15TB"
                            label="Intelligence Data"
                            sublabel="Processed monthly"
                            gradient="from-blue-600/80 to-cyan-600/80"
                        />
                        <MetricCard
                            icon={Users}
                            value="94%"
                            label="Accuracy Rate"
                            sublabel="Threat detection"
                            gradient="from-purple-600/80 to-pink-600/80"
                        />
                    </motion.div>

                    {/* Technology Stack Showcase */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                            <Code2 className="w-6 h-6 text-blue-400" />
                            Powered by Real Technology
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {[
                                { name: 'Python', desc: 'FastAPI Backend', color: 'text-yellow-400' },
                                { name: 'Next.js', desc: 'React Frontend', color: 'text-blue-400' },
                                { name: 'TypeScript', desc: 'Type Safety', color: 'text-blue-300' },
                                { name: 'SSLyze', desc: 'Security Analysis', color: 'text-green-400' },
                                { name: 'Selenium', desc: 'Web Automation', color: 'text-orange-400' }
                            ].map((tech, i) => (
                                <div key={i} className="text-center">
                                    <div className={`font-bold ${tech.color} mb-1`}>{tech.name}</div>
                                    <div className="text-xs text-slate-400">{tech.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-700/50">
                            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Real-time Analysis
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Open Source Tools
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Enterprise Grade
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Proof - Live Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-4 bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-full px-6 py-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-slate-800" />
                                ))}
                            </div>
                            <div className="text-sm text-slate-300">
                                <span className="text-green-400 font-semibold">23 domains</span> analyzed in the last hour
                            </div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-slate-400">
                    <span className="text-sm">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-slate-600 rounded-full p-1">
                        <div className="w-1 h-3 bg-blue-400 rounded-full mx-auto animate-bounce" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
