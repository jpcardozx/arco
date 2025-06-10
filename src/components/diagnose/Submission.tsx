'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Submission() {
    const [submitted, setSubmitted] = useState(false)

    return (
        <section className="relative w-full bg-white py-44 px-6 overflow-hidden">
            {/* Fundo vetorial sutil */}
            <svg
                className="absolute inset-0 w-full h-full opacity-5"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="50" cy="50" r="40" stroke="#111827" strokeWidth="0.25" strokeDasharray="1 2" fill="none" />
                <line x1="0" y1="0" x2="100" y2="100" stroke="#111827" strokeWidth="0.2" strokeDasharray="1 3" />
            </svg>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
                <motion.h2
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight text-neutral-900"
                >
                    Submit for Symbolic Review
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-lg md:text-xl text-neutral-600 font-light max-w-2xl mx-auto"
                >
                    This is not application. This is declaration. Submit your signal for interpretive eligibility — a curated calibration of symbolic structure, not content.
                </motion.p>

                {!submitted ? (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            setSubmitted(true)
                        }}
                        className="space-y-6 max-w-xl mx-auto text-left bg-white/90 backdrop-blur-sm rounded-xl border border-neutral-200 p-8 shadow-md"
                    >
                        <div>
                            <label className="block text-sm font-medium text-neutral-800">Full Name</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-800">Public Presence URL</label>
                            <input
                                type="url"
                                required
                                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-800">Why should this signal be interpreted?</label>
                            <textarea
                                required
                                rows={4}
                                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-neutral-900 px-6 py-3 text-white text-sm tracking-wide uppercase shadow-md hover:bg-black transition"
                            >
                                Enter Interpretive Cycle
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center text-neutral-700 text-lg"
                    >
                        Signal received. Your presence is now pending symbolic alignment.
                    </motion.div>
                )}

                <div className="pt-10 border-t border-neutral-200">
                    <p className="text-sm text-neutral-400 font-mono uppercase tracking-wider">
                        Max. 5 signals are calibrated per cycle — access is granted based on structural resonance.
                    </p>
                </div>
            </div>
        </section>
    )
}
