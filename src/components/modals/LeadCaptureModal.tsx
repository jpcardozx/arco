'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
  User,
  Mail,
  Building2,
  Phone,
  X,
  CheckCircle2,
  Gift,
  Zap,
  TrendingUp,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

const leadCaptureSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa obrigatório'),
  phone: z.string().optional(),
})

type LeadCaptureData = z.infer<typeof leadCaptureSchema>

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  trigger?: 'exit-intent' | 'time-based' | 'scroll' | 'manual'
  offer?: {
    title: string
    description: string
    benefits: string[]
  }
}

const defaultOffer = {
  title: 'Checklist Gratuito: 50 Pontos de Otimização',
  description: 'Descubra exatamente onde seu site está perdendo vendas',
  benefits: [
    'Análise completa de Performance',
    'Otimizações de SEO prioritárias', 
    'Melhorias de UX/Conversão',
    'Implementação passo a passo'
  ]
}

export function LeadCaptureModal({ 
  isOpen, 
  onClose, 
  trigger = 'manual',
  offer = defaultOffer 
}: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<LeadCaptureData>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
    },
  })

  const onSubmit = async (data: LeadCaptureData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'lead_capture', {
          event_category: 'engagement',
          event_label: trigger,
          value: 1
        })
      }

      setIsSuccess(true)
      toast.success('Material enviado para seu email!')
      
      // Auto close after success
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        form.reset()
      }, 3000)
      
    } catch (error) {
      toast.error('Erro ao enviar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'exit-intent':
        return '⚡ Última chance! Não saia sem o material gratuito'
      case 'time-based':
        return '🎯 Você está aqui há um tempo. Que tal levar algo valioso?'
      case 'scroll':
        return '👀 Vejo que você está interessado. Quer acelerar os resultados?'
      default:
        return '🚀 Transforme seus resultados hoje mesmo'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Left side - Offer details */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-purple-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-semibold mb-4">
                    <Gift className="w-4 h-4 mr-2" />
                    100% Gratuito
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {offer.title}
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="font-semibold text-blue-100">Você vai receber:</p>
                  {offer.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-blue-50">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-100 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">+127% de conversão média</span>
                  </div>
                  <p className="text-xs text-blue-200 mt-1">
                    Resultado médio dos clientes que aplicaram o checklist
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-6">
                      <p className="text-sm text-gray-400 mb-2">
                        {getTriggerMessage()}
                      </p>
                      <h3 className="text-xl font-bold mb-2">
                        Acesso Imediato
                      </h3>
                      <p className="text-gray-400">
                        Preencha abaixo e receba em 30 segundos
                      </p>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                  <Input
                                    {...field}
                                    placeholder="Nome completo"
                                    className="pl-10 h-12 bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400"
                                    disabled={isSubmitting}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="Email profissional"
                                    className="pl-10 h-12 bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400"
                                    disabled={isSubmitting}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                  <Input
                                    {...field}
                                    placeholder="Nome da empresa"
                                    className="pl-10 h-12 bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-400"
                                    disabled={isSubmitting}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="pt-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Zap className="mr-2 h-5 w-5" />
                                Quero o Material Gratuito
                              </>
                            )}
                          </Button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          🔒 Seus dados estão seguros. Sem spam, apenas conteúdo de valor.
                        </p>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3">
                      Material Enviado! 🎉
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Verifique seu email agora (e a caixa de spam também)
                    </p>
                    
                    <div className="bg-white/5 rounded-lg p-4 border border-gray-600">
                      <p className="text-sm text-gray-300">
                        <ArrowRight className="w-4 h-4 inline mr-2" />
                        <strong>Próximo passo:</strong> Agende uma{' '}
                        <a href="/contato" className="text-blue-400 hover:text-blue-300 underline">
                          consultoria gratuita
                        </a>{' '}
                        para implementar as melhorias
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook para usar o modal com diferentes triggers
export function useLeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  // Time-based trigger (30 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false)
  }
}