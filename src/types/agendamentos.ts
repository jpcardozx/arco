/**
 * Agendamentos System Types
 * Auto-generated from Supabase schema + extended for UI
 */

import { LucideIcon } from 'lucide-react'

// ============================================
// DATABASE TYPES (from Supabase)
// ============================================

export type UrgencyType = 'urgent' | 'this_month' | 'next_month' | 'exploring'
export type CompanySizeType = 'solo' | 'small_2_10' | 'medium_11_50' | 'large_50_plus'
export type QualificationStatusType = 'pending' | 'qualified' | 'not_qualified' | 'converted'
export type PaymentStatusType = 'pending' | 'processing' | 'approved' | 'rejected' | 'refunded'
export type PaymentMethodType = 'pix' | 'credit_card' | 'boleto'
export type BookingStatusType = 'pending_payment' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'

// ============================================
// CORE ENTITIES
// ============================================

export interface ConsultoriaType {
  id: string
  name: string
  slug: string
  description: string
  price_cents: number
  duration_minutes: number
  features: {
    included: string[]
    not_included?: string[]
  }
  ideal_for: string[]
  min_budget_monthly_cents: number | null
  is_active: boolean
  slots_per_day: number
  buffer_minutes: number
  color: string
  icon: string
  created_at: string
  updated_at: string
}

export interface QualificationResponse {
  id: string
  user_id: string | null
  session_id: string | null
  primary_challenge: string
  monthly_budget_range: string
  urgency: UrgencyType
  has_existing_site: boolean
  has_active_campaigns: boolean
  additional_info: string | null
  company_name: string | null
  company_size: CompanySizeType | null
  lead_quality_score: number | null
  recommended_consultoria_id: string | null
  ai_insights: {
    strengths?: string[]
    concerns?: string[]
    opportunities?: string[]
  } | null
  status: QualificationStatusType
  converted_to_booking: boolean
  created_at: string
  updated_at: string
}

export interface ConsultoriaBooking {
  id: string
  user_id: string
  consultoria_type_id: string
  qualification_response_id: string | null
  scheduled_date: string
  scheduled_time: string
  timezone: string
  duration_minutes: number
  meeting_url: string | null
  calendar_event_id: string | null
  payment_status: PaymentStatusType
  payment_method: PaymentMethodType | null
  mercado_pago_payment_id: string | null
  mercado_pago_preference_id: string | null
  amount_cents: number
  discount_code: string | null
  discount_amount_cents: number
  final_amount_cents: number
  booking_status: BookingStatusType
  participant_name: string
  participant_email: string
  participant_phone: string | null
  participant_company: string | null
  preparation_notes: string | null
  participant_questions: string[] | null
  attended: boolean | null
  consultant_notes: string | null
  follow_up_actions: any | null
  satisfaction_rating: number | null
  reminder_sent_24h: boolean
  reminder_sent_1h: boolean
  cancelled_at: string | null
  cancelled_by: string | null
  cancellation_reason: string | null
  created_at: string
  updated_at: string
}

export interface ConsultantAvailability {
  id: string
  consultoria_type_id: string
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
  valid_from: string | null
  valid_until: string | null
  created_at: string
  updated_at: string
}

export interface DiscountCode {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  is_active: boolean
  valid_from: string
  valid_until: string | null
  max_uses: number | null
  current_uses: number
  minimum_purchase_cents: number | null
  applicable_consultoria_ids: string[] | null
  created_by: string | null
  created_at: string
  updated_at: string
}

// ============================================
// UI EXTENDED TYPES
// ============================================

export interface ConsultoriaCardData extends Omit<ConsultoriaType, 'icon'> {
  icon: LucideIcon
  badge?: string
  badgeColor?: 'blue' | 'purple' | 'green' | 'orange'
  testimonials?: Testimonial[]
  consultant?: ConsultantPreview
  stats?: {
    total_bookings: number
    average_rating: number
    next_available: string | null
  }
}

export interface ConsultantPreview {
  id: string
  name: string
  title: string
  avatar_url: string
  specialties: string[]
  rating: number
  total_reviews: number
  bio?: string
}

export interface Testimonial {
  id: string
  consultoria_id: string
  client_name: string
  client_role: string
  client_company: string
  rating: number
  text: string
  created_at: string
  avatar_url?: string
}

export interface TimeSlot {
  time: string
  available: boolean
  bookedCount: number
  consultant?: ConsultantPreview
}

export interface AvailableDate {
  date: Date
  availableSlots: number
  suggested?: boolean
}

// ============================================
// FORM DATA TYPES
// ============================================

export interface QualificationFormData {
  primary_challenge: string
  monthly_budget_range: string
  urgency: UrgencyType
  has_existing_site: boolean
  has_active_campaigns: boolean
  additional_info?: string
  company_name?: string
  company_size?: CompanySizeType
}

export interface BookingFormData {
  consultoria_type_id: string
  scheduled_date: string
  scheduled_time: string
  participant_name: string
  participant_email: string
  participant_phone?: string
  participant_company?: string
  preparation_notes?: string
  participant_questions?: string[]
  discount_code?: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface CreateBookingResponse {
  booking: ConsultoriaBooking
  consultoria: ConsultoriaType
  lead_score: number
  discount_applied?: {
    code: string
    amount_cents: number
    final_amount_cents: number
  }
}

export interface CreatePreferenceResponse {
  preference_id: string
  init_point: string
  sandbox_init_point?: string
  payment_methods: {
    excluded_payment_methods: any[]
    excluded_payment_types: any[]
    installments: number
  }
}

export interface ValidateDiscountResponse {
  valid: boolean
  discount?: {
    code: string
    discount_type: 'percentage' | 'fixed'
    discount_value: number
    amount_cents: number
    final_amount_cents: number
    savings_percentage: number
  }
  error?: string
  error_code?: string
}

export interface AvailableSlotsResponse {
  date: string
  slots: TimeSlot[]
  total_available: number
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface BookingAnalytics {
  event: 'consultoria_viewed' | 'qualification_started' | 'qualification_completed' | 
         'consultoria_selected' | 'datetime_selected' | 'checkout_started' | 
         'payment_initiated' | 'booking_confirmed' | 'booking_cancelled'
  consultoria_id?: string
  consultoria_name?: string
  step?: number
  lead_score?: number
  amount_cents?: number
  payment_method?: PaymentMethodType
  metadata?: Record<string, any>
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface BookingNotification {
  type: 'confirmation' | 'reminder_24h' | 'reminder_1h' | 'cancellation' | 'reschedule'
  booking_id: string
  recipient_email: string
  scheduled_for?: string
  template_data: {
    participant_name: string
    consultoria_name: string
    scheduled_date: string
    scheduled_time: string
    meeting_url?: string
    consultant_name?: string
    [key: string]: any
  }
}

// ============================================
// REAL-TIME TYPES
// ============================================

export interface BookingUpdate {
  booking_id: string
  old_status: BookingStatusType
  new_status: BookingStatusType
  payment_status?: PaymentStatusType
  timestamp: string
}

export interface AvailabilityUpdate {
  consultoria_type_id: string
  scheduled_date: string
  scheduled_time: string
  action: 'booked' | 'cancelled' | 'rescheduled'
  timestamp: string
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface AnimationConfig {
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  whileHover?: any
  whileTap?: any
  layout?: boolean
}

export interface StaggerConfig {
  staggerChildren?: number
  delayChildren?: number
}

// ============================================
// HELPER TYPES
// ============================================

export interface Challenge {
  value: string
  label: string
  icon?: LucideIcon
  description?: string
}

export interface BudgetRange {
  value: string
  label: string
  min_cents: number
  max_cents: number | null
}

export interface UrgencyOption {
  value: UrgencyType
  label: string
  emoji: string
  description: string
}

export interface CompanySizeOption {
  value: CompanySizeType
  label: string
  description: string
}
