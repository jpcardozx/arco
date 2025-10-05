'use client'

/**
 * 🎯 EXEMPLO COMPLETO DE INTEGRAÇÃO
 * 
 * Este componente demonstra como usar TODAS as ferramentas juntas:
 * - React Hook Form (performance de formulário)
 * - Zod (validação type-safe)
 * - Zustand (UI state - modal)
 * - React Query (server state)
 * - Supabase (persistência)
 */

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2, Save } from 'lucide-react'

// 1️⃣ Schemas Zod
import { clientSchema, type ClientFormData } from '@/lib/schemas/form-schemas'

// 2️⃣ Zustand Store
import { useDashboardStore } from '@/lib/stores/dashboard-store'

// 3️⃣ React Query + Supabase
import { useCreateClient, useUpdateClient } from '@/lib/hooks/use-database'

// 4️⃣ Notificações
import { toast } from 'sonner'

export function ClientFormModal() {
  // ============================================================================
  // 1️⃣ ZUSTAND - UI State (modal aberto/fechado)
  // ============================================================================
  
  const { activeModal, modalData, closeModal } = useDashboardStore()
  const isOpen = activeModal === 'client'
  const isEditMode = !!modalData
  
  // ============================================================================
  // 2️⃣ REACT HOOK FORM + ZOD - Form State
  // ============================================================================
  
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      status: 'lead',
      priority: 'medium',
      notes: '',
      tags: [],
    },
    mode: 'onBlur', // Valida ao sair do campo (melhor UX)
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    watch,
  } = form
  
  // ============================================================================
  // 3️⃣ REACT QUERY + SUPABASE - Server State
  // ============================================================================
  
  const createClient = useCreateClient()
  const updateClient = useUpdateClient()
  
  const isSubmitting = (createClient as any).isPending || (updateClient as any).isPending
  
  // ============================================================================
  // 4️⃣ LÓGICA DO FORMULÁRIO
  // ============================================================================
  
  // Preencher form quando editar
  useEffect(() => {
    if (isEditMode && modalData) {
      reset({
        name: modalData.name,
        email: modalData.email,
        phone: modalData.phone || '',
        company: modalData.company || '',
        website: modalData.website || '',
        status: modalData.status,
        priority: modalData.priority,
        notes: modalData.notes || '',
        tags: modalData.tags || [],
      })
    } else {
      reset() // Limpar form ao criar novo
    }
  }, [isEditMode, modalData, reset])
  
  // Submit handler
  const onSubmit = async (data: ClientFormData) => {
    try {
      if (isEditMode) {
        // Atualizar cliente existente
        await updateClient.mutateAsync({
          id: modalData.id,
          updates: data as any,
        })
        
        toast.success('Cliente atualizado!', {
          description: `${data.name} foi atualizado com sucesso.`,
        })
      } else {
        // Criar novo cliente
        await createClient.mutateAsync({
          ...data,
          client_code: `CLI-${Date.now()}`,
          created_by: 'current-user',
        } as any)
        
        toast.success('Cliente criado!', {
          description: `${data.name} foi adicionado à sua lista.`,
        })
      }
      
      // Fechar modal (Zustand)
      closeModal()
      
      // React Query invalida cache automaticamente ✅
      
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
  // 5️⃣ RENDER
  // ============================================================================
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Atualize as informações do cliente'
              : 'Adicione um novo cliente ao seu CRM'}
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
              <Label htmlFor="phone">Telefone</Label>
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
          
          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              {...register('website')}
              placeholder="https://empresa.com.br"
              disabled={isSubmitting}
              className={errors.website ? 'border-red-500' : ''}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>
          
          {/* Status e Prioridade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watch('status')}
                onValueChange={(value) => setValue('status', value as any)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">
                Prioridade <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watch('priority')}
                onValueChange={(value) => setValue('priority', value as any)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Informações adicionais sobre o cliente..."
              rows={4}
              disabled={isSubmitting}
              className={errors.notes ? 'border-red-500' : ''}
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {watch('notes')?.length || 0}/1000 caracteres
            </p>
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
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Atualizar' : 'Criar'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ============================================================================
// 📊 RESUMO DO QUE ACONTECE:
// ============================================================================

/**
 * 1. ZUSTAND controla se modal está aberto
 *    → useDashboardStore.openModal('client', data)
 * 
 * 2. REACT HOOK FORM + ZOD gerenciam o formulário
 *    → Validação ao sair do campo (onBlur)
 *    → Mensagens de erro automáticas
 *    → Performance otimizada (sem re-renders desnecessários)
 * 
 * 3. REACT QUERY + SUPABASE salvam os dados
 *    → createClient.mutateAsync(data)
 *    → Cache invalidado automaticamente
 *    → UI atualiza sozinha
 * 
 * 4. TOAST notifica sucesso/erro
 *    → Feedback visual imediato
 * 
 * 5. Modal fecha (Zustand)
 *    → closeModal()
 * 
 * ✅ RESULTADO: Código limpo, type-safe, performático
 */
