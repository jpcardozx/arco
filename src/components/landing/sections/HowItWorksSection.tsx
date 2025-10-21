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
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useCampaignColors } from '@/hooks/useCampaignColors';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { landingImages } from '@/lib/landing-images';

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
    subtitle: 'Investimento direcionado para pessoas próximas ao seu salão, com interesse real no serviço.',
    badge: 'Primeiros resultados em 48-72h',
    icon: Target,
    description: 'Configuramos campanhas no Google e Meta (Instagram/Facebook) para exibir seu anúncio quando alguém pesquisa serviços de beleza na sua região, ou demonstra comportamento compatível com seu público-alvo. O modelo é custo por clique: você paga apenas quando alguém interage com o anúncio.',
    why: 'Google e Meta ajustam o custo por clique baseado na qualidade do anúncio e taxa de conversão. Anúncios bem estruturados, com landing pages rápidas e oferta clara, recebem descontos automáticos no lance — reduzindo custo de aquisição ao longo do tempo.',
    items: [
      { 
        icon: Target,
        q: 'Como funciona a segmentação de público?', 
        a: 'Utilizamos três camadas de filtro: (1) Raio geográfico configurável em torno do seu endereço; (2) Palavras-chave de intenção (ex: "manicure perto de mim", "depilação [bairro]"); (3) Perfil comportamental — pessoas que já demonstraram interesse em serviços similares. O Meta também utiliza "audiências semelhantes" (lookalike), identificando perfis parecidos com seus melhores clientes.' 
      },
      { 
        icon: Clock,
        q: 'Qual o tempo até começar a ver agendamentos?', 
        a: 'A campanha entra no ar em até 48 horas após aprovação. Os primeiros cliques aparecem entre 2-6 horas. O primeiro agendamento depende de fatores como dia da semana e qualidade da oferta — normalmente ocorre entre 24-72h. Nos primeiros 7-10 dias, os algoritmos estão em fase de aprendizado, testando variações de público e ajustando entrega. A partir do segundo mês, com mais dados históricos, a performance tende a melhorar entre 40-60% mantendo o mesmo orçamento.' 
      },
      { 
        icon: TrendingUp,
        q: 'Por que os resultados melhoram com o tempo?', 
        a: 'Algoritmos de machine learning precisam de volume de dados para otimizar. Nas primeiras semanas, Google e Meta testam diferentes segmentos de público e horários. Com base em quem efetivamente agenda (não apenas clica), eles refinam a entrega para perfis de maior conversão. Exemplo real: uma profissional obteve 8 agendamentos no mês 1, 14 no mês 2 e 18 no mês 3, com orçamento fixo. A melhoria é resultado do aprendizado contínuo da plataforma.' 
      },
    ],
  },
  {
    title: 'Página de agendamento otimizada para conversão mobile',
    subtitle: 'Sistema que permite ao cliente visualizar serviços, horários e confirmar reserva de forma autônoma.',
    badge: 'Tempo médio de agendamento: 28 segundos',
    icon: Calendar,
    description: 'Desenvolvemos uma interface mobile-first com carregamento inferior a 1 segundo, exibindo catálogo de serviços com valores transparentes e calendário sincronizado em tempo real. O cliente seleciona, confirma e, se configurado, realiza pagamento antecipado via PIX ou cartão. Você recebe notificação automática.',
    why: 'Estudos indicam que 67% dos usuários abandonam páginas com carregamento superior a 3 segundos. Adicionalmente, 58% desistem quando não encontram preços claros ou precisam abrir outro canal para obter informações básicas. Transparência e velocidade reduzem fricção no funil de conversão.',
    items: [
      { 
        icon: DollarSign,
        q: 'Como altero preços ou adiciono novos serviços?', 
        a: 'O painel administrativo permite edição em tempo real — você ajusta valores, inclui novos procedimentos (ex: "alongamento de gel") ou bloqueia horários específicos. Alterações refletem imediatamente no site. Não há dependência de desenvolvedor nem custo adicional por modificação. A maioria dos usuários domina a interface em 10-15 minutos.' 
      },
      { 
        icon: Users,
        q: 'Como funciona o pagamento antecipado? E se a cliente não comparecer?', 
        a: 'Você define a política: (1) Pagamento obrigatório no ato da reserva (PIX ou cartão) — horário fica bloqueado; (2) Pagamento presencial opcional — você decide se aceita ou não. Em caso de pagamento antecipado e não comparecimento, o valor não é reembolsado (conforme termos aceitos no checkout). Dados de mercado indicam que profissionais que exigem pagamento antecipado relatam redução de 70-90% em no-shows.' 
      },
      { 
        icon: Sparkles,
        q: 'Cliente pode remarcar? Posso bloquear dias específicos?', 
        a: 'Você configura janela de remarcação (padrão: até 24h antes). Após esse prazo, remarcação requer contato direto. Para bloquear dias — férias, feriados, eventos — basta marcar como indisponível no calendário; o horário deixa de aparecer para agendamento online. Útil para controlar capacidade em períodos de alta demanda.' 
      },
    ],
  },
  {
    title: 'Automação de confirmação e lembretes via WhatsApp Business API',
    subtitle: 'Comunicação programada que reduz ausências e libera tempo operacional.',
    badge: 'WhatsApp Business API oficial',
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
        className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32 will-change-transform"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
            variants={fadeInUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2
              id={`${sectionId}-title`}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white mb-4"
            >
              Como funciona o sistema de{' '}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                }}
              >
                aquisição e agendamento
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Três componentes integrados para gerar demanda previsível e reduzir trabalho operacional.
              <br />
              <span className="text-slate-300 font-medium">
                Anúncios segmentados + landing page otimizada + automação de confirmação.
              </span>
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

          {/* CTA final */}
          <motion.div
            className="mt-10 sm:mt-12 flex flex-col items-center gap-3"
            variants={fadeInUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-slate-300 text-sm sm:text-base text-center max-w-2xl font-medium">
              Sistema testado em centenas de profissionais de beleza e bem-estar.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm text-center max-w-xl">
              Primeiros resultados: 48-72h. Otimização contínua: 90 dias. ROI típico: 4-6 meses.
            </p>
          </motion.div>

          {/* Visual Examples Row */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Professional Service Image */}
            <div className="relative group overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
              <OptimizedImage
                src={landingImages.services.hair2.webp}
                alt={landingImages.services.hair2.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                placeholderType="professionalService"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    EXECUÇÃO
                  </span>
                </div>
                <p className="text-sm font-medium text-white">Técnica profissional em ação</p>
              </div>
            </div>

            {/* Cosmetics Products Image */}
            <div className="relative group overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
              <OptimizedImage
                src={landingImages.products.cosmetics.webp}
                alt={landingImages.products.cosmetics.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                placeholderType="products"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">
                    PRODUTOS
                  </span>
                </div>
                <p className="text-sm font-medium text-white">Portfólio premium de serviços</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mt-4 text-xs text-center text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            * Imagens ilustrativas de ambientes de referência para demonstrar padrão de qualidade esperado.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
