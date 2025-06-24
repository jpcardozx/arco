'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    Zap,
    Globe,
    Server,
    Lock,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Eye,
    Brain,
    Terminal,
    Code2,
    Database,
    Cpu,
    Network,
    BarChart3
} from 'lucide-react'

interface DomainIntelligence {
    domain: string
    analysis_timestamp: string
    infrastructure: any
    security: any
    hosting: any
    content: any
    intelligence_score: number
    strategic_recommendations: string[]
    competitive_landscape?: any
}

interface TechnicalIntelligenceProps {
    isAuthenticated: boolean
    userTier: 'free' | 'premium' | 'enterprise'
}

export function TechnicalIntelligenceHub({ isAuthenticated, userTier }: TechnicalIntelligenceProps) {
    const [activeAnalysis, setActiveAnalysis] = useState<DomainIntelligence | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedDomain, setSelectedDomain] = useState('')
    const [realtimeMetrics, setRealtimeMetrics] = useState<any>(null)

    // Real-time performance monitoring
    useEffect(() => {
        if (!isAuthenticated || userTier === 'free') return

        const interval = setInterval(async () => {
            if (selectedDomain) {
                try {
                    const response = await fetch(`/api/performance-monitor/${selectedDomain}`, {
                        headers: {
                            'X-API-Key': 'arco_premium_analytics'
                        }
                    })
                    if (response.ok) {
                        const data = await response.json()
                        setRealtimeMetrics(data)
                    }
                } catch (err) {
                    console.error('Real-time monitoring failed:', err)
                }
            }
        }, 30000) // Update every 30 seconds

        return () => clearInterval(interval)
    }, [selectedDomain, isAuthenticated, userTier])

    const analyzeDomain = async (domain: string, deepAnalysis: boolean = false) => {
        if (!isAuthenticated) {
            setError('Authentication required for technical analysis')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/domain-intelligence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': userTier === 'enterprise' ? 'arco_premium_analytics' : 'arco_dev_key_2024'
                },
                body: JSON.stringify({
                    domain,
                    include_competitors: userTier !== 'free',
                    deep_analysis: deepAnalysis && userTier === 'enterprise'
                })
            })

            if (!response.ok) {
                throw new Error(`Analysis failed: ${response.status}`)
            }

            const intelligence = await response.json()
            setActiveAnalysis(intelligence)
            setSelectedDomain(domain)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed')
        } finally {
            setLoading(false)
        }
    }

    const renderAuthenticationGate = () => (
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8 rounded-xl border border-blue-500/20">
            <div className="text-center space-y-4">
                <div className="inline-flex p-3 bg-blue-500/20 rounded-full">
                    <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Technical Intelligence Access</h3>
                <p className="text-slate-300 max-w-md mx-auto">
                    Advanced domain analysis, competitive intelligence, and real-time monitoring
                    require authentication and appropriate access tier.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                        Sign In for Access
                    </button>
                    <button className="px-6 py-3 border border-blue-500/30 hover:border-blue-500/50 rounded-lg font-medium transition-colors">
                        View Demo Analysis
                    </button>
                </div>
            </div>
        </div>
    )

    const renderIntelligenceScore = (score: number) => {
        const getScoreColor = (score: number) => {
            if (score >= 80) return 'text-emerald-400'
            if (score >= 60) return 'text-yellow-400'
            return 'text-red-400'
        }

        const getScoreLabel = (score: number) => {
            if (score >= 90) return 'Exceptional'
            if (score >= 80) return 'Advanced'
            if (score >= 60) return 'Intermediate'
            if (score >= 40) return 'Basic'
            return 'Critical Issues'
        }

        return (
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="text-center space-y-3">
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Intelligence Score</div>
                    <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                        {score}/100
                    </div>
                    <div className="text-sm text-slate-300">{getScoreLabel(score)}</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                        <motion.div
                            className={`h-2 rounded-full ${score >= 80 ? 'bg-emerald-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const renderSecurityAnalysis = (security: any) => (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">SSL Certificate</span>
                        {security.certificate_valid ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                    </div>
                    <div className="text-white font-medium">
                        {security.certificate_valid ? 'Valid & Secure' : 'Invalid or Missing'}
                    </div>
                    {security.certificate_authority && (
                        <div className="text-xs text-slate-400 mt-1">
                            Issued by: {security.certificate_authority}
                        </div>
                    )}
                </div>

                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Security Score</span>
                        <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-white font-medium">
                        {security.security_score || 0}/100
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                        Protocol: {security.protocol_version || 'Unknown'}
                    </div>
                </div>
            </div>
        </div>
    )

    const renderInfrastructureAnalysis = (infrastructure: any) => (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Server className="w-5 h-5" />
                Infrastructure Intelligence
            </h4>

            {infrastructure.nameservers && infrastructure.nameservers.length > 0 && (
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                    <div className="text-sm text-slate-400 mb-2">DNS Infrastructure</div>
                    <div className="space-y-1">
                        {infrastructure.nameservers.slice(0, 3).map((ns: string, index: number) => (
                            <div key={index} className="text-white text-sm font-mono">
                                {ns}
                            </div>
                        ))}
                    </div>
                    {infrastructure.cdn_detection && Object.keys(infrastructure.cdn_detection).length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-600">
                            <div className="text-xs text-slate-400 mb-1">CDN Detection</div>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(infrastructure.cdn_detection).map((cdn) => (
                                    <span key={cdn} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                                        {cdn}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )

    const renderContentAnalysis = (content: any) => (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Content Intelligence
            </h4>

            {content.meta_analysis && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                        <div className="text-sm text-slate-400 mb-2">SEO Optimization</div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-white text-sm">Title Length</span>
                                <span className={`text-sm ${content.meta_analysis.title_length > 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {content.meta_analysis.title_length} chars
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white text-sm">Description</span>
                                <span className={`text-sm ${content.meta_analysis.description_length > 160 ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {content.meta_analysis.description_length} chars
                                </span>
                            </div>
                        </div>
                    </div>

                    {content.content_metrics && (
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                            <div className="text-sm text-slate-400 mb-2">Content Metrics</div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-white text-sm">Word Count</span>
                                    <span className="text-slate-300 text-sm">{content.content_metrics.word_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white text-sm">Images</span>
                                    <span className="text-slate-300 text-sm">{content.content_metrics.image_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white text-sm">Links</span>
                                    <span className="text-slate-300 text-sm">{content.content_metrics.link_count}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {content.readability && (
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                    <div className="text-sm text-slate-400 mb-2">Readability Analysis</div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-white font-medium">{content.readability.flesch_reading_ease.toFixed(1)}</div>
                            <div className="text-xs text-slate-400">Flesch Reading Ease</div>
                        </div>
                        <div>
                            <div className="text-white font-medium">{content.readability.flesch_kincaid_grade.toFixed(1)}</div>
                            <div className="text-xs text-slate-400">Grade Level</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    const renderRealTimeMetrics = () => {
        if (!realtimeMetrics) return null

        return (
            <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-lg p-6 border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    Real-Time Performance
                    <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">LIVE</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">
                            {(realtimeMetrics.performance.response_time * 1000).toFixed(0)}ms
                        </div>
                        <div className="text-sm text-slate-400">Response Time</div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                            {realtimeMetrics.performance.status_code}
                        </div>
                        <div className="text-sm text-slate-400">Status Code</div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                            {(realtimeMetrics.performance.content_size / 1024).toFixed(1)}KB
                        </div>
                        <div className="text-sm text-slate-400">Content Size</div>
                    </div>
                </div>

                {realtimeMetrics.alerts && realtimeMetrics.alerts.length > 0 && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400 font-medium">
                            <AlertTriangle className="w-4 h-4" />
                            Performance Alerts
                        </div>
                        <ul className="mt-2 space-y-1">
                            {realtimeMetrics.alerts.map((alert: string, index: number) => (
                                <li key={index} className="text-sm text-red-300">• {alert}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
                        >
                            <Brain className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-300 text-sm font-medium">Technical Intelligence Platform</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Advanced Domain Intelligence
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-300 max-w-3xl mx-auto mb-12"
                        >
                            Deep technical analysis, competitive intelligence, and real-time performance monitoring
                            powered by advanced Python APIs and machine learning algorithms.
                        </motion.p>
                    </div>

                    {renderAuthenticationGate()}
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-medium">
                            {userTier.toUpperCase()} Access • Technical Intelligence Hub
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Domain Intelligence Console
                    </motion.h2>
                </div>

                {/* Analysis Input */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Enter domain for analysis (e.g., example.com)"
                            value={selectedDomain}
                            onChange={(e) => setSelectedDomain(e.target.value)}
                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                            onClick={() => analyzeDomain(selectedDomain, userTier === 'enterprise')}
                            disabled={loading || !selectedDomain}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Analyzing
                                </>
                            ) : (
                                <>
                                    <Brain className="w-4 h-4" />
                                    Analyze
                                </>
                            )}
                        </button>
                    </div>

                    {userTier !== 'free' && (
                        <div className="mt-3 text-sm text-slate-400 text-center">
                            {userTier === 'enterprise' ? 'Deep analysis enabled • Real-time monitoring active' : 'Premium analysis enabled'}
                        </div>
                    )}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-4 h-4" />
                                Analysis Error
                            </div>
                            <div className="text-red-300 mt-1">{error}</div>
                        </div>
                    </div>
                )}

                {/* Analysis Results */}
                <AnimatePresence>
                    {activeAnalysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* Intelligence Score */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="lg:col-span-1">
                                    {renderIntelligenceScore(activeAnalysis.intelligence_score)}
                                </div>

                                <div className="lg:col-span-3">
                                    {renderRealTimeMetrics()}
                                </div>
                            </div>

                            {/* Detailed Analysis */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    {activeAnalysis.security && renderSecurityAnalysis(activeAnalysis.security)}
                                    {activeAnalysis.infrastructure && renderInfrastructureAnalysis(activeAnalysis.infrastructure)}
                                </div>

                                <div className="space-y-8">
                                    {activeAnalysis.content && renderContentAnalysis(activeAnalysis.content)}

                                    {/* Strategic Recommendations */}
                                    {activeAnalysis.strategic_recommendations && activeAnalysis.strategic_recommendations.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5" />
                                                Strategic Recommendations
                                            </h4>
                                            <div className="space-y-3">
                                                {activeAnalysis.strategic_recommendations.map((rec: string, index: number) => (
                                                    <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                                        <div className="text-blue-300 text-sm">{rec}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
