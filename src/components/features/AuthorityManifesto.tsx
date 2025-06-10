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
    { before: '2.3%', after: '8.7%', label: 'Taxa de conversão premium' },
    { before: 'R$347K', after: 'R$978K', label: 'Receita mensal' },
    { before: '42 dias', after: '17 dias', label: 'Ciclo de decisão' },
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
              MANIFESTO DE AUTORIDADE
            </div>

            <h1 className="mb-8 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Eu não <span className="line-through opacity-70">otimizo sites</span>.
              <br />
              <span className="text-blue-400">
                Corrijo arquiteturas de decisão financeira comprometidas.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-neutral-300">
              Em 7 anos mapeando padrões de abandono e conversão em empresas de tecnologia,
              identifiquei um padrão consistente: o problema raramente é técnico. É um{' '}
              <span className="text-blue-300">desalinhamento simbólico</span> entre o valor real
              oferecido e sua percepção.
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
                    <h2 className="mb-4 text-2xl font-medium text-white">Insight proprietário:</h2>

                    <div className="mb-6 flex items-baseline gap-4">
                      <span className="text-4xl font-bold text-blue-400 md:text-5xl">83%</span>
                      <p className="text-lg text-neutral-200">
                        dos problemas de conversão{' '}
                        <span className="font-medium">não são resolvidos</span> por redesigns,
                        melhorias técnicas ou campanhas de marketing - mas por
                        <span className="text-blue-300">
                          {' '}
                          realinhamentos simbólicos precisos
                        </span>{' '}
                        nos pontos críticos de decisão financeira.
                      </p>
                    </div>

                    <div className="border-t border-blue-900/50 pt-4">
                      <p className="text-sm text-neutral-400">
                        Fonte: Análise de 147 empresas de tecnologia entre 2022-2025 | Immediate
                        Revenue Framework™ Research
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
                  Não me contrate por estas habilidades:
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
                        Estas são apenas ferramentas, não diferenciais estratégicos.
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
                  Contrate-me por esta capacidade única:
                </h3>

                <div className="mb-8">
                  <h4 className="mb-4 text-xl font-bold text-white">
                    Arquitetura de Decisão Financeira
                  </h4>

                  <p className="mb-6 text-neutral-300">
                    A habilidade de identificar <span className="text-blue-300">exatamente</span>{' '}
                    onde e como a percepção de valor está desalinhada com o valor real, causando
                    perdas financeiras diretas e mensuráveis - e corrigi-las com precisão cirúrgica.
                  </p>

                  <div className="rounded-r-lg border-l-2 border-blue-400 bg-blue-900/20 p-4">
                    <p className="font-medium text-blue-200">
                      Resultado: Aumento médio de 37% em receita em 21 dias para clientes que
                      implementam as correções recomendadas.
                    </p>
                  </div>
                </div>

                <div className="border-t border-blue-800/50 pt-6">
                  <h4 className="mb-4 text-lg font-medium text-white">
                    Aplicado a problemas como:
                  </h4>

                  <ul className="space-y-3">
                    {[
                      'Conversão em tiers premium abaixo do esperado',
                      'Ciclos de venda excessivamente longos',
                      'Alta taxa de abandono em checkouts',
                      'Pressão de preço apesar de qualidade superior',
                    ].map((item, i) => (
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
                Estudo de Caso: Transformação Real
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-neutral-400">
                Como realizei um aumento de 182% em receita através de correções estratégicas sem
                alterar a estrutura de preços ou o produto
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
                  <p className="mb-1 text-sm text-neutral-500">Cliente</p>
                  <h3 className="text-xl font-medium text-white">TechNexus</h3>
                  <p className="mt-1 text-sm text-neutral-400">Série B - R$47M captados</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-neutral-500">Problema</p>
                  <p className="text-neutral-300">
                    Taxa de conversão premium estagnada em 2.3% apesar de múltiplas otimizações
                    técnicas e campanhas de marketing.
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
                  <p className="mb-1 text-sm text-neutral-500">Diagnóstico</p>
                  <h3 className="text-xl font-medium text-white">
                    Arquitetura de Decisão Comprometida
                  </h3>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-medium text-blue-300">
                      1
                    </div>
                    <p className="text-neutral-300">
                      Identificação de 7 pontos críticos de desalinhamento simbólico
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-medium text-blue-300">
                      2
                    </div>
                    <p className="text-neutral-300">
                      Quantificação de perda mensal de R$212.430 devido a estes desalinhamentos
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-medium text-blue-300">
                      3
                    </div>
                    <p className="text-neutral-300">
                      Implementação de 12 correções estratégicas nos pontos de maior impacto
                    </p>
                  </li>
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
                  <p className="mb-1 text-sm text-neutral-500">Resultados</p>
                  <h3 className="text-xl font-medium text-white">Em 21 dias de implementação</h3>
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
                    "João não apenas aumentou nossa receita em 182% - ele nos mostrou exatamente
                    onde estávamos desperdiçando dinheiro em desalinhamentos que nunca teríamos
                    encontrado sozinhos."
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">— Marcelo Santos, CEO, TechNexus</p>
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
            <span>Descubra quanto você está perdendo em desalinhamentos simbólicos</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="mt-4 text-sm text-neutral-500">
            Vagas limitadas: apenas 3 diagnósticos disponíveis por semana
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
