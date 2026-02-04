'use client'

import { useState, useEffect } from 'react'
import { usePWA } from '@/components/providers/pwa-provider'

export function InstallPrompt() {
  const { installPromptEvent, isStandalone, isIOS, dismissInstallPrompt } = usePWA()
  const [visible, setVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isStandalone) return

    // Check session-scoped dismiss
    if (sessionStorage.getItem('arco-pwa-install-dismissed') === 'true') return

    // Show on iOS unconditionally (no beforeinstallprompt on iOS)
    // Show on Chrome/Android only when installPromptEvent is available
    if (isIOS || installPromptEvent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [installPromptEvent, isStandalone, isIOS])

  const handleDismiss = () => {
    setIsClosing(true)
    setTimeout(() => {
      setVisible(false)
      setIsClosing(false)
      sessionStorage.setItem('arco-pwa-install-dismissed', 'true')
      dismissInstallPrompt()
    }, 300)
  }

  const handleInstall = async () => {
    if (!installPromptEvent) return
    installPromptEvent.prompt()
    const { outcome } = await installPromptEvent.choice
    if (outcome === 'accepted') {
      dismissInstallPrompt()
      setVisible(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 px-4 pt-4 z-50 shadow-2xl transition-transform duration-300 ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      role="dialog"
      aria-label="Instalar aplicativo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            {isIOS ? (
              <>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Adicione o ARCO à tela de início
                </h3>
                <p className="text-sm text-slate-300">
                  Toque no <span className="text-white font-medium">⎋</span> e selecione{' '}
                  <strong className="text-white">Adicionar à tela de início</strong>.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Adicione o ARCO à tela de início
                </h3>
                <p className="text-sm text-slate-300">
                  Acesso direto ao dashboard e serviços.
                </p>
                <button
                  onClick={handleInstall}
                  className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Adicionar
                </button>
              </>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
