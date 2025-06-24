'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    DollarSign,
    Clock,
    Zap,
    Calculator,
    CheckCircle
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

/**
 * ARCO Hero Section - Problem-First + Price Anchor
 * Aligned with T1-T6 strategy and SaaS overspend messaging
 */
export function ArcoStrategicHero() {
    const [employeeCount, setEmployeeCount] = useState(25)
    const [currentPain, setCurrentPain] = useState(0)

    // SME pain points with financial quantification
    const painPoints = [
        {
            symptom: 'Site loads in 4.2s',
            cost: '53% mobile abandonment',
            solution: '24h fix available',
            anchor: '$149'
        },
        {
            symptom: '$140k/year in redundant SaaS',
            cost: '7 overlapping tools identified',
            solution: 'React replacement ready',
            anchor: '$997 roadmap'
        },
        {
            symptom: 'Google Ads burning budget',
            cost: '+$8k monthly waste',
            solution: 'Performance rescue delivered',
            anchor: '48h turnaround'
        }
    ]

    const calculateWaste = (employees: number) => {
        const annualSaaSCost = employees * 5607 // Based on Productiv report
        const redundancyRate = 0.35 // Conservative 35% redundancy
        return Math.round(annualSaaSCost * redundancyRate)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPain((prev) => (prev + 1) % painPoints.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleKickStartCTA = () => {
        trackEvent({
            event: 'hero_cta_click',
            category: 'conversion',
            action: 'kick_start_24h',
            value: 149
        })

        // Direct to T1 Kick-Start booking
        window.location.href = '/kick-start-24h'
    }

    return (
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/20" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-emerald-400/20 via-transparent to-emerald-400/20" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Problem Statement + Price Anchor */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm font-medium mb-6">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Your team wastes ${calculateWaste(employeeCount).toLocaleString()}/year on redundant SaaS
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Stop Paying for
                                <span className="block text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                                    Software You Don't Need
                                </span>
                            </h1>

                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                SMEs spend <strong className="text-white">$5,607 per employee annually</strong> on SaaS.
                                We identify 30-40% waste in 24 hours and replace it with custom React solutions
                                that <strong className="text-emerald-400">pay for themselves</strong>.
                            </p>
                        </motion.div>

                        {/* Pain Point Rotator */}
                        <motion.div
                            key={currentPain}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-red-300 font-semibold mb-1">
                                        {painPoints[currentPain].symptom}
                                    </div>
                                    <div className="text-slate-300 mb-3">
                                        Costing you: {painPoints[currentPain].cost}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-emerald-400 font-medium">
                                            {painPoints[currentPain].solution}
                                        </span>
                                        <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full">
                                            {painPoints[currentPain].anchor}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Primary CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleKickStartCTA}
                                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Get 24h Analysis for $149
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
                                Calculate Your Waste
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 mt-6 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                24h delivery guaranteed
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                No upfront audit fees
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                ROI proven in 30 days
                            </div>
                        </div>
                    </div>

                    {/* Right: SaaS Waste Calculator */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Your SaaS Waste Calculator
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-300 mb-3">
                                    Number of employees:
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="200"
                                    value={employeeCount}
                                    onChange={(e) => setEmployeeCount(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-slate-400 mt-2">
                                    <span>5</span>
                                    <span className="text-white font-bold">{employeeCount}</span>
                                    <span>200+</span>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-xl p-6">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            ${(employeeCount * 5607).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-400">Annual SaaS spend</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-red-400">
                                            ${calculateWaste(employeeCount).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-400">Redundant waste</div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-emerald-500/20 rounded-lg text-center">
                                    <div className="text-emerald-400 font-semibold">
                                        Potential Annual Savings: ${calculateWaste(employeeCount).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleKickStartCTA}
                                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
                            >
                                Start $149 Assessment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
