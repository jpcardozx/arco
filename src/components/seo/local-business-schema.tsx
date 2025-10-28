/**
 * Schema.org LocalBusiness markup para SEO Local
 * Melhora aparência no Google Maps e resultados de busca local
 */

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ARCO - Soluções Digitais para Salões de Beleza',
    alternateName: 'ARCO Consulting',
    description:
      'Especialistas em landing pages, sistemas de agendamento e marketing digital para salões de beleza, manicures e cabeleireiras.',
    url: 'https://www.consultingarco.com',
    logo: 'https://www.consultingarco.com/logo.png',
    image: 'https://www.consultingarco.com/og-image.jpg',
    telephone: '+55-11-99999-9999', // TODO: Adicionar telefone real
    email: 'arco@consultingarco.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.550520, // TODO: Adicionar coordenadas reais
      longitude: -46.633308,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'São Paulo',
      },
      {
        '@type': 'State',
        name: 'São Paulo',
      },
    ],
    serviceType: [
      'Criação de Sites',
      'Landing Pages',
      'Sistema de Agendamento Online',
      'Marketing Digital',
      'Consultoria de Marketing',
    ],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      // TODO: Adicionar links de redes sociais se existirem
      // 'https://www.instagram.com/consultingarco',
      // 'https://www.linkedin.com/company/consultingarco',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org Article markup para blog posts
 * Melhora rich snippets no Google
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  publishedDate,
  modifiedDate,
  author = 'ARCO Consulting',
  image = 'https://www.consultingarco.com/og-image.jpg',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://www.consultingarco.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ARCO Consulting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.consultingarco.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org FAQPage markup
 * Cria rich snippets de FAQ no Google
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org BreadcrumbList markup
 * Melhora navegação nos resultados de busca
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
