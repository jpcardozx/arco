'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProfessionalNavigation from '../../components/layout/ProfessionalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { ArrowRight, CheckCircle, TrendingUp, BarChart3, Settings, Monitor } from 'lucide-react'
import Link from 'next/link'

export default function ScalePage() {
    const packages = [
        {
            name: "Scale Essentials",
            price: "$3,900",
            duration: "6 weeks",
            description: "Complete optimization suite for companies ready to unlock their full growth potential",
            features: [
                "Full-stack performance optimization",
                "Advanced conversion tracking setup",
                "Technical debt elimination across all systems",
                "Performance analytics dashboard",
                "Team training and documentation",
                "30-day post-implementation monitoring"
            ],
            bestFor: "Companies with established traffic looking to maximize conversion potential"
        },
        {
            name: "Scale Premium",
            price: "$5,400",
            duration: "8 weeks",
            description: "Enterprise-grade optimization with advanced analytics and ongoing support",
            features: [
                "Everything in Scale Essentials",
                "Custom performance monitoring tools",
                "Predictive analytics implementation",
                "Advanced A/B testing framework",
                "Executive reporting dashboard",
                "60-day post-implementation monitoring",
                "Priority support channel"
            ],
            bestFor: "Mid-market companies requiring enterprise-level optimization and reporting"
        }
    ]

    const phases = [
        {
            icon: <BarChart3 className="h-8 w-8" />,
            title: "Comprehensive Analysis",
            duration: "Week 1-2",
            description: "Deep-dive assessment of your entire technical stack and conversion funnel",
            deliverables: [
                "Complete technical audit report",
                "Performance baseline establishment",
                "Priority intervention roadmap",
                "ROI projection analysis"
            ]
        },
        {
            icon: <Settings className="h-8 w-8" />,
            title: "System Optimization",
            duration: "Week 3-5",
            description: "Implementation of all identified improvements across your technical infrastructure",
            deliverables: [
                "Full-stack performance optimization",
                "Conversion funnel improvements",
                "Technical debt elimination",
                "Real-time monitoring setup"
            ]
        },
        {
            icon: <Monitor className="h-8 w-8" />,
            title: "Analytics & Monitoring",
            duration: "Week 6-8",
            description: "Advanced tracking, dashboard setup, and team training for ongoing optimization",
            deliverables: [
                "Performance analytics dashboard",
                "Predictive monitoring tools",
                "Team training sessions",
                "Documentation and handoff"
            ]
        }
    ]

    const outcomes = [
        {
            metric: "25-45%",
            label: "Conversion Rate Improvement",
            description: "Average increase across all optimized conversion points"
        },
        {
            metric: "30-60%",
            label: "Page Speed Improvement",
            description: "Faster load times leading to better user experience"
        },
        {
            metric: "15-35%",
            label: "Revenue Increase",
            description: "Direct impact on bottom line through optimization"
        },
        {
            metric: "2-4x",
            label: "Marketing ROI Improvement",
            description: "Better conversion of existing traffic and ad spend"
        }
    ]

    const industries = [
        {
            name: "E-commerce",
            challenges: "Cart abandonment, slow checkout, poor mobile experience",
            solutions: "Optimized checkout flow, performance improvements, mobile-first design",
            results: "35% reduction in cart abandonment, 25% faster load times"
        },
        {
            name: "SaaS",
            challenges: "Low trial-to-paid conversion, complex onboarding, feature adoption",
            solutions: "Streamlined signup flow, improved onboarding, usage analytics",
            results: "40% improvement in trial conversion, 60% better feature adoption"
        },
        {
            name: "Professional Services",
            challenges: "Poor lead qualification, lengthy consultation process, no automation",
            solutions: "Lead scoring system, automated nurturing, optimized consultation flow",
            results: "50% better lead quality, 30% faster consultation booking"
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
                            Scale & Growth
                            <span className="block font-medium">Complete Optimization Suite</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Unlock the full growth capacity your marketing buys but can't sell through
                            comprehensive technical optimization and performance analytics.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Start Scale Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Expected Outcomes */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Expected Performance Improvements
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Based on our optimization of 100+ mid-market companies since 2019.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {outcomes.map((outcome, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center bg-slate-50 rounded-lg p-6"
                            >
                                <div className="text-3xl font-light text-slate-900 mb-2">
                                    {outcome.metric}
                                </div>
                                <div className="text-lg font-medium text-slate-700 mb-2">
                                    {outcome.label}
                                </div>
                                <div className="text-sm text-slate-600">
                                    {outcome.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Package Options */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Scale Package Options
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Choose the optimization level that matches your company's complexity and growth objectives.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`bg-white rounded-lg p-8 shadow-sm border ${index === 1 ? 'ring-2 ring-slate-900 scale-105' : 'border-slate-200'
                                    }`}
                            >
                                {index === 1 && (
                                    <div className="text-center mb-6">
                                        <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Comprehensive
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                                        {pkg.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <span className="text-3xl font-light text-slate-900">
                                            {pkg.price}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            {pkg.duration}
                                        </span>
                                    </div>
                                    <p className="text-slate-600">
                                        {pkg.description}
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-slate-200 pt-6 mb-6">
                                    <h4 className="font-medium text-slate-700 mb-2">Best for:</h4>
                                    <p className="text-slate-600 text-sm">{pkg.bestFor}</p>
                                </div>

                                <Link
                                    href="/diagnose"
                                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${index === 1
                                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                        }`}
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Implementation Process */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Implementation Process
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            A systematic 6-8 week process designed to optimize every aspect
                            of your technical performance.
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                <div className="lg:w-1/2">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mr-4 text-slate-700">
                                            {phase.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-slate-900">
                                                {phase.title}
                                            </h3>
                                            <span className="text-slate-500">{phase.duration}</span>
                                        </div>
                                    </div>
                                    <p className="text-lg text-slate-600 mb-6">
                                        {phase.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                                            <li key={deliverableIndex} className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                                                <span className="text-slate-700">{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="bg-slate-50 rounded-lg p-8 h-64 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl font-light text-slate-300 mb-2">
                                                {index + 1}
                                            </div>
                                            <div className="text-slate-500">
                                                Phase {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Examples */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Industry-Specific Optimization
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our Scale package adapts to the unique challenges and opportunities
                            in your industry.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {industries.map((industry, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-8 shadow-sm border border-slate-200"
                            >
                                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                                    {industry.name}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Common Challenges:</h4>
                                        <p className="text-slate-600 text-sm">{industry.challenges}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Our Solutions:</h4>
                                        <p className="text-slate-600 text-sm">{industry.solutions}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">Typical Results:</h4>
                                        <p className="text-slate-600 text-sm font-medium">{industry.results}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-light mb-6">
                            Ready to Scale Your Growth?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Start with a comprehensive diagnostic assessment to identify your
                            optimization opportunities and create a custom Scale package.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Begin Scale Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ProfessionalFooter />
        </div>
    )
}
