'use client';

/**
 * STRATEGIC VELOCITY - MODULAR COMPONENTS
 * Sub-componentes isolados para melhor manutenção
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { ANIMATION_DURATION, ANIMATION_DELAY } from './constants';

// ============================================================================
// BACKGROUND COMPONENT
// ============================================================================

export const StrategicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.15) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.15) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial teal */}
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
          top: '-15%',
          left: '-10%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Radial orange */}
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)',
          top: '30%',
          right: '-15%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
};

// ============================================================================
// PROBLEM CARD COMPONENT
// ============================================================================

interface ProblemCardProps {
  icon: LucideIcon;
  title: string;
  stat: string;
  description: string;
  index: number;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  icon: Icon,
  title,
  stat,
  description,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION.NORMAL, delay: ANIMATION_DELAY.STAGGER * index }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: ANIMATION_DURATION.FAST } }}
      className="h-full"
    >
      <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 hover:border-red-500/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-white mb-1 truncate">
                {title}
              </div>
              <div className="text-xl font-bold text-red-400">
                {stat}
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// STEP CARD COMPONENT (Collapsible)
// ============================================================================

interface StepCardProps {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  example: string;
  benefit: string;
  color: 'teal' | 'orange' | 'purple';
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const colorClasses = {
  teal: {
    bg: 'bg-teal-500/20',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    badge: 'bg-teal-500/10 border-teal-500/30 text-teal-400'
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    badge: 'bg-orange-500/10 border-orange-500/30 text-orange-400'
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badge: 'bg-purple-500/10 border-purple-500/30 text-purple-400'
  }
};

export const StepCard: React.FC<StepCardProps> = ({
  step,
  icon: Icon,
  title,
  description,
  example,
  benefit,
  color,
  index,
  isExpanded,
  onToggle
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION.NORMAL, delay: index * ANIMATION_DELAY.STAGGER }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, transition: { duration: ANIMATION_DURATION.FAST } }}
      className="h-full"
    >
      <Card 
        className={`
          h-full bg-white/5 backdrop-blur-xl border transition-all duration-300 cursor-pointer
          ${isExpanded ? `${colors.border} shadow-lg shadow-${color}-500/20` : 'border-white/10'}
          hover:bg-white/8 focus-within:ring-2 focus-within:ring-${color}-500/50
        `}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${title} - ${isExpanded ? 'Clique para recolher' : 'Clique para expandir'}`}
      >
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <Badge className={`${colors.badge} border text-xs`}>
              {step}
            </Badge>
          </div>

          {/* Title + Description */}
          <h4 className="text-lg font-bold text-white mb-2">
            {title}
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            {description}
          </p>

          {/* Collapsible content */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: ANIMATION_DURATION.FAST, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`pt-3 border-t border-white/10 space-y-3`}>
              {/* Example */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-1">
                  Exemplo:
                </div>
                <div className="text-xs text-slate-400">
                  {example}
                </div>
              </div>

              {/* Benefit */}
              <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                <div className={`text-xs font-semibold ${colors.text} mb-1`}>
                  Por que funciona:
                </div>
                <div className="text-xs text-slate-300">
                  {benefit}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Toggle hint */}
          <div className="text-xs text-slate-500 mt-3 text-center">
            {isExpanded ? '▼ Clique para recolher' : '▶ Clique para ver mais'}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// CTA CARD COMPONENT
// ============================================================================

interface CTACardProps {
  type: 'free' | 'paid';
  badge: string;
  title: string;
  price?: string;
  description: string;
  features: string[];
  buttonText: string;
  footer: string;
  onCTAClick: () => void;
  isRecommended?: boolean;
  isLoading?: boolean;
}

export const CTACard: React.FC<CTACardProps> = ({
  type,
  badge,
  title,
  price,
  description,
  features,
  buttonText,
  footer,
  onCTAClick,
  isRecommended = false,
  isLoading = false
}) => {
  return (
    <Card 
      className={`
        h-full backdrop-blur-xl border transition-all duration-300 relative
        ${type === 'free' 
          ? 'bg-white/5 border-teal-500/30 hover:border-teal-500/50' 
          : 'bg-gradient-to-br from-orange-500/10 to-purple-500/10 border-orange-500/30 hover:border-orange-500/50'
        }
      `}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-orange-500/30 border-orange-500/50 text-white border px-3 py-1">
            ⭐ Mais escolhido
          </Badge>
        </div>
      )}

      <CardContent className="p-6 flex flex-col h-full">
        <Badge className={`
          border mb-3 w-fit text-xs
          ${type === 'free' 
            ? 'bg-teal-500/20 border-teal-500/30 text-teal-400' 
            : 'bg-orange-500/20 border-orange-500/30 text-orange-400'
          }
        `}>
          {badge}
        </Badge>

        <h4 className="text-xl font-bold text-white mb-2">
          {title}
        </h4>

        {price && (
          <div className="text-3xl font-bold text-orange-400 mb-3">
            {price}
          </div>
        )}

        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <span className={`${type === 'free' ? 'text-teal-400' : 'text-orange-400'} mt-0.5`}>✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          onClick={onCTAClick}
          disabled={isLoading}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white text-sm
            transition-all duration-300 will-change-transform relative
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
            ${type === 'free'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:ring-teal-500 active:shadow-lg active:shadow-teal-500/50'
              : 'bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 focus:ring-orange-500 active:shadow-lg active:shadow-orange-500/50'
            }
          `}
          aria-label={`${buttonText} - ${type === 'free' ? 'Material gratuito' : price}`}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Carregando...
            </span>
          ) : (
            buttonText
          )}
        </motion.button>

        <div className="text-xs text-slate-500 text-center mt-3">
          {footer}
        </div>
      </CardContent>
    </Card>
  );
};
