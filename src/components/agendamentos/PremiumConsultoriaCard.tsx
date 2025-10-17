/**
 * PREMIUM CONSULTORIA CARD - S-Tier Quality
 * 
 * Glassmorphism sofisticado inspirado no PremiumHeroSection
 * Design premium consistente com /jpcardozx
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon, CheckCircle2, Clock, DollarSign, ArrowRight, Star, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, designTokens } from '@/design-system/tokens'
import { ConsultoriaCardData } from '@/types/agendamentos'

interface PremiumConsultoriaCardProps {
  consultoria: ConsultoriaCardData
  onSelect: (id: string) => void
  isRecommended?: boolean
}

/**
 * Premium Glass Card Base
 */
const GlassCardBase = ({
  children,
  className = "",
  isHovered = false
}: {
  children: React.ReactNode
  className?: string
  isHovered?: boolean
}) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    className={cn(
      "relative backdrop-blur-xl rounded-2xl overflow-hidden",
      className
    )}
    style={{
      background: `linear-gradient(135deg,
        rgba(255,255,255,${isHovered ? 0.14 : 0.12}) 0%,
        rgba(255,255,255,${isHovered ? 0.08 : 0.06}) 50%,
        rgba(0,0,0,${isHovered ? 0.12 : 0.1}) 100%)`,
      boxShadow: isHovered
        ? `0 24px 48px rgba(0,0,0,0.5),
           0 12px 24px rgba(0,0,0,0.4),
           0 0 0 1px rgba(255,255,255,0.12),
           inset 0 1px 0 rgba(255,255,255,0.18)`
        : `0 20px 40px rgba(0,0,0,0.4),
           0 10px 20px rgba(0,0,0,0.3),
           0 0 0 1px rgba(255,255,255,0.08),
           inset 0 1px 0 rgba(255,255,255,0.15)`,
      transition: 'all 0.3s ease'
    }}
  >
    {children}
  </motion.div>
)

export function PremiumConsultoriaCard({
  consultoria,
  onSelect,
  isRecommended = false
}: PremiumConsultoriaCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const Icon = consultoria.icon
  const durationText = consultoria.duration_minutes > 0 
    ? `${consultoria.duration_minutes} min` 
    : 'Personalizado'

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
      <AnimatePresence>
        {isRecommended && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
          >
            <Badge 
              className="px-4 py-1.5 text-sm font-semibold shadow-lg"
              style={{
                background: `linear-gradient(135deg, #3b82f6, #2563eb)`,
                color: 'white',
                border: 'none'
              }}
            >
              ⭐ Recomendado
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCardBase isHovered={isHovered}>
        {/* Subtle accent border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg,
              ${consultoria.color}20,
              ${consultoria.color}10)`,
            padding: '1px',
            WebkitMaskImage: 'linear-gradient(white, white)',
            maskImage: 'linear-gradient(white, white)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
            opacity: isHovered ? 1 : 0.6,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* Animated glow on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${consultoria.color}15, transparent 70%)`
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="p-3 rounded-xl"
              style={{
                background: `${consultoria.color}20`,
                boxShadow: `0 4px 12px ${consultoria.color}30`
              }}
            >
              <Icon 
                className="w-7 h-7" 
                style={{ color: consultoria.color }}
              />
            </motion.div>

            {/* Badge */}
            {consultoria.badge && (
              <Badge 
                className="text-xs font-semibold px-3 py-1"
                style={{
                  background: `${consultoria.color}20`,
                  color: consultoria.color,
                  border: `1px solid ${consultoria.color}40`
                }}
              >
                {consultoria.badge}
              </Badge>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
              style={{
                backgroundImage: isHovered ? `linear-gradient(135deg, ${consultoria.color}, ${consultoria.color}dd)` : undefined
              }}
            >
              {consultoria.name}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {consultoria.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-sm">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: `${consultoria.color}15`,
                border: `1px solid ${consultoria.color}30`
              }}
            >
              <Clock className="w-4 h-4" style={{ color: consultoria.color }} />
              <span className="font-medium" style={{ color: consultoria.color }}>{durationText}</span>
            </motion.div>
          </div>

          {/* Features Preview */}
          <div className="space-y-2">
            {consultoria.features.included.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 text-sm"
              >
                <CheckCircle2 
                  className="w-4 h-4 flex-shrink-0 mt-0.5" 
                  style={{ color: consultoria.color }}
                />
                <span className="text-neutral-300">{feature}</span>
              </motion.div>
            ))}
            
            {consultoria.features.included.length > 3 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-xs font-medium mt-3 px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  color: consultoria.color,
                  background: `${consultoria.color}10`,
                  border: `1px solid ${consultoria.color}30`
                }}
              >
                {isExpanded ? 'Ver menos' : `+${consultoria.features.included.length - 3} benefícios`}
              </motion.button>
            )}
          </div>

          {/* Expanded Features */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pt-2 border-t"
                style={{ borderColor: `${consultoria.color}20` }}
              >
                {consultoria.features.included.slice(3).map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 
                      className="w-4 h-4 flex-shrink-0 mt-0.5" 
                      style={{ color: consultoria.color }}
                    />
                    <span className="text-neutral-300">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button Premium */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              className="w-full group/btn relative overflow-hidden py-5 text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${consultoria.color}, ${consultoria.color}dd)`,
                boxShadow: `0 8px 24px ${consultoria.color}40`,
                color: 'white'
              }}
              onClick={() => onSelect(consultoria.id)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Selecionar Sessão
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </Button>
          </motion.div>

          {/* Consultant Info */}
          {consultoria.consultant && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 pt-2 px-4 py-3 rounded-xl"
              style={{
                background: `${designTokens.colors.neutral[800]}40`,
                border: `1px solid ${designTokens.colors.neutral[700]}30`
              }}
            >
              <img
                src={consultoria.consultant.avatar_url}
                alt={consultoria.consultant.name}
                className="w-10 h-10 rounded-full object-cover border-2"
                style={{ borderColor: `${consultoria.color}40` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {consultoria.consultant.name}
                </p>
                <p className="text-xs text-neutral-400 truncate">
                  {consultoria.consultant.title}
                </p>
              </div>
              <div className="flex items-center gap-1" style={{ color: consultoria.color }}>
                <Users className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Especialista</span>
              </div>
            </motion.div>
          )}
        </div>
      </GlassCardBase>
    </motion.div>
  )
}
