'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    BarChart3,
    Target,
    CheckCircle,
    Clock,
    Award,
    TrendingUp,
    FileText
} from 'lucide-react'

interface OperationalPrinciple {
    title: string
    description: string
    implementation: string
    businessValue: string
    validationMethod: string
}

export function TrustPrinciplesSection() {
    const operationalPrinciples: OperationalPrinciple[] = [
        {
            title: "Evidence-Based Methodology",
            description: "Every recommendation is supported by quantifiable performance data and industry benchmarks",
            implementation: "Comprehensive baseline analysis, statistical validation of improvements and post-implementation verification",
            businessValue: "Eliminates guesswork and ensures resource allocation to highest-impact optimizations",
            validationMethod: "Pre/post performance comparisons with statistical significance testing"
        },
        {
            title: "Risk-Managed Implementation",
            description: "Structured approach with clear success criteria, rollback procedures and validation checkpoints",
            implementation: "Staged deployment, A/B testing for critical changes and continuous monitoring during implementation",
            businessValue: "Minimizes business disruption while ensuring measurable performance improvements",
            validationMethod: "Pre-defined success metrics with clear validation thresholds"
        },
        {
            title: "Business Outcome Alignment",
            description: "Technical optimizations directly tied to conversion improvements and revenue impact",
            implementation: "Performance improvements mapped to specific business KPIs and conversion funnel optimization",
            businessValue: "Every technical change translates to measurable business improvement",
            validationMethod: "Revenue attribution analysis and conversion rate impact measurement"
        },
        {
            title: "Transparent Reporting",
            description: "Comprehensive documentation of methodologies, results and recommendations with executive summaries",
            implementation: "Detailed performance reports, executive briefings and actionable improvement roadmaps",
            businessValue: "Clear understanding of investment ROI and strategic performance insights",
            validationMethod: "Regular performance reviews with appropriate stakeholder reporting levels"
        }
    ]

    const principleIcons = [
        <BarChart3 className="w-6 h-6" />,
        <Shield className="w-6 h-6" />,
        <Target className="w-6 h-6" />,
        <FileText className="w-6 h-6" />
    ]

    return (
        <section className="py-32 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden">
            {/* Premium background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-200/30 via-transparent to-blue-200/30" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-emerald-200/10 via-transparent to-emerald-200/10" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/10 to-transparent" />
                <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/10 to-transparent" />
            </div>

            {/* Floating elements */}
            <div className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-32 left-10 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/50 rounded-full text-blue-700 text-sm font-semibold mb-8 backdrop-blur-sm">
                        <Shield className="w-4 h-4 mr-2" />
                        Operational Excellence
                    </div>

                    <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                        Enterprise-Grade
                        <br />                        <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                            Service Standards
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        Our performance optimization methodology is built on four fundamental principles that ensure
                        predictable, measurable and sustainable business transformation.
                    </p>
                </motion.div>

                {/* Premium Principles Grid */}
                <div className="grid lg:grid-cols-2 gap-10 mb-20">
                    {operationalPrinciples.map((principle, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Premium background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/3 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className={`p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${index === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                                        index === 1 ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                                            index === 2 ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                                                'bg-gradient-to-br from-orange-500 to-red-600'
                                        }`}>
                                        <div className="text-white">
                                            {principleIcons[index]}
                                        </div>
                                    </div>                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-2">{principle.title}</h3>
                                        <p className="text-slate-300 font-medium">Core operational standard</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="group/item">
                                        <h4 className="font-bold text-white mb-3 text-lg flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                            Principle
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed pl-9">{principle.description}</p>
                                    </div>

                                    <div className="group/item">
                                        <h4 className="font-bold text-white mb-3 text-lg flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg mr-3 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                            Implementation
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed pl-9">{principle.implementation}</p>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h4 className="font-bold text-white mb-3 text-lg flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                                                <TrendingUp className="w-3 h-3 text-white" />
                                            </div>                                            Business Value
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed pl-9">{principle.businessValue}</p>
                                    </div>

                                    <div className="flex items-start gap-3 bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                                        <CheckCircle className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="font-bold text-white text-sm">Validation Method:</span>
                                            <p className="text-slate-300 text-sm mt-1 leading-relaxed">{principle.validationMethod}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>                {/* Premium Professional Standards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white overflow-hidden"
                >
                    {/* Premium background effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
                    </div>

                    <div className="relative">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
                                <Award className="w-4 h-4 mr-2" />
                                Professional Excellence
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Enterprise Service
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                                    Delivery Standards
                                </span>
                            </h3>
                            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                                Every engagement is conducted according to established professional standards, ensuring
                                consistent quality and predictable outcomes across all client relationships.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold mb-3 text-lg">Delivery Predictability</h4>
                                <p className="text-slate-300 leading-relaxed">Structured timelines with clear milestones and deliverable schedules</p>
                            </motion.div>

                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <Award className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-600/30 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold mb-3 text-lg">Quality Assurance</h4>
                                <p className="text-slate-300 leading-relaxed">Multi-stage review processes and validation checkpoints</p>
                            </motion.div>

                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <TrendingUp className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold mb-3 text-lg">Outcome Accountability</h4>
                                <p className="text-slate-300 leading-relaxed">Success metrics defined and measured throughout engagement</p>
                            </motion.div>

                            <motion.div
                                className="group text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <FileText className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold mb-3 text-lg">Documentation Standards</h4>
                                <p className="text-slate-300 leading-relaxed">Comprehensive reporting and knowledge transfer protocols</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
