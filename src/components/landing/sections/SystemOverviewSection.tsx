'use client'

import React, { useRef } from 'react'
import type { Tables } from '@/types/supabase'
import { motion } from 'framer-motion'
import { Search, TrendingDown, Clock, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'
import { useParallax } from '@/hooks/useParallax'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { landingImages } from '@/lib/landing-images'

type Campaign = Tables<'campaigns'>

interface SystemOverviewSectionProps {
  campaign: Campaign
}

/**
 * SystemOverviewSection
 * 
 * PROPÓSITO (Posição #2 após Hero):
 * - Apresentar dados verificáveis sobre comportamento de busca no segmento
 * - Demonstrar estrutura de SERP e hierarquia de visibilidade
 * - Contextualizar componentes técnicos de presença digital otimizada
 * - Asset: Mockup educativo de página de resultados de busca
 * 
 * ABORDAGEM: Tom informativo e neutro, baseado em dados observáveis
 * Evita apelos emocionais, foca em informações relevantes e micro-nurturing
 */

const MARKET_SHIFTS = [
  {
    stat: '87%',
    label: 'Busca online primeiro',
    description: 'Consumidores iniciam pesquisa por "salão próximo" em plataformas de busca antes de contato direto',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    stat: '73%',
    label: 'Primeira página crítica',
    description: 'Estabelecimentos fora dos primeiros resultados perdem visibilidade na etapa de consideração',
    icon: TrendingDown,
    color: 'from-slate-500 to-slate-400',
  },
  {
    stat: '18min',
    label: 'Média de decisão',
    description: 'Intervalo médio entre busca inicial e conclusão do agendamento em canais responsivos',
    icon: Clock,
    color: 'from-amber-500 to-yellow-500',
  },
  {
    stat: '28%',
    label: 'Taxa de ausência',
    description: 'Percentual de não-comparecimento em agendamentos sem confirmação ou lembrete estruturado',
    icon: AlertTriangle,
    color: 'from-purple-500 to-pink-500',
  },
]
const COMPETITOR_ADVANTAGES = [
  {
    title: 'Visibilidade em busca local',
    description: 'Integração Google Ads + perfil Google Business otimizado posiciona estabelecimento em queries locais relevantes.',
  },
  {
    title: 'Agendamento assíncrono',
    description: 'Sistema permite reserva em horários não-comerciais, eliminando dependência de atendimento telefônico.',
  },
  {
    title: 'Confirmação automatizada',
    description: 'Notificações programadas via WhatsApp reduzem taxa de não-comparecimento de 28% para aproximadamente 9%.',
  },
  {
    title: 'Métricas de retorno',
    description: 'Painel com custo por agendamento e ROI permite alocação informada de investimento em aquisição.',
  },
]

export function SystemOverviewSection({ campaign }: SystemOverviewSectionProps) {
  const colors = useCampaignColors(campaign)
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  // Parallax suave apenas no background
  const bgParallax = useParallax(bgRef, { speed: 0.2, enableOnMobile: false })

  return (
    <section
      ref={sectionRef}
      id="market-reality"
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
    >
      {/* Background texture com parallax suave */}
      <div
        ref={bgRef}
        style={bgParallax.style}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px] opacity-30"
      />

      {/* Conteúdo principal - SEM transform para evitar cortar */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto">
          
          {/* Header - Abordagem informativa */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-300">Comportamento de busca 2024-2025</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Como clientes localizam e{' '}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                escolhem salões de beleza
              </span>
            </h2>
            <p className="text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Dados de comportamento de consumo no segmento beauty revelam mudanças significativas 
              nos padrões de descoberta e decisão de agendamento.
            </p>
          </motion.div>

          {/* 4 Market Shifts - Dados concretos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {MARKET_SHIFTS.map((shift, idx) => {
              const Icon = shift.icon
              return (
                <motion.div
                  key={shift.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.19, 1, 0.22, 1] }}
                  className="relative group"
                >
                  <div className="relative h-full p-6 rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm hover:border-slate-600/60 transition-colors duration-300">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${shift.color} bg-opacity-10`}>
                      <Icon className="w-6 h-6 text-white/90" />
                    </div>

                    <div className={`text-3xl font-bold bg-gradient-to-r ${shift.color} bg-clip-text text-transparent mb-2`}>
                      {shift.stat}
                    </div>
                    <div className="text-sm font-semibold text-white mb-3">{shift.label}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{shift.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ASSET ESTRATÉGICO: Simulação visual de busca Google */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              Estrutura de resultados de busca{' '}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                orgânica e paga
              </span>
            </h3>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
              Visualização de SERP (Search Engine Results Page) para query "salão de beleza [localização]" 
              demonstra hierarquia de visibilidade.
            </p>

            {/* Mockup de busca Google com imagem estratégica */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm shadow-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Imagem de busca Google - usando imagem de ambiente profissional para contextualizar */}
                <div className="relative aspect-video w-full bg-slate-950">
                  <OptimizedImage
                    src={landingImages.interiors.modern1.webp}
                    alt="Resultado de busca Google mostrando salões concorrentes"
                    width={900}
                    height={506}
                    className="w-full h-full object-cover opacity-20"
                    placeholderType="salonInterior"
                  />
                  
                  {/* Overlay com simulação de busca */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950/95">
                    {/* Barra de busca mockup */}
                    <div className="w-full max-w-2xl mb-8">
                      <div className="flex items-center gap-3 p-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <Search className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-300 font-medium">salão de beleza perto de mim</span>
                      </div>
                    </div>

                    {/* Resultados mockup */}
                    <div className="w-full max-w-2xl space-y-3">
                      {/* Resultado 1 - Posição paga */}
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wide">Anúncio</span>
                              <span className="text-sm text-slate-400">•</span>
                              <span className="text-sm text-slate-300">Estabelecimento A • 4.8★ (127 avaliações)</span>
                            </div>
                            <p className="text-white font-medium mb-1">Agendamento online disponível • Horários hoje</p>
                            <p className="text-xs text-slate-400">Endereço comercial • 2.3km • Aberto agora</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        </div>
                      </div>

                      {/* Resultado 2 - Posição paga */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-blue-400 uppercase tracking-wide">Anúncio</span>
                          <span className="text-sm text-slate-400">•</span>
                          <span className="text-sm text-slate-300">Estabelecimento B • 4.6★ (89 avaliações)</span>
                        </div>
                        <p className="text-white font-medium mb-1">Confirmação automática • WhatsApp integrado</p>
                        <p className="text-xs text-slate-400">Endereço comercial • 1.8km • Fecha às 19h</p>
                      </div>

                      {/* Posição orgânica não-otimizada */}
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded bg-slate-700/50 flex-shrink-0" />
                          <div>
                            <p className="text-slate-400 font-medium text-sm">Estabelecimentos sem presença otimizada</p>
                            <p className="text-xs text-slate-500 mt-1">Posições orgânicas inferiores • Menor taxa de clique</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info footer */}
                    <div className="mt-6 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                      <p className="text-xs text-slate-400 text-center">
                        <span className="text-slate-300 font-medium">87%</span> das buscas locais iniciam em plataformas digitais • 
                        Primeiras posições concentram <span className="text-slate-300 font-medium">~70%</span> dos cliques
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Métricas de contexto */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <p className="text-2xl font-bold text-slate-300">~70%</p>
                  <p className="text-xs text-slate-500 mt-1">Cliques nas 3 primeiras posições</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <p className="text-2xl font-bold text-slate-300">18min</p>
                  <p className="text-xs text-slate-500 mt-1">Tempo médio de decisão</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <p className="text-2xl font-bold text-slate-300">28%</p>
                  <p className="text-xs text-slate-500 mt-1">Taxa de ausência s/ confirmação</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Componentes de presença digital estruturada */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              Componentes de{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                presença digital estruturada
              </span>
            </h3>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
              Elementos técnicos que diferenciam estabelecimentos com alta visibilidade 
              em plataformas de busca local e otimização de conversão.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {COMPETITOR_ADVANTAGES.map((advantage, idx) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * idx, ease: [0.19, 1, 0.22, 1] }}
                  className="relative group p-6 rounded-xl border border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/40 hover:border-slate-600/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-700/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-2">{advantage.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA informativo */}
            <motion.div
              className="mt-12 text-center p-8 rounded-2xl border border-slate-700/50 bg-slate-800/30"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">
                Implementação estruturada de aquisição digital
              </h4>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
                Sistema integra Google Ads, perfil local otimizado, agendamento responsivo 
                e automação de confirmações para reduzir fricção no funil de conversão.
              </p>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300"
              >
                <span>Ver componentes do sistema</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
