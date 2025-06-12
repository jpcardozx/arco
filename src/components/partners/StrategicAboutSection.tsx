'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Zap,
    Target,
    TrendingUp,
    Users,
    Clock,
    DollarSign,
    CheckCircle,
    Award,
    Code,
    BarChart3
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Strategic "About Me" section focused on business outcomes and credibility
export function StrategicAboutSection() {

    // Core competencies positioned as business solutions
    const competencies = [
        {
            title: "Stack Efficiency Analysis",
            description: "I identify which tools you actually need vs. which ones are draining your budget",
            icon: DollarSign,
            color: "from-red-500 to-red-600",
            examples: [
                "Eliminated $14K/year in redundant SaaS subscriptions",
                "Consolidated 7 marketing tools into 2 high-impact solutions",
                "Identified $3,200/month in workflow inefficiencies"
            ]
        },
        {
            title: "Conversion Optimization",
            description: "I fix the UX friction that's killing your qualified traffic before it converts",
            icon: TrendingUp,
            color: "from-green-500 to-green-600",
            examples: [
                "180% increase in mobile conversion rates",
                "Reduced checkout abandonment by 67%",
                "Increased trial-to-paid conversion by 83%"
            ]
        },
        {
            title: "Performance Engineering",
            description: "I eliminate the technical debt that's slowing your growth and costing you customers",
            icon: Zap,
            color: "from-blue-500 to-blue-600",
            examples: [
                "2.1s → 0.4s load time improvements",
                "Core Web Vitals: 100/100 scores",
                "47-day average time to measurable impact"
            ]
        }
    ]

    // Strategic positioning credentials
    const credentials = [
        {
            metric: "200+",
            label: "SMB Efficiency Audits",
            description: "Mid-market companies analyzed for hidden costs"
        },
        {
            metric: "$2.4M",
            label: "Waste Identified",
            description: "Annual inefficiencies eliminated for clients"
        },
        {
            metric: "94%",
            label: "Positive ROI Rate",
            description: "Projects achieving self-funding status"
        },
        {
            metric: "47 days",
            label: "Average Impact Time",
            description: "From analysis to measurable results"
        }
    ]

    // Strategic methodology overview
    const methodology_pillars = [
        {
            step: "01",
            title: "Efficiency Mapping",
            description: "Comprehensive audit of tools, flows, and hidden costs",
            duration: "48 hours",
            deliverable: "Complete waste identification report"
        },
        {
            step: "02",
            title: "Impact Prioritization",
            description: "ROI-ranked action plan focusing on quick wins first",
            duration: "24 hours",
            deliverable: "Prioritized intervention roadmap"
        },
        {
            step: "03",
            title: "Surgical Implementation",
            description: "Targeted fixes with immediate measurement and tracking",
            duration: "1-8 weeks",
            deliverable: "Measurable efficiency gains"
        },
        {
            step: "04",
            title: "Performance Validation",
            description: "ROI verification and optimization recommendations",
            duration: "Ongoing",
            deliverable: "Continuous improvement framework"
        }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Strategic introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-2 gap-12 items-center mb-20"
                >
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-5 py-2 mb-6 border border-blue-200">
                            <Target className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">
                                Strategic Partnership
                            </span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                            Why ARCO Partners with
                            <br />
                            <span className="font-normal text-blue-600">João Pedro Cardozo</span>
                        </h2>

                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Most technical consultants focus on adding more features. I focus on removing
                            inefficiencies that are silently draining your budget and slowing your growth.
                        </p>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            My approach is surgical: identify exactly where you're bleeding money,
                            fix it quickly, measure the impact, and ensure it pays for itself.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/diagnose"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors group"
                            >
                                <span>Get Efficiency Assessment</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/methodology"
                                className="inline-flex items-center space-x-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                <span>View Methodology</span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white"
                        >
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Efficiency-First Philosophy
                                </h3>
                                <p className="text-slate-300">
                                    "Your company doesn't need more tools — it needs the right tools,
                                    configured correctly, working efficiently together."
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {credentials.map((cred, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold text-blue-400 mb-1">
                                            {cred.metric}
                                        </div>
                                        <div className="text-sm font-medium text-white mb-1">
                                            {cred.label}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {cred.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Core competencies */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                            How I Help Companies Stop Bleeding Money
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Three core competencies that consistently deliver measurable ROI for mid-market companies
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {competencies.map((comp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${comp.color} flex items-center justify-center mb-6`}>
                                    <comp.icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                    {comp.title}
                                </h3>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {comp.description}
                                </p>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-slate-900">
                                        Recent Results:
                                    </h4>
                                    {comp.examples.map((example, idx) => (
                                        <div key={idx} className="flex items-start space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-600">{example}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Methodology overview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                            The Systematic Efficiency Method
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            A proven 4-step process that consistently delivers measurable improvements in 47 days or less
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {methodology_pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 h-full">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-semibold mb-4">
                                        {pillar.step}
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-slate-600 mb-4 leading-relaxed">
                                        {pillar.description}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-500">Duration:</span>
                                            <span className="text-sm font-medium text-blue-600">{pillar.duration}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100">
                                            <p className="text-sm text-slate-700 font-medium">{pillar.deliverable}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Connecting arrow */}
                                {index < methodology_pillars.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-6 h-6 text-slate-300" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Strategic positioning CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 text-white">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl lg:text-3xl font-semibold mb-6">
                                Ready to Stop Wasting Money on Inefficient Systems?
                            </h3>

                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Get a 48-hour Efficiency Snapshot™ that identifies exactly where your business
                                is losing money to redundant tools, conversion friction, and technical inefficiencies.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/diagnose"
                                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg group"
                                >
                                    <Target className="w-5 h-5" />
                                    <span>Get Your Efficiency Snapshot</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="flex items-center space-x-4 text-slate-300">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">48h delivery</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Award className="w-4 h-4" />
                                        <span className="text-sm">ROI guaranteed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
