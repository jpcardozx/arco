/**
 * CONSULTORIA CARDS - Versão Premium COM SUBSTÂNCIA
 * 
 * Design principles:
 * 1. Tamanho adequado (não oversized)
 * 2. Conteúdo real e informativo
 * 3. Gradientes sutis
 * 4. Hover states elegantes
 * 5. Typography profissional
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface SessionType {
  id: string
  name: string
  icon: LucideIcon
  duration: string
  description: string
  ideal_for: string[]
  includes: string[]
  color: string
  badge?: string
  badgeColor?: 'blue' | 'green' | 'purple' | 'orange'
}

interface ConsultoriaCardV2Props {
  session: SessionType
  onSelect: (id: string) => void
  isRecommended?: boolean
}

const badgeColors = {
  blue: 'bg-blue-600/10 border-blue-600/30 text-blue-300',
  green: 'bg-green-600/10 border-green-600/30 text-green-300',
  purple: 'bg-purple-600/10 border-purple-600/30 text-purple-300',
  orange: 'bg-orange-600/10 border-orange-600/30 text-orange-300'
}

export function ConsultoriaCardV2({
  session,
  onSelect,
  isRecommended = false
}: ConsultoriaCardV2Props) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = session.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white shadow-lg">
            Recomendado
          </Badge>
        </div>
      )}

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="relative h-full backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800/50 bg-slate-900/50"
        style={{
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(148,163,184,0.1)'
            : '0 10px 20px rgba(0,0,0,0.2)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div 
              className="p-3 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${session.color}20, ${session.color}10)`,
                border: `1px solid ${session.color}30`
              }}
            >
              <Icon className="w-6 h-6" style={{ color: session.color }} />
            </div>

            {/* Title & Duration */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {session.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{session.duration}</span>
              </div>
            </div>

            {/* Badge */}
            {session.badge && session.badgeColor && (
              <Badge className={badgeColors[session.badgeColor]}>
                {session.badge}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            {session.description}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ideal For */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
              Ideal para
            </h4>
            <ul className="space-y-2">
              {session.ideal_for.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
              O que inclui
            </h4>
            <ul className="space-y-2">
              {session.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800/50">
          <Button
            onClick={() => onSelect(session.id)}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Ver Horários Disponíveis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
