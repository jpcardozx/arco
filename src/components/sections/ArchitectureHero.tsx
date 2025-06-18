'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Cpu, Database, Network } from 'lucide-react'

export function ArchitectureHero() {
    return (
        <section className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
            {/* Sophisticated Technical Background */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(51,65,85,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                {/* Accent Elements */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <div>
                            {/* Credibility Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm mb-8"
                            >
                                <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                                Architectural Engineering for Series A+ Companies
                            </motion.div>

                            {/* Main Headline */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mb-8"
                            >
                                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                    Transform Legacy Systems
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                        Without Downtime
                                    </span>
                                </h1>

                                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                                    We architect scalable systems for fast-growing companies.
                                    Our systematic approach eliminates technical debt while maintaining business continuity.
                                </p>

                                <p className="text-lg text-slate-400 leading-relaxed">
                                    Used by engineering teams at companies scaling from Series A to IPO.
                                </p>
                            </motion.div>

                            {/* Key Metrics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="grid grid-cols-3 gap-6 mb-10"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white mb-1">18mo</div>
                                    <div className="text-sm text-slate-400">Average engagement</div>
                                </div>
                                <div className="text-center border-x border-slate-700 px-4">
                                    <div className="text-2xl font-bold text-white mb-1">99.99%</div>
                                    <div className="text-sm text-slate-400">Uptime maintained</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white mb-1">Zero</div>
                                    <div className="text-sm text-slate-400">Full rebuilds required</div>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button className="group bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center">
                                    Schedule Architecture Review
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button className="text-slate-300 hover:text-white transition-colors border border-slate-600 hover:border-slate-500 px-8 py-4 rounded-lg font-medium">
                                    View Case Studies
                                </button>
                            </motion.div>
                        </div>

                        {/* Technical Visualization */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                {/* Architecture Diagram */}
                                <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                                    <h3 className="text-lg font-semibold mb-6 text-slate-200">
                                        Systematic Architecture Transformation
                                    </h3>

                                    <div className="space-y-4">
                                        {[
                                            { icon: Database, label: "Database Layer Optimization", status: "active" },
                                            { icon: Network, label: "API Architecture Redesign", status: "active" },
                                            { icon: Cpu, label: "Infrastructure Scaling", status: "pending" }
                                        ].map((item, index) => {
                                            const Icon = item.icon;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.8 + index * 0.2 }}
                                                    className="flex items-center p-4 bg-slate-700 rounded-lg"
                                                >
                                                    <Icon className="w-5 h-5 text-blue-400 mr-3" />
                                                    <span className="text-slate-200 flex-1">{item.label}</span>
                                                    <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'
                                                        }`}></div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Connection Lines */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-blue-400 rounded-full bg-slate-900 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="mt-20 pt-12 border-t border-slate-800"
                    >
                        <div className="text-center mb-8">
                            <p className="text-sm text-slate-500 uppercase tracking-wide mb-4">
                                Trusted by Engineering Leaders At
                            </p>
                            <div className="flex items-center justify-center gap-12 opacity-60">
                                <div className="h-8 w-24 bg-slate-700 rounded"></div>
                                <div className="h-8 w-32 bg-slate-700 rounded"></div>
                                <div className="h-8 w-28 bg-slate-700 rounded"></div>
                                <div className="h-8 w-36 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
