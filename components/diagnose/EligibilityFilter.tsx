'use client'

import { motion } from 'framer-motion'

const admitted = [
    'Established institutional presence',
    'High signal volume with narrative ambiguity',
    'Reputation recognized — but misaligned',
]

const deferred = [
    'Visibility-seeking early brand',
    'No symbolic backlog',
    'Content-driven without architecture',
]

export default function EligibilityFilter() {
    return (
        <section className="relative w-full bg-white py-36 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-serif font-medium tracking-tight text-neutral-900 text-center mb-6"
                >
                    Interpretive Access Is Not Guaranteed
                </motion.h2>
                <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-20 text-base">
                    Not all signals are eligible for interpretation. The Authority Index operates under symbolic criteria — not volume, ambition, or activity. Admission requires structural density.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Admitted */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative bg-white/90 border border-neutral-200 rounded-2xl p-10 backdrop-blur-sm shadow-sm"
                    >
                        {/* Selo simbólico vetorial */}
                        <svg
                            className="absolute top-6 left-6 w-10 h-10 opacity-10"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="40" stroke="#111827" strokeWidth="1.2" strokeDasharray="2 3" />
                            <path d="M20 50h60M50 20v60" stroke="#111827" strokeWidth="0.6" strokeDasharray="4 2" />
                        </svg>
                        <div className="absolute top-4 right-4 text-[10px] tracking-wider font-mono text-neutral-400 uppercase">
                            Verified Tier
                        </div>
                        <h3 className="text-xl font-serif font-medium text-neutral-900 mb-6 border-b pb-2 border-neutral-200">
                            Admitted
                        </h3>
                        <ul className="text-sm text-neutral-700 space-y-4">
                            {admitted.map((item, index) => (
                                <li key={index} className="flex gap-2 items-start">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-700" />
                                    <span className="leading-relaxed font-light tracking-wide">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Deferred */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative bg-white/80 border border-neutral-100 rounded-2xl p-10 backdrop-blur-sm shadow-sm"
                    >
                        {/* Linha interpretativa */}
                        <svg
                            className="absolute top-0 left-0 w-full h-full opacity-5"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#6b7280" strokeWidth="0.4" strokeDasharray="2 3" />
                        </svg>
                        <div className="absolute top-4 right-4 text-[10px] tracking-wider font-mono text-neutral-300 uppercase">
                            Deferred Tier
                        </div>
                        <h3 className="text-xl font-serif font-medium text-neutral-500 mb-6 border-b pb-2 border-neutral-100">
                            Deferred
                        </h3>
                        <ul className="text-sm text-neutral-500 space-y-4">
                            {deferred.map((item, index) => (
                                <li key={index} className="flex gap-2 items-start">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-400" />
                                    <span className="leading-relaxed font-light tracking-wide">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}