/**
 * Process Timeline Section - Agendamentos
 * Seção que mostra o processo de agendamento passo a passo
 * Design: Dark mode first, gradientes sutis, Framer Motion + Parallax
 */

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  ClipboardList, 
  Calendar, 
  CreditCard, 
  Video,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProcessStep {
  number: string
  title: string
  description: string
  icon: typeof ClipboardList
  color: string
  gradient: string
  duration: string
  features: string[]
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Qualificação',
    description: 'Questionário breve para identificar necessidades e recomendar o serviço adequado',
    icon: ClipboardList,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    duration: '2-3 min',
    features: [
      'Formulário estruturado',
      'Sugestão de serviço',
      'Dados protegidos'
    ]
  },
  {
    number: '02',
    title: 'Seleção de Horário',
    description: 'Calendário com disponibilidade atualizada automaticamente',
    icon: Calendar,
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-pink-500/20',
    duration: '1-2 min',
    features: [
      'Horários disponíveis',
      'Fuso horário local',
      'Confirmação imediata'
    ]
  },
  {
    number: '03',
    title: 'Pagamento',
    description: 'Processamento via Mercado Pago com diferentes métodos',
    icon: CreditCard,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    duration: '2-3 min',
    features: [
      'PIX, cartão ou boleto',
      'Parcelamento em até 12x',
      'Conexão segura'
    ]
  },
  {
    number: '04',
    title: 'Sessão Online',
    description: 'Videochamada via Google Meet com materiais complementares',
    icon: Video,
    color: 'text-orange-400',
    gradient: 'from-orange-500/20 to-amber-500/20',
    duration: '60-120 min',
    features: [
      'Link por e-mail',
      'Gravação por 7 dias',
      'Documento de recomendações'
    ]
  }
]

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative container mx-auto px-6 max-w-7xl"
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Processo de Agendamento
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Etapas do Agendamento
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Sistema integrado com processamento automatizado e confirmação em tempo real
          </motion.p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50" />

          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">
              Tempo estimado: 10-15 minutos
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProcessStepCard({ 
  step, 
  index, 
  isEven 
}: { 
  step: ProcessStep
  index: number
  isEven: boolean 
}) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative lg:grid lg:grid-cols-2 lg:gap-12 items-center",
        isEven ? "lg:text-right" : "lg:text-left"
      )}
    >
      {/* Content */}
      <div className={cn(
        "space-y-6",
        isEven ? "lg:order-1" : "lg:order-2"
      )}>
        {/* Number badge */}
        <div className={cn(
          "inline-flex items-center gap-4",
          isEven ? "lg:flex-row-reverse" : ""
        )}>
          <span className={cn(
            "text-7xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            step.gradient
          )}>
            {step.number}
          </span>
          <Badge className={cn(
            "text-xs px-3 py-1",
            step.color,
            "bg-slate-800 border-slate-700"
          )}>
            {step.duration}
          </Badge>
        </div>

        <h3 className="text-3xl font-bold text-white">
          {step.title}
        </h3>

        <p className="text-lg text-slate-400 leading-relaxed">
          {step.description}
        </p>

        {/* Features list */}
        <ul className={cn(
          "space-y-3",
          isEven ? "lg:items-end" : "lg:items-start"
        )}>
          {step.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className={cn(
                "flex items-center gap-3 text-sm text-slate-400",
                isEven ? "lg:flex-row-reverse lg:justify-end" : ""
              )}
            >
              <CheckCircle2 className={cn("w-4 h-4", step.color)} />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Icon Card */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: isEven ? -2 : 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "order-1 mb-8 lg:mb-0",
          isEven ? "lg:order-2" : "lg:order-1"
        )}
      >
        <Card className={cn(
          "relative overflow-hidden border-0 bg-gradient-to-br",
          step.gradient,
          "backdrop-blur-xl shadow-2xl"
        )}>
          <CardContent className="p-12 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Icon className={cn("w-24 h-24", step.color)} strokeWidth={1.5} />
            </motion.div>
          </CardContent>

          {/* Glow effect */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-50 blur-xl",
            step.gradient
          )} />
        </Card>
      </motion.div>

      {/* Timeline dot */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={cn(
            "w-4 h-4 rounded-full border-4 border-slate-900",
            step.color.replace('text-', 'bg-')
          )}
        />
      </div>
    </motion.div>
  )
}
