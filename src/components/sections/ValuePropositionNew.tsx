'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, DollarSign, Target, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import {
    Heading2,
    BodyLarge,
    Heading3,
    BodyRegular,
    Card,
    MotionContainer,
    Section,
    Grid
} from '../../design-system/components'

export function ValueProposition() {
    const frameworks = [
        {
            icon: Target,
            title: 'Insight',
            duration: '3-5 dias',
            price: 'R$ 2.500',
            description: 'Análise completa de performance e oportunidades do seu negócio digital',
            deliverable: 'Relatório estratégico de 15-20 páginas',
            color: 'from-emerald-500 to-teal-600',
            features: [
                'Auditoria completa de Web Vitals',
                'Análise de infraestrutura cloud',
                'Assessment de performance técnica',
                'Relatório detalhado com recomendações'
            ]
        },
        {
            icon: Zap,
            title: 'POV',
            duration: '10-15 dias',
            price: 'R$ 8.500',
            description: 'Implementação de uma solução específica com garantia de resultado',
            deliverable: 'Solução implementada e funcionando',
            color: 'from-blue-500 to-blue-600',
            features: [
                'Foco em um problema específico',
                'Implementação hands-on',
                'Resultado garantido',
                'Metodologia de impacto em KPIs'
            ]
        },
        {
            icon: TrendingUp,
            title: 'Retainers',
            duration: 'Contrato trimestral',
            price: 'A partir de R$ 15.000/mês',
            description: 'Otimização contínua e consultoria especializada',
            deliverable: 'Melhoria contínua de performance',
            color: 'from-purple-500 to-indigo-600',
            features: [
                'Otimização contínua de performance',
                'Bônus por performance atingida',
                'Auditoria trimestral completa',
                'Mix sênior/júnior estratégico'
            ]
        }
    ]

    const differentiators = [
        {
            icon: Clock,
            title: 'Velocidade de Execução',
            description: 'Entregamos resultados mensuráveis em tempo recorde',
            metric: '3x mais rápido'
        },
        {
            icon: DollarSign,
            title: 'ROI Comprovado',
            description: 'Nossos clientes veem retorno médio de 400% em 6 meses',
            metric: '400% ROI médio'
        },
        {
            icon: CheckCircle, title: 'Expertise Técnica',
            description: 'Combinamos conhecimento técnico profundo com visão estratégica',
            metric: '10+ anos de experiência'
        }
    ]

    return (
        <Section background="slate" id="value-proposition">
            {/* Section Header */}
            <MotionContainer className="text-center mb-16">
                <Heading2 className="mb-6">
                    Frameworks de Transformação Digital
                </Heading2>
                <BodyLarge className="max-w-3xl mx-auto">
                    Metodologias comprovadas que entregam resultados mensuráveis para o seu negócio
                </BodyLarge>
            </MotionContainer>

            {/* Framework Steps */}
            <Grid cols={3} gap="lg" className="mb-20">
                {frameworks.map((framework, index) => (
                    <MotionContainer
                        key={index}
                        className="relative"
                        delay={index * 0.2}
                        duration={0.8}
                    >
                        <Card variant="elevated" className="p-8 h-full">
                            {/* Icon and Badge */}
                            <div className="flex items-center justify-between mb-6">
                                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${framework.color} rounded-xl`}>
                                    <framework.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-slate-600">{framework.duration}</div>
                                    <div className="text-lg font-bold text-slate-900">{framework.price}</div>
                                </div>
                            </div>

                            {/* Content */}
                            <Heading3 className="mb-3 text-xl">{framework.title}</Heading3>
                            <BodyRegular className="mb-4">{framework.description}</BodyRegular>

                            {/* Features */}
                            <div className="mb-6">
                                <ul className="space-y-2">
                                    {framework.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                            <span className="text-sm text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Deliverable */}
                            <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
                                <div className="text-sm font-medium text-slate-700 mb-1">Entregável:</div>
                                <div className="text-sm text-slate-600">{framework.deliverable}</div>
                            </div>
                        </Card>

                        {/* Connection Arrow */}
                        {index < frameworks.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4 text-blue-500" />
                                </div>
                            </div>
                        )}
                    </MotionContainer>
                ))}
            </Grid>

            {/* Competitive Advantages */}
            <MotionContainer delay={0.6} duration={0.8}>
                <Card className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-white">
                    <div className="text-center mb-12">
                        <Heading3 className="text-white mb-4">
                            Por que ARCO vs. Agências e Consultorias?
                        </Heading3>
                        <BodyLarge className="text-blue-100 max-w-2xl mx-auto">
                            Ocupamos o vácuo competitivo entre agilidade de agências e profundidade de consultorias.
                        </BodyLarge>
                    </div>

                    <Grid cols={3} gap="md">
                        {differentiators.map((diff, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
                                    <diff.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-xl font-bold mb-2">{diff.title}</div>
                                <div className="text-blue-300 font-semibold text-lg mb-2">{diff.metric}</div>
                                <div className="text-blue-100 leading-relaxed text-sm">{diff.description}</div>
                            </motion.div>
                        ))}
                    </Grid>
                </Card>
            </MotionContainer>

            {/* Value Architecture */}
            <MotionContainer className="mt-20 text-center" delay={1} duration={0.8}>
                <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full px-8 py-4 border border-emerald-200/50">
                    <div className="text-emerald-600 font-bold text-lg mr-6">Arquitetura de Valor:</div>
                    <div className="flex items-center space-x-4 text-sm font-medium text-slate-700">
                        <span className="bg-emerald-100 px-3 py-1 rounded-full">Capture</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="bg-blue-100 px-3 py-1 rounded-full">Expand</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="bg-purple-100 px-3 py-1 rounded-full">Sustain</span>
                    </div>
                </div>
            </MotionContainer>
        </Section>
    )
}
