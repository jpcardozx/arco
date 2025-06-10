'use client';

import clsx from 'clsx';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import React from "react";

/* -------------------------------------------------------------------------- */
/*                           TYPOGRAPHY SYSTEM                                */
/* -------------------------------------------------------------------------- */

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Typography = {
  Editorial: ({ children, className = '', ...props }: TypographyProps) => (
    <span className={`font-serif ${className}`} {...props}>
      {children}
    </span>
  ),

  Technical: ({ children, className = '', ...props }: TypographyProps) => (
    <span className={`font-sans ${className}`} {...props}>
      {children}
    </span>
  ),

  Data: ({ children, className = '', ...props }: TypographyProps) => (
    <span className={`font-mono ${className}`} {...props}>
      {children}
    </span>
  ),
};

/* -------------------------------------------------------------------------- */
/*                         STRATEGIC CONTENT                                  */
/* -------------------------------------------------------------------------- */

// Core differentiators aligned with ARCO's perception framework
const STRATEGIC_DIFFERENTIATORS = [
  {
    icon: <CheckCircle className="h-5 w-5 text-gray-300" />,
    text: 'Individual, precise diagnosis: real analysis of your perception-value gaps, not generic presentations.',
  },
  {
    icon: <LockKeyhole className="h-5 w-5 text-gray-300" />,
    text: 'Complete confidentiality: operational NDA and rigorous professional ethics.',
  },
  {
    icon: <ArrowRight className="h-5 w-5 text-gray-300" />,
    text: 'Actionable recommendations — practical insights prioritized by economic impact, without sales pressure.',
  },
];

// Testimonial component with strategic framing
function TestimonialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.98, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.98, y: 40 }}
          transition={{ type: 'spring', bounce: 0.24, duration: 0.35 }}
          className="relative flex w-full max-w-lg flex-col items-center rounded-lg border border-gray-800 bg-gray-900 px-8 py-10 shadow-xl"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <Quote className="mb-4 h-10 w-10 text-gray-600" />
          <Typography.Editorial className="mb-5 text-center text-lg italic leading-relaxed text-gray-200 md:text-xl">
            "We chose ARCO for their direct approach and clarity in recommendations. There were no
            empty promises, just critical analysis of the points that needed improvement. The
            diagnosis helped our team prioritize what actually generated results."
          </Typography.Editorial>

          <div className="mt-2 flex items-center gap-3">
            <Image
              src="/logo-finmark.svg"
              alt="Finmark"
              width={32}
              height={32}
              className="rounded-full border border-gray-700 bg-gray-800 p-1"
            />
            <Typography.Technical className="text-sm text-gray-400">
              CEO, Finmark
            </Typography.Technical>
            <Typography.Data className="ml-2 rounded-full border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
              ArcSight Snapshot™
            </Typography.Data>
          </div>

          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800"
            aria-label="Close testimonial"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M18 6 6 18M6 6l12 12"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function StrategicClosing() {
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'relative mx-auto my-32 max-w-5xl px-6 py-20 sm:px-8',
        'overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-xl'
      )}
    >
      {/* Strategic badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.15 }}
        className={clsx(
          'absolute -top-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 px-6 py-2',
          'rounded-full border border-gray-700 bg-gray-900 text-gray-200 shadow-md'
        )}
      >
        <ShieldCheck className="h-5 w-5 text-gray-400" />
        <Typography.Technical className="font-medium">
          Perception-Value Assessment
        </Typography.Technical>
      </motion.div>

      {/* Editorial headline and framework introduction */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <Typography.Editorial className="mb-5 block text-2xl leading-tight text-gray-100 md:text-3xl">
          Technical excellence requires precise symbolic representation to achieve true market
          value.
        </Typography.Editorial>

        <Typography.Technical className="block text-base text-gray-400 md:text-lg">
          Identify the specific gaps between your delivered value and market perception. Our
          diagnostic provides a structured assessment with actionable corrections, prioritized by
          economic impact and implementation feasibility.
        </Typography.Technical>
      </motion.div>

      {/* Strategic differentiators */}
      <ul className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {STRATEGIC_DIFFERENTIATORS.map(({ icon, text }, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
            className={clsx(
              'flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4',
              'shadow-md'
            )}
          >
            <div className="mt-0.5 rounded-full border border-gray-700 bg-gray-800 p-1.5">
              {icon}
            </div>
            <Typography.Technical className="text-sm text-gray-300">{text}</Typography.Technical>
          </motion.li>
        ))}
      </ul>

      {/* Strategic CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-12 flex flex-col items-center gap-3"
      >
        <Link
          href="/diagnose"
          className={clsx(
            'group inline-flex items-center justify-center px-8 py-3',
            'rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-lg transition-all hover:bg-gray-800',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600'
          )}
        >
          <Typography.Technical className="mr-2 font-medium">
            Request ArcSight Snapshot™
          </Typography.Technical>
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>

        <Typography.Data className="mt-2 text-xs uppercase tracking-wide text-gray-500">
          $147 • 24-hour turnaround • No sales pressure
        </Typography.Data>
      </motion.div>

      {/* Testimonial with perception framework language */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={clsx(
          'mx-auto mt-8 max-w-xl rounded-lg border border-gray-800 bg-gray-900 px-6 py-6 shadow-lg',
          'relative'
        )}
      >
        <button
          onClick={() => setShowModal(true)}
          className="absolute right-3 top-3 rounded-full bg-gray-800/80 p-2 text-gray-400 transition-colors hover:bg-gray-800"
          aria-label="Expand testimonial"
        >
          <Quote className="h-4 w-4" />
        </button>

        <Typography.Editorial className="mb-4 block text-base italic text-gray-300 md:text-lg">
          "ARCO's analysis helped us make decisions based on data, not assumptions. Their focus on
          what truly mattered accelerated our results curve."
        </Typography.Editorial>

        <div className="flex items-center gap-3">
          <Image
            src="/logo-finmark.svg"
            alt="Finmark"
            width={28}
            height={28}
            className="rounded-full border border-gray-700 bg-gray-800 p-1"
          />
          <Typography.Technical className="text-sm text-gray-400">
            CEO, Finmark
          </Typography.Technical>
          <Typography.Data className="ml-2 rounded-full border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
            ArcSight Snapshot™
          </Typography.Data>
        </div>
      </motion.div>

      <TestimonialModal open={showModal} onClose={() => setShowModal(false)} />

      {/* Institutional commitment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={clsx(
          'mt-12 rounded-lg border border-gray-800 bg-gray-900 px-6 py-6 text-center shadow-lg md:px-14'
        )}
      >
        <Typography.Editorial className="mb-3 block text-base text-gray-300 md:text-lg">
          <span className="mb-2 block italic text-gray-500">ARCO Commitment</span>
          Honest, technical diagnosis free from commercial interests. If there's no potential for
          significant impact, we state that at the outset — delivering clarity, not illusion.
        </Typography.Editorial>

        <Typography.Technical className="mt-4 block font-medium text-gray-300">
          J.P. Cardozo{' '}
          <span className="ml-2 text-sm font-normal text-gray-500">/ ARCO Founder</span>
        </Typography.Technical>
      </motion.div>

      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-[-10%] left-[-15%] h-96 w-96 rounded-full bg-gradient-to-br from-gray-800/30 to-gray-900/10 opacity-60 blur-3xl" />
        <div className="absolute right-[-10%] top-[-5%] h-80 w-80 rounded-full bg-gradient-to-br from-gray-800/20 to-gray-900/5 opacity-40 blur-3xl" />
      </div>
    </section>
  );
}
