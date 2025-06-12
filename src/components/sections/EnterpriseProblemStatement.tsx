'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingDown, Clock, DollarSign, BarChart3, Zap } from 'lucide-react'

/**
 * Enterprise Problem Statement Component
 * 
 * Professional presentation of mid-market digital infrastructure challenges
 * without aggressive language or emotional manipulation.
 */

interface MarketInsight {
    icon: React.ComponentType<{ className?: string }>
    statistic: string
    label: string
    context: string
    source: string
}

interface InefficiencyArea {
    title: string
    impact: string
    description: string
    commonCauses: string[]
}

const marketInsights: MarketInsight[] = [
    {
        icon: DollarSign,
        statistic: '$11.5M',
        label: 'Average annual SaaS investment',
        context: 'Mid-market companies (100-999 employees)',
        source: 'IDC Enterprise Software Survey 2024'
    },
    {
        icon: TrendingDown,
        statistic: '27%',
        label: 'Functional overlap identified',
        context: 'Across typical enterprise software stacks',
        source: 'ARCO Infrastructure Analysis Database'
    },
    {
        icon: BarChart3,
        statistic: '73%',
        label: 'Organizations lack optimization frameworks',
        context: 'Systematic approach to digital efficiency',
        source: 'Mid-Market Technology Leadership Study'
    }
]

const inefficiencyAreas: InefficiencyArea[] = [
    {
        title: 'Software Stack Redundancy',
        impact: '$640K+ annual waste',
        description: 'Multiple tools providing overlapping functionality without systematic consolidation planning',
        commonCauses: [
            'Departmental procurement without central oversight',
            'Legacy system dependencies',
            'Vendor lock-in preventing optimization'
        ]
    },
    {
        title: 'Performance Infrastructure',
        impact: '15-30% conversion impact',
        description: 'Suboptimal Core Web Vitals and user experience metrics affecting business outcomes',
        commonCauses: [
            'Unoptimized content delivery networks',
            'Inefficient database query patterns',
            'Lack of systematic performance monitoring'
        ]
    },
    {
        title: 'Operational Workflows',
        impact: '20-40% productivity loss',
        description: 'Manual processes and disconnected systems creating operational friction',
        commonCauses: [
            'Insufficient automation frameworks',
            'Data silos between departments',
            'Inadequate integration architecture'
        ]
    }
]

export function EnterpriseProblemStatement() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    }

    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-white/5" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-600/10 rounded-full blur-2xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-20"
                >
                    {/* Industry Context Badge */}
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-3 mb-8">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            <span className="text-amber-300 font-medium">
                                Mid-Market Infrastructure Analysis
                            </span>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
                    >
                        Growth Creates
                        <br />
                        <span className="text-blue-400">Infrastructure Complexity</span>
                    </motion.h2>

                    {/* Supporting Context */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light"
                    >
                        Successful mid-market companies face increasing digital infrastructure demands.
                        <strong className="text-white"> Without systematic optimization, growth momentum creates operational inefficiencies</strong> that compound over time.
                    </motion.p>
                </motion.div>

                {/* Market Insights */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid md:grid-cols-3 gap-8 mb-20"
                >
                    {marketInsights.map((insight, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-600/20 rounded-xl">
                                    <insight.icon className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">
                                        {insight.statistic}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-200 mb-3">
                                {insight.label}
                            </h3>

                            <p className="text-slate-400 mb-4 leading-relaxed">
                                {insight.context}
                            </p>

                            <div className="text-sm text-slate-500 font-medium">
                                Source: {insight.source}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Inefficiency Areas */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Common Infrastructure Inefficiencies
                        </h3>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            These systematic issues affect most mid-market organizations and compound without proper optimization frameworks.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {inefficiencyAreas.map((area, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Zap className="w-6 h-6 text-orange-400" />
                                    <h4 className="text-xl font-bold text-white">
                                        {area.title}
                                    </h4>
                                </div>

                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                                    <div className="text-red-300 font-semibold text-lg">
                                        {area.impact}
                                    </div>
                                    <div className="text-red-200/80 text-sm mt-1">
                                        Typical cost of inaction
                                    </div>
                                </div>

                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    {area.description}
                                </p>

                                <div>
                                    <h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                                        Common Contributing Factors
                                    </h5>
                                    <ul className="space-y-2">
                                        {area.commonCauses.map((cause, causeIndex) => (
                                            <li key={causeIndex} className="flex items-start gap-2 text-slate-400">
                                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-sm">{cause}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Solution Bridge */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="mt-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-blue-600/10 to-slate-600/10 border border-blue-500/20 rounded-2xl p-12 text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Systematic Optimization Requires Engineering Discipline
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                            These challenges are neither inevitable nor permanent. With proper methodology,
                            infrastructure complexity becomes a competitive advantage through systematic
                            optimization and performance engineering.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
