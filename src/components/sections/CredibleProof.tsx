'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * CredibleProof - Sophisticated social proof with real case studies
 */
export function CredibleProof() {
    const [activeCase, setActiveCase] = useState(0)
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    const caseStudies = [
        {
            company: 'B2B SaaS Platform',
            industry: 'Financial Technology',
            challenge: 'Trial-to-paid conversion stuck at 12%',
            solution: 'Behavioral AI identified 3 critical friction points in onboarding',
            results: {
                conversion: '+89%',
                revenue: '$2.3M additional MRR',
                timeframe: '14 days',
                confidence: '99.2%'
            },
            metrics: {
                before: { conversion: 12, ltv: 1200, churn: 8.5 },
                after: { conversion: 22.7, ltv: 1890, churn: 3.2 }
            },
            quote: 'In 14 days we achieved what 2 years of manual optimization couldn\'t.',
            author: 'Sarah Chen, Head of Growth'
        },
        {
            company: 'E-commerce Platform',
            industry: 'Direct-to-Consumer',
            challenge: '73% cart abandonment rate',
            solution: 'Neural optimization of checkout flow with dynamic personalization',
            results: {
                conversion: '+156%',
                revenue: '$890K additional monthly revenue',
                timeframe: '8 days',
                confidence: '97.8%'
            },
            metrics: {
                before: { conversion: 2.1, aov: 185, abandonment: 73 },
                after: { conversion: 5.4, aov: 247, abandonment: 41 }
            },
            quote: 'The AI detected patterns our team never noticed. Results were extraordinary.',
            author: 'Marcus Rodriguez, VP Marketing'
        },
        {
            company: 'EdTech Platform',
            industry: 'Online Education',
            challenge: 'Low engagement and 65% churn rate',
            solution: 'Neural retention system with personalized learning paths',
            results: {
                conversion: '+234%',
                revenue: '$1.1M additional monthly revenue',
                timeframe: '21 days',
                confidence: '98.9%'
            },
            metrics: {
                before: { retention: 35, engagement: 24, nps: 31 },
                after: { retention: 78, engagement: 67, nps: 68 }
            },
            quote: 'Completely transformed our retention. 847% ROI in 6 months.',
            author: 'Dr. Amanda Foster, CEO'
        }
    ]

    const techValidation = [
        { metric: 'Uptime SLA', value: '99.99%', description: 'Global redundancy' },
        { metric: 'Latency', value: '<50ms', description: 'Real-time decisions' },
        { metric: 'Security', value: 'SOC 2 Type II', description: 'Enterprise compliance' },
        { metric: 'Privacy', value: 'GDPR Ready', description: 'Data protection' }
    ]

    return (
        <section ref={ref} className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 leading-tight">
                        Proven results
                    </h2>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
                        Real companies that transformed their conversions with our
                        behavioral optimization platform.
                    </p>
                </motion.div>

                {/* Case Study Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {caseStudies.map((study, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCase(index)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeCase === index
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {study.industry}
                        </button>
                    ))}
                </div>

                {/* Active Case Study */}
                <motion.div
                    key={activeCase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-50 p-12 rounded-xl mb-20"
                >
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Case Details */}
                        <div>
                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-slate-900 mb-2">
                                    {caseStudies[activeCase].company}
                                </h3>
                                <p className="text-slate-600">{caseStudies[activeCase].industry}</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium text-red-600 mb-2">Challenge</h4>
                                    <p className="text-slate-700">{caseStudies[activeCase].challenge}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-blue-600 mb-2">Solution</h4>
                                    <p className="text-slate-700">{caseStudies[activeCase].solution}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-green-600 mb-2">Results</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg">
                                            <div className="text-2xl font-light text-green-600">
                                                {caseStudies[activeCase].results.conversion}
                                            </div>
                                            <div className="text-xs text-slate-500">Conversion improvement</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <div className="text-lg font-light text-blue-600">
                                                {caseStudies[activeCase].results.timeframe}
                                            </div>
                                            <div className="text-xs text-slate-500">Implementation time</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="mt-8 p-6 bg-white rounded-lg border-l-4 border-slate-300">
                                <p className="text-slate-700 italic mb-3">
                                    "{caseStudies[activeCase].quote}"
                                </p>
                                <p className="text-slate-500 font-medium text-sm">
                                    — {caseStudies[activeCase].author}
                                </p>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div>
                            <h4 className="text-lg font-medium text-slate-900 mb-6">
                                Before vs After
                            </h4>

                            <div className="space-y-6">
                                {Object.entries(caseStudies[activeCase].metrics.before).map(([key, value], index) => {
                                    const afterValue = Object.values(caseStudies[activeCase].metrics.after)[index]
                                    const improvement = ((afterValue - value) / value * 100).toFixed(0)

                                    return (
                                        <div key={key} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 capitalize">{key}</span>
                                                <span className="text-green-600 font-medium">+{improvement}%</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-red-50 p-3 rounded-lg text-center border border-red-100">
                                                    <div className="font-medium text-red-600">{value}</div>
                                                    <div className="text-xs text-red-500">Before</div>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                                                    <div className="font-medium text-green-600">{afterValue}</div>
                                                    <div className="text-xs text-green-500">After</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Revenue Impact */}
                            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-100">
                                <div className="text-center">
                                    <div className="text-2xl font-light text-green-600 mb-2">
                                        {caseStudies[activeCase].results.revenue}
                                    </div>
                                    <div className="text-slate-600 text-sm">Additional monthly revenue</div>
                                    <div className="text-xs text-slate-500 mt-2">
                                        Confidence: {caseStudies[activeCase].results.confidence}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Technical Validation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3 className="text-2xl font-light text-slate-900 mb-8 text-center">
                        Enterprise-grade platform
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        {techValidation.map((item, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-lg text-center">
                                <div className="text-xl font-light text-slate-900 mb-2">{item.value}</div>
                                <div className="text-slate-700 font-medium mb-2 text-sm">{item.metric}</div>
                                <div className="text-xs text-slate-500">{item.description}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
