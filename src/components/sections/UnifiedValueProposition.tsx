'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, AlertTriangle, Clock, Zap } from 'lucide-react'

/**
 * STRATEGIC INEVITABILITY FRAMEWORK
 * 
 * Transformação da value proposition em framework de inevitabilidade:
 * - Problem agitation (urgência)
 * - Frameworks proprietários (diferenciação)
 * - Competitive advantage (inevitabilidade)
 * - Strategic implications (C-level appeal)
 */

interface InevitabilityFactor {
    urgency: string
    title: string
    description: string
    framework: string
    competitiveGap: string
    strategicImplication: string
    delay?: number
}

const InevitabilityCard = ({
    urgency,
    title,
    description,
    framework,
    competitiveGap,
    strategicImplication,
    delay = 0
}: InevitabilityFactor) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-200 hover:border-orange-300 transition-all duration-500 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Urgency Indicator */}
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">{urgency}</span>
            </div>

            {/* Core Content */}
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>

            {/* Framework Badge */}
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {framework}
            </div>

            {/* Expansion Content */}
            <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="pt-4 border-t border-slate-200 space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                        <h5 className="font-bold text-red-900 mb-2">Competitive Gap:</h5>
                        <p className="text-red-800 text-sm">{competitiveGap}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-bold text-blue-900 mb-2">Strategic Implication:</h5>
                        <p className="text-blue-800 text-sm">{strategicImplication}</p>
                    </div>
                </div>
            </motion.div>

            {/* Expand Indicator */}
            <div className="flex items-center justify-center mt-4">
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                </motion.div>
            </div>
        </motion.div>
    )
}

export function UnifiedValueProposition() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const inevitabilityFactors: InevitabilityFactor[] = [
        {
            urgency: "CRITICAL URGENCY",
            title: "Performance Competitive Moats",
            description: "Enquanto seus concorrentes fazem 'otimizações', você estabelece barreiras técnicas defensáveis que tornam impossível sua competição igualar sua performance.",
            framework: "ARCO Performance Moat Framework™",
            competitiveGap: "87% das empresas B2B têm LCP > 3s. Clientes percebem sites lentos como 'menos profissionais' e 'tecnologicamente atrasados', impactando deals de alto valor.",
            strategicImplication: "Performance superior = perception de superioridade tecnológica = justificativa para premium pricing. Cada 100ms de advantage = 0.7% conversion increase compound.",
            delay: 0
        },
        {
            urgency: "MARKET INEVITABILITY",
            title: "Conversion Psychology Mastery",
            description: "Aplicação de neurociência comportamental para criar user experiences que guiam decisions de forma científica, não intuitiva.",
            framework: "ARCO Decision Engineering System™",
            competitiveGap: "95% das empresas usam 'best practices' genéricas. Você usará psychological triggers específicos para B2B decision makers, criando unfair advantage.",
            strategicImplication: "Understanding de como CEOs e CTOs tomam decisions online permite arquitetar experiences que aceleram sales cycles e aumentam deal sizes.",
            delay: 0.2
        },
        {
            urgency: "STRATEGIC IMPERATIVE",
            title: "Business Intelligence Advantage",
            description: "Transformação de website em strategic asset que gera business intelligence acionável, não apenas leads.",
            framework: "ARCO Intelligence Generation Engine™",
            competitiveGap: "Competidores medem 'traffic' e 'conversions'. Você medirá 'strategic insights', 'competitive positioning' e 'market intelligence' através de user behavior.",
            strategicImplication: "Website torna-se source de strategic intelligence que informa product development, pricing strategy, e market positioning - advantage impossible to replicate.",
            delay: 0.4
        }
    ]

    return (
        <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Problem Agitation Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Clock size={16} />
                        <span>Competitive Reality Check</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Enquanto seus concorrentes <span className="text-orange-600">otimizam websites</span>,
                        <br />você estará <span className="text-blue-600">dominando mercados</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        ARCO não é consultoria de performance. É <strong>strategic intelligence</strong> para
                        estabelecer competitive moats que seus concorrentes não conseguem replicar.
                        <br /><br />
                        <span className="text-orange-700 font-semibold">
                            Cada dia sem otimização = opportunity cost exponencial.
                        </span>
                    </p>
                </motion.div>

                {/* Inevitability Framework */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {inevitabilityFactors.map((factor, index) => (
                        <InevitabilityCard
                            key={index}
                            urgency={factor.urgency}
                            title={factor.title}
                            description={factor.description}
                            framework={factor.framework}
                            competitiveGap={factor.competitiveGap}
                            strategicImplication={factor.strategicImplication}
                            delay={factor.delay}
                        />
                    ))}
                </div>

                {/* Urgency Amplification */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="text-yellow-400" size={24} />
                        <span className="text-yellow-400 font-bold uppercase tracking-wider">Strategic Reality</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Seus concorrentes já estão investindo em performance
                    </h3>
                    <p className="text-slate-300 text-lg mb-6 max-w-3xl mx-auto">
                        A questão não é "se" você vai otimizar. É <strong>"quando"</strong> você vai começar
                        e <strong>"como"</strong> você vai estabelecer vantagem sustentável.
                        <br /><br />
                        ARCO acelera este processo de 18 meses para 90 dias.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-400 mb-2">18 meses</div>
                            <div className="text-slate-400">Approach tradicional</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">→</div>
                            <div className="text-slate-400">ARCO Acceleration</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">90 dias</div>
                            <div className="text-slate-400">Competitive advantage</div>
                        </div>
                    </div>                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all inline-flex items-center gap-2">
                        <span>Estabelecer Vantagem Agora</span>
                        <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
