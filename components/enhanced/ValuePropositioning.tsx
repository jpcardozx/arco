'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, AlertCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ValuePropositioning() {
    // Animation refs
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Value pillar data
    const valuePillars = [
        {
            title: "Perception Engineering",
            description: "A systematic approach to identifying and correcting the symbolic misalignments that cause your market to undervalue your offering.",
            benefits: [
                "Eliminate perception gaps that cost revenue",
                "Position at the top tier of your market",
                "Command premium pricing with confidence"
            ],
            icon: "/assets/perception-icon.svg",
            color: "blue"
        },
        {
            title: "Financial Decision Architecture",
            description: "Strategic redesign of how value is communicated throughout the customer journey to accelerate decisions and increase conversions.",
            benefits: [
                "Reduce decision cycles by 40-70%",
                "Increase conversion rates by 50-200%",
                "Minimize price objections and negotiations"
            ],
            icon: "/assets/financial-icon.svg",
            color: "indigo"
        },
        {
            title: "Market Position Reinforcement",
            description: "Comprehensive alignment of all touchpoints to maintain a consistent perception of premium value that competitors cannot easily challenge.",
            benefits: [
                "Create sustainable competitive advantage",
                "Reduce sensitivity to market fluctuations",
                "Build brand equity that transcends features"
            ],
            icon: "/assets/market-icon.svg",
            color: "violet"
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-white text-neutral-900"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-16 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-4">
                            THE STRATEGIC ADVANTAGE
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6 tracking-tight portfolio-text-balance">
                            Precisely engineered market perception that delivers predictable revenue outcomes
                        </h3>
                        <p className="text-lg text-neutral-600 portfolio-prose">
                            We've transformed how companies are perceived in their markets, creating significant
                            competitive advantages that translate directly to improved financial performance.
                        </p>
                    </motion.div>
                </div>

                {/* Value pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {valuePillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
                            className="portfolio-card group"
                        >
                            <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center bg-${pillar.color}-100 text-${pillar.color}-600`}>
                                <TrendingUp className="h-6 w-6" />
                            </div>

                            <h4 className="text-xl font-medium mb-3">
                                {pillar.title}
                            </h4>

                            <p className="text-neutral-600 mb-6">
                                {pillar.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {pillar.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
                                        <span className="text-sm text-neutral-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <Link
                                    href={`/methodology#${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors"
                                >
                                    Learn more
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start">
                            <div className="mr-4">
                                <AlertCircle className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">The cost of perception misalignment</h4>
                                <p className="text-neutral-700">
                                    Companies lose an average of 32% of potential revenue due to how their value is perceived.
                                </p>
                            </div>
                        </div>
                        <div>
                            <Link
                                href="/diagnose"
                                className="portfolio-button portfolio-button-primary"
                            >
                                Calculate Your Revenue Gap
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
