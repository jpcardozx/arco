-- Cloud Storage System
-- Complete file management with Supabase Storage integration
-- Created: 2025-01-05

-- =====================================================
-- 1. STORAGE BUCKETS
-- =====================================================

-- Create user files bucket (public access with RLS)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-files',
  'user-files',
  false,
  52428800, -- 50MB per file
  ARRAY[
    'image/*',
    'video/*',
    'audio/*',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/zip',
    'application/x-rar-compressed',
    'text/*'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. TABLES
-- =====================================================

-- Cloud files metadata table
CREATE TABLE IF NOT EXISTS public.cloud_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- File identification
  name text NOT NULL,
  original_name text NOT NULL,
  path text NOT NULL UNIQUE, -- Storage path: user_id/folder/filename
  
  -- File metadata
  size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL,
  extension text,
  
  -- Organization
  folder_path text DEFAULT '/', -- Logical folder path
  starred boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  
  -- Sharing
  is_public boolean DEFAULT false,
  share_token text UNIQUE,
  share_expires_at timestamptz,
  
  -- Tracking
  download_count integer DEFAULT 0,
  last_accessed_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz, -- Soft delete
  
  -- Constraints
  CONSTRAINT valid_size CHECK (size >= 0),
  CONSTRAINT valid_folder_path CHECK (folder_path ~ '^/.*'),
  CONSTRAINT valid_path CHECK (path ~ '^.+/.+')
);

-- Indexes for cloud_files
CREATE INDEX IF NOT EXISTS idx_cloud_files_user_id ON public.cloud_files(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_cloud_files_folder_path ON public.cloud_files(user_id, folder_path) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_cloud_files_starred ON public.cloud_files(user_id, starred) WHERE starred = true AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_cloud_files_share_token ON public.cloud_files(share_token) WHERE share_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cloud_files_created_at ON public.cloud_files(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cloud_files_mime_type ON public.cloud_files(mime_type);

-- File shares table
CREATE TABLE IF NOT EXISTS public.file_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id uuid NOT NULL REFERENCES public.cloud_files(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Share details
  shared_with_email text,
  shared_with_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  permission text NOT NULL DEFAULT 'view', -- view, download, edit
  
  -- Tracking
  access_count integer DEFAULT 0,
  last_accessed_at timestamptz,
  
  -- Expiration
  expires_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_permission CHECK (permission IN ('view', 'download', 'edit')),
  CONSTRAINT has_recipient CHECK (
    shared_with_email IS NOT NULL OR shared_with_user_id IS NOT NULL
  )
);

-- Indexes for file_shares
CREATE INDEX IF NOT EXISTS idx_file_shares_file_id ON public.file_shares(file_id);
CREATE INDEX IF NOT EXISTS idx_file_shares_user_id ON public.file_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_file_shares_shared_with_user ON public.file_shares(shared_with_user_id);
CREATE INDEX IF NOT EXISTS idx_file_shares_expires_at ON public.file_shares(expires_at) WHERE expires_at IS NOT NULL;

-- =====================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.cloud_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_shares ENABLE ROW LEVEL SECURITY;

-- Cloud files policies
CREATE POLICY "Users can view their own files"
  ON public.cloud_files FOR SELECT
  USING (
    user_id = auth.uid()
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can view shared files"
  ON public.cloud_files FOR SELECT
  USING (
    deleted_at IS NULL
    AND (
      -- Shared via file_shares
      id IN (
        SELECT file_id FROM public.file_shares
        WHERE shared_with_user_id = auth.uid()
          AND (expires_at IS NULL OR expires_at > now())
      )
      -- Or public files
      OR is_public = true
    )
  );

CREATE POLICY "Users can insert their own files"
  ON public.cloud_files FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own files"
  ON public.cloud_files FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own files"
  ON public.cloud_files FOR DELETE
  USING (user_id = auth.uid());

-- File shares policies
CREATE POLICY "Users can view shares they created"
  ON public.file_shares FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view shares for them"
  ON public.file_shares FOR SELECT
  USING (
    shared_with_user_id = auth.uid()
    AND (expires_at IS NULL OR expires_at > now())
  );

CREATE POLICY "Users can create shares for their files"
  ON public.file_shares FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND file_id IN (
      SELECT id FROM public.cloud_files WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their shares"
  ON public.file_shares FOR DELETE
  USING (user_id = auth.uid());

-- =====================================================
-- 4. STORAGE POLICIES
-- =====================================================

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload files to their folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'user-files'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to view their own files
CREATE POLICY "Users can view their own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'user-files'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to update their own files
CREATE POLICY "Users can update their own files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'user-files'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'user-files'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- =====================================================
-- 5. TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cloud_files_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cloud_files_updated_at
  BEFORE UPDATE ON public.cloud_files
  FOR EACH ROW
  EXECUTE FUNCTION update_cloud_files_updated_at();

-- Auto-generate share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = true AND NEW.share_token IS NULL THEN
    NEW.share_token = encode(gen_random_bytes(16), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_share_token
  BEFORE INSERT OR UPDATE ON public.cloud_files
  FOR EACH ROW
  EXECUTE FUNCTION generate_share_token();

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Get storage usage for user
CREATE OR REPLACE FUNCTION get_user_storage_usage(p_user_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_files', COUNT(*),
    'total_size', COALESCE(SUM(size), 0),
    'by_type', jsonb_object_agg(
      COALESCE(SPLIT_PART(mime_type, '/', 1), 'other'),
      type_stats
    )
  )
  INTO v_result
  FROM (
    SELECT
      mime_type,
      jsonb_build_object(
        'count', COUNT(*),
        'size', SUM(size)
      ) as type_stats
    FROM public.cloud_files
    WHERE user_id = p_user_id
      AND deleted_at IS NULL
    GROUP BY SPLIT_PART(mime_type, '/', 1), mime_type
  ) subq;
  
  RETURN COALESCE(v_result, '{"total_files": 0, "total_size": 0, "by_type": {}}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Clean up expired shares
CREATE OR REPLACE FUNCTION cleanup_expired_shares()
RETURNS integer AS $$
DECLARE
  v_deleted integer;
BEGIN
  DELETE FROM public.file_shares
  WHERE expires_at IS NOT NULL
    AND expires_at < now();
  
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 7. COMMENTS
-- =====================================================

COMMENT ON TABLE public.cloud_files IS 'File metadata for cloud storage';
COMMENT ON TABLE public.file_shares IS 'File sharing permissions and tracking';
COMMENT ON FUNCTION get_user_storage_usage IS 'Get storage usage statistics for a user';
COMMENT ON FUNCTION cleanup_expired_shares IS 'Remove expired file shares';
