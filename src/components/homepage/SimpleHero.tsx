'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function SimpleHero() {
    return (
        <section className="pt-14 pb-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                
                {/* Main hero content */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-8">
                            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
                            <span className="text-emerald-700 text-sm font-medium">Revenue Recovery Specialist</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Recover Revenue Lost to
                            <span className="text-emerald-600 block">Conversion Friction</span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                            I help $2M-$50M companies identify exactly where their funnel leaks money 
                            and implement systematic improvements that directly impact their bottom line.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/assessment"
                                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all hover:scale-105 group"
                            >
                                Get Free Assessment
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-colors"
                            >
                                View Results
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>No sales pitch</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>48h delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>Actionable insights</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Results showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    {[
                        {
                            metric: "1.9% → 8.2%",
                            description: "Mobile conversion improvement",
                            context: "Real estate platform, 45 days"
                        },
                        {
                            metric: "$380k",
                            description: "Additional revenue generated",
                            context: "E-commerce client, 6 weeks"
                        },
                        {
                            metric: "287%",
                            description: "Trial-to-paid improvement",
                            context: "B2B SaaS platform"
                        }
                    ].map((result, index) => (
                        <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="text-2xl font-bold text-emerald-600 mb-2">
                                {result.metric}
                            </div>
                            <div className="text-slate-900 font-medium mb-1">
                                {result.description}
                            </div>
                            <div className="text-sm text-slate-500">
                                {result.context}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-slate-600 mb-6">
                        <strong>Curious where your funnel is leaking money?</strong>
                    </p>
                    <div className="inline-flex items-center bg-slate-50 rounded-lg px-6 py-3">
                        <span className="text-slate-700">
                            Get a complimentary assessment that shows exactly which improvements would have the highest revenue impact
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}