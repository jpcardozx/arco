'use client';

/**
 * STRATEGIC VELOCITY SECTION - V3.0 REFACTORED
 * 
 * MELHORIAS:
 * 1. ✅ Modularizado (componentes separados)
 * 2. ✅ Responsivo mobile-first
 * 3. ✅ Linguagem do lead (dentista, advogado, não dev)
 * 4. ✅ Collapsibles interativos
 * 5. ✅ Progressão estratégica para CTAs
 * 6. ✅ Sem referências internas (Dunn/Stark/Designjoy)
 * 7. ✅ Design consistente com Hero/Pricing
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/primitives/Container/Container';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ANIMATION_DURATION, ANIMATION_DELAY, GA4_EVENTS } from './constants';

// Módulos
import {
  StrategicBackground,
  ProblemCard,
  StepCard,
  CTACard
} from './components';

import {
  leadProblems,
  fourSteps,
  benchmarkMetrics,
  ctaOptions,
  progressionGuide,
  transparency
} from './data';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const StrategicVelocitySection: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [recommendedCTA, setRecommendedCTA] = useState<'free' | 'paid' | null>(null);
  const [loadingCTA, setLoadingCTA] = useState<'free' | 'paid' | null>(null);

  const handleCTAClick = async (type: 'free' | 'paid') => {
    setLoadingCTA(type);
    
    // GA4 Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', GA4_EVENTS.CTA_CLICK, {
        cta_type: type,
        is_recommended: recommendedCTA === type,
        event_category: 'engagement',
        event_label: type === 'free' ? 'Checklist Download' : 'Diagnostic Booking'
      });
    }
    
    // Simulate async operation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // TODO: Redirect para landing pages
    const redirectUrls = {
      free: '/checklist',
      paid: '/diagnostico-express'
    };
    
    console.log(`Redirecting to: ${redirectUrls[type]}`);
    // window.location.href = redirectUrls[type];
    
    setLoadingCTA(null);
  };

  const handleStepToggle = (index: number) => {
    const newState = expandedStep === index ? null : index;
    setExpandedStep(newState);
    
    // Track step expansion
    if (newState !== null && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', GA4_EVENTS.STEP_EXPANDED, {
        step_number: index + 1,
        step_title: fourSteps[index].title,
        event_category: 'engagement'
      });
    }
  };
  
  const handleScenarioClick = (recommendation: 'free' | 'paid') => {
    setRecommendedCTA(recommendation);
    
    // Track scenario selection
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', GA4_EVENTS.SCENARIO_SELECTED, {
        recommended_cta: recommendation,
        event_category: 'engagement'
      });
    }
  };

  return (
    <section 
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="strategic-velocity-heading"
    >
      <StrategicBackground />

      <Container className="relative z-10">
        {/* ============================================================
            HEADER - Compacto e Profissional
            ============================================================ */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.NORMAL }}
            viewport={{ once: true }}
            className="inline-block mb-3"
          >
            <Badge className="px-3 py-1.5 text-xs font-medium border-slate-700 bg-slate-800/50 text-slate-300 backdrop-blur-sm">
              Análise de Conversão
            </Badge>
          </motion.div>

          <motion.h2
            id="strategic-velocity-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight"
          >
            <span className="text-white">
              A maioria dos prestadores de serviços perde{' '}
            </span>
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              70-80% dos leads qualificados
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Não por falta de qualidade técnica, mas por solicitar investimentos substanciais antes de demonstrar valor tangível.
          </motion.p>
        </div>

        {/* ============================================================
            PROBLEMAS (3 cards) - Compacto
            ============================================================ */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3 mb-8 sm:mb-12 px-4 sm:px-0">
          {leadProblems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              stat={problem.stat}
              description={problem.description}
              index={index}
            />
          ))}
        </div>

        {/* ============================================================
            SOLUÇÃO - Headline Profissional
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <Badge className="px-3 py-1.5 text-xs font-medium border-teal-700 bg-teal-900/30 text-teal-300 backdrop-blur-sm mb-3 inline-block">
            Metodologia Progressiva
          </Badge>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
            <span className="text-white">
              Progressão estratégica em{' '}
            </span>
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              4 etapas
            </span>
          </h3>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Construção gradual de confiança através de entregas incrementais, minimizando risco percebido e maximizando taxa de conversão.
          </p>
        </motion.div>

        {/* ============================================================
            4 PASSOS (Collapsibles) - Grid Compacto
            ============================================================ */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-10 px-4 sm:px-0">
          {fourSteps.map((step, index) => (
            <StepCard
              key={index}
              step={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              example={step.example}
              benefit={step.benefit}
              color={step.color}
              index={index}
              isExpanded={expandedStep === index}
              onToggle={() => handleStepToggle(index)}
            />
          ))}
        </div>

        {/* ============================================================
            MÉTRICAS - Comparação Visual Compacta
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 px-4 sm:px-0"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4">
            Benchmark de Performance
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 text-center mb-6 max-w-xl mx-auto">
            Dados baseados em 200+ implementações no mercado brasileiro
          </p>

          {/* Grid de métricas */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
            {benchmarkMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mb-2">
                      {metric.label}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {metric.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparação visual */}
          <Card className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-xl border border-teal-500/30 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-xs text-slate-400 mb-2">Método tradicional</div>
                  <div className="text-3xl font-bold text-red-400 mb-1">2-5%</div>
                  <div className="text-xs text-slate-500">convertem</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-2">4 passos progressivos</div>
                  <div className="text-3xl font-bold text-emerald-400 mb-1">40%+</div>
                  <div className="text-xs text-slate-500">convertem</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <div className="text-sm font-semibold text-teal-400">
                  8x mais conversão
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ============================================================
            PROGRESSÃO ESTRATÉGICA - Guide para CTA Compacto
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 px-4 sm:px-0"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            <span className="text-white">{progressionGuide.headline}</span>
          </h3>
          <p className="text-base text-slate-400 text-center mb-8 max-w-xl mx-auto">
            {progressionGuide.description}
          </p>

          <div className="grid gap-4 max-w-3xl mx-auto">
            {progressionGuide.scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`
                    bg-white/5 backdrop-blur-xl border transition-all duration-300 cursor-pointer
                    ${recommendedCTA === scenario.recommendation 
                      ? 'border-teal-500/50 shadow-lg shadow-teal-500/20 bg-white/10'
                      : 'border-white/10 hover:bg-white/8'
                    }
                    focus-within:ring-2 focus-within:ring-teal-500/50
                  `}
                  onClick={() => handleScenarioClick(scenario.recommendation as 'free' | 'paid')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleScenarioClick(scenario.recommendation as 'free' | 'paid');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Cenário: ${scenario.situation}`}
                  aria-pressed={recommendedCTA === scenario.recommendation}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border
                        ${scenario.recommendation === 'free' 
                          ? 'bg-teal-500/20 border-teal-500/30' 
                          : 'bg-orange-500/20 border-orange-500/30'
                        }
                      `}>
                        <CheckCircle2 className={`
                          w-5 h-5
                          ${scenario.recommendation === 'free' ? 'text-teal-400' : 'text-orange-400'}
                        `} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-bold text-white mb-2">
                          {scenario.situation}
                        </div>
                        <div className="text-sm text-slate-400 leading-relaxed mb-2">
                          {scenario.reasoning}
                        </div>
                        <div className={`
                          text-xs font-semibold
                          ${scenario.recommendation === 'free' ? 'text-teal-400' : 'text-orange-400'}
                        `}>
                          → {scenario.recommendation === 'free' ? 'Comece pelo checklist gratuito' : 'Vá direto para o diagnóstico'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ============================================================
            CTAs DUAL - Compacto
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8 px-4 sm:px-0"
        >
          <CTACard
            type="free"
            badge={ctaOptions.free.badge}
            title={ctaOptions.free.title}
            description={ctaOptions.free.description}
            features={ctaOptions.free.features}
            buttonText={ctaOptions.free.buttonText}
            footer={ctaOptions.free.footer}
            onCTAClick={() => handleCTAClick('free')}
            isRecommended={recommendedCTA === 'free'}
            isLoading={loadingCTA === 'free'}
          />

          <CTACard
            type="paid"
            badge={ctaOptions.paid.badge}
            title={ctaOptions.paid.title}
            price={ctaOptions.paid.price}
            description={ctaOptions.paid.description}
            features={ctaOptions.paid.features}
            buttonText={ctaOptions.paid.buttonText}
            footer={ctaOptions.paid.footer}
            onCTAClick={() => handleCTAClick('paid')}
            isRecommended={recommendedCTA === 'paid'}
            isLoading={loadingCTA === 'paid'}
          />
        </motion.div>

        {/* ============================================================
            TRANSPARÊNCIA - Quando NÃO funciona
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-4 sm:px-0"
        >
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 max-w-3xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <h4 className="text-lg font-bold text-white mb-3 text-center">
                {transparency.title}
              </h4>
              <p className="text-sm text-slate-400 mb-6 text-center">
                {transparency.description}
              </p>
              
              <div className="space-y-4">
                {transparency.criteria.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                    <div className="text-red-400 mt-0.5">⚠</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white mb-1">
                        {item.condition}
                      </div>
                      <div className="text-xs text-slate-400">
                        {item.advice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};

export default StrategicVelocitySection;
