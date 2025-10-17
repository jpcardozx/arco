'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import { Search, Target, Code, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PremiumHero } from '@/components/agendamentos/PremiumHero'
import { PremiumConsultoriaCard } from '@/components/agendamentos/PremiumConsultoriaCard'
import { QualificationModal } from '@/components/agendamentos/QualificationModal'
import { WhatsAppButton } from '@/components/primitives/WhatsAppButton'
import { ConsultoriaCardData } from '@/types/agendamentos'

export default function AgendamentosPage() {
  const router = useRouter()
  const [showQualification, setShowQualification] = useState(false)
  const [selectedConsultoria, setSelectedConsultoria] = useState<string | null>(null)

  // Consultorias data with enhanced types
  const consultorias: ConsultoriaCardData[] = [
    {
      id: 'diagnostico-estrategico',
      name: 'Diagnóstico de Performance',
      slug: 'diagnostico-estrategico',
      icon: Search,
      color: '#3B82F6',
      price_cents: 0, // Consultar
      duration_minutes: 60,
      description: 'Análise completa de velocidade, SEO técnico e experiência do usuário. Identifique exatamente o que está impedindo seu site de converter e rankear melhor.',
      features: {
        included: [
          'Auditoria automatizada com Lighthouse e PageSpeed',
          'Análise manual de Core Web Vitals e métricas reais',
          'Identificação de problemas críticos de SEO técnico',
          'Mapeamento de gargalos específicos de performance',
          'Relatório executivo com 5-10 ações prioritizadas'
        ],
        not_included: ['Implementação de correções', 'Gestão de campanhas', 'Suporte recorrente']
      },
      ideal_for: [
        'Sites lentos prejudicando conversão',
        'Baixo posicionamento orgânico sem causa clara',
        'Plataformas e-commerce com taxa de abandono alta'
      ],
      badge: 'Recomendado',
      badgeColor: 'blue',
      is_active: true,
      slots_per_day: 3,
      buffer_minutes: 15,
      min_budget_monthly_cents: 100000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'consultoria-tecnica',
      name: 'Revisão de Arquitetura',
      slug: 'consultoria-tecnica',
      icon: Code,
      color: '#60a5fa',
      price_cents: 0, // Consultar
      duration_minutes: 90,
      description: 'Análise profunda de código, arquitetura e segurança. Descubra pontos de fragilidade antes que se tornem problemas críticos em produção.',
      features: {
        included: [
          'Análise de arquitetura e padrões estruturais',
          'Identificação de code smells e anti-patterns',
          'Verificação de vulnerabilidades conhecidas',
          'Revisão de performance em queries e endpoints',
          'Plano de ação técnico com quick wins e melhorias estratégicas'
        ]
      },
      ideal_for: [
        'Aplicações com bugs recorrentes ou instabilidade',
        'Times planejando refatoração ou migração',
        'Produtos escalando e enfrentando gargalos técnicos'
      ],
      is_active: true,
      slots_per_day: 2,
      buffer_minutes: 15,
      min_budget_monthly_cents: 200000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'suporte-tecnico-sprint',
      name: 'Reforço para Sprint',
      slug: 'suporte-tecnico-sprint',
      icon: Zap,
      color: '#2563eb',
      price_cents: 0, // Personalizado
      duration_minutes: 0, // Personalizado (1-4 semanas)
      description: 'Colaboração técnica hands-on para sprints críticas ou gaps de conhecimento. Integração direta com seu time para acelerar entregas sem comprometer qualidade.',
      features: {
        included: [
          'Alocação dedicada de 1 a 4 semanas conforme necessidade',
          'Participação ativa em cerimônias ágeis do time',
          'Code review constante e pair programming',
          'Implementação de features ou correções críticas',
          'Transfer de conhecimento para o time',
          'Documentação técnica e handoff completo'
        ]
      },
      ideal_for: [
        'Sprints com deadline apertado e time sobrecarregado',
        'Projetos com stack ou features fora da expertise do time',
        'Tech leads precisando de suporte técnico sênior temporário'
      ],
      badge: 'Novo',
      badgeColor: 'purple',
      is_active: true,
      slots_per_day: 1,
      buffer_minutes: 30,
      min_budget_monthly_cents: 2000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  const handleStartBooking = () => {
    setShowQualification(true)
  }

  const handleQualificationComplete = (qualificationData: any) => {
    setShowQualification(false)
    
    // Scroll to consultoria selection
    const consultoriaSection = document.getElementById('consultorias')
    consultoriaSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectConsultoria = (id: string) => {
    setSelectedConsultoria(id)
    router.push(`/agendamentos/${id}` as Route)
  }

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section - S-Tier Quality */}
      <PremiumHero onStartBooking={handleStartBooking} />

      {/* Consultorias Section - Premium */}
      <section id="consultorias" className="relative py-20 px-6 overflow-hidden" style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`
      }}>
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)',
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
            className="text-center mb-16"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Modalidades Disponíveis
            </motion.h2>
            <motion.p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Três opções de consultoria técnica adaptadas a diferentes contextos
            </motion.p>
          </motion.div>

          {/* Cards Grid - 3 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {consultorias.map((consultoria, index) => (
              <PremiumConsultoriaCard
                key={consultoria.id}
                consultoria={consultoria}
                onSelect={handleSelectConsultoria}
                isRecommended={index === 0} // First one is recommended
              />
            ))}
          </div>
        </div>
      </section>

      {/* Consolidated: Process + Trust + CTA */}
      <section className="relative py-16 px-6 bg-slate-950">
        <div className="container mx-auto max-w-6xl relative z-10">
          
          {/* Process Timeline - Compacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Escolha', desc: 'Selecione o tipo de sessão adequado' },
                { step: '2', title: 'Agende', desc: 'Escolha data e horário disponível' },
                { step: '3', title: 'Confirmação', desc: 'Receba link e orientações por email' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400 font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Friction Reducers - Subliminar (substitui social proof) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-white text-center mb-8">O que você recebe</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '📄', title: 'Relatório Técnico Detalhado', desc: 'Documento com análise, diagnóstico e recomendações priorizadas' },
                  { icon: '⏱️', title: 'Confirmação em 24h', desc: 'Resposta rápida após solicitação de agendamento' },
                  { icon: '💻', title: 'Sessão Remota ou Presencial', desc: 'Flexibilidade de formato conforme sua preferência' },
                  { icon: '📧', title: 'Suporte Pós-Sessão', desc: 'Canal aberto para dúvidas sobre o relatório (7 dias)' }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-lg bg-slate-900/30 border border-slate-800/30">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA - Direto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-600/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Agendar sessão
              </h3>
              <p className="text-slate-300 mb-6">
                Selecione a modalidade adequada e verifique disponibilidade de horários
              </p>
              <Button
                size="lg"
                onClick={handleStartBooking}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                Ver Horários Disponíveis
              </Button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Qualification Modal */}
      <QualificationModal
        open={showQualification}
        onClose={() => setShowQualification(false)}
        onComplete={handleQualificationComplete}
      />

      {/* WhatsApp Button - Floating */}
      <WhatsAppButton 
        phoneNumber="21967277533"
        message="Olá! Gostaria de agendar uma consultoria técnica."
        variant="floating"
        size="md"
      />
    </div>
  )
}
