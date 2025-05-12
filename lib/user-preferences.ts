/**
 * User preferences manager with client and server support
 * Handles theme, language, and other user-specific settings
 */

import { useEffect, useState } from 'react'

// User preference types
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'pt' | 'es' | 'fr'
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'default' | 'large' | 'xl'
  analyticsConsent: boolean
  cookieConsent: boolean
  lastUpdated: number
}

// Default preferences
export const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  reducedMotion: false,
  highContrast: false,
  fontSize: 'default',
  analyticsConsent: false,
  cookieConsent: false,
  lastUpdated: Date.now()
}

// Storage key
const PREFERENCES_KEY = 'arco-user-preferences'

/**
 * Save preferences to localStorage
 */
export function savePreferences(prefs: Partial<UserPreferences>): void {
  if (typeof window === 'undefined') return
  
  try {
    const currentPrefs = getPreferences()
    const updatedPrefs = { 
      ...currentPrefs, 
      ...prefs,
      lastUpdated: Date.now() 
    }
    
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updatedPrefs))
    
    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent('preferencesUpdated', { 
      detail: updatedPrefs 
    }))
  } catch (err) {
    console.error('Failed to save preferences:', err)
  }
}

/**
 * Get preferences from localStorage
 */
export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaultPreferences
  
  try {
    const storedPrefs = localStorage.getItem(PREFERENCES_KEY)
    if (!storedPrefs) return defaultPreferences
    
    return {
      ...defaultPreferences,
      ...JSON.parse(storedPrefs)
    }
  } catch (err) {
    console.error('Failed to retrieve preferences:', err)
    return defaultPreferences
  }
}

/**
 * React hook to use preferences
 */
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Load preferences on mount
  useEffect(() => {
    // Set initial state
    setPreferences(getPreferences())
    setIsLoaded(true)
    
    // Listen for preference changes
    const handlePreferencesUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<UserPreferences>
      setPreferences(customEvent.detail)
    }
    
    window.addEventListener('preferencesUpdated', handlePreferencesUpdated)
    
    return () => {
      window.removeEventListener('preferencesUpdated', handlePreferencesUpdated)
    }
  }, [])
  
  // Update preferences function
  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    savePreferences(newPrefs)
    setPreferences(prev => ({ ...prev, ...newPrefs }))
  }
  
  return { preferences, updatePreferences, isLoaded }
}

/**
 * Apply system preferences when available
 */
export function initializeSystemPreferences() {
  if (typeof window === 'undefined') return
  
  try {
    const savedPrefs = getPreferences()
    
    // Apply theme preference
    if (savedPrefs.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    } else {
      document.documentElement.classList.toggle('dark', savedPrefs.theme === 'dark')
    }
    
    // Apply reduced motion preference
    if (savedPrefs.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion')
    }
    
    // Apply high contrast preference
    if (savedPrefs.highContrast) {
      document.documentElement.classList.add('high-contrast')
    }
    
    // Apply font size preference
    if (savedPrefs.fontSize !== 'default') {
      document.documentElement.classList.add(`text-${savedPrefs.fontSize}`)
    }
    
  } catch (err) {
    console.error('Failed to initialize system preferences:', err)
  }
}
