'use client'

import { useState, useEffect } from 'react'
import {
    Activity,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Users,
    DollarSign,
    Target,
    Eye,
    Phone,
    Briefcase,
    Globe
} from 'lucide-react'

interface PerformanceMetrics {
    totalVisitors: number
    totalLeads: number
    closedProjects: number
    conversionRate: number
    avgResponseTime: number
    satisfaction: number
}

interface ChartData {
    month: string
    visitors: number
    leads: number
    projects: number
}

export default function AnalyticsPage() {
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
    const [chartData, setChartData] = useState<ChartData[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

    useEffect(() => {
        loadAnalytics()
    }, [selectedPeriod])

    const loadAnalytics = async () => {
        setLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            setMetrics({
                totalVisitors: 12458,
                totalLeads: 234,
                closedProjects: 18,
                conversionRate: 15.3,
                avgResponseTime: 2.4,
                satisfaction: 4.7
            })

            setChartData([
                { month: 'Jan', visitors: 1200, leads: 45, projects: 3 },
                { month: 'Fev', visitors: 1850, leads: 52, projects: 4 },
                { month: 'Mar', visitors: 2100, leads: 68, projects: 5 },
                { month: 'Abr', visitors: 1650, leads: 41, projects: 2 },
                { month: 'Mai', visitors: 2400, leads: 78, projects: 6 },
                { month: 'Jun', visitors: 2850, leads: 89, projects: 8 }
            ])
        } catch (error) {
            console.error('Error loading analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="p-6 dark:bg-dark-950">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 dark:border-amber-400 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-dark-300">Carregando analytics...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 dark:bg-dark-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-100 flex items-center gap-3">
                            <Activity className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                            Performance & Analytics
                        </h1>
                        <p className="text-gray-600 dark:text-dark-300 mt-2">Acompanhe o desempenho e métricas do seu negócio</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value as any)}
                            className="px-3 py-2 border border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-dark-100"
                        >
                            <option value="7d">Últimos 7 dias</option>
                            <option value="30d">Últimos 30 dias</option>
                            <option value="90d">Últimos 90 dias</option>
                            <option value="1y">Último ano</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4"><Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" /><TrendingUp className="h-4 w-4 text-green-500" /></div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-1">{metrics?.totalVisitors.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 dark:text-dark-300">Total de Visitantes</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-2">+12.5% vs período anterior</div>
                    </div>
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4"><Users className="h-8 w-8 text-purple-600 dark:text-purple-400" /><TrendingUp className="h-4 w-4 text-green-500" /></div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-1">{metrics?.totalLeads}</div>
                        <div className="text-sm text-gray-600 dark:text-dark-300">Leads Gerados</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-2">+8.3% vs período anterior</div>
                    </div>
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4"><DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" /><TrendingUp className="h-4 w-4 text-green-500" /></div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-1">{metrics?.closedProjects}</div>
                        <div className="text-sm text-gray-600 dark:text-dark-300">Projetos Fechados</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-2">+15.2% vs período anterior</div>
                    </div>
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4"><Target className="h-8 w-8 text-orange-600 dark:text-orange-400" /><TrendingDown className="h-4 w-4 text-red-500" /></div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-1">{metrics?.conversionRate}%</div>
                        <div className="text-sm text-gray-600 dark:text-dark-300">Taxa de Conversão</div>
                        <div className="text-xs text-red-600 dark:text-red-400 mt-2">-2.1% vs período anterior</div>
                    </div>
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4"><Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" /><TrendingUp className="h-4 w-4 text-green-500" /></div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-1">{metrics?.avgResponseTime}h</div>
                        <div className="text-sm text-gray-600 dark:text-dark-300">Tempo Médio Resposta</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-2">-18% vs período anterior</div>
                    </div>
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4"><Activity className="h-8 w-8 text-yellow-600 dark:text-yellow-400" /><TrendingUp className="h-4 w-4 text-green-500" /></div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-1">{metrics?.satisfaction}/5</div>
                        <div className="text-sm text-gray-600 dark:text-dark-300">Satisfação Média</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-2">+0.3 vs período anterior</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-6 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />Visitantes vs Projetos</h3>
                        <div className="space-y-4">
                            {chartData.map((data) => (
                                <div key={data.month} className="flex items-center gap-4">
                                    <div className="w-12 text-sm text-gray-600 dark:text-dark-300 font-medium">{data.month}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><span className="text-xs text-gray-600 dark:text-dark-300">Visitantes: {data.visitors}</span></div>
                                        <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mb-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(data.visitors / 3000) * 100}%` }}></div></div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-xs text-gray-600 dark:text-dark-300">Projetos: {data.projects}</span></div>
                                        <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${(data.projects / 10) * 100}%` }}></div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-6 flex items-center gap-2"><Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />Principais Fontes de Lead</h3>
                        <div className="space-y-4">
                            {[
                                { source: 'Site - Contato', leads: 89, percentage: 38 },
                                { source: 'LinkedIn', leads: 67, percentage: 29 },
                                { source: 'Google Ads', leads: 45, percentage: 19 },
                                { source: 'Indicação', leads: 33, percentage: 14 }
                            ].map((item) => (
                                <div key={item.source} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-gray-900 dark:text-dark-100">{item.source}</span><span className="text-sm text-gray-600 dark:text-dark-300">{item.leads} leads</span></div>
                                        <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2"><div className="bg-amber-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-800 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-6 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />Insights de Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" /><span className="font-medium text-green-900 dark:text-green-300">Excelente</span></div>
                            <p className="text-sm text-green-800 dark:text-green-400">Taxa de conversão de landing pages está 15% acima da média.</p>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <div className="flex items-center gap-2 mb-2"><Target className="h-4 w-4 text-yellow-600 dark:text-yellow-400" /><span className="font-medium text-yellow-900 dark:text-yellow-300">Atenção</span></div>
                            <p className="text-sm text-yellow-800 dark:text-yellow-400">Tempo de carregamento do site pode ser melhorado.</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 mb-2"><Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" /><span className="font-medium text-blue-900 dark:text-blue-300">Oportunidade</span></div>
                            <p className="text-sm text-blue-800 dark:text-blue-400">Projetos de E-commerce têm maior ticket médio.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
