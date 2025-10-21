'use client'

import React from 'react'
import Image from 'next/image'
import { LANDING_ASSETS } from '@/lib/landing-asset-manifest'
import { ServiceGrid } from '@/components/landing/ServiceCard'
import { LANDING_ICONS } from '@/components/landing/assets'
import type { Tables } from '@/types/supabase'

type Campaign = Tables<'campaigns'>

interface SalaoBeautyAssetsProps {
  campaign: Campaign
}

/**
 * Integração de Assets Tier S para Página de Salão de Beleza
 * 
 * Este componente orquestra a aplicação dos assets em diferentes seções
 * da landing page de salão de beleza
 */
export function SalaoBeautyAssets({ campaign }: SalaoBeautyAssetsProps) {
  // Serviços específicos para salão de beleza
  const beautyServices = [
    {
      title: 'Manicure & Pedicure',
      description: 'Serviço profissional de manicure e pedicure',
      icon: LANDING_ICONS.hero.main, // Calendar icon
      color: 'pink' as const,
    },
    {
      title: 'Corte & Penteado',
      description: 'Cortes modernos e penteados profissionais',
      icon: LANDING_ICONS.hero.benefit, // CheckCircle2 icon
      color: 'amber' as const,
    },
    {
      title: 'Coloração Capilar',
      description: 'Tingimento e matização de cabelos',
      icon: LANDING_ICONS.proof.success, // CheckCircle2 icon
      color: 'rose' as const,
    },
    {
      title: 'Alongamento de Unhas',
      description: 'Unhas alongadas com gel premium',
      icon: LANDING_ICONS.hero.badge, // Sparkles icon
      color: 'purple' as const,
    },
    {
      title: 'Depilação Profissional',
      description: 'Depilação completa com técnicas modernas',
      icon: LANDING_ICONS.hero.action, // Zap icon
      color: 'pink' as const,
    },
    {
      title: 'Massagem & Relaxamento',
      description: 'Massagens terapêuticas e descontraentes',
      icon: LANDING_ICONS.proof.growth, // TrendingUp icon
      color: 'blue' as const,
    },
  ]

  return {
    // Dados reutilizáveis
    services: beautyServices,

    // Componentes prontos para uso
    components: {
      // Hero background otimizada
      HeroBackground: () => (
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={LANDING_ASSETS.IMAGES.heroSalon.webp}
            alt={LANDING_ASSETS.IMAGES.heroSalon.alt}
            fill
            className="w-full h-full object-cover filter grayscale blur-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95" />
        </div>
      ),

      // Services showcase section
      ServicesShowcase: () => (
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Nossos Serviços
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços de beleza com qualidade premium
            </p>
          </div>

          <ServiceGrid services={beautyServices} columns={{ sm: 1, md: 2, lg: 3 }} />
        </section>
      ),

      // Before/After showcase
      BeforeAfterShowcase: () => (
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-slate-900">
                  Transformações Reais
                </h2>
                <p className="text-lg text-slate-600 mb-4">
                  Veja os resultados que nossos clientes alcançam com nossos serviços profissionais
                </p>
                <ul className="space-y-3">
                  {[
                    'Manicure premium que dura semanas',
                    'Cabelos mais saudáveis e brilhosos',
                    'Aumento de 40% na retenção de clientes',
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={LANDING_ASSETS.IMAGES.testimonialsManicure.webp} alt={LANDING_ASSETS.IMAGES.testimonialsManicure.alt} fill
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      ),

      // Team showcase
      TeamShowcase: () => (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src={LANDING_ASSETS.IMAGES.teamProfessionals.webp} alt={LANDING_ASSETS.IMAGES.teamProfessionals.alt} fill
                  className="w-full h-auto"
                />
              </div>

              {/* Text */}
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold mb-6 text-slate-900">
                  Equipe Profissional
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Contamos com profissionais altamente treinados e certificados em técnicas internacionais
                </p>
                <div className="space-y-4">
                  {[
                    { label: 'Experiência', value: '15+ anos' },
                    { label: 'Certificações', value: 'Internacionais' },
                    { label: 'Satisfação', value: '98%' },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-600">{stat.label}</span>
                      <span className="text-xl font-bold text-amber-600">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      // Products section
      ProductsShowcase: () => (
        <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-slate-900">
                  Produtos Premium
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Utilizamos apenas produtos de marca renomada e comprovada qualidade
                </p>
                <ul className="space-y-3">
                  {[
                    'Marcas internacionais de primeira linha',
                    'Dermatologicamente testados',
                    'Ingredientes naturais quando possível',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-amber-600">✓</span>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={LANDING_ASSETS.IMAGES.beautyProducts.webp} alt={LANDING_ASSETS.IMAGES.beautyProducts.alt} fill
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      ),

      // Wellness/Spa section
      WellnessSection: () => (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">
              Ambiente Acolhedor
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Nosso espaço foi projetado para que você se sinta relaxado e confortável
            </p>

            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={LANDING_ASSETS.IMAGES.spaBackground.webp} alt={LANDING_ASSETS.IMAGES.spaBackground.alt} fill
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      ),
    },
  }
}
