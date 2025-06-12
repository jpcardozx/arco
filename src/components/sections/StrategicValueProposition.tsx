'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Code2, Zap, Target, ChevronRight, ExternalLink } from 'lucide-react'

export default function ArcoValueProposition() {
    const [activeDiagnostic, setActiveDiagnostic] = useState(0)
    const [showDiagnostic, setShowDiagnostic] = useState(false)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

    // Real technical debt patterns we identify and resolve
    const technicalDebt = [
        {
            pattern: "Stack Redundancy",
            technical: "HubSpot + Mailchimp + Intercom running parallel customer communication workflows",
            business: "3x monthly costs, data inconsistencies, team switching between 3 dashboards daily",
            detection: "API call analysis reveals 40% overlapping functionality",
            solution: "Single integrated platform reduces cost by $2,400/month, unifies customer data"
        },
        {
            pattern: "Performance Bottlenecks",
            technical: "WordPress site with 23 plugins, 4.7s load time, 34% bounce rate",
            business: "Lost revenue: every 100ms delay = 1% conversion drop. Current loss: ~$8,000/month",
            detection: "Core Web Vitals audit + user behavior analysis",
            solution: "Headless architecture: 1.2s load time, 67% bounce reduction"
        },
        {
            pattern: "Integration Failures",
            technical: "Zapier workflows connecting 8 systems, 12% failure rate, manual data entry backup",
            business: "2 hours daily manual work, 1 in 8 leads lost, customer service delayed",
            detection: "Workflow audit reveals 23 failure points in customer journey",
            solution: "Native API integrations, automated error handling, 99.7% reliability"
        }
    ]

    // Our systematic approach - what makes ARCO different
    const methodology = [
        {
            phase: "Technical Archaeology",
            duration: "72 hours",
            process: "We reverse-engineer your entire stack: API calls, data flows, performance metrics, cost breakdown",
            deliverable: "Stack Architecture Map™ showing every inefficiency and its business cost",
            value: "Most companies don't know what they're actually paying for or how systems interact"
        },
        {
            phase: "Surgical Intervention",
            duration: "2-4 weeks",
            process: "Targeted fixes: eliminate redundancies, optimize critical paths, integrate essential systems",
            deliverable: "Streamlined stack with 40-60% fewer tools, 2x better performance",
            value: "Keep what works, fix what's broken, remove what's wasteful"
        },
        {
            phase: "Future-Proof Foundation",
            duration: "4-8 weeks",
            process: "Modern architecture that scales: Next.js, headless CMS, API-first integrations",
            deliverable: "Technology foundation that supports 10x growth without rebuilding",
            value: "Never be limited by your technology again"
        }
    ]

    const fadeIn = {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }

    return (
        <section ref={sectionRef} className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">

                {/* Hero - Technical competence positioning */}
                <motion.div {...fadeIn} className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-8">
                        <Code2 className="w-4 h-4 mr-2" />
                        Technical Debt Resolution
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-light text-slate-900 mb-8 leading-[1.1]">
                        Your technology is
                        <br />
                        <span className="font-medium">limiting your growth</span>
                    </h1>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Most companies accumulate technical debt without realizing it.
                        Redundant tools, performance bottlenecks, and integration failures
                        compound daily—costing revenue and preventing scale.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setShowDiagnostic(true)}
                            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                        >
                            Analyze My Stack
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>

                        <button className="inline-flex items-center px-8 py-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-slate-400 transition-colors">
                            View Methodology
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                </motion.div>

                {/* Technical debt diagnostic */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Common technical debt patterns we resolve
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our technical archaeology process identifies hidden inefficiencies
                            that compound into significant business costs
                        </p>
                    </div>

                    {/* Pattern selector */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3 space-y-3">
                            {technicalDebt.map((debt, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveDiagnostic(index)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${activeDiagnostic === index
                                        ? 'border-slate-900 bg-slate-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-900">{debt.pattern}</span>
                                        <ChevronRight className={`h-4 w-4 transition-transform ${activeDiagnostic === index ? 'rotate-90' : ''
                                            }`} />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="lg:w-2/3">
                            <motion.div
                                key={activeDiagnostic}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-slate-50 rounded-xl p-8"
                            >
                                <h3 className="text-xl font-medium text-slate-900 mb-6">
                                    {technicalDebt[activeDiagnostic].pattern}
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">Technical Reality</h4>
                                        <p className="text-slate-600 font-mono text-sm bg-white p-3 rounded border">
                                            {technicalDebt[activeDiagnostic].technical}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">Business Impact</h4>
                                        <p className="text-slate-600">{technicalDebt[activeDiagnostic].business}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">Our Detection Method</h4>
                                        <p className="text-slate-600">{technicalDebt[activeDiagnostic].detection}</p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-200">
                                        <h4 className="text-sm font-medium text-green-700 mb-2">Resolution</h4>
                                        <p className="text-green-700 font-medium">{technicalDebt[activeDiagnostic].solution}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Methodology - What makes ARCO different */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            The ARCO methodology
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our systematic approach to identifying, quantifying, and resolving
                            technical debt that limits business growth
                        </p>
                    </div>

                    <div className="space-y-12">
                        {methodology.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                className="flex flex-col lg:flex-row gap-8 items-start"
                            >
                                <div className="lg:w-1/4">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-medium text-sm mr-4">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900">{phase.phase}</h3>
                                            <p className="text-sm text-slate-500">{phase.duration}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-3/4 bg-white border border-slate-200 rounded-xl p-8">
                                    <div className="grid lg:grid-cols-3 gap-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-slate-700 mb-3">Process</h4>
                                            <p className="text-slate-600 text-sm">{phase.process}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-slate-700 mb-3">Deliverable</h4>
                                            <p className="text-slate-600 text-sm">{phase.deliverable}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-slate-700 mb-3">Value</h4>
                                            <p className="text-slate-600 text-sm">{phase.value}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Investment and value proposition */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <div className="bg-slate-900 text-white rounded-2xl p-12">
                        <div className="mb-8">
                            <Zap className="w-12 h-12 mx-auto mb-4 text-white" />
                            <h2 className="text-3xl font-light mb-4">
                                Technical debt resolution that pays for itself
                            </h2>
                            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                                Our interventions typically save 2-5x their cost within 90 days
                                through eliminated waste and improved efficiency
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <div className="text-2xl font-light mb-2">USD 5,000</div>
                                <div className="text-sm text-slate-400">Technical Archaeology</div>
                                <div className="text-sm text-slate-300 mt-2">Complete stack analysis</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-light mb-2">USD 15,000</div>
                                <div className="text-sm text-slate-400">Surgical Intervention</div>
                                <div className="text-sm text-slate-300 mt-2">Targeted optimization</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-light mb-2">USD 35,000</div>
                                <div className="text-sm text-slate-400">Future-Proof Foundation</div>
                                <div className="text-sm text-slate-300 mt-2">Complete modernization</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors">
                                <Target className="mr-2 h-5 w-5" />
                                Schedule Technical Consultation
                            </button>

                            <button className="inline-flex items-center px-8 py-4 border border-slate-600 text-white font-medium rounded-lg hover:border-slate-500 transition-colors">
                                Request Stack Analysis
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Diagnostic modal placeholder */}
                {showDiagnostic && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full">
                            <h3 className="text-xl font-medium text-slate-900 mb-4">
                                Stack Analysis Request
                            </h3>
                            <p className="text-slate-600 mb-6">
                                We'll analyze your current technology stack and identify
                                optimization opportunities within 72 hours.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDiagnostic(false)}
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg">
                                    Request Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}