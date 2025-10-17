'use client'


import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Plus,
    Search,
    Filter,
    TrendingUp,
    Calendar,
    Phone,
    Mail,
    DollarSign,
    Star,
    Clock,
    Target,
    Zap,
    Eye,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    Download,
    RefreshCw,
    Briefcase,
    Linkedin
} from 'lucide-react'
import { calculateLeadScore, calculateConversionProbability } from '@/lib/utils/lead-scoring'

interface Lead {
    id: string
    name: string
    email?: string
    phone?: string
    source: 'website' | 'facebook' | 'google' | 'referral' | 'linkedin' | 'other'
    status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
    priority: 'low' | 'medium' | 'high'
    service_interest: string
    budget?: number
    message?: string
    assigned_to?: string
    score: number
    created_at: string
    last_contact?: string
    next_follow_up?: string
    conversion_probability: number
}

// Mock data generation
const getDemoLeads = (): Lead[] => [
    {
        id: '1',
        name: 'Ana Clara',
        email: 'ana.clara@example.com',
        phone: '(11) 98765-4321',
        source: 'linkedin',
        status: 'new',
        priority: 'high',
        service_interest: 'Desenvolvimento de E-commerce',
        budget: 25000,
        score: 92,
        created_at: new Date().toISOString(),
        conversion_probability: 85,
    },
    {
        id: '2',
        name: 'Bruno Gomes',
        email: 'bruno.gomes@example.com',
        source: 'google',
        status: 'contacted',
        priority: 'medium',
        service_interest: 'Otimização de SEO',
        budget: 8000,
        score: 78,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        last_contact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        conversion_probability: 60,
    },
    {
        id: '3',
        name: 'Carla Dias',
        source: 'referral',
        status: 'qualified',
        priority: 'high',
        service_interest: 'Gestão de Tráfego Pago',
        budget: 15000,
        score: 88,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        conversion_probability: 75,
    },
];

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | Lead['status']>('all')
    const [sourceFilter, setSourceFilter] = useState<'all' | Lead['source']>('all')
    const [priorityFilter, setPriorityFilter] = useState<'all' | Lead['priority']>('all')

    const [allLeads, setAllLeads] = useState<Lead[]>([])
    const [stats, setStats] = useState({
        total: 0, new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0,
        conversionRate: 0, avgScore: 0, hotLeads: 0
    })

    useEffect(() => {
        loadLeads()
    }, [])

    // Apply filters when filter states change
    useEffect(() => {
        applyFilters()
    }, [statusFilter, sourceFilter, priorityFilter, searchQuery, allLeads])

    const loadLeads = async () => {
        setLoading(true)
        try {
            // Importar actions dinamicamente
            const { getLeads, getLeadStats } = await import('./actions')
            const [leadsData, statsData] = await Promise.all([
                getLeads(),
                getLeadStats()
            ])

            // Map database format to component format
            const mappedLeads: Lead[] = leadsData.map((lead: any) => ({
                id: lead.id,
                name: lead.full_name || 'Sem nome',
                email: lead.email,
                phone: lead.phone,
                source: (lead.source || 'other') as Lead['source'],
                status: (lead.status || 'new') as Lead['status'],
                priority: 'medium' as Lead['priority'], // DB doesn't have priority yet
                service_interest: lead.company_name || 'Serviço não especificado',
                score: calculateLeadScore(lead),
                created_at: lead.created_at,
                conversion_probability: calculateConversionProbability(lead)
            }))

            setAllLeads(mappedLeads)
            setStats({
                total: statsData.total,
                new: statsData.new,
                contacted: statsData.contacted,
                qualified: statsData.qualified,
                proposal: 0,
                won: statsData.converted,
                lost: 0,
                conversionRate: statsData.total > 0 ? (statsData.converted / statsData.total) * 100 : 0,
                avgScore: 70,
                hotLeads: mappedLeads.filter(l => l.status === 'qualified').length
            })
        } catch (error) {
            console.error('Error loading leads:', error)
            setAllLeads([])
        } finally {
            setLoading(false)
        }
    }

    const applyFilters = () => {
        let filtered = allLeads

        if (statusFilter !== 'all') {
            filtered = filtered.filter(lead => lead.status === statusFilter)
        }
        if (sourceFilter !== 'all') {
            filtered = filtered.filter(lead => lead.source === sourceFilter)
        }
        if (priorityFilter !== 'all') {
            filtered = filtered.filter(lead => lead.priority === priorityFilter)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(query) ||
                lead.email?.toLowerCase().includes(query) ||
                lead.service_interest?.toLowerCase().includes(query)
            )
        }

        setLeads(filtered)
    }

    const calculateStats = (allLeads: Lead[]) => {
        const total = allLeads.length
        const won = allLeads.filter(l => l.status === 'won').length
        const conversionRate = total > 0 ? (won / total) * 100 : 0
        const avgScore = total > 0 ? allLeads.reduce((sum, l) => sum + l.score, 0) / total : 0
        const hotLeads = allLeads.filter(l => l.priority === 'high' && l.status !== 'won' && l.status !== 'lost').length

        setStats({
            total, won, conversionRate, avgScore, hotLeads,
            new: allLeads.filter(l => l.status === 'new').length,
            contacted: allLeads.filter(l => l.status === 'contacted').length,
            qualified: allLeads.filter(l => l.status === 'qualified').length,
            proposal: allLeads.filter(l => l.status === 'proposal').length,
            lost: allLeads.filter(l => l.status === 'lost').length,
        })
    }

    const getStatusConfig = (status: Lead['status']) => ({
        new: { color: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200 dark:from-dark-800 dark:to-dark-700 dark:text-blue-400 dark:border-dark-600', icon: <Zap className="h-3 w-3" />, label: 'Novo' },
        contacted: { color: 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200 dark:from-dark-800 dark:to-dark-700 dark:text-yellow-400 dark:border-dark-600', icon: <Phone className="h-3 w-3" />, label: 'Contatado' },
        qualified: { color: 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200 dark:from-dark-800 dark:to-dark-700 dark:text-purple-400 dark:border-dark-600', icon: <Target className="h-3 w-3" />, label: 'Qualificado' },
        proposal: { color: 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-orange-200 dark:from-dark-800 dark:to-dark-700 dark:text-orange-400 dark:border-dark-600', icon: <Star className="h-3 w-3" />, label: 'Proposta' },
        won: { color: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 dark:from-dark-800 dark:to-dark-700 dark:text-green-400 dark:border-dark-600', icon: <CheckCircle2 className="h-3 w-3" />, label: 'Ganho' },
        lost: { color: 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200 dark:from-dark-800 dark:to-dark-700 dark:text-dark-400 dark:border-dark-600', icon: <AlertCircle className="h-3 w-3" />, label: 'Perdido' },
    }[status])

    const getPriorityColor = (priority: Lead['priority']) => ({
        high: 'text-red-500 dark:text-red-400',
        medium: 'text-yellow-500 dark:text-yellow-400',
        low: 'text-green-500 dark:text-green-400',
    }[priority] || 'text-gray-400 dark:text-dark-400')

    const getSourceIcon = (source: Lead['source']) => ({
        website: '🌐', facebook: '📘', google: '🔍', referral: '👥', linkedin: <Linkedin className="h-4 w-4" />, other: '📋'
    }[source] || '📋')

    const formatBudget = (budget?: number) => budget ? `R$ ${budget.toLocaleString()}` : 'A negociar'
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-dark-100 dark:to-dark-300">Gestão de Leads</h1>
                        <p className="text-gray-600 dark:text-dark-300 mt-1 flex items-center gap-2"><TrendingUp className="h-4 w-4" />Pipeline de vendas e conversão de prospects</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={loadLeads} className="p-2 rounded-xl border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors" title="Atualizar"><RefreshCw className="h-5 w-5 text-gray-600 dark:text-dark-300" /></button>
                        <button className="p-2 rounded-xl border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"><Download className="h-5 w-5 text-gray-600 dark:text-dark-300" /></button>
                        <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"><Plus className="h-5 w-5" />Novo Lead</button>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4 mb-8">
                    {Object.entries(stats).map(([key, value]) => {
                        if (key === 'total') return <div key={key} className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all"><div className="flex items-center justify-between mb-3"><Users className="h-8 w-8 text-blue-600 dark:text-blue-400" /><span className="text-3xl font-bold text-gray-900 dark:text-dark-100">{value}</span></div><div className="text-sm text-gray-600 dark:text-dark-300">Total de Leads</div></div>
                        // Add more stat cards here
                        return null
                    })}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-800 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-400 h-5 w-5 group-focus-within:text-amber-500 transition-colors" />
                            <input type="text" placeholder="Buscar por nome, email ou serviço..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-transparent text-dark-100" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-100 min-w-[150px]">
                                <option value="all">Todos os status</option>
                                <option value="new">🔥 Novos</option>
                                <option value="contacted">📞 Contatados</option>
                                <option value="qualified">🎯 Qualificados</option>
                                <option value="proposal">⭐ Propostas</option>
                                <option value="won">✅ Convertidos</option>
                                <option value="lost">❌ Perdidos</option>
                            </select>
                            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as any)} className="border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-100 min-w-[140px]">
                                <option value="all">Todas as origens</option>
                                <option value="website">🌐 Website</option>
                                <option value="facebook">📘 Facebook</option>
                                <option value="google">🔍 Google</option>
                                <option value="referral">👥 Indicação</option>
                                <option value="linkedin">LIn</option>
                                <option value="other">📋 Outro</option>
                            </select>
                            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)} className="border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-100 min-w-[130px]">
                                <option value="all">Todas prioridades</option>
                                <option value="high">🔥 Alta</option>
                                <option value="medium">⚡ Média</option>
                                <option value="low">🌱 Baixa</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-20">
                            <div className="relative"><div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-dark-700"></div><div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent absolute top-0"></div></div>
                        </motion.div>
                    ) : leads.length === 0 ? (
                        <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-dark-900 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-dark-800">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-dark-800 dark:to-dark-700 rounded-full flex items-center justify-center mx-auto mb-6"><TrendingUp className="h-10 w-10 text-amber-600 dark:text-amber-400" /></div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-100 mb-3">Nenhum lead encontrado</h3>
                            <p className="text-gray-600 dark:text-dark-300 mb-8 max-w-md mx-auto">Ajuste os filtros para encontrar leads ou comece a capturar novos prospects.</p>
                            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"><Plus className="h-5 w-5" />Capturar Primeiro Lead</button>
                        </motion.div>
                    ) : (
                        <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {leads.map((lead, index) => {
                                const statusConfig = getStatusConfig(lead.status)
                                return (
                                    <motion.div key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-800 hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
                                        <div className="absolute top-4 right-4 flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${getPriorityColor(lead.priority)}`} style={{ backgroundColor: 'currentColor' }}></div><span className="text-xs font-semibold text-gray-600 dark:text-dark-300">{lead.score}</span></div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-dark-800 dark:to-dark-700 flex items-center justify-center"><span className="text-lg font-semibold text-amber-700 dark:text-amber-400">{lead.name.charAt(0).toUpperCase()}</span></div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-dark-100 group-hover:text-amber-600 transition-colors">{lead.name}</h3>
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${statusConfig.color}`}>{statusConfig.icon}{statusConfig.label}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-gray-500 dark:text-dark-400" /><span className="font-medium text-gray-700 dark:text-dark-200">{lead.service_interest}</span></div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-300"><DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" /><span>{formatBudget(lead.budget)}</span></div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            {lead.email && <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-300"><Mail className="h-4 w-4" /><span className="truncate">{lead.email}</span></div>}
                                            {lead.phone && <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-300"><Phone className="h-4 w-4" /><span>{lead.phone}</span></div>}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-dark-400 mb-4"><div className="flex items-center gap-1"><span className="capitalize">{getSourceIcon(lead.source)} {lead.source}</span></div><span>Criado: {formatDate(lead.created_at)}</span></div>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs text-gray-600 dark:text-dark-300 mb-1"><span>Probabilidade</span><span>{lead.conversion_probability}%</span></div>
                                            <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2"><div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${lead.conversion_probability}%` }}></div></div>
                                        </div>
                                        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-dark-800">
                                            <button className="flex-1 bg-amber-50 dark:bg-dark-800 hover:bg-amber-100 dark:hover:bg-dark-700 text-amber-700 dark:text-amber-400 py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-1"><Eye className="h-4 w-4" />Ver</button>
                                            <button className="flex-1 bg-blue-50 dark:bg-dark-800 hover:bg-blue-100 dark:hover:bg-dark-700 text-blue-700 dark:text-blue-400 py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-1"><Phone className="h-4 w-4" />Contatar</button>
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"><MoreVertical className="h-4 w-4 text-gray-500 dark:text-dark-400" /></button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
