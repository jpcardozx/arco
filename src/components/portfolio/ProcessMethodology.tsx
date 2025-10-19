/**
 * METODOLOGIA DE PROCESSO - PREMIUM REDESIGN
 * Three.js elegante + Collapsibles fluidos + Glassmorphism
 * UX premium com micro-interações e animações sofisticadas
 */
'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';
import {
  Search,
  FileText,
  Code,
  TestTube,
  Rocket,
  BarChart,
  ChevronDown,
  Clock,
  CheckCircle2
} from 'lucide-react';

// Floating geometric shapes with smooth movement
function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = -state.clock.elapsedTime * 0.15;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Octahedron */}
      <mesh ref={meshRef} position={[-3, 0, -2]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#14b8a6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Torus Knot */}
      <mesh ref={torusRef} position={[3, 0, -2]}>
        <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

interface ProcessStep {
  number: string;
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  keyDeliverable: string;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    shortDesc: 'Análise profunda e planejamento arquitetural',
    description: 'Avaliação completa dos requisitos técnicos e de negócio. Análise de débito técnico existente, restrições do sistema e oportunidades de otimização. Definição da arquitetura base com foco em escalabilidade e manutenibilidade.',
    deliverables: [
      'Relatório de Auditoria Técnica',
      'Proposta de Arquitetura',
      'Recomendação de Stack Técnico',
      'Estimativa de Esforço'
    ],
    keyDeliverable: 'Proposta Arquitetural',
    color: '#14b8a6'
  },
  {
    number: '02',
    icon: FileText,
    title: 'Planejamento',
    shortDesc: 'Roadmap executável e especificações técnicas',
    description: 'Criação de documentação técnica detalhada incluindo diagramas de arquitetura, schemas de banco de dados, especificações de API e cronogramas realistas. Definição de milestones claros e critérios de aceitação.',
    deliverables: [
      'Diagramas de Arquitetura',
      'Schema de Banco de Dados',
      'Especificações de API',
      'Roadmap do Projeto'
    ],
    keyDeliverable: 'Documentação Técnica',
    color: '#3b82f6'
  },
  {
    number: '03',
    icon: Code,
    title: 'Desenvolvimento',
    shortDesc: 'Implementação iterativa com CI/CD',
    description: 'Desenvolvimento em sprints com integração contínua. Code reviews sistemáticas, testes unitários e de integração, e demos periódicas para validação. Foco em código limpo e manutenível seguindo best practices.',
    deliverables: [
      'Implementação de Funcionalidades',
      'Testes Automatizados',
      'Documentação Técnica',
      'Demos Quinzenais'
    ],
    keyDeliverable: 'Features Funcionais',
    color: '#8b5cf6'
  },
  {
    number: '04',
    icon: TestTube,
    title: 'QA',
    shortDesc: 'Validação abrangente e otimização',
    description: 'Testes completos em múltiplos dispositivos e navegadores. Validação de performance, segurança e acessibilidade. Stress testing e análise de edge cases para garantir estabilidade em produção.',
    deliverables: [
      'Relatório de Cobertura de Testes',
      'Benchmarks de Performance',
      'Auditoria de Segurança',
      'Testes Cross-browser'
    ],
    keyDeliverable: 'Validação Completa',
    color: '#f59e0b'
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Deploy',
    shortDesc: 'Launch com monitoramento e rollback plan',
    description: 'Deploy automatizado com pipelines CI/CD. Setup de monitoramento, alertas e logging. Documentação de operações e plano de rollback. Smoke tests pós-deploy e validação de ambiente de produção.',
    deliverables: [
      'Deploy em Produção',
      'Configuração de Monitoramento',
      'Documentação de Operações',
      'Procedimentos de Rollback'
    ],
    keyDeliverable: 'Sistema em Produção',
    color: '#ec4899'
  },
  {
    number: '06',
    icon: BarChart,
    title: 'Suporte',
    shortDesc: 'Monitoramento pós-launch e otimizações',
    description: 'Suporte ativo com monitoramento de métricas críticas, hotfixes prioritários e otimizações baseadas em dados de produção. Inclui sessões de knowledge transfer e handoff documentation.',
    deliverables: [
      'Relatório de Performance',
      'Resolução de Incidentes',
      'Plano de Otimização',
      'Transferência de Conhecimento'
    ],
    keyDeliverable: 'Suporte & Otimização',
    color: '#10b981'
  }
];

// Premium Collapsible Step Component
function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Connection Line */}
      {index < processSteps.length - 1 && (
        <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-slate-700 to-transparent" />
      )}

      {/* Card */}
      <motion.div
        layout
        className={`
          relative backdrop-blur-xl border transition-all duration-500
          ${isOpen 
            ? 'bg-slate-900/60 border-slate-700 shadow-xl shadow-slate-900/20' 
            : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
          }
          rounded-2xl overflow-hidden group
        `}
      >
        {/* Gradient Accent */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${step.color}15, transparent 40%)`
          }}
        />

        {/* Header - Always Visible */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex items-center gap-6 text-left relative z-10"
        >
          {/* Number Badge */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300"
            style={{
              backgroundColor: isOpen ? `${step.color}20` : 'rgb(30, 41, 59)',
              borderColor: isOpen ? step.color : 'rgb(51, 65, 85)',
              borderWidth: '2px',
              color: isOpen ? step.color : 'rgb(148, 163, 184)'
            }}
          >
            {step.number}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              {React.createElement(step.icon, { 
                className: "w-5 h-5 flex-shrink-0 transition-colors duration-300",
                style: { color: isOpen ? step.color : 'rgb(148, 163, 184)' }
              })}
              <h3 className="text-xl font-semibold text-white">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              {step.shortDesc}
            </p>
          </div>

          {/* Key Deliverable Badge + Arrow */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border"
              style={{
                backgroundColor: `${step.color}10`,
                borderColor: `${step.color}40`
              }}
            >
              <span className="text-xs font-medium" style={{ color: step.color }}>
                {step.keyDeliverable}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </div>
        </motion.button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-6 relative z-10">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                {/* Description */}
                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Entregas Principais
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.deliverables.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 group/item hover:border-slate-600 transition-colors"
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: step.color }}
                        />
                        <span className="text-sm text-slate-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile Key Deliverable */}
                <div className="sm:hidden px-3 py-2 rounded-lg border inline-block"
                  style={{
                    backgroundColor: `${step.color}10`,
                    borderColor: `${step.color}40`
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: step.color }}>
                    → {step.keyDeliverable}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessMethodology() {
  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#14b8a6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <FloatingGeometry />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.08)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-teal-700/50 bg-teal-900/30 text-teal-300">
            Framework de Entrega
          </Badge>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Processo de Trabalho
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Metodologia estruturada em seis fases garantindo previsibilidade, excelência técnica
            e alinhamento contínuo com os objetivos do projeto.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-4">
          {processSteps.map((step, index) => (
            <ProcessStepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
