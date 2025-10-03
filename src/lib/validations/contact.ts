/**
 * Contact Form Validation Schema
 * Robust validation using Zod for type safety and validation
 */

import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome não pode ter mais de 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .min(1, 'Email é obrigatório'),
  
  phone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(15, 'Telefone não pode ter mais de 15 dígitos')
    .regex(/^[\d\s\(\)\-\+]+$/, 'Telefone deve conter apenas números e símbolos válidos'),
  
  company: z
    .string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da empresa não pode ter mais de 100 caracteres'),
  
  segment: z
    .string()
    .min(1, 'Segmento é obrigatório'),
  
  currentLeads: z
    .string()
    .min(1, 'Quantidade atual de leads é obrigatória')
    .regex(/^\d+$/, 'Deve ser um número válido'),
  
  budget: z
    .string()
    .min(1, 'Orçamento disponível é obrigatório'),
  
  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem não pode ter mais de 1000 caracteres')
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Success messages for better UX
export const successMessages = {
  form: 'Formulário enviado com sucesso! Entraremos em contato em até 2 horas.',
  validation: 'Todos os campos foram preenchidos corretamente.'
}

// Error messages for better UX
export const errorMessages = {
  form: 'Erro ao enviar formulário. Tente novamente ou entre em contato diretamente.',
  network: 'Erro de conexão. Verifique sua internet e tente novamente.',
  validation: 'Por favor, corrija os campos destacados em vermelho.'
}