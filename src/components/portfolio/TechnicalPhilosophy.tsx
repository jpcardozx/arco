/**
 * TECHNICAL PHILOSOPHY
 * Core principles and development approach
 * Design: Minimalist Three.js grid + principle cards
 */
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Users,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

// Interconnected Nodes - representing principles connection
function InterconnectedNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5,
          Math.sin(angle * 2) * 1.5
        ] as [number, number, number],
        color: i % 4 === 0 ? "#14b8a6" : i % 4 === 1 ? "#3b82f6" : i % 4 === 2 ? "#a855f7" : "#f97316"
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;

      // Pulse effect on nodes
      groupRef.current.children.forEach((child, i) => {
        if (child.type === 'Mesh') {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
          child.scale.set(scale, scale, scale);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodes.length];
        const midPoint = [
          (node.position[0] + nextNode.position[0]) / 2,
          (node.position[1] + nextNode.position[1]) / 2,
          (node.position[2] + nextNode.position[2]) / 2
        ];
        const distance = Math.sqrt(
          Math.pow(nextNode.position[0] - node.position[0], 2) +
          Math.pow(nextNode.position[1] - node.position[1], 2) +
          Math.pow(nextNode.position[2] - node.position[2], 2)
        );

        return (
          <mesh key={`line-${i}`} position={midPoint as [number, number, number]}>
            <cylinderGeometry args={[0.015, 0.015, distance, 8]} />
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.15} />
          </mesh>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

interface Principle {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  metrics?: string[];
  color: 'teal' | 'blue' | 'purple' | 'orange';
}

const principles: Principle[] = [
  {
    id: 'pragmatic',
    icon: Target,
    title: 'Pragmatismo Técnico',
    description: 'Seleção de tecnologia baseada no ajuste ao problema e requisitos do projeto, priorizando estabilidade e manutenibilidade sobre tendências. Tomada de decisão documentada com análise explícita de trade-offs.',
    metrics: ['Decisões documentadas', 'Análise de trade-offs', 'Viabilidade a longo prazo'],
    color: 'teal'
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Performance em Primeiro Lugar',
    description: 'Atenção contínua aos Core Web Vitals e métricas de experiência do usuário com monitoramento e otimizações orientadas por dados do mundo real. Tempos de resposta abaixo de um segundo como linha de base.',
    metrics: ['Core Web Vitals', 'Lighthouse 95+', 'Otimização de bundle'],
    color: 'orange'
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Segurança por Design',
    description: 'Práticas de segurança incorporadas desde o início do desenvolvimento, incluindo autenticação robusta, padrões de autorização e proteção contra vulnerabilidades comuns (OWASP Top 10).',
    metrics: ['Conformidade OWASP', 'Auditorias regulares', 'Escaneamento de vulnerabilidades'],
    color: 'purple'
  },
  {
    id: 'scalability',
    icon: TrendingUp,
    title: 'Arquitetura Escalável',
    description: 'Design de sistema possibilitando crescimento sustentável com padrões modulares, estratégias de escalonamento horizontal e cache inteligente para distribuição de carga.',
    metrics: ['Escalonamento horizontal', 'Design modular', 'Otimização de recursos'],
    color: 'blue'
  },
  {
    id: 'clarity',
    icon: Code2,
    title: 'Clareza de Código',
    description: 'Código legível e auto-documentado facilitando manutenção, colaboração e transferência de conhecimento. Convenções de nomenclatura claras e padrões consistentes em toda a base de código.',
    metrics: ['Auto-documentado', 'Comentários inline', 'Consistência de padrões'],
    color: 'teal'
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Colaboração em Equipe',
    description: 'Processos estruturados possibilitando trabalho em equipe efetivo, incluindo code reviews detalhados, documentação de decisões técnicas e sessões de compartilhamento de conhecimento.',
    metrics: ['Code reviews', 'Documentação técnica', 'Compartilhamento de conhecimento'],
    color: 'blue'
  }
];

const colorClasses = {
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    dot: 'bg-teal-400'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    dot: 'bg-blue-400'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    dot: 'bg-purple-400'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    dot: 'bg-orange-400'
  }
};

export default function TechnicalPhilosophy() {
  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Interconnected Nodes Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#14b8a6" />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color="#3b82f6" />
          <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={0.5} color="#a855f7" />
          <InterconnectedNodes />
        </Canvas>
      </div>

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Lightbulb className="w-5 h-5 text-teal-400" />
            </motion.div>
            <Badge className="px-4 py-2 text-xs font-semibold tracking-wider border-teal-700/50 bg-teal-900/30 text-teal-300">
              Princípios Fundamentais
            </Badge>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Filosofia de Desenvolvimento
          </h2>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Princípios técnicos guiando decisões de arquitetura, seleção de stack e processos de desenvolvimento.{' '}
            <span className="text-white font-medium">Resultados {'>'} Ferramentas</span>.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {principles.map((principle, index) => {
            const colors = colorClasses[principle.color];
            const Icon = principle.icon;

            return (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Card className="h-full relative bg-slate-900/40 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-500 p-6 hover:bg-slate-900/60 hover:shadow-2xl overflow-hidden">
                  {/* Gradient Accent */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.bg}`} />
                  
                  <div className="relative z-10">
                    {/* Icon + Indicator */}
                    <div className="flex items-start justify-between mb-5">
                      <motion.div 
                        className={`w-14 h-14 rounded-xl ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {React.createElement(Icon, { className: `w-7 h-7 ${colors.text}` })}
                      </motion.div>
                      <motion.div 
                        className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                      {principle.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed mb-5 group-hover:text-slate-300 transition-colors duration-300">
                      {principle.description}
                    </p>

                    {/* Metrics */}
                    {principle.metrics && (
                      <div className="space-y-2.5 pt-4 border-t border-slate-800/70">
                        {principle.metrics.map((metric, idx) => (
                          <motion.div 
                            key={metric} 
                            className="flex items-center gap-2.5"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08 + idx * 0.05 }}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                            <span className="text-xs text-slate-400 font-medium">{metric}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <Card className="inline-block relative bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-500 px-10 py-8 max-w-3xl group overflow-hidden">
            {/* Gradient Accent */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
            
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                <div className="px-4">
                  <Lightbulb className="w-5 h-5 text-teal-400" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              </div>
              
              <blockquote className="text-slate-300 text-lg leading-relaxed font-medium">
                "O melhor código entrega valor de negócio de forma previsível, escala sem atrito
                e permanece manutenível além do autor original."
              </blockquote>

              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-700" />
                <p className="text-slate-500 text-sm">
                  Abordagem refinada através de 15+ deploys em produção
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-700" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
