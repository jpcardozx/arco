/**
 * AGENDAMENTOS PREMIUM HERO - S-Tier Quality
 * 
 * Inspirado no PremiumHeroSection de /jpcardozx
 * Orquestração premium com:
 * - Glassmorphism sofisticado
 * - ParticleBackground (sem pedras girando)
 * - Typography scale profissional
 * - Motion design elegante
 * - CTAs premium com gradients
 * - Copy maduro e factual
 */

'use client'

import React, { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { cn, designTokens } from '@/design-system/tokens'
import { ParticleBackground } from '@/components/effects/ParticleBackground'

/**
 * Three.js Minimal Depth System - Subtle Particles Only
 * Creates minimal visual depth without overwhelming the content
 */
function MinimalDepthLayer() {
  const particlesRef = useRef<THREE.Points>(null)
  
  // Single minimal layer
  const createMinimalLayer = (count: number) => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35      // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18   // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10   // z depth
    }
    return pos
  }

  const positions = React.useMemo(() => createMinimalLayer(30), [])  // Only 30 particles total

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02  // Very slow rotation
      particlesRef.current.position.y = Math.sin(time * 0.2) * 0.15  // Gentle float
    }
  })

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={1.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.25}  // Very subtle
      />
    </Points>
  )
}

interface PremiumHeroProps {
  onStartBooking: () => void
}

/**
 * Premium macOS-style Card Component
 */
const GlassCard = ({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative backdrop-blur-xl rounded-2xl overflow-hidden group cursor-pointer",
        className
      )}
      style={{
        background: `linear-gradient(135deg,
          rgba(255,255,255,${isHovered ? 0.14 : 0.12}) 0%,
          rgba(255,255,255,${isHovered ? 0.08 : 0.06}) 50%,
          rgba(0,0,0,${isHovered ? 0.12 : 0.1}) 100%)`,
        boxShadow: isHovered 
          ? `0 24px 48px rgba(0,0,0,0.5),
             0 12px 24px rgba(0,0,0,0.4),
             0 0 0 1px rgba(255,255,255,0.12),
             inset 0 1px 0 rgba(255,255,255,0.18),
             0 0 40px rgba(20,184,166,0.15)`
          : `0 20px 40px rgba(0,0,0,0.4),
             0 10px 20px rgba(0,0,0,0.3),
             0 0 0 1px rgba(255,255,255,0.08),
             inset 0 1px 0 rgba(255,255,255,0.15)`,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
    >
    {/* Subtle blue accent border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        background: `linear-gradient(135deg,
          rgba(59, 130, 246, 0.15),
          rgba(96, 165, 250, 0.08))`,
        padding: '1px',
        WebkitMaskImage: 'linear-gradient(white, white)',
        maskImage: 'linear-gradient(white, white)',
        WebkitMaskComposite: 'destination-out',
        maskComposite: 'exclude'
      }}
    />
    {children}
  </motion.div>
  )
}

/**
 * Professional Gradient Text - Blue palette
 */
const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span
    className="bg-clip-text text-transparent font-bold"
    style={{
      backgroundImage: `linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}
  >
    {children}
  </span>
)

/**
 * Scroll Indicator
 */
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
    role="button"
    aria-label="Rolar para baixo"
    tabIndex={0}
    onClick={() => {
      const section = document.getElementById('consultorias')
      section?.scrollIntoView({ behavior: 'smooth' })
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const section = document.getElementById('consultorias')
        section?.scrollIntoView({ behavior: 'smooth' })
      }
    }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="flex flex-col items-center gap-2 text-neutral-300 cursor-pointer hover:text-white transition-colors group"
    >
      <span className="text-sm font-medium group-hover:scale-105 transition-transform">
        Ver consultorias
      </span>
      <div className="p-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm group-hover:border-white/50 group-hover:bg-black/50 transition-all">
        <ChevronDown className="w-4 h-4 text-white" aria-hidden="true" />
      </div>
    </motion.div>
  </motion.div>
)

export function PremiumHero({ onStartBooking }: PremiumHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          ${designTokens.colors.neutral[950]} 0%, 
          ${designTokens.colors.neutral[900]} 50%, 
          ${designTokens.colors.neutral[950]} 100%)`
      }}
    >
      {/* Clean Professional Background with Glass Overlay */}
      <div className="absolute inset-0">
        {/* Simple elegant gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #0a0e1a 0%, #141b28 50%, #0a0e1a 100%)`
          }}
        />

        {/* Three.js Scene - PRIMARY VISUAL ELEMENT */}
        <div className="absolute inset-0 opacity-70">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 75 }}
              gl={{ antialias: false, alpha: true }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.6} />
              <MinimalDepthLayer />
            </Canvas>
          </Suspense>
        </div>

        {/* Elegant Glass Overlay - Frosted effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.03) 0%, 
                  rgba(255, 255, 255, 0.01) 50%, 
                  rgba(255, 255, 255, 0.03) 100%
                )
              `,
              backdropFilter: 'blur(0.5px)',
              WebkitBackdropFilter: 'blur(0.5px)',
            }}
          />
          
          {/* Subtle grid pattern for texture */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />
        </div>

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)`
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Badge
              className="px-4 py-2 text-sm font-medium border backdrop-blur-sm"
              style={{
                background: `rgba(59, 130, 246, 0.15)`,
                borderColor: `rgba(59, 130, 246, 0.30)`,
                color: '#93c5fd'
              }}
            >
              Agendamento de Sessões Técnicas
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight"
          >
            <span className="text-white">Sessões de </span>
            <GradientText>Análise Técnica</GradientText>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl text-center text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Análise técnica focada em performance web, arquitetura de código e melhores práticas de desenvolvimento
          </motion.p>

          {/* CTAs Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={onStartBooking}
                className="group relative px-8 py-6 text-lg font-semibold overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, #3b82f6, #2563eb)`,
                  boxShadow: `0 10px 30px rgba(59, 130, 246, 0.4)`
                }}
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Calendar className="w-5 h-5" />
                  Agendar Sessão
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </Button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const section = document.getElementById('consultorias')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm text-white border-white/20 hover:bg-white/10"
              >
                Ver Tipos de Sessão
              </Button>
            </motion.div>

            {/* Chat Status - Discrete */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400/70 animate-pulse" />
              <span className="text-sm text-white/60 font-medium">Chat direto - Em implementação</span>
            </motion.div>
          </motion.div>

          {/* Session Types Preview - Compacto e Integrado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-neutral-400">Três modalidades de consultoria</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Diagnóstico Digital */}
              <GlassCard delay={0.7}>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(59, 130, 246, 0.15)` }}
                    >
                      <svg className="w-5 h-5" style={{ color: '#60a5fa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1">Diagnóstico Digital</h3>
                      <p className="text-xs text-neutral-400">60 min • Performance & SEO</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {['Core Web Vitals', 'SEO técnico', 'Relatório priorizado'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#60a5fa' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>

              {/* Card 2: Auditoria de Código */}
              <GlassCard delay={0.8}>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(96, 165, 250, 0.15)` }}
                    >
                      <svg className="w-5 h-5" style={{ color: '#93c5fd' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1">Auditoria de Código</h3>
                      <p className="text-xs text-neutral-400">90 min • Arquitetura & Segurança</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {['Review arquitetura', 'Padrões de código', 'Roadmap técnico'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#93c5fd' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>

              {/* Card 3: Suporte Sprint */}
              <GlassCard delay={0.9}>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(37, 99, 235, 0.15)` }}
                    >
                      <svg className="w-5 h-5" style={{ color: '#60a5fa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1">Suporte Sprint</h3>
                      <p className="text-xs text-neutral-400">Personalizado • Tech Leads</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {['Alocação dedicada', 'Code review', 'Pair programming'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#60a5fa' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}
