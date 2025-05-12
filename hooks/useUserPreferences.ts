'use client'

import { useContext } from 'react'
import { UserPreferencesContext } from '../lib/user-preferences-context'

/**
 * Hook to access user preferences
 * This resolves module resolution issues by providing a direct import
 */
export function useUserPreferences() {
  const context = useContext(UserPreferencesContext)
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider')
  }
  return context
}
