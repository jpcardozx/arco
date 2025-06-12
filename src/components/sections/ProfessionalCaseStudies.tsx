'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink, TrendingUp, DollarSign, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Professional case studies with real metrics
export function ProfessionalCaseStudies() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const [activeCase, setActiveCase] = useState(0)

    const caseStudies = [
        {
            id: "saas-conversion",
            client: "Enterprise SaaS Platform",
            industry: "B2B Software",
            challenge: "Trial-to-paid conversion below 8% despite high-quality product demos",
            intervention: "Corrected pricing presentation hierarchy and value perception alignment",
            results: {
                conversionRate: { before: "7.3%", after: "18.9%", improvement: "+159%" },
                averageContract: { before: "$1,247", after: "$2,890", improvement: "+132%" },
                timeToDecision: { before: "68 days", after: "31 days", improvement: "-54%" }
            },
            timeframe: "45 days",
            roi: "425%",
            methodology: "Value Alignment System™",
            image: "/case-saas-dashboard.jpg"
        },
        {
            id: "ecommerce-premium",
            client: "Premium E-commerce Brand",
            industry: "Direct-to-Consumer",
            challenge: "High abandonment rate (78%) despite superior product quality",
            intervention: "Visual hierarchy reconstruction and quality signal optimization",
            results: {
                abandonment: { before: "78%", after: "42%", improvement: "-46%" },
                averageOrder: { before: "$89", after: "$157", improvement: "+76%" },
                discountRequests: { before: "47%", after: "8%", improvement: "-83%" }
            },
            timeframe: "60 days",
            roi: "290%",
            methodology: "Perception Engineering Framework",
            image: "/case-ecommerce-mobile.jpg"
        },
        {
            id: "consulting-firm",
            client: "Strategic Consulting Firm",
            industry: "Professional Services",
            challenge: "Proposal acceptance rate declining despite strong track record",
            intervention: "Symbolic authority positioning and expertise visibility optimization",
            results: {
                proposalAcceptance: { before: "34%", after: "67%", improvement: "+97%" },
                averageProject: { before: "$45K", after: "$78K", improvement: "+73%" },
                salesCycle: { before: "89 days", after: "52 days", improvement: "-42%" }
            },
            timeframe: "30 days",
            roi: "380%",
            methodology: "Authority Alignment Protocol",
            image: "/case-consulting-deck.jpg"
        }
    ]

    const currentCase = caseStudies[activeCase]

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-slate-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                        Documented revenue impact
                        <br />
                        <span className="font-normal text-blue-600">through precision intervention</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Each case represents a specific technical debt pattern resolved through
                        our systematic approach to growth capacity liberation.
                    </p>
                </motion.div>

                {/* Case study selector */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {caseStudies.map((study, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCase(index)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeCase === index
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            {study.industry}
                        </button>
                    ))}
                </motion.div>

                {/* Active case study */}
                <motion.div
                    key={activeCase}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Content side */}
                        <div className="p-8 lg:p-12">
                            <div className="mb-6">
                                <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    {currentCase.industry}
                                </div>
                                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                                    {currentCase.client}
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {currentCase.challenge}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-lg font-medium text-slate-900 mb-3">Strategic Intervention</h4>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    {currentCase.intervention}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-slate-500">
                                    <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {currentCase.timeframe}
                                    </span>
                                    <span className="flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        {currentCase.roi} ROI
                                    </span>
                                </div>
                            </div>

                            {/* Results grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                {Object.entries(currentCase.results).map(([metric, data], index) => (
                                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                                        <div className="text-sm font-medium text-slate-500 mb-2 capitalize">
                                            {metric.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-sm text-slate-400">{data.before}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                            <span className="text-lg font-medium text-slate-900">{data.after}</span>
                                        </div>
                                        <div className="text-sm font-medium text-green-600 mt-1">
                                            {data.improvement}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={`/case-studies/${currentCase.id}`}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                >
                                    View full analysis
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                                <div className="inline-flex items-center text-sm text-slate-500">
                                    <span className="font-medium mr-1">Methodology:</span>
                                    {currentCase.methodology}
                                </div>
                            </div>
                        </div>

                        {/* Visual side */}
                        <div className="bg-slate-100 p-8 lg:p-12 flex items-center">
                            <div className="w-full">
                                <div className="aspect-[4/3] bg-white rounded-lg shadow-md overflow-hidden mb-6">
                                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                        <div className="text-center">
                                            <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                            <div className="text-2xl font-light text-slate-600">
                                                {currentCase.roi}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Return on Investment
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-sm font-medium text-slate-500 mb-2">Implementation Timeline</div>
                                    <div className="text-lg font-medium text-slate-900">{currentCase.timeframe}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        Each intervention follows our systematic Technical Debt Resolution Framework,
                        ensuring measurable ROI within the first quarter.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                        >
                            Ver todos os casos de estudo
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            Request your assessment
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
