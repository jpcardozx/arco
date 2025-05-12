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

export default function MisreadingSymptoms() {
    return (
        <section className="relative w-full bg-white py-32 px-6 overflow-hidden">
            {/* Symbolic vector line (fracture) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line
                        x1="0" y1="100" x2="100" y2="0"
                        stroke="#e5e7eb"
                        strokeWidth="0.3"
                        strokeDasharray="2 2"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {misalignments.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white/90 border border-neutral-200 rounded-xl p-8 shadow-sm backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-serif font-medium text-neutral-900 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
