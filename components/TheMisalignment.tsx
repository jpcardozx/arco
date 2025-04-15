'use client'

import { motion } from 'framer-motion'

const veredicts = [
    "Strategic clarity — interpreted as ambiguity.",
    "Offline respect. Online passivity.",
    "Authority projected — but not perceived.",
    "Presence that looks premium. Feels undifferentiated.",
    "Expertise evident. Narrative missing.",
    "Confidence high. Symbolic structure: unclear.",
    "Position earned. Framing incomplete.",
    "Signal active — yet interpretation varies.",
]

export default function TheMisalignment() {
    return (
        <section className="relative px-6 py-36 bg-neutral-50 text-neutral-900 overflow-hidden border-t border-neutral-200">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Editorial Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight leading-tight max-w-3xl mx-auto">
                        Selected signals we’ve decoded.
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-neutral-700 font-light max-w-2xl mx-auto">
                        Not branding flaws — symbolic mismatches.
                        Friction points where authority fails to land.
                    </p>
                </motion.div>

                {/* Grid of symbolic veredicts */}
                <div className="grid md:grid-cols-2 gap-6">
                    {veredicts.map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index, duration: 0.8 }}
                            className="bg-white p-6 border-l-4 border-neutral-300 text-neutral-800 shadow-sm text-sm font-light leading-snug italic"
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
