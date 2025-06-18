'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, DollarSign, Zap, CheckCircle, Calculator } from 'lucide-react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

export function ProfessionalHero() {
    const guaranteedResults = [
        { metric: 'Mobile LCP', target: '< 1.4s', current: 'Lab tested' },
        { metric: 'PSI Score', target: '+40 pts', current: 'Guaranteed' },
        { metric: 'Annual Savings', target: '$400+', current: 'Builder costs' }
    ]    const socialProof = [
        { type: 'Dental Clinics', location: 'Canada', result: '2.8s → 1.1s LCP' },
        { type: 'Boutique Hotels', location: 'Portugal', result: '15% direct booking ↑' }
    ]

    return (
        <SectionWrapper
            className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
            spacing="tight"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Main Content */}
                    <div className="max-w-2xl">
                        {/* Authority Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full px-4 py-2 mb-6"
                        >
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-900">37-Day Performance Labs</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Active Cycle</span>
                        </motion.div>

                        {/* Pain Point Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                        >
                            Slow websites cost dental clinics & hotels
                            <span className="relative">
                                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> $400+ yearly</span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="absolute inset-x-0 -bottom-2 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                                />
                            </span>
                        </motion.h1>                        {/* Value Proposition */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                <strong>Site Reboot Lite</strong> for Canadian dental practices & Portuguese boutique hotels:
                                Get <strong>mobile LCP under 1.4s</strong> or we refund <strong>110%</strong>.
                                <span className="text-blue-600 font-semibold"> Only 7 slots remaining</span> in current cycle.
                            </p>

                            {/* Anchor Pricing */}
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-600">3-Year Builder Cost</span>
                                    <span className="text-2xl font-bold text-red-600 line-through">$1,800</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-900">Site Reboot Lite</span>
                                    <span className="text-3xl font-bold text-green-600">$1,200</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Save $400+ annually + eliminate slow speeds forever</p>
                            </div>
                        </motion.div>

                        {/* Guaranteed Results */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-3 mb-8"
                        >
                            {guaranteedResults.map((result, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        <strong>{result.metric}:</strong> {result.target}
                                        <span className="text-sm text-gray-500 ml-2">({result.current})</span>
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {/* Primary CTA */}
                            <Link
                                href="#reserve"
                                className="group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                            >
                                <div className="flex items-center space-x-3">
                                    <DollarSign className="w-5 h-5" />
                                    <span>Reserve Slot • $300</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </Link>

                            {/* Secondary CTA */}
                            <Link
                                href="#audit"
                                className="group border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                            >
                                <div className="flex items-center space-x-3">
                                    <Calculator className="w-5 h-5" />
                                    <span>Free Speed Audit</span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 flex items-center space-x-6 text-sm text-gray-600"
                        >
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>BNPL Available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>110% Money-Back</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Zap className="w-4 h-4" />
                                <span>7-Day Approval</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Social Proof Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Live Results Dashboard
                                </h3>
                                <p className="text-gray-600">Real performance improvements from recent projects</p>
                            </div>

                            {/* Live Results */}
                            <div className="space-y-6">
                                {socialProof.map((proof, index) => (
                                    <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-medium text-gray-700">{proof.type}</span>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                {proof.location}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-2">
                                            {proof.result}
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                transition={{ duration: 2, delay: index * 0.5 + 1 }}
                                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>                            {/* Urgency */}
                            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-semibold text-orange-900">37-Day Cycle Active</span>
                                </div>
                                <p className="text-sm text-orange-800">
                                    Only <strong>7 slots available</strong> for current optimization cycle.
                                    Next intake: April 2025.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    )
}
