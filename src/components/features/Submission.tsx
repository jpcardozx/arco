'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import React from "react";

export default function Submission() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-44">
      {/* Fundo vetorial sutil */}
      <svg
        className="absolute inset-0 h-full w-full opacity-5"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#111827"
          strokeWidth="0.25"
          strokeDasharray="1 2"
          fill="none"
        />
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#111827"
          strokeWidth="0.2"
          strokeDasharray="1 3"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-3xl space-y-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl"
        >
          Submit for Symbolic Review
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto max-w-2xl text-lg font-light text-neutral-600 md:text-xl"
        >
          This is not application. This is declaration. Submit your signal for interpretive
          eligibility — a curated calibration of symbolic structure, not content.
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mx-auto max-w-xl space-y-6 rounded-xl border border-neutral-200 bg-white/90 p-8 text-left shadow-md backdrop-blur-sm"
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
              <label className="block text-sm font-medium text-neutral-800">
                Public Presence URL
              </label>
              <input
                type="url"
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Why should this signal be interpreted?
              </label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-neutral-900 px-6 py-3 text-sm uppercase tracking-wide text-white shadow-md transition hover:bg-black"
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
            className="text-center text-lg text-neutral-700"
          >
            Signal received. Your presence is now pending symbolic alignment.
          </motion.div>
        )}

        <div className="border-t border-neutral-200 pt-10">
          <p className="font-mono text-sm uppercase tracking-wider text-neutral-400">
            Max. 5 signals are calibrated per cycle — access is granted based on structural
            resonance.
          </p>
        </div>
      </div>
    </section>
  );
}
