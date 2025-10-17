/**
 * ClientSupportSection - Professional Communication Channels
 * S-Tier UI/UX: Asymmetric layout, premium micro-interactions, institutional tone
 * Focus: Professional accessibility without casual language
 */
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Clock,
  Shield,
  CheckCircle2,
  Phone,
  Mail,
  Video,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';
import { cn } from '@/design-system/tokens';

export function ClientSupportSection() {
  const [hoveredChannel, setHoveredChannel] = useState<number | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);

  // Communication channels - institutional tone
  const communicationChannels = useMemo(() => [
    {
      icon: Phone,
      title: 'Consultoria Telefônica',
      subtitle: 'Ligação estratégica de 30 min',
      description: 'Conversa aprofundada sobre seu cenário atual, metas de crescimento e potencial de resultados. Análise personalizada do seu mercado e concorrência.',
      features: ['Diagnóstico imediato', 'Análise de viabilidade', 'Plano de ação inicial'],
      action: 'Agendar ligação',
      color: 'from-teal-500 to-teal-600',
      iconColor: 'text-teal-600',
      bgGlow: 'bg-teal-50',
      borderColor: 'border-teal-200',
      availability: 'Segunda a Sexta, 9h às 18h',
      responseTime: 'Agendamento em 2h'
    },
    {
      icon: Video,
      title: 'Sessão de Diagnóstico',
      subtitle: 'Videochamada de 45 minutos',
      description: 'Análise em tempo real das suas métricas e operação atual. Compartilhamento de tela para identificar oportunidades imediatas e gaps críticos que estão limitando seu crescimento.',
      features: ['Análise ao vivo', 'Gravação da sessão', 'Relatório detalhado'],
      action: 'Agendar sessão',
      color: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-600',
      bgGlow: 'bg-purple-50',
      borderColor: 'border-purple-200',
      availability: 'Google Meet ou Zoom',
      responseTime: 'Disponível em 4h'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Executivo',
      subtitle: 'Atendimento personalizado',
      description: 'Canal direto com especialista dedicado para dúvidas urgentes, esclarecimentos técnicos ou solicitação de proposta comercial. Atendimento 100% humano, sem bots.',
      features: ['Resposta em 2h úteis', 'Atendimento humano', 'Acompanhamento contínuo'],
      action: 'Iniciar conversa',
      color: 'from-green-500 to-green-600',
      iconColor: 'text-green-600',
      bgGlow: 'bg-green-50',
      borderColor: 'border-green-200',
      availability: 'Seg-Sex: 8h-19h | Sáb: 9h-13h',
      responseTime: 'Resposta em até 2h'
    },
    {
      icon: Mail,
      title: 'Proposta Personalizada',
      subtitle: 'Por e-mail corporativo',
      description: 'Envie informações detalhadas sobre seu negócio, objetivos e contexto de mercado. Nossa equipe fará uma análise aprofundada e retornará com uma proposta sob medida.',
      features: ['Análise completa', 'Proposta customizada', 'SLA de resposta'],
      action: 'Solicitar proposta',
      color: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-600',
      bgGlow: 'bg-blue-50',
      borderColor: 'border-blue-200',
      availability: 'Resposta em até 6h úteis',
      responseTime: 'Proposta em 24h'
    }
  ], []);

  // Service guarantees - institutional
  const serviceCommitments = useMemo(() => [
    {
      icon: Clock,
      metric: '< 2h',
      label: 'Tempo de resposta',
      detail: 'Garantido em horário comercial'
    },
    {
      icon: Shield,
      metric: '100%',
      label: 'Confidencialidade',
      detail: 'LGPD e NDA disponível'
    },
    {
      icon: CheckCircle2,
      metric: 'R$ 0',
      label: 'Diagnóstico inicial',
      detail: 'Sem custos ou compromisso'
    },
    {
      icon: Calendar,
      metric: '24-48h',
      label: 'Entrega de proposta',
      detail: 'Após primeira reunião'
    }
  ], []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-32">
      {/* Premium background with subtle grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Section Header - Institutional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <Badge className="mb-6 border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm">
            Canais de Atendimento
          </Badge>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Como deseja{' '}
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
              iniciar o contato
            </span>
          </h2>

          <p className="text-xl leading-relaxed text-slate-600">
            Oferecemos diferentes formatos de atendimento para melhor se adequar à sua rotina e preferências.
            Todos incluem diagnóstico inicial sem compromisso.
          </p>
        </motion.div>

        {/* ASYMMETRIC GRID - 2 large + 2 small */}
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
          {communicationChannels.map((channel, index) => {
            const Icon = channel.icon;
            const isLarge = index < 2; // First two are larger
            const isSelected = selectedChannel === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredChannel(index)}
                onHoverEnd={() => setHoveredChannel(null)}
                onClick={() => setSelectedChannel(index)}
                className={cn(
                  "cursor-pointer",
                  isLarge && "lg:row-span-1"
                )}
              >
                <Card className={cn(
                  "group relative h-full overflow-hidden border-2 bg-white transition-all duration-500",
                  channel.borderColor,
                  isSelected
                    ? `${channel.bgGlow} shadow-2xl`
                    : "shadow-md hover:shadow-xl",
                  hoveredChannel === index && "scale-[1.02]"
                )}>
                  <CardContent className={cn(
                    "flex h-full flex-col p-8",
                    isLarge ? "lg:p-10" : "lg:p-8"
                  )}>
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <motion.div
                        animate={{
                          scale: hoveredChannel === index ? 1.15 : 1,
                          rotate: hoveredChannel === index ? 12 : 0
                        }}
                        transition={{ duration: 0.4 }}
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                          channel.color
                        )}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "border-2 font-medium",
                          channel.borderColor,
                          channel.bgGlow,
                          channel.iconColor
                        )}
                      >
                        {channel.responseTime}
                      </Badge>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="mb-1 text-2xl font-bold text-slate-900">
                        {channel.title}
                      </h3>
                      <p className={cn("text-sm font-medium", channel.iconColor)}>
                        {channel.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                      {channel.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 space-y-2">
                      {channel.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className={cn("h-4 w-4", channel.iconColor)} />
                          <span className="text-sm font-medium text-slate-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Availability */}
                    <div className={cn(
                      "mb-6 rounded-lg border p-3 text-center",
                      channel.borderColor,
                      channel.bgGlow
                    )}>
                      <div className={cn("text-xs font-semibold uppercase tracking-wide", channel.iconColor)}>
                        Disponibilidade
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-700">
                        {channel.availability}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className={cn(
                        "group/btn w-full bg-gradient-to-r font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl",
                        channel.color
                      )}
                      size="lg"
                    >
                      {channel.action}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>

                    {/* Hover effect overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Chat Status - Discrete */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12 flex justify-center"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border-2 border-slate-200 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm text-slate-600 font-semibold">Chat direto em tempo real - Em implementação</span>
          </div>
        </motion.div>

        {/* Service Commitments - Institutional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden border-2 border-slate-200 bg-white shadow-xl">
            <CardContent className="p-10">
              <h3 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Compromissos de Atendimento
              </h3>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {serviceCommitments.map((commitment, index) => {
                  const Icon = commitment.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <div className="mb-2 text-3xl font-black text-teal-600">
                        {commitment.metric}
                      </div>
                      <div className="mb-1 text-sm font-bold text-slate-900">
                        {commitment.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {commitment.detail}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
