'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  Target, 
  Zap, 
  CheckCircle2,
  BarChart3,
  Eye,
  MousePointerClick,
  Clock,
  DollarSign
} from 'lucide-react';

/**
 * RESULTS PREVIEW SECTION - S-TIER
 * 
 * Mostra ao usuário o que ele vai receber no relatório de 48h
 * Aumenta percepção de valor antes do form
 * 
 * Design: Dark mode clean (slate-950/900)
 * Animation: Stagger cards, smooth entrance
 */

interface ReportFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  color: string;
}

const reportFeatures: ReportFeature[] = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Análise de Conversão',
    description: 'Identificamos +15 pontos críticos que impedem vendas',
    metric: '+127% conversão',
    color: 'teal',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'UX Heurística',
    description: 'Auditoria completa dos 10 princípios de Nielsen',
    metric: '50+ melhorias',
    color: 'purple',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Performance',
    description: 'Core Web Vitals, loading, e otimizações técnicas',
    metric: '60% mais rápido',
    color: 'orange',
  },
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    title: 'Heatmap Insights',
    description: 'Onde usuários clicam, scrollam e abandonam',
    metric: '3 zonas mortas',
    color: 'emerald',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Benchmarking',
    description: 'Comparação com top 10 concorrentes do setor',
    metric: 'Gap analysis',
    color: 'blue',
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'ROI Projection',
    description: 'Estimativa de aumento de receita com melhorias',
    metric: '+R$ 340k/ano',
    color: 'green',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
};

export default function ResultsPreviewSection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <FileText className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">
              O que você receberá
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Relatório Completo de Diagnóstico
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed">
            Em <strong className="text-white">48 horas</strong>, você recebe um documento 
            de <strong className="text-teal-400">30+ páginas</strong> com análise profunda 
            e recomendações <strong className="text-emerald-400">priorizadas por impacto</strong>.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reportFeatures.map((feature, index) => {
            const colors = colorMap[feature.color];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} mb-4`}>
                  <div className={colors.text}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Metric badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-xs font-semibold ${colors.text}`}>
                    {feature.metric}
                  </span>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-teal-500/20 border border-teal-500/30">
                <Clock className="w-7 h-7 text-teal-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">48 horas</div>
                <div className="text-sm text-slate-400">Tempo de entrega garantido</div>
              </div>
            </div>

            <div className="h-12 w-px bg-slate-700/50 hidden sm:block" />

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <CheckCircle2 className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">100% Grátis</div>
                <div className="text-sm text-slate-400">Sem compromisso ou cartão</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
