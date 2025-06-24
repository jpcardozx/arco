'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProfessionalNavigation from '../../components/layout/ProfessionalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { ArrowRight, Search, Target, Zap, TrendingUp, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function MethodologyPage() {
    const phases = [
        {
            icon: <Search className="h-8 w-8" />,
            title: "Microdiagnostic Assessment",
            duration: "30 minutes",
            description: "Surgical precision analysis to identify the exact technical debt patterns blocking conversion.",
            details: [
                "Comprehensive funnel analysis using proprietary diagnostic framework",
                "Technical debt pattern recognition across 47 common failure points",
                "Revenue impact quantification for each identified issue",
                "Priority intervention mapping based on ROI potential"
            ]
        },
        {
            icon: <Target className="h-8 w-8" />,
            title: "Targeted Intervention",
            duration: "2-8 weeks",
            description: "Focused implementation targeting highest-impact technical debt with measurable guarantees.",
            details: [
                "Surgical interventions on identified priority issues",
                "Real-time performance monitoring during implementation",
                "Minimum 15% improvement guarantee on pilot engagements",
                "Technical documentation and knowledge transfer"
            ]
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Performance Optimization",
            duration: "Ongoing",
            description: "Systematic optimization to unlock the growth capacity your marketing buys but can't sell.",
            details: [
                "Full-stack optimization across identified bottlenecks",
                "Advanced conversion tracking and analytics implementation",
                "Performance monitoring dashboard with predictive insights",
                "Continuous improvement program with monthly reviews"
            ]
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Scale & Maintain",
            duration: "Continuous",
            description: "Ongoing technical debt prevention and performance maintenance for sustained growth.",
            details: [
                "Technical debt prevention protocols",
                "Performance monitoring and alerting systems",
                "Strategic recommendations based on market changes",
                "Priority support for rapid issue resolution"
            ]
        }
    ]

    const archetypes = [
        {
            title: "The Efficiency Hacker",
            problem: "\"We're spending too much on ads for what we're getting back\"",
            solution: "Microdiagnostic precision identifies conversion leaks costing 20-40% of ad spend",
            outcome: "Self-funding improvements that reduce acquisition costs while increasing conversion rates"
        },
        {
            title: "The Conversion Seeker",
            problem: "\"Our traffic quality is good, but something's not connecting\"",
            solution: "Technical debt analysis reveals friction points in the conversion funnel",
            outcome: "Surgical interventions that improve conversion rates by 15-35% within 47 days"
        },
        {
            title: "The Stack Rationalizer",
            problem: "\"Our tech stack is complex, slow, and nobody knows how it works\"",
            solution: "Systematic optimization and documentation of technical infrastructure",
            outcome: "Streamlined operations with improved performance and reduced maintenance overhead"
        }
    ]

    const frameworks = [
        {
            name: "Technical Debt Resolution Framework",
            description: "Proprietary methodology for identifying and prioritizing technical debt by revenue impact",
            components: ["Funnel Analysis", "Pattern Recognition", "Impact Quantification", "ROI Mapping"]
        },
        {
            name: "Microdiagnostic Protocol",
            description: "30-minute assessment process that identifies specific technical issues blocking conversion",
            components: ["Performance Profiling", "UX Analysis", "Technical Audit", "Revenue Impact Assessment"]
        },
        {
            name: "Self-Funding Implementation",
            description: "Guarantee model where improvements pay for themselves through increased performance",
            components: ["Baseline Measurement", "Performance Guarantee", "ROI Tracking", "Success Metrics"]
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <ProfessionalNavigation />

            {/* Hero Section */}
            <section className="pt-20 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                            Technical Debt Resolution
                            <span className="block font-medium">Methodology</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            A systematic approach to identifying and eliminating the technical barriers
                            that prevent your marketing from converting at its true potential.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Methodology Overview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Four-Phase Implementation Process
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Each phase builds on the previous, creating a systematic approach
                            to sustainable growth and performance optimization.
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                <div className="lg:w-1/2">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mr-4 text-slate-700">
                                            {phase.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-slate-900">
                                                {phase.title}
                                            </h3>
                                            <span className="text-slate-500">{phase.duration}</span>
                                        </div>
                                    </div>
                                    <p className="text-lg text-slate-600 mb-6">
                                        {phase.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {phase.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-700">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="bg-slate-50 rounded-lg p-8 h-64 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl font-light text-slate-300 mb-2">
                                                {index + 1}
                                            </div>
                                            <div className="text-slate-500">
                                                Phase {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Archetypes */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Client Archetypes & Solutions
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our methodology adapts to three primary client archetypes,
                            each with distinct challenges and optimization opportunities.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {archetypes.map((archetype, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-8 shadow-sm border border-slate-200"
                            >
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                    {archetype.title}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Problem:</h4>
                                        <p className="text-slate-600 italic">"{archetype.problem}"</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Solution:</h4>
                                        <p className="text-slate-600">{archetype.solution}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Outcome:</h4>
                                        <p className="text-slate-600 font-medium">{archetype.outcome}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Frameworks */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Proprietary Frameworks
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Developed through years of technical debt resolution work with mid-market companies.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {frameworks.map((framework, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-slate-50 rounded-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    {framework.name}
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    {framework.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {framework.components.map((component, componentIndex) => (
                                        <span
                                            key={componentIndex}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white text-slate-700 border border-slate-200"
                                        >
                                            {component}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-light mb-6">
                            Ready to Apply Our Methodology?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Start with a 30-minute diagnostic assessment to identify
                            the specific technical debt blocking your growth.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Start Diagnostic Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ProfessionalFooter />
        </div>
    )
}
