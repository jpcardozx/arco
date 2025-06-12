'use client'

import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    ArrowRight,
    Zap,
    Target,
    TrendingUp,
    DollarSign,
    Clock,
    Shield,
    CheckCircle,
    AlertTriangle,
    BarChart3
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Strategic content section showcasing the intersection methodology
export function StrategicContentSection() {
    const [activeTab, setActiveTab] = useState(0)

    // How the intersection approach solves complex business problems
    const intersection_solutions = [
        {
            title: "Revenue Leak Detection + Systematic Resolution",
            personalApproach: "10+ years of experience quickly identifying conversion funnel bottlenecks",
            arcoMethodology: "ARCO's systematic framework ensures comprehensive analysis and sustainable fixes",
            intersection: "Experience-driven pattern recognition + systematic methodology = faster, more complete solutions",
            realExample: "Ipê case: Personal experience spotted mobile friction, ARCO methodology provided systematic optimization → 1.9% to 8.2% conversion",
            businessImpact: "$380k additional revenue in 6 weeks",
            commonSigns: [
                "Traffic growing but revenue stagnating",
                "High bounce rates on mobile despite responsive design",
                "Customers dropping off at specific funnel stages",
                "Technical performance issues causing conversion loss"
            ],
            solutionApproach: "Combined expertise analysis + systematic ARCO framework implementation",
            timeframe: "14-45 days",
            icon: TrendingUp,
            color: "from-emerald-500 to-teal-600"
        },
        {
            title: "Performance Engineering + Business Impact Focus",
            personalApproach: "Core Web Vitals optimization specialist with proven track record (4.2s → 0.8s)",
            arcoMethodology: "ARCO's business-first approach ensures technical changes drive revenue impact",
            intersection: "Technical excellence + business methodology = performance improvements that generate measurable ROI",
            realExample: "Xora case: Personal technical expertise + ARCO business focus → 287% trial-to-paid improvement",
            businessImpact: "Performance improvements recover $180k+ annually",
            commonSigns: [
                "Slow loading times hurting conversions",
                "Technical debt impacting user experience",
                "Performance issues but unclear business priority",
                "Need technical fixes with guaranteed ROI"
            ],
            solutionApproach: "Technical optimization guided by systematic business impact analysis",
            timeframe: "7-28 days",
            icon: Zap,
            color: "from-blue-500 to-indigo-600"
        },
        {
            title: "Value Perception + Systematic Alignment",
            personalApproach: "Studies in revenue psychology - how technical excellence gets undervalued symbolically",
            arcoMethodology: "ARCO's symbolic alignment framework for premium positioning and sustainable pricing",
            intersection: "Psychological insights + systematic framework = sustainable premium pricing without changing core offerings",
            realExample: "Multiple clients achieving 2.3× premium pricing through better value perception alignment",
            businessImpact: "Premium positioning enables 2.3× pricing without changing services",
            commonSigns: [
                "Competing on price despite superior quality",
                "Clients questioning value despite great results",
                "Symbolic elements not matching actual value delivery",
                "Market perceiving you as mid-tier despite premium work"
            ],
            solutionApproach: "Perception psychology insights + systematic ARCO alignment methodology", timeframe: "30-60 days",
            icon: Target,
            color: "from-purple-500 to-pink-600"
        }
    ]

    // Strategic intervention framework combining personal expertise with ARCO methodology
    const strategic_intervention_framework = [
        {
            level: "T1",
            name: "Intersection Analysis™",
            duration: "48 hours",
            price: "$497-997",
            description: "Map where personal expertise + ARCO methodology creates maximum business impact",
            deliverables: [
                "Complete intersection audit (experience gaps, methodology gaps)",
                "Business impact mapping ($4,680/month waste identification)",
                "Priority intersection opportunities (exact focus points)",
                "Performance bottleneck forensics using combined approach",
                "ROI projection with specific timeline and intersection advantages"
            ],
            outcome: "Clear roadmap where personal + systematic = maximum results",
            icon: Target,
            perfect_for: "Businesses wanting to understand the intersection advantage before full commitment"
        },
        {
            level: "T2",
            name: "Strategic Implementation™",
            duration: "7-14 days",
            price: "$1,997-2,997",
            description: "Execute 3 critical intersections: experience-driven identification + systematic resolution",
            deliverables: [
                "Stack consolidation using intersection methodology ($2,400/month savings)",
                "Critical path optimization (personal insights + systematic execution)",
                "Major bottleneck elimination (intersection approach = 180% faster)",
                "Intersection ROI tracking setup and measurement framework"
            ],
            outcome: "Immediate cost reduction + proven intersection performance gains",
            icon: Zap,
            perfect_for: "Businesses ready to implement intersection methodology for immediate results"
        },
        {
            level: "T3",
            name: "Complete Intersection Foundation™",
            duration: "4-8 weeks",
            price: "$4,997-7,997",
            description: "Full intersection rebuild: personal expertise + systematic ARCO methodology = superior foundation",
            deliverables: [
                "Next.js SSR implementation (0.8s load using intersection methodology)",
                "Headless CMS optimization (experience + methodology = 200% content velocity)",
                "Mobile-first redesign (intersection approach for conversion parity)",
                "Native integrations (eliminate Zapier using systematic personal approach)"
            ],
            outcome: "Future-proof foundation built on intersection advantages + 67-89% conversion improvement",
            icon: Shield,
            perfect_for: "Businesses planning aggressive growth using intersection competitive advantage"
        }
    ]

    // Case study focused on business outcomes, not technical features
    const business_case_studies = [
        {
            company: "Retailer Mid-Market",
            industry: "E-commerce",
            employees: "150 funcionários",
            revenue: "$12M annual",
            challenge: "Conversão mobile 67% abaixo desktop = $89k/mês revenue perdido",
            root_cause: "Checkout mobile: 7 steps vs 3 desktop. Friction points não mapeados.",
            intervention: "T2 Emergency Surgery™ - mobile checkout streamline cirúrgico",
            timeline: "12 dias implementation",
            results: {
                conversion_improvement: "+284% mobile conversion rate",
                revenue_impact: "$340K additional revenue Q1",
                cost_savings: "$1,340/mês em cart recovery tools eliminados",
                roi: "847% ROI primeiro trimestre"
            },
            testimonial: "Achávamos que mobile estava 'bom'. Estava custando $89K/mês em vendas perdidas. Fix em 12 dias.",
            role: "Sarah Chen, VP Operations"
        },
        {
            company: "B2B Software Company",
            industry: "SaaS",
            employees: "85 employees",
            revenue: "$8M annual",
            challenge: "High-quality demos consistently failing to convert to paid accounts",
            root_cause: "Pricing page cognitive dissonance - features vs value presentation",
            intervention: "T1 Efficiency Snapshot™ + targeted pricing page optimization",
            timeline: "6 weeks total (2 days analysis + 4 weeks implementation)",
            results: {
                conversion_improvement: "+83% demo-to-paid conversion",
                revenue_impact: "$312K annual recurring revenue added",
                cost_savings: "$1,200/month in marketing automation tools consolidated",
                roi: "325% ROI ongoing"
            },
            testimonial: "The snapshot revealed we were presenting our pricing backwards. Fixing that one insight doubled our trial conversions.",
            role: "Marcus Rodriguez, Co-founder"
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Strategic reframe header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >                    <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-5 py-2 mb-6 border border-blue-200">
                        <AlertTriangle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                            Professional Intersection Analysis
                        </span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                        Where Personal Expertise Meets
                        <br />
                        <span className="font-normal text-blue-600">Systematic Business Methodology</span>
                    </h2>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Three strategic intersection points where 10+ years of conversion engineering
                        experience combines with ARCO's systematic approach to create superior business outcomes.
                    </p>
                </motion.div>                {/* Intersection solutions deep-dive tabs */}
                <div className="mb-20">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {intersection_solutions.map((solution, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === index
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                    }`}
                            >
                                <solution.icon className="w-4 h-4" />
                                <span>{solution.title}</span>
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
                    >
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${intersection_solutions[activeTab].color} flex items-center justify-center mb-6`}>
                                    {React.createElement(intersection_solutions[activeTab].icon, { className: "w-6 h-6 text-white" })}
                                </div>

                                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                                    {intersection_solutions[activeTab].title}
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <p className="text-sm font-medium text-blue-700 mb-1">Personal Expertise:</p>
                                        <p className="text-slate-600">{intersection_solutions[activeTab].personalApproach}</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="text-sm font-medium text-green-700 mb-1">ARCO Methodology:</p>
                                        <p className="text-slate-600">{intersection_solutions[activeTab].arcoMethodology}</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <p className="text-sm font-medium text-purple-700 mb-1">Intersection Power:</p>
                                        <p className="text-slate-600">{intersection_solutions[activeTab].intersection}</p>
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-medium text-green-700 mb-1">Real Example:</p>
                                    <p className="text-green-800">{intersection_solutions[activeTab].realExample}</p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm font-medium text-blue-700 mb-2">Business Impact:</p>
                                    <p className="text-blue-800 font-semibold">{intersection_solutions[activeTab].businessImpact}</p>
                                    <p className="text-sm text-blue-600 mt-2">
                                        Timeline: {intersection_solutions[activeTab].timeframe}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                                    Signs You Need This Intersection Approach:
                                </h4>
                                <div className="space-y-3">
                                    {intersection_solutions[activeTab].commonSigns.map((sign, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{sign}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <p className="text-sm font-medium text-orange-700 mb-1">Our Approach:</p>
                                    <p className="text-orange-800">{intersection_solutions[activeTab].solutionApproach}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Intervention tiers - business focused */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-5 py-2 mb-6 border border-blue-200">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">
                                Professional Intersection Framework
                            </span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                            Choose Your Intersection Level
                        </h2>

                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our approach combines 10+ years of personal expertise with systematic ARCO methodology —
                            not just adding more complexity, but creating superior results through strategic intersection.
                        </p>
                    </div><div className="grid lg:grid-cols-3 gap-8">
                        {strategic_intervention_framework.map((tier, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-slate-900 text-white rounded-full text-xl font-semibold flex items-center justify-center mx-auto mb-4">
                                        {tier.level}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {tier.name}
                                    </h3>
                                    <div className="text-2xl font-light text-blue-600 mb-1">
                                        {tier.price}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {tier.duration}
                                    </div>
                                </div>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {tier.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">
                                        What You Get:
                                    </h4>
                                    <ul className="space-y-2">
                                        {tier.deliverables.map((item, idx) => (
                                            <li key={idx} className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-slate-600">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-medium text-green-700 mb-1">Expected Outcome:</p>
                                    <p className="text-green-800">{tier.outcome}</p>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-medium text-slate-700 mb-1">Perfect For:</p>
                                    <p className="text-slate-600">{tier.perfect_for}</p>
                                </div>

                                <Link
                                    href="/diagnose"
                                    className="block w-full text-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                >
                                    Começar
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Business case studies */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                            Real Business Impact
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Companies like yours achieving measurable efficiency gains and cost reductions
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {business_case_studies.map((study, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{study.company}</h3>
                                        <p className="text-sm text-slate-600">{study.industry} • {study.employees} • {study.revenue}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-1">Challenge:</p>
                                        <p className="text-slate-600">{study.challenge}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-1">Root Cause:</p>
                                        <p className="text-slate-600">{study.root_cause}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-1">Intervention:</p>
                                        <p className="text-slate-600">{study.intervention}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <p className="text-sm text-green-700 font-medium">{study.results.conversion_improvement}</p>
                                        <p className="text-xs text-green-600">Conversion Impact</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <p className="text-sm text-blue-700 font-medium">{study.results.revenue_impact}</p>
                                        <p className="text-xs text-blue-600">Revenue Impact</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3">
                                        <p className="text-sm text-purple-700 font-medium">{study.results.cost_savings}</p>
                                        <p className="text-xs text-purple-600">Cost Savings</p>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-3">
                                        <p className="text-sm text-orange-700 font-medium">{study.results.roi}</p>
                                        <p className="text-xs text-orange-600">ROI First Quarter</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-4">
                                    <p className="text-slate-700 italic mb-2">"{study.testimonial}"</p>
                                    <p className="text-sm text-slate-600 font-medium">— {study.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
