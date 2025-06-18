'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendingUp, Award, Users } from 'lucide-react'

export function EnterpriseHero() {
    const metrics = [
        { value: '312%', label: 'Average ROI', sublabel: '12-month period' },
        { value: '68%', label: 'Cost Reduction', sublabel: 'Operational expenses' },
        { value: '47+', label: 'Enterprises', sublabel: 'Transformed' }
    ]

    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
            {/* Sophisticated Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent_50%)]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-8"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Proven System • Enterprise Grade • Results Guaranteed
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                            Transform Technical Debt Into
                            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                Competitive Advantage
                            </span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            We help growth-stage companies turn architectural bottlenecks into
                            scalable revenue engines. No consultants. No theory. Just results.
                        </p>
                    </motion.div>

                    {/* Core Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
                    >
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="text-4xl font-bold text-slate-900 mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-lg font-semibold text-slate-700 mb-1">
                                    {metric.label}
                                </div>
                                <div className="text-sm text-slate-500">
                                    {metric.sublabel}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Primary CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
                    >
                        <motion.a
                            href="#assessment"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Get Free Assessment
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="#case-studies"
                            whileHover={{ scale: 1.02 }}
                            className="text-slate-600 hover:text-slate-900 text-lg font-medium transition-colors duration-200"
                        >
                            View Case Studies
                        </motion.a>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="border-t border-slate-200 pt-12"
                    >
                        <p className="text-sm text-slate-500 mb-8 font-medium tracking-wide uppercase">
                            Trusted by Growth Leaders
                        </p>
                        <div className="flex items-center justify-center gap-12 opacity-60">
                            <div className="h-8 w-32 bg-slate-300 rounded"></div>
                            <div className="h-8 w-28 bg-slate-300 rounded"></div>
                            <div className="h-8 w-36 bg-slate-300 rounded"></div>
                            <div className="h-8 w-24 bg-slate-300 rounded"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
