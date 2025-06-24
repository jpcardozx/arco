'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TechnicalAssessmentTool } from '../tools/TechnicalAssessmentTool'
import { AdvancedROICalculator } from '../tools/AdvancedROICalculator'
import { Search, Calculator, Zap, Gift } from 'lucide-react'

/**
 * Immediate Value Section
 * Provides instant value tools before any contact required
 */
export function ImmediateValueSection() {
    const [activeTab, setActiveTab] = useState<'assessment' | 'roi'>('assessment')

    const tabs = [
        {
            id: 'assessment' as const,
            label: 'Free Site Analysis',
            icon: Search,
            description: 'Instant technical audit',
            highlight: 'No email required'
        },
        {
            id: 'roi' as const,
            label: 'ROI Calculator',
            icon: Calculator,
            description: 'Performance optimization gains',
            highlight: 'Data-driven projections'
        }
    ]

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Gift className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            <Zap className="w-4 h-4" />
                            Free Tools
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Get Immediate Value
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience our technical expertise with professional-grade tools.
                        No strings attached, no email required.
                    </p>
                </motion.div>

                {/* Tool Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  relative px-6 py-4 rounded-xl border-2 transition-all duration-300
                  ${activeTab === tab.id
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                                    }
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5" />
                                    <div className="text-left">
                                        <div className="font-semibold">{tab.label}</div>
                                        <div className="text-sm opacity-80">{tab.description}</div>
                                    </div>
                                </div>
                                <div className={`
                  absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium
                  ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-green-600 text-white'
                                    }
                `}>
                                    {tab.highlight}
                                </div>
                            </button>
                        )
                    })}
                </motion.div>

                {/* Tool Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-5xl mx-auto"
                >
                    {activeTab === 'assessment' && <TechnicalAssessmentTool />}
                    {activeTab === 'roi' && <AdvancedROICalculator />}
                </motion.div>

                {/* Value Proposition Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Why We Offer Free Tools
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        These tools represent our actual methodology. We believe in transparency
                        and want you to experience our technical competence before any commitment.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Search className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">Real Analysis</h4>
                            <p className="text-sm text-gray-600">
                                Same tools we use for paid audits, simplified for instant access
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Calculator className="w-6 h-6 text-green-600" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">Industry Data</h4>
                            <p className="text-sm text-gray-600">
                                Calculations based on real performance optimization studies
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Zap className="w-6 h-6 text-purple-600" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">No Gimmicks</h4>
                            <p className="text-sm text-gray-600">
                                Professional tools that provide genuine value and insights
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
