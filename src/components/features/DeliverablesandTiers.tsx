'use client';

import { motion } from 'framer-motion';
import React from "react";

const deliverables = [
  {
    title: 'Symbolic Reading',
    badge: 'Issued',
    description:
      'A structured interpretive assessment that surfaces patterns of erosion, drift, or anchor across your public presence.',
  },
  {
    title: 'Score Axis Report',
    badge: 'Calibrated',
    description:
      'A multi-axis symbolic profile revealing legibility, tension and continuity breakdowns — not brand metrics, but architectural insights.',
  },
  {
    title: 'Interpretive Debrief',
    badge: '1:1',
    description:
      'A one-on-one interpretive session to walk through the symbolic structures exposed and how to reposition authority without performance.',
  },
];

const tiers = [
  {
    title: 'Signal Diagnostic™',
    for: 'For high-competence individuals or advisors who sense weak narrative coherence but don’t know where it breaks.',
  },
  {
    title: 'Authority Index™',
    for: 'For established authorities whose visibility no longer reflects their legacy, and whose interpretation has silently drifted.',
  },
  {
    title: 'Authority Blueprint™',
    for: 'For institutions or figures whose symbolic structure needs to be realigned as a system — not patched.',
  },
];

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white p-6 shadow-sm ${className ?? ''}`.trim()}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-sm border border-neutral-300 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-700 ${className ?? ''}`.trim()}
    >
      {children}
    </span>
  );
}

function FractureMapSVG() {
  return (
    <svg
      className="absolute bottom-4 right-4 h-16 w-16 opacity-20"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="44" stroke="#111827" strokeWidth="0.5" />
      <line
        x1="0"
        y1="0"
        x2="100"
        y2="100"
        stroke="#111827"
        strokeWidth="0.3"
        strokeDasharray="2 2"
      />
      <line
        x1="100"
        y1="0"
        x2="0"
        y2="100"
        stroke="#111827"
        strokeWidth="0.3"
        strokeDasharray="2 2"
      />
      <text x="8" y="92" fontSize="4" fill="#111827" fontFamily="monospace">
        INTENSITY 72.4
      </text>
    </svg>
  );
}

function TierConnectorSVG() {
  return (
    <svg
      className="absolute left-0 top-0 h-full w-6 opacity-40"
      viewBox="0 0 10 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="5" y1="0" x2="5" y2="100" stroke="#111827" strokeWidth="0.4" />
      <circle cx="5" cy="5" r="1.5" fill="#111827" />
      <circle cx="5" cy="35" r="1.5" fill="#111827" />
      <circle cx="5" cy="70" r="1.5" fill="#111827" />
      <text x="7" y="7" fontSize="2.5" fill="#111827" fontFamily="monospace">
        T1
      </text>
      <text x="7" y="37" fontSize="2.5" fill="#111827" fontFamily="monospace">
        T2
      </text>
      <text x="7" y="72" fontSize="2.5" fill="#111827" fontFamily="monospace">
        Δ3
      </text>
    </svg>
  );
}

export default function DeliverablesAndTiers() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-32">
      <div className="mx-auto max-w-6xl space-y-32">
        {/* Entregáveis */}
        <div className="space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-medium tracking-tight text-neutral-900"
          >
            Structures Issued Post-Reading
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative bg-white/90 backdrop-blur-sm">
                  {index === 0 && <FractureMapSVG />}
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-serif text-lg font-medium text-neutral-900">
                      {item.title}
                    </h3>
                    <Badge>{item.badge}</Badge>
                  </div>
                  <CardContent className="text-sm leading-relaxed text-neutral-700">
                    {item.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-medium tracking-tight text-neutral-900"
          >
            Degrees of Interpretive Exposure
          </motion.h2>

          <div className="relative flex flex-col gap-8 pl-6 md:gap-12 md:pl-12">
            <TierConnectorSVG />
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative border-l-4 border-neutral-900 pl-4"
              >
                <h3 className="mb-2 font-serif text-lg font-medium text-neutral-900">
                  {tier.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-700">{tier.for}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
