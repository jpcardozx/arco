/**
 * WhatsApp Server Actions
 * Actions para gerenciar contatos e mensagens do WhatsApp
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/supabase'

type WhatsAppContact = Database['public']['Tables']['whatsapp_contacts']['Row']
type WhatsAppMessage = Database['public']['Tables']['whatsapp_messages']['Row']

export async function getWhatsAppContacts() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('whatsapp_contacts')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error

  return (data || []).map(contact => ({
    id: contact.id,
    name: contact.name,
    phoneNumber: contact.phone_number,
    profilePicture: contact.profile_picture_url,
    lastMessage: contact.last_message_at,
    unreadCount: contact.unread_count || 0,
    isFavorite: contact.is_favorite || false,
    tags: contact.tags || [],
    status: contact.whatsapp_status || 'active',
    isBusiness: contact.is_business || false,
    businessName: contact.business_name,
  }))
}

export async function getWhatsAppMessages(contactId: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('whatsapp_messages')
    .select('*')
    .eq('contact_id', contactId)
    .order('sent_at', { ascending: true })

  if (error) throw error

  return (data || []).map(message => ({
    id: message.id,
    contactId: message.contact_id,
    content: message.content,
    type: message.message_type,
    direction: message.direction,
    status: message.status,
    sentAt: message.sent_at,
    deliveredAt: message.delivered_at,
    readAt: message.read_at,
    mediaUrl: message.media_url,
    mediaType: message.media_type,
  }))
}

export async function sendWhatsAppMessage(contactId: string, content: string, messageType: string = 'text') {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('whatsapp_messages')
    .insert({
      user_id: user.id,
      contact_id: contactId,
      content,
      message_type: messageType,
      direction: 'outbound',
      status: 'sent',
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/whatsapp')
  return data
}

export async function createWhatsAppContact(contactData: {
  name: string
  phoneNumber: string
  profilePicture?: string
  tags?: string[]
  notes?: string
  isBusiness?: boolean
  businessName?: string
}) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('whatsapp_contacts')
    .insert({
      user_id: user.id,
      name: contactData.name,
      phone_number: contactData.phoneNumber,
      profile_picture_url: contactData.profilePicture,
      tags: contactData.tags || [],
      notes: contactData.notes,
      is_business: contactData.isBusiness || false,
      business_name: contactData.businessName,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/dashboard/whatsapp')
  return data
}

export async function updateContactFavorite(contactId: string, isFavorite: boolean) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('whatsapp_contacts')
    .update({ is_favorite: isFavorite })
    .eq('id', contactId)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/dashboard/whatsapp')
}

export async function markMessagesAsRead(contactId: string) {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Marcar mensagens como lidas
  const { error: messagesError } = await supabase
    .from('whatsapp_messages')
    .update({ 
      status: 'read',
      read_at: new Date().toISOString() 
    })
    .eq('contact_id', contactId)
    .eq('direction', 'inbound')
    .eq('status', 'delivered')

  if (messagesError) throw messagesError

  // Resetar contador de não lidas
  const { error: contactError } = await supabase
    .from('whatsapp_contacts')
    .update({ unread_count: 0 })
    .eq('id', contactId)
    .eq('user_id', user.id)

  if (contactError) throw contactError

  revalidatePath('/dashboard/whatsapp')
}
