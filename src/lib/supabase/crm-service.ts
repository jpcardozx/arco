/**
 * CRM Service - Unified service for clients, leads and tasks
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import { ClientsService } from './clients-service'
import { LeadsService } from './leads-service'
import { TasksService } from './tasks-service'

// Re-export types
export type { Client, ClientInput, ClientUpdate } from '@/lib/types/supabase-helpers'
export type { Lead, LeadInput, LeadUpdate } from '@/lib/types/supabase-helpers'
export type { Task, TaskInput, TaskUpdate } from '@/lib/types/supabase-helpers'

export class CRMService {
  // Client methods
  static getClients = ClientsService.getClients.bind(ClientsService)
  static getClient = ClientsService.getClient.bind(ClientsService)
  static createClient = ClientsService.createClient.bind(ClientsService)
  static updateClient = ClientsService.updateClient.bind(ClientsService)
  static deleteClient = ClientsService.deleteClient.bind(ClientsService)
  static generateClientCode = ClientsService.generateClientCode.bind(ClientsService)
  static getClientStats = ClientsService.getClientStats.bind(ClientsService)

  // Lead methods
  static getLeads = LeadsService.getLeads.bind(LeadsService)
  static getLead = LeadsService.getLead.bind(LeadsService)
  static createLead = LeadsService.createLead.bind(LeadsService)
  static updateLead = LeadsService.updateLead.bind(LeadsService)
  static deleteLead = LeadsService.deleteLead.bind(LeadsService)
  static getLeadStats = LeadsService.getLeadStats.bind(LeadsService)

  // Task methods
  static getTasks = TasksService.getTasks.bind(TasksService)
  static getTask = TasksService.getTask.bind(TasksService)
  static createTask = TasksService.createTask.bind(TasksService)
  static updateTask = TasksService.updateTask.bind(TasksService)
  static deleteTask = TasksService.deleteTask.bind(TasksService)
  static getTaskStats = TasksService.getTaskStats.bind(TasksService)

  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(supabase: SupabaseClient) {
    const [clients, leads, tasks] = await Promise.all([
      ClientsService.getClients(supabase),
      LeadsService.getLeads(supabase),
      TasksService.getTasks(supabase)
    ])

    return {
      totalClients: clients.length,
      totalLeads: leads.length,
      totalTasks: tasks.length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      completedTasks: tasks.filter(t => t.status === 'completed').length
    }
  }
}

// Export individual services for direct access
export { ClientsService } from './clients-service'
export { LeadsService } from './leads-service'
export { TasksService } from './tasks-service'
