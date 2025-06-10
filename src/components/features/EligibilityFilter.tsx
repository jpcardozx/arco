'use client';

import { motion } from 'framer-motion';
import React from "react";

const admitted = [
  'Established institutional presence',
  'High signal volume with narrative ambiguity',
  'Reputation recognized — but misaligned',
];

const deferred = [
  'Visibility-seeking early brand',
  'No symbolic backlog',
  'Content-driven without architecture',
];

export default function EligibilityFilter() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-36">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center font-serif text-4xl font-medium tracking-tight text-neutral-900"
        >
          Interpretive Access Is Not Guaranteed
        </motion.h2>
        <p className="mx-auto mb-20 max-w-2xl text-center text-base text-neutral-600">
          Not all signals are eligible for interpretation. The Authority Index operates under
          symbolic criteria — not volume, ambition, or activity. Admission requires structural
          density.
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Admitted */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-neutral-200 bg-white/90 p-10 shadow-sm backdrop-blur-sm"
          >
            {/* Selo simbólico vetorial */}
            <svg
              className="absolute left-6 top-6 h-10 w-10 opacity-10"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#111827"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
              <path
                d="M20 50h60M50 20v60"
                stroke="#111827"
                strokeWidth="0.6"
                strokeDasharray="4 2"
              />
            </svg>
            <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Verified Tier
            </div>
            <h3 className="mb-6 border-b border-neutral-200 pb-2 font-serif text-xl font-medium text-neutral-900">
              Admitted
            </h3>
            <ul className="space-y-4 text-sm text-neutral-700">
              {admitted.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <span className="font-light leading-relaxed tracking-wide">{item}</span>
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
            className="relative rounded-2xl border border-neutral-100 bg-white/80 p-10 shadow-sm backdrop-blur-sm"
          >
            {/* Linha interpretativa */}
            <svg
              className="absolute left-0 top-0 h-full w-full opacity-5"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="#6b7280"
                strokeWidth="0.4"
                strokeDasharray="2 3"
              />
            </svg>
            <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-wider text-neutral-300">
              Deferred Tier
            </div>
            <h3 className="mb-6 border-b border-neutral-100 pb-2 font-serif text-xl font-medium text-neutral-500">
              Deferred
            </h3>
            <ul className="space-y-4 text-sm text-neutral-500">
              {deferred.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <span className="font-light leading-relaxed tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
