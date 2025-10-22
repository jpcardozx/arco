'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface IntentCheckpointProps {
  campaign: Campaign;
  onIntentSelected?: (intent: string) => void;
}

// Challenge options matching our form schema
const challenges = [
  {
    id: 'low_volume',
    label: 'Baixo volume',
    icon: '📉',
    description: 'Preciso aumentar a quantidade de leads/clientes',
  },
  {
    id: 'high_cost',
    label: 'Custo elevado',
    icon: '💰',
    description: 'Meu custo por aquisição está muito alto',
  },
  {
    id: 'poor_quality',
    label: 'Qualidade',
    icon: '⚠️',
    description: 'Os leads não têm o perfil certo para meu negócio',
  },
  {
    id: 'technology',
    label: 'Tecnologia',
    icon: '⚙️',
    description: 'Tenho dificuldade em integrar ferramentas e sistemas',
  },
  {
    id: 'staff',
    label: 'Gestão',
    icon: '👥',
    description: 'Minha equipe não consegue acompanhar a demanda',
  },
  {
    id: 'other',
    label: 'Outro desafio',
    icon: '🤔',
    description: 'Meu desafio é diferente desses listados',
  },
];

// Challenge to insights mapping (consultative recommendations)
const challengeInsights: Record<string, { title: string; insight: string }> = {
  'low_volume': {
    title: 'Aumentar Volume de Leads',
    insight: 'Vamos entender seus canais atuais e identificar oportunidades de expansão que façam sentido para seu modelo de negócio.',
  },
  'high_cost': {
    title: 'Otimizar Custo de Aquisição',
    insight: 'Vamos revisar sua estratégia de segmentação e direcionamento para melhorar a eficiência do seu investimento em marketing.',
  },
  'poor_quality': {
    title: 'Melhorar Qualidade de Leads',
    insight: 'Vamos trabalhar em critérios de qualificação mais precisos para atrair o perfil ideal do seu negócio.',
  },
  'technology': {
    title: 'Simplificar Integração de Sistemas',
    insight: 'Vamos mapear seus sistemas atuais e desenhar uma solução de integração que faça sentido para sua operação.',
  },
  'staff': {
    title: 'Escalar Sua Operação',
    insight: 'Vamos automatizar processos manuais para que sua equipe consiga acompanhar o crescimento sem stress.',
  },
  'other': {
    title: 'Entender Seu Contexto',
    insight: 'Vamos conversar sobre seu desafio específico e desenhar uma solução personalizada.',
  },
};

export function IntentCheckpoint({
  campaign,
  onIntentSelected,
}: IntentCheckpointProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const colors = useCampaignColors(campaign);

  const handleSelect = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };

  const handleConfirm = () => {
    if (selectedChallenge) {
      onIntentSelected?.(selectedChallenge);
      // Scroll to capture form
      setTimeout(() => {
        const captureForm = document.querySelector('[data-section="capture"]');
        captureForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const selectedInsight = selectedChallenge ? challengeInsights[selectedChallenge] : null;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.primary.solid }} />
              <span
                className="text-xs sm:text-sm font-semibold uppercase tracking-widest"
                style={{ color: colors.primary.solid }}
              >
                Entendimento
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Qual é seu maior desafio hoje?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Isso nos ajuda a entender melhor seu contexto e propor uma solução adequada. Sem compromisso, sem pressão.
            </p>
          </motion.div>

          {/* Challenge Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            {challenges.map((challenge) => (
              <motion.button
                key={challenge.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(challenge.id)}
                className={`relative p-4 sm:p-5 rounded-lg border transition-all text-left group ${
                  selectedChallenge === challenge.id
                    ? 'border-opacity-100'
                    : 'border-opacity-20 hover:border-opacity-40'
                }`}
                style={{
                  backgroundColor:
                    selectedChallenge === challenge.id
                      ? `${colors.primary.solid}12`
                      : 'rgba(255, 255, 255, 0.02)',
                  borderColor: colors.primary.solid,
                }}
              >
                {/* Selection indicator */}
                {selectedChallenge === challenge.id && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
                    style={{ backgroundColor: colors.primary.solid }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl mb-2">{challenge.icon}</div>
                  <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
                    {challenge.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {challenge.description}
                  </p>

                  {/* Selection checkmark */}
                  {selectedChallenge === challenge.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="absolute top-3 right-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary.solid }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Insight Display */}
          {selectedInsight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border p-5 sm:p-6 mb-6 sm:mb-8"
              style={{
                backgroundColor: `${colors.primary.solid}08`,
                borderColor: `${colors.primary.solid}40`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colors.primary.solid}20` }}
                >
                  <CheckCircle2
                    className="w-5 h-5"
                    style={{ color: colors.primary.solid }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                    {selectedInsight.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {selectedInsight.insight}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA */}
          {selectedChallenge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-white text-sm sm:text-base transition-all"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid || colors.primary.solid} 100%)`,
                  boxShadow: `0 4px 15px -3px ${colors.primary.solid}40`,
                }}
              >
                Continuar para conversa
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <button
                onClick={() => setSelectedChallenge(null)}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-slate-300 border transition-all hover:text-white hover:border-white/30"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                }}
              >
                Ver outras opções
              </button>
            </motion.div>
          )}

          {/* Empty state message */}
          {!selectedChallenge && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center text-sm text-slate-500"
            >
              Selecione uma opção acima para continuar
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
