/**
 * HOMEPAGE HERO - EDITORIAL IMPACT
 *
 * Design editorial e impactante focado em storytelling:
 * ✅ Layout magazine-style com tipografia bold
 * ✅ Minimal distractions, maximum impact
 * ✅ Story-driven content vs feature lists
 * ✅ High-contrast, professional aesthetics
 * ✅ Performance-first (no overhead)
 * ✅ Mobile-first responsive design
 */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Typing animation hook
function useTypingEffect(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
}

export default function HomepageHeroNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects (simplified)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Typing effect for main headline
  const typedText = useTypingEffect("Seu site atual está travando o crescimento?", 80);

  // Analytics tracking
  const trackCTAClick = (ctaType: string, ctaText: string, href: string) => {
    // Analytics implementation would go here
    console.log('CTA clicked:', { ctaType, ctaText, href });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 bg-black"
    >
      {/* ULTIMATE SOPHISTICATED BACKGROUND - Premium architectural design */}
      <div className="absolute inset-0">

        {/* Foundational depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-black" />

        {/* Architectural texture - ultra-refined */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.6) 0.25px, transparent 0.25px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.6) 0.25px, transparent 0.25px),
              linear-gradient(45deg, rgba(245, 158, 11, 0.3) 0.25px, transparent 0.25px)
            `,
            backgroundSize: '120px 120px, 120px 120px, 240px 240px',
          }}
        />

        {/* Premium conic signature elements - positioned asymmetrically */}
        <motion.div
          className="absolute top-[15%] left-[12%] w-[420px] h-[420px]"
          style={{
            background: `conic-gradient(
              from var(--hero-angle) at 50% 50%,
              transparent 0%,
              rgba(20, 184, 166, 0.035) 15%,
              rgba(16, 185, 129, 0.025) 35%,
              transparent 45%,
              rgba(245, 158, 11, 0.02) 65%,
              transparent 85%,
              transparent 100%
            )`,
            filter: 'blur(90px)',
            animation: 'heroRotate 35s linear infinite',
          }}
        />

        <motion.div
          className="absolute bottom-[18%] right-[15%] w-[380px] h-[380px]"
          style={{
            background: `conic-gradient(
              from var(--hero-angle-reverse) at 50% 50%,
              transparent 0%,
              rgba(245, 158, 11, 0.03) 20%,
              transparent 40%,
              rgba(249, 115, 22, 0.02) 55%,
              rgba(20, 184, 166, 0.025) 75%,
              transparent 95%,
              transparent 100%
            )`,
            filter: 'blur(100px)',
            animation: 'heroRotateReverse 40s linear infinite',
          }}
        />

        {/* Layered depth gradients - creates sophisticated dimensionality */}
        <div className="absolute inset-0 overflow-hidden">

          {/* Primary depth layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 1200px 400px at 25% 30%, rgba(20, 184, 166, 0.018) 0%, transparent 65%),
                radial-gradient(ellipse 900px 300px at 75% 80%, rgba(245, 158, 11, 0.015) 0%, transparent 60%)
              `,
            }}
            animate={{
              transform: ['translateX(0px) translateY(0px)', 'translateX(50px) translateY(25px)', 'translateX(0px) translateY(0px)'],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Secondary atmospheric layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 800px 200px at 60% 20%, rgba(16, 185, 129, 0.012) 0%, transparent 70%),
                radial-gradient(ellipse 600px 180px at 30% 90%, rgba(249, 115, 22, 0.01) 0%, transparent 65%)
              `,
            }}
            animate={{
              transform: ['translateX(0px) translateY(0px)', 'translateX(-30px) translateY(-15px)', 'translateX(0px) translateY(0px)'],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </div>

        {/* Central ambient presence - barely perceptible but adds warmth */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
          style={{
            background: `radial-gradient(circle, rgba(20, 184, 166, 0.008) 0%, rgba(245, 158, 11, 0.005) 40%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Elegant floating motes - refined positioning */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-teal-400/15 rounded-full"
              style={{
                top: `${25 + (i * 15) + Math.random() * 10}%`,
                left: `${15 + (i * 20) + Math.random() * 10}%`,
                filter: 'blur(0.25px)',
              }}
              animate={{
                y: [0, -180, -360],
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 18 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Accent motes with amber tint */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`amber-${i}`}
              className="absolute w-0.5 h-0.5 bg-amber-400/12 rounded-full"
              style={{
                top: `${40 + (i * 20) + Math.random() * 15}%`,
                left: `${60 + (i * 15) + Math.random() * 15}%`,
                filter: 'blur(0.25px)',
              }}
              animate={{
                y: [0, -200, -400],
                opacity: [0, 0.35, 0],
                scale: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 20 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 12,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Professional workspace - nearly invisible but adds texture depth */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 opacity-[0.025]">
            <OptimizedImage
              src="/landing/images/anabelle-carite-_wofGSSFb1Q-unsplash.webp"
              alt="Professional workspace"
              priority={true}
              fill={true}
              className="object-cover object-center"
              objectFit="cover"
            />
          </div>

          {/* Ultimate sophisticated overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-black/70 to-slate-900/80" />

          {/* Subtle edge vignette for depth */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 0.2) 100%)`
            }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @property --hero-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @property --hero-angle-reverse {
          syntax: '<angle>';
          initial-value: 360deg;
          inherits: false;
        }
        @keyframes heroRotate {
          from { --hero-angle: 0deg; }
          to { --hero-angle: 360deg; }
        }
        @keyframes heroRotateReverse {
          from { --hero-angle-reverse: 360deg; }
          to { --hero-angle-reverse: 0deg; }
        }
      `}</style>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full px-6 lg:px-8"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center min-h-[80vh]">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 space-y-16 lg:space-y-20">

              {/* Main Headline - Typography aprimorada */}
              <div className="space-y-8 lg:space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <h1
                    className="font-extrabold text-white leading-[0.9] tracking-[-0.03em] relative"
                    style={{
                      fontSize: 'clamp(2.25rem, 6.5vw, 4.25rem)',
                      textShadow: '0 2px 40px rgba(0,0,0,0.3)',
                      fontFeatureSettings: '"ss01", "cv01"',
                    }}
                  >
                    {typedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block w-1 bg-white ml-3"
                      style={{ height: '0.8em' }}
                    />
                    {/* Subtle text glow */}
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-transparent to-emerald-400/10 blur-xl"
                      aria-hidden="true"
                    >
                      {typedText}
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <p
                    className="font-normal text-slate-300 leading-[1.5] max-w-3xl"
                    style={{
                      fontSize: 'clamp(1.0625rem, 2.2vw, 1.375rem)',
                      letterSpacing: '-0.015em',
                      fontFeatureSettings: '"ss02"',
                    }}
                  >
                    Construímos plataformas que{' '}
                    <span className="text-white font-bold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent">
                      suportam milhares de usuários
                    </span>{' '}
                    sem quebrar. Migramos sistemas antigos que{' '}
                    <span className="text-white font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                      limitam seu faturamento
                    </span>.
                  </p>
                </motion.div>
              </div>

              {/* Problemas Reais - Conectados com a dor do cliente */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              >
                {[
                  {
                    problem: "Site cai com muitos acessos?",
                    solution: "Infraestrutura escalável"
                  },
                  {
                    problem: "Sistema lento demais?",
                    solution: "Arquitetura otimizada"
                  },
                  {
                    problem: "Difícil adicionar funcionalidades?",
                    solution: "Código limpo e modular"
                  },
                  {
                    problem: "Integrações que não funcionam?",
                    solution: "APIs robustas"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.problem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                    className="group"
                  >
                    <div className="text-base font-semibold text-slate-300 mb-3 group-hover:text-white transition-colors tracking-tight">
                      {item.problem}
                    </div>
                    <div className="text-emerald-400 font-semibold text-sm tracking-tight">
                      → {item.solution}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs Premium - Refined Professional Design */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.0, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col sm:flex-row gap-4 pt-0"
              >
                {/* Primary CTA - Elegant with gradient border */}
                <Link
                  href="/jpcardozx"
                  onClick={() => trackCTAClick('primary', 'Ver Cases e Projetos', '/jpcardozx')}
                  className="group relative inline-block"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 group-hover:from-teal-400 group-hover:via-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      <div className="w-full h-full bg-white rounded-[14px]" />
                    </div>
                    <div className="relative px-8 py-4 bg-white rounded-2xl">
                      <span className="flex items-center justify-center gap-2 font-bold text-base text-slate-900 tracking-tight">
                        Ver Cases e Projetos
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-emerald-500/20 group-hover:to-teal-500/20 blur-xl transition-all duration-300 -z-10" />
                  </motion.div>
                </Link>

                {/* Secondary CTA - Glass morphism with neon accent */}
                <Link
                  href="/agendamentos"
                  onClick={() => trackCTAClick('secondary', 'Análise Técnica Gratuita', '/agendamentos')}
                  className="group relative inline-block"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    {/* Glass container with gradient border */}
                    <div
                      className="px-8 py-4 rounded-2xl backdrop-blur-xl border-2 border-slate-700/50 group-hover:border-teal-500/50 transition-all duration-500 relative overflow-hidden"
                      style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                      }}
                    >
                      {/* Animated background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-emerald-500/0 group-hover:from-teal-500/10 group-hover:via-teal-500/15 group-hover:to-emerald-500/10 transition-all duration-500" />

                      <span className="flex items-center justify-center gap-2 font-bold text-base text-slate-200 group-hover:text-white transition-colors relative z-10 tracking-tight">
                        <Play className="w-5 h-5 text-teal-400" />
                        Análise Técnica Gratuita
                      </span>
                    </div>
                    {/* Ambient glow */}
                    <div className="absolute inset-0 rounded-2xl bg-teal-500/0 group-hover:bg-teal-500/20 blur-xl transition-all duration-500 -z-10" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Indicator - Subtle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.4 }}
                className="flex items-center gap-4 pt-6 text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-tight">Response time: ~2h</span>
                </div>
                <div className="w-px h-4 bg-slate-600" />
                <span className="tracking-tight">Sem compromisso</span>
              </motion.div>
            </div>

            {/* Right Column - Visual Element Aprimorado */}
            <div className="lg:col-span-5 relative mt-16 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative max-w-md mx-auto lg:max-w-none"
              >
                {/* Arquitetura Visual - Sistema Real */}
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/40 backdrop-blur-xl shadow-2xl overflow-hidden">

                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-slate-300 text-sm font-semibold tracking-tight">Arquitetura do Sistema</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                    </div>
                  </div>

                  {/* Architecture Diagram */}
                  <div className="p-6 space-y-6">

                    {/* Frontend Layer */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="space-y-3"
                    >
                      <div className="text-slate-200 text-xs font-bold uppercase tracking-wider">Frontend</div>
                      <div className="grid grid-cols-3 gap-3">
                        {["React", "TypeScript", "Next.js"].map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                            className="text-center p-3 bg-blue-500/10 border border-blue-400/20 rounded-xl"
                          >
                            <div className="text-blue-300 text-sm font-semibold tracking-tight">{tech}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Connection Arrow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                      className="flex justify-center"
                    >
                      <div className="w-px h-6 bg-gradient-to-b from-slate-600 to-slate-700" />
                    </motion.div>

                    {/* Backend Layer */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2 }}
                      className="space-y-3"
                    >
                      <div className="text-slate-200 text-xs font-bold uppercase tracking-wider">Backend & Infraestrutura</div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: "API Routes", bgClass: "bg-emerald-500/10", borderClass: "border-emerald-400/20", textClass: "text-emerald-300" },
                          { name: "PostgreSQL", bgClass: "bg-purple-500/10", borderClass: "border-purple-400/20", textClass: "text-purple-300" },
                          { name: "Vercel Edge", bgClass: "bg-slate-500/10", borderClass: "border-slate-400/20", textClass: "text-slate-300" },
                          { name: "Supabase", bgClass: "bg-green-500/10", borderClass: "border-green-400/20", textClass: "text-green-300" }
                        ].map((service, index) => (
                          <motion.div
                            key={service.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                            className={`text-center p-3 ${service.bgClass} border ${service.borderClass} rounded-xl`}
                          >
                            <div className={`${service.textClass} text-sm font-semibold tracking-tight`}>{service.name}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Status Indicators */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.6 }}
                      className="flex justify-between items-center pt-2 border-t border-slate-700/30"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-slate-400 text-xs tracking-tight">Todos os serviços online</span>
                      </div>
                      <div className="text-slate-400 text-xs tracking-tight">
                        Última atualização: agora
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Cards de Resultados - Responsivo */}

                {/* Desktop floating cards */}
                <div className="hidden lg:block">
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 1, delay: 3.0, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute -bottom-6 -left-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-400/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <div className="text-emerald-300 text-lg font-bold tracking-tight">50k+</div>
                        <div className="text-emerald-200/70 text-[0.6875rem] tracking-tight">usuários simultâneos</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -30, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 1, delay: 3.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-400/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                      <div>
                        <div className="text-blue-300 text-lg font-bold tracking-tight">24/7</div>
                        <div className="text-blue-200/70 text-[0.6875rem] tracking-tight">Monitoramento</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 3.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-400/20 backdrop-blur-xl rounded-xl p-3 shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="text-purple-300 text-sm font-bold tracking-tight">Global</div>
                      <div className="text-purple-200/70 text-xs tracking-tight">CDN</div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile cards - organized below */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 3.0, ease: [0.23, 1, 0.32, 1] }}
                  className="lg:hidden flex flex-wrap gap-3 mt-8 justify-center"
                >
                  <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-400/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-emerald-300 text-sm font-bold tracking-tight">50k+ usuários</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-400/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <div className="text-blue-300 text-sm font-bold tracking-tight">24/7 monitor</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-400/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <div className="text-purple-300 text-sm font-bold tracking-tight">Global CDN</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}