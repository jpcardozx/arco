'use client'

import React, { useEffect } from 'react'
import NavBarEnhanced from '../../../components/NavBarEnhanced'
import FooterARCORevised from '../../../components/FooterARCORevised'
import { trackPageView, trackFunnelStep } from '../../../lib/analytics'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Gauge, TrendingUp } from 'lucide-react'

// Dynamic component for load optimization
const DeliverablesandTiers = dynamic(() => import('../../../components/diagnose/DeliverablesandTiers'), {
    loading: () => <div className="min-h-[60vh] bg-white animate-pulse" id="deliverables" />
});

export default function SolutionsPage() {
    useEffect(() => {
        // Track page view and funnel step
        trackPageView('solutions-page', {
            version: 'enhanced',
            designSystem: 'arco-design-v3'
        });

        trackFunnelStep('solutions', 'view', {
            entryPoint: document.referrer || 'direct'
        });
    }, []);

    return (
        <>
            <NavBarEnhanced />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-neutral-900 to-blue-900 text-white py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Soluções Personalizadas para Recuperação de Receita</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Implementações estratégicas com foco exclusivo em remover obstáculos técnicos que estão bloqueando sua receita.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                            <div className="h-14 w-14 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                                <Gauge className="h-7 w-7 text-white" />
                            </div>                            <h3 className="text-2xl font-bold mb-4">Quick Diagnostic</h3>
                            <p className="text-blue-100 mb-6">Discover exactly where you're losing customers and how much it's costing you in monthly revenue.</p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Friction point mapping</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Financial loss quantification</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Priority report</span>
                                </li>
                            </ul>                            <div className="mt-auto">
                                <span className="block text-2xl font-bold mb-4">$147</span>
                                <Link href="/diagnose" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                                    <span>Start diagnostic</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 transform md:scale-105 md:-translate-y-4 relative">
                            <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">Mais Popular</span>
                            </div>
                            <div className="h-14 w-14 bg-indigo-500 rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Pacote Essencial</h3>
                            <p className="text-blue-100 mb-6">Resolução dos 3 principais pontos de atrito técnico com maior impacto na sua receita.</p>
                            <ul className="space-y-2 mb-8">                                <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                <span>Complete diagnostic included</span>
                            </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Implementation within 5 business days</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>30-day monitoring</span>
                                </li>                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Financial impact report</span>
                                </li>
                            </ul>
                            <div className="mt-auto">
                                <span className="block text-2xl font-bold mb-4">$897</span>
                                <Link href="/contact" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors">
                                    <span>Schedule consultation</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                            <div className="h-14 w-14 bg-violet-500 rounded-lg flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Otimização Completa</h3>
                            <p className="text-blue-100 mb-6">Transformação abrangente da experiência do cliente com foco em conversão e retenção.</p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Tudo do Pacote Essencial</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Otimização de até 10 pontos de atrito</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Monitoramento por 90 dias</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>Treinamento para equipe técnica</span>
                                </li>
                            </ul>
                            <div className="mt-auto">                                <span className="block text-2xl font-bold mb-4">Custom</span>
                                <Link href="/contact" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                                    <span>Request proposal</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deliverables Section */}
            <DeliverablesandTiers />

            {/* Testimonial Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 max-w-6xl">                    <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">What our clients are saying</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Veja como nossas soluções transformaram os resultados de empresas como a sua.
                    </p>
                </div>

                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12 mb-12">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <div className="aspect-video bg-neutral-200 rounded-lg mb-4"></div>                                <h3 className="font-bold text-xl">TechZone Brasil</h3>
                                <p className="text-neutral-600">Electronics e-commerce</p>
                            </div>

                            <div className="md:w-2/3">                                <blockquote className="text-xl italic mb-6 text-neutral-700">
                                "We identified that 27% of our customers were abandoning the cart in the last step. ARCO implemented corrections that reduced this rate to only 8% in three weeks, generating a revenue increase of $43,000 monthly."
                            </blockquote>

                                <div className="flex items-center">
                                    <div className="h-12 w-12 bg-neutral-300 rounded-full mr-4"></div>
                                    <div>
                                        <p className="font-medium">Ricardo Mendes</p>
                                        <p className="text-sm text-neutral-500">E-commerce Director</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    <div className="flex justify-center">
                        <Link href="/case-studies" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                            <span>View more success stories</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-800 to-indigo-800 py-20 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Pronto para recuperar a receita que você está perdendo?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
                        Agende uma consultoria gratuita e descubra como podemos ajudar sua empresa a converter mais clientes, sem reconstruir toda a plataforma.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">                        <Link href="/contact" className="bg-white text-blue-800 hover:bg-blue-50 transition-colors py-4 px-8 rounded-lg font-medium">
                        Schedule free consultation
                    </Link>
                        <Link href="/diagnose" className="bg-blue-700 hover:bg-blue-600 text-white transition-colors py-4 px-8 rounded-lg font-medium">
                            Get quick diagnostic
                        </Link>
                    </div>
                </div>
            </section>

            <FooterARCORevised />
        </>
    )
}
