'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Shield, Zap, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CompetitiveAdvantage() {
    // Animation refs
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Tab state for competitive comparison
    const [activeTab, setActiveTab] = useState(0)

    // Comparison data
    const competitors = [
        {
            type: "Traditional Design Agencies",
            description: "Focus on visual aesthetics without addressing the underlying perception mechanics that drive market behavior and financial decisions.",
            limitations: [
                "Create beautiful designs that fail to convert",
                "Rely on subjective creative direction rather than strategic perception principles",
                "Unable to quantify ROI or financial impact",
                "Treat symptoms (poor design) rather than causes (perception gaps)"
            ]
        },
        {
            type: "Marketing Consultants",
            description: "Provide general marketing advice and tactical execution but lack specialized understanding of perception engineering and its financial impact.",
            limitations: [
                "Generalist approach to market positioning",
                "Rely on outdated positioning frameworks",
                "Superficial understanding of financial decision psychology",
                "Fragmented services without cohesive perception strategy"
            ]
        },
        {
            type: "Branding Firms",
            description: "Create brand identities and guidelines but often miss the critical connection between symbolic elements and financial decision architecture.",
            limitations: [
                "Focus on abstract brand concepts rather than conversion mechanics",
                "Lengthy implementation timeframes (6-12 months)",
                "Inability to measure direct revenue impact",
                "Disconnect between brand assets and purchase psychology"
            ]
        }
    ];

    // ARCO advantage data
    const arcoAdvantages = [
        {
            title: "Perception Engineering Framework",
            description: "Our proprietary methodology that systematically aligns market perception with actual value, creating a premium position that competitors can't easily replicate.",
            icon: <Shield className="h-5 w-5 text-blue-500" />
        },
        {
            title: "Financial Decision Architecture",
            description: "Strategic design of all touchpoints to optimize the financial decision process, accelerating conversions and reducing friction.",
            icon: <Zap className="h-5 w-5 text-blue-500" />
        },
        {
            title: "Revenue-Focused Implementation",
            description: "Rapid 30-60 day implementation framework that delivers measurable revenue impact within the first financial quarter.",
            icon: <Target className="h-5 w-5 text-blue-500" />
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-neutral-900 text-white"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-16 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm uppercase tracking-wider text-blue-400 font-semibold mb-4">
                            MARKET DIFFERENTIATION
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6 tracking-tight portfolio-text-balance">
                            A fundamentally different approach to market perception and revenue growth
                        </h3>
                        <p className="text-lg text-neutral-400 portfolio-prose">
                            While others focus on superficial aspects of market presence, we've pioneered
                            a systematic methodology that directly connects perception engineering to
                            financial outcomes.
                        </p>
                    </motion.div>
                </div>

                {/* Competitive comparison tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    {/* Tab buttons */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-800">
                        {competitors.map((competitor, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-6 py-3 text-sm font-medium transition-colors relative
                                    ${activeTab === index ? 'text-blue-400' : 'text-neutral-400 hover:text-neutral-300'}`}
                            >
                                {competitor.type}
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left column: Competitor limitations */}
                        <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                                    <span className="text-sm font-medium text-neutral-300">{activeTab + 1}</span>
                                </div>
                                <h4 className="text-xl font-medium">
                                    {competitors[activeTab].type}
                                </h4>
                            </div>

                            <p className="text-neutral-400 mb-6">
                                {competitors[activeTab].description}
                            </p>

                            <div className="border-t border-neutral-700/50 pt-6">
                                <h5 className="text-sm uppercase text-neutral-500 tracking-wider mb-4">
                                    KEY LIMITATIONS
                                </h5>

                                <ul className="space-y-3">
                                    {competitors[activeTab].limitations.map((limitation, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="h-5 w-5 rounded-full border border-red-500/30 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                                                <span className="bg-red-500/20 h-2.5 w-2.5 rounded-full"></span>
                                            </span>
                                            <span className="text-neutral-400 text-sm">{limitation}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right column: ARCO advantages */}
                        <div className="bg-gradient-to-br from-blue-950/30 to-neutral-900 border border-blue-900/20 rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-800/50">
                                    <span className="text-blue-400">A</span>
                                </div>
                                <h4 className="text-xl font-medium text-blue-300">
                                    The ARCO Advantage
                                </h4>
                            </div>

                            <p className="text-neutral-400 mb-6">
                                Our approach is fundamentally different, focusing on the strategic alignment
                                of perception and value through a proprietary methodology that delivers
                                predictable financial results.
                            </p>

                            <div className="border-t border-blue-900/30 pt-6">
                                <h5 className="text-sm uppercase text-blue-400 tracking-wider mb-4">
                                    COMPETITIVE ADVANTAGES
                                </h5>

                                <ul className="space-y-6">
                                    {arcoAdvantages.map((advantage, i) => (
                                        <li key={i}>
                                            <div className="flex items-center mb-2">
                                                <span className="mr-2">{advantage.icon}</span>
                                                <h6 className="font-medium text-white">{advantage.title}</h6>
                                            </div>
                                            <p className="text-neutral-400 text-sm pl-7">
                                                {advantage.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-neutral-800 pt-10"
                >
                    <div className="max-w-xl">
                        <h4 className="text-xl font-medium mb-2">
                            Ready to transform your market perception?
                        </h4>
                        <p className="text-neutral-400">
                            Schedule a no-obligation consultation to discover how our perception
                            engineering framework can unlock your revenue potential.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="portfolio-button portfolio-button-primary min-w-[200px] text-center group"
                    >
                        <span>Schedule Consultation</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
