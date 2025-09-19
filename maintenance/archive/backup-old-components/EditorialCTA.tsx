'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function EditorialCTA() {
    return (
        <section className="relative px-6 py-36 bg-neutral-100 bg-[url('/axiom.png')] text-neutral-900 overflow-hidden border-t border-neutral-300">
            <div className="max-w-4xl mx-auto text-center space-y-20">

                {/* Veredicto editorial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight leading-snug max-w-3xl mx-auto">
                        You’ve built a presence.<br />
                        The market has built its version of it.
                    </h2>
                </motion.div>

                {/* Tensão simbólica */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto"
                >
                    <p className="text-base md:text-lg font-light text-neutral-700 leading-relaxed">
                        If your presence hasn’t been structured intentionally, it has already been interpreted by default — through context, tone, and omission.
                        <br className="hidden md:block" />
                        The Index™ is not here to brand you. It exists to diagnose and work on how you’re currently being read — and whether that aligns with your intent.
                    </p>
                </motion.div>

                {/* CTA simbólico */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                >
                    <a
                        href="/index"
                        className="inline-block mt-2 px-6 py-3 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 tracking-wide uppercase text-sm font-medium rounded-2xl shadow-2xs bg-white/50"
                    >
                        Authority Positioning Index™
                    </a>
                    <p className="text-xs text-neutral-500 italic">
                        ARCO doesn’t offer the Index for PMEs, influencers and non-consolidated brands. <br />
                        If you’re interested in a custom solution, please reach out to us.
                    </p>
                </motion.div>

                {/* Marca editorial flutuante */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    transition={{ delay: 1.4, duration: 1.2 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 right-6 pointer-events-none"
                >
                    <Image
                        src="/index-mark.svg"
                        alt="Index Symbolic Mark"
                        width={80}
                        height={80}
                        className="opacity-20"
                    />
                </motion.div>
            </div>
        </section>
    )
}
