/**
 * Salon Services Section para Homepage
 * Importar em src/app/page.tsx se quiser adicionar
 */

'use client'

import { PremiumFeaturesSection } from '@/components/landing/PremiumFeaturesSection'
import { ProductShowcaseSection } from '@/components/landing/ProductShowcaseSection'
import { Button } from '@/components/ui/button'
import { ICONS, IMAGES } from '@/lib/asset-manifest'

export function SalonServicesForHomepage() {
  // Featured 8 services (best sellers)
  const featuredServices = [
    {
      id: 'hairSalon',
      icon: ICONS.hairSalon.emoji,
      title: ICONS.hairSalon.label,
      description: 'Cortes e estilos profissionais',
    },
    {
      id: 'manicure',
      icon: ICONS.manicure.emoji,
      title: ICONS.manicure.label,
      description: 'Unhas perfeitas com design',
    },
    {
      id: 'hairColor',
      icon: ICONS.hairColor.emoji,
      title: ICONS.hairColor.label,
      description: 'Coloração premium segura',
    },
    {
      id: 'spaTreatment',
      icon: ICONS.spaTreatment.emoji,
      title: ICONS.spaTreatment.label,
      description: 'Relaxamento total',
    },
    {
      id: 'facialCare',
      icon: ICONS.facialCare.emoji,
      title: ICONS.facialCare.label,
      description: 'Cuidados faciais avançados',
    },
    {
      id: 'massage',
      icon: ICONS.massage.emoji,
      title: ICONS.massage.label,
      description: 'Massagens terapêuticas',
    },
    {
      id: 'eyelashExtension',
      icon: ICONS.eyelashExtension.emoji,
      title: ICONS.eyelashExtension.label,
      description: 'Cílios volumosos perfeitos',
    },
    {
      id: 'makeupArtist',
      icon: ICONS.makeupArtist.emoji,
      title: ICONS.makeupArtist.label,
      description: 'Maquiagem profissional',
    },
  ]

  return (
    <div className="space-y-0">
      {/* Premium Features Section */}
      <PremiumFeaturesSection
        title="Serviços de Beleza Premium"
        subtitle="Oferecemos os melhores serviços de beleza e bem-estar do mercado"
        features={featuredServices}
        layout="grid-4"
      />

      {/* Product Showcase */}
      <ProductShowcaseSection
        image={IMAGES.optimized.beautyProducts.srcJpg}
        imageAlt={IMAGES.optimized.beautyProducts.alt}
        title="Produtos Selecionados com Cuidado"
        subtitle="Qualidade Premium"
        description="Cada produto é escolhido meticulosamente para garantir segurança, eficácia e resultados extraordinários. Utilizamos marcas internacionais reconhecidas e procedimentos certificados."
        highlights={[
          '✓ Produtos importados de primeira qualidade',
          '✓ Dermatologicamente testados e aprovados',
          '✓ Métodos inovadores e comprovados',
          '✓ Compromisso com sustentabilidade',
        ]}
        cta={{
          text: 'Explorar Catálogo Completo',
          href: '/lp/salao-beleza-2024',
        }}
        imagePosition="right"
      />

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transforme-se com Confiança
          </h3>
          <p className="text-lg text-amber-50 mb-8 max-w-2xl mx-auto">
            Experiencie o melhor em beleza, bem-estar e transformação pessoal
          </p>
          <Button
            size="lg"
            className="bg-white text-amber-600 hover:bg-amber-50 font-semibold"
            asChild
          >
            <a href="/lp/salao-beleza-2024">
              Conhecer Nossa Proposta Completa →
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
