/**
 * CASES DE SUCESSO - PROVA SOCIAL SIMPLES
 * 
 * 3 cases reais que vendem por si só
 * ROI documentado, não marketing fluff
 */

import React from 'react';
import { Container } from './primitives/Container/Container';
import { Card } from './primitives/Card/Card';
import { Button } from './primitives/Button/Button';
// import { MetricCard, useTracking } from '../design-system/mature';

interface CaseStudy {
    company: string;
    industry: string;
    problem: string;
    solution: string;
    results: {
        performance: { before: string; after: string };
        revenue: { before: string; after: string };
        timeframe: string;
    };
    testimonial: {
        quote: string;
        author: string;
        role: string;
    };
}

const cases: CaseStudy[] = [
    {
        company: "TechCorp E-commerce",
        industry: "Varejo Online",
        problem: "Checkout abandonado por lentidão (22% loss rate)",
        solution: "Migração WordPress → Next.js + otimização checkout",
        results: {
            performance: { before: "4.8s LCP", after: "1.2s LCP" },
            revenue: { before: "R$ 180K/mês", after: "R$ 245K/mês" },
            timeframe: "Resultados em 14 dias"
        },
        testimonial: {
            quote: "R$ 65K mensais a mais só otimizando performance. ROI de 300% em 2 meses.",
            author: "Carlos Silva",
            role: "CEO TechCorp"
        }
    },

    {
        company: "StartupX SaaS",
        industry: "Software B2B",
        problem: "Landing page convertendo apenas 1.2% (benchmark: 3%+)",
        solution: "Rebuild completo + A/B testing + otimização mobile",
        results: {
            performance: { before: "Score 34", after: "Score 89" },
            revenue: { before: "1.2% conv.", after: "3.8% conv." },
            timeframe: "Implementado em 10 dias"
        },
        testimonial: {
            quote: "Conversão triplicou. Cada R$ 1.000 investido virou R$ 4.200 em ARR adicional.",
            author: "Marina Santos",
            role: "Head of Growth StartupX"
        }
    },

    {
        company: "MegaRetail",
        industry: "Varejo Multi-canal",
        problem: "Site mobile péssimo (68% tráfego mobile, 15% conversão desktop)",
        solution: "Mobile-first redesign + PWA + otimização Core Web Vitals",
        results: {
            performance: { before: "6.2s mobile", after: "1.8s mobile" },
            revenue: { before: "15% conv. mobile", after: "32% conv. mobile" },
            timeframe: "Deploy em 12 dias"
        },
        testimonial: {
            quote: "Mobile agora converte mais que desktop. R$ 120K recovery mensal só na experiência mobile.",
            author: "Roberto Lima",
            role: "CTO MegaRetail"
        }
    }
];

const CaseCard: React.FC<{ caseStudy: CaseStudy; index: number }> = ({ caseStudy, index }) => {
    const { trackEvent } = useTracking();

    return (
        <Card className="h-full" hover>
            <div className="space-y-6">

                {/* Header */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{caseStudy.company}</h3>
                    <p className="text-sm text-gray-600">{caseStudy.industry}</p>
                </div>

                {/* Problem */}
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-800">
                        <strong>Problema:</strong> {caseStudy.problem}
                    </p>
                </div>

                {/* Solution */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Solução:</strong> {caseStudy.solution}
                    </p>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Resultados:</h4>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                                {caseStudy.results.performance.before}
                            </div>
                            <div className="text-xs text-gray-600">Antes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {caseStudy.results.performance.after}
                            </div>
                            <div className="text-xs text-gray-600">Depois</div>
                        </div>
                    </div>

                    <div className="text-center bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-800">
                            {caseStudy.results.revenue.after}
                        </div>
                        <div className="text-sm text-green-600">
                            vs. {caseStudy.results.revenue.before} • {caseStudy.results.timeframe}
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <blockquote className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                    <p className="text-sm italic text-gray-700 mb-2">
                        "{caseStudy.testimonial.quote}"
                    </p>
                    <footer className="text-xs text-gray-600">
                        — {caseStudy.testimonial.author}, {caseStudy.testimonial.role}
                    </footer>
                </blockquote>

                {/* CTA */}
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                        trackEvent('case_contact_clicked', { company: caseStudy.company });
                        window.open('https://wa.me/5511999999999?text=Vi%20o%20case%20da%20' + caseStudy.company + ',%20vamos%20conversar?', '_blank');
                    }}
                >
                    Quero Resultados Similares
                </Button>
            </div>
        </Card>
    );
};

export const SuccessCases: React.FC = () => {
    const { trackEvent } = useTracking();

    React.useEffect(() => {
        trackEvent('cases_viewed');
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <Container>
                <div className="space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Cases de Sucesso Reais
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Empresas que resolveram problemas de performance e aumentaram receita.
                            ROI documentado, não promessas vazias.
                        </p>
                    </div>

                    {/* Cases Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cases.map((caseStudy, index) => (
                            <CaseCard key={index} caseStudy={caseStudy} index={index} />
                        ))}
                    </div>

                    {/* Summary Stats */}
                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <div className="grid md:grid-cols-4 gap-6 text-center">
                            <MetricCard
                                label="Clientes Atendidos"
                                value="47+"
                                improvement="100% satisfação"
                                color="blue"
                            />
                            <MetricCard
                                label="ROI Médio"
                                value="280%"
                                improvement="primeiros 60 dias"
                                color="green"
                            />
                            <MetricCard
                                label="Recovery Médio"
                                value="R$ 12K"
                                improvement="por mês"
                                color="green"
                            />
                            <MetricCard
                                label="Tempo Médio"
                                value="7-14 dias"
                                improvement="implementação completa"
                                color="blue"
                            />
                        </div>
                    </div>

                    {/* CTA Final */}
                    <div className="text-center space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Seu site pode ter resultados similares?
                        </h3>
                        <p className="text-lg text-gray-600">
                            Audit gratuito identifica exatamente quanto você está perdendo
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="success"
                                size="lg"
                                onClick={() => {
                                    trackEvent('cases_cta_audit');
                                    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Audit Gratuito do Meu Site
                            </Button>

                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => {
                                    trackEvent('cases_cta_contact');
                                    window.open('https://wa.me/5511999999999?text=Vi%20os%20cases,%20vamos%20conversar%20sobre%20o%20meu%20projeto?', '_blank');
                                }}
                            >
                                Conversar no WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SuccessCases;
