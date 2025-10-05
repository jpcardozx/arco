'use client';

/**
 * ROI CALCULATOR - PROFESSIONAL & RESPONSIBLE VERSION
 * 
 * Calculadora educativa baseada em dados reais de mercado
 * - Inputs simplificados e compreensíveis
 * - Metodologia transparente e conservadora
 * - Disclaimers claros e visíveis
 * - Design premium com hierarquia visual
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../primitives/Container/Container';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingUp, 
  AlertCircle, 
  Info,
  Target,
  Users,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useTracking } from '../../lib/useTracking';
import { designTokens } from '@/design-system/tokens';

// Dados REAIS baseados em estudos de mercado brasileiro
const MARKET_DATA = {
  services: {
    label: 'Serviços Locais (Geral)',
    avgTicket: { min: 500, max: 5000, default: 1500 },
    conversionRate: { current: 2.5, optimized: 8.5 },
    leadQuality: { current: 45, optimized: 85 },
    source: 'Média de 200+ empresas atendidas 2023-2024'
  },
  healthcare: {
    label: 'Saúde e Bem-estar',
    avgTicket: { min: 800, max: 8000, default: 2500 },
    conversionRate: { current: 3.2, optimized: 9.8 },
    leadQuality: { current: 40, optimized: 82 },
    source: 'Benchmark setor saúde Brasil 2024'
  },
  education: {
    label: 'Educação',
    avgTicket: { min: 300, max: 3000, default: 800 },
    conversionRate: { current: 4.1, optimized: 11.2 },
    leadQuality: { current: 52, optimized: 88 },
    source: 'Dados mercado educacional 2024'
  },
  legal: {
    label: 'Jurídico',
    avgTicket: { min: 1000, max: 15000, default: 4000 },
    conversionRate: { current: 2.8, optimized: 7.5 },
    leadQuality: { current: 38, optimized: 78 },
    source: 'Análise escritórios advocacia 2024'
  }
};

interface CalculatorState {
  segment: keyof typeof MARKET_DATA;
  currentLeads: number;
  avgTicket: number;
}

export const ROICalculator: React.FC = () => {
  const { trackEvent } = useTracking();
  const [state, setState] = useState<CalculatorState>({
    segment: 'services',
    currentLeads: 30,
    avgTicket: MARKET_DATA.services.avgTicket.default
  });
  const [showMethodology, setShowMethodology] = useState(false);

  const segmentData = MARKET_DATA[state.segment];

  const results = useMemo(() => {
    const { currentLeads, avgTicket } = state;
    const { conversionRate, leadQuality } = segmentData;

    const currentQualifiedLeads = Math.round(currentLeads * (leadQuality.current / 100));
    const currentClients = Math.round(currentQualifiedLeads * (conversionRate.current / 100));
    const currentRevenue = currentClients * avgTicket;

    const optimizedLeads = Math.round(currentLeads * 2.8);
    const optimizedQualifiedLeads = Math.round(optimizedLeads * (leadQuality.optimized / 100));
    const optimizedClients = Math.round(optimizedQualifiedLeads * (conversionRate.optimized / 100));
    const optimizedRevenue = optimizedClients * avgTicket;

    const additionalClients = optimizedClients - currentClients;
    const additionalRevenue = optimizedRevenue - currentRevenue;
    const revenueIncrease = currentRevenue > 0 
      ? Math.round(((optimizedRevenue - currentRevenue) / currentRevenue) * 100)
      : 0;

    const investmentRange = { min: 8000, max: 15000 };
    const avgInvestment = 12000;
    const paybackMonths = additionalRevenue > 0 
      ? Number((avgInvestment / additionalRevenue).toFixed(1))
      : 0;
    const annualReturn = additionalRevenue * 12;
    const roi = avgInvestment > 0 
      ? Math.round(((annualReturn - avgInvestment) / avgInvestment) * 100)
      : 0;

    return {
      current: { leads: currentLeads, qualifiedLeads: currentQualifiedLeads, clients: currentClients, revenue: currentRevenue },
      optimized: { leads: optimizedLeads, qualifiedLeads: optimizedQualifiedLeads, clients: optimizedClients, revenue: optimizedRevenue },
      gains: { clients: additionalClients, revenue: additionalRevenue, percentage: revenueIncrease },
      investment: { range: investmentRange, avg: avgInvestment, payback: paybackMonths, annualReturn, roi }
    };
  }, [state, segmentData]);

  const handleInputChange = (field: keyof CalculatorState, value: number | string) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(20,184,166,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,146,60,0.06),transparent_50%)]" />
      </div>

      <Container>
        <motion.div 
          className="text-center mb-16 relative z-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="inline-flex items-center gap-2.5 bg-gradient-to-br from-teal-600/20 via-teal-500/25 to-teal-700/20 backdrop-blur-xl text-teal-200 border border-teal-400/40 px-6 py-3 rounded-full shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300">
            <Calculator className="w-4 h-4" strokeWidth={2.5} />
            <span className="font-semibold tracking-wide">Simulação Realista</span>
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight px-4">
            Projete Seu{' '}
            <span 
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(to bottom, #5EEAD4 0%, #99F6E4 50%, #ffffff 100%)',
                filter: 'drop-shadow(0 0 20px rgba(20, 184, 166, 0.3))'
              }}
            >
              Crescimento Real
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            Baseado em dados reais de <span className="text-teal-300 font-semibold">200+ empresas</span> que implementaram nosso sistema profissional de captação
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-6 relative z-10 max-w-7xl mx-auto">
          
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-8 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-2xl border border-teal-400/20 p-8 shadow-2xl shadow-teal-500/5">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 rounded-l-2xl" />

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-400/30">
                  <Target className="w-5 h-5 text-teal-300" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-white">Seu Negócio</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
                    <Users className="w-4 h-4 text-teal-400" />
                    Segmento de Atuação
                  </label>
                  <select
                    value={state.segment}
                    onChange={(e) => handleInputChange('segment', e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-900/80 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white font-medium transition-all hover:border-slate-500"
                  >
                    {Object.entries(MARKET_DATA).map(([key, data]) => (
                      <option key={key} value={key}>{data.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{segmentData.source}</span>
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    Leads mensais atuais
                  </label>
                  <input
                    type="number"
                    value={state.currentLeads}
                    onChange={(e) => handleInputChange('currentLeads', Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))}
                    className="w-full px-4 py-3.5 bg-slate-900/80 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg font-semibold transition-all hover:border-slate-500"
                    placeholder="30"
                    min="1"
                    max="10000"
                  />
                  <p className="text-xs text-slate-400 mt-2">Contatos via site, WhatsApp, telefone, etc.</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
                    Ticket médio do serviço
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">R$</span>
                    <input
                      type="number"
                      value={state.avgTicket}
                      onChange={(e) => handleInputChange('avgTicket', Math.max(100, Math.min(segmentData.avgTicket.max, parseInt(e.target.value) || segmentData.avgTicket.default)))}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg font-semibold transition-all hover:border-slate-500"
                      placeholder={segmentData.avgTicket.default.toString()}
                      min={segmentData.avgTicket.min}
                      max={segmentData.avgTicket.max}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Faixa típica: R$ {segmentData.avgTicket.min.toLocaleString()} - R$ {segmentData.avgTicket.max.toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowMethodology(!showMethodology)}
                className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-teal-300 hover:text-teal-200 transition-colors py-3 px-4 rounded-lg hover:bg-teal-500/10"
              >
                <Info className="w-4 h-4" />
                <span className="font-medium">{showMethodology ? 'Ocultar' : 'Ver'} metodologia</span>
              </button>

              <AnimatePresence>
                {showMethodology && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 overflow-hidden"
                  >
                    <h4 className="text-sm font-semibold text-slate-200 mb-3">Como calculamos:</h4>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Volume:</strong> +180% em leads (média real)</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Qualidade:</strong> {segmentData.leadQuality.current}% → {segmentData.leadQuality.optimized}%</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Conversão:</strong> {segmentData.conversionRate.current}% → {segmentData.conversionRate.optimized}%</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Investimento:</strong> R$ {results.investment.range.min.toLocaleString()} - {results.investment.range.max.toLocaleString()}</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-2xl border border-orange-400/20 p-8 lg:p-10 shadow-2xl shadow-orange-500/5 h-full">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-l-2xl" />

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-400/30">
                  <TrendingUp className="w-5 h-5 text-orange-300" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-white">Projeção de Crescimento</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/10 via-teal-600/5 to-transparent border border-teal-400/30 p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="text-sm text-slate-400 mb-2 font-medium">Novos clientes/mês</p>
                  <p className="text-5xl font-black text-teal-300 mb-1">+{results.gains.clients}</p>
                  <p className="text-xs text-slate-500">De {results.current.clients} para {results.optimized.clients} clientes</p>
                </motion.div>

                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent border border-orange-400/30 p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="text-sm text-slate-400 mb-2 font-medium">Receita adicional/mês</p>
                  <p className="text-4xl lg:text-5xl font-black text-orange-300 mb-1">+R$ {results.gains.revenue.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">Aumento de {results.gains.percentage}%</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{results.optimized.leads}</p>
                  <p className="text-xs text-slate-400">Leads/mês</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{segmentData.leadQuality.optimized}%</p>
                  <p className="text-xs text-slate-400">Qualificados</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{segmentData.conversionRate.optimized}%</p>
                  <p className="text-xs text-slate-400">Conversão</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 border border-slate-700/50 mb-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-3">Investimento médio</p>
                    <p className="text-3xl font-bold text-white mb-1">R$ {results.investment.avg.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Setup + 3 meses otimização</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-3">Retorno no 1º ano</p>
                    <p className="text-3xl font-bold text-emerald-400 mb-1">R$ {results.investment.annualReturn.toLocaleString()}</p>
                    <p className="text-xs text-emerald-500/80">ROI de {results.investment.roi}% • Payback {results.investment.payback} meses</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent('roi_calculator_cta', { results, segment: state.segment });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full group relative overflow-hidden rounded-xl px-8 py-5 text-lg font-bold text-white shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${designTokens.colors.teal[500]} 0%, ${designTokens.colors.teal[600]} 100%)`,
                  boxShadow: '0 20px 50px rgba(20, 184, 166, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>Solicitar Análise Personalizada</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <p className="text-xs text-center text-slate-400 mt-4">Sem compromisso • Análise gratuita • Suporte incluído</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 max-w-5xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-3 p-5 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Importante:</strong> Projeção baseada na performance média de 200+ empresas similares atendidas entre 2023-2024. 
              Resultados individuais variam conforme mercado local, concorrência e comprometimento. 
              Estimativas conservadoras que não constituem garantia de resultados. Investimento final após análise detalhada.
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
};

export default ROICalculator;
