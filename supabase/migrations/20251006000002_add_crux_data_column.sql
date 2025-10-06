-- ============================================
-- ADD CRUX DATA TO ANALYSIS RESULTS
-- ============================================
-- Migration: add_crux_data_column
-- Created: 2025-10-06
-- Description: Add CrUX (Chrome User Experience Report) field data
-- ============================================

-- Add crux_data column to store real user metrics
ALTER TABLE analysis_results
  ADD COLUMN IF NOT EXISTS crux_data JSONB;

-- Index for querying CrUX data
CREATE INDEX IF NOT EXISTS idx_analysis_results_crux_data
  ON analysis_results USING GIN (crux_data);

-- Comment
COMMENT ON COLUMN analysis_results.crux_data IS 'Chrome UX Report - Real user metrics from last 28 days (field data)';

-- Example CrUX data structure:
-- {
--   "overall_category": "FAST",
--   "metrics": {
--     "FIRST_CONTENTFUL_PAINT_MS": {
--       "percentile": 1200,
--       "category": "FAST"
--     },
--     "LARGEST_CONTENTFUL_PAINT_MS": {
--       "percentile": 2400,
--       "category": "AVERAGE"
--     },
--     "CUMULATIVE_LAYOUT_SHIFT_SCORE": {
--       "percentile": 0.05,
--       "category": "FAST"
--     },
--     "FIRST_INPUT_DELAY_MS": {
--       "percentile": 50,
--       "category": "FAST"
--     }
--   }
-- }
