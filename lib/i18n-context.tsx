'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useUserPreferences } from './user-preferences-context.js'

// Types for supported languages
export type SupportedLanguage = 'en' | 'pt' | 'es' | 'fr'

// Dictionary interfaces
export interface TranslationDictionary {
    [key: string]: string | TranslationDictionary
}

// Dictionary lookup - nested paths with dot notation
export function getTranslation(dict: TranslationDictionary, key: string, replacements?: Record<string, string>): string {
    const path = key.split('.')
    let current: any = dict

    for (const segment of path) {
        if (current[segment] === undefined) {
            console.warn(`Translation missing for key: ${key}`)
            return key
        }
        current = current[segment]
    }

    if (typeof current !== 'string') {
        console.warn(`Translation key does not resolve to a string: ${key}`)
        return key
    }

    // Apply any replacements
    if (replacements) {
        return Object.entries(replacements).reduce(
            (result, [placeholder, value]) => result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value),
            current
        )
    }

    return current
}

// Translation dictionaries for each language
const dictionaries: Record<SupportedLanguage, TranslationDictionary> = {
    en: {
        common: {
            buttons: {
                submit: 'Submit',
                cancel: 'Cancel',
                save: 'Save',
                close: 'Close',
                next: 'Next',
                previous: 'Previous',
                back: 'Back',
                learnMore: 'Learn More',
                getStarted: 'Get Started',
                seeMore: 'See More',
                viewAll: 'View All',
                showMore: 'Show More',
                showLess: 'Show Less',
                calculate: 'Calculate',
                viewPackages: 'View Packages',
                contactUs: 'Contact Us',
                downloadReport: 'Download Report'
            },
            navigation: {
                home: 'Home',
                about: 'About',
                process: 'How It Works',
                results: 'Results',
                solutions: 'Solutions',
                blog: 'Blog',
                contact: 'Contact Us',
                portfolio: 'Portfolio',
                services: 'Services',
                partners: 'Partners'
            },
            footer: {
                copyright: '© {year} ARCO. All rights reserved.',
                privacyPolicy: 'Privacy Policy',
                termsOfService: 'Terms of Service',
                cookiePolicy: 'Cookie Policy',
                contactInfo: 'Contact Information',
                socialMedia: 'Social Media',
                newsletter: 'Newsletter'
            },
            settings: {
                language: 'Language',
                theme: 'Theme',
                darkMode: 'Dark Mode',
                lightMode: 'Light Mode',
                systemDefault: 'System Default',
                accessibility: 'Accessibility',
                highContrast: 'High Contrast',
                reducedMotion: 'Reduced Motion'
            }
        },
        homepage: {
            hero: {
                title: 'Unlock Your Digital Conversion Potential',
                subtitle: 'Data-driven optimization for businesses looking to maximize digital performance',
                cta: 'Start Your Journey',
            },
            process: {
                title: 'Our Process',
                subtitle: 'How we transform your digital experience',
                step1: 'Analysis',
                step1Description: 'We identify exactly where your customers abandon due to technical frustrations and calculate how much this is costing your company monthly.',
                step2: 'Strategy',
                step2Description: 'We apply fixes to the 3 points that drive away most of your customers, recovering revenue that should already be yours.',
                step3: 'Implementation',
                step3Description: 'Our team quickly implements the changes without disrupting your operations.',
                step4: 'Optimization',
                step4Description: 'Track the real increase in your revenue every week, with clear reports connected directly to your financial tools.',
            },
            caseStudies: {
                title: 'Success Stories',
                subtitle: 'See how we\'ve helped businesses like yours',
                viewCase: 'View Case Study',
            },
            stats: {
                title: 'Proven Results',
                subtitle: 'Our clients see measurable improvements',
                checkoutRate: 'Increase in checkout completion rate',
                loadingTime: 'Reduction in loading time',
                orderValue: 'Growth in average order value'
            },
            testimonials: {
                title: 'Client Testimonials',
                subtitle: 'What our clients say about us',
            },
            cta: {
                title: 'Ready to Transform Your Digital Presence?',
                subtitle: 'Get started with a free consultation',
                buttonText: 'Contact Us Today',
            }
        },
        solutions: {
            title: 'Our Solutions',
            subtitle: 'Tailored approaches for your specific challenges',
            analysis: {
                title: 'Revenue Loss Tracking',
                description: 'We identify exactly where your customers abandon due to technical frustrations and calculate how much this is costing your company monthly.',
                feature1: 'Purchase journey friction analysis',
                feature2: 'Abandonment mapping with monetary values',
                feature3: 'Abandonment trigger identification',
                feature4: 'Prioritization of fixes by immediate return'
            },
            recovery: {
                title: 'Strategic Recovery',
                description: 'We apply fixes to the 3 points that drive away most of your customers, recovering revenue that should already be yours.',
                feature1: 'Fix for the 3 main friction points',
                feature2: 'Implementation within 5 business days',
                feature3: 'Real tests with converting users',
                feature4: 'No need to rewrite systems'
            },
            growth: {
                title: 'Proven Growth',
                description: 'Track the real increase in your revenue every week, with clear reports connected directly to your financial and analytics tools.',
                feature1: 'Weekly performance metrics',
                feature2: 'Revenue impact analysis',
                feature3: 'Ongoing optimization suggestions',
                feature4: 'Executive-friendly reports'
            }
        }
    },

    pt: {
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
                downloadReport: 'Baixar Relatório'
            },
            navigation: {
                home: 'Início',
                about: 'Sobre',
                process: 'Como Funciona',
                results: 'Resultados',
                solutions: 'Soluções',
                blog: 'Blog',
                contact: 'Contato',
                portfolio: 'Portfólio',
                services: 'Serviços',
                partners: 'Parceiros'
            },
            footer: {
                copyright: '© {year} ARCO. Todos os direitos reservados.',
                privacyPolicy: 'Política de Privacidade',
                termsOfService: 'Termos de Serviço',
                cookiePolicy: 'Política de Cookies',
                contactInfo: 'Informações de Contato',
                socialMedia: 'Mídia Social',
                newsletter: 'Newsletter'
            },
            settings: {
                language: 'Idioma',
                theme: 'Tema',
                darkMode: 'Modo Escuro',
                lightMode: 'Modo Claro',
                systemDefault: 'Padrão do Sistema',
                accessibility: 'Acessibilidade',
                highContrast: 'Alto Contraste',
                reducedMotion: 'Movimento Reduzido'
            }
        },
        homepage: {
            hero: {
                title: 'Desbloqueie seu Potencial de Conversão Digital',
                subtitle: 'Otimização baseada em dados para empresas que buscam maximizar o desempenho digital',
                cta: 'Inicie sua Jornada',
            },
            process: {
                title: 'Nosso Processo',
                subtitle: 'Como transformamos sua experiência digital',
                step1: 'Análise',
                step1Description: 'Identificamos exatamente onde seus clientes abandonam devido a frustrações técnicas e calculamos quanto isso está custando para sua empresa mensalmente.',
                step2: 'Estratégia',
                step2Description: 'Aplicamos correções nos 3 pontos que afastam a maioria dos seus clientes, recuperando receita que já deveria ser sua.',
                step3: 'Implementação',
                step3Description: 'Nossa equipe implementa as mudanças rapidamente sem interromper suas operações.',
                step4: 'Otimização',
                step4Description: 'Acompanhe o aumento real na sua receita todas as semanas, com relatórios claros conectados diretamente às suas ferramentas financeiras.',
            },
            caseStudies: {
                title: 'Casos de Sucesso',
                subtitle: 'Veja como ajudamos empresas como a sua',
                viewCase: 'Ver Caso',
            },
            stats: {
                title: 'Resultados Comprovados',
                subtitle: 'Nossos clientes veem melhorias mensuráveis',
                checkoutRate: 'Aumento na taxa de conclusão de checkout',
                loadingTime: 'Redução no tempo de carregamento',
                orderValue: 'Crescimento no valor médio de pedido'
            },
            testimonials: {
                title: 'Depoimentos de Clientes',
                subtitle: 'O que nossos clientes dizem sobre nós',
            },
            cta: {
                title: 'Pronto para Transformar sua Presença Digital?',
                subtitle: 'Comece com uma consulta gratuita',
                buttonText: 'Entre em Contato Hoje',
            }
        },
        solutions: {
            title: 'Nossas Soluções',
            subtitle: 'Abordagens personalizadas para seus desafios específicos',
            analysis: {
                title: 'Rastreamento de Perda de Receita',
                description: 'Identificamos exatamente onde seus clientes abandonam devido a frustrações técnicas e calculamos quanto isso está custando para sua empresa mensalmente.',
                feature1: 'Análise de atrito na jornada de compra',
                feature2: 'Mapeamento de abandono com valores monetários',
                feature3: 'Identificação de gatilhos de abandono',
                feature4: 'Priorização de correções por retorno imediato'
            },
            recovery: {
                title: 'Recuperação Estratégica',
                description: 'Aplicamos correções nos 3 pontos que afastam a maioria dos seus clientes, recuperando receita que já deveria ser sua.',
                feature1: 'Correção para os 3 principais pontos de atrito',
                feature2: 'Implementação em 5 dias úteis',
                feature3: 'Testes reais com usuários convertidos',
                feature4: 'Sem necessidade de reescrever sistemas'
            },
            growth: {
                title: 'Crescimento Comprovado',
                description: 'Acompanhe o aumento real na sua receita todas as semanas, com relatórios claros conectados diretamente às suas ferramentas financeiras e analíticas.',
                feature1: 'Métricas de desempenho semanais',
                feature2: 'Análise de impacto na receita',
                feature3: 'Sugestões contínuas de otimização',
                feature4: 'Relatórios amigáveis para executivos'
            }
        }
    },

    es: {
        common: {
            buttons: {
                submit: 'Enviar',
                cancel: 'Cancelar',
                save: 'Guardar',
                close: 'Cerrar',
                next: 'Siguiente',
                previous: 'Anterior',
                back: 'Volver',
                learnMore: 'Saber Más',
                getStarted: 'Comenzar',
                seeMore: 'Ver Más',
                viewAll: 'Ver Todo',
                showMore: 'Mostrar Más',
                showLess: 'Mostrar Menos',
                calculate: 'Calcular',
                viewPackages: 'Ver Paquetes',
                contactUs: 'Contáctenos',
                downloadReport: 'Descargar Informe'
            },
            navigation: {
                home: 'Inicio',
                about: 'Acerca de',
                process: 'Cómo Funciona',
                results: 'Resultados',
                solutions: 'Soluciones',
                blog: 'Blog',
                contact: 'Contacto',
                portfolio: 'Portafolio',
                services: 'Servicios',
                partners: 'Socios'
            },
            footer: {
                copyright: '© {year} ARCO. Todos los derechos reservados.',
                privacyPolicy: 'Política de Privacidad',
                termsOfService: 'Términos de Servicio',
                cookiePolicy: 'Política de Cookies',
                contactInfo: 'Información de Contacto',
                socialMedia: 'Redes Sociales',
                newsletter: 'Boletín'
            },
            settings: {
                language: 'Idioma',
                theme: 'Tema',
                darkMode: 'Modo Oscuro',
                lightMode: 'Modo Claro',
                systemDefault: 'Predeterminado del Sistema',
                accessibility: 'Accesibilidad',
                highContrast: 'Alto Contraste',
                reducedMotion: 'Movimiento Reducido'
            }
        },
        homepage: {
            hero: {
                title: 'Desbloquea tu Potencial de Conversión Digital',
                subtitle: 'Optimización basada en datos para empresas que buscan maximizar el rendimiento digital',
                cta: 'Comienza tu Viaje',
            },
            process: {
                title: 'Nuestro Proceso',
                subtitle: 'Cómo transformamos tu experiencia digital',
                step1: 'Análisis',
                step1Description: 'Identificamos exactamente dónde tus clientes abandonan debido a frustraciones técnicas y calculamos cuánto le está costando a tu empresa mensualmente.',
                step2: 'Estrategia',
                step2Description: 'Aplicamos correcciones en los 3 puntos que alejan a la mayoría de tus clientes, recuperando ingresos que ya deberían ser tuyos.',
                step3: 'Implementación',
                step3Description: 'Nuestro equipo implementa los cambios rápidamente sin interrumpir tus operaciones.',
                step4: 'Optimización',
                step4Description: 'Sigue el aumento real en tus ingresos cada semana, con informes claros conectados directamente a tus herramientas financieras.',
            },
            caseStudies: {
                title: 'Casos de Éxito',
                subtitle: 'Mira cómo hemos ayudado a empresas como la tuya',
                viewCase: 'Ver Caso',
            },
            stats: {
                title: 'Resultados Probados',
                subtitle: 'Nuestros clientes ven mejoras medibles',
                checkoutRate: 'Aumento en la tasa de finalización de compra',
                loadingTime: 'Reducción en el tiempo de carga',
                orderValue: 'Crecimiento en el valor medio del pedido'
            },
            testimonials: {
                title: 'Testimonios de Clientes',
                subtitle: 'Lo que nuestros clientes dicen de nosotros',
            },
            cta: {
                title: '¿Listo para Transformar tu Presencia Digital?',
                subtitle: 'Comienza con una consulta gratuita',
                buttonText: 'Contáctanos Hoy',
            }
        },
        solutions: {
            title: 'Nuestras Soluciones',
            subtitle: 'Enfoques personalizados para tus desafíos específicos',
            analysis: {
                title: 'Seguimiento de Pérdida de Ingresos',
                description: 'Identificamos exactamente dónde tus clientes abandonan debido a frustraciones técnicas y calculamos cuánto le está costando a tu empresa mensualmente.',
                feature1: 'Análisis de fricción en el recorrido de compra',
                feature2: 'Mapeo de abandono con valores monetarios',
                feature3: 'Identificación de desencadenantes de abandono',
                feature4: 'Priorización de correcciones por retorno inmediato'
            },
            recovery: {
                title: 'Recuperación Estratégica',
                description: 'Aplicamos correcciones en los 3 puntos que alejan a la mayoría de tus clientes, recuperando ingresos que ya deberían ser tuyos.',
                feature1: 'Corrección para los 3 principales puntos de fricción',
                feature2: 'Implementación en 5 días hábiles',
                feature3: 'Pruebas reales con usuarios convertidos',
                feature4: 'No es necesario reescribir sistemas'
            },
            growth: {
                title: 'Crecimiento Probado',
                description: 'Sigue el aumento real en tus ingresos cada semana, con informes claros conectados directamente a tus herramientas financieras y analíticas.',
                feature1: 'Métricas de rendimiento semanales',
                feature2: 'Análisis de impacto en ingresos',
                feature3: 'Sugerencias de optimización continuas',
                feature4: 'Informes amigables para ejecutivos'
            }
        }
    },

    fr: {
        common: {
            buttons: {
                submit: 'Soumettre',
                cancel: 'Annuler',
                save: 'Enregistrer',
                close: 'Fermer',
                next: 'Suivant',
                previous: 'Précédent',
                back: 'Retour',
                learnMore: 'En Savoir Plus',
                getStarted: 'Commencer',
                seeMore: 'Voir Plus',
                viewAll: 'Voir Tout',
                showMore: 'Afficher Plus',
                showLess: 'Afficher Moins',
                calculate: 'Calculer',
                viewPackages: 'Voir les Forfaits',
                contactUs: 'Contactez-nous',
                downloadReport: 'Télécharger le Rapport'
            },
            navigation: {
                home: 'Accueil',
                about: 'À Propos',
                process: 'Comment Ça Marche',
                results: 'Résultats',
                solutions: 'Solutions',
                blog: 'Blog',
                contact: 'Contact',
                portfolio: 'Portfolio',
                services: 'Services',
                partners: 'Partenaires'
            },
            footer: {
                copyright: '© {year} ARCO. Tous droits réservés.',
                privacyPolicy: 'Politique de Confidentialité',
                termsOfService: 'Conditions d\'Utilisation',
                cookiePolicy: 'Politique des Cookies',
                contactInfo: 'Informations de Contact',
                socialMedia: 'Réseaux Sociaux',
                newsletter: 'Newsletter'
            },
            settings: {
                language: 'Langue',
                theme: 'Thème',
                darkMode: 'Mode Sombre',
                lightMode: 'Mode Clair',
                systemDefault: 'Paramètres Système',
                accessibility: 'Accessibilité',
                highContrast: 'Contraste Élevé',
                reducedMotion: 'Mouvement Réduit'
            }
        },
        homepage: {
            hero: {
                title: 'Débloquez Votre Potentiel de Conversion Digitale',
                subtitle: 'Optimisation basée sur les données pour les entreprises cherchant à maximiser leur performance digitale',
                cta: 'Commencez Votre Parcours',
            },
            process: {
                title: 'Notre Processus',
                subtitle: 'Comment nous transformons votre expérience digitale',
                step1: 'Analyse',
                step1Description: 'Nous identifions exactement où vos clients abandonnent en raison de frustrations techniques et calculons combien cela coûte à votre entreprise mensuellement.',
                step2: 'Stratégie',
                step2Description: 'Nous appliquons des corrections aux 3 points qui éloignent la plupart de vos clients, récupérant des revenus qui devraient déjà vous appartenir.',
                step3: 'Implémentation',
                step3Description: 'Notre équipe implémente rapidement les changements sans perturber vos opérations.',
                step4: 'Optimisation',
                step4Description: 'Suivez l\'augmentation réelle de vos revenus chaque semaine, avec des rapports clairs connectés directement à vos outils financiers.',
            },
            caseStudies: {
                title: 'Réussites',
                subtitle: 'Découvrez comment nous avons aidé des entreprises comme la vôtre',
                viewCase: 'Voir l\'Étude de Cas',
            },
            stats: {
                title: 'Résultats Prouvés',
                subtitle: 'Nos clients constatent des améliorations mesurables',
                checkoutRate: 'Augmentation du taux d\'achèvement des paiements',
                loadingTime: 'Réduction du temps de chargement',
                orderValue: 'Croissance de la valeur moyenne des commandes'
            },
            testimonials: {
                title: 'Témoignages Clients',
                subtitle: 'Ce que nos clients disent de nous',
            },
            cta: {
                title: 'Prêt à Transformer Votre Présence Digitale ?',
                subtitle: 'Commencez avec une consultation gratuite',
                buttonText: 'Contactez-nous Aujourd\'hui',
            }
        },
        solutions: {
            title: 'Nos Solutions',
            subtitle: 'Approches sur mesure pour vos défis spécifiques',
            analysis: {
                title: 'Suivi des Pertes de Revenus',
                description: 'Nous identifions exactement où vos clients abandonnent en raison de frustrations techniques et calculons combien cela coûte à votre entreprise mensuellement.',
                feature1: 'Analyse des frictions dans le parcours d\'achat',
                feature2: 'Cartographie des abandons avec valeurs monétaires',
                feature3: 'Identification des déclencheurs d\'abandon',
                feature4: 'Priorisation des corrections par retour immédiat'
            },
            recovery: {
                title: 'Récupération Stratégique',
                description: 'Nous appliquons des corrections aux 3 points qui éloignent la plupart de vos clients, récupérant des revenus qui devraient déjà vous appartenir.',
                feature1: 'Correction pour les 3 principaux points de friction',
                feature2: 'Implémentation en 5 jours ouvrables',
                feature3: 'Tests réels avec des utilisateurs convertis',
                feature4: 'Pas besoin de réécrire les systèmes'
            },
            growth: {
                title: 'Croissance Prouvée',
                description: 'Suivez l\'augmentation réelle de vos revenus chaque semaine, avec des rapports clairs connectés directement à vos outils financiers et analytiques.',
                feature1: 'Métriques de performance hebdomadaires',
                feature2: 'Analyse d\'impact sur les revenus',
                feature3: 'Suggestions d\'optimisation continues',
                feature4: 'Rapports adaptés aux dirigeants'
            }
        }
    }
}

// Context for i18n
interface I18nContextType {
    t: (key: string, replacements?: Record<string, string>) => string
    language: SupportedLanguage
    setLanguage: (lang: SupportedLanguage) => void
    availableLanguages: SupportedLanguage[]
    isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
    const { preferences, updatePreferences } = useUserPreferences()
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en')
    const [autoDetected, setAutoDetected] = useState(false)

    // Available languages
    const availableLanguages: SupportedLanguage[] = ['en', 'pt', 'es', 'fr']

    // Initialize language from user preferences or detect from browser
    useEffect(() => {
        // First try to get from user preferences
        if (preferences.language && dictionaries[preferences.language as SupportedLanguage]) {
            setCurrentLanguage(preferences.language as SupportedLanguage)
            return
        }

        // If no language preference is set, try to detect from browser
        if (!autoDetected && typeof window !== 'undefined') {
            try {
                // Try to detect from navigator.languages
                if (navigator.languages && navigator.languages.length) {
                    for (const browserLang of navigator.languages) {
                        const langCode = browserLang.split('-')[0].toLowerCase()
                        if (availableLanguages.includes(langCode as SupportedLanguage)) {
                            setCurrentLanguage(langCode as SupportedLanguage)
                            updatePreferences({ language: langCode as SupportedLanguage })
                            setAutoDetected(true)
                            return
                        }
                    }
                }

                // Fallback to navigator.language
                if (navigator.language) {
                    const langCode = navigator.language.split('-')[0].toLowerCase()
                    if (availableLanguages.includes(langCode as SupportedLanguage)) {
                        setCurrentLanguage(langCode as SupportedLanguage)
                        updatePreferences({ language: langCode as SupportedLanguage })
                        setAutoDetected(true)
                        return
                    }
                }
            } catch (error) {
                console.warn('Failed to detect browser language:', error)
            }

            // Mark as detected even if we use default, to avoid re-running detection
            setAutoDetected(true)
        }
    }, [preferences.language, autoDetected, updatePreferences, availableLanguages])

    // Translation function
    const t = (key: string, replacements?: Record<string, string>): string => {
        return getTranslation(dictionaries[currentLanguage], key, replacements)
    }

    // Set language and update preferences
    const setLanguage = (lang: SupportedLanguage) => {
        setCurrentLanguage(lang)
        updatePreferences({ language: lang })

        // Update HTML lang attribute
        if (typeof document !== 'undefined') {
            document.documentElement.lang = lang
        }
    }    // Check if current language is RTL (for future support of languages like Arabic)
    const isRTL = false // Extend this when adding RTL languages

    return (
        <I18nContext.Provider
            value={{
                t,
                language: currentLanguage,
                setLanguage,
                availableLanguages,
                isRTL,
            }}
        >
            {children}
        </I18nContext.Provider>
    )
}

export function useTranslation() {
    const context = useContext(I18nContext)

    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider')
    }

    return context
}
