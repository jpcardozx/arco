'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './ui/DesignSystem'

const verdicts = [
    "Core Web Vitals: Critical threshold exceeded.",
    "Performance debt accumulating: 7% revenue loss per second.",
    "Technical optimization potential: $150K+ monthly.",
    "Server response time: 2.8s above industry standard.",
    "Conversion recovery zone identified: 28% potential.",
    "Load time inefficiencies detected across key routes.",
    "Performance metrics indicate significant revenue leakage.",
    "Technical debt translating to measurable profit loss.",
]

export default function SymbolicVerdictsRevised() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % verdicts.length)
        }, 7200) // 7.2s symbolic pause

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative h-40 bg-white overflow-hidden select-none border-t border-neutral-100">
            <div className="container mx-auto px-6 h-full flex items-center">
                <div className="relative w-full max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 1.2 }}
                            className="flex items-center justify-center"
                        >
                            <Card variant="ghost" className="bg-neutral-50/80 border-none shadow-sm">
                                <div className="px-6 py-4">
                                    <p className="text-sm md:text-base text-neutral-600 font-mono tracking-wide italic">
                                        {verdicts[index]}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Fine reading lines to suggest marginal structure */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-16 bg-neutral-200"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-16 bg-neutral-200"></div>
                </div>
            </div>
        </section>
    )
}
