'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, DollarSign, Calendar, Clock, TrendingUp, Shield, Zap, HelpCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface FAQSectionProps {
  campaign: Campaign;
}

const faqs = [
  {
    icon: Zap,
    question: 'Preciso saber de tecnologia para usar?',
    answer: 'Não! A plataforma é 100% visual e intuitiva. Além disso, nossa equipe configura tudo para você nos primeiros 3 dias. Você só precisa aprovar e começar a atender.',
  },
  {
    icon: Clock,
    question: 'Quanto tempo leva para começar a receber clientes?',
    answer: 'Em média, os primeiros agendamentos aparecem entre 48-72 horas após ativar os anúncios. No plano Professional, incluímos R$ 500 em créditos de anúncios para você começar mais rápido.',
  },
  {
    icon: Calendar,
    question: 'E se eu já tenho agenda no papel ou outro sistema?',
    answer: 'Sem problema! Você pode continuar usando seu sistema atual e usar o ARCO apenas para clientes novos vindos dos anúncios. Com o tempo, a maioria migra 100% porque é muito mais prático.',
  },
  {
    icon: DollarSign,
    question: 'Como funciona o pagamento garantido?',
    answer: 'O cliente paga PIX ou cartão no momento do agendamento. Você recebe 95% do valor (5% é taxa de processamento) 2 dias depois. Se o cliente não aparecer, ele não recebe reembolso - você já foi pago.',
  },
  {
    icon: Shield,
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Não tem contrato de fidelidade. Você pode cancelar quando quiser e só paga até o final do mês corrente. Mas temos certeza que você não vai querer cancelar quando ver os resultados 😊',
  },
  {
    icon: TrendingUp,
    question: 'Vocês também criam minha página no Instagram?',
    answer: 'Não criamos conteúdo orgânico, mas podemos indicar parceiros especializados. Nosso foco é 100% em tráfego pago (anúncios que geram agendamentos e vendas imediatas).',
  },
  {
    icon: TrendingUp,
    question: 'Como vocês medem o resultado?',
    answer: 'Mostramos tudo no dashboard: quantos cliques nos anúncios, quantos agendamentos, taxa de conversão, valor investido vs. faturamento. Transparência total, sem "achismos".',
  },
  {
    icon: MessageCircle,
    question: 'WhatsApp tem custo adicional?',
    answer: 'As mensagens de confirmação e lembrete têm custo mínimo (cerca de R$ 0,15 cada). Esse valor já está incluído nos planos Professional e Enterprise. No Starter, você paga separado conforme uso.',
  },
];

export function FAQSection({ campaign }: FAQSectionProps) {
  const colors = useCampaignColors(campaign);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[128px] opacity-[0.06]"
          style={{ backgroundColor: colors.primary.solid }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[96px] opacity-[0.05]"
          style={{ backgroundColor: colors.secondary.solid }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Perguntas{' '}
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.primary.solid}, ${colors.secondary.solid})`
              }}
            >
              frequentes
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Tudo o que você precisa saber antes de começar
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faq.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Collapsible
                  open={isOpen}
                  onOpenChange={(open) => setOpenIndex(open ? idx : null)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div 
                      className="w-full rounded-xl border transition-all duration-300"
                      style={{
                        backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                        borderColor: isOpen ? `${colors.primary.solid}40` : 'rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div className="px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 text-left flex-1">
                          <div 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ 
                              backgroundColor: `${colors.primary.solid}15`
                            }}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary.solid }} />
                          </div>
                          <span className="font-bold text-sm sm:text-base lg:text-lg text-white">
                            {faq.question}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                        </motion.div>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-2">
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed pl-12 sm:pl-14">
                              {faq.answer}
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

        {/* CTA */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-base sm:text-lg text-slate-400 mb-6">
            Ainda tem dúvidas? Fale com nosso time no WhatsApp
          </p>
          <motion.a
            href="https://wa.me/5511999999999?text=Olá! Vim da landing page e tenho dúvidas sobre o ARCO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg text-white transition-all duration-300"
            style={{ backgroundColor: '#25D366' }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 211, 102, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="text-sm sm:text-base">Falar no WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
