/**
 * Process Standards Section - S-Tier Premium Design
 * Horizontal timeline, Glassmorphism, Framer Motion, Advanced React
 */
'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { Shield, CheckCircle, AlertTriangle, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/design-system/tokens';

export function ProcessStandards() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Memoized process steps
  const processSteps = useMemo(() => [
    {
      title: 'Gatilhos de interrupção',
      description: 'Monitoramento em tempo real para identificar anomalias e parar campanhas automaticamente.',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      iconColor: 'text-red-400',
      bgGlow: 'bg-red-500/20',
      metrics: ['CPA > 150% da meta', 'CTR < 0.5%', 'Qualidade < 7/10'],
    },
    {
      title: 'Análise rápida',
      description: 'Diagnóstico imediato da causa raiz com protocolos de análise estruturada.',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      iconColor: 'text-orange-400',
      bgGlow: 'bg-orange-500/20',
      metrics: ['Análise em 15min', 'Relatório em 30min', 'Plano em 60min'],
    },
    {
      title: 'Decisões cirúrgicas',
      description: 'Ajustes precisos baseados em dados com impacto mínimo no budget.',
      icon: Shield,
      color: 'from-teal-500 to-teal-600',
      iconColor: 'text-teal-400',
      bgGlow: 'bg-teal-500/20',
      metrics: ['Decisão em 2h', 'Implementação em 4h', 'Validação em 24h'],
    },
    {
      title: 'Otimização contínua',
      description: 'Melhoria incremental com base em performance e feedback do mercado.',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      iconColor: 'text-green-400',
      bgGlow: 'bg-green-500/20',
      metrics: ['Revisão diária', 'Otimização semanal', 'Relatório mensal'],
    },
  ], []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[30%] top-[20%] h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[20%] right-[20%] h-[600px] w-[600px] rounded-full bg-teal-500/15 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <Container size="xl" className="relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl space-y-6 text-center"
        >
          <Badge className="border-transparent bg-gradient-to-r from-orange-500/20 to-teal-500/20 px-4 py-2 text-white backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Padrões de Qualidade
          </Badge>

          <h2 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
            Processos{' '}
            <span className="bg-gradient-to-r from-orange-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Padronizados
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/80">
            Metodologia comprovada que garante resultados consistentes para todos os clientes
          </p>
        </motion.div>

        {/* Process Steps - HORIZONTAL Timeline */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
              >
                <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl">
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="mb-6 flex items-start gap-4">
                      <motion.div
                        animate={{ rotate: hoveredStep === index ? 360 : 0, scale: hoveredStep === index ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                        className={cn(
                          "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
                          step.color
                        )}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-bold uppercase text-white">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-white/80">{step.description}</p>
                      </div>

                      {/* Step number */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-bold text-white/60">
                        {index + 1}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className={cn("rounded-xl border border-white/10 p-4", step.bgGlow)}>
                      <h4 className={cn("mb-3 text-sm font-semibold", step.iconColor)}>Métricas de controle:</h4>
                      <div className="space-y-2">
                        {step.metrics.map((metric, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div className={cn("h-1.5 w-1.5 rounded-full", step.iconColor)} />
                            <span className="text-sm text-white/90">{metric}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow connector - apenas entre cards */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                        <ArrowRight className="h-8 w-8 text-white/20" />
                      </div>
                    )}
                  </CardContent>

                  {/* Hover gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {[
            { value: '99.2%', label: 'Uptime garantido', delay: 0.1 },
            { value: '< 2h', label: 'Tempo de resposta', delay: 0.2 },
            { value: '100%', label: 'Protocolo seguido', delay: 0.3 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-2 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-5xl font-black text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
