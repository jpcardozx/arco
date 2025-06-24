'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart3,
    Target,
    CheckCircle,
    Clock,
    TrendingUp,
    ArrowRight,
    Shield,
    Users,
    Zap,
    Database,
    FileText
} from 'lucide-react'

interface ServiceLevel {
    id: string
    name: string
    category: string
    timeframe: string
    description: string
    businessValue: string
    deliverables: string[]
    outcomes: string[]
    suitableFor: string[]
    nextStep: string
    featured?: boolean
}

export function ValueStaircase() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const serviceLevels: ServiceLevel[] = [
        {
            id: 'assessment',
            name: 'Performance Assessment',
            category: 'Diagnosis & Strategy',
            timeframe: '3-5 business days',
            description: 'Comprehensive performance baseline analysis with strategic recommendations',
            businessValue: 'Quantified opportunity assessment and prioritized action plan',
            deliverables: [
                'Technical performance audit across all critical user paths',
                'Conversion funnel analysis with abandonment point identification',
                'Mobile and desktop experience evaluation',
                'Competitive benchmarking against industry standards',
                'ROI-prioritized improvement roadmap'
            ],
            outcomes: [
                'Clear understanding of current performance gaps',
                'Quantified revenue opportunity through improvements',
                'Risk-free validation of optimization potential'
            ],
            suitableFor: [
                'Companies seeking data-driven performance insights',
                'Organizations planning digital optimization initiatives',
                'Companies needing stakeholder buy-in for performance investments'
            ],
            nextStep: 'Request Assessment',
            featured: true
        }, {
            id: 'optimization',
            name: 'Performance Implementation',
            category: 'Execution & Delivery',
            timeframe: '2-4 weeks',
            description: 'Large-scale performance optimization with measurable business impact',
            businessValue: 'Direct conversion rate improvements and revenue acceleration',
            deliverables: [
                'Complete technical implementation of priority optimizations',
                'Core Web Vitals compliance and mobile experience enhancement',
                'Conversion rate optimization across key user journeys',
                'Performance monitoring and alert system setup',
                '30-day post-launch performance validation'
            ],
            outcomes: [
                'Measurable improvement in conversion rates',
                'Enhanced user experience across all devices',
                'Improved search engine visibility and rankings'
            ],
            suitableFor: [
                'Companies with validated performance optimization needs',
                'Organizations seeking immediate measurable results',
                'Companies with dedicated development resources'
            ],
            nextStep: 'Start Implementation'
        }, {
            id: 'partnership',
            name: 'Strategic Partnership',
            category: 'Continuous Optimization',
            timeframe: 'Ongoing relationship',
            description: 'Long-term performance partnership with continuous improvement',
            businessValue: 'Sustained competitive advantage through continuous optimization',
            deliverables: [
                'Monthly performance reviews and optimization cycles',
                'Continuous monitoring with proactive issue resolution',
                'Quarterly strategic assessments and roadmap updates',
                'Priority technical support and consulting access',
                'Regular competitive analysis and industry benchmarking'
            ],
            outcomes: [
                'Sustained performance improvements over time',
                'Proactive performance issue resolution',
                'Continuous competitive advantage in digital experience'
            ],
            suitableFor: [
                'Organizations with ongoing digital growth initiatives',
                'Companies requiring consistent performance excellence',
                'Businesses seeking long-term digital competitive advantage'
            ],
            nextStep: 'Discuss Partnership'
        }
    ]; return (
        <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Premium background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Performance Optimization Services
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Structured approach to digital performance improvement, designed to deliver measurable business results regardless of your starting point or organizational maturity.
                    </p>
                </motion.div>

                {/* Service Levels */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {serviceLevels.map((level, index) => (
                        <motion.div
                            key={level.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className={`
                                relative bg-white/5 rounded-3xl p-10 border border-white/10 transition-all duration-500 cursor-pointer group overflow-hidden backdrop-blur-sm hover:bg-white/10
                                ${level.featured ? 'border-blue-400/60 shadow-2xl ring-2 ring-blue-500/30 bg-gradient-to-br from-white/10 to-blue-500/10 scale-105' : 'hover:border-white/20 hover:shadow-xl shadow-lg'}
                            `}
                            onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                            whileHover={{ y: -6, scale: level.featured ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Premium gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                            {/* Glow effect for featured */}
                            {level.featured && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-xl" />
                            )}

                            {/* Featured Badge */}
                            {level.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                    Most Requested
                                </div>
                            )}                            {/* Header */}
                            <div className="mb-8 relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:scale-110 ${level.featured ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-white/10 text-slate-300 border-white/20 group-hover:bg-blue-500/20 group-hover:text-blue-400'}`}>
                                        {index === 0 ? <FileText className="w-6 h-6" /> :
                                            index === 1 ? <Zap className="w-6 h-6" /> :
                                                <TrendingUp className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">{level.category}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{level.name}</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-medium">{level.timeframe}</span>
                                </div>
                                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">{level.description}</p>
                            </div>

                            {/* Business Value */}
                            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                <h4 className="font-semibold text-white mb-2">Business Value</h4>
                                <p className="text-slate-300 text-sm">{level.businessValue}</p>
                            </div>

                            {/* Key Deliverables Preview */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-white mb-3">Key Deliverables</h4>                                <ul className="space-y-2">
                                    {level.deliverables.slice(0, 3).map((deliverable, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-slate-300 text-sm">{deliverable}</span>
                                        </li>
                                    ))}
                                    {level.deliverables.length > 3 && (
                                        <li className="text-sm text-slate-400 ml-6">
                                            +{level.deliverables.length - 3} more deliverables
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2
                                    ${level.featured
                                        ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                    }
                                `}
                            >
                                {level.nextStep}
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Service Level Information */}
                {selectedLevel && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                    >
                        {(() => {
                            const level = serviceLevels.find(s => s.id === selectedLevel)!
                            return (
                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">                                        <div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-4">{level.name} Details</h4>
                                        <p className="text-slate-700 text-lg leading-relaxed">{level.description}</p>
                                    </div>

                                        <div>
                                            <h5 className="font-bold text-slate-900 mb-4 text-lg">Complete Deliverables</h5>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <ul className="space-y-3">
                                                    {level.deliverables.slice(0, Math.ceil(level.deliverables.length / 2)).map((deliverable, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-slate-700">{deliverable}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <ul className="space-y-3">
                                                    {level.deliverables.slice(Math.ceil(level.deliverables.length / 2)).map((deliverable, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-slate-700">{deliverable}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>                                        <div>
                                            <h5 className="font-bold text-slate-900 mb-4 text-lg">Expected Outcomes</h5>
                                            <ul className="space-y-3">
                                                {level.outcomes.map((outcome, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-slate-700">{outcome}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6">
                                        <h5 className="font-bold text-slate-900 mb-4 text-lg">Ideal For</h5>
                                        <ul className="space-y-3 mb-6">
                                            {level.suitableFor.map((criteria, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-700 text-sm">{criteria}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                                            <h6 className="font-semibold text-blue-900 mb-2">Timeline</h6>
                                            <div className="flex items-center gap-2 text-blue-700">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-medium">{level.timeframe}</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {level.nextStep}
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            )
                        })()}
                    </motion.div>
                )}

                {/* Professional Approach */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">
                            Evidence-Based Performance Optimization
                        </h3>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            Our methodology combines technical expertise with business intelligence to deliver sustainable performance improvements. Each engagement is structured to minimize risk while maximizing measurable outcomes.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">Data-Driven</h4>
                                <p className="text-slate-600 text-sm">Every recommendation backed by performance data and business metrics</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">Risk-Managed</h4>
                                <p className="text-slate-600 text-sm">Structured approach with clear success criteria and validation points</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">Business-Focused</h4>
                                <p className="text-slate-600 text-sm">Optimizations prioritized by revenue impact and strategic value</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
