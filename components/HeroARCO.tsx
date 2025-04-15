'use client'

import { motion } from 'framer-motion'

export default function HeroARCO() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-neutral-100 text-neutral-900 overflow-hidden">

            {/* Fundo simbólico institucional */}
            <div
                className="absolute top-0 left-0 w-full h-full z-1 bg-fill bg-center"
                style={{
                    backgroundImage: "url('/texture1.png')",
                    opacity: 0.35,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            />

            {/* Conteúdo editorial */}
            <div className="z-10 max-w-4xl text-center space-y-10">

                {/* Headline institucional */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1 }}
                    className="text-4xl md:text-5xl font-serif font-medium leading-snug tracking-tight"
                >
                    You’re established. But is it interpretable?<br />
                    <span className="text-neutral-600">Most authorities don’t lack expertise — they lack structured presence.</span>
                </motion.h1>

                {/* Subheadline simbólica */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="text-lg md:text-xl font-light tracking-tight text-neutral-800"
                >
                    ARCO reads reputational signals to identify where clarity was lost, and how to recover it without rebranding.
                </motion.p>

                {/* CTA simbólico */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.1, duration: 0.9 }}
                >
                    <a
                        href="/index"
                        className="inline-block mt-4 px-6 py-3 border border-neutral-800 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 tracking-wide uppercase text-sm font-medium"
                    >
                        Learn more about Arco
                    </a>
                    <p className="text-xs text-neutral-500 italic w-72 items-center mx-auto mt-4">
                        An institute that acts as a strategic audit structure for digital presence, professional reputation and symbolic signs of authority in order to reconnect positioning and public perception.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
