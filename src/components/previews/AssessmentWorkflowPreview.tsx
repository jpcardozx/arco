'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import {
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    ChartBarIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentTextIcon,
    PresentationChartLineIcon
} from '@heroicons/react/24/outline'

interface AssessmentPhase {
    day: number
    title: string
    deliverable: string
    stakeholders: string[]
    status: 'pending' | 'in-progress' | 'completed'
}

const assessmentPhases: AssessmentPhase[] = [
    {
        day: 1,
        title: "Infrastructure Discovery",
        deliverable: "Technical Architecture Map",
        stakeholders: ["CTO", "DevOps Lead"],
        status: 'completed'
    },
    {
        day: 3,
        title: "Performance Analysis",
        deliverable: "Performance Audit Report",
        stakeholders: ["Engineering Team", "Product"],
        status: 'completed'
    },
    {
        day: 5,
        title: "Security Assessment",
        deliverable: "Security Findings & Risk Matrix",
        stakeholders: ["CISO", "Compliance"],
        status: 'in-progress'
    },
    {
        day: 7,
        title: "Scalability Planning",
        deliverable: "Growth Capacity Analysis",
        stakeholders: ["Engineering", "Business"],
        status: 'pending'
    },
    {
        day: 10,
        title: "Executive Presentation",
        deliverable: "Strategic Roadmap & ROI Projections",
        stakeholders: ["C-Suite", "Board"],
        status: 'pending'
    }
]

const sampleDeliverables = [
    {
        title: "Technical Architecture Assessment",
        description: "Comprehensive analysis of current infrastructure, bottlenecks, and optimization opportunities",
        pages: 28,
        insights: 47
    },
    {
        title: "Performance Optimization Roadmap",
        description: "Prioritized improvements with timeline, effort estimates, and projected ROI",
        pages: 15,
        insights: 23
    },
    {
        title: "Executive Business Case",
        description: "Investment justification with risk analysis and implementation strategy",
        pages: 12,
        insights: 18
    }
]

export function AssessmentWorkflowPreview() {
    const { user, isAuthenticated } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [selectedPhase, setSelectedPhase] = useState<number | null>(null)

    const handleScheduleAssessment = () => {
        if (isAuthenticated && (user?.tier === 'premium' || user?.tier === 'enterprise')) {
            window.location.href = '/assessment'
        } else if (isAuthenticated) {
            // Show upgrade modal for free users
            setShowModal(true)
        } else {
            // Trigger auth modal
            window.dispatchEvent(new CustomEvent('openAuthModal'))
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30'
            case 'in-progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
            default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircleIcon className="w-4 h-4" />
            case 'in-progress': return <ClockIcon className="w-4 h-4" />
            default: return <ClipboardDocumentListIcon className="w-4 h-4" />
        }
    }

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-16">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full px-6 py-3 mb-6">
                        <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-400" />
                        <span className="text-indigo-200 font-medium">Enterprise Assessment Workflow</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        10-Day Technical Assessment
                        <span className="block text-indigo-400">With Automated Deliverables</span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Comprehensive infrastructure assessment with stakeholder coordination,
                        automated reporting, and executive-ready business cases.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-xl font-bold text-white mb-6">Assessment Timeline</h3>

                        <div className="space-y-4">
                            {assessmentPhases.map((phase, index) => (
                                <motion.div
                                    key={phase.day}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedPhase === index
                                            ? 'bg-indigo-500/20 border-indigo-400/50 scale-105'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                    onClick={() => setSelectedPhase(selectedPhase === index ? null : index)}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white text-sm font-bold rounded-lg">
                                                {phase.day}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{phase.title}</h4>
                                                <p className="text-sm text-slate-400">{phase.deliverable}</p>
                                            </div>
                                        </div>

                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${getStatusColor(phase.status)}`}>
                                            {getStatusIcon(phase.status)}
                                            <span className="capitalize">{phase.status.replace('-', ' ')}</span>
                                        </div>
                                    </div>

                                    {selectedPhase === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="pt-3 border-t border-slate-600"
                                        >
                                            <div className="mb-3">
                                                <h5 className="text-sm font-medium text-white mb-2">Stakeholders:</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {phase.stakeholders.map((stakeholder, i) => (
                                                        <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">
                                                            {stakeholder}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <DocumentTextIcon className="w-4 h-4" />
                                                <span>Automated report generation • Stakeholder notifications • Progress tracking</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Sample Deliverables */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-white mb-6">Sample Deliverables</h3>

                        <div className="space-y-6">
                            {sampleDeliverables.map((deliverable, index) => (
                                <motion.div
                                    key={deliverable.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.2 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-indigo-600/20 rounded-lg">
                                            <PresentationChartLineIcon className="w-6 h-6 text-indigo-400" />
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white mb-2">{deliverable.title}</h4>
                                            <p className="text-sm text-slate-300 mb-3">{deliverable.description}</p>

                                            <div className="flex items-center gap-4 text-xs text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <DocumentTextIcon className="w-3 h-3" />
                                                    <span>{deliverable.pages} pages</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ChartBarIcon className="w-3 h-3" />
                                                    <span>{deliverable.insights} insights</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Process Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6"
                        >
                            <h4 className="text-lg font-semibold text-white mb-4">Process Features</h4>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        <span className="text-slate-300">Automated stakeholder updates</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        <span className="text-slate-300">Real-time progress tracking</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        <span className="text-slate-300">Executive dashboard access</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        <span className="text-slate-300">Custom deliverable templates</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        <span className="text-slate-300">Integration with existing tools</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        <span className="text-slate-300">Post-assessment support</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                            className="mt-8"
                        >
                            <div className="text-center mb-4">
                                <h4 className="text-lg font-semibold text-white mb-2">
                                    Ready to Start Your Assessment?
                                </h4>
                                <p className="text-slate-300 text-sm">
                                    {isAuthenticated ?
                                        (user?.tier === 'enterprise' ?
                                            'Access your enterprise assessment workflow' :
                                            'Upgrade to enterprise for full assessment capabilities'
                                        ) :
                                        'Sign up to schedule your 10-day technical assessment'
                                    }
                                </p>
                            </div>

                            <motion.button
                                onClick={handleScheduleAssessment}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                            >
                                <CalendarDaysIcon className="w-5 h-5" />
                                {isAuthenticated && user?.tier === 'enterprise' ?
                                    'Access Assessment Workflow' :
                                    'Schedule Assessment'
                                }
                                <ArrowRightIcon className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Upgrade Modal */}
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <UserGroupIcon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Enterprise Assessment Required
                                </h3>
                                <p className="text-slate-300 mb-6">
                                    The 10-day assessment workflow is available for Enterprise tier users.
                                    Upgrade to access full assessment capabilities.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
                                    >
                                        Later
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/assessment'}
                                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
