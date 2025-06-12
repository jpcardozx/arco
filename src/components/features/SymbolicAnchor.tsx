'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import React from "react";
import {
  FiEye,
  FiDollarSign,
  FiArrowRight,
  FiCheckCircle,
  FiArrowDown,
  FiAlertCircle,
} from 'react-icons/fi';

export default function PerceptionGapAnalyzer() {
  // States for interactive analyzer
  const [industry, setIndustry] = useState('saas');
  const [revenue, setRevenue] = useState(500000);
  const [activeCase, setActiveCase] = useState(0);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const analyzerRef = useRef<HTMLDivElement>(null);

  // Calculate perception gap and estimated monthly loss
  const getPerceptionGap = () => {
    const baseGap =
      {
        saas: 34,
        consulting: 41,
        agency: 38,
        ecommerce: 29,
      }[industry] || 35;

    // Scale gap based on revenue to make larger businesses have bigger gaps
    const revenueScale = Math.min(Math.log(revenue / 10000) / 10, 1.5);
    return Math.round(baseGap * revenueScale);
  };

  const getEstimatedLoss = () => {
    const percentLoss = getPerceptionGap() / 100;
    return Math.round(revenue * percentLoss);
  };

  const perceptionGap = getPerceptionGap();
  const estimatedLoss = getEstimatedLoss();

  // Case studies data
  const caseStudies = [
    {
      industry: 'Plataforma SaaS',
      company: 'TechStream Solutions',
      problem: 'Estratégia de precificação premium sendo prejudicada por concorrentes com soluções inferiores',
      perceptionIssue:
        'Linguagem técnica ofuscava a narrativa de valor; presença visual carecia de sinais premium',
      impact: '43% de aumento no valor médio de negócios enterprise após correção de percepção',
      timeframe: '21 dias',
    },
    {
      industry: 'Consultoria',
      company: 'Meridian Partners',
      problem: 'Alta taxa de rejeição de propostas apesar de metodologia sólida e equipe especializada',
      perceptionIssue:
        "Presença digital comunicava 'boutique' quando precisavam transmitir 'autoridade estabelecida'",
      impact: '68% de melhoria na taxa de aceitação de propostas após alinhamento de percepção',
      timeframe: '14 dias',
    },
    {
      industry: 'Agência Digital',
      company: 'Prism Creative',
      problem: 'Pressão constante de preços apesar de entregar resultados superiores aos clientes',
      perceptionIssue:
        'Casos de estudo enfatizavam execução ao invés de valor estratégico; faltavam sinais de posicionamento premium',
      impact: '52% de redução em objeções de preço e 31% de aumento no valor médio de projetos',
      timeframe: '30 dias',
    },
  ];  // Common perception gaps by industry
  const perceptionGaps: Record<string, string[]> = {
    saas: [
      'Expertise técnica parece genérica apesar da especialização profunda',
      'Valor do produto é diluído por linguagem focada em funcionalidades',
      'Precificação premium parece injustificada devido a questões de percepção visual',
    ],
    consulting: [
      'Expertise é percebida como mais restrita do que as capacidades reais',
      'Liderança de pensamento não se traduz em capacidade de implementação percebida',
      'Estrutura de honorários parece excessiva sem o enquadramento adequado de valor',
    ],
    agency: [
      'Qualidade criativa é subcomunicada através de apresentação de portfólio deficiente',
      'Capacidade estratégica é escondida por ênfase em execução tática',
      'Expertise parece comoditizada apesar de metodologias únicas',
    ],
    ecommerce: [
      'Percepção de qualidade do produto não corresponde à excelência real do produto',
      'Posicionamento premium é prejudicado por fatores visuais de confiança',
      'História da marca falha em criar alinhamento emocional de valor',
    ],
  };

  // Scroll to full analysis when shown
  useEffect(() => {
    if (showFullAnalysis && analyzerRef.current) {
      analyzerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showFullAnalysis]);

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mx-auto mb-6 max-w-3xl font-serif text-3xl leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            O desalinhamento simbólico cria uma lacuna quantificável de receita entre seu{' '}
            <span className="text-blue-600">valor real</span> e suas{' '}
            <span className="text-blue-600">taxas de conversão</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-700">
            Nossa análise de mais de 200 empresas revela que 20-40% da receita potencial é perdida
            devido a pontos específicos de atrito simbólico que criam dissonância cognitiva durante
            momentos-chave de decisão.
          </p>
        </div>

        {/* Interactive Analyzer Tool */}
        <div className="mb-20 overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-blue-50 shadow-lg">
          <div className="p-8 md:p-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="mb-6 text-2xl font-medium text-neutral-900">
                  Calculadora de Lacuna de Receita Simbólica™
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-neutral-700">Sua indústria</label>
                    <select
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 p-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="saas">SaaS / Tecnologia</option>
                      <option value="consulting">Consultoria / Serviços Profissionais</option>
                      <option value="agency">Criativo / Agência</option>
                      <option value="ecommerce">E-commerce / Varejo</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-neutral-700">Receita mensal ($)</label>
                    <input
                      type="range"
                      min="50000"
                      max="2000000"
                      step="50000"
                      value={revenue}
                      onChange={e => setRevenue(parseInt(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-blue-600"
                    />
                    <div className="mt-1 flex justify-between text-sm text-neutral-500">
                      <span>$50K</span>
                      <span>${revenue.toLocaleString()}</span>
                      <span>$2M+</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                      <div>
                        <p className="mb-1 text-neutral-500">Sua lacuna de percepção</p>
                        <div className="relative mb-1 h-5 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className={`absolute left-0 top-0 h-full ${perceptionGap > 30
                              ? 'bg-red-500'
                              : perceptionGap > 20
                                ? 'bg-amber-500'
                                : 'bg-green-500'
                              }`}
                            style={{ width: `${perceptionGap}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-neutral-400">
                          <span>0%</span>
                          <span
                            className={`font-medium ${perceptionGap > 30
                              ? 'text-red-600'
                              : perceptionGap > 20
                                ? 'text-amber-600'
                                : 'text-green-600'
                              }`}
                          >
                            {perceptionGap}%
                          </span>
                          <span>50%</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="mb-1 text-neutral-500">Perda estimada de receita mensal</p>
                        <p className="text-3xl font-bold text-red-600">
                          ${estimatedLoss.toLocaleString()}
                        </p>
                        <p className="mt-1 text-sm text-neutral-400">
                          Devido ao desalinhamento de percepção
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 flex items-center text-lg font-medium text-neutral-900">
                  <FiAlertCircle className="mr-2 text-blue-600" />
                  Lacunas de percepção comuns em sua indústria
                </h4>

                <ul className="mb-6 space-y-3">
                  {' '}
                  {perceptionGaps[industry]?.map((gap: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <FiArrowRight className="mt-1 flex-shrink-0 text-blue-600" />
                      <span className="text-neutral-700">{gap}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-neutral-100 pt-4">
                  <p className="mb-4 text-neutral-700">
                    Essas lacunas de percepção criam barreiras invisíveis entre seu valor real e a
                    disposição do seu público-alvo em pagar taxas premium.
                  </p>

                  <button
                    onClick={() => setShowFullAnalysis(true)}
                    className="flex items-center font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    Obtenha sua análise completa de percepção
                    <FiArrowDown className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Carousel */}
        <div className="mb-20">
          <h3 className="mb-6 font-serif text-2xl text-neutral-900">
            Como a correção de percepção gera impacto financeiro
          </h3>

          <div className="mb-6 grid grid-cols-3 gap-4">
            {caseStudies.map((cs, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`rounded-lg px-4 py-3 text-center text-sm font-medium transition-all ${activeCase === index
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
              >
                {cs.industry}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-10 md:grid-cols-2">
                    <div className="space-y-5">
                      <div>
                        <p className="mb-1 text-neutral-500">{caseStudies[activeCase].industry}</p>
                        <h4 className="text-xl font-medium text-neutral-900">
                          {caseStudies[activeCase].company}
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border-l-2 border-neutral-300 bg-neutral-50 p-4">
                          <h5 className="mb-1 font-medium text-neutral-700">O Problema:</h5>
                          <p className="text-neutral-700">{caseStudies[activeCase].problem}</p>
                        </div>

                        <div className="rounded-lg border-l-2 border-blue-300 bg-blue-50 p-4">
                          <h5 className="mb-1 font-medium text-blue-800">
                            Questão de Percepção Identificada:
                          </h5>
                          <p className="text-blue-800">{caseStudies[activeCase].perceptionIssue}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <FiDollarSign className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-100">Impacto Financeiro</p>
                            <h4 className="text-xl font-bold">{caseStudies[activeCase].impact}</h4>
                          </div>
                        </div>

                        <div className="inline-block rounded-lg bg-white/10 p-3">
                          <div className="flex items-center gap-2">
                            <FiCheckCircle />
                            <span>Implementado em {caseStudies[activeCase].timeframe}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
                        <h5 className="mb-3 font-medium text-neutral-800">
                          Como Funciona a Correção de Percepção:
                        </h5>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-xs font-medium text-blue-700">1</span>
                            </div>
                            <span className="text-neutral-700">
                              Diagnóstico preciso dos pontos de ruptura de percepção
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-xs font-medium text-blue-700">2</span>
                            </div>
                            <span className="text-neutral-700">
                              Realinhamento simbólico direcionado em pontos-chave de decisão
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-xs font-medium text-blue-700">3</span>
                            </div>
                            <span className="text-neutral-700">
                              Implementação sem interromper as operações principais
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-xs font-medium text-blue-700">4</span>
                            </div>
                            <span className="text-neutral-700">
                              Validação através de medição de impacto financeiro
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Full Analysis Section */}
        <AnimatePresence>
          {showFullAnalysis && (
            <motion.div
              ref={analyzerRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-blue-900 text-white shadow-xl">
                <div className="p-10">
                  <div className="grid gap-10 md:grid-cols-2">
                    <div>
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                        <FiEye className="text-blue-300" />
                        <span className="text-blue-100">Análise de Percepção</span>
                      </div>

                      <h3 className="mb-6 text-2xl font-medium">
                        Sua empresa {industry.charAt(0).toUpperCase() + industry.slice(1)} está
                        perdendo aproximadamente
                        <span className="text-blue-300">
                          {' '}
                          ${estimatedLoss.toLocaleString()}
                        </span>{' '}
                        mensais devido a lacunas de percepção
                      </h3>

                      <p className="mb-6 text-neutral-300">
                        Com base em nossa análise de mais de 200 empresas similares em sua indústria,
                        aqui está o que provavelmente está causando seus vazamentos invisíveis de receita:
                      </p>

                      <div className="space-y-5">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                          <h4 className="mb-2 flex items-center text-lg font-medium">
                            <span className="mr-2 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm text-red-300">
                              1
                            </span>
                            Desalinhamento Valor-Percepção
                          </h4>
                          <p className="text-neutral-300">
                            Sua expertise e qualidade reais são provavelmente significativamente maiores
                            do que sua presença digital comunica, criando atrito imediato nos ciclos de vendas.
                          </p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                          <h4 className="mb-2 flex items-center text-lg font-medium">
                            <span className="mr-2 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm text-amber-300">
                              2
                            </span>
                            Lacunas Silenciosas de Credibilidade
                          </h4>
                          <p className="text-neutral-300">
                            Sinais críticos de confiança provavelmente estão ausentes ou inadequadamente
                            enquadrados, causando hesitação em pontos-chave de decisão na jornada do cliente.
                          </p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                          <h4 className="mb-2 flex items-center text-lg font-medium">
                            <span className="mr-2 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm text-blue-300">
                              3
                            </span>
                            Atrito Preço-Percepção
                          </h4>
                          <p className="text-neutral-300">
                            Sua precificação está sendo avaliada contra benchmarks simbólicos errados,
                            criando atrito desnecessário quando suas taxas deveriam ser percebidas como justificadas.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h4 className="mb-4 text-lg font-medium">
                          Seu potencial de correção de percepção
                        </h4>

                        <div className="space-y-5">
                          <div>
                            <div className="mb-1 flex justify-between text-sm">
                              <span className="text-neutral-300">Recuperação de Receita</span>
                              <span className="text-blue-300">
                                ${Math.round(estimatedLoss * 0.7).toLocaleString()} - $
                                {estimatedLoss.toLocaleString()}/mês
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: '85%' }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-1 flex justify-between text-sm">
                              <span className="text-neutral-300">Prazo de Implementação</span>
                              <span className="text-blue-300">14-21 dias</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-green-500"
                                style={{ width: '30%' }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-1 flex justify-between text-sm">
                              <span className="text-neutral-300">Investimento Necessário</span>
                              <span className="text-blue-300">Mínimo comparado ao impacto</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-amber-500"
                                style={{ width: '25%' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 shadow-lg">
                        <h4 className="mb-4 text-xl font-medium">
                          Pronto para fechar sua lacuna de percepção?
                        </h4>
                        <p className="mb-6 text-blue-100">
                          Obtenha uma análise precisa de suas lacunas específicas de percepção e um
                          roteiro para recuperar sua receita perdida em 21 dias.
                        </p>

                        <Link
                          href="/diagnose"
                          className="group inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-blue-600 shadow transition-all hover:shadow-lg"
                        >
                          Obtenha Seu Diagnóstico de Precisão
                          <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <p className="mt-3 text-sm text-blue-200">
                          Limitado a 3 empresas por mês
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Value Proposition Closing */}
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 font-serif text-2xl text-neutral-900 md:text-3xl">
            Sua expertise merece ser percebida corretamente
          </h3>
          <p className="mb-8 text-lg text-neutral-700">
            Como seria seu negócio se cada prospect percebesse com precisão seu verdadeiro valor
            desde a primeira interação? Pare de perder negócios que deveria estar ganhando.
          </p>

          <Link
            href="/diagnose"
            className="group inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 font-medium text-white shadow-lg transition-colors hover:bg-blue-700"
          >
            Diagnostique Suas Lacunas de Percepção
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
