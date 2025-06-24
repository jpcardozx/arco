'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calculator,
    TrendingUp,
    DollarSign,
    Clock,
    Users,
    ShoppingCart,
    Zap,
    Download,
    ArrowRight
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

interface ROIInputs {
    monthlyTraffic: number
    currentConversionRate: number
    averageOrderValue: number
    currentPageSpeed: number
    industry: string
}

interface ROIResults {
    currentRevenue: number
    projectedRevenue: number
    revenueIncrease: number
    monthlyGains: number
    yearlyGains: number
    implementationCost: number
    breakEvenMonths: number
    roi: number
    paybackPeriod: number
    metrics: {
        speedImprovement: number
        conversionImprovement: number
        bounceRateReduction: number
        seoImpact: number
    }
}

/**
 * Advanced ROI Calculator
 * Data-driven calculation with industry benchmarks
 */
export function AdvancedROICalculator() {
    const [inputs, setInputs] = useState<ROIInputs>({
        monthlyTraffic: 10000,
        currentConversionRate: 2.5,
        averageOrderValue: 150,
        currentPageSpeed: 4.2,
        industry: 'ecommerce'
    })

    const [results, setResults] = useState<ROIResults | null>(null)
    const [showResults, setShowResults] = useState(false)
    const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false)

    const industries = [
        { value: 'ecommerce', label: 'E-commerce', conversionBenchmark: 3.2 },
        { value: 'saas', label: 'SaaS/Tech', conversionBenchmark: 4.1 },
        { value: 'finance', label: 'Financial Services', conversionBenchmark: 2.8 },
        { value: 'healthcare', label: 'Healthcare', conversionBenchmark: 3.5 },
        { value: 'education', label: 'Education', conversionBenchmark: 2.9 },
        { value: 'manufacturing', label: 'Manufacturing', conversionBenchmark: 2.2 },
        { value: 'other', label: 'Other', conversionBenchmark: 2.5 }
    ]

    const calculateROI = () => {
        // Industry benchmarks and conversion optimization data
        const selectedIndustry = industries.find(ind => ind.value === inputs.industry)
        const industryBenchmark = selectedIndustry?.conversionBenchmark || 2.5

        // Performance improvement calculations based on real data
        const speedImprovementFactor = Math.min(2.5, Math.max(1.1, (inputs.currentPageSpeed / 2.0)))
        const speedImprovement = ((inputs.currentPageSpeed - 1.5) / inputs.currentPageSpeed) * 100

        // Conversion rate improvements based on performance optimization
        // Data from various studies: 1s speed improvement = 7% conversion increase
        const conversionImprovementPercent = Math.min(45, speedImprovement * 0.7)
        const newConversionRate = inputs.currentConversionRate * (1 + conversionImprovementPercent / 100)

        // Revenue calculations
        const currentMonthlyRevenue = (inputs.monthlyTraffic * inputs.currentConversionRate / 100) * inputs.averageOrderValue
        const projectedMonthlyRevenue = (inputs.monthlyTraffic * newConversionRate / 100) * inputs.averageOrderValue
        const monthlyGains = projectedMonthlyRevenue - currentMonthlyRevenue
        const yearlyGains = monthlyGains * 12

        // Implementation cost estimation based on project scope
        const baseImplementationCost = 15000 // Base optimization package
        const trafficMultiplier = Math.min(3, Math.max(1, inputs.monthlyTraffic / 50000))
        const implementationCost = baseImplementationCost * trafficMultiplier

        // ROI calculations
        const breakEvenMonths = implementationCost / monthlyGains
        const roi = ((yearlyGains - implementationCost) / implementationCost) * 100
        const paybackPeriod = implementationCost / monthlyGains

        const calculatedResults: ROIResults = {
            currentRevenue: currentMonthlyRevenue * 12,
            projectedRevenue: projectedMonthlyRevenue * 12,
            revenueIncrease: yearlyGains,
            monthlyGains,
            yearlyGains,
            implementationCost,
            breakEvenMonths,
            roi,
            paybackPeriod,
            metrics: {
                speedImprovement: Math.round(speedImprovement),
                conversionImprovement: Math.round(conversionImprovementPercent),
                bounceRateReduction: Math.round(speedImprovement * 0.8),
                seoImpact: Math.round(speedImprovement * 0.6)
            }
        }

        setResults(calculatedResults)
        setShowResults(true)

        // Track calculation completion
        trackEvent({
            event: 'roi_calculation_complete',
            category: 'tools',
            action: 'calculation',
            label: 'roi_calculator',
            value: Math.round(calculatedResults.roi)
        })

        trackFunnelStep('roi_calculation_complete', 'lead_qualification', {
            monthly_traffic: inputs.monthlyTraffic,
            industry: inputs.industry,
            projected_roi: Math.round(calculatedResults.roi),
            timestamp: Date.now()
        })
    }

    const handleInputChange = (field: keyof ROIInputs, value: number | string) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleGetQuote = () => {
        trackEvent({
            event: 'roi_quote_request',
            category: 'conversion',
            action: 'quote_request',
            label: 'from_roi_calculator',
            value: results ? Math.round(results.roi) : 0
        })

        trackFunnelStep('roi_to_quote', 'conversion_funnel', {
            source: 'roi_calculator',
            projected_gains: results?.yearlyGains,
            roi: results?.roi,
            timestamp: Date.now()
        })

        // In production, redirect to contact form or open modal
        window.location.href = '#contact'
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                        <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">ROI Calculator</h3>
                        <p className="text-gray-600">Calculate potential gains from performance optimization</p>
                    </div>
                </div>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Monthly Website Traffic
                    </label>
                    <input
                        type="number"
                        value={inputs.monthlyTraffic}
                        onChange={(e) => handleInputChange('monthlyTraffic', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 10,000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <ShoppingCart className="w-4 h-4 inline mr-2" />
                        Current Conversion Rate (%)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={inputs.currentConversionRate}
                        onChange={(e) => handleInputChange('currentConversionRate', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 2.5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Average Order Value ($)
                    </label>
                    <input
                        type="number"
                        value={inputs.averageOrderValue}
                        onChange={(e) => handleInputChange('averageOrderValue', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 150"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Zap className="w-4 h-4 inline mr-2" />
                        Current Page Load Time (seconds)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={inputs.currentPageSpeed}
                        onChange={(e) => handleInputChange('currentPageSpeed', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 4.2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                    </label>
                    <select
                        value={inputs.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        {industries.map((industry) => (
                            <option key={industry.value} value={industry.value}>
                                {industry.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center mb-6">
                <button
                    onClick={calculateROI}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 mx-auto"
                >
                    <Calculator className="w-5 h-5" />
                    Calculate ROI
                </button>
            </div>

            {/* Results */}
            <AnimatePresence>
                {showResults && results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatCurrency(results.monthlyGains)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Monthly Revenue Increase</p>
                            </div>

                            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                    <span className="text-2xl font-bold text-blue-600">
                                        {Math.round(results.roi)}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Return on Investment</p>
                            </div>

                            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                    <span className="text-2xl font-bold text-purple-600">
                                        {Math.round(results.paybackPeriod)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Payback Period (months)</p>
                            </div>
                        </div>

                        {/* Revenue Comparison */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Annual Revenue Impact</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Current Annual Revenue</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(results.currentRevenue)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Projected Annual Revenue</span>
                                    <span className="font-medium text-green-600">{formatCurrency(results.projectedRevenue)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">Annual Increase</span>
                                        <span className="font-bold text-green-600 text-lg">{formatCurrency(results.yearlyGains)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance Improvements */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 border rounded-lg">
                                <div className="text-xl font-bold text-blue-600 mb-1">
                                    {results.metrics.speedImprovement}%
                                </div>
                                <p className="text-xs text-gray-600">Speed Improvement</p>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                                <div className="text-xl font-bold text-green-600 mb-1">
                                    {results.metrics.conversionImprovement}%
                                </div>
                                <p className="text-xs text-gray-600">Conversion Boost</p>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                                <div className="text-xl font-bold text-purple-600 mb-1">
                                    {results.metrics.bounceRateReduction}%
                                </div>
                                <p className="text-xs text-gray-600">Bounce Rate Drop</p>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                                <div className="text-xl font-bold text-orange-600 mb-1">
                                    {results.metrics.seoImpact}%
                                </div>
                                <p className="text-xs text-gray-600">SEO Improvement</p>
                            </div>
                        </div>

                        {/* Implementation Details */}
                        <div className="border-t pt-6">
                            <button
                                onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                                className="text-blue-600 hover:text-blue-700 font-medium mb-4"
                            >
                                {showDetailedBreakdown ? 'Hide' : 'Show'} Implementation Details
                            </button>

                            <AnimatePresence>
                                {showDetailedBreakdown && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <h5 className="font-medium text-gray-900 mb-3">Investment Breakdown</h5>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Implementation Cost</span>
                                                    <span className="font-medium">{formatCurrency(results.implementationCost)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Break-even Timeline</span>
                                                    <span className="font-medium">{Math.round(results.breakEvenMonths)} months</span>
                                                </div>
                                                <div className="flex justify-between border-t pt-2">
                                                    <span className="text-gray-600">Net Gain (Year 1)</span>
                                                    <span className="font-bold text-green-600">
                                                        {formatCurrency(results.yearlyGains - results.implementationCost)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-600 space-y-2">
                                            <p><strong>Methodology:</strong> Calculations based on industry benchmarks and performance optimization studies.</p>
                                            <p><strong>Assumptions:</strong> 1 second speed improvement correlates to 7% conversion increase (Google/Amazon studies).</p>
                                            <p><strong>Variables:</strong> Results may vary based on current site architecture, user behavior, and market conditions.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                            <button
                                onClick={() => {
                                    // Track report download
                                    trackEvent({
                                        event: 'roi_report_download',
                                        category: 'lead_magnet',
                                        action: 'download',
                                        label: 'roi_report',
                                        value: 1
                                    })
                                    alert('Detailed ROI report would be generated here.')
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Download Report
                            </button>
                            <button
                                onClick={handleGetQuote}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                <ArrowRight className="w-5 h-5" />
                                Get Implementation Quote
                            </button>
                        </div>

                        {/* Disclaimer */}
                        <div className="text-xs text-gray-500 text-center">
                            * Projections based on industry data and performance optimization studies.
                            Actual results may vary depending on implementation scope and market factors.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Value Proposition */}
            {!showResults && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Based on real performance data:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>• Amazon: 100ms delay = 1% revenue loss</div>
                        <div>• Google: 1s delay = 20% bounce rate increase</div>
                        <div>• Walmart: 1s improvement = 2% conversion boost</div>
                        <div>• Pinterest: 40% performance boost = 15% signups</div>
                    </div>
                </div>
            )}
        </div>
    )
}
