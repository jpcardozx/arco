/**
 * 🏗️ ARQUITETURA ESTRATÉGICA - ARCO
 * 
 * Stack de gestão de estado otimizada:
 * 
 * 1. SUPABASE (Server State - Source of Truth)
 *    - Dados persistidos (clientes, leads, tasks)
 *    - Autenticação e autorização
 *    - Row Level Security
 * 
 * 2. REACT QUERY (Server State Cache)
 *    - Cache inteligente dos dados do Supabase
 *    - Sincronização automática
 *    - Otimistic updates
 * 
 * 3. ZUSTAND (Client State - UI State)
 *    - Estados efêmeros da UI
 *    - Preferências do usuário
 *    - Estado de modais, sidebars, filtros
 * 
 * 4. REACT HOOK FORM + ZOD (Forms)
 *    - Performance em formulários grandes
 *    - Validação type-safe
 *    - UX otimizada (sem re-renders)
 */

// ============================================================================
// 1️⃣ ZUSTAND STORES - UI STATE
// ============================================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Dashboard UI State
interface DashboardStore {
  // Sidebar
  isSidebarOpen: boolean
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  collapseSidebar: (collapsed: boolean) => void
  
  // Filters
  activeFilters: {
    status?: string[]
    priority?: string[]
    dateRange?: { start: Date; end: Date }
  }
  setFilters: (filters: DashboardStore['activeFilters']) => void
  clearFilters: () => void
  
  // View preferences
  viewMode: 'grid' | 'list' | 'kanban'
  setViewMode: (mode: DashboardStore['viewMode']) => void
  
  // Active modals
  activeModal: 'client' | 'lead' | 'task' | null
  modalData: any
  openModal: (modal: DashboardStore['activeModal'], data?: any) => void
  closeModal: () => void
  
  // Notifications
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    timestamp: Date
  }>
  addNotification: (notification: Omit<DashboardStore['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      // Sidebar
      isSidebarOpen: true,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      collapseSidebar: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      // Filters
      activeFilters: {},
      setFilters: (filters) => set({ activeFilters: filters }),
      clearFilters: () => set({ activeFilters: {} }),
      
      // View preferences
      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),
      
      // Modals
      activeModal: null,
      modalData: null,
      openModal: (modal, data) => set({ activeModal: modal, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date(),
            },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'arco-dashboard-state',
      partialize: (state) => ({
        // Persistir apenas preferências, não dados temporários
        sidebarCollapsed: state.sidebarCollapsed,
        viewMode: state.viewMode,
      }),
    }
  )
)

// User Preferences Store
interface UserPreferencesStore {
  theme: 'light' | 'dark' | 'system'
  language: 'pt-BR' | 'en-US'
  timezone: string
  dateFormat: string
  currency: string
  setTheme: (theme: UserPreferencesStore['theme']) => void
  setLanguage: (language: UserPreferencesStore['language']) => void
  setTimezone: (timezone: string) => void
}

export const useUserPreferences = create<UserPreferencesStore>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      dateFormat: 'dd/MM/yyyy',
      currency: 'BRL',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setTimezone: (timezone) => set({ timezone }),
    }),
    {
      name: 'arco-user-preferences',
    }
  )
)

// ============================================================================
// 2️⃣ ZOD SCHEMAS - VALIDAÇÃO TYPE-SAFE
// ============================================================================

import { z } from 'zod'

// Client Schema
export const clientSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  
  phone: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato: (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  
  company: z.string()
    .min(2, 'Nome da empresa muito curto')
    .optional()
    .or(z.literal('')),
  
  status: z.enum(['lead', 'client', 'prospect', 'inactive']),
  
  priority: z.enum(['high', 'medium', 'low']),
  
  notes: z.string()
    .max(1000, 'Notas muito longas')
    .optional(),
})

export type ClientFormData = z.infer<typeof clientSchema>

// Lead Schema (mais simples)
export const leadSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  campaign: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

// Task Schema
export const taskSchema = z.object({
  title: z.string()
    .min(5, 'Título muito curto')
    .max(200, 'Título muito longo'),
  
  description: z.string()
    .max(2000, 'Descrição muito longa')
    .optional(),
  
  status: z.enum(['todo', 'in_progress', 'completed', 'cancelled']),
  
  priority: z.enum(['high', 'medium', 'low']),
  
  due_date: z.date()
    .min(new Date(), 'Data deve ser futura')
    .optional(),
  
  client_id: z.string().uuid('Cliente inválido').optional(),
  
  tags: z.array(z.string()).optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>

// ============================================================================
// 3️⃣ REACT HOOK FORM - FORMULÁRIO PERFORMÁTICO
// ============================================================================

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

/**
 * Hook customizado para formulário de cliente
 * Combina React Hook Form + Zod + Supabase
 */
export function useClientForm(defaultValues?: Partial<ClientFormData>) {
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'lead',
      priority: 'medium',
      notes: '',
      ...defaultValues,
    },
    mode: 'onBlur', // Validar ao sair do campo (melhor UX)
  })
  
  return form
}

// ============================================================================
// 4️⃣ INTEGRAÇÃO COMPLETA - Exemplo de Uso
// ============================================================================

/**
 * Exemplo: Componente de formulário que usa TUDO junto
 */
export function ExampleIntegration() {
  // 1. UI State (Zustand)
  const { openModal, closeModal } = useDashboardStore()
  
  // 2. Form State (React Hook Form + Zod)
  const form = useClientForm()
  
  // 3. Server State (React Query + Supabase)
  const { mutate: createClient, isLoading } = useCreateClient()
  
  const onSubmit = async (data: ClientFormData) => {
    // Zod já validou os dados ✅
    // Agora enviar para Supabase via React Query
    createClient(data, {
      onSuccess: (newClient) => {
        // Fechar modal (Zustand)
        closeModal()
        
        // Notificação de sucesso (Zustand)
        useDashboardStore.getState().addNotification({
          type: 'success',
          message: `Cliente ${newClient.name} criado com sucesso!`,
        })
        
        // React Query invalida cache automaticamente ✅
      },
      onError: (error) => {
        // Mostrar erro no formulário
        form.setError('root', {
          message: 'Erro ao criar cliente. Tente novamente.',
        })
      },
    })
  }
  
  return null // Componente de exemplo
}

// ============================================================================
// 📊 DECISÃO ESTRATÉGICA FINAL
// ============================================================================

/**
 * RECOMENDAÇÃO:
 * 
 * ✅ USE TODOS (já estão instalados):
 * 
 * 1. Supabase + React Query
 *    → Para TODOS os dados persistidos
 *    → Já implementado nos hooks use-database.ts
 * 
 * 2. Zustand
 *    → Para UI state (modais, filtros, preferências)
 *    → Estado que NÃO precisa persistir no backend
 * 
 * 3. React Hook Form + Zod
 *    → Para TODOS os formulários (client, lead, task)
 *    → Performance e validação type-safe
 * 
 * ❌ NÃO USE:
 * - Redux (muito complexo, desnecessário)
 * - Context API para tudo (performance ruim)
 * - useState para formulários grandes (muitos re-renders)
 * 
 * 💡 BENEFÍCIOS:
 * - Cada ferramenta faz o que faz de melhor
 * - Separação clara de responsabilidades
 * - Melhor performance
 * - Código mais limpo e testável
 * - Type-safety em toda a stack
 */
