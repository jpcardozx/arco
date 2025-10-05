'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useLeadCapture } from '@/lib/supabase/lead-capture'
import type { LeadCaptureData } from '@/lib/supabase/lead-capture'
import { Loader2, Download, CheckCircle2 } from 'lucide-react'

interface LeadCaptureFormProps {
  leadMagnet?: string           // 'ebook-seo', 'calculator-roi', etc
  interest?: string             // 'seo', 'ads', 'web-design'
  redirectTo?: string           // URL para redirecionar após captura
  showMessage?: boolean         // Mostrar campo de mensagem
  submitText?: string           // Texto do botão
  successMessage?: string       // Mensagem de sucesso customizada
  onSuccess?: (leadId: string) => void
}

export function LeadCaptureForm({
  leadMagnet,
  interest,
  redirectTo,
  showMessage = false,
  submitText = 'Baixar Agora',
  successMessage,
  onSuccess,
}: LeadCaptureFormProps) {
  const router = useRouter()
  const { capture, isSubmitting, error } = useLeadCapture()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.name || !formData.email) {
      toast.error('Por favor, preencha nome e email')
      return
    }
    
    // Preparar dados com tracking automático
    const leadData: LeadCaptureData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      message: formData.message || undefined,
      lead_magnet: leadMagnet,
      interest: interest,
      // UTMs são capturados automaticamente pela função captureLead
    }
    
    // Capturar lead
    const result = await capture(leadData, {
      autoEnrich: true,
      sendNotification: true,
      tags: leadMagnet ? [leadMagnet] : undefined,
    })
    
    if (result.success) {
      setSuccess(true)
      
      // Mostrar mensagem de sucesso
      toast.success(successMessage || '✅ Lead capturado! Verifique seu email.')
      
      // Callback customizado
      if (onSuccess && result.leadId) {
        onSuccess(result.leadId)
      }
      
      // Redirecionar após 2 segundos
      if (redirectTo) {
        setTimeout(() => {
          router.push(redirectTo as any)
        }, 2000)
      }
      
      // Analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_captured', {
          lead_magnet: leadMagnet,
          interest: interest,
        })
      }
    } else {
      toast.error(result.error || 'Erro ao enviar formulário')
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          Obrigado! 🎉
        </h3>
        <p className="text-green-700 dark:text-green-300">
          {successMessage || 'Enviamos o material para seu email. Verifique sua caixa de entrada!'}
        </p>
        {redirectTo && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            Redirecionando...
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo *</Label>
        <Input
          id="name"
          type="text"
          placeholder="João Silva"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email profissional *</Label>
        <Input
          id="email"
          type="email"
          placeholder="joao@empresa.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <Label htmlFor="phone">WhatsApp (opcional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      {/* Empresa */}
      <div className="space-y-2">
        <Label htmlFor="company">Empresa (opcional)</Label>
        <Input
          id="company"
          type="text"
          placeholder="Nome da sua empresa"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      {/* Mensagem */}
      {showMessage && (
        <div className="space-y-2">
          <Label htmlFor="message">Como podemos ajudar?</Label>
          <Textarea
            id="message"
            placeholder="Conte-nos sobre seu projeto..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={isSubmitting}
            rows={4}
          />
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-3">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            {submitText}
          </>
        )}
      </Button>

      {/* Privacy note */}
      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você concorda com nossa política de privacidade. 
        Nunca compartilharemos seus dados.
      </p>
    </form>
  )
}

// ============================================================================
// COMPONENTE DE LEAD MAGNET MODAL
// ============================================================================

interface LeadMagnetModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  leadMagnet: string
  downloadUrl?: string
}

export function LeadMagnetModal({
  isOpen,
  onClose,
  title,
  description,
  leadMagnet,
  downloadUrl,
}: LeadMagnetModalProps) {
  if (!isOpen) return null

  const handleSuccess = (leadId: string) => {
    console.log('Lead captured:', leadId)
    
    // Se tem URL de download, abrir em nova aba
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
    
    // Fechar modal após 3 segundos
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <LeadCaptureForm
          leadMagnet={leadMagnet}
          submitText="Baixar Gratuitamente"
          successMessage="Material enviado! Verifique seu email 📧"
          onSuccess={handleSuccess}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
