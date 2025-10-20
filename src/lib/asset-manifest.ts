/**
 * Asset Manifest
 * Registro centralizado de todos os ícones e imagens da landing page
 * Use este arquivo para referências de assets em toda a aplicação
 */

// ============= ÍCONES =============
export const ICONS = {
  // Core 4 Services
  hairSalon: {
    id: 'hair-salon',
    src: '/landing/icons/hair-salon.svg',
    label: 'Hair Salon',
    emoji: '✂️',
    color: 'cyan' as const,
    alt: 'Hair Salon Service Icon',
  },
  manicure: {
    id: 'manicure',
    src: '/landing/icons/manicure.svg',
    label: 'Manicure',
    emoji: '💅',
    color: 'pink' as const,
    alt: 'Manicure Service Icon',
  },
  nailCare: {
    id: 'nail-care',
    src: '/landing/icons/nail-care.svg',
    label: 'Nail Care',
    emoji: '✨',
    color: 'amber' as const,
    alt: 'Nail Care Service Icon',
  },
  beautySpa: {
    id: 'beauty-spa',
    src: '/landing/icons/beauty-spa.svg',
    label: 'Beauty & Spa',
    emoji: '🧴',
    color: 'purple' as const,
    alt: 'Beauty and Spa Service Icon',
  },

  // Additional 8 Services
  hairColor: {
    id: 'hair-color',
    src: '/landing/icons/hair-color.svg',
    label: 'Hair Color',
    emoji: '🎨',
    color: 'pink' as const,
    alt: 'Hair Color Service Icon',
  },
  spaTreatment: {
    id: 'spa-treatment',
    src: '/landing/icons/spa-treatment.svg',
    label: 'Spa Treatment',
    emoji: '🧖',
    color: 'purple' as const,
    alt: 'Spa Treatment Icon',
  },
  facialCare: {
    id: 'facial-care',
    src: '/landing/icons/facial-care.svg',
    label: 'Facial Care',
    emoji: '💆',
    color: 'rose' as const,
    alt: 'Facial Care Icon',
  },
  waxing: {
    id: 'waxing',
    src: '/landing/icons/waxing.svg',
    label: 'Waxing',
    emoji: '✨',
    color: 'orange' as const,
    alt: 'Waxing Service Icon',
  },
  massage: {
    id: 'massage',
    src: '/landing/icons/massage.svg',
    label: 'Massage',
    emoji: '💆‍♀️',
    color: 'cyan' as const,
    alt: 'Massage Service Icon',
  },
  eyelashExtension: {
    id: 'eyelash-extension',
    src: '/landing/icons/eyelash-extension.svg',
    label: 'Eyelash Extension',
    emoji: '👁️',
    color: 'amber' as const,
    alt: 'Eyelash Extension Icon',
  },
  makeupArtist: {
    id: 'makeup-artist',
    src: '/landing/icons/makeup-artist.svg',
    label: 'Makeup Artist',
    emoji: '💄',
    color: 'pink' as const,
    alt: 'Makeup Artist Icon',
  },
  hairExtension: {
    id: 'hair-extension',
    src: '/landing/icons/hair-extension.svg',
    label: 'Hair Extension',
    emoji: '💇',
    color: 'purple' as const,
    alt: 'Hair Extension Icon',
  },
} as const

// Convenience array for mapping
export const ICONS_ARRAY = Object.values(ICONS)

// ============= IMAGENS PRINCIPAIS =============
export const IMAGES = {
  // Imagens existentes (já disponíveis)
  existing: {
    hairCare: {
      src: '/landing/hair-care.png',
      alt: 'Hair Care',
    },
    hairSalon: {
      src: '/landing/hair-salon.png',
      alt: 'Hair Salon',
    },
    hairDryer: {
      src: '/landing/hairdryer.png',
      alt: 'Hair Dryer',
    },
    longWavyHair: {
      src: '/landing/long-wavy-hair-variant.png',
      alt: 'Long Wavy Hair',
    },
    makeup: {
      src: '/landing/makeup.png',
      alt: 'Makeup',
    },
  },

  // Imagens otimizadas para hero/testimonials/team/products
  optimized: {
    heroSalon: {
      id: 'hero-salon',
      srcWebp: '/landing/images/hero-salon.webp',
      srcJpg: '/landing/images/hero-salon.jpg',
      alt: 'Professional Hair Salon Interior',
      width: 2560,
      height: 1700,
      section: 'hero',
      emoji: '🏢',
      description: 'Professional salon interior with natural lighting',
    },
    testimonialsManicure: {
      id: 'testimonials-manicure',
      srcWebp: '/landing/images/testimonials-manicure.webp',
      srcJpg: '/landing/images/testimonials-manicure.jpg',
      alt: 'Luxury Manicure Close-up',
      width: 2000,
      height: 1500,
      section: 'testimonials',
      emoji: '💎',
      description: 'Close-up of professional manicure work',
    },
    teamProfessionals: {
      id: 'team-professionals',
      srcWebp: '/landing/images/team-professionals.webp',
      srcJpg: '/landing/images/team-professionals.jpg',
      alt: 'Professional Beauty Team',
      width: 2560,
      height: 1700,
      section: 'team',
      emoji: '👥',
      description: 'Professional beauty team in salon environment',
    },
    beautyProducts: {
      id: 'beauty-products',
      srcWebp: '/landing/images/beauty-products.webp',
      srcJpg: '/landing/images/beauty-products.jpg',
      alt: 'Premium Beauty Products',
      width: 2560,
      height: 1700,
      section: 'products',
      emoji: '🧴',
      description: 'Luxury beauty and wellness products showcase',
    },
    spaBackground: {
      id: 'spa-background',
      srcWebp: '/landing/images/spa-background.webp',
      srcJpg: '/landing/images/spa-background.jpg',
      alt: 'Spa and Wellness Background',
      width: 2560,
      height: 1700,
      section: 'background',
      emoji: '✨',
      description: 'Elegant spa and wellness environment',
    },
  },
} as const

// ============= HELPERS =============

/**
 * Get icon by ID
 */
export function getIcon(id: keyof typeof ICONS) {
  return ICONS[id]
}

/**
 * Get optimized image with fallback
 * Retorna srcWebp como primário, srcJpg como fallback
 */
export function getOptimizedImage(
  id: keyof typeof IMAGES.optimized
) {
  const img = IMAGES.optimized[id]
  return {
    src: img.srcWebp,
    fallback: img.srcJpg,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }
}

/**
 * Get all icons as array (para map em componentes)
 */
export function getIconsArray() {
  return ICONS_ARRAY.map((icon) => ({
    id: icon.id,
    icon: icon.emoji,
    label: icon.label,
    color: icon.color,
    alt: icon.alt,
  }))
}

// ============= TIPOS =============

export type IconId = keyof typeof ICONS
export type ImageId = keyof typeof IMAGES.optimized
export type IconColor = typeof ICONS[IconId]['color']

/**
 * Type-safe icon usage
 */
export type Icon = typeof ICONS[IconId]
export type OptimizedImage = typeof IMAGES.optimized[ImageId]
