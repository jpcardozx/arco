'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Users, Target, Shield, TrendingUp, Zap } from 'lucide-react'

export function StrategicLeadCapture() {
    const [selectedAssessment, setSelectedAssessment] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        stage: '',
        challenge: '',
        timeline: ''
    })

    const assessmentTypes = [
        {
            type: "Architecture Debt Assessment",
            value: "$50K+ value",
            duration: "30 minutes",
            outcome: "Identify your top 3 scaling bottlenecks and get ROI estimates",
            ideal: "Series A companies with 50+ engineers",
            icon: Target,
            color: "emerald"
        },
        {
            type: "Deployment Velocity Analysis",
            value: "$25K+ value",
            duration: "20 minutes",
            outcome: "Benchmark your deploy speed against industry leaders",
            ideal: "Companies shipping < 3x per week",
            icon: Zap,
            color: "blue"
        },
        {
            type: "Infrastructure Cost Optimization",
            value: "$100K+ potential savings",
            duration: "45 minutes",
            outcome: "Detailed cost reduction roadmap with implementation timeline",
            ideal: "AWS/GCP spend > $50K monthly",
            icon: TrendingUp,
            color: "emerald"
        }
    ]

    const companyStages = [
        "Pre-Series A (MVP stage)",
        "Series A (Product-Market Fit)",
        "Series B+ (Scaling stage)",
        "Growth/Late Stage",
        "Enterprise/Public Company"
    ]

    const commonChallenges = [
        "Slow deployment cycles (3+ weeks)",
        "Database performance bottlenecks",
        "Infrastructure costs growing faster than revenue",
        "Engineering team spending >40% time on maintenance",
        "System outages affecting customer experience",
        "Unable to scale team due to architectural complexity"
    ]

    const credibilityIndicators = [
        { icon: Shield, text: "SOC 2 Type II Certified", subtext: "Enterprise security standards" },
        { icon: Users, text: "Ex-FAANG Team", subtext: "Stripe, Uber, Airbnb experience" },
        { icon: CheckCircle, text: "47+ Transformations", subtext: "Zero downtime migrations" },
        { icon: Clock, text: "24-48 Hour Response", subtext: "Direct CTO-level communication" }
    ]

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/3 to-emerald-500/3 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white border border-emerald-200/60 rounded-full text-emerald-700 text-sm font-medium mb-8 shadow-sm">
                            <Target className="w-4 h-4 mr-2" />
                            <span className="bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent font-semibold">
                                Free Strategic Assessment • CTO-Level Analysis • 24-48 Hour Response
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Get Your Technical Debt
                            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                ROI Analysis (Free)
                            </span>
                        </h2>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                            Before we talk about solutions, let's quantify your problem. Our senior architects will analyze your specific situation and provide a detailed ROI assessment—no sales pitch, just actionable insights.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Assessment Selection */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-8">
                                Choose Your Assessment Type:
                            </h3>

                            <div className="space-y-4 mb-8">
                                {assessmentTypes.map((assessment, index) => {
                                    const Icon = assessment.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedAssessment(index)}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedAssessment === index
                                                    ? 'bg-white border-emerald-300 shadow-xl'
                                                    : 'bg-white/80 border-slate-200 hover:border-emerald-200 shadow-lg hover:shadow-xl'
                                                }`}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${assessment.color === 'emerald' ? 'bg-emerald-100' : 'bg-blue-100'
                                                    }`}>
                                                    <Icon className={`w-6 h-6 ${assessment.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="text-lg font-semibold text-slate-900">
                                                            {assessment.type}
                                                        </h4>
                                                        <span className="text-sm font-medium text-emerald-600">
                                                            {assessment.value}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 mb-3">
                                                        {assessment.outcome}
                                                    </p>
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Duration: {assessment.duration}</span>
                                                        <span>Ideal for: {assessment.ideal}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Credibility Indicators */}
                            <div className="bg-white/60 p-6 rounded-2xl border border-slate-200">
                                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                                    Why CTOs Trust Our Assessments:
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {credibilityIndicators.map((indicator, index) => {
                                        const Icon = indicator.icon;
                                        return (
                                            <div key={index} className="flex items-start space-x-3">
                                                <Icon className="w-5 h-5 text-emerald-600 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {indicator.text}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {indicator.subtext}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* Assessment Request Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                    Request Your {assessmentTypes[selectedAssessment].type}
                                </h3>
                                <p className="text-slate-600 mb-8">
                                    Fill out the details below and we'll schedule your assessment within 24-48 hours.
                                </p>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Work Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Stage *
                                        </label>
                                        <select
                                            value={formData.stage}
                                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        >
                                            <option value="">Select your stage</option>
                                            {companyStages.map((stage, index) => (
                                                <option key={index} value={stage}>{stage}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Primary Technical Challenge *
                                        </label>
                                        <select
                                            value={formData.challenge}
                                            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        >
                                            <option value="">Select your main challenge</option>
                                            {commonChallenges.map((challenge, index) => (
                                                <option key={index} value={challenge}>{challenge}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Timeline for Implementation
                                        </label>
                                        <select
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        >
                                            <option value="">Select timeline</option>
                                            <option value="immediate">Immediate (&lt; 1 month)</option>
                                            <option value="short">Short term (1-3 months)</option>
                                            <option value="medium">Medium term (3-6 months)</option>
                                            <option value="long">Long term (6+ months)</option>
                                        </select>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
                                    >
                                        Get My {assessmentTypes[selectedAssessment].value} Assessment (Free)
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                                    <p className="text-sm text-slate-500">
                                        No sales calls. Just strategic insights from senior architects who've solved these problems at scale.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
