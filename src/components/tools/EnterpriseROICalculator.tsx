'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calculator, DollarSign, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react'

/**
 * Enterprise ROI Calculator - Infrastructure Optimization Value
 * 
 * Interactive ROI calculator for enterprise prospects to self-assess
 * potential savings from infrastructure optimization.
 * Critical for CFO validation and technical buying decisions.
 */

interface ROIInputs {
    monthlyRevenue: number
    engineeringTeamSize: number
    cloudSpend: number
    deploymentFrequency: number
    currentIncidents: number
    performanceIssues: number
}

interface ROIResults {
    totalSavings: number
    monthlySavings: number
    roi: number
    paybackMonths: number
    efficiencyGains: number
    riskReduction: number
}

const revenueRanges = [
    { label: '$1M - $5M monthly', value: 3000000 },
    { label: '$5M - $15M monthly', value: 10000000 },
    { label: '$15M - $50M monthly', value: 32500000 },
    { label: '$50M+ monthly', value: 75000000 }
]

const teamSizes = [
    { label: '5-15 engineers', value: 10 },
    { label: '15-50 engineers', value: 32 },
    { label: '50-150 engineers', value: 100 },
    { label: '150+ engineers', value: 200 }
]

export function EnterpriseROICalculator() {
    const [inputs, setInputs] = useState<ROIInputs>({
        monthlyRevenue: 10000000,
        engineeringTeamSize: 32,
        cloudSpend: 150000,
        deploymentFrequency: 10,
        currentIncidents: 8,
        performanceIssues: 15
    })

    const [results, setResults] = useState<ROIResults | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [step, setStep] = useState(1)

    useEffect(() => {
        setIsVisible(true)
        calculateROI()
    }, [inputs])

    const calculateROI = () => {
        const { monthlyRevenue, engineeringTeamSize, cloudSpend, deploymentFrequency, currentIncidents, performanceIssues } = inputs

        // ROI Calculation based on ARCO's validated methodology
        const avgEngineerCost = 120000 // Annual cost per engineer
        const downtimeRevenueImpact = monthlyRevenue * 0.02 // 2% revenue at risk
        const engineeringEfficiencyGain = engineeringTeamSize * avgEngineerCost * 0.25 // 25% efficiency gain
        const cloudOptimization = cloudSpend * 12 * 0.35 // 35% cloud cost reduction
        const incidentReduction = currentIncidents * 25000 // $25K per incident cost
        const performanceImprovements = (performanceIssues * monthlyRevenue * 0.001) * 12 // 0.1% revenue per issue

        const totalAnnualSavings =
            engineeringEfficiencyGain +
            cloudOptimization +
            incidentReduction +
            performanceImprovements +
            (downtimeRevenueImpact * 6) // Risk mitigation value

        const assessmentInvestment = 4500 // ARCO assessment cost
        const implementationInvestment = totalAnnualSavings * 0.15 // 15% implementation cost

        const totalInvestment = assessmentInvestment + implementationInvestment
        const netSavings = totalAnnualSavings - implementationInvestment
        const roi = ((netSavings - assessmentInvestment) / assessmentInvestment) * 100
        const paybackMonths = (totalInvestment / (totalAnnualSavings / 12))

        setResults({
            totalSavings: totalAnnualSavings,
            monthlySavings: totalAnnualSavings / 12,
            roi: roi,
            paybackMonths: paybackMonths,
            efficiencyGains: (engineeringEfficiencyGain / (engineeringTeamSize * avgEngineerCost)) * 100,
            riskReduction: ((incidentReduction + (downtimeRevenueImpact * 6)) / monthlyRevenue) * 100
        })
    }

    const handleInputChange = (field: keyof ROIInputs, value: number) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    const formatPercentage = (value: number) => {
        return `${Math.round(value)}%`
    }

    const getROIRating = (roi: number) => {
        if (roi >= 300) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' }
        if (roi >= 200) return { label: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-50' }
        if (roi >= 100) return { label: 'Good', color: 'text-amber-600', bg: 'bg-amber-50' }
        return { label: 'Moderate', color: 'text-gray-600', bg: 'bg-gray-50' }
    }

    return (
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Calculator className="w-8 h-8 text-blue-600" />
                        <h2 className="text-4xl font-bold text-gray-900">
                            Infrastructure ROI Calculator
                        </h2>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Calculate potential savings from systematic infrastructure optimization.
                        Based on validated outcomes from 47+ enterprise assessments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -24 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl border border-gray-200 p-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Your Infrastructure Profile
                        </h3>

                        <div className="space-y-6">
                            {/* Monthly Revenue */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Monthly Digital Revenue
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {revenueRanges.map((range) => (
                                        <button
                                            key={range.value}
                                            onClick={() => handleInputChange('monthlyRevenue', range.value)}
                                            className={`p-3 text-sm font-medium rounded-lg border transition-all ${inputs.monthlyRevenue === range.value
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Team Size */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Engineering Team Size
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {teamSizes.map((size) => (
                                        <button
                                            key={size.value}
                                            onClick={() => handleInputChange('engineeringTeamSize', size.value)}
                                            className={`p-3 text-sm font-medium rounded-lg border transition-all ${inputs.engineeringTeamSize === size.value
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Monthly Cloud Spend */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Monthly Cloud Infrastructure Spend
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        value={inputs.cloudSpend}
                                        onChange={(e) => handleInputChange('cloudSpend', parseInt(e.target.value) || 0)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="150000"
                                    />
                                </div>
                            </div>

                            {/* Performance Issues */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Monthly Incidents
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.currentIncidents}
                                        onChange={(e) => handleInputChange('currentIncidents', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Performance Issues
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.performanceIssues}
                                        onChange={(e) => handleInputChange('performanceIssues', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 24 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white rounded-2xl border border-gray-200 p-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Optimization Impact Projection
                        </h3>

                        {results && (
                            <div className="space-y-6">
                                {/* Primary ROI Metric */}
                                <div className={`p-6 rounded-xl ${getROIRating(results.roi).bg}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className={`w-6 h-6 ${getROIRating(results.roi).color}`} />
                                            <span className="text-sm font-semibold text-gray-600">12-Month ROI</span>
                                        </div>
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getROIRating(results.roi).bg} ${getROIRating(results.roi).color}`}>
                                            {getROIRating(results.roi).label}
                                        </span>
                                    </div>
                                    <div className={`text-3xl font-bold ${getROIRating(results.roi).color}`}>
                                        {formatPercentage(results.roi)}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Return on infrastructure optimization investment
                                    </div>
                                </div>

                                {/* Savings Breakdown */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <DollarSign className="w-5 h-5 text-emerald-600" />
                                            <span className="font-semibold text-gray-700">Annual Savings</span>
                                        </div>
                                        <span className="text-xl font-bold text-emerald-600">
                                            {formatCurrency(results.totalSavings)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold text-gray-700">Payback Period</span>
                                        </div>
                                        <span className="text-xl font-bold text-blue-600">
                                            {Math.round(results.paybackMonths)} months
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <TrendingUp className="w-5 h-5 text-purple-600" />
                                            <span className="font-semibold text-gray-700">Efficiency Gain</span>
                                        </div>
                                        <span className="text-xl font-bold text-purple-600">
                                            {formatPercentage(results.efficiencyGains)}
                                        </span>
                                    </div>
                                </div>

                                {/* Assessment CTA */}
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                                    <div className="flex items-start gap-3 mb-4">
                                        <CheckCircle className="w-6 h-6 text-blue-200 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">
                                                Professional Infrastructure Assessment
                                            </h4>
                                            <p className="text-blue-100 text-sm">
                                                Validate these projections with a comprehensive 10-day technical evaluation.
                                                Delivered by senior engineers with enterprise optimization expertise.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <div className="font-semibold">Investment: $4,500</div>
                                            <div className="text-blue-200">24-hour delivery guarantee</div>
                                        </div>
                                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                            Schedule Assessment
                                        </button>
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
                                    <AlertCircle className="w-4 h-4 inline mr-2" />
                                    Projections based on validated outcomes from 47+ enterprise infrastructure optimizations.
                                    Individual results may vary. Professional assessment provides detailed validation.
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
