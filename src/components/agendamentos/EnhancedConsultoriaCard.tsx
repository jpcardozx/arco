/**
 * Enhanced Consultoria Card - World-class interactions
 * Features: Layout animations, card flip, hover effects, drag to compare
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon, CheckCircle2, Clock, DollarSign, ArrowRight, Info, Star } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { spring, hover, tap, card as cardAnimations } from '@/lib/agendamentos/animations'
import { ConsultoriaCardData } from '@/types/agendamentos'
import { featureIcons } from '@/lib/agendamentos/assets'

interface EnhancedConsultoriaCardProps {
  consultoria: ConsultoriaCardData
  onSelect: (id: string) => void
  isRecommended?: boolean
  isSelected?: boolean
  showComparison?: boolean
}

export function EnhancedConsultoriaCard({
  consultoria,
  onSelect,
  isRecommended = false,
  isSelected = false,
  showComparison = false
}: EnhancedConsultoriaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const Icon = consultoria.icon
  const priceFormatted = (consultoria.price_cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={spring.smooth}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
      style={{ perspective: '1000px' }}
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
            <Badge className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
              ⭐ Recomendado para você
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Container with flip animation */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ 
          transformStyle: 'preserve-3d',
          position: 'relative'
        }}
        className="w-full h-full"
      >
        {/* Front Side */}
        <motion.div
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <Card
            className={cn(
              "relative overflow-hidden border-2 transition-all duration-300 cursor-pointer h-full",
              isSelected && "border-blue-600 shadow-lg shadow-blue-500/20",
              isHovered && "shadow-2xl",
              !isSelected && "hover:border-blue-400"
            )}
            onClick={() => !isFlipped && onSelect(consultoria.id)}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${consultoria.color}15, ${consultoria.color}05)`,
              }}
            />

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={isHovered ? {
                boxShadow: [
                  `0 0 0 0 ${consultoria.color}00`,
                  `0 0 20px 10px ${consultoria.color}20`,
                  `0 0 0 0 ${consultoria.color}00`,
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            <CardContent className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${consultoria.color}20` }}
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: consultoria.color }}
                  />
                </motion.div>

                {/* Badge */}
                {consultoria.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={spring.bouncy}
                  >
                    <Badge 
                      variant="secondary"
                      className={cn(
                        consultoria.badgeColor === 'blue' && 'bg-blue-100 text-blue-700',
                        consultoria.badgeColor === 'purple' && 'bg-purple-100 text-purple-700',
                        consultoria.badgeColor === 'green' && 'bg-green-100 text-green-700',
                        consultoria.badgeColor === 'orange' && 'bg-orange-100 text-orange-700'
                      )}
                    >
                      {consultoria.badge}
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {consultoria.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                  {consultoria.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400"
                >
                  <Clock className="w-4 h-4" />
                  <span>{consultoria.duration_minutes} min</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 font-semibold"
                  style={{ color: consultoria.color }}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{priceFormatted}</span>
                </motion.div>

                {consultoria.stats && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 text-amber-600"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span>{consultoria.stats.average_rating}</span>
                  </motion.div>
                )}
              </div>

              {/* Features preview (3 items) */}
              <div className="space-y-2">
                {consultoria.features.included.slice(0, 3).map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 
                      className="w-4 h-4 flex-shrink-0" 
                      style={{ color: consultoria.color }}
                    />
                    <span>{feature}</span>
                  </motion.div>
                ))}
                
                {consultoria.features.included.length > 3 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsFlipped(true)
                    }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-2"
                  >
                    <Info className="w-3 h-3" />
                    Ver todos os benefícios
                  </motion.button>
                )}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.02 },
                  tap: { scale: 0.98 }
                }}
              >
                <Button
                  className="w-full group/btn"
                  style={{ 
                    backgroundColor: consultoria.color,
                    color: 'white'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(consultoria.id)
                  }}
                >
                  <span>Selecionar</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.span>
                </Button>
              </motion.div>

              {/* Next available slot */}
              {consultoria.stats?.next_available && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center text-slate-500 dark:text-slate-400"
                >
                  Próximo horário: {consultoria.stats.next_available}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Side (All features) */}
        <motion.div
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            rotateY: 180
          }}
        >
          <Card className="h-full border-2 border-blue-400">
            <CardContent className="p-6 space-y-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-bold">O que está incluído</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFlipped(false)
                  }}
                >
                  Voltar
                </Button>
              </div>

              {/* All features */}
              <div className="flex-1 overflow-y-auto space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">✅ Incluído</p>
                  {consultoria.features.included.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2 text-sm mb-2"
                    >
                      <CheckCircle2 
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" 
                      />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {consultoria.features.not_included && consultoria.features.not_included.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">❌ Não incluído</p>
                    {consultoria.features.not_included.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm mb-2 opacity-60">
                        <span className="text-slate-400">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <Button
                className="w-full"
                style={{ backgroundColor: consultoria.color }}
                onClick={() => onSelect(consultoria.id)}
              >
                Selecionar esta consultoria
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Consultant preview (if available) */}
      {consultoria.consultant && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-16 left-0 right-0 z-20"
            >
              <Card className="p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-2">
                <div className="flex items-center gap-3">
                  <img
                    src={consultoria.consultant.avatar_url}
                    alt={consultoria.consultant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {consultoria.consultant.name}
                    </p>
                    <p className="text-xs text-slate-600 truncate">
                      {consultoria.consultant.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-semibold">
                      {consultoria.consultant.rating}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
