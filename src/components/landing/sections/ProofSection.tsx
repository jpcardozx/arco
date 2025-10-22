'use client';

import React, { useRef, useState } from 'react';
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
} from 'lucide-react';
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
    percentage: 'Minoria',
    accentColor: '#10b981', // Green
    icon: Award,
    context: 'Perfil ideal: investimento sustentado, região densa, posicionamento premium, capacidade operacional livre.',
    reality: 'Não é mágica — é alinhamento de múltiplos fatores: orçamento + mercado + execução.',
  },
  {
    tier: 'Objetivo alcançado',
    range: 'Captação previsível mensal',
    percentage: 'Maioria',
    accentColor: '#3b82f6', // Blue
    icon: Target,
    context: 'Configuração sólida: investimento adequado, mercado responsivo, automação funcionando, posicionamento claro.',
    reality: 'Resultado esperado para quem segue o sistema. Torna-se previsível após fase de calibragem.',
  },
  {
    tier: 'Em desenvolvimento',
    range: 'Início gradual',
    percentage: 'Comum',
    accentColor: '#f59e0b', // Amber
    icon: TrendingUp,
    context: 'Fase inicial: ainda calibrando algoritmos, testando mensagens, ou mercado competitivo demandando ajustes.',
    reality: 'Crescimento progressivo. Parcela significativa evolui para tier superior após consolidação.',
  },
  {
    tier: 'Abaixo do esperado',
    range: 'Resultados limitados',
    percentage: 'Minoria',
    accentColor: '#ef4444', // Red
    icon: AlertTriangle,
    context: 'Limitantes estruturais: restrição orçamentária severa, mercado saturado/pouco denso, ou modelo de negócio incompatível.',
    reality: 'Honestidade: sem condições mínimas, sistema não compensa. Melhor focar em outras estratégias.',
  },
];

// Métricas agregadas (não casos individuais fictícios)
const aggregatedMetrics = [
  {
    id: 'acquisition-cost',
    label: 'Custo de aquisição',
    value: 'Competitivo',
    icon: Users,
    accentColor: '#3b82f6',
    detail: 'Varia conforme região (capital vs interior), tipo de serviço e competição local. Contexto importa mais que número absoluto.',
    benchmark: 'Viável quando ticket de serviço justifica investimento. Precisa haver margem saudável.',
  },
  {
    id: 'time-to-breakeven',
    label: 'Tempo até retorno',
    value: 'Gradual',
    icon: Calendar,
    accentColor: '#8b5cf6',
    detail: 'Início: calibragem com poucos resultados. Meio: aceleração. Consolidação: previsibilidade.',
    benchmark: 'Padrão esperado: melhora progressiva nas primeiras semanas. Estagnação demanda revisão.',
  },
  {
    id: 'no-show-reduction',
    label: 'Redução de faltas',
    value: 'Significativa',
    icon: CheckCircle2,
    accentColor: '#10b981',
    detail: 'Confirmação automatizada + lembretes reduzem drasticamente ausências. Impacto direto em faturamento previsível.',
    benchmark: 'Menos desperdício de horário = mais capacidade produtiva sem custo adicional.',
  },
  {
    id: 'time-savings',
    label: 'Tempo economizado',
    value: 'Substancial',
    icon: Zap,
    accentColor: '#f59e0b',
    detail: 'Agendamento automático + confirmações eliminam trabalho manual repetitivo (WhatsApp, telefone, ida/volta).',
    benchmark: 'Horas recuperadas podem ser reinvestidas em atendimento ou gestão estratégica.',
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

  // Carousel controls
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return carouselImages.length - 1;
      if (next >= carouselImages.length) return 0;
      return next;
    });
  };

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

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
                    onDragEnd={(e, { offset, velocity }) => {
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentSlide ? 1 : -1);
                      setCurrentSlide(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-8 bg-purple-400'
                        : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
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
