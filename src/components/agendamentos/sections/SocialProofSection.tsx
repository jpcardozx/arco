/**
 * Social Proof Section - Agendamentos
 * Depoimentos reais e cases de sucesso
 * Design: Bento grid com animações sutis e glassmorphism
 */

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Star, 
  Quote,
  TrendingUp,
  Target,
  Zap,
  Award,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  metric?: {
    label: string
    value: string
    icon: typeof TrendingUp
  }
  consultoria: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Silva',
    role: 'CTO',
    company: 'TechStart Brasil',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: 'A auditoria técnica identificou os principais gargalos de performance. Após implementação das recomendações, o tempo de carregamento foi reduzido de 4.2s para 1.1s.',
    rating: 5,
    metric: {
      label: 'Melhoria LCP',
      value: '-73%',
      icon: TrendingUp
    },
    consultoria: 'Auditoria Técnica Avançada'
  },
  {
    name: 'Mariana Costa',
    role: 'Head of Growth',
    company: 'E-commerce Plus',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'A consultoria de tráfego reestruturou nossa estratégia de Google Ads. CAC foi reduzido em 40% e o ROAS aumentou significativamente nos 90 dias seguintes.',
    rating: 5,
    metric: {
      label: 'ROI Real',
      value: '65x',
      icon: Target
    },
    consultoria: 'Otimização de Tráfego Pago'
  },
  {
    name: 'Pedro Oliveira',
    role: 'Founder',
    company: 'SaaS Inovação',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'O diagnóstico digital forneceu um plano de ação detalhado. Implementamos a maior parte das recomendações e obtivemos melhorias mensuráveis em performance.',
    rating: 5,
    metric: {
      label: 'Score Lighthouse',
      value: '42→94',
      icon: Zap
    },
    consultoria: 'Diagnóstico Digital'
  }
]

const stats = [
  { value: '15+', label: 'Projetos realizados', icon: Award },
  { value: '90%', label: 'Taxa de conclusão', icon: CheckCircle2 },
  { value: '4.7/5', label: 'Avaliação média', icon: Star },
  { value: '60 dias', label: 'Prazo médio', icon: TrendingUp }
]

export function SocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Projetos Anteriores
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Resultados Obtidos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Exemplos de implementações realizadas e seus respectivos resultados
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Testimonials Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <Card className="relative overflow-hidden border-0 bg-slate-800/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardContent className="p-6 text-center">
          <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-slate-400">
            {stat.label}
          </div>
        </CardContent>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  )
}

function TestimonialCard({ 
  testimonial, 
  index 
}: { 
  testimonial: Testimonial
  index: number 
}) {
  const MetricIcon = testimonial.metric?.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative",
        index === 0 && "lg:col-span-2 lg:row-span-1"
      )}
    >
      <Card className="relative h-full overflow-hidden border-0 bg-slate-800/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardContent className="p-8 h-full flex flex-col">
          {/* Quote icon */}
          <Quote className="w-10 h-10 text-emerald-500/20 mb-4" />

          {/* Content */}
          <p className="text-slate-300 leading-relaxed mb-6 flex-grow">
            "{testimonial.content}"
          </p>

          {/* Author info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-emerald-500/20">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-400">
                  {testimonial.role} • {testimonial.company}
                </div>
                
                {/* Rating stars */}
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Metric badge */}
            {testimonial.metric && MetricIcon && (
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1">
                <MetricIcon className="w-3 h-3" />
                <span className="font-bold">{testimonial.metric.value}</span>
              </Badge>
            )}
          </div>

          {/* Consultoria tag */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <span className="text-xs text-slate-500">
              {testimonial.consultoria}
            </span>
          </div>
        </CardContent>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  )
}
