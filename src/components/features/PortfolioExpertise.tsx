'use client';

import { motion, useInView } from 'framer-motion';
import { Aperture, LineChart, ShieldCheck, Zap, BadgeCheck } from 'lucide-react';
import React, { useRef } from 'react';

interface ExpertiseArea {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  capabilities: string[];
}

const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'perception-engineering',
    title: 'Perception Engineering',
    icon: <Aperture className="h-6 w-6" />,
    description:
      'Strategic reconfiguration of how your value is perceived through structural symbolic alignment.',
    capabilities: [
      'Perception-value gap analysis',
      'Symbolic misalignment identification',
      'Visual hierarchy restructuring',
      'Information architecture optimization',
    ],
  },
  {
    id: 'premium-positioning',
    title: 'Premium Positioning',
    icon: <BadgeCheck className="h-6 w-6" />,
    description:
      'Establishing proper market positioning that reflects your actual expertise and quality.',
    capabilities: [
      'Authority signaling framework',
      'Strategic narrative development',
      'Pricing psychology alignment',
      'Competitive differentiation',
    ],
  },
  {
    id: 'conversion-architecture',
    title: 'Arquitetura de Conversão',
    icon: <LineChart className="h-6 w-6" />,
    description:
      'Projetando caminhos de decisão que removem atritos e aceleram o reconhecimento de valor.',
    capabilities: [
      'Mapeamento de sequência de decisão',
      'Prevenção de objeções',
      'Fluxo de informação value-first',
      'Eliminação de atrito cognitivo',
    ],
  },
  {
    id: 'results-measurement',
    title: 'Mensuração de Resultados',
    icon: <Zap className="h-6 w-6" />,
    description: 'Mensuração quantificável de melhorias de percepção-valor e impacto econômico.',
    capabilities: [
      'Otimização de taxa de conversão',
      'Aceleração de ciclo de vendas',
      'Aumento do valor médio do pedido',
      'Adoção de camada premium',
    ],
  },
];

export default function PortfolioExpertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="expertise" ref={containerRef} className="bg-neutral-50 py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:max-w-3xl"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-blue-600">
            Expertise Especializada
          </span>
          <h2 className="mb-4 mt-2 font-serif text-4xl text-neutral-900">
            Tradução de Valor Estratégico
          </h2>
          <p className="mb-6 text-lg text-neutral-700">
            Eu me especializo em corrigir o desalinhamento entre excelência técnica e percepção de
            mercado. Esta expertise foi desenvolvida através de anos analisando como a percepção
            impacta resultados econômicos em diferentes setores.
          </p>
          <p className="text-neutral-600">
            Diferente de abordagens gerais de marketing ou design que focam em estética ou mensagens
            amplas, minha metodologia atinge os elementos simbólicos específicos que impactam
            diretamente como seu valor é percebido e avaliado pelos tomadores de decisão.
          </p>
        </motion.div>

        {/* Expertise areas */}
        <div className="grid gap-8 md:grid-cols-2">
          {EXPERTISE_AREAS.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-lg bg-blue-50 p-3 text-blue-600">{area.icon}</div>
                <h3 className="text-2xl font-medium text-neutral-900">{area.title}</h3>
              </div>

              <p className="mb-6 text-neutral-700">{area.description}</p>

              <div className="space-y-3">
                {area.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mr-3 mt-1 rounded-full bg-green-50 p-1">
                      <ShieldCheck className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-neutral-800">{capability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-xl border border-blue-100 bg-blue-50 p-8"
        >
          <div className="items-center md:flex">
            <div className="md:w-2/3 md:pr-8">
              <h3 className="mb-4 text-2xl font-medium text-neutral-900">
                Por Que o Alinhamento Percepção-Valor Importa
              </h3>
              <p className="mb-4 text-neutral-700">
                Quando a percepção do seu mercado não combina com seu valor real, você enfrenta
                desafios específicos de negócio:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-red-50 p-1">
                    <span className="block h-3 w-3 rounded-full bg-red-500" />
                  </div>
                  <span className="text-neutral-800">
                    Resistência constante a preços apesar da qualidade superior
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-red-50 p-1">
                    <span className="block h-3 w-3 rounded-full bg-red-500" />
                  </div>
                  <span className="text-neutral-800">
                    Ciclos de venda mais longos pois o valor demora para ser demonstrado
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-red-50 p-1">
                    <span className="block h-3 w-3 rounded-full bg-red-500" />
                  </div>
                  <span className="text-neutral-800">
                    Comparação inadequada com concorrentes menos capazes
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-red-50 p-1">
                    <span className="block h-3 w-3 rounded-full bg-red-500" />
                  </div>
                  <span className="text-neutral-800">
                    Expertise que permanece invisível para os tomadores de decisão chave
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/3">
              <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-xl font-medium text-neutral-900">Diagnóstico Especializado</h4>
                <p className="mb-6 text-neutral-700">
                  Descubra exatamente onde suas lacunas percepção-valor estão criando atrito na
                  jornada do seu cliente.
                </p>
                <a
                  href="#contact"
                  className="block w-full rounded-lg bg-blue-600 py-2.5 text-center font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Request Analysis
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
