/**
 * WhatsApp Store - Stub
 */

export interface WhatsAppContact {
  id: string
  name: string
  phone: string
  avatar?: string
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount: number
  isPinned?: boolean
  isArchived?: boolean
  isOnline?: boolean
  tags: string[]
}

export type ViewMode = 'all' | 'unread' | 'pinned' | 'archived'

export const useWhatsAppStore = () => ({
  contacts: [] as WhatsAppContact[],
  messages: [],
  activeContactId: null as string | null,
  selectedContacts: [] as string[],
  viewMode: 'all' as ViewMode,
  
  getFilteredContacts: () => [] as WhatsAppContact[],
  setActiveContact: (id: string) => {},
  addToSelectedContacts: (id: string) => {},
  removeFromSelectedContacts: (id: string) => {},
  pinContact: (id: string) => {},
  unpinContact: (id: string) => {},
  archiveContact: (id: string) => {},
})

export default useWhatsAppStore
