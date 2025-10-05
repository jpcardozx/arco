/**
 * Design System Components - Pareto Stub
 */

'use client'

export function Button({ children, ...props }: any) {
  return <button {...props}>{children}</button>
}

export function Card({ children, ...props }: any) {
  return <div {...props}>{children}</div>
}

export function Input({ ...props }: any) {
  return <input {...props} />
}

export function Select({ children, ...props }: any) {
  return <select {...props}>{children}</select>
}

// Componentes adicionais stub
export function MetricCard({ ...props }: any) {
  return <div {...props} />
}

export function PageHeader({ ...props }: any) {
  return <div {...props} />
}

export function EmptyState({ ...props }: any) {
  return <div {...props} />
}

export function Skeleton({ ...props }: any) {
  return <div {...props} />
}

export function MetricsGrid({ children, ...props }: any) {
  return <div {...props}>{children}</div>
}

// Tipos exportados
export interface DashboardMetrics {
  totalClients?: number
  activeLeads?: number
  pendingTasks?: number
  [key: string]: any
}

export interface PropertyPerformance {
  id: string
  name: string
  views?: number
  [key: string]: any
}

export interface LeadActivity {
  id: string
  type: string
  timestamp: string
  [key: string]: any
}

export interface UpcomingTask {
  id: string
  title: string
  due_date: string
  [key: string]: any
}
