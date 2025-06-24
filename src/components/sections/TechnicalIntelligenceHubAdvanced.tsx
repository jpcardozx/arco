'use client'

import { useState, useEffect, useCallback } from 'react'
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
    BarChart3,
    Search,
    Download,
    Play,
    Pause,
    RefreshCw,
    Crown,
    Sparkles,
    Target,
    Rocket,
    Monitor,
    Activity,
    Clock,
    Users,
    Layers,
    ExternalLink
} from 'lucide-react'

interface DomainIntelligence {
    domain: string
    analysis_timestamp: string
    infrastructure: {
        hosting_provider: string
        server_location: string
        cdn_usage: boolean
        ssl_grade: string
        dns_records: any[]
        performance_score: number
    }
    security: {
        ssl_status: string
        security_headers: any
        vulnerabilities: string[]
        certificate_valid: boolean
        security_score: number
    }
    competitive: {
        market_position: string
        technology_stack: string[]
        traffic_estimate: string
        seo_score: number
        content_quality: number
    }
    intelligence_score: number
    strategic_recommendations: string[]
    real_time_metrics?: {
        uptime: number
        response_time: number
        error_rate: number
    }
}

interface TechnicalIntelligenceProps {
    isAuthenticated: boolean
    userTier: 'free' | 'premium' | 'enterprise'
}

const DEMO_DOMAINS = [
    'tesla.com',
    'airbnb.com',
    'stripe.com',
    'notion.so',
    'figma.com'
]

const TIER_LIMITS = {
    free: { analyses: 3, features: ['basic_scan'] },
    premium: { analyses: 50, features: ['basic_scan', 'deep_analysis', 'competitor_intel'] },
    enterprise: { analyses: -1, features: ['basic_scan', 'deep_analysis', 'competitor_intel', 'real_time', 'api_access'] }
}

export function TechnicalIntelligenceHubAdvanced({ isAuthenticated, userTier }: TechnicalIntelligenceProps) {
    const [activeAnalysis, setActiveAnalysis] = useState<DomainIntelligence | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedDomain, setSelectedDomain] = useState('')
    const [realtimeMetrics, setRealtimeMetrics] = useState<any>(null)
    const [analysisHistory, setAnalysisHistory] = useState<DomainIntelligence[]>([])
    const [autoRefresh, setAutoRefresh] = useState(false)
    const [activeTab, setActiveTab] = useState<'scanner' | 'monitor' | 'intelligence'>('scanner')
    const [activeAnalysisTab, setActiveAnalysisTab] = useState<'infrastructure' | 'security' | 'competitive'>('infrastructure')

    // Real-time monitoring for premium users
    useEffect(() => {
        if (!isAuthenticated || userTier === 'free' || !autoRefresh) return

        const interval = setInterval(async () => {
            if (selectedDomain) {
                await refreshRealTimeMetrics()
            }
        }, 30000)

        return () => clearInterval(interval)
    }, [selectedDomain, isAuthenticated, userTier, autoRefresh])

    const refreshRealTimeMetrics = useCallback(async () => {
        if (!selectedDomain || userTier === 'free') return

        try {
            const response = await fetch(`/api/performance-monitor/${selectedDomain}`, {
                headers: {
                    'X-API-Key': userTier === 'enterprise' ? 'arco_premium_analytics' : 'arco_dev_key_2024'
                }
            })
            if (response.ok) {
                const data = await response.json()
                setRealtimeMetrics(data)
            }
        } catch (err) {
            console.error('Real-time monitoring failed:', err)
        }
    }, [selectedDomain, userTier])

    const analyzeDomain = async (domain: string, deepAnalysis: boolean = false) => {
        if (!isAuthenticated) {
            setError('🔐 Technical analysis requires authentication')
            return
        }

        if (userTier === 'free' && analysisHistory.length >= TIER_LIMITS.free.analyses) {
            setError('🚀 Free tier limit reached. Upgrade for unlimited analysis.')
            return
        } setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/domain-intelligence-advanced', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': userTier === 'enterprise' ? 'arco_premium_analytics' : 'arco_dev_key_2024'
                },
                body: JSON.stringify({
                    domain,
                    include_competitors: userTier !== 'free',
                    deep_analysis: deepAnalysis && userTier === 'enterprise',
                    real_time_monitoring: userTier !== 'free'
                })
            })

            if (!response.ok) {
                throw new Error(`Analysis failed: ${response.status}`)
            }

            const intelligence = await response.json()
            setActiveAnalysis(intelligence)
            setAnalysisHistory(prev => [intelligence, ...prev.slice(0, 9)]) // Keep last 10

            if (userTier !== 'free') {
                await refreshRealTimeMetrics()
            }
        } catch (err) {
            setError(`❌ Analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-400 bg-emerald-400/10'
        if (score >= 60) return 'text-yellow-400 bg-yellow-400/10'
        return 'text-red-400 bg-red-400/10'
    }

    const renderAuthenticationGate = () => {
        if (isAuthenticated) return null

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur border border-blue-500/20 rounded-2xl p-8"
            >
                <div className="flex justify-center mb-4">
                    <Lock className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                    Technical Intelligence Suite
                </h3>
                <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                    Real-time domain analysis, security auditing, competitive intelligence, and performance monitoring.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                        { icon: Shield, label: 'Security Analysis', desc: 'SSL, vulnerabilities, headers' },
                        { icon: Zap, label: 'Performance Audit', desc: 'Speed, optimization, CDN' },
                        { icon: Brain, label: 'Intelligence', desc: 'Competitive insights' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-slate-800/30 rounded-lg p-4">
                            <feature.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                            <h4 className="font-semibold text-white text-sm mb-1">{feature.label}</h4>
                            <p className="text-xs text-slate-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal'))}
                >
                    Unlock Technical Suite
                </button>
            </motion.div>
        )
    }

    const renderDomainAnalyzer = () => (
        <div className="space-y-6">
            {/* Domain Input */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Enter domain (e.g., tesla.com)"
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-900/70 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                onKeyPress={(e) => e.key === 'Enter' && selectedDomain && analyzeDomain(selectedDomain)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => selectedDomain && analyzeDomain(selectedDomain)}
                            disabled={loading || !selectedDomain}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                            {loading ? 'Analyzing...' : 'Analyze'}
                        </button>
                        {userTier === 'enterprise' && (
                            <button
                                onClick={() => selectedDomain && analyzeDomain(selectedDomain, true)}
                                disabled={loading || !selectedDomain}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-slate-600 disabled:to-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Crown className="w-4 h-4" />
                                Deep Scan
                            </button>
                        )}
                    </div>
                </div>

                {/* Demo Domains */}
                <div className="mt-4">
                    <p className="text-sm text-slate-400 mb-2">Quick analysis:</p>
                    <div className="flex flex-wrap gap-2">
                        {DEMO_DOMAINS.map((domain) => (
                            <button
                                key={domain}
                                onClick={() => {
                                    setSelectedDomain(domain)
                                    analyzeDomain(domain)
                                }}
                                className="text-sm bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1 rounded-full transition-colors"
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-900/20 border border-red-500/50 rounded-lg p-4"
                >
                    <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-medium">{error}</span>
                    </div>
                </motion.div>
            )}
        </div>
    )

    const renderAnalysisResults = () => {
        if (!activeAnalysis) return null

        const { infrastructure, security, competitive, intelligence_score } = activeAnalysis

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Header with Score */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Globe className="w-6 h-6 text-blue-400" />
                                {activeAnalysis.domain}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Analyzed {new Date(activeAnalysis.analysis_timestamp).toLocaleString()}
                            </p>
                        </div>
                        <div className={`text-right p-4 rounded-lg ${getScoreColor(intelligence_score)}`}>
                            <div className="text-2xl font-bold">{intelligence_score}</div>
                            <div className="text-sm opacity-80">Intelligence Score</div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-slate-300">Security</span>
                            </div>
                            <div className="text-xl font-bold text-white">{security.security_score}/100</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-slate-300">Performance</span>
                            </div>
                            <div className="text-xl font-bold text-white">{infrastructure.performance_score}/100</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-slate-300">SEO</span>
                            </div>
                            <div className="text-xl font-bold text-white">{competitive.seo_score}/100</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="w-4 h-4 text-purple-400" />
                                <span className="text-sm text-slate-300">Traffic</span>
                            </div>
                            <div className="text-sm font-bold text-white">{competitive.traffic_estimate}</div>
                        </div>
                    </div>
                </div>

                {/* Detailed Analysis Tabs */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className="border-b border-slate-700/50">
                        <div className="flex">              {[
                            { id: 'infrastructure', label: 'Infrastructure', icon: Server },
                            { id: 'security', label: 'Security', icon: Shield },
                            { id: 'competitive', label: 'Intelligence', icon: Brain }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveAnalysisTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${activeAnalysisTab === tab.id
                                        ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-500'
                                        : 'text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {activeAnalysisTab === 'infrastructure' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-900/30 rounded-lg p-4">
                                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                            <Server className="w-4 h-4 text-blue-400" />
                                            Hosting Details
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Provider</span>
                                                <span className="text-white">{infrastructure.hosting_provider}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Location</span>
                                                <span className="text-white">{infrastructure.server_location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">CDN</span>
                                                <span className={infrastructure.cdn_usage ? 'text-green-400' : 'text-red-400'}>
                                                    {infrastructure.cdn_usage ? 'Active' : 'Not Detected'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/30 rounded-lg p-4">
                                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-green-400" />
                                            SSL Certificate
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Grade</span>
                                                <span className="text-white font-mono">{infrastructure.ssl_grade}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Status</span>
                                                <span className={security.certificate_valid ? 'text-green-400' : 'text-red-400'}>
                                                    {security.certificate_valid ? 'Valid' : 'Invalid'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeAnalysisTab === 'security' && (
                            <div className="space-y-4">
                                <div className="bg-slate-900/30 rounded-lg p-4">
                                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-green-400" />
                                        Security Headers
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(security.security_headers || {}).map(([header, status]) => (
                                            <div key={header} className="flex items-center justify-between">
                                                <span className="text-slate-400 text-sm">{header}</span>
                                                <span className={`text-xs px-2 py-1 rounded ${status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {status ? 'Present' : 'Missing'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {security.vulnerabilities?.length > 0 && (
                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                        <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            Potential Vulnerabilities
                                        </h4>
                                        <ul className="space-y-1">
                                            {security.vulnerabilities.map((vuln: string, i: number) => (
                                                <li key={i} className="text-sm text-red-300">• {vuln}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeAnalysisTab === 'competitive' && userTier !== 'free' && (
                            <div className="space-y-4">
                                <div className="bg-slate-900/30 rounded-lg p-4">
                                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-purple-400" />
                                        Market Intelligence
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-slate-400 text-sm">Market Position</span>
                                            <div className="text-white font-medium">{competitive.market_position}</div>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-sm">Technology Stack</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {competitive.technology_stack?.map((tech: string, i: number) => (
                                                    <span key={i} className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Strategic Recommendations */}
                {activeAnalysis.strategic_recommendations?.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur border border-purple-500/30 rounded-xl p-6">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-400" />
                            Strategic Recommendations
                        </h4>
                        <div className="space-y-3">
                            {activeAnalysis.strategic_recommendations.map((rec, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">{rec}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        )
    }

    const renderRealtimeMonitor = () => {
        if (userTier === 'free') {
            return (
                <div className="text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur border border-purple-500/20 rounded-xl p-8">
                    <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h3>
                    <p className="text-slate-300 mb-4">Live performance tracking and alerts for Premium+ users</p>
                    <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-semibold">
                        Upgrade to Premium
                    </button>
                </div>
            )
        }

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Real-time Monitor</h3>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setAutoRefresh(!autoRefresh)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${autoRefresh
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
                        </button>
                        <button
                            onClick={refreshRealTimeMetrics}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {realtimeMetrics && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Activity className="w-6 h-6 text-green-400" />
                                <h4 className="font-semibold text-white">Uptime</h4>
                            </div>
                            <div className="text-3xl font-bold text-green-400">{realtimeMetrics.uptime}%</div>
                            <p className="text-green-300 text-sm">Last 30 days</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-6 h-6 text-blue-400" />
                                <h4 className="font-semibold text-white">Response Time</h4>
                            </div>
                            <div className="text-3xl font-bold text-blue-400">{realtimeMetrics.response_time}ms</div>
                            <p className="text-blue-300 text-sm">Average</p>
                        </div>

                        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                <h4 className="font-semibold text-white">Error Rate</h4>
                            </div>
                            <div className="text-3xl font-bold text-red-400">{realtimeMetrics.error_rate}%</div>
                            <p className="text-red-300 text-sm">Last 24h</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur border border-blue-500/30 rounded-full p-4">
                            <Terminal className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Technical Intelligence
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Suite</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                        Real-time domain analysis, security auditing, competitive intelligence, and performance monitoring.
                        Built with Python, powered by actual technical analysis.
                    </p>

                    {/* Tier Status */}
                    {isAuthenticated && (
                        <div className="flex justify-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${userTier === 'enterprise'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                                    : userTier === 'premium'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/50'
                                }`}>
                                {userTier === 'enterprise' && <Crown className="w-4 h-4" />}
                                {userTier === 'premium' && <Sparkles className="w-4 h-4" />}
                                {userTier === 'free' && <Users className="w-4 h-4" />}
                                {userTier.toUpperCase()} TIER
                            </div>
                        </div>
                    )}
                </motion.div>

                {!isAuthenticated ? renderAuthenticationGate() : (
                    <div className="space-y-8">
                        {/* Navigation Tabs */}
                        <div className="flex justify-center">
                            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-1 flex">
                                {[
                                    { id: 'scanner', label: 'Domain Scanner', icon: Search },
                                    { id: 'monitor', label: 'Real-time Monitor', icon: Monitor },
                                    { id: 'intelligence', label: 'Intelligence Hub', icon: Brain }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-slate-300'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content based on active tab */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'scanner' && (
                                    <div className="space-y-8">
                                        {renderDomainAnalyzer()}
                                        {renderAnalysisResults()}
                                    </div>
                                )}
                                {activeTab === 'monitor' && renderRealtimeMonitor()}
                                {activeTab === 'intelligence' && (
                                    <div className="text-center py-16">
                                        <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2">Advanced Intelligence Hub</h3>
                                        <p className="text-slate-300">Coming soon: AI-powered insights and predictive analytics</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    )
}
