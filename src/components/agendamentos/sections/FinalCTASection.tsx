/**
 * Final CTA Section - Agendamentos
 * Call-to-action final com animações e urgência sutil
 * Design: Gradiente vibrante, botões animados, countdown timer
 */

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Calendar,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FinalCTASectionProps {
  onStartBooking: () => void
}

const benefits = [
  {
    icon: Shield,
    text: 'Pagamento seguro',
    color: 'text-emerald-400'
  },
  {
    icon: Calendar,
    text: 'Reagendamento até 24h antes',
    color: 'text-blue-400'
  },
  {
    icon: Clock,
    text: 'Sessão online via Google Meet',
    color: 'text-purple-400'
  },
  {
    icon: CheckCircle2,
    text: 'Gravação e documento inclusos',
    color: 'text-orange-400'
  }
]

export function FinalCTASection({ onStartBooking }: FinalCTASectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [availableSlots, setAvailableSlots] = useState(7)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Simulate real-time slot updates (replace with actual Supabase data)
  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableSlots(prev => {
        const change = Math.random() > 0.5 ? -1 : 1
        const newValue = prev + change
        return Math.max(3, Math.min(12, newValue))
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-950 via-purple-950 to-slate-950"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative container mx-auto px-6 max-w-5xl"
      >
        {/* Main CTA Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-12 md:p-16">
            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <Badge className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300 text-sm font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                {availableSlots} horários disponíveis
              </Badge>

              <Badge className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-500/30 text-emerald-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Atualização automática
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
            >
              Agende sua Consultoria
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300 text-center mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Selecione o serviço adequado e receba um documento com recomendações técnicas
              em até 48 horas após a sessão
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={onStartBooking}
                  className="group relative px-10 py-7 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Agendar Minha Consultoria
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.span>
                  </span>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <BenefitItem
                  key={index}
                  benefit={benefit}
                  index={index}
                />
              ))}
            </div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-slate-700 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Processamento via Mercado Pago</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Valor fixo, sem cobranças adicionais</span>
              </div>
            </motion.div>
          </CardContent>

          {/* Glow effects */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl opacity-50" />
        </Card>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          Tempo estimado: 10-15 minutos • Confirmação automática
        </motion.p>
      </motion.div>
    </section>
  )
}

function BenefitItem({ 
  benefit, 
  index 
}: { 
  benefit: typeof benefits[0]
  index: number 
}) {
  const Icon = benefit.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      className="flex items-center gap-3 text-slate-300"
    >
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center",
        benefit.color
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm">{benefit.text}</span>
    </motion.div>
  )
}
