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

  // Communication channels - sem prepotências
  const communicationChannels = useMemo(() => [
    {
      icon: Phone,
      title: 'Telefone',
      subtitle: 'Ligação direta',
      description: 'Entre em contato por telefone para tirar dúvidas sobre projetos, prazos e orçamentos.',
      features: ['Horário comercial', 'Sem agendamento', 'Retorno no mesmo dia'],
      action: 'Ligar',
      color: 'from-rose-500 to-rose-600',
      iconColor: 'text-rose-600',
      bgGlow: 'bg-rose-50',
      borderColor: 'border-rose-200',
      availability: 'Segunda a Sexta, 9h às 18h',
      responseTime: 'Retorno em 1 dia útil'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Mensagem direta',
      description: 'Envie uma mensagem para tirar dúvidas rápidas ou solicitar informações sobre serviços.',
      features: ['Sem bots', 'Horário comercial', 'Respostas diretas'],
      action: 'Enviar mensagem',
      color: 'from-pink-500 to-pink-600',
      iconColor: 'text-pink-600',
      bgGlow: 'bg-pink-50',
      borderColor: 'border-pink-200',
      availability: 'Seg-Sex: 9h-18h',
      responseTime: 'Retorno em 1 dia útil'
    },
    {
      icon: Mail,
      title: 'Email',
      subtitle: 'Contato formal',
      description: 'Envie detalhes do seu projeto por email. Útil para anexar documentos ou informações extensas.',
      features: ['Formal', 'Anexos permitidos', 'Histórico por escrito'],
      action: 'Enviar email',
      color: 'from-orange-500 to-orange-600',
      iconColor: 'text-orange-600',
      bgGlow: 'bg-orange-50',
      borderColor: 'border-orange-200',
      availability: 'Respondemos em até 2 dias úteis',
      responseTime: 'Até 2 dias úteis'
    },
    {
      icon: Video,
      title: 'Videochamada',
      subtitle: 'Reunião online',
      description: 'Agende uma videochamada para discutir projetos com mais detalhes ou fazer demonstrações.',
      features: ['Google Meet', 'Agendamento prévio', '30-45 minutos'],
      action: 'Agendar reunião',
      color: 'from-amber-500 to-amber-600',
      iconColor: 'text-amber-600',
      bgGlow: 'bg-amber-50',
      borderColor: 'border-amber-200',
      availability: 'Segunda a Sexta, horário a combinar',
      responseTime: 'Agendamento em 2 dias úteis'
    }
  ], []);

  // Service info - neutral
  const serviceCommitments = useMemo(() => [
    {
      icon: Clock,
      metric: '1-2d',
      label: 'Prazo de resposta',
      detail: 'Em horário comercial'
    },
    {
      icon: Shield,
      metric: 'LGPD',
      label: 'Privacidade',
      detail: 'NDA disponível se necessário'
    },
    {
      icon: CheckCircle2,
      metric: 'Gratuito',
      label: 'Primeira conversa',
      detail: 'Sem compromisso'
    },
    {
      icon: Calendar,
      metric: '2-3d',
      label: 'Proposta',
      detail: 'Após alinhamento inicial'
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
            Formas de contato
          </Badge>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Escolha o{' '}
            <span className="bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent">
              canal de contato
            </span>
          </h2>

          <p className="text-xl leading-relaxed text-slate-600">
            Você pode entrar em contato por telefone, WhatsApp, email ou videochamada.
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
            <span className="text-sm text-slate-600 font-semibold">Chat ao vivo - Em breve</span>
          </div>
        </motion.div>

        {/* Service Commitments - Institutional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden border-2 border-slate-200 bg-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="mb-6 text-center text-xl font-bold text-slate-900">
                Informações do atendimento
              </h3>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-md">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="mb-2 text-xl font-bold text-rose-600">
                        {commitment.metric}
                      </div>
                      <div className="mb-1 text-sm font-semibold text-slate-900">
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
