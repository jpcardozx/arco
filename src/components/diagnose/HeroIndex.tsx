'use client'

import { motion } from 'framer-motion'

export default function HeroIndex() {
    return (
        <section className="relative z-0 min-h-screen w-full flex items-center justify-center bg-[url('/bg2.png')] bg-cover bg-center text-neutral-900 px-6 overflow-hidden">

            {/* Camada simbólica: vinheta editorial ultra-leve */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-white/50 to-white/30 pointer-events-none" />

            {/* Conteúdo central */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight tracking-tight text-neutral-900"
                >
                    You’ve already<br className="hidden md:inline" /> been interpreted.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-6 text-lg md:text-xl text-neutral-800 font-light tracking-wide"
                >
                    Not by design. Not by decision.<br className="hidden md:inline" /> Not by you.
                </motion.p>
            </div>
        </section>
    )
}
