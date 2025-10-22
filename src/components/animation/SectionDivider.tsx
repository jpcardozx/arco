'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
  variant?: 'wave' | 'fade' | 'gradient' | 'depth';
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
        transition={{ duration: 0.5 }}
        style={{ height: 56 }}
      >
        <div style={{ height: '100%', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.04))' }} />
      </motion.div>
    );
  }

  // gradient variant: elegant colored gradient with depth
  if (variant === 'gradient') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scaleY: 0.8 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 72,
          transformOrigin: 'center'
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(180deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1), rgba(168,85,247,0.05), transparent)',
            backdropFilter: 'blur(1px)'
          }}
        />
      </motion.div>
    );
  }

  // depth variant: layered effect with shadow and perspective
  if (variant === 'depth') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 88,
          perspective: '1000px'
        }}
      >
        {/* Top layer - lightest */}
        <div
          style={{
            height: '25%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent)',
            backdropFilter: 'blur(2px)'
          }}
        />

        {/* Middle layer - accent */}
        <div
          style={{
            height: '50%',
            background: 'linear-gradient(180deg, rgba(59,130,246,0.06), rgba(99,102,241,0.04), rgba(139,92,246,0.02))',
            boxShadow: '0 10px 30px -20px rgba(99,102,241,0.3)'
          }}
        />

        {/* Bottom layer - fades out */}
        <div
          style={{
            height: '25%',
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.02))'
          }}
        />
      </motion.div>
    );
  }

  // wave variant: lightweight SVG translateX (default)
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
