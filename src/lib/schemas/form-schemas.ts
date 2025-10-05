/**
 * Zod Schemas - Validação Type-Safe
 * Schemas de validação para todos os formulários
 */

import { z } from 'zod'

// ============================================================================
// CLIENT SCHEMAS
// ============================================================================

export const clientSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo')
    .trim(),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato inválido. Use: (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  
  company: z.string()
    .min(2, 'Nome da empresa muito curto')
    .max(100, 'Nome da empresa muito longo')
    .optional()
    .or(z.literal('')),
  
  website: z.string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
  
  status: z.enum(['lead', 'active', 'inactive'], {
    errorMap: () => ({ message: 'Status inválido' })
  }),
  
  priority: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: 'Prioridade inválida' })
  }),
  
  notes: z.string()
    .max(1000, 'Notas devem ter no máximo 1000 caracteres')
    .optional(),
  
  tags: z.array(z.string()).optional(),
})

export type ClientFormData = z.infer<typeof clientSchema>

// Schema para atualização (todos os campos opcionais)
export const clientUpdateSchema = clientSchema.partial()

export type ClientUpdateData = z.infer<typeof clientUpdateSchema>

// ============================================================================
// LEAD SCHEMAS
// ============================================================================

export const leadSchema = z.object({
  name: z.string()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .trim(),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato: (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  
  company: z.string()
    .max(100, 'Nome da empresa muito longo')
    .optional()
    .or(z.literal('')),
  
  message: z.string()
    .max(500, 'Mensagem muito longa')
    .optional()
    .or(z.literal('')),
  
  source: z.string().optional(),
  campaign: z.string().optional(),
  
  // Lead magnet info
  lead_magnet: z.string().optional(),
  interest: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

// Schema simplificado para landing pages
export const leadCaptureSchema = leadSchema.pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  message: true,
})

export type LeadCaptureData = z.infer<typeof leadCaptureSchema>

// ============================================================================
// TASK SCHEMAS
// ============================================================================

export const taskSchema = z.object({
  title: z.string()
    .min(5, 'Título muito curto')
    .max(200, 'Título muito longo')
    .trim(),
  
  description: z.string()
    .max(2000, 'Descrição muito longa')
    .optional()
    .or(z.literal('')),
  
  status: z.enum(['pending', 'in_progress', 'completed'], {
    errorMap: () => ({ message: 'Status inválido' })
  }),
  
  priority: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: 'Prioridade inválida' })
  }),
  
  due_date: z.coerce.date({
    errorMap: () => ({ message: 'Data inválida' })
  })
    .refine((date) => date >= new Date(), {
      message: 'Data deve ser futura'
    })
    .optional(),
  
  client_id: z.string()
    .uuid('Cliente inválido')
    .optional()
    .or(z.literal('')),
  
  assigned_to: z.string()
    .uuid('Usuário inválido')
    .optional()
    .or(z.literal('')),
  
  tags: z.array(z.string()).optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>

export const taskUpdateSchema = taskSchema.partial()

export type TaskUpdateData = z.infer<typeof taskUpdateSchema>

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo')
    .trim(),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  
  confirmPassword: z.string(),
  
  terms: z.boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar os termos de uso'
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

export type SignupFormData = z.infer<typeof signupSchema>

export const resetPasswordSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

// ============================================================================
// SETTINGS SCHEMAS
// ============================================================================

export const profileUpdateSchema = z.object({
  name: z.string()
    .min(3, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .optional(),
  
  phone: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato: (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  
  company: z.string()
    .max(100, 'Nome da empresa muito longo')
    .optional()
    .or(z.literal('')),
  
  avatar_url: z.string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
})

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>

export const passwordChangeSchema = z.object({
  currentPassword: z.string()
    .min(6, 'Senha atual obrigatória'),
  
  newPassword: z.string()
    .min(8, 'Nova senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

export type PasswordChangeData = z.infer<typeof passwordChangeSchema>

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const filterSchema = z.object({
  status: z.array(z.string()).optional(),
  priority: z.array(z.string()).optional(),
  search: z.string().optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
})

export type FilterData = z.infer<typeof filterSchema>

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Validação assíncrona customizada
 * Exemplo: verificar se email já existe
 */
export const createUniqueEmailSchema = (checkEmailExists: (email: string) => Promise<boolean>) => {
  return z.string()
    .email('Email inválido')
    .refine(async (email) => {
      const exists = await checkEmailExists(email)
      return !exists
    }, {
      message: 'Este email já está em uso'
    })
}

/**
 * Helper para formatar mensagens de erro do Zod
 */
export function formatZodErrors(errors: z.ZodError) {
  return errors.errors.reduce((acc, error) => {
    const path = error.path.join('.')
    acc[path] = error.message
    return acc
  }, {} as Record<string, string>)
}
