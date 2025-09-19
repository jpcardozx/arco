/**
 * HERO SECTION MADURO - FOCO EM CONVERSÃO
 * 
 * Hero simples que vende, não que impressiona
 * Problema → Solução → Prova → Ação
 */

import React, { useState, useEffect } from 'react';
import { Button } from './primitives/Button/Button';
import { Container } from './primitives/Container/Container';
// import { MetricCard, useTracking } from '../design-system/mature';

interface HeroProps {
    onAuditClick?: () => void;
    onContactClick?: () => void;
}

// === COPY CONSULTIVO ===
const heroCopy = {
    headline: "Seu site está perdendo R$ 8.000+ mensais",
    subheadline: "Performance ruim = clientes indo para concorrentes. Resolvo em 7 dias com ROI garantido.",

    problems: [
        "Checkout abandonado por lentidão (18% loss rate)",
        "Mobile carregando 4+ segundos (35% bounce)",
        "Google penalizando SEO por Core Web Vitals ruins"
    ],

    solution: "Migração Next.js + otimização completa em 1 semana",

    proof: {
        metric1: { label: "Clientes atendidos", value: "47+", improvement: "100% satisfação" },
        metric2: { label: "ROI médio", value: "280%", improvement: "em 60 dias" },
        metric3: { label: "Recovery médio", value: "R$ 12K", improvement: "por mês" }
    },

    cta: {
        primary: "Audit Gratuito Agora",
        secondary: "Ver Cases de Sucesso"
    }
};

// === AUDIT AUTOMÁTICO ===
const useWebsiteAudit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    const runAudit = async (domain: string) => {
        setIsLoading(true);

        // Simular audit (em produção: chamada real para Lighthouse API)
        setTimeout(() => {
            const mockResults = {
                domain,
                performance: Math.floor(Math.random() * 40) + 30, // 30-70
                lcp: (Math.random() * 3 + 2).toFixed(1), // 2-5s
                monthlyLoss: Math.floor(Math.random() * 10000 + 5000), // R$ 5-15K
                issues: [
                    'Checkout com 4.2s de carregamento',
                    'Imagens não otimizadas (+2MB)',
                    'JavaScript bloqueando render'
                ]
            };

            setResults(mockResults);
            setIsLoading(false);
        }, 2000);
    };

    return { runAudit, isLoading, results };
};

// === HERO COMPONENT ===
export const MatureHero: React.FC<HeroProps> = ({ onAuditClick, onContactClick }) => {
    const { trackEvent } = useTracking();
    const { runAudit, isLoading, results } = useWebsiteAudit();
    const [domain, setDomain] = useState('');

    const handleAuditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain) return;

        trackEvent('audit_started', { domain });
        runAudit(domain);
        onAuditClick?.();
    };

    useEffect(() => {
        trackEvent('hero_viewed');
    }, []);

    return (
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen flex items-center">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Content Side */}
                    <div className="space-y-8">

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold leading-tight">
                                {heroCopy.headline}
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {heroCopy.subheadline}
                            </p>
                        </div>

                        {/* Problems */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-red-400">
                                Problemas que identifico frequentemente:
                            </h3>
                            {heroCopy.problems.map((problem, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                                    <p className="text-gray-300">{problem}</p>
                                </div>
                            ))}
                        </div>

                        {/* Solution */}
                        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">
                                ✅ Solução completa:
                            </h3>
                            <p className="text-gray-300">{heroCopy.solution}</p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="success"
                                size="lg"
                                onClick={() => {
                                    trackEvent('cta_audit_clicked');
                                    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {heroCopy.cta.primary}
                            </Button>

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => {
                                    trackEvent('cta_cases_clicked');
                                    onContactClick?.();
                                }}
                            >
                                {heroCopy.cta.secondary}
                            </Button>
                        </div>
                    </div>

                    {/* Audit Tool Side */}
                    <div className="space-y-6">

                        {/* Proof Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                            <MetricCard {...heroCopy.proof.metric1} color="green" />
                            <MetricCard {...heroCopy.proof.metric2} color="blue" />
                            <MetricCard {...heroCopy.proof.metric3} color="green" />
                        </div>

                        {/* Audit Form */}
                        <div id="audit-form" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                Audit Gratuito do Seu Site
                            </h3>

                            <form onSubmit={handleAuditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        URL do seu site:
                                    </label>
                                    <input
                                        type="url"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        placeholder="https://seusite.com.br"
                                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                        required
                                    />
                                </div>

                                <Button
                                    variant="success"
                                    size="lg"
                                    className="w-full"
                                    onClick={() => handleAuditSubmit({ preventDefault: () => { } } as React.FormEvent)}
                                >
                                    {isLoading ? 'Analisando...' : 'Analisar Agora (Grátis)'}
                                </Button>
                            </form>

                            {/* Results */}
                            {results && (
                                <div className="mt-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                                    <h4 className="font-semibold text-red-400 mb-3">
                                        🚨 Problemas identificados em {results.domain}:
                                    </h4>

                                    <div className="space-y-2 mb-4">
                                        {results.issues.map((issue: string, index: number) => (
                                            <p key={index} className="text-sm text-gray-300">• {issue}</p>
                                        ))}
                                    </div>

                                    <div className="bg-red-800/30 p-3 rounded">
                                        <p className="text-lg font-bold text-red-300">
                                            💸 Estimativa de perda: R$ {results.monthlyLoss.toLocaleString()}/mês
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Performance atual: {results.performance}/100 | LCP: {results.lcp}s
                                        </p>
                                    </div>

                                    <Button
                                        variant="success"
                                        size="md"
                                        className="w-full mt-4"
                                        onClick={() => {
                                            trackEvent('audit_contact_clicked', results);
                                            window.open('https://wa.me/5511999999999?text=Vi%20o%20audit%20do%20meu%20site,%20vamos%20conversar?', '_blank');
                                        }}
                                    >
                                        Resolver Agora → R$ {Math.floor(results.monthlyLoss * 0.8).toLocaleString()} recovery/mês
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default MatureHero;
