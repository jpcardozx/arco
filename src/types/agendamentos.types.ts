/**
 * AGENDAMENTOS TYPES
 * Types for consultoria booking system based on actual database schema
 */

export interface ConsultoriaType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  duration_minutes: number;
  features: any | null;
  ideal_for: string[] | null;
  min_budget_monthly_cents: number | null;
  is_active: boolean;
  slots_per_day: number;
  buffer_minutes: number;
  color: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface QualificationResponse {
  id: string;
  user_id: string | null;
  session_id: string | null;
  primary_challenge: string;
  monthly_budget_range: string;
  urgency: 'not_urgent' | 'within_month' | 'within_week' | 'urgent';
  has_existing_site: boolean | null;
  has_active_campaigns: boolean | null;
  additional_info: string | null;
  company_name: string | null;
  company_size: 'freelancer' | 'startup' | 'small' | 'medium' | 'large' | null;
  lead_quality_score: number | null;
  recommended_consultoria_id: string | null;
  ai_insights: any | null;
  status: 'pending' | 'qualified' | 'disqualified' | 'completed';
  converted_to_booking: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConsultoriaBooking {
  id: string;
  user_id: string;
  consultoria_type_id: string;
  qualification_response_id: string | null;
  scheduled_date: string;
  scheduled_time: string;
  timezone: string;
  duration_minutes: number;
  meeting_url: string | null;
  calendar_event_id: string | null;
  payment_status: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
  payment_method: 'pix' | 'credit_card' | 'bank_transfer' | null;
  mercado_pago_payment_id: string | null;
  mercado_pago_preference_id: string | null;
  amount_cents: number;
  discount_code: string | null;
  discount_amount_cents: number;
  final_amount_cents: number;
  booking_status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  participant_name: string;
  participant_email: string;
  participant_phone: string | null;
  participant_company: string | null;
  notes: string | null;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  confirmed_at: string | null;
  completed_at: string | null;
  reminder_sent_at: string | null;
  follow_up_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
  max_uses: number | null;
  current_uses: number;
  minimum_purchase_cents: number | null;
  applicable_consultoria_ids: string[] | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Request/Response types for API
export interface CreateBookingRequest {
  consultoriaTypeId: string;
  scheduledDate: string;
  scheduledTime: string;
  qualificationData: {
    challenge: string;
    budget: string;
    urgency: string;
    hasWebsite?: boolean;
    hasActiveCampaigns?: boolean;
    companyName?: string;
    companySize?: string;
    additionalNotes?: string;
  };
  discountCode?: string;
  participantInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
}

export interface BookingWithDetails extends ConsultoriaBooking {
  consultoria_types?: ConsultoriaType;
}
