/**
 * Type Helpers - Utilities para facilitar type conversions e validações
 */

import type { Client, Lead, Task } from './supabase-helpers'

/**
 * Converte campos snake_case para camelCase e vice-versa
 */
export type SnakeToCamel<T> = {
  [K in keyof T as K extends `${infer P}_${infer S}`
    ? `${P}${Capitalize<S>}`
    : K]: T[K]
}

/**
 * Helper para converter Task de snake_case para camelCase
 */
export function normalizeTask(task: Partial<Task>): Task {
  return {
    ...task,
    id: task.id || '',
    title: task.title || '',
    status: task.status || 'pending',
    priority: task.priority || 'medium',
  } as Task
}

/**
 * Helper para converter Client
 */
export function normalizeClient(client: Partial<Client>): Client {
  return {
    ...client,
    id: client.id || '',
    name: client.name || '',
    email: client.email || '',
    status: client.status || 'lead',
  } as Client
}

/**
 * Helper para converter Lead
 */
export function normalizeLead(lead: Partial<Lead>): Lead {
  return {
    ...lead,
    id: lead.id || '',
    name: lead.name || '',
    email: lead.email || '',
    status: lead.status || 'new',
  } as Lead
}

/**
 * Type guard para checar se é uma string de data válida
 */
export function isDateString(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const date = new Date(value)
  return !isNaN(date.getTime())
}

/**
 * Safe date converter - aceita string ou Date
 */
export function toDate(value: string | Date | undefined): Date | undefined {
  if (!value) return undefined
  if (value instanceof Date) return value
  if (isDateString(value)) return new Date(value)
  return undefined
}

/**
 * Safe string para Date.split converter
 */
export function safeSplit(value: string | Date | undefined, separator: string): string[] {
  if (!value) return []
  if (typeof value === 'string') return value.split(separator)
  if (value instanceof Date) return value.toISOString().split(separator)
  return []
}

/**
 * ExtendedTask helper type - adiciona campos que podem existir em runtime
 */
export type ExtendedTask = Task & {
  category?: string | null
  project_name?: string
  project_value?: number
  client_name?: string
  client_phone?: string
}

/**
 * Normalize ExtendedTask com category
 */
export function normalizeExtendedTask(task: Partial<ExtendedTask>): ExtendedTask {
  const baseTask = normalizeTask(task)
  return {
    ...baseTask,
    category: task.category || '',
    project_name: task.project_name,
    project_value: task.project_value,
    client_name: task.client_name,
  }
}

/**
 * Type-safe property accessor - retorna undefined se não existir
 */
export function safeGet<T, K extends keyof T>(obj: T | undefined, key: K): T[K] | undefined {
  return obj?.[key]
}

/**
 * Type assertion helpers
 */
export const is = {
  string: (value: unknown): value is string => typeof value === 'string',
  number: (value: unknown): value is number => typeof value === 'number',
  date: (value: unknown): value is Date => value instanceof Date,
  array: <T>(value: unknown): value is T[] => Array.isArray(value),
}
