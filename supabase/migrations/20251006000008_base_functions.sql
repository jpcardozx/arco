-- =====================================================
-- BASE FUNCTIONS AND UTILITIES
-- Core reusable functions for all migrations
-- =====================================================

-- Ensure UUID extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reusable updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper: Check if table exists
CREATE OR REPLACE FUNCTION public.table_exists(table_name text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND information_schema.tables.table_name = table_exists.table_name
  );
END;
$$ LANGUAGE plpgsql;

-- Helper: Check if column exists
CREATE OR REPLACE FUNCTION public.column_exists(table_name text, column_name text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND information_schema.columns.table_name = column_exists.table_name
      AND information_schema.columns.column_name = column_exists.column_name
  );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.set_updated_at() IS 'Trigger function to automatically update updated_at timestamp';
COMMENT ON FUNCTION public.table_exists(text) IS 'Check if a table exists in the public schema';
COMMENT ON FUNCTION public.column_exists(text, text) IS 'Check if a column exists in a table';
