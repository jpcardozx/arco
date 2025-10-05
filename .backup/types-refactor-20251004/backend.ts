/**
 * Backend Types - Unified Type Definitions
 *
 * Centralized type definitions for backend services
 * Ensures consistency across CRM, Tasks, and User management
 */

// ============================================================================
// User Types
// ============================================================================

export type UserRole = 'admin' | 'user' | 'client';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  full_name?: string;
  department?: string;
  status?: UserStatus;
  createdAt?: Date;
  created_at?: string;
  lastLogin?: Date;
  last_login?: string;
}

// Helper type for role with name property
export interface RoleInfo {
  name: string;
  label: string;
}

export interface UseCurrentUserReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  signOut?: () => Promise<void>;
  isAuthenticated?: boolean;
}

// ============================================================================
// Client Types (CRM)
// ============================================================================

export type ClientStatus = 'lead' | 'prospect' | 'client' | 'active' | 'inactive';
export type ClientPriority = 'low' | 'medium' | 'high';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  company_name?: string;
  website?: string;
  status: ClientStatus;
  priority?: ClientPriority;

  // CRM specific fields
  client_code?: string;
  assigned_to?: string;
  created_by?: string;

  // Contact and follow-up
  last_contact?: string;
  next_follow_up?: string;

  // Project information
  service_interest?: string;
  project_budget?: string;
  property_type?: string;
  budget_min?: number;
  budget_max?: number;
  transaction_type?: string;

  // Additional information
  city?: string;
  neighborhood?: string;
  notes?: string;

  // Timestamps
  created_at?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;
export type ClientUpdate = Partial<Client>;

// ============================================================================
// Task Types
// ============================================================================

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'follow-up' | 'meeting' | 'call' | 'email' | 'other';
export type TaskType = 'task' | 'call' | 'meeting' | 'follow-up' | 'email';
export type TaskVisibility = 'private' | 'public' | 'team';

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date: Date | string; // Supabase retorna string
  dueDate?: Date; // Alias para compatibilidade
  status: TaskStatus;
  priority: TaskPriority;
  category?: TaskCategory;
  task_type?: TaskType;
  visibility?: TaskVisibility;
  client_id?: string;
  clientId?: string; // Alias
  property_id?: string;
  assigned_to?: string;
  assignedTo?: string; // Alias
  created_by?: string;
  start_time?: string;
  end_time?: string;
  reminders?: string[];
  created_at?: string;
  createdAt: Date;
  updated_at?: string;
  updatedAt: Date;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'created_at' | 'updated_at'>;
export type TaskUpdate = Partial<Task>;

// ============================================================================
// Service Response Types
// ============================================================================

export interface ServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface ServiceListResponse<T> {
  data: T[];
  error: Error | null;
  count?: number;
}

// ============================================================================
// Aliquota Types (Tax Calculation)
// ============================================================================

export interface AliquotaData {
  city: string;
  state: string;
  cnae: string;
  faturamento: number;
  aliquota: number;
  impostos: {
    iss: number;
    pis: number;
    cofins: number;
    inss: number;
    ir: number;
    csll: number;
  };
  total: number;
}

// ============================================================================
// Lead Types
// ============================================================================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
export type LeadSource = 'website' | 'referral' | 'social' | 'ads' | 'other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source?: LeadSource | string;
  status: LeadStatus;
  priority?: 'low' | 'medium' | 'high';
  interest_type?: string;
  notes?: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
  created_at?: string;
  updated_at?: string;
}

export type LeadInput = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>;
export type LeadUpdate = Partial<Lead>;
