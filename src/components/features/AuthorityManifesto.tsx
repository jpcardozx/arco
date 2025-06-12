'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import React from "react";

export default function AuthorityManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.2]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  // Referências para cada seção para controlar a animação baseada no scroll
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const section1InView = useInView(section1Ref, { once: true, amount: 0.3 });
  const section2InView = useInView(section2Ref, { once: true, amount: 0.3 });
  const section3InView = useInView(section3Ref, { once: true, amount: 0.3 });

  // Métricas de impacto para animação 
  const metrics = [
    {
      label: 'Taxa de Conversão',
      before: '2.1%',
      after: '4.8%'
    },
    {
      label: 'Tempo de Carregamento',
      before: '4.2s',
      after: '1.1s'
    },
    {
      label: 'Valor Médio do Pedido',
      before: 'R$ 287',
      after: 'R$ 412'
    }
  ];

  // Problemas que resolvemos
  const problemsList = [
    'Conversões baixas sem causa identificada',
    'Performance lenta impactando vendas',
    'Implementações técnicas que não geram ROI',
    'Equipes internas sem tempo/expertise para otimização',
    'Agências que entregam relatórios, não resultados'
  ];

  // Etapas do diagnóstico
  const diagnosisSteps = [
    'Mapeamento completo do funil de conversão',
    'Identificação de 12 pontos críticos de atrito',
    'Quantificação do impacto financeiro de cada problema',
    'Priorização por ROI vs esforço de implementação'
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-neutral-900 py-24 text-white"
    >
      {/* Elementos de fundo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="absolute left-1/3 h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute right-1/3 h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />

        <svg className="h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <motion.div
        style={{
          opacity: scrollOpacity,
          scale: scrollScale,
        }}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >
        {/* Seção 1: Declaração de Posicionamento */}
        <div ref={section1Ref} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex h-8 items-center justify-center rounded-full bg-blue-900/40 px-4 font-mono text-xs text-blue-400">
              DIGITAL PERFORMANCE ENGINEERING
            </div>

            <h1 className="mb-8 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Pare de queimar dinheiro em tecnologia que não funciona.
              <br />
              <span className="text-blue-400">
                Nós consertamos.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-neutral-300">
              Para líderes de empresas que perderam a paciência com promessas vazias de agências e desenvolvedores. Aqui você encontra resultados reais, não desculpas.
            </p>
          </motion.div>

          {/* Estatística de Impacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-xl border border-blue-900/50 bg-blue-950/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-50" />

              <div className="relative p-8 md:p-10">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50">
                    <AlertTriangle className="h-8 w-8 text-blue-400" />
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-medium text-white">A Realidade Brutal do Mercado</h2>

                    <div className="mb-6 flex items-baseline gap-4">
                      <span className="text-4xl font-bold text-blue-400 md:text-5xl">94%</span>
                      <p className="text-lg text-neutral-200">
                        dos projetos digitais corporativos falham em entregar o ROI prometido
                      </p>
                    </div>

                    <div className="border-t border-blue-900/50 pt-4">
                      <p className="text-sm text-neutral-400">
                        - Fonte: Standish Group 2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seção 2: Inversão de Posicionamento Técnico */}
        <div ref={section2Ref} className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={section2InView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="grid gap-12 md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={section2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-full rounded-xl border border-neutral-800 p-8">
                <h3 className="mb-6 text-2xl text-neutral-400">
                  NÃO nos contrate se você quer:
                </h3>

                <ul className="space-y-6">
                  {[
                    { name: 'Frontend Development', level: 'Expert', value: 95 },
                    { name: 'UX Design', level: 'Advanced', value: 85 },
                    { name: 'Performance Optimization', level: 'Expert', value: 90 },
                  ].map((skill, i) => (
                    <li key={i} className="relative">
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium text-neutral-300">{skill.name}</span>
                        <span className="text-sm text-neutral-500">{skill.level}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={section2InView ? { width: `${skill.value}%` } : {}}
                          transition={{ duration: 1, delay: 0.4 + i * 0.2 }}
                          className="h-full rounded-full bg-neutral-600"
                        />
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">
                        (Frankamente, há centenas de agências que fazem isso melhor e mais barato que nós)
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={section2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="h-full rounded-xl border border-blue-900/50 bg-gradient-to-br from-blue-900/30 to-blue-950/10 p-8">
                <h3 className="mb-6 text-2xl text-blue-300">
                  CONTRATE-nos para:
                </h3>

                <div className="mb-8">
                  <h4 className="mb-4 text-xl font-bold text-white">
                    Arquitetura de Performance Financeira
                  </h4>

                  <p className="mb-6 text-neutral-300">
                    Transformamos métricas técnicas em resultados financeiros mensuráveis
                  </p>

                  <div className="rounded-r-lg border-l-2 border-blue-400 bg-blue-900/20 p-4">
                    <p className="font-medium text-blue-200">
                      Resultado: R$ 2,4 milhões desperdiçados anualmente por empresa média
                    </p>
                  </div>
                </div>

                <div className="border-t border-blue-800/50 pt-6">
                  <h4 className="mb-4 text-lg font-medium text-white">
                    Resolvemos especificamente:
                  </h4>

                  <ul className="space-y-3">
                    {problemsList.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                        <span className="text-neutral-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Seção 3: Caso de Estudo Proprietário */}
        <div ref={section3Ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={section3InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-medium text-white">
                Caso Real: Varejo Online
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-neutral-400">
                Como recuperamos R$ 847.000 em receita perdida em 21 dias
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Cliente e problema */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={section3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-xl border border-neutral-800 p-6"
              >
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

                <div className="mb-6">
                  <p className="mb-1 text-sm text-neutral-500">CLIENTE</p>
                  <h3 className="text-xl font-medium text-white">E-commerce de Moda Brasileira</h3>
                  <p className="mt-1 text-sm text-neutral-400">R$ 12M em faturamento anual, 85.000 visitantes/mês</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-neutral-500">PROBLEMA</p>
                  <p className="text-neutral-300">
                    Site novo lançado 6 meses antes estava com conversão 40% abaixo do esperado. Equipe interna não conseguia identificar as causas.
                  </p>
                </div>
              </motion.div>

              {/* Diagnóstico e processo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={section3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative overflow-hidden rounded-xl border border-neutral-800 p-6"
              >
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-400 to-purple-400" />

                <div className="mb-6">
                  <p className="mb-1 text-sm text-neutral-500">DIAGNÓSTICO</p>
                  <h3 className="text-xl font-medium text-white">
                    Análise Técnica de Performance
                  </h3>
                </div>

                <ul className="space-y-4">
                  {diagnosisSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-medium text-blue-300">
                        {i + 1}
                      </div>
                      <p className="text-neutral-300">
                        {step}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resultados */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={section3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-blue-900/20 to-transparent p-6"
              >
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-400 to-green-400" />

                <div className="mb-6">
                  <p className="mb-1 text-sm text-neutral-500">RESULTADOS</p>
                  <h3 className="text-xl font-medium text-white">Impacto Financeiro em 3 Semanas</h3>
                </div>

                <div className="mb-6 space-y-4">
                  {metrics.map((metric, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-neutral-800/50 p-3 text-center">
                        <p className="text-xs text-neutral-500">Antes</p>
                        <p className="text-xl text-neutral-400">{metric.before}</p>
                      </div>
                      <div className="rounded-lg border border-blue-800/50 bg-blue-900/30 p-3 text-center">
                        <p className="text-xs text-blue-400">Depois</p>
                        <p className="text-xl text-blue-300">{metric.after}</p>
                      </div>
                      <div className="col-span-2 text-center">
                        <p className="text-xs text-neutral-500">{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-r-lg border-l-2 border-green-500 bg-green-900/20 p-4">
                  <p className="text-sm text-green-300">
                    "Em 3 semanas eles encontraram e corrigiram problemas que nossa equipe interna e duas agências anteriores não conseguiram resolver em 6 meses. O ROI foi imediato."
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">- Pedro Silva, CEO</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={section3InView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            href="/diagnose"
            className="group inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-700"
          >
            <span>Diagnóstico Gratuito</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="mt-4 text-sm text-neutral-500">
            Oferecemos análise gratuita de 30 minutos para identificar suas maiores oportunidades de receita
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
