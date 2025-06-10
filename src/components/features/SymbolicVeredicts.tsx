'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import React from "react";

const veredictos = [
  'Core Web Vitals: Critical threshold exceeded.',
  'Performance debt accumulating: 7% revenue loss per second.',
  'Technical optimization potential: $150K+ monthly.',
  'Server response time: 2.8s above industry standard.',
  'Conversion recovery zone identified: 28% potential.',
  'Load time inefficiencies detected across key routes.',
  'Performance metrics indicate significant revenue leakage.',
  'Technical debt translating to measurable profit loss.',
];

export default function SymbolicVerdicts() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % veredictos.length);
    }, 7200); // 7.2s de pausa simbólica

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-40 select-none overflow-hidden bg-white">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 rotate-[-2deg] transform">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 1.2 }}
            className="font-mono text-[13px] font-light italic tracking-wide text-neutral-500 md:text-sm"
          >
            {veredictos[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Linhas finas de leitura para sugerir estrutura marginal */}
      <div className="absolute inset-y-0 left-0 w-[1px] bg-neutral-200 opacity-30" />
      <div className="absolute inset-y-0 left-20 w-[1px] bg-neutral-200 opacity-10" />
    </section>
  );
}
