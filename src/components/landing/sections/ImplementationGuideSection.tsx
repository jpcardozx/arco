'use client'

import React, { useState } from 'react'
import type { Tables } from '@/types/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'

type Campaign = Tables<'campaigns'>;

interface ImplementationGuideSectionProps {
  campaign: Campaign;
}

/**
 * Implementation Guide Section
 *
 * O que acontece nos primeiros 90 dias
 * Com collapsibles para cada fase
 * Posição: Após ProofSection, antes de Pricing
 */

export function ImplementationGuideSection({ campaign }: ImplementationGuideSectionProps) {
  const colors = useCampaignColors(campaign);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');

  const phases = [
    {
      id: 'phase-1',
      timeline: 'Semana 1-2',
      title: 'Setup & Aprovação',
      icon: Clock,
      headline: 'Preparamos tudo para você',
      tasks: [
        { task: 'Kickoff call', description: 'Você explica seu salão, serviços, horários, valores. Esclarecemos dúvidas.' },
        { task: 'Criar landing page', description: 'Nós desenvolvemos sua página otimizada com seus serviços, fotos, valores e horários.' },
        { task: 'Integrar calendário', description: 'Conectamos seu calendário/agenda (Google Calendar, Zendesk, etc) com a página de agendamento.' },
        { task: 'Configurar anúncios', description: 'Se você escolheu plano Crescimento, nós configuramos Google Ads + Meta Ads com públicos segmentados.' },
        { task: 'Testar tudo', description: 'Você testa: agendar na página, receber confirmação WhatsApp, ver dados no dashboard.' },
        { task: 'Anúncios no ar', description: 'Campanha aprovada pelo Google e Meta. Primeiros clientes começam a vir.' },
      ],
      expectation: 'Quando termina: Seu sistema tá pronto. Cliente começa a agendar na página (e não mais pelo WhatsApp).',
      warning: 'Isto toma 7-10 dias. Se você demorar responder emails/calls, pode atrasar.',
    },
    {
      id: 'phase-2',
      timeline: 'Semana 3-6 (Mês 1)',
      title: 'Aprendizado (Learning Phase)',
      icon: AlertCircle,
      headline: 'Google e Meta estão testando públicos',
      tasks: [
        { task: 'Anúncios gastando orçamento', description: 'Os algoritmos estão em fase "aprendizado", testando diferentes públicos, horários, criativos.' },
        { task: 'Primeiros clientes chegando', description: 'Você já tá recebendo agendamentos. Provavelmente: 4-8 clientes novos no mês 1 (conservador).' },
        { task: 'Qualidade importante agora', description: 'Cada cliente que vem é "feedback" pro algoritmo. Atendimento excelente = cliente satisfeito = melhor feedback = anúncio mais barato.' },
        { task: 'Dashboard pra acompanhar', description: 'Você consegue ver em tempo real: quantos cliques, quantos agendamentos, custo por cliente (CAC).' },
        { task: 'Primeiras otimizações', description: 'Se você tá no Crescimento/Escala, nós ajustamos público, horários de exibição, criativo dos anúncios.' },
      ],
      expectation: 'Meta Mês 1: 8-12 agendamentos novos (depende de orçamento, qualidade do atendimento, concorrência local).',
      warning: 'Não desista agora. Mês 1 é sempre o mais conservador. Mês 2-3 melhoram quando o algoritmo aprende.',
    },
    {
      id: 'phase-3',
      timeline: 'Semana 7-12 (Mês 2-3)',
      title: 'Otimização (Optimization Phase)',
      icon: TrendingUp,
      headline: 'Algoritmo entendeu melhor o que funciona',
      tasks: [
        { task: 'Resultados melhorando', description: 'Com histórico de dados (qual público converte melhor, qual horário, qual criativo), Google/Meta refinam entrega.' },
        { task: 'Custo por clique caindo', description: 'Quanto mais histórico, mais confiança. Confiança = CPC (custo por clique) cai. Mesmo orçamento = mais clientes.' },
        { task: 'Seu atendimento melhora', description: 'Você aprendeu a lidar com mais clientes, conhece sua capacidade, consegue ser mais eficiente.' },
        { task: 'ROI positivo esperado', description: 'Se tudo certo: Mês 2: +40-60% vs. Mês 1. Mês 3: +20-30% vs. Mês 2 (crescimento continua, mas desacelera).' },
        { task: 'Feedback do cliente', description: 'Você já tem clientes que repetiram, deixaram review, recomendaram. Mais social proof = anúncios mais baratos.' },
      ],
      expectation: 'Meta Mês 3: 16-22 agendamentos novos (depende de como foi Mês 1-2 + ajustes que fizemos).',
      warning: 'Se resultados forem ruins Mês 1-2, pode ser: 1) Orçamento muito baixo, 2) Qualidade do atendimento, 3) Preço muito alto, 4) Localização ruim. Vamos revisar juntos.',
    },
    {
      id: 'phase-4',
      timeline: 'Depois (Mês 4+)',
      title: 'Escala (Scaling Phase)',
      icon: Zap,
      headline: 'Você sabe o que funciona',
      tasks: [
        { task: 'Aumentar orçamento', description: 'Se tá dando certo, aumenta orçamento de R$750 para R$1.200+. Mesmo CPC = mais clientes.' },
        { task: 'Testar novos públicos', description: 'Agora sabemos qual público converte. Podemos testar públicos similares (lookalike) ou geograficamente próximos.' },
        { task: 'Adicionar serviços', description: 'Se manicure tá lotada, criamos segunda landing page só pra depilação/cabelo com anúncio separado.' },
        { task: 'Remarketing', description: 'Cliente que visitou mas não agendou? Retargetamos com anúncio: "Voltou a pensar em nós? Clique aqui pra agendar".' },
        { task: 'Preço pode subir', description: 'Com demanda alta e agenda cheia, você pode aumentar preços. Menos volume, mas melhor margem.' },
      ],
      expectation: 'Cenário ideal Mês 6+: 25-35 agendamentos/mês, agenda sempre cheia, você virando pessoas embora por falta de horário.',
      warning: 'Nunca pare de acompanhar qualidade. Crescimento rápido + atendimento ruim = reviews ruins = anúncios caros novamente.',
    },
  ];

  const expectations = [
    { icon: CheckCircle2, label: 'Mês 1', value: '8-12 clientes', detail: '(Learning phase - algoritmo tá testando)' },
    { icon: TrendingUp, label: 'Mês 2', value: '+40-60%', detail: 'vs. Mês 1' },
    { icon: TrendingUp, label: 'Mês 3', value: '+20-30%', detail: 'vs. Mês 2' },
    { icon: Zap, label: 'Mês 6+', value: '25-35+', detail: 'agendamentos/mês (escalando)' },
  ];

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
              Os primeiros 90 dias
            </h2>
            <p className="text-lg text-slate-400">
              O que esperar, fase por fase
            </p>
          </motion.div>

          {/* Expectations Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {expectations.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50 text-center"
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: colors.primary.solid }} />
                  <p className="text-xs font-semibold text-slate-400 mb-1">{exp.label}</p>
                  <p className="text-lg font-bold text-white">{exp.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{exp.detail}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Phases Accordion */}
          <div className="space-y-4">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              const isExpanded = expandedPhase === phase.id;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                    className="w-full text-left"
                  >
                    <div
                      className="p-6 rounded-lg border transition-all cursor-pointer"
                      style={{
                        borderColor: isExpanded ? colors.primary.solid : 'rgb(71, 85, 105, 0.5)',
                        backgroundColor: isExpanded
                          ? `${colors.primary.solid}08`
                          : 'rgba(30, 41, 59, 0.3)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${colors.primary.solid}20`,
                              borderColor: `${colors.primary.solid}40`,
                              border: '1px solid',
                            }}
                          >
                            <Icon className="w-5 h-5" style={{ color: colors.primary.solid }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-400 mb-1">{phase.timeline}</p>
                            <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                            <p className="text-sm text-slate-400">{phase.headline}</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown
                            className="w-5 h-5 flex-shrink-0"
                            style={{ color: colors.primary.solid }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="mt-0 p-6 rounded-b-lg border border-t-0 space-y-6"
                          style={{
                            borderColor: `${colors.primary.solid}40`,
                            backgroundColor: `${colors.primary.solid}04`,
                          }}
                        >
                          {/* Tasks */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-4">Tarefas / O que acontece:</h4>
                            <div className="space-y-3">
                              {phase.tasks.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                                  className="flex gap-3"
                                >
                                  <div
                                    className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                                    style={{ backgroundColor: colors.primary.solid }}
                                  />
                                  <div>
                                    <p className="text-sm font-semibold text-white">{item.task}</p>
                                    <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Expectation & Warning */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700/30">
                            <div className="flex gap-3">
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary.solid }} />
                              <div>
                                <p className="text-xs font-semibold text-slate-400 mb-1">Expectativa realista:</p>
                                <p className="text-sm text-slate-300">{phase.expectation}</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" />
                              <div>
                                <p className="text-xs font-semibold text-slate-400 mb-1">Atenção:</p>
                                <p className="text-sm text-slate-300">{phase.warning}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-12 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-white">Está preparado?</span> Esses são números reais baseados em 23 salões. Seu resultado depende de: orçamento, qualidade do atendimento, preços competitivos e estar preparado pra crescimento.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
