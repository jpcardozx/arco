"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Zap, LineChart, Aperture, Lock, Users, BadgeCheck, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Methodology {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    impact: string;
    applications: string[];
}

interface Framework {
    id: string;
    name: string;
    description: string;
    elements: string[];
    icon: React.ReactNode;
}

const STRATEGIC_METHODOLOGIES: Methodology[] = [
    {
        id: "symbolic-alignment",
        name: "Alinhamento Simbólico",
        icon: <Layers className="h-6 w-6" />,
        description: "Recalibração dos sistemas simbólicos para eliminar dissonâncias cognitivas no processo de decisão financeira.",
        impact: "Redução de 73% em objeções de preço e aumento de 47% em vendas de alto valor",
        applications: [
            "Páginas de vendas com baixa conversão",
            "Ciclos de vendas longos ou estagnados",
            "Alta rejeição de propostas em fase final"
        ]
    },
    {
        id: "perception-architecture",
        name: "Arquitetura de Percepção",
        icon: <Aperture className="h-6 w-6" />,
        description: "Estruturação dos fluxos de informação para criar inevitabilidade de valor através de sequenciamento cognitivo otimizado.",
        impact: "Aumento médio de 62% em conversão e 83% em upsells para tiers premium",
        applications: [
            "Lançamentos de produtos/serviços",
            "Funnel de vendas complexos",
            "Reposicionamento estratégico de marca"
        ]
    },
    {
        id: "financial-decision-mapping",
        name: "Mapeamento de Decisão Financeira",
        icon: <LineChart className="h-6 w-6" />,
        description: "Identificação e correção de pontos de atrito financeiros específicos em cada etapa do processo de compra.",
        impact: "Redução média de 61% no tempo de decisão e aumento de 43% em valor médio de venda",
        applications: [
            "Processos de vendas B2B",
            "Ofertas com múltiplos níveis de preço",
            "Serviços de alto valor com ciclos longos"
        ]
    },
    {
        id: "value-inversion",
        name: "Inversão de Valor",
        icon: <Zap className="h-6 w-6" />,
        description: "Reconfiguração da hierarquia de valor percebido para eliminar comparações baseadas em preço e métricas comuns.",
        impact: "Aumento de 87% em vendas premium e redução de 53% em pressão por descontos",
        applications: [
            "Mercados altamente competitivos",
            "Produtos/serviços considerados commodities",
            "Reposicionamento de preço premium"
        ]
    }
];

const STRATEGIC_FRAMEWORKS: Framework[] = [
    {
        id: "immediate-revenue",
        name: "Immediate Revenue Framework™",
        description: "Sistema proprietário para identificação e correção de desalinhamentos simbólicos que bloqueiam receita imediata.",
        elements: [
            "Diagnóstico de Arquitetura de Decisão",
            "Mapa de Dissonância Simbólica",
            "Protocolo de Intervenção Precisa",
            "Implementação Rápida de Alto Impacto"
        ],
        icon: <BadgeCheck className="h-6 w-6" />
    },
    {
        id: "perception-equity",
        name: "Perception Equity System™",
        description: "Metodologia para construção de ativos de percepção que geram valor financeiro mensurável e defensável.",
        elements: [
            "Auditoria de Capital Simbólico",
            "Blueprint de Ativos de Percepção",
            "Estratégia de Implantação Sequenciada",
            "Métricas de Valor Simbólico"
        ],
        icon: <Lock className="h-6 w-6" />
    },
    {
        id: "strategic-differentiation",
        name: "Strategic Differentiation Matrix™",
        description: "Framework para criar diferenciação inimitável através de posicionamento estratégico proprietário.",
        elements: [
            "Auditoria de Território Estratégico",
            "Mapeamento de Blue Ocean Simbólico",
            "Protocolo de Diferenciação Narrativa",
            "Sistema de Defesa de Posicionamento"
        ],
        icon: <Users className="h-6 w-6" />
    }
];

export default function StrategicExpertise() {
    const [activeFramework, setActiveFramework] = useState<string>(STRATEGIC_FRAMEWORKS[0].id);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={containerRef}
            className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white py-24"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                <svg className="h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl font-serif mb-6">
                        Metodologias Proprietárias de <span className="text-blue-400">Arquitetura de Decisão Financeira</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        Sistemas estratégicos desenvolvidos em 7 anos de pesquisa aplicada
                        e testados em mais de 150 empresas com resultados mensuráveis
                    </p>
                </motion.div>

                {/* Metodologias Estratégicas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
                >
                    {STRATEGIC_METHODOLOGIES.map((method, index) => (
                        <motion.div
                            key={method.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="bg-blue-900/30 h-12 w-12 rounded-lg flex items-center justify-center text-blue-400 mb-5">
                                    {method.icon}
                                </div>

                                <h3 className="text-xl font-medium text-white mb-3">{method.name}</h3>

                                <p className="text-neutral-400 mb-4 min-h-[80px]">
                                    {method.description}
                                </p>

                                <div className="mb-4 pb-4 border-b border-neutral-700">
                                    <p className="text-sm text-neutral-500 mb-1">Impacto Médio Documentado</p>
                                    <p className="text-blue-400 text-sm font-medium">{method.impact}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-500 mb-2">Aplicações Principais</p>
                                    <ul className="space-y-2">
                                        {method.applications.map((app, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-neutral-300">{app}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Frameworks Exclusivos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">
                            Frameworks Exclusivos
                        </h3>
                        <p className="text-neutral-400 max-w-2xl mx-auto">
                            Sistemas estratégicos desenvolvidos e aperfeiçoados através de implementação
                            em dezenas de empresas com resultados documentados
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 backdrop-blur-sm border border-neutral-700 rounded-xl overflow-hidden">
                        <div className="grid md:grid-cols-5 gap-0">
                            {/* Framework Selection */}
                            <div className="md:col-span-2 border-r border-neutral-700">
                                <div className="p-8">
                                    <p className="text-neutral-500 text-sm mb-4">Selecione um framework</p>

                                    <div className="space-y-2">
                                        {STRATEGIC_FRAMEWORKS.map(framework => (
                                            <button
                                                key={framework.id}
                                                onClick={() => setActiveFramework(framework.id)}
                                                className={`w-full text-left p-4 rounded-lg transition-all ${activeFramework === framework.id
                                                        ? 'bg-blue-900/30 border border-blue-800/50'
                                                        : 'hover:bg-neutral-800/50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${activeFramework === framework.id ? 'bg-blue-800/70 text-blue-300' : 'bg-neutral-800 text-neutral-400'
                                                        }`}>
                                                        {framework.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-medium ${activeFramework === framework.id ? 'text-blue-300' : 'text-white'}`}>
                                                            {framework.name}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Framework Details */}
                            <div className="md:col-span-3 relative">
                                {STRATEGIC_FRAMEWORKS.map(framework => (
                                    <div
                                        key={framework.id}
                                        className={`p-8 ${activeFramework === framework.id ? 'block' : 'hidden'}`}
                                    >
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-medium text-white mb-3">
                                                {framework.name}
                                            </h3>
                                            <p className="text-neutral-400">
                                                {framework.description}
                                            </p>
                                        </div>

                                        <div className="mb-8">
                                            <p className="text-sm text-neutral-500 mb-4">Componentes do Framework</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {framework.elements.map((element, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 flex items-start gap-3"
                                                    >
                                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 font-medium">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-neutral-300">{element}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                                                <span>Solicitar acesso à documentação técnica</span>
                                                <ChevronRight className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Background decorative element */}
                                <div className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none opacity-10">
                                    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            fill="url(#gradient)"
                                            d="M41.9,-71.2C53.7,-66,62.4,-53.1,69.8,-39.3C77.1,-25.6,83.2,-10.9,81.8,2.8C80.3,16.5,71.3,29.2,61.4,39.2C51.6,49.2,40.8,56.5,29.2,63.3C17.5,70.1,5,76.3,-6.8,75.9C-18.5,75.5,-29.5,68.6,-41.6,61.2C-53.8,53.7,-67.1,45.7,-71.8,33.7C-76.6,21.8,-73,5.8,-71.3,-11.4C-69.7,-28.5,-69.9,-46.9,-61.1,-57.2C-52.2,-67.6,-34.2,-70,-18.7,-75.2C-3.1,-80.5,10.9,-88.5,24.7,-87.9C38.5,-87.3,52.2,-78,41.9,-71.2Z"
                                            transform="translate(100 100) scale(0.8)"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Credenciais e Certificações */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-xl font-medium text-white mb-6">
                        Certificações e Credenciais Profissionais
                    </h3>

                    <div className="flex flex-wrap justify-center gap-6 items-center">
                        {/* Placeholder para logos de certificações */}
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className="h-12 bg-neutral-800/60 backdrop-blur-sm rounded-md px-6 flex items-center justify-center text-neutral-500"
                            >
                                Certificação {i}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
