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
                    Every millisecond of technical debt accumulates into lost revenue. We turn performance metrics into profit.
                </motion.p>

                {/* Três colunas simbólicas */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm text-neutral-400">
                    <Image
                        src="/logo-v2.png"
                        alt="ARCO Performance Optimization"
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
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300 mb-4">Performance</h4>
                        <ul className="space-y-3">
                            <li><Link href="/diagnose" className="hover:text-white transition-colors">Revenue Impact Analysis</Link></li>
                            <li><Link href="/case-studies" className="hover:text-white transition-colors">Success Stories</Link></li>
                            <li><Link href="/methodology" className="hover:text-white transition-colors">Our Approach</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300 mb-4">Core Metrics</h4>
                        <ul className="space-y-3">
                            <li><span className="text-neutral-500">Load Time Optimization</span></li>
                            <li><span className="text-neutral-500">Conversion Recovery</span></li>
                            <li><span className="text-neutral-500">ROI Acceleration</span></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300 mb-4">Get Started</h4>
                        <a
                            href="/diagnose"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-sm text-white transition-all rounded-lg shadow-md"
                        >
                            Calculate Revenue Impact
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <p className="text-xs text-neutral-500 mt-3">
                            For B2B platforms with $500K+ monthly revenue
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
