/**
 * useWhatsApp Hook - Stub
 */

export interface WhatsAppStatus {
  status: 'healthy' | 'degraded' | 'disconnected'
  api: boolean
  credentials: boolean
  lastCheck: string
}

export function useWhatsApp() {
  return {
    isConnected: false,
    qrCode: null,
    loading: false,
    error: null,
    status: {
      status: 'healthy',
      api: false,
      credentials: false,
      lastCheck: new Date().toISOString()
    } as WhatsAppStatus,
    isCheckingStatus: false,
    checkStatus: async () => {},
  }
}

export default useWhatsApp
