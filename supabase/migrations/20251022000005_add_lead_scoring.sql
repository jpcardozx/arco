/**
 * Add Lead Scoring System
 *
 * Enables intelligent lead prioritization based on:
 * - Intent signals (biggest_challenge, urgency, revenue)
 * - Engagement metrics (email verification, opens, clicks)
 * - Fit signals (ad_experience, message content)
 */

-- Add scoring columns to leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS intent_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS engagement_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS fit_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_engagement_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS qualification_status TEXT DEFAULT 'new' CHECK (qualification_status IN ('new', 'hot', 'warm', 'cold', 'disqualified'));

-- Create indexes for efficient scoring queries
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_qualification_status ON leads(qualification_status);
CREATE INDEX IF NOT EXISTS idx_leads_email_verified ON leads(email_verified);
CREATE INDEX IF NOT EXISTS idx_leads_last_engagement ON leads(last_engagement_at);

-- Create lead_scoring_rules table for configurable scoring logic
CREATE TABLE IF NOT EXISTS lead_scoring_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,

  -- Intent scoring weights
  intent_immediate_weight INTEGER DEFAULT 40,
  intent_this_month_weight INTEGER DEFAULT 30,
  intent_this_quarter_weight INTEGER DEFAULT 20,
  intent_exploring_weight INTEGER DEFAULT 10,
  intent_not_sure_weight INTEGER DEFAULT 5,

  -- Revenue score weights
  revenue_high_weight INTEGER DEFAULT 30,
  revenue_medium_weight INTEGER DEFAULT 20,
  revenue_low_weight INTEGER DEFAULT 10,

  -- Experience weights
  experience_strong_weight INTEGER DEFAULT 25,
  experience_moderate_weight INTEGER DEFAULT 15,
  experience_none_weight INTEGER DEFAULT 5,

  -- Challenge type weights
  challenge_primary_weight INTEGER DEFAULT 35,
  challenge_secondary_weight INTEGER DEFAULT 15,

  -- Verification bonus
  email_verified_bonus INTEGER DEFAULT 10,
  message_provided_bonus INTEGER DEFAULT 5,

  -- Engagement multiplier for updates
  engagement_multiplier DECIMAL(2,2) DEFAULT 1.2,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scoring_rules_campaign ON lead_scoring_rules(campaign_id);

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(lead_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_score INTEGER := 0;
  v_lead RECORD;
  v_rules RECORD;
  v_intent_weight INTEGER;
  v_revenue_weight INTEGER;
  v_experience_weight INTEGER;
BEGIN
  -- Get lead data
  SELECT * INTO v_lead FROM leads WHERE id = lead_id;

  IF v_lead IS NULL THEN
    RETURN 0;
  END IF;

  -- Get campaign scoring rules (or defaults)
  SELECT * INTO v_rules FROM lead_scoring_rules
  WHERE campaign_id = v_lead.campaign_id
  LIMIT 1;

  IF v_rules IS NULL THEN
    -- Create default rules if they don't exist
    INSERT INTO lead_scoring_rules (campaign_id)
    VALUES (v_lead.campaign_id)
    RETURNING * INTO v_rules;
  END IF;

  -- Calculate intent score
  CASE v_lead.metadata ->> 'urgency'
    WHEN 'immediate' THEN v_intent_weight := v_rules.intent_immediate_weight;
    WHEN 'this_month' THEN v_intent_weight := v_rules.intent_this_month_weight;
    WHEN 'this_quarter' THEN v_intent_weight := v_rules.intent_this_quarter_weight;
    WHEN 'exploring' THEN v_intent_weight := v_rules.intent_exploring_weight;
    WHEN 'not_sure' THEN v_intent_weight := v_rules.intent_not_sure_weight;
    ELSE v_intent_weight := 0;
  END CASE;

  v_score := v_score + v_intent_weight;

  -- Calculate revenue score
  CASE v_lead.metadata ->> 'monthly_revenue'
    WHEN 'over_500k', '100k_500k' THEN v_revenue_weight := v_rules.revenue_high_weight;
    WHEN '50k_100k', '10k_50k' THEN v_revenue_weight := v_rules.revenue_medium_weight;
    WHEN 'under_10k' THEN v_revenue_weight := v_rules.revenue_low_weight;
    ELSE v_revenue_weight := 0;
  END CASE;

  v_score := v_score + v_revenue_weight;

  -- Calculate experience score
  CASE v_lead.metadata ->> 'ad_experience'
    WHEN 'very_strong', 'strong' THEN v_experience_weight := v_rules.experience_strong_weight;
    WHEN 'moderate' THEN v_experience_weight := v_rules.experience_moderate_weight;
    WHEN 'unsuccessful', 'never' THEN v_experience_weight := v_rules.experience_none_weight;
    ELSE v_experience_weight := 0;
  END CASE;

  v_score := v_score + v_experience_weight;

  -- Add challenge bonus
  IF v_lead.metadata ->> 'biggest_challenge' IS NOT NULL THEN
    v_score := v_score + v_rules.challenge_primary_weight;
  END IF;

  -- Add verification bonus
  IF v_lead.email_verified THEN
    v_score := v_score + v_rules.email_verified_bonus;
  END IF;

  -- Add message bonus
  IF v_lead.metadata ->> 'message' IS NOT NULL
     AND LENGTH(v_lead.metadata ->> 'message') > 10 THEN
    v_score := v_score + v_rules.message_provided_bonus;
  END IF;

  -- Apply engagement multiplier if recently engaged
  IF v_lead.last_engagement_at > NOW() - INTERVAL '7 days' THEN
    v_score := ROUND(v_score * v_rules.engagement_multiplier);
  END IF;

  -- Determine qualification status
  UPDATE leads
  SET
    intent_score = v_intent_weight,
    engagement_score = CASE WHEN v_lead.email_verified THEN 10 ELSE 0 END,
    fit_score = v_revenue_weight + v_experience_weight,
    lead_score = v_score,
    qualification_status = CASE
      WHEN v_score >= 80 THEN 'hot'
      WHEN v_score >= 50 THEN 'warm'
      WHEN v_score >= 20 THEN 'cold'
      ELSE 'new'
    END
  WHERE id = lead_id;

  RETURN v_score;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate score when lead is created or updated
CREATE OR REPLACE FUNCTION trigger_calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_lead_score(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_lead_score_calculate ON leads;
CREATE TRIGGER trigger_lead_score_calculate
AFTER INSERT OR UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION trigger_calculate_lead_score();

-- Function to update last engagement
CREATE OR REPLACE FUNCTION update_lead_engagement(lead_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE leads
  SET last_engagement_at = NOW()
  WHERE id = lead_id;

  PERFORM calculate_lead_score(lead_id);
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION calculate_lead_score TO authenticated, anon;
GRANT EXECUTE ON FUNCTION update_lead_engagement TO authenticated, anon;
