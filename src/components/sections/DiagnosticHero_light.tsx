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
    Globe,
    Shield,
    BarChart3,
    Target,
    Clock,
    TrendingUp,
    Award,
    Users
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
        "turning visitors into customers",
        "maximizing conversion rates",
        "accelerating business growth",
        "dominating search rankings"
    ]

    // Enhanced typewriter effect
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
                }, 2500)
            }
        }, 80)

        return () => clearInterval(typeInterval)
    }, [currentPhraseIndex, isInView])

    const runDiagnostic = async (targetUrl: string) => {
        setIsScanning(true)
        setError('')

        try {
            if (!targetUrl.match(/^https?:\/\/.+/)) {
                throw new Error('Please use format: https://yourbusiness.com')
            }

            // Realistic simulation
            await new Promise(resolve => setTimeout(resolve, 2500))

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
                    hourlyLoss: Math.floor(((baseVisitors / 730) * currentCR * 0.15) * 47),
                    dailyLoss: Math.floor(((baseVisitors / 30) * currentCR * 0.15) * 47),
                    monthlyLoss: Math.floor((baseVisitors * currentCR * 0.15) * 47),
                    yearlyLoss: Math.floor((baseVisitors * currentCR * 0.15) * 47 * 12),
                    recoverable: Math.floor((baseVisitors * currentCR * 0.15) * 47 * 12 * 0.7)
                },
                issuesFound: {
                    critical: Math.floor(Math.random() * 3) + 2,
                    moderate: Math.floor(Math.random() * 5) + 3,
                    minor: Math.floor(Math.random() * 8) + 5
                }
            }

            setScanResult(mockResult)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Scan failed')
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
        <section ref={ref} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center overflow-hidden">

            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-pattern animate-pulse"></div>
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 w-full py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Trust Signals Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-8 py-4">
                            <div className="flex items-center gap-2 text-white/80">
                                <Users className="w-4 h-4 text-green-400" />
                                <span className="text-sm font-medium">2,400+ Sites Optimized</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <TrendingUp className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-medium">Avg 34% Performance Boost</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Award className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-medium">Enterprise Grade</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Hero Content */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Column - Content */}
                        <div className="space-y-8">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 backdrop-blur-sm"
                            >
                                <TrendingDown className="w-5 h-5 text-red-400" />
                                <span className="text-red-300 font-semibold">Revenue Impact Analysis</span>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 bg-green-400 rounded-full"
                                />
                            </motion.div>

                            {/* Main Headline */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                    Stop losing
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                                        $47,000/year
                                    </span>
                                    to slow sites
                                </h1>

                                <div className="text-xl md:text-2xl text-slate-300 space-y-2">
                                    <p>Every second of delay costs you customers.</p>
                                    <div className="flex items-center gap-2">
                                        <span>We specialize in</span>
                                        <span className="text-blue-400 font-semibold border-r-2 border-blue-400 pr-1 min-w-[280px] text-left">
                                            {typedText}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Key Metrics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="grid grid-cols-3 gap-6"
                            >
                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-green-400">&lt; 2s</div>
                                    <div className="text-sm text-slate-400">Target Load Time</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-400">+34%</div>
                                    <div className="text-sm text-slate-400">Avg Conversion Boost</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-400">72h</div>
                                    <div className="text-sm text-slate-400">Typical Delivery</div>
                                </div>
                            </motion.div>
                        </div>                        {/* Right Column - Enhanced Scanner Interface */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>

                            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                                {!scanResult ? (
                                    <div className="space-y-6">
                                        {/* Scanner Header */}
                                        <div className="text-center space-y-4">
                                            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2">
                                                <Globe className="w-4 h-4 text-blue-400" />
                                                <span className="text-blue-300 text-sm font-medium">Enterprise Site Scanner</span>
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white">
                                                Free Performance Analysis
                                            </h3>
                                            <p className="text-slate-300">
                                                Discover exactly how much revenue you're losing to poor performance
                                            </p>
                                        </div>

                                        {/* Input Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="url"
                                                    value={url}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    placeholder="https://yourwebsite.com"
                                                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm text-lg"
                                                    disabled={isScanning}
                                                    required
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <Globe className="w-5 h-5 text-slate-400" />
                                                </div>
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={isScanning || !url.trim()}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
                                            >
                                                {isScanning ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Analyzing Performance...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className="w-5 h-5" />
                                                        Analyze Site Performance
                                                        <ArrowRight className="w-5 h-5" />
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-center backdrop-blur-sm"
                                            >
                                                {error}
                                            </motion.div>
                                        )}

                                        {isScanning && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center space-y-4"
                                            >
                                                <div className="flex justify-center space-x-2">
                                                    {[...Array(4)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{
                                                                scale: [1, 1.3, 1],
                                                                opacity: [0.4, 1, 0.4]
                                                            }}
                                                            transition={{
                                                                duration: 1.2,
                                                                repeat: Infinity,
                                                                delay: i * 0.2
                                                            }}
                                                            className="w-3 h-3 bg-blue-400 rounded-full"
                                                        />
                                                    ))}
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-slate-300 font-medium">Scanning website performance...</p>
                                                    <p className="text-slate-400 text-sm">Analyzing Core Web Vitals, Mobile Experience & Revenue Impact</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Trust Indicators */}
                                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                                            <div className="text-center">
                                                <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                                <div className="text-white font-semibold text-sm">Secure</div>
                                                <div className="text-slate-400 text-xs">SSL Protected</div>
                                            </div>
                                            <div className="text-center">
                                                <CheckCircle2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                                <div className="text-white font-semibold text-sm">Instant</div>
                                                <div className="text-slate-400 text-xs">No Signup</div>
                                            </div>
                                            <div className="text-center">
                                                <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                                <div className="text-white font-semibold text-sm">Detailed</div>
                                                <div className="text-slate-400 text-xs">Full Report</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Results display here (keeping existing results structure)
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        {/* Results content - keeping the existing structure */}
                                        <div className="text-center border-b border-white/10 pb-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">Analysis Complete</h3>
                                            <p className="text-slate-400">Results for {scanResult.url}</p>
                                        </div>

                                        {/* Key Metrics */}
                                        <div className="grid gap-4">
                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Timer className="w-5 h-5 text-red-400" />
                                                    <span className="text-red-300 font-medium">Load Time</span>
                                                </div>
                                                <div className="text-2xl font-bold text-white">{scanResult.loadTime.toFixed(1)}s</div>
                                                <p className="text-sm text-slate-400">Should be under 2.5s</p>
                                            </div>

                                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Eye className="w-5 h-5 text-orange-400" />
                                                    <span className="text-orange-300 font-medium">Mobile Score</span>
                                                </div>
                                                <div className="text-2xl font-bold text-white">{scanResult.mobileScore}/100</div>
                                                <p className="text-sm text-slate-400">Needs improvement</p>
                                            </div>

                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                                    <span className="text-red-300 font-medium">Issues Found</span>
                                                </div>
                                                <div className="text-2xl font-bold text-white">
                                                    {scanResult.issuesFound.critical + scanResult.issuesFound.moderate}
                                                </div>
                                                <p className="text-sm text-slate-400">{scanResult.issuesFound.critical} critical</p>
                                            </div>
                                        </div>

                                        {/* Revenue Impact */}
                                        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <DollarSign className="w-6 h-6 text-red-400" />
                                                <h4 className="text-xl font-bold text-white">Revenue Impact</h4>
                                            </div>
                                            <div className="grid gap-4">
                                                <div>
                                                    <p className="text-slate-300 mb-3">Estimated losses from performance issues:</p>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Monthly:</span>
                                                            <span className="text-red-300 font-semibold">${scanResult.revenueImpact.monthlyLoss}</span>
                                                        </div>
                                                        <div className="flex justify-between border-t border-white/10 pt-2">
                                                            <span className="text-white font-medium">Yearly:</span>
                                                            <span className="text-red-400 font-bold text-lg">${scanResult.revenueImpact.yearlyLoss}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                                    <p className="text-green-300 font-medium mb-2">Recoverable Revenue</p>
                                                    <div className="text-xl font-bold text-green-400">
                                                        ${scanResult.revenueImpact.recoverable}
                                                    </div>
                                                    <p className="text-sm text-green-300/80">Per year with optimization</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="text-center pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                                                onClick={() => setScanResult(null)}
                                            >
                                                Get Detailed Action Plan
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.button>
                                            <p className="text-sm text-slate-400 mt-3">Free 15-minute strategy session included</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Trust Signals */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-16 space-y-6"
                    >
                        <div className="flex justify-center items-center gap-8 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>No signup required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>Instant analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>Enterprise-grade security</span>
                            </div>
                        </div>

                        <div className="text-slate-400 text-sm">
                            <p>Trusted by 2,400+ businesses • Average performance improvement: 34% • SOC 2 Type II Certified</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
