// Client Profile Management Component
// File: /src/components/client/ClientProfileManager.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Database, TablesInsert, TablesUpdate } from '@/lib/supabase/database.types'
import { PremiumButton, CTAButton } from '@/components/ui/premium-button'
import { SmartLoader } from '@/components/ui/smart-loader'
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Target, 
  TrendingUp,
  Calendar,
  FileText,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Save,
  X,
  Users,
  DollarSign,
  MapPin,
  Star,
  Clock,
  BarChart3,
  CheckCircle2
} from 'lucide-react'

type ClientProfile = Database['public']['Tables']['client_profiles']['Row']
type ClientInteraction = Database['public']['Tables']['client_interactions']['Row']

interface ClientProfileManagerProps {
  profileId?: string
  mode?: 'view' | 'edit' | 'create'
  onSave?: (profile: ClientProfile) => void
  onCancel?: () => void
}

const businessTypes = [
  'E-commerce',
  'Serviços',
  'SaaS',
  'Marketplace',
  'Blog/Conteúdo',
  'Corporativo',
  'Portfolio',
  'Landing Page',
  'Aplicativo Web',
  'Outro'
]

const industries = [
  'Tecnologia',
  'Saúde',
  'Educação',
  'Finanças',
  'Varejo',
  'Imobiliário',
  'Alimentação',
  'Turismo',
  'Consultoria',
  'Marketing',
  'Design',
  'Outro'
]

const companySizes = [
  'Freelancer',
  'Startup (1-10)',
  'Pequena (11-50)',
  'Média (51-200)',
  'Grande (201-1000)',
  'Corporação (1000+)'
]

const priorities = [
  { value: 'low', label: 'Baixa', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  { value: 'medium', label: 'Média', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  { value: 'high', label: 'Alta', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  { value: 'critical', label: 'Crítica', color: 'text-red-400 bg-red-500/10 border-red-500/30' }
]

export default function ClientProfileManager({
  profileId,
  mode = 'view',
  onSave,
  onCancel
}: ClientProfileManagerProps) {
  const [profile, setProfile] = useState<ClientProfile | null>(null)
  const [interactions, setInteractions] = useState<ClientInteraction[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentMode, setCurrentMode] = useState(mode)
  const [formData, setFormData] = useState<Partial<ClientProfile>>({})
  
  const supabase = createClient()

  useEffect(() => {
    if (profileId && currentMode !== 'create') {
      loadProfile()
      loadInteractions()
    } else if (currentMode === 'create') {
      setProfile(null)
      setFormData({
        business_type: 'E-commerce',
        industry: 'Tecnologia',
        company_size: 'Pequena (11-50)',
        budget_range: '5000-15000',
        client_id: 'default-client'
      })
      setLoading(false)
    }
  }, [profileId, currentMode])

  const loadProfile = async () => {
    try {
      setLoading(true)
      if (!profileId) {
        throw new Error('Profile ID is required')
      }
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', profileId)
        .single()

      if (error) throw error
      
      setProfile(data)
      setFormData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar perfil')
    } finally {
      setLoading(false)
    }
  }

  const loadInteractions = async () => {
    if (!profileId) return

    try {
      const { data, error } = await supabase
        .from('client_interactions')
        .select('*')
        .eq('client_profile_id', profileId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setInteractions(data || [])
    } catch (err) {
      console.error('Erro ao carregar interações:', err)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      // Clean formData to only include valid client_profiles fields
      const validData: TablesInsert<'client_profiles'> = {
        client_id: formData.client_id || profileId || '',
        business_type: formData.business_type || null,
        industry: formData.industry || null,
        company_size: formData.company_size || null,
        annual_revenue: formData.annual_revenue || null,
        budget_range: formData.budget_range || null,
        primary_contact_name: formData.primary_contact_name || null,
        primary_contact_email: formData.primary_contact_email || null,
        primary_contact_phone: formData.primary_contact_phone || null,
        preferred_communication: formData.preferred_communication || null,
        timezone: formData.timezone || null,
        current_website: formData.current_website || null,
        platform: formData.platform || null,
        has_analytics: formData.has_analytics || null,
        design_style: formData.design_style || null,
        brand_colors: formData.brand_colors || null,
        primary_goals: formData.primary_goals || null,
        pain_points: formData.pain_points || null,
        tags: formData.tags || null,
        notes: formData.notes || null,
        satisfaction_score: formData.satisfaction_score || null,
        total_projects: formData.total_projects || null,
        custom_data: formData.custom_data || null,
      }

      if (currentMode === 'create') {
        const { data, error } = await supabase
          .from('client_profiles')
          .insert([validData])
          .select()
          .single()

        if (error) throw error

        setProfile(data)
        onSave?.(data)
      } else {
        if (!profileId) {
          throw new Error('Profile ID is required for update')
        }

        const { data, error } = await supabase
          .from('client_profiles')
          .update(validData as TablesUpdate<'client_profiles'>)
          .eq('id', profileId)
          .select()
          .single()

        if (error) throw error

        setProfile(data)
        onSave?.(data)
      }

      setCurrentMode('view')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar perfil')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData(profile)
    }
    setCurrentMode('view')
    onCancel?.()
  }

  const addInteraction = async (type: string, description: string) => {
    if (!profileId) return

    try {
      const { data, error } = await supabase
        .from('client_interactions')
        .insert([{
          client_id: profileId || '',
          interaction_type: type,
          description,
          metadata: {}
        }] as TablesInsert<'client_interactions'>[])

      if (error) throw error
      loadInteractions()
    } catch (err) {
      console.error('Erro ao adicionar interação:', err)
    }
  }

  const updateFormData = (field: keyof ClientProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <SmartLoader
          isLoading={true}
          stages={[
            { id: 'loading', title: 'Carregando perfil', description: 'Buscando dados do cliente...' }
          ]}
          currentStage={0}
        />
      </div>
    )
  }

  if (error && currentMode !== 'create') {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
        <FileText className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Erro ao Carregar</h3>
        <p className="text-red-400 mb-4">{error}</p>
        <PremiumButton onClick={loadProfile} icon={Target}>
          Tentar Novamente
        </PremiumButton>
      </div>
    )
  }

  const isEditing = currentMode === 'edit' || currentMode === 'create'
  const displayData = isEditing ? formData : profile

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-500/20 border border-teal-500/30 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentMode === 'create' ? 'Novo Cliente' : displayData?.primary_contact_name || 'Cliente'}
              </h1>
              <p className="text-white/60">
                {currentMode === 'create' ? 'Criar perfil de cliente' : 'Gerenciar perfil do cliente'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing && (
              <>
                <PremiumButton
                  icon={Edit3}
                  onClick={() => setCurrentMode('edit')}
                >
                  Editar
                </PremiumButton>
                <PremiumButton
                  icon={Plus}
                  onClick={() => addInteraction('note', 'Nova anotação adicionada')}
                >
                  Anotação
                </PremiumButton>
              </>
            )}
            
            {isEditing && (
              <>
                <PremiumButton
                  variant="ghost"
                  icon={X}
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancelar
                </PremiumButton>
                <CTAButton
                  icon={Save}
                  onClick={handleSave}
                  loading={saving}
                  disabled={!formData.primary_contact_name}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </CTAButton>
              </>
            )}
          </div>
        </div>

        {/* Status and Priority */}
        {!isEditing && profile && (
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-lg text-sm font-medium border text-green-400 bg-green-500/10 border-green-500/30">
              Ativo
            </div>

            {/* Priority level removed - field doesn't exist in client_profiles */}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações Básicas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Nome / Empresa *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.primary_contact_name || ''}
                    onChange={(e) => updateFormData('primary_contact_name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-white/40 focus:outline-none 
                             focus:ring-2 focus:ring-teal-500/50"
                    placeholder="Nome da empresa ou cliente"
                  />
                ) : (
                  <p className="text-white text-lg">{displayData?.primary_contact_name || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.primary_contact_email || ''}
                    onChange={(e) => updateFormData('primary_contact_email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-white/40 focus:outline-none 
                             focus:ring-2 focus:ring-teal-500/50"
                    placeholder="cliente@exemplo.com"
                  />
                ) : displayData?.primary_contact_email ? (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-white/60" />
                    <span className="text-white">{displayData.primary_contact_email}</span>
                  </div>
                ) : (
                  <p className="text-white/60">Não informado</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.primary_contact_phone || ''}
                    onChange={(e) => updateFormData('primary_contact_phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-white/40 focus:outline-none 
                             focus:ring-2 focus:ring-teal-500/50"
                    placeholder="(11) 99999-9999"
                  />
                ) : displayData?.primary_contact_phone ? (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-white/60" />
                    <span className="text-white">{displayData.primary_contact_phone}</span>
                  </div>
                ) : (
                  <p className="text-white/60">Não informado</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={formData.current_website || ''}
                    onChange={(e) => updateFormData('current_website', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-white/40 focus:outline-none 
                             focus:ring-2 focus:ring-teal-500/50"
                    placeholder="https://exemplo.com"
                  />
                ) : displayData?.current_website ? (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-white/60" />
                    <a 
                      href={displayData.current_website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      {displayData.current_website}
                    </a>
                  </div>
                ) : (
                  <p className="text-white/60">Não informado</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Business Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Informações do Negócio
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Tipo de Negócio
                </label>
                {isEditing ? (
                  <select
                    value={formData.business_type || ''}
                    onChange={(e) => updateFormData('business_type', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-white">{displayData?.business_type || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Setor
                </label>
                {isEditing ? (
                  <select
                    value={formData.industry || ''}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-white">{displayData?.industry || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Tamanho da Empresa
                </label>
                {isEditing ? (
                  <select
                    value={formData.company_size || ''}
                    onChange={(e) => updateFormData('company_size', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-white">{displayData?.company_size || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Orçamento
                </label>
                {isEditing ? (
                  <select
                    value={formData.budget_range || ''}
                    onChange={(e) => updateFormData('budget_range', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="">Selecionar orçamento</option>
                    <option value="1000-5000">R$ 1.000 - 5.000</option>
                    <option value="5000-15000">R$ 5.000 - 15.000</option>
                    <option value="15000-50000">R$ 15.000 - 50.000</option>
                    <option value="50000+">R$ 50.000+</option>
                  </select>
                ) : (
                  <p className="text-white">
                    {displayData?.budget_range || 'Não informado'}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-white/70 text-sm font-medium mb-2">
                Observações
              </label>
              {isEditing ? (
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                           text-white placeholder-white/40 focus:outline-none 
                           focus:ring-2 focus:ring-teal-500/50 resize-none"
                  placeholder="Observações sobre o cliente..."
                />
              ) : displayData?.notes ? (
                <p className="text-white bg-white/5 border border-white/10 rounded-xl p-4">
                  {displayData.notes}
                </p>
              ) : (
                <p className="text-white/60">Nenhuma observação</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Quick Stats */}
          {!isEditing && profile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Estatísticas
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Cliente desde</span>
                  <span className="text-white">
                    {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Interações</span>
                  <span className="text-teal-400 font-semibold">
                    {interactions.length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Última atividade</span>
                  <span className="text-white">
                    {interactions[0]?.created_at
                      ? new Date(interactions[0].created_at).toLocaleDateString()
                      : 'Nunca'
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Interactions */}
          {!isEditing && interactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Interações Recentes
              </h3>

              <div className="space-y-3">
                {interactions.slice(0, 5).map(interaction => (
                  <div key={interaction.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">
                        {interaction.description}
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        {interaction.created_at ? new Date(interaction.created_at).toLocaleDateString() : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          {!isEditing && profile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Ações Rápidas
              </h3>

              <div className="space-y-3">
                <PremiumButton
                  size="sm"
                  variant="ghost"
                  icon={CheckCircle2}
                  onClick={() => addInteraction('checklist', 'Novo checklist criado')}
                  className="w-full justify-start"
                >
                  Criar Checklist
                </PremiumButton>
                
                <PremiumButton
                  size="sm"
                  variant="ghost"
                  icon={FileText}
                  onClick={() => addInteraction('report', 'Relatório gerado')}
                  className="w-full justify-start"
                >
                  Gerar Relatório
                </PremiumButton>
                
                <PremiumButton
                  size="sm"
                  variant="ghost"
                  icon={Mail}
                  onClick={() => addInteraction('email', 'Email enviado')}
                  className="w-full justify-start"
                >
                  Enviar Email
                </PremiumButton>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}