'use client';

import React from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Star, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface ProofSectionProps {
  campaign: Campaign;
}

// Distribuição honesta de resultados (23 salões, jan-mar 2025)
const distribution = [
  { range: '0-5 clientes novas', percentage: 17, intensity: 0.3 },
  { range: '6-18 clientes novas', percentage: 52, intensity: 0.6 },
  { range: '19-35 clientes novas', percentage: 22, intensity: 0.85 },
  { range: '36+ clientes novas', percentage: 9, intensity: 1.0 },
];

// Casos reais com progressão e ROI explícito
const realCases = [
  {
    id: 'carol',
    name: 'Carol',
    business: 'Studio Carol Nails',
    location: 'Moema, SP',
    focus: 'Crescimento de agenda',
    progression: [
      { month: 'Mês 1', bookings: 8, growth: null },
      { month: 'Mês 2', bookings: 14, growth: '+75%' },
      { month: 'Mês 3', bookings: 18, growth: '+29%' },
    ],
    roi: {
      investment: 897,
      revenue: 1440,
      profit: 543,
    },
    testimonial: "Achei caro no começo. Mas no segundo mês já paguei tudo só com as clientes novas que vieram do anúncio. Hoje acordo com WhatsApp cheio de confirmação automática.",
  },
  {
    id: 'marina',
    name: 'Marina',
    business: 'Studio Marina Beauty',
    location: 'Pinheiros, SP',
    focus: 'Redução de falta',
    metric: 'Taxa de falta',
    before: '28%',
    after: '9%',
    improvement: '-68%',
    detail: 'Com confirmação automática, clientes confirmam presença',
    testimonial: "O sistema de lembrete faz toda a diferença. Antes era todo dia uma cliente desaparecendo. Agora meu faturamento é previsível.",
  },
  {
    id: 'lapa',
    name: 'Lapa Salon',
    business: 'Salão Lapa Salon',
    location: 'Lapa, SP',
    focus: 'Visibilidade no Google',
    metric: 'Posição Google',
    before: 'Página 3+',
    after: '1ª página',
    timeline: '18 dias',
    detail: 'Otimização + anúncio posicionaram no topo',
    testimonial: "Meus clientes agora me acham quando procuram 'salão perto de mim'. Antes meu concorrente aparecia primeiro.",
  },
];

export function ProofSection({ campaign }: ProofSectionProps) {
  const colors = useCampaignColors(campaign);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[15%] right-[20%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ backgroundColor: colors.primary.solid }}
        />
        <div 
          className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
          style={{ backgroundColor: colors.secondary.solid }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-4">
              O que aconteceu com{' '}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                }}
              >
                23 salões que testaram
              </span>{' '}
              (bom e ruim)
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
              Janeiro a março 2025 • Metade conseguiu 12 clientes novas/mês ou mais
            </p>
          </motion.div>

          {/* Distribution Chart */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl p-6 sm:p-8 shadow-lg border" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.primary.solid}20 0%, ${colors.secondary.solid}20 100%)`,
                    border: `1px solid ${colors.primary.solid}30`
                  }}
                >
                  <BarChart3 className="w-5 h-5" style={{ color: colors.primary.solid }} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  Como se distribuiu (nem todo mundo teve o mesmo resultado)
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {distribution.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="w-full sm:w-48 text-sm font-medium text-slate-300">
                        {item.range}
                      </div>
                      <div className="flex-1 h-12 relative rounded-lg overflow-hidden" style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      }}>
                        <motion.div
                          className="h-full flex items-center justify-end px-4"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`,
                            opacity: item.intensity
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: idx * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span className="text-white font-bold text-base sm:text-lg">
                            {item.percentage}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-6 p-4 rounded-lg border-l-4"
                style={{ 
                  backgroundColor: `${colors.primary.solid}10`,
                  borderColor: colors.primary.solid
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary.solid }} />
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">Por que 17% tiveram poucas clientes?</span><br/>
                      Investiram menos de R$ 450/mês em anúncio (não dá pra competir), ou ticket médio muito baixo (menos de R$ 50), ou ficam em lugar com pouca gente.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Real Cases Grid */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">3 Salões, 3 desafios diferentes</h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Carol - ROI */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="rounded-2xl p-6 sm:p-8 border-2 h-full"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary.solid}08 0%, ${colors.secondary.solid}08 100%)`,
                    borderColor: `${colors.primary.solid}30`
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                      }}
                    >
                      C
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-white">{realCases[0].name}</div>
                      <div className="text-sm text-slate-400">{realCases[0].focus}</div>
                    </div>
                  </div>

                  {/* Progression */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <TrendingUp className="w-4 h-4" style={{ color: colors.primary.solid }} />
                      <h4 className="font-semibold text-sm text-white">Crescimento (3 meses)</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {realCases[0]?.progression?.map((month, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                          viewport={{ once: true }}
                          className="rounded-lg p-3 border text-center"
                          style={{
                            borderColor: `${colors.primary.solid}30`,
                            backgroundColor: 'rgba(255, 255, 255, 0.02)'
                          }}
                        >
                          <div className="text-xl font-bold" style={{ color: colors.primary.solid }}>
                            {month.bookings}
                          </div>
                          <div className="text-xs text-slate-400">{month.month}</div>
                          {month.growth && (
                            <div className="text-xs text-green-400 font-bold mt-1">{month.growth}</div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* ROI */}
                  {realCases[0]?.roi && (
                    <motion.div
                      className="rounded-lg p-4 border space-y-2 text-sm"
                      style={{
                        borderColor: `${colors.primary.solid}30`,
                        backgroundColor: 'rgba(255, 255, 255, 0.02)'
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-slate-400">Investido</span>
                        <span className="font-bold text-red-400">- R$ {realCases[0].roi.investment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Faturado</span>
                        <span className="font-bold text-emerald-400">+ R$ {realCases[0].roi.revenue}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-700 flex justify-between">
                        <span className="font-bold text-white">Lucro</span>
                        <span className="text-lg font-bold text-emerald-400">R$ {realCases[0].roi.profit}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Testimonial */}
                  <motion.div
                    className="mt-4 pt-4 border-t border-slate-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <p className="text-sm text-slate-300 italic mb-3">"{realCases[0].testimonial}"</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Marina & Lapa - Metrics */}
              <div className="space-y-6">
                {/* Marina */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-6 border-2"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary.solid}08 0%, ${colors.secondary.solid}08 100%)`,
                    borderColor: `${colors.primary.solid}30`
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                      }}
                    >
                      M
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-white">{realCases[1].name}</div>
                      <div className="text-xs text-slate-400">{realCases[1].focus}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">{realCases[1].metric}:</span>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-sm line-through text-slate-500">{realCases[1].before}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="font-bold text-emerald-400">{realCases[1].after}</span>
                        <span className="text-xs text-emerald-400 font-semibold">{realCases[1].improvement}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{realCases[1].detail}</p>
                    <p className="text-sm text-slate-300 italic pt-2 border-t border-slate-700">"{realCases[1].testimonial}"</p>
                  </div>
                </motion.div>

                {/* Lapa */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-6 border-2"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary.solid}08 0%, ${colors.secondary.solid}08 100%)`,
                    borderColor: `${colors.primary.solid}30`
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                      }}
                    >
                      L
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-white">{realCases[2].name}</div>
                      <div className="text-xs text-slate-400">{realCases[2].focus}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">{realCases[2].metric}:</span>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-sm line-through text-slate-500">{realCases[2].before}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="font-bold text-emerald-400">{realCases[2].after}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-white">{realCases[2].timeline}</span> para chegar ao topo
                    </div>
                    <p className="text-xs text-slate-400">{realCases[2].detail}</p>
                    <p className="text-sm text-slate-300 italic pt-2 border-t border-slate-700">"{realCases[2].testimonial}"</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
