'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const veredictos = [
    "Digital presence: consistent, but culturally inert.",
    "Reputation precedes — but does not project.",
    "Narrative fragmentation detected across channels.",
    "Perception drift active. Core expertise under-indexed.",
    "Authority distributed. Signal coherence: low.",
    "Presence interpretable. Not authored.",
    "Tone of communication misaligned with strategic status.",
    "Trust capital accumulated. Not symbolically translated.",
]

export default function SymbolicVerdicts() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % veredictos.length)
        }, 7200) // 7.2s de pausa simbólica

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative h-40 bg-white overflow-hidden select-none">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 rotate-[-2deg]">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 1.2 }}
                        className="text-[13px] md:text-sm text-neutral-500 font-light font-mono tracking-wide italic"
                    >
                        {veredictos[index]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Linhas finas de leitura para sugerir estrutura marginal */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-neutral-200 opacity-30" />
            <div className="absolute inset-y-0 left-20 w-[1px] bg-neutral-200 opacity-10" />
        </section>
    )
}
