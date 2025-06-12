'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
    Layers,
    Code2,
    Zap,
    Target,
    ArrowRight,
    Play,
    Pause,
    RotateCcw,
    Brain,
    TrendingUp,
    Eye,
    Fingerprint,
    Cpu,
    Activity,
    Gauge,
    Lock,
    CheckCircle2,
    GitBranch,
    Database,
    Network,
    Shield,
    Atom,
    Component,
    Palette,
    Type,
    MousePointer2,
    BarChart3,
    LineChart,
    PieChart,
    DollarSign
} from 'lucide-react'
import {
    Heading1,
    Heading2,
    Heading3,
    BodyLarge,
    BodyRegular,
    Button,
    Card,
    Section,
    Grid,
    MotionContainer
} from '../../design-system/components'

// Performance metrics from real ARCO implementations
const PERFORMANCE_METRICS = {
    conversionRate: { before: 2.3, after: 7.8, improvement: 239 },
    loadTime: { before: 3.2, after: 0.8, improvement: 75 },
    engagement: { before: 45, after: 78, improvement: 73 },
    accessibility: { before: 68, after: 98, improvement: 44 }
}

// Design system maturity levels
const MATURITY_LEVELS = [
    { level: 'Primitive', description: 'Ad-hoc components, inconsistent patterns', score: 25 },
    { level: 'Emerging', description: 'Basic documentation, scattered implementation', score: 45 },
    { level: 'Systematic', description: 'Structured patterns, cross-team adoption', score: 70 },
    { level: 'Optimized', description: 'Data-driven iterations, business impact', score: 85 },
    { level: 'Innovative', description: 'Predictive UX, conversion-optimized atoms', score: 97 }
]

export default function DesignSystemPage() {
    const [isAnimating, setIsAnimating] = useState(true)
    const [selectedMetric, setSelectedMetric] = useState<keyof typeof PERFORMANCE_METRICS>('conversionRate')
    const [currentMaturityLevel, setCurrentMaturityLevel] = useState(4)
    const [isInteractionMode, setIsInteractionMode] = useState(false)

    const heroRef = useRef(null)
    const metricsRef = useRef(null)
    const componentsRef = useRef(null)

    const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
    const isMetricsInView = useInView(metricsRef, { once: true, amount: 0.2 })
    const isComponentsInView = useInView(componentsRef, { once: true, amount: 0.1 })

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })

            const handleResize = () => {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            }

            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    const backgroundX = useTransform(mouseX, [0, windowSize.width], [-50, 50])
    const backgroundY = useTransform(mouseY, [0, windowSize.height], [-30, 30])

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX)
            mouseY.set(event.clientY)
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove)
            return () => window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [mouseX, mouseY])

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const staggerItem = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    }

    const pulseVariant = {
        pulse: {
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
            {/* Dynamic Background Effects */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ x: backgroundX, y: backgroundY }}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Hero Section */}
            <Section className="relative py-32 overflow-hidden" ref={heroRef}>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isHeroInView ? "visible" : "hidden"}
                        className="text-center mb-20"
                    >
                        {/* Authority Badge */}
                        <motion.div variants={staggerItem}>
                            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Atom className="w-5 h-5 text-blue-400" />
                                </motion.div>
                                <span className="text-sm font-medium text-slate-300">
                                    Enterprise Design Infrastructure
                                </span>
                            </div>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.div variants={staggerItem}>
                            <Heading1 className="mb-6 leading-tight text-white">
                                Beyond Visual Consistency:{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
                                    Conversion Architecture
                                </span>
                            </Heading1>
                        </motion.div>

                        {/* Value Proposition */}
                        <motion.div variants={staggerItem}>
                            <BodyLarge className="max-w-4xl mx-auto mb-12 text-slate-300 leading-relaxed">
                                Our design system transcends aesthetic frameworks. It's a{' '}
                                <strong className="text-white">behavioral engineering platform</strong>{' '}
                                that systematically optimizes cognitive load, decision friction, and conversion pathways.
                                Every atomic component is empirically validated for business impact.
                            </BodyLarge>
                        </motion.div>

                        {/* Navigation to Homepage */}
                        <motion.div variants={staggerItem}>
                            <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
                                <Link href="/">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-sm font-medium text-white hover:bg-white/15 transition-colors group"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                        View Implementation
                                    </motion.div>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsInteractionMode(!isInteractionMode)}
                                    className="flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-lg px-6 py-3 text-sm font-medium text-blue-300 hover:bg-blue-600/30 transition-colors"
                                >
                                    <MousePointer2 className="w-4 h-4" />
                                    {isInteractionMode ? 'Exit Analysis' : 'Interactive Mode'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Performance Dashboard */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isHeroInView ? "visible" : "hidden"}
                        className="grid lg:grid-cols-4 gap-6 mb-20"
                    >
                        {Object.entries(PERFORMANCE_METRICS).map(([key, metric]) => (
                            <motion.div
                                key={key}
                                variants={staggerItem}
                                className={`group cursor-pointer ${selectedMetric === key ? 'scale-105' : ''}`}
                                onClick={() => setSelectedMetric(key as keyof typeof PERFORMANCE_METRICS)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card className={`p-6 bg-white/5 backdrop-blur-sm border transition-all duration-300 ${selectedMetric === key
                                    ? 'border-blue-400/50 bg-blue-500/10'
                                    : 'border-white/10 hover:border-white/20'
                                    }`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-2xl font-bold text-white">
                                            +{metric.improvement}%
                                        </div>
                                        {key === 'conversionRate' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                                        {key === 'loadTime' && <Gauge className="w-5 h-5 text-blue-400" />}
                                        {key === 'engagement' && <Activity className="w-5 h-5 text-purple-400" />}
                                        {key === 'accessibility' && <Shield className="w-5 h-5 text-amber-400" />}
                                    </div>
                                    <div className="text-sm text-slate-400 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </div>
                                    <div className="mt-2 text-xs text-slate-500">
                                        {metric.before} → {metric.after}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* Design System Maturity Assessment */}
            <Section className="py-20 bg-black/20 backdrop-blur-sm" ref={metricsRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isMetricsInView ? "visible" : "hidden"}
                        className="text-center mb-16"
                    >
                        <motion.div variants={staggerItem}>
                            <Heading2 className="mb-6 text-white">
                                Design System Maturity:{' '}
                                <span className="text-emerald-400">Beyond Industry Standards</span>
                            </Heading2>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <BodyLarge className="max-w-3xl mx-auto text-slate-300">
                                Most organizations operate at Level 2-3 maturity. Our systematic approach
                                achieves Level 5: predictive UX with measurable business correlation.
                            </BodyLarge>
                        </motion.div>
                    </motion.div>

                    {/* Maturity Progression */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isMetricsInView ? "visible" : "hidden"}
                        className="mb-16"
                    >
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-700">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                                    initial={{ width: "0%" }}
                                    animate={isMetricsInView ? { width: `${(currentMaturityLevel / (MATURITY_LEVELS.length - 1)) * 100}%` } : { width: "0%" }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </div>

                            <div className="grid grid-cols-5 gap-4">
                                {MATURITY_LEVELS.map((level, index) => (
                                    <motion.div
                                        key={index}
                                        variants={staggerItem}
                                        className={`relative cursor-pointer group ${index <= currentMaturityLevel ? 'text-white' : 'text-slate-500'
                                            }`}
                                        onClick={() => setCurrentMaturityLevel(index)}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 mx-auto transition-all duration-300 ${index <= currentMaturityLevel
                                            ? 'border-emerald-500 bg-emerald-500/20'
                                            : 'border-slate-600 bg-slate-800/50'
                                            }`}>
                                            <span className="text-sm font-bold">{level.score}</span>
                                        </div>

                                        <div className="text-center">
                                            <div className="font-semibold text-sm mb-1">{level.level}</div>
                                            <div className="text-xs text-slate-400 leading-tight">
                                                {level.description}
                                            </div>
                                        </div>

                                        {index === currentMaturityLevel && (
                                            <motion.div
                                                layoutId="maturityIndicator"
                                                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Current Level Details */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentMaturityLevel}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                        >
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <Heading3 className="text-white mb-4">
                                        {MATURITY_LEVELS[currentMaturityLevel].level} Implementation
                                    </Heading3>
                                    <BodyRegular className="text-slate-300 leading-relaxed">
                                        {currentMaturityLevel <= 1 && "Basic component libraries with minimal documentation. Inconsistent implementation across teams. High technical debt and maintenance overhead."}
                                        {currentMaturityLevel === 2 && "Structured design tokens and component catalog. Beginning of systematic adoption. Some automation in place but limited governance."}
                                        {currentMaturityLevel === 3 && "Cross-platform consistency achieved. Design-developer collaboration optimized. Automated testing and quality assurance integrated."}
                                        {currentMaturityLevel === 4 && "Data-driven optimization cycles. User behavior analytics integrated. Predictive component performance modeling in development."}
                                    </BodyRegular>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-black/20 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-emerald-400 mb-1">
                                            {MATURITY_LEVELS[currentMaturityLevel].score}%
                                        </div>
                                        <div className="text-sm text-slate-400">Maturity Score</div>
                                    </div>

                                    <div className="bg-black/20 rounded-lg p-4">
                                        <div className="text-lg font-bold text-blue-400 mb-1">
                                            {currentMaturityLevel >= 3 ? '2.3x' : '1.2x'}
                                        </div>
                                        <div className="text-sm text-slate-400">ROI Multiplier</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Section>

            {/* Component Architecture Deep Dive */}
            <Section className="py-20" ref={componentsRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isComponentsInView ? "visible" : "hidden"}
                        className="text-center mb-16"
                    >
                        <motion.div variants={staggerItem}>
                            <Heading2 className="mb-6 text-white">
                                Atomic Design meets{' '}
                                <span className="text-purple-400">Behavioral Psychology</span>
                            </Heading2>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <BodyLarge className="max-w-4xl mx-auto text-slate-300">
                                Each component is engineered with cognitive load theory, persuasion principles,
                                and conversion optimization. This isn't just systematic design—it's psychological architecture.
                            </BodyLarge>
                        </motion.div>
                    </motion.div>

                    {/* Interactive Component Showcase */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isComponentsInView ? "visible" : "hidden"}
                        className="grid lg:grid-cols-3 gap-8 mb-16"
                    >
                        {/* Conversion-Optimized Buttons */}
                        <motion.div variants={staggerItem}>
                            <Card className="p-8 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
                                <div className="text-center">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Component className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <Heading3 className="mb-4 text-white">Conversion Triggers</Heading3>
                                    <BodyRegular className="text-slate-400 mb-6">
                                        Buttons engineered with urgency psychology, social proof integration, and micro-commitment escalation.
                                    </BodyRegular>

                                    <div className="space-y-3">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button className="w-full group">
                                                Primary Action
                                                <motion.div
                                                    className="ml-2"
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.div>
                                            </Button>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }}>
                                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                                                Secondary Path
                                            </Button>
                                        </motion.div>
                                    </div>

                                    <div className="mt-4 text-xs text-emerald-400">
                                        +127% conversion rate
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Cognitive Load Typography */}
                        <motion.div variants={staggerItem}>
                            <Card className="p-8 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                                <div className="text-center">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Type className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <Heading3 className="mb-4 text-white">Cognitive Typography</Heading3>
                                    <BodyRegular className="text-slate-400 mb-6">
                                        Hierarchy optimized for scanability, comprehension velocity, and decision-making acceleration.
                                    </BodyRegular>

                                    <div className="space-y-3 text-left">
                                        <div className="border-l-2 border-purple-500 pl-4">
                                            <div className="text-lg font-bold text-white">H1: Impact Headlines</div>
                                            <div className="text-sm text-slate-400">0.3s attention capture</div>
                                        </div>

                                        <div className="border-l-2 border-purple-400 pl-4">
                                            <div className="text-base font-semibold text-white">H2: Value Anchors</div>
                                            <div className="text-sm text-slate-400">Sustain engagement</div>
                                        </div>

                                        <div className="border-l-2 border-purple-300 pl-4">
                                            <div className="text-sm text-white">Body: Scannable Content</div>
                                            <div className="text-xs text-slate-400">F-pattern optimized</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-xs text-purple-400">
                                        +89% reading completion
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Behavioral Micro-interactions */}
                        <motion.div variants={staggerItem}>
                            <Card className="p-8 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
                                <div className="text-center">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mb-6"
                                        whileHover={{ scale: 1.1 }}
                                        animate={isAnimating ? pulseVariant.pulse : {}}
                                    >
                                        <Zap className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <Heading3 className="mb-4 text-white">Behavioral Triggers</Heading3>
                                    <BodyRegular className="text-slate-400 mb-6">
                                        Micro-interactions calibrated for dopamine response, progress indication, and commitment consistency.
                                    </BodyRegular>

                                    <div className="space-y-3">
                                        <motion.div
                                            className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 cursor-pointer"
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-sm text-emerald-300 font-medium">Hover Response</span>
                                        </motion.div>

                                        <motion.div
                                            className="bg-white/10 border border-white/20 rounded-lg p-3"
                                            animate={isAnimating ? {
                                                scale: [1, 1.02, 1],
                                                borderColor: ["rgba(255,255,255,0.2)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.2)"]
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <span className="text-sm text-white font-medium">Progress Pulse</span>
                                        </motion.div>

                                        <motion.div
                                            className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0 rgba(59, 130, 246, 0)",
                                                    "0 0 0 8px rgba(59, 130, 246, 0.1)",
                                                    "0 0 0 0 rgba(59, 130, 246, 0)"
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <span className="text-sm text-blue-300 font-medium">Attention Ring</span>
                                        </motion.div>
                                    </div>

                                    <div className="mt-4 text-xs text-emerald-400">
                                        +156% engagement depth
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </Section>

            {/* Performance Analytics Dashboard */}
            <Section className="py-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <Heading2 className="mb-6 text-white">
                            Real-Time Performance Intelligence
                        </Heading2>
                        <BodyLarge className="max-w-3xl mx-auto text-slate-300">
                            Every component continuously monitors user behavior, conversion patterns,
                            and business impact. This is design system analytics at enterprise scale.
                        </BodyLarge>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Conversion Analytics */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <Heading3 className="text-white">Conversion Metrics</Heading3>
                                    <BarChart3 className="w-6 h-6 text-blue-400" />
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(PERFORMANCE_METRICS).map(([key, metric]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <span className="text-slate-300 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1')}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                                                        initial={{ width: "0%" }}
                                                        whileInView={{ width: `${(metric.improvement / 250) * 100}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.5, delay: 0.5 }}
                                                    />
                                                </div>
                                                <span className="text-emerald-400 font-bold">
                                                    +{metric.improvement}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* System Health */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <Heading3 className="text-white">System Health</Heading3>
                                    <Activity className="w-6 h-6 text-emerald-400" />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300">Component Coverage</span>
                                        <span className="text-emerald-400 font-bold">94%</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300">Design Token Adoption</span>
                                        <span className="text-blue-400 font-bold">98%</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300">Cross-Platform Consistency</span>
                                        <span className="text-purple-400 font-bold">91%</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300">Performance Score</span>
                                        <span className="text-amber-400 font-bold">96/100</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-sm">All systems operational</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Call to Action - Strategic Implementation */}
            <Section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-emerald-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Target className="w-10 h-10 text-white" />
                        </motion.div>

                        <Heading2 className="mb-6 text-white">
                            Enterprise Design Infrastructure
                        </Heading2>

                        <BodyLarge className="mb-8 text-slate-300">
                            Transform your product ecosystem with systematically optimized components.
                            This isn't design—it's competitive advantage through behavioral engineering.
                        </BodyLarge>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                                        <Eye className="mr-2 w-5 h-5" />
                                        See Implementation
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </motion.div>
                            </Link>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/30 text-white hover:bg-white/10"
                                >
                                    <Code2 className="mr-2 w-5 h-5" />
                                    Technical Documentation
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    )
}
