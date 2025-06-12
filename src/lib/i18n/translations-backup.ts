import { SupportedLanguage } from './index';

// Interface para as traduções
export interface TranslationObject {
  [key: string]: string | TranslationObject | any[];
}

// Dicionário de traduções centralizado e organizado
export const translations: Record<SupportedLanguage, TranslationObject> = {
  pt: {
    // Authority Manifesto Component
    authorityManifesto: {
      badge: 'MANIFESTO DE AUTORIDADE',
      title: 'Eu não otimizo sites.',
      titleStriked: 'otimizo sites',
      titleHighlight: 'Corrijo arquiteturas de decisão financeira comprometidas.',
      subtitle: 'Em 7 anos mapeando padrões de abandono e conversão em empresas de tecnologia, identifiquei um padrão consistente: o problema raramente é técnico. É um desalinhamento simbólico entre o valor real oferecido e sua percepção.',
      
      insight: {
        title: 'Insight proprietário:',
        percentage: '83%',
        description: 'dos problemas de conversão não são resolvidos por redesigns, melhorias técnicas ou campanhas de marketing - mas por realinhamentos simbólicos precisos nos pontos críticos de decisão financeira.',
        result: 'Resultado: Aumento médio de 37% em receita em 21 dias para clientes que implementam as correções recomendadas.',
        source: 'Fonte: Análise de 147 empresas de tecnologia entre 2022-2025 | Immediate Revenue Framework™ Research'
      },

      skills: {
        dontHire: 'Não me contrate por estas habilidades:',
        hireFor: 'Contrate-me por esta capacidade única:',
        architecture: 'Arquitetura de Decisão Financeira',
        description: 'A habilidade de identificar exatamente onde e como a percepção de valor está desalinhada com o valor real, causando perdas financeiras diretas e mensuráveis - e corrigi-las com precisão cirúrgica.',
        disclaimer: 'Estas são apenas ferramentas, não diferenciais estratégicos.',
        problems: 'Aplicado a problemas como:',
        problemsList: [
          'Conversão em tiers premium abaixo do esperado',
          'Ciclos de venda excessivamente longos',
          'Alta taxa de abandono em checkouts',
          'Pressão de preço apesar de qualidade superior'
        ]
      },

      caseStudy: {
        title: 'Estudo de Caso: Transformação Real',
        subtitle: 'Como realizei um aumento de 182% em receita através de correções estratégicas sem alterar a estrutura de preços ou o produto',
        client: {
          label: 'Cliente',
          name: 'TechNexus',
          description: 'Série B - R$47M captados',
          problem: 'Taxa de conversão premium estagnada em 2.3% apesar de múltiplas otimizações técnicas e campanhas de marketing.'
        },
        diagnosis: {
          label: 'Diagnóstico',
          title: 'Arquitetura de Decisão Comprometida',
          steps: [
            'Identificação de 7 pontos críticos de desalinhamento simbólico',
            'Quantificação de perda mensal de R$212.430 devido a estes desalinhamentos',
            'Implementação de 12 correções estratégicas nos pontos de maior impacto'
          ]
        },
        results: {
          label: 'Resultados',
          title: 'Em 21 dias de implementação',
          metrics: [
            { label: 'Taxa de conversão premium', before: '2.3%', after: '8.7%' },
            { label: 'Receita mensal', before: 'R$347K', after: 'R$978K' },
            { label: 'Ciclo de decisão', before: '42 dias', after: '17 dias' }
          ],
          testimonial: 'João não apenas aumentou nossa receita em 182% - ele nos mostrou exatamente onde estávamos desperdiçando dinheiro em desalinhamentos que nunca teríamos encontrado sozinhos.',
          testimonialAuthor: '— Marcelo Santos, CEO, TechNexus'
        }
      },

      cta: {
        text: 'Descubra quanto você está perdendo em desalinhamentos simbólicos',
        disclaimer: 'Vagas limitadas: apenas 3 diagnósticos disponíveis por semana'
      }
    }
  },

  en: {
    // Authority Manifesto Component
    authorityManifesto: {
      badge: 'AUTHORITY MANIFESTO',
      title: 'I don\'t optimize websites.',
      titleStriked: 'optimize websites',
      titleHighlight: 'I fix compromised financial decision architectures.',
      subtitle: 'In 7 years mapping abandonment and conversion patterns in tech companies, I identified a consistent pattern: the problem is rarely technical. It\'s a symbolic misalignment between the real value offered and its perception.',
      
      insight: {
        title: 'Proprietary Insight:',
        percentage: '83%',
        description: 'of conversion problems are not solved by redesigns, technical improvements, or marketing campaigns - but by precise symbolic realignments at critical points of financial decision-making.',
        result: 'Result: Average 37% increase in revenue in 21 days for clients who implement the recommended corrections.',
        source: 'Source: Analysis of 147 tech companies between 2022-2025 | Immediate Revenue Framework™ Research'
      },

      skills: {
        dontHire: 'Don\'t hire me for these skills:',
        hireFor: 'Hire me for this unique capability:',
        architecture: 'Financial Decision Architecture',
        description: 'The ability to identify exactly where and how value perception is misaligned with real value, causing direct and measurable financial losses - and correct them with surgical precision.',
        disclaimer: 'These are just tools, not strategic differentiators.',
        problems: 'Applied to problems like:',
        problemsList: [
          'Premium tier conversion below expectations',
          'Excessively long sales cycles',
          'High checkout abandonment rates',
          'Price pressure despite superior quality'
        ]
      },

      caseStudy: {
        title: 'Case Study: Real Transformation',
        subtitle: 'How I achieved a 182% increase in revenue through strategic corrections without changing the pricing structure or the product',
        client: {
          label: 'Client',
          name: 'TechNexus',
          description: 'Series B - $9M raised',
          problem: 'Premium conversion rate stagnated at 2.3% despite multiple technical optimizations and marketing campaigns.'
        },
        diagnosis: {
          label: 'Diagnosis',
          title: 'Compromised Decision Architecture',
          steps: [
            'Identification of 7 critical points of symbolic misalignment',
            'Quantification of monthly loss of $40,000 due to these misalignments',
            'Implementation of 12 strategic corrections at the highest impact points'
          ]
        },
        results: {
          label: 'Results',
          title: 'In 21 days of implementation',
          metrics: [
            { label: 'Premium conversion rate', before: '2.3%', after: '8.7%' },
            { label: 'Monthly revenue', before: '$65K', after: '$183K' },
            { label: 'Decision cycle', before: '42 days', after: '17 days' }
          ],
          testimonial: 'João not only increased our revenue by 182% - he showed us exactly where we were wasting money on misalignments we would never have found on our own.',
          testimonialAuthor: '— Marcelo Santos, CEO, TechNexus'
        }
      },

      cta: {
        text: 'Discover how much you\'re losing in symbolic misalignments',
        disclaimer: 'Limited slots: only 3 diagnostics available per week'
      }
    }
  },

  es: {
    // Authority Manifesto Component
    authorityManifesto: {
      badge: 'MANIFIESTO DE AUTORIDAD',
      title: 'No optimizo sitios web.',
      titleStriked: 'optimizo sitios web',
      titleHighlight: 'Corrijo arquitecturas de decisión financiera comprometidas.',
      subtitle: 'En 7 años mapeando patrones de abandono y conversión en empresas tecnológicas, identifiqué un patrón consistente: el problema rara vez es técnico. Es una desalineación simbólica entre el valor real ofrecido y su percepción.',
      
      insight: {
        title: 'Perspectiva propietaria:',
        percentage: '83%',
        description: 'de los problemas de conversión no se resuelven con rediseños, mejoras técnicas o campañas de marketing - sino con realineamientos simbólicos precisos en puntos críticos de toma de decisión financiera.',
        result: 'Resultado: Aumento promedio del 37% en ingresos en 21 días para clientes que implementan las correcciones recomendadas.',
        source: 'Fuente: Análisis de 147 empresas tecnológicas entre 2022-2025 | Investigación Immediate Revenue Framework™'
      },

      skills: {
        dontHire: 'No me contrates por estas habilidades:',
        hireFor: 'Contrátame por esta capacidad única:',
        architecture: 'Arquitectura de Decisión Financiera',
        description: 'La habilidad de identificar exactamente dónde y cómo la percepción de valor está desalineada con el valor real, causando pérdidas financieras directas y medibles - y corregirlas con precisión quirúrgica.',
        disclaimer: 'Estas son solo herramientas, no diferenciadores estratégicos.',
        problems: 'Aplicado a problemas como:',
        problemsList: [
          'Conversión en niveles premium por debajo de las expectativas',
          'Ciclos de venta excesivamente largos',
          'Altas tasas de abandono en checkout',
          'Presión de precios a pesar de calidad superior'
        ]
      },

      caseStudy: {
        title: 'Estudio de Caso: Transformación Real',
        subtitle: 'Cómo logré un aumento del 182% en ingresos a través de correcciones estratégicas sin cambiar la estructura de precios o el producto',
        client: {
          label: 'Cliente',
          name: 'TechNexus',
          description: 'Serie B - $9M recaudados',
          problem: 'Tasa de conversión premium estancada en 2.3% a pesar de múltiples optimizaciones técnicas y campañas de marketing.'
        },
        diagnosis: {
          label: 'Diagnóstico',
          title: 'Arquitectura de Decisión Comprometida',
          steps: [
            'Identificación de 7 puntos críticos de desalineación simbólica',
            'Cuantificación de pérdida mensual de $40,000 debido a estas desalineaciones',
            'Implementación de 12 correcciones estratégicas en los puntos de mayor impacto'
          ]
        },
        results: {
          label: 'Resultados',
          title: 'En 21 días de implementación',
          metrics: [
            { label: 'Tasa de conversión premium', before: '2.3%', after: '8.7%' },
            { label: 'Ingresos mensuales', before: '$65K', after: '$183K' },
            { label: 'Ciclo de decisión', before: '42 días', after: '17 días' }
          ],
          testimonial: 'João no solo aumentó nuestros ingresos en un 182% - nos mostró exactamente dónde estábamos desperdiciando dinero en desalineaciones que nunca habríamos encontrado por nuestra cuenta.',
          testimonialAuthor: '— Marcelo Santos, CEO, TechNexus'
        }
      },

      cta: {
        text: 'Descubre cuánto estás perdiendo en desalineaciones simbólicas',
        disclaimer: 'Plazas limitadas: solo 3 diagnósticos disponibles por semana'
      }
    }
  },

  fr: {
    // Authority Manifesto Component  
    authorityManifesto: {
      badge: 'MANIFESTE D\'AUTORITÉ',
      title: 'Je n\'optimise pas les sites web.',
      titleStriked: 'optimise les sites web',
      titleHighlight: 'Je corrige les architectures de décision financière compromises.',
      subtitle: 'En 7 ans de cartographie des schémas d\'abandon et de conversion dans les entreprises technologiques, j\'ai identifié un schéma cohérent : le problème est rarement technique. C\'est un désalignement symbolique entre la valeur réelle offerte et sa perception.',
      
      insight: {
        title: 'Aperçu propriétaire :',
        percentage: '83%',
        description: 'des problèmes de conversion ne sont pas résolus par des redesigns, des améliorations techniques ou des campagnes marketing - mais par des réalignements symboliques précis aux points critiques de prise de décision financière.',
        result: 'Résultat : Augmentation moyenne de 37% du chiffre d\'affaires en 21 jours pour les clients qui implémentent les corrections recommandées.',
        source: 'Source : Analyse de 147 entreprises technologiques entre 2022-2025 | Recherche Immediate Revenue Framework™'
      },

      skills: {
        dontHire: 'Ne m\'embauchez pas pour ces compétences :',
        hireFor: 'Embauchez-moi pour cette capacité unique :',
        architecture: 'Architecture de Décision Financière',
        description: 'La capacité d\'identifier exactement où et comment la perception de valeur est désalignée avec la valeur réelle, causant des pertes financières directes et mesurables - et de les corriger avec une précision chirurgicale.',
        disclaimer: 'Ce ne sont que des outils, pas des différenciateurs stratégiques.',
        problems: 'Appliqué à des problèmes comme :',
        problemsList: [
          'Conversion niveau premium en dessous des attentes',
          'Cycles de vente excessivement longs',
          'Taux d\'abandon élevé au checkout',
          'Pression sur les prix malgré une qualité supérieure'
        ]
      },

      caseStudy: {
        title: 'Étude de Cas : Transformation Réelle',
        subtitle: 'Comment j\'ai réalisé une augmentation de 182% du chiffre d\'affaires grâce à des corrections stratégiques sans changer la structure de prix ou le produit',
        client: {
          label: 'Client',
          name: 'TechNexus',
          description: 'Série B - 9M$ levés',
          problem: 'Taux de conversion premium stagnant à 2,3% malgré de multiples optimisations techniques et campagnes marketing.'
        },
        diagnosis: {
          label: 'Diagnostic',
          title: 'Architecture de Décision Compromise',
          steps: [
            'Identification de 7 points critiques de désalignement symbolique',
            'Quantification de la perte mensuelle de 40 000$ due à ces désalignements',
            'Implémentation de 12 corrections stratégiques aux points d\'impact le plus élevé'
          ]
        },
        results: {
          label: 'Résultats',
          title: 'En 21 jours d\'implémentation',
          metrics: [
            { label: 'Taux de conversion premium', before: '2,3%', after: '8,7%' },
            { label: 'Chiffre d\'affaires mensuel', before: '65K$', after: '183K$' },
            { label: 'Cycle de décision', before: '42 jours', after: '17 jours' }
          ],
          testimonial: 'João n\'a pas seulement augmenté notre chiffre d\'affaires de 182% - il nous a montré exactement où nous gaspillions de l\'argent sur des désalignements que nous n\'aurions jamais trouvés seuls.',
          testimonialAuthor: '— Marcelo Santos, PDG, TechNexus'
        }
      },

      cta: {
        text: 'Découvrez combien vous perdez en désalignements symboliques',
        disclaimer: 'Places limitées : seulement 3 diagnostics disponibles par semaine'
      }
    }
  }
};

// Função para buscar tradução com notação de ponto
export function getTranslation(
  dictionary: TranslationObject,
  key: string,
  replacements?: Record<string, string>
): string {
  const keys = key.split('.');
  let current: any = dictionary;

  for (const k of keys) {
    if (!current || typeof current !== 'object' || !(k in current)) {
      console.warn(`🔥 Missing translation: ${key}`);
      return key; // Retorna a chave se não encontrar
    }
    current = current[k];
  }

  if (typeof current !== 'string') {
    console.warn(`🔥 Translation is not a string: ${key}`);
    return key;
  }

  // Aplica substituições se fornecidas
  if (replacements) {
    return Object.entries(replacements).reduce(
      (result, [placeholder, value]) => 
        result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value),
      current
    );
  }

  return current;
}
