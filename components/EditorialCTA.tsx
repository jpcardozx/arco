'use client'

import { motion } from 'framer-motion'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

export default function EditorialClosing() {
    return (
        <section className="py-20 bg-white border-t border-neutral-100">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Editorial conclusion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-serif text-neutral-900 tracking-tight mb-6">
                            The correction of perception is not an aesthetic exercise—it's a financial imperative.
                        </h2>

                        <div className="h-px w-16 bg-neutral-200 mb-6"></div>

                        <p className="text-neutral-700 leading-relaxed">
                            Precise correction of how your digital presence is perceived creates immediate financial impact.
                            Not through redesign, but through the realignment of the symbolic elements that
                            determine how your value is read.
                        </p>
                    </div>
                </motion.div>

                {/* Case example */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="grid md:grid-cols-5 gap-10">
                        <div className="md:col-span-3 space-y-6">
                            <div className="space-y-1">
                                <p className="text-neutral-500">Case Brief</p>
                                <h3 className="text-xl font-medium text-neutral-900">Strategic Consulting Firm</h3>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <p className="text-neutral-500 text-sm mb-1">The Symbolic Misalignment</p>
                                    <p className="text-neutral-800">
                                        Top-tier methodology and documented client success positioned them among industry leaders.
                                        However, their digital presence created perception of a mid-tier generalist through
                                        inconsistent symbolic markers and misaligned value hierarchy.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-neutral-500 text-sm mb-1">The Strategic Correction</p>
                                    <p className="text-neutral-800">
                                        We implemented our Value Alignment System™ to restructure key symbolic elements
                                        across their customer journey. This included resequencing case study presentation,
                                        recalibrating visual hierarchy of expertise markers, and realigning pricing presentation
                                        with value perception.
                                    </p>
                                </div>

                                <div className="bg-neutral-50 p-5 rounded-sm border-l-2 border-blue-500">
                                    <p className="text-neutral-900 font-medium">
                                        43% increase in proposal acceptance rate with average contract value increasing by $32,000
                                        without changing their actual pricing structure.
                                    </p>
                                    <p className="text-neutral-500 text-sm mt-1">
                                        Implementation: 14 days • ROI: 2,175% • Methodology: Immediate Revenue Framework™
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link
                                    href="/partners/jpcardozx"
                                    className="inline-flex items-center text-neutral-900 hover:text-blue-600 transition-colors group"
                                >
                                    <span className="font-medium">View the full case analysis</span>
                                    <FiExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex items-center">
                            <div className="space-y-5 w-full">
                                <div className="aspect-[4/3] relative rounded-sm overflow-hidden">
                                    <Image
                                        src="/perception-case-example.jpg"
                                        alt="Perception correction visualization"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="bg-neutral-100 p-4 rounded-sm text-sm text-neutral-500 italic">
                                    Subtle perception adjustments create substantial financial outcomes—not through imposing new design, but through revealing actual value.
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Entry point with editorial stance */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-serif text-neutral-900 tracking-tight mb-6">
                            Revenue is not lost through poor design—it vanishes through symbolic misalignment between your true value and its perception.
                        </h2>

                        <div className="h-px w-16 bg-neutral-200 mb-6"></div>

                        <p className="text-neutral-700 leading-relaxed">
                            When we analyze conversion failure points across industries, the pattern is clear:
                            cognitive dissonance at key decision moments causes customers to pause, hesitate,
                            and ultimately abandon. This isn't a design problem—it's a symbolic alignment problem
                            with direct financial consequences.
                        </p>
                    </div>
                </motion.div>

                {/* Final editorial statement with subtle scarcity */}
                <div className="border-t border-neutral-100 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <p className="text-neutral-700">
                            Each day of symbolic misalignment costs your business thousands in lost revenue.
                            The correction process is systematic, measurable, and delivers ROI within weeks, not months.
                        </p>

                        <div className="flex items-center gap-2">
                            <Link
                                href="/diagnose"
                                className="text-neutral-900 hover:text-blue-600 transition-colors group font-medium"
                            >
                                Get your ArcSight Snapshot™ ($147)
                                <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="h-4 w-px bg-neutral-200 mx-3"></div>

                            <p className="text-neutral-500 text-sm">
                                Limited to 3 new clients per week
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}