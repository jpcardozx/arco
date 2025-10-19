/**
 * Sobre - Processo e Metodologia
 *
 * Seção 2: Como trabalhamos, etapas, entregáveis
 * Tom: transparente, estruturado, previsível
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, FileText, GitBranch, Rocket } from 'lucide-react';

const etapas = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descricao: 'Análise técnica do projeto atual. Identificação de gargalos, riscos e oportunidades. Documento de diagnóstico com métricas e recomendações.',
    entregaveis: ['Auditoria técnica completa', 'Análise de performance', 'Mapeamento de riscos'],
    duracao: '3-5 dias úteis'
  },
  {
    numero: '02',
    titulo: 'Planejamento',
    descricao: 'Arquitetura da solução, cronograma e roadmap técnico. Definição de stack, padrões de código e processos. Alinhamento de expectativas e KPIs.',
    entregaveis: ['Documento de arquitetura', 'Cronograma detalhado', 'Especificação técnica'],
    duracao: '5-7 dias úteis'
  },
  {
    numero: '03',
    titulo: 'Desenvolvimento',
    descricao: 'Implementação com code review contínuo. Testes automatizados e documentação técnica. Deploys incrementais com feedback constante.',
    entregaveis: ['Código documentado', 'Testes unitários/integração', 'CI/CD pipeline'],
    duracao: 'Conforme escopo'
  },
  {
    numero: '04',
    titulo: 'Entrega',
    descricao: 'Deploy em produção com monitoramento. Documentação de uso e manutenção. Transferência de conhecimento e suporte pós-entrega.',
    entregaveis: ['Documentação completa', 'Treinamento da equipe', 'Suporte 30 dias'],
    duracao: '2-3 dias úteis'
  }
];

export function SobreProcessoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Processo estruturado
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Metodologia transparente com etapas definidas, entregáveis documentados e prazos realistas.
            Sem surpresas, sem promessas vazias.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {etapas.map((etapa, index) => (
            <motion.div
              key={etapa.numero}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex gap-6 items-start">
                {/* Numero */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl font-bold text-white">{etapa.numero}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{etapa.titulo}</h3>
                    <span className="px-3 py-1 text-sm font-medium text-slate-300 bg-white/10 border border-white/10 rounded-full whitespace-nowrap">
                      {etapa.duracao}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6">
                    {etapa.descricao}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white mb-3">Entregáveis:</p>
                    {etapa.entregaveis.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {index < etapas.length - 1 && (
                <div className="ml-10 h-6 w-0.5 bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Garantias */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
            <FileText className="w-8 h-8 text-slate-300 mb-4" />
            <h4 className="font-bold text-white mb-2">Documentação Completa</h4>
            <p className="text-sm text-slate-300">
              Todo código, arquitetura e processo documentado. README técnico e guias de uso.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
            <GitBranch className="w-8 h-8 text-slate-300 mb-4" />
            <h4 className="font-bold text-white mb-2">Code Review</h4>
            <p className="text-sm text-slate-300">
              Review contínuo com feedback estruturado. Padrões de código e boas práticas.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
            <Rocket className="w-8 h-8 text-slate-300 mb-4" />
            <h4 className="font-bold text-white mb-2">Deploy Seguro</h4>
            <p className="text-sm text-slate-300">
              CI/CD automatizado. Rollback imediato. Monitoramento de erros e performance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
