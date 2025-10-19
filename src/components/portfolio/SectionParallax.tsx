/**
 * PARALLAX SECTION WRAPPER
 *
 * Componente wrapper que adiciona efeitos parallax elegantes entre seções
 * Combina Framer Motion + Three.js para transições fluidas e sofisticadas
 *
 * Features:
 * - Scroll-triggered parallax com scroll velocity
 * - Three.js floating particles ao fundo
 * - Entrada suave com stagger animations
 * - Performance otimizada com lazy rendering
 * - Gradiente dinâmico baseado em scroll
 */

'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particles para parallax background
function ParallaxParticles({ opacity }: { opacity: number }) {
  const ref = useRef<any>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const t = Math.random() * 2 * Math.PI;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 1.5;

      temp[i * 3] = r * Math.sin(p) * Math.cos(t);
      temp[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      temp[i * 3 + 2] = r * Math.cos(p);
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity * 0.4}
      />
    </Points>
  );
}

interface SectionParallaxProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  showParticles?: boolean;
  backgroundColor?: string;
}

export const SectionParallax: React.FC<SectionParallaxProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  showParticles = true,
  backgroundColor = 'bg-slate-950'
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  useMotionValueEvent(opacity, 'change', (latest) => {
    setIsInView(latest > 0.1);
  });

  // Gradient dinâmico baseado em scroll
  const gradientPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative w-full py-12 sm:py-16 lg:py-24 overflow-hidden ${backgroundColor} ${className}`}
      style={{ opacity, scale }}
    >
      {/* Parallax Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
          backgroundPosition: gradientPosition,
        }}
      />

      {/* Three.js Particles Background */}
      {showParticles && isInView && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Canvas
            camera={{ position: [0, 0, 3], fov: 75 }}
            gl={{ antialias: false, alpha: true }}
            dpr={[1, 1.5]}
            style={{ pointerEvents: 'none' }}
          >
            <ambientLight intensity={0.3} />
            <ParallaxParticles opacity={scrollYProgress.get()} />
          </Canvas>
        </div>
      )}

      {/* Content Wrapper com parallax Y e stagger */}
      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.8,
            delay: delay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Elegant bottom border transition */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"
        style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0]) }}
      />
    </motion.section>
  );
};

export default SectionParallax;
