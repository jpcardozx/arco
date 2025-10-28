/**
 * Premium Hero Section - Stub minimalista
 */
'use client'

interface PremiumHeroProps {
  badge?: {
    text: string
  }
  title?: string
  subtitle?: string
  primaryCta?: {
    text: string
    href: string
  }
  showParticles?: boolean
  variant?: string
}

export function PremiumHeroSection(props: PremiumHeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          {props.title || 'Transforme Sua Presença Digital'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {props.subtitle || 'Infraestrutura web e otimização de tráfego para negócios exigentes'}
        </p>
      </div>
    </section>
  )
}

export default PremiumHeroSection
