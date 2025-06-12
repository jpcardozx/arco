'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Target, Zap, TrendingUp, Shield, Clock, BarChart3 } from 'lucide-react'

/**
 * Enterprise Solution Component
 * 
 * Presents ARCO's systematic methodology and differentiators
 * with focus on engineering discipline and measurable outcomes.
 */

interface MethodologyPhase {
    step: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    deliverables: string[]
    timeline: string
}

interface BusinessOutcome {
    metric: string
    description: string
    guarantee: string
}

interface Differentiator {
    title: string
    description: string
    advantage: string
}

const methodologyPhases: MethodologyPhase[] = [
    {
        step: '01',
        title: 'Technical Discovery',
        description: 'Comprehensive infrastructure analysis with quantified baseline establishment',
        icon: Target,
        color: 'from-blue-500 to-blue-600',
        deliverables: [
            'Performance baseline using standardized tools',
            'SaaS audit via expense reports and security reviews',
            'Infrastructure cost analysis (cloud billing, licensing)',
            'System dependencies and architecture mapping'
        ],
        timeline: 'Days 1-3'
    },
    {
        step: '02',
        title: 'Efficiency Analysis',
        description: 'Systematic identification of optimization opportunities with ROI quantification',
        icon: Zap,
        color: 'from-orange-500 to-orange-600',
        deliverables: [
            'Redundancy identification across tools and workflows',
            'Performance bottleneck analysis with impact measurement',
            'Cost-per-outcome calculations',
            'Risk assessment with mitigation strategies'
        ],
        timeline: 'Days 4-6'
    },
    {
        step: '03',
        title: 'Strategic Implementation',
        description: 'Prioritized roadmap with resource requirements and success metrics',
        icon: TrendingUp,
        color: 'from-green-500 to-green-600',
        deliverables: [
            'Prioritized improvement opportunities by ROI',
            'Implementation timeline with milestone dependencies',
            'Resource requirements and budget projections',
            'Performance monitoring and success criteria'
        ],
        timeline: 'Days 7-10'
    }
]

const businessOutcomes: BusinessOutcome[] = [
    {
        metric: '30%+ reduction in digital TCO',
        description: 'Through systematic consolidation and optimization',
        guarantee: 'Achieved within 90 days or continued optimization at no cost'
    },
    {
        metric: 'Core Web Vitals ≤ 1.8s LCP',
        description: 'Performance engineering with measurable user experience improvement',
        guarantee: 'Performance targets met or free rework until achieved'
    },
    {
        metric: '15%+ conversion rate improvement',
        description: 'Optimized user journeys and technical performance',
        guarantee: 'Measurable business impact with statistical confidence'
    }
]

const differentiators: Differentiator[] = [
    {
        title: 'Engineering-Led Approach',
        description: 'Technical implementation capability combined with business outcome focus',
        advantage: 'vs. Management consultancies with limited technical execution'
    },
    {
        title: 'Fixed-Fee with Guarantees',
        description: 'Transparent pricing with performance guarantees and financial backing',
        advantage: 'vs. Systems integrators with complex procurement and vendor lock-in'
    },
    {
        title: 'Client Infrastructure Ownership',
        description: 'Complete IP transfer and infrastructure control retained by client',
        advantage: 'vs. Agencies with project-based thinking and dependency creation'
    }
]

export function EnterpriseSolution() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.15
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
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-20"
                >
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-full px-6 py-3 mb-8">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-700 font-medium">
                                Systematic Infrastructure Optimization
                            </span>
                        </div>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight"
                    >
                        Engineering Discipline
                        <br />
                        <span className="text-blue-600">Meets Business Outcomes</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
                    >
                        Our systematic approach eliminates guesswork through rigorous methodology.
                        <strong className="text-slate-800"> Measurable ROI in weeks, not months</strong>,
                        with transparent processes and performance guarantees.
                    </motion.p>
                </motion.div>

                {/* Methodology Process */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="mb-24"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Three-Phase Optimization Framework
                        </h3>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Each phase builds systematic understanding and delivers measurable progress toward optimization goals.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {methodologyPhases.map((phase, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                            >
                                {/* Connection Line */}
                                {index < methodologyPhases.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-10" />
                                )}

                                <div className="bg-slate-50 rounded-2xl p-8 h-full border border-slate-200 group-hover:border-slate-300 transition-all duration-300">
                                    {/* Phase Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full text-white shadow-lg`}>
                                            <phase.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-400 mb-1">
                                                PHASE {phase.step}
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900">
                                                {phase.title}
                                            </h4>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {phase.description}
                                    </p>

                                    {/* Deliverables */}
                                    <div className="mb-6">
                                        <h5 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                                            Key Deliverables
                                        </h5>
                                        <ul className="space-y-2">
                                            {phase.deliverables.map((deliverable, deliverableIndex) => (
                                                <li key={deliverableIndex} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-slate-600">{deliverable}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Timeline */}
                                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-semibold text-slate-800">
                                                {phase.timeline}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Business Outcomes */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="mb-24"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Guaranteed Business Outcomes
                        </h3>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Performance guarantees backed by systematic methodology and measurable success criteria.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {businessOutcomes.map((outcome, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200/50"
                            >
                                <div className="text-center">
                                    <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                                        {outcome.metric}
                                    </h4>
                                    <p className="text-slate-600 mb-4">
                                        {outcome.description}
                                    </p>
                                    <div className="bg-white/80 rounded-lg p-3 border border-green-200">
                                        <div className="text-sm font-semibold text-green-700">
                                            Performance Guarantee
                                        </div>
                                        <div className="text-sm text-green-600 mt-1">
                                            {outcome.guarantee}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Competitive Differentiators */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Strategic Market Position
                        </h3>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Bridging the gap between high-overhead consultancies and tactical development agencies.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {differentiators.map((differentiator, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-slate-900 rounded-2xl p-8 text-white"
                            >
                                <h4 className="text-xl font-bold mb-4">
                                    {differentiator.title}
                                </h4>
                                <p className="text-slate-300 mb-4 leading-relaxed">
                                    {differentiator.description}
                                </p>
                                <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-500/30">
                                    <div className="text-sm font-semibold text-blue-300">
                                        Competitive Advantage
                                    </div>
                                    <div className="text-sm text-blue-200 mt-1">
                                        {differentiator.advantage}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Process Guarantee */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="mt-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-3xl p-12 text-center text-white"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">
                            Methodology Transparency & Client Control
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                            <div>
                                <h4 className="text-lg font-semibold mb-3">Open Methodology</h4>
                                <ul className="space-y-2 text-slate-200">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Published diagnostic frameworks
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Transparent ROI calculation methodologies
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Performance monitoring with real-time access
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-3">Client Ownership</h4>
                                <ul className="space-y-2 text-slate-200">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Complete IP transfer and documentation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Infrastructure control retained by client
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        No vendor dependencies or lock-in
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
