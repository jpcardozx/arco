'use client'

/**
 * Task Form Modal - Formulário Completo
 * React Hook Form + Zod + Zustand + React Query + Supabase
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
import { Loader2, Save, Calendar as CalendarIcon } from 'lucide-react'
import { toast } from 'sonner'

// Schemas e stores
import { taskSchema, type TaskFormData } from '@/lib/schemas/form-schemas'
import { useDashboardStore } from '@/lib/stores/dashboard-store'

// React Query + Supabase
import { useCreateTask, useUpdateTask, useClients } from '@/lib/hooks/use-database'

export function TaskFormModal() {
  // ============================================================================
  // ZUSTAND - UI State
  // ============================================================================
  
  const { activeModal, modalData, closeModal } = useDashboardStore()
  const isOpen = activeModal === 'task'
  const isEditMode = !!modalData
  
  // ============================================================================
  // REACT HOOK FORM + ZOD
  // ============================================================================
  
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      due_date: undefined,
      client_id: '',
      assigned_to: '',
      tags: [],
    },
    mode: 'onBlur',
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = form
  
  // ============================================================================
  // REACT QUERY - Server State
  // ============================================================================
  
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const { data: clients, isLoading: loadingClients } = useClients()
  
  const isSubmitting = (createTask as any).isPending || (updateTask as any).isPending
  
  // ============================================================================
  // LÓGICA
  // ============================================================================
  
  useEffect(() => {
    if (isEditMode && modalData) {
      reset({
        title: modalData.title,
        description: modalData.description || '',
        status: modalData.status,
        priority: modalData.priority,
        due_date: modalData.due_date ? new Date(modalData.due_date) : undefined,
        client_id: modalData.client_id || '',
        assigned_to: modalData.assigned_to || '',
        tags: modalData.tags || [],
      })
    } else {
      reset()
    }
  }, [isEditMode, modalData, reset])
  
  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEditMode) {
        await updateTask.mutateAsync({
          id: modalData.id,
          updates: data as any,
        })
        
        toast.success('Task atualizada!', {
          description: `${data.title} foi atualizada com sucesso.`,
        })
      } else {
        await createTask.mutateAsync({
          ...data,
          created_by: 'current-user',
        } as any)
        
        toast.success('Task criada!', {
          description: `${data.title} foi adicionada à sua lista.`,
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
            {isEditMode ? 'Editar Task' : 'Nova Task'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Atualize as informações da task'
              : 'Adicione uma nova task ao seu gerenciador'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Ex: Reunião com cliente"
              disabled={isSubmitting}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          
          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descreva os detalhes da task..."
              rows={4}
              disabled={isSubmitting}
            />
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
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in_progress">Em Andamento</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
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
          
          {/* Data de vencimento */}
          <div className="space-y-2">
            <Label htmlFor="due_date">
              Data de Vencimento
            </Label>
            <div className="relative">
              <Input
                id="due_date"
                type="datetime-local"
                {...register('due_date')}
                disabled={isSubmitting}
                className={errors.due_date ? 'border-red-500' : ''}
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.due_date && (
              <p className="text-sm text-red-500">{errors.due_date.message}</p>
            )}
          </div>
          
          {/* Cliente vinculado */}
          <div className="space-y-2">
            <Label htmlFor="client_id">Cliente (opcional)</Label>
            <Select
              value={watch('client_id')}
              onValueChange={(value) => setValue('client_id', value)}
              disabled={isSubmitting || loadingClients}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum</SelectItem>
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} - {client.company || client.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
