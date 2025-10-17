/**
 * AGENDAMENTOS HERO - Versão Premium COMPLETA
 * 
 * Design principles:
 * 1. Conteúdo substancial (não oversized)
 * 2. Gradientes sutis e profissionais
 * 3. Orquestração igual ao /jpcardozx hero
 * 4. Copy maduro e factual
 * 5. Sem elementos decorativos inúteis
 */

'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { ParticleBackground } from '@/components/effects/ParticleBackground'

interface AgendamentosHeroProps {
  onStartBooking: () => void
}

export function AgendamentosHero({ onStartBooking }: AgendamentosHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Particle Background - Sutil */}
      <ParticleBackground 
        variant="subtle"
        density={60}
      />

      {/* Background Gradient - SUTIL, não exagerado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      
      {/* Grid Pattern - Muito sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="container relative z-10 px-6 py-20 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge className="px-4 py-2 text-sm bg-blue-600/10 border-blue-600/30 text-blue-300">
                <Calendar className="w-4 h-4 mr-2" />
                Sistema de Agendamento
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Sessões técnicas de análise e planejamento estratégico
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-slate-300 leading-relaxed"
            >
              Diagnóstico técnico, auditoria de código ou suporte especializado para sprints. 
              Agende online com confirmação automática.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-3"
            >
              {[
                'Sessões remotas ou presenciais',
                'Entrega de relatório técnico detalhado',
                'Confirmação em até 24 horas'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={onStartBooking}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-600/20"
              >
                Ver Tipos de Sessão
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const section = document.getElementById('consultorias')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="border-slate-700 text-slate-200 hover:bg-slate-800"
              >
                Como Funciona
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-800/50 bg-slate-900/50 p-8">
              {/* Stats Grid */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Disponibilidade
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Duração</span>
                    </div>
                    <p className="text-2xl font-bold text-white">60-120 min</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Agendamento</span>
                    </div>
                    <p className="text-2xl font-bold text-white">Online</p>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300">3 Tipos de Sessão:</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Diagnóstico Digital (60min)</li>
                    <li>• Auditoria de Código (90min)</li>
                    <li>• Suporte Técnico Sprint (personalizado)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
