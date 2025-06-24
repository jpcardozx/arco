'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import {
    CalculatorIcon,
    ChartBarIcon,
    CursorArrowRippleIcon,
    ArrowRightIcon,
    SparklesIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline'

interface ROIData {
    currentRevenue: number
    currentConversion: number
    projectedImprovement: number
    timeframe: number
}

interface ROIResult {
    revenueIncrease: number
    roiPercentage: number
    paybackPeriod: number
    totalValue: number
}

export function ROICalculatorPreview() {
    const { user, isAuthenticated } = useAuth()
    const [inputs, setInputs] = useState<ROIData>({
        currentRevenue: 0,
        currentConversion: 0,
        projectedImprovement: 0,
        timeframe: 12
    })
    const [result, setResult] = useState<ROIResult | null>(null)
    const [showUpgrade, setShowUpgrade] = useState(false)

    const calculatePreviewROI = () => {
        if (!inputs.currentRevenue || !inputs.currentConversion) return

        // Basic calculation for preview
        const currentMonthlyRevenue = inputs.currentRevenue / 12
        const improvementMultiplier = 1 + (inputs.projectedImprovement / 100)
        const newMonthlyRevenue = currentMonthlyRevenue * improvementMultiplier
        const monthlyIncrease = newMonthlyRevenue - currentMonthlyRevenue
        const annualIncrease = monthlyIncrease * 12

        const result: ROIResult = {
            revenueIncrease: annualIncrease,
            roiPercentage: (annualIncrease / 50000) * 100, // Assuming $50k investment
            paybackPeriod: 50000 / monthlyIncrease,
            totalValue: annualIncrease * 3 // 3-year projection
        }

        setResult(result)

        // Trigger upgrade prompt after 30 seconds of engagement
        setTimeout(() => {
            if (!isAuthenticated) {
                setShowUpgrade(true)
            }
        }, 30000)
    }

    const handleFullAnalysis = () => {
        if (isAuthenticated) {
            // Direct to full ROI calculator with data
            window.location.href = `/roi-calculator?prefill=${encodeURIComponent(JSON.stringify(inputs))}`
        } else {
            // Trigger auth modal
            window.dispatchEvent(new CustomEvent('openAuthModal'))
        }
    }

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full px-6 py-3 mb-6">
                        <CalculatorIcon className="w-5 h-5 text-green-400" />
                        <span className="text-green-200 font-medium">CFO-Grade ROI Calculator</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Calculate Your Revenue Impact
                        <span className="block text-green-400">In 60 Seconds</span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Get executive-ready ROI projections with detailed payback analysis.
                        Used by 200+ CFOs for investment justification.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                    >
                        <h3 className="text-xl font-bold text-white mb-6">Quick Analysis Inputs</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Current Annual Revenue
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={inputs.currentRevenue || ''}
                                        onChange={(e) => setInputs({ ...inputs, currentRevenue: Number(e.target.value) })}
                                        className="w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
                                        placeholder="5000000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Current Conversion Rate
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.currentConversion || ''}
                                        onChange={(e) => setInputs({ ...inputs, currentConversion: Number(e.target.value) })}
                                        className="w-full pr-8 pl-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
                                        placeholder="2.5"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Projected Improvement
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={inputs.projectedImprovement || ''}
                                        onChange={(e) => setInputs({ ...inputs, projectedImprovement: Number(e.target.value) })}
                                        className="w-full pr-8 pl-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
                                        placeholder="150"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    Conservative estimate: 150% | Aggressive: 300%+
                                </p>
                            </div>

                            <motion.button
                                onClick={calculatePreviewROI}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-blue-500 transition-all duration-300"
                            >
                                Calculate Preview ROI
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Results Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        {result ? (
                            <>
                                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <SparklesIcon className="w-6 h-6 text-green-400" />
                                        <h3 className="text-xl font-bold text-white">ROI Projection</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-400 mb-1">
                                                ${result.revenueIncrease.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-slate-300">Annual Revenue Increase</div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-400 mb-1">
                                                {Math.round(result.roiPercentage)}%
                                            </div>
                                            <div className="text-sm text-slate-300">ROI Percentage</div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-400 mb-1">
                                                {Math.round(result.paybackPeriod)}
                                            </div>
                                            <div className="text-sm text-slate-300">Months to Payback</div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-yellow-400 mb-1">
                                                ${result.totalValue.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-slate-300">3-Year Value</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-bold text-white">Get Complete Analysis</h4>
                                        <ChartBarIcon className="w-6 h-6 text-blue-400" />
                                    </div>

                                    <p className="text-slate-300 mb-4">
                                        This preview shows basic projections. The full ROI calculator includes:
                                    </p>

                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                            <span className="text-slate-300">Industry-specific benchmarks</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                            <span className="text-slate-300">Risk-adjusted scenarios</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                            <span className="text-slate-300">Executive presentation deck</span>
                                        </li>
                                    </ul>

                                    <motion.button
                                        onClick={handleFullAnalysis}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                                    >
                                        <BanknotesIcon className="w-5 h-5" />
                                        Access Full ROI Calculator
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                                <CursorArrowRippleIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">Ready for Analysis</h3>
                                <p className="text-slate-300">
                                    Enter your business metrics to see projected ROI in real-time
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>

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
                                <SparklesIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Get Your Complete ROI Analysis
                                </h3>
                                <p className="text-slate-300 mb-6">
                                    Sign up for free to access the full calculator with industry benchmarks and executive reports.
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
                                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
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
