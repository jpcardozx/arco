'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PersonalNavigation from '../../components/layout/PersonalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { ArrowRight, CheckCircle, Calendar, TrendingUp, Shield, Monitor, Users } from 'lucide-react'
import Link from 'next/link'

export default function RetainerPage() {
    const services = [
        {
            icon: <Monitor className="h-6 w-6" />,
            title: "Performance Monitoring",
            description: "Continuous tracking of key metrics with automated alerts for performance degradation"
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "Monthly Optimization Reviews",
            description: "Regular analysis and implementation of new improvement opportunities"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Technical Debt Prevention",
            description: "Proactive identification and resolution of issues before they impact performance"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Strategic Consultation",
            description: "Monthly strategy sessions to align technical improvements with business goals"
        }
    ]

    const inclusions = [
        "Monthly performance analysis and optimization",
        "Real-time monitoring and alerting system",
        "Technical debt assessment and prevention",
        "Strategic recommendations and roadmap updates",
        "Priority support channel (24-hour response)",
        "Quarterly business review sessions",
        "Team training and knowledge transfer",
        "Performance reporting dashboard access"
    ]

    const benefits = [
        {
            title: "Sustained Performance",
            description: "Maintain peak conversion rates as your business scales and market conditions change",
            impact: "Prevents 15-25% performance degradation common in growing companies"
        },
        {
            title: "Proactive Problem Solving",
            description: "Identify and resolve technical issues before they impact your bottom line",
            impact: "Reduce emergency fixes and costly downtime by 80%"
        },
        {
            title: "Continuous Improvement",
            description: "Regular optimization ensures you stay ahead of competitors and market changes",
            impact: "5-10% monthly performance improvements through ongoing optimization"
        },
        {
            title: "Strategic Alignment",
            description: "Technical improvements aligned with evolving business objectives and market opportunities",
            impact: "Ensure technical investments support business growth at every stage"
        }
    ]

    const processSteps = [
        {
            week: "Week 1",
            title: "Performance Review",
            description: "Comprehensive analysis of current performance metrics and identification of optimization opportunities"
        },
        {
            week: "Week 2",
            title: "Implementation",
            description: "Execute highest-priority improvements and technical debt resolution"
        },
        {
            week: "Week 3",
            title: "Monitoring & Analysis",
            description: "Track performance improvements and gather data for next optimization cycle"
        },
        {
            week: "Week 4",
            title: "Strategic Planning",
            description: "Strategic consultation and roadmap planning for the following month"
        }
    ]

    const clientTypes = [
        {
            type: "Post-Scale Clients",
            description: "Companies who have completed our Scale package and want to maintain momentum",
            reason: "Protect and build upon the 25-45% improvements achieved during Scale implementation"
        },
        {
            type: "High-Growth Companies",
            description: "Rapidly scaling businesses that need ongoing technical optimization",
            reason: "Ensure technical infrastructure can support growth without performance degradation"
        },
        {
            type: "Competitive Markets",
            description: "Companies in highly competitive industries requiring continuous optimization",
            reason: "Maintain competitive advantage through superior technical performance"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <PersonalNavigation />

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
                            Ongoing Optimization
                            <span className="block font-medium">$797 / Month</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Continuous improvement program to maintain peak performance and adapt
                            to market changes as your business scales.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Start Retainer Program
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Core Services */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Core Services Included
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Comprehensive ongoing optimization and support to ensure sustained performance growth.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-start space-x-4 p-6 bg-slate-50 rounded-lg"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full flex-shrink-0 text-slate-700">
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Monthly Process */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Monthly Optimization Cycle
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            A structured 4-week cycle that ensures continuous improvement
                            and proactive problem solving.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
                            >
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-full text-sm font-semibold mb-3">
                                        {index + 1}
                                    </div>
                                    <div className="text-sm text-slate-500 font-medium">
                                        {step.week}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-3 text-center">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 text-sm text-center">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Why Ongoing Optimization Matters
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            One-time optimizations lose effectiveness as businesses grow and markets evolve.
                            Continuous improvement ensures sustained competitive advantage.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                <div className="lg:w-1/2">
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 mb-4">
                                        {benefit.description}
                                    </p>
                                    <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-800 rounded-lg">
                                        <TrendingUp className="h-4 w-4 mr-2" />
                                        {benefit.impact}
                                    </div>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="bg-slate-50 rounded-lg p-8 h-48 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl font-light text-slate-300 mb-2">
                                                {index + 1}
                                            </div>
                                            <div className="text-slate-500">
                                                Benefit {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            What's Included Every Month
                        </h2>
                        <p className="text-lg text-slate-600">
                            Comprehensive optimization and support services for $797/month.
                        </p>
                    </motion.div>

                    <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
                        <div className="grid md:grid-cols-2 gap-4">
                            {inclusions.map((inclusion, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-start"
                                >
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700">{inclusion}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Ideal Clients */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Who Benefits Most from Ongoing Optimization
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Three types of companies that see the greatest value from continuous
                            performance optimization.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {clientTypes.map((client, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-slate-50 rounded-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                    {client.type}
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    {client.description}
                                </p>
                                <div className="border-t border-slate-200 pt-4">
                                    <h4 className="font-medium text-slate-700 mb-2">Why it matters:</h4>
                                    <p className="text-slate-600 text-sm">
                                        {client.reason}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing & CTA */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-light mb-6">
                            Investment & Value
                        </h2>
                        <div className="bg-white/10 rounded-lg p-8 mb-8">
                            <div className="flex items-center justify-center gap-8 mb-6">
                                <div className="text-center">
                                    <div className="text-4xl font-light text-white mb-1">$797</div>
                                    <div className="text-slate-300">Per Month</div>
                                </div>
                                <div className="w-px h-12 bg-white/20"></div>
                                <div className="text-center">
                                    <div className="text-4xl font-light text-white mb-1">5-10%</div>
                                    <div className="text-slate-300">Monthly Improvement</div>
                                </div>
                            </div>
                            <p className="text-slate-300 text-lg">
                                Typical ROI is 3-5x within the first quarter through sustained
                                performance improvements and prevented degradation.
                            </p>
                        </div>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Start Optimization Program
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ProfessionalFooter />
        </div>
    )
}
