/**
 * Zustand Store - Dashboard UI State
 * Estado efêmero da UI (não persiste no Supabase)
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ============================================================================
// DASHBOARD STORE
// ============================================================================

export interface DashboardFilters {
  status?: string[]
  priority?: string[]
  search?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

interface DashboardState {
  // Sidebar
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  
  // Filters
  filters: DashboardFilters
  
  // View mode
  viewMode: 'grid' | 'list' | 'kanban'
  
  // Active modal
  activeModal: 'client' | 'lead' | 'task' | null
  modalData: any
  
  // Quick actions
  quickActionsOpen: boolean
}

interface DashboardActions {
  // Sidebar
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapse: () => void
  
  // Filters
  setFilters: (filters: Partial<DashboardFilters>) => void
  clearFilters: () => void
  
  // View mode
  setViewMode: (mode: DashboardState['viewMode']) => void
  
  // Modals
  openModal: (modal: DashboardState['activeModal'], data?: any) => void
  closeModal: () => void
  
  // Quick actions
  toggleQuickActions: () => void
  
  // Reset all
  reset: () => void
}

type DashboardStore = DashboardState & DashboardActions

const initialState: DashboardState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  filters: {},
  viewMode: 'grid',
  activeModal: null,
  modalData: null,
  quickActionsOpen: false,
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Sidebar
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      // Filters
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      clearFilters: () => set({ filters: {} }),
      
      // View mode
      setViewMode: (mode) => set({ viewMode: mode }),
      
      // Modals
      openModal: (modal, data) => set({ activeModal: modal, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
      
      // Quick actions
      toggleQuickActions: () => set((state) => ({ quickActionsOpen: !state.quickActionsOpen })),
      
      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'arco-dashboard',
      storage: createJSONStorage(() => localStorage),
      // Persistir apenas preferências, não estado temporário
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        viewMode: state.viewMode,
      }),
    }
  )
)

// ============================================================================
// USER PREFERENCES STORE
// ============================================================================

interface UserPreferencesState {
  theme: 'light' | 'dark' | 'system'
  language: 'pt-BR' | 'en-US'
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
  }
  display: {
    compactMode: boolean
    showAvatars: boolean
    animationsEnabled: boolean
  }
}

interface UserPreferencesActions {
  setTheme: (theme: UserPreferencesState['theme']) => void
  setLanguage: (language: UserPreferencesState['language']) => void
  toggleNotification: (key: keyof UserPreferencesState['notifications']) => void
  toggleDisplay: (key: keyof UserPreferencesState['display']) => void
}

type UserPreferencesStore = UserPreferencesState & UserPreferencesActions

export const useUserPreferences = create<UserPreferencesStore>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'pt-BR',
      notifications: {
        email: true,
        push: true,
        desktop: false,
      },
      display: {
        compactMode: false,
        showAvatars: true,
        animationsEnabled: true,
      },
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleNotification: (key) => set((state) => ({
        notifications: {
          ...state.notifications,
          [key]: !state.notifications[key],
        },
      })),
      toggleDisplay: (key) => set((state) => ({
        display: {
          ...state.display,
          [key]: !state.display[key],
        },
      })),
    }),
    {
      name: 'arco-user-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// ============================================================================
// NOTIFICATION STORE
// ============================================================================

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    href: string
  }
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
}

interface NotificationActions {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

type NotificationStore = NotificationState & NotificationActions

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => set((state) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    }
    
    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }
  }),
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  
  removeNotification: (id) => set((state) => {
    const notification = state.notifications.find((n) => n.id === id)
    return {
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: notification && !notification.read
        ? Math.max(0, state.unreadCount - 1)
        : state.unreadCount,
    }
  }),
  
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))

// ============================================================================
// HELPERS / HOOKS
// ============================================================================

/**
 * Hook para mostrar notificação de sucesso
 */
export function useSuccessNotification() {
  const addNotification = useNotificationStore((state) => state.addNotification)
  
  return (title: string, message: string) => {
    addNotification({ type: 'success', title, message })
  }
}

/**
 * Hook para mostrar notificação de erro
 */
export function useErrorNotification() {
  const addNotification = useNotificationStore((state) => state.addNotification)
  
  return (title: string, message: string) => {
    addNotification({ type: 'error', title, message })
  }
}

/**
 * Hook para aplicar filtros
 */
export function useDashboardFilters() {
  const filters = useDashboardStore((state) => state.filters)
  const setFilters = useDashboardStore((state) => state.setFilters)
  const clearFilters = useDashboardStore((state) => state.clearFilters)
  
  return { filters, setFilters, clearFilters }
}
