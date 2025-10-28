'use client';

import React, { useRef, useState, useMemo, useCallback } from 'react';
import type { Tables } from '@/types/supabase';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { landingImages } from '@/lib/landing-images';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Shield,
  Target,
  Calendar,
  Users,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface ProofSectionProps {
  campaign: Campaign;
}

/**
 * Proof Section - REDESIGNED v2
 * 
 * Credibilidade através de transparência radical
 * Linguagem do ICP (dono de salão, não startup)
 * Redução de fricção: expectativas realistas, não promessas infladas
 * Design único com paleta diferenciada
 */

// Distribuição REAL e transparente (grupo de salões recentes)
const resultsDistribution = [
  {
    tier: 'Excepcional',
    range: 'Alta captação consistente',
    percentage: 'Minoria (~10-15%)',
    accentColor: '#10b981', // Green
    icon: Award,
    context: 'Profissional com marca estabelecida em região densa. Investe consistente. Pode absorver 15+ agendamentos/mês.',
    reality: 'Não é mágica — é alinhamento: orçamento adequado + mercado receptivo + execução disciplinada.',
    faqs: [
      {
        question: 'Como sei se estou nesse perfil?',
        answer: 'Você já tem fluxo orgânico (indicações, redes sociais), consegue investir R$800-1.500/mês em anúncios sem comprometer operação, e seu ticket médio está acima de R$100. Sua agenda comporta 15+ novos agendamentos mensais sem sobrecarga.',
      },
      {
        question: 'Quanto tempo para atingir esse nível?',
        answer: 'Geralmente 8-12 semanas de calibragem contínua. As primeiras 3-4 semanas são testes, depois começa a estabilizar. Não é instantâneo, mas o padrão se estabelece de forma previsível.',
      },
    ],
  },
  {
    tier: 'Objetivo alcançado',
    range: 'Captação previsível mensal',
    percentage: 'Maioria (~50-60%)',
    accentColor: '#3b82f6', // Blue
    icon: Target,
    context: 'Investimento consistente. Mercado responsivo. Sistema funcionando. Consegue prever fluxo mensal.',
    reality: 'Resultado esperado de quem segue o processo. Levada ~8-12 semanas para se tornar previsível.',
    faqs: [
      {
        question: 'O que significa "previsível"?',
        answer: 'Você consegue estimar quantos agendamentos virão no próximo mês com base no investimento. Não precisa torcer para a agenda encher — você planeja sabendo o que esperar. Isso muda completamente o controle do negócio.',
      },
      {
        question: 'Qual o investimento típico nesse tier?',
        answer: 'Entre R$450-800/mês em anúncios. O retorno varia com ticket médio e taxa de conversão, mas a maioria consegue pelo menos 8-12 agendamentos confirmados mensais. Ticket de R$80 já torna o sistema viável.',
      },
    ],
  },
  {
    tier: 'Em desenvolvimento',
    range: 'Início gradual',
    percentage: 'Comum (~20-25%)',
    accentColor: '#f59e0b', // Amber
    icon: TrendingUp,
    context: 'Fases iniciais de calibragem. Algoritmos ainda aprendem. Testes ainda rodando.',
    reality: 'Fase esperada. A maioria evolui para tier superior nos 2-3 meses seguintes com ajustes.',
    faqs: [
      {
        question: 'Estou "travado" ou é normal?',
        answer: 'Se está nas primeiras 6-8 semanas, é normal. Os algoritmos do Meta levam tempo para aprender quem converte melhor. Se após 10 semanas continua sem padrão, aí revisamos orçamento, criativos ou público.',
      },
      {
        question: 'O que faço para acelerar?',
        answer: 'Aumente ligeiramente o orçamento (algoritmo aprende mais rápido com mais dados), teste novos criativos (vídeos costumam performar melhor que imagens estáticas), e garanta que o follow-up com leads seja rápido (resposta em até 2h aumenta conversão).',
      },
    ],
  },
  {
    tier: 'Abaixo do esperado',
    range: 'Resultados limitados',
    percentage: 'Minoria (~5-10%)',
    accentColor: '#ef4444', // Red
    icon: AlertTriangle,
    context: 'Orçamento insuficiente, mercado muito competitivo, ou serviço com baixa demanda local.',
    reality: 'Sem condições mínimas, o sistema não compensa. Melhor explorar outras estratégias (indicação, fidelização).',
    faqs: [
      {
        question: 'Quando o sistema não é para mim?',
        answer: 'Se seu orçamento está abaixo de R$400/mês, ou seu ticket médio é inferior a R$50, ou você está em cidade muito pequena (menos de 30 mil habitantes), o custo por aquisição tende a não compensar. Nesses casos, indicação e fidelização dão melhor retorno.',
      },
      {
        question: 'Posso reverter esse cenário?',
        answer: 'Depende da causa. Se é orçamento baixo, aumentar para R$600+ costuma mudar o jogo. Se é ticket baixo, revisar precificação ou focar em serviços premium. Se é mercado pequeno, talvez o digital não seja o canal principal agora.',
      },
    ],
  },
];

// Impactos observáveis (não promessas, apenas padrões)
const aggregatedMetrics = [
  {
    id: 'customer-flow',
    label: 'Fluxo de clientes',
    value: 'Previsível',
    icon: Users,
    accentColor: '#3b82f6',
    detail: 'Deixa de ser "esperança" para ser previsão. Você planeja mês que vem baseado em dados deste mês.',
    benchmark: 'Diferencial: saber com semanas de antecedência quantos agendamentos vêm, não descobrir surpreso.',
  },
  {
    id: 'ramp-up',
    label: 'Tempo até funcionar',
    value: '8-12 semanas',
    icon: Calendar,
    accentColor: '#8b5cf6',
    detail: 'Primeiras 2-3 semanas: testes. Semanas 4-8: otimização. Semana 9+: padrão estável.',
    benchmark: 'Se após 6 semanas nada aconteceu, revisamos. Não é "pague e espere".',
  },
  {
    id: 'no-show-reduction',
    label: 'Quem aparece',
    value: 'Mais gente',
    icon: CheckCircle2,
    accentColor: '#10b981',
    detail: 'Automação reduz esquecimento. Confirmação automática + lembrete 24h faz diferença.',
    benchmark: 'Bônus: você recupera tempo que gastaria relembrando cliente. Agenda mais limpa.',
  },
  {
    id: 'operational-load',
    label: 'Seu tempo',
    value: 'Menos WhatsApp',
    icon: Zap,
    accentColor: '#f59e0b',
    detail: 'Agendamento e confirmação saem da sua carga manual. Você responde, sistema automatiza.',
    benchmark: 'Tempo recuperado: ~5-10h/mês em média. Pode reinvestir em atendimento ou descanso.',
  },
];

// Carousel de imagens - contexto real
const carouselImages = [
  {
    id: 1,
    title: 'Ambiente Atrativo',
    description: 'Primeira impressão que retém clientes novos',
    ...landingImages.interiors.modern2,
  },
  {
    id: 2,
    title: 'Equipe Preparada',
    description: 'Profissionais capazes de executar a proposta',
    ...landingImages.services.hair1,
  },
  {
    id: 3,
    title: 'Sistemas Implantados',
    description: 'Processos que permitem crescimento previsível',
    ...landingImages.services.styling,
  },
  {
    id: 4,
    title: 'Feedback Contínuo',
    description: 'Medição e ajuste baseado em dados reais',
    ...landingImages.atmosphere.ambient,
  },
];

export function ProofSection({ campaign }: ProofSectionProps) {
  const colors = useCampaignColors(campaign);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // S-TIER PARALLAX: 3-layer depth for Proof section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0005
  });

  // Conservative parallax ranges to prevent content clipping
  const yBackground = useTransform(smoothProgress, [0, 1], ['0%', '12%']);
  const yContent = useTransform(smoothProgress, [0, 1], ['0%', '4%']);
  const yCarousel = useTransform(smoothProgress, [0, 1], ['0%', '2%']);

  // Carousel controls - memoized for performance
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return carouselImages.length - 1;
      if (next >= carouselImages.length) return 0;
      return next;
    });
  }, [carouselImages.length]);

  // Carousel animation variants - optimized for 60fps
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Keyboard navigation for carousel - memoized
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      paginate(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      paginate(1);
    }
  }, [paginate]);

  // Swipe detection constants
  const swipeConfidenceThreshold = 10000;
  const swipePower = useCallback((offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
    >
      {/* Unique Diagonal Pattern (não repete grade anterior) */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255, 255, 255, 0.02) 35px,
              rgba(255, 255, 255, 0.02) 70px
            )`
          }}
        />
      </div>
      
      {/* PARALLAX LAYER 1: Background gradient orbs (deepest) */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute top-1/4 left-1/5 w-[550px] h-[550px] bg-gradient-to-br from-emerald-500/10 via-teal-500/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/6 w-[480px] h-[480px] bg-gradient-to-br from-violet-500/8 via-purple-500/5 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* PARALLAX LAYER 2: Main content */}
      <motion.div 
        style={{ y: yContent }}
        className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 md:py-28 lg:py-36 will-change-transform"
      >
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
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.25)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300 tracking-wide">
                Transparência Radical
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Testado em{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                23 Negócios Reais
              </span>
            </h2>

            {/* Subtitle com contexto */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
              Pesquisa realizada entre janeiro e março de 2025 com salões variando em tamanho, localização e investimento em marketing.
            </p>

            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Os resultados mostram um padrão claro: sucesso depende de fatores mensuráveis, não de mágica. Aqui está o que aprendemos.
            </p>
          </motion.div>

          {/* Results Distribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
            {resultsDistribution.map((tier, idx) => {
              const Icon = tier.icon;
              
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl border-2 p-8 backdrop-blur-sm overflow-hidden"
                  style={{
                    borderColor: `${tier.accentColor}40`,
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  }}
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      background: `linear-gradient(135deg, ${tier.accentColor}, transparent)`
                    }}
                  />

                  {/* Glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                          style={{
                            backgroundColor: `${tier.accentColor}20`,
                            border: `2px solid ${tier.accentColor}50`,
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: tier.accentColor }} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 
                            className="text-lg font-black uppercase tracking-wide mb-1"
                            style={{ color: tier.accentColor }}
                          >
                            {tier.tier}
                          </h3>
                          <p className="text-sm text-white font-bold">
                            {tier.range}
                          </p>
                        </div>
                      </div>

                      {/* Percentage Badge */}
                      <div 
                        className="px-4 py-2 rounded-xl text-center backdrop-blur-md border-2"
                        style={{
                          backgroundColor: `${tier.accentColor}15`,
                          borderColor: `${tier.accentColor}40`,
                        }}
                      >
                        <div 
                          className="text-2xl font-black"
                          style={{ color: tier.accentColor }}
                        >
                          {tier.percentage}
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-1">
                          {tier.range}
                        </div>
                      </div>
                    </div>

                    {/* Context */}
                    <div className="space-y-3 mb-4">
                      <div
                        className="p-4 rounded-xl border-l-4"
                        style={{
                          backgroundColor: `${tier.accentColor}08`,
                          borderLeftColor: tier.accentColor,
                        }}
                      >
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                          Perfil Típico
                        </p>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {tier.context}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: tier.accentColor }}
                        />
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong style={{ color: tier.accentColor }}>Realidade:</strong> {tier.reality}
                        </p>
                      </div>
                    </div>

                    {/* Collapsibles discretos */}
                    {tier.faqs && tier.faqs.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {tier.faqs.map((faq, faqIdx) => (
                          <Collapsible key={faqIdx}>
                            <CollapsibleTrigger className="w-full group">
                              <div
                                className="flex items-center justify-between gap-2 p-3 rounded-lg border transition-all duration-200 hover:border-opacity-60"
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                  borderColor: `${tier.accentColor}20`,
                                }}
                              >
                                <span className="text-xs font-medium text-slate-300 text-left">
                                  {faq.question}
                                </span>
                                <ChevronDown
                                  className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                  style={{ color: tier.accentColor }}
                                />
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div
                                className="mt-2 p-4 rounded-lg border-l-2"
                                style={{
                                  backgroundColor: `${tier.accentColor}05`,
                                  borderLeftColor: `${tier.accentColor}40`,
                                }}
                              >
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Aggregated Metrics (não casos fictícios) */}
          <div className="mb-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-3">
                Métricas Agregadas dos 23 Salões
              </h3>
              <p className="text-slate-400">
                Dados consolidados — faixa de variação baseada em contexto operacional
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {aggregatedMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl border-2 p-8 backdrop-blur-sm"
                    style={{
                      borderColor: `${metric.accentColor}30`,
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    }}
                  >
                    {/* Glassmorphism */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${metric.accentColor}18`,
                            border: `2px solid ${metric.accentColor}40`,
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: metric.accentColor }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                            {metric.label}
                          </p>
                          <p 
                            className="text-3xl font-black"
                            style={{ color: metric.accentColor }}
                          >
                            {metric.value}
                          </p>
                        </div>
                      </div>

                      {/* Detail */}
                      <div className="space-y-3">
                        <div 
                          className="p-4 rounded-xl border-l-4"
                          style={{
                            backgroundColor: `${metric.accentColor}06`,
                            borderLeftColor: metric.accentColor,
                          }}
                        >
                          <p className="text-sm text-slate-200 leading-relaxed">
                            {metric.detail}
                          </p>
                        </div>

                        <div className="flex items-start gap-2 p-3 rounded-lg"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                        >
                          <BarChart3 
                            className="w-4 h-4 flex-shrink-0 mt-0.5" 
                            style={{ color: metric.accentColor }} 
                          />
                          <p className="text-xs text-slate-400 leading-relaxed">
                            <strong style={{ color: metric.accentColor }}>Benchmark:</strong> {metric.benchmark}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Showcase Carousel */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">O que os bem-sucedidos têm em comum</span>
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Fatores Críticos de{' '}
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Sucesso
                </span>
              </h3>
              <p className="text-slate-400">
                Estes 4 pilares aparecem em todos os salões que atingem crescimento consistente
              </p>
            </div>

            {/* Carousel Container */}
            <motion.div
              className="relative max-w-5xl mx-auto"
              style={{ y: yCarousel }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="region"
              aria-label="Fatores críticos de sucesso - galeria de imagens"
              aria-live="polite"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="absolute inset-0"
                  >
                    <OptimizedImage
                      src={carouselImages[currentSlide].webp}
                      alt={carouselImages[currentSlide].alt}
                      width={1000}
                      height={600}
                      className="w-full h-full object-cover"
                      placeholderType="salonInterior"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {carouselImages[currentSlide].title}
                        </h4>
                        <p className="text-base text-slate-300">
                          {carouselImages[currentSlide].description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  aria-label={`Imagem anterior (${currentSlide + 1} de ${carouselImages.length})`}
                  title="Navegar para imagem anterior (ou use a seta esquerda)"
                >
                  <ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  aria-label={`Próxima imagem (${currentSlide + 1} de ${carouselImages.length})`}
                  title="Navegar para próxima imagem (ou use a seta direita)"
                >
                  <ChevronRight className="w-5 h-5 text-white" aria-hidden="true" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6" role="group" aria-label="Controles de navegação do carrossel">
                {carouselImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentSlide ? 1 : -1);
                      setCurrentSlide(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                      idx === currentSlide
                        ? 'w-8 bg-purple-400'
                        : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Ir para ${image.title}`}
                    aria-current={idx === currentSlide ? 'true' : 'false'}
                    title={image.title}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Examples Gallery */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ambientes de Referência
              </h3>
              <p className="text-base text-slate-400 max-w-2xl mx-auto">
                Exemplos de salões que investiram em presença digital moderna
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Ferramentas Profissionais',
                  description: 'Equipamentos de ponta para resultados superiores',
                  type: 'products' as const,
                  ...landingImages.products.tools,
                },
                {
                  title: 'Design Moderno',
                  description: 'Ambientes que atraem e retêm clientes',
                  type: 'salonInterior' as const,
                  ...landingImages.interiors.modern1,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-[4/3] relative">
                    <OptimizedImage
                      src={item.webp}
                      alt={item.alt}
                      placeholderType={item.type}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 bg-slate-900/90 backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>

                  {/* Badge de exemplo */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-sm">
                    <span className="text-xs font-medium text-emerald-300">Referência</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-slate-500 text-center mt-6">
              * Imagens ilustrativas de ambientes de referência. Não representam clientes específicos do ARCO.
            </p>
          </motion.div>

          {/* Bottom Credibility Statement */}
          <motion.div
            className="p-10 rounded-2xl bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-slate-950/60 border-2 border-slate-700/40 backdrop-blur-xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/20 border-2 border-emerald-400/40 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-base font-black text-white mb-3 uppercase tracking-wide">
                  Por Que Mostramos Os Dados Ruins Também?
                </p>
                <p className="text-base text-slate-200 leading-relaxed mb-4">
                  Porque credibilidade vem de <strong className="text-white">transparência, não cherry-picking</strong>. 
                  Se todos tivessem resultados excepcionais, você desconfiaria — e com razão. O sistema funciona 
                  <strong className="text-emerald-400"> quando há condições mínimas</strong>: orçamento adequado (R$450+), 
                  ticket compatível (R$70+), localização com demanda, e tempo para calibragem (8-12 semanas).
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Não vendemos milagre. Vendemos sistema previsível com expectativas realistas. 
                  Se você não tem as condições mínimas agora, melhor aguardar do que frustrar ambos os lados.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.a
              href="#capture"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-medium text-slate-100 backdrop-blur-md border transition-all duration-300"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
              }}
              whileHover={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">Analisar meu cenário</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </motion.a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
