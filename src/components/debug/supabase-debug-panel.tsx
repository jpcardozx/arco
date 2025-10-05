/**
 * Supabase Debug Panel
 * Real-time monitoring of connection status, auth state and queries
 */

'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, Wifi, WifiOff, Database, User, RefreshCw } from 'lucide-react'
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'

interface ConnectionState {
  status: 'connected' | 'disconnected' | 'checking'
  lastChecked: Date
  latency?: number
}

interface DebugLog {
  id: string
  timestamp: Date
  type: 'query' | 'auth' | 'error' | 'info'
  message: string
  details?: unknown
}

export function SupabaseDebugPanel() {
  const [connection, setConnection] = useState<ConnectionState>({
    status: 'checking',
    lastChecked: new Date()
  })
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [logs, setLogs] = useState<DebugLog[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const addLog = (type: DebugLog['type'], message: string, details?: unknown) => {
    const log: DebugLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type,
      message,
      details
    }
    setLogs(prev => [log, ...prev].slice(0, 50)) // Keep last 50 logs
  }

  const checkConnection = async () => {
    const startTime = performance.now()

    try {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('clients')
        .select('count')
        .limit(1)
        .single()

      const latency = Math.round(performance.now() - startTime)

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows found" which is OK for health check
        throw error
      }

      setConnection({
        status: 'connected',
        lastChecked: new Date(),
        latency
      })

      addLog('info', `Connection verified (${latency}ms)`)
    } catch (error) {
      setConnection({
        status: 'disconnected',
        lastChecked: new Date()
      })

      addLog('error', 'Connection failed', error)
    }
  }

  const loadAuthState = async () => {
    try {
      const supabase = createSupabaseBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()
      const { data: { user } } = await supabase.auth.getUser()

      setSession(session)
      setUser(user)

      if (user) {
        addLog('auth', `User authenticated: ${user.email}`)
      } else {
        addLog('info', 'No active session')
      }
    } catch (error) {
      addLog('error', 'Failed to load auth state', error)
    }
  }

  useEffect(() => {
    checkConnection()
    loadAuthState()

    const interval = setInterval(checkConnection, 30000) // Check every 30s

    return () => clearInterval(interval)
  }, [])

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <Database className="h-4 w-4 mr-2" />
        Debug Panel
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[600px] overflow-auto z-50 shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Debug
          </CardTitle>
          <Button
            onClick={() => setIsExpanded(false)}
            variant="ghost"
            size="sm"
          >
            ×
          </Button>
        </div>
        <CardDescription>
          Real-time connection and auth monitoring
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connection</span>
            <Badge
              variant={connection.status === 'connected' ? 'default' : 'destructive'}
              className="flex items-center gap-1"
            >
              {connection.status === 'connected' ? (
                <Wifi className="h-3 w-3" />
              ) : (
                <WifiOff className="h-3 w-3" />
              )}
              {connection.status}
            </Badge>
          </div>

          {connection.latency && (
            <p className="text-xs text-muted-foreground">
              Latency: {connection.latency}ms
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Last checked: {connection.lastChecked.toLocaleTimeString()}
          </p>

          <Button
            onClick={checkConnection}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Test Connection
          </Button>
        </div>

        <Separator />

        {/* Auth Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Authentication</span>
            <Badge
              variant={user ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              <User className="h-3 w-3" />
              {user ? 'Authenticated' : 'Guest'}
            </Badge>
          </div>

          {user && (
            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">
                Email: <span className="font-mono">{user.email}</span>
              </p>
              <p className="text-muted-foreground">
                ID: <span className="font-mono text-[10px]">{user.id.substring(0, 16)}...</span>
              </p>
            </div>
          )}

          {session && (
            <p className="text-xs text-muted-foreground">
              Expires: {new Date(session.expires_at || 0).toLocaleString()}
            </p>
          )}

          <Button
            onClick={loadAuthState}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Refresh Auth
          </Button>
        </div>

        <Separator />

        {/* Activity Log */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Activity Log</span>
            <Button
              onClick={() => setLogs([])}
              variant="ghost"
              size="sm"
            >
              Clear
            </Button>
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                No activity yet
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="text-xs p-2 rounded-lg border bg-card/50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {log.type === 'error' ? (
                      <XCircle className="h-3 w-3 text-destructive" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    )}
                    <span className="font-medium">{log.type}</span>
                    <span className="text-muted-foreground ml-auto">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{log.message}</p>
                  {log.details ? (
                    <pre className="mt-1 text-[10px] text-muted-foreground overflow-x-auto">
                      {String(JSON.stringify(log.details, null, 2)).substring(0, 100)}
                    </pre>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Environment Info */}
        <Separator />
        <div className="space-y-1">
          <span className="text-sm font-medium">Environment</span>
          <div className="text-xs space-y-1">
            <p className="text-muted-foreground">
              URL: <span className="font-mono break-all">
                {process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')}
              </span>
            </p>
            <p className="text-muted-foreground">
              Project: <span className="font-mono">{process.env.SUPABASE_PROJECT_ID}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
