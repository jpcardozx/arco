'use client'

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// ============================================================================
// CONTEXT
// ============================================================================

interface PWAContextValue {
  installPromptEvent: any | null
  isStandalone: boolean
  isIOS: boolean
  dismissInstallPrompt: () => void
}

const PWAContext = createContext<PWAContextValue | undefined>(undefined)

// ============================================================================
// PROVIDER
// ============================================================================

interface PWAProviderProps {
  children: ReactNode
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [installPromptEvent, setInstallPromptEvent] = useState<any | null>(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detect standalone mode
    const standaloneMedia = window.matchMedia('(display-mode: standalone)')
    setIsStandalone(standaloneMedia.matches || (navigator as any).standalone === true)

    // Detect iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
        console.error('Service Worker registration failed:', err)
      })
    }

    // Capture beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPromptEvent(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const dismissInstallPrompt = () => {
    setInstallPromptEvent(null)
  }

  const value: PWAContextValue = {
    installPromptEvent,
    isStandalone,
    isIOS,
    dismissInstallPrompt,
  }

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>
}

// ============================================================================
// HOOK
// ============================================================================

export function usePWA() {
  const context = useContext(PWAContext)

  if (!context) {
    throw new Error('usePWA must be used within PWAProvider')
  }

  return context
}
