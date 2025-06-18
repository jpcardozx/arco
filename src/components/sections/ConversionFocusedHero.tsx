'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ArrowRight, Play, CheckCircle, TrendingUp, DollarSign, Clock, Users, Star, Zap, AlertTriangle } from 'lucide-react'
import {
    Heading1,
    BodyLarge,
    Card,
    MotionContainer,
    Section
} from '../../design-system/components'

export function ConversionFocusedHero() {
    const [currentMetric, setCurrentMetric] = useState(0)
    const [currentPain, setCurrentPain] = useState(0)

    const liveMetrics = [
        { label: "Revenue Recovered", value: "$3.2M+", change: "+$180K this month" },
        { label: "Projects Delivered", value: "47", change: "+3 this week" },
        { label: "Client Success Rate", value: "94%", change: "↗ improving" },
        { label: "Avg ROI Delivered", value: "265%", change: "within 90 days" }
    ]

    const painPoints = [
        "Website loads slow → customers leave → revenue lost",
        "Poor checkout flow → high cart abandonment → sales missed",
        "Technical debt → slow deployments → competitive disadvantage",
        "Infrastructure costs → budget drain → profit erosion"
    ]

    const socialProof = [
        "TechFlow saved $1.2M in 90 days",
        "DataCore cut infrastructure costs 45%",
        "ScaleUp improved conversion 180%",
        "FinTech reduced deployment time 75%"
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMetric((prev) => (prev + 1) % liveMetrics.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPain((prev) => (prev + 1) % painPoints.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Section
            background="slate"
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
        >
            {/* Professional Gradient Backgrounds */}
            <div className="absolute inset-0">
                {/* Primary gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-emerald-600/15" />

                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [-100, 100, -100],
                        y: [-100, 50, -100],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-500/15 to-blue-500/15 rounded-full blur-3xl"
                    animate={{
                        x: [100, -100, 100],
                        y: [100, -50, 100],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        }}
                        animate={{
                            y: [null, -200],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Problem → Solution Narrative */}
                        <div className="space-y-8">
                            {/* Problem Agitation with Animation */}
                            <MotionContainer className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-400/30">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-medium text-red-300">Revenue Leak Alert</span>
                                </div>

                                <motion.div
                                    key={currentPain}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-slate-300 text-lg font-medium"
                                >
                                    {painPoints[currentPain]}
                                </motion.div>
                            </MotionContainer>

                            {/* Solution Headline */}
                            <MotionContainer delay={0.2}>
                                <Heading1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    Stop the Revenue
                                    <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                        Bleeding
                                    </span>
                                    <span className="block text-4xl lg:text-5xl mt-2">
                                        Start <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Recovering</span>
                                    </span>
                                </Heading1>
                            </MotionContainer>

                            {/* Clear Value Proposition */}
                            <MotionContainer delay={0.4}>
                                <BodyLarge className="text-xl text-slate-300 leading-relaxed max-w-xl">
                                    Get a <strong className="text-white">free $15K technical audit</strong> that reveals exactly
                                    where your mid-market company is bleeding revenue due to digital performance issues.
                                    <span className="text-emerald-400 font-semibold"> Delivered in 48 hours with actionable roadmap.</span>
                                </BodyLarge>
                            </MotionContainer>

                            {/* Rotating Social Proof */}
                            <MotionContainer delay={0.5}>
                                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-sm text-emerald-300 font-medium">Recent Success</span>
                                    </div>
                                    <motion.div
                                        key={currentMetric}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="text-slate-300 text-sm"
                                    >
                                        {socialProof[currentMetric % socialProof.length]}
                                    </motion.div>
                                </div>
                            </MotionContainer>

                            {/* Conversion-Focused CTAs */}
                            <MotionContainer delay={0.6}>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.a
                                        href="#revenue-audit"
                                        className="group relative bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold px-8 py-4 rounded-lg overflow-hidden text-lg shadow-2xl"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative flex items-center justify-center gap-2">
                                            Get My Free $15K Audit
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.a>

                                    <motion.a
                                        href="#proven-results"
                                        className="group bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Play className="w-5 h-5" />
                                        See Results
                                    </motion.a>
                                </div>
                            </MotionContainer>

                            {/* Trust Signals */}
                            <MotionContainer delay={0.7}>
                                <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span>No sales pitch</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span>48hr delivery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span>SOC 2 compliant</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span>Money-back guarantee</span>
                                    </div>
                                </div>
                            </MotionContainer>
                        </div>

                        {/* Right Column - Interactive Dashboard */}
                        <MotionContainer delay={0.8} className="space-y-6">
                            {/* Live Metrics Dashboard */}
                            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium text-emerald-300">Live Revenue Recovery</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {liveMetrics.map((metric, index) => (
                                        <motion.div
                                            key={index}
                                            className={`p-4 rounded-lg border transition-all duration-500 ${index === currentMetric
                                                ? 'bg-emerald-500/20 border-emerald-400/50 shadow-lg'
                                                : 'bg-white/5 border-white/10'
                                                }`}
                                            animate={{
                                                scale: index === currentMetric ? 1.05 : 1,
                                                boxShadow: index === currentMetric
                                                    ? '0 10px 30px rgba(16, 185, 129, 0.3)'
                                                    : '0 4px 6px rgba(0, 0, 0, 0.1)'
                                            }}
                                        >
                                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                                            <div className="text-xs text-slate-400 mb-1">{metric.label}</div>
                                            <div className="text-xs text-emerald-400">{metric.change}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>

                            {/* Revenue Impact Calculator */}
                            <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="w-6 h-6 text-orange-400" />
                                    <span className="font-semibold text-white">Your Revenue at Risk</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300 text-sm">Monthly loss from slow performance:</span>
                                        <span className="text-red-400 font-bold">-$45K</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300 text-sm">Annual opportunity cost:</span>
                                        <span className="text-red-400 font-bold">-$540K</span>
                                    </div>
                                    <div className="border-t border-red-400/30 pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-semibold">Potential recovery with ARCO:</span>
                                            <span className="text-emerald-400 font-bold text-lg">+$1.2M</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Social Proof Card */}
                            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 p-6">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-yellow-400 text-sm ml-2 font-medium">5.0</span>
                                </div>
                                <blockquote className="text-slate-300 text-sm mb-4">
                                    "Found $1.2M in revenue opportunities in just 48 hours.
                                    Best investment we've made this year."
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        SC
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">Sarah Chen</p>
                                        <p className="text-slate-400 text-xs">CTO, TechFlow Solutions</p>
                                    </div>
                                </div>
                            </Card>
                        </MotionContainer>
                    </div>
                </div>
            </div>
        </Section>
    )
}
