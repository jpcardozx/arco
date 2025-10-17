import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { z } from 'zod'
import type { Database } from '@/types/database.types'
import type { ConsultoriaBooking, ConsultoriaType } from '@/types/agendamentos.types'

// Configure Mercado Pago SDK
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
  options: { timeout: 5000 }
})

const preferenceClient = new Preference(client)

// Type for booking with relations
type BookingWithRelations = ConsultoriaBooking & {
  consultoria_types: ConsultoriaType;
}

// Validation schema
const createPreferenceSchema = z.object({
  bookingId: z.string().uuid()
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const validatedData = createPreferenceSchema.parse(body)

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
      .from('consultoria_bookings')
      .select(`
        *,
        consultoria_types (
          name,
          description,
          duration_minutes,
          price_cents
        )
      `)
      .eq('id', validatedData.bookingId)
      .eq('user_id', user.id)
      .single<BookingWithRelations>()

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check if booking already has payment
    if (booking.payment_status === 'paid' || booking.booking_status === 'confirmed') {
      return NextResponse.json(
        { error: 'Booking already paid' },
        { status: 400 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name, phone')
      .eq('id', user.id)
      .single()

    // Calculate final price (from booking record)
    const finalPrice = booking.final_amount_cents / 100
    const originalPrice = booking.amount_cents / 100

    // Build preference
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const preferenceData = {
      body: {
        items: [
          {
            id: booking.consultoria_type_id,
            title: booking.consultoria_types.name,
            description: booking.consultoria_types.description || 'Sessão de consultoria com especialista ARCO',
            picture_url: `${baseUrl}/images/consultoria-og.png`,
            category_id: 'services',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: finalPrice
          }
        ],

        payer: {
          name: booking.participant_name || user.email?.split('@')[0] || 'Cliente',
          email: booking.participant_email || user.email || '',
          phone: booking.participant_phone ? {
            area_code: booking.participant_phone.substring(0, 2),
            number: booking.participant_phone.substring(2)
          } : undefined
        },

        back_urls: {
          success: `${baseUrl}/agendamentos/confirmacao/${booking.id}`,
          failure: `${baseUrl}/agendamentos/checkout/${booking.id}?status=failure`,
          pending: `${baseUrl}/agendamentos/confirmacao/${booking.id}?status=pending`
        },

        auto_return: 'approved' as const,

        external_reference: booking.id,

        notification_url: `${baseUrl}/api/webhooks/mercadopago`,

        statement_descriptor: 'ARCO CONSULTORIA',

        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),

        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 12,
          default_installments: 1
        },

        metadata: {
          booking_id: booking.id,
          user_id: user.id,
          consultoria_type: booking.consultoria_types.name,
          scheduled_date: booking.scheduled_date,
          scheduled_time: booking.scheduled_time,
          discount_applied: !!booking.discount_code,
          original_price: originalPrice.toString(),
          final_price: finalPrice.toString()
        }
      }
    }

    // Create preference via Mercado Pago API
    const response = await preferenceClient.create(preferenceData)

    // Update booking with Mercado Pago preference ID
    await supabase
      .from('consultoria_bookings')
      .update({
        mercado_pago_preference_id: response.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', booking.id)

    // Log analytics (fire and forget)
    void supabase.from('analytics_events').insert({
      event_type: 'payment_preference_created',
      user_id: user.id,
      event_data: {
        booking_id: booking.id,
        preference_id: response.id,
        amount: finalPrice,
        has_discount: !!booking.discount_code
      } as any
    } as Database['public']['Tables']['analytics_events']['Insert'])

    return NextResponse.json({
      preference_id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,

      // Additional info for frontend
      booking: {
        id: booking.id,
        amount: finalPrice,
        currency: 'BRL'
      },

      // Payment methods info
      payment_methods: {
        pix: true,
        credit_card: true,
        debit_card: true,
        bank_transfer: true,
        max_installments: 12
      }
    })

  } catch (error: any) {
    console.error('Create preference error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    // Mercado Pago specific errors
    if (error.response) {
      return NextResponse.json(
        { 
          error: 'Mercado Pago error',
          details: error.response.body || error.message
        },
        { status: error.response.status || 500 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET: Retrieve preference status
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const preferenceId = searchParams.get('preference_id')

    if (!preferenceId) {
      return NextResponse.json(
        { error: 'Missing preference_id' },
        { status: 400 }
      )
    }

    // Get preference from Mercado Pago
    const response = await preferenceClient.get({ preferenceId })

    return NextResponse.json({
      preference: response,
      status: 200
    })

  } catch (error: any) {
    console.error('Get preference error:', error)
    
    if (error.response) {
      return NextResponse.json(
        { error: 'Preference not found', details: error.message },
        { status: error.response.status || 404 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
