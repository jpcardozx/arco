'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Loader2,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Download,
    Eye,
    Zap,
    Shield,
    Globe,
    Clock
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'

interface AssessmentResult {
    url: string
    overall_score: number
    metrics: {
        performance: {
            score: number
            lcp: number
            fid: number
            cls: number
            fcp: number
            details: string[]
        }
        accessibility: {
            score: number
            issues: string[]
        }
        best_practices: {
            score: number
            issues: string[]
        }
        seo: {
            score: number
            issues: string[]
        }
        security: {
            score: number
            headers: string[]
            issues: string[]
        }
    }
    opportunities: {
        impact: 'high' | 'medium' | 'low'
        title: string
        description: string
        savings: string
    }[]
    recommendations: string[]
}

/**
 * Technical Assessment Tool
 * Instant website analysis providing immediate value
 */
export function TechnicalAssessmentTool() {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<AssessmentResult | null>(null)
    const [error, setError] = useState('')
    const [showDetailedReport, setShowDetailedReport] = useState(false)

    const handleAnalysis = async () => {
        if (!url.trim()) {
            setError('Please enter a valid URL')
            return
        }

        // Basic URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        if (!urlPattern.test(url)) {
            setError('Please enter a valid URL (e.g., example.com)')
            return
        }

        setLoading(true)
        setError('')

        // Track analysis start
        trackEvent({
            event: 'technical_assessment_start',
            category: 'tools',
            action: 'analysis_start',
            label: 'website_audit',
            value: 1
        })

        trackFunnelStep('technical_assessment_start', 'lead_qualification', {
            url: url,
            timestamp: Date.now()
        })

        try {
            // Simulate API call - replace with real Lighthouse API integration
            await new Promise(resolve => setTimeout(resolve, 3000))

            const mockResult: AssessmentResult = {
                url: url,
                overall_score: 73,
                metrics: {
                    performance: {
                        score: 68,
                        lcp: 2.8,
                        fid: 89,
                        cls: 0.15,
                        fcp: 1.9,
                        details: [
                            'Large Contentful Paint could be improved',
                            'Cumulative Layout Shift needs attention',
                            'First Contentful Paint is good'
                        ]
                    },
                    accessibility: {
                        score: 85,
                        issues: [
                            'Some images missing alt text',
                            'Form labels need improvement',
                            'Color contrast is good overall'
                        ]
                    },
                    best_practices: {
                        score: 92,
                        issues: [
                            'Uses HTTP/2',
                            'HTTPS implemented correctly',
                            'No console errors detected'
                        ]
                    },
                    seo: {
                        score: 78,
                        issues: [
                            'Meta description missing on some pages',
                            'H1 tags properly structured',
                            'Internal linking could be improved'
                        ]
                    },
                    security: {
                        score: 71,
                        headers: [
                            'Content-Security-Policy: Missing',
                            'X-Frame-Options: Present',
                            'X-Content-Type-Options: Present'
                        ],
                        issues: [
                            'CSP header not implemented',
                            'HSTS could be strengthened'
                        ]
                    }
                },
                opportunities: [
                    {
                        impact: 'high',
                        title: 'Optimize images',
                        description: 'Compress and convert images to modern formats (WebP/AVIF)',
                        savings: '1.2s faster loading'
                    },
                    {
                        impact: 'high',
                        title: 'Minimize JavaScript',
                        description: 'Remove unused code and implement code splitting',
                        savings: '800ms faster rendering'
                    },
                    {
                        impact: 'medium',
                        title: 'Implement CDN',
                        description: 'Use content delivery network for static assets',
                        savings: '600ms faster loading'
                    },
                    {
                        impact: 'medium',
                        title: 'Add security headers',
                        description: 'Implement Content Security Policy and other security headers',
                        savings: 'Better security score'
                    }
                ],
                recommendations: [
                    'Implement lazy loading for images below the fold',
                    'Use resource hints (preload, prefetch) for critical resources',
                    'Consider implementing Service Worker for caching',
                    'Optimize database queries and implement Redis caching',
                    'Set up real-time monitoring for Core Web Vitals'
                ]
            }

            setResult(mockResult)

            // Track successful analysis
            trackEvent({
                event: 'technical_assessment_complete',
                category: 'tools',
                action: 'analysis_complete',
                label: 'website_audit',
                value: mockResult.overall_score
            })

            trackFunnelStep('technical_assessment_complete', 'lead_qualification', {
                url: url,
                score: mockResult.overall_score,
                timestamp: Date.now()
            })

        } catch (err) {
            setError('Analysis failed. Please try again or contact support.')
            console.error('Assessment error:', err)
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-50'
        if (score >= 70) return 'text-yellow-600 bg-yellow-50'
        return 'text-red-600 bg-red-50'
    }

    const getScoreIcon = (score: number) => {
        if (score >= 90) return <CheckCircle className="w-5 h-5" />
        if (score >= 70) return <AlertTriangle className="w-5 h-5" />
        return <XCircle className="w-5 h-5" />
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return 'bg-red-100 text-red-800'
            case 'medium': return 'bg-yellow-100 text-yellow-800'
            case 'low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const handleDownloadReport = () => {
        trackEvent({
            event: 'assessment_report_download',
            category: 'lead_magnet',
            action: 'download',
            label: 'technical_report',
            value: 1
        })

        // In production, generate and download actual PDF report
        alert('Full detailed report would be generated here. This demo shows the concept.')
    }

    const handleContactForOptimization = () => {
        trackEvent({
            event: 'assessment_contact_click',
            category: 'conversion',
            action: 'contact_from_assessment',
            label: 'optimization_inquiry',
            value: 1
        })

        trackFunnelStep('assessment_to_contact', 'conversion_funnel', {
            source: 'technical_assessment',
            url: result?.url,
            score: result?.overall_score,
            timestamp: Date.now()
        })

        // Redirect to contact or open contact modal
        window.location.href = '#contact'
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                        <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Free Technical Assessment</h3>
                        <p className="text-gray-600">Instant website analysis • No email required</p>
                    </div>
                </div>
            </div>

            {/* Input Form */}
            <div className="mb-6">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value)
                                setError('')
                            }}
                            placeholder="Enter your website URL (e.g., example.com)"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={loading}
                        />
                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}
                    </div>
                    <button
                        onClick={handleAnalysis}
                        disabled={loading || !url.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Search className="w-5 h-5" />
                                Analyze
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Results */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Overall Score */}
                        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(result.overall_score)}`}>
                                    {getScoreIcon(result.overall_score)}
                                    <span className="font-bold text-2xl">{result.overall_score}</span>
                                </div>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">Overall Performance Score</h4>
                            <p className="text-gray-600">Based on Core Web Vitals, SEO, Security & Best Practices</p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Zap className="w-5 h-5 text-yellow-600" />
                                    <span className={`font-bold text-xl ${getScoreColor(result.metrics.performance.score).split(' ')[0]}`}>
                                        {result.metrics.performance.score}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Performance</p>
                            </div>

                            <div className="text-center p-4 border rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                    <span className={`font-bold text-xl ${getScoreColor(result.metrics.accessibility.score).split(' ')[0]}`}>
                                        {result.metrics.accessibility.score}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Accessibility</p>
                            </div>

                            <div className="text-center p-4 border rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <span className={`font-bold text-xl ${getScoreColor(result.metrics.security.score).split(' ')[0]}`}>
                                        {result.metrics.security.score}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Security</p>
                            </div>

                            <div className="text-center p-4 border rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Globe className="w-5 h-5 text-purple-600" />
                                    <span className={`font-bold text-xl ${getScoreColor(result.metrics.seo.score).split(' ')[0]}`}>
                                        {result.metrics.seo.score}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">SEO</p>
                            </div>
                        </div>

                        {/* Core Web Vitals */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-3">Core Web Vitals</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">LCP (Loading)</span>
                                    <span className={`font-medium ${result.metrics.performance.lcp <= 2.5 ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.metrics.performance.lcp}s
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">FID (Interactivity)</span>
                                    <span className={`font-medium ${result.metrics.performance.fid <= 100 ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.metrics.performance.fid}ms
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">CLS (Visual Stability)</span>
                                    <span className={`font-medium ${result.metrics.performance.cls <= 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.metrics.performance.cls}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Top Opportunities */}
                        <div>
                            <h5 className="font-semibold text-gray-900 mb-3">Optimization Opportunities</h5>
                            <div className="space-y-3">
                                {result.opportunities.slice(0, 3).map((opportunity, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(opportunity.impact)}`}>
                                            {opportunity.impact.toUpperCase()}
                                        </span>
                                        <div className="flex-1">
                                            <h6 className="font-medium text-gray-900">{opportunity.title}</h6>
                                            <p className="text-sm text-gray-600 mb-1">{opportunity.description}</p>
                                            <p className="text-sm font-medium text-green-600">{opportunity.savings}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                            <button
                                onClick={handleDownloadReport}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Download Full Report
                            </button>
                            <button
                                onClick={handleContactForOptimization}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                <Clock className="w-5 h-5" />
                                Get Optimization Quote
                            </button>
                        </div>

                        {/* Additional Details Toggle */}
                        <div className="text-center">
                            <button
                                onClick={() => setShowDetailedReport(!showDetailedReport)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                {showDetailedReport ? 'Hide' : 'Show'} Detailed Analysis
                            </button>
                        </div>

                        {/* Detailed Report */}
                        <AnimatePresence>
                            {showDetailedReport && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4 border-t pt-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Security Headers */}
                                        <div>
                                            <h6 className="font-medium text-gray-900 mb-3">Security Headers</h6>
                                            <div className="space-y-2">
                                                {result.metrics.security.headers.map((header, index) => (
                                                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                                        {header.includes('Missing') ? (
                                                            <XCircle className="w-4 h-4 text-red-500" />
                                                        ) : (
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                        )}
                                                        {header}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recommendations */}
                                        <div>
                                            <h6 className="font-medium text-gray-900 mb-3">Technical Recommendations</h6>
                                            <div className="space-y-2">
                                                {result.recommendations.slice(0, 4).map((rec, index) => (
                                                    <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        {rec}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Value Proposition */}
            {!result && !loading && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">What you'll get:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Core Web Vitals analysis
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Security audit results
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Optimization recommendations
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
