'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  DollarSign,
  LineChart,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import React, { useState, useRef } from 'react';

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
        improvedRate,
      });
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section ref={containerRef} id="opportunity" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl text-neutral-900 md:text-4xl">
            Calculadora de Oportunidade Perdida
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-600">
            Descubra quanto dinheiro sua empresa está deixando na mesa devido a desalinhamentos
            simbólicos em sua arquitetura de decisão financeira
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid items-start gap-8 md:grid-cols-2"
          >
            {/* Calculator */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-neutral-900">
                    Calculadora de Oportunidade
                  </h3>
                </div>

                <form onSubmit={handleCalculate}>
                  <div className="mb-8 space-y-5">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-neutral-700">
                        Receita mensal atual (R$)
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <DollarSign className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="number"
                          min="1000"
                          step="1000"
                          placeholder="Ex: 100000"
                          value={revenue}
                          onChange={e => setRevenue(e.target.value ? Number(e.target.value) : '')}
                          className="block w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-neutral-700">
                        Taxa de conversão atual (%)
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <TrendingUp className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="number"
                          min="0.1"
                          max="100"
                          step="0.1"
                          placeholder="Ex: 2.5"
                          value={conversionRate}
                          onChange={e =>
                            setConversionRate(e.target.value ? Number(e.target.value) : '')
                          }
                          className="block w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
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
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/50 text-blue-600/50">
                      <LineChart className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium text-neutral-600">Resultados da Análise</h3>
                  </div>

                  <p className="mb-6 text-neutral-500">
                    Preencha o formulário ao lado para visualizar quanto sua empresa poderia estar
                    ganhando com uma arquitetura de decisão financeira otimizada.
                  </p>

                  <div className="space-y-3">
                    {[
                      'Aumento médio comprovado de 37% em taxas de conversão',
                      'ROI médio de 12x sobre o investimento em 60 dias',
                      'Implementação não-invasiva em sistemas existentes',
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
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
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
                >
                  <div className="p-6 md:p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                        <LineChart className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium text-neutral-900">
                        Análise de Oportunidade
                      </h3>
                    </div>

                    <div className="mb-8 space-y-6">
                      {/* Primary Metric */}
                      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                        <div className="mb-3 flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
                          Este valor representa dinheiro que sua empresa está perdendo todos os
                          meses devido a desalinhamentos simbólicos em sua arquitetura de decisão
                          financeira.
                        </p>
                      </div>

                      {/* Secondary Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                          <p className="mb-1 text-sm text-neutral-600">Receita Atual</p>
                          <p className="text-lg font-medium text-neutral-900">
                            {formatCurrency(revenue as number)}
                          </p>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                          <p className="mb-1 text-sm text-green-700">Receita Potencial</p>
                          <p className="text-lg font-medium text-green-700">
                            {formatCurrency(calculation.potentialRevenue)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                          <p className="mb-1 text-sm text-neutral-600">Taxa Atual</p>
                          <p className="text-lg font-medium text-neutral-900">{conversionRate}%</p>
                        </div>

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                          <p className="mb-1 text-sm text-blue-700">Taxa Potencial</p>
                          <p className="text-lg font-medium text-blue-700">
                            {calculation.improvedRate.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-lg bg-neutral-900 p-5 text-white">
                      <div className="absolute -right-2 -top-3">
                        <span className="inline-block rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
                          RECOMENDAÇÃO
                        </span>
                      </div>

                      <p className="mb-4">
                        Based on your current numbers, you are losing approximately{' '}
                        <span className="font-medium text-blue-300">
                          {formatCurrency(calculation.lostRevenue * 12)}
                        </span>{' '}
                        per year. A strategic intervention can recover this revenue in up to 60
                        days.
                      </p>

                      <a
                        href="/consult"
                        className="group inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                      >
                        {' '}
                        <span>Schedule strategic consultation</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              * Cálculo baseado em um aumento conservador de 30% na taxa de conversão, um resultado
              significativamente menor que a média de 37% documentada em nossos casos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
