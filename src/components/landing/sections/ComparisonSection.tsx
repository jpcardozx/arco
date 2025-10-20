'use client'

import React from 'react'
import type { Tables } from '@/types/supabase'
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'

type Campaign = Tables<'campaigns'>;

interface ComparisonSectionProps {
  campaign: Campaign;
}

/**
 * Comparison Section
 *
 * Antes vs. Depois - Honesto e visual
 * Posição: Após ValueProposition, antes de HowItWorks
 *
 * Objetivo: Clareza sobre muda (e o que não muda)
 */

export function ComparisonSection({ campaign }: ComparisonSectionProps) {
  const colors = useCampaignColors(campaign);

  const comparisons = [
    {
      aspect: 'Agendamento de cliente',
      before: 'Cliente envia WhatsApp, você responde manualmente',
      after: 'Cliente agenda na página em 30 segundos',
      icon: 'client',
    },
    {
      aspect: 'Confirmação',
      before: 'Você precisa confirmar cada agendamento',
      after: 'Sistema confirma + lembra 24h antes automaticamente',
      icon: 'confirm',
    },
    {
      aspect: 'Aquisição de cliente',
      before: 'Depende de indicação ou boca a boca',
      after: 'Aparece quando cliente pesquisa no Google/Instagram',
      icon: 'acquisition',
    },
    {
      aspect: 'Controle',
      before: 'Você gerencia manualmente cada detalhe',
      after: 'Você gerencia, nós otimizamos anúncios',
      icon: 'control',
    },
    {
      aspect: 'Taxa de falta',
      before: 'Sem confirmação, cliente esquece (~28%)',
      after: 'Com lembrete, cliente se lembra (~9%)',
      icon: 'noshow',
    },
    {
      aspect: 'ROI',
      before: 'Incerto - depende do boca a boca',
      after: 'Mensurável - você vê custo vs. agendamentos',
      icon: 'roi',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              O que muda, o que não muda
            </h2>
            <p className="text-lg text-slate-400">
              Visão honesta de como o sistema funciona na rotina
            </p>
          </motion.div>

          {/* Comparison Table */}
          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <motion.div
                key={item.aspect}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="border border-slate-700/40 rounded-lg overflow-hidden hover:border-slate-600/60 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Aspect */}
                  <div className="px-6 py-4 bg-slate-800/30 border-r border-slate-700/40 md:border-r-0">
                    <p className="font-semibold text-white text-sm md:text-base">
                      {item.aspect}
                    </p>
                  </div>

                  {/* Before */}
                  <div className="px-6 py-4 bg-slate-900/20 border-t md:border-t-0 md:border-l border-slate-700/40 flex items-center gap-3">
                    <X className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <span className="text-slate-400 text-sm">{item.before}</span>
                  </div>

                  {/* After */}
                  <div className="px-6 py-4 bg-slate-900/40 border-t md:border-t-0 md:border-l border-slate-700/40 flex items-center gap-3">
                    <Check
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: colors.primary.solid }}
                    />
                    <span className="text-slate-300 text-sm font-medium">{item.after}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            className="mt-12 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary.solid }}
              />
              O que continua dependendo de você:
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Qualidade dos serviços (técnica, ambiente, atendimento)</li>
              <li>• Responder cliente com qualidade quando entra em contato</li>
              <li>• Manter agenda realista (não vender mais do que consegue</li>
              <li>• Estar preparado para crescimento (mais demanda de clientes)</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
