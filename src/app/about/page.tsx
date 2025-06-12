'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PremiumNavigation } from '../../components/layout/PremiumNavigation'
import { PremiumFooter } from '../../components/layout/PremiumFooter'
import { ArrowRight, Target, Users, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
    const stats = [
        {
            number: "94%",
            label: "Client Success Rate",
            description: "Consistent delivery across all engagements since 2019"
        },
        {
            number: "$2.1M",
            label: "Waste Eliminated",
            description: "In marketing spend through technical optimizations"
        },
        {
            number: "47",
            label: "Average Payback Days",
            description: "Time to ROI on our optimization implementations"
        },
        {
            number: "100+",
            label: "Companies Optimized",
            description: "Mid-market businesses across multiple industries"
        }
    ]

    const values = [
        {
            icon: <Target className="h-8 w-8" />,
            title: "Surgical Precision",
            description: "We identify and eliminate specific technical debt patterns, not broad-stroke solutions."
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Measurable Results",
            description: "Every intervention comes with performance guarantees and measurable ROI commitments."
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Partnership Approach",
            description: "We work as an extension of your team, providing knowledge transfer and documentation."
        },
        {
            icon: <Award className="h-8 w-8" />,
            title: "Self-Funding Model",
            description: "Our improvements pay for themselves through increased performance and reduced waste."
        }
    ]

    const team = [
        {
            name: "Technical Solutions Team",
            role: "Technical Debt Resolution Specialists",
            description: "Experienced engineers specializing in conversion optimization and performance analysis.",
            expertise: ["Full-Stack Optimization", "Performance Analysis", "Technical Debt Assessment", "ROI Measurement"]
        },
        {
            name: "Strategy & Analysis Team",
            role: "Business Performance Consultants",
            description: "Strategic advisors focused on aligning technical improvements with business objectives.",
            expertise: ["Business Strategy", "Performance Metrics", "Growth Planning", "Technical Documentation"]
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <PremiumNavigation />

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
                            Technical Solutions for
                            <span className="block font-medium">Growth-Focused Companies</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            ARCO specializes in identifying and eliminating the technical debt that prevents
                            your marketing from converting at its true potential.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-8">
                            Our Mission
                        </h2>
                        <blockquote className="text-2xl font-light text-slate-700 leading-relaxed">
                            "We unlock the growth capacity your marketing buys but can't sell by identifying
                            and eliminating the specific technical debt patterns that block conversion."
                        </blockquote>
                        <p className="text-lg text-slate-600 mt-8 leading-relaxed">
                            Too many companies invest heavily in marketing only to see that investment
                            wasted by technical friction in their conversion funnels. We provide the
                            microdiagnostic precision and surgical interventions needed to unlock that latent potential.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Track Record of Success
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Consistent delivery since 2019 with measurable results across all client engagements.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center bg-white rounded-lg p-8 shadow-sm border border-slate-200"
                            >
                                <div className="text-4xl font-light text-slate-900 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-medium text-slate-700 mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-slate-600">
                                    {stat.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Our Approach
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Four core principles that guide every client engagement and technical intervention.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-start space-x-4"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full flex-shrink-0 text-slate-700">
                                    {value.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Areas */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-4">
                            Areas of Expertise
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Specialized teams focused on the technical and strategic aspects
                            of performance optimization.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-8 shadow-sm border border-slate-200"
                            >
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {member.name}
                                </h3>
                                <div className="text-slate-600 font-medium mb-4">
                                    {member.role}
                                </div>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {member.description}
                                </p>
                                <div>
                                    <h4 className="font-medium text-slate-700 mb-3">Core Expertise:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {member.expertise.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Culture */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-light text-slate-900 mb-8">
                            Why We Do This Work
                        </h2>
                        <div className="prose prose-lg mx-auto text-slate-600">
                            <p className="leading-relaxed">
                                We've seen too many companies struggle with the frustration of investing
                                heavily in marketing, only to watch potential customers drop off due to
                                technical friction they can't identify or fix.
                            </p>
                            <p className="leading-relaxed">
                                Our methodology was developed specifically to address this problem with
                                the precision and accountability that mid-market companies require.
                                We don't believe in broad-stroke solutions or empty promises.
                            </p>
                            <p className="leading-relaxed">
                                Every intervention we make comes with performance guarantees because
                                we know exactly what we're fixing and why it matters to your bottom line.
                            </p>
                        </div>
                    </motion.div>
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
                            Ready to Unlock Your Growth Potential?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Start with a 30-minute diagnostic assessment to identify the specific
                            technical debt blocking your marketing's true potential.
                        </p>
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            Start Diagnostic Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <PremiumFooter />
        </div>
    )
}
