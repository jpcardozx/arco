'use client'

import React from 'react'
import { PremiumNavigation } from '../../components/layout/PremiumNavigation'
import { PremiumFooter } from '../../components/layout/PremiumFooter'
import { ProfessionalCaseStudies } from '../../components/sections/ProfessionalCaseStudies'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function CaseStudiesPage() {
    const detailedCases = [
        {
            id: "enterprise-saas-transformation",
            title: "Enterprise SaaS: Trial-to-Paid Optimization",
            industry: "B2B Software",
            client: "TechVantage Platform",
            challenge: "Despite having a superior product with excellent demo feedback, trial-to-paid conversion remained at 7.3%, significantly below industry benchmarks of 15-18%.",
            intervention: "Our Value Alignment System™ identified three critical friction points: pricing presentation hierarchy, value perception sequence, and technical complexity overwhelm during the trial experience.",
            methodology: "Technical Debt Resolution Framework",
            timeline: "45 days",
            results: {
                primary: [
                    { metric: "Trial-to-Paid Conversion", before: "7.3%", after: "18.9%", improvement: "+159%" },
                    { metric: "Average Contract Value", before: "$1,247", after: "$2,890", improvement: "+132%" },
                    { metric: "Sales Cycle Length", before: "68 days", after: "31 days", improvement: "-54%" }
                ],
                secondary: [
                    { metric: "Customer LTV", before: "$8,400", after: "$19,200", improvement: "+129%" },
                    { metric: "Support Ticket Volume", before: "34/week", after: "12/week", improvement: "-65%" },
                    { metric: "Feature Adoption Rate", before: "23%", after: "67%", improvement: "+191%" }
                ]
            },
            roi: "425%",
            testimonial: {
                quote: "ARCO didn't just improve our conversion rate—they transformed how prospects perceive our technical sophistication. We're now positioned as the premium solution we've always been.",
                author: "Michael Chen",
                position: "VP of Growth",
                company: "TechVantage Platform"
            }
        },
        {
            id: "premium-ecommerce-redesign",
            title: "Premium E-commerce: Quality Perception Alignment",
            industry: "Direct-to-Consumer",
            client: "Artisan Collective",
            challenge: "High-quality artisan products were being perceived as overpriced, resulting in 78% cart abandonment and frequent discount requests despite superior craftsmanship.",
            intervention: "Implemented Perception Engineering Framework to restructure visual hierarchy and quality signals, ensuring product excellence was communicated before price consideration.",
            methodology: "Symbolic Friction Analysis™",
            timeline: "60 days",
            results: {
                primary: [
                    { metric: "Cart Abandonment Rate", before: "78%", after: "42%", improvement: "-46%" },
                    { metric: "Average Order Value", before: "$89", after: "$157", improvement: "+76%" },
                    { metric: "Discount Requests", before: "47% of carts", after: "8% of carts", improvement: "-83%" }
                ],
                secondary: [
                    { metric: "Customer Return Rate", before: "23%", after: "67%", improvement: "+191%" },
                    { metric: "Referral Rate", before: "8%", after: "34%", improvement: "+325%" },
                    { metric: "Brand Perception Score", before: "6.2/10", after: "8.9/10", improvement: "+44%" }
                ]
            },
            roi: "290%",
            testimonial: {
                quote: "Finally, our customers understand the value before they see the price. The perception shift has been dramatic—we've moved from competing on price to being recognized for quality.",
                author: "Elena Rodriguez",
                position: "Founder",
                company: "Artisan Collective"
            }
        },
        {
            id: "consulting-authority-positioning",
            title: "Professional Services: Authority Positioning",
            industry: "Strategic Consulting",
            client: "McKenzie Strategic Partners",
            challenge: "Despite having industry-leading expertise and a strong track record, proposal acceptance rates were declining and clients were increasingly price-sensitive.",
            intervention: "Applied Authority Alignment Protocol to restructure expertise presentation, case study positioning, and symbolic authority markers throughout the client journey.",
            methodology: "Authority Alignment Protocol",
            timeline: "30 days",
            results: {
                primary: [
                    { metric: "Proposal Acceptance Rate", before: "34%", after: "67%", improvement: "+97%" },
                    { metric: "Average Project Value", before: "$45K", after: "$78K", improvement: "+73%" },
                    { metric: "Sales Cycle Length", before: "89 days", after: "52 days", improvement: "-42%" }
                ],
                secondary: [
                    { metric: "Price Objections", before: "73%", after: "18%", improvement: "-75%" },
                    { metric: "Referral Quality Score", before: "5.8/10", after: "8.7/10", improvement: "+50%" },
                    { metric: "Competitor Comparisons", before: "84%", after: "23%", improvement: "-73%" }
                ]
            },
            roi: "380%",
            testimonial: {
                quote: "ARCO transformed how the market perceives our expertise. We're no longer competing on price—we're the obvious choice for strategic initiatives.",
                author: "David McKenzie",
                position: "Managing Partner",
                company: "McKenzie Strategic Partners"
            }
        }
    ]

    return (
        <>
            <PremiumNavigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6">
                            Documented revenue impact
                            <br />
                            <span className="font-normal text-blue-600">through precision intervention</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
                            Each case study represents a specific pattern of technical debt resolution,
                            demonstrating our systematic approach to growth capacity liberation.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
                                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                                <div className="text-3xl font-light text-slate-900 mb-2">94%</div>
                                <div className="text-sm text-slate-600">Projects achieve ROI within 47 days</div>
                            </div>
                            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
                                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                                <div className="text-3xl font-light text-slate-900 mb-2">$2.1M</div>
                                <div className="text-sm text-slate-600">Technical waste eliminated in 2025</div>
                            </div>
                            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
                                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                                <div className="text-3xl font-light text-slate-900 mb-2">47</div>
                                <div className="text-sm text-slate-600">Average payback period (days)</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Case Studies */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {detailedCases.map((caseStudy, index) => (
                            <motion.div
                                key={caseStudy.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                    <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                        {caseStudy.industry}
                                    </div>

                                    <h2 className="text-3xl font-medium text-slate-900 mb-4">
                                        {caseStudy.title}
                                    </h2>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-slate-900 mb-2">Challenge</h3>
                                        <p className="text-slate-600 leading-relaxed mb-4">
                                            {caseStudy.challenge}
                                        </p>

                                        <h3 className="text-lg font-medium text-slate-900 mb-2">Strategic Intervention</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {caseStudy.intervention}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-6 text-sm text-slate-500 mb-8">
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {caseStudy.timeline}
                                        </span>
                                        <span className="flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            {caseStudy.roi} ROI
                                        </span>
                                        <span>{caseStudy.methodology}</span>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                        <blockquote className="text-slate-700 italic mb-4">
                                            "{caseStudy.testimonial.quote}"
                                        </blockquote>
                                        <div className="text-sm">
                                            <div className="font-medium text-slate-900">{caseStudy.testimonial.author}</div>
                                            <div className="text-slate-600">{caseStudy.testimonial.position}</div>
                                            <div className="text-slate-500">{caseStudy.testimonial.company}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                                        <h3 className="text-xl font-medium text-slate-900 mb-6">Measured Results</h3>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-slate-500 mb-4">Primary Metrics</h4>
                                                <div className="space-y-4">
                                                    {caseStudy.results.primary.map((result, i) => (
                                                        <div key={i} className="flex justify-between items-center">
                                                            <div className="flex-1">
                                                                <div className="text-sm font-medium text-slate-900">{result.metric}</div>
                                                                <div className="text-xs text-slate-500">{result.before} → {result.after}</div>
                                                            </div>
                                                            <div className="text-lg font-medium text-green-600">
                                                                {result.improvement}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-200 pt-6">
                                                <h4 className="text-sm font-medium text-slate-500 mb-4">Secondary Impact</h4>
                                                <div className="space-y-3">
                                                    {caseStudy.results.secondary.map((result, i) => (
                                                        <div key={i} className="flex justify-between items-center">
                                                            <div className="text-sm text-slate-700">{result.metric}</div>
                                                            <div className="text-sm font-medium text-blue-600">
                                                                {result.improvement}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-medium text-slate-900 mb-6">
                            Ready to achieve similar results?
                        </h2>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            Each intervention follows our systematic Technical Debt Resolution Framework,
                            ensuring measurable ROI within the first quarter.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/diagnose"
                                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                Request your assessment
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/methodology"
                                className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-white transition-colors"
                            >
                                Learn our methodology
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <PremiumFooter />
        </>
    )
}
