-- AGENDAMENTOS: Calendar Events + Enhancements
-- Calendar integration and notification system

-- CALENDAR EVENTS TABLE
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'consultoria',
    'meeting',
    'task',
    'campaign_deadline',
    'milestone',
    'reminder'
  )),
  
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE,
  end_time TIME,
  duration_minutes INTEGER,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  
  status TEXT DEFAULT 'scheduled' CHECK (status IN (
    'scheduled',
    'confirmed',
    'in_progress',
    'completed',
    'cancelled',
    'rescheduled'
  )),
  
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT,
  parent_event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  
  location TEXT,
  meeting_url TEXT,
  meeting_platform TEXT,
  
  attendees JSONB DEFAULT '[]'::jsonb,
  
  reminders JSONB DEFAULT '[{"minutes": 1440}, {"minutes": 60}]'::jsonb,
  reminder_sent BOOLEAN DEFAULT false,
  
  external_id TEXT,
  external_source TEXT,
  sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN (
    'pending',
    'synced',
    'failed',
    'disabled'
  )),
  last_synced_at TIMESTAMPTZ,
  
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT valid_time_range CHECK (
    (end_date IS NULL AND end_time IS NULL) OR 
    (end_date > start_date) OR 
    (end_date = start_date AND end_time > start_time)
  )
);

-- EMAIL TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT,
  
  variables TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  category TEXT CHECK (category IN (
    'transactional',
    'marketing',
    'notification',
    'system'
  )),
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- NOTIFICATION QUEUE TABLE
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN (
    'email',
    'sms',
    'push',
    'webhook'
  )),
  
  recipient TEXT NOT NULL,
  
  subject TEXT,
  body TEXT NOT NULL,
  
  template_id UUID REFERENCES email_templates(id),
  template_data JSONB,
  
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'sending',
    'sent',
    'failed',
    'cancelled'
  )),
  
  priority INTEGER DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  
  scheduled_for TIMESTAMPTZ DEFAULT now(),
  sent_at TIMESTAMPTZ,
  
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  
  last_error TEXT,
  
  provider TEXT,
  provider_message_id TEXT,
  
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- BOOKING NOTES TABLE
CREATE TABLE IF NOT EXISTS booking_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  booking_id UUID NOT NULL REFERENCES consultoria_bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  note TEXT NOT NULL,
  
  is_internal BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_date ON calendar_events(user_id, start_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_type ON calendar_events(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_status ON calendar_events(status);
CREATE INDEX IF NOT EXISTS idx_calendar_events_external ON calendar_events(external_id, external_source);
CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON notification_queue(status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notification_queue_user ON notification_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_notes_booking ON booking_notes(booking_id);

-- Triggers
CREATE OR REPLACE FUNCTION auto_create_calendar_event()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_status = 'confirmed' AND NEW.calendar_event_id IS NULL THEN
    INSERT INTO calendar_events (
      user_id,
      title,
      description,
      event_type,
      start_date,
      start_time,
      duration_minutes,
      timezone,
      status,
      meeting_url,
      metadata
    )
    SELECT 
      NEW.user_id,
      ct.name || ' - ' || NEW.participant_name,
      ct.description,
      'consultoria',
      NEW.scheduled_date,
      NEW.scheduled_time,
      NEW.duration_minutes,
      NEW.timezone,
      'confirmed',
      NEW.meeting_url,
      jsonb_build_object(
        'booking_id', NEW.id,
        'consultoria_type', ct.name,
        'participant_email', NEW.participant_email,
        'amount_cents', NEW.final_amount_cents
      )
    FROM consultoria_types ct
    WHERE ct.id = NEW.consultoria_type_id
    RETURNING id INTO NEW.calendar_event_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_create_calendar_event
  BEFORE INSERT OR UPDATE ON consultoria_bookings
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_calendar_event();

CREATE OR REPLACE FUNCTION auto_schedule_reminders()
RETURNS TRIGGER AS $$
DECLARE
  reminder_24h TIMESTAMPTZ;
  reminder_1h TIMESTAMPTZ;
BEGIN
  IF NEW.booking_status = 'confirmed' THEN
    reminder_24h := (NEW.scheduled_date || ' ' || NEW.scheduled_time)::TIMESTAMPTZ - INTERVAL '24 hours';
    reminder_1h := (NEW.scheduled_date || ' ' || NEW.scheduled_time)::TIMESTAMPTZ - INTERVAL '1 hour';
    
    INSERT INTO notification_queue (
      user_id,
      type,
      recipient,
      subject,
      body,
      scheduled_for,
      priority,
      metadata
    ) VALUES
    (
      NEW.user_id,
      'email',
      NEW.participant_email,
      'Lembrete: Consultoria em 24 horas',
      'Sua consultoria está agendada para amanhã às ' || NEW.scheduled_time::TEXT,
      reminder_24h,
      8,
      jsonb_build_object('booking_id', NEW.id, 'reminder_type', '24h')
    ),
    (
      NEW.user_id,
      'email',
      NEW.participant_email,
      'Lembrete: Consultoria em 1 hora',
      'Sua consultoria começará em 1 hora. Link: ' || COALESCE(NEW.meeting_url, 'A definir'),
      reminder_1h,
      9,
      jsonb_build_object('booking_id', NEW.id, 'reminder_type', '1h')
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_schedule_reminders
  AFTER INSERT OR UPDATE OF booking_status ON consultoria_bookings
  FOR EACH ROW
  WHEN (NEW.booking_status = 'confirmed')
  EXECUTE FUNCTION auto_schedule_reminders();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_queue_updated_at
  BEFORE UPDATE ON notification_queue
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calendar events"
  ON calendar_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own calendar events"
  ON calendar_events FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Email templates are viewable by authenticated users"
  ON email_templates FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view own notifications"
  ON notification_queue FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view notes for their bookings"
  ON booking_notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM consultoria_bookings
      WHERE id = booking_notes.booking_id
      AND user_id = auth.uid()
    )
  );

-- Helper function for availability
CREATE OR REPLACE FUNCTION get_available_slots(
  p_consultoria_id UUID,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  WITH time_slots AS (
    SELECT 
      ca.start_time + (interval '1 hour' * generate_series(0, 
        EXTRACT(HOUR FROM (ca.end_time - ca.start_time))::INTEGER - 1
      )) AS slot_time
    FROM consultant_availability ca
    WHERE ca.consultoria_type_id = p_consultoria_id
      AND ca.day_of_week = EXTRACT(DOW FROM p_date)::INTEGER
      AND ca.is_active = true
  )
  SELECT 
    ts.slot_time::TIME,
    NOT EXISTS (
      SELECT 1 FROM consultoria_bookings cb
      WHERE cb.consultoria_type_id = p_consultoria_id
        AND cb.scheduled_date = p_date
        AND cb.scheduled_time = ts.slot_time::TIME
        AND cb.booking_status NOT IN ('cancelled', 'no_show')
    ) AS is_available
  FROM time_slots ts
  ORDER BY ts.slot_time;
END;
$$ LANGUAGE plpgsql STABLE;

-- Seed email templates
INSERT INTO email_templates (name, slug, subject, body_html, variables, category) VALUES
(
  'Confirmação de Agendamento',
  'booking-confirmation',
  'Confirmação: {{consultoria_name}} agendada para {{date}}',
  '<h1>Agendamento Confirmado!</h1><p>Olá {{participant_name}},</p><p>Sua consultoria <strong>{{consultoria_name}}</strong> foi confirmada para <strong>{{date}} às {{time}}</strong>.</p><p>Link da reunião: <a href="{{meeting_url}}">{{meeting_url}}</a></p>',
  ARRAY['participant_name', 'consultoria_name', 'date', 'time', 'meeting_url'],
  'transactional'
),
(
  'Lembrete 24h',
  'reminder-24h',
  'Lembrete: {{consultoria_name}} amanhã às {{time}}',
  '<h1>Lembrete</h1><p>Sua consultoria será amanhã às {{time}}.</p><p>Link: <a href="{{meeting_url}}">Acessar reunião</a></p>',
  ARRAY['consultoria_name', 'time', 'meeting_url'],
  'notification'
);
