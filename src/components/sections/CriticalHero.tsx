'use client'

import { memo } from 'react'

// Hero ultra-otimizado - zero JavaScript desnecessário
export const CriticalHero = memo(function CriticalHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-red-950/20 overflow-hidden">
            {/* Background Pattern Sutil */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(239,68,68,0.1),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.05),transparent_60%)]" />
            </div>

            {/* Grid Pattern Profissional */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 z' fill='none' stroke='%23ffffff' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`
                }} />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">                {/* Título Principal - Problema Real */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    <span className="block text-red-400">4 segundos</span>
                    <span className="block">para perder um cliente</span>
                </h1>

                {/* Proposta de Valor Específica */}
                <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Identificamos os <strong className="text-white">12 problemas exatos</strong> que fazem visitantes abandonarem seu site.
                    <br className="hidden md:block" />
                    Corrigimos em <strong className="text-green-400">2 semanas</strong> ou devolvemos o dinheiro.
                </p>                {/* Prova Social com Dados Reais */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-green-400">2.1s</div>
                            <div className="text-sm text-slate-300">Tempo médio que<br />testamos sites</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-red-400">27%</div>
                            <div className="text-sm text-slate-300">Abandono a cada<br />segundo extra</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-blue-400">R$ 47k</div>
                            <div className="text-sm text-slate-300">Perda média mensal<br />sites de e-commerce</div>
                        </div>
                    </div>
                </div>                {/* CTAs com Progressão de Valor */}
                <div className="space-y-6">
                    {/* CTA Principal */}
                    <div className="space-y-3">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl w-full md:w-auto justify-center"
                            onClick={() => {
                                // Track specific action
                                window.gtag?.('event', 'cta_primary_click', {
                                    event_category: 'engagement',
                                    event_label: 'analyze_site_free'
                                });
                                window.location.href = '/diagnose';
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ver os 3 Maiores Problemas do Meu Site
                        </button>
                        <p className="text-slate-300 text-sm">
                            ⚡ Análise em 30 segundos • 🎯 Problemas específicos • 💰 Impacto em reais
                        </p>
                    </div>

                    {/* CTAs Secundários */}
                    <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                        <button
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 border border-white/20"
                            onClick={() => {
                                window.gtag?.('event', 'cta_secondary_click', {
                                    event_category: 'engagement',
                                    event_label: 'download_checklist'
                                });
                                // Trigger download
                            }}
                        >
                            📋 Baixar Checklist Gratuito
                        </button>

                        <button
                            className="text-slate-300 hover:text-white px-6 py-3 font-medium transition-colors duration-200 inline-flex items-center gap-2"
                            onClick={() => {
                                window.gtag?.('event', 'cta_tertiary_click', {
                                    event_category: 'engagement',
                                    event_label: 'see_case_studies'
                                });
                                document.querySelector('[data-section="case-studies"]')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Ver Casos Reais
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>            {/* Credibilidade Badge Melhorado */}
            <div className="absolute bottom-6 left-6 bg-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-green-400/20 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    Este site: 0.6s • Score 98/100
                </div>
            </div>

            {/* Selo de Garantia */}
            <div className="absolute bottom-6 right-6 bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-blue-400/20 shadow-lg">
                💎 Garantia 100% ou dinheiro de volta
            </div>
        </section>
    )
})

export default CriticalHero
