/**
 * Sobre - Resultados Reais
 *
 * Seção 3: Métricas, projetos entregues, evidências
 * Tom: factual, baseado em dados, sem exageros
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Zap, Shield } from 'lucide-react';

const metricas = [
  {
    numero: '40+',
    label: 'Projetos entregues',
    descricao: 'Desde MVPs até migrações complexas de sistemas legados'
  },
  {
    numero: '98+',
    label: 'Performance Score',
    descricao: 'Média em Lighthouse para aplicações em produção'
  },
  {
    numero: '<2.5s',
    label: 'LCP médio',
    descricao: 'Largest Contentful Paint otimizado para Core Web Vitals'
  },
  {
    numero: '100%',
    label: 'TypeScript',
    descricao: 'Type safety em todo código produzido desde 2020'
  }
];

const casosReais = [
  {
    titulo: 'Sistema de agendamentos SaaS',
    problema: 'MVP funcional mas sem escalabilidade. Performance ruim e código desorganizado.',
    solucao: 'Refatoração completa: Next.js 14, Supabase RLS, design system componentizado.',
    resultado: 'LCP de 4.2s → 1.8s. 3x mais conversões. Codebase manutenível.',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind']
  },
  {
    titulo: 'Migração de sistema legado PHP',
    problema: 'Monolito PHP sem testes. Deploy manual. Bugs frequentes em produção.',
    solucao: 'Migração gradual para Next.js. CI/CD automatizado. Testes end-to-end.',
    resultado: 'Zero downtime na migração. Deploy time: 45min → 8min. Bugs em produção: -87%.',
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'GitHub Actions']
  }
];

export function SobreResultadosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Resultados mensuráveis
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Métricas reais de projetos em produção. Sem simulações, sem dados inventados.
            Apenas números verificáveis.
          </p>
        </motion.div>

        {/* Métricas Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {metricas.map((metrica, index) => (
            <motion.div
              key={metrica.label}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold text-white mb-3">{metrica.numero}</div>
              <div className="text-sm font-semibold text-white mb-2">{metrica.label}</div>
              <div className="text-sm text-slate-300">{metrica.descricao}</div>
            </motion.div>
          ))}
        </div>

        {/* Casos Reais */}
        <div className="space-y-8">
          <motion.h3
            className="text-2xl font-bold text-white mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Casos recentes
          </motion.h3>

          {casosReais.map((caso, index) => (
            <motion.div
              key={caso.titulo}
              className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
            >
              <h4 className="text-xl font-bold text-white mb-6">{caso.titulo}</h4>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm font-semibold text-white mb-2">Problema</div>
                  <p className="text-sm text-slate-300">{caso.problema}</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-2">Solução</div>
                  <p className="text-sm text-slate-300">{caso.solucao}</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-2">Resultado</div>
                  <p className="text-sm text-slate-300">{caso.resultado}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {caso.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium text-slate-200 bg-white/10 rounded-full border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Princípios */}
        <motion.div
          className="mt-16 p-8 bg-slate-950 border border-white/10 rounded-2xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8">Como trabalhamos</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <TrendingUp className="w-6 h-6 flex-shrink-0 text-slate-300" />
              <div>
                <h4 className="font-bold mb-2">Performance First</h4>
                <p className="text-sm text-slate-300">
                  Core Web Vitals otimizados desde o início. Lighthouse CI em todo deploy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Shield className="w-6 h-6 flex-shrink-0 text-slate-300" />
              <div>
                <h4 className="font-bold mb-2">Type Safety</h4>
                <p className="text-sm text-slate-300">
                  TypeScript strict mode. Validação em runtime com Zod. Erros detectados antes de produção.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Zap className="w-6 h-6 flex-shrink-0 text-slate-300" />
              <div>
                <h4 className="font-bold mb-2">Deploys Rápidos</h4>
                <p className="text-sm text-slate-300">
                  CI/CD automatizado. Preview deploys. Rollback em 1 clique.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-6 h-6 flex-shrink-0 text-slate-300" />
              <div>
                <h4 className="font-bold mb-2">Comunicação Clara</h4>
                <p className="text-sm text-slate-300">
                  Updates semanais. Documentação completa. Disponibilidade para alinhamentos.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Interessado em trabalhar junto?
          </h3>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Agende uma conversa técnica sem compromisso. Analisamos seu projeto e
            apresentamos uma proposta transparente.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-bold rounded-xl transition-all backdrop-blur-sm"
          >
            Agendar Conversa
          </a>
        </motion.div>
      </div>
    </section>
  );
}
