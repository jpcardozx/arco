'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, TrendingUp, DollarSign, Zap, ExternalLink } from 'lucide-react'

/**
 * OPTIMIZED CLIENT SUCCESS STORIES
 * 
 * 2-3 case studies focados em resultados mensuráveis
 * Performance otimizada com lazy loading
 * CTAs de conversão integrados
 */

interface CaseStudyProps {
    company: string
    industry: string
    challenge: string
    solution: string
    results: {
        performance: string
        business: string
        revenue: string
    }
    timeline: string
    testimonial: string
    delay?: number
}

const CaseStudyCard = ({
    company,
    industry,
    challenge,
    solution,
    results,
    timeline,
    testimonial,
    delay = 0
}: CaseStudyProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-200 hover:border-blue-300 transition-all duration-500"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{company}</h3>
                    <div className="text-slate-600 text-sm">{industry} • {timeline}</div>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>

            {/* Challenge */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Challenge</h4>
                <p className="text-slate-600">{challenge}</p>
            </div>

            {/* Solution */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Solution</h4>
                <p className="text-slate-600">{solution}</p>
            </div>

            {/* Results Grid */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">Results</h4>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Performance</span>
                        <span className="font-bold text-blue-600">{results.performance}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Business Impact</span>
                        <span className="font-bold text-emerald-600">{results.business}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-slate-600 font-medium">Revenue Impact</span>
                        <span className="font-bold text-emerald-600">{results.revenue}</span>
                    </div>
                </div>
            </div>

            {/* Testimonial */}
            <blockquote className="italic text-slate-700 text-lg leading-relaxed border-l-4 border-blue-500 pl-6 mb-6">
                "{testimonial}"
            </blockquote>

            {/* CTA */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
                Read Full Case Study
                <ArrowRight className="w-4 h-4" />
            </motion.button>
        </motion.div>
    )
}

export function OptimizedClientStories() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const caseStudies = [
        {
            company: "TechGrow SaaS",
            industry: "B2B Software",
            challenge: "Website loading in 4.2s, 68% bounce rate, losing $127K/month in potential revenue",
            solution: "React optimization, serverless architecture migration, Core Web Vitals improvement",
            results: {
                performance: "87% faster load time",
                business: "+312% conversion rate",
                revenue: "+$340K monthly revenue"
            },
            timeline: "6 weeks delivery",
            testimonial: "ARCO transformed our website performance and directly increased our MRR by $340K. The ROI was immediate and measurable."
        },
        {
            company: "E-commerce Plus",
            industry: "E-commerce",
            challenge: "High hosting costs, poor mobile performance, 3.8s load times killing mobile conversions",
            solution: "Next.js migration, image optimization, mobile-first redesign, CDN implementation",
            results: {
                performance: "73% faster mobile load",
                business: "+89% mobile conversion",
                revenue: "-78% hosting costs"
            },
            timeline: "8 weeks delivery",
            testimonial: "We saved over $180K annually while delivering the best user experience we've ever had. Our mobile revenue doubled."
        }
    ]

    const metrics = [
        {
            icon: TrendingUp,
            value: "312%",
            label: "Average ROI Increase",
            description: "Measured across all implementations"
        },
        {
            icon: Zap,
            value: "87%",
            label: "Performance Improvement",
            description: "Average load time reduction"
        },
        {
            icon: DollarSign,
            value: "$340K+",
            label: "Revenue Generated",
            description: "Average monthly impact"
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-white relative overflow-hidden"
            data-section="case-studies"
        >
            <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Proven Results
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Real companies,{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                real results
                            </span>
                        </h2>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            See how we've helped companies like yours achieve 3x ROI through
                            strategic performance optimization and modern React architecture.
                        </p>
                    </motion.div>

                    {/* Metrics Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-6 mb-16"
                    >
                        {metrics.map((metric, index) => {
                            const Icon = metric.icon
                            return (
                                <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                                    <div className="text-lg font-semibold text-slate-700 mb-1">{metric.label}</div>
                                    <div className="text-sm text-slate-500">{metric.description}</div>
                                </div>
                            )
                        })}
                    </motion.div>

                    {/* Case Studies Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        {caseStudies.map((study, index) => (
                            <CaseStudyCard
                                key={index}
                                {...study}
                                delay={index * 0.2}
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                            Ready to join these success stories?
                        </h3>
                        <p className="text-lg text-slate-600 mb-6">
                            Get your free technical audit and see exactly how much revenue you're losing.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Get Free Audit
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                            >
                                View All Case Studies
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
