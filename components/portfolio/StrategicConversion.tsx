"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calculator, DollarSign, LineChart, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function StrategicConversion() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    // Calculator state
    const [revenue, setRevenue] = useState<number | ''>('');
    const [conversionRate, setConversionRate] = useState<number | ''>('');
    const [calculation, setCalculation] = useState<{
        potentialRevenue: number;
        lostRevenue: number;
        improvedRate: number;
    } | null>(null);

    // Handle calculator submission
    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof revenue === 'number' && typeof conversionRate === 'number') {
            // Calculate potential improvement (conservative estimate of 30% lift)
            const improvedRate = conversionRate * 1.3;
            const potentialRevenue = revenue * (improvedRate / conversionRate);
            const lostRevenue = potentialRevenue - revenue;

            setCalculation({
                potentialRevenue,
                lostRevenue,
                improvedRate
            });
        }
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <section
            ref={containerRef}
            id="opportunity"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-4">
                        Calculadora de Oportunidade Perdida
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Descubra quanto dinheiro sua empresa está deixando na mesa devido a
                        desalinhamentos simbólicos em sua arquitetura de decisão financeira
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid md:grid-cols-2 gap-8 items-start"
                    >
                        {/* Calculator */}
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Calculator className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-medium text-neutral-900">Calculadora de Oportunidade</h3>
                                </div>

                                <form onSubmit={handleCalculate}>
                                    <div className="space-y-5 mb-8">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                                Receita mensal atual (R$)
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <DollarSign className="h-5 w-5 text-neutral-400" />
                                                </div>
                                                <input
                                                    type="number"
                                                    min="1000"
                                                    step="1000"
                                                    placeholder="Ex: 100000"
                                                    value={revenue}
                                                    onChange={(e) => setRevenue(e.target.value ? Number(e.target.value) : '')}
                                                    className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                                Taxa de conversão atual (%)
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <TrendingUp className="h-5 w-5 text-neutral-400" />
                                                </div>
                                                <input
                                                    type="number"
                                                    min="0.1"
                                                    max="100"
                                                    step="0.1"
                                                    placeholder="Ex: 2.5"
                                                    value={conversionRate}
                                                    onChange={(e) => setConversionRate(e.target.value ? Number(e.target.value) : '')}
                                                    className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-neutral-500">
                                                Se você não souber exatamente, use sua melhor estimativa
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center"
                                    >
                                        <span>Calcular oportunidade perdida</span>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Results */}
                        <div>
                            {!calculation ? (
                                <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100/50 text-blue-600/50 flex items-center justify-center">
                                            <LineChart className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-medium text-neutral-600">Resultados da Análise</h3>
                                    </div>

                                    <p className="text-neutral-500 mb-6">
                                        Preencha o formulário ao lado para visualizar quanto sua empresa poderia
                                        estar ganhando com uma arquitetura de decisão financeira otimizada.
                                    </p>

                                    <div className="space-y-3">
                                        {[
                                            "Aumento médio comprovado de 37% em taxas de conversão",
                                            "ROI médio de 12x sobre o investimento em 60 dias",
                                            "Implementação não-invasiva em sistemas existentes"
                                        ].map((point, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-neutral-600">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden"
                                >
                                    <div className="p-6 md:p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                <LineChart className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-medium text-neutral-900">Análise de Oportunidade</h3>
                                        </div>

                                        <div className="space-y-6 mb-8">
                                            {/* Primary Metric */}
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                                        <h4 className="font-medium text-red-900">
                                                            Receita Perdida Mensalmente
                                                        </h4>
                                                    </div>
                                                    <div className="text-2xl font-bold text-red-600">
                                                        {formatCurrency(calculation.lostRevenue)}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-red-700">
                                                    Este valor representa dinheiro que sua empresa está perdendo todos os meses
                                                    devido a desalinhamentos simbólicos em sua arquitetura de decisão financeira.
                                                </p>
                                            </div>

                                            {/* Secondary Metrics */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                                                    <p className="text-sm text-neutral-600 mb-1">Receita Atual</p>
                                                    <p className="text-lg font-medium text-neutral-900">
                                                        {formatCurrency(revenue as number)}
                                                    </p>
                                                </div>

                                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                                    <p className="text-sm text-green-700 mb-1">Receita Potencial</p>
                                                    <p className="text-lg font-medium text-green-700">
                                                        {formatCurrency(calculation.potentialRevenue)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                                                    <p className="text-sm text-neutral-600 mb-1">Taxa Atual</p>
                                                    <p className="text-lg font-medium text-neutral-900">
                                                        {conversionRate}%
                                                    </p>
                                                </div>

                                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                                    <p className="text-sm text-blue-700 mb-1">Taxa Potencial</p>
                                                    <p className="text-lg font-medium text-blue-700">
                                                        {calculation.improvedRate.toFixed(1)}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative bg-neutral-900 text-white rounded-lg p-5">
                                            <div className="absolute -top-3 -right-2">
                                                <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
                                                    RECOMENDAÇÃO
                                                </span>
                                            </div>

                                            <p className="mb-4">
                                                Based on your current numbers, you are losing approximately{" "}
                                                <span className="font-medium text-blue-300">{formatCurrency(calculation.lostRevenue * 12)}</span> per year.
                                                A strategic intervention can recover this revenue in up to 60 days.
                                            </p>

                                            <a
                                                href="/consult"
                                                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all group"
                                            >                                                <span>Schedule strategic consultation</span>
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-neutral-500">
                            * Cálculo baseado em um aumento conservador de 30% na taxa de conversão,
                            um resultado significativamente menor que a média de 37% documentada em nossos casos.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
