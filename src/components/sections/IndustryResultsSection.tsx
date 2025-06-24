'use client'

import { motion } from 'framer-motion'
import {
    ShoppingCart,
    Monitor,
    CreditCard,
    Building,
    ArrowRight,
    TrendingUp,
    Clock,
    Target
} from 'lucide-react'

interface IndustryResult {
    industry: string
    metric: string
    improvement: string
    icon: React.ComponentType<{ className?: string }>
    details: {
        conversionRate: string
        timeline: string
        capabilities: string[]
        successStory: {
            client: string
            result: string
            roi: string
        }
    }
}

export function IndustryResultsSection() {
    const results: IndustryResult[] = [
        {
            industry: "E-commerce & Retail",
            metric: "Conversion Rate",
            improvement: "+142% average increase",
            icon: ShoppingCart,
            details: {
                conversionRate: "+142% average increase",
                timeline: "3-5 weeks",
                capabilities: [
                    "Mobile-first checkout optimization",
                    "AI-powered product recommendations",
                    "Cart abandonment recovery systems"
                ],
                successStory: {
                    client: "Fashion Retailer",
                    result: "+$2.3M annual revenue",
                    roi: "300% ROI in 6 months"
                }
            }
        },
        {
            industry: "SaaS & Technology",
            metric: "Customer LTV",
            improvement: "+210% average increase",
            icon: Monitor,
            details: {
                conversionRate: "+210% average increase",
                timeline: "4-6 weeks",
                capabilities: [
                    "Onboarding flow optimization",
                    "Feature adoption analytics",
                    "Churn prediction systems"
                ],
                successStory: {
                    client: "B2B SaaS Platform",
                    result: "+$5.1M ARR increase",
                    roi: "420% ROI in 8 months"
                }
            }
        },
        {
            industry: "Financial Services",
            metric: "Application Completion",
            improvement: "+185% average increase",
            icon: CreditCard,
            details: {
                conversionRate: "+185% average increase",
                timeline: "2-4 weeks",
                capabilities: [
                    "Simplified application forms",
                    "Real-time validation systems",
                    "Progressive disclosure design"
                ],
                successStory: {
                    client: "Regional Bank",
                    result: "+$8.7M loan volume",
                    roi: "510% ROI in 4 months"
                }
            }
        },
        {
            industry: "Enterprise B2B",
            metric: "Lead Quality",
            improvement: "+240% average increase",
            icon: Building,
            details: {
                conversionRate: "+240% average increase",
                timeline: "3-6 weeks",
                capabilities: [
                    "Lead scoring optimization",
                    "Conversion funnel analysis",
                    "Account-based marketing systems"
                ],
                successStory: {
                    client: "Manufacturing Giant",
                    result: "+$12.4M pipeline value",
                    roi: "380% ROI in 5 months"
                }
            }
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    }

    return (
        <section className="section bg-white">
            <div className="container-custom">
                <motion.div
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <h2 className="heading-lg text-neutral-900 mb-6">
                            Proven Results <span className="text-gradient">Across Industries</span>
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-4xl mx-auto">
                            We understand your industry's unique challenges and have the track record to prove it
                        </p>
                    </motion.div>
                </motion.div>

                {/* Industry Overview Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            className="card-stat group hover:scale-105"
                            variants={itemVariants}
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                                <result.icon className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                {result.industry}
                            </h3>
                            <div className="text-sm text-neutral-600 mb-3">
                                {result.metric}
                            </div>
                            <div className="text-2xl font-bold text-primary-600">
                                {result.improvement}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Detailed Industry Showcase */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {results.slice(0, 2).map((result, index) => (
                            <motion.div
                                key={index}
                                className="card-feature bg-gradient-to-br from-white to-primary-50 border border-primary-100"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                                        <result.icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-neutral-900">
                                            {result.industry}
                                        </h3>
                                        <p className="text-neutral-600">
                                            Transform browsers into buyers with conversion-optimized experiences
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <div className="text-sm text-neutral-600 mb-1">{result.metric}</div>
                                        <div className="text-xl font-bold text-primary-600">
                                            {result.details.conversionRate}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-neutral-600 mb-1">Timeline</div>
                                        <div className="text-xl font-bold text-neutral-900">
                                            {result.details.timeline}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h4 className="font-semibold text-neutral-900 mb-4">Key Capabilities</h4>
                                    <ul className="space-y-2">
                                        {result.details.capabilities.map((capability, capIndex) => (
                                            <li key={capIndex} className="flex items-center gap-2 text-neutral-600">
                                                <TrendingUp className="w-4 h-4 text-accent-500" />
                                                {capability}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl p-6 mb-6">
                                    <h4 className="font-semibold text-neutral-900 mb-3">Recent Success</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">{result.details.successStory.client}</span>
                                            <span className="font-semibold text-accent-600">
                                                {result.details.successStory.result}
                                            </span>
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            {result.details.successStory.roi}
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-full">
                                    Get Industry-Specific Analysis
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
