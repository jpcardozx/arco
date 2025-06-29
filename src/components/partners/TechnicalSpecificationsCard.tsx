'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Code,
    Settings,
    BarChart3,
    CheckCircle,
    Clock,
    DollarSign,
    Zap,
    Shield,
    ChevronDown,
    ChevronUp
} from 'lucide-react'

// Technical specifications that demonstrate depth without overwhelming business users
export function TechnicalSpecificationsCard() {
    const [expandedCategory, setExpandedCategory] = useState<number | null>(0)

    // Technical capabilities organized by business value
    const technicalCategories = [
        {
            category: "Performance Engineering",
            businessValue: "Faster load times = higher conversions",
            impact: "Average 67% conversion improvement",
            timeframe: "7-21 days",
            icon: Zap,
            color: "from-blue-500 to-indigo-600",
            specifications: [
                {
                    capability: "Core Web Vitals Optimization",
                    description: "Achieve perfect 100/100 scores for SEO and user experience",
                    technologies: ["Next.js SSR", "Image optimization", "Code splitting", "Lazy loading"],
                    businessBenefit: "Google ranking improvement + better user retention"
                },
                {
                    capability: "Load Time Optimization",
                    description: "Target: sub-1 second load times for optimal conversion rates",
                    technologies: ["CDN implementation", "Caching strategies", "Database optimization", "Bundle analysis"],
                    businessBenefit: "Every 100ms improvement = ~1% conversion increase"
                },
                {
                    capability: "Mobile Performance",
                    description: "Ensure mobile performs at desktop-level conversion rates",
                    technologies: ["Progressive Web App", "Touch optimization", "Viewport handling", "Mobile-first CSS"],
                    businessBenefit: "Close mobile vs desktop conversion gap"
                }
            ]
        },
        {
            category: "Conversion Architecture",
            businessValue: "Systematic funnel optimization",
            impact: "1.9% → 8.2% conversion rates achievable",
            timeframe: "14-45 days",
            icon: BarChart3,
            color: "from-emerald-500 to-teal-600",
            specifications: [
                {
                    capability: "Funnel Analytics Implementation",
                    description: "Track every step with revenue attribution and user behavior analysis",
                    technologies: ["Google Analytics 4", "Custom event tracking", "Heat mapping", "Session recordings"],
                    businessBenefit: "Identify exactly where customers drop off and why"
                },
                {
                    capability: "A/B Testing Framework",
                    description: "Systematic testing with statistical significance and revenue tracking",
                    technologies: ["Split testing tools", "Statistical analysis", "Conversion tracking", "User segmentation"],
                    businessBenefit: "Data-driven improvements with measured ROI"
                },
                {
                    capability: "Checkout Flow Optimization",
                    description: "Reduce friction and abandonment at critical conversion points",
                    technologies: ["Form optimization", "Payment gateway integration", "Error handling", "Progress indicators"],
                    businessBenefit: "Recover revenue lost to checkout abandonment"
                }
            ]
        },
        {
            category: "Stack Efficiency",
            businessValue: "Reduce costs while improving performance",
            impact: "Average $2,400/month in tool consolidation savings",
            timeframe: "7-28 days",
            icon: Settings,
            color: "from-purple-500 to-pink-600",
            specifications: [
                {
                    capability: "Tool Consolidation Analysis",
                    description: "Identify redundant subscriptions and optimize your technology stack",
                    technologies: ["SaaS audit", "Integration mapping", "Cost analysis", "Performance comparison"],
                    businessBenefit: "Immediate monthly savings + reduced complexity"
                },
                {
                    capability: "Native Integration Development",
                    description: "Replace expensive middleware with direct integrations",
                    technologies: ["API development", "Webhook systems", "Database optimization", "Custom automation"],
                    businessBenefit: "Eliminate Zapier/automation tool costs"
                },
                {
                    capability: "Headless CMS Implementation",
                    description: "Content management that scales with your business growth",
                    technologies: ["Strapi", "Contentful", "Sanity", "Custom CMS solutions"],
                    businessBenefit: "200% faster content updates + developer independence"
                }
            ]
        }
    ]

    // Implementation guarantees with business focus
    const implementationGuarantees = [
        {
            guarantee: "Performance Results",
            description: "Sub-1 second load times or we work until achieved",
            icon: Clock
        },
        {
            guarantee: "ROI Tracking",
            description: "Every technical change tied to revenue impact measurement",
            icon: DollarSign
        },
        {
            guarantee: "Professional Standards",
            description: "Clean code, documentation, and knowledge transfer included",
            icon: Shield
        },
        {
            guarantee: "Ongoing Support",
            description: "30-day post-implementation monitoring and optimization",
            icon: CheckCircle
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-5 py-2 mb-6">
                        <Code className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-800 font-medium">Technical Specifications</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-light text-slate-900 mb-4">
                        Technical Capabilities & Business Impact
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Detailed technical specifications for teams that need to understand the implementation approach.
                    </p>
                </motion.div>

                {/* Technical categories */}
                <div className="space-y-4 mb-16">
                    {technicalCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
                        >
                            {/* Category header */}
                            <button
                                onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                                className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                            <category.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">
                                                {category.category}
                                            </h3>
                                            <p className="text-slate-600">{category.businessValue}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-green-600">{category.impact}</p>
                                            <p className="text-xs text-slate-500">{category.timeframe}</p>
                                        </div>
                                        {expandedCategory === index ? (
                                            <ChevronUp className="w-5 h-5 text-slate-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {/* Expanded specifications */}
                            <AnimatePresence>
                                {expandedCategory === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-slate-200"
                                    >
                                        <div className="p-6 bg-slate-50">
                                            <div className="space-y-6">
                                                {category.specifications.map((spec, specIndex) => (
                                                    <motion.div
                                                        key={specIndex}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: specIndex * 0.1 }}
                                                        className="bg-white rounded-lg p-6 border border-slate-200"
                                                    >
                                                        <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                                            {spec.capability}
                                                        </h4>
                                                        <p className="text-slate-600 mb-4">
                                                            {spec.description}
                                                        </p>
                                                        
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div>
                                                                <h5 className="text-sm font-medium text-slate-700 mb-2">
                                                                    Technologies Used:
                                                                </h5>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {spec.technologies.map((tech, techIndex) => (
                                                                        <span
                                                                            key={techIndex}
                                                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-sm font-medium text-slate-700 mb-2">
                                                                    Business Benefit:
                                                                </h5>
                                                                <p className="text-sm text-green-700 bg-green-50 rounded p-3">
                                                                    {spec.businessBenefit}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Implementation guarantees */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-slate-900 rounded-xl p-8 text-white"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-semibold mb-4">
                            Implementation Guarantees
                        </h3>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            Professional standards and measurable outcomes for every technical implementation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {implementationGuarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <guarantee.icon className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-2">
                                    {guarantee.guarantee}
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {guarantee.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}