'use client'

import { motion } from 'framer-motion'
import { Database, Zap, Target, MessageSquare, CreditCard, Rocket, BarChart3, CheckCircle, ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function TechnologyPipelineSection() {
    const pipelineSteps = [
        {
            step: 1,
            title: 'Clay Lead Generation',
            description: '2×25 batches targeting dental clinics & hotels',
            icon: Database,
            detail: 'AI-powered lead scoring targeting Wix/WordPress sites with PSI < 50',
            status: 'Active',
            color: 'blue'
        },
        {
            step: 2,
            title: 'BuiltWith API Analysis',
            description: 'Identify slow sites with high optimization potential',
            icon: Target,
            detail: 'Real-time technology stack analysis and performance profiling',
            status: 'Automated',
            color: 'green'
        },
        {
            step: 3,
            title: 'Lighthouse CI Testing',
            description: 'Local testing to avoid PSI throttling',
            icon: Zap,
            detail: 'Lab-grade performance testing with reliable, consistent metrics',
            status: 'Lab Grade',
            color: 'purple'
        },
        {
            step: 4,
            title: 'n8n Scoring Algorithm',
            description: 'Automated threshold scoring (≥70 points)',
            icon: BarChart3,
            detail: 'Multi-factor scoring: speed, tech stack, business potential',
            status: 'AI Powered',
            color: 'orange'
        },
        {
            step: 5,
            title: 'Multi-channel Outreach',
            description: 'Email → WhatsApp → LinkedIn sequence',
            icon: MessageSquare,
            detail: 'Personalized outreach with performance audit previews',
            status: 'Sequenced',
            color: 'cyan'
        },
        {
            step: 6,
            title: 'BNPL Payment Processing',
            description: 'Stripe/PayPal integration for easy entry',
            icon: CreditCard,
            detail: 'PayPal Pay-in-4 for CA/PT markets, reducing barrier to entry',
            status: 'Integrated',
            color: 'indigo'
        },
        {
            step: 7,
            title: 'Vercel Deployment',
            description: 'Optimized site delivery at global scale',
            icon: Rocket,
            detail: 'Edge deployment with automatic Core Web Vitals optimization',
            status: 'Enterprise',
            color: 'red'
        },
        {
            step: 8,
            title: 'Looker Studio Dashboard',
            description: 'Public ROI tracking and transparent results',
            icon: BarChart3,
            detail: 'Real-time performance monitoring with client-accessible metrics',
            status: 'Live',
            color: 'teal'
        }
    ]

    const kpis = [
        {
            metric: 'Reply Rate Target',
            value: '≥ 15%',
            context: 'CA/PT B2B cold outreach average',
            status: 'on-track'
        },
        {
            metric: 'Call Booking Rate',
            value: '≥ 40%',
            context: 'From replies to Flash Audit calls',
            status: 'exceeding'
        },
        {
            metric: 'Close Rate',
            value: '≥ 30%',
            context: 'From calls to $300 deposit',
            status: 'on-track'
        },
        {
            metric: 'Delivery SLA',
            value: '< 1.4s LCP',
            context: 'Mobile performance guarantee',
            status: 'guaranteed'
        }
    ]

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-500 text-blue-50',
            green: 'bg-green-500 text-green-50',
            purple: 'bg-purple-500 text-purple-50',
            orange: 'bg-orange-500 text-orange-50',
            cyan: 'bg-cyan-500 text-cyan-50',
            indigo: 'bg-indigo-500 text-indigo-50',
            red: 'bg-red-500 text-red-50',
            teal: 'bg-teal-500 text-teal-50'
        }
        return colors[color as keyof typeof colors] || 'bg-gray-500 text-gray-50'
    }

    return (
        <SectionWrapper background="white" spacing="normal" id="pipeline">
            <SectionHeader
                eyebrow="37-Day Execution Pipeline"
                title="Systematic approach to guaranteed results"
                description="Our proven technology stack and process eliminates typical optimization risks"
                align="center"
                size="md"
            />

            {/* KPI Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-4 gap-6 mb-16"
            >
                {kpis.map((kpi, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                {kpi.value}
                            </div>
                            <div className="text-sm font-semibold text-gray-700 mb-2">
                                {kpi.metric}
                            </div>
                            <div className="text-xs text-gray-600 mb-3">
                                {kpi.context}
                            </div>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${kpi.status === 'exceeding' ? 'bg-green-100 text-green-700' :
                                    kpi.status === 'guaranteed' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                }`}>
                                <CheckCircle className="w-3 h-3" />
                                <span>{kpi.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Pipeline Steps */}
            <div className="space-y-8">
                {pipelineSteps.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                    >
                        {/* Content */}
                        <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-xl ${getColorClasses(item.color)} flex items-center justify-center`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        item.status === 'Automated' ? 'bg-blue-100 text-blue-700' :
                                            item.status === 'AI Powered' ? 'bg-purple-100 text-purple-700' :
                                                'bg-gray-100 text-gray-700'
                                    }`}>
                                    {item.status}
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {item.detail}
                            </p>
                        </div>

                        {/* Step Number */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    {item.step}
                                </span>
                            </div>
                        </div>

                        {/* Connector Line */}
                        {index < pipelineSteps.length - 1 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-16 w-0.5 h-8 bg-gray-300" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Results Promise */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center"
            >
                <h3 className="text-3xl font-bold mb-4">
                    Systematic Results, Not Luck
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    This proven pipeline has generated $12K+ in revenue for previous optimization cycles.
                    Your project follows the same systematic approach that guarantees results.
                </p>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white/10 rounded-lg p-6">
                        <div className="text-2xl font-bold text-blue-400 mb-2">37 Days</div>
                        <div className="text-sm text-gray-300">Complete cycle from lead to delivery</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6">
                        <div className="text-2xl font-bold text-green-400 mb-2">10 Clients</div>
                        <div className="text-sm text-gray-300">Target for foundational case studies</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6">
                        <div className="text-2xl font-bold text-purple-400 mb-2">110%</div>
                        <div className="text-sm text-gray-300">Money-back guarantee</div>
                    </div>
                </div>

                <div className="mt-8">
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
                        <span>Join the Current Cycle</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </SectionWrapper>
    )
}
