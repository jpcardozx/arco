'use client';

/**
 * STRATEGIC VELOCITY FRAMEWORK - Educational First
 * 
 * OBJETIVO: Educar sobre o problema antes de apresentar a solução
 * 
 * ESTRUTURA:
 * 1. Problema: Por que o modelo tradicional falha (2-5% conversão)
 * 2. Insight: Como reduzir fricção através de degraus de valor
 * 3. Framework: 4 degraus progressivos (educação)
 * 4. Aplicação: Como isso se aplica ao seu caso
 * 5. Próximo Passo: Oferta leve (diagnóstico ou checklist)
 * 
 * REFERÊNCIAS:
 * - docs/FUNIL_ESTRATEGIA_LEAD_MAGNET_TRIPWIRE.md
 * - Brennan Dunn: Paid Discovery
 * - Jonathan Stark: Value Pricing
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import {
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Target,
  FileText,
  Calendar,
  Sparkles,
  Shield,
  Lock,
  BarChart3,
  Zap,
  type LucideIcon
} from 'lucide-react';

// ============================================================================
// BACKGROUND RADIAL GRADIENTS
// ============================================================================

const StrategicRadialBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.15) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.15) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial teal (top-left) */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
          top: '-15%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Radial orange (center-right) */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)',
          top: '30%',
          right: '-15%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Radial purple (bottom) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          bottom: '-10%',
          left: '40%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </div>
  );
};

// ============================================================================
// DATA STRUCTURES
// ============================================================================

// Problema: Por que funis tradicionais falham
interface FunnelProblem {
  icon: LucideIcon;
  problem: string;
  impact: string;
  stat: string;
}

const funnelProblems: FunnelProblem[] = [
  {
    icon: AlertCircle,
    problem: 'Fricção Alta',
    impact: 'Demo → Proposta → Negociação: cada etapa perde 60-70% dos leads',
    stat: '2-5% conversão'
  },
  {
    icon: Shield,
    problem: 'Risco Percebido',
    impact: 'Lead não sabe se você entrega antes de investir R$ 10-50k',
    stat: '80% não fecha'
  },
  {
    icon: Lock,
    problem: 'Escopo Difuso',
    impact: '"Depende do projeto" não gera confiança, gera ansiedade',
    stat: '70% abandona'
  }
];

// Framework: 4 degraus de valor
interface VelocityStep {
  step: string;
  icon: LucideIcon;
  title: string;
  color: 'teal' | 'orange' | 'purple';
  description: string;
  purpose: string; // Educacional: por que esse degrau existe
  example: string;
  psychological: string; // Insight sobre o comportamento do lead
}

const velocityFramework: VelocityStep[] = [
  {
    step: '01',
    icon: FileText,
    title: 'Valor Imediato',
    color: 'teal',
    description: 'Conteúdo gratuito e consumível em <10 min que gera 1 insight acionável',
    purpose: 'Provar generosidade e competência técnica sem pedir nada',
    example: 'Checklist, template, vídeo teardown',
    psychological: 'Curiosidade → Confiança. Lead pensa: "Se o gratuito é bom, o pago deve ser melhor"'
  },
  {
    step: '02',
    icon: Target,
    title: 'Comprometimento Leve',
    color: 'orange',
    description: 'Entregável pago (R$ 300-700) em 3-7 dias que é 100% útil mesmo se não fechar',
    purpose: 'Qualificar orçamento + urgência, criar backlog estruturado',
    example: 'Diagnóstico expresso, roadmapping, audit de campanha',
    psychological: 'Confiança → Urgência. Pagamento pequeno = compromisso grande'
  },
  {
    step: '03',
    icon: Zap,
    title: 'Resultado Tangível',
    color: 'purple',
    description: 'Pacote com escopo fechado, prazo claro (14-60 dias), métrica objetiva',
    purpose: 'Eliminar "depende" e provar capacidade de entrega em prazo',
    example: 'Performance Sprint, Conversion Accelerator, Growth Engine',
    psychological: 'Urgência → Decisão. Escopo claro reduz ansiedade em 80%'
  },
  {
    step: '04',
    icon: TrendingUp,
    title: 'Otimização Contínua',
    color: 'teal',
    description: 'Retainer enxuto focado em manutenção + hipóteses de melhoria incremental',
    purpose: 'Preservar ganho inicial, escalar com previsibilidade',
    example: 'Manutenção técnica + otimização baseada em dados',
    psychological: 'Decisão → Preservação. Cliente não quer perder o ganho conquistado'
  }
];

// Princípios: Por que isso funciona
interface FrameworkPrinciple {
  icon: LucideIcon;
  title: string;
  description: string;
  outcome: string;
}

const frameworkPrinciples: FrameworkPrinciple[] = [
  {
    icon: Shield,
    title: 'Redução de Risco Percebido',
    description: 'Cada degrau prova valor antes de pedir o próximo compromisso. Lead nunca sente que "apostou tudo".',
    outcome: '+300% conversão vs funil tradicional'
  },
  {
    icon: Lock,
    title: 'Eliminação de Ambiguidade',
    description: 'Escopo fechado + prazo claro + resultado mensurável = zero ansiedade sobre "quanto vai custar de verdade".',
    outcome: '+80% taxa de fechamento em pacotes'
  },
  {
    icon: BarChart3,
    title: 'Aquisição Metódica',
    description: 'Cada degrau segmenta naturalmente por orçamento, urgência e maturidade. Você fala com quem já está pronto.',
    outcome: '>40% conversão Lead→Pacote (vs 2-5%)'
  }
];

// Color mapping
const colorMap = {
  teal: {
    bg: 'bg-teal-500/20',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.3)]'
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]'
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]'
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const StrategicVelocitySection: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <StrategicRadialBg />

      <Container className="relative z-10">
        {/* ============================================================
            HEADER - Contexto educacional
            ============================================================ */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <Badge className="px-6 py-3 text-sm sm:text-base border-teal-500/30 bg-teal-500/10 text-teal-400 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Por que o modelo tradicional falha
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Funis B2B tradicionais convertem{' '}
            </span>
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              2-5%
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Cold call → Demo → Proposta → Negociação. <br className="hidden sm:block" />
            <span className="text-slate-300">
              Cada etapa perde 60-70% dos leads porque{' '}
            </span>
            <span className="text-orange-400 font-semibold">
              pede compromisso grande sem provar valor
            </span>
            .
          </motion.p>
        </div>

        {/* ============================================================
            PROBLEMA - 3 fricções principais
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3 mb-20"
        >
          {funnelProblems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 hover:border-red-500/30 transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-red-400" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white mb-1">
                          {problem.problem}
                        </div>
                        <div className="text-2xl font-bold text-red-400">
                          {problem.stat}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      {problem.impact}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============================================================
            SOLUÇÃO - Insight educacional
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <Badge className="px-6 py-3 text-sm sm:text-base border-teal-500/30 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-400 backdrop-blur-sm mb-6 inline-block">
            <TrendingUp className="w-4 h-4 mr-2" />
            A solução: Degraus progressivos de valor
          </Badge>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Reduzir fricção
            </span>
            <span className="text-white"> provando valor </span>
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              antes de pedir compromisso
            </span>
          </h3>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Em vez de pedir <span className="text-red-400 font-semibold">R$ 10-50k logo de cara</span>, 
            construa confiança através de <span className="text-teal-400 font-semibold">4 degraus progressivos</span>.
            <br className="hidden sm:block" />
            Resultado: <span className="text-emerald-400 font-bold">+300% conversão</span>.
          </p>
        </motion.div>

        {/* ============================================================
            FRAMEWORK - 4 Degraus Educacionais
            ============================================================ */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {velocityFramework.map((step, index) => {
            const Icon = step.icon;
            const colors = colorMap[step.color];
            const isHovered = hoveredStep === step.step;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredStep(step.step)}
                onHoverEnd={() => setHoveredStep(null)}
              >
                <Card 
                  className={`
                    h-full bg-white/5 backdrop-blur-xl border 
                    ${isHovered ? `${colors.border} ${colors.glow}` : 'border-white/10'}
                    hover:bg-white/8 transition-all duration-300
                  `}
                >
                  <CardContent className="p-6 relative">
                    {/* Step badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className={`${colors.bg} ${colors.border} ${colors.text} border`}>
                        {step.step}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className={`
                      w-14 h-14 rounded-xl ${colors.bg} border ${colors.border}
                      flex items-center justify-center mb-4
                    `}>
                      <Icon className={`w-7 h-7 ${colors.text}`} aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h4>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Purpose (educacional) */}
                    <div className={`
                      p-3 rounded-lg ${colors.bg} border ${colors.border} mb-3
                    `}>
                      <div className={`text-xs font-semibold ${colors.text} mb-1`}>
                        Por que existe:
                      </div>
                      <div className="text-xs text-slate-300">
                        {step.purpose}
                      </div>
                    </div>

                    {/* Example */}
                    <div className="text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-slate-400">Ex:</span> {step.example}
                    </div>

                    {/* Psychological insight */}
                    <div className="pt-3 border-t border-white/5">
                      <div className="text-xs text-slate-400 leading-relaxed">
                        💡 {step.psychological}
                      </div>
                    </div>

                    {/* Arrow connector (desktop only) */}
                    {index < velocityFramework.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-white/20" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================
            WHY IT WORKS - Princípios + Métricas
            ============================================================ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Left: Princípios */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Por que isso funciona
            </h3>
            
            <p className="text-slate-400 leading-relaxed mb-6">
              Não é mágica. É psicologia aplicada + transparência radical sobre escopo e prazo.
              Referências: <span className="text-teal-400">Brennan Dunn</span> (Paid Discovery), 
              {' '}<span className="text-orange-400">Jonathan Stark</span> (Value Pricing), 
              {' '}<span className="text-purple-400">Flowout/Designjoy</span> (Productized Services).
            </p>

            <div className="space-y-4">
              {frameworkPrinciples.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-teal-400" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white mb-1">
                              {principle.title}
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed mb-2">
                              {principle.description}
                            </p>
                            <div className="text-xs font-semibold text-emerald-400">
                              ✓ {principle.outcome}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Métricas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Métricas esperadas
            </h3>

            <p className="text-slate-400 leading-relaxed mb-6">
              Baseado em +200 funis implementados em prestadores de serviços locais.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Opt-in do Lead Magnet', value: '> 15%', color: 'teal' },
                { label: 'Book Rate (Agenda)', value: '> 30%', color: 'orange' },
                { label: 'Take-Rate Tripwire', value: '> 20%', color: 'purple' },
                { label: 'Lead → Pacote', value: '> 40%', color: 'emerald' }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className={`text-3xl font-bold mb-1 bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-300 bg-clip-text text-transparent`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400">
                        {metric.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <Card className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-xl border border-teal-500/30">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Funil Tradicional</div>
                      <div className="text-2xl font-bold text-red-400">2-5%</div>
                      <div className="text-xs text-slate-500">conversão total</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Velocity Framework</div>
                      <div className="text-2xl font-bold text-emerald-400">40%+</div>
                      <div className="text-xs text-slate-500">conversão total</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <div className="text-sm font-semibold text-teal-400">
                      +300% melhoria
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* ============================================================
            APLICAÇÃO - Como isso se aplica ao seu caso
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <span className="text-white">Como isso se aplica </span>
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              ao seu caso
            </span>
          </h3>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Se você é prestador de serviços local (dentista, advogado, contador, arquiteto, etc.) 
            e quer <span className="text-teal-400 font-semibold">+350% em leads qualificados</span>, 
            temos 2 primeiros passos:
          </p>
        </motion.div>

        {/* ============================================================
            CTA DUAL - Diagnóstico vs Checklist
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {/* Gratuito: Checklist */}
          <Card className="bg-white/5 backdrop-blur-xl border border-teal-500/30 hover:bg-white/8 hover:border-teal-500/50 transition-all duration-300">
            <CardContent className="p-8">
              <Badge className="bg-teal-500/20 border-teal-500/30 text-teal-400 border mb-4">
                <FileText className="w-3 h-3 mr-1" />
                Começar aprendendo
              </Badge>

              <h4 className="text-2xl font-bold text-white mb-3">
                Checklist Gratuito
              </h4>

              <p className="text-slate-400 leading-relaxed mb-6">
                15 pontos de otimização de funil que você pode aplicar hoje. 
                Consumo em &lt;10 min.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  'Autoavaliação guiada',
                  'Benchmarks do setor',
                  '3 quick wins imediatos',
                  'Sem contato comercial'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold"
              >
                Baixar Checklist Grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="text-xs text-slate-500 text-center mt-3">
                Email instantâneo • Zero spam
              </div>
            </CardContent>
          </Card>

          {/* Pago: Diagnóstico */}
          <Card className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <Badge className="bg-orange-500/30 border-orange-500/50 text-white border">
                Mais escolhido
              </Badge>
            </div>

            <CardContent className="p-8">
              <Badge className="bg-orange-500/20 border-orange-500/30 text-orange-400 border mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                Começar implementando
              </Badge>

              <h4 className="text-2xl font-bold text-white mb-1">
                Diagnóstico Express
              </h4>
              <div className="text-3xl font-bold text-orange-400 mb-3">
                R$ 497
              </div>

              <p className="text-slate-400 leading-relaxed mb-6">
                Auditoria técnica completa + plano priorizado de 14 dias + 30 min de Q&A. 
                Prazo: 7 dias úteis.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  'Análise técnica (site + GA + Ads)',
                  'Backlog priorizado por ROI',
                  '1 sessão de alinhamento',
                  '100% aplicável (mesmo se não fechar)'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold"
              >
                Agendar Diagnóstico
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="text-xs text-slate-500 text-center mt-3">
                Vagas limitadas • Próxima disponível: 3 dias
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ============================================================
            FOOTER - Transparência radical
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="inline-block bg-white/5 backdrop-blur-xl border border-white/10">
            <CardContent className="p-6">
              <p className="text-sm text-slate-400 max-w-2xl">
                <span className="font-semibold text-slate-300">Transparência:</span> Este framework 
                funciona se você <span className="text-teal-400">já tem +10 leads/mês</span> e 
                capacidade de atender <span className="text-orange-400">+50% demanda</span>. 
                Se não, SEO orgânico é prioridade.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};

export default StrategicVelocitySection;
