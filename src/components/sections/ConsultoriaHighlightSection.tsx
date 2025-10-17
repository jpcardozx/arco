/**
 * Consultoria Highlight Section - Homepage
 * Seção que promove o sistema de agendamentos na página inicial
 * Design: Dark mode, glassmorphism, animações sutis
 */

'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  ArrowRight,
  Code,
  Target,
  Search,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const consultingTypes = [
  {
    icon: Search,
    title: 'Diagnóstico Digital',
    description: 'Análise detalhada de performance web, métricas Core Web Vitals, SEO técnico e oportunidades de otimização identificadas.',
    duration: '60 min',
    topics: ['Performance', 'SEO técnico', 'Core Web Vitals', 'Plano de ação'],
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-400'
  },
  {
    icon: Code,
    title: 'Auditoria de Código',
    description: 'Revisão técnica de arquitetura, padrões de desenvolvimento, segurança, performance e manutenibilidade do sistema.',
    duration: '90 min',
    topics: ['Arquitetura', 'Segurança', 'Performance', 'Boas práticas'],
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400'
  },
  {
    icon: Target,
    title: 'Estratégia de Tráfego',
    description: 'Análise e otimização de campanhas Google Ads e Meta Ads, estrutura de contas, segmentação e métricas de conversão.',
    duration: '90 min',
    topics: ['Google Ads', 'Meta Ads', 'ROAS', 'Otimização'],
    color: 'from-orange-500 to-amber-500',
    textColor: 'text-orange-400'
  }
]

export function ConsultoriaHighlightSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 border-blue-700/50 bg-blue-900/30 text-blue-300">
              <Calendar className="w-4 h-4 mr-2" />
              Agende seu Horário
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Sessões para {' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                análise e planejamento
              </span>
            </h2>

            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Sessões individuais focadas em diagnóstico, análise de oportunidades e definição de planos de ação. 
              Sistema de agendamento online com confirmação automática.
            </p>
          </motion.div>
        </div>

        {/* Consulting Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {consultingTypes.map((type, index) => (
            <ConsultingCard key={index} type={type} index={index} />
          ))}
        </div>

        {/* Process Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <ProcessStep
              number="1"
              title="Agendamento"
              description="Escolha o tipo de sessão e selecione data e horário disponível no calendário online."
              color="from-blue-500 to-cyan-500"
            />
            <ProcessStep
              number="2"
              title="Preparação"
              description="Receba confirmação por email com detalhes da sessão e orientações sobre materiais necessários."
              color="from-emerald-500 to-teal-500"
            />
            <ProcessStep
              number="3"
              title="Sessão e Entrega"
              description="Participe da sessão de análise e receba documento com diagnóstico e recomendações práticas."
              color="from-orange-500 to-amber-500"
            />
          </div>
        </motion.div>

        {/* CTA with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="max-w-4xl mx-auto bg-slate-800/40 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Agende uma sessão de análise
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Escolha o tipo de sessão mais adequado para suas necessidades e agende um horário conveniente através do sistema online.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/agendamentos" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Ver Horários Disponíveis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Confirmação automática</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Agendamento online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Sessões remotas ou presenciais</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessStep({
  number,
  title,
  description,
  color
}: {
  number: string
  title: string
  description: string
  color: string
}) {
  return (
    <div className="relative group">
      <div className="text-center">
        {/* Number badge */}
        <div className="inline-flex items-center justify-center mb-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl bg-gradient-to-r flex items-center justify-center",
            color
          )}>
            <span className="text-2xl font-bold text-white">{number}</span>
          </div>
        </div>
        
        {/* Content */}
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      {/* Connector line (hidden on last item) */}
      <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-slate-700 to-transparent group-last:hidden" />
    </div>
  )
}

function ConsultingCard({ 
  type, 
  index 
}: { 
  type: typeof consultingTypes[0]
  index: number 
}) {
  const Icon = type.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="relative h-full overflow-hidden border-0 bg-slate-800/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardContent className="p-8">
          {/* Icon */}
          <div className={cn(
            "inline-flex p-4 rounded-2xl bg-gradient-to-r mb-6",
            type.color
          )}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {type.title}
          </h3>

          <p className="text-slate-400 leading-relaxed mb-6">
            {type.description}
          </p>

          {/* Topics */}
          <div className="space-y-2 mb-6">
            {type.topics.map((topic, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className={cn("w-1.5 h-1.5 rounded-full", type.textColor.replace('text-', 'bg-'))} />
                <span className="text-slate-300">{topic}</span>
              </div>
            ))}
          </div>

          {/* Duration */}
          <div className="pt-6 border-t border-slate-700">
            <Badge className={cn(
              "bg-slate-900 border-slate-700",
              type.textColor
            )}>
              Duração: {type.duration}
            </Badge>
          </div>
        </CardContent>

        {/* Hover glow */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500",
          type.color
        )} />
      </Card>
    </motion.div>
  )
}
