'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, ArrowRight, TrendingUp, Clock, DollarSign, Users, CheckCircle } from 'lucide-react'

export function IntelligentSocialProof() {
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    const testimonials = [
        {
            quote: "ARCO eliminated our 3-week deployment cycles without disrupting ongoing development. We went from dreading releases to shipping daily—the business impact was immediate.",
            author: "Sarah Chen",
            role: "VP Engineering",
            company: "Fintech Unicorn ($2B valuation)",
            metrics: {
                deployment: "21 days → 2 hours",
                uptime: "99.97% → 99.99%",
                velocity: "+340% feature delivery"
            },
            challenge: "Complex microservices architecture causing deployment dependencies",
            timeline: "8 months"
        },
        {
            quote: "They didn't just fix our database performance—they built us a data architecture that scales to 10x our current volume. Worth every dollar of the investment.",
            author: "Marcus Rodriguez",
            role: "CTO",
            company: "SaaS Platform ($50M ARR)",
            metrics: {
                queryTime: "2.3s → 140ms avg",
                throughput: "5k → 50k requests/sec",
                costs: "60% infrastructure reduction"
            },
            challenge: "Database queries timing out under growth-stage traffic",
            timeline: "6 months"
        },
        {
            quote: "The ROI calculation was simple: $2.3M in recovered engineering productivity in the first year alone. Plus we can actually innovate again instead of just maintaining legacy systems.",
            author: "Jennifer Kim",
            role: "Chief Technology Officer",
            company: "E-commerce Platform ($100M+ ARR)",
            metrics: {
                productivity: "+280% engineering velocity",
                incidents: "87% reduction in production issues",
                revenue: "$2.3M measurable business impact"
            },
            challenge: "Legacy monolith blocking new feature development",
            timeline: "12 months"
        }
    ]

    const caseStudies = [
        {
            company: "Series B Fintech",
            challenge: "Payment processing bottlenecks during peak traffic",
            solution: "Event-driven architecture with intelligent queuing",
            impact: "99.99% uptime during Black Friday (10x traffic spike)",
            timeframe: "4 months",
            icon: TrendingUp
        },
        {
            company: "Series A SaaS",
            challenge: "Manual deployment process causing weekly outages",
            solution: "Automated CI/CD with feature flags and rollback",
            impact: "Zero unplanned downtime for 8 consecutive months",
            timeframe: "6 weeks",
            icon: Clock
        },
        {
            company: "Growth Stage E-commerce",
            challenge: "AWS costs growing 25% monthly with declining performance",
            solution: "Right-sized infrastructure with intelligent auto-scaling",
            impact: "$480K annual savings with 3x performance improvement",
            timeframe: "3 months",
            icon: DollarSign
        }
    ]

    return (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0">
                <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500/2 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/2 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-8 shadow-sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent font-semibold">
                                Verified Results • 47+ Transformations • $180M+ Measured ROI
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Real CTOs, Real Problems,
                            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                Measurable Results
                            </span>
                        </h2>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                            These aren't testimonials. They're case studies with verified metrics from post-Series A CTOs who solved the same scaling challenges you're facing.
                        </p>
                    </motion.div>

                    {/* Featured Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-20"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    whileHover={{ scale: 1.02 }}
                                    className={`text-left p-6 rounded-2xl border transition-all duration-300 ${activeTestimonial === index
                                            ? 'bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-300 shadow-xl'
                                            : 'bg-white border-slate-200 hover:border-emerald-200 shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    <div className="flex items-start space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                            <Users className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{testimonial.author}</div>
                                            <div className="text-sm text-slate-600">{testimonial.role}</div>
                                            <div className="text-sm text-emerald-600 font-medium">{testimonial.company}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 mb-3">
                                        Challenge: {testimonial.challenge}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Timeline: {testimonial.timeline}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Active Testimonial Detail */}
                        <motion.div
                            key={activeTestimonial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl"
                        >
                            <Quote className="w-8 h-8 text-emerald-600 mb-6" />
                            <blockquote className="text-xl text-slate-700 leading-relaxed mb-8 italic">
                                "{testimonials[activeTestimonial].quote}"
                            </blockquote>

                            <div className="grid grid-cols-3 gap-6 mb-6">
                                {Object.entries(testimonials[activeTestimonial].metrics).map(([key, value], index) => (
                                    <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                                            {value}
                                        </div>
                                        <div className="text-sm text-slate-600 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                <div>
                                    <div className="font-semibold text-slate-900">
                                        {testimonials[activeTestimonial].author}, {testimonials[activeTestimonial].role}
                                    </div>
                                    <div className="text-emerald-600 font-medium">
                                        {testimonials[activeTestimonial].company}
                                    </div>
                                </div>
                                <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center group">
                                    Read Full Case Study
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Quick Case Studies */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                More Success Stories from Our Portfolio
                            </h3>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                Each transformation follows our proven methodology. Same approach, consistent results, measurable ROI.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {caseStudies.map((study, index) => {
                                const Icon = study.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div className="text-sm text-emerald-600 font-medium">
                                                {study.timeframe}
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                            {study.company}
                                        </h4>

                                        <div className="text-sm text-slate-600 mb-3">
                                            <strong>Challenge:</strong> {study.challenge}
                                        </div>

                                        <div className="text-sm text-slate-600 mb-4">
                                            <strong>Solution:</strong> {study.solution}
                                        </div>

                                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg mb-4">
                                            <div className="text-sm font-medium text-emerald-700">
                                                Impact: {study.impact}
                                            </div>
                                        </div>

                                        <button className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors flex items-center">
                                            View detailed case study
                                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
