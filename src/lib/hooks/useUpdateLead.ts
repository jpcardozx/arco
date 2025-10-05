/**
 * useUpdateLead Hook - Stub
 */

import { Lead } from '@/lib/types/supabase-helpers'

export function useUpdateLead() {
  return {
    mutateAsync: async (data: { id: string } & Partial<Lead>) => {
      console.log('Update lead:', data.id, data)
      // TODO: Implement real update logic
      return data as Lead
    },
    isPending: false,
  }
}
