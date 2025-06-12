'use client'

import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, TrendingUp, Clock, DollarSign, Users } from 'lucide-react'
import Image from 'next/image'

// Real client stories focused on outcomes, not just metrics
export function ClientSuccessStories() {
    const [activeStory, setActiveStory] = useState(0)

    const successStories = [
        {
            company: "Ipê Real Estate",
            industry: "Premium Real Estate",
            logo: "/ipeLogo.png",
            challenge: "Mobile users were struggling to complete property inquiries, leading to missed opportunities",
            approach: "We analyzed the mobile user journey and identified key friction points in the inquiry process",
            solution: "Streamlined the mobile experience with simplified forms and better information hierarchy",
            outcome: "Mobile conversion rate improved from 1.9% to 8.2%, resulting in significantly more qualified leads",
            timeframe: "45 days",
            businessImpact: "The improved mobile experience now generates 4x more qualified leads per month",
            testimonial: "The mobile optimization transformed how we connect with potential clients. Our agents now get higher-quality leads and can respond faster.",
            role: "Maria Santos, Marketing Director",
            metrics: [
                { label: "Mobile Conversion", before: "1.9%", after: "8.2%", improvement: "+332%" },
                { label: "Lead Quality Score", before: "6.2/10", after: "8.7/10", improvement: "+40%" },
                { label: "Time to Response", before: "4.2 hours", after: "1.1 hours", improvement: "-74%" }
            ]
        },
        {
            company: "Xora AI Platform",
            industry: "B2B SaaS",
            logo: "/logoXora.svg",
            challenge: "Despite having excellent technology, users were abandoning the platform due to slow loading times",
            approach: "We conducted a comprehensive performance audit to identify bottlenecks in the user experience",
            solution: "Optimized the platform architecture to deliver faster loading times while maintaining all functionality",
            outcome: "Load time improved from 4.2s to 0.8s, leading to much better user engagement and retention",
            timeframe: "60 days",
            businessImpact: "Users now engage 287% more with the platform, leading to higher conversion rates and customer satisfaction",
            testimonial: "The performance improvements made our platform feel completely different. Users now stay engaged instead of bouncing due to slow loading.",
            role: "Carlos Rodriguez, CTO",
            metrics: [
                { label: "Page Load Time", before: "4.2s", after: "0.8s", improvement: "-81%" },
                { label: "User Engagement", before: "42%", after: "89%", improvement: "+112%" },
                { label: "Trial-to-Paid", before: "12%", after: "31%", improvement: "+158%" }
            ]
        },
        {
            company: "TechFlow Solutions",
            industry: "Consulting Services",
            logo: "/darkIpeLogo.png",
            challenge: "High-quality services weren't being perceived as premium due to inconsistent brand presentation",
            approach: "We analyzed how their expertise was being communicated across all client touchpoints",
            solution: "Aligned their brand presentation with the actual quality and value of their services",
            outcome: "Market positioning improved significantly, enabling premium pricing and attracting higher-value clients",
            timeframe: "90 days",
            businessImpact: "Now consistently wins premium projects and commands 2.3x higher rates than before",
            testimonial: "The brand alignment helped us communicate our true value. Clients now understand why we're worth the premium.",
            role: "Ana Silva, Founder",
            metrics: [
                { label: "Average Project Value", before: "$45k", after: "$103k", improvement: "+129%" },
                { label: "Client Retention", before: "67%", after: "91%", improvement: "+36%" },
                { label: "Referral Rate", before: "23%", after: "56%", improvement: "+143%" }
            ]
        }
    ]

    const nextStory = () => {
        setActiveStory((prev) => (prev + 1) % successStories.length)
    }

    const prevStory = () => {
        setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    }

    const currentStory = successStories[activeStory]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 bg-green-50 rounded-full px-4 py-2 mb-6 border border-green-200"
                    >
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Client Success Stories</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl lg:text-4xl font-light text-slate-900 mb-6"
                    >
                        Real companies, real improvements
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        See how companies like yours have improved their performance and achieved better business outcomes
                    </motion.p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Story Content */}
                        <div>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <Image
                                        src={currentStory.logo}
                                        alt={`${currentStory.company} logo`}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900">{currentStory.company}</h3>
                                    <p className="text-slate-600">{currentStory.industry}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Challenge</h4>
                                    <p className="text-slate-600">{currentStory.challenge}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Our Approach</h4>
                                    <p className="text-slate-600">{currentStory.approach}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Solution</h4>
                                    <p className="text-slate-600">{currentStory.solution}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Outcome</h4>
                                    <p className="text-slate-600">{currentStory.outcome}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 mt-8">
                                <p className="text-slate-700 italic mb-3">"{currentStory.testimonial}"</p>
                                <p className="text-sm text-slate-600">— {currentStory.role}</p>
                            </div>
                        </div>

                        {/* Metrics & Results */}
                        <div>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-semibold text-slate-900">Results Achieved</h4>
                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{currentStory.timeframe}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {currentStory.metrics.map((metric, index) => (
                                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                                                <span className="text-sm font-semibold text-green-600">{metric.improvement}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                                <span>{metric.before}</span>
                                                <span>→</span>
                                                <span className="font-semibold text-slate-900">{metric.after}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <h5 className="text-sm font-semibold text-green-800 mb-1">Business Impact</h5>
                                    <p className="text-green-700">{currentStory.businessImpact}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-12">
                        <button
                            onClick={prevStory}
                            className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span>Previous</span>
                        </button>

                        <div className="flex space-x-2">
                            {successStories.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStory(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === activeStory ? 'bg-blue-500' : 'bg-slate-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextStory}
                            className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
