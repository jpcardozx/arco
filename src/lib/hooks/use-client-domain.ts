'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface SSLData {
  enabled: boolean
  expiry: string
  issuer: string
}

export interface DNSRecord {
  type: string
  name: string
  value: string
  status: 'ok' | 'warning' | 'error'
}

export interface DNSData {
  status: 'healthy' | 'warning' | 'error'
  records: DNSRecord[]
}

export interface PerformanceData {
  speed: number
  seo: number
  accessibility: number
  bestPractices: number
}

export interface PageData {
  url: string
  title: string
  views: number
  avgTime: string
  bounceRate: number
}

export interface DomainData {
  domain: string
  isVerified: boolean
  ssl: SSLData
  dns: DNSData
  performance: PerformanceData
  pages: PageData[]
  created_at?: string
  updated_at?: string
}

export function useClientDomain() {
  const supabase = getSupabaseClient()

  useEffect(() => {
  }, [])

  return useQuery<DomainData | null>({
    queryKey: ['client-domain'],
    queryFn: async () => {
      const startTime = performance.now()

      try {
        const { data, error } = await supabase.rpc('get_client_domain')

        if (error) {
          throw new Error(`Failed to fetch client domain: ${error.message}`)
        }

        const duration = Math.round(performance.now() - startTime)

        return data as unknown as DomainData | null
      } catch (err) {
        throw err
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
