/**
 * Landing Page Demo - Modern Elegant with Real Assets
 * Showcases: HeroWithImageSection, ServicesIconsGrid, TestimonialsWithImage, TeamSectionWithImage
 */

'use client'


import { HeroWithImageSection } from '@/components/landing/HeroWithImageSection'
import { ServicesIconsGrid } from '@/components/landing/ServicesIconsGrid'
import { TestimonialsWithImage } from '@/components/landing/TestimonialsWithImage'
import { TeamSectionWithImage } from '@/components/landing/TeamSectionWithImage'
import { Button } from '@/components/ui/button'
import { ICONS_ARRAY, IMAGES } from '@/lib/asset-manifest'
import { useModernElegantTheme } from '@/hooks/useModernElegantTheme'

export default function LandingDemoPage() {
  // Apply Modern Elegant theme globally
  useModernElegantTheme()

  // Services for the grid
  const services = [
    {
      id: 'hair-salon',
      icon: '✂️',
      label: 'Hair Salon',
      color: 'cyan' as const,
      description: 'Professional haircuts, styling & coloring',
    },
    {
      id: 'manicure',
      icon: '💅',
      label: 'Manicure',
      color: 'pink' as const,
      description: 'Nail care, gel, acrylics & designs',
    },
    {
      id: 'nail-care',
      icon: '✨',
      label: 'Nail Care',
      color: 'amber' as const,
      description: 'Pedicure, nail treatment & maintenance',
    },
    {
      id: 'beauty-spa',
      icon: '🧴',
      label: 'Beauty & Spa',
      color: 'purple' as const,
      description: 'Facial treatments, massage & relaxation',
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: '1',
      quote: 'Incredible attention to detail and professional service. Highly recommended!',
      author: 'Sarah Johnson',
      role: 'Regular Client',
      rating: 5,
    },
    {
      id: '2',
      quote: 'Best salon experience I\'ve had. The team is amazing!',
      author: 'Maria Silva',
      role: 'Client',
      rating: 5,
    },
    {
      id: '3',
      quote: 'Premium quality services with affordable prices. Worth every penny!',
      author: 'Jessica Brown',
      role: 'VIP Member',
      rating: 5,
    },
  ]

  return (
    <div className="w-full">
      {/* ===== HERO SECTION ===== */}
      <HeroWithImageSection
        backgroundImage={IMAGES.optimized.heroSalon.srcWebp}
        backgroundImageAlt={IMAGES.optimized.heroSalon.alt}
        title={
          <span>
            Your Premium <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              Beauty Destination
            </span>
          </span>
        }
        subtitle="Experience luxury beauty services with our expert team. Professional care, premium products, and exceptional results."
        priority
      >
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          >
            Book Appointment
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>
      </HeroWithImageSection>

      {/* ===== SERVICES GRID ===== */}
      <ServicesIconsGrid
        title="Our Services"
        subtitle="Professional beauty services tailored to your needs"
        services={services}
        columns={{ mobile: 1, tablet: 2, desktop: 4 }}
      />

      {/* ===== TESTIMONIALS WITH IMAGE ===== */}
      <TestimonialsWithImage
        image={IMAGES.optimized.testimonialsManicure.srcWebp}
        imageAlt={IMAGES.optimized.testimonialsManicure.alt}
        title="Why Our Clients Love Us"
        subtitle="Premium quality service and exceptional customer experience"
        testimonials={testimonials}
        imagePosition="left"
      >
        <Button
          size="lg"
          className="mt-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
        >
          Join Our Clients
        </Button>
      </TestimonialsWithImage>

      {/* ===== TEAM SECTION ===== */}
      <TeamSectionWithImage
        heroImage={IMAGES.optimized.teamProfessionals.srcWebp}
        heroImageAlt={IMAGES.optimized.teamProfessionals.alt}
        title="Meet Our Expert Team"
        description="Highly qualified professionals dedicated to your beauty and wellness"
        members={[
          {
            id: '1',
            name: 'Emma Rose',
            role: 'Lead Stylist',
            image: undefined,
          },
          {
            id: '2',
            name: 'Laura Smith',
            role: 'Nail Specialist',
            image: undefined,
          },
          {
            id: '3',
            name: 'Jessica Lee',
            role: 'Beauty Consultant',
            image: undefined,
          },
        ]}
      />

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Book your appointment today and experience the difference professional beauty services can make.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white mt-8"
          >
            Schedule Appointment Now
          </Button>
        </div>
      </section>
    </div>
  )
}
