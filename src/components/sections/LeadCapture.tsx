'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Star, Shield, Clock, Users, Zap, DollarSign } from 'lucide-react'
import {
    Heading2,
    Heading3,
    BodyLarge,
    BodyRegular,
    Card,
    MotionContainer,
    Section
} from '../../design-system/components'

export function LeadCapture() {
    const [formData, setFormData] = useState({
        company: '',
        email: '',
        revenue: '',
        challenge: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const revenueRanges = [
        '$1M - $5M',
        '$5M - $20M',
        '$20M - $100M',
        '$100M+'
    ]

    const challenges = [
        'Slow website performance',
        'Low conversion rates',
        'High infrastructure costs',
        'Poor user experience',
        'Technical debt issues',
        'Scaling bottlenecks'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsSubmitted(true)
        setIsSubmitting(false)
    }

    const trustSignals = [
        {
            icon: Shield,
            text: "SOC 2 Compliant",
            subtext: "Enterprise security"
        },
        {
            icon: Clock,
            text: "48hr Response",
            subtext: "Guaranteed turnaround"
        },
        {
            icon: Users,
            text: "50+ CTOs",
            subtext: "Trust our process"
        },
        {
            icon: Star,
            text: "4.9/5 Rating",
            subtext: "Client satisfaction"
        }
    ]

    const valueProps = [
        "Identify $500K+ in hidden revenue opportunities",
        "Get actionable roadmap with ROI projections",
        "No sales pitch - pure technical analysis",
        "Results delivered in 5 business days"
    ]

    if (isSubmitted) {
        return (
            <Section background="slate" className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
                <MotionContainer className="text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <Heading2 className="mb-6 text-slate-900">
                        Audit Request Confirmed
                    </Heading2>

                    <BodyLarge className="text-slate-600 mb-8">
                        Our technical team will analyze your digital infrastructure and deliver
                        a comprehensive report within 48 hours. Check your email for next steps.
                    </BodyLarge>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
                    >
                        <h4 className="font-semibold text-slate-900 mb-3">What happens next:</h4>
                        <div className="space-y-2 text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">1</div>
                                <span className="text-slate-600">Technical discovery call (15 min)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">2</div>
                                <span className="text-slate-600">Infrastructure analysis (24-48 hrs)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">3</div>
                                <span className="text-slate-600">Results presentation & roadmap</span>
                            </div>
                        </div>
                    </motion.div>
                </MotionContainer>
            </Section>
        )
    }

    return (<Section
        background="slate"
        id="revenue-audit"
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
    >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-48 translate-y-48" />

        <div className="relative z-10">
            {/* Header */}
            <MotionContainer className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-emerald-400/30">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">Free Revenue Analysis</span>
                </div>

                <Heading2 className="mb-6 text-white">
                    Discover Your <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Hidden Revenue</span>
                </Heading2>

                <BodyLarge className="text-slate-300 max-w-3xl mx-auto mb-8">
                    Get a comprehensive technical audit that reveals exactly where your company is losing money
                    due to poor digital performance. No fluff, just actionable insights with ROI projections.
                </BodyLarge>

                {/* Value Props */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {valueProps.map((prop, index) => (
                        <MotionContainer
                            key={index}
                            delay={0.1 + index * 0.1}
                            className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                        >
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-sm text-slate-300">{prop}</span>
                        </MotionContainer>
                    ))}
                </div>
            </MotionContainer>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Form */}
                <MotionContainer delay={0.3} className="order-2 lg:order-1">
                    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Business Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="cto@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Annual Revenue
                                </label>
                                <select
                                    value={formData.revenue}
                                    onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    <option value="" className="text-slate-900">Select range</option>
                                    {revenueRanges.map(range => (
                                        <option key={range} value={range} className="text-slate-900">{range}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Primary Challenge
                                </label>
                                <select
                                    value={formData.challenge}
                                    onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    <option value="" className="text-slate-900">Select challenge</option>
                                    {challenges.map(challenge => (
                                        <option key={challenge} value={challenge} className="text-slate-900">{challenge}</option>
                                    ))}
                                </select>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium py-4 px-6 rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Get My Free $15K Audit
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>

                            <p className="text-xs text-slate-400 text-center">
                                No spam. Unsubscribe anytime. Results delivered in 48 hours.
                            </p>
                        </form>
                    </Card>
                </MotionContainer>

                {/* Trust Signals & Social Proof */}
                <MotionContainer delay={0.4} className="order-1 lg:order-2 space-y-8">
                    {/* Trust Signals */}
                    <div className="grid grid-cols-2 gap-4">
                        {trustSignals.map((signal, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center"
                            >
                                <signal.icon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                                <h4 className="font-medium text-white text-sm">{signal.text}</h4>
                                <p className="text-xs text-slate-400">{signal.subtext}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            Recent Audit Results
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">TechFlow Solutions</span>
                                <span className="text-emerald-400 font-medium">+$1.2M identified</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">DataCore Analytics</span>
                                <span className="text-emerald-400 font-medium">+$850K identified</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">ScaleUp Commerce</span>
                                <span className="text-emerald-400 font-medium">+$640K identified</span>
                            </div>
                        </div>
                    </Card>

                    {/* Testimonial */}
                    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6">
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <blockquote className="text-slate-300 text-sm mb-4">
                            "The audit revealed $1.2M in revenue opportunities we never knew existed.
                            Their analysis was thorough and actionable - definitely worth more than $15K."
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                SC
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">Sarah Chen</p>
                                <p className="text-slate-400 text-xs">CTO, TechFlow Solutions</p>
                            </div>
                        </div>
                    </Card>
                </MotionContainer>
            </div>
        </div>
    </Section>
    )
}
