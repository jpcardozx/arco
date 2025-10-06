/**
 * Cloud Storage Service - Real Supabase Implementation
 * Complete file management with storage and metadata
 */

import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Database } from '@/types/supabase'

export interface CloudFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  created_at: string
  updated_at?: string
  path: string
  starred?: boolean
  tags?: string[]
}

export interface CloudStorageResponse {
  files: CloudFile[]
  error?: { message: string }
}

export interface UploadResponse {
  path: string
  error?: string
}

export interface DeleteResponse {
  success: boolean
  error?: string
}

export const CloudStorageService = {
  /**
   * Upload file to Supabase Storage and create metadata entry
   */
  async uploadFile(file: File, folderPath: string = '/'): Promise<UploadResponse> {
    try {
      const supabase = createSupabaseBrowserClient()
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return { path: '', error: 'Usuário não autenticado' }
      }

      // Generate unique filename
      const timestamp = Date.now()
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const fileName = `${timestamp}_${sanitizedName}`
      const storagePath = `${user.id}/${folderPath.replace(/^\//, '')}/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return { path: '', error: uploadError.message }
      }

      // Get file extension
      const extension = file.name.split('.').pop() || ''

      // Create metadata entry
      const { data: metadataData, error: metadataError } = await supabase
        .from('cloud_files')
        .insert({
          user_id: user.id,
          name: sanitizedName,
          original_name: file.name,
          path: storagePath,
          size: file.size,
          mime_type: file.type,
          extension: extension,
          folder_path: folderPath
        })
        .select()
        .single()

      if (metadataError) {
        console.error('Metadata error:', metadataError)
        // Cleanup uploaded file if metadata creation fails
        await supabase.storage.from('user-files').remove([storagePath])
        return { path: '', error: metadataError.message }
      }

      return { path: storagePath }
    } catch (error) {
      console.error('Upload exception:', error)
      return { 
        path: '', 
        error: error instanceof Error ? error.message : 'Erro ao fazer upload'
      }
    }
  },

  /**
   * Get files from a folder
   */
  async getFiles(folderPath: string = '/'): Promise<CloudStorageResponse> {
    try {
      const supabase = createSupabaseBrowserClient()
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return { files: [], error: { message: 'Usuário não autenticado' } }
      }

      // Get file metadata from database
      const { data: filesData, error: filesError } = await supabase
        .from('cloud_files')
        .select('*')
        .eq('user_id', user.id)
        .eq('folder_path', folderPath)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      if (filesError) {
        console.error('Files query error:', filesError)
        return { files: [], error: { message: filesError.message } }
      }

      // Get public URLs for files
      const files: CloudFile[] = await Promise.all(
        (filesData || []).map(async (file: any) => {
          const { data: urlData } = supabase.storage
            .from('user-files')
            .getPublicUrl(file.path)

          return {
            id: file.id,
            name: file.name,
            size: file.size,
            type: file.mime_type,
            url: urlData.publicUrl,
            created_at: file.created_at,
            updated_at: file.updated_at || undefined,
            path: file.path,
            starred: file.starred,
            tags: file.tags
          }
        })
      )

      return { files }
    } catch (error) {
      console.error('Get files exception:', error)
      return {
        files: [],
        error: { message: error instanceof Error ? error.message : 'Erro ao buscar arquivos' }
      }
    }
  },

  /**
   * Delete file from storage and metadata
   */
  async deleteFile(fileId: string): Promise<DeleteResponse> {
    try {
      const supabase = createSupabaseBrowserClient()
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return { success: false, error: 'Usuário não autenticado' }
      }

      // Get file metadata
      const { data: fileData, error: fileError } = await supabase
        .from('cloud_files')
        .select('path')
        .eq('id', fileId)
        .eq('user_id', user.id)
        .single()

      if (fileError || !fileData) {
        return { success: false, error: 'Arquivo não encontrado' }
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user-files')
        .remove([fileData.path])

      if (storageError) {
        console.error('Storage delete error:', storageError)
        return { success: false, error: storageError.message }
      }

      // Soft delete metadata (or hard delete)
      const { error: deleteError } = await supabase
        .from('cloud_files')
        .delete()
        .eq('id', fileId)
        .eq('user_id', user.id)

      if (deleteError) {
        console.error('Metadata delete error:', deleteError)
        return { success: false, error: deleteError.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Delete exception:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao deletar arquivo'
      }
    }
  },

  /**
   * Download file from storage
   */
  async downloadFile(fileId: string): Promise<{ data: Blob | null; error?: string }> {
    try {
      const supabase = createSupabaseBrowserClient()
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return { data: null, error: 'Usuário não autenticado' }
      }

      // Get file metadata
      const { data: fileData, error: fileError } = await supabase
        .from('cloud_files')
        .select('path, name')
        .eq('id', fileId)
        .eq('user_id', user.id)
        .single()

      if (fileError || !fileData) {
        return { data: null, error: 'Arquivo não encontrado' }
      }

      // Download from storage
      const { data: blobData, error: downloadError } = await supabase.storage
        .from('user-files')
        .download(fileData.path)

      if (downloadError) {
        console.error('Download error:', downloadError)
        return { data: null, error: downloadError.message }
      }

      // Update download count (fire and forget)
      supabase
        .from('cloud_files')
        .update({
          download_count: (blobData as any).download_count + 1 || 1,
          last_accessed_at: new Date().toISOString()
        } as any)
        .eq('id', fileId)
        .then(() => {})

      return { data: blobData }
    } catch (error) {
      console.error('Download exception:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erro ao baixar arquivo'
      }
    }
  },

  /**
   * Toggle file starred status
   */
  async toggleStar(fileId: string, starred: boolean): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createSupabaseBrowserClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return { success: false, error: 'Usuário não autenticado' }
      }

      const { error } = await supabase
        .from('cloud_files')
        .update({ starred })
        .eq('id', fileId)
        .eq('user_id', user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar favorito'
      }
    }
  }
}
