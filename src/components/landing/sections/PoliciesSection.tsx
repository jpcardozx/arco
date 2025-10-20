'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, AlertCircle, RotateCcw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface PoliciesSectionProps {
  campaign: Campaign;
}

const policies = [
  {
    id: 'adjust-plan',
    icon: RotateCcw,
    question: 'Posso ajustar meu plano?',
    answer: 'Sim, sem custo adicional. Se as metas definidas na avaliação não forem atingidas após X sessões (com adesão ao protocolo registrada), podemos ajustar seu plano sem taxas extras.',
  },
  {
    id: 'if-not-working',
    icon: AlertCircle,
    question: 'E se não funcionar no meu caso?',
    answer: 'Primeiro, avaliamos se há variáveis não controladas (orçamento muito baixo, ticket médio inadequado, localização com pouca demanda). Se confirmadas essas variáveis, revisamos juntos. Você tem até 30 dias pós-setup para decidir.',
  },
  {
    id: 'rescheduling-policy',
    icon: AlertCircle,
    question: 'Qual é a política de remarcação?',
    answer: 'Remarcações 24h+ antes são gratuitas. Remarcações com menos de 24h têm taxa de R$ 50. Cancelamentos sem aviso geram perda do horário. Política clara no seu contrato.',
  },
  {
    id: 'cancellation',
    icon: Shield,
    question: 'Posso cancelar quando quiser?',
    answer: 'Sim, sem contrato de fidelidade. Você cancela a qualquer momento e paga apenas até o final do mês em curso. Porém, setup investido não é reembolsável após 7 dias.',
  },
];

export function PoliciesSection({ campaign }: PoliciesSectionProps) {
  const colors = useCampaignColors(campaign);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Garantias & Políticas
            </h2>
            <p className="text-slate-400">
              Total transparência sobre direitos, ajustes e responsabilidades
            </p>
          </motion.div>

          {/* Policies Accordion */}
          <div className="space-y-3">
            {policies.map((policy, idx) => {
              const isOpen = openIndex === idx;
              const Icon = policy.icon;

              return (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Collapsible
                    open={isOpen}
                    onOpenChange={(open) => setOpenIndex(open ? idx : null)}
                  >
                    <CollapsibleTrigger className="w-full text-left">
                      <div
                        className="w-full p-4 sm:p-5 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3"
                        style={{
                          backgroundColor: isOpen ? `${colors.primary.solid}08` : 'rgba(30, 41, 59, 0.3)',
                          borderColor: isOpen ? `${colors.primary.solid}40` : 'rgba(71, 85, 105, 0.5)',
                        }}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${colors.primary.solid}15`,
                              border: `1px solid ${colors.primary.solid}40`,
                            }}
                          >
                            <Icon className="w-4 h-4" style={{ color: colors.primary.solid }} />
                          </div>
                          <h3 className="text-sm sm:text-base font-semibold text-white text-left">
                            {policy.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown
                            className="w-5 h-5 flex-shrink-0"
                            style={{ color: colors.primary.solid }}
                          />
                        </motion.div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div
                              className="p-4 sm:p-5 rounded-b-lg border border-t-0"
                              style={{
                                backgroundColor: `${colors.primary.solid}04`,
                                borderColor: `${colors.primary.solid}40`,
                              }}
                            >
                              <p className="text-sm text-slate-400 leading-relaxed">
                                {policy.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Note */}
          <motion.div
            className="mt-12 p-5 rounded-lg border"
            style={{
              backgroundColor: `${colors.primary.solid}08`,
              borderColor: `${colors.primary.solid}20`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary.solid }} />
              <p className="text-xs sm:text-sm text-slate-400">
                <span className="font-semibold text-white">Política LGPD:</span> Seus dados estão protegidos conforme Lei Geral de Proteção de Dados. Você controla como usamos suas informações. Sem compartilhamento com terceiros sem consentimento.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
