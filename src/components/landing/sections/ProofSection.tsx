'use client';

import React from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
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

// Caso real com progressão e ROI explícito
const realCase = {
  name: 'Carol',
  business: 'Studio Carol Nails',
  location: 'Moema, SP',
  progression: [
    { month: 'Mês 1', bookings: 8, growth: null },
    { month: 'Mês 2', bookings: 14, growth: '+75%' },
    { month: 'Mês 3', bookings: 18, growth: '+29%' },
  ],
  roi: {
    investment: 897, // R$ 1.499 setup - R$ 602 desconto early adopter
    revenue: 1440,   // 18 bookings × R$ 80 ticket médio
    profit: 543,
  },
};

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

          {/* Real Case: Progression + ROI */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="rounded-2xl p-6 sm:p-8 border-2"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.solid}08 0%, ${colors.secondary.solid}08 100%)`,
                borderColor: `${colors.primary.solid}30`
              }}
            >
              {/* Header do Caso */}
              <div className="flex items-start gap-4 mb-6 sm:mb-8">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                  }}
                >
                  {realCase.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg sm:text-xl text-white">{realCase.name}</div>
                  <div className="text-sm sm:text-base text-slate-400">{realCase.business} • {realCase.location}</div>
                </div>
              </div>

              {/* Progression Chart */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2.5 mb-4">
                  <TrendingUp className="w-5 h-5" style={{ color: colors.primary.solid }} />
                  <h4 className="font-semibold text-base sm:text-lg text-white">
                    Como foi mês a mês (primeiros 3 meses):
                  </h4>
                </div>
                                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  {realCase.progression.map((month, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="rounded-xl p-4 sm:p-5 border-2 relative overflow-hidden"
                      style={{
                        borderColor: `${colors.primary.solid}30`,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold mb-1.5" style={{ color: colors.primary.solid }}>
                        {month.bookings}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-400">
                        {month.month}
                      </div>
                      {month.growth && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-500/10 text-green-400 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full border border-green-500/30">
                            {month.growth}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ROI Calculation */}
              <motion.div 
                className="rounded-xl p-5 sm:p-6 border"
                style={{ 
                  borderColor: `${colors.primary.solid}30`,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600"
                  >
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-white">
                    Quanto entrou vs quanto gastou (mês 3):
                  </h4>
                </div>

                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-300">Gastou total (setup + anúncios 3 meses)</span>
                    <span className="font-bold text-red-400 whitespace-nowrap">
                      - R$ {realCase.roi.investment.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-300">Faturou com clientes novas (18 × R$ 80)</span>
                    <span className="font-bold text-emerald-400 whitespace-nowrap">
                      + R$ {realCase.roi.revenue.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="pt-3 border-t flex justify-between items-center gap-4" style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                    <span className="font-bold text-white">Sobrou limpo</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400 whitespace-nowrap">
                      R$ {realCase.roi.profit.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div 
                  className="mt-4 p-3 rounded-lg"
                  style={{ backgroundColor: `${colors.primary.solid}10` }}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.primary.solid }} />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">Importante:</span> Isso conta só cliente nova que veio do anúncio.
                      Não tá contando se ela volta (recorrência) nem se ela fez serviço mais caro.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial */}
              <motion.div 
                className="mt-6 p-4 sm:p-5 rounded-xl border-l-4"
                style={{ 
                  borderColor: colors.primary.solid,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic mb-3">
                  "Achei caro no começo. Mas no segundo mês já paguei tudo só com as clientes novas que vieram do anúncio.
                  Hoje acordo com WhatsApp cheio de confirmação automática."
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">5.0</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
