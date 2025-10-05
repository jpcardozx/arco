/**
 * Shared Types - TypeScript Pareto Fix
 * Tipos centralizados para evitar duplicação e erros de importação
 */

// ============================================
// STATUS ENUMS
// ============================================

export type ClientStatus = 'lead' | 'active' | 'inactive'
export type TaskStatus = 'pending' | 'in_progress' | 'completed'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type Priority = 'high' | 'medium' | 'low'

// ============================================
// CORE ENTITIES
// ============================================

export interface Client {
  id: string
  user_id?: string
  name: string
  email: string
  phone?: string
  company?: string
  client_code: string
  status: ClientStatus
  priority: Priority
  notes?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  due_date?: string
  client_id?: string
  assigned_to?: string
  completed_at?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  source: string
  status: LeadStatus
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// ============================================
// FORM TYPES
// ============================================

export interface ClientFormData {
  name: string
  email: string
  phone?: string
  company?: string
  status: ClientStatus
  priority: Priority
  notes?: string
}

export interface TaskFormData {
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  due_date?: string
  client_id?: string
  assigned_to?: string
}

export interface LeadFormData {
  name: string
  email: string
  phone?: string
  source: string
  status: LeadStatus
  metadata?: Record<string, any>
}

// ============================================
// STATS & METRICS
// ============================================

export interface TaskStats {
  total: number
  pending: number
  in_progress: number
  completed: number
  overdue: number
}

export interface LeadStats {
  total: number
  new: number
  contacted: number
  qualified: number
  converted: number
  lost: number
  conversion_rate: number
}

export interface ClientStats {
  total: number
  active: number
  leads: number
  inactive: number
}

// ============================================
// TYPE GUARDS
// ============================================

export function isValidTask(task: any): task is Task {
  return (
    task &&
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    ['pending', 'in_progress', 'completed'].includes(task.status)
  )
}

export function isValidClient(client: any): client is Client {
  return (
    client &&
    typeof client.id === 'string' &&
    typeof client.name === 'string' &&
    ['lead', 'active', 'inactive'].includes(client.status)
  )
}

export function isValidLead(lead: any): lead is Lead {
  return (
    lead &&
    typeof lead.id === 'string' &&
    typeof lead.name === 'string' &&
    ['new', 'contacted', 'qualified', 'converted', 'lost'].includes(lead.status)
  )
}

// ============================================
// TYPE ASSERTIONS
// ============================================

export function assertClientStatus(status: string): ClientStatus {
  const validStatuses: ClientStatus[] = ['lead', 'active', 'inactive']
  return validStatuses.includes(status as ClientStatus)
    ? (status as ClientStatus)
    : 'lead'
}

export function assertTaskStatus(status: string): TaskStatus {
  const validStatuses: TaskStatus[] = ['pending', 'in_progress', 'completed']
  return validStatuses.includes(status as TaskStatus)
    ? (status as TaskStatus)
    : 'pending'
}

export function assertLeadStatus(status: string): LeadStatus {
  const validStatuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted', 'lost']
  return validStatuses.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : 'new'
}

export function assertPriority(priority: string): Priority {
  const validPriorities: Priority[] = ['high', 'medium', 'low']
  return validPriorities.includes(priority as Priority)
    ? (priority as Priority)
    : 'medium'
}

// ============================================
// UTILITY TYPES
// ============================================

export function safePathname(pathname: string | null): string {
  return pathname ?? '/'
}

export function safeInvoke<T extends (...args: any[]) => any>(
  fn: T | undefined,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  return fn?.(...args)
}

export type WithId<T> = T & { id: string }
export type WithTimestamps<T> = T & {
  created_at: string
  updated_at: string
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
