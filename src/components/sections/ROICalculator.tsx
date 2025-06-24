'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react'

/**
 * ROI CALCULATOR COMPONENT
 * 
 * Componente interativo para calcular ROI baseado em melhorias de performance
 * Integrado com métricas reais da aplicação
 */

interface ROIInputs {
    employees: number
    monthlyRevenue: number
    currentLCP: number
    targetLCP: number
}

interface ROIResults {
    monthlyROI: number
    paybackPeriod: number
    annualValue: number
    performanceGain: number
    conversionIncrease: number
    revenueIncrease: number
    saasSavings: number
}

const calculateROI = (inputs: ROIInputs): ROIResults => {
    const { employees, monthlyRevenue, currentLCP, targetLCP } = inputs

    // Performance improvement calculation
    const performanceGain = Math.max(0, currentLCP - targetLCP) // ms improvement
    const conversionIncrease = performanceGain / 100 * 0.07 // 7% per 100ms (Google research)
    const revenueIncrease = monthlyRevenue * conversionIncrease

    // SaaS savings calculation (based on Productiv 2024 benchmark)
    const saasSavings = employees * 5607 * 0.4 / 12 // 40% annual savings monthly

    const monthlyROI = revenueIncrease + saasSavings
    const tierPrice = 1997 // Tier 3 investment
    const paybackPeriod = monthlyROI > 0 ? tierPrice / monthlyROI : 0
    const annualValue = monthlyROI * 12

    return {
        monthlyROI,
        paybackPeriod,
        annualValue,
        performanceGain,
        conversionIncrease: conversionIncrease * 100, // Convert to percentage
        revenueIncrease,
        saasSavings
    }
}

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value)
}

const formatNumber = (value: number, precision: number = 1): string => {
    return value.toFixed(precision)
}

export function ROICalculator() {
    const [inputs, setInputs] = useState<ROIInputs>({
        employees: 25,
        monthlyRevenue: 180000,
        currentLCP: 4200,
        targetLCP: 1800
    })

    const [results, setResults] = useState<ROIResults>()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const newResults = calculateROI(inputs)
        setResults(newResults)
    }, [inputs])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.3 }
        )

        const element = document.getElementById('roi-calculator')
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    const updateInput = (field: keyof ROIInputs, value: number) => {
        setInputs(prev => ({ ...prev, [field]: value }))
    }

    if (!results) return null

    return (
        <section
            id="roi-calculator"
            className="py-20 bg-gradient-to-b from-slate-50 to-white"
            data-section="roi-calculator"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Calculate Your ROI
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        See how much your business could save and earn with our performance optimization system
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Business Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <Users className="w-4 h-4 inline mr-2" />
                                        Number of Employees
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.employees}
                                        onChange={(e) => updateInput('employees', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-2" />
                                        Monthly Revenue ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.monthlyRevenue}
                                        onChange={(e) => updateInput('monthlyRevenue', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        min="0"
                                        step="1000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        Current Website Load Time (ms)
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.currentLCP}
                                        onChange={(e) => updateInput('currentLCP', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        min="0"
                                        step="100"
                                    />
                                    <p className="text-sm text-slate-500 mt-1">
                                        Current: {inputs.currentLCP}ms → Target: {inputs.targetLCP}ms
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Main ROI Card */}
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-6">Your ROI Projection</h3>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-3xl font-bold mb-2">
                                        {formatCurrency(results.monthlyROI)}
                                    </div>
                                    <div className="text-emerald-100">Monthly Value</div>
                                </div>

                                <div>
                                    <div className="text-3xl font-bold mb-2">
                                        {formatNumber(results.paybackPeriod, 1)} days
                                    </div>
                                    <div className="text-emerald-100">Payback Period</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-emerald-400">
                                <div className="text-2xl font-bold">
                                    {formatCurrency(results.annualValue)}
                                </div>
                                <div className="text-emerald-100">Annual Value</div>
                            </div>
                        </div>

                        {/* Breakdown Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">
                                            +{formatNumber(results.conversionIncrease)}%
                                        </div>
                                        <div className="text-slate-600">Conversion Increase</div>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div className="text-sm text-slate-500 mt-2">
                                    = {formatCurrency(results.revenueIncrease)}/month revenue
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">
                                            {formatCurrency(results.saasSavings)}
                                        </div>
                                        <div className="text-slate-600">Monthly SaaS Savings</div>
                                    </div>
                                    <DollarSign className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div className="text-sm text-slate-500 mt-2">
                                    40% reduction from {formatCurrency(inputs.employees * 5607 / 12)}/month
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors"
                            onClick={() => {
                                // Track ROI calculator interaction
                                window.gtag?.('event', 'roi_calculated', {
                                    event_category: 'conversion',
                                    event_label: 'roi_calculator',
                                    value: Math.round(results.monthlyROI)
                                })
                            }}
                        >
                            Get Your {formatCurrency(results.monthlyROI)}/Month ROI
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ROICalculator
