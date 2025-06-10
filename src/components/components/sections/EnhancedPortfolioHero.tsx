'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

export default function EnhancedPortfolioHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/texture3.png')] opacity-20 mix-blend-soft-light" />
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
        <div className="animated-bg" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: opacityParallax, y: yParallax, scale: scaleParallax }}
        className="container relative z-10 mx-auto flex min-h-[90vh] flex-col justify-center px-6 py-32"
      >
        <div className="max-w-4xl">
          {/* Pre-heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center rounded-full border border-blue-800/50 bg-blue-900/30 px-3 py-1.5"
          >
            <span className="mr-3 h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-blue-300">
              Strategic Perception Engineering
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-serif text-4xl font-medium leading-tight text-white md:text-6xl"
          >
            Translating Technical Excellence into Market{' '}
            <span className="text-blue-400">Value Recognition</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 max-w-2xl text-xl text-neutral-300"
          >
            I specialize in correcting the misalignment between your delivered value and market
            perception to unlock premium pricing power, shorten sales cycles, and increase
            conversion rates.
          </motion.p>

          {/* Key metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {[
              { value: '+87%', label: 'Average conversion lift' },
              { value: '2.4×', label: 'Price positioning increase' },
              { value: '-63%', label: 'Reduction in sales cycle time' },
            ].map((metric, index) => (
              <div
                key={index}
                className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-6 backdrop-blur"
              >
                <div className="mb-2 font-mono text-3xl font-medium text-blue-400">
                  {metric.value}
                </div>
                <div className="text-sm text-neutral-400">{metric.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="#case-studies"
              className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 font-medium text-white transition-all hover:bg-blue-700"
            >
              View Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#contact"
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-8 py-3.5 font-medium text-white transition-all hover:bg-neutral-700"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="mb-2 text-sm text-neutral-400">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 text-neutral-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
