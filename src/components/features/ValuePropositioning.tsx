'use client';

import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight, AlertCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import React from "react";

export default function ValuePropositioning() {
  // Animation refs
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Value pillar data
  const valuePillars = [
    {
      title: 'Perception Engineering',
      description:
        'A systematic approach to identifying and correcting the symbolic misalignments that cause your market to undervalue your offering.',
      benefits: [
        'Eliminate perception gaps that cost revenue',
        'Position at the top tier of your market',
        'Command premium pricing with confidence',
      ],
      icon: '/assets/perception-icon.svg',
      color: 'blue',
    },
    {
      title: 'Financial Decision Architecture',
      description:
        'Strategic redesign of how value is communicated throughout the customer journey to accelerate decisions and increase conversions.',
      benefits: [
        'Reduce decision cycles by 40-70%',
        'Increase conversion rates by 50-200%',
        'Minimize price objections and negotiations',
      ],
      icon: '/assets/financial-icon.svg',
      color: 'indigo',
    },
    {
      title: 'Market Position Reinforcement',
      description:
        'Comprehensive alignment of all touchpoints to maintain a consistent perception of premium value that competitors cannot easily challenge.',
      benefits: [
        'Create sustainable competitive advantage',
        'Reduce sensitivity to market fluctuations',
        'Build brand equity that transcends features',
      ],
      icon: '/assets/market-icon.svg',
      color: 'violet',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white py-24 text-neutral-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              THE STRATEGIC ADVANTAGE
            </h2>
            <h3 className="portfolio-text-balance mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Precisely engineered market perception that delivers predictable revenue outcomes
            </h3>
            <p className="portfolio-prose text-lg text-neutral-600">
              We've transformed how companies are perceived in their markets, creating significant
              competitive advantages that translate directly to improved financial performance.
            </p>
          </motion.div>
        </div>

        {/* Value pillars */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {valuePillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="portfolio-card group"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-${pillar.color}-100 text-${pillar.color}-600`}
              >
                <TrendingUp className="h-6 w-6" />
              </div>

              <h4 className="mb-3 text-xl font-medium">{pillar.title}</h4>

              <p className="mb-6 text-neutral-600">{pillar.description}</p>

              <ul className="mb-8 space-y-3">
                {pillar.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                    <span className="text-sm text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href={`/methodology#${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-800"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start">
              <div className="mr-4">
                <AlertCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h4 className="mb-2 text-lg font-medium">The cost of perception misalignment</h4>
                <p className="text-neutral-700">
                  Companies lose an average of 32% of potential revenue due to how their value is
                  perceived.
                </p>
              </div>
            </div>
            <div>
              <Link href="/diagnose" className="portfolio-button portfolio-button-primary">
                Calculate Your Revenue Gap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
