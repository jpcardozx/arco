/**
 * ARCO PATCH 3: Business Intelligence Dashboard - ENHANCED
 * Executive Design System Integration
 * Premium analytics with sophisticated micro-interactions
 * Performance optimized with accessibility improvements
 */

'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp,
    DollarSign,
    Shield,
    Zap,
    Users,
    Globe,
    Target,
    AlertTriangle,
    CheckCircle,
    Calendar,
    BarChart3,
    PieChart,
    LineChart,
    ArrowUpRight,
    ArrowDownRight,
    Minus
} from 'lucide-react'
import {
    ExecutiveButton,
    ExecutiveCard,
    ExecutiveMetric,
    ExecutiveDashboard
} from '../ui/design-system'

interface BusinessIntelligenceData {
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
        }
        trend: 'up' | 'down' | 'stable'
    }
    businessMetrics: {
        estimatedRevenue: number
        conversionRate: number
        trafficGrowth: number
        competitorGap: number
        marketPosition: number
    }
    opportunities: Array<{
        category: string
        title: string
        impact: number
        effort: 'low' | 'medium' | 'high'
        roi: number
        timeline: string
    }>
    riskFactors: Array<{
        type: string
        severity: 'low' | 'medium' | 'high' | 'critical'
        impact: number
        description: string
    }>
    quickWins: Array<{
        title: string
        investment: number
        monthlyReturn: number
        paybackPeriod: number
    }>
}

interface BusinessIntelligenceDashboardProps {
    domain: string
    data: BusinessIntelligenceData
    onUpgrade?: () => void
}

export function BusinessIntelligenceDashboard({
    domain,
    data,
    onUpgrade
}: BusinessIntelligenceDashboardProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'competitive' | 'forecast'>('overview')
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

    // Memoized calculations for performance
    const lighthouseScores = useMemo(() =>
        Object.entries(data.performance.lighthouse),
        [data.performance.lighthouse]
    )

    const optimizedOpportunities = useMemo(() =>
        data.opportunities.map((opportunity, index) => ({
            ...opportunity,
            key: `${opportunity.category}-${index}`
        })),
        [data.opportunities]
    )    // Callback optimization
    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId as 'overview' | 'opportunities' | 'competitive' | 'forecast')
    }, [])

    const getTrendIcon = useCallback((trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return <ArrowUpRight className="w-4 h-4 text-green-500" />
            case 'down': return <ArrowDownRight className="w-4 h-4 text-red-500" />
            default: return <Minus className="w-4 h-4 text-yellow-500" />
        }
    }, [])

    const getEffortColor = useCallback((effort: 'low' | 'medium' | 'high') => {
        switch (effort) {
            case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
        }
    }, [])

    const getRiskColor = useCallback((severity: 'low' | 'medium' | 'high' | 'critical') => {
        switch (severity) {
            case 'low': return 'bg-green-500/10 border-green-500/30 text-green-400'
            case 'medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            case 'high': return 'bg-orange-500/10 border-orange-500/30 text-orange-400'
            case 'critical': return 'bg-red-500/10 border-red-500/30 text-red-400'
        }
    }, [])

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Business Intelligence Dashboard
                    </h2>
                    <p className="text-slate-400">
                        Domain: <span className="text-white font-medium">{domain}</span>
                    </p>
                </div>
                <ExecutiveButton
                    onClick={onUpgrade}
                    variant="primary"
                    size="lg"
                    gradient
                >
                    Upgrade Analysis
                </ExecutiveButton>
            </div>            {/* Navigation Tabs */}
            <ExecutiveCard variant="dark" padding="sm">
                <div className="flex space-x-1" role="tablist" aria-label="Dashboard sections">
                    {[
                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                        { id: 'opportunities', label: 'Opportunities', icon: Target },
                        { id: 'competitive', label: 'Competitive', icon: TrendingUp },
                        { id: 'forecast', label: 'Forecast', icon: LineChart }
                    ].map((tab) => (<ExecutiveButton
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        variant={activeTab === tab.id ? 'primary' : 'ghost'}
                        size="md"
                        icon={<tab.icon className="w-4 h-4" />}
                        className="flex-1"
                        ariaLabel={`Switch to ${tab.label} view`}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        tabIndex={activeTab === tab.id ? 0 : -1}
                    >
                        {tab.label}
                    </ExecutiveButton>
                    ))}
                </div>
            </ExecutiveCard>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="region" aria-label="Key business metrics">
                            <ExecutiveMetric
                                label="Monthly Revenue"
                                value={`$${data.businessMetrics.estimatedRevenue.toLocaleString()}`}
                                trend={data.performance.trend === 'stable' ? 'neutral' : data.performance.trend}
                                change={data.businessMetrics.trafficGrowth}
                                icon={<DollarSign className="w-6 h-6" />}
                                color="success"
                                size="lg"
                                animated
                                aria-label={`Monthly revenue is $${data.businessMetrics.estimatedRevenue.toLocaleString()} with ${data.businessMetrics.trafficGrowth}% growth`}
                            />

                            <ExecutiveMetric
                                label="Conversion Rate"
                                value={`${(data.businessMetrics.conversionRate / 100).toFixed(2)}%`}
                                trend="up"
                                change={8}
                                icon={<Target className="w-6 h-6" />}
                                color="primary"
                                size="lg"
                                animated
                                aria-label={`Conversion rate is ${(data.businessMetrics.conversionRate / 100).toFixed(2)}% with 8% improvement`}
                            />

                            <ExecutiveMetric
                                label="Traffic Growth"
                                value={`${data.businessMetrics.trafficGrowth > 0 ? '+' : ''}${data.businessMetrics.trafficGrowth}%`}
                                trend={data.businessMetrics.trafficGrowth > 0 ? 'up' : 'down'}
                                change={data.businessMetrics.trafficGrowth}
                                icon={<Users className="w-6 h-6" />}
                                color={data.businessMetrics.trafficGrowth > 0 ? 'success' : 'warning'}
                                size="lg"
                                animated
                                aria-label={`Traffic growth is ${data.businessMetrics.trafficGrowth}% ${data.businessMetrics.trafficGrowth > 0 ? 'increase' : 'decrease'}`}
                            />

                            <ExecutiveMetric
                                label="Market Position"
                                value={`${data.businessMetrics.marketPosition}%`}
                                trend="neutral"
                                icon={<TrendingUp className="w-6 h-6" />}
                                color="primary"
                                size="lg"
                                animated
                                aria-label={`Market position is ${data.businessMetrics.marketPosition}%`}
                            />
                        </div>

                        {/* Performance Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ExecutiveCard variant="executive" padding="lg">
                                <h3 className="text-lg font-semibold text-white mb-4">Lighthouse Scores</h3>
                                <div className="space-y-4">
                                    {Object.entries(data.performance.lighthouse).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <div className="flex items-center gap-3">
                                                <div className="w-32 bg-slate-700 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${value >= 90 ? 'bg-green-500' :
                                                            value >= 70 ? 'bg-yellow-500' :
                                                                value >= 50 ? 'bg-orange-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${value}%` }}
                                                    />
                                                </div>
                                                <span className="text-white font-medium w-10 text-right">{value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ExecutiveCard>

                            <ExecutiveCard variant="executive" padding="lg">
                                <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
                                <div className="space-y-3">
                                    {data.riskFactors.map((risk, index) => (
                                        <div key={index} className={`p-3 rounded-lg border ${getRiskColor(risk.severity)}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">{risk.type}</span>
                                                <span className="text-xs uppercase tracking-wider">{risk.severity}</span>
                                            </div>
                                            <p className="text-sm opacity-80">{risk.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </ExecutiveCard>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'opportunities' && (
                    <motion.div
                        key="opportunities"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {data.opportunities.map((opportunity, index) => (
                                <ExecutiveCard key={index} variant="executive" padding="lg" hover="executive">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">{opportunity.title}</h3>
                                            <span className="text-xs text-slate-400 uppercase tracking-wider">
                                                {opportunity.category}
                                            </span>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs border ${getEffortColor(opportunity.effort)}`}>
                                            {opportunity.effort} effort
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <div className="text-sm text-slate-400">Impact</div>
                                            <div className="text-xl font-bold text-green-400">
                                                ${opportunity.impact.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">ROI</div>
                                            <div className="text-xl font-bold text-blue-400">
                                                {opportunity.roi}x
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">Timeline</span>
                                            <span className="text-sm text-white">{opportunity.timeline}</span>
                                        </div>
                                    </div>
                                </ExecutiveCard>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'competitive' && (
                    <motion.div
                        key="competitive"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <ExecutiveCard variant="executive" padding="lg">
                            <h3 className="text-lg font-semibold text-white mb-4">Competitive Analysis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">
                                        #{data.businessMetrics.marketPosition}
                                    </div>
                                    <div className="text-sm text-slate-400">Market Position</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-400 mb-2">
                                        {data.businessMetrics.competitorGap}%
                                    </div>
                                    <div className="text-sm text-slate-400">Competitor Gap</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-400 mb-2">
                                        ${(data.businessMetrics.estimatedRevenue / 1000).toFixed(0)}K
                                    </div>
                                    <div className="text-sm text-slate-400">Revenue Estimate</div>
                                </div>
                            </div>
                        </ExecutiveCard>
                    </motion.div>
                )}

                {activeTab === 'forecast' && (
                    <motion.div
                        key="forecast"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <ExecutiveCard variant="executive" padding="lg">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Wins Portfolio</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {data.quickWins.map((win, index) => (
                                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                                        <h4 className="font-medium text-white mb-3">{win.title}</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="text-slate-400">Investment</div>
                                                <div className="text-white font-medium">${win.investment.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">Monthly Return</div>
                                                <div className="text-green-400 font-medium">
                                                    ${win.monthlyReturn.toLocaleString()}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">Payback Period</div>
                                                <div className="text-blue-400 font-medium">{win.paybackPeriod} months</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">ROI</div>
                                                <div className="text-purple-400 font-medium">
                                                    {Math.round((win.monthlyReturn * 12 / win.investment) * 100)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ExecutiveCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}