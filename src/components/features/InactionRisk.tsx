'use client';

import { motion } from 'framer-motion';
import React from "react";

export default function InactionRisk() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-44">
      {/* Fundo vetorial simbólico revisado */}
      <svg
        className="absolute inset-0 h-full w-full opacity-5"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="none"
          stroke="#111827"
          strokeWidth="0.2"
          strokeDasharray="1 2"
        />
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#111827"
          strokeWidth="0.25"
          strokeDasharray="2 2"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="#111827"
          strokeWidth="0.25"
          strokeDasharray="2 2"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl"
        >
          When Structure is Not Read, It Rewrites Itself
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-600 md:text-xl"
        >
          What isn’t calibrated continues — unchecked. Not into silence, but into drift. The
          unobserved signal self-corrects through public misreading, until realignment is no longer
          reversible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 border-t border-neutral-200 pt-6"
        >
          <p className="font-mono text-sm uppercase tracking-wide text-neutral-400">
            Interpretive Tension Compounds When Untended
          </p>
        </motion.div>
      </div>
    </section>
  );
}
