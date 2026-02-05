'use client'

import { useState, useEffect } from 'react'
import { usePWA } from '@/components/providers/pwa-provider'
import { Smartphone, Download, X } from 'lucide-react'

export function InstallPrompt() {
  const { installPromptEvent, isStandalone, isIOS, dismissInstallPrompt } = usePWA()
  const [visible, setVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const smallScreen = window.innerWidth <= 768
      setIsMobile(mobile || smallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isStandalone) return
    if (!isMobile) return // Only show on mobile

    // Check session-scoped dismiss
    if (sessionStorage.getItem('arco-pwa-install-dismissed') === 'true') return

    // Show on iOS unconditionally (no beforeinstallprompt on iOS)
    // Show on Chrome/Android only when installPromptEvent is available
    if (isIOS || installPromptEvent) {
      const timer = setTimeout(() => setVisible(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [installPromptEvent, isStandalone, isIOS, isMobile])

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

  if (!visible || !isMobile) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Banner card */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
          isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="dialog"
        aria-label="Instalar aplicativo"
      >
        <div className="mx-4 mb-4 relative">
          {/* Main card with gradient border effect */}
          <div className="relative group">
            {/* Gradient glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition duration-300" />
            
            {/* Content card */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              
              <div className="relative p-5">
                {/* Close button - floating style */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group/close"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4 transition-transform group-hover/close:rotate-90" />
                </button>

                <div className="flex gap-4 pr-8">
                  {/* App icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center ring-2 ring-blue-400/30">
                      <Smartphone className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {isIOS ? (
                      <>
                        <h3 className="text-base font-bold text-white mb-1 tracking-tight">
                          Instale o ARCO
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-2">
                          Acesso rápido aos seus serviços de saúde
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                          <span>Toque em</span>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-500/20 text-blue-400 font-semibold">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                            </svg>
                          </span>
                          <span>→</span>
                          <span className="text-white font-medium">Adicionar à Tela</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-base font-bold text-white mb-0.5 tracking-tight">
                          Instale o ARCO
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-3">
                          Acesso rápido e offline aos seus serviços
                        </p>
                        <button
                          onClick={handleInstall}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Download className="w-4 h-4" />
                          <span>Adicionar à Tela</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Feature badges */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700/50">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Acesso Rápido
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Modo Offline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
