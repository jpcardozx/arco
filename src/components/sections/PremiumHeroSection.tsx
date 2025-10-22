'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Play,
  Sparkles,
  ChevronDown,
  Crown,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Activity,
  Calculator,
  BarChart3,
  Award,
  Download,
  RefreshCw,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Clock,
  Lightbulb,
  Layers,
  LineChart,
  Rocket,
  type LucideIcon
} from 'lucide-react';
import { cn, designTokens } from '@/design-system/tokens';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { useMetaTracking } from '@/hooks/useMetaTracking';
import { useRouter } from 'next/navigation';

// Types
interface PremiumBadgeProps {
  icon: LucideIcon;
  text: string;
}

// Enhanced macOS Window Component with Animated Border

const AnimatedWindow = ({
  children,
  title = "ARCO Dashboard",
  className = "",
  zIndex = 0,
  delay = 0.6
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  zIndex?: number;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 + zIndex * 8 }}
    animate={{ opacity: 1 - zIndex * 0.12, y: zIndex * 12 }}
    transition={{
      delay: delay + zIndex * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }}
    whileHover={{
      y: zIndex * 12 - 4,
      transition: { duration: 0.3 }
    }}
    className={cn(
      "relative backdrop-blur-xl rounded-2xl overflow-hidden",
      className
    )}
    style={{
      background: `linear-gradient(135deg,
        rgba(255,255,255,${0.12 - zIndex * 0.02}) 0%,
        rgba(255,255,255,${0.06 - zIndex * 0.01}) 50%,
        rgba(0,0,0,${0.1 + zIndex * 0.02}) 100%)`,
      boxShadow: `
        0 ${20 + zIndex * 8}px ${40 + zIndex * 15}px rgba(0,0,0,${0.4 + zIndex * 0.15}),
        0 ${10 + zIndex * 4}px ${20 + zIndex * 8}px rgba(0,0,0,${0.3 + zIndex * 0.1}),
        0 0 0 1px rgba(255,255,255,${0.08 - zIndex * 0.02}),
        inset 0 1px 0 rgba(255,255,255,${0.15 - zIndex * 0.03})
      `,
      zIndex: 10 - zIndex
    }}
  >
    {/* Subtle accent border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        background: `linear-gradient(135deg,
          ${designTokens.colors.teal[400]}15,
          ${designTokens.colors.orange[400]}10)`,
        padding: '1px',
        WebkitMaskImage: 'linear-gradient(white, white)',
        maskImage: 'linear-gradient(white, white)',
        WebkitMaskComposite: 'destination-out',
        maskComposite: 'exclude'
      }}
    />

    {/* Window content wrapper */}
    <div className="relative z-10">
      {/* macOS Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/20 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="text-white/70 text-sm font-medium">{title}</div>
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  </motion.div>
);

// Interactive ROI Calculator Component
/**
 * Pain Point Mirror - Strategic Component
 * Helps lead recognize THEIR specific pain (not generic promises)
 * Progressive insight disclosure based on honest reflection
 */
const PainPointMirror = () => {
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [showInsight, setShowInsight] = useState(false);
  const [insightLevel, setInsightLevel] = useState(0);

  const painPoints = [
    { id: 'traffic', label: 'Taxa de conversão abaixo do benchmark', icon: TrendingUp },
    { id: 'cost', label: 'Custo de aquisição elevado', icon: Calculator },
    { id: 'quality', label: 'Qualificação insuficiente de leads', icon: Users },
    { id: 'time', label: 'Ciclo de vendas estendido', icon: Activity },
  ];

  const togglePain = (painId: string) => {
    const newPains = selectedPains.includes(painId)
      ? selectedPains.filter(p => p !== painId)
      : [...selectedPains, painId];
    
    setSelectedPains(newPains);

    // Progressive insight (every 2 selections)
    if (newPains.length > 0 && newPains.length % 2 === 0) {
      setShowInsight(true);
      setInsightLevel(Math.min(newPains.length / 2, 2));
    }
  };

  const insights = [
    'Indicadores sugerem desalinhamento entre fonte de tráfego e proposta de valor',
    'Análise aponta para necessidade de revisão na estratégia de qualificação',
  ];

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-xs text-white/50 mb-3">
        Desafios operacionais comuns em empresas de serviços:
      </div>

      <div className="space-y-2">
        {painPoints.map((pain, index) => {
          const Icon = pain.icon;
          const isSelected = selectedPains.includes(pain.id);
          
          return (
            <motion.button
              key={pain.id}
              onClick={() => togglePain(pain.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full p-2.5 rounded-lg text-left transition-all duration-300',
                isSelected
                  ? 'bg-orange-500/15 border border-orange-500/30 shadow-lg shadow-orange-500/10'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              )}
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ 
                    rotate: isSelected ? 360 : 0,
                    scale: isSelected ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={cn(
                    'w-3.5 h-3.5',
                    isSelected ? 'text-orange-400' : 'text-white/40'
                  )} />
                </motion.div>
                <span className={cn(
                  'text-xs font-medium',
                  isSelected ? 'text-white' : 'text-white/70'
                )}>
                  {pain.label}
                </span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {showInsight && insightLevel > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">Insight</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              {insights[insightLevel - 1]}
            </p>
          </div>
        </motion.div>
      )}

      {selectedPains.length === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-white/50 italic pt-2"
        >
          Desafios frequentes em operações similares. Abordagem sistemática disponível.
        </motion.div>
      )}
    </motion.div>
  );
};

/**
 * Scenario Mapper - Realistic Progression
 * Shows ACTUAL stages (not magic transformations)
 * Honest timelines and expectations
 */
const ScenarioMapper = () => {
  const [currentStage, setCurrentStage] = useState<'blocked' | 'progress' | 'scaling'>('blocked');
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const scenarios = {
    blocked: {
      label: 'Descoberta',
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/10',
      borderColor: 'border-slate-500/30',
      icon: Activity,
      description: 'Levantamento de requisitos, análise de métricas existentes e identificação de pontos críticos',
      timeline: 'Fase inicial: 1-2 semanas'
    },
    progress: {
      label: 'Implementação',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      icon: TrendingUp,
      description: 'Desenvolvimento de soluções, refatoração de código e otimização de performance',
      timeline: 'Desenvolvimento: variável'
    },
    scaling: {
      label: 'Otimização',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      icon: Zap,
      description: 'Monitoramento de métricas, ajustes finos e documentação de processos',
      timeline: 'Pós-implementação'
    }
  };

  return (
    <motion.div className="space-y-3">
      <div className="text-xs text-white/50 mb-2.5">
        Fases do processo:
      </div>

      <div className="space-y-2">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((stage, index) => {
          const scenario = scenarios[stage];
          const Icon = scenario.icon;
          const isActive = currentStage === stage;
          const isHovered = hoveredPath === stage;

          return (
            <motion.button
              key={stage}
              onClick={() => setCurrentStage(stage)}
              onHoverStart={() => setHoveredPath(stage)}
              onHoverEnd={() => setHoveredPath(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full p-2.5 rounded-lg text-left transition-all duration-300',
                isActive
                  ? `${scenario.bgColor} border ${scenario.borderColor} shadow-lg`
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              )}
            >
              <div className="flex items-start gap-2.5">
                <motion.div
                  animate={{ 
                    rotate: isActive ? 360 : 0,
                    scale: isActive || isHovered ? 1.15 : 1 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={cn(
                    'w-3.5 h-3.5',
                    isActive ? scenario.color : 'text-white/40'
                  )} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    'text-xs font-semibold mb-0.5',
                    isActive ? scenario.color : 'text-white/70'
                  )}>
                    {scenario.label}
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1"
                    >
                      <p className="text-xs text-white/60 leading-relaxed">
                        {scenario.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Activity className="w-3 h-3 text-white/40" />
                        <span className="text-[10px] text-white/50">
                          {scenario.timeline}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-2.5 border-t border-white/10"
      >
        <p className="text-xs text-white/50 leading-relaxed">
          Processo iterativo adaptado ao contexto específico de cada projeto.
        </p>
      </motion.div>
    </motion.div>
  );
};

/**
 * Framework Visualization - Educational Component
 * Shows the METHOD, not sales pitch
 * Process > Promises
 */
const FrameworkVisual = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { 
      id: 1, 
      label: 'Diagnóstico', 
      icon: Target,
      description: 'Identificação de gargalos operacionais através de análise quantitativa',
      duration: '1-2 semanas'
    },
    { 
      id: 2, 
      label: 'Planejamento', 
      icon: BarChart3,
      description: 'Desenvolvimento de plano de ação contextualizado',
      duration: '2-4 semanas'
    },
    { 
      id: 3, 
      label: 'Implementação', 
      icon: Zap,
      description: 'Execução gradual de ajustes estruturais',
      duration: '4-8 semanas'
    },
    { 
      id: 4, 
      label: 'Monitoramento', 
      icon: RefreshCw,
      description: 'Iteração baseada em métricas e resultados mensuráveis',
      duration: 'Contínuo'
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  return (
    <motion.div className="space-y-3">
      <div className="text-xs text-white/50 mb-2.5">
        Metodologia estruturada (processo sistemático):
      </div>

      <div className="space-y-1.5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          const isCompleted = completedSteps.includes(index);

          return (
            <React.Fragment key={step.id}>
              <motion.button
                onClick={() => handleStepClick(index)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full p-2.5 rounded-lg text-left transition-all duration-300',
                  isActive
                    ? 'bg-teal-500/15 border border-teal-500/30 shadow-lg'
                    : isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                )}
              >
                <div className="flex items-start gap-2.5">
                  <motion.div
                    className="relative"
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      rotate: isCompleted ? 360 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center',
                      isActive 
                        ? 'bg-teal-500/20' 
                        : isCompleted 
                        ? 'bg-emerald-500/20' 
                        : 'bg-white/10'
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Icon className={cn(
                          'w-2.5 h-2.5',
                          isActive ? 'text-teal-400' : 'text-white/40'
                        )} />
                      )}
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={cn(
                        'text-xs font-semibold',
                        isActive 
                          ? 'text-teal-400' 
                          : isCompleted 
                          ? 'text-emerald-400' 
                          : 'text-white/70'
                      )}>
                        {step.id}. {step.label}
                      </span>
                      <span className="text-[10px] text-white/40">{step.duration}</span>
                    </div>
                    
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-white/60 leading-relaxed mt-1"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.button>

              {index < steps.length - 1 && (
                <motion.div
                  className="ml-2.5 h-3 w-0.5 bg-gradient-to-b from-white/20 to-transparent"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {completedSteps.length === steps.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 p-2.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-400 font-semibold">Aplicação Contextual</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Metodologia adaptável às especificidades operacionais de cada caso.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Executive Status Badge - Premium branding element
const ExecutiveBadge = ({
  text,
  icon: Icon = Sparkles,
  className = ""
}: {
  text: string;
  icon?: LucideIcon;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: -20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 25
    }}
    className={cn("inline-flex items-center gap-2", className)}
    role="status"
    aria-label={text}
  >
    <Badge
      className="border-transparent px-5 py-2.5 shadow-xl relative overflow-hidden group cursor-default focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-black"
      tabIndex={0}
      style={{
        background: `linear-gradient(135deg, ${designTokens.colors.teal[600]} 0%, ${designTokens.colors.teal[700]} 60%, ${designTokens.colors.teal[800]} 100%)`,
        boxShadow: '0 8px 24px rgba(20,184,166,0.35), 0 4px 12px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(94,234,212,0.20)',
        border: '1px solid rgba(94,234,212,0.30)',
        textShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)'
      }}
    >
      <Icon className="w-4 h-4 mr-2 text-white drop-shadow-sm" aria-hidden="true" />
      <span className="font-bold tracking-wide uppercase text-xs text-white">
        {text}
      </span>

      {/* Badge shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${designTokens.colors.teal[300]}40, transparent)`,
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['-200% 0', '200% 0'],
        }}
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 0.3
        }}
      />
    </Badge>
  </motion.div>
);

// Professional Gradient Text - Using ARCO brand colors
const GradientText = ({
  children,
  variant = "primary"
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const gradients = {
    primary: `linear-gradient(135deg, ${designTokens.colors.teal[600]} 0%, ${designTokens.colors.orange[500]} 100%)`,
    secondary: `linear-gradient(135deg, ${designTokens.colors.emerald[600]} 0%, ${designTokens.colors.orange[400]} 100%)`
  };

  return (
    <span
      className="bg-clip-text text-transparent font-bold"
      style={{
        backgroundImage: gradients[variant],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      {children}
    </span>
  );
};

// Scroll Indicator Component
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
    role="button"
    aria-label="Rolar para baixo para ver mais conteúdo"
    tabIndex={0}
    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="flex flex-col items-center gap-2 text-neutral-300 cursor-pointer hover:text-white transition-colors group"
    >
      <span className="text-sm font-medium group-hover:scale-105 transition-transform">Descobrir mais</span>
      <div className="p-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm group-hover:border-white/50 group-hover:bg-black/50 transition-all group-focus-visible:shadow-lg group-focus-visible:shadow-white/30">
        <ChevronDown className="w-4 h-4 text-white" aria-hidden="true" />
      </div>
    </motion.div>
  </motion.div>
);

interface PremiumHeroSectionProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  showParticles?: boolean;
  showScrollIndicator?: boolean;
  variant?: 'default' | 'premium' | 'executive';
}

export const PremiumHeroSection: React.FC<PremiumHeroSectionProps> = ({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showParticles = true,
  showScrollIndicator = true,
  variant = 'premium'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const router = useRouter();
  const { trackEvent } = useMetaTracking();

  // Track mouse position for subtle parallax effects with throttling
  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX - window.innerWidth / 2) / 50,
            y: (e.clientY - window.innerHeight / 2) / 50
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundStyles = {
    default: {
      className: "relative min-h-screen flex items-center overflow-hidden",
      background: "linear-gradient(135deg, #0a0a0a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)"
    },
    premium: {
      className: "relative min-h-screen flex items-center overflow-hidden",
      background: "linear-gradient(135deg, #030712 0%, #0c1220 20%, #1e293b 40%, #334155 60%, #475569 80%, #64748b 100%)"
    },
    executive: {
      className: "relative min-h-screen flex items-center overflow-hidden",
      background: "linear-gradient(135deg, #020617 0%, #0f172a 30%, #1e293b 60%, #334155 100%)"
    }
  };

  const currentStyle = backgroundStyles[variant];

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        background: currentStyle.background,
        backgroundAttachment: 'fixed'
      }}
      aria-label="Hero Section - Apresentação ARCO"
      role="banner"
    >
      {/* Complex Elegant Dark Mode Background */}
      <div className="absolute inset-0">
        {/* Foundation gradient - Sophisticated dark slate */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              #0a0a0a 0%,
              #0f0f0f 15%,
              #1a1a1a 35%,
              #1f1f1f 55%,
              #171717 75%,
              #0a0a0a 100%)`
          }}
        />

        {/* Noise texture overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Subtle teal accent - professional and minimal */}
        <div
          className="absolute inset-0 opacity-12"
          style={{
            background: `
              radial-gradient(circle at 20% 15%, rgba(20, 184, 166, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 80% 85%, rgba(20, 184, 166, 0.05) 0%, transparent 40%)
            `
          }}
        />

        {/* Subtle gradient overlay - depth without distraction */}
        <div
          className="absolute inset-0 opacity-8"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(20, 184, 166, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(100, 116, 139, 0.04) 0%, transparent 50%)
            `,
            mixBlendMode: 'screen'
          }}
        />

        {/* Interactive mouse spotlight - very subtle */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(700px circle at ${mousePosition.x * 8 + 50}% ${mousePosition.y * 8 + 50}%, rgba(20, 184, 166, 0.10) 0%, transparent 65%)`,
            transition: 'background 0.3s ease-out'
          }}
        />

        {/* Geometric grid pattern - very subtle */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100, 116, 139, 0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 116, 139, 0.10) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Minimal dotted pattern accent */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Clean depth gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(180deg,
              rgba(20, 184, 166, 0.02) 0%,
              transparent 30%,
              transparent 70%,
              rgba(0, 0, 0, 0.05) 100%)`
          }}
        />

        {/* Vignette effect for depth */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)`
          }}
        />
      </div>

      {/* Enhanced Particles - Teal & Orange */}
      {showParticles && (
        <ParticleBackground
          variant="hero"
          density={60}
          className="opacity-35"
        />
      )}

      {/* Split Layout - Left Content + Right macOS Window */}
      <div className="relative z-20 w-full h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full py-16 sm:py-20 lg:py-0 min-h-[calc(100vh-4rem)] lg:min-h-screen">

            {/* Left Side - Content */}
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-5 sm:space-y-6 lg:space-y-7 max-w-2xl lg:max-w-none"
              aria-label="Conteúdo principal do hero"
            >
              {/* Executive Status Badge */}
              {badge && (
                <div className="flex justify-start">
                  <ExecutiveBadge text={badge.text} icon={badge.icon || Sparkles} />
                </div>
              )}

              {/* Hero Title - Clean and Professional */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-display font-bold text-white leading-[1.1] sm:leading-[1.15] tracking-tight"
                style={{
                  fontSize: 'clamp(1.875rem, 4vw + 0.5rem, 3.5rem)',
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
              >
                {title}
              </motion.h1>

              {/* Enhanced Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4 sm:space-y-5 max-w-xl"
              >
                <p className="text-sm sm:text-base lg:text-lg text-white/85 font-normal leading-[1.6] sm:leading-[1.7]">
                  {subtitle}
                </p>

                <div className="flex flex-wrap gap-2 max-w-xl" role="list" aria-label="Diferenciais Técnicos">
                  {[
                    { label: 'Requisitos', icon: Target, color: 'text-blue-400', description: 'Análise técnica' },
                    { label: 'Métricas', icon: BarChart3, color: 'text-teal-400', description: 'Dados reais' },
                    { label: 'Deploy', icon: Layers, color: 'text-purple-400', description: 'Incremental' },
                    { label: 'Monitor', icon: LineChart, color: 'text-emerald-400', description: 'Contínuo' }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + (index * 0.08), duration: 0.4, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.03, y: -1 }}
                        className="group relative inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300 cursor-default select-none"
                        role="listitem"
                        title={item.description}
                      >
                        <Icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} strokeWidth={2.5} />
                        <span className="text-xs font-medium text-white/90 whitespace-nowrap">{item.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Premium CTA Buttons - Improved spacing and hierarchy */}
              <nav aria-label="Ações principais">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-10"
                >
                {primaryCta && (
                  <motion.div
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative group w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="relative w-full sm:w-auto px-8 py-4 text-base font-semibold text-white border-0 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                      style={{
                        background: `linear-gradient(135deg, ${designTokens.colors.teal[500]} 0%, ${designTokens.colors.teal[600]} 100%)`,
                        boxShadow: `0 10px 30px rgba(20, 184, 166, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)`,
                        border: '1px solid rgba(20, 184, 166, 0.2)'
                      }}
                      onClick={async () => {
                        // Track Meta Pixel event
                        try {
                          await trackEvent({
                            eventName: 'ViewContent',
                            userData: {
                              email: 'anonymous@hero-cta.arco',
                            },
                            customData: {
                              content_name: 'hero_cta_primary',
                              content_category: 'navigation',
                              content_type: 'button_click',
                              value: 0,
                              currency: 'BRL',
                            },
                          });
                        } catch (e) {
                          console.warn('Meta tracking failed:', e);
                        }
                        
                        // Execute original onClick or navigate
                        if (primaryCta.onClick) {
                          primaryCta.onClick();
                        } else if (primaryCta.href) {
                          router.push(primaryCta.href);
                        }
                      }}
                      aria-label={`${primaryCta.text}`}
                    >
                      <motion.span 
                        className="relative z-10 flex items-center justify-center gap-2.5"
                        whileHover={{ x: 2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <span className="text-white whitespace-nowrap">{primaryCta.text}</span>
                        <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
                      </motion.span>

                      {/* Subtle shimmer */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
                          backgroundSize: '200% 100%'
                        }}
                        animate={{
                          backgroundPosition: ['-200% 0', '200% 0'],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                    </Button>
                  </motion.div>
                )}

                {secondaryCta && (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative group w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="relative w-full sm:w-auto px-8 py-4 text-base font-medium text-white rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.08)'
                      }}
                      onClick={secondaryCta.onClick}
                      aria-label={secondaryCta.text}
                    >
                      <motion.span 
                        className="relative z-10 flex items-center justify-center gap-2.5"
                        whileHover={{ x: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Play className="w-4 h-4 text-white/80" aria-hidden="true" />
                        <span className="whitespace-nowrap">{secondaryCta.text}</span>
                      </motion.span>
                      
                      {/* Subtle hover effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)'
                        }}
                      />
                    </Button>
                  </motion.div>
                )}
                </motion.div>

                {/* Technical Attribution - Premium Signature Block */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-12 pt-8"
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.04)'
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    {/* Technical Signature */}
                    <div className="flex-1">
                      <motion.a
                        href="/jpcardozx"
                        className="group inline-flex items-baseline gap-3"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <div className="flex items-baseline gap-2">
                          <span 
                            className="text-[13px] font-medium tracking-wide"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            Ideação e Desenvolvimento
                          </span>
                          <span className="text-[11px] font-mono text-white/30">
                            por
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-sm font-bold tracking-tight group-hover:tracking-normal transition-all duration-300 relative"
                            style={{
                              background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            Pedro Cardozo
                            {/* Underline animation on hover */}
                            <span 
                              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-full transition-all duration-300"
                            />
                          </span>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ArrowRight 
                              className="w-4 h-4"
                              style={{ color: '#14b8a6' }}
                            />
                          </motion.div>
                        </div>
                      </motion.a>
                      
                      {/* Tech Stack Indicators */}
                      <div className="flex items-center gap-2 mt-3">
                        <div 
                          className="h-px w-6"
                          style={{
                            background: 'linear-gradient(90deg, rgba(20,184,166,0.4) 0%, transparent 100%)'
                          }}
                        />
                        <div className="flex items-center gap-1.5">
                          {['Next.js', 'React', 'TypeScript', 'Node.js'].map((tech, i) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono text-white/40 tracking-wider"
                              style={{
                                opacity: 1 - (i * 0.15)
                              }}
                            >
                              {tech}
                            </span>
                          )).reduce((prev, curr, i) => [
                            prev,
                            <span key={`sep-${i}`} className="text-white/20 text-[10px]">·</span>,
                            curr
                          ] as any)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </nav>
            </motion.article>

            {/* Right Side - Layered macOS Windows System */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative hidden lg:block"
            >
              {/* Elegant teal glow */}
              <div className="absolute -inset-8 rounded-3xl blur-3xl" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 60%)' }} />
              <div className="absolute -inset-4 rounded-2xl" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 50%)' }} />
              {/* Window Stack - Multiple layers */}
              <div className="relative w-full max-w-lg mx-auto">

                {/* Background Window 3 - Framework Education */}
                <AnimatedWindow
                  title="Metodologia ARCO - Processo Estruturado"
                  className="absolute w-full"
                  zIndex={2}
                  delay={0.8}
                >
                  <div className="opacity-70">
                    <FrameworkVisual />
                  </div>
                </AnimatedWindow>

                {/* Background Window 2 - Realistic Scenarios */}
                <AnimatedWindow
                  title="Mapeamento de Cenários - Onde Você Está?"
                  className="absolute w-full"
                  zIndex={1}
                  delay={0.7}
                >
                  <div className="opacity-80">
                    <ScenarioMapper />
                  </div>
                </AnimatedWindow>

                {/* Foreground Window - Diagnostic Focus */}
                <AnimatedWindow
                  title="Análise & Diagnóstico"
                  className="relative w-full"
                  zIndex={0}
                  delay={0.6}
                >
                  <div className="space-y-4">
                    {/* Context Header - Professional Approach */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-teal-400" />
                        <h3 className="text-white font-bold text-sm">Diagnóstico Técnico</h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-teal-500/10 rounded-full border border-teal-500/30">
                        <Activity className="w-3.5 h-3.5 text-teal-400" />
                        <span className="text-teal-400 text-xs font-medium">Consultoria</span>
                      </div>
                    </div>

                    {/* Key Focus Areas */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-white/70 text-xs">Análise de métricas existentes</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-white/70 text-xs">Identificação de gargalos técnicos</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-white/70 text-xs">Plano de ação estruturado</span>
                      </div>
                    </div>

                    {/* Pain Point Mirror Component */}
                    <PainPointMirror />
                  </div>
                </AnimatedWindow>
              </div>
            </motion.div>

            {/* Mobile Specialization Preview - Shown only on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="lg:hidden space-y-3 mt-8"
            >
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-semibold text-white">Especialização Core</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Otimização de performance, arquitetura escalável e experiência de usuário em aplicações web modernas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Global animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.6);
          }
        }

        /* Ensure smooth hardware acceleration */
        .hardware-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default PremiumHeroSection;