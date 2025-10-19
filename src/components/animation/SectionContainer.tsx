'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const container = {
  hidden: {},
  enter: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

export const item = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SectionContainer({ id, className = '', children }: SectionContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // Reduced motion: render plain section without animation
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="enter"
      viewport={{ once: true, amount: 0.18 }}
      variants={container}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item} style={{ willChange: 'transform, opacity' }}>
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
}
