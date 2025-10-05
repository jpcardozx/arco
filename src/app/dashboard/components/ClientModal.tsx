'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Phone, Mail, Save, AlertCircle, RefreshCw, Hash, Briefcase, DollarSign, Globe } from 'lucide-react'
import { ClientsServiceWrapper } from '@/lib/services/client-wrapper'
import type { Client, ClientInput, ClientUpdate } from '@/lib/types/supabase-helpers'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'

interface ClientModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    client?: Client // Para edição
}

export function ClientModal({ isOpen, onClose, onSave, client }: ClientModalProps) {
    const { user } = useCurrentUser()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        client_code: '',
        status: 'lead' as 'lead' | 'prospect' | 'client' | 'inactive',
        priority: 'medium' as 'low' | 'medium' | 'high',
        notes: '',
        service_interest: '' as 'web_dev' | 'seo' | 'paid_traffic' | 'social_media' | 'other' | '',
        project_budget: '',
        company_name: '',
        website: ''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name,
                email: client.email || '',
                phone: client.phone || '',
                client_code: client.client_code || '',
                status: client.status as 'lead' | 'prospect' | 'client' | 'inactive',
                priority: client.priority as 'low' | 'medium' | 'high' || 'medium',
                notes: client.notes || '',
                service_interest: (client.service_interest as any) || '',
                project_budget: client.project_budget?.toString() || '',
                company_name: client.company_name || '',
                website: client.website || ''
            })
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                client_code: '',
                status: 'lead',
                priority: 'medium',
                notes: '',
                service_interest: '',
                project_budget: '',
                company_name: '',
                website: ''
            })
        }
    }, [client, isOpen])

    const generateClientCode = async () => {
        if (!formData.name.trim()) {
            setErrors({ ...errors, client_code: 'Digite o nome primeiro para gerar o código' })
            return
        }

        const code = await ClientsServiceWrapper.generateClientCode()
        setFormData({ ...formData, client_code: code })

        const newErrors = { ...errors }
        delete newErrors.client_code
        setErrors(newErrors)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido'
        if (formData.phone && formData.phone.length < 10) newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos'
        if (!formData.client_code.trim() && !client) newErrors.client_code = 'Código do cliente é obrigatório. Clique em "Gerar".'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        setLoading(true)

        try {
            let clientCode = formData.client_code
            if (!clientCode && formData.name.trim()) {
                clientCode = await ClientsServiceWrapper.generateClientCode()
            }

            if (client?.id) {
                const clientData: ClientUpdate = {
                    name: formData.name.trim(),
                    email: formData.email.trim() || undefined,
                    phone: formData.phone.trim() || undefined,
                    status: formData.status,
                    priority: formData.priority,
                    notes: formData.notes.trim() || undefined,
                    service_interest: formData.service_interest || undefined,
                    project_budget: formData.project_budget ? parseFloat(formData.project_budget) : null,
                    company_name: formData.company_name.trim() || undefined,
                    website: formData.website.trim() || undefined,
                    updated_at: new Date().toISOString(),
                }
                await ClientsServiceWrapper.updateClient(client.id, clientData)
            } else {
                if (!user) {
                    setErrors({ submit: 'Você precisa estar logado para criar um cliente.' });
                    setLoading(false);
                    return;
                }
                const clientData: ClientInput = {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim() || null,
                    client_code: clientCode,
                    status: formData.status,
                    priority: formData.priority,
                    notes: formData.notes.trim() || null,
                    service_interest: formData.service_interest || null,
                    project_budget: formData.project_budget ? parseFloat(formData.project_budget) : null,
                    company_name: formData.company_name.trim() || null,
                    website: formData.website.trim() || null,
                    created_by: user.id,
                    assigned_to: null,
                    budget_max: null,
                    budget_min: null,
                    company: null,
                    department: null,
                    last_contact: null,
                    next_follow_up: null,
                    property_type: null,
                    transaction_type: null,
                }
                await ClientsServiceWrapper.createClient(clientData)
            }

            onSave()
        } catch (error) {
            console.error('Erro ao salvar cliente:', error)
            setErrors({ submit: 'Erro ao salvar cliente. Tente novamente.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white dark:bg-dark-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-dark-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-100">
                                    {client ? 'Editar Cliente' : 'Novo Cliente'}
                                </h2>
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-dark-400 dark:hover:text-dark-200 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-dark-200 border-b border-gray-200 dark:border-dark-700 pb-2">
                                        Informações Básicas
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><User size={16} className="inline mr-2" />Nome *</label>
                                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-dark-700'}`} placeholder="Nome completo" />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><Hash size={16} className="inline mr-2" />Código do Cliente *</label>
                                        <div className="flex gap-2">
                                            <input type="text" value={formData.client_code} onChange={(e) => setFormData({ ...formData, client_code: e.target.value })} className={`flex-1 px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.client_code ? 'border-red-500' : 'border-gray-300 dark:border-dark-700'}`} placeholder="Ex: LDJO24001" readOnly={!client} />
                                            {!client && <button type="button" onClick={generateClientCode} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"><RefreshCw size={16} />Gerar</button>}
                                        </div>
                                        {errors.client_code && <p className="text-red-500 text-sm mt-1">{errors.client_code}</p>}
                                        <p className="text-gray-500 dark:text-dark-400 text-xs mt-1">Código interno para controle. Formato: [STATUS][NOME][ANO][SEQUENCIAL]</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><Mail size={16} className="inline mr-2" />Email</label>
                                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-dark-700'}`} placeholder="email@exemplo.com" />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><Phone size={16} className="inline mr-2" />Telefone</label>
                                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-dark-700'}`} placeholder="(11) 99999-9999" />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Status</label>
                                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-dark-800 dark:border-dark-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="lead">Lead</option>
                                                <option value="prospect">Prospect</option>
                                                <option value="client">Cliente</option>
                                                <option value="inactive">Inativo</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Prioridade</label>
                                            <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-dark-800 dark:border-dark-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="low">Baixa</option>
                                                <option value="medium">Média</option>
                                                <option value="high">Alta</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-dark-200 border-b border-gray-200 dark:border-dark-700 pb-2">
                                        Detalhes do Projeto
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Serviço de Interesse</label>
                                            <select value={formData.service_interest} onChange={(e) => setFormData({ ...formData, service_interest: e.target.value as any })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-dark-800 dark:border-dark-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="">Selecione...</option>
                                                <option value="web_dev">Desenvolvimento Web</option>
                                                <option value="seo">SEO</option>
                                                <option value="paid_traffic">Tráfego Pago</option>
                                                <option value="social_media">Redes Sociais</option>
                                                <option value="other">Outro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><DollarSign size={16} className="inline mr-2" />Orçamento do Projeto (R$)</label>
                                            <input type="number" value={formData.project_budget} onChange={(e) => setFormData({ ...formData, project_budget: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-dark-700" placeholder="1500.00" min="0" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><Briefcase size={16} className="inline mr-2" />Empresa</label>
                                            <input type="text" value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-dark-700" placeholder="Nome da Empresa" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2"><Globe size={16} className="inline mr-2" />Website</label>
                                            <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-dark-700" placeholder="https://exemplo.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-dark-200 border-b border-gray-200 dark:border-dark-700 pb-2">
                                        Informações Adicionais
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Observações</label>
                                        <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-dark-700" rows={3} placeholder="Informações adicionais sobre o cliente..." />
                                    </div>
                                </div>

                                {errors.submit && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-3">
                                        <div className="flex items-center">
                                            <AlertCircle size={16} className="text-red-500 dark:text-red-400 mr-2" />
                                            <p className="text-red-700 dark:text-red-300 text-sm">{errors.submit}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-dark-800 dark:text-dark-200 dark:hover:bg-dark-700 transition-colors">
                                        Cancelar
                                    </button>
                                    <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center">
                                        {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <><Save size={16} className="mr-2" />{client ? 'Atualizar' : 'Criar Cliente'}</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ClientModal
