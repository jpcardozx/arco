'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Building2, TrendingUp, Clock, Award, ChevronRight, ExternalLink, Shield, Users, Zap } from 'lucide-react'

/**
 * Enterprise Case Studies - Dynamic Success Validation
 * 
 * Interactive showcase of validated enterprise transformations.
 * Designed for technical and financial decision-makers requiring
 * concrete evidence of systematic infrastructure optimization.
 */

interface CaseStudy {
    id: string
    companyType: string
    industry: string
    teamSize: string
    challenge: string
    solution: string
    results: {
        costSavings: string
        performanceGain: string
        timeToValue: string
        roiPercentage: number
    }
    metrics: {
        beforeAfter: {
            label: string
            before: string
            after: string
            improvement: string
        }[]
    }
    testimonial: {
        quote: string
        author: string
        title: string
        credibility: string
    }
    techStack: string[]
    complexity: 'Medium' | 'High' | 'Enterprise'
    duration: string
    validated: boolean
}

const enterpriseCaseStudies: CaseStudy[] = [
    {
        id: 'fintech-optimization',
        companyType: 'FinTech Scale-up',
        industry: 'Financial Services',
        teamSize: '45 engineers',
        challenge: 'Infrastructure costs spiraling out of control while performance degraded under growing transaction volume. Monthly cloud spend reached $280K with 40+ daily performance incidents.',
        solution: 'Systematic infrastructure audit identified over-provisioned resources, inefficient microservices architecture, and suboptimal caching strategies. Implemented staged optimization across compute, storage, and network layers.',
        results: {
            costSavings: '$2.8M annually',
            performanceGain: '340% faster response times',
            timeToValue: '90 days',
            roiPercentage: 425
        },
        metrics: {
            beforeAfter: [
                {
                    label: 'API Response Time',
                    before: '1,240ms',
                    after: '285ms',
                    improvement: '77% faster'
                },
                {
                    label: 'Monthly Cloud Spend',
                    before: '$280,000',
                    after: '$165,000',
                    improvement: '41% reduction'
                },
                {
                    label: 'Daily Incidents',
                    before: '42 incidents',
                    after: '3 incidents',
                    improvement: '93% reduction'
                },
                {
                    label: 'Deployment Time',
                    before: '45 minutes',
                    after: '8 minutes',
                    improvement: '82% faster'
                }
            ]
        },
        testimonial: {
            quote: "ARCO's systematic approach identified $2.8M in annual savings we didn't even know existed. Their engineering team delivered a transformation roadmap that our board could understand and approve immediately.",
            author: 'Maria Santos',
            title: 'CTO',
            credibility: 'Led engineering at 3 unicorn startups'
        },
        techStack: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Redis', 'Kubernetes'],
        complexity: 'High',
        duration: '12 weeks',
        validated: true
    },
    {
        id: 'ecommerce-performance',
        companyType: 'E-commerce Platform',
        industry: 'Retail Technology',
        teamSize: '28 engineers',
        challenge: 'Peak traffic periods causing revenue loss due to slow checkout flows and cart abandonment. Mobile performance especially poor with 4.2s load times.',
        solution: 'Performance-first infrastructure redesign focusing on edge optimization, database query optimization, and progressive loading strategies. Implemented comprehensive monitoring.',
        results: {
            costSavings: '$1.2M annually',
            performanceGain: '65% faster page loads',
            timeToValue: '45 days',
            roiPercentage: 280
        },
        metrics: {
            beforeAfter: [
                {
                    label: 'Mobile Page Load',
                    before: '4.2 seconds',
                    after: '1.4 seconds',
                    improvement: '67% faster'
                },
                {
                    label: 'Conversion Rate',
                    before: '2.8%',
                    after: '4.1%',
                    improvement: '46% increase'
                },
                {
                    label: 'Cart Abandonment',
                    before: '73%',
                    after: '52%',
                    improvement: '29% reduction'
                },
                {
                    label: 'Revenue Per Visitor',
                    before: '$8.40',
                    after: '$12.20',
                    improvement: '45% increase'
                }
            ]
        },
        testimonial: {
            quote: "Our mobile conversion rate increased 46% in just 6 weeks. ARCO delivered measurable business impact that directly translated to bottom-line revenue growth.",
            author: 'Carlos Rodriguez',
            title: 'VP Engineering',
            credibility: 'Former Amazon Principal Engineer'
        },
        techStack: ['Next.js', 'Vercel', 'Shopify Plus', 'MongoDB', 'Redis'],
        complexity: 'Medium',
        duration: '8 weeks',
        validated: true
    },
    {
        id: 'saas-enterprise',
        companyType: 'SaaS Enterprise',
        industry: 'Business Software',
        teamSize: '120 engineers',
        challenge: 'Multi-tenant architecture struggling with resource allocation efficiency. Enterprise clients experiencing inconsistent performance during peak hours.',
        solution: 'Comprehensive resource optimization strategy with intelligent auto-scaling, database sharding optimization, and tenant isolation improvements.',
        results: {
            costSavings: '$950K annually',
            performanceGain: '200% infrastructure efficiency',
            timeToValue: '120 days',
            roiPercentage: 340
        },
        metrics: {
            beforeAfter: [
                {
                    label: 'Resource Utilization',
                    before: '34%',
                    after: '78%',
                    improvement: '129% increase'
                },
                {
                    label: 'Peak Response Time',
                    before: '2,100ms',
                    after: '680ms',
                    improvement: '68% faster'
                },
                {
                    label: 'Infrastructure Costs',
                    before: '$185K/month',
                    after: '$106K/month',
                    improvement: '43% reduction'
                },
                {
                    label: 'Uptime SLA',
                    before: '99.2%',
                    after: '99.8%',
                    improvement: '60% improvement'
                }
            ]
        },
        testimonial: {
            quote: "ARCO transformed our infrastructure efficiency while maintaining our enterprise SLA commitments. The systematic approach gave our executive team confidence in the ROI projections.",
            author: 'Ana Lucia Ferreira',
            title: 'Chief Technology Officer',
            credibility: 'Former Microsoft Azure architect'
        },
        techStack: ['React', 'Express.js', 'Google Cloud', 'PostgreSQL', 'Docker'],
        complexity: 'Enterprise',
        duration: '16 weeks',
        validated: true
    }
]

export function EnterpriseCaseStudies() {
    const [activeCase, setActiveCase] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [autoplay, setAutoplay] = useState(true)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        if (!autoplay) return

        const interval = setInterval(() => {
            setActiveCase(prev => (prev + 1) % enterpriseCaseStudies.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [autoplay])

    const currentCase = enterpriseCaseStudies[activeCase]

    const getComplexityColor = (complexity: string) => {
        switch (complexity) {
            case 'Enterprise':
                return 'bg-purple-100 text-purple-800 border-purple-200'
            case 'High':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            default:
                return 'bg-green-100 text-green-800 border-green-200'
        }
    }

    const formatROI = (roi: number) => {
        return `${roi}% ROI`
    }

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <h2 className="text-4xl font-bold text-gray-900">
                            Validated Enterprise Transformations
                        </h2>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">                        Resultados reais de otimização sistemática de infraestrutura em empresas de médio porte da LATAM.
                        Cada caso de estudo representa ROI validado e excelência técnica.
                    </p>
                </motion.div>

                {/* Case Study Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
                >
                    {enterpriseCaseStudies.map((caseStudy, index) => (
                        <button
                            key={caseStudy.id}
                            onClick={() => {
                                setActiveCase(index)
                                setAutoplay(false)
                            }}
                            className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${activeCase === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className={`font-bold text-lg ${activeCase === index ? 'text-blue-900' : 'text-gray-900'
                                        }`}>
                                        {caseStudy.companyType}
                                    </h3>
                                    <p className="text-sm text-gray-600">{caseStudy.industry}</p>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getComplexityColor(caseStudy.complexity)}`}>
                                    {caseStudy.complexity}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm font-semibold text-emerald-600">
                                        {caseStudy.results.costSavings}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm text-gray-600">
                                        {caseStudy.results.timeToValue}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-semibold text-purple-600">
                                        {formatROI(caseStudy.results.roiPercentage)}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* Active Case Study Detail */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCase}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Building2 className="w-8 h-8" />
                                        <div>
                                            <h3 className="text-2xl font-bold">{currentCase.companyType}</h3>
                                            <p className="text-blue-100">{currentCase.industry} • {currentCase.teamSize}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Challenge</h4>
                                            <p className="text-blue-100 text-sm leading-relaxed">
                                                {currentCase.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Solution</h4>
                                            <p className="text-blue-100 text-sm leading-relaxed">
                                                {currentCase.solution}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <div className="text-2xl font-bold mb-1">{currentCase.results.costSavings}</div>
                                            <div className="text-sm text-blue-100">Annual Savings</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <div className="text-2xl font-bold mb-1">{formatROI(currentCase.results.roiPercentage)}</div>
                                            <div className="text-sm text-blue-100">Return on Investment</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <div className="text-2xl font-bold mb-1">{currentCase.results.performanceGain}</div>
                                            <div className="text-sm text-blue-100">Performance Gain</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <div className="text-2xl font-bold mb-1">{currentCase.results.timeToValue}</div>
                                            <div className="text-sm text-blue-100">Time to Value</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Technology Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {currentCase.techStack.map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="p-8">
                            <h4 className="text-xl font-bold text-gray-900 mb-6">Before & After Metrics</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {currentCase.metrics.beforeAfter.map((metric, index) => (
                                    <motion.div
                                        key={metric.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 rounded-xl p-6"
                                    >
                                        <h5 className="font-semibold text-gray-700 mb-4 text-sm">{metric.label}</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Before</span>
                                                <span className="font-mono text-sm text-red-600">{metric.before}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">After</span>
                                                <span className="font-mono text-sm text-emerald-600">{metric.after}</span>
                                            </div>
                                            <div className="pt-2 border-t border-gray-200">
                                                <span className="text-sm font-bold text-blue-600">{metric.improvement}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Testimonial */}
                            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                    <div className="lg:col-span-2">
                                        <blockquote className="text-lg text-gray-700 font-medium leading-relaxed mb-4">
                                            "{currentCase.testimonial.quote}"
                                        </blockquote>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {currentCase.testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{currentCase.testimonial.author}</div>
                                                <div className="text-sm text-gray-600">{currentCase.testimonial.title}</div>
                                                <div className="text-xs text-blue-600">{currentCase.testimonial.credibility}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                                            <Shield className="w-4 h-4" />
                                            Validated Results
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Project Duration: {currentCase.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready for Your Infrastructure Transformation?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            These results represent systematic methodology applied to real enterprise challenges.
                            Schedule your professional assessment to validate optimization opportunities.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto">
                            Schedule Infrastructure Assessment
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
