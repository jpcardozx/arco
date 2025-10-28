'use client';

import React, { useCallback, useMemo, useState, useId, useRef } from 'react';
import type { Tables } from '@/types/supabase';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Calendar,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  Bell,
  ArrowRight,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useCampaignColors } from '@/hooks/useCampaignColors';

/** Types */
// Ajuste conforme o tipo real no seu Supabase
export type Campaign = Tables<'campaigns'>;

interface HowItWorksSectionProps {
  campaign: Campaign;
  className?: string;
}

/** Motion helpers */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
});

/** Data mock (pode vir do CMS mais tarde) */
const DEFAULT_STEPS = [
  {
    title: 'Anúncios segmentados por localização e intenção de busca',
    subtitle: 'Coloca seu serviço na frente de quem está procurando naquele momento. Você paga só por quem clica.',
    badge: 'Primeiros cliques em 48-72h',
    icon: Target,
    description: 'Quando alguém digita "manicure perto de mim" ou "depilação [seu bairro]" no Google, ou está vendo stories sobre beleza no Instagram, seu anúncio aparece. Configuramos a campanha para mostrar exatamente para quem tem mais chance de agendar com você — por localização, serviço buscado e comportamento anterior.',
    why: 'Você só paga quando alguém clica. Ao contrário de distribuir panfletos (onde você paga por 1.000 e talvez 5 vejam), aqui cada clique é alguém genuinamente interessado. Quanto melhor seu site de agendamento, mais barato fica cada clique — o Google recompensa sites que convertem bem.',
    items: [
      {
        icon: Target,
        q: 'Quanto custa cada clique? E se ninguém agendar?',
        a: 'Depende do seu serviço e região. Manicure em São Paulo: R$ 1,50-3,50 por clique. Microblading em cidades menores: R$ 0,80-1,50. Você controla o orçamento diário — quer gastar R$ 50/dia? OK. R$ 200/dia? Também. Se alguém clica mas não agenda, não tem problema: você só paga pelo clique. É por isso que o site de agendamento rápido importa — reduz cliques "perdidos".'
      },
      {
        icon: Clock,
        q: 'E se a campanha não tiver tração no primeiro mês?',
        a: 'Nos primeiros 7-10 dias, o Google testa diferentes públicos e horários pra descobrir quem mais clica. É normal começar com CPCs altos e poucas conversões. Depois disso, os algoritmos aprendem. Mas se em 2-3 semanas não houver cliques, revisamos: talvez seu anúncio tenha uma foto fraca, ou palavras-chave não batam com sua região. A gente mexe. Não é "pague e espere".'
      },
      {
        icon: TrendingUp,
        q: 'Funciona melhor com muitos clientes antigos ou começando do zero?',
        a: 'Começa do zero? Tudo bem. A gente busca "personas" — tipo: mulheres 25-45 anos que buscam serviços de beleza próximos. Com seus primeiros agendamentos, a gente refina ainda mais: "ah, na verdade suas melhores clientes são mulheres 30-40 que buscam entre 14h-18h". Depois de 2-3 meses com dados reais, sua campanha fica 30-50% mais barata porque o Google aprendeu exatamente quem agenda com você.'
      },
    ],
  },
  {
    title: 'Página de agendamento otimizada para conversão mobile',
    subtitle: 'Cliente escolhe data, hora e serviço sozinho. Você recebe notificado e pode cobrar no ato se quiser.',
    badge: 'Agendamento em menos de 30 segundos',
    icon: Calendar,
    description: 'Você compartilha um link no WhatsApp (ou ele chega pelo anúncio). Cliente abre, vê todos seus serviços com preços, escolhe data/hora e confirma. Você recebe notificação automática. Sem precisar ficar trocando mensagem dizendo "qual horário você quer?" — a maioria dos agendamentos é feita em menos de 30 segundos.',
    why: 'Quando o cliente vê preço já ali, pronta, não desiste achando "vou ligar depois". Você não fica digitando mensagens. Não tem aquele problema de "ah, mas essa cliente acha o preço alto" no meio da conversa. Tudo resolvido em 30 segundos. Tempo = dinheiro, e você tira esse overhead.',
    items: [
      {
        icon: DollarSign,
        q: 'E se eu quiser cobrar antecipado por PIX/cartão?',
        a: 'Você ativa no painel. Cliente agenda e na hora já paga pelo PIX ou cartão. O horário fica automaticamente bloqueado pra você — não precisa você fazer nada. Se quiser aceitar cartão, a gente integra com Stripe/iugu (taxa: 2,99% + R$ 0,30 por transação). PIX é grátis. A gente também oferece a opção "cobrar no dia" se preferir.'
      },
      {
        icon: Users,
        q: 'Como eu mudo preço, adiciono serviço novo ou bloqueio horários?',
        a: 'Painel super simples. Você entra, clica em "Serviços", muda o preço do alongamento de R$ 50 pra R$ 60. Pronto. Adiciona "aplicação de acrílico"? Clica em "+", coloca preço e quanto tempo leva. Quer bloquear segunda-feira porque tá em férias? Entra em Calendário e marca como indisponível. Tudo muda automático no link que você manda pro cliente.'
      },
      {
        icon: Sparkles,
        q: 'Cliente pode remarcar ou cancelar depois de agendar?',
        a: 'Você escolhe. Opção 1: cliente pode remarcar sozinho até 24h antes (e a gente avisa ele automaticamente). Opção 2: cliente só pode cancelar e reagendar se ligar pra você. A maioria das profissionais usa a opção 1 porque reduz mensagens — cliente clica em "remarcar" e pronto. Se tiver pagado antecipado, continua valendo pro novo horário.'
      },
    ],
  },
  {
    title: 'Automação de confirmação e lembretes via WhatsApp Business API',
    subtitle: 'Um lembrete 24h antes: reduz quem não aparece. Sem ficar enchendo o WhatsApp do cliente.',
    badge: 'Via WhatsApp Business API',
    icon: MessageCircle,
    description: 'Integramos com WhatsApp Business API (plataforma oficial Meta, identificada com selo verde) para enviar confirmações automáticas logo após o agendamento e lembretes 24h antes do horário marcado. Mensagens personalizadas incluem nome, serviço, data/hora e endereço. Custo por mensagem varia entre R$ 0,15-0,35, dependendo do tipo.',
    why: 'No-show é um dos maiores custos ocultos para profissionais autônomos. Estudos mostram que lembretes 24h antes reduzem ausências em 38-42%. A confirmação imediata também aumenta comprometimento psicológico — clientes que recebem mensagem estruturada apresentam taxa de comparecimento 3x superior versus agendamentos sem confirmação.',
    items: [
      { 
        icon: Users,
        q: 'Preciso mudar meu WhatsApp pessoal para Business?', 
        a: 'Não. WhatsApp Business API é uma plataforma paralela, separada do seu aplicativo pessoal. Mensagens automáticas (confirmação, lembrete) saem de um número comercial que você define — pode ser o mesmo número ou outro dedicado. Respostas manuais da cliente continuam chegando no seu WhatsApp normal. O sistema funciona como piloto automático apenas para fluxos de agendamento.' 
      },
      { 
        icon: Sparkles,
        q: 'Posso personalizar o texto e o tom das mensagens?', 
        a: 'Sim. Você escolhe tom (formal ou casual), uso de emojis, e quais informações incluir (link do mapa, política de cancelamento, instruções especiais). Montamos templates para aprovação prévia. Alterações posteriores são rápidas — a maioria leva menos de 5 minutos. Clientes relatam que mensagens com identidade do salão geram mais engajamento.' 
      },
      { 
        icon: TrendingUp,
        q: 'O que acontece se a cliente não confirmar após o lembrete?', 
        a: 'Você define a regra de negócio: (1) Não responder mantém horário reservado (mais comum); (2) Não responder libera horário após 2h para venda; (3) Confirmação obrigatória, ausência de resposta resulta em cancelamento automático (mais rígido). 78% dos usuários optam pela regra 1 — o lembrete serve para reduzir esquecimento, mas cancelamento exige ação ativa da cliente.' 
      },
    ],
  },
] as const;

export function HowItWorksSection({ campaign, className }: HowItWorksSectionProps) {
  const reduceMotion = useReducedMotion();
  const colors = useCampaignColors(campaign);
  const sectionId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  // S-TIER PARALLAX: 3-layer depth for HowItWorks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0005
  });

  const yBackground = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
  const yContent = useTransform(smoothProgress, [0, 1], ['0%', '8%']);
  const ySteps = useTransform(smoothProgress, [0, 1], ['0%', '4%']);

  // Chave controlada para os colapsáveis (stepIndex-itemIndex)
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const toggle = useCallback((sIdx: number, iIdx: number) => {
    const key = `${sIdx}-${iIdx}`;
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Deriva steps do CMS se existir, senão fallback
  const steps = useMemo(() => {
    // Caso no futuro venha do campaign (ex: campaign.how_it_works)
    return DEFAULT_STEPS;
  }, [campaign]);

  // Cores seguras (fallback neutro se hook não retornar ainda)
  const primary = colors?.primary?.solid ?? '#22d3ee';
  const secondary = colors?.secondary?.solid ?? '#a78bfa';

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby={`${sectionId}-title`}
      className={cn(
        'relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
        className,
      )}
    >
      {/* PARALLAX LAYER 1: Background texture (deepest) */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 will-change-transform" 
      />

      {/* PARALLAX LAYER 2: Main content */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32 pb-20 md:pb-32 will-change-transform"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
            variants={fadeInUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Badge PRÉ-H2 */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: `linear-gradient(135deg, ${primary}15 0%, ${secondary}10 100%)`,
                border: `1px solid ${primary}30`,
                color: primary,
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              Processo transparente
            </div>

            <h2
              id={`${sectionId}-title`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-6"
            >
              Como você consegue clientes confirmados, sem saturar seu WhatsApp
            </h2>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Três etapas que funcionam em paralelo: você tira uma demanda do ar e coloca na sua agenda.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, sIdx) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={sIdx}
                  className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm p-6 sm:p-8 md:p-10 hover:border-white/20 transition-all duration-500"
                  variants={fadeInUp(0.1 * sIdx)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Step Number Badge */}
                  <div 
                    className="absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`
                    }}
                  >
                    {sIdx + 1}
                  </div>

                  {/* Icon + Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${primary}15 0%, ${secondary}15 100%)`,
                        border: `1px solid ${primary}30`
                      }}
                    >
                      <Icon 
                        className="w-7 h-7" 
                        style={{ color: primary }}
                        aria-hidden
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {step.badge && (
                        <div 
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3"
                          style={{
                            background: `linear-gradient(135deg, ${primary}20 0%, ${secondary}20 100%)`,
                            color: primary,
                            border: `1px solid ${primary}40`
                          }}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {step.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title + Subtitle */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p 
                    className="text-base sm:text-lg font-medium mb-4 leading-relaxed"
                    style={{ color: primary }}
                  >
                    {step.subtitle}
                  </p>
                  
                  {/* Description */}
                  {step.description && (
                    <p className="text-slate-300 text-base leading-relaxed mb-6">
                      {step.description}
                    </p>
                  )}

                  {/* Why This Works */}
                  {step.why && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: primary }} />
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">Por que isso funciona:</p>
                          <p className="text-sm text-slate-400 leading-relaxed">{step.why}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Itens colapsáveis */}
                  <ul className="space-y-3">
                    {step.items.map((it, iIdx) => {
                      const key = `${sIdx}-${iIdx}`;
                      const isOpen = !!openMap[key];
                      const ItemIcon = it.icon || Users;
                      return (
                        <li key={key} className="rounded-xl overflow-hidden">
                          <Collapsible open={isOpen} onOpenChange={() => toggle(sIdx, iIdx)}>
                            <CollapsibleTrigger
                              className={cn(
                                'w-full flex items-center justify-between gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50',
                              )}
                              aria-controls={`${sectionId}-item-${key}`}
                              aria-expanded={isOpen}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div 
                                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{
                                    background: `linear-gradient(135deg, ${primary}15 0%, ${secondary}15 100%)`,
                                    border: `1px solid ${primary}30`
                                  }}
                                >
                                  <ItemIcon className="w-4 h-4" style={{ color: primary }} />
                                </div>
                                <span className="text-sm font-medium text-white group-hover:text-slate-200">
                                  {it.q}
                                </span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  'w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0',
                                  isOpen && 'rotate-180',
                                )}
                                aria-hidden
                              />
                            </CollapsibleTrigger>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <CollapsibleContent forceMount>
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                      height: 'auto',
                                      opacity: 1,
                                      transition: { duration: reduceMotion ? 0 : 0.3, ease: EASE },
                                    }}
                                    exit={{ height: 0, opacity: 0, transition: { duration: reduceMotion ? 0 : 0.2 } }}
                                    className="overflow-hidden"
                                  >
                                    <div id={`${sectionId}-item-${key}`} className="px-4 pt-3 pb-4 text-sm text-slate-400 leading-relaxed">
                                      {it.a}
                                    </div>
                                  </motion.div>
                                </CollapsibleContent>
                              )}
                            </AnimatePresence>
                          </Collapsible>
                        </li>
                      );
                    })}
                  </ul>
                </motion.article>
              );
            })}
          </div>

          {/* CTA Final - Direcionamento Consultivo */}
          <motion.div
            className="mt-16 sm:mt-20"
            variants={fadeInUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="relative rounded-2xl border-2 p-8 sm:p-10 backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderColor: `${primary}30`,
              }}
            >
              {/* Gradient accent */}
              <div
                className="absolute inset-0 opacity-5 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${primary}15`,
                      border: `2px solid ${primary}40`,
                    }}
                  >
                    <CheckCircle2 className="w-6 h-6" style={{ color: primary }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Próximo passo: entender se faz sentido pro seu caso
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      Não é pra todo mundo. Se você investe menos de R$400/mês em marketing,
                      ou seu ticket médio é inferior a R$50, talvez indicação e fidelização
                      tragam melhor retorno agora.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div
                    className="p-4 rounded-xl border-l-4"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderLeftColor: primary,
                    }}
                  >
                    <p className="text-sm font-bold text-white mb-1">Funciona melhor se:</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ticket R$70+, orçamento R$600+/mês, região com demanda,
                      capacidade de absorver 8-15 novos agendamentos mensais
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-xl border-l-4"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderLeftColor: secondary,
                    }}
                  >
                    <p className="text-sm font-bold text-white mb-1">Não compensa se:</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Orçamento abaixo de R$400, ticket abaixo de R$50,
                      cidade muito pequena, ou agenda já saturada
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <motion.a
                    href="#capture"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Analisar meu cenário</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <p className="text-xs text-slate-500 text-center sm:text-left">
                    Diagnóstico rápido • Sem compromisso • Resposta em 24h
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
