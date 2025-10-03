/**
 * NextStepsTimeline - Visual process after contact
 * Shows clear, professional timeline of what happens next
 * Reduces anxiety, increases conversion
 */
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  FileText,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { cn } from '@/design-system/tokens';

export function NextStepsTimeline() {
  const timelineSteps = useMemo(() => [
    {
      step: '01',
      icon: MessageSquare,
      title: 'Primeiro Contato',
      duration: 'Imediato',
      description: 'Resposta inicial em até 2 horas úteis com confirmação de recebimento e agendamento preliminar.',
      deliverables: [
        'Confirmação de recebimento',
        'Proposta de horários',
        'Briefing preparatório'
      ],
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      iconColor: 'text-teal-600'
    },
    {
      step: '02',
      icon: Search,
      title: 'Diagnóstico Preliminar',
      duration: '30-45 minutos',
      description: 'Análise aprofundada do seu mercado, concorrência local e oportunidades imediatas de crescimento.',
      deliverables: [
        'Análise competitiva',
        'Benchmark de mercado',
        'Estimativa de ROI'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      step: '03',
      icon: FileText,
      title: 'Proposta Comercial',
      duration: '24-48 horas',
      description: 'Documento detalhado com escopo, investimento, cronograma, métricas de sucesso e termos contratuais.',
      deliverables: [
        'Proposta estruturada',
        'Projeções financeiras',
        'Roadmap de 90 dias'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      step: '04',
      icon: Rocket,
      title: 'Kick-off Operacional',
      duration: '48-72 horas',
      description: 'Início imediato após aprovação: setup técnico, briefing estratégico e primeiras ações de captação.',
      deliverables: [
        'Acesso às ferramentas',
        'Primeira campanha ativa',
        'Dashboard configurado'
      ],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600'
    }
  ], []);

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <Badge className="mb-6 border-slate-300 bg-slate-50 px-4 py-2 text-slate-700">
            Processo Transparente
          </Badge>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            O que acontece{' '}
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              após o contato
            </span>
          </h2>

          <p className="text-xl leading-relaxed text-slate-600">
            Processo estruturado em 4 etapas com prazos claros e entregas definidas.
            Transparência total desde o primeiro minuto.
          </p>
        </motion.div>

        {/* Timeline - Vertical with connectors */}
        <div className="relative mx-auto max-w-5xl">
          {/* Vertical line connector */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-teal-200 via-purple-200 to-orange-200 lg:left-1/2" />

          <div className="space-y-12">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={cn(
                    "relative grid gap-8 lg:grid-cols-2 lg:gap-12",
                    isEven ? "lg:pr-12" : "lg:flex-row-reverse lg:pl-12"
                  )}
                >
                  {/* Content Card */}
                  <div className={cn(
                    "relative",
                    !isEven && "lg:col-start-2"
                  )}>
                    <Card className={cn(
                      "group overflow-hidden border-2 bg-white shadow-lg transition-all hover:shadow-2xl",
                      step.borderColor
                    )}>
                      <CardContent className="p-8">
                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 12 }}
                              transition={{ duration: 0.3 }}
                              className={cn(
                                "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                                step.color
                              )}
                            >
                              <Icon className="h-8 w-8 text-white" />
                            </motion.div>

                            <div>
                              <div className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-400">
                                Etapa {step.step}
                              </div>
                              <h3 className="text-2xl font-bold text-slate-900">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className={cn(
                              "border-2",
                              step.borderColor,
                              step.bgColor,
                              step.iconColor
                            )}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {step.duration}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="mb-6 leading-relaxed text-slate-600">
                          {step.description}
                        </p>

                        {/* Deliverables */}
                        <div className={cn(
                          "rounded-lg border p-4",
                          step.borderColor,
                          step.bgColor
                        )}>
                          <div className={cn(
                            "mb-3 text-xs font-bold uppercase tracking-wide",
                            step.iconColor
                          )}>
                            Entregas desta etapa
                          </div>
                          <div className="space-y-2">
                            {step.deliverables.map((deliverable, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle2 className={cn("h-4 w-4", step.iconColor)} />
                                <span className="text-sm font-medium text-slate-700">
                                  {deliverable}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Arrow connector to next */}
                        {index < timelineSteps.length - 1 && (
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                            <motion.div
                              animate={{ y: [0, 8, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
                                step.color
                              )}
                            >
                              <ArrowRight className="h-6 w-6 rotate-90 text-white" />
                            </motion.div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center dot on timeline */}
                  <div className={cn(
                    "absolute top-8 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border-4 bg-white shadow-lg",
                    step.borderColor,
                    "left-1/2 -translate-x-1/2"
                  )}>
                    <div className={cn("h-2 w-2 rounded-full", step.iconColor.replace('text-', 'bg-'))} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA - Subtle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="mb-2 text-lg font-medium text-slate-700">
            Transparência completa em cada etapa do processo
          </p>
          <p className="text-sm text-slate-500">
            Todas as entregas documentadas • Prazos acordados por escrito • Comunicação estruturada
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
