'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Bug, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState } from 'react'

interface ErrorDisplayProps {
  error: Error | null
  reset?: () => void
  onRetry?: () => void // Alias for reset
  context?: string
}

export function ErrorDisplay({ error, reset, onRetry, context }: ErrorDisplayProps) {
  const handleRetry = reset || onRetry
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (error) {
      // Log detalhado para debugging
      console.group(`🔴 Error in ${context || 'Dashboard'}`)
      console.error('Error:', error)
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
      console.error('Timestamp:', new Date().toISOString())
      console.groupEnd()
    }
  }, [error, context])

  if (!error) return null

  const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
  const isAuthError = error.message.includes('auth') || error.message.includes('unauthorized')
  const isDatabaseError = error.message.includes('database') || error.message.includes('relation')

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">
              {isNetworkError && 'Erro de Conexão'}
              {isAuthError && 'Erro de Autenticação'}
              {isDatabaseError && 'Erro de Banco de Dados'}
              {!isNetworkError && !isAuthError && !isDatabaseError && 'Erro Inesperado'}
            </CardTitle>
          </div>
          {handleRetry && (
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Tentar Novamente
            </Button>
          )}
        </div>
        <CardDescription>
          {isNetworkError && 'Não foi possível conectar ao servidor. Verifique sua conexão.'}
          {isAuthError && 'Sua sessão expirou. Por favor, faça login novamente.'}
          {isDatabaseError && 'Erro ao buscar dados. Tente novamente em alguns instantes.'}
          {!isNetworkError && !isAuthError && !isDatabaseError && 'Ocorreu um erro inesperado.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert>
          <Bug className="h-4 w-4" />
          <AlertTitle>Para Desenvolvedores</AlertTitle>
          <AlertDescription className="font-mono text-xs">
            {error.message}
          </AlertDescription>
        </Alert>

        <Button
          onClick={() => setShowDetails(!showDetails)}
          variant="ghost"
          size="sm"
          className="w-full gap-2"
        >
          {showDetails ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Ocultar Detalhes
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Mostrar Detalhes
            </>
          )}
        </Button>

        {showDetails && (
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Context:</p>
              <p className="text-xs font-mono">{context || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Message:</p>
              <p className="text-xs font-mono">{error.message}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Stack:</p>
              <pre className="text-xs font-mono overflow-auto max-h-40 whitespace-pre-wrap">
                {error.stack}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Timestamp:</p>
              <p className="text-xs font-mono">{new Date().toISOString()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  // Alternative props for direct usage
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, action, actionLabel, onAction }: EmptyStateProps) {
  const finalAction = action || (actionLabel && onAction ? { label: actionLabel, onClick: onAction } : undefined)
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && <Icon className="h-12 w-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>
      {finalAction && (
        <Button onClick={finalAction.onClick} variant="outline">
          {finalAction.label}
        </Button>
      )}
    </div>
  )
}
