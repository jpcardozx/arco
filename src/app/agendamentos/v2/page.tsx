/**
 * AGENDAMENTOS PAGE - Versão 2 COMPLETA
 * 
 * Design principles:
 * 1. Orquestração premium igual /jpcardozx
 * 2. Conteúdo substancial (não oversized)
 * 3. Gradientes sutis e profissionais
 * 4. 3 tipos de sessão COM A NOVA: Suporte Técnico Sprint
 * 5. Copy maduro e factual
 */

'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Code, Users } from 'lucide-react'

import { AgendamentosHero } from '@/components/agendamentos/v2/AgendamentosHero'
import { ConsultoriaCardV2, SessionType } from '@/components/agendamentos/v2/ConsultoriaCardV2'

export default function AgendamentosPageV2() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  // 3 Session Types - Including NEW Sprint Support
  const sessionTypes: SessionType[] = [
    {
      id: 'diagnostico-digital',
      name: 'Diagnóstico Digital',
      icon: Search,
      duration: '60 minutos',
      color: '#3B82F6', // blue
      badge: 'Popular',
      badgeColor: 'blue',
      description: 'Análise técnica detalhada de performance web, métricas Core Web Vitals, SEO técnico e identificação de oportunidades de otimização.',
      ideal_for: [
        'Sites com problemas de velocidade ou carregamento',
        'Empresas com baixo ranqueamento orgânico',
        'Negócios buscando melhorar conversão'
      ],
      includes: [
        'Auditoria Lighthouse + PageSpeed Insights completa',
        'Análise Core Web Vitals (LCP, CLS, INP)',
        'Review técnico SEO (crawling, indexação)',
        'Identificação de gargalos de performance',
        'Relatório com recomendações priorizadas por impacto'
      ]
    },
    {
      id: 'auditoria-codigo',
      name: 'Auditoria de Código',
      icon: Code,
      duration: '90 minutos',
      color: '#10B981', // green
      badge: 'Técnico',
      badgeColor: 'green',
      description: 'Revisão técnica profunda de arquitetura front-end e back-end, padrões de desenvolvimento, segurança e manutenibilidade do código.',
      ideal_for: [
        'Projetos com alta dívida técnica',
        'Times implementando refatoração',
        'Aplicações com problemas de escalabilidade'
      ],
      includes: [
        'Review de arquitetura e estrutura de pastas',
        'Análise de padrões de código e boas práticas',
        'Auditoria de segurança e vulnerabilidades',
        'Performance de queries e otimizações de banco',
        'Roadmap técnico com priorização de melhorias'
      ]
    },
    {
      id: 'suporte-tecnico-sprint',
      name: 'Suporte Técnico Sprint',
      icon: Users,
      duration: 'Personalizado (1-4 semanas)',
      color: '#8B5CF6', // purple
      badge: 'Novo',
      badgeColor: 'purple',
      description: 'Suporte técnico pontual para recrutadores e tech leads. Alocação flexível para sprint específica ou período personalizado com entrega definida.',
      ideal_for: [
        'Tech leads precisando de reforço temporário',
        'Recrutadores buscando especialista para projeto',
        'Empresas com sprint crítica ou deadline apertado'
      ],
      includes: [
        'Alocação dedicada por período definido',
        'Participação em planning e dailies',
        'Code review contínuo durante o período',
        'Pair programming com time interno',
        'Documentação técnica das implementações',
        'Relatório final com status e recomendações'
      ]
    }
  ]

  const handleSelectSession = (id: string) => {
    setSelectedSession(id)
    // TODO: Navigate to booking flow for this session
    console.log('Selected session:', id)
  }

  const handleStartBooking = () => {
    // Scroll to session selection
    const section = document.getElementById('sessions')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <AgendamentosHero onStartBooking={handleStartBooking} />

      {/* Sessions Section */}
      <section 
        id="sessions" 
        className="relative py-20 px-6 overflow-hidden"
      >
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Escolha o tipo de sessão
            </h2>
            <p className="text-lg text-slate-300">
              Três opções de sessão técnica para diferentes necessidades. 
              De diagnóstico rápido a suporte completo para sprints.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {sessionTypes.map((session, index) => (
              <ConsultoriaCardV2
                key={session.id}
                session={session}
                onSelect={handleSelectSession}
                isRecommended={index === 0}
              />
            ))}
          </div>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-3">
                Como funciona o agendamento
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-300">
                <div>
                  <div className="font-semibold text-blue-400 mb-2">1. Escolha</div>
                  <p>Selecione o tipo de sessão adequado para sua necessidade.</p>
                </div>
                <div>
                  <div className="font-semibold text-green-400 mb-2">2. Agende</div>
                  <p>Escolha data e horário disponível no calendário online.</p>
                </div>
                <div>
                  <div className="font-semibold text-purple-400 mb-2">3. Confirmação</div>
                  <p>Receba confirmação por email com orientações e link da sessão.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                q: 'As sessões são remotas ou presenciais?',
                a: 'Todas as sessões podem ser realizadas remotamente via Google Meet. Para Suporte Técnico Sprint, há opção de alocação presencial mediante disponibilidade.'
              },
              {
                q: 'Quando recebo o relatório técnico?',
                a: 'Para Diagnóstico e Auditoria, o relatório é enviado em até 48 horas após a sessão. Para Suporte Sprint, relatórios parciais são enviados semanalmente.'
              },
              {
                q: 'Posso remarcar uma sessão agendada?',
                a: 'Sim, remarcações podem ser feitas até 24 horas antes do horário agendado através do painel de controle ou por email.'
              },
              {
                q: 'Como funciona o pagamento?',
                a: 'Diagnóstico e Auditoria são pagos antecipadamente. Suporte Sprint pode ser parcelado conforme duração (semanal ou mensal).'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
