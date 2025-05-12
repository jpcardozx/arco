'use client'

import { motion } from 'framer-motion'
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiClock } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

export default function ProblemSolution() {
    return (
        <section className="py-20 bg-white border-t border-neutral-100">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left column: The Problem */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-8">
                            The gap between expertise and perception<br />
                            is costing you premium conversions
                        </h2>

                        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 mb-8">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-3xl font-bold text-red-600">31%</p>
                                    <p className="text-neutral-600 text-sm">Visitors leave too soon</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-red-600">48%</p>
                                    <p className="text-neutral-600 text-sm">Price objections rise</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-red-600">$147K</p>
                                    <p className="text-neutral-600 text-sm">Monthly revenue gap</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-medium text-neutral-900 mb-4">
                            Common symbolic misalignments we correct:
                        </h3>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="block h-2 w-2 rounded-full bg-red-600"></span>
                                </span>
                                <div>
                                    <p className="text-neutral-900 font-medium">Value-perception disconnects</p>
                                    <p className="text-neutral-600">When your expertise isn't visibly matched in your presentation</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="block h-2 w-2 rounded-full bg-red-600"></span>
                                </span>
                                <div>
                                    <p className="text-neutral-900 font-medium">Trust signal misplacement</p>
                                    <p className="text-neutral-600">When critical validation appears too late in decision processes</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="block h-2 w-2 rounded-full bg-red-600"></span>
                                </span>
                                <div>
                                    <p className="text-neutral-900 font-medium">Price-value dissonance</p>
                                    <p className="text-neutral-600">When your pricing appears disconnected from perceived value</p>
                                </div>
                            </li>
                        </ul>

                        <blockquote className="bg-blue-50 p-5 border-l-4 border-blue-400 text-blue-900 rounded-r-lg italic">
                            "Every symbolic misalignment in your customer journey is costing you $10,000-50,000 monthly. Fixing them doesn't require redesign—just precise correction."
                        </blockquote>
                    </motion.div>

                    {/* Right column: Our Solution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-200">
                            <h3 className="text-2xl font-medium text-neutral-900 mb-6">
                                Our Strategic Correction Process
                            </h3>

                            <div className="space-y-6 mb-8">
                                <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">1</div>
                                        <h4 className="text-lg font-medium text-neutral-900">ArcSight Snapshot™ ($147)</h4>
                                    </div>
                                    <ul className="space-y-2 pl-14">
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Complete symbolic friction point identification</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Revenue impact quantification for each issue</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Prioritized correction roadmap</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">2</div>
                                        <h4 className="text-lg font-medium text-neutral-900">Friction Removal Kit™ ($897)</h4>
                                    </div>
                                    <ul className="space-y-2 pl-14">
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Implementation of 3 highest-impact corrections</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>A/B testing of symbolic alignments</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Detailed implementation guidelines</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">3</div>
                                        <h4 className="text-lg font-medium text-neutral-900">Strategic Repositioning™ ($1,497)</h4>
                                    </div>
                                    <ul className="space-y-2 pl-14">
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Complete symbolic architecture overhaul</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>End-to-end customer journey correction</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-neutral-700">
                                            <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span>Comprehensive conversion tracking system</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Case Study Preview */}
                <div className="mt-20">
                    <h3 className="text-2xl font-serif text-neutral-900 mb-6 text-center">
                        Recent client results
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                client: "QuickCommerce",
                                industry: "E-Commerce",
                                improvement: "46% faster mobile experience",
                                result: "$178,500 monthly revenue increase",
                                timeframe: "3 weeks"
                            },
                            {
                                client: "TechSolutions SaaS",
                                industry: "Software",
                                improvement: "52% Core Web Vitals improvement",
                                result: "37% higher trial conversions",
                                timeframe: "2 weeks"
                            },
                            {
                                client: "GlobalRetail",
                                industry: "Retail Chain",
                                improvement: "39% checkout performance boost",
                                result: "$215,000 quarterly revenue lift",
                                timeframe: "4 weeks"
                            }
                        ].map((case_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm"
                            >
                                <div className="h-2 bg-blue-600"></div>
                                <div className="p-6">
                                    <p className="text-neutral-500 text-sm">{case_.industry}</p>
                                    <h4 className="text-xl font-medium text-neutral-900 mb-4">{case_.client}</h4>

                                    <div className="space-y-4 mb-4">
                                        <div className="flex items-start gap-2">
                                            <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-neutral-700">{case_.improvement}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-neutral-700">Implementation: {case_.timeframe}</p>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg border-l-2 border-green-500">
                                        <p className="text-green-800 font-medium">{case_.result}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}