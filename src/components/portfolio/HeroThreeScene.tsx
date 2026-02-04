/**
 * CENA THREE.JS DO HERO
 * Cena geométrica abstrata com partículas sutis
 * Foco em performance: low poly, poucas draw calls
 * Aprimorado: Spotlight segue o mouse, scroll com parallax
 */
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiDotnet,
  SiAngular,
  SiPostgresql,
  SiSupabase,
  SiVercel,
  SiDocker
} from 'react-icons/si';

// Canvas isolado - SSR safe
const ThreeSceneCanvas = dynamic(() => import('./ThreeSceneCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950" />
});

export default function HeroThreeScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Efeito de spotlight do mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(20, 184, 166, 0.12), transparent 50%)`,
        }}
      />

      {/* Ambient gradient — profundidade sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-teal-500/[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/[0.03] blur-[100px] rounded-full" />
      </div>

      {/* Canvas Three.js */}
      <div className="absolute inset-0">
        <ThreeSceneCanvas />
      </div>

      {/* Conteúdo sobreposto */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-5 sm:space-y-6 lg:space-y-8 text-center"
          >
            {/* Badge acima do título */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/60 border border-teal-500/25 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Portfolio Técnico</span>
              <div className="w-px h-3.5 bg-slate-600/50" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Full Stack
              </span>
            </motion.div>

            {/* Heading — mais curto e impactante */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Desenvolvimento Web{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  com ênfase em UI/UX
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400/50 via-cyan-400/50 to-blue-400/50 rounded-full blur-sm"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Especialização em <span className="text-teal-300 font-semibold">otimização de Core Web Vitals</span>,
              migração de monolitos para microserviços e design systems escaláveis.
              Consolidação e expansão digital de PMEs.
            </p>

            {/* Stack técnica — centralizada */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center max-w-3xl mx-auto pt-2 sm:pt-4">
              {[
                { name: 'Next.js', Icon: SiNextdotjs, color: 'text-white', bg: 'rgba(0,0,0,0.6)' },
                { name: 'React', Icon: SiReact, color: 'text-cyan-400', bg: 'rgba(6,182,212,0.12)' },
                { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-400', bg: 'rgba(59,130,246,0.12)' },
                { name: '.NET Core', Icon: SiDotnet, color: 'text-purple-400', bg: 'rgba(168,85,247,0.12)' },
                { name: 'Angular', Icon: SiAngular, color: 'text-red-400', bg: 'rgba(239,68,68,0.12)' },
                { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-blue-300', bg: 'rgba(147,197,253,0.12)' },
                { name: 'Supabase', Icon: SiSupabase, color: 'text-emerald-400', bg: 'rgba(16,185,129,0.12)' },
                { name: 'Vercel', Icon: SiVercel, color: 'text-white', bg: 'rgba(0,0,0,0.6)' },
                { name: 'Docker', Icon: SiDocker, color: 'text-blue-400', bg: 'rgba(59,130,246,0.12)' }
              ].map(({ name, Icon, color, bg }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (index * 0.06), duration: 0.4 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div
                    className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 shadow-lg"
                    style={{ background: bg }}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color} flex-shrink-0`} />
                    <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ background: bg }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Social proof inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 pt-2"
            >
              <span className="font-medium text-slate-400">15+ projetos enterprise</span>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <span>LCP 1.8s</span>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <span>100% TypeScript strict</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-slate-700/60 flex items-start justify-center pt-1.5 sm:pt-2 bg-slate-800/30 backdrop-blur-sm hover:border-teal-500/40 transition-colors"
          >
            <div className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
