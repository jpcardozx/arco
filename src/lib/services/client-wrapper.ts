/**
 * Client Wrapper - Wrappers para services que não precisam de Supabase client explícito
 * Usado em componentes client-side
 */

import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { ClientsService } from '@/lib/supabase/clients-service'
import { LeadsService } from '@/lib/supabase/leads-service'
import { TasksService } from '@/lib/supabase/tasks-service'
import type { Client, ClientInput, ClientUpdate } from '@/lib/types/supabase-helpers'
import type { Lead, LeadInput, LeadUpdate } from '@/lib/types/supabase-helpers'
import type { Task, TaskInput, TaskUpdate } from '@/lib/types/supabase-helpers'

/**
 * Clients Service Wrapper - Usa Supabase client do browser automaticamente
 */
export class ClientsServiceWrapper {
  private static getClient() {
    return createSupabaseBrowserClient()
  }

  static async getClients(): Promise<Client[]> {
    return ClientsService.getClients(this.getClient())
  }

  static async getClientById(id: string): Promise<Client | null> {
    return ClientsService.getClient(this.getClient(), id)
  }

  static async createClient(input: ClientInput): Promise<Client> {
    return ClientsService.createClient(this.getClient(), input)
  }

  static async updateClient(id: string, updates: ClientUpdate): Promise<Client> {
    return ClientsService.updateClient(this.getClient(), id, updates)
  }

  static async deleteClient(id: string): Promise<void> {
    return ClientsService.deleteClient(this.getClient(), id)
  }

  static async generateClientCode(): Promise<string> {
    return ClientsService.generateClientCode(this.getClient())
  }

  static async getClientStats() {
    return ClientsService.getClientStats(this.getClient())
  }
}

/**
 * Leads Service Wrapper
 */
export class LeadsServiceWrapper {
  private static getClient() {
    return createSupabaseBrowserClient()
  }

  static async getLeads(): Promise<Lead[]> {
    return LeadsService.getLeads(this.getClient())
  }

  static async getLead(id: string): Promise<Lead | null> {
    return LeadsService.getLead(this.getClient(), id)
  }

  static async createLead(input: LeadInput): Promise<Lead> {
    return LeadsService.createLead(this.getClient(), input)
  }

  static async updateLead(id: string, updates: LeadUpdate): Promise<Lead> {
    return LeadsService.updateLead(this.getClient(), id, updates)
  }

  static async deleteLead(id: string): Promise<void> {
    return LeadsService.deleteLead(this.getClient(), id)
  }

  static async getLeadStats() {
    return LeadsService.getLeadStats(this.getClient())
  }
}

/**
 * Tasks Service Wrapper
 */
export class TasksServiceWrapper {
  private static getClient() {
    return createSupabaseBrowserClient()
  }

  static async getTasks(): Promise<Task[]> {
    return TasksService.getTasks(this.getClient())
  }

  static async getTask(id: string): Promise<Task | null> {
    return TasksService.getTask(this.getClient(), id)
  }

  static async createTask(input: TaskInput): Promise<Task> {
    return TasksService.createTask(this.getClient(), input)
  }

  static async updateTask(id: string, updates: TaskUpdate): Promise<Task> {
    return TasksService.updateTask(this.getClient(), id, updates)
  }

  static async deleteTask(id: string): Promise<void> {
    return TasksService.deleteTask(this.getClient(), id)
  }

  static async getTaskStats() {
    return TasksService.getTaskStats(this.getClient())
  }
}
