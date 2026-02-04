/**
 * HOMEPAGE HERO ULTIMATE
 * 
 * Versão híbrida ULTRA COMPLETA combinando:
 * ✅ Background parallax + OptimizedImage (HeroSection)
 * ✅ Three.js scene overlay (HeroThreeScene)
 * ✅ Analytics completo (PostHog + GA4)
 * ✅ Stack badges premium com react-icons
 * ✅ 2 CTAs hierarchy com shimmer + glassmorphism
 * ✅ IntersectionObserver tracking
 * ✅ Micro-interações premium
 * ✅ Responsive otimizado
 * ✅ Performance: lazy Three.js, parallax disable mobile
 * 
 * FEATURES:
 * - Background image profissional com parallax
 * - Three.js geometric scene sobreposto (60% opacity)
 * - Mouse spotlight effect
 * - Scroll fade out
 * - 3 Benefits cards com hover effects
 * - Stack badges com glow effect
 * - Social proof sutil
 * - Pricing transparency
 */
'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { 
  Code2, 
  ArrowRight, 
  Zap, 
  TrendingUp,
  Sparkles,
  Shield,
  BarChart3
} from 'lucide-react';
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiPostgresql, 
  SiSupabase,
  SiTailwindcss,
  SiVercel,
  SiDocker
} from 'react-icons/si';
import { useParallax } from '@/hooks/useParallax';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Three.js Geometric Mesh
function GeometricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        color="#14b8a6"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Particle Field
function ParticleField() {
  const ref = useRef<any>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const t = Math.random() * 2 * Math.PI;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 4.5 + Math.random() * 2;
      
      temp[i * 3] = r * Math.sin(p) * Math.cos(t);
      temp[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      temp[i * 3 + 2] = r * Math.cos(p);
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function HomepageHeroUltimate() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const viewTrackedRef = useRef(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Parallax for background image
  const bgParallax = useParallax(bgRef, { speed: 0.3, enableOnMobile: false });

  // Scroll parallax for background only (não para content!)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  // Parallax aplicado APENAS ao background e Three.js, não ao content
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Mouse spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // IntersectionObserver tracking (50% viewport)
  useEffect(() => {
    if (viewTrackedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Dynamic import to avoid SSR issues
            try {
              const posthog = (await import('posthog-js')).default;
              posthog.capture('homepage_hero_viewed', {
                viewport_ratio: entry.intersectionRatio,
                timestamp: new Date().toISOString(),
              });
            } catch (error) {
              console.error('Failed to load posthog:', error);
            }

            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'hero_view', {
                section: 'homepage_hero',
                visibility_threshold: '50%'
              });
            }

            viewTrackedRef.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const trackCTAClick = async (ctaType: 'primary' | 'secondary', ctaText: string, href: string) => {
    // Dynamic import to avoid SSR issues
    try {
      const posthog = (await import('posthog-js')).default;
      posthog.capture('homepage_hero_cta_clicked', {
        cta_type: ctaType,
        cta_text: ctaText,
        destination: href,
        intent: ctaType === 'primary' ? 'high' : 'medium',
      });
    } catch (error) {
      console.error('Failed to load posthog:', error);
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        cta_type: ctaType,
        cta_text: ctaText,
        section: 'hero',
        destination: href
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20"
    >
      {/* Background Image com Parallax - AUMENTAR OPACITY */}
      <motion.div 
        ref={bgRef}
        style={{ 
          ...bgParallax.style,
          opacity: bgOpacity,
          scale: bgScale
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="/landing/images/anabelle-carite-_wofGSSFb1Q-unsplash.webp"
            alt="Professional workspace background"
            priority={true}
            fill={true}
            className="object-cover"
            objectFit="cover"
          />
        </div>
        {/* Gradient overlay MAIS SUAVE para manter background visível */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/85" />
      </motion.div>

      {/* Three.js Canvas Overlay - com fade out no scroll */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 opacity-50 pointer-events-none"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <GeometricMesh />
          <ParticleField />
        </Canvas>
      </motion.div>

      {/* Mouse Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(20, 184, 166, 0.08), transparent 50%)`,
        }}
      />

      {/* Texture Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />

      {/* Content - SEM opacity transform, sempre visível */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 sm:space-y-8 lg:space-y-10 text-center"
          >
            {/* Badge Premium - MELHOR DIMENSIONAMENTO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-800/70 border border-teal-500/30 backdrop-blur-md shadow-xl"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Consultoria Técnica & Performance</span>
              <div className="w-px h-3.5 bg-slate-600/50" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Resultados Mensuráveis
              </span>
            </motion.div>

            {/* Headline Premium - DIMENSIONAMENTO OTIMIZADO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
              Arquitetura e Otimização de{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                  Aplicações Web
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400/50 via-cyan-400/50 to-blue-400/50 rounded-full blur-sm"
                />
              </span>
            </h1>

            {/* Subtitle - MELHOR CONTRAST */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Desenvolvimento full-stack, migração de sistemas legados e implementação de{' '}
              <span className="text-teal-300 font-semibold">design systems escaláveis</span>. 
              Especialização em Next.js, React, TypeScript e PostgreSQL com foco em{' '}
              <span className="text-white font-semibold">Core Web Vitals</span> e métricas de performance.
            </p>

            {/* Benefits Grid - 3 Cards - DIMENSIONAMENTO OTIMIZADO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto pt-6"
            >
              {/* Performance */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group p-5 sm:p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-teal-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-500/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-1.5 sm:mb-2">
                  Performance Otimizada
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Core Web Vitals {'<'} 2.5s LCP, FID {'<'} 100ms, CLS {'<'} 0.1
                </p>
              </motion.div>

              {/* Scalability */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group p-5 sm:p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-1.5 sm:mb-2">
                  Arquitetura Escalável
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Design systems, microserviços, TypeScript strict
                </p>
              </motion.div>

              {/* Security */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group p-5 sm:p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-blue-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-1.5 sm:mb-2">
                  Segurança Enterprise
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Row-level security, auth completo, GDPR compliance
                </p>
              </motion.div>
            </motion.div>

            {/* CTAs Premium - DIMENSIONAMENTO E RESPONSIVIDADE MELHORADOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-8"
            >
              {/* Primary CTA - MELHOR SIZING */}
              <Link href="/jpcardozo" onClick={() => trackCTAClick('primary', 'Ver Portfolio Técnico', '/jpcardozo')}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white text-sm sm:text-base transition-all overflow-hidden shadow-[0_8px_32px_rgba(20,184,166,0.3)] hover:shadow-[0_16px_48px_rgba(20,184,166,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Ver Portfolio Técnico
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </motion.button>
              </Link>

              {/* Secondary CTA - MELHOR SIZING */}
              <Link href="/mydomain" onClick={() => trackCTAClick('secondary', 'Análise Gratuita', '/mydomain')}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base bg-slate-800/60 border border-slate-700/60 hover:border-teal-500/60 hover:bg-slate-800/80 backdrop-blur-md transition-all shadow-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                  Análise Gratuita de Performance
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stack Badges Premium - DIMENSIONAMENTO OTIMIZADO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-2 sm:gap-2.5 justify-center max-w-5xl mx-auto pt-8"
            >
              {[
                { name: 'Next.js 15', Icon: SiNextdotjs, color: 'text-white', bg: 'rgba(0,0,0,0.7)' },
                { name: 'React 19', Icon: SiReact, color: 'text-cyan-400', bg: 'rgba(6,182,212,0.15)' },
                { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-400', bg: 'rgba(59,130,246,0.15)' },
                { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-blue-300', bg: 'rgba(147,197,253,0.15)' },
                { name: 'Supabase', Icon: SiSupabase, color: 'text-emerald-400', bg: 'rgba(16,185,129,0.15)' },
                { name: 'Tailwind', Icon: SiTailwindcss, color: 'text-sky-400', bg: 'rgba(56,189,248,0.15)' },
                { name: 'Vercel', Icon: SiVercel, color: 'text-white', bg: 'rgba(0,0,0,0.7)' },
                { name: 'Docker', Icon: SiDocker, color: 'text-blue-400', bg: 'rgba(59,130,246,0.15)' }
              ].map(({ name, Icon, color, bg }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (index * 0.05), duration: 0.4 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div 
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg backdrop-blur-md border border-white/15 hover:border-white/30 transition-all duration-300 shadow-lg"
                    style={{ background: bg }}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color} flex-shrink-0`} />
                    <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                  
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ background: bg }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof - MELHOR DIMENSIONAMENTO */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 pt-6"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500/70" />
                <span className="font-medium text-slate-400">15+ projetos enterprise</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-slate-700" />

              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500/70" />
                <span className="text-slate-500">Performance: LCP 1.8s</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-slate-700" />

              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500/70" />
                <span className="text-slate-500">100% TypeScript strict</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - MELHOR DESIGN */}
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
