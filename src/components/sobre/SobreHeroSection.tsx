/**
 * Sobre Hero Section - PARALLAX REFINADO
 *
 * Hero com Three.js background representando arquitetura de sistemas
 * Parallax em múltiplas camadas de profundidade
 * Reveal progressivo ao scroll
 */

'use client';

import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Sparkles, ArrowDown } from 'lucide-react';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />,
});

export function SobreHeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring physics for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Different speeds for depth layers
  const yTitle = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const ySubtitle = useTransform(smoothProgress, [0, 1], ['0%', '80%']);
  const yStats = useTransform(smoothProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.9]);
  const blur = useTransform(smoothProgress, [0, 1], [0, 10]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 dark:bg-black"
    >
      {/* Three.js Background - Arquitetura de sistemas */}
      <Suspense fallback={<div className="absolute inset-0 bg-slate-950 dark:bg-black" />}>
        <ThreeBackground />
      </Suspense>

      {/* Gradient overlay for depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950 dark:via-black/30 dark:to-black pointer-events-none"
        style={{ opacity }}
      />

      {/* Content with layered parallax */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-0 pb-20 text-center">
        {/* Tag - Fastest layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: yStats, opacity }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/10 border border-white/10 dark:border-white/20 mb-8 backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-slate-200 dark:text-white">
              Arquitetura & Performance
            </span>
          </motion.div>
        </motion.div>

        {/* Title - Middle layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ y: yTitle, scale, opacity }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Desenvolvimento e otimização{' '}
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent animate-gradient">
              de aplicações web
            </span>
          </h1>
        </motion.div>

        {/* Subtitle - Slower layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: ySubtitle, opacity }}
        >
          <p className="text-xl md:text-2xl text-slate-300 dark:text-slate-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            Arquitetura escalável, performance otimizada e migração de sistemas legados.
            <br className="hidden md:block" />
            Especialização em Next.js, React, TypeScript e PostgreSQL.
          </p>
        </motion.div>

        {/* Stats - Slowest layer (stays longer) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ y: yStats }}
        >
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-white/10 dark:border-white/20">
            {[
              { value: '8+', label: 'Anos', delay: 0 },
              { value: '40+', label: 'Projetos', delay: 0.1 },
              { value: '98+', label: 'Performance', delay: 0.2 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + stat.delay,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1, y: -8 }}
                className="relative group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 dark:text-slate-300">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-slate-400 dark:text-slate-300 uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown className="w-5 h-5 text-slate-400 dark:text-slate-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
