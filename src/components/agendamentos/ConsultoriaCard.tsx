'use client'

import { motion } from 'framer-motion'
import { Check, Clock, DollarSign, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Consultoria {
  id: string
  name: string
  icon: any
  color: string
  price: number
  duration: number
  description: string
  features: string[]
  idealFor: string[]
  badge?: string
  badgeColor?: string
}

interface ConsultoriaCardProps {
  consultoria: Consultoria
  onSelect: () => void
  isRecommended?: boolean
}

export function ConsultoriaCard({
  consultoria,
  onSelect,
  isRecommended = false
}: ConsultoriaCardProps) {
  const Icon = consultoria.icon

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Card 
        className={cn(
          "relative h-full flex flex-col overflow-hidden transition-all",
          isRecommended && "ring-2 ring-blue-500 shadow-xl shadow-blue-500/20"
        )}
        style={{
          borderTop: `4px solid ${consultoria.color}`
        }}
      >
        {/* Recommended Badge */}
        {isRecommended && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Recomendado
            </Badge>
          </div>
        )}

        {/* Regular Badge */}
        {consultoria.badge && !isRecommended && (
          <div className="absolute top-4 right-4">
            <Badge 
              variant="secondary"
              className={cn(
                consultoria.badgeColor === 'blue' && "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
                consultoria.badgeColor === 'purple' && "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
              )}
            >
              {consultoria.badge}
            </Badge>
          </div>
        )}

        <CardHeader className="pb-4">
          {/* Icon */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: `linear-gradient(135deg, ${consultoria.color}20, ${consultoria.color}10)`
            }}
          >
            <Icon className="w-7 h-7" style={{ color: consultoria.color }} />
          </div>

          {/* Title & Description */}
          <CardTitle className="text-2xl mb-2">{consultoria.name}</CardTitle>
          <CardDescription className="text-base">
            {consultoria.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-6">
          {/* Price & Duration */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  R$ {consultoria.price.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Pagamento único
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{consultoria.duration} min</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              O que está incluso
            </h4>
            <ul className="space-y-2">
              {consultoria.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-slate-600 dark:text-slate-400">
              Ideal para:
            </h4>
            <div className="flex flex-wrap gap-2">
              {consultoria.idealFor.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-6 border-t">
          <Button
            className="w-full text-base py-6"
            style={{
              background: `linear-gradient(135deg, ${consultoria.color}, ${consultoria.color}dd)`
            }}
            onClick={onSelect}
          >
            Selecionar Consultoria
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
