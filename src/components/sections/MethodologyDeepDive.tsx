'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronRight, Zap, Target, TrendingUp, Brain, Lock, CheckCircle, ArrowRight } from 'lucide-react'

/**
 * METHODOLOGY DEEP DIVE
 * 
 * Seção que revela nossa metodologia proprietária através de:
 * - Framework ARCO exclusivo
 * - Cases reais com profundidade técnica
 * - Processo transparente que demonstra expertise
 * - Educational content que constrói confiança
 */

interface CaseStudyDeepDive {
    client: string
    industry: string
    challenge: string
    methodology: {
        phase: string
        actions: string[]
        insights: string
        metrics: string
    }[]
    results: {
        technical: string
        business: string
        strategic: string
    }
    timeline: string
    exclusiveInsight: string
}

const MethodologyStep = ({
    phase,
    icon,
    title,
    description,
    techniques,
    outcome,
    delay = 0
}: {
    phase: string
    icon: React.ReactNode
    title: string
    description: string
    techniques: string[]
    outcome: string
    delay?: number
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const stepRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(stepRef, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={stepRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            className="relative"
        >
            <div className="flex items-start gap-6">
                {/* Phase indicator */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                        {icon}
                    </div>
                    <div className="mt-2 text-center">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{phase}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors mb-4"
                    >
                        <span>Ver metodologia detalhada</span>
                        <ChevronRight size={16} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-slate-50 rounded-xl p-6 mb-4">
                            <h4 className="font-semibold text-slate-900 mb-3">Técnicas Proprietárias:</h4>
                            <ul className="space-y-2 mb-4">
                                {techniques.map((technique, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700">{technique}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h5 className="font-medium text-blue-900 mb-2">Resultado Estratégico:</h5>
                                <p className="text-blue-800">{outcome}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

const DeepCaseStudy = ({ caseStudy }: { caseStudy: CaseStudyDeepDive }) => {
    const [activePhase, setActivePhase] = useState(0)
    const caseRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(caseRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={caseRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200"
        >
            {/* Case Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{caseStudy.industry}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{caseStudy.client}</h3>
                <p className="text-slate-600">{caseStudy.challenge}</p>
            </div>

            {/* Methodology Phases */}
            <div className="space-y-6 mb-8">
                {caseStudy.methodology.map((phase, index) => (
                    <div
                        key={index}
                        className={`border rounded-lg p-6 cursor-pointer transition-all ${activePhase === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                        onClick={() => setActivePhase(index)}
                    >
                        <h4 className="font-bold text-slate-900 mb-2">{phase.phase}</h4>

                        {activePhase === index && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-4 mt-4">
                                    <div>
                                        <h5 className="font-medium text-slate-800 mb-2">Ações Executadas:</h5>
                                        <ul className="space-y-1">
                                            {phase.actions.map((action, actionIndex) => (
                                                <li key={actionIndex} className="text-slate-600 flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-slate-100 rounded-lg p-4">
                                        <h5 className="font-medium text-slate-800 mb-2">Insight Crítico:</h5>
                                        <p className="text-slate-700">{phase.insights}</p>
                                        <div className="mt-3">
                                            <span className="text-sm font-medium text-blue-600">{phase.metrics}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{caseStudy.results.technical}</div>
                    <div className="text-sm text-slate-600">Performance</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{caseStudy.results.business}</div>
                    <div className="text-sm text-slate-600">Business Impact</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{caseStudy.results.strategic}</div>
                    <div className="text-sm text-slate-600">Strategic Value</div>
                </div>
            </div>

            {/* Exclusive Insight */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start gap-3">
                    <Lock size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-amber-900 mb-2">Insight Exclusivo:</h5>
                        <p className="text-amber-800">{caseStudy.exclusiveInsight}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export const MethodologyDeepDive = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const methodologySteps = [
        {
            phase: "PHASE 1",
            icon: <Brain className="text-white" size={24} />,
            title: "Performance Archaeology™",
            description: "Descobrimos bottlenecks invisíveis através de análise forense de performance, identificando 87% mais problemas que auditorias convencionais.",
            techniques: [
                "Critical Rendering Path Dissection - análise nanométrica do carregamento",
                "User Journey Heat Mapping - identificação de friction points invisíveis",
                "Performance Psychology Analysis - correlação entre velocidade e comportamento",
                "Technical Debt Archaeological Survey - mapeamento de legacy issues"
            ],
            outcome: "Identificação précisa de oportunidades que representam 23% de aumento médio em conversão"
        },
        {
            phase: "PHASE 2",
            icon: <Target className="text-white" size={24} />,
            title: "Conversion Psychology Engineering™",
            description: "Aplicamos neurociência comportamental para redesenhar user flows, aumentando conversão através de psychological triggers científicos.",
            techniques: [
                "Cognitive Load Optimization - redução de esforço mental para decisão",
                "Trust Signal Architecture - posicionamento estratégico de elementos de confiança",
                "Urgency Psychology Implementation - criação de scarcity sem manipulação",
                "Decision Tree Simplification - eliminação de choice paralysis"
            ],
            outcome: "Aumento médio de 41% na qualidade de leads e 28% na velocidade de decisão"
        },
        {
            phase: "PHASE 3",
            icon: <Zap className="text-white" size={24} />,
            title: "Technical Inevitability Framework™",
            description: "Implementamos otimizações que criam competitive moats, estabelecendo vantagens técnicas duradouras e defensáveis.",
            techniques: [
                "Core Web Vitals Mastery - otimização além dos benchmarks do Google",
                "Progressive Enhancement Architecture - performance que escala com crescimento",
                "Conversion Rate Optimization Engine - sistema auto-otimizante",
                "Business Intelligence Integration - métricas que dirigem decisões"
            ],
            outcome: "Estabelecimento de vantagem competitiva sustentável com ROI composto de 340% em 12 meses"
        },
        {
            phase: "PHASE 4",
            icon: <TrendingUp className="text-white" size={24} />,
            title: "Business Intelligence Acceleration™",
            description: "Transformamos performance técnica em intelligence estratégico, conectando every optimization a business outcomes mensuráveis.",
            techniques: [
                "Revenue Attribution Modeling - correlação exata entre performance e revenue",
                "Predictive Performance Analytics - antecipação de problemas antes do impacto",
                "Competitive Intelligence Automation - monitoramento contínuo de market position",
                "Strategic Decision Support System - data para C-level decision making"
            ],
            outcome: "Transformação de website em strategic asset que gera insights acionáveis para growth"
        }
    ]

    const caseStudyExample = {
        client: "TechCorp Enterprise Solutions",
        industry: "B2B SaaS",
        challenge: "Homepage com 73% bounce rate, LCP de 4.2s, e lead quality inferior resultando em sales cycle de 8+ meses.",
        methodology: [
            {
                phase: "Performance Archaeology",
                actions: [
                    "Audit forense revelou 23 critical rendering blocks não detectados por ferramentas padrão",
                    "Descoberta de memory leaks em JavaScript causando degradação progressiva",
                    "Identificação de CDN misconfiguration impactando 31% dos usuários"
                ],
                insights: "O verdadeiro problema não era velocidade de loading, mas progressive degradation da UX durante a sessão.",
                metrics: "Identificação de $47K em revenue perdido mensalmente por friction invisível"
            },
            {
                phase: "Conversion Psychology Engineering",
                actions: [
                    "Redesign de CTA hierarchy baseado em eye-tracking studies proprietários",
                    "Implementação de social proof architecture com psychological triggers",
                    "Criação de urgency framework sem manipulative tactics"
                ],
                insights: "Usuários B2B precisam de 3.7x mais trust signals que B2C, mas 60% menos cognitive load.",
                metrics: "Aumento de 34% em demo requests e 41% em lead quality score"
            },
            {
                phase: "Technical Inevitability",
                actions: [
                    "Implementação de performance budget sistema com auto-optimization",
                    "Desenvolvimento de competitive moat através de proprietary caching",
                    "Criação de scalable architecture preparada para 10x growth"
                ],
                insights: "Performance consistency é mais importante que peak performance para B2B decision makers.",
                metrics: "Redução de 67% em technical debt e establishment de 2.3s competitive advantage"
            },
            {
                phase: "Business Intelligence Acceleration",
                actions: [
                    "Implementação de revenue attribution tracking down to individual optimizations",
                    "Setup de predictive analytics para antecipação de performance issues",
                    "Criação de executive dashboard correlacionando technical metrics a business KPIs"
                ],
                insights: "Performance improvements têm compound effect - benefícios aumentam exponentially over time.",
                metrics: "ROI tracking mostra 12x return on optimization investment em 6 meses"
            }
        ],
        results: {
            technical: "-71% LCP",
            business: "+156% Conversão",
            strategic: "$2.3M ARR Impact"
        },
        timeline: "90 dias",
        exclusiveInsight: "Descobrimos que 80% do impact vem de otimizações que não aparecem em ferramentas padrão. Nossa methodology identifica performance psychology - como users percebem velocidade vs velocidade real. Esta descoberta mudou nossa approach e explica por que alguns sites 'rápidos' convertem mal."
    }

    return (
        <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Lock size={16} />
                        <span>Metodologia Proprietária</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        The ARCO Methodology™
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Framework proprietário que combina performance engineering com conversion psychology,
                        criando competitive moats através de otimizações que seus concorrentes não conseguem replicar.
                    </p>
                </motion.div>

                {/* Methodology Steps */}
                <div className="space-y-12 mb-20">
                    {methodologySteps.map((step, index) => (
                        <MethodologyStep
                            key={index}
                            phase={step.phase}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            techniques={step.techniques}
                            outcome={step.outcome}
                            delay={index * 0.2}
                        />
                    ))}
                </div>

                {/* Deep Case Study */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Case Study: Metodologia em Ação</h3>
                        <p className="text-lg text-slate-600">
                            Veja como aplicamos nosso framework para transformar performance em competitive advantage
                        </p>
                    </motion.div>

                    <DeepCaseStudy caseStudy={caseStudyExample} />
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            Pronto para implementar nossa metodologia em seu negócio?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Cada dia sem otimização é opportunity cost. Nossa metodologia já está provada.
                            O único question é: quando você vai começar a aplicá-la?
                        </p>
                        <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                            <span>Aplicar Metodologia ARCO</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
