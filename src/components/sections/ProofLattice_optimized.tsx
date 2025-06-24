'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Clock,
    DollarSign,
    ArrowRight,
    Star,
    Play,
    ExternalLink
} from 'lucide-react'

interface Metric {
    before: string
    after: string
    label: string
    improvement: string
}

interface CaseStudy {
    title: string
    industry: string
    metric: Metric
    timeline: string
    description: string
}

export function ProofLattice() {
    const [activeCase, setActiveCase] = useState<number>(0)

    const metrics: Metric[] = [
        {
            before: '4.2s',
            after: '1.8s',
            label: 'Load Time',
            improvement: '+23% conversion'
        },
        {
            before: '$312',
            after: '$87',
            label: 'Monthly Cost',
            improvement: '72% savings'
        },
        {
            before: '23%',
            after: '67%',
            label: 'Mobile CR',
            improvement: '+44% increase'
        }
    ]

    const cases: CaseStudy[] = [
        {
            title: 'E-commerce Optimization',
            industry: 'Online Retail',
            metric: metrics[0],
            timeline: '72 hours',
            description: 'Reduced checkout abandonment by optimizing critical rendering path'
        },
        {
            title: 'SaaS Platform Upgrade',
            industry: 'B2B Software',
            metric: metrics[1],
            timeline: '1 week',
            description: 'Consolidated tech stack and improved mobile experience'
        },
        {
            title: 'Service Business Boost',
            industry: 'Professional Services',
            metric: metrics[2],
            timeline: '5 days',
            description: 'Optimized booking flow and form performance'
        }
    ]

    const clientLogos = [
        { name: 'TechCorp', industry: 'SaaS' },
        { name: 'RetailMax', industry: 'E-commerce' },
        { name: 'ServicePro', industry: 'Services' },
        { name: 'FinanceHub', industry: 'Fintech' },
        { name: 'HealthCare+', industry: 'Healthcare' },
        { name: 'EduTech', industry: 'Education' }
    ]

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Results speak louder than promises
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Real performance improvements from real businesses
                    </p>
                </motion.div>

                {/* Client Logos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-center text-slate-500 mb-8">Trusted by growing businesses</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
                        {clientLogos.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="h-12 bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                                    <span className="text-slate-500 font-semibold text-sm">{client.name}</span>
                                </div>
                                <span className="text-xs text-slate-400">{client.industry}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Metrics Banner */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => setActiveCase(index)}
                        >
                            <div className="text-sm font-medium text-slate-500 mb-3">{metric.label}</div>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-red-600">{metric.before}</div>
                                    <div className="text-xs text-slate-500">Before</div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <div className="text-center">
                                    <div className="text-xl font-bold text-green-600">{metric.after}</div>
                                    <div className="text-xs text-slate-500">After</div>
                                </div>
                            </div>
                            <div className="text-sm font-semibold text-slate-900">{metric.improvement}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Case Study */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Case Study
                                </span>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                {cases[activeCase].title}
                            </h3>

                            <p className="text-slate-600 mb-4">
                                {cases[activeCase].description}
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{cases[activeCase].timeline}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>{cases[activeCase].industry}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    Watch Case Study
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View Report
                                </motion.button>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h4 className="font-semibold text-slate-900 mb-4">Performance Impact</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                    <span className="text-slate-600">Load Time</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-600 line-through">{cases[activeCase].metric.before}</span>
                                        <ArrowRight className="w-3 h-3 text-slate-400" />
                                        <span className="text-green-600 font-bold">{cases[activeCase].metric.after}</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                        <span className="font-semibold text-green-900">{cases[activeCase].metric.improvement}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        Get Your Success Story
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
