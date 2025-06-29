'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronDown,
    ChevronRight,
    Clock,
    Users,
    Zap,
    Shield,
    CheckCircle,
    ArrowRight,
    Play
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

interface ContentLayer {
    id: string
    level: number
    title: string
    content: React.ReactNode
    timeToReveal: number // seconds
    triggerType: 'time' | 'scroll' | 'interaction'
    revealed: boolean
}

/**
 * Progressive Information Architecture
 * Reduces cognitive load by revealing information based on engagement
 */
export function ProgressiveDisclosure() {
    const [currentLayer, setCurrentLayer] = useState(1)
    const [revealedLayers, setRevealedLayers] = useState<Set<number>>(new Set([1]))
    const [timeSpent, setTimeSpent] = useState(0)
    const [userEngagement, setUserEngagement] = useState(0)

    const contentLayers: ContentLayer[] = [
        {
            id: 'value-prop',
            level: 1,
            title: 'Core Value Proposition',
            timeToReveal: 0,
            triggerType: 'time',
            revealed: true,
            content: (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Turn Your Website Into a Revenue Engine
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                        We optimize web performance to directly increase your conversion rates and revenue.
                    </p>
                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">47%</div>
                            <div className="text-sm text-gray-600">Avg Conversion Increase</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">2.3s</div>
                            <div className="text-sm text-gray-600">Avg Speed Improvement</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">$180k</div>
                            <div className="text-sm text-gray-600">Avg Annual Revenue Gain</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'technical-proof',
            level: 2,
            title: 'Technical Competence Signals',
            timeToReveal: 15,
            triggerType: 'time',
            revealed: false,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            Real Technical Expertise
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">Core Web Vitals optimization certified</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">1,200+ performance audits completed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">Advanced React/Next.js optimization</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">CDN and caching architecture</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            Performance Metrics Dashboard
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-1">99.97%</div>
                                    <div className="text-xs text-gray-600">Client Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">1.2s</div>
                                    <div className="text-xs text-gray-600">Avg LCP</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600 mb-1">8ms</div>
                                    <div className="text-xs text-gray-600">Avg FID</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">0.05</div>
                                    <div className="text-xs text-gray-600">Avg CLS</div>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mx-auto">
                                    <Play className="w-3 h-3" />
                                    View Live Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'case-studies',
            level: 3,
            title: 'Detailed Case Studies',
            timeToReveal: 45,
            triggerType: 'time',
            revealed: false,
            content: (
                <div className="space-y-8">
                    <h4 className="text-xl font-semibold text-gray-900 text-center mb-6">
                        Client Success Stories
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-900">E-commerce Platform</h5>
                                    <p className="text-sm text-gray-600">Monthly traffic: 500k</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Load time improvement</span>
                                    <span className="font-semibold text-green-600">4.2s → 1.8s</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Conversion rate boost</span>
                                    <span className="font-semibold text-green-600">+34%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Revenue impact</span>
                                    <span className="font-semibold text-green-600">+$240k/year</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                Read Full Case Study →
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-900">SaaS Application</h5>
                                    <p className="text-sm text-gray-600">Monthly traffic: 200k</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Performance score</span>
                                    <span className="font-semibold text-green-600">45 → 94</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">User engagement</span>
                                    <span className="font-semibold text-green-600">+52%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Trial conversions</span>
                                    <span className="font-semibold text-green-600">+29%</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                Read Full Case Study →
                            </button>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'team-process',
            level: 4,
            title: 'Team & Process Transparency',
            timeToReveal: 120,
            triggerType: 'time',
            revealed: false,
            content: (
                <div className="space-y-8">
                    <div className="text-center">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            Meet Our Technical Team
                        </h4>
                        <p className="text-gray-600 mb-6">
                            Senior engineers with proven track records in performance optimization
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">JM</span>
                            </div>
                            <h5 className="font-semibold text-gray-900 mb-2">João Martins</h5>
                            <p className="text-sm text-gray-600 mb-3">Lead Performance Engineer</p>
                            <div className="space-y-1 text-xs text-gray-500">
                                <div>• 8 years React/Next.js optimization</div>
                                <div>• Core Web Vitals certified</div>
                                <div>• 200+ successful projects</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">AS</span>
                            </div>
                            <h5 className="font-semibold text-gray-900 mb-2">Ana Silva</h5>
                            <p className="text-sm text-gray-600 mb-3">Frontend Architect</p>
                            <div className="space-y-1 text-xs text-gray-500">
                                <div>• CDN & caching specialist</div>
                                <div>• 150+ Lighthouse audits</div>
                                <div>• E-commerce optimization expert</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">RC</span>
                            </div>
                            <h5 className="font-semibold text-gray-900 mb-2">Rafael Costa</h5>
                            <p className="text-sm text-gray-600 mb-3">DevOps Engineer</p>
                            <div className="space-y-1 text-xs text-gray-500">
                                <div>• Infrastructure optimization</div>
                                <div>• Real-time monitoring setup</div>
                                <div>• Security & compliance expert</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">Our 4-Week Process</h5>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                                <h6 className="font-medium text-gray-900 mb-1">Analysis</h6>
                                <p className="text-xs text-gray-600">Comprehensive audit & baseline</p>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                                <h6 className="font-medium text-gray-900 mb-1">Planning</h6>
                                <p className="text-xs text-gray-600">Strategy & implementation roadmap</p>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                                <h6 className="font-medium text-gray-900 mb-1">Implementation</h6>
                                <p className="text-xs text-gray-600">Optimization & testing</p>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                                <h6 className="font-medium text-gray-900 mb-1">Validation</h6>
                                <p className="text-xs text-gray-600">Results verification & handoff</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'deep-resources',
            level: 5,
            title: 'Deep Technical Resources',
            timeToReveal: 300,
            triggerType: 'time',
            revealed: false,
            content: (
                <div className="space-y-6">
                    <div className="text-center">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            Technical Resources & Documentation
                        </h4>
                        <p className="text-gray-600">
                            Access our knowledge base and optimization playbooks
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-3">Performance Playbooks</h5>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>React Bundle Optimization Guide</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>Core Web Vitals Checklist</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>CDN Configuration Best Practices</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>Image Optimization Strategies</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-3">Tools & Scripts</h5>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>Lighthouse CI Configuration</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>Bundle Analyzer Scripts</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>Performance Monitoring Setup</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span>Security Headers Template</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto">
                            <ArrowRight className="w-5 h-5" />
                            Access Full Resource Library
                        </button>
                    </div>
                </div>
            )
        }
    ]

    useEffect(() => {
        // Track time spent
        const interval = setInterval(() => {
            setTimeSpent(prev => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Reveal layers based on time spent
        contentLayers.forEach(layer => {
            if (timeSpent >= layer.timeToReveal && !revealedLayers.has(layer.level)) {
                setRevealedLayers(prev => new Set(prev).add(layer.level))

                trackEvent('progressive_disclosure_reveal', 'engagement', 'layer_revealed', `level_${layer.level}`, layer.level)

                trackFunnelStep(`layer_${layer.level}_revealed`, 'engagement_funnel', {
                    layer_id: layer.id,
                    time_spent: timeSpent,
                    timestamp: Date.now()
                })
            }
        })
    }, [timeSpent])

    const handleLayerInteraction = (layerLevel: number) => {
        setUserEngagement(prev => prev + 1)

        trackEvent('progressive_disclosure_interaction', 'engagement', 'layer_interaction', `layer_${layerLevel}`, layerLevel)
    }

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Progress Indicator */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4">
                        {contentLayers.map((layer) => (
                            <div
                                key={layer.id}
                                className={`
                  w-3 h-3 rounded-full transition-all duration-500
                  ${revealedLayers.has(layer.level)
                                        ? 'bg-blue-600'
                                        : 'bg-gray-300'
                                    }
                `}
                            />
                        ))}
                    </div>
                </div>

                {/* Content Layers */}
                <div className="space-y-12">
                    <AnimatePresence>
                        {contentLayers.map((layer) => (
                            revealedLayers.has(layer.level) && (
                                <motion.div
                                    key={layer.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
                                    onClick={() => handleLayerInteraction(layer.level)}
                                >
                                    {layer.content}
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                {/* Engagement Indicator */}
                <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                        <span className="text-gray-600">reading</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
