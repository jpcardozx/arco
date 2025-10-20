'use client'

import React, { useState } from 'react'
import type { Tables } from '@/types/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Smartphone,
  Search,
  Calendar,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'

type Campaign = Tables<'campaigns'>;

interface ProcessBreakdownSectionProps {
  campaign: Campaign;
}

/**
 * Process Breakdown Section
 *
 * Explica em detalhe cada passo do processo
 * Com collapsibles para informações densas
 * Posição: Após ValueProposition
 */

export function ProcessBreakdownSection({ campaign }: ProcessBreakdownSectionProps) {
  const colors = useCampaignColors(campaign);
  const [expandedStep, setExpandedStep] = useState<string | null>('step-1');

  const steps = [
    {
      id: 'step-1',
      number: '1',
      icon: Search,
      title: 'Cliente Pesquisa no Google',
      subtitle: 'Seu anúncio aparece em tempo real',
      description: 'Quando alguém na sua região pesquisa "manicure perto de mim" ou "salão de cabelo [seu bairro]"',
      details: [
        {
          label: 'Segmentação',
          content: 'Você define: raio 3-5km, dias/horários, tipos de serviço. Sistema só gasta orçamento com buscas relevantes.'
        },
        {
          label: 'Quando aparece',
          content: 'Campanha entra no ar em até 48h após aprovação. Primeiros cliques começam em 2-6h.'
        },
        {
          label: 'Qualidade do anúncio',
          content: 'Google prioriza anúncios com boa taxa de clique e landing page rápida. Sua página otimizada = custo menor por clique.'
        },
        {
          label: 'Concorrência',
          content: 'Em São Paulo (alta concorrência): R$2-4 por clique. Cidades menores: R$0.50-1.50. Você vê tudo em tempo real.'
        },
      ]
    },
    {
      id: 'step-2',
      number: '2',
      icon: Smartphone,
      title: 'Cliente Clica e Vê sua Página',
      subtitle: 'Landing page otimizada para conversão',
      description: 'Página carrega em <2.5s. Cliente vê catalogo de serviços, valores, horários disponíveis',
      details: [
        {
          label: 'Design focado em mobile',
          content: '95% dos acessos vêm de celular. Página prioriza:  1) Serviços disponíveis, 2) Valores, 3) Botão "Agendar", 4) Localização/contato.'
        },
        {
          label: 'Checkout rápido',
          content: 'Cliente escolhe serviço → horário → preenche dados (nome, telefone, email) → confirma. Tudo em <30 segundos.'
        },
        {
          label: 'Taxa de conversão',
          content: 'Média: 8-12% dos visitantes agora marcam. Sem landing, seria muito menor (2-3%).'
        },
        {
          label: 'Teste contínuo',
          content: 'Se você usar plano Crescimento/Escala, testamos variações de copy, cores, CTA para melhorar conversão.'
        },
      ]
    },
    {
      id: 'step-3',
      number: '3',
      icon: Calendar,
      title: 'Cliente Agenda Direto',
      subtitle: 'Sem você responder WhatsApp',
      description: 'Sistema integra com seu calendário. Cliente vê horários reais e confirma automaticamente',
      details: [
        {
          label: 'Sincronização em tempo real',
          content: 'Calendário do salão se conecta com landing page. Você marca cliente como "confirmado" → horário some da página → não há double-booking.'
        },
        {
          label: 'Dados do cliente',
          content: 'Nome, telefone, email, serviço escolhido, horário → tudo registrado no sistema. Você acessa pelo dashboard.'
        },
        {
          label: 'Integração WhatsApp',
          content: 'Na hora que agenda, cliente já recebe confirmação por WhatsApp com: horário, endereço, instruções de como chegar.'
        },
        {
          label: 'Sem SPAM',
          content: 'É um agendamento real (cliente digitou dados, escolheu horário). Taxa de falta inicial: ~28%. Com lembrete: cai para ~9%.'
        },
      ]
    },
    {
      id: 'step-4',
      number: '4',
      icon: MessageSquare,
      title: 'Confirmação Automática + Lembrete',
      subtitle: '24h antes do horário',
      description: 'Cliente recebe mensagens por WhatsApp em horários estratégicos',
      details: [
        {
          label: 'Confirmação imediata',
          content: 'Assim que agenda: "Ótimo! Sua consulta de [SERVIÇO] está confirmada para [DIA] às [HORA]. Endereço: [SEU ENDEREÇO]"'
        },
        {
          label: 'Lembrete 24h antes',
          content: 'Dia anterior ao agendamento: "Lembrete: sua consulta de [SERVIÇO] é amanhã às [HORA]. Confirme sua presença respondendo com ✓"'
        },
        {
          label: 'Reduz falta',
          content: 'Cliente confirmando = sinal de compromisso. Se não confirmar, você já sabe que pode oferecer horário para outro cliente.'
        },
        {
          label: 'Customização',
          content: 'Você define: quais mensagens enviar, horário de envio, se solicita depósito/sinal via PIX para garantir horário.'
        },
      ]
    },
    {
      id: 'step-5',
      number: '5',
      icon: CheckCircle2,
      title: 'Você Gerencia e Otimiza',
      subtitle: 'Relatório completo de resultados',
      description: 'Dashboard com métricas: cliques, agendamentos, custo por cliente, ROI',
      details: [
        {
          label: 'Métricas em tempo real',
          content: 'Visualiza: quantos cliques hoje, quantos agendamentos, custo médio por cliente (CAC), quanto gastou vs. quanto faturou.'
        },
        {
          label: 'Plano Essencial',
          content: 'Você gerencia anúncios no Google/Meta. Dashboard mostra dados. Se quiser otimizar, você ajusta ou contrata outra agência.'
        },
        {
          label: 'Plano Crescimento',
          content: 'ARCO gerencia tudo. Otimizamos anúncios semanalmente: testamos públicos, horários, criativos. Você só recebe relatório mensal + clientes agendando.'
        },
        {
          label: 'Plano Escala',
          content: 'Tudo do Crescimento + consultoria 15/15 dias, múltiplas landing pages (ex: uma pra manicure, uma pra cabelo), testes A/B de copy/design.'
        },
      ]
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
              Como funciona, passo a passo
            </h2>
            <p className="text-lg text-slate-400">
              Entenda cada etapa do processo, da busca até a confirmação
            </p>
          </motion.div>

          {/* Steps Accordion */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isExpanded = expandedStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className="w-full text-left"
                  >
                    <div
                      className="p-6 rounded-lg border transition-all cursor-pointer group"
                      style={{
                        borderColor: isExpanded ? colors.primary.solid : 'rgb(71, 85, 105, 0.5)',
                        backgroundColor: isExpanded
                          ? `${colors.primary.solid}08`
                          : 'rgba(30, 41, 59, 0.3)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {/* Step number */}
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                            style={{
                              backgroundColor: colors.primary.solid,
                            }}
                          >
                            {step.number}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: colors.primary.solid }} />
                              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">{step.subtitle}</p>
                            <p className="text-sm text-slate-500">{step.description}</p>
                          </div>
                        </div>

                        {/* Chevron */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown
                            className="w-5 h-5"
                            style={{ color: colors.primary.solid }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="mt-0 p-6 rounded-b-lg border border-t-0 space-y-4"
                          style={{
                            borderColor: `${colors.primary.solid}40`,
                            backgroundColor: `${colors.primary.solid}04`,
                          }}
                        >
                          {step.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className="border-l-2 pl-4"
                              style={{ borderColor: `${colors.primary.solid}40` }}
                            >
                              <p className="text-sm font-semibold text-white mb-1">{detail.label}</p>
                              <p className="text-sm text-slate-400 leading-relaxed">{detail.content}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom note */}
          <motion.div
            className="mt-12 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">Não precisa ser técnico:</span> Você não mexe em nada de Google Ads, landing page ou integração. Nós cuidamos de tudo, você só gerencia seu calendário e atende bem.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
