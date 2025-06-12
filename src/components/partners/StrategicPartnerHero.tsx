'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap, Target, TrendingUp, CheckCircle, AlertTriangle, DollarSign, Building, Users, Award, Code, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// João Pedro Cardozo + ARCO Partnership - Professional Intersection with Product Development
export function StrategicPartnerHero() {
    const [activeInsight, setActiveInsight] = useState(0)    // The intersection of personal expertise and ARCO methodology - professional approach
    const expertiseIntersections = [
        {
            title: "Conversion Engineering Experience → Enhanced ARCO Framework",
            personalExperience: "10+ years optimizing conversion funnels, with deep understanding of user behavior patterns",
            arcoIntersection: "This experience enhances our systematic approach to identifying growth opportunities",
            clientValue: "Real results: Mobile conversion improvements from 1.9% to 8.2% in 45 days",
            icon: TrendingUp,
            color: "from-emerald-500 to-teal-600"
        },
        {
            title: "Performance Engineering → Advanced Stack Optimization",
            personalExperience: "Specialized in technical optimization while maintaining full functionality and user experience",
            arcoIntersection: "This technical depth enables more precise and effective diagnostic capabilities",
            clientValue: "Performance improvements that directly impact revenue and user satisfaction",
            icon: Zap,
            color: "from-blue-500 to-indigo-600"
        },
        {
            title: "Business Psychology → Strategic Value Communication",
            personalExperience: "Understanding how technical excellence translates to market perception and pricing power",
            arcoIntersection: "This insight forms the foundation for our value communication methodology",
            clientValue: "Companies achieve better market positioning and premium pricing through clearer value presentation",
            icon: Target,
            color: "from-purple-500 to-pink-600"
        }
    ]// Proven client onboarding results that demonstrate the intersection
    const clientOnboardingResults = [
        {
            company: "Ipê Real Estate",
            industry: "Premium E-commerce",
            personalRole: "Direct conversion architecture guidance",
            arcoMethodology: "Applied systematic friction mapping + mobile optimization",
            result: "Mobile conversion: 1.9% → 8.2% in 45 days",
            businessImpact: "$380k additional revenue in 6 weeks",
            timeframe: "42 days implementation"
        },
        {
            company: "Xora AI Platform",
            industry: "B2B SaaS",
            personalRole: "Performance engineering consultation",
            arcoMethodology: "Systematic load time optimization + Core Web Vitals improvement",
            result: "Load time: 4.2s → 0.8s, 100/100 Core Web Vitals",
            businessImpact: "287% improvement in trial-to-paid conversion",
            timeframe: "18 days implementation"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveInsight((prev) => (prev + 1) % expertiseIntersections.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Strategic background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/subtle-grid.png')] opacity-10" />
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

                {/* Professional intersection header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-emerald-500/30">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-white font-medium">Strategic Partnership</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
                        João Pedro Cardozo
                        <br />
                        <span className="font-bold text-emerald-400">+ ARCO Methodology</span>
                    </h1>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                        Where 10+ years of conversion engineering expertise meets systematic business efficiency methodology.
                        This intersection creates <strong>measurable revenue recovery</strong> for companies doing $2M-$50M annually.
                    </p>
                </motion.div>

                {/* Dynamic insight showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="grid lg:grid-cols-2 gap-12 items-center mb-20"
                >
                    {/* Insight content */}
                    <div>                        <div className="space-y-8">
                        {expertiseIntersections.map((intersection, index) => (
                            <motion.div
                                key={index}
                                className={`p-6 rounded-xl border transition-all duration-500 cursor-pointer ${activeInsight === index
                                    ? 'bg-white/10 border-white/30 backdrop-blur-sm'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                                onClick={() => setActiveInsight(index)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${intersection.color} flex items-center justify-center flex-shrink-0`}>
                                        <intersection.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {intersection.title}
                                        </h3>
                                        <p className="text-slate-300 mb-3 leading-relaxed">
                                            <strong>Personal Experience:</strong> {intersection.personalExperience}
                                        </p>
                                        <p className="text-blue-300 mb-3 leading-relaxed">
                                            <strong>ARCO Intersection:</strong> {intersection.arcoIntersection}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-green-400 font-semibold">
                                                {intersection.clientValue}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    </div>

                    {/* Visual showcase */}
                    <div className="relative">
                        <motion.div
                            key={activeInsight}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"                        >                            <div className="text-center mb-6">
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${expertiseIntersections[activeInsight].color} flex items-center justify-center mx-auto mb-4`}>
                                    {React.createElement(expertiseIntersections[activeInsight].icon, { className: "w-8 h-8 text-white" })}
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">
                                    Professional Intersection Showcase
                                </h4>
                                <p className="text-slate-300">
                                    How personal expertise enhances ARCO methodology
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="py-3 border-b border-white/10">
                                    <p className="text-slate-300 text-sm mb-1">Personal Experience:</p>
                                    <p className="text-white text-sm">{expertiseIntersections[activeInsight].personalExperience}</p>
                                </div>
                                <div className="py-3 border-b border-white/10">
                                    <p className="text-slate-300 text-sm mb-1">ARCO Enhancement:</p>
                                    <p className="text-blue-300 text-sm">{expertiseIntersections[activeInsight].arcoIntersection}</p>
                                </div>
                                <div className="py-3">
                                    <p className="text-slate-300 text-sm mb-1">Client Value:</p>
                                    <p className="text-green-400 font-semibold text-sm">{expertiseIntersections[activeInsight].clientValue}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Proven results section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-light text-white mb-4">
                        Proven Results, Not Promises
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Real companies achieving measurable efficiency gains through our systematic approach
                    </p>
                </motion.div>                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {clientOnboardingResults.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <Building className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{result.company}</h3>
                                    <p className="text-sm text-slate-400">{result.industry}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Personal Role:</p>
                                    <p className="text-white">{result.personalRole}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">ARCO Methodology Applied:</p>
                                    <p className="text-blue-300">{result.arcoMethodology}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Technical Result:</p>
                                    <p className="text-white">{result.result}</p>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <div>
                                        <p className="text-sm text-slate-400">Business Impact:</p>
                                        <p className="text-green-400 font-semibold">{result.businessImpact}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400">Timeframe:</p>
                                        <p className="text-blue-400 font-semibold">{result.timeframe}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Strategic CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Ready to Identify Your Hidden Costs?
                        </h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Get a 48-hour Efficiency Snapshot™ that reveals exactly where your business
                            is losing money to inefficient processes and bloated tech stacks.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/diagnose"
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                            >
                                <Zap className="w-5 h-5" />
                                <span>Get Your Efficiency Snapshot</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="flex items-center space-x-2 text-blue-100">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">48-hour delivery • No long-term commitment</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
