'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HomepageFinalCoda() {
    return (
        <section className="relative px-6 pt-20 pb-28 bg-neutral-100 text-neutral-900 overflow-hidden border-t border-neutral-300">
            <div className="max-w-3xl mx-auto text-center space-y-14">

                {/* Marca vetorial como selo editorial */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 0.08, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src="/symbolic-anchor.svg" // ou index-mark.svg
                        alt="Symbolic Mark"
                        width={60}
                        height={60}
                        className="mx-auto"
                    />
                </motion.div>

                {/* Veredicto editorial */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-serif font-medium leading-snug tracking-tight"
                >
                    An unstructured presence invites interpretation.
                    <br className="hidden md:block" />
                    The Index restores control — symbolically and strategically.
                </motion.h2>

                {/* Texto de indução simbólica */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg font-light text-neutral-700 leading-relaxed"
                >
                    You’ve already acknowledged the gap.
                    <br />
                    The only choice is whether you define it — or let interpretation fill the silence.
                </motion.p>

                {/* CTA simbólico final */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                >
                    <a
                        href="/index"
                        className="inline-block mt-2 px-6 py-3 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 tracking-wide uppercase text-sm font-medium"
                    >
                        Proceed to the Index
                    </a>
                    <p className="text-xs text-neutral-500 italic">
                        What comes next isn’t a submission. It’s a shift in structure.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
