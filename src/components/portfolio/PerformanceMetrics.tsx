/**
 * MÉTRICAS DE PERFORMANCE
 * Métricas reais de projetos entregues
 */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  TrendingUp,
  Clock,
  Award,
  Target,
  Shield
} from 'lucide-react';

interface Metric {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
  color: 'teal' | 'orange' | 'purple' | 'blue';
}

const metrics: Metric[] = [
  {
    icon: Zap,
    label: 'LCP Médio',
    value: '< 1.2s',
    description: 'Largest Contentful Paint em todos os projetos',
    color: 'teal'
  },
  {
    icon: TrendingUp,
    label: 'Melhoria na Conversão',
    value: '+64%',
    description: 'Aumento médio da taxa de conversão pós-otimização',
    color: 'orange'
  },
  {
    icon: Clock,
    label: 'Entrega de Projetos',
    value: '98%',
    description: 'Taxa de entrega no prazo nos últimos 2 anos',
    color: 'purple'
  },
  {
    icon: Award,
    label: 'Core Web Vitals',
    value: '100%',
    description: 'Projetos que passam em todas as métricas do Core Web Vitals',
    color: 'blue'
  },
  {
    icon: Target,
    label: 'Taxa de Bugs',
    value: '< 2%',
    description: 'Bugs pós-deploy que necessitaram de correções',
    color: 'teal'
  },
  {
    icon: Shield,
    label: 'Auditorias de Segurança',
    value: '0',
    description: 'Vulnerabilidades críticas em produção',
    color: 'orange'
  }
];

const colorClasses = {
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    gradient: 'from-teal-500 to-cyan-400'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    gradient: 'from-orange-500 to-amber-400'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-400'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-400'
  }
};

export default function PerformanceMetrics() {
  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.08)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-orange-700/50 bg-orange-900/30 text-orange-300">
            Histórico
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Métricas de Performance
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Resultados quantificáveis de projetos concluídos nos últimos 2 anos.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const colors = colorClasses[metric.color];
            
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 group hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(metric.icon, { className: `w-6 h-6 ${colors.text}` })}
                  </div>

                  {/* Label */}
                  <div className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                    {metric.label}
                  </div>

                  {/* Value */}
                  <div className={`text-4xl font-bold mb-3 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400">
                    {metric.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500">
            Métricas agregadas de mais de 15 projetos concluídos entre 2023-2024.
            Os resultados de projetos individuais podem variar com base no escopo e nos requisitos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
