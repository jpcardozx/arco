"use client"

import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function FooterARCO() {
    const [year] = useState(new Date().getFullYear())

    return (
        <footer className="relative w-full bg-[#111827] text-[#DAD6CE] overflow-hidden border-t border-neutral-800">
            {/* Background com textura e vinheta */}
            <div className="absolute inset-0">
                <Image
                    src="/texture1.png"
                    alt="Textured background"
                    fill
                    className="object-cover opacity-10"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 space-y-20">
                {/* Frase simbólica de abertura */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="tracking-tight text-white text-center max-w-2xl mx-auto font-serif italic text-pretty"
                >
                    Not every presence is structured. But every signal is already forming a verdict.
                </motion.p>

                {/* Três colunas simbólicas */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm text-neutral-400">
                    <Image
                        src="/logo-v2.png"
                        alt="ARCO Symbolic Seal"
                        width={180}
                        height={36}
                        className="mx-auto mb-3 invert"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300 mb-4">Traceability</h4>
                        <ul className="space-y-3">
                            <li><Link href="/index" className="hover:text-white transition-colors">The Index™</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About ARCO</Link></li>
                            <li><Link href="/verified-clients" className="hover:text-white transition-colors">Verified Clients</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300 mb-4">Interpretive Axes</h4>
                        <ul className="space-y-3">
                            <li><span className="text-neutral-500">Tension Mapping</span></li>
                            <li><span className="text-neutral-500">Symbolic Readability</span></li>
                            <li><span className="text-neutral-500">Legacy Realignment</span></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300 mb-4">Curated Access</h4>
                        <a
                            href="/request-entry"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-sm text-white hover:bg-white/10 transition-all rounded-sm"
                        >
                            Submit for Review
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <p className="text-xs text-neutral-500 mt-3 italic">
                            Entry to the Index™ is by symbolic eligibility.
                        </p>
                    </motion.div>
                </div>

                {/* Marca simbólica como selo de encerramento */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >

                    <p className="text-xs text-neutral-500 italic">
                        © {year} ARCO • Interpretive Authority Consultancy
                        <br />Formed for those whose signal deserves architecture — not amplification.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
