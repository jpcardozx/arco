/**
 * Mapeamento de imagens otimizadas da landing page
 * Todas as imagens já foram convertidas para WebP e otimizadas
 * 
 * Economia total: 28.67 MB (95.2% de redução)
 */

export const landingImages = {
  // Ambientes de Salão - Interiores Modernos
  interiors: {
    modern1: {
      webp: '/landing/images/benyamin-bohlouli-LGXN4OSQSa4-unsplash.webp',
      fallback: '/landing/images/benyamin-bohlouli-LGXN4OSQSa4-unsplash.jpg',
      alt: 'Interior moderno de salão de beleza com design contemporâneo',
      size: '149KB',
      dimensions: '1920x1080',
    },
    modern2: {
      webp: '/landing/images/benyamin-bohlouli-_C-S7LqxHPw-unsplash.webp',
      fallback: '/landing/images/benyamin-bohlouli-_C-S7LqxHPw-unsplash.jpg',
      alt: 'Salão de beleza com iluminação moderna e espelhos amplos',
      size: '144KB',
      dimensions: '1920x1080',
    },
    spacious: {
      webp: '/landing/images/giorgio-trovato-gb6gtiTZKB8-unsplash.webp',
      fallback: '/landing/images/giorgio-trovato-gb6gtiTZKB8-unsplash.jpg',
      alt: 'Ambiente espaçoso de salão com múltiplas estações',
      size: '57KB',
      dimensions: '1920x1080',
    },
  },

  // Serviços Profissionais
  services: {
    hair1: {
      webp: '/landing/images/adam-winger-KVVjmb3IIL8-unsplash.webp',
      fallback: '/landing/images/adam-winger-KVVjmb3IIL8-unsplash.jpg',
      alt: 'Profissional de beleza realizando serviço capilar',
      size: '59KB',
      dimensions: '1920x1080',
    },
    hair2: {
      webp: '/landing/images/adam-winger-FkAZqQJTbXM-unsplash.webp',
      fallback: '/landing/images/adam-winger-FkAZqQJTbXM-unsplash.jpg',
      alt: 'Técnica profissional de cabeleireiro em ação',
      size: '109KB',
      dimensions: '1920x1080',
    },
    styling: {
      webp: '/landing/images/jazmin-quaynor-FoeIOgztCXo-unsplash.webp',
      fallback: '/landing/images/jazmin-quaynor-FoeIOgztCXo-unsplash.jpg',
      alt: 'Serviço de penteado profissional',
      size: '176KB',
      dimensions: '1920x1080',
    },
  },

  // Produtos e Ferramentas
  products: {
    tools: {
      webp: '/landing/images/guilherme-petri-PtOfbGkU3uI-unsplash.webp',
      fallback: '/landing/images/guilherme-petri-PtOfbGkU3uI-unsplash.jpg',
      alt: 'Ferramentas e produtos profissionais de beleza',
      size: '85KB',
      dimensions: '1920x1080',
    },
    cosmetics: {
      webp: '/landing/images/rosa-rafael-Pe9IXUuC6QU-unsplash.webp',
      fallback: '/landing/images/rosa-rafael-Pe9IXUuC6QU-unsplash.jpg',
      alt: 'Produtos cosméticos premium para salão',
      size: '226KB',
      dimensions: '1920x1080',
    },
  },

  // Atmosfera e Ambiente
  atmosphere: {
    elegant: {
      webp: '/landing/images/anabelle-carite-_wofGSSFb1Q-unsplash.webp',
      fallback: '/landing/images/anabelle-carite-_wofGSSFb1Q-unsplash.jpg',
      alt: 'Ambiente elegante e acolhedor de salão de beleza',
      size: '303KB',
      dimensions: '1920x1080',
    },
    ambient: {
      webp: '/landing/images/vinicius-amnx-amano-lK8oXGycy88-unsplash.webp',
      fallback: '/landing/images/vinicius-amnx-amano-lK8oXGycy88-unsplash.jpg',
      alt: 'Atmosfera profissional de salão moderno',
      size: '190KB',
      dimensions: '1920x1080',
    },
  },
};

/**
 * Helper para obter imagem com fallback
 */
export function getLandingImage(category: keyof typeof landingImages, name: string) {
  const categoryImages = landingImages[category] as any;
  return categoryImages[name];
}

/**
 * Uso recomendado por seção da landing page
 */
export const sectionRecommendations = {
  hero: {
    background: landingImages.atmosphere.elegant,
    priority: true,
    opacity: 0.03,
  },
  
  proofSection: {
    gallery: [
      { ...landingImages.interiors.modern1, title: 'Design Moderno' },
      { ...landingImages.services.hair1, title: 'Serviço Premium' },
      { ...landingImages.interiors.spacious, title: 'Infraestrutura Completa' },
    ],
  },
  
  marketEducation: {
    examples: [
      landingImages.services.hair2,
      landingImages.interiors.modern2,
    ],
  },
  
  implementation: {
    timeline: [
      landingImages.products.tools,
      landingImages.services.styling,
    ],
  },
  
  showcase: {
    carousel: [
      landingImages.interiors.modern1,
      landingImages.interiors.modern2,
      landingImages.interiors.spacious,
      landingImages.atmosphere.ambient,
    ],
  },
};

/**
 * Estatísticas de otimização
 */
export const optimizationStats = {
  totalImages: 10,
  originalSize: '30.17 MB',
  optimizedSize: '1.50 MB',
  savings: '28.67 MB',
  compressionRate: '95.2%',
  averageSize: '150KB',
  format: 'WebP',
  quality: 85,
};
