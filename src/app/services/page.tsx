'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProfessionalNavigation from '../../components/layout/ProfessionalNavigation'
import { ProfessionalFooter } from '../../components/layout/ProfessionalFooter'
import { ArrowRight, CheckCircle, Clock, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'
import { createHref } from '@/utils/navigation'

export default function ServicesPage() {
    const services = [
        {
            title: "Diagnostic Assessment",
            price: "$497",
            duration: "30 minutes",
            description: "Microdiagnostic precision to identify the exact technical debt patterns blocking your growth.",
            features: [
                "Comprehensive funnel analysis",
                "Technical debt identification",
                "ROI impact assessment",
                "Priority intervention mapping",
                "Actionable improvement roadmap"
            ],
            cta: "Start Assessment",
            href: "/diagnose",
            highlight: false
        },
        {
            title: "Pilot Implementation",
            price: "$1,200",
            duration: "2-3 weeks",
            description: "Surgical intervention on your highest-impact technical debt with performance guarantee.",
            features: [
                "Targeted implementation",
                "Minimum 15% improvement guarantee",
                "Real-time performance monitoring",
                "Technical documentation",
                "Knowledge transfer session"
            ],
            cta: "Launch Pilot",
            href: "/pilot",
            highlight: true
        },
        {
            title: "Scale & Growth",
            price: "$3,900 - $5,400",
            duration: "6-8 weeks",
            description: "Complete optimization suite designed to unlock the growth capacity your marketing buys but can't sell.",
            features: [
                "Full-stack optimization",
                "Advanced conversion tracking",
                "Performance analytics dashboard",
                "Ongoing monitoring setup",
                "Team training & documentation"
            ],
            cta: "Scale Now",
            href: "/scale",
            highlight: false
        },
        {
            title: "Ongoing Optimization",
            price: "$797/month",
            duration: "Continuous",
            description: "Continuous improvement program to maintain peak performance and adapt to market changes.",
            features: [
                "Monthly optimization reviews",
                "Performance monitoring",
                "Technical debt prevention",
                "Strategic recommendations",
                "Priority support access"
            ],
            cta: "Start Retainer",
            href: "/retainer",
            highlight: false
        }
    ]

    const guarantees = [
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "Performance Guarantee",
            description: "Minimum 15% improvement or full credit toward next service tier"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "47-Day Payback",
            description: "Average client sees ROI within 47 days of implementation"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "94% Success Rate",
            description: "Consistent delivery across all client engagements since 2019"
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
                            Technical Solutions That
                            <span className="block font-medium">Drive Measurable Growth</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Four-tier service structure designed to identify, eliminate, and prevent the technical debt
                            that's blocking your marketing's true potential.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Guarantees Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4 text-slate-700">
                                    {guarantee.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {guarantee.title}
                                </h3>
                                <p className="text-slate-600">
                                    {guarantee.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Strategic Service Progression
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Start with a diagnostic, prove value with a pilot, scale with confidence,
                            and maintain peak performance.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative bg-white rounded-lg shadow-sm border p-8 ${service.highlight ? 'ring-2 ring-slate-900 scale-105' : 'border-slate-200'
                                    }`}
                            >
                                {service.highlight && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <span className="text-3xl font-light text-slate-900">
                                            {service.price}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            {service.duration}
                                        </span>
                                    </div>
                                    <p className="text-slate-600">
                                        {service.description}
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>                                <Link
                                    href={createHref(service.href)}
                                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${service.highlight
                                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                        }`}
                                >
                                    {service.cta}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Overview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Our Methodology
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                            A systematic approach to identifying and eliminating the technical debt
                            that's preventing your marketing from converting.
                        </p>
                        <Link
                            href="/methodology"
                            className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium"
                        >
                            Learn about our approach
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ProfessionalFooter />
        </div>
    )
}
