/**
 * Lead Magnet API Route
 * Handles form submission and email delivery
 * TODO: Integrate with your email service provider
 */

import { NextRequest } from 'next/server'
import { z } from 'zod'
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse
} from '@/lib/api/api-response'

const leadMagnetSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres').max(100),
  phone: z.string().optional().transform(val => val?.replace(/\D/g, '')),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = leadMagnetSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error, 'Dados do formulário inválidos')
    }

    const validatedData = validation.data

    // TODO: Integrate with your email service
    // Examples:
    // - ConvertKit: https://developers.convertkit.com
    // - Mailchimp: https://mailchimp.com/developer
    // - SendGrid: https://docs.sendgrid.com
    // - Resend: https://resend.com/docs

    // Example with ConvertKit:
    /*
    const response = await fetch('https://api.convertkit.com/v3/forms/{form_id}/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: validatedData.email,
        first_name: validatedData.name.split(' ')[0],
        fields: {
          company: validatedData.company,
          phone: validatedData.phone,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
    */

    // For now, just log the data (REMOVE IN PRODUCTION)
    console.log('Lead Magnet Submission:', validatedData);

    // Simulate email service delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Send download link via email
    // TODO: Add to CRM/Email list
    // TODO: Track conversion in analytics

    return successResponse(
      {
        name: validatedData.name,
        email: validatedData.email,
        downloadUrl: '/downloads/checklist-performance.pdf' // TODO: Real URL
      },
      'Checklist enviado para seu email com sucesso!',
      {
        nextSteps: [
          'Verifique sua caixa de entrada',
          'Aplique as dicas do checklist',
          'Agende uma consultoria gratuita'
        ]
      }
    )
  } catch (error) {
    return internalErrorResponse(error, 'Erro ao processar solicitação de lead magnet')
  }
}
