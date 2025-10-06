/**
 * WhatsApp Demo Data Generator
 * 
 * Gera dados de demonstração para o sistema de WhatsApp
 */

export interface DemoMessage {
  id: string
  contact_id: string
  contact_name: string
  message: string
  timestamp: string
  is_from_me: boolean
  status: 'sent' | 'delivered' | 'read'
}

/**
 * Gera mensagens de demonstração para WhatsApp
 * 
 * @param count - Número de mensagens a gerar
 * @returns Array de mensagens demo
 */
export function generateDemoMessages(count: number = 10): DemoMessage[] {
  const contacts = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Oliveira' },
    { id: '4', name: 'Ana Costa' },
    { id: '5', name: 'Lucas Ferreira' },
  ]
  
  const messageTemplates = [
    'Olá! Gostaria de mais informações sobre seus serviços.',
    'Qual o preço do plano Pro?',
    'Obrigado pelo atendimento!',
    'Vocês trabalham com consultoria?',
    'Preciso de suporte técnico.',
    'Quando posso agendar uma demo?',
    'Recebi o orçamento, obrigado!',
    'Qual o prazo de implementação?',
    'Vocês têm case studies?',
    'Gostaria de contratar o serviço.',
  ]
  
  const messages: DemoMessage[] = []
  const now = Date.now()
  
  for (let i = 0; i < count; i++) {
    const contact = contacts[Math.floor(Math.random() * contacts.length)]
    const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)]
    const isFromMe = Math.random() > 0.5
    const minutesAgo = Math.floor(Math.random() * 1440) // Últimas 24h
    
    messages.push({
      id: `demo-${i}`,
      contact_id: contact.id,
      contact_name: contact.name,
      message: template,
      timestamp: new Date(now - minutesAgo * 60 * 1000).toISOString(),
      is_from_me: isFromMe,
      status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as DemoMessage['status'],
    })
  }
  
  // Ordena por timestamp (mais recentes primeiro)
  return messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/**
 * Gera estatísticas de demonstração para WhatsApp
 * 
 * @returns Estatísticas demo
 */
export function generateDemoStats() {
  return {
    total_messages: 1247,
    messages_today: 42,
    active_contacts: 38,
    response_rate: 94,
    avg_response_time: 2.5, // minutos
    messages_per_day: [
      { date: '2025-10-01', count: 38 },
      { date: '2025-10-02', count: 45 },
      { date: '2025-10-03', count: 52 },
      { date: '2025-10-04', count: 41 },
      { date: '2025-10-05', count: 48 },
      { date: '2025-10-06', count: 42 },
    ],
  }
}
