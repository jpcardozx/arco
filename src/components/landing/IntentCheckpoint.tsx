'use client';

import React from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface IntentCheckpointProps {
  campaign: Campaign;
  selectedIntent?: string | null;
  onConfirm?: () => void;
  onReselect?: () => void;
}

// Intent to recommendation mapping
const intentRecommendations: Record<string, { title: string; description: string }> = {
  'fill-agenda': {
    title: 'Crescimento de Agenda',
    description: 'Vamos focar em trazer mais clientes novos a cada mês. O plano Crescimento é o mais recomendado para isso.',
  },
  'reduce-no-show': {
    title: 'Redução de Faltas',
    description: 'Vamos implementar confirmações automáticas. O plano Crescimento automatiza esse processo completamente.',
  },
  'local-seo': {
    title: 'Visibilidade Local',
    description: 'Vamos posicionar você no Google. O plano Crescimento inclui otimização SEO e gestão de anúncios.',
  },
};

export function IntentCheckpoint({
  campaign,
  selectedIntent,
  onConfirm,
  onReselect,
}: IntentCheckpointProps) {
  if (!selectedIntent || !intentRecommendations[selectedIntent]) {
    return null;
  }

  const colors = useCampaignColors(campaign);
  const recommendation = intentRecommendations[selectedIntent];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border p-6 sm:p-8"
            style={{
              backgroundColor: `${colors.primary.solid}08`,
              borderColor: `${colors.primary.solid}40`,
            }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                style={{ color: colors.primary.solid }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {recommendation.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {recommendation.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition-all"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid || colors.primary.solid} 100%)`,
                      boxShadow: `0 4px 15px -3px ${colors.primary.solid}40`,
                    }}
                  >
                    Sim, vamos lá
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <button
                    onClick={onReselect}
                    className="px-6 py-2.5 rounded-lg font-semibold text-slate-300 border transition-all hover:text-white hover:border-white/30"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    Reconsiderar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
