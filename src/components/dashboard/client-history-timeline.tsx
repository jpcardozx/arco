/**
 * Client History Timeline
 * Histórico completo de interações e eventos do cliente
 */

'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle,
  DollarSign,
  Mail,
  Phone,
  Video,
  Users,
  ArrowRight,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { TimelineEvent } from '@/lib/hooks'

interface ClientHistoryTimelineProps {
  events?: TimelineEvent[]
  isLoading?: boolean
}

const iconMap = {
  message: MessageSquare,
  document: FileText,
  payment: DollarSign,
  meeting: Video,
  email: Mail,
  call: Phone,
  milestone: CheckCircle
}

const colorMap = {
  message: 'text-blue-500 bg-blue-500/10',
  document: 'text-purple-500 bg-purple-500/10',
  payment: 'text-emerald-500 bg-emerald-500/10',
  meeting: 'text-orange-500 bg-orange-500/10',
  email: 'text-cyan-500 bg-cyan-500/10',
  call: 'text-pink-500 bg-pink-500/10',
  milestone: 'text-yellow-500 bg-yellow-500/10'
}

export function ClientHistoryTimeline({ 
  events,
  isLoading = false 
}: ClientHistoryTimelineProps) {
  
  // Mock data se não houver eventos reais
  const timelineEvents: TimelineEvent[] = events || [
    {
      id: '1',
      type: 'milestone',
      title: 'Projeto Iniciado',
      description: 'Kickoff meeting realizado com sucesso',
      timestamp: '2025-09-15T10:00:00',
      metadata: { status: 'completed' }
    },
    {
      id: '2',
      type: 'meeting',
      title: 'Reunião de Alinhamento',
      description: 'Definição de escopo e prazos',
      timestamp: '2025-09-18T14:30:00',
      metadata: { 
        status: 'completed',
        participants: ['João Silva', 'Maria Santos', 'Pedro Costa']
      }
    },
    {
      id: '3',
      type: 'document',
      title: 'Proposta Enviada',
      description: 'Proposta comercial detalhada',
      timestamp: '2025-09-20T09:15:00',
      metadata: { status: 'completed' }
    },
    {
      id: '4',
      type: 'payment',
      title: 'Pagamento Recebido',
      description: 'Primeira parcela - Sinal',
      timestamp: '2025-09-22T16:45:00',
      metadata: { 
        amount: 5000,
        status: 'completed'
      }
    },
    {
      id: '5',
      type: 'email',
      title: 'Email de Follow-up',
      description: 'Atualização sobre andamento do projeto',
      timestamp: '2025-09-25T11:20:00',
      metadata: { status: 'completed' }
    },
    {
      id: '6',
      type: 'milestone',
      title: 'Design Aprovado',
      description: 'Cliente aprovou layouts finais',
      timestamp: '2025-09-28T15:00:00',
      metadata: { status: 'completed' }
    },
    {
      id: '7',
      type: 'call',
      title: 'Ligação de Check-in',
      description: 'Discussão sobre ajustes finais',
      timestamp: '2025-10-01T10:30:00',
      metadata: { status: 'completed' }
    },
    {
      id: '8',
      type: 'meeting',
      title: 'Apresentação do MVP',
      description: 'Demonstração da versão beta',
      timestamp: '2025-10-04T14:00:00',
      metadata: { 
        status: 'pending',
        participants: ['João Silva', 'Equipe ARCO']
      }
    }
  ]

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return `Hoje às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffInHours < 48) {
      return `Ontem às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Clock className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-white">
              Histórico de Interações
            </CardTitle>
            <CardDescription>
              Timeline completa das atividades do cliente
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {timelineEvents.map((event, index) => {
              const Icon = iconMap[event.type]
              const colorClass = colorMap[event.type]
              const isPending = event.metadata?.status === 'pending'
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute left-5 top-12 w-0.5 h-full bg-slate-700/50" />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`relative z-10 p-2.5 rounded-lg ${colorClass} shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 p-4 rounded-lg border transition-all ${
                      isPending 
                        ? 'bg-slate-800/30 border-slate-700/50 border-dashed' 
                        : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">
                            {event.title}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {event.description}
                          </p>
                        </div>
                        
                        {event.metadata?.status && (
                          <Badge 
                            variant="outline" 
                            className={
                              event.metadata.status === 'completed'
                                ? 'border-emerald-500/30 text-emerald-400'
                                : event.metadata.status === 'pending'
                                ? 'border-yellow-500/30 text-yellow-400'
                                : 'border-red-500/30 text-red-400'
                            }
                          >
                            {event.metadata.status === 'completed' ? 'Concluído' : 
                             event.metadata.status === 'pending' ? 'Pendente' : 'Cancelado'}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(event.timestamp)}</span>
                        </div>
                        
                        {event.metadata?.amount && (
                          <div className="text-sm font-medium text-emerald-400">
                            R$ {event.metadata.amount.toLocaleString('pt-BR')}
                          </div>
                        )}
                        
                        {event.metadata?.participants && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Users className="h-3.5 w-3.5" />
                            <span>{event.metadata.participants.length} participantes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Load More */}
          <div className="flex justify-center mt-6">
            <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <span>Ver histórico completo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
