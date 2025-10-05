/**
 * Data Sharing Consent Component
 * Opt-in ético e transparente para compartilhamento de dados
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

interface DataSharingOption {
  id: string
  label: string
  description: string
  benefit: string
  enabled: boolean
  category: 'analytics' | 'performance' | 'security'
}

interface DataSharingConsentProps {
  options?: DataSharingOption[]
  onUpdate?: (options: DataSharingOption[]) => void
}

export function DataSharingConsent({ 
  options: initialOptions,
  onUpdate 
}: DataSharingConsentProps) {
  const [expanded, setExpanded] = useState(false)
  const [options, setOptions] = useState<DataSharingOption[]>(initialOptions || [
    {
      id: 'analytics',
      label: 'Dados de Uso Anônimos',
      description: 'Compartilhe como você utiliza a plataforma para nos ajudar a melhorar',
      benefit: 'Receba sugestões personalizadas baseadas em padrões de uso',
      enabled: false,
      category: 'analytics'
    },
    {
      id: 'performance',
      label: 'Métricas de Performance',
      description: 'Permita que coletemos dados de performance do seu site',
      benefit: 'Acesso a relatórios comparativos e benchmarks do setor',
      enabled: false,
      category: 'performance'
    },
    {
      id: 'security',
      label: 'Alertas de Segurança',
      description: 'Compartilhe logs de segurança para detecção proativa de ameaças',
      benefit: 'Proteção avançada com análise de padrões de ataque',
      enabled: false,
      category: 'security'
    }
  ])

  const handleToggle = (optionId: string) => {
    const updated = options.map(opt => 
      opt.id === optionId ? { ...opt, enabled: !opt.enabled } : opt
    )
    setOptions(updated)
    onUpdate?.(updated)
  }

  const enabledCount = options.filter(opt => opt.enabled).length

  const categoryIcons = {
    analytics: Eye,
    performance: CheckCircle2,
    security: Shield
  }

  const categoryColors = {
    analytics: 'text-blue-500 bg-blue-500/10',
    performance: 'text-emerald-500 bg-emerald-500/10',
    security: 'text-purple-500 bg-purple-500/10'
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <Lock className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                Controle de Privacidade
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  {enabledCount} de {options.length} ativo{enabledCount !== 1 ? 's' : ''}
                </Badge>
              </CardTitle>
              <CardDescription>
                Você decide o que compartilhar. Pode mudar a qualquer momento.
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {/* Info Banner */}
              <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm text-indigo-300 font-medium">
                      Transparência Total
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Todos os dados são <strong className="text-slate-300">anonimizados</strong> e 
                      você mantém <strong className="text-slate-300">controle total</strong>. 
                      Jamais vendemos suas informações. 
                      Usamos apenas para melhorar o serviço que você já contratou.
                    </p>
                  </div>
                </div>
              </div>

              {/* Options */}
              {options.map((option, index) => {
                const Icon = categoryIcons[option.category]
                const colorClass = categoryColors[option.category]
                
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all ${
                      option.enabled
                        ? 'bg-slate-800/50 border-slate-700'
                        : 'bg-slate-800/20 border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${colorClass} shrink-0`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="text-white font-medium mb-1">
                              {option.label}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {option.description}
                            </p>
                          </div>
                          
                          {option.enabled && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
                            >
                              <div className="flex gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-emerald-300">
                                  <strong>Benefício ativo:</strong> {option.benefit}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      <Switch
                        checked={option.enabled}
                        onCheckedChange={() => handleToggle(option.id)}
                        className="ml-4"
                      />
                    </div>
                  </motion.div>
                )
              })}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  {enabledCount > 0 ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span>
                    {enabledCount > 0 
                      ? 'Dados sendo compartilhados de forma anônima'
                      : 'Nenhum dado sendo compartilhado'
                    }
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const allDisabled = options.map(opt => ({ ...opt, enabled: false }))
                    setOptions(allDisabled)
                    onUpdate?.(allDisabled)
                  }}
                  disabled={enabledCount === 0}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Desativar Tudo
                </Button>
              </div>

              {/* Privacy Policy Link */}
              <div className="text-center pt-2">
                <a 
                  href="#" 
                  className="text-xs text-slate-500 hover:text-slate-400 transition-colors underline"
                >
                  Leia nossa Política de Privacidade completa
                </a>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
