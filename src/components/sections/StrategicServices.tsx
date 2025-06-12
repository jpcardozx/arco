'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ArrowRight, Clock, DollarSign, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'

// Strategic services aligned with business plan pricing
export function StrategicServices() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const services = [
        {
            tier: 'DIAGNÓSTICO',
            name: 'Análise de Performance Digital',
            price: 'R$ 7.500',
            priceNote: 'Crédito total aplicável aos serviços subsequentes',
            timeframe: '5-10 dias úteis',
            description: 'Identificação precisa dos pontos de perda de receita na sua experiência digital, com mapeamento completo dos gargalos técnicos e de usabilidade.',
            deliverables: [
                'Avaliação completa da performance digital',
                'Relatório detalhado com oportunidades quantificadas',
                'Vídeo explicativo personalizado da análise',
                'Export de dados para integração com sistemas internos',
                'Roadmap priorizado por impacto vs esforço'
            ],
            creditableToward: 'Valor integralmente creditável para projetos subsequentes',
            icon: BarChart3,
            popular: false, cta: 'Solicitar Diagnóstico',
            href: '/contato'
        },
        {
            tier: 'PILOTO',
            name: 'Projeto Piloto - Correção Estratégica',
            price: 'R$ 35.000',
            priceNote: 'Desconto de R$ 7.500 com diagnóstico prévio',
            timeframe: '15-30 dias úteis',
            description: 'Implementação focada nos 3 principais pontos de atrito identificados, com garantia de resultados mensuráveis em conversões e performance.',
            deliverables: [
                'Substituição de elementos críticos de baixa performance',
                'Otimização avançada de conversão nos pontos-chave',
                'Implementação de cache e otimizações de velocidade',
                'Deploy seguro com rollback automático',
                'Testes A/B para validação de melhorias'
            ],
            guarantee: 'Garantia de 15% de melhoria ou reembolso integral',
            icon: Zap,
            popular: true,
            cta: 'Iniciar Projeto Piloto',
            href: '/contato'
        },
        {
            tier: 'ESCALA',
            name: 'Transformação Digital Completa',
            price: 'R$ 120.000',
            priceNote: 'Desconto de R$ 7.500 com diagnóstico prévio',
            timeframe: '60-90 dias úteis',
            description: 'Reconstrução completa da experiência digital com foco em máxima performance, conversão e escalabilidade para crescimento sustentável.',
            deliverables: [
                'Rebuild completo da arquitetura digital',
                'SEO técnico e otimização para motores de busca',
                'Performance otimizada para Core Web Vitals',
                'Treinamento completo da equipe interna',
                'Plano de manutenção e atualizações'
            ],
            guarantee: 'Garantia de ROI positivo em 90 dias ou reembolso',
            icon: DollarSign,
            popular: false,
            cta: 'Planejar Transformação',
            href: '/contato'
        },
        {
            tier: 'RETAINER',
            name: 'Gestão Contínua de Performance',
            price: 'R$ 25.000/mês',
            priceNote: 'Contrato mínimo de 12 meses',
            timeframe: 'Serviço contínuo',
            description: 'Monitoramento, otimização e melhorias contínuas para manter sua performance digital sempre no pico, com relatórios mensais de ROI.',
            deliverables: [
                'Otimizações mensais baseadas em dados',
                'Testes CRO (Conversion Rate Optimization)',
                'Monitoramento 24/7 de performance',
                'Relatórios executivos mensais',
                'Suporte técnico prioritário'
            ],
            guarantee: 'Garantia de melhoria contínua mensal ou cancelamento',
            icon: Clock,
            popular: false,
            cta: 'Contratar Retainer',
            href: '/contato'
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>                        <span className="text-sm font-semibold text-blue-700">
                            Serviços Estratégicos
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        ROI-Driven{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Service Tiers
                        </span>
                    </h2>                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Soluções personalizadas baseadas em ROI comprovado para transformar sua performance digital em resultados financeiros mensuráveis.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-white rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${service.popular
                                ? 'border-blue-500 ring-4 ring-blue-100'
                                : 'border-gray-200 hover:border-blue-300'
                                }`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            {service.popular && (
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                {/* Service Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                        {React.createElement(service.icon, { className: "w-8 h-8 text-white" })}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-blue-600 mb-1">
                                            {service.tier}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {service.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="mb-6">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {service.price}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {service.priceNote} • {service.timeframe}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Deliverables */}
                                <div className="mb-8">
                                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                                    <ul className="space-y-3">
                                        {service.deliverables.map((deliverable, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Guarantee */}
                                {service.guarantee && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-800">Guarantee</span>
                                        </div>
                                        <p className="text-green-700 text-sm">{service.guarantee}</p>
                                    </div>
                                )}

                                {/* CTA */}
                                <Link
                                    href={service.href}
                                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${service.popular
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                                        }`}
                                >
                                    {service.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Design System CTA */}
                <motion.div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >                    <h3 className="text-2xl font-bold mb-4">
                        Precisa de um Design System Personalizado?
                    </h3>
                    <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                        Criamos design systems escaláveis que aceleram o desenvolvimento e garantem consistência visual em todos os pontos de contato.
                    </p>
                    <Link
                        href="/design-system"
                        className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300"
                    >
                        Explorar Design Systems
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
