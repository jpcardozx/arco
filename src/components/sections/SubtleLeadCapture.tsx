'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Users, Shield, Mail, Building, TrendingUp } from 'lucide-react'
import {
    Heading2,
    Heading3,
    BodyLarge,
    BodyRegular,
    MotionContainer
} from '../../design-system/components'

export function SubtleLeadCapture() {
    const [formData, setFormData] = useState({
        company: '',
        email: '',
        monthlyRevenue: '',
        primaryChallenge: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const revenueRanges = [
        { value: '1M-5M', label: '$1M - $5M ARR' },
        { value: '5M-25M', label: '$5M - $25M ARR' },
        { value: '25M-100M', label: '$25M - $100M ARR' },
        { value: '100M+', label: '$100M+ ARR' }
    ]

    const challenges = [
        { value: 'scalability', label: 'Scaling bottlenecks at 10x growth' },
        { value: 'performance', label: 'Performance degradation under load' },
        { value: 'architecture', label: 'Legacy tech debt blocking features' },
        { value: 'team', label: 'Engineering velocity declining' }
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitted(true)
        setIsSubmitting(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const incentives = [
        {
            title: "Architecture Scalability Analysis",
            description: "Detailed assessment of current technical limitations",
            value: "",
            icon: TrendingUp
        },
        {
            title: "Performance Bottleneck Identification",
            description: "Database, API, and infrastructure optimization opportunities",
            value: "",
            icon: Shield
        },
        {
            title: "Strategic Implementation Roadmap",
            description: "6-18 month plan with engineering effort estimates",
            value: "",
            icon: CheckCircle
        }
    ]

    if (isSubmitted) {
        return (
            <section className="py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
                <MotionContainer>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                        </div>
                        <Heading2 className="mb-4">Thank You!</Heading2>
                        <BodyLarge className="text-gray-600 mb-8">
                            We'll review your submission and reach out within 24 hours with
                            your customized assessment timeline.
                        </BodyLarge>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                            <div className="text-sm text-gray-600 mb-2">What's Next:</div>
                            <div className="space-y-2 text-left">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                    <span className="text-gray-700">Initial consultation call (30 min)</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                    <span className="text-gray-700">Technical assessment begins</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                    <span className="text-gray-700">Results delivered within 5 business days</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </MotionContainer>
            </section>
        )
    }

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <MotionContainer className="relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Enhanced Value Proposition */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div>                                <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Architecture Assessment • Series A+ Focus • 2-3 Week Delivery
                            </div>
                                <Heading2 className="mb-6">
                                    Is Your Tech Stack Ready For
                                    <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Series B Scale?</span>
                                </Heading2>
                                <BodyLarge className="text-gray-600 leading-relaxed">
                                    Get a comprehensive technical assessment from former CTOs who've scaled
                                    companies through Series A to IPO. No sales pitch—just actionable insights.
                                </BodyLarge>
                            </div>

                            {/* Enhanced Incentives */}
                            <div className="space-y-4">                                <div className="flex items-center justify-between mb-6">
                                <div className="text-lg font-bold text-gray-900">
                                    Assessment Deliverables
                                </div>
                                <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    No Cost
                                </div>
                            </div>
                                {incentives.map((incentive, index) => {
                                    const IconComponent = incentive.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="p-3 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-gray-900 text-lg">
                                                        {incentive.title}
                                                    </h4>
                                                    <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                                        {incentive.value}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {incentive.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>                            {/* Enhanced Trust Signals */}
                            <div className="flex items-center justify-center space-x-8 pt-8 border-t border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm font-medium text-gray-700">5-Business Day Delivery</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Shield className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm font-medium text-gray-700">SOC 2 Compliant</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm font-medium text-gray-700">47+ Success Stories</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Enhanced Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-10 rounded-3xl border border-gray-200 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Enhanced Company Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                                        Company Name *
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => handleInputChange('company', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                                            placeholder="Your company name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Enhanced Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                                        Business Email *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Enhanced Revenue Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-4">
                                        Annual Revenue Range *
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {revenueRanges.map((range) => (
                                            <button
                                                key={range.value}
                                                type="button"
                                                onClick={() => handleInputChange('monthlyRevenue', range.value)}
                                                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${formData.monthlyRevenue === range.value
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg'
                                                    : 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Enhanced Challenge Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-4">
                                        Primary Technical Challenge *
                                    </label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {challenges.map((challenge) => (
                                            <button
                                                key={challenge.value}
                                                type="button"
                                                onClick={() => handleInputChange('primaryChallenge', challenge.value)}
                                                className={`p-4 rounded-xl border-2 text-sm font-semibold text-left transition-all duration-200 ${formData.primaryChallenge === challenge.value
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg'
                                                    : 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {challenge.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Enhanced Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || !formData.company || !formData.email || !formData.monthlyRevenue || !formData.primaryChallenge}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-5 px-8 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center justify-center space-x-3">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Analyzing Your Company...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Get My Revenue Assessment</span>
                                                <ArrowRight className="w-6 h-6" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
                                </motion.button>

                                <p className="text-xs text-gray-500 text-center leading-relaxed">
                                    By submitting, you agree to receive communication from ARCO.
                                    <br />We respect your privacy and will never share your information.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </MotionContainer>
        </section>
    )
}
