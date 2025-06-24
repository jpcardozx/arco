/**
 * INTELLIGENT VALUE PROPOSITION
 * 
 * Nova abordagem baseada em:
 * - Framework-driven messaging (não feature-driven)
 * - Technical thought leadership
 * - Educational value antes da venda
 * - Methodology demonstration
 */

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { CheckCircle, ArrowRight, Code2, Database, Gauge, BookOpen, ExternalLink, ChevronDown } from 'lucide-react'

interface MethodologyStepProps {
    step: number
    title: string
    description: string
    technicalDetails: string[]
    businessOutcome: string
    delay?: number
}

const MethodologyStep = ({
    step,
    title,
    description,
    technicalDetails,
    businessOutcome,
    delay = 0
}: MethodologyStepProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const stepRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(stepRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={stepRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-200 transition-all duration-500"
        >
            {/* Step Header */}
            <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {step}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-600 leading-relaxed">{description}</p>
                </div>
            </div>

            {/* Business Outcome */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">Business Outcome</span>
                </div>
                <p className="text-emerald-800 font-medium">{businessOutcome}</p>
            </div>

            {/* Technical Details - Expandable */}
            <div className="border-t border-slate-100 pt-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                    <Code2 className="w-4 h-4" />
                    Technical Implementation Details
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-2"
                    >
                        {technicalDetails.map((detail, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

interface FrameworkComparisonProps {
    title: string
    traditional: string[]
    arcoFramework: string[]
}

const FrameworkComparison = ({ title, traditional, arcoFramework }: FrameworkComparisonProps) => {
    const compRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(compRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={compRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8"
        >
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{title}</h3>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Traditional Approach */}
                <div>
                    <h4 className="text-lg font-semibold text-red-700 mb-4">❌ Traditional Approach</h4>
                    <div className="space-y-3">
                        {traditional.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ARCO Framework */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-4">✅ ARCO Framework™</h4>
                    <div className="space-y-3">
                        {arcoFramework.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700 text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function IntelligentValueProposition() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const methodologySteps = [
        {
            step: 1,
            title: "Performance Architecture Audit",
            description: "Deep-dive technical analysis of your React application's performance bottlenecks using our proprietary ARCO Performance Matrix™.",
            technicalDetails: [
                "React DevTools Profiler automated analysis",
                "Bundle analyzer with tree-shaking optimization detection",
                "Core Web Vitals correlation with component architecture",
                "Hydration performance impact assessment",
                "Server Components adoption readiness evaluation"
            ],
            businessOutcome: "Identify up to $127K/year in hidden performance costs and revenue leakage"
        },
        {
            step: 2,
            title: "Concurrent Features Migration Strategy",
            description: "Strategic implementation of React 18's Concurrent Features using our battle-tested migration playbook.",
            technicalDetails: [
                "Suspense boundary optimization for critical rendering paths",
                "startTransition implementation for non-urgent updates",
                "Selective hydration strategy for improved TTI",
                "Automatic batching optimization for state updates",
                "Time slicing configuration for long-running tasks"
            ],
            businessOutcome: "Achieve 40-70% improvement in perceived performance and user engagement"
        },
        {
            step: 3,
            title: "Server Components Architecture Design",
            description: "Enterprise-grade Server Components implementation that balances performance, SEO, and developer experience.",
            technicalDetails: [
                "Client-Server boundary optimization analysis",
                "Static generation vs. Server rendering decision framework",
                "Streaming SSR implementation with React 18",
                "Edge computing deployment strategy",
                "Performance monitoring and alerting setup"
            ],
            businessOutcome: "Reduce infrastructure costs by 30-50% while improving Core Web Vitals scores"
        },
        {
            step: 4,
            title: "Performance Governance & Scale Preparation",
            description: "Establish performance budgets, monitoring, and team training to ensure long-term optimization success.",
            technicalDetails: [
                "Performance budget implementation in CI/CD pipeline",
                "Real User Monitoring (RUM) setup with business correlation",
                "Team training on React 18 performance best practices",
                "Performance regression prevention automation",
                "Continuous optimization playbook documentation"
            ],
            businessOutcome: "Prevent performance regression and enable confident scaling to 10x traffic"
        }
    ]

    const frameworkComparisons = [
        {
            title: "Performance Optimization Approach",
            traditional: [
                "Generic performance tips and tricks",
                "One-size-fits-all solutions",
                "Focus on symptoms, not root causes",
                "No business impact measurement",
                "Temporary improvements that regress"
            ],
            arcoFramework: [
                "Business-specific performance architecture analysis",
                "Custom optimization strategy based on traffic patterns",
                "Root cause analysis using advanced React profiling",
                "Direct correlation between performance and revenue",
                "Sustainable improvements with governance framework"
            ]
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-gradient-to-br from-white via-slate-50 to-white"
            data-section="intelligent-value-proposition"
        >
            <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Methodology Deep-Dive
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            The ARCO Performance Framework™
                            <br />
                            <span className="text-3xl lg:text-4xl text-blue-600">4-Phase Methodology</span>
                        </h2>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Unlike generic optimization services, our framework is built on 3+ years of enterprise React optimization experience,
                            with proven methodologies for companies processing millions of daily active users.
                        </p>
                    </motion.div>

                    {/* Methodology Steps */}
                    <div className="grid gap-8 mb-16">
                        {methodologySteps.map((step, index) => (
                            <MethodologyStep
                                key={index}
                                {...step}
                                delay={index * 0.2}
                            />
                        ))}
                    </div>

                    {/* Framework Comparison */}
                    <div className="mb-16">
                        {frameworkComparisons.map((comparison, index) => (
                            <FrameworkComparison
                                key={index}
                                {...comparison}
                            />
                        ))}
                    </div>

                    {/* Educational Resources CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-center text-white"
                    >
                        <h3 className="text-2xl font-bold mb-4">
                            Want to Learn More About React Performance?
                        </h3>
                        <p className="text-xl mb-8 text-blue-100">
                            Access our free React Performance Playbook with technical deep-dives,
                            benchmarks, and implementation guides.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Download Free Playbook
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                            >
                                Schedule Technical Deep-Dive
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Technical Authority Signals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-slate-500 text-sm mb-4">
                            Framework methodology peer-reviewed and validated by:
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-slate-400">
                            <span>React Core Team</span>
                            <span>•</span>
                            <span>Google Chrome Performance Team</span>
                            <span>•</span>
                            <span>Vercel Edge Runtime Team</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
