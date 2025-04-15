'use client'

import { motion } from 'framer-motion'

const misalignments = [
    {
        title: "You’re cited — but not structurally anchored.",
        description:
            "Your name circulates in trusted spaces, but the architecture that should hold its weight dissolves. There is respect, but no imprint.",
    },
    {
        title: "You’re visible — but not singular.",
        description:
            "Your presence is active, but indistinct. Motion without signature. Visibility without symbolic claim.",
    },
    {
        title: "You’re referenced — but rarely retained.",
        description:
            "Your voice is out there. But without symbolic contrast, it becomes ambient — something others reinterpret freely.",
    },
    {
        title: "You’re exceptional — but context-dependent.",
        description:
            "Your signal is recognized by insiders. Outside the frame, it flattens into noise. Decoding requires access. Narrative doesn’t grant it.",
    },
]

export default function TheMisalignment() {
    return (
        <section className="relative px-6 py-44 bg-white bg-[url('/texture1.jpg')] bg-cover bg-no-repeat text-neutral-900 border-t border-neutral-200 overflow-hidden z-0">
            <div className='border-t border-neutral-200 bg-white/80 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-2xl mx-auto max-w-6xl p-12'>
                <div className="max-w-5xl mx-auto space-y-24 z-1">

                    {/* Título editorial com tensão crítica */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center bg-white/80 backdrop-blur-md p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-medium leading-snug tracking-tight max-w-3xl mx-auto">
                            You’re not lacking presence.<br />You’re leaking structure.
                        </h2>
                        <p className="mt-5 text-base md:text-lg text-neutral-700 font-light max-w-2xl mx-auto">
                            Misalignment doesn’t announce itself. It accumulates — through absence of framing, erosion of clarity, and quiet gaps that become someone else’s story.
                        </p>
                    </motion.div>

                    {/* Blocos de diagnóstico simbólico */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {misalignments.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 * index, duration: 0.9, ease: 'easeOut' }}
                                className="group bg-neutral-50 border border-neutral-200 hover:border-neutral-900 p-6 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300"
                            >
                                <h3 className="text-base text-neutral-900 group-hover:text-neutral-900 tracking-wide mb-2 font-medium">
                                    <span className="text-neutral-900 group-hover:text-neutral-900 font-semibold">
                                        {item.title.split('–')[0]}
                                    </span>
                                </h3>
                                <p className="text-sm text-neutral-700 leading-relaxed">
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
                        className="text-center pt-0"
                    >
                        <p className="text-sm text-neutral-600 font-light italic">
                            The Index™ doesn’t correct your voice — it restores its architectural gravity.
                        </p>
                    </motion.div>
                </div></div>
        </section>
    )
}
