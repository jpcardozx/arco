'use client'

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

    const caseStudies: CaseStudy[] = [{
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
        color: 'from-purple-600 to-purple-700', caseStudyUrl: '/cases/logistack',
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
            {/* Section Header */}
            <SectionHeader
                title="Impacto Documentado para Líderes Mid-Market"
                subtitle="Transformações reais de empresas mid-market que capturaram receita oculta através de melhorias sistemáticas de eficiência operacional. Todos os resultados auditados por empresas terceirizadas."
                className="mb-16"
            />

            {/* Impact Metrics */}
            <MotionContainer delay={0.2} duration={0.8} className="mb-20">
                <Grid cols={4} gap="lg">
                    {impactMetrics.map((metric, index) => (
                        <MetricCard
                            key={index}
                            icon={metric.icon}
                            value={metric.value}
                            label={metric.label}
                            description={metric.description}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-600"
                            delay={0.3 + index * 0.1}
                            className="h-full hover:scale-105"
                        />
                    ))}
                </Grid>
            </MotionContainer>

            {/* Case Studies Navigation */}
            <MotionContainer delay={0.4} duration={0.8} className="mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                    {caseStudies.map((study, index) => (
                        <Button
                            key={index}
                            variant={activeCase === index ? "primary" : "outline"}
                            onClick={() => setActiveCase(index)}
                            className="transition-all duration-300 hover:scale-105"
                        >
                            {study.title.split(' ')[0]}
                        </Button>
                    ))}
                </div>
            </MotionContainer>

            {/* Active Case Study */}
            <MotionContainer delay={0.6} duration={0.5}>
                <motion.div
                    key={activeCase}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card variant="elevated" className="p-8 lg:p-12">
                        <Grid cols={2} gap="lg">                            {/* Case Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${caseStudies[activeCase].color} rounded-xl flex items-center justify-center`}>
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <Heading3 className="text-2xl">{caseStudies[activeCase].title}</Heading3>
                                        <BodyRegular className="text-slate-600">{caseStudies[activeCase].industry}</BodyRegular>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">Desafio Estratégico:</h4>
                                        <BodyRegular className="text-slate-700">{caseStudies[activeCase].challenge}</BodyRegular>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">Metodologia ARCO:</h4>
                                        <BodyRegular className="mb-3 text-slate-700">{caseStudies[activeCase].solution}</BodyRegular>
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="w-4 h-4 text-blue-600" />
                                                <span className="font-semibold text-blue-800">Framework Aplicado:</span>
                                            </div>
                                            <p className="text-blue-800 text-sm">{caseStudies[activeCase].methodology}</p>
                                        </div>
                                    </div>

                                    <Card className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                                            <span className="font-semibold text-emerald-800">ROI: {caseStudies[activeCase].roi}</span>
                                        </div>                                        <p className="text-emerald-700 text-sm">
                                            Executado em {caseStudies[activeCase].timeframe}
                                        </p>
                                    </Card>

                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className="w-1 h-8 bg-blue-500 rounded-full mt-1"></div>
                                            <div>
                                                <p className="text-slate-700 italic text-sm leading-relaxed">
                                                    {caseStudies[activeCase].testimonial}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            {/* Results */}
                            <div>
                                <Heading3 className="mb-6">Resultados Mensuráveis:</Heading3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {Object.entries(caseStudies[activeCase].results).map(([key, value], index) => (
                                        <Card key={key} className="text-center p-4 border border-slate-200/50 hover:shadow-md transition-shadow duration-300">
                                            <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
                                            <div className="text-sm text-slate-600">{key}</div>
                                        </Card>
                                    ))}
                                </div>

                                <Card className="bg-blue-50 border border-blue-200/50 p-6">
                                    <h5 className="font-semibold text-blue-900 mb-3">Metodologia Aplicada:</h5>                                    <ul className="space-y-2 text-blue-800 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Auditoria técnica abrangente (infraestrutura + performance)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Identificação de gargalos críticos com análise de impacto na receita</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Implementação priorizada por ROI e velocidade de execução</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Monitoramento contínuo e otimização iterativa</span>
                                        </li>
                                    </ul>
                                </Card>

                                <div className="mt-6">
                                    <Button
                                        variant="outline"
                                        className="w-full hover:scale-105 transition-transform duration-300"
                                        onClick={() => window.open(caseStudies[activeCase].caseStudyUrl, '_blank')}
                                    >
                                        <span>Ver Estudo de Caso Completo</span>
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Card>
                </motion.div>
            </MotionContainer>            {/* Strategic CTA */}
            <MotionContainer delay={0.8} duration={0.8} className="mt-16 text-center">
                <Card className="bg-gradient-to-r from-blue-50 via-emerald-50 to-blue-50 border-2 border-blue-200/50 p-8 hover:shadow-xl transition-shadow duration-300">
                    <Grid cols={2} gap="lg" className="items-center">
                        <div className="text-left">                            <Heading3 className="mb-3">
                            Pronto para Capturar sua Margem Digital Oculta?
                        </Heading3>
                            <BodyRegular className="text-slate-600 mb-4">
                                Comece com uma análise gratuita de 30 minutos. Identifique oportunidades de receita oculta em sua infraestrutura atual.
                            </BodyRegular>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    <span>Sem compromisso</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    <span>Resultados em 24h</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    <span>Apenas executivos sênior</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                size="lg"
                                variant="primary"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                onClick={() => window.open('/insight', '_blank')}
                            >
                                <span>Solicitar ARCO Insight (Grátis)</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>                            <p className="text-xs text-slate-500 mt-2">
                                Próximas vagas disponíveis: 15-20 Jan
                            </p>
                        </div>
                    </Grid>
                </Card>
            </MotionContainer>
        </Section>
    )
}
