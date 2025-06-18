'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Globe, Clock, AlertTriangle, CheckCircle, ArrowRight, Smartphone, Monitor } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

export function FlashAuditSection() {
    const [auditUrl, setAuditUrl] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [auditResults, setAuditResults] = useState<any>(null)

    const handleAuditSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!auditUrl) return

        setIsAnalyzing(true)

        // Simulate audit process
        setTimeout(() => {
            const mockResults = {
                url: auditUrl,
                mobileLCP: 2.8,
                desktopLCP: 1.6,
                psiScore: 34,
                issues: [
                    'Unoptimized images adding 1.2s',
                    'Render-blocking JavaScript',
                    'Poor caching configuration',
                    'Oversized DOM elements'
                ],
                annualLoss: 4200,
                potentialSavings: 6800
            }
            setAuditResults(mockResults)
            setIsAnalyzing(false)
        }, 3000)
    }

    const commonIssues = [
        {
            issue: 'Slow Mobile Loading',
            impact: 'Up to 40% conversion loss',
            frequency: '89% of sites we audit',
            icon: Smartphone,
            severity: 'critical'
        },
        {
            issue: 'Poor Core Web Vitals',
            impact: 'Google ranking penalty',
            frequency: '76% of WordPress sites',
            icon: Globe,
            severity: 'high'
        },
        {
            issue: 'Builder Platform Costs',
            impact: '$400+ annually wasted',
            frequency: '100% of Wix/Squarespace',
            icon: Monitor,
            severity: 'medium'
        },
        {
            issue: 'Unoptimized Images',
            impact: '1-3 seconds added to LCP',
            frequency: '94% of hotel/clinic sites',
            icon: AlertTriangle,
            severity: 'critical'
        }
    ]

    const auditBenefits = [
        'Exact LCP measurement (mobile + desktop)',
        'Builder cost analysis and alternatives',
        'Priority issue list with impact scores',
        'Custom optimization roadmap',
        'ROI calculation for your business',
        'No obligation, completely free'
    ]

    return (
        <SectionWrapper background="white" spacing="normal" id="audit">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">Free Flash Audit</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">30 Seconds</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        See exactly what's
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> slowing down</span>
                        <br />your website
                    </h2>

                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Get an instant performance analysis of your site. We'll show you exactly what's
                        costing you conversions and how much money you could save.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Audit Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Free Instant Analysis
                        </h3>

                        <form onSubmit={handleAuditSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Your Website URL
                                </label>
                                <input
                                    type="url"
                                    value={auditUrl}
                                    onChange={(e) => setAuditUrl(e.target.value)}
                                    placeholder="https://yourwebsite.com"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isAnalyzing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-3"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Analyzing Performance...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        <span>Get Free Flash Audit</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* What You'll Get */}
                        <div className="mt-8">
                            <h4 className="font-bold text-gray-900 mb-4">What you'll get:</h4>
                            <ul className="space-y-2">
                                {auditBenefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-semibold text-green-900">100% Free & No Spam</span>
                            </div>
                            <p className="text-xs text-green-800">
                                Used by 200+ hotels and dental practices. No email required for basic audit.
                            </p>
                        </div>
                    </motion.div>

                    {/* Common Issues */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900">
                            Common Issues We Find
                        </h3>

                        <div className="space-y-4">
                            {commonIssues.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                    <div className="flex items-start space-x-4">
                                        <div className={`p-3 rounded-lg ${item.severity === 'critical' ? 'bg-red-100 text-red-600' :
                                                item.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                                                    'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-gray-900">{item.issue}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                                        item.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {item.severity}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-1">{item.impact}</p>
                                            <p className="text-xs text-gray-500">{item.frequency}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sample Results */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                            <h4 className="font-bold text-gray-900 mb-4">Sample Audit Result</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Current Mobile LCP:</span>
                                    <span className="font-bold text-red-600">2.8s</span>
                                </div>                                <div className="flex justify-between">
                                    <span className="text-gray-700">Target LCP:</span>
                                    <span className="font-bold text-green-600">&lt; 1.4s</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Potential Revenue Recovery:</span>
                                    <span className="font-bold text-blue-600">$3,200/year</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Builder Cost Savings:</span>
                                    <span className="font-bold text-purple-600">$400/year</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Results Display */}
                {auditResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Audit Results for {auditResults.url}
                            </h3>
                            <p className="text-gray-600">Here's what we found and how much it's costing you</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                                <div className="text-3xl font-bold text-red-600 mb-2">
                                    {auditResults.mobileLCP}s
                                </div>
                                <div className="text-sm font-semibold text-red-900">Mobile LCP</div>
                                <div className="text-xs text-red-700 mt-1">Critical - Above 2.5s</div>
                            </div>
                            <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
                                <div className="text-3xl font-bold text-orange-600 mb-2">
                                    {auditResults.psiScore}
                                </div>
                                <div className="text-sm font-semibold text-orange-900">PSI Score</div>
                                <div className="text-xs text-orange-700 mt-1">Poor - Below 50</div>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    ${auditResults.potentialSavings.toLocaleString()}
                                </div>
                                <div className="text-sm font-semibold text-green-900">Annual Savings</div>
                                <div className="text-xs text-green-700 mt-1">With optimization</div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h4 className="font-bold text-gray-900 mb-4">Critical Issues Found:</h4>
                            <ul className="space-y-2">
                                {auditResults.issues.map((issue: string, index: number) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <AlertTriangle className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-gray-700">{issue}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                Book Free Strategy Call - Fix These Issues
                            </button>
                            <p className="text-sm text-gray-600 mt-3">
                                30-minute call to discuss your optimization roadmap
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </SectionWrapper>
    )
}
