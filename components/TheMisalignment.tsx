'use client'

import { motion } from 'framer-motion'

const misalignments = [
    {
        title: "You’re cited — but not symbolically anchored.",
        description:
            "Your name circulates in trusted spaces, but the digital structure fails to hold that weight. Respect exists. Positioning doesn’t.",
    },
    {
        title: "You’re active — but perceived as interchangeable.",
        description:
            "Your presence moves, but doesn’t mark. It’s interpreted as movement without direction — effort without architecture.",
    },
    {
        title: "You’re referenced — but not remembered.",
        description:
            "Your voice exists. But without symbolic clarity, it becomes ambient. Others fill the space with interpretations that weren’t yours.",
    },
    {
        title: "You’re competent — but unreadable by design.",
        description:
            "Expertise is visible to insiders. But outside that circle, your signal flattens into sameness. Context decodes you. Narrative doesn't.",
    },
]


export default function TheMisalignment() {
    return (
        <section className="relative px-6 py-44 bg-white text-neutral-900 border-t border-neutral-200 overflow-hidden">
            <div className="max-w-5xl mx-auto space-y-20">

                {/* Título editorial com tensão crítica */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-medium leading-snug tracking-tight max-w-3xl mx-auto">
                        You’re not lacking presence.<br />You’re leaking structure.
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-neutral-700 font-light max-w-2xl mx-auto">
                        Misalignment rarely shouts. But it always leaves traces — and those traces become the narrative others rely on.
                    </p>
                </motion.div>

                {/* Blocos de diagnóstico simbólico */}
                <div className="grid md:grid-cols-2 gap-8">
                    {misalignments.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 * index, duration: 0.9, ease: 'easeOut' }}
                            className="group bg-neutral-50 border border-neutral-200 hover:border-neutral-900 p-6 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-lg font-serif font-medium text-neutral-900 group-hover:text-neutral-900 transition-colors duration-300 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-700 leading-relaxed transition-colors duration-300">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Ponte editorial suave para o Index */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center pt-16"
                >
                    <p className="text-sm text-neutral-600 font-light italic">
                        The Index™ doesn’t correct your voice — it calibrates how it’s structurally heard.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
