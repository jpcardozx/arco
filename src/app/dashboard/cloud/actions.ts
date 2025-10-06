/**
 * Cloud Storage Server Actions
 * Real implementation with Supabase Storage + Database
 */

'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/database'

type CloudFile = Database['public']['Tables']['cloud_files']['Row']

export interface CloudFileWithUrl extends CloudFile {
  url: string
}

/**
 * Get user's files from a specific folder
 */
export async function getCloudFiles(folderPath: string = '/'): Promise<CloudFileWithUrl[]> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('Auth error:', authError)
      return []
    }

    // Get file metadata from database
    const { data: files, error: filesError } = await supabase
      .from('cloud_files')
      .select('*')
      .eq('user_id', user.id)
      .eq('folder_path', folderPath)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (filesError) {
      console.error('Files query error:', filesError)
      return []
    }

    // Get public URLs for files
    const filesWithUrls = await Promise.all(
      (files || []).map(async (file: CloudFile) => {
        const { data: urlData } = supabase.storage
          .from('user-files')
          .getPublicUrl(file.path)

        return {
          ...file,
          url: urlData.publicUrl
        }
      })
    )

    return filesWithUrls
  } catch (error) {
    console.error('Get files exception:', error)
    return []
  }
}

/**
 * Upload file to storage and create metadata
 */
export async function uploadCloudFile(
  formData: FormData,
  folderPath: string = '/'
): Promise<{ success: boolean; error?: string; fileId?: string }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    const file = formData.get('file') as File
    if (!file) {
      return { success: false, error: 'Nenhum arquivo fornecido' }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${sanitizedName}`
    const storagePath = `${user.id}/${folderPath.replace(/^\//, '')}/${fileName}`.replace(/\/+/g, '/')

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user-files')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { success: false, error: uploadError.message }
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
      return { success: false, error: metadataError.message }
    }

    revalidatePath('/dashboard/cloud')
    return { success: true, fileId: metadataData.id }
  } catch (error) {
    console.error('Upload exception:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao fazer upload'
    }
  }
}

/**
 * Delete file from storage and metadata
 */
export async function deleteCloudFile(
  fileId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createSupabaseServer()
    
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

    // Delete metadata
    const { error: deleteError } = await supabase
      .from('cloud_files')
      .delete()
      .eq('id', fileId)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Metadata delete error:', deleteError)
      return { success: false, error: deleteError.message }
    }

    revalidatePath('/dashboard/cloud')
    return { success: true }
  } catch (error) {
    console.error('Delete exception:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar arquivo'
    }
  }
}

/**
 * Toggle file starred status
 */
export async function toggleStarredFile(
  fileId: string,
  starred: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createSupabaseServer()
    
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

    revalidatePath('/dashboard/cloud')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar favorito'
    }
  }
}

/**
 * Download file and track access
 */
export async function downloadCloudFile(
  fileId: string
): Promise<{ success: boolean; url?: string; fileName?: string; error?: string }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    // Get file metadata
    const { data: fileData, error: fileError } = await supabase
      .from('cloud_files')
      .select('path, name, download_count')
      .eq('id', fileId)
      .eq('user_id', user.id)
      .single()

    if (fileError || !fileData) {
      return { success: false, error: 'Arquivo não encontrado' }
    }

    // Get signed URL for download
    const { data: urlData, error: urlError } = await supabase.storage
      .from('user-files')
      .createSignedUrl(fileData.path, 60) // 60 seconds

    if (urlError) {
      console.error('URL error:', urlError)
      return { success: false, error: urlError.message }
    }

    // Update download count (fire and forget)
    supabase
      .from('cloud_files')
      .update({
        download_count: (fileData.download_count || 0) + 1,
        last_accessed_at: new Date().toISOString()
      } as any)
      .eq('id', fileId)
      .then(() => {})

    return { 
      success: true, 
      url: urlData.signedUrl,
      fileName: fileData.name
    }
  } catch (error) {
    console.error('Download exception:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao baixar arquivo'
    }
  }
}

/**
 * Get storage usage statistics
 */
export async function getStorageStats(): Promise<{
  used: number
  total: number
  files: number
  folders: number
}> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { used: 0, total: 5 * 1024 * 1024 * 1024, files: 0, folders: 0 }
    }

    // Get all files for user
    const { data: files, error: filesError } = await supabase
      .from('cloud_files')
      .select('size, folder_path')
      .eq('user_id', user.id)
      .is('deleted_at', null)

    if (filesError) {
      console.error('Storage stats error:', filesError)
      return { used: 0, total: 5 * 1024 * 1024 * 1024, files: 0, folders: 0 }
    }

    const totalSize = files.reduce((sum: number, file: any) => sum + file.size, 0)
    const uniqueFolders = new Set(files.map((f: any) => f.folder_path))

    return {
      used: totalSize,
      total: 5 * 1024 * 1024 * 1024, // 5GB limit
      files: files.length,
      folders: uniqueFolders.size
    }
  } catch (error) {
    console.error('Storage stats exception:', error)
    return { used: 0, total: 5 * 1024 * 1024 * 1024, files: 0, folders: 0 }
  }
}

/**
 * Create share link for file
 */
export async function createShareLink(
  fileId: string,
  expiresInDays?: number
): Promise<{ success: boolean; shareToken?: string; error?: string }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    // Generate share token
    const shareToken = crypto.randomUUID().replace(/-/g, '')
    const expiresAt = expiresInDays 
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : null

    const { error } = await supabase
      .from('cloud_files')
      .update({
        is_public: true,
        share_token: shareToken,
        share_expires_at: expiresAt
      })
      .eq('id', fileId)
      .eq('user_id', user.id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/dashboard/cloud')
    return { success: true, shareToken }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar link'
    }
  }
}
