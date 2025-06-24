/**
 * SISTEMA DE MONITORAMENTO DE PERFORMANCE REAL-TIME
 * 
 * Sistema integrado que monitora métricas de performance e negócio
 * diretamente no browser sem dependências externas
 */

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, Users, Clock, Target, DollarSign } from 'lucide-react'

interface PerformanceMetrics {
    // Web Vitals
    fcp: number | null
    lcp: number | null
    cls: number | null
    fid: number | null
    ttfb: number | null

    // Business Metrics
    pageViews: number
    uniqueVisitors: number
    conversionRate: number
    avgSessionTime: number
    bounceRate: number

    // A/B Testing
    currentVariant: string
    conversionsByVariant: Record<string, number>

    // Real-time data
    timestamp: number
    loadTime: number
}

interface BusinessImpact {
    performanceScore: number
    conversionScore: number
    revenueImpact: number
    monthlyValue: number
    recommendations: string[]
}

export default function RealTimeMonitoring() {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        fcp: null,
        lcp: null,
        cls: null,
        fid: null,
        ttfb: null,
        pageViews: 0,
        uniqueVisitors: 0,
        conversionRate: 0,
        avgSessionTime: 0,
        bounceRate: 0,
        currentVariant: 'A',
        conversionsByVariant: { A: 0, B: 0 },
        timestamp: Date.now(),
        loadTime: 0
    })

    const [businessImpact, setBusinessImpact] = useState<BusinessImpact>({
        performanceScore: 0,
        conversionScore: 0,
        revenueImpact: 0,
        monthlyValue: 0,
        recommendations: []
    })

    const [isMonitoring, setIsMonitoring] = useState(false)

    // Coleta de Web Vitals
    useEffect(() => {
        if (typeof window === 'undefined') return

        const collectWebVitals = () => {
            // Performance Navigation API
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            if (navigation) {
                setMetrics(prev => ({
                    ...prev,
                    ttfb: navigation.responseStart - navigation.requestStart,
                    loadTime: navigation.loadEventEnd - navigation.fetchStart
                }))
            }

            // Paint Timing API
            const paintEntries = performance.getEntriesByType('paint')
            paintEntries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
                }
            })

            // Layout Shift Observer
            if ('PerformanceObserver' in window) {
                let clsValue = 0

                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                            clsValue += (entry as any).value
                            setMetrics(prev => ({ ...prev, cls: clsValue }))
                        }
                    }
                })

                try {
                    clsObserver.observe({ entryTypes: ['layout-shift'] })
                } catch (e) {
                    console.warn('Layout Shift not supported')
                }

                // Largest Contentful Paint Observer
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries()
                    if (entries.length > 0) {
                        const lastEntry = entries[entries.length - 1]
                        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
                    }
                })

                try {
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
                } catch (e) {
                    console.warn('LCP not supported')
                }

                // First Input Delay Observer
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        const fidValue = (entry as any).processingStart - entry.startTime
                        setMetrics(prev => ({ ...prev, fid: fidValue }))
                    }
                })

                try {
                    fidObserver.observe({ entryTypes: ['first-input'] })
                } catch (e) {
                    console.warn('FID not supported')
                }
            }
        }

        // Simular métricas de negócio (em produção, isso viria de analytics reais)
        const simulateBusinessMetrics = () => {
            const pageViewsFromStorage = parseInt(localStorage.getItem('arco_page_views') || '0')
            const newPageViews = pageViewsFromStorage + 1
            localStorage.setItem('arco_page_views', newPageViews.toString())

            const sessionStart = sessionStorage.getItem('arco_session_start')
            if (!sessionStart) {
                sessionStorage.setItem('arco_session_start', Date.now().toString())
            }

            const avgSessionTime = sessionStart ? (Date.now() - parseInt(sessionStart)) / 1000 : 0

            setMetrics(prev => ({
                ...prev,
                pageViews: newPageViews,
                uniqueVisitors: Math.floor(newPageViews * 0.7), // Estimativa
                conversionRate: Math.random() * 0.05 + 0.02, // 2-7%
                avgSessionTime,
                bounceRate: Math.random() * 0.3 + 0.2, // 20-50%
                timestamp: Date.now()
            }))
        }

        collectWebVitals()
        simulateBusinessMetrics()

        // Atualizar métricas a cada 5 segundos
        const interval = setInterval(() => {
            collectWebVitals()
            simulateBusinessMetrics()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    // Calcular impacto de negócio
    useEffect(() => {
        const calculateBusinessImpact = () => {
            let performanceScore = 100
            const recommendations: string[] = []

            // Avaliar Web Vitals
            if (metrics.lcp) {
                if (metrics.lcp > 4000) {
                    performanceScore -= 30
                    recommendations.push('Optimize LCP: Consider image optimization and lazy loading')
                } else if (metrics.lcp > 2500) {
                    performanceScore -= 15
                    recommendations.push('Improve LCP: Review largest content elements')
                }
            }

            if (metrics.fcp) {
                if (metrics.fcp > 3000) {
                    performanceScore -= 20
                    recommendations.push('Optimize FCP: Reduce blocking resources')
                } else if (metrics.fcp > 1800) {
                    performanceScore -= 10
                }
            }

            if (metrics.cls && metrics.cls > 0.25) {
                performanceScore -= 25
                recommendations.push('Fix CLS: Set explicit dimensions for media')
            } else if (metrics.cls && metrics.cls > 0.1) {
                performanceScore -= 10
                recommendations.push('Improve CLS: Reduce layout shifts')
            }

            if (metrics.fid && metrics.fid > 300) {
                performanceScore -= 25
                recommendations.push('Optimize FID: Reduce JavaScript execution time')
            } else if (metrics.fid && metrics.fid > 100) {
                performanceScore -= 10
            }

            // Calcular score de conversão
            let conversionScore = 0
            if (metrics.conversionRate > 0.04) conversionScore += 40
            else if (metrics.conversionRate > 0.025) conversionScore += 25
            else conversionScore += 10

            if (metrics.avgSessionTime > 120) conversionScore += 30
            else if (metrics.avgSessionTime > 60) conversionScore += 20
            else conversionScore += 10

            if (metrics.bounceRate < 0.3) conversionScore += 30
            else if (metrics.bounceRate < 0.5) conversionScore += 20
            else conversionScore += 10

            // Calcular impacto financeiro
            const performanceMultiplier = Math.max(0, performanceScore) / 100
            const conversionMultiplier = Math.min(conversionScore, 100) / 100
            const revenueImpact = (performanceMultiplier + conversionMultiplier) / 2
            const monthlyValue = 15000 * revenueImpact // Baseline revenue per client

            if (performanceScore < 80) {
                recommendations.push('Performance optimization could increase monthly revenue by up to $3,000')
            }

            if (conversionScore < 70) {
                recommendations.push('Conversion optimization could increase lead generation by 25%')
            }

            setBusinessImpact({
                performanceScore: Math.max(0, performanceScore),
                conversionScore: Math.min(conversionScore, 100),
                revenueImpact,
                monthlyValue,
                recommendations
            })
        }

        calculateBusinessImpact()
    }, [metrics])

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500'
        if (score >= 60) return 'text-yellow-500'
        return 'text-red-500'
    }

    const getVitalStatus = (value: number | null, thresholds: [number, number]) => {
        if (value === null) return 'text-gray-400'
        if (value <= thresholds[0]) return 'text-green-500'
        if (value <= thresholds[1]) return 'text-yellow-500'
        return 'text-red-500'
    }

    const startMonitoring = () => {
        setIsMonitoring(true)
        // Simular início de sessão de monitoramento
        const monitoringData = {
            startTime: Date.now(),
            variant: Math.random() > 0.5 ? 'A' : 'B'
        }
        localStorage.setItem('arco_monitoring', JSON.stringify(monitoringData))
    }

    const exportReport = () => {
        const report = {
            timestamp: new Date().toISOString(),
            metrics,
            businessImpact,
            environment: 'production'
        }

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `arco-performance-report-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Activity className="text-blue-600" size={24} />
                    <h3 className="text-xl font-bold text-slate-900">Real-Time Performance Monitor</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={startMonitoring}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${isMonitoring
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {isMonitoring ? 'Monitoring Active' : 'Start Monitoring'}
                    </button>
                    <button
                        onClick={exportReport}
                        className="px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Web Vitals */}
                <motion.div
                    className="bg-white p-6 rounded-lg border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Clock size={20} />
                        Core Web Vitals
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">LCP (Largest Contentful Paint)</span>
                            <span className={`font-mono font-bold ${getVitalStatus(metrics.lcp, [2500, 4000])}`}>
                                {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '—'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">FCP (First Contentful Paint)</span>
                            <span className={`font-mono font-bold ${getVitalStatus(metrics.fcp, [1800, 3000])}`}>
                                {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '—'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">CLS (Cumulative Layout Shift)</span>
                            <span className={`font-mono font-bold ${getVitalStatus(metrics.cls, [0.1, 0.25])}`}>
                                {metrics.cls ? metrics.cls.toFixed(3) : '—'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">FID (First Input Delay)</span>
                            <span className={`font-mono font-bold ${getVitalStatus(metrics.fid, [100, 300])}`}>
                                {metrics.fid ? `${Math.round(metrics.fid)}ms` : '—'}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Business Metrics */}
                <motion.div
                    className="bg-white p-6 rounded-lg border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Users size={20} />
                        Business Metrics
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Page Views</span>
                            <span className="font-bold text-blue-600">{metrics.pageViews}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Conversion Rate</span>
                            <span className="font-bold text-green-600">
                                {(metrics.conversionRate * 100).toFixed(1)}%
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Avg Session Time</span>
                            <span className="font-bold text-purple-600">
                                {Math.round(metrics.avgSessionTime)}s
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Bounce Rate</span>
                            <span className="font-bold text-orange-600">
                                {(metrics.bounceRate * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Score */}
                <motion.div
                    className="bg-white p-6 rounded-lg border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Target size={20} />
                        Performance Score
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600">Performance</span>
                                <span className={`font-bold text-2xl ${getScoreColor(businessImpact.performanceScore)}`}>
                                    {Math.round(businessImpact.performanceScore)}/100
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${businessImpact.performanceScore}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600">Conversion</span>
                                <span className={`font-bold text-2xl ${getScoreColor(businessImpact.conversionScore)}`}>
                                    {Math.round(businessImpact.conversionScore)}/100
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${businessImpact.conversionScore}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Revenue Impact */}
                <motion.div
                    className="bg-white p-6 rounded-lg border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <DollarSign size={20} />
                        Revenue Impact
                    </h4>
                    <div className="space-y-3">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                                ${Math.round(businessImpact.monthlyValue).toLocaleString()}
                            </div>
                            <div className="text-slate-500">Monthly Value</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">
                                {(businessImpact.revenueImpact * 100).toFixed(1)}%
                            </div>
                            <div className="text-slate-500">Revenue Impact</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recommendations */}
            {businessImpact.recommendations.length > 0 && (
                <motion.div
                    className="mt-6 bg-white p-6 rounded-lg border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} />
                        Optimization Recommendations
                    </h4>
                    <ul className="space-y-2">
                        {businessImpact.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-700">{recommendation}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            <div className="mt-4 text-xs text-slate-500 text-center">
                Last updated: {new Date(metrics.timestamp).toLocaleTimeString()}
            </div>
        </div>
    )
}
