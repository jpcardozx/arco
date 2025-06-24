'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Download,
    CheckCircle,
    Zap,
    TrendingUp,
    Target,
    Clock,
    DollarSign
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

/**
 * Conversion Accelerator
 * REPLACES: QuickValueSection redundancy with DirectValueProof
 * COMBINES: Value demonstration + resource downloads + clear CTA
 * FOCUSES: Single conversion path without confusion
 */
export function ConversionAccelerator() {
    const [activeTab, setActiveTab] = useState('proof')
    const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set())

    // Real value demonstrations with clear CTAs
    const valueProofs = [
        {
            metric: '4.2s → 1.1s',
            result: '+$240k revenue',
            client: 'IPE Ventures',
            technique: 'React SSR optimization',
            timeframe: '6 weeks'
        },
        {
            metric: '45 → 94 score',
            result: '+67% signups',
            client: 'Xora Platform',
            technique: 'Bundle splitting',
            timeframe: '4 weeks'
        },
        {
            metric: '$12k → $2.6k/month',
            result: '78% cost reduction',
            client: 'SaaS Migration',
            technique: 'AWS optimization',
            timeframe: '3 weeks'
        }
    ]

    // High-value resources for lead generation
    const resources = [
        {
            id: 'technical-assessment',
            title: 'Technical Architecture Assessment',
            description: 'Complete framework used for $50k+ engagements',
            pages: 47,
            difficulty: 'Professional',
            icon: CheckCircle,
            value: 'Same process we use internally'
        },
        {
            id: 'performance-case-study',
            title: 'Performance Optimization Case Study',
            description: 'Real before/after: 4.2s → 1.8s, +127% conversion',
            pages: 12,
            difficulty: 'Technical',
            icon: TrendingUp,
            value: 'Production code examples included'
        },
        {
            id: 'infrastructure-guide',
            title: 'Infrastructure Cost Optimization',
            description: 'Step-by-step AWS cost reduction methodology',
            pages: 24,
            difficulty: 'Advanced',
            icon: Target,
            value: 'Tested on 50+ deployments'
        }
    ]

    const handleDownload = (resource: typeof resources[0]) => {
        trackEvent({
            event: 'resource_download',
            category: 'conversion',
            action: 'download_lead_magnet',
            label: resource.id
        })

        trackFunnelStep('resource_download', 'conversion_funnel', {
            resource: resource.id,
            difficulty: resource.difficulty
        })

        setDownloadedItems(prev => new Set([...prev, resource.id]))

        // Trigger email capture modal for gated content
        console.log(`Initiating download: ${resource.title}`)
    }

    const handleConsultationCTA = () => {
        trackEvent({
            event: 'consultation_request',
            category: 'conversion',
            action: 'primary_cta_click',
            label: 'conversion_accelerator'
        })

        trackFunnelStep('consultation_request', 'conversion_funnel', {
            source: 'conversion_accelerator',
            trigger: 'primary_cta'
        })

        // Redirect to consultation booking
        window.location.href = '/consultation'
    }

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        className="text-4xl font-bold text-slate-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        See Real Results First
                    </motion.h2>
                    <motion.p
                        className="text-xl text-slate-600 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Don't take our word for it. Review real case studies and technical methodologies
                        before making any commitment.
                    </motion.p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-xl shadow-lg">
                        <button
                            onClick={() => setActiveTab('proof')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'proof'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            Case Studies
                        </button>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'resources'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            Technical Resources
                        </button>
                    </div>
                </div>

                {/* Case Studies Tab */}
                {activeTab === 'proof' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-3 gap-8 mb-12"
                    >
                        {valueProofs.map((proof, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="mb-6">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        {proof.metric}
                                    </div>
                                    <div className="text-xl font-semibold text-green-600 mb-4">
                                        {proof.result}
                                    </div>
                                    <div className="text-sm text-slate-500 space-y-1">
                                        <div>Client: {proof.client}</div>
                                        <div>Method: {proof.technique}</div>
                                        <div>Timeline: {proof.timeframe}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-3 gap-8 mb-12"
                    >
                        {resources.map((resource, index) => {
                            const IconComponent = resource.icon
                            const isDownloaded = downloadedItems.has(resource.id)

                            return (
                                <motion.div
                                    key={resource.id}
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <IconComponent className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">
                                                {resource.title}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {resource.pages} pages • {resource.difficulty}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 mb-4">
                                        {resource.description}
                                    </p>

                                    <div className="text-sm text-blue-600 font-medium mb-6">
                                        ✓ {resource.value}
                                    </div>

                                    <button
                                        onClick={() => handleDownload(resource)}
                                        disabled={isDownloaded}
                                        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-all ${isDownloaded
                                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                                            }`}
                                    >
                                        {isDownloaded ? (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Downloaded
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-5 h-5" />
                                                Download Free
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}

                {/* Primary CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready for Your Technical Assessment?
                        </h3>
                        <p className="text-blue-100 mb-6">
                            Get a detailed technical analysis of your current setup with specific
                            optimization recommendations and ROI projections.
                        </p>
                        <button
                            onClick={handleConsultationCTA}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                            Schedule Technical Consultation
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <div className="text-sm text-blue-200 mt-3">
                            No commitment • 45-minute technical review • Specific recommendations
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
