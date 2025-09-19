'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HomepageFinalCoda() {
    return (
        <section className="relative px-6 pt-24 pb-32 text-neutral-900 overflow-hidden border-t border-neutral-300 bg-[url('/blankpaper.jpg')] bg-cover bg-no-repeat">
            <div className="max-w-3xl mx-auto text-center space-y-12 rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-8">

                {/* Marca editorial leve */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src="/index-mark.png"
                        alt="ARCO Symbolic Mark"
                        width={64}
                        height={64}
                        className="mx-auto my-[-6px] rounded-4xl"
                    />
                </motion.div>

                {/* Veredicto editorial */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-serif font-medium leading-snug tracking-tight text-neutral-900 mb-0"
                >
                    Every signal you’ve shown is already forming a story.
                    <br className="hidden md:block" />
                    The Index™ determines whether that story serves you — or distorts you.
                </motion.h2>

                {/* Indução simbólica */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg font-light text-neutral-700 leading-relaxed"
                >
                    You’ve recognized the friction.
                    The question now is not whether interpretation exists — but whether you intend to structure it, or let it harden.
                </motion.p>

                {/* CTA simbólico final */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <a
                        href="/index"
                        className="inline-block px-6 py-3 border border-neutral-900 text-neutral-900 font-medium text-sm uppercase tracking-wide transition-all duration-300 hover:bg-neutral-900 hover:text-white shadow-md hover:shadow-lg rounded-sm"
                    >
                        Require Positioning Diagnosis
                    </a>
                    <p className="text-xs text-neutral-500 italic">
                        *if elegible for the Index™
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
