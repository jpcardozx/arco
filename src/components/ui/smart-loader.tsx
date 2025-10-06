// Smart Loading States System
// File: /src/components/ui/smart-loader.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingStage {
  id: string
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  estimatedTime?: number // in seconds
}

interface SmartLoaderProps {
  isLoading: boolean
  stages: LoadingStage[]
  currentStage: number
  error?: string
  success?: boolean
  showProgress?: boolean
  showTimer?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: {
    container: 'p-4',
    icon: 'w-8 h-8',
    title: 'text-sm',
    description: 'text-xs',
    dot: 'w-1.5 h-1.5'
  },
  md: {
    container: 'p-6',
    icon: 'w-12 h-12',
    title: 'text-lg',
    description: 'text-sm',
    dot: 'w-2 h-2'
  },
  lg: {
    container: 'p-8',
    icon: 'w-16 h-16',
    title: 'text-xl',
    description: 'text-base',
    dot: 'w-2.5 h-2.5'
  }
}

export function SmartLoader({
  isLoading,
  stages,
  currentStage,
  error,
  success = false,
  showProgress = true,
  showTimer = false,
  size = 'md',
  className
}: SmartLoaderProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  
  const { container, icon, title, description, dot } = sizeMap[size]
  const progress = ((currentStage) / stages.length) * 100
  const currentStageData = stages[currentStage - 1]

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
      
      return () => clearInterval(timer)
    } else {
      setElapsedTime(0)
    }
  }, [isLoading])

  useEffect(() => {
    const total = stages.reduce((sum, stage) => sum + (stage.estimatedTime || 2), 0)
    setEstimatedTotal(total)
  }, [stages])

  if (!isLoading && !error && !success) {
    return null
  }

  return (
    <div className={cn(
      'flex flex-col items-center text-center max-w-md mx-auto',
      container,
      className
    )}>
      {/* Main Icon/Progress Ring */}
      <div className="relative mb-6">
        {error ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className={cn(
              'bg-red-500/20 rounded-full flex items-center justify-center',
              icon
            )}>
              <AlertCircle className={cn('text-red-400', 
                size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'
              )} />
            </div>
          </motion.div>
        ) : success ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className={cn(
              'bg-green-500/20 rounded-full flex items-center justify-center',
              icon
            )}>
              <CheckCircle2 className={cn('text-green-400',
                size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'
              )} />
            </div>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Progress Ring */}
            {showProgress && (
              <svg
                className={cn('transform -rotate-90', icon)}
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/10"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100)
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <Loader2 className={cn('text-teal-400',
                  size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'
                )} />
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Current Stage Info */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h3 className={cn('font-semibold text-red-400 mb-2', title)}>
              Ops! Algo deu errado
            </h3>
            <p className={cn('text-red-300/80', description)}>
              {error}
            </p>
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h3 className={cn('font-semibold text-green-400 mb-2', title)}>
              Concluído com sucesso!
            </h3>
            <p className={cn('text-green-300/80', description)}>
              Processo finalizado em {elapsedTime}s
            </p>
          </motion.div>
        ) : currentStageData ? (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h3 className={cn('font-semibold text-white mb-2', title)}>
              {currentStageData.title}
            </h3>
            <p className={cn('text-white/60 mb-4', description)}>
              {currentStageData.description}
            </p>
            
            {/* Timer */}
            {showTimer && (
              <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                <Clock className="w-3 h-3" />
                <span>{elapsedTime}s de ~{estimatedTotal}s</span>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Stage Indicators */}
      {!error && !success && stages.length > 1 && (
        <div className="flex items-center space-x-2 mt-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className={cn(
                'rounded-full transition-all duration-300',
                dot,
                index < currentStage 
                  ? 'bg-teal-400' 
                  : index === currentStage 
                    ? 'bg-teal-400/60 scale-125' 
                    : 'bg-white/20'
              )}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentStage - 1 ? 1.25 : 1,
                backgroundColor: index < currentStage 
                  ? '#14b8a6'
                  : index === currentStage - 1
                    ? '#14b8a699'
                    : '#ffffff33'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      )}

      {/* Progress Text */}
      {!error && !success && showProgress && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-white/50">
            Etapa {currentStage} de {stages.length} • {Math.round(progress)}% concluído
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Preset loading stages for common operations
export const LoadingStages = {
  dataAnalysis: [
    {
      id: 'collecting',
      title: 'Coletando dados',
      description: 'Reunindo informações do seu site...',
      estimatedTime: 3
    },
    {
      id: 'analyzing',
      title: 'Analisando performance',
      description: 'Processando métricas de velocidade e UX...',
      estimatedTime: 5
    },
    {
      id: 'insights',
      title: 'Gerando insights',
      description: 'Criando recomendações personalizadas...',
      estimatedTime: 4
    },
    {
      id: 'finalizing',
      title: 'Finalizando',
      description: 'Preparando seu relatório...',
      estimatedTime: 2
    }
  ],
  
  optimization: [
    {
      id: 'scanning',
      title: 'Escaneando site',
      description: 'Verificando páginas e recursos...',
      estimatedTime: 4
    },
    {
      id: 'optimizing',
      title: 'Otimizando',
      description: 'Aplicando melhorias de performance...',
      estimatedTime: 8
    },
    {
      id: 'testing',
      title: 'Testando',
      description: 'Validando as otimizações...',
      estimatedTime: 3
    }
  ],
  
  report: [
    {
      id: 'gathering',
      title: 'Coletando dados',
      description: 'Reunindo métricas do período...',
      estimatedTime: 2
    },
    {
      id: 'processing',
      title: 'Processando',
      description: 'Calculando insights e tendências...',
      estimatedTime: 4
    },
    {
      id: 'generating',
      title: 'Gerando PDF',
      description: 'Criando seu relatório personalizado...',
      estimatedTime: 3
    }
  ]
}