'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

export default function ValueClosing() {
    return (
        <section className="py-20 bg-white border-t border-neutral-100">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Clear value statement */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium text-neutral-900 mb-4">
                        Converting expertise into <span className="relative inline-block">
                            revenue outcomes
                            <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-blue-500"></span>
                        </span> through symbolic alignment
                    </h2>

                    <p className="text-neutral-700 max-w-2xl mx-auto">
                        Our proven Immediate Revenue Framework™ transforms how your digital presence communicates your
                        true value, removing invisible barriers to conversion at key decision points.
                    </p>
                </div>

                {/* Concrete results */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            outcome: "Higher proposal acceptance rates",
                            description: "When your expertise is correctly perceived, price objections diminish and proposal acceptance increases.",
                            metric: "43%",
                            metricLabel: "average increase"
                        },
                        {
                            outcome: "Premium positioning at current rates",
                            description: "Clients suddenly see your current rates as reasonable or even underpriced for the value delivered.",
                            metric: "73%",
                            metricLabel: "reduction in price objections"
                        },
                        {
                            outcome: "Faster decision cycles with less friction",
                            description: "When perception matches reality, decisions accelerate and sales cycles shorten significantly.",
                            metric: "58%",
                            metricLabel: "faster closing times"
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-neutral-50 p-8 border border-neutral-100">
                            <div className="mb-6">
                                <div className="text-blue-600 text-3xl font-medium mb-1">
                                    {item.metric}
                                </div>
                                <div className="text-neutral-500 text-sm">
                                    {item.metricLabel}
                                </div>
                            </div>

                            <h3 className="text-lg font-medium text-neutral-900 mb-3">
                                {item.outcome}
                            </h3>

                            <p className="text-neutral-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Clear product feature */}
                <div className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg mb-16">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="p-8 md:p-10">
                            <div className="pb-6 mb-6 border-b border-neutral-700">
                                <h3 className="text-xl text-white font-medium mb-2">
                                    ArcSight Snapshot™ — Your First Step
                                </h3>
                                <p className="text-neutral-300">
                                    The essential diagnostic that reveals exactly where symbolic misalignment is costing you revenue
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <FiCheck className="text-blue-400 mt-1 flex-shrink-0" />
                                    <span className="text-white">Identification of 3 critical symbolic friction points in your customer journey</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FiCheck className="text-blue-400 mt-1 flex-shrink-0" />
                                    <span className="text-white">Detailed video analysis with prioritized correction recommendations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FiCheck className="text-blue-400 mt-1 flex-shrink-0" />
                                    <span className="text-white">Estimated revenue impact quantification for each issue</span>
                                </li>
                            </ul>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-neutral-400 text-sm">One-time investment</p>
                                    <p className="text-2xl font-medium text-white">$147</p>
                                </div>

                                <Link
                                    href="/diagnose"
                                    className="inline-flex items-center px-6 py-3 bg-white text-neutral-900 rounded font-medium hover:bg-neutral-100 transition-colors group"
                                >
                                    Get your assessment
                                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-neutral-800 p-8 md:p-10">
                            <h4 className="text-white font-medium mb-5">
                                The ArcSight Process:
                            </h4>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm">
                                        1
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-1">Submit your information</p>
                                        <p className="text-neutral-400">Complete a brief asset submission form (5 minutes)</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm">
                                        2
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-1">Receive your analysis within 48 hours</p>
                                        <p className="text-neutral-400">Get your comprehensive video walkthrough and action plan</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm">
                                        3
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-1">Upgrade opportunity (optional)</p>
                                        <p className="text-neutral-400">48-hour window to apply your $147 to a premium tier implementation</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-neutral-700">
                                <p className="text-neutral-300 text-sm">
                                    "The ArcSight Snapshot™ revealed three major symbolic friction points we never would have found. Implementing just the first correction increased our conversion rate by 18% within a week."
                                </p>
                                <p className="text-neutral-400 text-sm mt-2">
                                    — CMO, Enterprise SaaS Company
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simple action-focused closing */}
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <p className="text-neutral-900 font-medium">
                            Stop losing revenue to perception gaps.
                        </p>
                        <p className="text-neutral-500">
                            Correct how your expertise is perceived in days, not months.
                        </p>
                    </div>

                    <div className="flex items-center gap-10">
                        <Link
                            href="/diagnose"
                            className="text-neutral-900 hover:text-blue-600 transition-colors group font-medium flex items-center"
                        >
                            Explore how we correct this
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <p className="text-neutral-500 text-sm hidden md:block">
                            Limited to 2–3 projects per cycle
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}