'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function IndexDefinition() {
    return (
        <section className="relative w-full bg-white py-32 px-6 overflow-hidden">
            {/* Fundo interpretativo simbólico */}
            <div className="absolute inset-0 bg-[url('/seal-grid.png')] bg-center bg-no-repeat opacity-5 pointer-events-none z-0" />

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">
                {/* Coluna textual */}
                <div className="flex-1 space-y-12">
                    {/* Headline institucional */}
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight text-neutral-900"
                    >
                        The Index™ isn’t a framework.
                        <span className="block">It’s a symbolic act of interpretation.</span>
                    </motion.h2>

                    {/* Corpo técnico */}
                    <div className="space-y-6 text-neutral-700 text-lg md:text-xl font-light tracking-wide leading-relaxed">
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            It doesn’t measure visibility.
                            It reveals where your presence stops being yours — and becomes ambient signal.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-neutral-600"
                        >
                            The Authority Index™ is an institutional-level reading of narrative tension,
                            symbolic erosion and public misalignment. It’s not insight. It’s verdict.
                        </motion.p>
                    </div>

                    {/* Fratura interpretativa */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="pt-6 border-t border-neutral-200"
                    >
                        <p
                            className="text-sm uppercase font-mono text-neutral-500 tracking-widest"
                            aria-hidden
                        >
                            Interpretive Density: 72.4 / Fragility Threshold: Exceeded
                        </p>
                    </motion.div>
                </div>

                {/* Selo simbólico reposicionado como emissão interpretativa */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex-shrink-0 relative"
                >
                    {/* Camada institucional de emissão */}
                    <div className="absolute inset-0 w-[280px] h-[280px] rounded-full bg-neutral-50 shadow-inner blur-[1px] opacity-50 z-0" />

                    <Image
                        src="/index-seal.png"
                        alt="Interpretive Seal of Calibration"
                        width={280}
                        height={280}
                        className="relative z-10 opacity-90"
                        priority
                    />

                    {/* Microtexto interpretativo abaixo do selo */}
                    <div className="mt-4 text-[11px] text-neutral-500 font-mono tracking-wider text-center">
                        Issued by: Interpretive Architecture Bureau
                    </div>
                </motion.div>
            </div>
        </section>
    )
}