-- ============================================
-- ARCO MVP V1.0 - CLEAN SLATE MIGRATION
-- ============================================
-- Migration: 000_clean_slate
-- Created: 2025-01-05
-- Description: Drop all existing tables and start fresh with MVP V1.0
-- ============================================

-- Drop all existing tables (in reverse dependency order)
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS domain_analysis_requests CASCADE;
DROP TABLE IF EXISTS admin_settings CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop old functions
DROP FUNCTION IF EXISTS get_user_role CASCADE;
DROP FUNCTION IF EXISTS is_admin CASCADE;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- All old tables dropped, ready for fresh schema
-- ============================================
