/**
 * DEVELOPMENT APPROACH
 * Clean code principles + Agile methodology showcase
 * Premium design: Rotating code snippets with Three.js depth
 * Most mature component - professional neutral tone
 */
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileCode2,
  GitBranch,
  RefreshCw,
  Calendar,
  MessageSquare,
  CheckSquare,
  Users2,
  Target,
  Layers,
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';

// Code Matrix - Sophisticated layered architecture visualization
function CodeMatrix() {
  const groupRef = useRef<THREE.Group>(null);

  const layers = useMemo(() => {
    return Array.from({ length: 4 }, (_, layerIndex) => ({
      modules: Array.from({ length: 8 }, (__, moduleIndex) => {
        const angle = (moduleIndex / 8) * Math.PI * 2;
        const radius = 2.5 + layerIndex * 0.8;
        return {
          position: [
            Math.cos(angle) * radius,
            layerIndex * 1.2 - 2,
            Math.sin(angle) * radius
          ] as [number, number, number],
          rotation: [Math.random() * 0.5, angle, Math.random() * 0.5] as [number, number, number],
          scale: 0.3 + layerIndex * 0.1
        };
      })
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      // Wave effect through layers
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 0.3;
        child.rotation.x = state.clock.elapsedTime * 0.1 + i * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, layerIdx) => (
        <group key={layerIdx}>
          {layer.modules.map((module, moduleIdx) => (
            <mesh
              key={`${layerIdx}-${moduleIdx}`}
              position={module.position}
              rotation={module.rotation}
              scale={module.scale}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={layerIdx === 0 ? "#14b8a6" : layerIdx === 1 ? "#0ea5e9" : layerIdx === 2 ? "#8b5cf6" : "#f59e0b"}
                wireframe
                transparent
                opacity={0.2}
                emissive={layerIdx === 0 ? "#14b8a6" : layerIdx === 1 ? "#0ea5e9" : layerIdx === 2 ? "#8b5cf6" : "#f59e0b"}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}

          {/* Connection ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, layerIdx * 1.2 - 2, 0]}>
            <torusGeometry args={[2.5 + layerIdx * 0.8, 0.02, 16, 64]} />
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.08} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

interface CleanCodePrinciple {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  implementation: string;
  impact: string;
}

interface AgileProcess {
  id: string;
  icon: React.ElementType;
  phase: string;
  activities: string[];
  outcome: string;
}

const cleanCodePrinciples: CleanCodePrinciple[] = [
  {
    id: 'single-responsibility',
    icon: Target,
    title: 'Single Responsibility',
    description: 'Cada módulo possui uma única razão para mudar. Funções focadas, componentes coesos.',
    implementation: 'Componentes React com responsabilidade única, hooks customizados para lógica específica.',
    impact: 'Redução de 60% no débito técnico, 3x mais rápido para localizar bugs.'
  },
  {
    id: 'dry',
    icon: Layers,
    title: 'DRY (Don\'t Repeat Yourself)',
    description: 'Abstração estratégica de lógica repetida. Reutilização sem over-engineering.',
    implementation: 'Design system compartilhado, utilitários tipados, composição de componentes.',
    impact: 'Redução de 45% em linhas de código, manutenção centralizada.'
  },
  {
    id: 'readable',
    icon: FileCode2,
    title: 'Readable Code',
    description: 'Código escrito para humanos primeiro, máquinas segundo. Nomes explícitos, estrutura clara.',
    implementation: 'Variáveis descritivas, comentários em contexto crítico, tipo-safe por padrão.',
    impact: 'Onboarding de novos devs reduzido de 2 semanas para 3 dias.'
  },
  {
    id: 'testable',
    icon: CheckSquare,
    title: 'Testable Architecture',
    description: 'Arquitetura desenhada para testes desde o início. Dependências injetáveis, lógica isolada.',
    implementation: 'Separation of concerns, pure functions, mocking facilitado.',
    impact: 'Cobertura de testes de 85%+, deploy confidence elevado.'
  }
];

const agileProcesses: AgileProcess[] = [
  {
    id: 'planning',
    icon: Calendar,
    phase: 'Sprint Planning',
    activities: [
      'Refinamento de backlog com critérios mensuráveis',
      'Story points baseados em complexidade real',
      'Definition of Done clara e compartilhada'
    ],
    outcome: 'Escopo realista, estimativas confiáveis'
  },
  {
    id: 'development',
    icon: GitBranch,
    phase: 'Development Cycle',
    activities: [
      'Feature branches com PRs descritivos',
      'Code review com checklist técnico',
      'CI/CD automatizado com gates de qualidade'
    ],
    outcome: 'Código revisado, testes passando, deploy seguro'
  },
  {
    id: 'communication',
    icon: MessageSquare,
    phase: 'Async Communication',
    activities: [
      'Daily updates escritos (não sincronos)',
      'Decisões técnicas documentadas em RFCs',
      'Status transparente via dashboards'
    ],
    outcome: 'Time distribuído eficiente, zero overhead de reuniões'
  },
  {
    id: 'retrospective',
    icon: RefreshCw,
    phase: 'Continuous Improvement',
    activities: [
      'Métricas de velocidade e qualidade monitoradas',
      'Retrospectivas focadas em ações concretas',
      'Processos ajustados baseado em dados'
    ],
    outcome: 'Evolução incremental, eficiência crescente'
  }
];

const metrics = [
  { label: 'Code Review Time', value: '< 4h', icon: Clock },
  { label: 'Deploy Frequency', value: '3x/dia', icon: TrendingUp },
  { label: 'Test Coverage', value: '85%+', icon: Shield },
  { label: 'Sprint Velocity', value: '+22%', icon: Target }
];

export default function DevelopmentApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Code Matrix Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas
          camera={{ position: [0, 2, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[8, 8, 8]} intensity={1} color="#14b8a6" />
          <pointLight position={[-8, -8, -8]} intensity={0.7} color="#0ea5e9" />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#8b5cf6" />
          <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.6} penumbra={0.5} color="#14b8a6" />
          <CodeMatrix />
        </Canvas>
      </div>

      {/* Subtle gradient overlays */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.08)_0%,transparent_50%)]"
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <Badge className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border-teal-500/30 bg-teal-500/10 text-teal-400">
              Methodology
            </Badge>
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Development Approach
          </h2>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Clean code principles meet agile methodology. Process-driven delivery with
            <span className="text-white font-medium"> measurable quality metrics</span> and
            <span className="text-white font-medium"> continuous improvement</span>.
          </p>
        </motion.div>

        {/* Clean Code Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-10">
            <FileCode2 className="w-6 h-6 text-teal-400" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Clean Code Principles</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cleanCodePrinciples.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-slate-800/50 hover:border-teal-500/30 transition-all duration-500 p-8 group">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500/15 transition-all duration-300">
                        {React.createElement(Icon, { className: "w-7 h-7 text-teal-400" })}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {principle.title}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>

                    {/* Implementation */}
                    <div className="mb-4 pl-2 border-l-2 border-teal-500/20">
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                        Implementation
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {principle.implementation}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="pt-4 border-t border-slate-800/50">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
                            Measured Impact
                          </p>
                          <p className="text-sm text-emerald-400 font-medium">
                            {principle.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Agile Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-10">
            <RefreshCw className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Agile Process</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agileProcesses.map((process, index) => {
              const Icon = process.icon;

              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-slate-800/50 hover:border-blue-500/30 transition-all duration-500 p-6 group">
                    {/* Phase number + icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(Icon, { className: "w-6 h-6 text-blue-400" })}
                      </div>
                      <span className="text-4xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Phase name */}
                    <h4 className="text-lg font-bold text-white mb-4">
                      {process.phase}
                    </h4>

                    {/* Activities */}
                    <div className="space-y-2.5 mb-5">
                      {process.activities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {activity}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Outcome */}
                    <div className="pt-4 border-t border-slate-800/50">
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                        Outcome
                      </p>
                      <p className="text-sm text-blue-400 font-medium">
                        {process.outcome}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border-slate-800/50 p-8 sm:p-10">
            <div className="text-center mb-8">
              <Badge className="px-3 py-1 text-xs font-mono uppercase tracking-wider border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
                Performance Metrics
              </Badge>
              <h3 className="text-2xl font-bold text-white">
                Measurable Process Quality
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-4">
                      <Icon className="w-7 h-7 text-teal-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-400">
                      {metric.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Professional Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center"
        >
          <Card className="inline-block bg-slate-900/40 backdrop-blur-xl border-slate-800/30 px-8 py-6 max-w-4xl">
            <div className="flex items-start gap-4">
              <Users2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-slate-300 leading-relaxed mb-3">
                  Process excellence enables consistent delivery. Clean code principles reduce maintenance costs.
                  Agile methodology provides adaptability without chaos. Combined, they create predictable
                  outcomes with sustainable velocity.
                </p>
                <p className="text-sm text-slate-500">
                  Approach refined across 15+ production projects with distributed teams.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
