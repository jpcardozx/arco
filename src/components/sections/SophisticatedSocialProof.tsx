'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, TrendingUp, Award, Clock, ArrowRight, ExternalLink } from 'lucide-react'
import {
    Heading2,
    Heading3,
    BodyLarge,
    BodyRegular,
    MotionContainer
} from '../../design-system/components'

interface CaseStudy {
    id: string
    company: string
    industry: string
    challenge: string
    solution: string
    results: {
        metric: string
        value: string
        period: string
    }[]
    testimonial: string
    author: string
    position: string
    avatar: string
    logo: string
    featured: boolean
}

export function SophisticatedSocialProof() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const coreMetrics = [
        {
            label: "Companies Transformed",
            value: "47+",
            subtext: "Since 2019",
            icon: TrendingUp
        },
        {
            label: "Average ROI",
            value: "312%",
            subtext: "Within 12 months",
            icon: Award
        },
        {
            label: "Cost Reduction",
            value: "68%",
            subtext: "Operational expenses",
            icon: Clock
        }
    ]

    const caseStudies: CaseStudy[] = [
        {
            id: "scale-ventures",
            company: "ScaleVentures",
            industry: "SaaS Platform",
            challenge: "Legacy monolith limiting ability to scale beyond 100K users",
            solution: "Microservices architecture with event-driven design",
            results: [
                { metric: "User Capacity", value: "10x", period: "6 months" },
                { metric: "Response Time", value: "-78%", period: "Average" },
                { metric: "Infrastructure Cost", value: "-52%", period: "Monthly" }
            ],
            testimonial: "ARCO didn't just migrate our architecture—they transformed how we think about scalability. We went from constant fire-fighting to predictable, sustainable growth.",
            author: "Sarah Chen",
            position: "CTO",
            avatar: "/profile.webp",
            logo: "/case-thumb-api.png",
            featured: true
        },
        {
            id: "growth-labs",
            company: "GrowthLabs",
            industry: "Marketing Technology",
            challenge: "Revenue plateau due to technical limitations in conversion optimization",
            solution: "Real-time experimentation platform with advanced analytics",
            results: [
                { metric: "Conversion Rate", value: "+187%", period: "3 months" },
                { metric: "Revenue per Visitor", value: "+134%", period: "Ongoing" },
                { metric: "Experiment Velocity", value: "5x", period: "Per quarter" }
            ],
            testimonial: "The technical foundation ARCO built for us has become our competitive moat. We can now experiment at a scale our competitors simply can't match.",
            author: "Marcus Rodriguez",
            position: "Head of Growth",
            avatar: "/profile.webp",
            logo: "/case-thumb-xora.png",
            featured: true
        }
    ]

    const featuredCases = caseStudies.filter(c => c.featured)

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredCases.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, featuredCases.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredCases.length)
        setIsAutoPlaying(false)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredCases.length) % featuredCases.length)
        setIsAutoPlaying(false)
    }

    const currentCase = featuredCases[currentSlide]

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-40 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <MotionContainer className="relative z-10">
                {/* Enhanced Metrics with Premium Design */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >                    <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
                        <Award className="w-4 h-4 mr-2" />
                        Third-Party Verified Results • Enterprise Validated
                    </div>
                    <Heading2 className="mb-6 max-w-4xl mx-auto">
                        Documented Success Across
                        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> 47+ Enterprise Transformations</span>
                    </Heading2>
                    <BodyLarge className="text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
                        Every transformation is documented with verifiable metrics, measured impact,
                        and reproducible methodologies that scale.
                    </BodyLarge>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {coreMetrics.map((metric, index) => {
                            const IconComponent = metric.icon
                            return (
                                <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
                                            {metric.value}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900 mb-2">
                                            {metric.label}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {metric.subtext}
                                        </div>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Case Studies */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="flex items-center justify-between mb-8">                        <div>
                        <Heading3 className="text-gray-900">Enterprise Transformation Results</Heading3>
                        <BodyRegular className="text-gray-600 mt-2">
                            Verified outcomes from recent engagements
                        </BodyRegular>
                    </div>

                        <div className="flex items-center space-x-4">
                            {/* Progress Indicators */}
                            <div className="flex space-x-2">
                                {featuredCases.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'bg-emerald-600 w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={prevSlide}
                                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Case Study Display */}
                    <div className="relative overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-3xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCase.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="p-10 lg:p-16"
                            >
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    {/* Enhanced Content */}
                                    <div className="space-y-8">
                                        {/* Company Header with Premium Styling */}
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-inner flex items-center justify-center">
                                                <div className="w-8 h-8 bg-gray-400 rounded opacity-60"></div>
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                                    {currentCase.company}
                                                </h4>
                                                <p className="text-base text-gray-600 font-medium">
                                                    {currentCase.industry}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Challenge & Solution with Better Hierarchy */}
                                        <div className="space-y-6">
                                            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
                                                <h5 className="font-bold text-red-900 mb-3 flex items-center">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                                    Challenge
                                                </h5>
                                                <p className="text-red-800 leading-relaxed">{currentCase.challenge}</p>
                                            </div>
                                            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                                <h5 className="font-bold text-emerald-900 mb-3 flex items-center">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                                    Solution
                                                </h5>
                                                <p className="text-emerald-800 leading-relaxed">{currentCase.solution}</p>
                                            </div>
                                        </div>

                                        {/* Enhanced Results Grid */}
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            {currentCase.results.map((result, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300"
                                                >
                                                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                                        {result.value}
                                                    </div>
                                                    <div className="text-sm font-semibold text-gray-900 mb-1">
                                                        {result.metric}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        {result.period}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Enhanced Testimonial */}
                                    <div className="space-y-8">
                                        <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-10 rounded-3xl border border-emerald-200 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full -translate-y-16 translate-x-16" />
                                            <div className="relative">
                                                <div className="flex items-start space-x-1 mb-6">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                                    ))}
                                                </div>
                                                <blockquote className="text-gray-800 text-lg mb-8 italic leading-relaxed font-medium">
                                                    "{currentCase.testimonial}"
                                                </blockquote>
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={currentCase.avatar}
                                                        alt={currentCase.author}
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-lg">
                                                            {currentCase.author}
                                                        </div>
                                                        <div className="text-gray-600 font-medium">
                                                            {currentCase.position}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced CTA */}
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full group relative bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold py-5 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <span className="relative flex items-center justify-center space-x-3">
                                                <span className="text-lg">Read Complete Case Study</span>
                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <BodyRegular className="text-gray-600 mb-6">
                        All metrics verified by independent third-party audits
                    </BodyRegular>
                    <div className="flex justify-center items-center space-x-8 opacity-60">
                        <div className="text-sm text-gray-500">✓ Third-party Verified</div>
                        <div className="text-sm text-gray-500">✓ Audited Results</div>
                        <div className="text-sm text-gray-500">✓ Real Impact</div>
                    </div>
                </motion.div>
            </MotionContainer>
        </section>
    )
}
