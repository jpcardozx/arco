/**
 * LP: Salão de Beleza 2024
 * Complete landing page with premium services showcase
 */

'use client'

import { HeroWithImageSection } from '@/components/landing/HeroWithImageSection'
import { PremiumFeaturesSection } from '@/components/landing/PremiumFeaturesSection'
import { ProductShowcaseSection } from '@/components/landing/ProductShowcaseSection'
import { TestimonialsWithImage } from '@/components/landing/TestimonialsWithImage'
import { TeamSectionWithImage } from '@/components/landing/TeamSectionWithImage'
import { Button } from '@/components/ui/button'
import { ICONS, IMAGES } from '@/lib/asset-manifest'
import { useModernElegantTheme } from '@/hooks/useModernElegantTheme'

export default function SalaoBeleza2024Page() {
  // Apply Modern Elegant theme
  useModernElegantTheme()

  // All 12 services
  const allServices = [
    { id: 'hairSalon', icon: ICONS.hairSalon, description: 'Professional cuts & styling' },
    { id: 'manicure', icon: ICONS.manicure, description: 'Luxury nail care' },
    { id: 'nailCare', icon: ICONS.nailCare, description: 'Nail treatments' },
    { id: 'beautySpa', icon: ICONS.beautySpa, description: 'Wellness & relaxation' },
    { id: 'hairColor', icon: ICONS.hairColor, description: 'Hair coloring' },
    { id: 'spaTreatment', icon: ICONS.spaTreatment, description: 'Full spa experience' },
    { id: 'facialCare', icon: ICONS.facialCare, description: 'Facial treatments' },
    { id: 'waxing', icon: ICONS.waxing, description: 'Waxing services' },
    { id: 'massage', icon: ICONS.massage, description: 'Professional massage' },
    { id: 'eyelashExtension', icon: ICONS.eyelashExtension, description: 'Eyelash extensions' },
    { id: 'makeupArtist', icon: ICONS.makeupArtist, description: 'Professional makeup' },
    { id: 'hairExtension', icon: ICONS.hairExtension, description: 'Hair extensions' },
  ]

  const features = allServices.map((service, idx) => ({
    id: service.id,
    icon: service.icon.emoji,
    title: service.icon.label,
    description: service.description,
    emoji: service.icon.emoji,
  }))

  const testimonials = [
    {
      id: '1',
      quote: 'Melhor experiência de beleza que já tive! Equipe profissional e atenta.',
      author: 'Amanda Silva',
      role: 'Cliente VIP',
      rating: 5,
    },
    {
      id: '2',
      quote: 'Qualidade premium com preços acessíveis. Recomendo muito!',
      author: 'Carla Oliveira',
      role: 'Cliente Regular',
      rating: 5,
    },
    {
      id: '3',
      quote: 'O atendimento é excepcional. Voltarei com certeza!',
      author: 'Juliana Costa',
      role: 'Nova Cliente',
      rating: 5,
    },
  ]

  return (
    <div className="w-full">
      {/* ===== HERO SECTION ===== */}
      <HeroWithImageSection
        backgroundImage={IMAGES.optimized.spaBackground.srcJpg}
        backgroundImageAlt={IMAGES.optimized.spaBackground.alt}
        title={
          <span>
            Seu Salão de Beleza <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              Premium 2024
            </span>
          </span>
        }
        subtitle="Experiência completa em beleza, bem-estar e transformação pessoal. Serviços premium com equipe especializada."
        priority
      >
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          >
            Agende Agora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Conheça Nossos Serviços
          </Button>
        </div>
      </HeroWithImageSection>

      {/* ===== PREMIUM FEATURES (12 SERVICES) ===== */}
      <PremiumFeaturesSection
        title="Nossos Serviços Premium"
        subtitle="12 serviços especializados para sua transformação completa"
        features={features}
        layout="grid-4"
      />

      {/* ===== PRODUCT SHOWCASE ===== */}
      <ProductShowcaseSection
        image={IMAGES.optimized.beautyProducts.srcJpg}
        imageFallback={IMAGES.optimized.beautyProducts.srcJpg}
        imageAlt={IMAGES.optimized.beautyProducts.alt}
        title="Produtos de Primeira Qualidade"
        subtitle="Beleza Premium"
        description="Utilizamos apenas os melhores produtos internacionais em nossos tratamentos. Cada produto é cuidadosamente selecionado para garantir segurança, eficácia e resultados extraordinários."
        highlights={[
          'Marcas internacionais premium',
          'Dermatologicamente testados',
          'Resultados comprovados',
          'Sustentáveis e éticos',
        ]}
        cta={{
          text: 'Conhecer Nossa Seleção',
          href: '#services',
        }}
        imagePosition="left"
      />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsWithImage
        image={IMAGES.optimized.testimonialsManicure.srcJpg}
        imageAlt={IMAGES.optimized.testimonialsManicure.alt}
        title="Clientes Satisfeitos"
        subtitle="Histórias de transformação e satisfação"
        testimonials={testimonials}
        imagePosition="left"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
        >
          Vire uma Delas
        </Button>
      </TestimonialsWithImage>

      {/* ===== TEAM SECTION ===== */}
      <TeamSectionWithImage
        heroImage={IMAGES.optimized.teamProfessionals.srcJpg}
        heroImageAlt={IMAGES.optimized.teamProfessionals.alt}
        title="Nossos Profissionais"
        description="Equipe altamente qualificada com anos de experiência em beleza e bem-estar"
        members={[
          {
            id: '1',
            name: 'Marina Rosa',
            role: 'Especialista em Cabelos',
          },
          {
            id: '2',
            name: 'Beatriz Lima',
            role: 'Manicurista Premium',
          },
          {
            id: '3',
            name: 'Fernanda Costa',
            role: 'Esteticista Master',
          },
        ]}
      />

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Pronto para Sua Transformação?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Reserve sua consulta gratuita hoje e descubra como podemos potencializar sua beleza e confiança.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              Agendar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PRICING/INFO SECTION ===== */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-amber-500/30 transition-all">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-white mb-2">Horário Flexível</h3>
            <p className="text-slate-400">Seg-Dom 8h-21h com agendamento online</p>
          </div>
          <div className="text-center p-8 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-amber-500/30 transition-all">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-white mb-2">Pagamento Flexível</h3>
            <p className="text-slate-400">Cartão, PIX, crediário sem juros</p>
          </div>
          <div className="text-center p-8 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-amber-500/30 transition-all">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-white mb-2">Programa VIP</h3>
            <p className="text-slate-400">Descontos exclusivos e benefícios especiais</p>
          </div>
        </div>
      </section>
    </div>
  )
}
