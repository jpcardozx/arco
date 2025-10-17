/**
 * CENA THREE.JS DO HERO
 * Cena geométrica abstrata com partículas sutis
 * Foco em performance: low poly, poucas draw calls
 * Aprimorado: Spotlight segue o mouse, scroll com parallax
 */
'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import * as THREE from 'three';
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

// Malha geométrica em rotação
function GeometricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#14b8a6"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Campo de partículas
function ParticleField() {
  const ref = useRef<any>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const t = Math.random() * 2 * Math.PI;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 2;
      
      temp[i * 3] = r * Math.sin(p) * Math.cos(t);
      temp[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      temp[i * 3 + 2] = r * Math.cos(p);
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

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
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Efeito de spotlight do mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(20, 184, 166, 0.15), transparent 40%)`,
        }}
      />

      {/* Canvas Three.js */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <GeometricMesh />
          <ParticleField />
        </Canvas>
      </div>

      {/* Conteúdo sobreposto */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full flex items-center justify-center py-20 sm:py-24 lg:py-0"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Title factual */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Arquitetura e performance<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>para produtos escaláveis
            </h1>

            {/* Subtitle específico */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-3xl leading-relaxed">
              Especializado em <span className="text-teal-400 font-medium">otimização de Core Web Vitals</span>, 
              migração de monolitos para microserviços, e implementação de design systems escaláveis. 
              Stack: <span className="text-white font-medium">Next.js 15, React 19, TypeScript, .NET Core, PostgreSQL</span>.
            </p>

            {/* Stack técnica com ícones open source */}
            <div className="flex flex-wrap gap-2 pt-4 sm:pt-6 max-w-4xl">
              {[
                { name: 'Next.js', Icon: SiNextdotjs, color: 'text-white', bg: 'rgba(0,0,0,0.6)' },
                { name: 'React', Icon: SiReact, color: 'text-cyan-400', bg: 'rgba(6,182,212,0.1)' },
                { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)' },
                { name: '.NET Core', Icon: SiDotnet, color: 'text-purple-400', bg: 'rgba(168,85,247,0.1)' },
                { name: 'Angular', Icon: SiAngular, color: 'text-red-400', bg: 'rgba(239,68,68,0.1)' },
                { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-blue-300', bg: 'rgba(147,197,253,0.1)' },
                { name: 'Supabase', Icon: SiSupabase, color: 'text-emerald-400', bg: 'rgba(16,185,129,0.1)' },
                { name: 'Vercel', Icon: SiVercel, color: 'text-white', bg: 'rgba(0,0,0,0.6)' },
                { name: 'Docker', Icon: SiDocker, color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)' }
              ].map(({ name, Icon, color, bg }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (Math.random() * 0.3) }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div 
                    className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 shadow-lg"
                    style={{ background: bg }}
                  >
                    <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${color} flex-shrink-0`} />
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
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
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-wider">Role para baixo</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
