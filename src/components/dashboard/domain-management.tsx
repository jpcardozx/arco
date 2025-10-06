/**
 * Domain Management Component
 * Gerenciamento de domínio, DNS, páginas e performance do site
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Server,
  Shield,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ExternalLink,
  RefreshCw,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { DomainData } from '@/lib/hooks'

interface DomainManagementProps {
  domainData?: DomainData
  onRefresh?: () => void
  isLoading?: boolean
}

export function DomainManagement({ 
  domainData, 
  onRefresh,
  isLoading = false 
}: DomainManagementProps) {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data se não houver dados reais
  const data: DomainData = domainData || {
    domain: 'example.com',
    isVerified: true,
    ssl: {
      enabled: true,
      expiry: '2025-12-31',
      issuer: "Let's Encrypt"
    },
    dns: {
      status: 'healthy',
      records: [
        { type: 'A', name: '@', value: '192.0.2.1', status: 'ok' },
        { type: 'CNAME', name: 'www', value: 'example.com', status: 'ok' },
        { type: 'MX', name: '@', value: 'mail.example.com', status: 'ok' },
        { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', status: 'ok' }
      ]
    },
    performance: {
      speed: 92,
      seo: 88,
      accessibility: 95,
      bestPractices: 90
    },
    pages: [
      { url: '/', title: 'Home', views: 12450, avgTime: '2:34', bounceRate: 32 },
      { url: '/servicos', title: 'Serviços', views: 5820, avgTime: '3:12', bounceRate: 25 },
      { url: '/sobre', title: 'Sobre', views: 3240, avgTime: '1:45', bounceRate: 45 },
      { url: '/contato', title: 'Contato', views: 2180, avgTime: '1:20', bounceRate: 28 }
    ]
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/10'
    if (score >= 70) return 'bg-yellow-500/10'
    return 'bg-red-500/10'
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-white">
                Gestão de Domínio
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <span className="font-mono text-sm">{data.domain}</span>
                {data.isVerified && (
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                )}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="dns">DNS</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="pages">Páginas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* SSL Status */}
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className={data.ssl.enabled ? 'h-5 w-5 text-emerald-500' : 'h-5 w-5 text-red-500'} />
                  <span className="font-medium text-white">Certificado SSL</span>
                </div>
                <Badge variant="outline" className={data.ssl.enabled ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}>
                  {data.ssl.enabled ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              {data.ssl.enabled && (
                <div className="space-y-1 text-sm text-slate-400">
                  <div className="flex justify-between">
                    <span>Emissor:</span>
                    <span className="text-slate-300">{data.ssl.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validade:</span>
                    <span className="text-slate-300">{new Date(data.ssl.expiry).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* DNS Health */}
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-white">Status DNS</span>
                </div>
                <Badge variant="outline" className={
                  data.dns.status === 'healthy' 
                    ? 'border-emerald-500/30 text-emerald-400'
                    : data.dns.status === 'warning'
                    ? 'border-yellow-500/30 text-yellow-400'
                    : 'border-red-500/30 text-red-400'
                }>
                  {data.dns.status === 'healthy' ? 'Saudável' : data.dns.status === 'warning' ? 'Atenção' : 'Erro'}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">
                {data.dns.records.length} registros DNS configurados
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs text-slate-400">Performance</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.performance.speed}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs text-slate-400">SEO Score</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.performance.seo}</p>
              </div>
            </div>
          </TabsContent>

          {/* DNS Tab */}
          <TabsContent value="dns" className="space-y-3 mt-4">
            {data.dns.records.map((record, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {record.type}
                      </Badge>
                      <span className="text-sm font-medium text-white">{record.name}</span>
                      {record.status === 'ok' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono break-all">
                      {record.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4 mt-4">
            {Object.entries(data.performance).map(([key, value], index) => {
              const labels = {
                speed: 'Velocidade',
                seo: 'SEO',
                accessibility: 'Acessibilidade',
                bestPractices: 'Boas Práticas'
              }
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{labels[key as keyof typeof labels]}</span>
                    <span className={`text-lg font-bold ${getScoreColor(value)}`}>
                      {value}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={value} 
                      className="h-2"
                    />
                  </div>
                </motion.div>
              )
            })}

            <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-blue-300">
                💡 <strong>Dica:</strong> Scores acima de 90 indicam excelente performance. 
                Continue assim!
              </p>
            </div>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-3 mt-4">
            {data.pages.map((page, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">{page.title}</h4>
                    <p className="text-xs text-slate-400 font-mono">{page.url}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Visualizações</p>
                    <p className="text-lg font-bold text-white">{page.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Tempo Médio</p>
                    <p className="text-lg font-bold text-white">{page.avgTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Bounce Rate</p>
                    <p className={`text-lg font-bold ${page.bounceRate < 40 ? 'text-emerald-500' : 'text-yellow-500'}`}>
                      {page.bounceRate}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
