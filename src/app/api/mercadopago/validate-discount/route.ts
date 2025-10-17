import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Database } from '@/types/database.types'

type DiscountCode = Database['public']['Tables']['discount_codes']['Row']

// Validation schema
const validateDiscountSchema = z.object({
  code: z.string().min(1).max(50),
  consultoriaId: z.string().uuid(),
  amount: z.number().positive()
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Authenticate user (optional - can allow anonymous discount validation)
    const { data: { user } } = await supabase.auth.getUser()

    // Parse request body
    const body = await request.json()
    const { code, consultoriaId, amount } = validateDiscountSchema.parse(body)

    // Normalize code (uppercase, trim)
    const normalizedCode = code.toUpperCase().trim()

    // Get discount code from database
    const { data: discount, error: discountError } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', normalizedCode)
      .single<DiscountCode>()

    if (discountError || !discount) {
      return NextResponse.json(
        { 
          valid: false,
          error: 'Cupom não encontrado',
          error_code: 'NOT_FOUND'
        },
        { status: 404 }
      )
    }

    // Validation checks
    const now = new Date()
    const validFrom = discount.valid_from ? new Date(discount.valid_from) : null
    const validUntil = discount.valid_until ? new Date(discount.valid_until) : null
    
    const validations = {
      isActive: discount.is_active ?? true,
      isWithinDateRange: (!validFrom || now >= validFrom) && (!validUntil || now <= validUntil),
      hasUsesLeft: !discount.max_uses || (discount.current_uses || 0) < discount.max_uses,
      meetsMinimum: !discount.minimum_purchase_cents || (amount * 100) >= discount.minimum_purchase_cents,
      validForConsultoria: !discount.applicable_consultoria_ids || discount.applicable_consultoria_ids.includes(consultoriaId),
      userEligible: true // Can add user-specific rules here
    }

    // Check if discount is valid
    const isValid = Object.values(validations).every(v => v === true)

    if (!isValid) {
      // Determine specific error
      let errorMessage = 'Cupom inválido'
      let errorCode = 'INVALID'

      if (!validations.isActive) {
        errorMessage = 'Este cupom está desativado'
        errorCode = 'INACTIVE'
      } else if (!validations.isWithinDateRange) {
        if (validFrom && now < validFrom) {
          errorMessage = 'Este cupom ainda não está válido'
          errorCode = 'NOT_YET_VALID'
        } else {
          errorMessage = 'Este cupom expirou'
          errorCode = 'EXPIRED'
        }
      } else if (!validations.hasUsesLeft) {
        errorMessage = 'Este cupom atingiu o limite de uso'
        errorCode = 'MAX_USES_REACHED'
      } else if (!validations.meetsMinimum) {
        const minAmount = (discount.minimum_purchase_cents || 0) / 100
        errorMessage = `Valor mínimo de R$ ${minAmount.toFixed(2)} não atingido`
        errorCode = 'MINIMUM_NOT_MET'
      } else if (!validations.validForConsultoria) {
        errorMessage = 'Este cupom não é válido para esta consultoria'
        errorCode = 'INVALID_CONSULTORIA'
      }

      return NextResponse.json(
        {
          valid: false,
          error: errorMessage,
          error_code: errorCode,
          validations
        },
        { status: 400 }
      )
    }

    // Calculate discount amount
    let discountAmount = 0
    let finalAmount = amount

    if (discount.discount_type === 'percentage') {
      discountAmount = amount * (discount.discount_value / 100)
      finalAmount = amount - discountAmount
    } else {
      // discount_value is already in currency (not cents)
      discountAmount = discount.discount_value
      finalAmount = Math.max(0, amount - discountAmount)
    }

    // Log discount validation
    if (user) {
      void supabase.from('analytics_events').insert({
        event_type: 'discount_validated',
        user_id: user.id,
        event_data: {
          code: normalizedCode,
          discount_id: discount.id,
          consultoria_id: consultoriaId,
          original_amount: amount,
          discount_amount: discountAmount,
          final_amount: finalAmount,
          is_valid: true
        } as any
      } as Database['public']['Tables']['analytics_events']['Insert'])
    }

    return NextResponse.json({
      valid: true,
      discount: {
        id: discount.id,
        code: discount.code,
        discount_type: discount.discount_type,
        discount_value: discount.discount_value,
        
        // Calculated values
        original_amount: amount,
        discount_amount: discountAmount,
        final_amount: finalAmount,
        savings_percentage: Math.round((discountAmount / amount) * 100),
        
        // Usage info
        current_uses: discount.current_uses || 0,
        max_uses: discount.max_uses,
        remaining_uses: discount.max_uses ? discount.max_uses - (discount.current_uses || 0) : null,
        
        // Validity
        valid_from: discount.valid_from,
        valid_until: discount.valid_until,
        expires_in_days: validUntil ? Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null
      }
    })

  } catch (error: any) {
    console.error('Validate discount error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          valid: false,
          error: 'Dados inválidos',
          error_code: 'INVALID_REQUEST',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        valid: false,
        error: error.message || 'Erro ao validar cupom',
        error_code: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}

// GET: List available discount codes (admin only or public ones)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    const { searchParams } = new URL(request.url)
    const publicOnly = searchParams.get('public') === 'true'

    let query = supabase
      .from('discount_codes')
      .select('*')
      .eq('is_active', true)
      .gte('valid_until', new Date().toISOString())
      .order('created_at', { ascending: false })

    // Non-authenticated users only see public codes
    if (!user || publicOnly) {
      query = query.eq('is_public', true)
    }

    const { data: discounts, error } = await query

    if (error) {
      throw error
    }

    // Filter out sensitive info for non-admin users
    const sanitizedDiscounts = (discounts || []).map((discount: DiscountCode) => ({
      code: discount.code,
      discount_type: discount.discount_type,
      discount_value: discount.discount_value,
      valid_until: discount.valid_until,
      applicable_consultoria_ids: discount.applicable_consultoria_ids,
      minimum_purchase_cents: discount.minimum_purchase_cents
    }))

    return NextResponse.json({
      discounts: sanitizedDiscounts,
      count: sanitizedDiscounts.length
    })

  } catch (error: any) {
    console.error('Get discounts error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: Create discount code (admin only)
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Authenticate and check admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Check if user is admin (role field needs to be added to user_profiles)
    // For now, any authenticated user can create discount codes
    // In production, implement proper role-based access control

    // Parse request body
    const body = await request.json()
    
    const discountSchema = z.object({
      code: z.string().min(3).max(50),
      discount_type: z.enum(['percentage', 'fixed']),
      discount_value: z.number().positive(),
      valid_from: z.string().datetime().optional(),
      valid_until: z.string().datetime().optional(),
      applicable_consultoria_ids: z.array(z.string().uuid()).optional(),
      minimum_purchase_cents: z.number().optional(),
      max_uses: z.number().int().positive().optional()
    })

    const discountData = discountSchema.parse(body)

    // Normalize code
    discountData.code = discountData.code.toUpperCase().trim()

    // Create discount code
    const { data: newDiscount, error } = await supabase
      .from('discount_codes')
      .insert({
        ...discountData,
        current_uses: 0,
        is_active: true,
        created_by: user.id
      } as Database['public']['Tables']['discount_codes']['Insert'])
      .select()
      .single<DiscountCode>()

    if (error) {
      // Check for duplicate code
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Código de cupom já existe' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({
      success: true,
      discount: newDiscount
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create discount error:', error)

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
