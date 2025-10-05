/**
 * Tasks Service - Supabase Implementation
 *
 * Serviço real para gerenciamento de tarefas usando Supabase
 * Segue padrões de arquitetura limpa com RLS (Row Level Security)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Task, TaskInput, TaskUpdate } from '@/lib/types/supabase-helpers';

// Re-export types for external use
export type { Task, TaskInput, TaskUpdate } from '@/lib/types/supabase-helpers';

export class TasksService {
  /**
   * Busca todas as tarefas do usuário autenticado
   * RLS garante que apenas tarefas do usuário sejam retornadas
   */
  static async getTasks(supabase: SupabaseClient): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) throw error;

    return (data || []).map(this.mapToTask);
  }

  /**
   * Busca tarefas por cliente
   */
  static async getTasksByClient(
    supabase: SupabaseClient,
    clientId: string
  ): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('client_id', clientId)
      .order('due_date', { ascending: true });

    if (error) throw error;

    return (data || []).map(this.mapToTask);
  }

  /**
   * Busca uma tarefa específica por ID
   */
  static async getTask(supabase: SupabaseClient, id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data ? this.mapToTask(data) : null;
  }

  /**
   * Cria uma nova tarefa
   */
  static async createTask(
    supabase: SupabaseClient,
    input: TaskInput
  ): Promise<Task> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Usuário não autenticado');

    const taskData = {
      title: input.title,
      description: input.description,
      due_date: input.due_date,
      status: input.status,
      priority: input.priority,
      client_id: input.client_id,
      assigned_to: input.assigned_to || user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();

    if (error) throw error;

    return this.mapToTask(data);
  }

  /**
   * Atualiza uma tarefa existente
   */
  static async updateTask(
    supabase: SupabaseClient,
    id: string,
    updates: TaskUpdate
  ): Promise<Task> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.due_date !== undefined) updateData.due_date = updates.due_date;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.priority !== undefined) updateData.priority = updates.priority;
    if (updates.client_id !== undefined) updateData.client_id = updates.client_id;
    if (updates.assigned_to !== undefined) updateData.assigned_to = updates.assigned_to;

    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return this.mapToTask(data);
  }

  /**
   * Deleta uma tarefa
   */
  static async deleteTask(supabase: SupabaseClient, id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Retorna estatísticas das tarefas
   */
  static async getTaskStats(supabase: SupabaseClient): Promise<{
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    overdue: number;
  }> {
    const tasks = await this.getTasks(supabase);
    const now = new Date();

    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => {
        const dueDate = typeof t.due_date === 'string'
          ? new Date(t.due_date)
          : t.due_date;
        return t.status !== 'completed' && dueDate < now;
      }).length,
    };
  }

  /**
   * Mapeia dados do Supabase para tipo Task
   * Converte snake_case para camelCase e garante tipos corretos
   */
  private static mapToTask(data: any): Task {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      status: data.status,
      priority: data.priority,
      category: data.category,
      task_type: data.task_type,
      visibility: data.visibility,
      client_id: data.client_id,
      property_id: data.property_id,
      assigned_to: data.assigned_to,
      created_by: data.created_by,
      start_time: data.start_time,
      end_time: data.end_time,
      reminders: data.reminders,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }
}
