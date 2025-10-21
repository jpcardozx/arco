'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Zap, Crown, Sparkles, ArrowRight, Clock, ChevronDown } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface ValueInvestmentSectionProps {
  campaign: Campaign;
}

// Ancoragem: Setup único (transparente)
const setupFee = {
  full: 1499,
  earlyAdopter: 897, // -40% desconto lançamento
};

// 3 Pacotes mensais (transparentes com custo total)
const plans = [
  {
    id: 'essencial',
    name: 'Essencial',
    icon: Sparkles,
    subtitle: 'Começo previsível',
    monthlyFee: 0, // Só setup
    adBudget: { min: 450, recommended: 600 },
    popular: false,
    included: [
      'Landing page mobile-first (LCP ≤2.5s)',
      'GA4 com eventos de lead configurados',
      'Formulário com triagem (serviço + janela + bairro)',
      'WhatsApp API (confirmação + lembrete 24h)',
      'Setup completo em 7 dias',
    ],
    notIncluded: [
      'Gestão de anúncios (você roda ou contrata separado)',
      'Otimização mensal',
    ],
    totalFirstMonth: setupFee.earlyAdopter + 600, // R$ 1.497
    totalRecurring: 600, // Só anúncios
  },
  {
    id: 'crescimento',
    name: 'Crescimento',
    icon: Zap,
    subtitle: 'Mais escolhido (83%)',
    monthlyFee: 497,
    adBudget: { min: 600, recommended: 750 },
    popular: true,
    included: [
      'Tudo do Essencial +',
      'Gestão de Google Search + Meta CTWA',
      'Otimização semanal (Quality Score + CTR)',
      'Relatório mensal com CAC e ROI',
      'Suporte prioritário WhatsApp',
    ],
    notIncluded: [],
    totalFirstMonth: setupFee.earlyAdopter + 497 + 750, // R$ 2.144
    totalRecurring: 497 + 750, // R$ 1.247/mês
  },
  {
    id: 'escala',
    name: 'Escala',
    icon: Crown,
    subtitle: 'Múltiplas unidades ou ticket alto',
    monthlyFee: 997,
    adBudget: { min: 1200, recommended: 1500 },
    popular: false,
    included: [
      'Tudo do Crescimento +',
      'Múltiplas landing pages (até 3 unidades/serviços)',
      'Remarketing + Lookalike Audiences',
      'A/B test de copy e criativos',
      'Consultoria estratégica quinzenal',
      'Dashboard customizado (Looker Studio)',
    ],
    notIncluded: [],
    totalFirstMonth: setupFee.earlyAdopter + 997 + 1500, // R$ 3.394
    totalRecurring: 997 + 1500, // R$ 2.497/mês
  },
];

export function ValueInvestmentSection({ campaign }: ValueInvestmentSectionProps) {
  const colors = useCampaignColors(campaign);
  const [expandedPlan, setExpandedPlan] = useState<string | null>('crescimento'); // Plano mais popular já expandido
  
  const scrollToCapture = () => {
    document.getElementById('capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ backgroundColor: colors.primary.solid }}
        />
        <div 
          className="absolute bottom-[25%] left-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.06]"
          style={{ backgroundColor: colors.secondary.solid }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header + Setup Ancoragem */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-4">
              Investimento{' '}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                }}
              >
                transparente
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
              Valores claros: setup inicial + mensalidade (quando aplicável) + orçamento de anúncios
            </p>

            {/* Setup Fee Anchor */}
            <div 
              className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl border-2"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.solid}15 0%, ${colors.secondary.solid}15 100%)`,
                borderColor: `${colors.primary.solid}40`
              }}
            >
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Setup completo (preço normal)</div>
                <div className="text-2xl font-bold text-slate-500 line-through">
                  R$ {setupFee.full.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: colors.primary.solid }}>
                →
              </div>
              <div className="text-center">
                <div 
                  className="text-sm font-semibold mb-1"
                  style={{ color: colors.primary.solid }}
                >
                  Desconto lançamento (-40%)
                </div>
                <div 
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: colors.primary.solid }}
                >
                  R$ {setupFee.earlyAdopter.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Só até 31/01/2025 • 8 vagas</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
            {plans.map((plan, idx) => {
              const Icon = plan.icon;
              const isPopular = plan.popular;

              return (
                <motion.div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                    isPopular
                      ? 'scale-105 shadow-2xl'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    background: isPopular 
                      ? `linear-gradient(135deg, ${colors.primary.solid}12 0%, ${colors.secondary.solid}12 100%)`
                      : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isPopular ? colors.primary.solid : 'rgba(255, 255, 255, 0.08)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div 
                        className="px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                        }}
                      >
                        83% escolhem este
                      </div>
                    </div>
                  )}

                  {/* Icon + Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundImage: isPopular
                          ? `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                          : `linear-gradient(135deg, ${colors.primary.solid}20 0%, ${colors.secondary.solid}20 100%)`,
                        border: isPopular ? 'none' : `1px solid ${colors.primary.solid}30`
                      }}
                    >
                      <Icon className={`w-6 h-6 ${isPopular ? 'text-white' : ''}`} style={{ color: isPopular ? undefined : colors.primary.solid }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-sm text-slate-400">{plan.subtitle}</p>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="mb-6 p-5 rounded-xl border" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.08)'
                  }}>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Mensalidade</span>
                        <span className="font-semibold text-white">
                          {plan.monthlyFee === 0 ? 'R$ 0' : `R$ ${plan.monthlyFee}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Orçamento anúncios</span>
                        <span className="font-semibold text-white">
                          R$ {plan.adBudget.min}-{plan.adBudget.recommended}
                        </span>
                      </div>
                      <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                        <span className="font-bold text-white">Você paga no 1º mês</span>
                        <span className="text-2xl font-bold" style={{ color: colors.primary.solid }}>
                          R$ {plan.totalFirstMonth.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Meses seguintes: R$ {plan.totalRecurring.toLocaleString('pt-BR')}/mês
                      </div>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4 hover:text-slate-300 transition-colors"
                    >
                      <span>O que está incluso</span>
                      <motion.div
                        animate={{ rotate: expandedPlan === plan.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedPlan === plan.id && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="space-y-2.5 overflow-hidden"
                        >
                          {plan.included.map((feature, fIdx) => (
                            <motion.li
                              key={fIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fIdx * 0.05 }}
                              className="flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.primary.solid }} />
                              <span className="text-sm text-slate-300 leading-relaxed">{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Not Included (if any) */}
                  {plan.notIncluded.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                        Não incluso
                      </div>
                      <ul className="space-y-2.5">
                        {plan.notIncluded.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <X className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-500 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <Button
                    size="lg"
                    className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      backgroundImage: isPopular
                        ? `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                        : undefined,
                      backgroundColor: isPopular ? undefined : 'rgba(255, 255, 255, 0.1)',
                      border: isPopular ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'white'
                    }}
                    onClick={() => {
                      // GA4 tracking
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'pricing_cta_click', {
                          plan_id: plan.id,
                          plan_name: plan.name,
                          total_first_month: plan.totalFirstMonth
                        });
                      }
                      scrollToCapture();
                    }}
                  >
                    Quero {plan.name}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Parcelamento */}
          <motion.div
            className="max-w-3xl mx-auto text-center p-6 sm:p-8 rounded-2xl border-2"
            style={{
              background: `linear-gradient(135deg, ${colors.primary.solid}10 0%, ${colors.secondary.solid}10 100%)`,
              borderColor: `${colors.primary.solid}30`
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl font-bold text-white mb-5">
              Dá pra parcelar?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="p-4 rounded-xl border" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: `${colors.primary.solid}30`
              }}>
                <div className="font-semibold text-white mb-1">Setup (R$ 897)</div>
                <div>Até 3x sem juros no cartão</div>
                <div className="text-xs text-slate-400 mt-1">3 × R$ 299</div>
              </div>
              <div className="p-4 rounded-xl border" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: `${colors.primary.solid}30`
              }}>
                <div className="font-semibold text-white mb-1">Mensalidades</div>
                <div>Débito ou cartão automático</div>
                <div className="text-xs text-slate-400 mt-1">Todo dia 5 do mês</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
