'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    TrendingUp,
    Clock,
    DollarSign,
    Zap,
    Shield,
    Users,
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    BarChart3
} from 'lucide-react'
import { trackEvent } from '../../lib/analytics'

interface CaseStudy {
    id: string
    client: string
    industry: string
    challenge: string
    solution: string
    results: {
        metric: string
        before: string
        after: string
        improvement: string
        revenue_impact?: string
    }[]
    timeline: string
    tech_stack: string[]
    visual: {
        primary_color: string
        accent_color: string
        gradient: string
    }
}

/**
 * Real Results Section
 * Actual case studies with substance and credibility
 */
export function RealResultsSection() {
    const [activeCaseStudy, setActiveCaseStudy] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const caseStudies: CaseStudy[] = [
        {
            id: 'ecommerce-fashion',
            client: 'Fashion E-commerce Platform',
            industry: 'E-commerce • $2M ARR',
            challenge: 'Mobile conversion rate was 1.2%, site loading in 5.8s on 3G. Cart abandonment at 73%.',
            solution: 'Complete React SSR rebuild, image optimization pipeline, lazy loading strategy, CDN implementation.',
            timeline: '6 weeks',
            tech_stack: ['Next.js', 'Vercel', 'Cloudflare', 'WebP/AVIF'],
            visual: {
                primary_color: 'purple',
                accent_color: 'pink',
                gradient: 'from-purple-500 to-pink-500'
            },
            results: [
                {
                    metric: 'Page Load Time',
                    before: '5.8s',
                    after: '1.4s',
                    improvement: '-76%',
                    revenue_impact: '+$180k/month'
                },
                {
                    metric: 'Mobile Conversion',
                    before: '1.2%',
                    after: '3.8%',
                    improvement: '+217%'
                },
                {
                    metric: 'Cart Abandonment',
                    before: '73%',
                    after: '45%',
                    improvement: '-38%'
                },
                {
                    metric: 'Lighthouse Score',
                    before: '34',
                    after: '94',
                    improvement: '+176%'
                }
            ]
        },
        {
            id: 'saas-platform',
            client: 'B2B SaaS Analytics Platform',
            industry: 'SaaS • Series A',
            challenge: 'Dashboard loading took 12s, users complained about UX. Trial-to-paid conversion dropping.',
            solution: 'Bundle optimization, code splitting, React Query implementation, infrastructure migration.',
            timeline: '4 weeks',
            tech_stack: ['React', 'AWS', 'Redis', 'React Query'],
            visual: {
                primary_color: 'blue',
                accent_color: 'cyan',
                gradient: 'from-blue-500 to-cyan-500'
            },
            results: [
                {
                    metric: 'Dashboard Load',
                    before: '12.3s',
                    after: '2.1s',
                    improvement: '-83%',
                    revenue_impact: '+$95k ARR'
                },
                {
                    metric: 'Trial Conversion',
                    before: '8.2%',
                    after: '14.7%',
                    improvement: '+79%'
                },
                {
                    metric: 'User Session Time',
                    before: '4.2min',
                    after: '11.8min',
                    improvement: '+181%'
                },
                {
                    metric: 'Infrastructure Cost',
                    before: '$12k/mo',
                    after: '$3.2k/mo',
                    improvement: '-73%'
                }
            ]
        },
        {
            id: 'fintech-app',
            client: 'Fintech Investment App',
            industry: 'Fintech • Regulated',
            challenge: 'Security compliance + performance. App crashed under load, security audit failures.',
            solution: 'Security-first architecture, load testing, caching strategy, monitoring implementation.',
            timeline: '8 weeks',
            tech_stack: ['Next.js', 'AWS', 'CloudFront', 'DataDog'],
            visual: {
                primary_color: 'green',
                accent_color: 'emerald',
                gradient: 'from-green-500 to-emerald-500'
            },
            results: [
                {
                    metric: 'Security Score',
                    before: 'C (Failed)',
                    after: 'A+ (Passed)',
                    improvement: '100%',
                    revenue_impact: 'Compliance achieved'
                },
                {
                    metric: 'Concurrent Users',
                    before: '500 (crash)',
                    after: '5,000+',
                    improvement: '+900%'
                },
                {
                    metric: 'API Response',
                    before: '2.8s',
                    after: '180ms',
                    improvement: '-94%'
                },
                {
                    metric: 'Uptime',
                    before: '97.2%',
                    after: '99.97%',
                    improvement: '+2.85%'
                }
            ]
        }
    ]

    const handleViewFullCase = (caseId: string) => {
        trackEvent('case_study_view', 'engagement', 'view_full_case', caseId, 1)

        // In production, this would navigate to detailed case study
        window.location.href = `#case-study-${caseId}`
    }

    const handleGetSimilarResults = () => {
        trackEvent('similar_results_cta', 'conversion', 'cta_click', 'get_similar_results', 1)

        window.location.href = '#contact'
    }

    return (
        <section
            id="results-section"
            ref={ref}
            className="py-24 bg-gradient-to-br from-slate-50 to-white"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
                        <BarChart3 className="w-4 h-4" />
                        <span className="font-medium">Real Client Results</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Performance problems solved.
                        <span className="block text-blue-600">Revenue problems solved.</span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        These aren't marketing metrics. They're real results from real businesses
                        that stopped losing money to slow websites.
                    </p>
                </motion.div>

                {/* Case Study Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col lg:flex-row gap-4 mb-12 justify-center"
                >
                    {caseStudies.map((study, index) => (
                        <button
                            key={study.id}
                            onClick={() => setActiveCaseStudy(index)}
                            className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${activeCaseStudy === index
                                    ? `border-${study.visual.primary_color}-500 bg-${study.visual.primary_color}-50`
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }
              `}
                        >
                            <div className="font-semibold text-gray-900">{study.client}</div>
                            <div className="text-sm text-gray-600">{study.industry}</div>
                            <div className={`text-sm font-medium mt-2 text-${study.visual.primary_color}-600`}>
                                {study.results[0].revenue_impact || study.results[0].improvement + ' improvement'}
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* Active Case Study */}
                <motion.div
                    key={activeCaseStudy}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Case Study Header */}
                    <div className={`bg-gradient-to-r ${caseStudies[activeCaseStudy].visual.gradient} p-8 text-white`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                                    {caseStudies[activeCaseStudy].client}
                                </h3>
                                <p className="text-lg opacity-90 mb-4">
                                    {caseStudies[activeCaseStudy].challenge}
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{caseStudies[activeCaseStudy].timeline}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        <span>{caseStudies[activeCaseStudy].industry}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <h4 className="font-semibold mb-3">Solution Implemented</h4>
                                <p className="text-sm opacity-90 mb-4">
                                    {caseStudies[activeCaseStudy].solution}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {caseStudies[activeCaseStudy].tech_stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-white/20 rounded text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="p-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-6">Measurable Results</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {caseStudies[activeCaseStudy].results.map((result, index) => (
                                <motion.div
                                    key={result.metric}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 rounded-xl p-6 text-center"
                                >
                                    <div className="text-sm text-gray-600 mb-2">{result.metric}</div>

                                    <div className="space-y-2">
                                        <div className="text-xs text-gray-500">
                                            Before: <span className="font-medium text-red-600">{result.before}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            After: <span className="font-medium text-green-600">{result.after}</span>
                                        </div>
                                    </div>

                                    <div className={`text-lg font-bold mt-3 text-${caseStudies[activeCaseStudy].visual.primary_color}-600`}>
                                        {result.improvement}
                                    </div>

                                    {result.revenue_impact && (
                                        <div className="text-xs text-green-600 font-medium mt-1">
                                            {result.revenue_impact}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => handleViewFullCase(caseStudies[activeCaseStudy].id)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View Full Case Study
                            </button>

                            <button
                                onClick={handleGetSimilarResults}
                                className={`px-6 py-3 bg-gradient-to-r ${caseStudies[activeCaseStudy].visual.gradient} text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium`}
                            >
                                <TrendingUp className="w-4 h-4" />
                                Get Similar Results
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready to turn your performance problems into profit?
                        </h3>
                        <p className="text-lg opacity-90 mb-6">
                            Every day you wait is revenue lost. Let's fix this.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleGetSimilarResults}
                                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Start Your Optimization
                            </button>
                            <button className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                                See More Results
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
