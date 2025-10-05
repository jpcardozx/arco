/**
 * Zoho User Hook - Mock implementation
 * TODO: Replace with real Zoho integration when needed
 */

import { useCurrentUser, type CurrentUser } from './useCurrentUser'

export interface ZohoUser extends CurrentUser {
  zohoId?: string
  zohoOrganization?: string
}

export function useZohoUser() {
  const { user, loading, error } = useCurrentUser()

  // Mock Zoho user - extends current user with Zoho fields
  const zohoUser: ZohoUser | null = user ? {
    ...user,
    name: user.full_name || user.email?.split('@')[0] || 'Usuário',
    company: user.user_metadata?.company as string || 'Default Org',
    zohoId: `ZOHO-${user.id}`,
    zohoOrganization: (user.user_metadata?.company as string) || 'Default Org'
  } : null

  return {
    user: zohoUser,
    loading,
    error,
    isAuthenticated: !!zohoUser, // Authenticated if zohoUser exists
    isZohoConnected: false, // Mock: not connected yet
    syncWithZoho: async () => {
      console.log('TODO: Implement Zoho sync')
      return { success: false, message: 'Zoho integration not implemented' }
    }
  }
}
