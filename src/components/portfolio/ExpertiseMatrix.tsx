/**
 * EXPERTISE MATRIX - PREMIUM REDESIGN
 * Three.js particle field + Sophisticated card interactions
 * Glassmorphism with color-coded proficiency levels
 */
'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';
import {
  Code2,
  Database,
  Palette,
  Zap,
  Shield,
  BarChart3,
  Layers,
  Cloud,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// Particle field with smooth movement
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const color1 = new THREE.Color('#14b8a6'); // teal
    const color2 = new THREE.Color('#3b82f6'); // blue
    const color3 = new THREE.Color('#8b5cf6'); // purple
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const colorChoice = Math.random();
      const color = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface ExpertiseArea {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  keyword: string;
  color: string;
}

const expertiseAreas: ExpertiseArea[] = [
  {
    icon: Code2,
    title: 'Desenvolvimento Frontend',
    description: 'Aplicações React em produção com dashboards em tempo real, otimização de renderização e gerenciamento de estado complexo.',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS'],
    keyword: 'Interfaces Modernas',
    color: '#14b8a6'
  },
  {
    icon: Database,
    title: 'Arquitetura Backend',
    description: 'Design de APIs RESTful, modelagem de dados relacionais e implementação de sistemas multi-tenant com RLS e controle de acesso.',
    skills: ['PostgreSQL', 'Supabase', 'REST APIs', 'RLS Policies'],
    keyword: 'APIs Escaláveis',
    color: '#3b82f6'
  },
  {
    icon: Palette,
    title: 'Implementação UI/UX',
    description: 'Tradução de design para código com acessibilidade WCAG AAA, design responsivo e micro-interações.',
    skills: ['Design Systems', 'WCAG AAA', 'Framer Motion', 'Figma to Code'],
    keyword: 'Design Systems',
    color: '#14b8a6'
  },
  {
    icon: Zap,
    title: 'Otimização de Performance',
    description: 'Análise e otimização de Core Web Vitals, code splitting, lazy loading e redução de bundle size.',
    skills: ['Core Web Vitals', 'Code Splitting', 'Lazy Loading', 'Bundle Analysis'],
    keyword: 'Web Performance',
    color: '#14b8a6'
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Implementação de autenticação OAuth, proteção XSS/CSRF, auditoria de segurança e criptografia de dados sensíveis.',
    skills: ['OAuth 2.0', 'JWT', 'CSRF Protection', 'Encryption'],
    keyword: 'Segurança Aplicada',
    color: '#3b82f6'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Rastreamento',
    description: 'Configuração de rastreamento de eventos, análise de funil, testes A/B e otimização orientada por dados.',
    skills: ['Google Analytics', 'Custom Events', 'Funnel Analysis', 'A/B Testing'],
    keyword: 'Data-Driven',
    color: '#3b82f6'
  },
  {
    icon: Layers,
    title: 'Arquitetura de Software',
    description: 'Design de sistemas modulares, definição de padrões, documentação técnica e processos de onboarding.',
    skills: ['Monorepo', 'Microservices', 'API Design', 'Documentation'],
    keyword: 'Sistemas Modulares',
    color: '#3b82f6'
  },
  {
    icon: Cloud,
    title: 'DevOps & CI/CD',
    description: 'Configuração de pipelines CI/CD, automação de testes, ambientes de preview e deploy contínuo.',
    skills: ['Vercel', 'GitHub Actions', 'Docker', 'Edge Functions'],
    keyword: 'Deploy Automatizado',
    color: '#8b5cf6'
  }
];

// Premium Expertise Card Component
function ExpertiseCard({ area, index }: { area: ExpertiseArea; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Card */}
      <motion.div
        className="relative h-full p-6 rounded-2xl border transition-all duration-500 backdrop-blur-xl bg-slate-900/40 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700 hover:shadow-2xl hover:shadow-teal-500/10"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Gradient Accent */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${area.color}15, transparent 40%)`
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          {/* Icon */}
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300"
            style={{
              backgroundColor: `${area.color}20`,
              borderColor: area.color
            }}
            animate={isHovered ? { scale: 1.05, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {React.createElement(area.icon, { 
              className: "w-6 h-6",
              style: { color: area.color }
            })}
          </motion.div>

          {/* Keyword Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.2 }}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border"
            style={{
              backgroundColor: `${area.color}10`,
              borderColor: `${area.color}40`,
              color: area.color
            }}
          >
            {area.keyword}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
            {area.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
            {area.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {area.skills.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + 0.3 + idx * 0.05 }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover Arrow Indicator */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ExpertiseMatrix() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Three.js Particle Field Background */}
      {isMounted && (
        <div className="absolute inset-0 opacity-15">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.5} />
            <ParticleField />
          </Canvas>
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-teal-700/50 bg-teal-900/30 text-teal-300">
            Capacidades Técnicas
          </Badge>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Áreas de Atuação
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Desenvolvimento full-stack com foco em arquitetura escalável, 
            otimização de performance e conversão para aplicações de produção.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard key={area.title} area={area} index={index} />
          ))}
        </div>

        {/* Footer Stats */}
        {/* Focus statement instead of vanity metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(59,130,246,0.05) 100%)',
            border: '1px solid rgba(20,184,166,0.2)',
            backdropFilter: 'blur(20px)'
          }}>
            <p className="text-base text-slate-300 leading-relaxed text-center font-light">
              Stack técnico baseado em projetos reais em produção. Escolhas arquiteturais orientadas por requisitos específicos 
              e trade-offs mensuráveis, não por tendências de mercado.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
