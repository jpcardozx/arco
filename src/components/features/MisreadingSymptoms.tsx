'use client';

import { motion } from 'framer-motion';
import React from "react";

const misalignments = [
  {
    title: 'You’re cited — but not structurally anchored.',
    description:
      'Your name circulates in trusted spaces, but the architecture that should hold its weight dissolves. There is respect, but no imprint.',
  },
  {
    title: 'You’re visible — but not singular.',
    description:
      'Your presence is active, but indistinct. Motion without signature. Visibility without symbolic claim.',
  },
  {
    title: 'You’re referenced — but rarely retained.',
    description:
      'Your voice is out there. But without symbolic contrast, it becomes ambient — something others reinterpret freely.',
  },
  {
    title: 'You’re exceptional — but context-dependent.',
    description:
      'Your signal is recognized by insiders. Outside the frame, it flattens into noise. Decoding requires access. Narrative doesn’t grant it.',
  },
];

export default function MisreadingSymptoms() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-32">
      {/* Symbolic vector line (fracture) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="#e5e7eb"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {misalignments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="rounded-xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm"
            >
              <h3 className="mb-4 font-serif text-xl font-medium text-neutral-900">{item.title}</h3>
              <p className="text-base leading-relaxed text-neutral-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
