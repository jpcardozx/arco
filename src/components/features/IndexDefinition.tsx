'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from "react";

export default function IndexDefinition() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-32">
      {' '}
      {/* Symbolic interpretive background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/seal-grid.png')] bg-center bg-no-repeat opacity-5" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-16 lg:flex-row">
        {' '}
        {/* Text column */}
        <div className="flex-1 space-y-12">
          {/* Institutional headline */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl"
          >
            The Index™ isn’t a framework.
            <span className="block">It’s a symbolic act of interpretation.</span>
          </motion.h2>{' '}
          {/* Technical body */}
          <div className="space-y-6 text-lg font-light leading-relaxed tracking-wide text-neutral-700 md:text-xl">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              It doesn’t measure visibility. It reveals where your presence stops being yours — and
              becomes ambient signal.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-neutral-600"
            >
              The Authority Index™ is an institutional-level reading of narrative tension, symbolic
              erosion and public misalignment. It’s not insight. It’s verdict.
            </motion.p>
          </div>
          {/* Interpretive fracture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="border-t border-neutral-200 pt-6"
          >
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500" aria-hidden>
              Interpretive Density: 72.4 / Fragility Threshold: Exceeded
            </p>
          </motion.div>
        </div>{' '}
        {/* Symbolic seal repositioned as interpretive emission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative flex-shrink-0"
        >
          {/* Institutional emission layer */}
          <div className="absolute inset-0 z-0 h-[280px] w-[280px] rounded-full bg-neutral-50 opacity-50 shadow-inner blur-[1px]" />
          <Image
            src="/index-seal.png"
            alt="Interpretive Seal of Calibration"
            width={280}
            height={280}
            className="relative z-10 opacity-90"
            priority
          />{' '}
          {/* Interpretive microtext below the seal */}
          <div className="mt-4 text-center font-mono text-[11px] tracking-wider text-neutral-500">
            Issued by: Interpretive Architecture Bureau
          </div>
        </motion.div>
      </div>
    </section>
  );
}
