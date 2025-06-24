'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Zap,
    Download,
    CheckCircle,
    ArrowRight,
    Timer,
    Target,
    TrendingUp
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

/**
 * Quick Value Section - Oferece valor imediato para incrementar engajamento
 * 
 * - Performance audit checklist
 * - ROI calculation template  
 * - Web vitals benchmark data
 * - React optimization guide
 */
export function QuickValueSection() {
    const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set())

    const quickWins = [
        {
            id: 'technical-architecture-framework',
            title: 'Technical Architecture Assessment Framework',
            description: 'Comprehensive 47-page guide used by our engineers for React stack evaluation',
            downloadSize: '47 pages PDF',
            estimatedTime: '90 min',
            difficulty: 'Professional',
            icon: <CheckCircle className="w-6 h-6" />,
            value: 'Same framework we use for $50k+ engagements',
            color: 'from-green-500 to-emerald-600'
        },
        {
            id: 'shopify-case-study',
            title: 'Shopify Plus Optimization Case Study',
            description: 'Detailed technical analysis: 4.2s → 1.8s LCP, +127% conversion, $340k revenue',
            downloadSize: '12 pages PDF',
            estimatedTime: '25 min',
            difficulty: 'Technical',
            icon: <TrendingUp className="w-6 h-6" />,
            value: 'Real before/after code examples and architecture',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            id: 'aws-cost-optimization',
            title: 'AWS Infrastructure Cost Analysis',
            description: 'SaaS migration case: $12k/month → $2.6k/month (78% reduction) methodology',
            downloadSize: '8 pages PDF',
            estimatedTime: '20 min',
            difficulty: 'Technical',
            icon: <Target className="w-6 h-6" />,
            value: 'Step-by-step infrastructure optimization process',
            color: 'from-purple-500 to-violet-600'
        },
        {
            id: 'core-web-vitals-engineering',
            title: 'Core Web Vitals Engineering Guide',
            description: 'Technical implementation guide with actual code from production optimizations',
            downloadSize: '24 pages PDF',
            estimatedTime: '60 min',
            difficulty: 'Advanced',
            icon: <Zap className="w-6 h-6" />,
            value: 'Production-tested optimization techniques',
            color: 'from-orange-500 to-red-600'
        }
    ]

    const handleDownload = (item: typeof quickWins[0]) => {
        // Track download event
        trackEvent({
            event: 'resource_download',
            category: 'engagement',
            action: 'download_resource',
            label: item.id,
            custom_parameters: {
                resource_type: item.id,
                difficulty: item.difficulty
            }
        })

        // Track funnel step
        trackFunnelStep('resource_download', 'engagement_funnel', {
            resource: item.id,
            title: item.title,
            difficulty: item.difficulty
        })

        // Mark as downloaded
        setDownloadedItems(prev => new Set([...prev, item.id]))

        // Simulate download (in real app, would trigger actual download)
        console.log(`Downloading: ${item.title}`)

        // Could trigger email capture here for gated content
        // showEmailCapture(item.id)
    }

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-white" data-section="quick-value">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border bg-primary-50 text-primary-700 border-primary-200 mb-6">
                        <Zap className="w-4 h-4" />
                        Valor Imediato
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        Recursos <span className="text-gradient">Gratuitos</span>
                    </h2>

                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Ferramentas e guias práticos para começar a otimizar sua performance hoje mesmo.
                        <strong className="text-neutral-800"> Download imediato, sem cadastro.</strong>
                    </p>
                </motion.div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {quickWins.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            {/* Gradient accent */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />

                            <div className="p-8">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}>
                                        {item.icon}
                                    </div>

                                    {downloadedItems.has(item.id) && (
                                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                            <CheckCircle className="w-4 h-4" />
                                            Baixado
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-600 mb-4">
                                    {item.description}
                                </p>

                                {/* Value proposition */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-medium text-gray-900">
                                        💡 {item.value}
                                    </p>
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Download className="w-4 h-4" />
                                        {item.downloadSize}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Timer className="w-4 h-4" />
                                        {item.estimatedTime}
                                    </div>
                                    <div className={`px-2 py-1 rounded text-xs font-medium ${item.difficulty === 'Básico'
                                        ? 'bg-green-100 text-green-700'
                                        : item.difficulty === 'Intermediário'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {item.difficulty}
                                    </div>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => handleDownload(item)}
                                    disabled={downloadedItems.has(item.id)}
                                    className={`w-full btn group-hover:scale-105 transition-transform ${downloadedItems.has(item.id)
                                        ? 'btn-outline opacity-75 cursor-not-allowed'
                                        : 'btn-primary'
                                        }`}
                                >
                                    {downloadedItems.has(item.id) ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Baixado
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5" />
                                            Download Gratuito
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-100">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                            Precisa de implementação personalizada?
                        </h3>
                        <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                            Nossa equipe pode implementar essas otimizações no seu projeto,
                            com garantia de resultados e ROI mensurável.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                trackEvent({
                                    event: 'quick_value_cta',
                                    category: 'conversion',
                                    action: 'implementation_cta',
                                    label: 'quick_value_section'
                                })

                                // Scroll to contact
                                const contactSection = document.querySelector('[data-section="contact"]')
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' })
                                }
                            }}
                        >
                            <Target className="w-5 h-5" />
                            Falar com Especialista
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
