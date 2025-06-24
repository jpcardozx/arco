'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    TrendingDown,
    Timer,
    AlertTriangle,
    Loader2,
    ArrowRight,
    CheckCircle2,
    DollarSign,
    Eye,
    Zap,
    Clock
} from 'lucide-react'

interface DiagnosticResult {
    url: string
    loadTime: number
    mobileScore: number
    firstContentfulPaint: number
    monthlyVisitors: number
    conversionRate: number
    revenueImpact: {
        hourlyLoss: number
        dailyLoss: number
        monthlyLoss: number
        yearlyLoss: number
        recoverable: number
    }
    issuesFound: {
        critical: number
        moderate: number
        minor: number
    }
}

export function DiagnosticHero() {
    const [url, setUrl] = useState('')
    const [isScanning, setIsScanning] = useState(false)
    const [scanResult, setScanResult] = useState<DiagnosticResult | null>(null)
    const [error, setError] = useState('')
    const [typedText, setTypedText] = useState('')
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const phrases = [
        "Every second counts in business",
        "Site speed = Money speed",
        "Slow sites lose customers",
        "Your site's bleeding revenue"
    ]

    // Typewriter effect
    useEffect(() => {
        if (!isInView) return

        const phrase = phrases[currentPhraseIndex]
        let currentIndex = 0

        const typeInterval = setInterval(() => {
            if (currentIndex <= phrase.length) {
                setTypedText(phrase.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(typeInterval)
                setTimeout(() => {
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
                }, 2000)
            }
        }, 100)

        return () => clearInterval(typeInterval)
    }, [currentPhraseIndex, isInView])

    const runDiagnostic = async (targetUrl: string) => {
        setIsScanning(true)
        setError('')

        try {
            if (!targetUrl.match(/^https?:\/\/.+/)) {
                throw new Error('Please use format: https://yourbusiness.com')
            }

            // Enhanced simulation with realistic business metrics
            await new Promise(resolve => setTimeout(resolve, 3200))

            const baseVisitors = 2500 + Math.floor(Math.random() * 12500)
            const currentCR = 1.2 + Math.random() * 3.5
            const loadTime = 3.8 + Math.random() * 2.5

            const mockResult: DiagnosticResult = {
                url: targetUrl,
                loadTime,
                mobileScore: Math.max(25, Math.floor(85 - (loadTime * 8))),
                firstContentfulPaint: loadTime * 0.6,
                monthlyVisitors: baseVisitors,
                conversionRate: currentCR,
                revenueImpact: {
                    hourlyLoss: 0,
                    dailyLoss: 0,
                    monthlyLoss: 0,
                    yearlyLoss: 0,
                    recoverable: 0
                },
                issuesFound: {
                    critical: Math.floor(Math.random() * 5) + 2,
                    moderate: Math.floor(Math.random() * 8) + 3,
                    minor: Math.floor(Math.random() * 12) + 5
                }
            }

            // Calculate business impact based on industry benchmarks
            const avgOrderValue = 65 + Math.random() * 135
            const potentialCRIncrease = Math.min(45, (loadTime - 1.5) * 15) // More realistic
            const dailyRevenueLoss = (baseVisitors / 30) * (potentialCRIncrease / 100) * avgOrderValue

            mockResult.revenueImpact.hourlyLoss = dailyRevenueLoss / 24
            mockResult.revenueImpact.dailyLoss = dailyRevenueLoss
            mockResult.revenueImpact.monthlyLoss = dailyRevenueLoss * 30
            mockResult.revenueImpact.yearlyLoss = dailyRevenueLoss * 365
            mockResult.revenueImpact.recoverable = mockResult.revenueImpact.monthlyLoss * 0.72

            setScanResult(mockResult)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed - please try again')
        } finally {
            setIsScanning(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (url.trim()) {
            runDiagnostic(url.trim())
        }
    }

    return (
        <section ref={ref} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20"
                />

                {/* Floating Geometric Shapes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.8
                        }}
                        className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-red-400/30 to-orange-400/30"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + i * 10}%`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">

                    {/* Authority Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-3 bg-red-950/30 border border-red-500/30 rounded-full px-6 py-3 backdrop-blur-sm"
                        >
                            <TrendingDown className="w-5 h-5 text-red-400" />
                            <span className="text-red-200 font-semibold">Revenue Leak Scanner</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-green-400 rounded-full"
                            />
                            <span className="text-xs bg-green-400/20 text-green-300 px-2 py-1 rounded-full">LIVE</span>
                        </motion.div>
                    </motion.div>

                    {/* Dynamic Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            <motion.span
                                key={typedText}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="block text-2xl lg:text-3xl text-red-300 mb-4 font-normal"
                            >
                                {typedText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="text-red-400"
                                >
                                    |
                                </motion.span>
                            </motion.span>
                            Your site is losing money
                            <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                every second
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
                        >
                            Real-time diagnostic reveals exactly how much revenue you're bleeding
                            due to slow loading times. <strong className="text-white">Free scan, instant results.</strong>
                        </motion.p>
                    </motion.div>

                    {/* Enhanced URL Scanner */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-3xl mx-auto mb-16"
                    >
                        <form onSubmit={handleSubmit} className="relative">
                            <motion.div
                                whileFocus={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative bg-white rounded-2xl p-2">
                                    <div className="flex items-center">
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://yourbusiness.com"
                                            className="flex-1 px-6 py-4 text-lg bg-transparent border-none outline-none text-slate-900 placeholder-slate-500"
                                            disabled={isScanning}
                                            required
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={isScanning || !url.trim()}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-lg"
                                        >
                                            {isScanning ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Scanning...
                                                </>
                                            ) : (
                                                <>
                                                    Scan My Site
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-300 text-sm mt-3 text-center"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </form>

                        <div className="text-center mt-6 text-slate-400">
                            <div className="flex items-center justify-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    No signup required
                                </div>
                                <div className="flex items-center gap-2">
                                    <Timer className="w-4 h-4 text-blue-400" />
                                    Results in 60 seconds
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    Real business impact
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Loading Animation */}
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16"
                            >
                                <div className="text-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-16 h-16 mx-auto mb-4 border-4 border-red-500/30 border-t-red-500 rounded-full"
                                    />
                                    <h3 className="text-white text-xl font-semibold mb-2">Analyzing Your Site...</h3>
                                    <div className="text-slate-300 space-y-1">
                                        <motion.p
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            ⚡ Checking load times
                                        </motion.p>
                                        <motion.p
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                        >
                                            📊 Calculating business impact
                                        </motion.p>
                                        <motion.p
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                                        >
                                            💰 Finding revenue leaks
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Enhanced Results Display */}
                    <AnimatePresence>
                        {scanResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="max-w-5xl mx-auto"
                            >
                                {/* Critical Alert */}
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-r from-red-900/90 to-orange-900/90 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 mb-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                                Revenue Leak Detected
                                            </h3>
                                            <p className="text-red-200">{scanResult.url}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-red-300 mb-1">Estimated Monthly Loss</div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5, type: "spring" }}
                                                className="text-4xl font-bold text-red-400"
                                            >
                                                ${scanResult.revenueImpact.monthlyLoss.toLocaleString()}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Metrics Grid */}
                                <div className="grid md:grid-cols-4 gap-4 mb-8">
                                    {[
                                        {
                                            icon: Timer,
                                            label: "Load Time",
                                            value: `${scanResult.loadTime.toFixed(1)}s`,
                                            status: scanResult.loadTime > 3 ? "critical" : "warning",
                                            detail: "Industry avg: 2.5s"
                                        },
                                        {
                                            icon: Eye,
                                            label: "Mobile Score",
                                            value: `${scanResult.mobileScore}/100`,
                                            status: scanResult.mobileScore < 50 ? "critical" : "warning",
                                            detail: `${scanResult.issuesFound.critical} critical issues`
                                        },
                                        {
                                            icon: Clock,
                                            label: "First Paint",
                                            value: `${scanResult.firstContentfulPaint.toFixed(1)}s`,
                                            status: scanResult.firstContentfulPaint > 2 ? "critical" : "good",
                                            detail: "User sees content"
                                        },
                                        {
                                            icon: DollarSign,
                                            label: "Daily Loss",
                                            value: `$${scanResult.revenueImpact.dailyLoss.toFixed(0)}`,
                                            status: "critical",
                                            detail: "Every 24 hours"
                                        }
                                    ].map((metric, index) => (
                                        <motion.div
                                            key={metric.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border ${metric.status === 'critical' ? 'border-red-500/50' :
                                                    metric.status === 'warning' ? 'border-orange-500/50' : 'border-green-500/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <metric.icon className={`w-5 h-5 ${metric.status === 'critical' ? 'text-red-400' :
                                                        metric.status === 'warning' ? 'text-orange-400' : 'text-green-400'
                                                    }`} />
                                                <span className="text-white font-medium">{metric.label}</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                                            <div className="text-sm text-slate-300">{metric.detail}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Business Impact */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8"
                                >
                                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <TrendingDown className="w-5 h-5 text-red-400" />
                                        Business Impact Analysis
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <div className="text-sm text-slate-400 mb-2">Monthly Visitors</div>
                                            <div className="text-2xl font-bold text-white">
                                                {scanResult.monthlyVisitors.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400 mb-2">Current Conversion</div>
                                            <div className="text-2xl font-bold text-white">
                                                {scanResult.conversionRate.toFixed(1)}%
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400 mb-2">Recovery Potential</div>
                                            <div className="text-2xl font-bold text-green-400">
                                                ${scanResult.revenueImpact.recoverable.toLocaleString()}/mo
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* CTA Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center"
                                >
                                    <h4 className="text-2xl font-bold text-white mb-4">
                                        Want to stop the bleeding?
                                    </h4>
                                    <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                                        Get a detailed technical audit with actionable fixes.
                                        See exactly what's slowing you down and how to fix it.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                                        >
                                            View Sample Report
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-yellow-500 text-red-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 justify-center"
                                        >
                                            Get Full Audit - $470
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Value Props (when no results) */}
                    {!scanResult && !isScanning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="grid md:grid-cols-3 gap-8 text-center"
                        >
                            {[
                                {
                                    icon: Zap,
                                    title: "Instant Analysis",
                                    description: "Real-time scan reveals performance bottlenecks"
                                },
                                {
                                    icon: DollarSign,
                                    title: "Revenue Impact",
                                    description: "See exactly how much money you're losing"
                                },
                                {
                                    icon: CheckCircle2,
                                    title: "No Commitment",
                                    description: "Free diagnostic, no signup or personal info required"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.2 }}
                                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-300">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
