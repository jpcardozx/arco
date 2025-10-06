-- ============================================
-- USER CREATION TRIGGER
-- ============================================
-- Migration: add_user_creation_trigger
-- Created: 2025-10-05
-- Description: Auto-create user_profiles when auth.users is created
-- Priority: CRITICAL - Required for signup flow
-- ============================================

-- ============================================
-- FUNCTION: Handle New User Registration
-- ============================================
-- This function is triggered AFTER a new user is created in auth.users
-- It automatically creates a corresponding user_profiles row
-- Default tier: 'free', Default user_type: 'client'
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
BEGIN
  -- Extract full_name from user metadata
  user_full_name := NEW.raw_user_meta_data->>'full_name';

  -- Create user_profiles entry
  INSERT INTO public.user_profiles (
    id,
    full_name,
    tier,
    user_type,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    user_full_name,
    'free',
    'client',
    NOW(),
    NOW()
  );

  -- Seed default financial categories for new user
  -- (Only if finance system is enabled - safe to fail)
  BEGIN
    PERFORM public.seed_default_financial_categories(NEW.id);
  EXCEPTION
    WHEN OTHERS THEN
      -- Silently fail if function doesn't exist (finance migration not applied yet)
      NULL;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGER: Auto-create user_profiles on signup
-- ============================================
-- Fires AFTER INSERT on auth.users
-- Calls handle_new_user() function
-- ============================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON FUNCTION public.handle_new_user() IS 'Auto-creates user_profiles row when new user signs up via Supabase Auth';

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- New user signup flow:
-- 1. User signs up via Supabase Auth (auth.users INSERT)
-- 2. Trigger fires: on_auth_user_created
-- 3. Function executes: handle_new_user()
-- 4. user_profiles row created automatically
-- 5. (Optional) Default financial categories seeded
-- ============================================
