'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, LineChart, TrendingUp, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '../lib/i18n-context'

export default function EnhancedCTA() {
    const { t } = useTranslation()

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 opacity-30">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern-cta)" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Main CTA */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                {t('homepage.cta.title')}
                            </h2>

                            <p className="text-xl text-blue-100 mb-8 max-w-lg">
                                {t('homepage.cta.subtitle')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link
                                    href="/diagnose"
                                    className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-blue-900 font-medium hover:bg-blue-50 transition-colors shadow-xl shadow-blue-900/20 group"
                                >
                                    <span>{t('homepage.cta.buttonText')}</span>
                                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    href="/process"
                                    className="inline-flex items-center px-8 py-4 rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors"
                                >
                                    <span>{t('common.buttons.learnMore')}</span>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="text-blue-300 mr-3 mt-1">
                                        <CheckCircleIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Fast Implementation</h4>
                                        <p className="text-sm text-blue-200">Ready within 5 business days</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-blue-300 mr-3 mt-1">
                                        <CheckCircleIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Guaranteed Results</h4>
                                        <p className="text-sm text-blue-200">Or your money back</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Sales Alert */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                        >
                            <div className="flex items-center mb-5">
                                <div className="bg-red-500/20 p-3 rounded-lg mr-4">
                                    <AlertTriangle className="h-6 w-6 text-red-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Sales Funnel Alert</h3>
                                    <p className="text-blue-200 text-sm">Significant drop-off detected at checkout</p>
                                </div>
                            </div>

                            <div className="space-y-6 mb-6">
                                <div className="bg-white/5 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-blue-200">Cart Abandonment</span>
                                        <span className="text-red-300 font-semibold">73.4%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div className="bg-red-400 h-2 rounded-full" style={{ width: '73.4%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-blue-200">Lost Revenue (Monthly)</span>
                                        <span className="text-red-300 font-semibold">$46,200</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-blue-300">Previous: $32,800</span>
                                        <span className="text-xs text-red-300">+41% ↑</span>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-blue-200">Recovery Potential</span>
                                        <span className="text-green-300 font-semibold">$31,400</span>
                                    </div>
                                    <div className="w-full h-8 bg-white/10 rounded-lg overflow-hidden">
                                        <div className="bg-green-400/20 h-full" style={{ width: '68%' }}>
                                            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full p-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-white font-medium text-center hover:shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all">
                                Start Recovery Process
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Helper component for the check icon
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
