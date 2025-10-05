'use client';

/**
 * PROCESS & EXPECTATIONS SECTION
 * Explica o que acontece após enviar o form
 * Reduz ansiedade, aumenta confiança
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Target,
  FileText,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VideoBackground } from '@/components/ui/VideoBackground';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  highlights: string[];
  delay?: number;
}

const ProcessStep = ({
  number,
  title,
  description,
  icon: Icon,
  duration,
  highlights,
  delay = 0
}: ProcessStepProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const IconComponent = Icon as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <Card className="h-full border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-white/20 transition-all duration-300 group">
        <CardContent className="p-8">
          {/* Number Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2, type: 'spring' }}
            className="absolute -top-4 -left-4"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/50">
              {number}
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all"
          >
            <IconComponent className="w-8 h-8 text-blue-400" />
          </motion.div>

          {/* Title & Duration - legibilidade melhorada */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{title}</h3>
            <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-300 bg-blue-950/50 backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </Badge>
          </div>

          {/* Description - contraste aumentado */}
          <p className="text-white/90 leading-relaxed mb-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {description}
          </p>

          {/* Highlights */}
          <div className="space-y-3">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: delay + 0.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ProcessExpectationsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const steps: ProcessStepProps[] = [
    {
      number: '01',
      title: 'Análise Profunda',
      description: 'Eu analiso pessoalmente seu site, Google Meu Negócio, concorrentes e histórico (se tiver). Não é automático.',
      icon: Target,
      duration: '24-48h',
      highlights: [
        'Auditoria completa de presença digital',
        'Análise competitiva do seu mercado local',
        'Identificação dos 3 maiores gargalos',
        'Benchmark de CPA e volume do setor'
      ]
    },
    {
      number: '02',
      title: 'Relatório Personalizado',
      description: 'Você recebe PDF executivo com diagnóstico detalhado, benchmarks do setor e projeção de ROI conservadora.',
      icon: FileText,
      duration: '48h após análise',
      highlights: [
        'Relatório PDF com 8-12 páginas',
        'Gráficos e métricas visuais',
        'Projeção de ROI (conservadora/realista/otimista)',
        'Plano de ação prioritizado'
      ]
    },
    {
      number: '03',
      title: 'Call Estratégica (Opcional)',
      description: 'Agende call de 30min comigo para discutir achados. Zero pressão de venda. Se não fizer sentido, só agradeço seu tempo.',
      icon: Phone,
      duration: 'Você escolhe quando',
      highlights: [
        'Discussão de achados do relatório',
        'Esclarecimento de dúvidas técnicas',
        'Recomendações personalizadas',
        'Sem compromisso ou pressão comercial'
      ]
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects - PLACEHOLDER aguardando terceiro vídeo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge 
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.2) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59,130,246,0.3)'
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-100 font-semibold">Processo Transparente</span>
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            O Que Acontece{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Depois de Enviar?
            </span>
          </h2>

          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            Transparência total do início ao fim. Sem surpresas, sem letras miúdas.
          </p>
        </motion.div>

        {/* Process Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <ProcessStep key={index} {...step} delay={index * 0.2} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="inline-block border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ainda com dúvidas?
                  </h3>
                  <p className="text-blue-100/70">
                    Veja as perguntas mais frequentes abaixo
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-blue-400 font-semibold"
                >
                  <span>Rolar para FAQ</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
