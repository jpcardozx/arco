'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    Target,
    TrendingUp,
    Award,
    CheckCircle,
    Clock
} from 'lucide-react'

interface ExecutiveTrustPrinciple {
    icon: React.ComponentType<{ className?: string }>
    title: string
    businessValue: string
    validation: string
}

export function TrustPrinciplesSectionExecutive() {
    const trustPrinciples: ExecutiveTrustPrinciple[] = [
        {
            icon: Shield,
            title: "Evidence-Based Results",
            businessValue: "Every recommendation backed by quantifiable data and statistical validation",
            validation: "Pre/post performance comparisons with ROI measurement"
        },
        {
            icon: Target,
            title: "Risk-Managed Implementation",
            businessValue: "Structured approach minimizes business disruption while ensuring results",
            validation: "Staged deployment with clear success criteria and rollback procedures"
        },
        {
            icon: TrendingUp,
            title: "Business Outcome Alignment",
            businessValue: "Technical optimizations directly tied to revenue and conversion improvements",
            validation: "Revenue attribution analysis and conversion impact measurement"
        },
        {
            icon: Award,
            title: "Transparent Accountability",
            businessValue: "Comprehensive reporting with executive summaries and actionable insights",
            validation: "Regular performance reviews with stakeholder reporting protocols"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30" />
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-medium mb-6">
                            <Shield className="w-5 h-5" />
                            Enterprise Standards
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Operational Excellence
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">You Can Trust</span>
                        </h2>

                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Four fundamental principles that ensure predictable, measurable
                            and sustainable business transformation for executive stakeholders.
                        </p>
                    </motion.div>                    {/* Trust Principles Grid */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                        {trustPrinciples.map((principle, index) => {
                            const Icon = principle.icon

                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-6 mb-6">
                                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">{principle.title}</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-slate-700 leading-relaxed">
                                            {principle.businessValue}
                                        </div>

                                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-green-800 font-medium">
                                                {principle.validation}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>                    {/* Enterprise Standards Summary */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-slate-200">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                Enterprise Service Delivery Standards
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col items-center text-center">
                                    <Clock className="w-8 h-8 text-blue-600 mb-4" />
                                    <div className="space-y-1">
                                        <div className="font-semibold text-slate-900">Delivery Predictability</div>
                                        <div className="text-sm text-slate-600">Structured timelines with clear milestones</div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <Award className="w-8 h-8 text-blue-600 mb-4" />
                                    <div className="space-y-1">
                                        <div className="font-semibold text-slate-900">Quality Assurance</div>
                                        <div className="text-sm text-slate-600">Multi-stage validation checkpoints</div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
                                    <div className="space-y-1">
                                        <div className="font-semibold text-slate-900">Outcome Accountability</div>
                                        <div className="text-sm text-slate-600">Success metrics defined and measured</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
