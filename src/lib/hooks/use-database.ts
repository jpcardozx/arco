/**
 * Database Query Hooks
 * React Query hooks for Supabase data fetching with caching and optimistic updates
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Database } from '@/types/supabase'
import { toast } from 'sonner'

type Client = Database['public']['Tables']['clients']['Row']
type ClientInsert = Database['public']['Tables']['clients']['Insert']
type ClientUpdate = Database['public']['Tables']['clients']['Update']

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

type Lead = Database['public']['Tables']['leads']['Row']
type LeadInsert = Database['public']['Tables']['leads']['Insert']

// ==================== CLIENTS ====================

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('[useClients] Error:', error)
        throw error
      }

      return data as Client[]
    },
  })
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('[useClient] Error:', error)
        throw error
      }

      return data as Client
    },
    enabled: !!id,
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newClient: ClientInsert) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('clients')
        .insert(newClient)
        .select()
        .single()

      if (error) {
        console.error('[useCreateClient] Error:', error)
        throw error
      }

      return data as Client
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success('Cliente criado com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao criar cliente: ${error.message}`)
    },
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ClientUpdate }) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('[useUpdateClient] Error:', error)
        throw error
      }

      return data as Client
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['client', data.id] })
      toast.success('Cliente atualizado com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar cliente: ${error.message}`)
    },
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('[useDeleteClient] Error:', error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success('Cliente removido com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao remover cliente: ${error.message}`)
    },
  })
}

// ==================== TASKS ====================

export function useTasks(filters?: { clientId?: string; status?: string }) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      let query = supabase
        .from('tasks')
        .select('*, clients(*)')
        .order('due_date', { ascending: true })

      if (filters?.clientId) {
        query = query.eq('client_id', filters.clientId)
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query

      if (error) {
        console.error('[useTasks] Error:', error)
        throw error
      }

      return data
    },
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTask: TaskInsert) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('tasks')
        .insert(newTask)
        .select()
        .single()

      if (error) {
        console.error('[useCreateTask] Error:', error)
        throw error
      }

      return data as Task
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa criada com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao criar tarefa: ${error.message}`)
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TaskUpdate }) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('[useUpdateTask] Error:', error)
        throw error
      }

      return data as Task
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa atualizada com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar tarefa: ${error.message}`)
    },
  })
}

// ==================== LEADS ====================

export function useLeads(filters?: { status?: string; source?: string }) {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.source) {
        query = query.eq('source', filters.source)
      }

      const { data, error } = await query

      if (error) {
        console.error('[useLeads] Error:', error)
        throw error
      }

      return data as Lead[]
    },
  })
}

export function useCreateLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newLead: LeadInsert) => {
      const supabase = createSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('leads')
        .insert(newLead)
        .select()
        .single()

      if (error) {
        console.error('[useCreateLead] Error:', error)
        throw error
      }

      return data as Lead
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      toast.success('Lead capturado com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao capturar lead: ${error.message}`)
    },
  })
}
