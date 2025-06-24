'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Zap,
    TrendingUp,
    Shield,
    Clock,
    ArrowRight,
    CheckCircle,
    Target,
    DollarSign
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

/**
 * Direct Value Proof Section
 * REPLACES: Confusing multiple tools approach
 * FOCUSES: Clear value demonstration with single conversion path
 */
export function DirectValueProof() {
    const [selectedProof, setSelectedProof] = useState('kickstart')

    const valueProofs = {
        kickstart: {
            headline: '$149 Kick-Start (24-48h)',
            problem: 'Need immediate proof of value before larger investment.',
            solution: 'Domain analysis + Loom walkthrough + immediate fixes',
            result: 'Actionable insights with quick wins',
            investment: '$149 fixed price',
            roi: 'ROI in first fixes',
            timeframe: '24-48 hours',
            tier: 'T1',
            guarantee: '100% money-back if no actionable insights',
            icon: Zap,
            color: 'blue',
            features: ['Performance audit', 'SaaS waste analysis', 'Quick fixes included', 'Loom explanation']
        },
        deep_analysis: {
            headline: 'Deep Scan & Roadmap ($997)',
            problem: 'Companies waste $5,607/employee/year on redundant SaaS.',
            solution: '2-hour workshop + 20-page analysis + 4-sprint roadmap',
            result: 'Complete optimization strategy',
            investment: '$997 fixed price',
            roi: '30%+ SaaS cost reduction',
            timeframe: '7 business days',
            tier: 'T2',
            guarantee: '80% recommendation adoption rate',
            icon: Target,
            color: 'green',
            features: ['Stack redundancy audit', 'Performance bottleneck analysis', 'ROI-ranked roadmap', 'Executive workshop']
        },
        implementation: {
            headline: 'Full Implementation ($2,997-$3,997)',
            problem: 'Critical modules (checkout, CMS) bleeding revenue daily.',
            solution: 'React/Next.js replacement + performance optimization',
            result: '40%+ operational cost reduction',
            investment: '$2,997-$3,997',
            roi: '$127K+ annual savings typical',
            timeframe: '3-6 weeks',
            tier: 'T4-T5',
            guarantee: 'Performance targets met or continued work at no cost',
            icon: TrendingUp,
            color: 'purple',
            features: ['Complete module replacement', 'Performance guarantees', 'Team training', '6-month support']
        }
    }

    const currentProof = valueProofs[selectedProof as keyof typeof valueProofs]

    const handleGetQuote = () => {
        trackEvent({
            event: 'value_proof_cta',
            category: 'conversion',
            action: 'get_quote',
            label: selectedProof,
            value: 1
        })

        trackFunnelStep('value_proof_cta', 'conversion_funnel', {
            proof_type: selectedProof,
            timestamp: Date.now()
        })

        // Scroll to contact
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleQuickAnalysis = () => {
        trackEvent({
            event: 'quick_analysis_cta',
            category: 'lead_magnet',
            action: 'quick_analysis',
            label: selectedProof,
            value: 1
        })

        // Open analysis tool in modal or new section
        alert('Quick analysis tool would open here - integrated with actual Lighthouse API')
    }

    return (
        <section
            className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50"
            data-section="value-proof"
            id="immediate-value"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                        <Target className="w-4 h-4" />
                        Real Impact Examples
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Stop Losing Revenue to Performance Issues
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See exactly how we've solved performance problems for companies like yours.
                    </p>
                </motion.div>

                {/* Proof Selector Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {Object.entries(valueProofs).map(([key, proof]) => {
                        const Icon = proof.icon
                        return (
                            <button
                                key={key}
                                onClick={() => setSelectedProof(key)}
                                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 font-medium
                  ${selectedProof === key
                                        ? `border-${proof.color}-500 bg-${proof.color}-50 text-${proof.color}-700`
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                {proof.headline}
                            </button>
                        )
                    })}
                </motion.div>

                {/* Main Value Proof Display */}
                <motion.div
                    key={selectedProof}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Left: Problem & Solution */}
                        <div className="p-8 lg:p-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 bg-${currentProof.color}-100 rounded-xl`}>
                                    <currentProof.icon className={`w-6 h-6 text-${currentProof.color}-600`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {currentProof.headline}
                                </h3>
                            </div>

                            {/* Problem */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    The Problem
                                </h4>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {currentProof.problem}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    Our Solution
                                </h4>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {currentProof.solution}
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-4">
                                <button
                                    onClick={handleGetQuote}
                                    className={`
                    w-full flex items-center justify-center gap-3 
                    bg-gradient-to-r from-${currentProof.color}-600 to-${currentProof.color}-700 
                    hover:from-${currentProof.color}-700 hover:to-${currentProof.color}-800 
                    text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 
                    transform hover:scale-105 hover:shadow-lg
                  `}
                                >
                                    <DollarSign className="w-5 h-5" />
                                    Get Implementation Quote
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={handleQuickAnalysis}
                                    className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                                >
                                    <Zap className="w-5 h-5" />
                                    Free 60-Second Analysis
                                </button>
                            </div>
                        </div>                        {/* Right: Results & ROI */}
                        <div className={`bg-gradient-to-br from-${currentProof.color}-50 to-${currentProof.color}-100 p-8 lg:p-12`}>
                            <div className="flex items-center gap-2 mb-6">
                                <div className={`px-3 py-1 bg-${currentProof.color}-600 text-white text-sm font-medium rounded-full`}>
                                    {currentProof.tier}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Measurable Results
                                </h4>
                            </div>

                            <div className="space-y-6">
                                {/* Primary Result */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <TrendingUp className={`w-5 h-5 text-${currentProof.color}-600`} />
                                        <span className="font-medium text-gray-600">Expected Outcome</span>
                                    </div>
                                    <div className={`text-2xl font-bold text-${currentProof.color}-600 mb-2`}>
                                        {currentProof.result}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {currentProof.guarantee}
                                    </div>
                                </div>

                                {/* Investment & ROI */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <h5 className="font-semibold text-gray-900 mb-4">Investment & ROI</h5>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Investment:</span>
                                            <span className="font-semibold text-gray-900">{currentProof.investment}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Timeline:</span>
                                            <span className="font-semibold text-gray-900">{currentProof.timeframe}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-gray-200 pt-3">
                                            <span className="text-gray-600">Expected ROI:</span>
                                            <span className={`font-bold text-${currentProof.color}-600`}>{currentProof.roi}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features Included */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <h5 className="font-semibold text-gray-900 mb-4">What's Included</h5>
                                    <div className="space-y-2">
                                        {currentProof.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <CheckCircle className={`w-4 h-4 text-${currentProof.color}-600 flex-shrink-0`} />
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-600 mb-6">
                        Trusted by technical teams at:
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                        <div className="text-2xl font-bold text-gray-700">IPE Ventures</div>
                        <div className="text-2xl font-bold text-gray-700">Xora Platform</div>
                        <div className="text-2xl font-bold text-gray-700">TechCorp</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
