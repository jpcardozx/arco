'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProfessionalNavigation from '../../components/layout/ProfessionalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { ArrowRight, CheckCircle, Clock, Shield, TrendingUp, Target } from 'lucide-react'
import Link from 'next/link'

export default function PilotPage() {
    const guarantees = [
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "15% Minimum Improvement",
            description: "Guaranteed performance increase or full credit toward Scale package"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "2-3 Week Timeline",
            description: "Rapid implementation with measurable results"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Performance Monitoring",
            description: "Real-time tracking throughout implementation"
        }
    ]

    const process = [
        {
            step: "01",
            title: "Diagnostic Assessment",
            description: "30-minute analysis to identify highest-impact technical debt",
            timeline: "Day 1"
        },
        {
            step: "02",
            title: "Implementation Plan",
            description: "Detailed roadmap with specific interventions and success metrics",
            timeline: "Day 2-3"
        },
        {
            step: "03",
            title: "Targeted Implementation",
            description: "Surgical interventions on identified priority issues",
            timeline: "Week 1-2"
        },
        {
            step: "04",
            title: "Performance Validation",
            description: "Measurement and documentation of improvements achieved",
            timeline: "Week 3"
        }
    ]

    const deliverables = [
        "Comprehensive diagnostic report with specific technical debt identified",
        "Targeted implementation of highest-ROI improvements",
        "Real-time performance monitoring dashboard",
        "Technical documentation and knowledge transfer",
        "Baseline vs. improved performance comparison",
        "Recommendations for Scale package optimization opportunities"
    ]

    const useCases = [
        {
            scenario: "Efficiency Hacker",
            problem: "\"We're spending $50k/month on ads but conversion rates are declining\"",
            solution: "Identify conversion leaks costing 20-30% of ad spend",
            outcome: "Reduce acquisition cost by $10-15k/month while maintaining volume"
        },
        {
            scenario: "Conversion Seeker",
            problem: "\"Traffic quality looks good but something's not connecting\"",
            solution: "Eliminate technical friction in the conversion funnel",
            outcome: "15-25% conversion rate improvement within 3 weeks"
        },
        {
            scenario: "Stack Rationalizer",
            problem: "\"Our checkout process is slow and customers are abandoning\"",
            solution: "Optimize critical path performance and user experience",
            outcome: "Reduce cart abandonment by 20-35% with faster load times"
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
                            Pilot Implementation
                            <span className="block font-medium">$1,200 | 2-3 Weeks</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Surgical intervention on your highest-impact technical debt with a
                            guaranteed 15% improvement or full credit toward our Scale package.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Launch Pilot Program
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Guarantees */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4 text-slate-700">
                                    {guarantee.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {guarantee.title}
                                </h3>
                                <p className="text-slate-600">
                                    {guarantee.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Common Pilot Scenarios
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            How our pilot implementation addresses the most common technical debt patterns
                            blocking growth for mid-market companies.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-8 shadow-sm border border-slate-200"
                            >
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                    {useCase.scenario}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Challenge:</h4>
                                        <p className="text-slate-600 italic">"{useCase.problem}"</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Intervention:</h4>
                                        <p className="text-slate-600">{useCase.solution}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Expected Result:</h4>
                                        <p className="text-slate-600 font-medium">{useCase.outcome}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Pilot Implementation Process
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            A structured 2-3 week process designed to deliver measurable improvements
                            with minimal disruption to your operations.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {process.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                <div className="lg:w-1/3">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-full text-xl font-semibold mb-4">
                                            {phase.step}
                                        </div>
                                        <div className="text-sm text-slate-500 font-medium">
                                            {phase.timeline}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-2/3">
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                        {phase.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {phase.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            What You'll Receive
                        </h2>
                        <p className="text-lg text-slate-600">
                            Complete documentation and implementation of targeted improvements.
                        </p>
                    </motion.div>

                    <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
                        <ul className="space-y-4">
                            {deliverables.map((deliverable, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-start"
                                >
                                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700">{deliverable}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Pricing & Next Steps */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center bg-slate-50 rounded-lg p-12"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Investment & Timeline
                        </h2>
                        <div className="flex items-center justify-center gap-8 mb-6">
                            <div className="text-center">
                                <div className="text-4xl font-light text-slate-900 mb-1">$1,200</div>
                                <div className="text-slate-600">Total Investment</div>
                            </div>
                            <div className="w-px h-12 bg-slate-300"></div>
                            <div className="text-center">
                                <div className="text-4xl font-light text-slate-900 mb-1">2-3</div>
                                <div className="text-slate-600">Weeks to Results</div>
                            </div>
                        </div>
                        <p className="text-lg text-slate-600 mb-8">
                            If we don't achieve the guaranteed 15% improvement, you receive
                            full credit toward our Scale & Growth package.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                        >
                            Start with Diagnostic Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ProfessionalFooter />
        </div>
    )
}
