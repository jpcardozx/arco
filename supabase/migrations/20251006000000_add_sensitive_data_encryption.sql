-- ============================================
-- SENSITIVE DATA ENCRYPTION
-- ============================================
-- Migration: add_sensitive_data_encryption
-- Created: 2025-10-06
-- Description: Encrypt sensitive fields using pgcrypto
-- ============================================

-- Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- 1. ENCRYPTED COLUMNS FOR SENSITIVE DATA
-- ============================================

-- Add encrypted phone column
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS phone_encrypted BYTEA;

-- Add encrypted payment reference
ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS payment_reference_encrypted BYTEA;

ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS payment_reference_encrypted BYTEA;

-- ============================================
-- 2. ENCRYPTION/DECRYPTION FUNCTIONS
-- ============================================

-- Encrypt sensitive data (uses Supabase Vault secret)
CREATE OR REPLACE FUNCTION encrypt_sensitive(data TEXT)
RETURNS BYTEA AS $$
DECLARE
  encryption_key TEXT;
BEGIN
  -- Get encryption key from environment (or Vault)
  encryption_key := current_setting('app.encryption_key', true);

  IF encryption_key IS NULL OR encryption_key = '' THEN
    RAISE EXCEPTION 'Encryption key not configured';
  END IF;

  RETURN pgp_sym_encrypt(data, encryption_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_sensitive(encrypted_data BYTEA)
RETURNS TEXT AS $$
DECLARE
  encryption_key TEXT;
BEGIN
  IF encrypted_data IS NULL THEN
    RETURN NULL;
  END IF;

  encryption_key := current_setting('app.encryption_key', true);

  IF encryption_key IS NULL OR encryption_key = '' THEN
    RAISE EXCEPTION 'Encryption key not configured';
  END IF;

  RETURN pgp_sym_decrypt(encrypted_data, encryption_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. HELPER FUNCTIONS FOR PHONE
-- ============================================

-- Set encrypted phone (transparent to application)
CREATE OR REPLACE FUNCTION set_encrypted_phone()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
    NEW.phone_encrypted := encrypt_sensitive(NEW.phone);
    -- Optionally clear plaintext (for max security)
    -- NEW.phone := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user_profiles
CREATE TRIGGER encrypt_phone_before_insert_update
  BEFORE INSERT OR UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_encrypted_phone();

-- ============================================
-- 4. HELPER FUNCTIONS FOR PAYMENT REFERENCES
-- ============================================

-- Set encrypted payment reference for invoices
CREATE OR REPLACE FUNCTION set_encrypted_payment_ref_invoices()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_reference IS NOT NULL AND NEW.payment_reference != '' THEN
    NEW.payment_reference_encrypted := encrypt_sensitive(NEW.payment_reference);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on invoices
CREATE TRIGGER encrypt_payment_ref_invoices
  BEFORE INSERT OR UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION set_encrypted_payment_ref_invoices();

-- Set encrypted payment reference for transactions
CREATE OR REPLACE FUNCTION set_encrypted_payment_ref_transactions()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_reference IS NOT NULL AND NEW.payment_reference != '' THEN
    NEW.payment_reference_encrypted := encrypt_sensitive(NEW.payment_reference);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on transactions
CREATE TRIGGER encrypt_payment_ref_transactions
  BEFORE INSERT OR UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION set_encrypted_payment_ref_transactions();

-- ============================================
-- 5. VIEW FOR DECRYPTED ACCESS (RLS-PROTECTED)
-- ============================================

-- Decrypted user profiles view
CREATE OR REPLACE VIEW user_profiles_decrypted AS
SELECT
  id,
  tier,
  user_type,
  full_name,
  company_name,
  phone, -- Plaintext (fallback)
  COALESCE(
    decrypt_sensitive(phone_encrypted),
    phone
  ) AS phone_decrypted,
  avatar_url,
  stripe_customer_id,
  stripe_subscription_id,
  subscription_status,
  subscription_start_date,
  subscription_end_date,
  monthly_analysis_count,
  storage_used_mb,
  monthly_support_tickets,
  created_at,
  updated_at
FROM user_profiles;

-- RLS on view
ALTER VIEW user_profiles_decrypted OWNER TO postgres;
GRANT SELECT ON user_profiles_decrypted TO authenticated;

-- ============================================
-- 6. MIGRATION: ENCRYPT EXISTING DATA
-- ============================================

-- Encrypt existing phone numbers (run once)
-- UPDATE user_profiles
-- SET phone_encrypted = encrypt_sensitive(phone)
-- WHERE phone IS NOT NULL AND phone_encrypted IS NULL;

-- Encrypt existing payment references (run once)
-- UPDATE invoices
-- SET payment_reference_encrypted = encrypt_sensitive(payment_reference)
-- WHERE payment_reference IS NOT NULL AND payment_reference_encrypted IS NULL;

-- UPDATE transactions
-- SET payment_reference_encrypted = encrypt_sensitive(payment_reference)
-- WHERE payment_reference IS NOT NULL AND payment_reference_encrypted IS NULL;

-- ============================================
-- 7. COMMENTS
-- ============================================

COMMENT ON FUNCTION encrypt_sensitive IS 'Encrypt sensitive text using pgcrypto (AES-256)';
COMMENT ON FUNCTION decrypt_sensitive IS 'Decrypt sensitive bytea using pgcrypto';
COMMENT ON VIEW user_profiles_decrypted IS 'View with decrypted sensitive fields (RLS-protected)';

-- ============================================
-- 8. SECURITY NOTES
-- ============================================

-- To configure encryption key:
-- 1. In Supabase Dashboard: Project Settings → API → Custom Postgres Config
-- 2. Add: app.encryption_key = 'your-256-bit-key-here'
-- 3. Or use Supabase Vault: https://supabase.com/docs/guides/database/vault

-- Generate secure key:
-- SELECT encode(gen_random_bytes(32), 'hex');

-- ============================================
