'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronRight, TrendingUp, ArrowRight, Eye, Clock, DollarSign, Zap } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

// Tipo para os casos de estudo
interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
    timeframe: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  image: string;
}

// Dados estruturados dos casos de estudo
const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-conversion',
    client: 'CapitalWave',
    industry: 'Fintech',
    problem:
      'Taxa de conversão de 2.7% para o plano Premium, apesar de oferecer 4x mais valor do que competidores.',
    solution:
      'Reorganização completa da arquitetura de decisão com realinhamento simbólico nos 5 momentos-chave de escolha financeira.',
    results: [
      {
        metric: 'Taxa de Conversão Premium',
        before: '2.7%',
        after: '9.4%',
        improvement: '+248%',
        timeframe: '28 dias',
      },
      {
        metric: 'Valor Médio por Cliente',
        before: 'R$127/mês',
        after: 'R$289/mês',
        improvement: '+127%',
        timeframe: '60 dias',
      },
      {
        metric: 'ROI de Aquisição',
        before: '1.4x',
        after: '3.7x',
        improvement: '+164%',
        timeframe: '45 dias',
      },
    ],
    testimonial: {
      quote:
        'João identificou exatamente onde estávamos perdendo oportunidades por falhas de alinhamento simbólico que nenhuma pesquisa de mercado havia mostrado. A implementação foi precisa e os resultados foram imediatos.',
      author: 'Renata Mendes',
      position: 'Head de Produto, CapitalWave',
    },
    image: '/portfolio/case-fintech.jpg',
  },
  {
    id: 'saas-premium',
    client: 'DataSphere',
    industry: 'SaaS B2B',
    problem:
      'Ciclos de vendas longos (63 dias em média) e dificuldade em justificar pricing premium apesar de tecnologia superior.',
    solution:
      'Reconstrução completa da narrativa de valor com alinhamento simbólico em todos os ativos digitais e pontos de contato.',
    results: [
      {
        metric: 'Ciclo de Vendas',
        before: '63 dias',
        after: '27 dias',
        improvement: '-57%',
        timeframe: '90 dias',
      },
      {
        metric: 'Objeção de Preço',
        before: '78% das calls',
        after: '12% das calls',
        improvement: '-85%',
        timeframe: '60 dias',
      },
      {
        metric: 'MRR',
        before: 'R$843K',
        after: 'R$1.87M',
        improvement: '+122%',
        timeframe: '120 dias',
      },
    ],
    testimonial: {
      quote:
        'O trabalho de arquitetura de decisão financeira que João fez transformou completamente nossa posição no mercado. Não mudamos nosso produto ou preço, apenas corrigimos a percepção de valor - e isso mudou tudo.',
      author: 'Marcos Peixoto',
      position: 'CEO, DataSphere',
    },
    image: '/portfolio/case-saas.jpg',
  },
  {
    id: 'ecommerce-aov',
    client: 'LuxCraft',
    industry: 'E-commerce Premium',
    problem:
      'Tráfego qualificado mas baixa conversão (1.3%) e AOV abaixo do esperado para produtos de luxo.',
    solution:
      'Redesenho completo da jornada de decisão financeira com foco em reposicionamento simbólico em pontos-chave.',
    results: [
      {
        metric: 'Taxa de Conversão',
        before: '1.3%',
        after: '4.7%',
        improvement: '+261%',
        timeframe: '45 dias',
      },
      {
        metric: 'Valor Médio de Pedido',
        before: 'R$876',
        after: 'R$1,943',
        improvement: '+122%',
        timeframe: '30 dias',
      },
      {
        metric: 'Return Rate',
        before: '11.7%',
        after: '3.2%',
        improvement: '-73%',
        timeframe: '60 dias',
      },
    ],
    testimonial: {
      quote:
        'A abordagem de João vai muito além do design ou marketing convencionais. Ele identificou exatamente onde estávamos comunicando o valor errado e corrigiu isso com precisão cirúrgica.',
      author: 'Carolina Menezes',
      position: 'Diretora de Marketing, LuxCraft',
    },
    image: '/portfolio/case-ecommerce.jpg',
  },
];

export default function StrategicCaseStudies() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const activeCase = CASE_STUDIES[activeCaseIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Função para formatar métricas com ícones apropriados
  const getMetricIcon = (metric: string) => {
    if (metric.toLowerCase().includes('conversão') || metric.toLowerCase().includes('taxa'))
      return <TrendingUp className="h-5 w-5" />;

    if (
      metric.toLowerCase().includes('valor') ||
      metric.toLowerCase().includes('mrr') ||
      metric.toLowerCase().includes('roi')
    )
      return <DollarSign className="h-5 w-5" />;

    if (metric.toLowerCase().includes('ciclo') || metric.toLowerCase().includes('dias'))
      return <Clock className="h-5 w-5" />;

    return <Zap className="h-5 w-5" />;
  };

  return (
    <section ref={containerRef} className="bg-gradient-to-b from-neutral-100 to-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl text-neutral-900">
            Transformações de Negócios Mensuráveis
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-neutral-600">
            Resultados de clientes reais que implementaram correções estratégicas de Arquitetura de
            Decisão Financeira
          </p>
        </motion.div>

        {/* Case Study Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {CASE_STUDIES.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveCaseIndex(index)}
              className={`rounded-lg px-5 py-3 text-sm font-medium transition-all ${
                index === activeCaseIndex
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-300/30'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              <span className="mr-2">{study.client}</span>
              <span className="text-xs opacity-70">{study.industry}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="grid gap-0 md:grid-cols-5">
              {/* Left Column: Data & Results */}
              <div className="p-8 md:col-span-3 md:p-12">
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    {activeCase.industry}
                  </div>
                  <h3 className="mb-3 text-2xl font-medium text-neutral-900">
                    {activeCase.client}
                  </h3>
                  <div className="mb-6">
                    <p className="mb-1 text-sm text-neutral-500">Desafio:</p>
                    <p className="text-neutral-800">{activeCase.problem}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-neutral-500">Solução:</p>
                    <p className="text-neutral-800">{activeCase.solution}</p>
                  </div>
                </div>

                {/* Results with visualization */}
                <div className="mb-8">
                  <p className="mb-3 text-sm text-neutral-500">Resultados:</p>
                  <div className="grid gap-6">
                    {activeCase.results.map((result, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-neutral-200 bg-neutral-50 p-5"
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              {getMetricIcon(result.metric)}
                            </div>
                            <span className="font-medium text-neutral-700">{result.metric}</span>
                          </div>
                          <div className="rounded-full bg-green-100 px-3 py-1">
                            <span className="font-medium text-green-600">{result.improvement}</span>
                          </div>
                        </div>

                        <div className="relative mb-4 h-2 overflow-hidden rounded-full bg-neutral-200">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
                            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                          />
                        </div>

                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-neutral-500">Antes</p>
                            <p className="font-medium text-neutral-700">{result.before}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-neutral-500">Depois</p>
                            <p className="font-medium text-blue-700">{result.after}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-neutral-500">Período</p>
                            <p className="text-neutral-700">{result.timeframe}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {activeCase.testimonial && (
                  <div className="relative rounded-xl bg-blue-50 p-6">
                    <div className="absolute right-0 top-0 -translate-y-3 translate-x-3 transform opacity-10">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 11H6C5.44772 11 5 10.5523 5 10V6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V10C11 10.5523 10.5523 11 10 11ZM10 11L10 13C10 15.2091 8.20914 17 6 17M18 11H14C13.4477 11 13 10.5523 13 10V6C13 5.44772 13.4477 5 14 5H18C18.5523 5 19 5.44772 19 6V10C19 10.5523 18.5523 11 18 11ZM18 11L18 13C18 15.2091 16.2091 17 14 17"
                          stroke="#0057DA"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="mb-4 italic text-blue-900">"{activeCase.testimonial.quote}"</p>
                    <div>
                      <p className="font-medium text-neutral-900">
                        {activeCase.testimonial.author}
                      </p>
                      <p className="text-sm text-neutral-600">{activeCase.testimonial.position}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Visual Representation */}
              <div className="hidden flex-col bg-neutral-800 md:col-span-2 md:flex">
                <div className="flex flex-1 flex-col p-10">
                  <div className="mb-6">
                    <div className="mb-2 h-6 w-full overflow-hidden rounded-full bg-neutral-700">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full rounded-full bg-blue-500"
                      />
                    </div>
                    <p className="text-sm text-neutral-400">Melhoria média de performance: 85%</p>
                  </div>

                  <div className="relative mt-6 flex-1 overflow-hidden rounded-xl border border-neutral-700">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="rounded-lg bg-black/70 p-4 backdrop-blur-sm">
                        <p className="text-sm text-white">
                          Ver a metodologia completa de Arquitetura de Decisão Financeira
                        </p>
                        <button className="mt-2 flex items-center text-sm text-blue-400 transition-colors hover:text-blue-300">
                          <span>Acessar documento técnico</span>
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* This would be a dynamic image based on the case study */}
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900">
                      {/* Placeholder for a meaningful image/chart */}
                      <div className="text-center">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-neutral-400">
                          <Eye className="h-6 w-6" />
                        </div>
                        <p className="text-neutral-500">Visualização detalhada do caso</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-3 text-2xl font-medium text-neutral-900">
            Sua empresa está deixando dinheiro na mesa?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
            Descubra exatamente onde seus desalinhamentos simbólicos estão causando perdas
            financeiras que podem ser corrigidas em dias, não meses.
          </p>
          <a
            href="/consult"
            className="group inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
          >
            <span>Agende uma Análise de Arquitetura de Decisão</span>
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
