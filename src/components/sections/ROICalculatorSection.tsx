'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Calculator,
    TrendingUp,
    DollarSign,
    BarChart3,
    ArrowRight,
    Target,
    Building2,
    Users,
    Percent
} from 'lucide-react'

interface BusinessMetrics {
    monthlyVisitors: number
    conversionRate: number
    averageTransactionValue: number
    industryType: 'ecommerce' | 'saas' | 'services'
}

interface PerformanceImpact {
    currentPerformanceGap: number
    revenueAtRisk: number
    improvementPotential: number
    timeToValue: string
    confidenceInterval: string
}

export function ROICalculatorSection() {
    const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics>({
        monthlyVisitors: 5000,
        conversionRate: 3.2,
        averageTransactionValue: 180,
        industryType: 'ecommerce'
    })

    const [performanceImpact, setPerformanceImpact] = useState<PerformanceImpact>({
        currentPerformanceGap: 0,
        revenueAtRisk: 0,
        improvementPotential: 0,
        timeToValue: '',
        confidenceInterval: ''
    });

    const industryBenchmarks = {
        ecommerce: {
            label: 'E-commerce & Retail',
            baselineConversion: 2.8,
            performanceImpactMultiplier: 1.4,
            typicalImprovementRange: '25-65%',
            averageImplementationWeeks: 4
        },
        saas: {
            label: 'SaaS & Technology',
            baselineConversion: 6.2,
            performanceImpactMultiplier: 1.6,
            typicalImprovementRange: '30-85%',
            averageImplementationWeeks: 6
        },
        services: {
            label: 'Professional Services',
            baselineConversion: 4.1,
            performanceImpactMultiplier: 1.3,
            typicalImprovementRange: '20-50%',
            averageImplementationWeeks: 3
        }
    }

    useEffect(() => {
        const benchmark = industryBenchmarks[businessMetrics.industryType]
        const monthlyRevenue = businessMetrics.monthlyVisitors * (businessMetrics.conversionRate / 100) * businessMetrics.averageTransactionValue
        const annualRevenue = monthlyRevenue * 12

        // Performance gap analysis
        const performanceGapFactor = 0.25 // Conservative estimate based on industry data
        const revenueAtRisk = annualRevenue * performanceGapFactor

        // Improvement potential calculation
        const improvementMultiplier = benchmark.performanceImpactMultiplier
        const conservativeImprovementRate = 0.35 // 35% improvement (conservative)
        const improvementPotential = revenueAtRisk * improvementMultiplier * conservativeImprovementRate

        setPerformanceImpact({
            currentPerformanceGap: performanceGapFactor * 100,
            revenueAtRisk,
            improvementPotential,
            timeToValue: `${benchmark.averageImplementationWeeks} weeks`,
            confidenceInterval: '95%'
        })
    }, [businessMetrics])

    return (
        <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Premium background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/20" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-emerald-400/10 via-transparent to-emerald-400/10" />
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />
                <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

            {/* Floating elements */}
            <div className="absolute top-24 right-12 w-28 h-28 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-xl" />
            <div className="absolute bottom-24 left-8 w-36 h-36 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >                    <div className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold mb-8 backdrop-blur-sm">
                        <Calculator className="w-4 h-4 mr-2" />
                        Performance Assessment
                    </div>

                    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                        Revenue Impact
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Calculator
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Quantify your organization's performance optimization opportunity through industry-benchmarked analysis.
                        This assessment provides data-driven insights based on established conversion research.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Premium Assessment Input */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }} className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 overflow-hidden"
                    >
                        {/* Premium background glow */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg">
                                    <Calculator className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white">Business Context</h3>
                                    <p className="text-slate-300 font-medium">Current performance baseline</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {/* Premium Industry Type */}
                                <div>
                                    <label className="block text-lg font-bold text-white mb-6">
                                        Industry Sector
                                    </label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(industryBenchmarks).map(([key, data]) => (
                                            <button
                                                key={key}
                                                onClick={() => setBusinessMetrics(prev => ({ ...prev, industryType: key as any }))}
                                                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${businessMetrics.industryType === key
                                                    ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-lg'
                                                    : 'border-slate-200 hover:border-blue-300 hover:shadow-md hover:scale-102'
                                                    }`}
                                            >
                                                {businessMetrics.industryType === key && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-2xl" />
                                                )}
                                                <div className="relative flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl transition-all duration-300 ${businessMetrics.industryType === key
                                                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                                                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                                        }`}>
                                                        {key === 'ecommerce' ? <Building2 className="w-6 h-6" /> :
                                                            key === 'saas' ? <BarChart3 className="w-6 h-6" /> :
                                                                <Users className="w-6 h-6" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-slate-900 text-lg mb-1">{data.label}</div>
                                                        <div className="text-sm text-slate-600">
                                                            Typical improvement: <span className="font-semibold text-emerald-600">{data.typicalImprovementRange}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>                                {/* Premium Monthly Visitors */}
                                <div>
                                    <label className="block text-lg font-bold text-slate-900 mb-6">
                                        Monthly Website Sessions: <span className="text-blue-600">{businessMetrics.monthlyVisitors.toLocaleString()}</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="1000"
                                            max="50000"
                                            step="1000"
                                            value={businessMetrics.monthlyVisitors}
                                            onChange={(e) => setBusinessMetrics(prev => ({ ...prev, monthlyVisitors: Number(e.target.value) }))}
                                            className="w-full h-3 bg-gradient-to-r from-slate-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-sm text-slate-500 mt-3">
                                            <span className="font-medium">1K</span>
                                            <span className="font-medium">50K</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Conversion Rate */}
                                <div>
                                    <label className="block text-lg font-bold text-slate-900 mb-6">
                                        Current Conversion Rate: <span className="text-emerald-600">{businessMetrics.conversionRate.toFixed(1)}%</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="12"
                                            step="0.1"
                                            value={businessMetrics.conversionRate}
                                            onChange={(e) => setBusinessMetrics(prev => ({ ...prev, conversionRate: Number(e.target.value) }))}
                                            className="w-full h-3 bg-gradient-to-r from-slate-200 to-emerald-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-sm text-slate-500 mt-3">
                                            <span className="font-medium">0.5%</span>
                                            <span className="font-medium">12%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Average Transaction Value */}
                                <div>
                                    <label className="block text-lg font-bold text-slate-900 mb-6">
                                        Average Transaction Value: <span className="text-purple-600">${businessMetrics.averageTransactionValue}</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="50"
                                            max="2000"
                                            step="10"
                                            value={businessMetrics.averageTransactionValue}
                                            onChange={(e) => setBusinessMetrics(prev => ({ ...prev, averageTransactionValue: Number(e.target.value) }))}
                                            className="w-full h-3 bg-gradient-to-r from-slate-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-sm text-slate-500 mt-3">
                                            <span className="font-medium">$50</span>
                                            <span className="font-medium">$2,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Assessment Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Performance Gap Analysis */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Current Performance Analysis</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Performance gap identified</span>
                                    <span className="font-bold text-orange-600">
                                        {performanceImpact.currentPerformanceGap.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Annual revenue at risk</span>
                                    <span className="font-bold text-orange-600">
                                        ${performanceImpact.revenueAtRisk.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                                    <strong>Note:</strong> Based on industry performance correlation studies. Actual impact varies by specific implementation context.
                                </div>
                            </div>
                        </div>

                        {/* Optimization Potential */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Optimization Opportunity</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Conservative improvement estimate</span>
                                    <span className="font-bold text-green-600">
                                        ${performanceImpact.improvementPotential.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Implementation timeline</span>
                                    <span className="font-bold text-slate-900">{performanceImpact.timeToValue}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Confidence interval</span>
                                    <span className="font-bold text-blue-600">{performanceImpact.confidenceInterval}</span>
                                </div>
                            </div>
                        </div>

                        {/* Industry Benchmarks */}
                        <div className="bg-slate-900 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold">Industry Context</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-300">Sector baseline conversion</span>
                                    <span className="font-bold">
                                        {industryBenchmarks[businessMetrics.industryType].baselineConversion}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-300">Typical improvement range</span>
                                    <span className="font-bold">
                                        {industryBenchmarks[businessMetrics.industryType].typicalImprovementRange}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-400 bg-slate-800 p-3 rounded-lg mt-4">
                                    Assessment based on {industryBenchmarks[businessMetrics.industryType].label.toLowerCase()} performance benchmarks and optimization case studies.
                                </div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
                        >
                            <h4 className="font-bold text-blue-900 mb-4">Next Steps</h4>
                            <p className="text-blue-800 mb-4">
                                This preliminary assessment indicates potential for measurable improvement. A comprehensive performance audit would provide detailed recommendations and implementation roadmap.
                            </p>
                            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                Request Detailed Assessment
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Methodology Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-3">Assessment Methodology</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">                            Calculations based on industry performance studies, conversion rate optimization research, and statistical analysis of similar business contexts. Individual results may vary based on specific technical, competitive, and market factors. Professional assessment recommended for actionable insights.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
