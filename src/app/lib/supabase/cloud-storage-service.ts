/**
 * Cloud Storage Service - Pareto Stub
 */

export interface CloudFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  created_at: string
  updated_at?: string
}

export interface CloudFolder {
  id: string
  name: string
  path: string
  created_at: string
}

export interface CloudStorageResponse {
  files: CloudFile[]
  error?: { message: string }
}

export interface UploadResponse {
  path: string
  error?: { message: string }
}

export interface DeleteResponse {
  success: boolean
  error?: { message: string }
}

export const CloudStorageService = {
  async uploadFile(file: File, path?: string): Promise<UploadResponse> {
    return {
      path: `/${path || 'uploads'}/${file.name}`,
    }
  },

  async getFiles(path?: string): Promise<CloudStorageResponse> {
    return { files: [] }
  },

  async deleteFile(id: string): Promise<DeleteResponse> {
    return { success: true }
  },

  async downloadFile(path: string): Promise<{ data: Blob | null; error?: { message: string } }> {
    return { data: null }
  },

  async oldDeleteFile(id: string): Promise<void> {
    console.log('Delete file:', id)
  }
}
