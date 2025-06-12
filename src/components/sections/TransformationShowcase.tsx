'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, DollarSign, Clock, Users, TrendingUp, Zap, Target } from 'lucide-react'
import Image from 'next/image'

interface CaseStudy {
    id: string
    company: string
    industry: string
    problem: string
    solution: string
    results: {
        metric: string
        value: string
        icon: any
        color: string
    }[]
    testimonial: {
        quote: string
        author: string
        role: string
    }
    image: string
    timeline: string
    investment: string
    roi: string
}

export function TransformationShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const [currentCase, setCurrentCase] = useState(0)

    const caseStudies: CaseStudy[] = [
        {
            id: 'techflow',
            company: 'TechFlow Solutions',
            industry: 'SaaS Platform',
            problem: 'Burning $89K annually on 23 different tools. Development team spending 60% of time on maintenance instead of features.',
            solution: 'Built unified platform consolidating all tools + automated workflows. Modern React/Node architecture.',
            results: [
                { metric: 'Tool Cost Savings', value: '$89K', icon: DollarSign, color: 'text-emerald-400' },
                { metric: 'Development Speed', value: '+340%', icon: Zap, color: 'text-blue-400' },
                { metric: 'Bug Reduction', value: '-92%', icon: Target, color: 'text-purple-400' },
                { metric: 'Team Productivity', value: '+280%', icon: TrendingUp, color: 'text-cyan-400' }
            ],
            testimonial: {
                quote: "We went from tool chaos to digital zen in 6 weeks. The custom platform pays for itself and actually makes work enjoyable.",
                author: "Sarah Chen",
                role: "CTO, TechFlow Solutions"
            },
            image: '/case-thumb-api.png',
            timeline: '6 weeks',
            investment: '$45K',
            roi: '297%'
        },
        {
            id: 'growthx',
            company: 'GrowthX Analytics',
            industry: 'Data Analytics',
            problem: 'Legacy dashboard took 12 seconds to load. Users abandoned 78% of reports. Customer churn at 34%.',
            solution: 'Built lightning-fast analytics platform with real-time data processing and predictive insights.',
            results: [
                { metric: 'Load Time', value: '0.8s', icon: Clock, color: 'text-emerald-400' },
                { metric: 'User Engagement', value: '+520%', icon: Users, color: 'text-blue-400' },
                { metric: 'Customer Retention', value: '+67%', icon: Target, color: 'text-purple-400' },
                { metric: 'Revenue Impact', value: '$1.2M', icon: DollarSign, color: 'text-cyan-400' }
            ],
            testimonial: {
                quote: "Users went from avoiding our dashboard to spending hours exploring data. It's like we launched a completely new product.",
                author: "Marcus Rodriguez",
                role: "CEO, GrowthX Analytics"
            },
            image: '/case-thumb-ipe.png',
            timeline: '4 weeks',
            investment: '$32K',
            roi: '425%'
        },
        {
            id: 'startupx',
            company: 'StartupX Commerce',
            industry: 'E-commerce',
            problem: 'Mobile checkout had 73% abandonment rate. Customer support overwhelmed with 200+ tickets daily about usability.',
            solution: 'Redesigned entire user experience with one-click checkout, smart recommendations, and self-service tools.',
            results: [
                { metric: 'Checkout Conversion', value: '+189%', icon: TrendingUp, color: 'text-emerald-400' },
                { metric: 'Support Tickets', value: '-84%', icon: Target, color: 'text-blue-400' },
                { metric: 'Mobile Revenue', value: '+456%', icon: DollarSign, color: 'text-purple-400' },
                { metric: 'Customer Satisfaction', value: '9.4/10', icon: Users, color: 'text-cyan-400' }
            ],
            testimonial: {
                quote: "Our customers actually thank us for making their lives easier. Revenue exploded, support costs plummeted. Pure magic.",
                author: "Emily Zhang",
                role: "Product Lead, StartupX Commerce"
            },
            image: '/case-thumb-xora.png',
            timeline: '8 weeks',
            investment: '$67K',
            roi: '680%'
        }
    ]

    const nextCase = () => {
        setCurrentCase((prev) => (prev + 1) % caseStudies.length)
    }

    const prevCase = () => {
        setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
    }

    const currentStudy = caseStudies[currentCase]

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-3 bg-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-emerald-400/30 mb-8"
                        whileHover={{ scale: 1.05 }}
                    >
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Transformation Gallery</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Real Companies,{' '}
                        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Real Results
                        </span>
                    </h2>

                    <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                        These companies stopped accepting "that's just how it works" and{' '}
                        <span className="text-emerald-400 font-semibold">revolutionized their entire operation</span>.
                    </p>
                </motion.div>

                {/* Case Study Showcase */}
                <div className="relative">
                    {/* Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex space-x-2">
                            {caseStudies.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentCase(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentCase
                                            ? 'bg-emerald-400 w-8'
                                            : 'bg-slate-600 hover:bg-slate-500'
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            <motion.button
                                onClick={prevCase}
                                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                onClick={nextCase}
                                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Case Study Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStudy.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Content */}
                            <div className="space-y-8">
                                {/* Company Info */}
                                <div>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <h3 className="text-3xl font-bold text-white">{currentStudy.company}</h3>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                                            {currentStudy.industry}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-emerald-400">{currentStudy.timeline}</div>
                                            <div className="text-slate-400 text-sm">Timeline</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-400">{currentStudy.investment}</div>
                                            <div className="text-slate-400 text-sm">Investment</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-400">{currentStudy.roi}</div>
                                            <div className="text-slate-400 text-sm">First Year ROI</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Problem/Solution */}
                                <div className="space-y-4">
                                    <div className="bg-red-500/10 rounded-xl p-6 border border-red-400/20">
                                        <h4 className="text-red-300 font-semibold mb-3 flex items-center">
                                            <div className="w-3 h-3 bg-red-400 rounded-full mr-3" />
                                            The Nightmare
                                        </h4>
                                        <p className="text-slate-300">{currentStudy.problem}</p>
                                    </div>

                                    <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-400/20">
                                        <h4 className="text-emerald-300 font-semibold mb-3 flex items-center">
                                            <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3" />
                                            The Transformation
                                        </h4>
                                        <p className="text-slate-300">{currentStudy.solution}</p>
                                    </div>
                                </div>

                                {/* Results Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {currentStudy.results.map((result, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                                            whileHover={{ scale: 1.05, y: -5 }}
                                        >
                                            <result.icon className={`w-8 h-8 ${result.color} mx-auto mb-2`} />
                                            <div className={`text-2xl font-bold ${result.color} mb-1`}>{result.value}</div>
                                            <div className="text-slate-400 text-sm">{result.metric}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Testimonial */}
                                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20">
                                    <p className="text-lg text-slate-300 italic mb-4">
                                        "{currentStudy.testimonial.quote}"
                                    </p>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                                            {currentStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">{currentStudy.testimonial.author}</div>
                                            <div className="text-slate-400 text-sm">{currentStudy.testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual */}
                            <div className="relative">
                                <motion.div
                                    className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Mock dashboard/interface */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-2">
                                                <div className="w-3 h-3 bg-red-400 rounded-full" />
                                                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                                <div className="w-3 h-3 bg-green-400 rounded-full" />
                                            </div>
                                            <div className="text-slate-400 text-sm">{currentStudy.company} Dashboard</div>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Animated bars representing improvement */}
                                            {currentStudy.results.map((result, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-300">{result.metric}</span>
                                                        <span className={result.color}>{result.value}</span>
                                                    </div>
                                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                                        <motion.div
                                                            className={`h-2 rounded-full bg-gradient-to-r ${result.color.includes('emerald') ? 'from-emerald-500 to-emerald-400' :
                                                                result.color.includes('blue') ? 'from-blue-500 to-blue-400' :
                                                                    result.color.includes('purple') ? 'from-purple-500 to-purple-400' :
                                                                        'from-cyan-500 to-cyan-400'}`}
                                                            initial={{ width: 0 }}
                                                            animate={isInView ? { width: `${85 + index * 5}%` } : { width: 0 }}
                                                            transition={{ duration: 1, delay: index * 0.2 }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Floating metrics */}
                                    <motion.div
                                        className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        {currentStudy.roi} ROI
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <motion.button
                        className="group bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center space-x-3">
                            <span>Start Your Transformation</span>
                            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </motion.button>

                    <p className="text-slate-400 mt-4">
                        Join 50+ companies that chose results over excuses
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
