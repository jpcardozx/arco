// Interface for translation objects
export interface TranslationObject {
  [key: string]: string | TranslationObject | any[];
}

// Type for the translation value - can be string, array, or nested object
export type TranslationValue = string | string[] | Record<string, any> | any[];

// Helper function to safely get nested object values
export function getTranslation(
  dictionary: Record<string, any>, 
  key: string, 
  replacements?: Record<string, string>
): any {
  const keys = key.split('.');
  let result: any = dictionary;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      console.warn(`🔥 Translation key not found: ${key}`);
      return key; // Return the key itself as fallback
    }
  }
  
  // If result is a string and we have replacements, apply them
  if (typeof result === 'string' && replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      result = result.replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
    });
  }
  
  return result;
}

export const translations: Record<string, TranslationObject> = {
  pt: {
    // Authority Manifesto Component
    authorityManifesto: {
      badge: 'MANIFESTO DE AUTORIDADE',
      title: 'Eu não otimizo sites.',
      titleHighlight: 'Eu conserto arquiteturas de decisão financeira comprometidas.',
      subtitle: 'Em 7 anos mapeando padrões de abandono e conversão em empresas de tecnologia, identifiquei um padrão consistente: o problema raramente é técnico. É um desalinhamento simbólico entre o valor real oferecido e sua percepção.',

      insight: {
        title: 'Insight Crítico do Mercado',
        percentage: '67%',
        description: 'das empresas tecnicamente superiores são percebidas como inferiores pelos prospects.',
        source: 'Análise de 847 avaliações de prospect em empresas tech (2019-2024)',
        result: 'Resultado: R$2.4M em receita recuperada através de correções simbólicas estratégicas.'
      },

      skills: {
        dontHire: 'Não me contrate para:',
        hireFor: 'Me contrate para:',
        architecture: 'Arquitetura de Decisão Financeira',
        description: 'Diagnosticar e corrigir os pontos onde a percepção de valor está comprometendo as decisões financeiras dos seus prospects.',
        problems: 'Principais problemas que resolvo:',
        problemsList: [
          'Ciclos de vendas excessivamente longos',
          'Altas taxas de abandono no checkout',
          'Pressão por preços apesar da qualidade superior'
        ],
        disclaimer: 'Todo mundo tem essas habilidades. O que importa é o que você faz com elas.'
      },

      caseStudy: {
        title: 'Estudo de Caso: Transformação Real',
        subtitle: 'Como realizei um aumento de 182% em receita através de correções estratégicas sem alterar a estrutura de preços ou o produto',
          client: {
          label: 'Cliente',
          name: 'TechNexus',
          description: 'Série B - R$47M captados',
          problemLabel: 'Problema',
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
          before: 'Antes',
          after: 'Depois',
          metrics: [
            { label: 'Taxa de conversão premium', before: '2.3%', after: '8.7%' },
            { label: 'Receita mensal', before: 'R$65K', after: 'R$183K' },
            { label: 'Ciclo de decisão', before: '42 dias', after: '17 dias' }
          ],
          testimonial: 'João não apenas aumentou nossa receita em 182% - ele nos mostrou exatamente onde estávamos desperdiçando dinheiro em desalinhamentos que nunca teríamos encontrado sozinhos.',
          testimonialAuthor: '— Marcelo Santos, CEO, TechNexus'
        }
      },      cta: {
        text: 'Descubra quanto você está perdendo em desalinhamentos simbólicos',
        disclaimer: 'Vagas limitadas: apenas 3 diagnósticos disponíveis por semana'
      }
    },

    // Common translations
    common: {
      buttons: {
        submit: 'Enviar',
        cancel: 'Cancelar',
        save: 'Salvar',
        close: 'Fechar',
        next: 'Próximo',
        previous: 'Anterior',
        back: 'Voltar',
        learnMore: 'Saiba Mais',
        getStarted: 'Começar',
        seeMore: 'Ver Mais',
        viewAll: 'Ver Todos',
        showMore: 'Mostrar Mais',
        showLess: 'Mostrar Menos',
        calculate: 'Calcular',
        viewPackages: 'Ver Pacotes',
        contactUs: 'Entre em Contato',
        downloadReport: 'Baixar Relatório',
      }
    },

    // Homepage translations
    homepage: {
      hero: {
        title: 'Transforme métricas em resultados financeiros',
        subtitle: 'Para empresas que perdem receita devido a problemas técnicos invisíveis, oferecemos análises precisas e correções estratégicas que geram resultados imediatos.',
        cta: 'Inicie sua Jornada'
      },
      stats: {
        checkoutRate: 'Aumento médio na taxa de checkout',
        loadingTime: 'Redução no tempo de carregamento',
        orderValue: 'Crescimento no valor médio de pedido',
        clients: 'Clientes atendidos',
        projects: 'Projetos realizados',
        results: 'Resultados entregues'
      }
    }
  },

  en: {
    // Authority Manifesto Component
    authorityManifesto: {
      badge: 'AUTHORITY MANIFESTO',
      title: 'I don\'t optimize websites.',
      titleHighlight: 'I fix compromised financial decision architectures.',
      subtitle: 'In 7 years mapping abandonment and conversion patterns in tech companies, I identified a consistent pattern: the problem is rarely technical. It\'s a symbolic misalignment between the real value offered and its perception.',

      insight: {
        title: 'Critical Market Insight',
        percentage: '67%',
        description: 'of technically superior companies are perceived as inferior by prospects.',
        source: 'Analysis of 847 prospect evaluations in tech companies (2019-2024)',
        result: 'Result: $2.4M in revenue recovered through strategic symbolic corrections.'
      },

      skills: {
        dontHire: 'Don\'t hire me for:',
        hireFor: 'Hire me for:',
        architecture: 'Financial Decision Architecture',
        description: 'Diagnosing and correcting the points where value perception is compromising your prospects\' financial decisions.',
        problems: 'Main problems I solve:',
        problemsList: [
          'Excessively long sales cycles',
          'High checkout abandonment rates',
          'Price pressure despite superior quality'
        ],
        disclaimer: 'Everyone has these skills. What matters is what you do with them.'
      },

      caseStudy: {
        title: 'Case Study: Real Transformation',
        subtitle: 'How I achieved a 182% increase in revenue through strategic corrections without changing the pricing structure or the product',
          client: {
          label: 'Client',
          name: 'TechNexus',
          description: 'Series B - $9M raised',
          problemLabel: 'Problem',
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
          before: 'Before',
          after: 'After',
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
      titleHighlight: 'Arreglo arquitecturas de decisión financiera comprometidas.',
      subtitle: 'En 7 años mapeando patrones de abandono y conversión en empresas tecnológicas, identifiqué un patrón consistente: el problema rara vez es técnico. Es una desalineación simbólica entre el valor real ofrecido y su percepción.',

      insight: {
        title: 'Perspectiva Crítica del Mercado',
        percentage: '67%',
        description: 'de las empresas técnicamente superiores son percibidas como inferiores por los prospectos.',
        source: 'Análisis de 847 evaluaciones de prospectos en empresas tech (2019-2024)',
        result: 'Resultado: $2.4M en ingresos recuperados a través de correcciones simbólicas estratégicas.'
      },

      skills: {
        dontHire: 'No me contrates para:',
        hireFor: 'Contrátame para:',
        architecture: 'Arquitectura de Decisión Financiera',
        description: 'Diagnosticar y corregir los puntos donde la percepción de valor está comprometiendo las decisiones financieras de tus prospectos.',
        problems: 'Principales problemas que resuelvo:',
        problemsList: [
          'Ciclos de ventas excesivamente largos',
          'Altas tasas de abandono en el checkout',
          'Presión por precios a pesar de la calidad superior'
        ],
        disclaimer: 'Todo el mundo tiene estas habilidades. Lo que importa es lo que haces con ellas.'
      },

      caseStudy: {
        title: 'Estudio de Caso: Transformación Real',
        subtitle: 'Cómo logré un aumento del 182% en ingresos a través de correcciones estratégicas sin cambiar la estructura de precios o el producto',
          client: {
          label: 'Cliente',
          name: 'TechNexus',
          description: 'Serie B - $9M recaudados',
          problemLabel: 'Problema',
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
          before: 'Antes',
          after: 'Después',
          metrics: [
            { label: 'Tasa de conversión premium', before: '2.3%', after: '8.7%' },
            { label: 'Ingresos mensuales', before: '$65K', after: '$183K' },
            { label: 'Ciclo de decisión', before: '42 días', after: '17 días' }
          ],
          testimonial: 'João no solo aumentó nuestros ingresos en 182% - nos mostró exactamente dónde estábamos desperdiciando dinero en desalineaciones que nunca habríamos encontrado por nuestra cuenta.',
          testimonialAuthor: '— Marcelo Santos, CEO, TechNexus'
        }
      },

      cta: {
        text: 'Descubre cuánto estás perdiendo en desalineaciones simbólicas',
        disclaimer: 'Cupos limitados: solo 3 diagnósticos disponibles por semana'
      }
    }
  },

  fr: {
    // Authority Manifesto Component
    authorityManifesto: {
      badge: 'MANIFESTE D\'AUTORITÉ',
      title: 'Je n\'optimise pas les sites web.',
      titleHighlight: 'Je répare les architectures de décision financière compromises.',
      subtitle: 'En 7 ans à cartographier les patterns d\'abandon et de conversion dans les entreprises tech, j\'ai identifié un pattern cohérent : le problème est rarement technique. C\'est un désalignement symbolique entre la vraie valeur offerte et sa perception.',

      insight: {
        title: 'Insight Critique du Marché',
        percentage: '67%',
        description: 'des entreprises techniquement supérieures sont perçues comme inférieures par les prospects.',
        source: 'Analyse de 847 évaluations de prospects dans les entreprises tech (2019-2024)',
        result: 'Résultat : 2,4M$ de revenus récupérés grâce aux corrections symboliques stratégiques.'
      },

      skills: {
        dontHire: 'Ne m\'engagez pas pour :',
        hireFor: 'Engagez-moi pour :',
        architecture: 'Architecture de Décision Financière',
        description: 'Diagnostiquer et corriger les points où la perception de valeur compromet les décisions financières de vos prospects.',
        problems: 'Principaux problèmes que je résous :',
        problemsList: [
          'Cycles de vente excessivement longs',
          'Taux d\'abandon élevés au checkout',
          'Pression sur les prix malgré une qualité supérieure'
        ],
        disclaimer: 'Tout le monde a ces compétences. Ce qui compte, c\'est ce que vous en faites.'
      },

      caseStudy: {
        title: 'Étude de Cas : Transformation Réelle',
        subtitle: 'Comment j\'ai réalisé une augmentation de 182% des revenus grâce à des corrections stratégiques sans changer la structure de prix ou le produit',
          client: {
          label: 'Client',
          name: 'TechNexus',
          description: 'Série B - 9M$ levés',
          problemLabel: 'Problème',
          problem: 'Taux de conversion premium stagnant à 2,3% malgré de multiples optimisations techniques et campagnes marketing.'
        },
        
        diagnosis: {
          label: 'Diagnostic',
          title: 'Architecture de Décision Compromise',
          steps: [
            'Identification de 7 points critiques de désalignement symbolique',
            'Quantification de perte mensuelle de 40 000$ due à ces désalignements',
            'Implémentation de 12 corrections stratégiques aux points d\'impact le plus élevé'
          ]
        },
          results: {
          label: 'Résultats',
          title: 'En 21 jours d\'implémentation',
          before: 'Avant',
          after: 'Après',
          metrics: [
            { label: 'Taux de conversion premium', before: '2,3%', after: '8,7%' },
            { label: 'Revenus mensuels', before: '65K$', after: '183K$' },
            { label: 'Cycle de décision', before: '42 jours', after: '17 jours' }
          ],
          testimonial: 'João n\'a pas seulement augmenté nos revenus de 182% - il nous a montré exactement où nous gaspillions de l\'argent dans des désalignements que nous n\'aurions jamais trouvés seuls.',
          testimonialAuthor: '— Marcelo Santos, CEO, TechNexus'
        }
      },

      cta: {
        text: 'Découvrez combien vous perdez en désalignements symboliques',
        disclaimer: 'Places limitées : seulement 3 diagnostics disponibles par semana'
      }
    }
  }
};