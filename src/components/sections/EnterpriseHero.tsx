'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendingUp, Code, Terminal, Shield, Clock } from 'lucide-react'
import { trackEvent, trackFunnelStep } from '@/lib/analytics'
import { useContent } from '@/lib/content'

/**
 * ENTERPRISE HERO - TECHNICAL CREDIBILITY & AUTHORITY
 * 
 * Purpose:
 * - Establish technical credibility for engineering leaders
 * - Present clear problem-solution framework with measurable ROI
 * - Enterprise-grade design with actionable metrics
 * - Drive high-intent conversions through targeted CTAs
 */

export function EnterpriseHero() {
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const content = useContent()

    useEffect(() => {
        if (isInView) {
            trackFunnelStep('hero_view', 'conversion_funnel', {
                section: 'enterprise_hero',
                version: 'technical_authority',
                timestamp: Date.now()
            })
        }
    }, [isInView])

    const handlePrimaryCTA = () => {
        trackEvent({
            event: 'cta_click',
            category: 'conversion',
            action: 'primary_cta'
        })

        const contactSection = document.querySelector('[data-section="contact"]')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleSecondaryCTA = () => {
        trackEvent({
            event: 'cta_click',
            category: 'engagement',
            action: 'secondary_cta'
        })

        const casesSection = document.querySelector('[data-section="cases"]')
        if (casesSection) {
            casesSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const MetricCard = ({ color, metric, delay }: { color: string, metric: any, delay: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
        >
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${color} rounded-t-xl`} />
            
            <div className="w-full">
                <div className="text-3xl font-bold text-white mb-2 font-mono">
                    {metric.value}
                </div>
                <div className={`text-sm font-semibold ${color.includes('blue') ? 'text-blue-300' : 
                                color.includes('emerald') ? 'text-emerald-300' : 
                                color.includes('purple') ? 'text-purple-300' : 
                                'text-amber-300'} mb-3`}>
                    {metric.label}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                    {metric.desc}
                </div>
            </div>
        </motion.div>
    )

    return (
        <section 
            ref={containerRef}
            className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden" 
            data-section="hero"
        >
            {/* Technical background patterns */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.06)_0%,transparent_50%)]" />

                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column - Technical Value Proposition */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="text-white space-y-8"
                    >
                        {/* Technical Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 shadow-xl"
                        >
                            <Terminal className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-100">
                                {content.hero.badge}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            <span className="text-white">{content.hero.headline}</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-xl text-slate-300 max-w-2xl leading-relaxed"
                        >
                            {content.hero.subheadline}
                        </motion.p>

                        {/* Key Guarantees */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {content.hero.guarantees.map((guarantee, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-300 text-sm">{guarantee}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Call to Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                onClick={handlePrimaryCTA}
                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    {content.hero.cta.primary}
                                    <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                                </span>
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSecondaryCTA}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-200 font-medium rounded-xl hover:bg-slate-700/80 hover:border-slate-600 transition-all duration-300"
                            >
                                <Code className="w-5 h-5 mr-2" />
                                {content.hero.cta.secondary}
                            </motion.button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="pt-6 border-t border-slate-700/50"
                        >
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-400" />
                                    <span>Enterprise implementation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span>Performance guaranteed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span>4-6 week delivery</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Technical Metrics & Code */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Performance Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <MetricCard 
                                color="from-blue-500 to-blue-600" 
                                metric={content.hero.metrics.performance} 
                                delay={0.4} 
                            />
                            <MetricCard 
                                color="from-emerald-500 to-emerald-600" 
                                metric={content.hero.metrics.revenue} 
                                delay={0.5} 
                            />
                            <MetricCard 
                                color="from-purple-500 to-purple-600" 
                                metric={content.hero.metrics.infrastructure} 
                                delay={0.6} 
                            />
                            <MetricCard 
                                color="from-yellow-500 to-amber-600" 
                                metric={content.hero.metrics.deployment} 
                                delay={0.7} 
                            />
                        </div>

                        {/* Technical Terminal Demo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
                        >
                            {/* Terminal Header */}
                            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                </div>
                                <span className="ml-2 text-slate-400 text-xs font-mono">
                                    arco-performance-audit ~ react-optimization
                                </span>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[200px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                                <div className="mb-1 text-green-400">$ npm run analyze-bundle-size</div>
                                <div className="mb-1 text-slate-400">Analyzing bundle size...</div>
                                <div className="mb-2 text-yellow-400">⚠️ Found 387kB of unused JS in main bundle</div>
                                
                                <div className="mb-1 text-green-400">$ lighthouse --performance-only</div>
                                <div className="mb-1 text-slate-400">Running performance audit...</div>
                                <div className="mb-1 text-red-400">❌ LCP: 4.2s (mobile) - 3.1s threshold</div>
                                <div className="mb-2 text-red-400">❌ TTI: 7.8s (mobile) - 3.8s threshold</div>
                                
                                <div className="mb-1 text-green-400">$ optimize-react-components --analyze</div>
                                <div className="mb-1 text-slate-400">Analyzing React rendering performance...</div>
                                <div className="mb-1 text-yellow-400">⚠️ Detected 12 unnecessary re-renders</div>
                                <div className="mb-2 text-yellow-400">⚠️ Identified 8 unoptimized data fetching patterns</div>
                                
                                <div className="mb-1 text-blue-400">📋 OPTIMIZATION RECOMMENDATIONS:</div>
                                <div className="mb-1 text-slate-300">1. Implement code splitting (/dashboard bundle)</div>
                                <div className="mb-1 text-slate-300">2. Optimize image delivery with next/image</div>
                                <div className="mb-1 text-slate-300">3. Remove unused dependencies (8)</div>
                                <div className="mb-1 text-slate-300">4. Implement memoization for heavy components</div>
                                <div className="mb-1 text-slate-300">5. Move API calls to server components</div>
                                <div className="mb-2 text-slate-300">6. Cache expensive calculations</div>
                                
                                <div className="text-emerald-400">📈 EXPECTED IMPROVEMENTS: 68% faster LCP, 56% reduced bundle size</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

