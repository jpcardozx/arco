// Completely rewrite ProvenResults.tsx file
const fs = require('fs');

const filePath = 'c:/Users/João Pedro Cardozo/projetos/arco/src/components/sections/ProvenResults.tsx';

const cleanContent = `'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, DollarSign, TrendingUp, Zap, ExternalLink, CheckCircle, Target, Clock, Users } from 'lucide-react'
import { useState } from 'react'
import {
    Heading2,
    BodyLarge,
    Heading3,
    BodyRegular,
    Card,
    MotionContainer,
    Section,
    Grid,
    Button
} from '../../design-system/components'
import { SectionHeader, MetricCard } from '../shared'

interface CaseStudyResults {
    [key: string]: string
}

interface CaseStudy {
    title: string
    industry: string
    challenge: string
    solution: string
    methodology: string
    results: CaseStudyResults
    roi: string
    testimonial: string
    color: string
    caseStudyUrl: string
    timeframe: string
}

export function ProvenResults() {
    const [activeCase, setActiveCase] = useState(0)

    const caseStudies: CaseStudy[] = [
        {
            title: 'TechFlow Solutions',
            industry: 'Plataforma B2B SaaS • 420 funcionários',
            challenge: 'Perdendo R$ 1,2M anualmente devido à infraestrutura cloud ineficiente e perdendo 34% dos clientes por problemas de performance.',
            solution: 'Auditoria completa de infraestrutura e otimização de performance: Queries de banco otimizadas, CDN implementada e realocação de recursos.',
            methodology: 'ARCO Insight (2 semanas) → Sprint PoV Focado (45 dias) → Implementação Retainer Gold',
            results: {
                'Receita Recuperada': '+R$ 1,4M ARR',
                'Redução de Custos': '-38% gasto infraestrutura',
                'Ganho Performance': '4.2s → 1.1s tempo carregamento',
                'Retenção Clientes': '+52% taxa retenção'
            },
            roi: '340%',
            testimonial: '"ARCO identificou R$ 1,4M em perdas ocultas que nem sabíamos que existiam. O ROI foi evidente em 60 dias." - VP Engenharia, TechFlow',
            color: 'from-emerald-600 to-emerald-700',
            caseStudyUrl: '/cases/techflow',
            timeframe: '90 dias total'
        },
        {
            title: 'FinanceCore Systems',
            industry: 'Serviços Financeiros • 650 funcionários',
            challenge: 'Onboarding complexo de 9 etapas causando 42% de abandono e gerando R$ 90k mensais de overhead de suporte.',
            solution: 'Reengenharia completa da jornada do usuário: Simplificação para 3 etapas com automação inteligente e coleta progressiva.',
            methodology: 'Sprint PoV Intensivo → Retainer Silver para implementação e otimização',
            results: {
                'Aumento Conversão': '+89% conclusão onboarding',
                'Redução Suporte': '-64% volume tickets',
                'Impacto Receita': '+R$ 975k MRR do funil',
                'Automação Processo': '73% tarefas manuais automatizadas'
            },
            roi: '285%',
            testimonial: '"A transformação do onboarding se pagou sozinha em 2 meses. Resultados absolutamente transformadores." - Head de Produto, FinanceCore',
            color: 'from-blue-600 to-blue-700',
            caseStudyUrl: '/cases/financecore',
            timeframe: '75 dias total'
        },
        {
            title: 'LogiStack Marketplace',
            industry: 'Marketplace B2B • 380 funcionários',
            challenge: 'Desperdiçando R$ 160k mensais em recursos cloud superdimensionados enquanto performance degradava UX.',
            solution: 'Reformulação completa da arquitetura: Otimização banco de dados, implementação cache inteligente e alocação eficiente.',
            methodology: 'ARCO Insight profundo → Retainer Platinum para transformação completa',
            results: {
                'Economia Mensal': 'R$ 140k redução custos',
                'Performance API': '+127% velocidade resposta',
                'Confiabilidade Sistema': '99.2% → 99.8% uptime',
                'Eficiência Recursos': '-68% utilização'
            },
            roi: '425%',
            testimonial: '"R$ 1,68M economia anual enquanto melhorava drasticamente a performance. ARCO entregou muito além das expectativas." - CTO, LogiStack',
            color: 'from-purple-600 to-purple-700',
            caseStudyUrl: '/cases/logistack',
            timeframe: '60 dias implementação'
        }
    ]

    const impactMetrics = [
        {
            icon: DollarSign,
            label: 'Impacto Médio de Receita',
            value: 'R$ 1,4M',
            description: 'Por projeto mid-market',
            highlight: 'ROI documentado em 90 dias'
        },
        {
            icon: TrendingUp,
            label: 'Taxa de Sucesso',
            value: '96%',
            description: 'Projetos excedem metas ROI',
            highlight: 'Zero resultados negativos'
        },
        {
            icon: Target,
            label: 'Empresas Transformadas',
            value: '47',
            description: 'Empresas mid-market',
            highlight: '94% continuam engajamento'
        },
        {
            icon: Clock,
            label: 'Tempo para Valor',
            value: '<45 dias',
            description: 'Primeiro impacto mensurável',
            highlight: '3x mais rápido que consultoria tradicional'
        }
    ]

    return (
        <Section background="white" id="proven-results">
            <SectionHeader
                title="Impacto Documentado para Líderes Mid-Market"
                subtitle="Transformações reais de empresas mid-market que capturaram receita oculta através de melhorias sistemáticas de eficiência operacional. Todos os resultados auditados por empresas terceirizadas."
                className="mb-16"
            />

            <MotionContainer delay={0.2} duration={0.8} className="mb-20">
                <Grid cols={4} gap="lg">
                    {impactMetrics.map((metric, index) => (
                        <MetricCard
                            key={index}
                            icon={metric.icon}
                            value={metric.value}
                            label={metric.label}
                            description={metric.description}
                            highlight={metric.highlight}
                        />
                    ))}
                </Grid>
            </MotionContainer>

            <MotionContainer delay={0.4} duration={0.8}>
                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-4">
                        {caseStudies.map((study, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveCase(index)}
                                className={\`w-full text-left p-6 rounded-xl border transition-all duration-300 \${
                                    activeCase === index
                                        ? 'bg-gradient-to-r ' + study.color + ' text-white border-transparent'
                                        : 'bg-white hover:bg-neutral-50 border-neutral-200'
                                }\`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className={\`font-semibold \${
                                        activeCase === index ? 'text-white' : 'text-neutral-900'
                                    }\`}>
                                        {study.title}
                                    </h3>
                                    <span className={\`text-2xl font-bold \${
                                        activeCase === index ? 'text-white' : 'text-emerald-600'
                                    }\`}>
                                        {study.roi}
                                    </span>
                                </div>
                                <p className={\`text-sm \${
                                    activeCase === index ? 'text-white/90' : 'text-neutral-600'
                                }\`}>
                                    {study.industry}
                                </p>
                                <p className={\`text-xs mt-2 \${
                                    activeCase === index ? 'text-white/80' : 'text-neutral-500'
                                }\`}>
                                    {study.timeframe}
                                </p>
                            </motion.button>
                        ))}
                    </div>

                    <div className="lg:col-span-8">
                        <motion.div
                            key={activeCase}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
                        >
                            <div className={\`bg-gradient-to-r \${caseStudies[activeCase].color} p-8 text-white\`}>
                                <h2 className="text-3xl font-bold mb-2">{caseStudies[activeCase].title}</h2>
                                <p className="text-white/90 mb-4">{caseStudies[activeCase].industry}</p>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 rounded-lg px-4 py-2">
                                        <span className="text-sm font-medium">ROI: {caseStudies[activeCase].roi}</span>
                                    </div>
                                    <div className="bg-white/20 rounded-lg px-4 py-2">
                                        <span className="text-sm font-medium">{caseStudies[activeCase].timeframe}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                            <Target className="w-4 h-4 text-red-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-neutral-900">Desafio</h3>
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {caseStudies[activeCase].challenge}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-neutral-900">Solução</h3>
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed mb-4">
                                        {caseStudies[activeCase].solution}
                                    </p>
                                    <div className="bg-neutral-50 rounded-lg p-4">
                                        <p className="text-sm text-neutral-700 font-medium">
                                            Metodologia: {caseStudies[activeCase].methodology}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <BarChart3 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-neutral-900">Resultados</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(caseStudies[activeCase].results).map(([key, value]) => (
                                            <div key={key} className="bg-neutral-50 rounded-lg p-4">
                                                <p className="text-sm text-neutral-600 mb-1">{key}</p>
                                                <p className="text-lg font-bold text-neutral-900">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                                    <p className="text-neutral-700 italic mb-3">
                                        {caseStudies[activeCase].testimonial}
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="primary" className="flex items-center gap-2">
                                        Ver Caso Completo
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary">
                                        Agendar Conversa
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </MotionContainer>
        </Section>
    )
}`;

try {
    fs.writeFileSync(filePath, cleanContent, 'utf8');
    console.log('✅ ProvenResults.tsx completely rewritten successfully!');
} catch (error) {
    console.error('❌ Error rewriting ProvenResults.tsx:', error);
}
