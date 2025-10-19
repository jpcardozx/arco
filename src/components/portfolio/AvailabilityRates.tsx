/**
 * DISPONIBILIDADE & PREÇOS
 * Tom factual: disponibilidade, formato, faixa de preço
 * Sem "por favor me contrate", apenas informação clara
 */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Target
} from 'lucide-react';

interface WorkFormat {
  icon: React.ElementType;
  title: string;
  description: string;
  suitable: string[];
}

interface RateTier {
  name: string;
  description: string;
  rate: string;
  features: string[];
  color: 'teal' | 'orange' | 'purple';
}

const workFormats: WorkFormat[] = [
  {
    icon: Target,
    title: 'Por Projeto',
    description: 'Escopo fixo com entregáveis definidos',
    suitable: ['Landing pages', 'Implementação de features', 'Auditorias de performance']
  },
  {
    icon: Clock,
    title: 'Contrato Mensal',
    description: 'Desenvolvimento contínuo com alocação mensal',
    suitable: ['Desenvolvimento de produto', 'Manutenção', 'Consultoria técnica']
  },
  {
    icon: Calendar,
    title: 'Consultoria',
    description: 'Assessoria técnica e revisões de código',
    suitable: ['Revisão de arquitetura', 'Análise de performance', 'Estratégia técnica']
  }
];

const rateTiers: RateTier[] = [
  {
    name: 'Consultoria',
    description: 'Sessões de assessoria técnica',
    rate: 'R$750-1000/hora',
    features: [
      'Revisão de arquitetura técnica',
      'Revisão e otimização de código',
      'Auditoria de performance',
      'Recomendações de stack de tecnologia'
    ],
    color: 'teal'
  },
  {
    name: 'Desenvolvimento',
    description: 'Implementação e trabalho em funcionalidades',
    rate: 'R$40.000-75.000/mês',
    features: [
      'Desenvolvimento full-stack',
      'Implementação de funcionalidades',
      'Correção de bugs e otimização',
      'Documentação',
      'Comprometimento de 20-40 horas/semana'
    ],
    color: 'orange'
  },
  {
    name: 'Liderança Técnica',
    description: 'Arquitetura e liderança de equipe',
    rate: 'R$75.000-125.000/mês',
    features: [
      'Projeto de arquitetura técnica',
      'Revisões de código da equipe',
      'Mentoria e orientação',
      'Planejamento estratégico',
      'Comprometimento em tempo integral'
    ],
    color: 'purple'
  }
];

const colorClasses = {
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    text: 'text-teal-400'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400'
  }
};

export default function AvailabilityRates() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08)_0%,transparent_50%)]" />
      
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
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <Badge className="px-4 py-2 text-xs font-medium border-green-700/50 bg-green-900/30 text-green-300">
              Disponível Atualmente
            </Badge>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Disponibilidade
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Aceitando projetos selecionados a partir do Q3 de 2024. Formatos por projeto e contrato mensal disponíveis.
          </p>
        </motion.div>

        {/* Work Formats */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Formatos de Contratação
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {workFormats.map((format, index) => (
              <motion.div
                key={format.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-300 p-6">
                  <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-4">
                    {React.createElement(format.icon, { className: "w-6 h-6 text-teal-400" })}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {format.title}
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    {format.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Adequado para:
                    </p>
                    {format.suitable.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-400"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rate Tiers */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Estrutura de Preços
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {rateTiers.map((tier, index) => {
              const colors = colorClasses[tier.color];
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-300 p-6">
                    <Badge className={`${colors.bg} ${colors.border} ${colors.text} mb-4`}>
                      {tier.name}
                    </Badge>

                    <p className="text-slate-400 text-sm mb-4">
                      {tier.description}
                    </p>

                    <div className="mb-6">
                      <div className={`text-3xl font-bold ${colors.text}`}>
                        {tier.rate}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {tier.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6 text-center">
            <p className="text-sm text-slate-400 mb-4">
              Os valores variam com base na complexidade, cronograma e escopo do projeto.
              O preço final é determinado durante a fase de descoberta.
            </p>
            <Button
              className="bg-gradient-to-r from-teal-600 to-orange-500 hover:from-teal-500 hover:to-orange-400 text-white"
            >
              Discuta seu Projeto <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
