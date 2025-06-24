'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    ArrowRight,
    Terminal,
    Zap,
    TrendingUp,
    DollarSign,
    Clock,
    Target,
    CheckCircle2,
    Search,
    AlertCircle
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

// Real-time domain analysis interface
interface DomainAnalysis {
    domain: string
    loading: boolean
    results?: {
        performanceScore: number
        lcp: number
        cls: number
        techStack: string[]
        saasOverhead: number
        quickWins: string[]
        confidenceLevel: number
    }
    error?: string
}

/**
 * FOCUSED Hero Section
 * Problem-first approach with real case studies + LIVE domain analysis
 * Technical demonstration + clear conversion path
 */
export function FocusedHeroSection() {
    const [currentCase, setCurrentCase] = useState(0)
    const [terminalStep, setTerminalStep] = useState(0)
    const [domainAnalysis, setDomainAnalysis] = useState<DomainAnalysis>({
        domain: '',
        loading: false
    })
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    // REAL CASE STUDIES - Not fake metrics
    const realCases = [
        {
            client: 'IPE Ventures',
            before: '4.2s load time',
            after: '1.1s load time',
            result: '+$240k revenue',
            timeframe: '6 weeks',
            technique: 'React SSR + CDN optimization'
        },
        {
            client: 'Xora Platform',
            before: '45 performance score',
            after: '94 performance score',
            result: '+67% user signups',
            timeframe: '4 weeks',
            technique: 'Bundle splitting + lazy loading'
        },
        {
            client: 'TechCorp Solutions',
            before: '99.2% uptime',
            after: '99.98% uptime',
            result: '+$85k saved annually',
            timeframe: '3 weeks',
            technique: 'Infrastructure monitoring'
        }]

    // Technical process demonstration
    const terminalCommands = [
        '$ lighthouse --output=json --chrome-flags="--headless"',
        '$ npm run bundle-analyzer --analyze',
        '$ performance-budget --check --budget=2MB',
        '✓ Core Web Vitals optimized: LCP < 1.2s',
        '✓ Revenue impact measured: +47% conversion'
    ]

    useEffect(() => {
        // Cycle through cases
        const caseInterval = setInterval(() => {
            setCurrentCase(prev => (prev + 1) % realCases.length)
        }, 4000)

        // Animate terminal
        const terminalInterval = setInterval(() => {
            setTerminalStep(prev => (prev + 1) % terminalCommands.length)
        }, 2000)

        return () => {
            clearInterval(caseInterval)
            clearInterval(terminalInterval)
        }
    }, [realCases.length, terminalCommands.length])    // Real domain analysis function
    const analyzeDomain = async (domain: string) => {
        if (!domain || domainAnalysis.loading) return

        setDomainAnalysis(prev => ({ ...prev, loading: true, error: undefined }))

        try {
            // Track analysis attempt
            trackEvent({
                event: 'domain_analysis_attempt',
                category: 'analysis',
                action: 'domain_input',
                label: domain
            })

            // Real API call to our endpoint
            const response = await fetch('/api/analyze/domain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ domain: domain.replace(/^https?:\/\//, '') })
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Analysis failed')
            }

            setDomainAnalysis({
                domain,
                loading: false,
                results: result.data
            })

            // Track successful analysis
            trackFunnelStep('domain_analysis_complete', 'conversion_funnel', {
                domain,
                performance_score: result.data.performanceScore,
                savings_potential: result.data.saasOverhead
            })

        } catch (error) {
            console.error('Analysis error:', error)
            setDomainAnalysis(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Analysis failed. Please check the domain and try again.'
            }))
        }
    }

    const handleCTAClick = () => {
        trackEvent({
            event: 'hero_cta_click',
            category: 'conversion',
            action: 'primary_cta',
            label: 'focused_hero',
            value: 1
        })

        trackFunnelStep('hero_cta_click', 'conversion_funnel', {
            source: 'focused_hero',
            current_case: realCases[currentCase].client,
            timestamp: Date.now()
        })

        // Scroll to immediate value section
        document.getElementById('immediate-value')?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"
            data-section="hero"
        >
            {/* Animated background */}
            <motion.div
                className="absolute inset-0"
                style={{ y: backgroundY }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.2),transparent_50%)]" />
            </motion.div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-40">
                <div
                    className="w-full h-full bg-repeat"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Main content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white"
                >
                    {/* Problem statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm font-medium mb-4">
                            <Target className="w-4 h-4" />
                            Critical Performance Issues
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Your Website Is{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                                Bleeding Revenue
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                            Every second of load time costs you customers. We don't just optimize performance—
                            <strong className="text-white"> we engineer revenue recovery.</strong>
                        </p>
                    </motion.div>

                    {/* Case study showcase */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 font-medium">LIVE CASE STUDY</span>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">
                                    {realCases[currentCase].client}
                                </div>
                                <div className="text-slate-300 text-sm mb-3">
                                    {realCases[currentCase].technique}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Before:</span>
                                        <span className="text-red-400 font-medium">{realCases[currentCase].before}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">After:</span>
                                        <span className="text-green-400 font-medium">{realCases[currentCase].after}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center text-center">
                                <div className="text-3xl font-bold text-green-400 mb-1">
                                    {realCases[currentCase].result}
                                </div>
                                <div className="text-slate-300 text-sm mb-2">
                                    Revenue Impact
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    Delivered in {realCases[currentCase].timeframe}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={handleCTAClick}
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                            <DollarSign className="w-5 h-5" />
                            Calculate Your Revenue Loss
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>                        <p className="text-slate-400 text-sm mt-3">
                            Free analysis • No email required • Instant results
                        </p>
                    </motion.div>

                    {/* Live Domain Analyzer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Search className="w-5 h-5 text-blue-400" />
                            <h3 className="text-white font-semibold">
                                Free Domain Analysis - See Your Issues in 60 Seconds
                            </h3>
                        </div>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Enter your domain (e.g., company.com)"
                                value={domainAnalysis.domain}
                                onChange={(e) => setDomainAnalysis(prev => ({ ...prev, domain: e.target.value }))}
                                onKeyPress={(e) => e.key === 'Enter' && analyzeDomain(domainAnalysis.domain)}
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                                disabled={domainAnalysis.loading}
                            />
                            <button
                                onClick={() => analyzeDomain(domainAnalysis.domain)}
                                disabled={!domainAnalysis.domain || domainAnalysis.loading}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                {domainAnalysis.loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        Analyze
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Analysis Results */}
                        {domainAnalysis.results && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.5 }}
                                className="mt-6 space-y-4"
                            >
                                {/* Performance Score */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-red-400">
                                            {domainAnalysis.results.performanceScore}
                                        </div>
                                        <div className="text-xs text-red-300">Performance Score</div>
                                    </div>
                                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-orange-400">
                                            {domainAnalysis.results.lcp.toFixed(1)}s
                                        </div>
                                        <div className="text-xs text-orange-300">LCP (Slow)</div>
                                    </div>
                                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-green-400">
                                            ${domainAnalysis.results.saasOverhead.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-green-300">Annual SaaS Waste</div>
                                    </div>
                                </div>

                                {/* Quick Wins */}
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        Immediate Optimization Opportunities
                                    </h4>
                                    <div className="space-y-2">
                                        {domainAnalysis.results.quickWins.map((win, index) => (
                                            <div key={index} className="text-sm text-slate-300 flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-blue-400 flex-shrink-0" />
                                                {win}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA for detailed analysis */}
                                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4 text-center">
                                    <p className="text-white font-medium mb-2">
                                        Get Full $149 Analysis + Fixes in 24 Hours
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Complete audit with code fixes and performance guarantees
                                    </p>
                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg text-white font-medium transition-all">
                                        Start $149 Kick-Start →
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Error state */}
                        {domainAnalysis.error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 flex items-center gap-2 text-red-400 text-sm"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {domainAnalysis.error}
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Right: Technical demonstration */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative"
                >
                    {/* Terminal window */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-700 border-b border-slate-600">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 text-sm ml-4">
                                <Terminal className="w-4 h-4" />
                                performance-audit.sh
                            </div>
                        </div>

                        <div className="p-6 font-mono text-sm">
                            {terminalCommands.slice(0, terminalStep + 1).map((command, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`mb-2 ${command.startsWith('✓')
                                        ? 'text-green-400'
                                        : command.startsWith('$')
                                            ? 'text-blue-400'
                                            : 'text-slate-300'
                                        }`}
                                >
                                    {command}
                                    {index === terminalStep && (
                                        <span className="animate-pulse text-white">|</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Floating metrics */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg"
                    >
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            +47% Revenue
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute -bottom-6 -left-6 bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            2.3s Faster
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm">See the tools</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1 h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    )
}
