"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, AlertTriangle, Divide } from "lucide-react";

export default function AuthorityManifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
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
        { before: "2.3%", after: "8.7%", label: "Taxa de conversão premium" },
        { before: "R$347K", after: "R$978K", label: "Receita mensal" },
        { before: "42 dias", after: "17 dias", label: "Ciclo de decisão" }
    ];

    return (
        <section
            ref={containerRef}
            className="relative bg-neutral-900 text-white py-24 overflow-hidden"
        >
            {/* Elementos de fundo */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <div className="absolute h-full w-px left-1/3 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
                <div className="absolute h-full w-px right-1/3 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />

                <svg className="h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

            <motion.div
                style={{
                    opacity: scrollOpacity,
                    scale: scrollScale
                }}
                className="relative z-10 max-w-7xl mx-auto px-6"
            >
                {/* Seção 1: Declaração de Posicionamento */}
                <div ref={section1Ref} className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={section1InView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <div className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-blue-900/40 text-blue-400 text-xs font-mono mb-6">
                            MANIFESTO DE AUTORIDADE
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
                            Eu não <span className="line-through opacity-70">otimizo sites</span>.
                            <br />
                            <span className="text-blue-400">Corrijo arquiteturas de decisão financeira comprometidas.</span>
                        </h1>

                        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                            Em 7 anos mapeando padrões de abandono e conversão em empresas de tecnologia,
                            identifiquei um padrão consistente: o problema raramente é técnico.
                            É um <span className="text-blue-300">desalinhamento simbólico</span> entre
                            o valor real oferecido e sua percepção.
                        </p>
                    </motion.div>

                    {/* Estatística de Impacto */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={section1InView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="relative overflow-hidden rounded-xl border border-blue-900/50 bg-blue-950/30 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-50" />

                            <div className="relative p-8 md:p-10">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-900/50 flex items-center justify-center">
                                        <AlertTriangle className="h-8 w-8 text-blue-400" />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-medium text-white mb-4">
                                            Insight proprietário:
                                        </h2>

                                        <div className="flex items-baseline gap-4 mb-6">
                                            <span className="text-4xl md:text-5xl font-bold text-blue-400">83%</span>
                                            <p className="text-lg text-neutral-200">
                                                dos problemas de conversão <span className="font-medium">não são resolvidos</span> por
                                                redesigns, melhorias técnicas ou campanhas de marketing - mas por
                                                <span className="text-blue-300"> realinhamentos simbólicos precisos</span> nos
                                                pontos críticos de decisão financeira.
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-blue-900/50">
                                            <p className="text-neutral-400 text-sm">
                                                Fonte: Análise de 147 empresas de tecnologia entre 2022-2025 | Immediate Revenue Framework™ Research
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
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={section2InView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="p-8 rounded-xl border border-neutral-800 h-full">
                                <h3 className="text-2xl mb-6 text-neutral-400">
                                    Não me contrate por estas habilidades:
                                </h3>

                                <ul className="space-y-6">
                                    {[
                                        { name: "Frontend Development", level: "Expert", value: 95 },
                                        { name: "UX Design", level: "Advanced", value: 85 },
                                        { name: "Performance Optimization", level: "Expert", value: 90 }
                                    ].map((skill, i) => (
                                        <li key={i} className="relative">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium text-neutral-300">{skill.name}</span>
                                                <span className="text-sm text-neutral-500">{skill.level}</span>
                                            </div>
                                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={section2InView ? { width: `${skill.value}%` } : {}}
                                                    transition={{ duration: 1, delay: 0.4 + (i * 0.2) }}
                                                    className="h-full bg-neutral-600 rounded-full"
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
                            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-950/10 border border-blue-900/50 h-full">
                                <h3 className="text-2xl mb-6 text-blue-300">
                                    Contrate-me por esta capacidade única:
                                </h3>

                                <div className="mb-8">
                                    <h4 className="text-xl font-bold text-white mb-4">
                                        Arquitetura de Decisão Financeira
                                    </h4>

                                    <p className="text-neutral-300 mb-6">
                                        A habilidade de identificar <span className="text-blue-300">exatamente</span> onde e como
                                        a percepção de valor está desalinhada com o valor real, causando perdas
                                        financeiras diretas e mensuráveis - e corrigi-las com precisão cirúrgica.
                                    </p>

                                    <div className="p-4 bg-blue-900/20 border-l-2 border-blue-400 rounded-r-lg">
                                        <p className="text-blue-200 font-medium">
                                            Resultado: Aumento médio de 37% em receita em 21 dias para clientes
                                            que implementam as correções recomendadas.
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-blue-800/50 pt-6">
                                    <h4 className="text-lg font-medium text-white mb-4">
                                        Aplicado a problemas como:
                                    </h4>

                                    <ul className="space-y-3">
                                        {[
                                            "Conversão em tiers premium abaixo do esperado",
                                            "Ciclos de venda excessivamente longos",
                                            "Alta taxa de abandono em checkouts",
                                            "Pressão de preço apesar de qualidade superior"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
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
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-medium text-white mb-4">
                                Estudo de Caso: Transformação Real
                            </h2>

                            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                                Como realizei um aumento de 182% em receita através de correções estratégicas
                                sem alterar a estrutura de preços ou o produto
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Cliente e problema */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={section3InView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative overflow-hidden rounded-xl border border-neutral-800 p-6"
                            >
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

                                <div className="mb-6">
                                    <p className="text-neutral-500 text-sm mb-1">Cliente</p>
                                    <h3 className="text-xl font-medium text-white">TechNexus</h3>
                                    <p className="text-neutral-400 text-sm mt-1">Série B - R$47M captados</p>
                                </div>

                                <div>
                                    <p className="text-neutral-500 text-sm mb-1">Problema</p>
                                    <p className="text-neutral-300">
                                        Taxa de conversão premium estagnada em 2.3% apesar de múltiplas
                                        otimizações técnicas e campanhas de marketing.
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
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-purple-400" />

                                <div className="mb-6">
                                    <p className="text-neutral-500 text-sm mb-1">Diagnóstico</p>
                                    <h3 className="text-xl font-medium text-white">Arquitetura de Decisão Comprometida</h3>
                                </div>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 font-medium">
                                            1
                                        </div>
                                        <p className="text-neutral-300">
                                            Identificação de 7 pontos críticos de desalinhamento simbólico
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 font-medium">
                                            2
                                        </div>
                                        <p className="text-neutral-300">
                                            Quantificação de perda mensal de R$212.430 devido a estes desalinhamentos
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 font-medium">
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
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 to-green-400" />

                                <div className="mb-6">
                                    <p className="text-neutral-500 text-sm mb-1">Resultados</p>
                                    <h3 className="text-xl font-medium text-white">Em 21 dias de implementação</h3>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {metrics.map((metric, i) => (
                                        <div key={i} className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-neutral-800/50 rounded-lg text-center">
                                                <p className="text-neutral-500 text-xs">Antes</p>
                                                <p className="text-xl text-neutral-400">{metric.before}</p>
                                            </div>
                                            <div className="p-3 bg-blue-900/30 rounded-lg text-center border border-blue-800/50">
                                                <p className="text-blue-400 text-xs">Depois</p>
                                                <p className="text-xl text-blue-300">{metric.after}</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-xs text-neutral-500">{metric.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-green-900/20 border-l-2 border-green-500 rounded-r-lg">
                                    <p className="text-green-300 text-sm">
                                        "João não apenas aumentou nossa receita em 182% - ele nos mostrou exatamente
                                        onde estávamos desperdiçando dinheiro em desalinhamentos que nunca teríamos encontrado sozinhos."
                                    </p>
                                    <p className="text-neutral-500 text-xs mt-1">— Marcelo Santos, CEO, TechNexus</p>
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
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all group shadow-lg shadow-blue-900/30"
                    >
                        <span>Descubra quanto você está perdendo em desalinhamentos simbólicos</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <p className="text-sm text-neutral-500 mt-4">
                        Vagas limitadas: apenas 3 diagnósticos disponíveis por semana
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
