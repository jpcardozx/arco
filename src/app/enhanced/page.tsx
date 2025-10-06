// Main Application Page with Enhanced Components
// File: /src/app/enhanced/page.tsx

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnhancedDashboard from '@/components/dashboard/EnhancedDashboard'
import EnhancedChecklistInterface from '@/components/checklist/EnhancedChecklistInterface'
import ClientProfileManager from '@/components/client/ClientProfileManager'
import { PremiumButton, CTAButton } from '@/components/ui/premium-button'
import { 
  BarChart3, 
  CheckSquare, 
  Users, 
  Plus,
  ArrowRight,
  Home,
  Settings
} from 'lucide-react'

type ViewMode = 'dashboard' | 'checklist' | 'clients' | 'profile'

export default function EnhancedPage() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard')
  const [selectedChecklistId, setSelectedChecklistId] = useState<string>('01234567-89ab-cdef-0123-456789abcdef')
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [clientMode, setClientMode] = useState<'view' | 'edit' | 'create'>('view')

  const handleCreateClient = () => {
    setClientMode('create')
    setSelectedClientId(null)
    setCurrentView('profile')
  }

  const handleViewClient = (clientId: string) => {
    setClientMode('view')
    setSelectedClientId(clientId)
    setCurrentView('profile')
  }

  const navigation = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Visão geral do sistema'
    },
    {
      id: 'checklist',
      label: 'Checklist',
      icon: CheckSquare,
      description: 'Interface interativa avançada'
    },
    {
      id: 'clients',
      label: 'Clientes',
      icon: Users,
      description: 'Gerenciamento de perfis'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Navigation Bar */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ARCO Enhanced</h1>
                <p className="text-white/60 text-sm">Sistema Completo de Gestão</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              {navigation.map(nav => {
                const Icon = nav.icon
                const isActive = currentView === nav.id
                
                return (
                  <motion.button
                    key={nav.id}
                    onClick={() => setCurrentView(nav.id as ViewMode)}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                      flex items-center gap-2
                      ${isActive 
                        ? 'bg-teal-500/20 border border-teal-500/30 text-teal-400'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{nav.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-teal-500/10 border border-teal-500/30 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {currentView === 'clients' && (
                <PremiumButton
                  size="sm"
                  icon={Plus}
                  onClick={handleCreateClient}
                >
                  Novo Cliente
                </PremiumButton>
              )}
              
              <PremiumButton
                size="sm"
                variant="ghost"
                icon={Settings}
              >
                Configurações
              </PremiumButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="relative">
        <AnimatePresence mode="wait">
          
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EnhancedDashboard />
            </motion.div>
          )}

          {/* Checklist View */}
          {currentView === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EnhancedChecklistInterface
                checklistId={selectedChecklistId}
                showClientInfo={true}
                enableVerifications={true}
                enableRealTimeUpdates={true}
              />
            </motion.div>
          )}

          {/* Clients List View */}
          {currentView === 'clients' && (
            <motion.div
              key="clients"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8"
            >
              <ClientsListView onViewClient={handleViewClient} />
            </motion.div>
          )}

          {/* Client Profile View */}
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8"
            >
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <PremiumButton
                    variant="ghost"
                    onClick={() => setCurrentView('clients')}
                    icon={ArrowRight}
                    className="rotate-180"
                  >
                    Voltar para Clientes
                  </PremiumButton>
                </div>
                
                <ClientProfileManager
                  profileId={selectedClientId || undefined}
                  mode={clientMode}
                  onSave={() => {
                    setCurrentView('clients')
                    setClientMode('view')
                  }}
                  onCancel={() => {
                    setCurrentView('clients')
                    setClientMode('view')
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <CTAButton
            size="lg"
            icon={Plus}
            className="rounded-full w-14 h-14 shadow-2xl"
            onClick={() => {
              if (currentView === 'clients') {
                handleCreateClient()
              } else if (currentView === 'checklist') {
                // Could open new checklist modal
                console.log('Create new checklist')
              } else {
                setCurrentView('clients')
              }
            }}
          >
            <span className="sr-only">Ação rápida</span>
          </CTAButton>
        </motion.div>
      </div>
    </div>
  )
}

// Simple Clients List Component
function ClientsListView({ onViewClient }: { onViewClient: (id: string) => void }) {
  const [clients] = useState([
    {
      id: '1',
      name: 'Empresa Exemplo Ltda',
      email: 'contato@exemplo.com',
      businessType: 'E-commerce',
      industry: 'Tecnologia',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2', 
      name: 'StartupTech Inc',
      email: 'hello@startuptech.com',
      businessType: 'SaaS',
      industry: 'Software',
      status: 'active',
      createdAt: '2024-01-20'
    }
  ])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Gerenciamento de Clientes
        </h1>
        <p className="text-white/60">
          Visualize e gerencie todos os perfis de clientes do sistema
        </p>
      </div>

      <div className="grid gap-6">
        {clients.map(client => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
                     hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500/20 border border-teal-500/30 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                  <p className="text-white/60">{client.email}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="text-white/70">{client.businessType}</span>
                    <span className="text-white/50">•</span>
                    <span className="text-white/70">{client.industry}</span>
                    <span className="text-white/50">•</span>
                    <span className="text-green-400">Ativo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PremiumButton
                  variant="ghost"
                  onClick={() => onViewClient(client.id)}
                >
                  Ver Perfil
                </PremiumButton>
                <CTAButton
                  size="sm"
                  onClick={() => onViewClient(client.id)}
                >
                  Gerenciar
                </CTAButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum cliente encontrado
          </h3>
          <p className="text-white/60 mb-6">
            Comece criando o primeiro perfil de cliente
          </p>
          <CTAButton icon={Plus}>
            Criar Primeiro Cliente
          </CTAButton>
        </div>
      )}
    </div>
  )
}