'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useWhatsApp } from '@/lib/hooks/useWhatsApp'
// CORREÇÃO 1: Importações nomeadas para os componentes do card.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, RefreshCw, Wifi, WifiOff, Settings, AlertTriangle } from 'lucide-react'

type WhatsAppApiStatus = {
  status: 'healthy' | 'degraded' | 'disconnected'
  api: boolean
  credentials: boolean
  lastCheck?: string
  phoneNumberId?: string
  error?: string
}

// CORREÇÃO 3: Define um tipo específico para os temas para corrigir o erro de indexação.
type Theme = 'gray' | 'yellow' | 'green' | 'red';

// -- Componentes de UI Extraídos para Clareza --

const StatusItem = ({ icon, title, value, delay }: { icon: React.ReactNode; title: string; value: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex items-center space-x-3 p-3 border rounded-lg bg-white"
  >
    {icon}
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-600">{value}</p>
    </div>
  </motion.div>
)

const InfoBanner = ({ theme, icon, title, message, details }: { theme: 'green' | 'red' | 'yellow'; icon: React.ReactNode; title: string; message: string; details?: string[] }) => {
  const colors = {
    yellow: { text: 'text-yellow-900', subtext: 'text-yellow-700', background: 'bg-yellow-50 border-yellow-200' },
    green: { text: 'text-green-900', subtext: 'text-green-700', background: 'bg-green-50 border-green-200' },
    red: { text: 'text-red-900', subtext: 'text-red-700', background: 'bg-red-50 border-red-200' },
  }
  const themeColors = colors[theme]

  return (
    <div className={`border rounded-lg p-4 ${themeColors.background}`}>
      <div className="flex items-start space-x-3">
        {icon}
        <div>
          <h4 className={`font-medium ${themeColors.text}`}>{title}</h4>
          <p className={`text-sm mt-1 ${themeColors.subtext}`}>{message}</p>
          {details && (
            <div className="mt-2 space-y-1">
              {details.map((detail) => (
                <p key={detail} className={`text-xs ${themeColors.subtext}`}>
                  ✓ {detail}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// -- Componente Principal --

export default function WhatsAppStatus() {
  // CORREÇÃO 2: Remove o tipo genérico do hook e aplica a tipagem diretamente na variável 'status'.
  const { status, isCheckingStatus, checkStatus }: {
    status: WhatsAppApiStatus | null;
    isCheckingStatus: boolean;
    checkStatus: () => void;
  } = useWhatsApp()

  const statusDetails = useMemo(() => {
    if (!status) {
      return {
        theme: 'gray' as Theme,
        icon: <Settings className="w-4 h-4" />,
        text: 'Verificando...',
        cardBorderColor: 'border-l-gray-400',
        isConfigured: false,
        isApiConnected: false,
      }
    }

    if (!status.credentials) {
      return {
        theme: 'yellow' as Theme,
        icon: <Settings className="w-4 h-4" />,
        text: 'Configuração Pendente',
        cardBorderColor: 'border-l-yellow-500',
        isConfigured: false,
        isApiConnected: status.api,
      }
    }
    
    if (status.status === 'healthy') {
      return {
        theme: 'green' as Theme,
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'WhatsApp API Online',
        cardBorderColor: 'border-l-green-500',
        isConfigured: true,
        isApiConnected: status.api,
      }
    }

    if (status.status === 'degraded') {
      return {
        theme: 'yellow' as Theme,
        icon: <AlertTriangle className="w-4 h-4" />,
        text: 'WhatsApp API Degradado',
        cardBorderColor: 'border-l-yellow-500',
        isConfigured: true,
        isApiConnected: status.api,
      }
    }

    return {
      theme: 'red' as Theme,
      icon: <XCircle className="w-4 h-4" />,
      text: 'WhatsApp API Offline',
      cardBorderColor: 'border-l-red-500',
      isConfigured: true,
      isApiConnected: status.api,
    }
  }, [status])

  const colors: Record<Theme, { iconContainer: string; badge: string }> = {
    gray: { iconContainer: 'text-gray-600 bg-gray-100', badge: 'text-gray-800 bg-gray-100 border-gray-200' },
    yellow: { iconContainer: 'text-yellow-600 bg-yellow-100', badge: 'text-yellow-800 bg-yellow-100 border-yellow-200' },
    green: { iconContainer: 'text-green-600 bg-green-100', badge: 'text-green-800 bg-green-100 border-green-200' },
    red: { iconContainer: 'text-red-600 bg-red-100', badge: 'text-red-800 bg-red-100 border-red-200' },
  }
  
  const themeColors = colors[statusDetails.theme]
  const phoneNumberId = status?.phoneNumberId || 'Não disponível' // CORREÇÃO 4: Agora 'status' é corretamente tipado

  return (
    <Card className={`border-l-4 transition-colors ${statusDetails.cardBorderColor}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${themeColors.iconContainer}`}>
              {statusDetails.icon}
            </div>
            <div>
              <CardTitle className="text-lg">Status da API</CardTitle>
              <CardDescription>WhatsApp Business API - Meta Developer</CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkStatus}
            disabled={isCheckingStatus || !status}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isCheckingStatus ? 'animate-spin' : ''}`} />
            {isCheckingStatus ? 'Verificando...' : 'Verificar'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <Badge variant="outline" className={`font-semibold ${themeColors.badge}`}>
            {statusDetails.text}
          </Badge>
          {status?.lastCheck && (
            <span className="text-sm text-gray-500">
              Última verificação: {new Date(status.lastCheck).toLocaleTimeString('pt-BR')}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusItem
            icon={statusDetails.isApiConnected ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-red-600" />}
            title="Conexão API"
            value={statusDetails.isApiConnected ? 'Conectado' : 'Desconectado'}
            delay={0}
          />
          <StatusItem
            icon={statusDetails.isConfigured ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-yellow-600" />}
            title="Credenciais"
            value={statusDetails.isConfigured ? 'Configuradas' : 'Pendentes'}
            delay={0.1}
          />
          <StatusItem
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            title="Número Oficial"
            value={`ID: ${phoneNumberId}`}
            delay={0.2}
          />
        </div>

        {/* Banners Condicionais */}
        {statusDetails.theme === 'green' && (
          <InfoBanner
            theme="green"
            icon={<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
            title="WhatsApp Business API Configurado"
            message="Sistema integrado com a Meta Developer Platform. Envios funcionando via API oficial."
            details={[`Phone Number ID: ${phoneNumberId}`, 'Access Token configurado', 'Fallback para WhatsApp Web disponível']}
          />
        )}
        
        {status?.error && statusDetails.theme === 'red' && (
          <InfoBanner
            theme="red"
            icon={<XCircle className="w-5 h-5 text-red-600 mt-0.5" />}
            title="Erro na API"
            message={String(status.error)} // CORREÇÃO 4: Agora 'status.error' é reconhecido
          />
        )}

        {statusDetails.theme === 'yellow' && (
          <InfoBanner
            theme="yellow"
            icon={<AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
            title="Configuração Necessária"
            message="Configure as credenciais do WhatsApp Business API para utilizar todas as funcionalidades."
          />
        )}
      </CardContent>
    </Card>
  )
}