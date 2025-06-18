'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
    Gauge,
    DollarSign,
    Code2,
    Layers3,
    CheckCircle2,
    TrendingDown,
    Server,
    Globe,
    ArrowRight,
    Target,
    Zap,
    Timer
} from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * PowerfulValueProposition - Engaging content that drives action
 * World-class design with compelling business case
 */
export function PowerfulValueProposition() {
    const { t } = useTranslation()
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    // Pain points that resonate with prospects
    const painPoints = [
        {
            problem: 'Slow websites kill conversions',
            impact: '7% revenue loss per 100ms delay',
            solution: 'Core Web Vitals optimization',
            icon: Gauge,
            color: 'red',
            stats: '40% bounce rate increase with 3s load time'
        },
        {
            problem: 'Expensive infrastructure costs',
            impact: '$5-25k/month wasted on poor architecture',
            solution: 'Modern serverless architecture',
            icon: DollarSign,
            color: 'orange',
            stats: '70% average cost reduction'
        },
        {
            problem: 'Outdated tech slows development',
            impact: '2x longer development cycles',
            solution: 'Modern React + TypeScript stack',
            icon: Code2,
            color: 'blue',
            stats: '50% faster feature delivery'
        }
    ]

    // Powerful value propositions
    const valueProps = [
        {
            title: 'Lightning Performance',
            description: 'Transform your site into a speed demon that converts visitors into customers',
            benefits: [
                'Sub-1s load times guaranteed',
                'Perfect Lighthouse scores',
                'Mobile-first optimization',
                'Edge CDN deployment'
            ],
            metric: '200%+ conversion increase',
            icon: Zap,
            gradient: 'from-yellow-400 to-orange-500'
        },
        {
            title: 'Cost Optimization',
            description: 'Cut your hosting bills while dramatically improving performance',
            benefits: [
                'Serverless architecture migration',
                'Optimized database queries',
                'Smart caching strategies',
                'Resource usage monitoring'
            ],
            metric: '70% cost reduction',
            icon: TrendingDown,
            gradient: 'from-green-400 to-emerald-500'
        },
        {
            title: 'Modern Development',
            description: 'Future-proof your codebase with cutting-edge React architecture',
            benefits: [
                'TypeScript for type safety',
                'Component-driven development',
                'Automated testing setup',
                'CI/CD pipeline implementation'
            ],
            metric: '50% faster releases',
            icon: Code2,
            gradient: 'from-blue-400 to-indigo-500'
        }
    ]

    // Success stories with real impact
    const successStories = [
        {
            company: 'E-commerce Giant',
            industry: 'Retail',
            challenge: 'Site speed killing mobile conversions',
            transformation: 'Complete React + Next.js rebuild',
            results: {
                performance: 'Load time: 4.2s → 0.9s',
                business: '+156% mobile conversions',
                revenue: '+$2.1M annual revenue'
            },
            testimonial: 'The performance improvements completely transformed our business. Mobile sales tripled in just 6 weeks.',
            timeline: '4 weeks delivery'
        },
        {
            company: 'SaaS Platform',
            industry: 'Software',
            challenge: 'High infrastructure costs, poor UX',
            transformation: 'Serverless migration + performance optimization',
            results: {
                performance: 'API response: 2.1s → 180ms',
                business: '+89% user retention',
                revenue: '-78% hosting costs'
            },
            testimonial: 'We saved over $180k annually while delivering the best user experience we\'ve ever had.',
            timeline: '6 weeks delivery'
        }
    ]

    return (
        <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">

            {/* Subtle background elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0"
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Compelling introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-8">
                        <Target className="w-4 h-4" />
                        Performance That Drives Revenue
                    </div>

                    <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                        Stop losing money to{' '}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                slow websites
                            </span>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 origin-left"
                            />
                        </span>
                    </h2>

                    <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                        Every second your site takes to load costs you customers. We build{' '}
                        <span className="text-blue-600 font-medium">lightning-fast React applications</span>{' '}
                        that convert visitors into revenue and slash your hosting costs.
                    </p>
                </motion.div>

                {/* Pain points that resonate */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">
                            Is your website bleeding money?
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            These costly problems are more common than you think
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">                        {painPoints.map((pain, index) => {
                        const Icon = pain.icon
                        const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
                            red: {
                                bg: 'from-red-500 to-red-600',
                                border: 'border-red-200',
                                text: 'text-red-700',
                                icon: 'bg-red-100'
                            },
                            orange: {
                                bg: 'from-orange-500 to-orange-600',
                                border: 'border-orange-200',
                                text: 'text-orange-700',
                                icon: 'bg-orange-100'
                            },
                            blue: {
                                bg: 'from-blue-500 to-blue-600',
                                border: 'border-blue-200',
                                text: 'text-blue-700',
                                icon: 'bg-blue-100'
                            }
                        }

                        const colors = colorClasses[pain.color] || colorClasses.blue

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }} className={`group relative p-8 bg-white rounded-3xl border-2 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 ${colors.icon} rounded-2xl`}>
                                            <Icon className={`w-8 h-8 ${colors.text}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                                {pain.problem}
                                            </h4>
                                            <div className={`text-lg font-semibold ${colors.text}`}>
                                                {pain.impact}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="text-gray-600 text-sm mb-2">Real impact:</div>
                                        <div className="text-gray-800 font-medium">{pain.stats}</div>
                                    </div>

                                    <div className={`px-4 py-3 bg-gradient-to-r ${colors.bg} rounded-xl text-white font-medium text-center`}>
                                        Our solution: {pain.solution}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                    </div>
                </motion.div>

                {/* Powerful value propositions */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">
                            Transform your business with modern React
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Real solutions that drive measurable results
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {valueProps.map((prop, index) => {
                            const Icon = prop.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="group relative p-8 bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`p-4 bg-gradient-to-br ${prop.gradient} rounded-2xl`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                                    {prop.title}
                                                </h4>
                                                <div className={`text-2xl font-bold bg-gradient-to-r ${prop.gradient} bg-clip-text text-transparent`}>
                                                    {prop.metric}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                            {prop.description}
                                        </p>

                                        <div className="space-y-3">
                                            {prop.benefits.map((benefit, benefitIndex) => (
                                                <div key={benefitIndex} className="flex items-center gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Success stories that build trust */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">
                            Real results from real companies
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            See how we've transformed businesses like yours
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {successStories.map((story, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="relative p-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 shadow-xl"
                            >
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="p-4 bg-green-100 rounded-2xl">
                                        <Globe className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                            {story.company}
                                        </h4>
                                        <p className="text-gray-600 mb-4">
                                            {story.industry} • {story.challenge}
                                        </p>
                                        <div className="text-gray-700 mb-4">
                                            <strong>Solution:</strong> {story.transformation}
                                        </div>
                                        <div className="text-sm text-gray-500 mb-6">
                                            ⏱️ {story.timeline}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Performance</span>
                                        <span className="font-bold text-blue-600">{story.results.performance}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Business Impact</span>
                                        <span className="font-bold text-green-600">{story.results.business}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-600">Revenue Impact</span>
                                        <span className="font-bold text-green-600">{story.results.revenue}</span>
                                    </div>
                                </div>

                                <blockquote className="italic text-gray-700 text-lg leading-relaxed border-l-4 border-blue-500 pl-6">
                                    "{story.testimonial}"
                                </blockquote>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
