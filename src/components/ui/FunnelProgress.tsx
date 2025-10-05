'use client';

/**
 * FUNNEL PROGRESS INDICATOR
 * Mostra visualmente onde o usuário está no funil de conversão
 * Design: Glassmorphic com gradientes e micro-animações
 */

import { CheckCircle2, Circle, ChevronRight, Download, Search, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/design-system/tokens';

interface FunnelProgressProps {
  currentStep: 'free' | 'assessment' | 'implementation';
  className?: string;
  variant?: 'default' | 'compact';
}

const steps = [
  { 
    key: 'free' as const, 
    label: 'Checklist Gratuito', 
    description: 'Autoavaliação guiada',
    icon: Download,
    color: 'teal'
  },
  { 
    key: 'assessment' as const, 
    label: 'Diagnóstico', 
    description: 'Análise profunda',
    icon: Search,
    color: 'orange'
  },
  { 
    key: 'implementation' as const, 
    label: 'Implementação', 
    description: 'Execução completa',
    icon: Rocket,
    color: 'purple'
  }
];

export function FunnelProgress({ currentStep, className, variant = 'default' }: FunnelProgressProps) {
  const currentIndex = steps.findIndex(s => s.key === currentStep);

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-3", className)}>
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={step.key} className="flex items-center gap-2">
              {/* Dot indicator */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isCurrent && "ring-2 ring-offset-2 ring-offset-slate-900",
                  isCurrent && step.color === 'teal' && "ring-teal-400 bg-gradient-to-br from-teal-500 to-emerald-500",
                  isCurrent && step.color === 'orange' && "ring-orange-400 bg-gradient-to-br from-orange-500 to-pink-500",
                  isCurrent && step.color === 'purple' && "ring-purple-400 bg-gradient-to-br from-purple-500 to-blue-500",
                  isComplete && "bg-green-500/20 border border-green-500/30",
                  isUpcoming && "bg-slate-700/20 border border-slate-600/30"
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <step.icon className={cn(
                    "w-4 h-4",
                    isCurrent && "text-white",
                    isUpcoming && "text-slate-500"
                  )} />
                )}
                
                {/* Pulsing ring for current step */}
                {isCurrent && (
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-full",
                      step.color === 'teal' && "bg-teal-500/30",
                      step.color === 'orange' && "bg-orange-500/30",
                      step.color === 'purple' && "bg-purple-500/30"
                    )}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {/* Separator */}
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-8 sm:w-12 h-0.5 transition-all",
                  index < currentIndex ? "bg-green-400" : "bg-slate-700"
                )} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Default variant - Full cards
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-6", className)}>
      {steps.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className={cn(
              "relative flex items-center gap-3 p-4 rounded-xl transition-all backdrop-blur-sm",
              isCurrent && "bg-gradient-to-br border-2",
              isCurrent && step.color === 'teal' && "from-teal-500/20 via-emerald-500/20 to-cyan-500/20 border-teal-500/40",
              isCurrent && step.color === 'orange' && "from-orange-500/20 via-purple-500/20 to-pink-500/20 border-orange-500/40",
              isCurrent && step.color === 'purple' && "from-purple-500/20 via-blue-500/20 to-indigo-500/20 border-purple-500/40",
              isComplete && "bg-green-500/10 border border-green-500/20",
              isUpcoming && "bg-slate-800/30 border border-slate-700/30"
            )}>
              {/* Icon */}
              <div className={cn(
                "relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 transition-all",
                isCurrent && step.color === 'teal' && "bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30",
                isCurrent && step.color === 'orange' && "bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30",
                isCurrent && step.color === 'purple' && "bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30",
                isComplete && "bg-green-500/20 border-2 border-green-500/40",
                isUpcoming && "bg-slate-700/30 border border-slate-600/30"
              )}>
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                ) : (
                  <step.icon className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6",
                    isCurrent && "text-white",
                    isUpcoming && "text-slate-500"
                  )} />
                )}

                {/* Pulsing ring animation for current step */}
                {isCurrent && (
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-full",
                      step.color === 'teal' && "bg-teal-500/30",
                      step.color === 'orange' && "bg-orange-500/30",
                      step.color === 'purple' && "bg-purple-500/30"
                    )}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={cn(
                    "text-sm sm:text-base font-semibold truncate",
                    isCurrent && "text-white",
                    isComplete && "text-green-300",
                    isUpcoming && "text-slate-500"
                  )}>
                    {step.label}
                  </div>
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        step.color === 'teal' && "bg-teal-400",
                        step.color === 'orange' && "bg-orange-400",
                        step.color === 'purple' && "bg-purple-400"
                      )} />
                    </motion.div>
                  )}
                </div>
                <div className={cn(
                  "text-xs sm:text-sm truncate",
                  isCurrent && "text-slate-300",
                  isComplete && "text-green-400/70",
                  isUpcoming && "text-slate-600"
                )}>
                  {step.description}
                </div>
              </div>

              {/* Step number badge */}
              <div className={cn(
                "text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center",
                isCurrent && step.color === 'teal' && "bg-teal-500/30 text-teal-300",
                isCurrent && step.color === 'orange' && "bg-orange-500/30 text-orange-300",
                isCurrent && step.color === 'purple' && "bg-purple-500/30 text-purple-300",
                isComplete && "bg-green-500/20 text-green-400",
                isUpcoming && "bg-slate-700/30 text-slate-600"
              )}>
                {index + 1}
              </div>

              {/* Animated background glow for current step */}
              {isCurrent && (
                <div className={cn(
                  "absolute inset-0 rounded-xl blur-xl opacity-20 -z-10",
                  step.color === 'teal' && "bg-gradient-to-r from-teal-500 to-emerald-500",
                  step.color === 'orange' && "bg-gradient-to-r from-orange-500 to-pink-500",
                  step.color === 'purple' && "bg-gradient-to-r from-purple-500 to-blue-500"
                )} />
              )}
            </div>

            {/* Connector line for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden sm:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                <ChevronRight className={cn(
                  "w-4 h-4 transition-colors",
                  index < currentIndex ? "text-green-400" : "text-slate-700"
                )} />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
