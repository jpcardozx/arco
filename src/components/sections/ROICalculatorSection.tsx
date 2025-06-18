'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Clock, Zap, ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ROICalculatorSection() {
    const [businessType, setBusinessType] = useState<'dental' | 'hotel'>('dental')
    const [currentBuilder, setCurrentBuilder] = useState<'wix' | 'squarespace' | 'wordpress'>('wix')
    const [monthlyVisitors, setMonthlyVisitors] = useState(1000)
    const [conversionRate, setConversionRate] = useState(2.5)
    const [avgOrderValue, setAvgOrderValue] = useState(150)

    // Calculated values
    const [calculations, setCalculations] = useState({
        currentLCPLoss: 0,
        yearlyBuilderCost: 0,
        potentialSavings: 0,
        roiMonths: 0,
        yearlyRevenueLost: 0,
        yearlyRevenueGain: 0
    })

    useEffect(() => {
        // Builder costs (annual)
        const builderCosts = {
            wix: 192, // $16/mo
            squarespace: 216, // $18/mo  
            wordpress: 360 // Hosting + plugins average
        }

        // LCP impact on conversion (industry data)
        const lcpImpactMultiplier = businessType === 'dental' ? 1.4 : 1.6 // Hotels more sensitive to speed
        const currentLCPPenalty = 0.35 // 35% loss with 2.8s+ LCP
        const optimizedLCPBoost = 0.60 // 60% improvement with <1.4s LCP

        const yearlyBuilderCost = builderCosts[currentBuilder]
        const monthlyRevenue = monthlyVisitors * (conversionRate / 100) * avgOrderValue
        const yearlyRevenue = monthlyRevenue * 12

        const yearlyRevenueLost = yearlyRevenue * currentLCPPenalty
        const yearlyRevenueGain = yearlyRevenue * (optimizedLCPBoost - currentLCPPenalty)
        const totalSavings = yearlyBuilderCost + yearlyRevenueGain
        const roiMonths = Math.ceil(1200 / (totalSavings / 12))

        setCalculations({
            currentLCPLoss: yearlyRevenueLost,
            yearlyBuilderCost,
            potentialSavings: totalSavings,
            roiMonths,
            yearlyRevenueLost,
            yearlyRevenueGain
        })
    }, [businessType, currentBuilder, monthlyVisitors, conversionRate, avgOrderValue])

    const businessTypeData = {
        dental: {
            label: 'Dental Clinic',
            avgVisitors: 1200,
            avgConversion: 3.5,
            avgValue: 280,
            painPoints: ['Slow mobile booking', 'Lost emergency calls', 'High ad costs']
        },
        hotel: {
            label: 'Boutique Hotel',
            avgVisitors: 2500,
            avgConversion: 2.2,
            avgValue: 320,
            painPoints: ['OTA dependency', 'Mobile abandonment', 'Direct booking loss']
        }
    }

    return (
        <SectionWrapper background="gray" spacing="normal" id="calculator">
            <SectionHeader
                eyebrow="ROI Calculator"
                title="See your exact savings potential"
                description="Calculate the real cost of slow speeds and builder dependencies for your business"
                align="center"
                size="md"
            />

            <div className="grid lg:grid-cols-2 gap-12">

                {/* Calculator Input */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <Calculator className="w-6 h-6 text-blue-600" />
                        <h3 className="text-2xl font-bold text-gray-900">Quick Assessment</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Business Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Business Type
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(businessTypeData).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={() => setBusinessType(key as 'dental' | 'hotel')}
                                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${businessType === key
                                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">{data.label}</div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            Avg: {data.avgVisitors} visits/mo
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current Platform */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Current Website Platform
                            </label>
                            <select
                                value={currentBuilder}
                                onChange={(e) => setCurrentBuilder(e.target.value as any)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="wix">Wix ($16/month)</option>
                                <option value="squarespace">Squarespace ($18/month)</option>
                                <option value="wordpress">WordPress + Hosting ($30/month)</option>
                            </select>
                        </div>

                        {/* Monthly Visitors */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Monthly Website Visitors: {monthlyVisitors.toLocaleString()}
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="10000"
                                step="100"
                                value={monthlyVisitors}
                                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>500</span>
                                <span>10,000</span>
                            </div>
                        </div>

                        {/* Conversion Rate */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Current Conversion Rate: {conversionRate}%
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="8"
                                step="0.1"
                                value={conversionRate}
                                onChange={(e) => setConversionRate(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1%</span>
                                <span>8%</span>
                            </div>
                        </div>

                        {/* Average Order Value */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Average Service Value: ${avgOrderValue}
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="1000"
                                step="10"
                                value={avgOrderValue}
                                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$100</span>
                                <span>$1,000</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* Current Losses */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-red-600 rotate-180" />
                            <h4 className="text-xl font-bold text-red-900">Current Annual Losses</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Slow mobile performance</span>
                                <span className="font-bold text-red-600">
                                    -${calculations.yearlyRevenueLost.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Builder subscription</span>
                                <span className="font-bold text-red-600">
                                    -${calculations.yearlyBuilderCost.toLocaleString()}
                                </span>
                            </div>
                            <hr className="border-red-200" />
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-semibold text-red-900">Total Lost Annually</span>
                                <span className="font-bold text-red-600 text-xl">
                                    -${(calculations.yearlyRevenueLost + calculations.yearlyBuilderCost).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Potential Gains */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                            <h4 className="text-xl font-bold text-green-900">With Site Reboot Lite</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Revenue recovery (60% boost)</span>
                                <span className="font-bold text-green-600">
                                    +${calculations.yearlyRevenueGain.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Eliminate builder costs</span>
                                <span className="font-bold text-green-600">
                                    +${calculations.yearlyBuilderCost.toLocaleString()}
                                </span>
                            </div>
                            <hr className="border-green-200" />
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-semibold text-green-900">Total Annual Gain</span>
                                <span className="font-bold text-green-600 text-xl">
                                    +${calculations.potentialSavings.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ROI Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                            <h4 className="text-xl font-bold text-blue-900">Investment ROI</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">
                                    {calculations.roiMonths}
                                </div>
                                <div className="text-sm text-gray-700">Months to ROI</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">
                                    {Math.round((calculations.potentialSavings / 1200) * 100)}%
                                </div>
                                <div className="text-sm text-gray-700">Annual ROI</div>
                            </div>
                        </div>
                    </div>

                    {/* Pain Points */}
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                        <h4 className="font-bold text-orange-900 mb-3">
                            {businessTypeData[businessType].label} Pain Points
                        </h4>
                        <ul className="space-y-2">
                            {businessTypeData[businessType].painPoints.map((point, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm text-orange-800">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-3">
                            <Zap className="w-5 h-5" />
                            <span>Reserve Slot - Eliminate These Losses</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-3">
                            $300 deposit • Refundable if we can't deliver • 110% guarantee
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
