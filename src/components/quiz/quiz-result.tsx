'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Shield, 
  BarChart3,
  ShoppingCart,
  Layers,
  ArrowRight,
  Download,
  Calendar,
  CheckCircle2,
} from 'lucide-react'
import { QuizResult as QuizResultType, BusinessVertical } from '@/types/quiz'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface QuizResultProps {
  result: QuizResultType
  onDownloadReport: () => void
  onScheduleCall: () => void
}

const VERTICAL_ICONS: Record<BusinessVertical, React.ComponentType<any>> = {
  performance: Zap,
  marketing: TrendingUp,
  analytics: BarChart3,
  ecommerce: ShoppingCart,
  'tech-stack': Layers,
  security: Shield,
  growth: Target,
}

const LEAD_SCORE_CONFIG = {
  qualified: {
    label: 'Lead Qualificado',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-950',
    description: 'Excelente fit! Você tem grande potencial de crescimento.',
  },
  hot: {
    label: 'Lead Quente',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
    description: 'Ótimo momento para investir em transformação digital.',
  },
  warm: {
    label: 'Lead Morno',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950',
    description: 'Oportunidades identificadas para evolução gradual.',
  },
  cold: {
    label: 'Lead Frio',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
    description: 'Fase de pesquisa e planejamento inicial.',
  },
}

export function QuizResult({ result, onDownloadReport, onScheduleCall }: QuizResultProps) {
  const { profile, recommendations, nextSteps } = result
  const scoreConfig = LEAD_SCORE_CONFIG[profile.leadScore]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header - Score */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 text-white mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold">{profile.score}</div>
            <div className="text-sm opacity-90">pontos</div>
          </div>
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Diagnóstico Completo
          </h1>
          <p className="text-muted-foreground mt-2">
            Análise personalizada para {profile.name || 'sua empresa'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Badge className={cn('text-sm px-4 py-1', scoreConfig.bgColor, scoreConfig.color)}>
            {scoreConfig.label}
          </Badge>
          {profile.urgencyLevel === 'high' && (
            <Badge variant="destructive" className="text-sm px-4 py-1">
              Alta Urgência
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {scoreConfig.description}
        </p>
      </div>

      <Separator />

      {/* Verticais Identificadas */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Áreas Prioritárias</h2>
          <p className="text-muted-foreground">
            Identificamos {recommendations.length} verticais estratégicas para seu negócio
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec, index) => {
            const Icon = VERTICAL_ICONS[rec.vertical]
            return (
              <motion.div
                key={rec.vertical}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">{rec.title}</h3>
                          <Badge
                            variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs mt-1"
                          >
                            {rec.priority === 'high' && 'Alta'}
                            {rec.priority === 'medium' && 'Média'}
                            {rec.priority === 'low' && 'Baixa'} Prioridade
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {rec.description}
                    </p>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Impacto Estimado
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {rec.estimatedImpact}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Serviços Recomendados
                      </div>
                      <ul className="space-y-1">
                        {rec.services.slice(0, 3).map((service, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-3 w-3 text-primary" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Próximos Passos */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Próximos Passos</h2>
          <p className="text-muted-foreground">
            Recomendações personalizadas para sua jornada
          </p>
        </div>

        <div className="grid gap-4">
          {nextSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <Button asChild>
                    <a href={step.href}>
                      {step.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      {/* CTAs Principais */}
      <div className="grid gap-4 md:grid-cols-2">
        <Button size="lg" onClick={onDownloadReport} variant="outline" className="h-auto py-4">
          <div className="flex flex-col items-center gap-2">
            <Download className="h-6 w-6" />
            <div>
              <div className="font-bold">Baixar Relatório Completo</div>
              <div className="text-xs text-muted-foreground">PDF com análise detalhada</div>
            </div>
          </div>
        </Button>

        <Button size="lg" onClick={onScheduleCall} className="h-auto py-4">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="h-6 w-6" />
            <div>
              <div className="font-bold">Agendar Consultoria</div>
              <div className="text-xs opacity-90">15 minutos com especialista</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          Este diagnóstico foi gerado automaticamente com base nas suas respostas.
          Para uma análise técnica aprofundada, recomendamos agendar uma consultoria.
        </p>
      </div>
    </motion.div>
  )
}
