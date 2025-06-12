'use client';


import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import React from "react";

export default function ValueClosing() {
  return (
    <section className="border-t border-neutral-100 bg-white py-20">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Clear value statement */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-medium text-neutral-900">
            Convertendo expertise em{' '}
            <span className="relative inline-block">
              resultados de receita
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-blue-500" />
            </span>{' '}
            através do alinhamento simbólico
          </h2>

          <p className="mx-auto max-w-2xl text-neutral-700">
            Nosso Framework de Receita Imediata™ comprovado transforma como sua presença digital
            comunica seu verdadeiro valor, removendo barreiras invisíveis à conversão em pontos de decisão críticos.
          </p>
        </div>

        {/* Concrete results */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {[
            {
              outcome: 'Maiores taxas de aceitação de propostas',
              description:
                'Quando sua expertise é corretamente percebida, objeções de preço diminuem e a aceitação de propostas aumenta.',
              metric: '43%',
              metricLabel: 'aumento médio',
            },
            {
              outcome: 'Posicionamento premium com preços atuais',
              description:
                'Clientes subitamente veem seus preços atuais como razoáveis ou até subvalorizados pelo valor entregue.',
              metric: '73%',
              metricLabel: 'redução em objeções de preço',
            },
            {
              outcome: 'Ciclos de decisão mais rápidos com menos atrito',
              description:
                'Quando percepção combina com realidade, decisões aceleram e ciclos de venda encurtam significativamente.',
              metric: '58%',
              metricLabel: 'tempos de fechamento mais rápidos',
            },
          ].map((item, index) => (
            <div key={index} className="border border-neutral-100 bg-neutral-50 p-8">
              <div className="mb-6">
                <div className="mb-1 text-3xl font-medium text-blue-600">{item.metric}</div>
                <div className="text-sm text-neutral-500">{item.metricLabel}</div>
              </div>

              <h3 className="mb-3 text-lg font-medium text-neutral-900">{item.outcome}</h3>

              <p className="text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Clear product feature */}
        <div className="mb-16 overflow-hidden rounded-lg bg-neutral-900 shadow-lg">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="mb-6 border-b border-neutral-700 pb-6">
                <h3 className="mb-2 text-xl font-medium text-white">
                  ArcSight Snapshot™ — Seu Primeiro Passo
                </h3>
                <p className="text-neutral-300">
                  O diagnóstico essencial que revela exatamente onde o desalinhamento simbólico está custando receita
                </p>
              </div>

              <ul className="mb-8 space-y-4">
                <li className="flex items-start gap-3">
                  <FiCheck className="mt-1 flex-shrink-0 text-blue-400" />
                  <span className="text-white">
                    Identificação de 3 pontos críticos de atrito simbólico na jornada do seu cliente
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="mt-1 flex-shrink-0 text-blue-400" />
                  <span className="text-white">
                    Análise detalhada em vídeo com recomendações de correção priorizadas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="mt-1 flex-shrink-0 text-blue-400" />
                  <span className="text-white">
                    Quantificação estimada do impacto na receita para cada problema
                  </span>
                </li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-400">Investimento único</p>
                  <p className="text-2xl font-medium text-white">$147</p>
                </div>

                <Link
                  href="/diagnose"
                  className="group inline-flex items-center rounded bg-white px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Obtenha sua avaliação
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="bg-neutral-800 p-8 md:p-10">
              <h4 className="mb-5 font-medium text-white">O Processo ArcSight:</h4>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm text-neutral-300">
                    1
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-white">Envie suas informações</p>
                    <p className="text-neutral-400">
                      Complete um breve formulário de envio de assets (5 minutos)
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm text-neutral-300">
                    2
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-white">
                      Receba sua análise em até 48 horas
                    </p>
                    <p className="text-neutral-400">
                      Obtenha seu walkthrough abrangente em vídeo e plano de ação
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm text-neutral-300">
                    3
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-white">Oportunidade de upgrade (opcional)</p>
                    <p className="text-neutral-400">
                      Janela de 48 horas para aplicar seus $147 a uma implementação tier premium
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t border-neutral-700 pt-6">
                <p className="text-sm text-neutral-300">
                  "O ArcSight Snapshot™ revelou três grandes pontos de atrito simbólico que nunca
                  teríamos encontrado. Implementar apenas a primeira correção aumentou nossa taxa de conversão em 18% em uma semana."
                </p>
                <p className="mt-2 text-sm text-neutral-400">— CMO, Empresa SaaS Enterprise</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple action-focused closing */}
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div className="mb-6 md:mb-0">
            <p className="font-medium text-neutral-900">Pare de perder receita por lacunas de percepção.</p>
            <p className="text-neutral-500">
              Corrija como sua expertise é percebida em dias, não meses.
            </p>
          </div>

          <div className="flex items-center gap-10">
            <Link
              href="/diagnose"
              className="group flex items-center font-medium text-neutral-900 transition-colors hover:text-blue-600"
            >
              Explore como corrigimos isso
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="hidden text-sm text-neutral-500 md:block">
              Limitado a 2–3 projetos por ciclo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
