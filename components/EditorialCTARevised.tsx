'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Section, Heading2, Heading3, BodyLarge, BodyRegular, Caption, Card, Button } from './ui/DesignSystem'

export default function EditorialCTARevised() {
    return (
        <Section className="bg-white border-t border-neutral-100">
            {/* Editorial conclusion */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <div className="max-w-2xl">
                    <Heading2 className="text-neutral-900 mb-6">
                        The correction of perception is not an aesthetic exercise—it's a financial imperative.
                    </Heading2>

                    <div className="h-px w-16 bg-neutral-200 mb-6"></div>

                    <BodyRegular className="text-neutral-700 leading-relaxed">
                        Precise correction of how your digital presence is perceived creates immediate financial impact.
                        Not through redesign, but through the realignment of the symbolic elements that
                        determine how your value is read.
                    </BodyRegular>
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
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-5 gap-10 p-8">
                        <div className="md:col-span-3 space-y-6">
                            <div className="space-y-1">
                                <Caption className="text-neutral-500">Case Brief</Caption>
                                <Heading3 className="text-neutral-900">Strategic Consulting Firm</Heading3>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <Caption className="text-neutral-500 mb-1">The Symbolic Misalignment</Caption>
                                    <BodyRegular className="text-neutral-800">
                                        Top-tier methodology and documented client success positioned them among industry leaders.
                                        However, their digital presence created perception of a mid-tier generalist through
                                        inconsistent symbolic markers and misaligned value hierarchy.
                                    </BodyRegular>
                                </div>

                                <div>
                                    <Caption className="text-neutral-500 mb-1">The Strategic Correction</Caption>
                                    <BodyRegular className="text-neutral-800">
                                        We implemented our Value Alignment System™ to restructure key symbolic elements
                                        across their customer journey. This included resequencing case study presentation,
                                        recalibrating visual hierarchy of expertise markers, and realigning pricing presentation
                                        with value perception.
                                    </BodyRegular>
                                </div>

                                <Card variant="secondary" className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                                    <div className="p-5">
                                        <BodyRegular className="text-neutral-900 font-medium">
                                            43% increase in proposal acceptance rate with average contract value increasing by $32,000
                                            without changing their actual pricing structure.
                                        </BodyRegular>
                                        <Caption className="text-neutral-500 mt-1">
                                            Implementation: 14 days • ROI: 2,175% • Methodology: Immediate Revenue Framework™
                                        </Caption>
                                    </div>
                                </Card>
                            </div>

                            <div className="pt-4">
                                <Button variant="link" href="/partners/jpcardozx" icon={<ExternalLink className="h-4 w-4" />}>
                                    View the full case analysis
                                </Button>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex items-center">
                            <div className="space-y-5 w-full">
                                <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src="/perception-case-example.jpg"
                                        alt="Perception correction visualization"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <Card variant="secondary">
                                    <div className="p-4 text-sm text-neutral-600 italic">
                                        Subtle perception adjustments create substantial financial outcomes—not through imposing new design, but through revealing actual value.
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Card>
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
                    <Heading2 className="text-neutral-900 mb-6">
                        Revenue is not lost through poor design—it vanishes through symbolic misalignment between your true value and its perception.
                    </Heading2>

                    <div className="h-px w-16 bg-neutral-200 mb-6"></div>

                    <BodyRegular className="text-neutral-700 leading-relaxed">
                        When we analyze conversion failure points across industries, the pattern is clear:
                        cognitive dissonance at key decision moments causes customers to pause, hesitate,
                        and ultimately abandon. This isn't a design problem—it's a symbolic alignment problem
                        with direct financial consequences.
                    </BodyRegular>
                </div>
            </motion.div>

            {/* Final editorial statement with subtle scarcity */}
            <Card className="border border-neutral-100 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <BodyRegular className="text-neutral-700">
                        Each day of symbolic misalignment costs your business thousands in lost revenue.
                        The correction process is systematic, measurable, and delivers ROI within weeks, not months.
                    </BodyRegular>

                    <div className="flex items-center gap-2">
                        <Button
                            href="/diagnose"
                            variant="primary"
                            icon={<ArrowRight className="h-4 w-4" />}
                        >
                            Get your ArcSight Snapshot™ ($147)
                        </Button>

                        <Caption className="text-neutral-500 ml-3">
                            Limited to 3 new clients per week
                        </Caption>
                    </div>
                </div>
            </Card>
        </Section>
    )
}
