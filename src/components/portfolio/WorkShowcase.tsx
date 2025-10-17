/**
 * VITRINE DE PROJETOS
 * Projetos selecionados com métricas concretas
 * Sem depoimentos efusivos, apenas fatos
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  TrendingUp,
  Zap,
  Shield,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    icon: React.ElementType;
    color: 'green' | 'blue' | 'purple';
  }[];
  tech: string[];
  image: string;
  url?: string;
}

const projects: Project[] = [
  {
    id: 'arco-platform',
    title: 'Plataforma ARCO',
    client: 'ARCO Digital',
    industry: 'SaaS B2B',
    year: '2024',
    description: 'Plataforma de desenvolvimento full-stack para consultoria digital com ferramentas de avaliação, sistema de agendamento e dashboard de analytics.',
    challenge: 'Construir um SaaS multi-tenant escalável com jornadas de usuário complexas e processamento de dados em tempo real.',
    solution: 'Arquitetura Next.js 15 + Supabase com Row-Level Security, edge functions e estratégias de renderização otimizadas.',
    metrics: [
      { label: 'LCP', value: '0.9s', icon: Zap, color: 'green' },
      { label: 'Taxa de Conversão', value: '12.3%', icon: TrendingUp, color: 'blue' },
      { label: 'Uptime', value: '99.9%', icon: Shield, color: 'purple' }
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/arco-platform.png'
  },
  {
    id: 'e-commerce-optimization',
    title: 'Performance de E-commerce',
    client: 'TechCommerce',
    industry: 'E-commerce',
    year: '2023',
    description: 'Projeto de otimização de performance que reduziu o abandono de checkout através de melhorias de velocidade e refinamentos de UX.',
    challenge: '67% de abandono de carrinho devido a um LCP de 4.2s no fluxo de checkout mobile.',
    solution: 'Otimização do caminho crítico, pipeline de otimização de imagens e fluxo de checkout simplificado com validação em tempo real.',
    metrics: [
      { label: 'Melhoria no LCP', value: '-62%', icon: Zap, color: 'green' },
      { label: 'Impacto na Receita', value: '+$43K/mês', icon: TrendingUp, color: 'blue' },
      { label: 'Conversão Mobile', value: '+75%', icon: Shield, color: 'purple' }
    ],
    tech: ['React', 'Next.js', 'Lighthouse CI', 'ImageOptim', 'Vercel Edge'],
    image: '/projects/ecommerce-opt.png'
  },
  {
    id: 'finance-dashboard',
    title: 'Dashboard SaaS Financeiro',
    client: 'FinanceFlow',
    industry: 'FinTech',
    year: '2023',
    description: 'Dashboard de analytics em tempo real para dados financeiros com visualizações complexas e colaboração multi-usuário.',
    challenge: 'Lidar com atualizações em tempo real para mais de 10K pontos de dados sem bloquear a thread da UI.',
    solution: 'Atualizações otimistas de UI, Web Workers para cálculos e renderização virtualizada para grandes conjuntos de dados.',
    metrics: [
      { label: 'Pontos de Dados/s', value: '10K+', icon: Zap, color: 'green' },
      { label: 'Crescimento de Usuários', value: '+127%', icon: TrendingUp, color: 'blue' },
      { label: 'Segurança de Dados', value: 'SOC 2', icon: Shield, color: 'purple' }
    ],
    tech: ['React', 'TypeScript', 'D3.js', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/projects/finance-dashboard.png'
  }
];

const colorClasses = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400'
};

export default function WorkShowcase() {
  const [selectedProject, setSelectedProject] = useState<string>(projects[0].id);
  
  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-purple-700/50 bg-purple-900/30 text-purple-300">
            Projetos Selecionados
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Estudos de Caso de Projetos
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Exemplos representativos de implementações técnicas com resultados mensuráveis.
          </p>
        </motion.div>

        {/* Seletor de Projetos */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedProject === project.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Detalhes do Projeto */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* Esquerda: Imagem + Métricas */}
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800">
                    {/* Placeholder para imagem do projeto */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                      [Captura de Tela do Projeto]
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-3 gap-4">
                    {currentProject.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      >
                        {React.createElement(metric.icon, { className: `w-5 h-5 mx-auto mb-2 ${colorClasses[metric.color]}` })}
                        <div className={`text-xl font-bold ${colorClasses[metric.color]} mb-1`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direita: Detalhes */}
                <div className="space-y-6">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                    <span>{currentProject.client}</span>
                    <span>•</span>
                    <span>{currentProject.industry}</span>
                    <span>•</span>
                    <span>{currentProject.year}</span>
                  </div>

                  {/* Descrição */}
                  <p className="text-slate-300 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Desafio */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Desafio
                    </h4>
                    <p className="text-slate-400">
                      {currentProject.challenge}
                    </p>
                  </div>

                  {/* Solução */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Solução
                    </h4>
                    <p className="text-slate-400">
                      {currentProject.solution}
                    </p>
                  </div>

                  {/* Stack de Tecnologias */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-slate-800/50 border-slate-700/50 text-slate-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
