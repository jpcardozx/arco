'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface IntentSelectorSectionProps {
  campaign: Campaign;
}

const intents = [
  {
    id: 'fill-agenda',
    icon: Calendar,
    title: 'Acabar com horário vazio',
    description: 'Acordo sem saber se vai encher. Quero cliente novo todo dia.',
    color: 'rose',
    bullets: [
      'Anúncio só pra quem tá procurando manicure agora',
      'Aparece no Google quando pesquisam "perto de mim"',
      'Cliente agenda direto pela página (sem você responder)'
    ],
    proof: 'Carol (Moema): de 8 pra 18 clientes novas em 3 meses',
    cta: 'Quero agenda cheia'
  },
  {
    id: 'reduce-no-show',
    icon: Sparkles,
    title: 'Parar de perder horário com cliente fantasma',
    description: 'Cliente marca e some. Perco tempo e dinheiro.',
    color: 'pink',
    bullets: [
      'Confirmação automática no WhatsApp quando cliente agenda',
      'Lembrete 24h antes (cliente não esquece)',
      'Opção de pedir sinal pra proteger horário'
    ],
    proof: 'Studio em Pinheiros: faltas caíram de 28% pra 9%',
    cta: 'Quero menos falta'
  },
  {
    id: 'local-seo',
    icon: Users,
    title: 'Aparecer quando pesquisam "manicure perto de mim"',
    description: 'Cliente tá procurando no Google e vai na concorrente.',
    color: 'orange',
    bullets: [
      'Página otimizada pro Google achar você',
      'Anúncio aparece só pra quem mora perto (raio 3-5km)',
      'Carrega rápido no celular (não perde cliente por lentidão)'
    ],
    proof: 'Salão na Lapa: apareceu na 1ª página em 18 dias',
    cta: 'Quero aparecer no Google'
  },
];

const colorMap = {
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-500',
    text: 'text-rose-700',
    icon: 'text-rose-600',
    button: 'bg-rose-600 hover:bg-rose-700'
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-500',
    text: 'text-pink-700',
    icon: 'text-pink-600',
    button: 'bg-pink-600 hover:bg-pink-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    text: 'text-orange-700',
    icon: 'text-orange-600',
    button: 'bg-orange-600 hover:bg-orange-700'
  },
};

export function IntentSelectorSection({ campaign }: IntentSelectorSectionProps) {
  const colors = useCampaignColors(campaign);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
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
              Qual é sua maior dor agora?
            </h2>
            <p className="text-lg text-slate-400">
              Nós customizamos tudo pro seu desafio específico
            </p>
          </motion.div>

          {/* Intent Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {intents.map((intent, idx) => {
              const Icon = intent.icon;
              const isSelected = selectedIntent === intent.id;

              return (
                <motion.button
                  key={intent.id}
                  className="text-left"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setSelectedIntent(intent.id)}
                >
                  <div
                    className="p-6 rounded-xl border transition-all cursor-pointer h-full"
                    style={{
                      borderColor: isSelected ? colors.primary.solid : 'rgb(71, 85, 105, 0.5)',
                      backgroundColor: isSelected
                        ? `${colors.primary.solid}08`
                        : 'rgba(30, 41, 59, 0.3)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${colors.primary.solid}15`,
                          border: `1px solid ${colors.primary.solid}40`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: colors.primary.solid }} />
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <CheckCircle2 className="w-5 h-5" style={{ color: colors.primary.solid }} />
                        </motion.div>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">
                      {intent.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {intent.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {selectedIntent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                {(() => {
                  const intent = intents.find(i => i.id === selectedIntent);
                  if (!intent) return null;

                  return (
                    <div
                      className="p-8 rounded-xl border space-y-6"
                      style={{
                        borderColor: `${colors.primary.solid}40`,
                        backgroundColor: `${colors.primary.solid}04`,
                      }}
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">
                          Como resolvemos: {intent.title}
                        </h3>

                        {/* Bullets */}
                        <ul className="space-y-3">
                          {intent.bullets.map((bullet, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                                style={{ backgroundColor: colors.primary.solid }}
                              />
                              <span className="text-sm text-slate-300">{bullet}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Proof Point */}
                      <div
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: `${colors.primary.solid}08`,
                          borderColor: `${colors.primary.solid}20`,
                        }}
                      >
                        <p className="text-xs font-semibold text-slate-400 mb-2">Caso real:</p>
                        <p className="text-sm text-slate-200 font-medium">{intent.proof}</p>
                      </div>

                      {/* CTA */}
                      <button
                        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid || colors.primary.solid} 100%)`,
                          boxShadow: `0 10px 40px -10px ${colors.primary.solid}40`,
                        }}
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'intent_cta_click', {
                              intent_type: intent.id,
                              cta_text: intent.cta
                            });
                          }
                          document.getElementById('capture')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {intent.cta}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
