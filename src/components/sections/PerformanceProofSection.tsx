'use client';

/**
 * PERFORMANCE PROOF SECTION - 9/10 Standard
 * Real metrics, real results, zero fluff
 * Before/After comparisons with actual data
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import Link from 'next/link';

interface MetricComparisonProps {
  label: string;
  before: string;
  after: string;
  improvement: string;
  icon: React.ElementType<{ className?: string }>;
}

const MetricComparison: React.FC<MetricComparisonProps> = ({
  label,
  before,
  after,
  improvement,
  icon: Icon
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-teal-400" />
      <span className="text-sm font-medium text-slate-300">{label}</span>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
        <div className="text-xs text-red-300 mb-1">Antes</div>
        <div className="text-lg font-bold text-red-400">{before}</div>
      </div>
      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <div className="text-xs text-green-300 mb-1">Depois</div>
        <div className="text-lg font-bold text-green-400">{after}</div>
      </div>
    </div>

    <div className="flex items-center gap-2 text-sm">
      <TrendingUp className="w-4 h-4 text-teal-400" />
      <span className="text-teal-400 font-semibold">{improvement}</span>
    </div>
  </div>
);

const realResults = [
  {
    client: 'E-commerce Regional',
    industry: 'Varejo Online',
    timeline: '3 meses',
    metrics: [
      {
        label: 'Page Load Time',
        before: '4.2s',
        after: '0.9s',
        improvement: '+78% redução',
        icon: Clock
      },
      {
        label: 'Taxa de Conversão',
        before: '1.2%',
        after: '3.8%',
        improvement: '+217% aumento',
        icon: Target
      },
      {
        label: 'Lighthouse Score',
        before: '45/100',
        after: '98/100',
        improvement: '+118% melhoria',
        icon: Zap
      }
    ],
    impact: 'ROI de 340% em 90 dias'
  }
];

const stackBenefits = [
  {
    title: 'Performance Nativa',
    stat: '<1s',
    description: 'Tempo de carregamento médio em produção',
    icon: Zap
  },
  {
    title: 'Uptime Garantido',
    stat: '99.99%',
    description: 'Disponibilidade com SLA enterprise',
    icon: CheckCircle2
  },
  {
    title: 'Escalabilidade',
    stat: '10k+',
    description: 'Usuários simultâneos sem degradação',
    icon: Users
  }
];

export function PerformanceProofSection() {
  const result = realResults[0];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.08)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 px-4 py-2 text-xs font-medium border-teal-700/50 bg-teal-900/30 text-teal-300">
              Resultados Comprovados
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Performance que{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                multiplica conversões
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Dados reais de implementações recentes. Cada segundo economizado
              no carregamento aumenta conversão em média 7%.
            </p>
          </motion.div>
        </div>

        {/* Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16"
        >
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
            <CardContent className="p-8">
              {/* Case Header */}
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-700/50">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {result.client}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>{result.industry}</span>
                    <span>•</span>
                    <span>{result.timeline}</span>
                  </div>
                </div>
                <Badge className="bg-teal-500/10 border-teal-500/30 text-teal-300 text-sm px-3 py-1">
                  {result.impact}
                </Badge>
              </div>

              {/* Metrics Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {result.metrics.map((metric, idx) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MetricComparison {...metric} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stack Visualization + Benefits */}
        <div className="max-w-5xl mx-auto mb-12 grid lg:grid-cols-2 gap-8 items-center">
          {/* Stack Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
              <CardContent className="p-6">
                <img
                  src="/stack.png"
                  alt="Tech Stack - Next.js, TypeScript, Supabase, Vercel"
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-xs text-slate-500 text-center mt-4">
                  Stack moderna focada em performance e escalabilidade
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Cards */}
          <div className="space-y-4">
            {stackBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/30 backdrop-blur border border-slate-700/30 hover:border-teal-500/30 transition-colors">
                    <CardContent className="p-5 flex items-center gap-4">
                      <Icon className="w-8 h-8 text-teal-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-white mb-1">
                          {benefit.stat}
                        </div>
                        <div className="text-sm font-semibold text-slate-300">
                          {benefit.title}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Card className="bg-gradient-to-br from-teal-900/30 to-slate-800/30 backdrop-blur-xl border border-teal-700/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Quanto sua empresa está perdendo por segundo?
              </h3>
              <p className="text-slate-300 mb-6">
                Análise gratuita revela o impacto exato da performance
                do seu site na taxa de conversão.
              </p>
              <Link href="/#roi-calculator">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg"
                >
                  Analisar Meu Site Agora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
