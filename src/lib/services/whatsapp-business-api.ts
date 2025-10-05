/**
 * WhatsApp Business API - Stub
 */

interface Template {
  name: string
}

export const WhatsAppBusinessAPI = {
  sendMessage: async () => {},
  getTemplates: async () => [],
  healthCheck: async () => ({ status: 'disconnected' as const, api: false, credentials: false }),
  isConfigured: () => false,
  Templates: {} as Record<string, Template>,
}

export default WhatsAppBusinessAPI
