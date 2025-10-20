'use client'

import React from 'react'
import type { Tables } from '@/types/supabase'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'

type Campaign = Tables<'campaigns'>;

interface ValuePropositionSectionProps {
  campaign: Campaign;
}

/**
 * Value Proposition Section
 *
 * Apresenta solução de forma direta, sem promessas infladas
 * Copy honesto baseado em dados reais
 * Design refinado e consistente
 */

export function ValuePropositionSection({ campaign }: ValuePropositionSectionProps) {
  const colors = useCampaignColors(campaign);

  const benefits = [
    {
      id: 'automation',
      title: 'Menos trabalho administrativo',
      description: 'Cliente agenda pela página, confirma via WhatsApp automático. Você não precisa responder manualmente cada agendamento.',
    },
    {
      id: 'visibility',
      title: 'Presente onde cliente busca',
      description: 'Quando alguém pesquisa no Google ou Instagram, você aparece. Não depende só de indicação.',
    },
    {
      id: 'reliability',
      title: 'Cliente não esquece',
      description: 'Confirmação + lembrete 24h antes reduz a taxa de falta. Horários marcados geram receita.',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      {/* Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Sistema que funciona na prática
            </h2>
            <p className="text-lg text-slate-400">
              Três elementos simples que mudam como seu salão funciona
            </p>
          </motion.div>

          {/* Benefits List */}
          <div className="space-y-5">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-4 p-6 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2
                    className="w-6 h-6 mt-0.5"
                    style={{ color: colors.primary.solid }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            className="mt-12 p-4 rounded-lg bg-slate-800/20 border border-slate-700/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-300">Realidade:</span> Resultados dependem de como você usa. Anúncios exigem orçamento, página precisa converter, você precisa estar preparado pra oferta.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
