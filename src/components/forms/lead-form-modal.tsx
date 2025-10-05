'use client'

/**
 * Lead Form Modal - Captura de Leads
 * Formulário simplificado para captura rápida
 */

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2, Save, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

// Schemas e stores
import { leadSchema, type LeadFormData } from '@/lib/schemas/form-schemas'
import { useDashboardStore } from '@/lib/stores/dashboard-store'

// React Query + Supabase
import { useCreateLead } from '@/lib/hooks/use-database'
import { useUpdateLead } from '@/lib/hooks/useUpdateLead'

export function LeadFormModal() {
  // ============================================================================
  // ZUSTAND - UI State
  // ============================================================================
  
  const { activeModal, modalData, closeModal } = useDashboardStore()
  const isOpen = activeModal === 'lead'
  const isEditMode = !!modalData
  
  // ============================================================================
  // REACT HOOK FORM + ZOD
  // ============================================================================
  
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      source: '',
      lead_magnet: '',
      interest: '',
    },
    mode: 'onBlur',
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form
  
  // ============================================================================
  // REACT QUERY - Server State
  // ============================================================================
  
  const createLead = useCreateLead()
  const updateLead = useUpdateLead()
  
  const isSubmitting = (createLead as any).isPending || (updateLead as any).isPending
  
  // ============================================================================
  // LÓGICA
  // ============================================================================
  
  useEffect(() => {
    if (isEditMode && modalData) {
      reset({
        name: modalData.name,
        email: modalData.email,
        phone: modalData.phone || '',
        company: modalData.metadata?.company || '',
        message: modalData.metadata?.message || '',
        source: modalData.source,
        lead_magnet: modalData.metadata?.lead_magnet || '',
        interest: modalData.metadata?.interest || '',
      })
    } else {
      reset()
    }
  }, [isEditMode, modalData, reset])
  
  const onSubmit = async (data: LeadFormData) => {
    try {
      // Preparar dados com metadata
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        source: data.source || 'manual',
        metadata: {
          company: data.company,
          message: data.message,
          lead_magnet: data.lead_magnet,
          interest: data.interest,
          captured_at: new Date().toISOString(),
        },
      }
      
      if (isEditMode) {
        const mutation = updateLead as any
        await mutation.mutateAsync({
          id: modalData.id,
          ...leadData,
        })
        
        toast.success('Lead atualizado!', {
          description: `${data.name} foi atualizado com sucesso.`,
        })
      } else {
        await createLead.mutateAsync(leadData)
        
        toast.success('Lead capturado!', {
          description: `${data.name} foi adicionado à sua lista.`,
        })
      }
      
      closeModal()
      
    } catch (error) {
      toast.error('Erro ao salvar', {
        description: error instanceof Error ? error.message : 'Tente novamente.',
      })
    }
  }
  
  const handleClose = () => {
    closeModal()
    reset()
  }
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Lead' : 'Novo Lead'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Atualize as informações do lead'
              : 'Capture um novo lead para o funil de vendas'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nome completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="João Silva"
              disabled={isSubmitting}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="joao@empresa.com"
              disabled={isSubmitting}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          {/* Telefone e Empresa */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="(11) 99999-9999"
                disabled={isSubmitting}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Empresa LTDA"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          {/* Mensagem */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem / Interesse</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Como podemos ajudar? Qual é o interesse?"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
          
          {/* Source e Lead Magnet */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Origem</Label>
              <Input
                id="source"
                {...register('source')}
                placeholder="Ex: google, facebook, referral"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lead_magnet">Lead Magnet</Label>
              <Input
                id="lead_magnet"
                {...register('lead_magnet')}
                placeholder="Ex: ebook-seo, calculator-roi"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          {/* Área de interesse */}
          <div className="space-y-2">
            <Label htmlFor="interest">Área de Interesse</Label>
            <Input
              id="interest"
              {...register('interest')}
              placeholder="Ex: SEO, Google Ads, Redes Sociais"
              disabled={isSubmitting}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Atualizar' : 'Capturar Lead'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
