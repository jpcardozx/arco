/**
 * PROFESSIONAL CERTIFICATIONS
 * Industry-recognized credentials with strategic Three.js enhancement
 * Design: Premium card layout + subtle depth + professional credibility markers
 */
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Award, Calendar, Building2 } from 'lucide-react';

// Floating Certificate Badges - Sophisticated 3D depth
function FloatingCertificateBadges() {
  const groupRef = useRef<THREE.Group>(null);

  const badges = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        Math.cos((i / 6) * Math.PI * 2) * 4,
        Math.sin((i / 6) * Math.PI * 2) * 2,
        -3 + (i * 0.5)
      ] as [number, number, number],
      rotation: [0, i * Math.PI / 3, 0] as [number, number, number],
      scale: 0.4 + (i % 3) * 0.15
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;

      // Individual badge rotation
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * 0.2 + i;
        child.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {badges.map((badge, i) => (
        <mesh key={i} position={badge.position} rotation={badge.rotation} scale={badge.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#14b8a6" : i % 3 === 1 ? "#10b981" : "#f59e0b"}
            wireframe
            transparent
            opacity={0.25}
            emissive={i % 3 === 0 ? "#14b8a6" : i % 3 === 1 ? "#10b981" : "#f59e0b"}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Connecting lines */}
      {badges.map((currentBadge, i) => (
        <mesh key={`line-${i}`} position={currentBadge.position} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 2, 8]} />
          <meshBasicMaterial color="#14b8a6" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

interface Certification {
  id: string;
  title: string;
  provider: string;
  date: string;
  status: 'completed' | 'verified';
  technologies: string[];
  credential?: string;
  description: string;
  color: 'amber' | 'emerald' | 'blue';
}

const certifications: Certification[] = [
  {
    id: 'freecodecamp-web',
    title: 'Responsive Web Design',
    provider: 'freeCodeCamp',
    date: '2024',
    status: 'verified',
    technologies: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
    credential: '300+ hours curriculum',
    description: 'Industry-standard certification in responsive web design fundamentals, covering modern CSS techniques and mobile-first development approaches.',
    color: 'emerald'
  },
  {
    id: 'freecodecamp-js',
    title: 'JavaScript Algorithms & Data Structures',
    provider: 'freeCodeCamp',
    date: '2024',
    status: 'verified',
    technologies: ['ES6+', 'Algorithms', 'Data Structures', 'OOP', 'Functional Programming'],
    credential: '300+ hours curriculum',
    description: 'Comprehensive JavaScript certification covering algorithmic thinking, data structures, and modern programming paradigms.',
    color: 'amber'
  },
  {
    id: 'codecademy-react',
    title: 'React Development',
    provider: 'Codecademy Pro',
    date: '2023',
    status: 'completed',
    technologies: ['React 18', 'Hooks', 'Context API', 'Testing', 'Performance'],
    credential: 'Pro Track Completion',
    description: 'Advanced React development certification with focus on hooks, state management, testing strategies, and performance optimization.',
    color: 'blue'
  }
];

const colorClasses = {
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20'
  }
};

export default function CertificationsShowcase() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Sophisticated Three.js Background */}
      <div className="absolute inset-0 opacity-35">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#14b8a6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
          <FloatingCertificateBadges />
        </Canvas>
      </div>

      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.06)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-1 rounded-full bg-teal-400" />
            <Badge className="px-3 py-1 text-xs font-mono tracking-wider border-teal-500/30 bg-teal-500/10 text-teal-400">
              Credenciais Profissionais
            </Badge>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Formação & Certificações
          </h2>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Credenciais reconhecidas pela indústria de plataformas estabelecidas. Aprendizado contínuo com foco em
            <span className="text-white"> práticas modernas de desenvolvimento</span> e
            <span className="text-white"> tecnologias emergentes</span>.
          </p>
        </motion.div>

        {/* Professional Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const colors = colorClasses[cert.color];

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-slate-900/70 backdrop-blur-xl border-slate-800/50 hover:border-slate-700 transition-all duration-500 p-7 group-hover:shadow-2xl group-hover:shadow-slate-900/20">
                  {/* Professional Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Award className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {cert.status === 'verified' && (
                        <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-xs font-mono">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {cert.provider}
                    </p>
                  </div>

                  {cert.credential && (
                    <Badge className="mb-4 bg-slate-800/60 border-slate-700/40 text-slate-300 text-xs font-mono px-3 py-1">
                      {cert.credential}
                    </Badge>
                  )}

                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Technical Skills */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                      Tecnologias Principais
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1.5 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/30 hover:border-slate-600/50 transition-colors font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Ongoing Education - C# Track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <Badge className="px-3 py-1 text-xs font-mono tracking-wider border-purple-500/30 bg-purple-500/10 text-purple-300 mb-4">
              Em Andamento
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Formação Contínua</h3>
            <p className="text-slate-400 text-sm">Aprendizado contínuo e expansão de habilidades</p>
          </div>

          <Card className="bg-gradient-to-br from-purple-500/5 to-slate-900/70 backdrop-blur-xl border-purple-500/20 overflow-hidden hover:border-purple-500/30 transition-all duration-500">
            <div className="p-8 sm:p-10">
              {/* Header with Progress Circle */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">C# Programming & .NET Development</h4>
                      <p className="text-purple-400 text-sm font-semibold">freeCodeCamp</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Expansão do arsenal técnico para arquiteturas enterprise e integração com ecossistema Microsoft.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">Início: <span className="text-white">Set 2024</span></span>
                    </div>
                    <span className="text-slate-700">•</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-400">Conclusão: <span className="text-purple-400 font-semibold">Dez 2024</span></span>
                    </div>
                    <span className="text-slate-700">•</span>
                    <span className="text-slate-400">300+ horas</span>
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-800" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      className="text-purple-500"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 56}`,
                        strokeDashoffset: `${2 * Math.PI * 56 * (1 - 0.65)}`,
                        transition: 'stroke-dashoffset 1.5s ease-out'
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">65%</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Completo</span>
                  </div>
                </div>
              </div>

              {/* Microsoft Certification Badge */}
              <div className="mb-6">
                <Badge className="bg-purple-500/15 border-purple-400/30 text-purple-300 px-4 py-2 text-sm">
                  🏆 Certificação Oficial Microsoft Prevista
                </Badge>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {['C# Fundamentals', 'OOP', '.NET Core', 'ASP.NET', 'Entity Framework'].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1.5 text-xs rounded-md bg-slate-800/50 text-slate-300 border border-slate-700/40 font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Learning Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">1200+</div>
              <div className="text-sm text-slate-400">Horas Totais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">3</div>
              <div className="text-sm text-slate-400">Concluídas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">1</div>
              <div className="text-sm text-slate-400">Em Andamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">2024</div>
              <div className="text-sm text-slate-400">Ano Mais Recente</div>
            </div>
          </div>
        </motion.div>

        {/* Professional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="inline-block bg-slate-900/40 backdrop-blur-xl border-slate-800/30 px-8 py-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-slate-400">
                Todas as credenciais disponíveis para verificação mediante solicitação.
                <span className="text-slate-300 ml-2">Abordagem de aprendizado contínuo.</span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
