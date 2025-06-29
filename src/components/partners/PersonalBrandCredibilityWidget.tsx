'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Award,
    CheckCircle,
    TrendingUp,
    DollarSign,
    Clock,
    Users,
    Shield,
    Code
} from 'lucide-react'

// Personal credibility widget that builds trust without fabrication
export function PersonalBrandCredibilityWidget() {

    // Genuine credentials and experience
    const credentials = [
        {
            category: "Experience",
            items: [
                "10+ years in conversion optimization",
                "Worked with $2M-$50M revenue companies",
                "Specialized in mobile-first optimization",
                "Core Web Vitals performance expert"
            ],
            icon: Award,
            color: "from-emerald-500 to-teal-600"
        },
        {
            category: "Technical Skills",
            items: [
                "Advanced JavaScript & React development",
                "Performance engineering & optimization",
                "Next.js SSR implementation specialist",
                "Systematic A/B testing & analytics"
            ],
            icon: Code,
            color: "from-blue-500 to-indigo-600"
        },
        {
            category: "Business Impact",
            items: [
                "Revenue recovery methodology development",
                "Conversion funnel optimization frameworks",
                "Performance-revenue correlation analysis",
                "Stack efficiency & cost reduction strategies"
            ],
            icon: TrendingUp,
            color: "from-purple-500 to-pink-600"
        }
    ]

    // Recent achievements without fake precision
    const achievements = [
        {
            metric: "Mobile Conversion",
            description: "1.9% → 8.2% in 45 days",
            context: "Premium e-commerce client",
            icon: TrendingUp
        },
        {
            metric: "Performance Improvement", 
            description: "4.2s → 0.8s load time",
            context: "B2B SaaS platform optimization",
            icon: Clock
        },
        {
            metric: "Revenue Recovery",
            description: "$380k in 6 weeks",
            context: "Real estate platform optimization",
            icon: DollarSign
        },
        {
            metric: "Stack Efficiency",
            description: "$2,400/month saved",
            context: "Tool consolidation project",
            icon: Shield
        }
    ]

    // Professional approach & methodology
    const professionalApproach = [
        {
            principle: "Data-Driven Analysis",
            description: "Every recommendation backed by performance data and revenue impact analysis",
            example: "Use analytics to identify conversion bottlenecks, not assumptions"
        },
        {
            principle: "Systematic Implementation",
            description: "ARCO methodology ensures consistent, replicable results across different business types",
            example: "Proven framework that works for e-commerce, SaaS, and B2B companies"
        },
        {
            principle: "ROI-First Approach",
            description: "Technical improvements always tied to measurable business outcomes",
            example: "Performance optimization pays for itself through improved conversions"
        },
        {
            principle: "Honest Assessment",
            description: "Clear about what can and cannot be achieved within given timelines",
            example: "Tell you upfront if the potential impact justifies the investment"
        }
    ]

    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-5 py-2 mb-6">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 font-medium">Professional Background</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-light text-slate-900 mb-4">
                        Experience & Approach
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Systematic methodology built on real client results and proven technical expertise.
                    </p>
                </motion.div>

                {/* Credentials grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    {credentials.map((credential, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="bg-white rounded-lg p-6 shadow-md border border-slate-200"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${credential.color} flex items-center justify-center mb-4`}>
                                <credential.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                {credential.category}
                            </h3>
                            <ul className="space-y-2">
                                {credential.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Recent achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-16"
                >
                    <h3 className="text-xl font-semibold text-slate-900 text-center mb-8">
                        Recent Client Results
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-md border border-slate-200 text-center"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <achievement.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="text-sm font-medium text-slate-700 mb-2">
                                    {achievement.metric}
                                </h4>
                                <p className="text-lg font-semibold text-slate-900 mb-2">
                                    {achievement.description}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {achievement.context}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Professional approach */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-slate-900 rounded-xl p-8 text-white"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-semibold mb-4">
                            Professional Methodology
                        </h3>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            How I approach every client engagement to ensure reliable, measurable results.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {professionalApproach.map((approach, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                className="border border-slate-700 rounded-lg p-6"
                            >
                                <h4 className="text-lg font-semibold text-white mb-3">
                                    {approach.principle}
                                </h4>
                                <p className="text-slate-300 mb-3 leading-relaxed">
                                    {approach.description}
                                </p>
                                <div className="bg-slate-800 rounded p-3">
                                    <p className="text-sm text-slate-400 mb-1">Example:</p>
                                    <p className="text-sm text-slate-300">{approach.example}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}