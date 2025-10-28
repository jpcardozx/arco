/**
 * Cookie Consent Banner - LGPD Compliant
 * 
 * Por que é crítico:
 * 1. LGPD compliance (obrigatório no Brasil)
 * 2. Meta CAPI precisa de email/phone (só pode coletar após consent)
 * 3. PostHog tracking precisa de opt-in
 * 
 * Features:
 * - Banner fixo no bottom (primeira visita)
 * - Aceitar/Rejeitar todos
 * - LocalStorage persistence
 * - PostHog opt-in/opt-out integration
 * - Não mostra novamente após escolha
 */

'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface ConsentState {
  marketing: boolean
  analytics: boolean
  timestamp: number
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if consent already given
    const consent = localStorage.getItem('arco_cookie_consent')
    
    if (!consent) {
      // First visit - show banner after 1s delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else {
      // Already consented - enable tracking if accepted
      const consentData: ConsentState = JSON.parse(consent)
      
      if (consentData.analytics && typeof window !== 'undefined' && window.posthog) {
        window.posthog.opt_in_capturing()
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const consent: ConsentState = {
      marketing: true,
      analytics: true,
      timestamp: Date.now()
    }

    // Save to localStorage
    localStorage.setItem('arco_cookie_consent', JSON.stringify(consent))

    // Enable PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.opt_in_capturing()
      
      // Track consent event
      window.posthog.capture('cookie_consent_accepted', {
        marketing: true,
        analytics: true
      })
    }

    // Close banner with animation
    closeBanner()
  }

  const handleRejectAll = () => {
    const consent: ConsentState = {
      marketing: false,
      analytics: false,
      timestamp: Date.now()
    }

    // Save to localStorage
    localStorage.setItem('arco_cookie_consent', JSON.stringify(consent))

    // Disable PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.opt_out_capturing()
      
      // Track rejection (before opt-out)
      window.posthog.capture('cookie_consent_rejected')
    }

    // Close banner with animation
    closeBanner()
  }

  const closeBanner = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowBanner(false)
      setIsClosing(false)
    }, 300) // Match animation duration
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4 z-50 shadow-2xl transition-transform duration-300 ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            <h3
              id="cookie-consent-title"
              className="text-lg font-semibold text-white mb-2 flex items-center gap-2"
            >
              <span className="text-2xl">🍪</span>
              Cookies e Privacidade
            </h3>
            
            <p
              id="cookie-consent-description"
              className="text-sm text-slate-300 mb-4 max-w-3xl"
            >
              Usamos cookies para melhorar sua experiência, personalizar conteúdo e 
              otimizar nossos anúncios. Seus dados são protegidos de acordo com a{' '}
              <strong>LGPD (Lei Geral de Proteção de Dados)</strong>.
            </p>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Aceitar todos os cookies"
              >
                Aceitar Todos
              </button>
              
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Rejeitar todos os cookies"
              >
                Rejeitar Todos
              </button>
              
              <a
                href="/privacidade"
                className="px-6 py-2 text-slate-300 hover:text-white font-medium transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
                aria-label="Ver política de privacidade"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleRejectAll}
            className="text-slate-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded"
            aria-label="Fechar banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// HELPER FUNCTIONS (Export for use elsewhere)
// ============================================================================

/**
 * Get current consent state
 * 
 * @returns ConsentState or null if not set
 */
export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null
  
  const consent = localStorage.getItem('arco_cookie_consent')
  if (!consent) return null
  
  try {
    return JSON.parse(consent)
  } catch {
    return null
  }
}

/**
 * Check if user has consented to marketing cookies
 */
export function hasMarketingConsent(): boolean {
  const consent = getConsentState()
  return consent?.marketing ?? false
}

/**
 * Check if user has consented to analytics cookies
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsentState()
  return consent?.analytics ?? false
}

/**
 * Clear consent (for testing)
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('arco_cookie_consent')
}

// ============================================================================
// TYPESCRIPT AUGMENTATION (for window.posthog)
// ============================================================================

declare global {
  interface Window {
    posthog?: {
      opt_in_capturing: () => void
      opt_out_capturing: () => void
      capture: (event: string, properties?: Record<string, any>) => void
    }
  }
}
