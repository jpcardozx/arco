/**
 * Landing Page Asset Manifest - TIER S Quality
 * 
 * Imagens e ícones otimizados para /lp/salao-beleza-2024
 * Todas as imagens possuem versão WebP para 90% de compressão
 */

export const LANDING_ASSETS = {
  IMAGES: {
    heroSalon: {
      src: '/landing/images/hero-salon',
      jpg: '/landing/images/hero-salon.jpg',
      webp: '/landing/images/hero-salon.webp',
      width: 2560,
      height: 1440,
      alt: 'Premium Beauty Salon Interior - Professional Services'
    },
    testimonialsManicure: {
      src: '/landing/images/testimonials-manicure',
      jpg: '/landing/images/testimonials-manicure.jpg',
      webp: '/landing/images/testimonials-manicure.webp',
      width: 2000,
      height: 3000,
      alt: 'Luxury Manicure Services - Professional Beauty'
    },
    teamProfessionals: {
      src: '/landing/images/team-professionals',
      jpg: '/landing/images/team-professionals.jpg',
      webp: '/landing/images/team-professionals.webp',
      width: 2560,
      height: 1707,
      alt: 'Beauty Professionals Team - Expert Staff'
    },
    beautyProducts: {
      src: '/landing/images/beauty-products',
      jpg: '/landing/images/beauty-products.jpg',
      webp: '/landing/images/beauty-products.webp',
      width: 2560,
      height: 3840,
      alt: 'Premium Beauty Products - High Quality'
    },
    spaBackground: {
      src: '/landing/images/spa-background',
      jpg: '/landing/images/spa-background.jpg',
      webp: '/landing/images/spa-background.webp',
      width: 2560,
      height: 1920,
      alt: 'Spa & Wellness Relaxation - Premium Experience'
    }
  },
  
  ICONS: {
    hairSalon: '/landing/icons/hair-salon.svg',
    manicure: '/landing/icons/manicure.svg',
    nailCare: '/landing/icons/nail-care.svg',
    beautySpa: '/landing/icons/beauty-spa.svg',
    facialCare: '/landing/icons/facial-care.svg',
    massage: '/landing/icons/massage.svg',
    hairColor: '/landing/icons/hair-color.svg',
    hairExtension: '/landing/icons/hair-extension.svg',
    makeupArtist: '/landing/icons/makeup-artist.svg',
    eyelashExtension: '/landing/icons/eyelash-extension.svg',
    spaTreatment: '/landing/icons/spa-treatment.svg',
    waxing: '/landing/icons/waxing.svg'
  }
} as const

// Type helper for TypeScript autocomplete
export type LandingImage = keyof typeof LANDING_ASSETS.IMAGES
export type LandingIcon = keyof typeof LANDING_ASSETS.ICONS
