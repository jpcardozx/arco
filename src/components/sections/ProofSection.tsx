'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, ExternalLink, Award, Zap, Target, BarChart3 } from 'lucide-react'

export function ProofSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [activeCase, setActiveCase] = useState(0);

    const caseStudies = [
        {
            company: "Enterprise SaaS Platform",
            industry: "Technology",
            segment: "Series B Startup",
            challenge: "Conversion bottlenecks limiting growth potential and extended customer acquisition cycles",
            solution: "Performance optimization, conversion funnel redesign, and enterprise UX enhancement",
            results: [
                { metric: "Trial-to-Paid Conversion", before: "1.2%", after: "4.8%", improvement: "+300%" },
                { metric: "Sales Cycle Duration", before: "180 days", after: "85 days", improvement: "-53%" },
                { metric: "Annual Recurring Revenue", before: "$2.1M", after: "$8.4M", improvement: "+300%" }
            ],
            timeframe: "6 months",
            testimonial: "ARCO's strategic approach transformed our entire digital ecosystem. The ROI exceeded every projection.",
            author: "Michael Chen, CEO & Founder",
            businessValue: "$6.3M incremental ARR",
            icon: BarChart3
        },
        {
            company: "Global Management Consultancy",
            industry: "Professional Services",
            segment: "Fortune 500 Advisory",
            challenge: "Over-reliance on referral networks limiting scalable lead generation capabilities",
            solution: "Thought leadership platform, technical SEO excellence, and relationship intelligence systems",
            results: [
                { metric: "Qualified Lead Flow", before: "15/month", after: "180/month", improvement: "+1100%" },
                { metric: "Client Acquisition Cost", before: "$450", after: "$85", improvement: "-81%" },
                { metric: "Active Pipeline Value", before: "$800K", after: "$3.2M", improvement: "+300%" }
            ],
            timeframe: "8 months",
            testimonial: "We achieved complete independence from referral dependency with a predictable, scalable growth engine.",
            author: "Sarah Mitchell, Managing Partner",
            businessValue: "$2.4M incremental pipeline",
            icon: Target
        },
        {
            company: "Industrial Solutions Leader",
            industry: "Manufacturing",
            segment: "B2B Enterprise",
            challenge: "Minimal digital presence creating competitive disadvantage against digitally-native competitors",
            solution: "Complete digital transformation, enterprise platform development, and performance infrastructure",
            results: [
                { metric: "Market Visibility Score", before: "0%", after: "67%", improvement: "Complete presence" },
                { metric: "Digital Lead Generation", before: "0/month", after: "95/month", improvement: "New channel" },
                { metric: "Market Share Position", before: "12%", after: "28%", improvement: "+133%" }
            ],
            timeframe: "12 months",
            testimonial: "The digital transformation positioned us as the market leader in our category.",
            author: "David Rodriguez, Chief Commercial Officer",
            businessValue: "$4.8M incremental market capture",
            icon: Zap
        }
    ]

    const aggregateStats = [
        { value: "$50M+", label: "Client Value Generated", icon: DollarSign, gradient: "from-emerald-500 to-teal-600" },
        { value: "150+", label: "Enterprises Transformed", icon: Users, gradient: "from-blue-500 to-indigo-600" }, { value: "340%", label: "Average Performance Increase", icon: TrendingUp, gradient: "from-purple-500 to-pink-600" },
        { value: "4.2 months", label: "Average Time to ROI", icon: Clock, gradient: "from-orange-500 to-red-600" }
    ]

    return (
        <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Premium background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/20" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-emerald-400/10 via-transparent to-emerald-400/10" />
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />
                <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-xl" />
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold mb-8 backdrop-blur-sm">
                            <Award className="w-4 h-4 mr-2" />
                            Validated Excellence
                        </div>                        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                            Executive-Level
                            <br />
                            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                Success Portfolio
                            </span>
                        </h2>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Fortune 500 companies and high-growth enterprises that achieved extraordinary transformation
                            through our strategic digital excellence framework.
                        </p>
                    </motion.div>

                    {/* Premium Aggregate Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                    >
                        {aggregateStats.map((stat, index) => {
                            const Icon = stat.icon
                            return (<motion.div
                                key={index}
                                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            >
                                {/* Premium background glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`} />

                                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
                                <div className="text-sm font-medium text-slate-300 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                            )
                        })}
                    </motion.div>                    {/* Premium Case Study Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-12"
                    >
                        <div className="flex flex-wrap justify-center gap-4">
                            {caseStudies.map((study, index) => {
                                const Icon = study.icon
                                return (<button
                                    key={index}
                                    onClick={() => setActiveCase(index)}
                                    className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 ${activeCase === index
                                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-2xl scale-105'
                                        : 'bg-white/5 backdrop-blur-sm text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 transition-colors duration-300 ${activeCase === index ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                                        }`} />
                                    <span>{study.industry}</span>
                                    {activeCase === index && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl -z-10"
                                            transition={{ type: "spring", duration: 0.6 }}
                                        />
                                    )}
                                </button>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Premium Active Case Study */}
                    <motion.div
                        key={activeCase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden"
                    >
                        {/* Premium background glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />

                        <div className="relative grid lg:grid-cols-2 gap-16 items-start">

                            {/* Case Details */}
                            <div>
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-3">{caseStudies[activeCase].company}</h3>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                                                {caseStudies[activeCase].industry}
                                            </span>                                            <span className="bg-white/10 text-slate-300 px-4 py-2 rounded-full text-sm font-medium">
                                                {caseStudies[activeCase].segment}
                                            </span>
                                        </div>
                                        <div className="text-emerald-400 font-semibold text-lg">{caseStudies[activeCase].businessValue}</div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="group">
                                        <h4 className="font-bold text-white mb-3 text-lg flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg mr-3 flex items-center justify-center">
                                                <Target className="w-4 h-4 text-white" />
                                            </div>
                                            Business Challenge
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed pl-11">{caseStudies[activeCase].challenge}</p>
                                    </div>

                                    <div className="group">
                                        <h4 className="font-bold text-white mb-3 text-lg flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>
                                            Strategic Solution
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed pl-11">{caseStudies[activeCase].solution}</p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                        <blockquote className="text-slate-300 italic text-lg mb-4 leading-relaxed">
                                            "{caseStudies[activeCase].testimonial}"
                                        </blockquote>
                                        <cite className="text-emerald-400 font-semibold text-lg flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mr-3 flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">{caseStudies[activeCase].author.split(' ')[0][0]}</span>
                                            </div>
                                            {caseStudies[activeCase].author}
                                        </cite>
                                    </div>
                                </div>
                            </div>

                            {/* Premium Results Grid */}
                            <div>                                <div className="flex items-center justify-between mb-8">
                                <h4 className="text-2xl font-bold text-white flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg mr-3 flex items-center justify-center">
                                        <BarChart3 className="w-4 h-4 text-white" />
                                    </div>
                                    Performance Results
                                </h4>                                    <span className="bg-white/10 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                                    Achieved in {caseStudies[activeCase].timeframe}
                                </span>
                            </div>

                                <div className="space-y-5">
                                    {caseStudies[activeCase].results.map((result, index) => (
                                        <motion.div
                                            key={index}
                                            className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <div className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">{result.metric}</div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-slate-400 font-medium">{result.before}</span>
                                                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors duration-300" />
                                                    <span className="font-bold text-white text-lg">{result.after}</span>
                                                </div>
                                                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-2 rounded-xl text-sm font-bold border border-emerald-500/30">
                                                    {result.improvement}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>                    {/* Premium Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-20"
                    >
                        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white overflow-hidden">
                            {/* Premium background effects */}
                            <div className="absolute inset-0">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
                            </div>

                            <div className="relative text-center">
                                <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-semibold mb-8">
                                    <Target className="w-4 h-4 mr-2" />
                                    Executive Strategy Session
                                </div>

                                <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                    Your Enterprise Could Be the
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Next Success Story
                                    </span>
                                </h3>

                                <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                                    Schedule a confidential strategic session to discover how we can architect
                                    your competitive advantage and accelerate measurable growth.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <button className="group relative bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-2xl flex items-center justify-center hover:scale-105 hover:shadow-emerald-500/25">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative flex items-center">
                                            Schedule Executive Consultation
                                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </button>
                                    <button className="group border-2 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-slate-800/50 flex items-center justify-center backdrop-blur-sm">
                                        <span className="flex items-center">
                                            View Complete Portfolio
                                            <ExternalLink className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                        </span>
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-slate-400">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        60-minute session
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="w-4 h-4 mr-2" />
                                        Enterprise-focused
                                    </div>
                                    <div className="flex items-center">
                                        <Target className="w-4 h-4 mr-2" />
                                        Confidential analysis
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
