'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Section } from '../../layout/Section';
import { cn } from '@/lib/utils/cn';

export default function Process() {
    const steps = [
        {
            title: "Diagnóstico Técnico-Financeiro",
            description: "Mapeamento completo dos processos técnicos e seu impacto direto nas métricas financeiras do negócio.",
            points: [
                "Análise de infraestrutura e arquitetura",
                "Avaliação de performance de sistemas",
                "Mapeamento de gargalos operacionais",
                "Correlação com indicadores financeiros"
            ]
        },
        {
            title: "Planejamento Estratégico",
            description: "Desenvolvimento de um roadmap detalhado para eliminar ineficiências e otimizar resultados.",
            points: [
                "Priorização baseada em ROI",
                "Definição de KPIs de acompanhamento",
                "Estimativa de ganhos financeiros",
                "Cronograma de implementação"
            ]
        },
        {
            title: "Implementação Ágil",
            description: "Execução das melhorias técnicas com foco em entregas rápidas e mensuráveis.",
            points: [
                "Ciclos curtos de implementação",
                "Validação contínua de resultados",
                "Ajustes baseados em feedback real",
                "Documentação de processos"
            ]
        },
        {
            title: "Mensuração de Resultados",
            description: "Acompanhamento detalhado dos indicadores financeiros impactados pelas melhorias técnicas.",
            points: [
                "Dashboard de monitoramento em tempo real",
                "Relatórios de performance comparativa",
                "Cálculo de ROI das intervenções",
                "Recomendações para próximos ciclos"
            ]
        },
    ];

    return (
        <Section className="bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                    >
                        Nosso Processo de <span className="text-blue-600">Transformação Técnico-Financeira</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-gray-600"
                    >
                        Uma abordagem sistemática para identificar e corrigir ineficiências técnicas
                        que impactam diretamente seu resultado financeiro.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden"
                        >
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 opacity-10 rounded-full" />

                            <div className="relative z-10">
                                <div className="flex items-center mb-4">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold mr-3">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                </div>

                                <p className="text-gray-600 mb-6">{step.description}</p>

                                <ul className="space-y-3">
                                    {step.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
