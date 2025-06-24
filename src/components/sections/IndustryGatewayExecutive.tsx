'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingCart,
    Briefcase,
    BarChart3,
    Building2,
    ArrowRight,
    TrendingUp,
    Zap,
    CheckCircle,
    Target
} from 'lucide-react'

interface Industry {
    id: string
    name: string
    icon: React.ComponentType<{ className?: string }>
    shortDescription: string
    keyMetric: string
    improvement: string
    timeframe: string
    highlights: string[]
    caseExample: {
        company: string
        result: string
        impact: string
    }
}

/**
 * Executive Industry Gateway - Simplified & Conversion-Focused
 * Eliminates cognitive overload while maintaining professional credibility
 */
export function IndustryGateway() {
    const [selectedIndustry, setSelectedIndustry] = useState<string>('ecommerce')

    const industries: Industry[] = [{
        id: 'ecommerce',
        name: 'E-commerce & Retail',
        icon: ShoppingCart,
        shortDescription: 'Transform browsers into buyers with conversion-optimized experiences that maximize every visitor opportunity',
        keyMetric: 'Conversion Rate',
        improvement: '+142% average increase',
        timeframe: '3-5 weeks',
        highlights: [
            'Mobile-first checkout optimization',
            'AI-powered product recommendation engines',
            'Cart abandonment recovery automation',
            'Personalized user experience flows',
            'Revenue-focused A/B testing frameworks'
        ],
        caseExample: {
            company: 'Premium Fashion Retailer',
            result: '+$2.3M annual revenue + 85% mobile conversion boost',
            impact: '300% ROI achieved within 6 months'
        }
    },
    {
        id: 'saas',
        name: 'SaaS & Technology',
        icon: Briefcase,
        shortDescription: 'Accelerate growth with data-driven user acquisition and retention',
        keyMetric: 'Customer LTV',
        improvement: '+210% average increase',
        timeframe: '4-6 weeks',
        highlights: [
            'Onboarding flow optimization',
            'Feature adoption analytics',
            'Churn prediction systems'
        ],
        caseExample: {
            company: 'B2B SaaS Platform',
            result: '90% churn reduction',
            impact: '$1.8M ARR increase'
        }
    },
    {
        id: 'fintech',
        name: 'Financial Services',
        icon: BarChart3,
        shortDescription: 'Build trust and compliance while optimizing user acquisition',
        keyMetric: 'Application Completion',
        improvement: '+185% average increase',
        timeframe: '6-8 weeks',
        highlights: [
            'Regulatory compliance automation',
            'Trust signal optimization',
            'Friction-free verification flows'
        ],
        caseExample: {
            company: 'Digital Bank',
            result: '65% faster onboarding',
            impact: '$5.2M cost savings'
        }
    }, {
        id: 'enterprise',
        name: 'Enterprise B2B',
        icon: Building2,
        shortDescription: 'Accelerate complex sales cycles with executive-focused conversion experiences that speak to C-level decision makers',
        keyMetric: 'Lead Quality Score',
        improvement: '+240% average increase',
        timeframe: '4-7 weeks',
        highlights: [
            'Executive decision-maker journey optimization',
            'Technical stakeholder resource centers',
            'Procurement-friendly workflow automation',
            'Multi-touchpoint attribution analysis',
            'Sales enablement integration systems'
        ],
        caseExample: {
            company: 'Enterprise Software Leader',
            result: '40% shorter sales cycle + 180% lead quality improvement',
            impact: '$12M pipeline acceleration within 6 months'
        }
    }
    ]

    const selectedData = industries.find(industry => industry.id === selectedIndustry)

    return (<section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
                >
                    Proven Results Across Industries
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-slate-600 max-w-3xl mx-auto"
                >
                    We understand your industry's unique challenges and have the track record to prove it
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Industry Selector */}
                <div className="lg:col-span-2 space-y-4">
                    {industries.map((industry, index) => {
                        const Icon = industry.icon
                        const isSelected = selectedIndustry === industry.id

                        return (
                            <motion.button
                                key={industry.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedIndustry(industry.id)}
                                className={`w-full p-6 rounded-xl text-left transition-all duration-300 border-2 group hover:shadow-lg ${isSelected
                                    ? 'bg-blue-50 border-blue-200 shadow-lg'
                                    : 'bg-white border-slate-200 hover:border-blue-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon className={`w-8 h-8 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                                    <div className="flex-1">
                                        <div className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                                            {industry.name}
                                        </div>
                                        <div className={`text-sm mt-1 ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>
                                            {industry.keyMetric}: {industry.improvement}
                                        </div>
                                    </div>
                                    <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-blue-600' : 'text-slate-400'
                                        }`} />
                                </div>
                            </motion.button>
                        )
                    })}
                </div>                    {/* Industry Details */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {selectedData && (
                            <motion.div
                                key={selectedData.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200"
                            >
                                {/* Overview */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{selectedData.name}</h3>
                                    <p className="text-slate-700 leading-relaxed mb-6">
                                        {selectedData.shortDescription}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                                            <TrendingUp className="w-6 h-6 text-green-600" />
                                            <div>
                                                <div className="text-sm font-medium text-green-800">{selectedData.keyMetric}</div>
                                                <div className="text-lg font-bold text-green-900">{selectedData.improvement}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                            <Zap className="w-6 h-6 text-blue-600" />
                                            <div>
                                                <div className="text-sm font-medium text-blue-800">Timeline</div>
                                                <div className="text-lg font-bold text-blue-900">{selectedData.timeframe}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                {/* Key Highlights */}
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold text-slate-900 mb-6">Key Capabilities & Expertise</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedData.highlights.map((highlight, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-700 font-medium">{highlight}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>                                {/* Case Example */}
                                <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                        <Target className="w-5 h-5 text-blue-600" />
                                        Recent Success Story
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="font-semibold text-slate-800 text-lg">{selectedData.caseExample.company}</div>
                                        <div className="text-xl font-bold text-blue-700 bg-white/70 rounded-lg px-4 py-2 inline-block">
                                            {selectedData.caseExample.result}
                                        </div>
                                        <div className="text-sm text-slate-600 font-medium bg-white/50 rounded-lg px-3 py-2 inline-block">
                                            💡 {selectedData.caseExample.impact}
                                        </div>
                                    </div>
                                </div>                                {/* CTA */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
                                >
                                    <span>Get Industry-Specific Analysis</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </section>
    )
}
