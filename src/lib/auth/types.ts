/**
 * Auth Types
 * Type definitions for authentication and authorization
 */

export type UserRole = 'admin' | 'user' | 'client'

export type UserStatus = 'active' | 'inactive' | 'suspended'

export type UserProfile = AuthUser // Alias para compatibilidade

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  status: UserStatus
  name?: string
  full_name?: string
  avatar?: string
  company?: string
  phone?: string
  department?: string
  last_login?: string
  createdAt?: Date
  lastLogin?: Date
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
  refreshToken?: string
  expiresAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  company?: string
  phone?: string
}

export interface ResetPasswordData {
  email: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
