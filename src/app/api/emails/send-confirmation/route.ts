import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { z } from 'zod'
import type { ConsultoriaBooking, ConsultoriaType } from '@/types/agendamentos.types'

// Helper to get Resend client (lazy initialization)
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured');
  }
  
  return new Resend(apiKey);
}

// Validation schema
const sendEmailSchema = z.object({
  bookingId: z.string().uuid(),
  emailType: z.enum(['confirmation', 'reminder_24h', 'reminder_1h', 'cancellation', 'reschedule'])
})

// Type for booking with relations
type BookingWithRelations = ConsultoriaBooking & {
  consultoria_types: ConsultoriaType;
  user_profiles?: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  };
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResendClient();
    const supabase = await createClient()
    
    // Parse request body
    const body = await request.json()
    const { bookingId, emailType } = sendEmailSchema.parse(body)

    // Get booking with full details
    const { data: booking, error: bookingError } = await supabase
      .from('consultoria_bookings')
      .select(`
        *,
        consultoria_types (
          name,
          description,
          duration_minutes,
          price_cents
        ),
        user_profiles!inner (
          full_name,
          email,
          phone
        )
      `)
      .eq('id', bookingId)
      .single<BookingWithRelations>()

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check if user has email - prefer participant_email
    const recipientEmail = booking.participant_email || booking.user_profiles?.email

    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'No email address found for booking' },
        { status: 400 }
      )
    }

    const recipientName = booking.participant_name || booking.user_profiles?.full_name || 'Cliente'

    // Format date and time
    const meetingDateTime = new Date(`${booking.scheduled_date}T${booking.scheduled_time}`)
    const formattedDate = format(meetingDateTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
    const formattedTime = format(meetingDateTime, 'HH:mm')
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const confirmationUrl = `${baseUrl}/agendamentos/confirmacao/${booking.id}`

    // Build email based on type
    let emailData: {
      to: string
      subject: string
      html: string
      from: string
    } | null = null

    switch (emailType) {
      case 'confirmation':
        emailData = {
          to: recipientEmail,
          from: 'ARCO Agendamentos <agendamentos@arco.com.br>',
          subject: `✅ Consultoria confirmada - ${booking.consultoria_types.name}`,
          html: generateConfirmationEmail({
            userName: recipientName,
            consultoriaName: booking.consultoria_types.name,
            formattedDate,
            formattedTime,
            duration: booking.consultoria_types.duration_minutes,
            confirmationUrl,
            bookingId: booking.id
          })
        }
        break

      case 'reminder_24h':
        emailData = {
          to: recipientEmail,
          from: 'ARCO Agendamentos <agendamentos@arco.com.br>',
          subject: `⏰ Sua consultoria é amanhã - ${booking.consultoria_types.name}`,
          html: generateReminderEmail({
            userName: recipientName,
            consultoriaName: booking.consultoria_types.name,
            formattedDate,
            formattedTime,
            duration: booking.consultoria_types.duration_minutes,
            meetingUrl: booking.meeting_url || 'Será enviado em breve',
            confirmationUrl,
            hoursUntil: 24
          })
        }
        break

      case 'reminder_1h':
        emailData = {
          to: recipientEmail,
          from: 'ARCO Agendamentos <agendamentos@arco.com.br>',
          subject: `🔔 Sua consultoria é em 1 hora`,
          html: generateReminderEmail({
            userName: recipientName,
            consultoriaName: booking.consultoria_types.name,
            formattedDate,
            formattedTime,
            duration: booking.consultoria_types.duration_minutes,
            meetingUrl: booking.meeting_url || 'Link não disponível',
            confirmationUrl,
            hoursUntil: 1
          })
        }
        break

      case 'cancellation':
        emailData = {
          to: recipientEmail,
          from: 'ARCO Agendamentos <agendamentos@arco.com.br>',
          subject: `❌ Consultoria cancelada - ${booking.consultoria_types.name}`,
          html: generateCancellationEmail({
            userName: recipientName,
            consultoriaName: booking.consultoria_types.name,
            formattedDate,
            formattedTime,
            reason: booking.cancellation_reason || 'Cancelamento solicitado'
          })
        }
        break

      case 'reschedule':
        emailData = {
          to: recipientEmail,
          from: 'ARCO Agendamentos <agendamentos@arco.com.br>',
          subject: `📅 Consultoria reagendada - ${booking.consultoria_types.name}`,
          html: generateRescheduleEmail({
            userName: recipientName,
            consultoriaName: booking.consultoria_types.name,
            formattedDate,
            formattedTime,
            confirmationUrl
          })
        }
        break
    }

    if (!emailData) {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const { data: emailResult, error: emailError } = await resend.emails.send(emailData)

    if (emailError) {
      console.error('Resend error:', emailError)
      
      // TODO: Queue for retry when notification_queue schema is updated
      console.error('Failed to send email:', emailError, {
        booking_id: bookingId,
        email_type: emailType,
        recipient: recipientEmail
      })

      return NextResponse.json(
        { error: 'Failed to send email', details: emailError },
        { status: 500 }
      )
    }

    // TODO: Log successful send when notification_queue schema is updated
    console.log('Email sent successfully:', {
      booking_id: bookingId,
      email_type: emailType,
      recipient: recipientEmail,
      email_id: emailResult?.id
    })

    // Log analytics (fire and forget)
    void supabase.from('analytics_events').insert({
      event_type: 'email_sent',
      user_id: booking.user_id,
      event_data: {
        booking_id: bookingId,
        email_type: emailType,
        provider_id: emailResult?.id
      }
    })

    return NextResponse.json({
      success: true,
      email_id: emailResult?.id,
      sent_to: recipientEmail,
      email_type: emailType
    })

  } catch (error: any) {
    console.error('Send email error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Email template generators
function generateConfirmationEmail(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">🎉 Consultoria Confirmada!</h1>
    </div>
    
    <!-- Content -->
    <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none;">
      <p style="font-size: 16px; margin-top: 0;">Olá <strong>${data.userName}</strong>,</p>
      
      <p style="font-size: 16px;">Sua consultoria foi confirmada com sucesso! Estamos animados para ajudá-lo a alcançar seus objetivos.</p>
      
      <!-- Details Card -->
      <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #3b82f6;">
        <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #1e293b;">📋 Detalhes da sessão</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Consultoria:</td>
            <td style="padding: 8px 0; text-align: right;">${data.consultoriaName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Data:</td>
            <td style="padding: 8px 0; text-align: right; text-transform: capitalize;">${data.formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Horário:</td>
            <td style="padding: 8px 0; text-align: right;">${data.formattedTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Duração:</td>
            <td style="padding: 8px 0; text-align: right;">${data.duration} minutos</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">ID:</td>
            <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">${data.bookingId.substring(0, 8)}</td>
          </tr>
        </table>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.confirmationUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Ver detalhes completos</a>
      </div>

      <!-- Meeting Link -->
      <div style="background: #fef3c7; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; font-size: 14px;"><strong>🔗 Link da reunião:</strong> Será enviado por email 24h antes da sessão.</p>
      </div>

      <!-- Preparation -->
      <h3 style="font-size: 18px; margin: 30px 0 16px 0;">✅ Como se preparar</h3>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 8px;">Prepare suas principais dúvidas e objetivos</li>
        <li style="margin-bottom: 8px;">Reúna materiais relevantes (sites, campanhas, dados de desempenho)</li>
        <li style="margin-bottom: 8px;">Teste sua câmera, microfone e conexão de internet</li>
        <li style="margin-bottom: 8px;">Reserve um ambiente tranquilo e sem interrupções</li>
        <li style="margin-bottom: 8px;">Tenha papel e caneta para anotações</li>
      </ul>

      <!-- Calendar -->
      <h3 style="font-size: 18px; margin: 30px 0 16px 0;">📅 Adicionar ao calendário</h3>
      <p style="margin: 0 0 16px 0;">Não perca seu horário! Clique no botão acima para baixar o convite de calendário.</p>

      <!-- Reschedule Info -->
      <div style="background: #f1f5f9; padding: 16px; border-radius: 6px; margin: 30px 0;">
        <p style="margin: 0; font-size: 14px;"><strong>Precisa reagendar?</strong> Entre em contato conosco até 24h antes da sessão pelo email <a href="mailto:contato@arco.com.br" style="color: #3b82f6;">contato@arco.com.br</a></p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 30px; color: #64748b; font-size: 14px;">
      <p style="margin: 0 0 8px 0;"><strong>ARCO</strong> - Transformando desafios em resultados</p>
      <p style="margin: 0;">
        <a href="mailto:contato@arco.com.br" style="color: #3b82f6; text-decoration: none;">contato@arco.com.br</a> | 
        <a href="tel:+5511999999999" style="color: #3b82f6; text-decoration: none;">(11) 99999-9999</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}

function generateReminderEmail(data: any): string {
  const urgency = data.hoursUntil === 1 ? 'urgent' : 'warning'
  const bgColor = urgency === 'urgent' ? '#dc2626' : '#f59e0b'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%); color: white; padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">${data.hoursUntil === 1 ? '🔔' : '⏰'} Sua consultoria é ${data.hoursUntil === 1 ? 'em 1 hora' : 'amanhã'}!</h1>
    </div>
    
    <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none;">
      <p style="font-size: 16px; margin-top: 0;">Olá <strong>${data.userName}</strong>,</p>
      
      <p style="font-size: 16px;">Este é um lembrete de que sua consultoria está agendada para ${data.hoursUntil === 1 ? '<strong>daqui a 1 hora</strong>' : '<strong>amanhã</strong>'}.</p>
      
      <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 30px 0;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px;">📋 Informações</h2>
        <p style="margin: 0 0 8px 0;"><strong>Consultoria:</strong> ${data.consultoriaName}</p>
        <p style="margin: 0 0 8px 0;"><strong>Horário:</strong> ${data.formattedTime}</p>
        <p style="margin: 0 0 8px 0;"><strong>Duração:</strong> ${data.duration} minutos</p>
      </div>

      ${data.meetingUrl !== 'Será enviado em breve' ? `
      <div style="text-align: center; margin: 30px 0; padding: 20px; background: #dbeafe; border-radius: 8px;">
        <p style="margin: 0 0 16px 0; font-weight: 600;">🔗 Link da reunião:</p>
        <a href="${data.meetingUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600;">Entrar na reunião</a>
      </div>
      ` : ''}

      <h3 style="font-size: 18px; margin: 30px 0 16px 0;">✅ Checklist final</h3>
      <ul style="padding-left: 20px;">
        <li>✅ Câmera e microfone testados</li>
        <li>✅ Materiais preparados</li>
        <li>✅ Perguntas anotadas</li>
        <li>✅ Ambiente tranquilo reservado</li>
      </ul>

      <p style="margin: 30px 0 0 0;">Nos vemos em breve! 🚀</p>
    </div>

    <div style="text-align: center; padding: 20px; color: #64748b; font-size: 14px;">
      <p style="margin: 0;">ARCO - Transformando desafios em resultados</p>
    </div>
  </div>
</body>
</html>
  `
}

function generateCancellationEmail(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: system-ui; line-height: 1.6; color: #334155;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #ef4444; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="margin: 0;">❌ Consultoria Cancelada</h1>
    </div>
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
      <p>Olá <strong>${data.userName}</strong>,</p>
      <p>Sua consultoria <strong>${data.consultoriaName}</strong> agendada para <strong>${data.formattedDate}</strong> às <strong>${data.formattedTime}</strong> foi cancelada.</p>
      <p><strong>Motivo:</strong> ${data.reason}</p>
      <p>Se você tiver alguma dúvida ou gostaria de reagendar, entre em contato conosco.</p>
    </div>
  </div>
</body>
</html>
  `
}

function generateRescheduleEmail(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: system-ui; line-height: 1.6; color: #334155;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="margin: 0;">📅 Consultoria Reagendada</h1>
    </div>
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
      <p>Olá <strong>${data.userName}</strong>,</p>
      <p>Sua consultoria <strong>${data.consultoriaName}</strong> foi reagendada com sucesso!</p>
      <p><strong>Nova data:</strong> ${data.formattedDate}<br><strong>Novo horário:</strong> ${data.formattedTime}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.confirmationUrl}" style="display: inline-block; background: #8b5cf6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px;">Ver detalhes</a>
      </div>
    </div>
  </div>
</body>
</html>
  `
}
