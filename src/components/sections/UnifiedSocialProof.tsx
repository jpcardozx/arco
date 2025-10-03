'use client';

/**
 * UNIFIED SOCIAL PROOF - shadcn + Tailwind v4
 * Consolida: Client Stories + Testimonials + Case Studies
 * Zero redundância, máxima conversão
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  TrendingUp,
  ArrowRight,
  Quote,
  Star,
  CheckCircle2
} from 'lucide-react';

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  results: {
    metric: string;
    improvement: string;
    color: 'teal' | 'orange' | 'emerald';
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

const cases: CaseStudy[] = [
  {
    company: 'TechCommerce',
    industry: 'E-commerce B2B',
    challenge: 'Checkout abandonado: 67% por lentidão mobile (4.2s)',
    results: [
      { metric: 'LCP', improvement: '4.2s → 1.6s', color: 'teal' },
      { metric: 'Conversão Mobile', improvement: '+75%', color: 'emerald' },
      { metric: 'Receita', improvement: '+R$43K/mês', color: 'orange' }
    ],
    testimonial: {
      quote: 'ROI 3.2x no primeiro mês. Mobile virou nosso principal canal de crescimento.',
      author: 'Sarah Chen',
      role: 'VP Growth',
      avatar: 'SC'
    }
  },
  {
    company: 'FinanceFlow',
    industry: 'SaaS Financeiro',
    challenge: 'Bounce rate 72% + penalização SEO por Core Web Vitals',
    results: [
      { metric: 'Bounce Rate', improvement: '72% → 28%', color: 'teal' },
      { metric: 'Leads Qualificados', improvement: '+127%', color: 'emerald' },
      { metric: 'Tráfego Orgânico', improvement: '+89%', color: 'orange' }
    ],
    testimonial: {
      quote: 'De penalizado para #1 no Google. Performance salvou nossa estratégia de crescimento.',
      author: 'Marcus Rodriguez',
      role: 'CTO',
      avatar: 'MR'
    }
  },
  {
    company: 'RetailMax',
    industry: 'Varejo Multicanal',
    challenge: '45% perda de receita mobile em alta temporada (5.1s load)',
    results: [
      { metric: 'Mobile Load', improvement: '5.1s → 1.7s', color: 'teal' },
      { metric: 'Vendas Mobile', improvement: '+114%', color: 'emerald' },
      { metric: 'Revenue Recovery', improvement: '+R$67K/mês', color: 'orange' }
    ],
    testimonial: {
      quote: 'Black Friday sem crashes. Otimização pagou 10x o investimento.',
      author: 'Jennifer Walsh',
      role: 'Head of Digital',
      avatar: 'JW'
    }
  }
];

const MetricBadge = ({
  metric,
  improvement,
  color
}: {
  metric: string;
  improvement: string;
  color: 'teal' | 'orange' | 'emerald';
}) => {
  const colorClasses = {
    teal: 'bg-arco-teal-500/10 text-arco-teal-400 border-arco-teal-500/30',
    orange: 'bg-arco-orange-500/10 text-arco-orange-400 border-arco-orange-500/30',
    emerald: 'bg-arco-emerald-500/10 text-arco-emerald-400 border-arco-emerald-500/30'
  };

  return (
    <div className={`px-3 py-2 rounded-lg border ${colorClasses[color]} text-sm font-semibold`}>
      <div className="text-xs opacity-70">{metric}</div>
      <div className="text-base">{improvement}</div>
    </div>
  );
};

const CaseCard = ({ caseStudy, index }: { caseStudy: CaseStudy; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
  >
    <Card className="arco-card-hover border-arco-neutral-800 bg-arco-neutral-900/50 backdrop-blur-sm h-full">
      <CardContent className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{caseStudy.company}</h3>
            <p className="text-sm text-neutral-400">{caseStudy.industry}</p>
          </div>
          <Badge variant="outline" className="border-arco-emerald-500/50 text-arco-emerald-400">
            Sucesso
          </Badge>
        </div>

        {/* Challenge */}
        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-1 h-full bg-red-500 rounded-full mt-1" />
            <div>
              <p className="text-xs font-semibold text-red-400 mb-1">Problema</p>
              <p className="text-sm text-neutral-300">{caseStudy.challenge}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-2">
          {caseStudy.results.map((result, idx) => (
            <MetricBadge key={idx} {...result} />
          ))}
        </div>

        {/* Testimonial */}
        <div className="pt-4 border-t border-neutral-800">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-arco-teal-500 flex-shrink-0 mt-1" />
            <div className="space-y-3 flex-1">
              <p className="text-sm text-neutral-300 italic leading-relaxed">
                "{caseStudy.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-arco-teal-500/30">
                  <AvatarFallback className="bg-arco-teal-500/20 text-arco-teal-400 font-semibold">
                    {caseStudy.testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {caseStudy.testimonial.author}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {caseStudy.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const OverallStats = () => {
  const stats = [
    { label: 'ROI Médio', value: '3.2x', sublabel: 'Primeiros 60 dias' },
    { label: 'Recovery', value: 'R$50K+', sublabel: 'Por mês (média)' },
    { label: 'Performance', value: 'LCP < 1.8s', sublabel: 'Garantido' },
    { label: 'Satisfação', value: '100%', sublabel: 'Retenção' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="arco-glass rounded-xl p-6 text-center group hover:scale-105 transition-transform"
        >
          <div className="text-3xl lg:text-4xl font-bold arco-gradient-text mb-2">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
          <div className="text-xs text-neutral-400">{stat.sublabel}</div>
        </motion.div>
      ))}
    </div>
  );
};

export const UnifiedSocialProof: React.FC = () => {
  return (
    <section className="arco-section relative overflow-hidden bg-gradient-to-b from-arco-neutral-950 to-arco-neutral-900">

      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]" />
      </div>

      <div className="arco-container relative z-10 space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <Badge className="arco-cta-primary border-0 px-6 py-3">
            <Star className="w-4 h-4 mr-2" />
            Resultados Comprovados
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Cases de <span className="arco-gradient-text">Sucesso Reais</span>
          </h2>

          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Empresas que transformaram performance em receita com ROI documentado
          </p>
        </motion.div>

        {/* Overall Stats */}
        <OverallStats />

        {/* Case Studies */}
        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((caseStudy, index) => (
            <CaseCard key={index} caseStudy={caseStudy} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="arco-glass rounded-2xl p-8 lg:p-12 text-center space-y-6"
        >
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">
              Seu site pode ter resultados similares?
            </h3>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Análise gratuita identifica quanto você está perdendo e como recuperar
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="arco-cta-primary px-8 py-6 text-lg font-bold border-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Solicitar Análise Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <TrendingUp className="w-4 h-4" />
              <span>ROI médio 320% • Sem compromisso</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedSocialProof;
