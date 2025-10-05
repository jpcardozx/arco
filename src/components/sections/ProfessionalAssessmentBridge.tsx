/**
 * PROFESSIONAL ASSESSMENT BRIDGE
 * Seção estratégica que conecta ROI Calculator → Assessment Page
 * Copy profissional, séria, focada em credibilidade e valor
 */
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  FileText,
  Clock,
  Shield,
  Target,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export function ProfessionalAssessmentBridge() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const diagnosticIncludes = [
    {
      icon: FileText,
      title: "Análise Técnica Completa",
      description: "Auditoria do seu site, Google Meu Negócio, concorrentes e posicionamento local"
    },
    {
      icon: Target,
      title: "Identificação de Gargalos",
      description: "Mapeamento dos 3 principais vazamentos no seu funil de captação"
    },
    {
      icon: TrendingUp,
      title: "Plano de Ação Prioritizado",
      description: "Roadmap técnico com impacto estimado e investimento necessário por etapa"
    }
  ];

  const guarantees = [
    {
      icon: Clock,
      text: "Entrega em 48 horas úteis"
    },
    {
      icon: Shield,
      text: "100% gratuito, sem compromisso"
    },
    {
      icon: CheckCircle2,
      text: "PDF executivo de 15-20 páginas"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 space-y-6"
          >
            <Badge className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-blue-400/30 bg-blue-500/10 backdrop-blur-xl">
              <AlertCircle className="w-4 h-4 text-blue-300" />
              <span className="font-barlow text-sm font-semibold text-blue-100 tracking-wide">
                Diagnóstico Profissional Gratuito
              </span>
            </Badge>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-arsenal font-bold text-white leading-tight"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
            >
              Descubra Exatamente Onde Você Está
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Perdendo Dinheiro Online
              </span>
            </h2>

            <p
              className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
            >
              Análise profissional do seu ecossistema digital: site, Google Meu Negócio, concorrentes e
              posicionamento local. <strong className="text-white">Identificamos os 3 maiores gargalos</strong> que
              estão impedindo você de captar mais clientes.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-12">

            {/* Left: What's Included - 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <h3
                className="text-2xl sm:text-3xl font-arsenal font-bold text-white mb-6"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
              >
                O que está incluído:
              </h3>

              <div className="space-y-4">
                {diagnosticIncludes.map((item, index) => {
                  const IconComponent = item.icon as React.ComponentType<{ className?: string }>;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-400/30 transition-all duration-300 group">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="w-6 h-6 text-blue-300" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <h4
                                className="text-lg sm:text-xl font-barlow font-bold text-white"
                                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                              >
                                {item.title}
                              </h4>
                              <p
                                className="text-sm sm:text-base text-slate-300 leading-relaxed"
                                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right: CTA Card - 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="border-2 border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl sticky top-24">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-4">
                    <h4
                      className="text-xl sm:text-2xl font-arsenal font-bold text-white"
                      style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                    >
                      Solicite Seu Diagnóstico
                    </h4>
                    <p
                      className="text-sm sm:text-base text-slate-300 leading-relaxed"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                    >
                      Processo 100% online. Responda 8 perguntas estratégicas sobre seu negócio
                      e receba o diagnóstico completo em até 48 horas.
                    </p>
                  </div>

                  {/* Guarantees */}
                  <div className="space-y-3 py-4 border-t border-b border-white/10">
                    {guarantees.map((guarantee, index) => {
                      const IconComponent = guarantee.icon as React.ComponentType<{ className?: string }>;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span
                            className="text-sm text-slate-200 font-medium"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                          >
                            {guarantee.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Primary CTA */}
                  <Button
                    size="lg"
                    className="w-full group relative overflow-hidden px-8 py-7 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 hover:from-blue-700 hover:via-indigo-600 hover:to-blue-700 shadow-2xl shadow-blue-500/40 transition-all duration-500 hover:scale-105"
                    onClick={() => window.location.href = '/assessment'}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <FileText className="w-6 h-6 flex-shrink-0" />
                      <span>Solicitar Diagnóstico Gratuito</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </Button>

                  {/* Trust indicator */}
                  <p className="text-xs text-center text-slate-400">
                    📊 Mais de 200 diagnósticos entregues em 2024
                  </p>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm inline-block">
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                  <strong className="text-white">Nota:</strong> Este é um diagnóstico técnico profissional,
                  não é uma "avaliação grátis" genérica. Você receberá um PDF executivo completo com
                  análise detalhada e plano de ação priorizado.
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
