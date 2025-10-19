'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Users, TrendingUp } from 'lucide-react';

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
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
          Qual sua <span className="text-rose-600">maior dor</span> agora?
        </h2>
        <p className="text-lg text-slate-600">
          A gente ajusta tudo pro seu problema específico
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {intents.map((intent, idx) => {
          const Icon = intent.icon;
          const colors = colorMap[intent.color as keyof typeof colorMap];
          const isSelected = selectedIntent === intent.id;

          return (
            <motion.button
              key={intent.id}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300
                ${isSelected 
                  ? `${colors.bg} ${colors.border} shadow-xl scale-105` 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }
              `}
              onClick={() => setSelectedIntent(intent.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 mx-auto`}>
                <Icon className={`w-6 h-6 ${colors.icon}`} />
              </div>

              <h3 className={`font-bold text-lg mb-2 ${isSelected ? colors.text : 'text-slate-900'}`}>
                {intent.title}
              </h3>

              <p className="text-sm text-slate-600">
                {intent.description}
              </p>

              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <div className={`w-6 h-6 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center`}>
                    <svg className={`w-4 h-4 ${colors.icon}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedIntent && (
        <motion.div
          className="mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          {(() => {
            const intent = intents.find(i => i.id === selectedIntent);
            if (!intent) return null;

            const colors = colorMap[intent.color as keyof typeof colorMap];

            return (
              <div className={`p-8 rounded-2xl ${colors.bg} border-2 ${colors.border}`}>
                <h3 className={`text-2xl font-bold mb-6 ${colors.text}`}>
                  Como resolvemos: {intent.title}
                </h3>

                {/* Bullets específicos */}
                <ul className="space-y-3 mb-6">
                  {intent.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className={`w-6 h-6 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <svg className={`w-4 h-4 ${colors.icon}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-slate-700">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Microprova */}
                <div className="p-4 bg-white/60 rounded-lg mb-6">
                  <div className="text-sm font-semibold text-slate-600 mb-1">Caso real:</div>
                  <div className={`font-medium ${colors.text}`}>{intent.proof}</div>
                </div>

                {/* CTA customizado */}
                <button
                  className={`w-full px-6 py-3 rounded-xl font-bold text-white ${colors.button} transition-all duration-200 shadow-lg hover:shadow-xl`}
                  onClick={() => {
                    // GA4 tracking
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
                </button>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
