-- ============================================
-- TIER ENFORCEMENT & AUTOMATION
-- ============================================
-- Migration: tier_enforcement_and_automation
-- Created: 2025-10-06
-- Description: Implement tier limits, auto-invoicing, and business automation
-- ============================================

-- ============================================
-- 1. TIER ENFORCEMENT FUNCTION
-- ============================================

-- Prevent FREE users from exceeding analysis limits
CREATE OR REPLACE FUNCTION enforce_tier_limits()
RETURNS TRIGGER AS $$
DECLARE
  user_tier TEXT;
  current_count INT;
  max_limit INT;
BEGIN
  -- Get user tier and current usage
  SELECT tier, monthly_analysis_count
  INTO user_tier, current_count
  FROM user_profiles
  WHERE id = NEW.user_id;

  -- If user not found (should not happen with FK), allow
  IF user_tier IS NULL THEN
    RETURN NEW;
  END IF;

  -- Set limits based on tier
  IF user_tier = 'free' THEN
    max_limit := 3;
  ELSE
    max_limit := 999999; -- Unlimited for paid users
  END IF;

  -- Check if limit exceeded
  IF current_count >= max_limit THEN
    RAISE EXCEPTION 'Limite de análises atingido (% de %). Faça upgrade para o plano PRO para continuar.',
      current_count, max_limit
      USING HINT = 'Acesse https://arco.consultingarco.com/pricing para ver os planos';
  END IF;

  -- Increment counter
  UPDATE user_profiles
  SET monthly_analysis_count = monthly_analysis_count + 1,
      updated_at = NOW()
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on analysis_requests INSERT
DROP TRIGGER IF EXISTS trigger_enforce_tier_limits ON analysis_requests;
CREATE TRIGGER trigger_enforce_tier_limits
  BEFORE INSERT ON analysis_requests
  FOR EACH ROW
  EXECUTE FUNCTION enforce_tier_limits();

COMMENT ON FUNCTION enforce_tier_limits IS 'Enforces tier-based analysis limits (FREE: 3/month, PAID: unlimited)';

-- ============================================
-- 2. AUTO-COMMISSION CALCULATION
-- ============================================

-- Calculate and create commission when invoice is marked as paid
CREATE OR REPLACE FUNCTION auto_create_commission()
RETURNS TRIGGER AS $$
DECLARE
  commission_rate DECIMAL := 0.10; -- 10% commission
  commission_amount DECIMAL;
  agent_id UUID;
BEGIN
  -- Only process when status changes to 'paid'
  IF NEW.status = 'paid' AND (OLD.status IS NULL OR OLD.status != 'paid') THEN

    -- Calculate commission (10% of total_amount)
    commission_amount := NEW.total_amount * commission_rate;

    -- Find agent/consultant responsible (from user who created invoice)
    -- In future: get from invoice.assigned_to or client.assigned_to
    agent_id := NEW.user_id;

    -- Create commission record
    INSERT INTO commissions (
      user_id,
      invoice_id,
      amount,
      rate,
      status,
      created_at
    ) VALUES (
      agent_id,
      NEW.id,
      commission_amount,
      commission_rate,
      'pending',
      NOW()
    );

    RAISE NOTICE 'Commission created: R$ % for user %', commission_amount, agent_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on invoices UPDATE
DROP TRIGGER IF EXISTS trigger_auto_commission ON invoices;
CREATE TRIGGER trigger_auto_commission
  AFTER UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_commission();

COMMENT ON FUNCTION auto_create_commission IS 'Auto-creates 10% commission when invoice is marked as paid';

-- ============================================
-- 3. AUTO-ARCHIVE OLD ANALYSES
-- ============================================

-- Mark old analyses as archived (optimize storage)
CREATE OR REPLACE FUNCTION archive_old_analyses()
RETURNS void AS $$
BEGIN
  UPDATE analysis_requests
  SET status = 'archived'
  WHERE status = 'completed'
    AND created_at < NOW() - INTERVAL '6 months'
    AND status != 'archived';

  RAISE NOTICE 'Archived % old analyses', found;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION archive_old_analyses IS 'Archives completed analyses older than 6 months (run via cron)';

-- ============================================
-- 4. MONTHLY USAGE RESET
-- ============================================

-- Reset monthly counters (run on 1st of each month)
CREATE OR REPLACE FUNCTION reset_monthly_limits()
RETURNS void AS $$
BEGIN
  UPDATE user_profiles
  SET
    monthly_analysis_count = 0,
    monthly_support_tickets = 0,
    updated_at = NOW()
  WHERE tier IN ('free', 'paid');

  RAISE NOTICE 'Reset monthly limits for % users', found;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION reset_monthly_limits IS 'Resets monthly usage counters (run on 1st of month via cron)';

-- ============================================
-- 5. LEAD AUTO-ASSIGNMENT
-- ============================================

-- Auto-assign new leads to available sales team member
CREATE OR REPLACE FUNCTION auto_assign_lead()
RETURNS TRIGGER AS $$
DECLARE
  assigned_admin UUID;
BEGIN
  -- If lead already assigned, skip
  IF NEW.assigned_to IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Find admin with least leads (round-robin assignment)
  SELECT up.id INTO assigned_admin
  FROM user_profiles up
  WHERE up.user_type = 'admin'
  ORDER BY (
    SELECT COUNT(*)
    FROM leads l
    WHERE l.assigned_to = up.id
  ) ASC
  LIMIT 1;

  -- If admin found, assign lead
  IF assigned_admin IS NOT NULL THEN
    NEW.assigned_to := assigned_admin;
    RAISE NOTICE 'Lead % auto-assigned to admin %', NEW.id, assigned_admin;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on leads INSERT
DROP TRIGGER IF EXISTS trigger_auto_assign_lead ON leads;
CREATE TRIGGER trigger_auto_assign_lead
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION auto_assign_lead();

COMMENT ON FUNCTION auto_assign_lead IS 'Auto-assigns new leads to admin with least workload';

-- ============================================
-- 6. STORAGE USAGE TRACKING
-- ============================================

-- Update storage usage when files are uploaded/deleted
CREATE OR REPLACE FUNCTION update_storage_usage()
RETURNS TRIGGER AS $$
DECLARE
  file_size_mb DECIMAL;
BEGIN
  -- Convert bytes to MB
  IF TG_OP = 'INSERT' THEN
    file_size_mb := NEW.size_bytes / 1048576.0;

    UPDATE user_profiles
    SET storage_used_mb = storage_used_mb + file_size_mb,
        updated_at = NOW()
    WHERE id = NEW.user_id;

  ELSIF TG_OP = 'DELETE' THEN
    file_size_mb := OLD.size_bytes / 1048576.0;

    UPDATE user_profiles
    SET storage_used_mb = GREATEST(0, storage_used_mb - file_size_mb),
        updated_at = NOW()
    WHERE id = OLD.user_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on cloud_files (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'cloud_files') THEN
    DROP TRIGGER IF EXISTS trigger_update_storage_usage ON cloud_files;
    CREATE TRIGGER trigger_update_storage_usage
      AFTER INSERT OR DELETE ON cloud_files
      FOR EACH ROW
      EXECUTE FUNCTION update_storage_usage();
  END IF;
END $$;

COMMENT ON FUNCTION update_storage_usage IS 'Tracks storage usage in user_profiles when files are added/removed';

-- ============================================
-- 7. AUDIT LOG AUTO-CLEANUP
-- ============================================

-- Delete audit logs older than 1 year (GDPR compliance)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs_v2()
RETURNS void AS $$
BEGIN
  DELETE FROM audit_log
  WHERE created_at < NOW() - INTERVAL '1 year';

  RAISE NOTICE 'Deleted % old audit log entries', found;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_old_audit_logs_v2 IS 'Deletes audit logs older than 1 year (run via cron)';

-- ============================================
-- 8. SCHEDULED JOBS SETUP (pg_cron)
-- ============================================

-- Note: pg_cron must be enabled in Supabase dashboard
-- To enable: Database → Extensions → pg_cron

-- Schedule: Reset monthly limits (1st of month, 00:00 UTC)
-- SELECT cron.schedule(
--   'reset-monthly-limits',
--   '0 0 1 * *',
--   $$ SELECT reset_monthly_limits() $$
-- );

-- Schedule: Archive old analyses (Daily, 02:00 UTC)
-- SELECT cron.schedule(
--   'archive-old-analyses',
--   '0 2 * * *',
--   $$ SELECT archive_old_analyses() $$
-- );

-- Schedule: Cleanup audit logs (Weekly, Sunday 03:00 UTC)
-- SELECT cron.schedule(
--   'cleanup-audit-logs',
--   '0 3 * * 0',
--   $$ SELECT cleanup_old_audit_logs() $$
-- );

-- ============================================
-- 9. TIER UPGRADE/DOWNGRADE HELPERS
-- ============================================

-- Helper function to upgrade user to PAID
CREATE OR REPLACE FUNCTION upgrade_to_paid(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE user_profiles
  SET
    tier = 'paid',
    subscription_status = 'active',
    subscription_start_date = NOW(),
    monthly_analysis_count = 0, -- Reset counter on upgrade
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Log upgrade
  INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
  VALUES (p_user_id, 'tier_upgrade', 'user_profiles', p_user_id, '{"from": "free", "to": "paid"}'::jsonb);

  RAISE NOTICE 'User % upgraded to PAID tier', p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to downgrade user to FREE
CREATE OR REPLACE FUNCTION downgrade_to_free(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE user_profiles
  SET
    tier = 'free',
    subscription_status = 'canceled',
    subscription_end_date = NOW(),
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Log downgrade
  INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
  VALUES (p_user_id, 'tier_downgrade', 'user_profiles', p_user_id, '{"from": "paid", "to": "free"}'::jsonb);

  RAISE NOTICE 'User % downgraded to FREE tier', p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION upgrade_to_paid IS 'Upgrades user to PAID tier (called by Stripe webhook)';
COMMENT ON FUNCTION downgrade_to_free IS 'Downgrades user to FREE tier (called by Stripe webhook)';

-- ============================================
-- 10. USAGE STATISTICS FUNCTION
-- ============================================

-- Get user usage summary
CREATE OR REPLACE FUNCTION get_user_usage_stats(p_user_id UUID)
RETURNS TABLE (
  tier TEXT,
  analyses_used INT,
  analyses_limit INT,
  storage_used_mb DECIMAL,
  storage_limit_mb DECIMAL,
  analyses_percentage INT,
  storage_percentage INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    up.tier,
    up.monthly_analysis_count,
    CASE WHEN up.tier = 'free' THEN 3 ELSE 999999 END AS analyses_limit,
    up.storage_used_mb,
    CASE WHEN up.tier = 'free' THEN 100.0 ELSE 10000.0 END AS storage_limit_mb,
    CASE
      WHEN up.tier = 'free' THEN LEAST(100, ROUND((up.monthly_analysis_count::DECIMAL / 3) * 100))
      ELSE 0
    END AS analyses_percentage,
    CASE
      WHEN up.tier = 'free' THEN LEAST(100, ROUND((up.storage_used_mb / 100.0) * 100))
      ELSE LEAST(100, ROUND((up.storage_used_mb / 10000.0) * 100))
    END AS storage_percentage
  FROM user_profiles up
  WHERE up.id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_user_usage_stats IS 'Returns user usage statistics with percentages';

-- ============================================
-- 11. GRANT PERMISSIONS
-- ============================================

-- Allow authenticated users to read their own usage stats
GRANT EXECUTE ON FUNCTION get_user_usage_stats TO authenticated;

-- Service role only for admin functions
REVOKE EXECUTE ON FUNCTION reset_monthly_limits FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION archive_old_analyses FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION cleanup_old_audit_logs_v2 FROM PUBLIC;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

COMMENT ON SCHEMA public IS 'Tier enforcement and automation layer active';
