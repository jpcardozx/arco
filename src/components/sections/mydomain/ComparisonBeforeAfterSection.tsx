'use client';

import { motion } from 'framer-motion';
import { 
  TrendingDown, 
  TrendingUp, 
  X, 
  Check,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Percent
} from 'lucide-react';

/**
 * COMPARISON BEFORE/AFTER SECTION - S-TIER
 * 
 * Mostra comparação visual antes/depois com métricas reais
 * Baseado em casos de clientes reais da ARCO
 * 
 * Design: Dark mode clean, split view, animated metrics
 */

interface MetricComparison {
  label: string;
  before: string;
  after: string;
  improvement: string;
  icon: React.ReactNode;
}

const metrics: MetricComparison[] = [
  {
    label: 'Taxa de Conversão',
    before: '1.2%',
    after: '4.8%',
    improvement: '+300%',
    icon: <Percent className="w-5 h-5" />,
  },
  {
    label: 'Tempo na Página',
    before: '45s',
    after: '3m 20s',
    improvement: '+344%',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: 'Bounce Rate',
    before: '68%',
    after: '28%',
    improvement: '-59%',
    icon: <TrendingDown className="w-5 h-5" />,
  },
  {
    label: 'Page Speed',
    before: '2.8s',
    after: '0.9s',
    improvement: '-68%',
    icon: <Sparkles className="w-5 h-5" />,
  },
];

interface Issue {
  text: string;
  severity: 'critical' | 'high' | 'medium';
}

const beforeIssues: Issue[] = [
  { text: 'CTA principal invisível no mobile', severity: 'critical' },
  { text: 'Formulário com 12 campos obrigatórios', severity: 'critical' },
  { text: 'Tempo de carregamento 4.2s', severity: 'high' },
  { text: 'Falta de prova social e trust signals', severity: 'high' },
  { text: 'Copy genérico e sem valor claro', severity: 'medium' },
];

const afterImprovements: string[] = [
  'CTA destacado com contraste 7:1 (WCAG AAA)',
  'Formulário reduzido para 3 campos + progressive disclosure',
  'Performance otimizada: 0.9s (Lighthouse 98)',
  'Trust badges + 850 empresas + ROI real',
  'Copy orientado a valor e benefícios mensuráveis',
];

export default function ComparisonBeforeAfterSection() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Resultados Reais
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Transformação Mensurável
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed">
            Veja como empresas do seu setor aumentaram{' '}
            <strong className="text-emerald-400">+340% em conversões</strong>{' '}
            após implementar as recomendações da ARCO.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-950/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50">
                  <div className="text-slate-400">{metric.icon}</div>
                </div>
                <span className="text-sm font-medium text-slate-400">{metric.label}</span>
              </div>

              {/* Before */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">Antes</span>
                <span className="text-lg font-bold text-red-400">{metric.before}</span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center my-2">
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </div>

              {/* After */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500">Depois</span>
                <span className="text-lg font-bold text-emerald-400">{metric.after}</span>
              </div>

              {/* Improvement badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400">{metric.improvement}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before/After Split Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-950/80 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Antes da ARCO</h3>
                <p className="text-sm text-slate-400">Problemas críticos identificados</p>
              </div>
            </div>

            <div className="space-y-3">
              {beforeIssues.map((issue, index) => {
                const severityColors = {
                  critical: 'bg-red-500/10 border-red-500/30 text-red-400',
                  high: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
                  medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-300 mb-2">{issue.text}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${severityColors[issue.severity]}`}>
                        {issue.severity === 'critical' && 'Crítico'}
                        {issue.severity === 'high' && 'Alto'}
                        {issue.severity === 'medium' && 'Médio'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-950/80 backdrop-blur-sm border-2 border-emerald-500/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Depois da ARCO</h3>
                <p className="text-sm text-slate-400">Soluções implementadas</p>
              </div>
            </div>

            <div className="space-y-3">
              {afterImprovements.map((improvement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-300 flex-1">{improvement}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Impact Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">+R$ 850k</div>
              <div className="text-sm text-slate-400">Receita adicional média/ano</div>
            </div>
            <div className="h-16 w-px bg-slate-700/50 hidden sm:block" />
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">6-8 sem</div>
              <div className="text-sm text-slate-400">Payback period médio</div>
            </div>
            <div className="h-16 w-px bg-slate-700/50 hidden sm:block" />
            <div>
              <div className="text-5xl font-bold text-purple-400 mb-2">12x ROI</div>
              <div className="text-sm text-slate-400">Retorno sobre investimento</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
