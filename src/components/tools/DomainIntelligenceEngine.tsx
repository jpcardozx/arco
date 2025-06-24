'use client'

/**
 * ARCO PATCH 3: Domain Intelligence Engine - ENHANCED
 * Executive Design System Implementation
 * Premium UI with sophisticated micro-interactions
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Zap,
    Shield,
    DollarSign,
    Target,
    BarChart3,
    Sparkles,
    Download,
    Share2,
    Loader2,
    Globe,
    TrendingUp,
    AlertTriangle
} from 'lucide-react'
import { BusinessIntelligenceDashboard } from '../intelligence/BusinessIntelligenceDashboard'
import {
    ExecutiveButton,
    ExecutiveCard,
    ExecutiveInput,
    ExecutiveDashboard,
    ExecutiveMetric
} from '../ui/design-system'

// Enhanced interface matching the API response
interface DomainAnalysisResult {
    domain: string
    timestamp: string
    analysisDepth: string
    performance: {
        lighthouse: {
            performance: number
            accessibility: number
            bestPractices: number
            seo: number
        }
        coreWebVitals: {
            lcp: number
            fid: number
            cls: number
            fcp: number
            ttfb: number
        }
    }
    businessIntelligence: {
        estimatedTraffic: {
            monthly: number
            trend: 'up' | 'down' | 'stable'
        }
        revenueMetrics: {
            estimatedRevenue: number
            conversionRate: number
            averageOrderValue: number
            customerLifetimeValue: number
        }
        competitiveAnalysis: {
            marketPosition: number
            competitorCount: number
        }
        riskAssessment: {
            performanceRisk: number
            securityRisk: number
            complianceRisk: number
            totalRiskScore: number
        }
    }
    opportunities: Array<{
        category: 'performance' | 'security' | 'seo' | 'conversion' | 'infrastructure'
        title: string
        description: string
        impact: {
            revenue: number
            traffic: number
            conversion: number
        }
        effort: 'low' | 'medium' | 'high'
        timeline: string
        priority: number
    }>
    financialImpact: {
        currentLosses: {
            performanceLoss: number
            securityRisk: number
            seoOpportunity: number
            conversionLoss: number
        }
        quickWins: Array<{
            title: string
            investment: number
            monthlyReturn: number
            paybackPeriod: number
            implementation: string
        }>
    }
}

export function DomainIntelligenceEngine() {
    const [domain, setDomain] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [results, setResults] = useState<DomainAnalysisResult | null>(null)
    const [error, setError] = useState('')
    const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'comprehensive' | 'enterprise'>('basic')
    const [showDashboard, setShowDashboard] = useState(false)

    // Progressive profiling states
    const [industry, setIndustry] = useState<string>('')
    const [profileEmail, setProfileEmail] = useState('')
    const [showProgressiveForm, setShowProgressiveForm] = useState(false)
    const [companySize, setCompanySize] = useState<string>('')

    const handleAnalysis = async () => {
        if (!domain) return

        setIsAnalyzing(true)
        setError('')
        setResults(null)

        try {
            const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')

            const response = await fetch('/api/domain-intelligence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    domain: `https://${cleanDomain}`,
                    depth: analysisDepth,
                    includeCompetitor: false,
                    industry: industry || undefined,
                    profileEmail: profileEmail || undefined,
                    companySize: companySize || undefined
                })
            })

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.error || 'Analysis failed')
            }

            setResults(data.data)
            setShowDashboard(true)

            // Show progressive profiling form after first analysis if not provided
            if (!profileEmail && !showProgressiveForm && analysisDepth === 'basic') {
                setTimeout(() => setShowProgressiveForm(true), 3000)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.')
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getTotalLosses = (financial: DomainAnalysisResult['financialImpact']) => {
        return financial.currentLosses.performanceLoss +
            financial.currentLosses.securityRisk +
            financial.currentLosses.seoOpportunity +
            financial.currentLosses.conversionLoss
    }

    const formatBusinessData = (results: DomainAnalysisResult) => {
        return {
            performance: {
                lighthouse: results.performance.lighthouse,
                coreWebVitals: results.performance.coreWebVitals,
                trend: results.businessIntelligence.estimatedTraffic.trend
            },
            businessMetrics: {
                estimatedRevenue: results.businessIntelligence.revenueMetrics.estimatedRevenue,
                conversionRate: results.businessIntelligence.revenueMetrics.conversionRate,
                trafficGrowth: results.businessIntelligence.estimatedTraffic.trend === 'up' ? 15 :
                    results.businessIntelligence.estimatedTraffic.trend === 'down' ? -8 : 0,
                competitorGap: 100 - results.businessIntelligence.competitiveAnalysis.marketPosition,
                marketPosition: results.businessIntelligence.competitiveAnalysis.marketPosition
            },
            opportunities: results.opportunities.map(opp => ({
                category: opp.category,
                title: opp.title,
                impact: opp.impact.revenue,
                effort: opp.effort,
                roi: Math.round((opp.impact.revenue / 1000) * 12),
                timeline: opp.timeline
            })),
            riskFactors: [
                {
                    type: 'Performance Risk',
                    severity: results.businessIntelligence.riskAssessment.performanceRisk > 70 ? 'high' :
                        results.businessIntelligence.riskAssessment.performanceRisk > 40 ? 'medium' : 'low',
                    impact: results.businessIntelligence.riskAssessment.performanceRisk,
                    description: 'Site performance affecting user experience and conversions'
                },
                {
                    type: 'Security Risk',
                    severity: results.businessIntelligence.riskAssessment.securityRisk > 60 ? 'high' :
                        results.businessIntelligence.riskAssessment.securityRisk > 30 ? 'medium' : 'low',
                    impact: results.businessIntelligence.riskAssessment.securityRisk,
                    description: 'Security vulnerabilities threatening business continuity'
                }
            ] as any,
            quickWins: results.financialImpact.quickWins
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-full"></div>
                    <h2 className="relative text-4xl font-bold text-white mb-4">
                        Domain Intelligence Engine
                        <Sparkles className="inline w-8 h-8 ml-2 text-yellow-400" />
                    </h2>
                </motion.div>
                <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                    Get comprehensive insights into your website's performance, security, and revenue optimization opportunities.
                    <strong className="text-white"> Real-time analysis with business intelligence.</strong>
                </p>
            </div>

            {!showDashboard ? (
                <div className="space-y-8">                    {/* Analysis Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <ExecutiveCard variant="executive" padding="lg">
                            {/* Analysis Depth Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-3">Analysis Depth</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'basic', name: 'Basic Analysis', desc: 'Core metrics & quick wins', time: '~2s' },
                                        { id: 'comprehensive', name: 'Comprehensive', desc: 'Deep analysis & opportunities', time: '~5s' },
                                        { id: 'enterprise', name: 'Enterprise', desc: 'Full intelligence & competitive', time: '~8s' }
                                    ].map((option) => (
                                        <ExecutiveButton
                                            key={option.id}
                                            onClick={() => setAnalysisDepth(option.id as any)}
                                            variant={analysisDepth === option.id ? 'primary' : 'ghost'}
                                            size="md"
                                            className="h-auto p-4 text-left"
                                        >
                                            <div className="space-y-1">
                                                <div className="font-medium">{option.name}</div>
                                                <div className="text-sm opacity-70">{option.desc}</div>
                                                <div className="text-xs opacity-50">{option.time}</div>
                                            </div>
                                        </ExecutiveButton>
                                    ))}
                                </div>
                            </div>

                            {/* Industry and Company Context (Progressive Enhancement) */}
                            {(analysisDepth === 'comprehensive' || analysisDepth === 'enterprise') && (
                                <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Industry (for benchmarking)
                                            </label>
                                            <select
                                                value={industry}
                                                onChange={(e) => setIndustry(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">General</option>
                                                <option value="saas">SaaS & Technology</option>
                                                <option value="ecommerce">E-commerce</option>
                                                <option value="financial">Financial Services</option>
                                                <option value="healthcare">Healthcare</option>
                                                <option value="manufacturing">Manufacturing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Company Size
                                            </label>
                                            <select
                                                value={companySize}
                                                onChange={(e) => setCompanySize(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select size</option>
                                                <option value="startup">Startup (1-10 employees)</option>
                                                <option value="small">Small (11-50 employees)</option>
                                                <option value="medium">Medium (51-200 employees)</option>
                                                <option value="enterprise">Enterprise (200+ employees)</option>
                                            </select>
                                        </div>
                                    </div>
                                    {analysisDepth === 'enterprise' && (
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Email (for detailed report & industry benchmarks)
                                            </label>
                                            <input
                                                type="email"
                                                value={profileEmail}
                                                onChange={(e) => setProfileEmail(e.target.value)}
                                                placeholder="your@company.com (optional)"
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                            />
                                            <p className="text-xs text-slate-400 mt-1">
                                                Receive detailed PDF report with industry-specific recommendations
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}                        {/* Domain Input */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <ExecutiveInput
                                        type="url"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        placeholder="Enter your domain (e.g., example.com)"
                                        disabled={isAnalyzing}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAnalysis()}
                                        leftIcon={<Globe className="w-5 h-5" />}
                                        size="executive"
                                    />
                                </div>
                                <ExecutiveButton
                                    onClick={handleAnalysis}
                                    disabled={!domain || isAnalyzing}
                                    variant="primary"
                                    size="executive"
                                    icon={isAnalyzing ? <Loader2 className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
                                    loading={isAnalyzing}
                                >
                                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}                            </ExecutiveButton>
                            </div>

                            {error && (
                                <ExecutiveCard
                                    variant="elevated"
                                    className="mt-4 bg-red-500/10 border-red-500/30"
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-red-400">{error}</div>
                                    </div>
                                </ExecutiveCard>
                            )}
                        </ExecutiveCard>
                    </motion.div>{/* Features Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            {
                                icon: Zap,
                                title: 'Performance Analysis',
                                desc: 'Core Web Vitals, Lighthouse scores, and optimization opportunities'
                            },
                            {
                                icon: Shield,
                                title: 'Security Assessment',
                                desc: 'SSL analysis, security headers, and vulnerability scanning'
                            },
                            {
                                icon: DollarSign,
                                title: 'Revenue Impact',
                                desc: 'Business metrics, conversion analysis, and financial projections'
                            },
                            {
                                icon: Target,
                                title: 'Quick Wins',
                                desc: 'Immediate improvements with high ROI and clear implementation paths'
                            }
                        ].map((feature, index) => (
                            <ExecutiveCard
                                key={index}
                                variant="executive"
                                hover="executive"
                                className="text-center"
                            >
                                <div className="p-3 bg-blue-500/20 rounded-lg inline-block mb-4">
                                    <feature.icon className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm">{feature.desc}</p>
                            </ExecutiveCard>
                        ))}
                    </motion.div>
                </div>
            ) : results ? (
                <div className="space-y-6">                    {/* Quick Summary Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <ExecutiveCard variant="executive" padding="lg">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Analysis Complete</h3>
                                    <p className="text-slate-400">Domain: {results.domain}</p>
                                </div>
                                <div className="flex gap-3">
                                    <ExecutiveButton
                                        onClick={() => setShowDashboard(false)}
                                        variant="secondary"
                                        size="md"
                                    >
                                        New Analysis
                                    </ExecutiveButton>
                                    <ExecutiveButton
                                        variant="primary"
                                        size="md"
                                        icon={<Download className="w-4 h-4" />}
                                    >
                                        Export
                                    </ExecutiveButton>
                                    <ExecutiveButton
                                        variant="success"
                                        size="md"
                                        icon={<Share2 className="w-4 h-4" />}
                                    >
                                        Share
                                    </ExecutiveButton>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <ExecutiveMetric
                                    label="Performance Score"
                                    value={results.performance.lighthouse.performance}
                                    color="primary"
                                    size="md"
                                    animated
                                />
                                <ExecutiveMetric
                                    label="Potential Monthly Savings"
                                    value={`$${getTotalLosses(results.financialImpact).toLocaleString()}`}
                                    color="success"
                                    size="md"
                                    animated
                                />
                                <ExecutiveMetric
                                    label="Opportunities Found"
                                    value={results.opportunities.length}
                                    color="warning"
                                    size="md"
                                    animated
                                />
                                <ExecutiveMetric
                                    label="Quick Wins"
                                    value={results.financialImpact.quickWins.length}
                                    color="primary"
                                    size="md"
                                    animated
                                />
                            </div>
                        </ExecutiveCard>
                    </motion.div>

                    {/* Business Intelligence Dashboard */}                    <BusinessIntelligenceDashboard
                        domain={results.domain}
                        data={formatBusinessData(results)}
                        onUpgrade={() => {
                            console.log('Upgrade requested')
                        }}
                    />
                </div>
            ) : null}

            {/* Progressive Profiling Modal */}
            {showProgressiveForm && !profileEmail && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowProgressiveForm(false)}
                >                    <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                        <ExecutiveCard variant="executive" padding="lg">
                            <div className="text-center mb-6">
                                <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Want More Detailed Insights?
                                </h3>
                                <p className="text-slate-400">
                                    Get industry-specific benchmarks and a detailed PDF report
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Your Industry
                                    </label>
                                    <select
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select industry</option>
                                        <option value="saas">SaaS & Technology</option>
                                        <option value="ecommerce">E-commerce</option>
                                        <option value="financial">Financial Services</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="manufacturing">Manufacturing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email for Detailed Report
                                    </label>
                                    <input
                                        type="email"
                                        value={profileEmail}
                                        onChange={(e) => setProfileEmail(e.target.value)}
                                        placeholder="your@company.com"
                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>                        <div className="flex gap-3 mt-6">
                                <ExecutiveButton
                                    onClick={() => setShowProgressiveForm(false)}
                                    variant="ghost"
                                    size="md"
                                    className="flex-1"
                                >
                                    Maybe Later
                                </ExecutiveButton>
                                <ExecutiveButton
                                    onClick={async () => {
                                        setShowProgressiveForm(false)
                                        if (profileEmail && domain) {
                                            // Re-run analysis with profile data
                                            setAnalysisDepth('comprehensive')
                                            await handleAnalysis()
                                        }
                                    }}
                                    variant="primary"
                                    size="md"
                                    className="flex-1"
                                >
                                    Get Enhanced Report                            </ExecutiveButton>
                            </div>
                        </ExecutiveCard>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
