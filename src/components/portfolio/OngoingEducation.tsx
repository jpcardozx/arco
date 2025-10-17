/**
 * ONGOING EDUCATION
 * Educação continuada com Three.js geometric morphing
 * Design: Progress rings animados + rotating geometry
 */
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, TrendingUp, Calendar, Target, Sparkles } from 'lucide-react';

// Morphing geometric shape
function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      // Gentle scale pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry ref={geometryRef} args={[1.2, 1]} />
      <meshStandardMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.25}
        emissive="#a855f7"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Orbiting rings
function OrbitRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.4;
      ring2Ref.current.rotation.x = Math.PI / 4;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.02, 16, 100]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

interface OngoingCourse {
  id: string;
  title: string;
  provider: string;
  progress: number;
  startDate: string;
  expectedCompletion: string;
  certification: string;
  topics: string[];
  motivation: string;
  hours: string;
}

const ongoingCourse: OngoingCourse = {
  id: 'freecodecamp-csharp',
  title: 'C# Programming & .NET Development',
  provider: 'freeCodeCamp',
  progress: 65,
  startDate: 'Setembro 2024',
  expectedCompletion: 'Dezembro 2024',
  certification: 'Certificação Oficial Microsoft',
  topics: ['C# Fundamentals', 'OOP', '.NET Core', 'ASP.NET', 'Entity Framework'],
  motivation: 'Expansão do arsenal técnico para arquiteturas enterprise e integração com ecossistema Microsoft.',
  hours: '300+'
};

const milestones = [
  { label: 'Fundamentos C#', status: 'completed', percentage: 100 },
  { label: 'Programação Orientada a Objetos', status: 'completed', percentage: 100 },
  { label: '.NET Core & APIs', status: 'in-progress', percentage: 70 },
  { label: 'Entity Framework & Databases', status: 'in-progress', percentage: 45 },
  { label: 'ASP.NET Web Apps', status: 'upcoming', percentage: 0 },
];

export default function OngoingEducation() {
  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#a855f7" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <MorphingGeometry />
          <OrbitRings />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <Badge className="px-4 py-2 text-xs font-medium border-purple-700/50 bg-purple-900/30 text-purple-300">
              Educação Continuada
            </Badge>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Aprendizado Contínuo
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Investimento permanente em novas tecnologias e frameworks para manter relevância técnica no mercado.
          </p>
        </motion.div>

        {/* Main Course Card - Full Width Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-slate-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-2xl hover:shadow-purple-500/10">
            <div className="p-8 sm:p-10">
              {/* Course Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        {ongoingCourse.title}
                      </h3>
                      <p className="text-purple-400 font-semibold text-sm mt-1">
                        {ongoingCourse.provider}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    {ongoingCourse.motivation}
                  </p>

                  {/* Meta Info */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Início</p>
                        <p className="text-sm text-slate-300 font-medium">{ongoingCourse.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Conclusão Prevista</p>
                        <p className="text-sm text-purple-400 font-semibold">{ongoingCourse.expectedCompletion}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Horas de Estudo</p>
                        <p className="text-sm text-slate-300 font-medium">{ongoingCourse.hours} horas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="flex-shrink-0">
                  <div className="relative w-36 h-36 mx-auto lg:mx-0">
                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-800"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="text-purple-500"
                        style={{
                          strokeDasharray: `${2 * Math.PI * 60}`,
                          strokeDashoffset: `${2 * Math.PI * 60 * (1 - ongoingCourse.progress / 100)}`,
                          transition: 'stroke-dashoffset 1s ease-in-out'
                        }}
                      />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white">{ongoingCourse.progress}%</span>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">Completo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Badge */}
              <div className="mb-8">
                <Badge className="bg-purple-500/10 border-purple-500/30 text-purple-300 px-4 py-2">
                  🏆 {ongoingCourse.certification}
                </Badge>
              </div>

              {/* Topics Pills */}
              <div className="mb-8">
                <p className="text-sm text-slate-500 mb-3 font-medium">Tópicos de Estudo</p>
                <div className="flex flex-wrap gap-2">
                  {ongoingCourse.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <p className="text-sm text-slate-500 mb-4 font-medium">Progresso por Módulo</p>
                <div className="space-y-3">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      {/* Status icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'completed'
                          ? 'bg-emerald-500/20 border border-emerald-500/30'
                          : milestone.status === 'in-progress'
                          ? 'bg-purple-500/20 border border-purple-500/30 animate-pulse'
                          : 'bg-slate-800/50 border border-slate-700/30'
                      }`}>
                        {milestone.status === 'completed' && (
                          <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                        )}
                        {milestone.status === 'in-progress' && (
                          <div className="w-3 h-3 bg-purple-400 rounded-full" />
                        )}
                        {milestone.status === 'upcoming' && (
                          <div className="w-3 h-3 bg-slate-600 rounded-full" />
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-medium ${
                            milestone.status === 'completed' ? 'text-slate-300' :
                            milestone.status === 'in-progress' ? 'text-white' :
                            'text-slate-500'
                          }`}>
                            {milestone.label}
                          </span>
                          <span className="text-xs text-slate-500">{milestone.percentage}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${milestone.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              milestone.status === 'completed' ? 'bg-emerald-500' :
                              milestone.status === 'in-progress' ? 'bg-purple-500' :
                              'bg-slate-700'
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="inline-block bg-slate-900/30 backdrop-blur-xl border-slate-800/50 px-6 py-4">
            <p className="text-sm text-slate-400">
              Atualização de progresso em tempo real. Certificação Microsoft prevista para{' '}
              <span className="text-purple-400 font-semibold">Dezembro 2024</span>.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
