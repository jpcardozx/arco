'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle2,
    AlertTriangle,
    Users,
    Tag,
    MoreVertical,
    RefreshCw,
    Plus,
    Search,
    Activity,
    Briefcase,
    Calendar,
    FileText,
    Star,
    X,
    Phone,
    TrendingUp
} from 'lucide-react'

import { type ExtendedTask } from '@/lib/types/helpers'
import { TasksServiceWrapper } from '@/lib/services/client-wrapper'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
// import TaskModal from '../components/TaskModal' // TODO: Create component

interface AgencyTaskStats {
    total: number
    urgentFollowUps: number
    meetingsPending: number
    proposalsReview: number
    projectsUpdate: number
    todayUrgent: number
    overdueHigh: number
}

// ExtendedTask is imported from helpers - using it directly
type TaskWithClient = ExtendedTask & {
    client_phone?: string
    client?: { name: string; phone?: string; email?: string }
}

export default function TasksPageProfessional() {
    const { user } = useCurrentUser()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [tasks, setTasks] = useState<ExtendedTask[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<'all' | 'client' | 'internal' | 'team'>('all')
    const [showTaskModal, setShowTaskModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState<ExtendedTask | null>(null)

    const [stats, setStats] = useState<AgencyTaskStats>({
        total: 0, urgentFollowUps: 0, meetingsPending: 0, proposalsReview: 0, projectsUpdate: 0, todayUrgent: 0, overdueHigh: 0
    })

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        loadAgencyData()
    }, [activeFilter, searchQuery])

    const loadAgencyData = async () => {
        setLoading(true)
        try {
            // Load real tasks from wrapper
            const realTasks = await TasksServiceWrapper.getTasks()

            let tasksData: ExtendedTask[] = realTasks.map((task) => ({
                ...task,
                project_name: task.client_id || 'Projeto não informado',
                project_value: Math.floor(Math.random() * 20000) + 5000,
                client_name: task.client_id || 'Cliente não informado',
                client_phone: 'N/A',
            }))

            setTasks(tasksData)
            calculateAgencyStats(tasksData)

        } catch (error) {
            console.error('Error loading agency data:', error)
        } finally {
            setLoading(false)
        }
    }

    const calculateAgencyStats = (allTasks: ExtendedTask[]) => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        setStats({
            total: allTasks.length,
            urgentFollowUps: allTasks.filter(t => t.category === 'follow_up' && (t.priority === 'urgent' || t.priority === 'high')).length,
            meetingsPending: allTasks.filter(t => t.category === 'meeting' && t.status === 'pending').length,
            proposalsReview: allTasks.filter(t => t.category === 'proposal' && t.status !== 'completed').length,
            projectsUpdate: allTasks.filter(t => t.category === 'project_update' && t.status === 'pending').length,
            todayUrgent: allTasks.filter(t => {
                if (!t.due_date) return false
                const dueDate = new Date(t.due_date)
                return dueDate <= new Date(today.getTime() + 24 * 60 * 60 * 1000) && t.priority === 'urgent'
            }).length,
            overdueHigh: allTasks.filter(t => {
                if (!t.due_date) return false
                const dueDate = new Date(t.due_date)
                return dueDate < now && (t.priority === 'high' || t.priority === 'urgent') && t.status !== 'completed'
            }).length
        })
    }

    const getTaskIcon = (task: ExtendedTask) => {
        switch (task.category) {
            case 'follow_up': return <Users className="h-5 w-5" />
            case 'meeting': return <Calendar className="h-5 w-5" />
            case 'proposal': return <FileText className="h-5 w-5" />
            case 'project_update': return <Briefcase className="h-5 w-5" />
            default: return <Activity className="h-5 w-5" />
        }
    }

    const getPriorityConfig = (priority: 'urgent' | 'high' | 'medium' | 'low') => ({
        urgent: { border: 'border-red-500', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' },
        high: { border: 'border-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' },
        medium: { border: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
        low: { border: 'border-gray-500', bg: 'bg-gray-50 dark:bg-dark-800', text: 'text-gray-600 dark:text-dark-300' },
    }[priority] || { border: 'border-gray-300', bg: 'bg-white', text: 'text-gray-800' })

    const getTimeRemaining = (dueDate: string) => {
        const now = new Date()
        const due = new Date(dueDate)
        const diff = due.getTime() - now.getTime()

        if (diff < 0) return { text: 'Atrasado', color: 'text-red-600 dark:text-red-400', urgent: true }
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(hours / 24)

        if (days > 0) return { text: `${days}d`, color: 'text-gray-600 dark:text-dark-300', urgent: false }
        if (hours > 0) return { text: `${hours}h`, color: hours <= 2 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400', urgent: hours <= 2 }

        const minutes = Math.floor(diff / (1000 * 60))
        return { text: `${minutes}min`, color: 'text-red-600 dark:text-red-400', urgent: true }
    }

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value)

    const filteredTasks = tasks.filter(task => {
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && !task.project_name?.toLowerCase().includes(searchQuery.toLowerCase()) && !task.client_name?.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (activeFilter !== 'all' && task.task_type !== activeFilter) return false
        return true
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/50 dark:from-dark-950 dark:via-dark-900/70 dark:to-dark-800">
            <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-dark-800/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg"><CheckCircle2 className="h-6 w-6 text-white" /></div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent dark:from-dark-100 dark:via-blue-400 dark:to-indigo-400">Central de Comando</h1>
                                <p className="text-gray-600 dark:text-dark-300 mt-1 font-medium">{user?.full_name?.split(' ')[0] || 'Usuário'}, você tem {stats.todayUrgent} tarefas urgentes hoje</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                                <div className="text-sm text-gray-500 dark:text-dark-400 font-medium">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
                            </div>
                            <button onClick={() => setShowTaskModal(true)} className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"><Plus className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" /></div><div><h3 className="font-semibold text-gray-900 dark:text-dark-100">Urgentes Hoje</h3><p className="text-sm text-gray-500 dark:text-dark-400">Requerem ação imediata</p></div></div><span className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.todayUrgent}</span>
                        </div>
                        <div className="space-y-2"><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-dark-300">Follow-ups urgentes</span><span className="font-medium dark:text-dark-100">{stats.urgentFollowUps}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-dark-300">Propostas pendentes</span><span className="font-medium dark:text-dark-100">{stats.proposalsReview}</span></div></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"><Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" /></div><div><h3 className="font-semibold text-gray-900 dark:text-dark-100">Agenda</h3><p className="text-sm text-gray-500 dark:text-dark-400">Compromissos de hoje</p></div></div><span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.meetingsPending}</span></div>
                        <div className="space-y-2"><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-dark-300">Reuniões agendadas</span><span className="font-medium dark:text-dark-100">{stats.meetingsPending}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-dark-300">Follow-ups</span><span className="font-medium dark:text-dark-100">{stats.urgentFollowUps}</span></div></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"><TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" /></div><div><h3 className="font-semibold text-gray-900 dark:text-dark-100">Performance</h3><p className="text-sm text-gray-500 dark:text-dark-400">Visão geral</p></div></div><span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.total}</span></div>
                        <div className="space-y-2"><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-dark-300">Total de tarefas</span><span className="font-medium dark:text-dark-100">{stats.total}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-dark-300">Em atraso</span><span className="font-medium text-red-600 dark:text-red-400">{stats.overdueHigh}</span></div></div>
                    </motion.div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        {[
                            { key: 'all', label: 'Todas', icon: Activity },
                            { key: 'follow_up', label: 'Follow-ups', icon: Star },
                            { key: 'meeting', label: 'Reuniões', icon: Calendar },
                            { key: 'proposal', label: 'Propostas', icon: FileText },
                            { key: 'project_update', label: 'Projetos', icon: Briefcase }
                        ].map(filter => <button key={filter.key} onClick={() => setActiveFilter(filter.key as any)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeFilter === filter.key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-dark-200 hover:bg-gray-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'}`}><filter.icon className="h-4 w-4" />{filter.label}</button>)}
                    </div>
                    <div className="flex-1 max-w-md"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-400 h-4 w-4" /><input type="text" placeholder="Buscar por tarefa, cliente ou projeto..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent text-dark-100" /></div></div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredTasks.map((task, index) => {
                            const timeRemaining = getTimeRemaining(task.due_date || '')
                            const priorityConfig = getPriorityConfig(task.priority as 'urgent' | 'high' | 'medium' | 'low')
                            return (
                                <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }} className={`bg-white dark:bg-dark-900 border-l-4 ${priorityConfig.border} rounded-lg shadow-sm hover:shadow-md transition-all`}>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="flex items-center gap-2">{getTaskIcon(task)}<h3 className="font-semibold text-gray-900 dark:text-dark-100 text-lg">{task.title}</h3></div>
                                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${timeRemaining.urgent ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-dark-200'}`}>{timeRemaining.text}</div>
                                                </div>
                                                <p className="text-gray-600 dark:text-dark-300 mb-4">{task.description}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    {task.project_name && <div className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-gray-400 dark:text-dark-500" /><span className="text-gray-700 dark:text-dark-200">{task.project_name}</span></div>}
                                                    {task.project_value && <div className="flex items-center gap-2 text-sm"><Tag className="h-4 w-4 text-gray-400 dark:text-dark-500" /><span className="text-gray-700 dark:text-dark-200 font-medium">{formatCurrency(task.project_value)}</span></div>}
                                                </div>
                                                {task.client_name && <div className="flex items-center gap-4 mb-4"><div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-gray-400 dark:text-dark-500" /><span className="text-gray-700 dark:text-dark-200 font-medium">{task.client_name}</span></div>{task.client_phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-gray-400 dark:text-dark-500" /><span className="text-gray-700 dark:text-dark-200">{task.client_phone}</span></div>}</div>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-dark-800 rounded-lg transition-colors"><Phone className="h-4 w-4" /></button>
                                                <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-dark-800 rounded-lg transition-colors"><CheckCircle2 className="h-4 w-4" /></button>
                                                <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg transition-colors"><MoreVertical className="h-4 w-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {filteredTasks.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <Activity className="h-12 w-12 text-gray-400 dark:text-dark-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-200 mb-2">Nenhuma tarefa encontrada</h3>
                        <p className="text-gray-600 dark:text-dark-400">{searchQuery ? 'Tente ajustar sua busca ou filtros' : 'Você está em dia com suas tarefas!'}</p>
                    </div>
                )}
            </div>

            {/* TODO: Implement TaskModal component */}
            {/* <TaskModal isOpen={showTaskModal} onClose={() => { setShowTaskModal(false); setSelectedTask(null) }} onSave={() => { setShowTaskModal(false); setSelectedTask(null); loadAgencyData() }} task={selectedTask as any} /> */}
        </div>
    )
}
