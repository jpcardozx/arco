'use client'

import { motion } from 'framer-motion'
import { FiEyeOff, FiCheckCircle } from 'react-icons/fi'

export default function SymbolicAnchor() {
    return (
        <section className="relative px-6 py-36 bg-white text-neutral-900 overflow-hidden border-t border-neutral-200">
            <div className="max-w-5xl mx-auto space-y-24">

                {/* Introdução: clareza + tensão reputacional */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight max-w-3xl mx-auto">
                        ARCO doesn’t create influence.
                        <br />It protects it.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-neutral-700 font-light max-w-2xl mx-auto">
                        In environments where visibility is abundant and credibility is rare, symbolic misalignment erodes trust silently.
                    </p>
                    <p className="mt-6 text-lg md:text-xl text-neutral-700 font-light max-w-2xl mx-auto">
                        The Index™ is where that erosion becomes diagnosable.
                    </p>
                </motion.div>

                {/* Tensão simbólica: comparação implícita */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="grid md:grid-cols-2 gap-12"
                >
                    {/* Estado mal calibrado */}
                    <div className="bg-neutral-50 p-8 border-l-4 border-red-400 shadow-sm rounded-sm">
                        <FiEyeOff className="text-red-500 text-3xl mb-4" />
                        <h3 className="text-xl font-semibold mb-3">When misalignment is present</h3>
                        <ul className="space-y-3 text-sm text-neutral-800 leading-relaxed">
                            <li>– Recognized authority, but hard to trace online</li>
                            <li>– Visual presence feels generic or self-managed</li>
                            <li>– Narrative doesn’t match institutional relevance</li>
                            <li>– You’re taken seriously — but inconsistently</li>
                        </ul>
                    </div>

                    {/* O que o Index entrega */}
                    <div className="bg-neutral-50 p-8 border-l-4 border-green-500 shadow-sm rounded-sm">
                        <FiCheckCircle className="text-green-600 text-3xl mb-4" />
                        <h3 className="text-xl font-semibold mb-3">What the Index delivers</h3>
                        <ul className="space-y-3 text-sm text-neutral-800 leading-relaxed">
                            <li>– A symbolic reading of your public architecture</li>
                            <li>– Tension map between reputation and projection</li>
                            <li>– Editorial verdict on presence structure</li>
                            <li>– Strategic clarity, without rebranding</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Call to Index (com escassez simbólica) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-center space-y-5"
                >
                    <p className="text-base md:text-lg text-neutral-700 max-w-xl mx-auto">
                        The Index is reserved for those whose authority is already earned — but whose symbolic presence is still being misunderstood.
                    </p>
                    <a
                        href="/index"
                        className="inline-block mt-2 px-6 py-3 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 tracking-wide uppercase text-sm font-medium"
                    >
                        Explore the Index
                    </a>
                    <p className="text-xs text-neutral-500 mt-2 italic">
                        Access is curated based on symbolic readiness — not availability.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
