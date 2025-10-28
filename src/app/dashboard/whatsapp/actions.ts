/**
 * WhatsApp Actions - Stub
 */
'use server'

export async function getMessages() {
  return []
}

export async function getWhatsAppContacts() {
  return []
}

export async function sendMessage(to: string, message: string) {
  return { success: false, error: 'Not implemented' }
}
