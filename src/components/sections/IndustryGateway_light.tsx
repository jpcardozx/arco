'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
    ShoppingCart,
    Briefcase,
    BarChart3,
    Clock,
    ArrowRight,
    Target,
    ChevronDown,
    Building2,
    Zap,
    Star,
    Award,
    TrendingUp,
    Users,
    ChartBar,
    Sparkles
} from 'lucide-react'

interface IndustryData {
    id: string
    name: string
    icon: React.ReactNode
    badge: string
    tagline: string
    businessContext: string
    keyMetric: string
    baselineRange: string
    improvementRange: string
    metrics: {
        primary: {
            label: string
            baseline: string
            optimized: string
            unit: string
            improvement: number
        }
        secondary: {
            label: string
            baseline: string
            optimized: string
            unit: string
            improvement: number
        }
        timeline: string
    }
    caseStudy: {
        profile: string
        challenge: string
        approach: string
        outcome: string
        businessValue: string
        testimonial: string
        clientRole: string
    }
    highlights: string[]
    color: {
        primary: string
        secondary: string
        accent: string
    }
}

export function IndustryGateway() {
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

    const industries: IndustryData[] = [{
        id: 'ecommerce',
        name: 'E-commerce & Retail',
        icon: <ShoppingCart className="w-8 h-8" strokeWidth={1.5} />,
        badge: 'Revenue Optimization',
        tagline: 'Transform browsers into buyers',
        businessContext: 'Maximize revenue per visitor through advanced conversion optimization and user experience enhancement',
        keyMetric: 'Revenue Per Visitor',
        baselineRange: '$2.40-$4.80',
        improvementRange: '$5.20-$8.90',
        metrics: {
            primary: {
                label: 'Conversion Rate',
                baseline: '2.4',
                optimized: '5.8',
                unit: '%',
                improvement: 142
            },
            secondary: {
                label: 'Page Speed',
                baseline: '42',
                optimized: '94',
                unit: '/100',
                improvement: 124
            },
            timeline: '3-5 weeks'
        },
        caseStudy: {
            profile: 'Premium fashion retailer with $8.5M ARR and 120K monthly visitors',
            challenge: 'Mobile performance issues during peak seasons caused $2.3M in lost revenue',
            approach: 'Core Web Vitals optimization, checkout redesign, mobile experience enhancement',
            outcome: '142% conversion improvement, 67% mobile bounce reduction, 43% AOV increase',
            businessValue: '$3.2M additional revenue in first quarter post-optimization',
            testimonial: "ARCO's optimization directly contributed to our most successful quarter ever.",
            clientRole: 'Chief Digital Officer'
        },
        highlights: ['Mobile Revenue +340%', 'Cart Recovery +89%', 'Customer LTV +89%'],
        color: {
            primary: 'blue-600',
            secondary: 'blue-100',
            accent: 'blue-500'
        }
    }, {
        id: 'saas',
        name: 'SaaS & Technology',
        icon: <BarChart3 className="w-8 h-8" strokeWidth={1.5} />,
        badge: 'Growth Acceleration',
        tagline: 'Scale trials into revenue',
        businessContext: 'Accelerate growth through trial conversion optimization and user acquisition enhancement',
        keyMetric: 'Trial-to-Paid Rate',
        baselineRange: '12.5-28.3%',
        improvementRange: '24.7-45.2%',
        metrics: {
            primary: {
                label: 'Trial Signup',
                baseline: '7.3',
                optimized: '18.9',
                unit: '%',
                improvement: 159
            },
            secondary: {
                label: 'Demo Completion',
                baseline: '34',
                optimized: '78',
                unit: '%',
                improvement: 129
            },
            timeline: '4-7 weeks'
        },
        caseStudy: {
            profile: 'Enterprise B2B platform with $15M ARR serving Fortune 500 clients',
            challenge: 'Complex pricing and slow demos caused 73% trial drop-off rate',
            approach: 'User journey optimization, demo enhancement, performance engineering',
            outcome: '159% trial increase, 129% demo completion, 45% sales cycle reduction',
            businessValue: '$4.7M additional ARR through optimized conversion funnel',
            testimonial: "We've seen our highest conversion rates in company history.",
            clientRole: 'VP of Growth'
        },
        highlights: ['Trial Quality +89%', 'Sales Cycle -45%', 'CAC Reduction -67%'],
        color: {
            primary: 'indigo-600',
            secondary: 'indigo-100',
            accent: 'indigo-500'
        }
    }, {
        id: 'services',
        name: 'Professional Services',
        icon: <Briefcase className="w-8 h-8" strokeWidth={1.5} />,
        badge: 'Client Acquisition',
        tagline: 'Convert prospects into clients',
        businessContext: 'Elevate professional credibility and convert C-level prospects into high-value engagements',
        keyMetric: 'Qualified Lead Rate',
        baselineRange: '3.2-7.8%',
        improvementRange: '8.4-16.7%',
        metrics: {
            primary: {
                label: 'Contact Conversion',
                baseline: '3.8',
                optimized: '11.2',
                unit: '%',
                improvement: 195
            },
            secondary: {
                label: 'Mobile Experience',
                baseline: '61',
                optimized: '96',
                unit: '/100',
                improvement: 57
            },
            timeline: '2-4 weeks'
        },
        caseStudy: {
            profile: 'Global strategy consulting firm with $45M revenue serving Fortune 100',
            challenge: 'Poor mobile experience resulted in 81% C-level prospect bounce rate',
            approach: 'Executive UX redesign, form optimization, mobile-first enhancement',
            outcome: '195% qualified contact increase, 78% C-level engagement improvement',
            businessValue: '$6.8M additional revenue through enhanced digital presence',
            testimonial: "Our digital transformation has fundamentally changed executive engagement.",
            clientRole: 'Managing Partner'
        },
        highlights: ['C-Level Engagement +78%', 'Proposal Requests +89%', 'Mobile Conversion +156%'],
        color: {
            primary: 'emerald-600',
            secondary: 'emerald-100',
            accent: 'emerald-500'
        }
    }]; const handleMouseMove = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section className="relative py-24 overflow-hidden bg-white">
            {/* Subtle background pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.06)_0%,transparent_50%)]" />

                {/* Geometric grid */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Premium Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    {/* Premium badge with micro-interactions */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                    >
                        <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                            <motion.div
                                className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 tracking-wide">INDUSTRY EXPERTISE</span>
                        <motion.div
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Enhanced typography hierarchy */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-none">
                        <span className="text-slate-900">Performance That</span>
                        <br />
                        <span className="text-blue-600">Drives Revenue</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
                        Industry-specific optimization strategies that transform digital experiences into measurable business growth.
                        <span className="block mt-2 text-lg text-slate-500">Proven results across e-commerce, SaaS, and professional services.</span>
                    </p>

                    {/* Stats row with micro-interactions */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {[
                            { value: '195%', label: 'Avg Performance Gain' },
                            { value: '$6.8M', label: 'Revenue Impact' },
                            { value: '3-7', label: 'Weeks to Results' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="text-center group cursor-pointer"
                            >
                                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>                {/* Premium Industry Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={industry.id}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                            className={`
                                relative group cursor-pointer transition-all duration-500
                                ${selectedIndustry === industry.id ? 'scale-105 z-20' : 'hover:scale-102'}
                            `}
                            onClick={() => setSelectedIndustry(
                                selectedIndustry === industry.id ? null : industry.id
                            )}
                            onHoverStart={() => setHoveredCard(industry.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            whileHover={{ y: -6 }}
                            onMouseMove={handleMouseMove}
                        >
                            {/* Clean card design */}
                            <motion.div
                                className={`
                                    relative overflow-hidden rounded-2xl backdrop-blur-sm
                                    transition-all duration-500 
                                    ${selectedIndustry === industry.id
                                        ? `bg-white border-2 border-${industry.color.primary} shadow-2xl shadow-${industry.color.primary}/20`
                                        : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300'
                                    }
                                `}
                                style={{
                                    rotateX: selectedIndustry === industry.id ? rotateX : 0,
                                    rotateY: selectedIndustry === industry.id ? rotateY : 0,
                                }}
                            >
                                {/* Subtle background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-${industry.color.secondary}/30 via-transparent to-${industry.color.secondary}/10 opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                                <div className="relative p-8">
                                    {/* Premium badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.15 + 0.2 }}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-${industry.color.secondary} text-${industry.color.primary} text-xs font-bold uppercase tracking-wider rounded-full border border-${industry.color.primary}/20`}
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        {industry.badge}
                                    </motion.div>

                                    {/* Icon and header */}
                                    <div className="flex items-start gap-6 mb-8">
                                        <motion.div
                                            className={`
                                                p-4 rounded-xl transition-all duration-500 group-hover:scale-110
                                                ${selectedIndustry === industry.id
                                                    ? `bg-${industry.color.primary} text-white shadow-lg shadow-${industry.color.primary}/30`
                                                    : `bg-${industry.color.secondary} text-${industry.color.primary} group-hover:bg-${industry.color.primary} group-hover:text-white group-hover:shadow-lg`
                                                }
                                            `}
                                            whileHover={{ rotate: [0, -5, 5, 0] }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {industry.icon}
                                        </motion.div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
                                                {industry.name}
                                            </h3>
                                            <p className={`text-sm font-semibold text-${industry.color.primary} mb-3 tracking-wide`}>
                                                {industry.tagline}
                                            </p>
                                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                                {industry.businessContext}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Metrics showcase */}
                                    <div className="space-y-6">
                                        {/* Primary metric */}
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 bg-${industry.color.primary} rounded-full`} />
                                                    <span className="font-bold text-slate-800 text-sm">{industry.metrics.primary.label}</span>
                                                </div>
                                                <div className="px-3 py-1 bg-white rounded-full border border-slate-200 text-xs font-semibold text-slate-600">
                                                    Industry: {industry.baselineRange}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="text-center">
                                                    <div className="text-xl font-bold text-slate-500 mb-1">
                                                        {industry.metrics.primary.baseline}{industry.metrics.primary.unit}
                                                    </div>
                                                    <div className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded font-medium">Current</div>
                                                </div>

                                                <div className="flex flex-col items-center gap-2">
                                                    <ArrowRight className={`w-5 h-5 text-${industry.color.primary}`} />
                                                    <div className={`px-2 py-1 bg-${industry.color.primary} text-white text-xs font-bold rounded`}>
                                                        +{industry.metrics.primary.improvement}%
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <div className={`text-2xl font-black mb-1 text-${industry.color.primary}`}>
                                                        {industry.metrics.primary.optimized}{industry.metrics.primary.unit}
                                                    </div>
                                                    <div className={`text-xs bg-${industry.color.primary} text-white px-2 py-1 rounded font-bold`}>Optimized</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Secondary metric */}
                                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 bg-${industry.color.accent} rounded-full`} />
                                                <span className="font-semibold text-slate-700 text-sm">{industry.metrics.secondary.label}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-500 font-medium text-sm">{industry.metrics.secondary.baseline}{industry.metrics.secondary.unit}</span>
                                                <ArrowRight className="w-3 h-3 text-slate-400" />
                                                <span className={`font-black text-${industry.color.primary}`}>
                                                    {industry.metrics.secondary.optimized}{industry.metrics.secondary.unit}
                                                </span>
                                                <div className={`px-2 py-0.5 bg-${industry.color.accent} text-white text-xs font-bold rounded`}>
                                                    +{industry.metrics.secondary.improvement}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Highlights and footer */}
                                    <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {industry.highlights.slice(0, 3).map((highlight, i) => (
                                                <span key={i} className={`px-3 py-1 bg-${industry.color.secondary} text-${industry.color.primary} text-xs font-bold rounded-full border border-${industry.color.primary}/20`}>
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className={`text-lg font-black text-${industry.color.primary}`}>
                                                    {industry.metrics.primary.improvement}% Performance Gain
                                                </span>
                                                <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {industry.metrics.timeline}
                                                </span>
                                            </div>

                                            <motion.div
                                                className="flex items-center gap-2 cursor-pointer group/chevron"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <span className="text-sm text-slate-600 font-semibold">Case Study</span>
                                                <ChevronDown className={`
                                                    w-5 h-5 transition-all duration-300 
                                                    ${selectedIndustry === industry.id
                                                        ? `rotate-180 text-${industry.color.primary}`
                                                        : 'text-slate-400 group-hover/chevron:text-slate-600'
                                                    }
                                                `} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>                {/* Clean Case Study Section */}
                <AnimatePresence mode="wait">
                    {selectedIndustry && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mb-20"
                        >
                            {(() => {
                                const industry = industries.find(i => i.id === selectedIndustry)!
                                return (
                                    <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-lg">
                                        {/* Header */}
                                        <div className="flex items-center gap-6 mb-12">
                                            <motion.div
                                                className={`p-6 rounded-xl bg-${industry.color.primary} text-white shadow-lg`}
                                                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                                            >
                                                {industry.icon}
                                            </motion.div>
                                            <div className="flex-1">
                                                <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                                                    {industry.name} Success Story
                                                </h4>
                                                <p className="text-lg text-slate-600 font-medium">{industry.caseStudy.profile}</p>
                                            </div>
                                        </div>

                                        {/* Content Grid */}
                                        <div className="grid lg:grid-cols-3 gap-8">
                                            <div className="lg:col-span-2 space-y-8">
                                                {/* Challenge */}
                                                <motion.div
                                                    className="p-6 bg-red-50 border border-red-100 rounded-xl"
                                                    whileHover={{ y: -2, shadow: "0 10px 30px rgba(239, 68, 68, 0.1)" }}
                                                >
                                                    <h6 className="font-black text-red-900 mb-4 text-lg flex items-center gap-3">
                                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                                        Challenge
                                                    </h6>
                                                    <p className="text-red-800 leading-relaxed font-medium">{industry.caseStudy.challenge}</p>
                                                </motion.div>

                                                {/* Approach */}
                                                <motion.div
                                                    className={`p-6 bg-${industry.color.secondary} border border-${industry.color.primary}/20 rounded-xl`}
                                                    whileHover={{ y: -2 }}
                                                >
                                                    <h6 className={`font-black text-${industry.color.primary} mb-4 text-lg flex items-center gap-3`}>
                                                        <div className={`w-3 h-3 bg-${industry.color.primary} rounded-full`} />
                                                        Solution
                                                    </h6>
                                                    <p className={`text-${industry.color.primary} leading-relaxed font-medium`}>{industry.caseStudy.approach}</p>
                                                </motion.div>

                                                {/* Results */}
                                                <motion.div
                                                    className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl"
                                                    whileHover={{ y: -2 }}
                                                >
                                                    <h6 className="font-black text-emerald-900 mb-4 text-lg flex items-center gap-3">
                                                        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                                                        Results
                                                    </h6>
                                                    <p className="text-emerald-800 leading-relaxed mb-4 font-medium">{industry.caseStudy.outcome}</p>
                                                    <div className="p-4 bg-emerald-100 rounded-lg border border-emerald-200">
                                                        <p className="text-emerald-900 font-bold text-lg">{industry.caseStudy.businessValue}</p>
                                                    </div>
                                                </motion.div>

                                                {/* Testimonial */}
                                                <motion.div
                                                    className="p-6 bg-slate-50 border border-slate-200 rounded-xl"
                                                    whileHover={{ y: -2 }}
                                                >
                                                    <div className="flex items-center gap-2 mb-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                                        ))}
                                                    </div>
                                                    <blockquote className="text-slate-700 leading-relaxed mb-4 font-medium text-lg italic">
                                                        "{industry.caseStudy.testimonial}"
                                                    </blockquote>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-slate-400 rounded-full" />
                                                        <span className="font-bold text-slate-800">{industry.caseStudy.clientRole}</span>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Metrics Sidebar */}
                                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                                <h5 className="font-black text-slate-900 mb-6 text-xl tracking-tight">
                                                    Key Metrics
                                                </h5>

                                                <div className="space-y-6">
                                                    {/* Primary metric */}
                                                    <div className="bg-white rounded-lg p-6 border border-slate-200">
                                                        <div className="text-sm text-slate-600 mb-3 font-semibold uppercase tracking-wide">{industry.metrics.primary.label}</div>
                                                        <div className="flex items-baseline gap-3 mb-4">
                                                            <span className={`text-3xl font-black text-${industry.color.primary}`}>
                                                                {industry.metrics.primary.optimized}{industry.metrics.primary.unit}
                                                            </span>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs text-slate-500 font-medium">from</span>
                                                                <span className="text-lg text-slate-500 font-bold">
                                                                    {industry.metrics.primary.baseline}{industry.metrics.primary.unit}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                                                                <motion.div
                                                                    className={`bg-${industry.color.primary} h-2 rounded-full`}
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: '80%' }}
                                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                                />
                                                            </div>
                                                            <span className={`text-sm font-black text-${industry.color.primary}`}>
                                                                +{industry.metrics.primary.improvement}%
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Secondary metric */}
                                                    <div className="bg-white rounded-lg p-6 border border-slate-200">
                                                        <div className="text-sm text-slate-600 mb-3 font-semibold uppercase tracking-wide">{industry.metrics.secondary.label}</div>
                                                        <div className="flex items-baseline gap-3 mb-4">
                                                            <span className="text-3xl font-black text-emerald-600">
                                                                {industry.metrics.secondary.optimized}{industry.metrics.secondary.unit}
                                                            </span>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs text-slate-500 font-medium">from</span>
                                                                <span className="text-lg text-slate-500 font-bold">
                                                                    {industry.metrics.secondary.baseline}{industry.metrics.secondary.unit}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                                                                <motion.div
                                                                    className="bg-emerald-500 h-2 rounded-full"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: '70%' }}
                                                                    transition={{ duration: 1.5, delay: 0.8 }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-black text-emerald-600">
                                                                +{industry.metrics.secondary.improvement}%
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Timeline */}
                                                    <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg border border-slate-200">
                                                        <span className="text-slate-700 font-bold">Timeline</span>
                                                        <div className="flex items-center gap-2 text-slate-700">
                                                            <Clock className="w-4 h-4" />
                                                            <span className="font-black">{industry.metrics.timeline}</span>
                                                        </div>
                                                    </div>

                                                    {/* CTA */}
                                                    <motion.button
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`w-full mt-6 bg-${industry.color.primary} text-white py-4 px-6 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3`}
                                                    >
                                                        <Target className="w-5 h-5" />
                                                        Request Similar Analysis
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>                {/* Clean Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center"
                >
                    <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-12 border border-slate-200">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm mb-8">
                                <Award className="w-5 h-5 text-blue-600" />
                                <span className="text-slate-700 font-bold text-sm tracking-wide">PROVEN RESULTS</span>
                                <motion.div
                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>

                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Ready to Transform
                            <br />
                            <span className="text-blue-600">Your Performance?</span>
                        </h3>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
                            Join industry leaders who've achieved exceptional results through our proven optimization methodology.
                            <span className="block mt-2 text-lg text-slate-500">Get your comprehensive performance audit and start your transformation today.</span>
                        </p>

                        {/* Quick stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            {[
                                { value: '195%', label: 'Avg Performance Gain', color: 'text-emerald-600' },
                                { value: '$6.8M', label: 'Revenue Impact', color: 'text-blue-600' },
                                { value: '3-7', label: 'Weeks to Results', color: 'text-indigo-600' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="text-center group cursor-pointer"
                                >
                                    <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-6 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 flex items-center gap-4">
                                <TrendingUp className="w-6 h-6" />
                                <span>Request Performance Analysis</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
