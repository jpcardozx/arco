'use client'

import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Download, CheckCircle, BarChart3, Zap, Target } from 'lucide-react'

// Value-First Lead Capture Component
export function ValueFirstLeadCapture() {
    const [email, setEmail] = useState('')
    const [selectedTool, setSelectedTool] = useState('stack-audit')
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Free valuable tools to build trust
    const freeTools = [
        {
            id: 'stack-audit',
            title: 'Stack Efficiency Audit',
            description: 'Get a detailed report on your current tech stack with specific recommendations for improvement',
            deliverable: '12-page personalized report + optimization checklist',
            timeToValue: '24 hours',
            icon: BarChart3,
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'performance-calculator',
            title: 'Performance ROI Calculator',
            description: 'Calculate the exact revenue impact of site speed improvements for your specific traffic',
            deliverable: 'Custom ROI projection + implementation roadmap',
            timeToValue: 'Instant results',
            icon: Zap,
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'conversion-checklist',
            title: 'Conversion Optimization Checklist',
            description: 'Step-by-step guide to identify and fix the top 10 conversion killers in your funnel',
            deliverable: '25-point actionable checklist + video walkthrough',
            timeToValue: '48 hours',
            icon: Target,
            color: 'from-purple-500 to-purple-600'
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setIsSubmitted(true)
            // Here you would integrate with your email service
            console.log('Lead captured:', { email, tool: selectedTool })
        }
    }

    if (isSubmitted) {
        return (
            <section className="py-20 bg-gradient-to-b from-green-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Check Your Email!
                        </h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Your {freeTools.find(t => t.id === selectedTool)?.title} is on its way.
                            We'll deliver it within {freeTools.find(t => t.id === selectedTool)?.timeToValue}.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-sm text-blue-800">
                                <strong>What's next?</strong> Keep an eye out for additional insights we'll share
                                over the next few days to help you get the most value from this audit.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6 border border-blue-200"
                    >
                        <Download className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Free Performance Tools</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl lg:text-4xl font-light text-slate-900 mb-6"
                    >
                        Get personalized insights for your business
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        Choose the tool that best fits your current needs. Each one is designed to give you
                        immediate, actionable insights you can implement right away.
                    </motion.p>
                </div>

                {/* Tool Selection */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {freeTools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative bg-white rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${selectedTool === tool.id
                                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                            onClick={() => setSelectedTool(tool.id)}
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4`}>
                                <tool.icon className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                {tool.title}
                            </h3>

                            <p className="text-slate-600 mb-4 leading-relaxed">
                                {tool.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{tool.deliverable}</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">Delivered in {tool.timeToValue}</span>
                                </div>
                            </div>

                            {selectedTool === tool.id && (
                                <div className="absolute top-4 right-4">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Email Capture Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-md mx-auto"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your business email"
                            required
                            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="group px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                        >
                            Get Free Tool
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 mt-4 text-center">
                        No spam, ever. We'll only send you valuable insights and you can unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
