/**
 * Users Server Actions
 * Actions para gerenciar usuários da organização
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/database.types'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export async function getUsers() {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('id', user.id)
    .single<Pick<UserProfile, 'user_type'>>()

  if (profile?.user_type !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<UserProfile[]>()

  if (error) throw error
  
  return (data || []).map(userProfile => ({
    id: userProfile.id,
    email: '', // Will need to join with auth.users
    full_name: userProfile.full_name || 'Sem nome',
    tier: userProfile.tier,
    user_type: userProfile.user_type,
    company_name: userProfile.company_name,
    phone: userProfile.phone,
    avatar_url: userProfile.avatar_url,
    subscription_status: userProfile.subscription_status,
    created_at: userProfile.created_at,
    updated_at: userProfile.updated_at,
  }))
}

export async function getUserStats() {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('id', user.id)
    .single<Pick<UserProfile, 'user_type'>>()

  if (profile?.user_type !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('tier, user_type, subscription_status')
    .returns<Pick<UserProfile, 'tier' | 'user_type' | 'subscription_status'>[]>()

  if (error) throw error

  const stats = {
    total: data?.length || 0,
    free: data?.filter(u => u.tier === 'free').length || 0,
    paid: data?.filter(u => u.tier === 'paid').length || 0,
    admins: data?.filter(u => u.user_type === 'admin').length || 0,
    clients: data?.filter(u => u.user_type === 'client').length || 0,
    active: data?.filter(u => u.subscription_status === 'active').length || 0,
  }

  return stats
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('id', user.id)
    .single()

  if (profile?.user_type !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  
  revalidatePath('/dashboard/users')
  return data
}

export async function updateUserTier(userId: string, tier: 'free' | 'paid') {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('id', user.id)
    .single()

  if (profile?.user_type !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  const { error } = await supabase
    .from('user_profiles')
    .update({ 
      tier,
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId)

  if (error) throw error
  
  revalidatePath('/dashboard/users')
}

export async function deleteUser(userId: string) {
  const supabase = await createSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('id', user.id)
    .single()

  if (profile?.user_type !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  // Note: This will cascade delete due to RLS policies
  const { error } = await supabase
    .from('user_profiles')
    .delete()
    .eq('id', userId)

  if (error) throw error
  
  revalidatePath('/dashboard/users')
}
