'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'
import {
    Calculator,
    TrendingUp,
    DollarSign,
    ArrowRight,
    Building2,
    Users,
    Target
} from 'lucide-react'

interface ExecutiveMetrics {
    monthlyRevenue: number
    industryType: 'ecommerce' | 'saas' | 'services'
    currentConversion: number
}

interface ExecutiveImpact {
    monthlyLoss: number
    yearlyLoss: number
    recoveryPotential: number
    timeToValue: string
}

export function ROICalculatorSectionExecutive() {
    const [metrics, setMetrics] = useState<ExecutiveMetrics>({
        monthlyRevenue: 50000,
        industryType: 'ecommerce',
        currentConversion: 2.5
    })

    const [showResults, setShowResults] = useState(false)

    const handleCalculatorInteraction = (action: string, data?: any) => {
        trackEvent({
            event: 'calculator_interaction',
            category: 'engagement',
            action: action,
            label: 'roi_calculator',
            custom_parameters: data
        })

        if (action === 'calculate_roi') {
            trackFunnelStep('calculator_use', 'conversion_funnel', {
                monthly_revenue: metrics.monthlyRevenue,
                industry: metrics.industryType,
                conversion_rate: metrics.currentConversion,
                ...data
            })
        }
    }// Simplified executive calculations
    const calculateExecutiveImpact = (): ExecutiveImpact => {
        const industryBenchmarks = {
            ecommerce: { optimal: 4.2, multiplier: 1.3 },
            saas: { optimal: 3.8, multiplier: 1.4 },
            services: { optimal: 5.5, multiplier: 1.2 }
        }

        const benchmark = industryBenchmarks[metrics.industryType]
        const performanceGap = Math.max(0, benchmark.optimal - metrics.currentConversion)
        const improvementPotential = (performanceGap / metrics.currentConversion) * 100

        const monthlyLoss = (metrics.monthlyRevenue * improvementPotential) / 100
        const yearlyLoss = monthlyLoss * 12
        const recoveryPotential = monthlyLoss * benchmark.multiplier

        return {
            monthlyLoss: Math.round(monthlyLoss),
            yearlyLoss: Math.round(yearlyLoss),
            recoveryPotential: Math.round(recoveryPotential),
            timeToValue: performanceGap > 1 ? '45-60 days' : '30-45 days'
        }
    }

    const impact = calculateExecutiveImpact()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden" data-section="roi-calculator">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-blue-900/90" />
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6">
                            <Calculator className="w-4 h-4" />
                            Revenue Impact Calculator
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Calculate Your
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Revenue Recovery</span>
                        </h2>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Quick executive assessment to quantify your current performance gap
                            and potential revenue recovery within 60 days.
                        </p>
                    </motion.div>                    {/* Calculator */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 max-w-4xl mx-auto">
                        <motion.div variants={itemVariants} className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-8 text-center">Business Metrics</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-300 font-medium">
                                        <DollarSign className="w-4 h-4 text-green-400" />
                                        Monthly Revenue
                                    </label>                                    <input
                                        type="number"
                                        value={metrics.monthlyRevenue}
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value) || 0
                                            setMetrics(prev => ({
                                                ...prev,
                                                monthlyRevenue: newValue
                                            }))
                                            handleCalculatorInteraction('revenue_change', { monthly_revenue: newValue })
                                        }}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        min="1000"
                                        step="1000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-300 font-medium">
                                        <Building2 className="w-4 h-4 text-blue-400" />
                                        Industry Type
                                    </label>
                                    <select
                                        value={metrics.industryType}
                                        onChange={(e) => setMetrics(prev => ({
                                            ...prev,
                                            industryType: e.target.value as 'ecommerce' | 'saas' | 'services'
                                        }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    >
                                        <option value="ecommerce" className="bg-slate-800">E-commerce & Retail</option>
                                        <option value="saas" className="bg-slate-800">SaaS & Software</option>
                                        <option value="services" className="bg-slate-800">Professional Services</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-300 font-medium">
                                        <Target className="w-4 h-4 text-purple-400" />
                                        Current Conversion Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={metrics.currentConversion}
                                        onChange={(e) => setMetrics(prev => ({
                                            ...prev,
                                            currentConversion: parseFloat(e.target.value) || 0
                                        }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        min="0.1"
                                        max="20"
                                        step="0.1"
                                    />
                                </div>
                            </div>                            <motion.button
                                onClick={() => {
                                    setShowResults(true)
                                    const impact = calculateExecutiveImpact()
                                    handleCalculatorInteraction('calculate_roi', {
                                        monthly_loss: impact.monthlyLoss,
                                        yearly_loss: impact.yearlyLoss,
                                        recovery_potential: impact.recoveryPotential
                                    })
                                }}
                                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-medium transform hover:-translate-y-0.5"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Calculate Revenue Impact
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>                        {/* Results */}
                        {showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-8 bg-white/5 rounded-2xl border border-white/10"
                            >
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Executive Summary</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-6 text-center">
                                        <div className="flex justify-center mb-3">
                                            <TrendingUp className="w-8 h-8 text-red-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-red-400 mb-2">
                                            ${impact.monthlyLoss.toLocaleString()}
                                        </div>
                                        <div className="text-red-300 font-medium">Monthly Revenue Loss</div>
                                    </div>

                                    <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-6 text-center">
                                        <div className="flex justify-center mb-3">
                                            <DollarSign className="w-8 h-8 text-orange-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-orange-400 mb-2">
                                            ${impact.yearlyLoss.toLocaleString()}
                                        </div>
                                        <div className="text-orange-300 font-medium">Annual Impact</div>
                                    </div>

                                    <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-6 text-center">
                                        <div className="flex justify-center mb-3">
                                            <Target className="w-8 h-8 text-green-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-green-400 mb-2">
                                            ${impact.recoveryPotential.toLocaleString()}
                                        </div>
                                        <div className="text-green-300 font-medium">Monthly Recovery Potential</div>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6 text-center">
                                    <h4 className="text-xl font-bold text-white mb-3">
                                        Ready to recover this revenue?
                                    </h4>
                                    <p className="text-slate-300 mb-6">
                                        Time to value: <strong className="text-white">{impact.timeToValue}</strong> •
                                        94% success rate • ROI guarantee
                                    </p>

                                    <motion.button
                                        className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-soft hover:shadow-medium transform hover:-translate-y-0.5"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Get Emergency Revenue Audit
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
