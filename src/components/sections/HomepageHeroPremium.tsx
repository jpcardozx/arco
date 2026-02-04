/**
 * HOMEPAGE HERO - Premium Three.js Scene
 * 
 * Hero profissional com:
 * - Three.js geometric scene com partículas sutis
 * - Stack badges com react-icons
 * - Gradientes premium dark theme
 * - Framer Motion animations
 * - Mouse spotlight effect
 * - Scroll parallax
 * 
 * Performance otimizada: low poly, poucas draw calls, SSR disabled
 */
'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { ArrowRight, Code2, Zap, TrendingUp } from 'lucide-react';
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

// Malha geométrica em rotação suave
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
        opacity={0.25}
      />
    </mesh>
  );
}

// Campo de partículas
function ParticleField() {
  const ref = useRef<any>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
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
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function HomepageHeroPremium() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-0"
    >
      {/* Efeito spotlight do mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(20, 184, 166, 0.12), transparent 50%)`,
        }}
      />

      {/* Canvas Three.js */}
      <div className="absolute inset-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <GeometricMesh />
          <ParticleField />
        </Canvas>
      </div>

      {/* Conteúdo sobreposto */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 sm:space-y-8 lg:space-y-10 text-center"
          >
            {/* Badge Premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-xl"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-300">Consultoria Técnica & Performance</span>
            </motion.div>

            {/* Title Premium */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.08] max-w-5xl mx-auto">
              Arquitetura e Otimização de{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Aplicações Web
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400/40 via-cyan-400/40 to-blue-400/40 rounded-full"
                />
              </span>
            </h1>

            {/* Subtitle específico */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Desenvolvimento full-stack, migração de sistemas legados e implementação de{' '}
              <span className="text-teal-300 font-medium">design systems escaláveis</span>. 
              Especialização em Next.js, React, TypeScript e PostgreSQL com foco em{' '}
              <span className="text-white font-medium">Core Web Vitals</span> e experiência de usuário.
            </p>

            {/* CTAs Premium com melhor hierarquia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
            >
              {/* Primary CTA - Ver Portfolio */}
              <Link href="/jpcardozo">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 rounded-xl font-bold text-white text-base transition-all overflow-hidden shadow-[0_8px_32px_rgba(20,184,166,0.25)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.35)]"
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Ver Portfolio Técnico
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </motion.button>
              </Link>

              {/* Secondary CTA - Análise Gratuita */}
              <Link href="/mydomain">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 rounded-xl font-semibold text-white text-base bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/50 hover:bg-slate-800/70 backdrop-blur-md transition-all shadow-lg flex items-center gap-2"
                >
                  <Zap className="w-5 h-5 text-teal-400" />
                  Análise Gratuita de Performance
                  <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stack técnica com ícones premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-2.5 pt-6 sm:pt-8 justify-center max-w-4xl mx-auto"
            >
              {[
                { name: 'Next.js 15', Icon: SiNextdotjs, color: 'text-white', bg: 'rgba(0,0,0,0.6)' },
                { name: 'React 19', Icon: SiReact, color: 'text-cyan-400', bg: 'rgba(6,182,212,0.1)' },
                { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)' },
                { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-blue-300', bg: 'rgba(147,197,253,0.1)' },
                { name: 'Supabase', Icon: SiSupabase, color: 'text-emerald-400', bg: 'rgba(16,185,129,0.1)' },
                { name: 'Tailwind', Icon: SiTailwindcss, color: 'text-sky-400', bg: 'rgba(56,189,248,0.1)' },
                { name: 'Vercel', Icon: SiVercel, color: 'text-white', bg: 'rgba(0,0,0,0.6)' },
                { name: 'Docker', Icon: SiDocker, color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)' }
              ].map(({ name, Icon, color, bg }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + (index * 0.05), duration: 0.4 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div 
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-300 shadow-xl"
                    style={{ background: bg }}
                  >
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ background: bg }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de Scroll Premium */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-wider font-medium">Explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-slate-700/50 flex items-start justify-center pt-2 bg-slate-800/20 backdrop-blur-sm"
          >
            <div className="w-1 h-2 bg-teal-400/70 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
