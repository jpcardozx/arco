-- Quick Fixes for Supabase Schema
-- Adds critical indexes and RLS policies for agendamentos system
-- Run: npx supabase db push

-- ====================
-- 1. CRITICAL INDEXES
-- ====================

-- Bookings user lookup (most common query)
CREATE INDEX IF NOT EXISTS idx_bookings_user_status 
ON consultoria_bookings(user_id, booking_status);

-- Bookings date range queries
CREATE INDEX IF NOT EXISTS idx_bookings_date 
ON consultoria_bookings(scheduled_date) 
WHERE booking_status IN ('confirmed', 'pending_payment');

-- Payment status lookups
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status 
ON consultoria_bookings(payment_status) 
WHERE payment_status IN ('pending', 'processing');

-- Availability lookups (hot path)
CREATE INDEX IF NOT EXISTS idx_availability_lookup 
ON consultant_availability(consultoria_type_id, day_of_week, is_active) 
WHERE is_active = true;

-- Qualification session lookups
CREATE INDEX IF NOT EXISTS idx_qualification_session 
ON qualification_responses(session_id);

-- Foreign key indexes (prevent slow joins)
CREATE INDEX IF NOT EXISTS idx_bookings_consultoria_type 
ON consultoria_bookings(consultoria_type_id);

CREATE INDEX IF NOT EXISTS idx_bookings_qualification 
ON consultoria_bookings(qualification_response_id);

CREATE INDEX IF NOT EXISTS idx_qualification_user 
ON qualification_responses(user_id);

-- ====================
-- 2. RLS ENABLE
-- ====================

ALTER TABLE consultoria_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultant_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualification_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultoria_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- ====================
-- 3. RLS POLICIES
-- ====================

-- consultoria_bookings policies
CREATE POLICY "consultoria_bookings_select_own" ON consultoria_bookings
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "consultoria_bookings_insert_own" ON consultoria_bookings
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "consultoria_bookings_update_own" ON consultoria_bookings
FOR UPDATE USING (
  auth.uid() = user_id 
  AND booking_status IN ('pending_payment', 'confirmed')
);

CREATE POLICY "consultoria_bookings_admin_all" ON consultoria_bookings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND user_type = 'admin'
  )
);

-- consultant_availability policies
CREATE POLICY "consultant_availability_select_public" ON consultant_availability
FOR SELECT USING (is_active = true);

CREATE POLICY "consultant_availability_admin_all" ON consultant_availability
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND user_type = 'admin'
  )
);

-- qualification_responses policies
CREATE POLICY "qualification_responses_select_own" ON qualification_responses
FOR SELECT USING (
  auth.uid() = user_id
);

CREATE POLICY "qualification_responses_insert_any" ON qualification_responses
FOR INSERT WITH CHECK (true);

CREATE POLICY "qualification_responses_admin_all" ON qualification_responses
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND user_type = 'admin'
  )
);

-- consultoria_types policies (public read, admin write)
CREATE POLICY "consultoria_types_select_public" ON consultoria_types
FOR SELECT USING (is_active = true);

CREATE POLICY "consultoria_types_admin_all" ON consultoria_types
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND user_type = 'admin'
  )
);

-- discount_codes policies (validate only, admin manages)
CREATE POLICY "discount_codes_select_active" ON discount_codes
FOR SELECT USING (
  is_active = true 
  AND (valid_until IS NULL OR valid_until > now())
  AND (max_uses IS NULL OR current_uses < max_uses)
);

CREATE POLICY "discount_codes_admin_all" ON discount_codes
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND user_type = 'admin'
  )
);

-- ====================
-- 4. UPDATE TRIGGERS
-- ====================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
DROP TRIGGER IF EXISTS update_consultoria_bookings_updated_at ON consultoria_bookings;
CREATE TRIGGER update_consultoria_bookings_updated_at
  BEFORE UPDATE ON consultoria_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultant_availability_updated_at ON consultant_availability;
CREATE TRIGGER update_consultant_availability_updated_at
  BEFORE UPDATE ON consultant_availability
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_qualification_responses_updated_at ON qualification_responses;
CREATE TRIGGER update_qualification_responses_updated_at
  BEFORE UPDATE ON qualification_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ====================
-- 5. COMMENTS
-- ====================

COMMENT ON TABLE consultoria_bookings IS 'Agendamentos de consultorias confirmados com pagamento';
COMMENT ON TABLE consultant_availability IS 'Horários disponíveis para agendamentos';
COMMENT ON TABLE qualification_responses IS 'Respostas de qualificação de leads';
COMMENT ON TABLE consultoria_types IS 'Tipos de consultorias oferecidas';
COMMENT ON TABLE discount_codes IS 'Códigos promocionais';
