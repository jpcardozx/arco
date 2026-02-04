'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log do erro para console (pode integrar com Sentry depois)
    console.error('Root Error Boundary:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-md w-full mx-4 p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Algo deu errado
            </h2>
            <p className="text-slate-400 text-sm">
              Ocorreu um erro inesperado ao carregar a página.
            </p>
          </div>

          {/* Error details (apenas em desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
              <p className="text-xs text-red-400 font-mono text-left break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-slate-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Tentar novamente
            </Button>
            <Button
              onClick={() => (window.location.href = '/')}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              Voltar para a página inicial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
