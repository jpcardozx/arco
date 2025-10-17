import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Database } from '@/types/database.types'
import type { ConsultoriaType, QualificationResponse, ConsultoriaBooking, DiscountCode } from '@/types/agendamentos.types'

// Validation schema
const createBookingSchema = z.object({
  consultoriaTypeId: z.string().uuid(),
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  scheduledTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  qualificationData: z.object({
    challenge: z.string(),
    budget: z.string(),
    urgency: z.string(),
    hasWebsite: z.boolean().optional(),
    hasActiveCampaigns: z.boolean().optional(),
    companyName: z.string().optional(),
    companySize: z.string().optional(),
    additionalNotes: z.string().optional()
  }),
  discountCode: z.string().optional(),
  participantInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional()
  })
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = createBookingSchema.parse(body)

    // 1. Check if time slot is available
    const { data: existingBooking } = await supabase
      .from('consultoria_bookings')
      .select('id')
      .eq('consultoria_type_id', validatedData.consultoriaTypeId)
      .eq('scheduled_date', validatedData.scheduledDate)
      .eq('scheduled_time', validatedData.scheduledTime)
      .in('booking_status', ['confirmed', 'pending_payment'])
      .single()

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Time slot not available' },
        { status: 409 }
      )
    }

    // 2. Get consultoria details
    const { data: consultoria, error: consultoriaError } = await supabase
      .from('consultoria_types')
      .select('*')
      .eq('id', validatedData.consultoriaTypeId)
      .eq('is_active', true)
      .single<ConsultoriaType>()

    if (consultoriaError || !consultoria) {
      return NextResponse.json(
        { error: 'Consultoria not found or inactive' },
        { status: 404 }
      )
    }

    // 3. Calculate lead score
    const leadScore = calculateLeadScore(validatedData.qualificationData)

    // 4. Get or create qualification response
    const { data: qualificationResponse, error: qualError } = await supabase
      .from('qualification_responses')
      .insert({
        user_id: user.id,
        session_id: crypto.randomUUID(),
        primary_challenge: validatedData.qualificationData.challenge,
        monthly_budget_range: validatedData.qualificationData.budget,
        urgency: validatedData.qualificationData.urgency as Database['public']['Enums']['urgency_enum'],
        has_existing_site: validatedData.qualificationData.hasWebsite,
        has_active_campaigns: validatedData.qualificationData.hasActiveCampaigns,
        company_name: validatedData.qualificationData.companyName,
        company_size: validatedData.qualificationData.companySize as Database['public']['Enums']['company_size_enum'] | null | undefined,
        additional_info: validatedData.qualificationData.additionalNotes,
        lead_quality_score: leadScore,
        recommended_consultoria_id: validatedData.consultoriaTypeId,
        status: 'completed' as Database['public']['Enums']['qualification_status_enum']
      })
      .select()
      .single<QualificationResponse>()

    if (qualError) {
      console.error('Error creating qualification response:', qualError)
      return NextResponse.json(
        { error: 'Failed to save qualification data' },
        { status: 500 }
      )
    }

    // 5. Validate and apply discount code
    let finalPriceCents = consultoria.price_cents
    let discountData: DiscountCode | null = null
    let discountAmountCents = 0

    if (validatedData.discountCode) {
      const { data: discount, error: discountError } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', validatedData.discountCode.toUpperCase())
        .eq('is_active', true)
        .single<DiscountCode>()

      if (!discountError && discount) {
        // Validate discount
        const now = new Date()
        const validFrom = new Date(discount.valid_from)
        const validUntil = discount.valid_until ? new Date(discount.valid_until) : null

        const isValidTime = now >= validFrom && (!validUntil || now <= validUntil)
        const isValidUses = !discount.max_uses || discount.current_uses < discount.max_uses
        const isValidForConsultoria = !discount.applicable_consultoria_ids ||
          discount.applicable_consultoria_ids.includes(validatedData.consultoriaTypeId)
        const isValidMinPurchase = !discount.minimum_purchase_cents ||
          finalPriceCents >= discount.minimum_purchase_cents

        if (isValidTime && isValidUses && isValidForConsultoria && isValidMinPurchase) {
          // Apply discount
          if (discount.discount_type === 'percentage') {
            discountAmountCents = Math.round(finalPriceCents * (discount.discount_value / 100))
            finalPriceCents = finalPriceCents - discountAmountCents
          } else {
            discountAmountCents = Math.min(discount.discount_value, finalPriceCents)
            finalPriceCents = Math.max(0, finalPriceCents - discount.discount_value)
          }

          discountData = discount

          // Increment usage count
          await supabase
            .from('discount_codes')
            .update({ current_uses: discount.current_uses + 1 })
            .eq('id', discount.id)
        }
      }
    }

    // 6. Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('consultoria_bookings')
      .insert({
        user_id: user.id,
        consultoria_type_id: validatedData.consultoriaTypeId,
        qualification_response_id: qualificationResponse.id,
        scheduled_date: validatedData.scheduledDate,
        scheduled_time: validatedData.scheduledTime,
        duration_minutes: consultoria.duration_minutes,
        timezone: 'America/Sao_Paulo',
        booking_status: 'pending_payment',
        payment_status: 'pending',
        amount_cents: consultoria.price_cents,
        discount_code: discountData?.code || null,
        discount_amount_cents: discountAmountCents,
        final_amount_cents: finalPriceCents,
        participant_name: validatedData.participantInfo.name,
        participant_email: validatedData.participantInfo.email,
        participant_phone: validatedData.participantInfo.phone || null,
        participant_company: validatedData.participantInfo.company || null
      })
      .select(`
        *,
        consultoria_types (
          name,
          description,
          duration_minutes,
          price_cents,
          slug
        )
      `)
      .single<ConsultoriaBooking & { consultoria_types: ConsultoriaType }>()

    if (bookingError) {
      console.error('Error creating booking:', bookingError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // 7. Log analytics event (fire and forget)
    void supabase.from('analytics_events').insert({
      event_type: 'booking_created',
      user_id: user.id,
      event_data: {
        booking_id: booking.id,
        consultoria_type: consultoria.slug,
        price_cents: finalPriceCents,
        lead_score: leadScore,
        has_discount: !!discountData
      }
    })

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        consultoria: {
          name: booking.consultoria_types.name,
          duration: booking.consultoria_types.duration_minutes,
          originalPrice: booking.amount_cents / 100,
          finalPrice: booking.final_amount_cents / 100
        },
        schedule: {
          date: booking.scheduled_date,
          time: booking.scheduled_time
        },
        status: booking.booking_status,
        discount: discountData ? {
          code: discountData.code,
          type: discountData.discount_type,
          saved: discountAmountCents / 100
        } : null
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create booking error:', error)

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

// Calculate lead quality score (0-100)
function calculateLeadScore(data: any): number {
  let score = 0

  // Budget weight: 35 points
  const budgetMap: Record<string, number> = {
    'less_than_1k': 5,
    '1k_to_3k': 15,
    '3k_to_5k': 25,
    '5k_to_10k': 30,
    'more_than_10k': 35
  }
  score += budgetMap[data.budget] || 0

  // Urgency weight: 25 points
  const urgencyMap: Record<string, number> = {
    'not_urgent': 5,
    'within_month': 15,
    'within_week': 20,
    'urgent': 25
  }
  score += urgencyMap[data.urgency] || 0

  // Challenge complexity: 20 points
  const challengeMap: Record<string, number> = {
    'no_traffic': 15,
    'low_conversions': 18,
    'high_cpa': 20,
    'scaling': 20,
    'competitor': 12,
    'new_project': 10,
    'team_training': 8,
    'audit': 15
  }
  score += challengeMap[data.challenge] || 0

  // Has existing infrastructure: 10 points
  if (data.hasWebsite) score += 5
  if (data.hasActiveCampaigns) score += 5

  // Company size bonus: 10 points
  const sizeMap: Record<string, number> = {
    'freelancer': 2,
    'startup': 5,
    'small': 7,
    'medium': 10,
    'large': 10
  }
  score += sizeMap[data.companySize || ''] || 0

  return Math.min(100, Math.max(0, score))
}

// GET: List user's bookings
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
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('consultoria_bookings')
      .select(`
        *,
        consultoria_types (
          name,
          description,
          duration_minutes,
          price_cents
        )
      `, { count: 'exact' })
      .eq('user_id', user.id)
      .order('scheduled_date', { ascending: false })
      .order('scheduled_time', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by status if provided and valid
    if (status) {
      const validStatuses: Database['public']['Tables']['consultoria_bookings']['Row']['booking_status'][] = 
        ['pending_payment', 'confirmed', 'completed', 'cancelled', 'no_show']
      
      if (validStatuses.includes(status as any)) {
        query = query.eq('booking_status', status as NonNullable<Database['public']['Tables']['consultoria_bookings']['Row']['booking_status']>)
      }
    }

    const { data: bookings, error, count } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      bookings: bookings || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      }
    })

  } catch (error: any) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
