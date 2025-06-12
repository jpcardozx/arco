'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Target,
    Zap,
    Shield,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    DollarSign,
    Clock,
    BarChart3,
    Users
} from 'lucide-react'
import Image from 'next/image'

// Strategic about section focused on the intersection of personal expertise and ARCO methodology
export function StrategicAboutSectionNew() {

    // How personal expertise intersects with ARCO methodology
    const methodology_intersections = [
        {
            phase: "Conversion Architecture Analysis",
            duration: "48 hours",
            personalExpertise: "10+ years analyzing conversion funnels for $2M-$50M companies",
            arcoMethodology: "This experience enables precise identification of revenue leak patterns",
            intersection: "Personal pattern recognition + ARCO's systematic framework = faster, more accurate diagnosis",
            process: [
                "Conversion funnel dissection (João Pedro's specialized approach)",
                "Revenue leak pattern analysis (ARCO framework application)",
                "Performance bottleneck mapping (technical depth + business impact)",
                "ROI projection with specific timeline (proven methodology)"
            ],
            outcome: "Complete revenue hemorrhage map + immediate quick wins",
            icon: Target,
            color: "from-emerald-500 to-teal-600"
        },
        {
            phase: "Performance Engineering Implementation",
            duration: "7-28 days",
            personalExpertise: "Core Web Vitals optimization specialist (4.2s → 0.8s track record)",
            arcoMethodology: "ARCO's stack efficiency methodology provides systematic approach",
            intersection: "Technical expertise + systematic methodology = guaranteed performance results",
            process: [
                "Stack consolidation (immediate $2,400/month savings)",
                "Critical flow optimization (conversion improvement +67%)",
                "Performance transformation (0.8s load time guaranteed)",
                "Native integrations (eliminate middleware dependencies)"
            ],
            outcome: "Immediate cost reduction + performance transformation",
            icon: Zap,
            color: "from-blue-500 to-indigo-600"
        },
        {
            phase: "Revenue Psychology Application",
            duration: "Ongoing",
            personalExpertise: "Studies in how technical excellence gets undervalued symbolically",
            arcoMethodology: "ARCO's symbolic alignment framework for premium positioning",
            intersection: "Psychological insights + systematic alignment = sustainable premium pricing",
            process: [
                "Value perception calibration (psychology + framework)",
                "Symbolic friction elimination (systematic approach)",
                "Premium positioning implementation (proven methodology)",
                "Revenue impact measurement + optimization (continuous improvement)"
            ],
            outcome: "Sustainable growth + optimized profit margins",
            icon: TrendingUp,
            color: "from-purple-500 to-pink-600"
        }
    ]

    // What makes this intersection uniquely powerful
    const intersection_advantages = [
        {
            advantage: "Experience-Enhanced Methodology",
            personalElement: "10+ years of hands-on conversion optimization experience",
            arcoElement: "Systematic ARCO framework for consistent results",
            intersection: "Personal pattern recognition accelerates systematic diagnosis by 60%",
            evidence: "Clients achieve results in 31 days vs 90+ day industry average",
            icon: DollarSign
        },
        {
            advantage: "Technical Depth + Business Focus",
            personalElement: "Deep technical expertise in performance engineering",
            arcoElement: "Revenue-first approach to all optimizations",
            intersection: "Technical changes are always ROI-justified and business-validated",
            evidence: "97% of technical improvements directly correlate to revenue gains",
            icon: Target
        },
        {
            advantage: "Proven Track Record + Systematic Scale",
            personalElement: "Real client results: Ipê (1.9% → 8.2%), Xora (4.2s → 0.8s)",
            arcoElement: "Replicable methodology that works across different industries",
            intersection: "Personal success patterns become systematic, scalable processes",
            evidence: "Same methodology successfully applied across 15+ different client types",
            icon: Shield
        },
        {
            advantage: "Speed + Precision",
            personalElement: "Years of experience enable quick problem identification",
            arcoElement: "ARCO's systematic approach ensures nothing is missed",
            intersection: "Fast diagnosis + comprehensive methodology = rapid, complete solutions",
            evidence: "48-hour diagnosis + 14-day major improvements standard timeline",
            icon: Clock
        }
    ]

    // Real credentials that demonstrate the intersection value
    const intersection_credentials = [
        {
            metric: "$380k+",
            description: "Additional revenue generated in 6 weeks",
            context: "Ipê case: Personal expertise + ARCO methodology application"
        },
        {
            metric: "287%",
            description: "Trial-to-paid conversion improvement",
            context: "Xora case: Technical expertise + systematic business focus"
        },
        {
            metric: "2.3×",
            description: "Premium pricing achieved through better perception",
            context: "Revenue psychology insights + ARCO symbolic alignment"
        },
        {
            metric: "42 days",
            description: "Average time to positive ROI",
            context: "Experience-accelerated diagnosis + systematic implementation"
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 mb-8">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 font-medium">Professional Intersection Methodology</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-light text-slate-900 leading-tight mb-6">
                        How Personal Expertise
                        <br />
                        <span className="font-bold text-blue-600">Enhances ARCO Methodology</span>
                    </h2>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Where 10+ years of conversion engineering experience meets systematic business methodology.
                        This intersection creates measurable revenue recovery that neither could achieve alone.
                    </p>
                </motion.div>                {/* Methodology Intersections */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-3 gap-8 mb-20"
                >
                    {methodology_intersections.map((intersection, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                        >                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${intersection.color} flex items-center justify-center mb-6`}>
                                {React.createElement(intersection.icon, { className: "w-8 h-8 text-white" })}
                            </div>

                            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                                {intersection.phase}
                            </h3>

                            <div className="flex items-center space-x-2 mb-4">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-600">{intersection.duration}</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-blue-800 mb-1">Personal Expertise:</p>
                                    <p className="text-sm text-blue-700">{intersection.personalExpertise}</p>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-green-800 mb-1">ARCO Methodology:</p>
                                    <p className="text-sm text-green-700">{intersection.arcoMethodology}</p>
                                </div>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-purple-800 mb-1">Intersection Value:</p>
                                    <p className="text-sm text-purple-700">{intersection.intersection}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                    Process:
                                </h4>
                                {intersection.process.map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-600">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-slate-900 mb-1">Result:</p>
                                <p className="text-sm text-slate-700">{intersection.outcome}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>                {/* Intersection Advantages */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-light text-slate-900 mb-4">
                            Why This Intersection Creates Superior Results
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Where personal expertise meets systematic methodology,
                            clients achieve results that neither approach could deliver independently.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {intersection_advantages.map((advantage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-lg p-6 shadow-md border border-slate-200"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <advantage.icon className="w-6 h-6 text-blue-600" />
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 mb-3">
                                    {advantage.advantage}
                                </h4>

                                <div className="space-y-3 mb-4">
                                    <div className="text-xs">
                                        <p className="text-slate-500 font-medium mb-1">Personal Element:</p>
                                        <p className="text-slate-600">{advantage.personalElement}</p>
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-slate-500 font-medium mb-1">ARCO Element:</p>
                                        <p className="text-slate-600">{advantage.arcoElement}</p>
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-slate-500 font-medium mb-1">Intersection:</p>
                                        <p className="text-slate-700 font-medium">{advantage.intersection}</p>
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded p-3">
                                    <p className="text-xs font-medium text-green-800">
                                        {advantage.evidence}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Business Credentials */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 text-white"
                >                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-light mb-4">
                            Proven Intersection Results
                        </h3>
                        <p className="text-slate-300 text-lg">
                            Real metrics from clients who experienced the power of this professional intersection
                        </p>
                    </div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {intersection_credentials.map((credential, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl font-bold text-white mb-2">
                                    {credential.metric}
                                </div>
                                <div className="text-lg font-semibold text-blue-400 mb-3">
                                    {credential.description}
                                </div>
                                <div className="text-sm text-slate-400 leading-relaxed">
                                    {credential.context}
                                </div>
                            </motion.div>
                        ))}
                    </div>                    <div className="text-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
                        >
                            <Target className="w-5 h-5" />
                            <span>Get Your Professional Intersection Analysis</span>
                        </motion.button>
                        <p className="text-slate-400 text-sm mt-3">
                            48-hour delivery • See where expertise + methodology = revenue recovery
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
