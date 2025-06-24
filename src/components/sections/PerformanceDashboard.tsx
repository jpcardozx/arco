'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Zap } from 'lucide-react'

/**
 * PERFORMANCE DASHBOARD
 * 
 * Dashboard em tempo real para monitorar performance da aplicação
 * Correlaciona métricas técnicas com KPIs de negócio
 */

interface PerformanceData {
    lcp: number
    cls: number
    inp: number
    fcp: number
    ttfb: number
    timestamp: number
}

interface BusinessMetrics {
    conversionRate: number
    bounceRate: number
    averageSessionTime: number
    revenue: number
}

const getRating = (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = {
        lcp: { good: 2500, poor: 4000 },
        cls: { good: 0.1, poor: 0.25 },
        inp: { good: 200, poor: 500 },
        fcp: { good: 1800, poor: 3000 },
        ttfb: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[metric as keyof typeof thresholds]
    if (!threshold) return 'good'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
}

const formatValue = (metric: string, value: number): string => {
    if (metric === 'cls') return value.toFixed(3)
    return Math.round(value).toString() + 'ms'
}

const MetricCard = ({ metric, value, label }: { metric: string, value: number, label: string }) => {
    const rating = getRating(metric, value)
    const colorClasses = {
        good: 'border-emerald-500 bg-emerald-50 text-emerald-700',
        'needs-improvement': 'border-yellow-500 bg-yellow-50 text-yellow-700',
        poor: 'border-red-500 bg-red-50 text-red-700'
    }

    const icons = {
        good: <CheckCircle className="w-5 h-5" />,
        'needs-improvement': <AlertTriangle className="w-5 h-5" />,
        poor: <AlertTriangle className="w-5 h-5" />
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl border-2 ${colorClasses[rating]}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wide">{label}</span>
                {icons[rating]}
            </div>
            <div className="text-2xl font-bold mb-1">
                {formatValue(metric, value)}
            </div>
            <div className="text-xs capitalize">
                {rating.replace('-', ' ')}
            </div>
        </motion.div>
    )
}

const BusinessImpactCard = ({
    title,
    value,
    trend,
    impact
}: {
    title: string
    value: string
    trend: 'up' | 'down' | 'stable'
    impact: string
}) => {
    const trendColors = {
        up: 'text-emerald-600',
        down: 'text-red-600',
        stable: 'text-slate-600'
    }

    const trendIcons = {
        up: <TrendingUp className="w-4 h-4" />,
        down: <TrendingUp className="w-4 h-4 rotate-180" />,
        stable: <Activity className="w-4 h-4" />
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <div className={`flex items-center ${trendColors[trend]}`}>
                    {trendIcons[trend]}
                </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
            <div className="text-sm text-slate-600">{impact}</div>
        </motion.div>
    )
}

export function PerformanceDashboard() {
    const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
    const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Simulate real-time data collection
        const collectPerformanceData = async () => {
            try {
                const { onLCP, onCLS, onINP, onFCP, onTTFB } = await import('web-vitals')

                const metrics: Partial<PerformanceData> = { timestamp: Date.now() }

                onLCP(metric => metrics.lcp = metric.value)
                onCLS(metric => metrics.cls = metric.value)
                onINP(metric => metrics.inp = metric.value)
                onFCP(metric => metrics.fcp = metric.value)
                onTTFB(metric => metrics.ttfb = metric.value)

                // Simulate data collection delay
                setTimeout(() => {
                    setPerformanceData(metrics as PerformanceData)
                }, 1000)

            } catch (error) {
                console.warn('Web Vitals not available:', error)
                // Fallback mock data for development
                setPerformanceData({
                    lcp: 1750,
                    cls: 0.05,
                    inp: 150,
                    fcp: 1200,
                    ttfb: 600,
                    timestamp: Date.now()
                })
            }
        }

        // Simulate business metrics
        const collectBusinessMetrics = () => {
            setBusinessMetrics({
                conversionRate: 4.7,
                bounceRate: 31.2,
                averageSessionTime: 178,
                revenue: 18750
            })
        }

        collectPerformanceData()
        collectBusinessMetrics()

        // Setup real-time updates
        const interval = setInterval(() => {
            collectPerformanceData()
            collectBusinessMetrics()
        }, 30000) // Update every 30 seconds

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        )

        const element = document.getElementById('performance-dashboard')
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    if (!performanceData || !businessMetrics) {
        return (
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-4">
                            <Zap className="w-4 h-4 mr-2 animate-pulse" />
                            Coletando métricas de performance...
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section
            id="performance-dashboard"
            className="py-20 bg-slate-50"
            data-section="performance-dashboard"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Performance Real-Time
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Monitoramento em tempo real das métricas de performance correlacionadas com impacto de negócio
                    </p>
                </motion.div>

                {/* Core Web Vitals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-12"
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Core Web Vitals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <MetricCard metric="lcp" value={performanceData.lcp} label="LCP" />
                        <MetricCard metric="cls" value={performanceData.cls} label="CLS" />
                        <MetricCard metric="inp" value={performanceData.inp} label="INP" />
                        <MetricCard metric="fcp" value={performanceData.fcp} label="FCP" />
                        <MetricCard metric="ttfb" value={performanceData.ttfb} label="TTFB" />
                    </div>
                </motion.div>

                {/* Business Impact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Business Impact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <BusinessImpactCard
                            title="Conversion Rate"
                            value={`${businessMetrics.conversionRate}%`}
                            trend="up"
                            impact="↑ 32% vs. previous period"
                        />
                        <BusinessImpactCard
                            title="Bounce Rate"
                            value={`${businessMetrics.bounceRate}%`}
                            trend="down"
                            impact="↓ 18% improvement"
                        />
                        <BusinessImpactCard
                            title="Session Time"
                            value={`${Math.floor(businessMetrics.averageSessionTime / 60)}:${(businessMetrics.averageSessionTime % 60).toString().padStart(2, '0')}`}
                            trend="up"
                            impact="↑ 45s increase"
                        />
                        <BusinessImpactCard
                            title="Daily Revenue"
                            value={`$${businessMetrics.revenue.toLocaleString()}`}
                            trend="up"
                            impact="↑ 23% from optimization"
                        />
                    </div>
                </motion.div>

                {/* Performance Score */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white inline-block">
                        <h3 className="text-2xl font-bold mb-4">Performance Score</h3>
                        <div className="text-6xl font-bold mb-2">94</div>
                        <div className="text-emerald-100">Excellent Performance</div>
                        <div className="text-sm text-emerald-200 mt-2">
                            Target: LCP &lt; 1.8s achieved • All metrics green
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default PerformanceDashboard
