/**
 * Finance Server Actions
 * Actions para gerenciar sistema financeiro completo
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/supabase'

type Transaction = Database['public']['Tables']['transactions']['Row']
type Invoice = Database['public']['Tables']['invoices']['Row']

// ============================================
// FINANCIAL SUMMARY
// ============================================

export async function getFinancialSummary(period: '7d' | '30d' | '90d' | '1y' = '30d') {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Use RPC function for optimized query
  const { data, error } = await supabase
    .rpc('get_financial_summary', {
      p_user_id: user.id,
      p_period: period
    })
    .single()

  if (error) throw error

  return {
    totalIncome: Number(data.total_income || 0),
    totalExpenses: Number(data.total_expenses || 0),
    totalCommissions: Number(data.total_commissions || 0),
    netProfit: Number(data.net_profit || 0),
    pendingPayments: Number(data.pending_payments || 0),
    transactionCount: data.transaction_count || 0,
    monthlyGrowth: 0, // TODO: Calculate from historical data
  }
}

// ============================================
// TRANSACTIONS
// ============================================

export async function getTransactions(filters?: {
  type?: 'income' | 'expense' | 'commission' | 'all'
  status?: 'pending' | 'completed' | 'cancelled' | 'all'
  period?: '7d' | '30d' | '90d' | '1y'
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  let query = supabase
    .from('transactions')
    .select(`
      *,
      invoice:invoices(invoice_number),
      client:clients(name)
    `)
    .eq('user_id', user.id)
    .order('transaction_date', { ascending: false })

  // Apply filters
  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type)
  }

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters?.period) {
    const periodStart = getPeriodStart(filters.period)
    query = query.gte('transaction_date', periodStart.toISOString())
  }

  const { data, error } = await query

  if (error) throw error

  return (data || []).map(transaction => ({
    id: transaction.id,
    type: transaction.type as 'income' | 'expense' | 'commission',
    category: transaction.category,
    description: transaction.description,
    amount: Number(transaction.amount),
    date: new Date(transaction.transaction_date),
    status: transaction.status as 'pending' | 'completed' | 'cancelled',
    paymentMethod: transaction.payment_method,
    invoiceId: transaction.invoice_id,
    invoiceNumber: transaction.invoice?.invoice_number,
    clientId: transaction.client_id,
    clientName: transaction.client?.name,
    projectId: transaction.project_id,
  }))
}

export async function createTransaction(data: {
  type: 'income' | 'expense' | 'commission'
  category: string
  description: string
  amount: number
  transactionDate: string
  status?: 'pending' | 'completed'
  paymentMethod?: string
  clientId?: string
  projectId?: string
  notes?: string
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: transaction, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      type: data.type,
      category: data.category,
      description: data.description,
      amount: data.amount,
      transaction_date: data.transactionDate,
      status: data.status || 'completed',
      payment_method: data.paymentMethod,
      client_id: data.clientId,
      project_id: data.projectId,
      notes: data.notes,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/finance')
  return transaction
}

export async function updateTransaction(id: string, data: Partial<{
  category: string
  description: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod: string
  notes: string
}>) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('transactions')
    .update(data)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/dashboard/finance')
}

export async function deleteTransaction(id: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/dashboard/finance')
}

// ============================================
// INVOICES
// ============================================

export async function getInvoices(filters?: {
  status?: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'all'
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  let query = supabase
    .from('invoices')
    .select(`
      *,
      client:clients(name, email)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query

  if (error) throw error

  return data || []
}

export async function createInvoice(data: {
  clientId?: string
  amount: number
  dueDate: string
  description?: string
  items?: any[]
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Generate invoice number
  const invoiceNumber = `INV-${Date.now()}`

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      user_id: user.id,
      client_id: data.clientId,
      invoice_number: invoiceNumber,
      amount: data.amount,
      due_date: data.dueDate,
      description: data.description,
      items: data.items || [],
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/finance')
  return invoice
}

// ============================================
// COMMISSIONS
// ============================================

export async function getCommissions(filters?: {
  status?: 'pending' | 'approved' | 'paid' | 'cancelled' | 'all'
  agentId?: string
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  let query = supabase
    .from('commissions')
    .select(`
      *,
      agent:user_profiles!agent_id(full_name, email),
      transaction:transactions(description, amount)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters?.agentId) {
    query = query.eq('agent_id', filters.agentId)
  }

  const { data, error } = await query

  if (error) throw error

  return data || []
}

export async function createCommission(data: {
  agentId: string
  transactionId?: string
  baseAmount: number
  percentage: number
  description?: string
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Calculate commission amount
  const amount = (data.baseAmount * data.percentage) / 100

  const { data: commission, error } = await supabase
    .from('commissions')
    .insert({
      user_id: user.id,
      agent_id: data.agentId,
      transaction_id: data.transactionId,
      base_amount: data.baseAmount,
      percentage: data.percentage,
      amount,
      description: data.description,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/finance')
  return commission
}

export async function updateCommissionStatus(
  id: string,
  status: 'pending' | 'approved' | 'paid' | 'cancelled'
) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const updateData: any = { status }
  
  if (status === 'paid') {
    updateData.payment_date = new Date().toISOString()
  }

  const { error } = await supabase
    .from('commissions')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/dashboard/finance')
}

// ============================================
// CATEGORIES
// ============================================

export async function getFinancialCategories() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('financial_categories')
    .select('*')
    .eq('user_id', user.id)
    .order('name')

  if (error) throw error

  return data || []
}

export async function seedDefaultCategories() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .rpc('seed_default_financial_categories', {
      p_user_id: user.id
    })

  if (error) throw error

  revalidatePath('/dashboard/finance')
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getPeriodStart(period: string): Date {
  const now = new Date()
  
  switch (period) {
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case '90d':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    case '1y':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    default:
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  }
}
