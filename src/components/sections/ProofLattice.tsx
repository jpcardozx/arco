'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Clock,
    DollarSign,
    ArrowRight,
    BarChart3,
    Users,
    FileText,
    Target,
    Building2, ChevronRight
} from 'lucide-react'

interface PerformanceOutcome {
    metric: string
    baseline: string
    optimized: string
    improvement: string
    businessImpact: string
}

interface ClientEngagement {
    id: string
    sector: string
    organizationType: string
    challenge: string
    approach: string
    outcomes: PerformanceOutcome[]
    timeline: string
    businessValue: string
    contextualInfo: string
}

export function ProofLattice() {
    const [selectedEngagement, setSelectedEngagement] = useState<string>('ecommerce');

    const clientEngagements: ClientEngagement[] = [
        {
            id: 'ecommerce',
            sector: 'E-commerce & Digital Retail',
            organizationType: 'Mid-market retailer, 50K monthly sessions',
            challenge: 'High cart abandonment rates during peak traffic periods, particularly on mobile devices',
            approach: 'Checkout funnel performance optimization, mobile experience enhancement and Core Web Vitals compliance',
            timeline: '6 weeks implementation + 4 weeks validation',
            businessValue: '$280K additional ARR through conversion performance improvement',
            contextualInfo: 'Implementation completed during Q4 peak season without business interruption',
            outcomes: [
                {
                    metric: 'Checkout Conversion Rate',
                    baseline: '2.3%',
                    optimized: '4.8%',
                    improvement: '+108%',
                    businessImpact: 'Direct revenue increase from existing traffic'
                }, {
                    metric: 'Mobile Load Time',
                    baseline: '4.1s',
                    optimized: '1.7s',
                    improvement: '-59%',
                    businessImpact: '34% reduction in bounce rate'
                },
                {
                    metric: 'Cart Abandonment Rate',
                    baseline: '76%',
                    optimized: '58%',
                    improvement: '-18pp',
                    businessImpact: 'Recovery of previously lost transactions'
                }
            ]
        }, {
            id: 'saas',
            sector: 'SaaS & Technology',
            organizationType: 'B2B platform, 15K monthly visitors',
            challenge: 'Low trial signup conversion from pricing page, slow demo environment affecting qualified sales leads',
            approach: 'Technical infrastructure optimization, demo performance improvement and signup funnel simplification',
            timeline: '4 weeks implementation + 3 weeks monitoring',
            businessValue: '$450K additional ARR through trial conversion pipeline improvement',
            contextualInfo: 'Zero-downtime deployment using staged rollout methodology',
            outcomes: [
                {
                    metric: 'Trial Signup Rate',
                    baseline: '6.8%',
                    optimized: '13.2%',
                    improvement: '+94%',
                    businessImpact: 'Doubled qualified lead generation rate'
                },
                {
                    metric: 'Demo Load Time',
                    baseline: '7.3s',
                    optimized: '2.1s',
                    improvement: '-71%',
                    businessImpact: 'Improved prospect engagement quality'
                },
                {
                    metric: 'Page Bounce Rate',
                    baseline: '68%',
                    optimized: '42%',
                    improvement: '-26pp',
                    businessImpact: 'Enhanced user experience metrics'
                }
            ]
        }, {
            id: 'services',
            sector: 'Professional Services',
            organizationType: 'Consulting firm, 8K monthly visitors, 70% mobile traffic',
            challenge: 'Poor mobile experience leading to low consultation booking rates from qualified prospects',
            approach: 'Mobile-first optimization, contact form enhancement and user journey simplification',
            timeline: '3 weeks implementation + 2 weeks validation',
            businessValue: '$180K additional ARR through improved lead capture and conversion',
            contextualInfo: 'Implementation coordinated with marketing campaign launch',
            outcomes: [
                {
                    metric: 'Contact Form Completion',
                    baseline: '3.1%',
                    optimized: '7.4%',
                    improvement: '+138%',
                    businessImpact: 'Significantly increased qualified inquiries'
                },
                {
                    metric: 'Mobile Usability Score',
                    baseline: '72/100',
                    optimized: '96/100',
                    improvement: '+33%',
                    businessImpact: 'Enhanced professional credibility'
                },
                {
                    metric: 'Page Engagement Time',
                    baseline: '1.8min',
                    optimized: '3.2min',
                    improvement: '+78%',
                    businessImpact: 'Better prospect qualification signals'
                }
            ]
        }
    ]

    return (
        <section className="py-32 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
            {/* Premium background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-emerald-200/20 via-transparent to-emerald-200/20" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-200/20 via-transparent to-blue-200/20" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/20 to-transparent" />
                <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
            </div>

            {/* Floating elements */}
            <div className="absolute top-16 right-10 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-20 left-16 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full text-blue-700 text-sm font-semibold mb-8 backdrop-blur-sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Performance Validation
                    </div>

                    <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                        Measured Business
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                            Impact Portfolio
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        Comprehensive performance outcomes from enterprise client engagements. Each case represents
                        statistically validated improvements in both technical metrics and business results.
                    </p>
                </motion.div>                {/* Premium Engagement Selector */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {clientEngagements.map((engagement, index) => (
                        <motion.div
                            key={engagement.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border cursor-pointer transition-all duration-500 hover:-translate-y-2 ${selectedEngagement === engagement.id
                                    ? 'border-blue-300 shadow-2xl ring-1 ring-blue-500/30 scale-105'
                                    : 'border-white/50 hover:border-blue-200 hover:shadow-xl'
                                }`}
                            onClick={() => setSelectedEngagement(engagement.id)}
                            whileHover={{ y: -4 }}
                        >
                            {/* Premium background glow for selected */}
                            {selectedEngagement === engagement.id && (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-emerald-500/10 rounded-2xl" />
                            )}

                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-4 rounded-2xl transition-all duration-300 ${selectedEngagement === engagement.id
                                            ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                        }`}>
                                        {index === 0 ? <Building2 className="w-6 h-6" /> :
                                            index === 1 ? <BarChart3 className="w-6 h-6" /> :
                                                <Users className="w-6 h-6" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">{engagement.sector}</h3>
                                        <p className="text-sm text-slate-600">{engagement.organizationType}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="text-sm text-slate-700 leading-relaxed">
                                        <span className="font-semibold text-slate-900">Challenge:</span> {engagement.challenge.substring(0, 80)}...
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                                        <span className="text-sm font-semibold text-slate-900 flex items-center">
                                            <Target className="w-4 h-4 mr-2 text-emerald-600" />
                                            {engagement.outcomes.length} key metrics improved
                                        </span>
                                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${selectedEngagement === engagement.id
                                                ? 'rotate-90 text-blue-600'
                                                : 'text-slate-400 group-hover:text-blue-500'
                                            }`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>                {/* Premium Detailed Engagement Results */}
                {selectedEngagement && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 border border-white/50 shadow-2xl overflow-hidden"
                    >
                        {/* Premium background effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />

                        {(() => {
                            const engagement = clientEngagements.find(e => e.id === selectedEngagement)!
                            return (
                                <div className="relative grid lg:grid-cols-3 gap-12">
                                    {/* Premium Engagement Overview */}
                                    <div className="lg:col-span-2">
                                        <div className="mb-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                                                    Enterprise Engagement
                                                </span>
                                                <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{engagement.timeline}</span>
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{engagement.sector}</h3>
                                            <p className="text-lg text-slate-600 mb-2">{engagement.organizationType}</p>
                                            <div className="text-emerald-600 font-semibold text-lg">{engagement.businessValue}</div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                                            <div className="group">
                                                <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg mr-3 flex items-center justify-center">
                                                        <Target className="w-4 h-4 text-white" />
                                                    </div>
                                                    Business Challenge
                                                </h4>
                                                <p className="text-slate-700 leading-relaxed pl-11">{engagement.challenge}</p>
                                            </div>
                                            <div className="group">
                                                <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                                                        <BarChart3 className="w-4 h-4 text-white" />
                                                    </div>
                                                    Strategic Approach
                                                </h4>
                                                <p className="text-slate-700 leading-relaxed pl-11">{engagement.approach}</p>
                                            </div>
                                        </div>

                                        {/* Premium Performance Outcomes */}
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-6 text-xl flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg mr-3 flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                                Measured Performance Outcomes
                                            </h4>
                                            <div className="space-y-6">
                                                {engagement.outcomes.map((outcome, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className="group bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    >
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h5 className="font-bold text-slate-900 text-lg">{outcome.metric}</h5>
                                                            {outcome.improvement && (
                                                                <span className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-3 py-2 rounded-xl text-sm font-bold shadow-sm">
                                                                    {outcome.improvement}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-6 mb-4">
                                                            <div className="text-center">
                                                                <div className="text-xl font-bold text-slate-500 mb-1">{outcome.baseline}</div>
                                                                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Baseline</div>
                                                            </div>
                                                            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors duration-300" />
                                                            <div className="text-center">
                                                                <div className="text-xl font-bold text-blue-600 mb-1">{outcome.optimized}</div>
                                                                <div className="text-xs text-blue-600 uppercase tracking-wider font-medium">Optimized</div>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-slate-600 italic bg-white/50 rounded-lg p-3">{outcome.businessImpact}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>                                    {/* Premium Summary Panel */}
                                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-8 backdrop-blur-sm">
                                        <h4 className="font-bold text-slate-900 mb-8 text-xl flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-white" />
                                            </div>
                                            Engagement Summary
                                        </h4>

                                        <div className="space-y-6 mb-8">
                                            <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                                        <Clock className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="font-bold text-slate-900 text-lg">Timeline</span>
                                                </div>
                                                <p className="text-slate-700 font-medium pl-13">{engagement.timeline}</p>
                                            </div>

                                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50 shadow-sm">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                                                        <DollarSign className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="font-bold text-emerald-900 text-lg">Business Value</span>
                                                </div>
                                                <p className="text-emerald-800 font-bold text-lg pl-13">{engagement.businessValue}</p>
                                            </div>

                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 shadow-sm">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                                        <Target className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="font-bold text-blue-900 text-lg">Implementation</span>
                                                </div>
                                                <p className="text-blue-800 text-sm leading-relaxed pl-13">{engagement.contextualInfo}</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4 px-8 rounded-2xl font-bold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
                                        >
                                            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                            Request Similar Analysis
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </motion.button>
                                    </div>
                                </div>
                            )
                        })()}
                    </motion.div>
                )}                {/* Premium Methodology & Validation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24"
                >
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50 rounded-full text-purple-700 text-sm font-semibold mb-8 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Rigorous Methodology
                        </div>

                        <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
                            Enterprise-Grade
                            <br />
                            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                Validation Standards
                            </span>
                        </h3>

                        <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
                            All performance improvements undergo statistical validation using industry-standard methodologies.
                            Business impact calculations leverage attribution modeling and revenue tracking systems.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <BarChart3 className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-4 text-xl">Statistical Rigor</h4>
                                <p className="text-slate-600 leading-relaxed">Confidence intervals and significance testing validate all reported performance improvements</p>
                            </motion.div>

                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-4 text-xl">Revenue Attribution</h4>
                                <p className="text-slate-600 leading-relaxed">Direct revenue impact calculated through conversion tracking and attribution analysis</p>
                            </motion.div>

                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-4 text-xl">Sustained Performance</h4>
                                <p className="text-slate-600 leading-relaxed">Long-term monitoring ensures continued optimization and sustained business results</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
