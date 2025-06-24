'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import {
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    BoltIcon,
    ChartBarIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline'

interface DomainAnalysis {
    domain: string
    status: 'idle' | 'analyzing' | 'complete'
    performance: {
        score: number
        lcp: number
        cls: number
        fid: number
        issues: string[]
    }
    security: {
        score: number
        ssl: boolean
        headers: string[]
        vulnerabilities: string[]
    }
    seo: {
        score: number
        issues: string[]
        opportunities: string[]
    }
}

export function DomainIntelligencePreview() {
    const { user, isAuthenticated } = useAuth()
    const [domain, setDomain] = useState('')
    const [analysis, setAnalysis] = useState<DomainAnalysis | null>(null)
    const [showUpgrade, setShowUpgrade] = useState(false)

    const runQuickAnalysis = async () => {
        if (!domain) return

        const newAnalysis: DomainAnalysis = {
            domain,
            status: 'analyzing',
            performance: { score: 0, lcp: 0, cls: 0, fid: 0, issues: [] },
            security: { score: 0, ssl: false, headers: [], vulnerabilities: [] },
            seo: { score: 0, issues: [], opportunities: [] }
        }

        setAnalysis(newAnalysis)

        // Simulate progressive analysis
        setTimeout(() => {
            setAnalysis(prev => prev ? {
                ...prev,
                performance: {
                    score: 67,
                    lcp: 3.2,
                    cls: 0.15,
                    fid: 180,
                    issues: ['Large images without optimization', 'Render-blocking JavaScript']
                }
            } : null)
        }, 1500)

        setTimeout(() => {
            setAnalysis(prev => prev ? {
                ...prev,
                security: {
                    score: 84,
                    ssl: true,
                    headers: ['HSTS', 'CSP'],
                    vulnerabilities: ['Missing X-Frame-Options', 'Weak CSP policy']
                }
            } : null)
        }, 3000)

        setTimeout(() => {
            setAnalysis(prev => prev ? {
                ...prev,
                status: 'complete',
                seo: {
                    score: 72,
                    issues: ['Missing meta descriptions', 'Slow page speed'],
                    opportunities: ['Schema markup implementation', 'Internal linking optimization']
                }
            } : null)

            // Show upgrade prompt after analysis for non-authenticated users
            if (!isAuthenticated) {
                setTimeout(() => setShowUpgrade(true), 2000)
            }
        }, 4500)
    }

    const handleFullAnalysis = () => {
        if (isAuthenticated) {
            window.location.href = `/domain-intelligence?domain=${encodeURIComponent(domain)}`
        } else {
            window.dispatchEvent(new CustomEvent('openAuthModal'))
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400'
        if (score >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getScoreBgColor = (score: number) => {
        if (score >= 80) return 'bg-green-500/20 border-green-500/30'
        if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30'
        return 'bg-red-500/20 border-red-500/30'
    }

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-16">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-3 mb-6">
                        <GlobeAltIcon className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-200 font-medium">Real-time Domain Intelligence</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Technical Analysis
                        <span className="block text-purple-400">In Under 60 Seconds</span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Get comprehensive technical insights: performance, security, SEO, and competitive positioning.
                    </p>
                </motion.div>

                {/* Domain Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="url"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    placeholder="Enter domain (e.g., competitor.com)"
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none"
                                />
                            </div>
                            <motion.button
                                onClick={runQuickAnalysis}
                                disabled={!domain || analysis?.status === 'analyzing'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {analysis?.status === 'analyzing' ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Analyzing
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                        Analyze
                                    </div>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Analysis Results */}
                {analysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Score Overview */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <motion.div
                                className={`p-6 rounded-2xl border backdrop-blur-sm ${getScoreBgColor(analysis.performance.score)}`}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <BoltIcon className="w-6 h-6 text-yellow-400" />
                                    <h3 className="text-lg font-bold text-white">Performance</h3>
                                </div>
                                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysis.performance.score)}`}>
                                    {analysis.performance.score || '--'}/100
                                </div>
                                {analysis.performance.issues.length > 0 && (
                                    <div className="space-y-1">
                                        {analysis.performance.issues.slice(0, 2).map((issue, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                <ExclamationTriangleIcon className="w-3 h-3 text-red-400" />
                                                <span className="text-slate-300">{issue}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                className={`p-6 rounded-2xl border backdrop-blur-sm ${getScoreBgColor(analysis.security.score)}`}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                                    <h3 className="text-lg font-bold text-white">Security</h3>
                                </div>
                                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysis.security.score)}`}>
                                    {analysis.security.score || '--'}/100
                                </div>
                                {analysis.security.vulnerabilities.length > 0 && (
                                    <div className="space-y-1">
                                        {analysis.security.vulnerabilities.slice(0, 2).map((vuln, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                <ExclamationTriangleIcon className="w-3 h-3 text-amber-400" />
                                                <span className="text-slate-300">{vuln}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                className={`p-6 rounded-2xl border backdrop-blur-sm ${getScoreBgColor(analysis.seo.score)}`}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <ChartBarIcon className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-lg font-bold text-white">SEO</h3>
                                </div>
                                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysis.seo.score)}`}>
                                    {analysis.seo.score || '--'}/100
                                </div>
                                {analysis.seo.issues.length > 0 && (
                                    <div className="space-y-1">
                                        {analysis.seo.issues.slice(0, 2).map((issue, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                <ExclamationTriangleIcon className="w-3 h-3 text-red-400" />
                                                <span className="text-slate-300">{issue}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Detailed Analysis */}
                        {analysis.status === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <CheckCircleIcon className="w-6 h-6 text-green-400" />
                                        <h3 className="text-xl font-bold text-white">Analysis Complete</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>Completed in 4.5s</span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4">Key Findings</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                <span className="text-slate-300">Page speed optimization needed</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                <span className="text-slate-300">Security headers partially configured</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <span className="text-slate-300">SSL properly configured</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4">Quick Wins</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                <span className="text-slate-300">Compress images (30% improvement)</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                <span className="text-slate-300">Add missing meta descriptions</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <span className="text-slate-300">Implement caching headers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-semibold text-white">Get Complete Analysis</h4>
                                        <ChartBarIcon className="w-6 h-6 text-purple-400" />
                                    </div>

                                    <p className="text-slate-300 mb-4">
                                        This quick scan shows basic insights. The full analysis includes:
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                                <span className="text-slate-300">Competitive comparison</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                                <span className="text-slate-300">Technical architecture analysis</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                                <span className="text-slate-300">Detailed improvement roadmap</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                                <span className="text-slate-300">ROI projections for each fix</span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        onClick={handleFullAnalysis}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                                    >
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                        Access Full Domain Intelligence
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Upgrade Modal */}
                {showUpgrade && !isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowUpgrade(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <MagnifyingGlassIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Unlock Full Domain Intelligence
                                </h3>
                                <p className="text-slate-300 mb-6">
                                    Sign up to access competitive analysis, detailed roadmaps, and unlimited domain scans.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowUpgrade(false)}
                                        className="flex-1 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
                                    >
                                        Later
                                    </button>
                                    <button
                                        onClick={handleFullAnalysis}
                                        className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                                    >
                                        Sign Up Free
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
