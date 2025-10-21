'use client'

import React, { useState, useRef } from 'react'
import type { Tables } from '@/types/supabase'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { OptimizedImage } from '@/components/ui/optimized-image'
import {
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Target,
  Settings,
  BarChart3,
  Sparkles,
  Rocket,
  Gauge,
  Package,
  ArrowRight,
} from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'

type Campaign = Tables<'campaigns'>;

interface ImplementationGuideSectionProps {
  campaign: Campaign;
}

/**
 * Implementation Guide Section - REDESIGNED v2
 *
 * Sistema de milestones e entregáveis (não dates rígidas)
 * Design premium com glassmorphism + paleta harmoniosa
 * Timeline visual elegante com Framer Motion
 * Linguagem didática e flexível (projetos negociáveis)
 */

export function ImplementationGuideSection({ campaign }: ImplementationGuideSectionProps) {
  const colors = useCampaignColors(campaign);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('milestone-1');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yOrb1 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const milestones = [
    {
      id: 'milestone-1',
      order: 1,
      title: 'Alicerce',
      subtitle: 'Estruturação Técnica',
      icon: Settings,
      accentColor: '#3b82f6', // Blue
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      description: 'Construção da infraestrutura digital e alinhamento estratégico inicial.',
      
      deliverables: [
        {
          label: 'Landing page otimizada',
          detail: 'Página mobile-first com formulário integrado, estrutura semântica SEO e carregamento rápido.',
          impact: 'Base para conversão. Página lenta ou confusa desperdiça grande parte do orçamento de anúncios.'
        },
        {
          label: 'Integrações ativas',
          detail: 'Conexão com calendário (Google/Calendly), automações WhatsApp, confirmações instantâneas e lembretes pré-agendamento.',
          impact: 'Reduz trabalho manual e melhora experiência. Confirmação rápida aumenta confiança do cliente.'
        },
        {
          label: 'Campanhas configuradas',
          detail: 'Google Ads (Search Local) e Meta Ads com segmentação geográfica, comportamental e por intenção de compra.',
          impact: 'Segmentação precisa economiza orçamento. Aparecer para quem não converte é desperdício.'
        },
        {
          label: 'Sistema testado end-to-end',
          detail: 'Simulação completa: busca → clique → agendamento → confirmação. Verificação de erros, velocidade e responsividade.',
          impact: 'Um erro no fluxo pode custar dezenas de clientes. Testar antes de investir é obrigatório.'
        },
      ],

      keyInsight: 'Este milestone estabelece fundações técnicas. Foco é garantir que cada componente funcione antes de gastar orçamento em tráfego.',
      timeline: 'Duração flexível',
      timelineNote: 'Depende da velocidade de resposta em alinhamentos, disponibilidade de materiais (fotos, logo, preços) e complexidade das integrações.',
    },
    {
      id: 'milestone-2',
      order: 2,
      title: 'Calibragem',
      subtitle: 'Aprendizado de Algoritmos',
      icon: Gauge,
      accentColor: '#8b5cf6', // Purple
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      description: 'Fase de learning dos algoritmos (Google, Meta) para identificar padrões de conversão.',

      deliverables: [
        {
          label: 'Histórico de dados inicial',
          detail: 'Plataformas coletam informações: qual público responde melhor, quais horários geram mais conversões, quais criativos performam.',
          impact: 'Sem histórico, algoritmos "chutam". Com dados, entregam anúncios com precisão cirúrgica.'
        },
        {
          label: 'Primeiras conversões validadas',
          detail: 'Clientes começam a agendar. Volume conservador enquanto sistemas calibram entrega e aprendem comportamento do público.',
          impact: 'Qualidade da experiência retroalimenta o algoritmo. Cliente satisfeito = custo menor nas próximas campanhas.'
        },
        {
          label: 'Dashboard de métricas ativo',
          detail: 'Monitoramento de CTR (taxa de clique), CPC (custo/clique), taxa de conversão e qualidade dos leads.',
          impact: 'Métricas revelam gargalos: anúncio fraco? Página confusa? Preço alto? Cada problema tem correção específica.'
        },
        {
          label: 'Ajustes iterativos implementados',
          detail: 'Com base nos dados, refinamos segmentação, ajustamos lances, testamos variações de copy e criativos.',
          impact: 'Otimização contínua é o diferencial. Pequenos ajustes geram impacto composto ao longo do tempo.'
        },
      ],

      keyInsight: 'Expectativa realista: resultados moderados. É como plantar — você investe em raízes (dados), não colhe frutos ainda. Paciência estratégica é crucial.',
      timeline: 'Normalmente 3-5 semanas',
      timelineNote: 'Algoritmos exigem volume mínimo de conversões para sair da fase de aprendizado. Orçamento muito baixo prolonga este período.',
    },
    {
      id: 'milestone-3',
      order: 3,
      title: 'Otimização',
      subtitle: 'Performance Estabilizada',
      icon: BarChart3,
      accentColor: '#10b981', // Green
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      description: 'Algoritmos refinados com histórico suficiente. Entrega inteligente e econômica.',

      deliverables: [
        {
          label: 'Redução de CAC',
          detail: 'Com mais dados, algoritmos preveem melhor quem vai converter. Mesmo orçamento gera mais leads qualificados.',
          impact: 'Eficiência cresce exponencialmente com histórico. Mês 3 performa melhor que mês 1 com mesmo investimento.'
        },
        {
          label: 'Aprendizados consolidados',
          detail: 'Identificação clara: quais serviços têm mais demanda, horários de pico, mensagens que ressoam, perfil de cliente ideal.',
          impact: 'Conhecimento estratégico permite decisões informadas: onde alocar orçamento, quais serviços promover, quando ajustar preços.'
        },
        {
          label: 'Testes avançados rodando',
          detail: 'Com baseline estabelecido, testamos: públicos lookalike, novos criativos, páginas A/B, ofertas sazonais.',
          impact: 'Nunca pare de testar. Mercado muda, algoritmos evoluem. Teste contínuo mantém vantagem competitiva.'
        },
        {
          label: 'Sistema de retenção ativo',
          detail: 'Análise de quantos clientes retornam, deixam avaliações, recomendam. Feedback orgânico reduz dependência de anúncios.',
          impact: 'Cliente satisfeito é ativo de longo prazo. Uma cliente que retorna 4x/ano vale mais que 4 clientes únicos.'
        },
      ],

      keyInsight: 'Neste ponto: sistema maduro. Você tem visibilidade de ROI, conhece CAC (custo de aquisição), consegue prever crescimento com confiança.',
      timeline: 'A partir da semana 7-12',
      timelineNote: 'Se resultados não melhoraram até aqui, revisão profunda é necessária: posicionamento, preço, qualidade ou limitação de mercado.',
    },
    {
      id: 'milestone-4',
      order: 4,
      title: 'Escalabilidade',
      subtitle: 'Expansão Baseada em Dados',
      icon: Rocket,
      accentColor: '#f59e0b', // Amber
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      description: 'Sistema validado e ROI comprovado. Foco em crescimento planejado e diversificação.',

      deliverables: [
        {
          label: 'Aumento de investimento estratégico',
          detail: 'Se ROI for positivo e sustentável, alocação de mais orçamento em canais validados. Crescimento proporcional aos resultados.',
          impact: 'Escalar cedo demais queima capital. Escalar tarde demais perde mercado. Timing certo vem dos dados.'
        },
        {
          label: 'Diversificação de canais',
          detail: 'Teste de novos canais (YouTube Ads, remarketing display, parcerias) mantendo controle de CAC por canal.',
          impact: 'Dependência de um único canal é risco. Diversificação protege contra mudanças de algoritmo ou concorrência.'
        },
        {
          label: 'Segmentação avançada',
          detail: 'Campanhas específicas por serviço, faixa de preço ou nicho (ex: noivas, executivas, público 50+).',
          impact: 'Mensagem genérica converte menos. "Manicure para noivas" tem CPC menor que "manicure".'
        },
        {
          label: 'Otimização de margem',
          detail: 'Com demanda consistente, avaliação de ajustes de preço, pacotes premium ou redução de serviços de baixa margem.',
          impact: 'Crescimento não é só volume. Às vezes atender menos clientes com ticket maior gera mais lucro e menos estresse.'
        },
      ],

      keyInsight: 'Cenário ideal: demanda previsível, operação eficiente, decisões baseadas em métricas. Você gerencia demanda, não espera telefone tocar.',
      timeline: 'Mês 4 em diante (contínuo)',
      timelineNote: 'Crescimento acelerado exige capacidade operacional. Agenda lotada sem estrutura gera atendimento ruim e erosão de marca.',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

      {/* Gradient Orbs with Parallax */}
      <motion.div
        style={{ y: yOrb1 }}
        className="absolute top-1/3 right-1/5 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: yOrb2 }}
        className="absolute bottom-1/4 left-1/6 w-[450px] h-[450px] bg-gradient-to-br from-purple-500/12 via-pink-500/8 to-transparent rounded-full blur-3xl"
      />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 md:py-28 lg:py-36">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-md border"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                borderColor: 'rgba(59, 130, 246, 0.25)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300 tracking-wide">
                Processo de Implementação
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sistema em Quatro{' '}
              <span className="bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Estruturação flexível baseada em <strong className="text-white">entregáveis</strong>, não datas rígidas.
              Cada milestone consolida aprendizados e prepara o próximo estágio.
            </p>
          </motion.div>

          {/* Visual Timeline */}
          <motion.div
            className="mb-24 px-4"
            style={{ scale, opacity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Horizontal Line */}
              <div className="absolute top-8 left-0 right-0 h-1 rounded-full" 
                style={{
                  background: 'linear-gradient(to right, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 33%, rgba(16, 185, 129, 0.3) 66%, rgba(245, 158, 11, 0.3) 100%)'
                }}
              />
              
              {/* Milestone Dots */}
              <div className="relative flex justify-between items-start">
                {milestones.map((milestone, idx) => {
                  const Icon = milestone.icon;
                  return (
                    <motion.div
                      key={milestone.id}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                    >
                      {/* Icon Circle */}
                      <motion.div
                        className="relative w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md mb-4 cursor-pointer"
                        style={{
                          backgroundColor: `${milestone.accentColor}20`,
                          border: `2px solid ${milestone.accentColor}`,
                        }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setExpandedPhase(milestone.id)}
                      >
                        <Icon className="w-7 h-7" style={{ color: milestone.accentColor }} />
                        
                        {/* Glow Effect */}
                        <div
                          className="absolute inset-0 rounded-full opacity-40 blur-xl"
                          style={{ backgroundColor: milestone.accentColor }}
                        />
                      </motion.div>

                      {/* Label */}
                      <div className="text-center space-y-1">
                        <p 
                          className="text-sm font-bold"
                          style={{ color: milestone.accentColor }}
                        >
                          {milestone.order}
                        </p>
                        <p className="text-xs font-semibold text-white">
                          {milestone.title}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Milestone Cards */}
          <div className="space-y-8">
            {milestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              const isExpanded = expandedPhase === milestone.id;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : milestone.id)}
                    className="w-full text-left group"
                  >
                    <div
                      className={`relative p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                        isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                      }`}
                      style={{
                        borderColor: isExpanded ? milestone.accentColor : 'rgba(71, 85, 105, 0.4)',
                        backgroundColor: isExpanded
                          ? 'rgba(15, 23, 42, 0.85)'
                          : 'rgba(15, 23, 42, 0.6)',
                      }}
                    >
                      {/* Background Gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${milestone.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                      />
                      
                      {/* Glassmorphism Layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent pointer-events-none" />
                      
                      {/* Glow when expanded */}
                      {isExpanded && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.25 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: `radial-gradient(ellipse at top, ${milestone.accentColor}, transparent 60%)`
                          }}
                        />
                      )}

                      <div className="relative z-10 flex items-start justify-between gap-6">
                        <div className="flex items-start gap-6 flex-1">
                          {/* Icon Container */}
                          <motion.div
                            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm relative"
                            style={{
                              backgroundColor: `${milestone.accentColor}18`,
                              border: `2px solid ${milestone.accentColor}60`,
                            }}
                            whileHover={{ scale: 1.08, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                          >
                            <Icon className="w-8 h-8" style={{ color: milestone.accentColor }} />
                            
                            {/* Order Badge */}
                            <div
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                              style={{
                                backgroundColor: milestone.accentColor,
                                color: '#0f172a',
                              }}
                            >
                              {milestone.order}
                            </div>
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h3 className="text-2xl font-black text-white mb-1.5 leading-tight tracking-tight">
                              {milestone.title}
                            </h3>
                            
                            {/* Subtitle */}
                            <p 
                              className="text-sm font-bold mb-3 tracking-wide uppercase"
                              style={{ color: milestone.accentColor }}
                            >
                              {milestone.subtitle}
                            </p>
                            
                            {/* Description */}
                            <p className="text-base text-slate-300 leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>

                        {/* Chevron */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex-shrink-0 mt-2"
                        >
                          <ChevronDown
                            className="w-7 h-7 opacity-70"
                            style={{ color: milestone.accentColor }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Deliverables */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          className="mt-3 p-10 rounded-2xl border-2 backdrop-blur-lg space-y-10"
                          style={{
                            borderColor: `${milestone.accentColor}40`,
                            backgroundColor: `rgba(15, 23, 42, 0.75)`,
                            boxShadow: `0 0 40px ${milestone.accentColor}15`
                          }}
                        >
                          {/* Key Insight Box */}
                          <div 
                            className="p-6 rounded-xl border-l-4"
                            style={{
                              backgroundColor: `${milestone.accentColor}08`,
                              borderLeftColor: milestone.accentColor,
                            }}
                          >
                            <p className="text-sm font-semibold text-slate-200 leading-relaxed italic">
                              💡 {milestone.keyInsight}
                            </p>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h4 className="text-base font-black text-white mb-8 flex items-center gap-3 uppercase tracking-wide">
                              <div 
                                className="w-2 h-8 rounded-full" 
                                style={{ backgroundColor: milestone.accentColor }} 
                              />
                              Entregáveis Deste Milestone
                            </h4>
                            
                            <div className="grid grid-cols-1 gap-8">
                              {milestone.deliverables.map((deliverable, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                                  className="group/deliverable"
                                >
                                  <div className="flex gap-5">
                                    {/* Number Badge */}
                                    <div
                                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-base font-black shadow-md"
                                      style={{
                                        backgroundColor: `${milestone.accentColor}25`,
                                        color: milestone.accentColor,
                                        border: `2px solid ${milestone.accentColor}40`
                                      }}
                                    >
                                      {idx + 1}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                      {/* Label */}
                                      <h5 className="text-base font-bold text-white leading-snug">
                                        {deliverable.label}
                                      </h5>
                                      
                                      {/* Detail */}
                                      <p className="text-sm text-slate-300 leading-relaxed">
                                        {deliverable.detail}
                                      </p>
                                      
                                      {/* Impact */}
                                      <div
                                        className="pl-4 border-l-3"
                                        style={{ borderLeftColor: `${milestone.accentColor}50`, borderLeftWidth: '3px' }}
                                      >
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                          <span 
                                            className="font-bold uppercase tracking-wider text-xs" 
                                            style={{ color: milestone.accentColor }}
                                          >
                                            Por que importa:
                                          </span>{' '}
                                          {deliverable.impact}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Timeline Note */}
                          {milestone.timelineNote && (
                            <div className="flex gap-4 p-6 rounded-xl border"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                borderColor: 'rgba(148, 163, 184, 0.2)',
                              }}
                            >
                              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                              <div>
                                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                                  Consideração de Timeline
                                </p>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                  {milestone.timelineNote}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Strategic Note */}
          <motion.div
            className="mt-20 p-10 rounded-2xl bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-slate-950/60 border-2 border-slate-700/40 backdrop-blur-xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/25 to-pink-500/20 border-2 border-purple-400/40 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-7 h-7 text-purple-300" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-base font-black text-white mb-3 uppercase tracking-wide">
                  Observação Final sobre Implementação
                </p>
                <p className="text-base text-slate-200 leading-relaxed">
                  Este sistema não é rigidamente sequencial — milestones se sobrepõem e adaptam conforme necessário. 
                  <strong className="text-white"> O objetivo não é seguir datas, mas atingir entregáveis com qualidade.</strong> Cada projeto é negociável 
                  baseado em contexto, orçamento e objetivos específicos do cliente.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
