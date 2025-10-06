/**
 * ARCO Database Types - Generated from Supabase Schema
 * 
 * This file contains TypeScript types for all database tables
 * Based on migrations in supabase/migrations/
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============================================
// ENUMS
// ============================================

export type UserTier = 'free' | 'paid'
export type UserType = 'client' | 'admin'
export type AnalysisStatus = 'pending' | 'running' | 'completed' | 'failed'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'
export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'cancelled'
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type CampaignPlatform = 'google_ads' | 'meta_ads' | 'linkedin_ads' | 'tiktok_ads'
export type CampaignStatus = 'active' | 'paused' | 'ended'

// ============================================
// DATABASE INTERFACE
// ============================================

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          tier: UserTier
          user_type: UserType
          full_name: string | null
          company_name: string | null
          phone: string | null
          avatar_url: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: SubscriptionStatus | null
          subscription_start_date: string | null
          subscription_end_date: string | null
          monthly_analysis_count: number
          storage_used_mb: number
          monthly_support_tickets: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          tier?: UserTier
          user_type?: UserType
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: SubscriptionStatus | null
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          monthly_analysis_count?: number
          storage_used_mb?: number
          monthly_support_tickets?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tier?: UserTier
          user_type?: UserType
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: SubscriptionStatus | null
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          monthly_analysis_count?: number
          storage_used_mb?: number
          monthly_support_tickets?: number
          created_at?: string
          updated_at?: string
        }
      }
      analysis_requests: {
        Row: {
          id: string
          user_id: string | null
          url: string
          status: AnalysisStatus
          arco_index: number | null
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          url: string
          status?: AnalysisStatus
          arco_index?: number | null
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          url?: string
          status?: AnalysisStatus
          arco_index?: number | null
          error_message?: string | null
          created_at?: string
        }
      }
      analysis_results: {
        Row: {
          id: string
          analysis_id: string
          lcp: number | null
          fid: number | null
          cls: number | null
          lighthouse_performance: number | null
          lighthouse_accessibility: number | null
          lighthouse_best_practices: number | null
          lighthouse_seo: number | null
          lighthouse_pwa: number | null
          raw_lighthouse_json: Json | null
          crux_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          lcp?: number | null
          fid?: number | null
          cls?: number | null
          lighthouse_performance?: number | null
          lighthouse_accessibility?: number | null
          lighthouse_best_practices?: number | null
          lighthouse_seo?: number | null
          lighthouse_pwa?: number | null
          raw_lighthouse_json?: Json | null
          crux_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          lcp?: number | null
          fid?: number | null
          cls?: number | null
          lighthouse_performance?: number | null
          lighthouse_accessibility?: number | null
          lighthouse_best_practices?: number | null
          lighthouse_seo?: number | null
          lighthouse_pwa?: number | null
          raw_lighthouse_json?: Json | null
          crux_data?: Json | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          url: string
          status: ProjectStatus
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          url: string
          status?: ProjectStatus
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          url?: string
          status?: ProjectStatus
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      [key: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_tier: UserTier
      user_type: UserType
      analysis_status: AnalysisStatus
      subscription_status: SubscriptionStatus
      project_status: ProjectStatus
      ticket_status: TicketStatus
      ticket_priority: TicketPriority
      campaign_platform: CampaignPlatform
      campaign_status: CampaignStatus
    }
  }
}

// Type helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
