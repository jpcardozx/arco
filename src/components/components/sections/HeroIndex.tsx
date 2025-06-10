'use client';

import { motion } from 'framer-motion';
import React from "react";

export default function HeroIndex() {
  return (
    <section className="relative z-0 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg2.png')] bg-cover bg-center px-6 text-neutral-900">
      {' '}
      {/* Symbolic layer: ultra-light editorial vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-white/50 to-white/30" />{' '}
      {/* Central content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl"
        >
          You’ve already
          <br className="hidden md:inline" /> been interpreted.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 text-lg font-light tracking-wide text-neutral-800 md:text-xl"
        >
          Not by design. Not by decision.
          <br className="hidden md:inline" /> Not by you.
        </motion.p>
      </div>
    </section>
  );
}
