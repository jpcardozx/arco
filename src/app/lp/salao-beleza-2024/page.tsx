'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ICONS, IMAGES } from '@/lib/asset-manifest'
import SectionDivider from '@/components/animation/SectionDivider'
import SectionContainer from '@/components/animation/SectionContainer'

/**
 * LP: Salão de Beleza Premium 2024
 * Estrutura profissional com asset merge
 * - Hero com background image real
 * - Serviços em grid com SVG icons
 * - Social proof com testimonials reais
 * - Team showcase
 * - CTA sections
 */

// Loading skeleton
function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-slate-700 rounded-lg w-3/4 mx-auto" />
      <div className="h-6 bg-slate-700 rounded w-full" />
      <div className="h-6 bg-slate-700 rounded w-5/6 mx-auto" />
    </div>
  )
}

// Lazy loaded sections
const ServicesGridSection = dynamic(
  () => import('./sections/services-grid').then(mod => ({ default: mod.ServicesGridSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)

const ProofSection = dynamic(
  () => import('./sections/proof').then(mod => ({ default: mod.ProofSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)

const TeamSection = dynamic(
  () => import('./sections/team').then(mod => ({ default: mod.TeamSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)

const CTASection = dynamic(
  () => import('./sections/cta').then(mod => ({ default: mod.CTASection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)

export default function SalaoBeleza2024Page() {
  return (
    <main className="min-h-screen w-full bg-slate-950">
      {/* ===== HERO SECTION - EAGER LOAD ===== */}
      <HeroSection />

      <SectionDivider variant="fade" />

      {/* ===== SERVICES GRID ===== */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesGridSection />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* ===== SOCIAL PROOF ===== */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProofSection />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* ===== TEAM SHOWCASE ===== */}
      <Suspense fallback={<SectionSkeleton />}>
        <TeamSection />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* ===== FINAL CTA ===== */}
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>
    </main>
  )
}

// Hero Section - Eager loaded
function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.optimized.spaBackground.srcJpg}
          alt="Spa Background"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50 z-1" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Transformação <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                Beleza Premium
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto">
              Experiência completa em beleza, bem-estar e confiança pessoal. Serviços premium com equipe especializada e produtos de primeira qualidade.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
            >
              Agende sua Consulta
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 font-semibold"
            >
              Conheça Nossos Serviços
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 justify-center pt-8 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              <span>+500 Clientes Satisfeitos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              <span>Equipe Certificada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              <span>Resultados Garantidos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
