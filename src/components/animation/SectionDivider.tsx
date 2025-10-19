'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
  variant?: 'wave' | 'fade';
}

export default function SectionDivider({ className = '', variant = 'wave' }: SectionDividerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className} style={{ height: 48, background: 'transparent' }} />;
  }

  if (variant === 'fade') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ height: 56 }}
      >
        <div style={{ height: '100%', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.04))' }} />
      </motion.div>
    );
  }

  // wave variant: lightweight SVG translateX
  return (
    <motion.div
      className={className}
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 64 }}
    >
      <svg width="100%" height="64" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden>
        <path d="M0,32 C240,80 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill="rgba(59,130,246,0.06)" />
      </svg>
    </motion.div>
  );
}
