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
      performance_metrics: {
        Row: {
          id: string
          project_id: string
          date: string
          lcp: number | null
          fid: number | null
          cls: number | null
          lighthouse_score: number | null
          arco_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          date: string
          lcp?: number | null
          fid?: number | null
          cls?: number | null
          lighthouse_score?: number | null
          arco_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          date?: string
          lcp?: number | null
          fid?: number | null
          cls?: number | null
          lighthouse_score?: number | null
          arco_index?: number | null
          created_at?: string
        }
      }
      project_milestones: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      uptime_checks: {
        Row: {
          id: string
          project_id: string
          timestamp: string
          status_code: number | null
          response_time_ms: number | null
          is_up: boolean
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          timestamp?: string
          status_code?: number | null
          response_time_ms?: number | null
          is_up: boolean
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          timestamp?: string
          status_code?: number | null
          response_time_ms?: number | null
          is_up?: boolean
          error_message?: string | null
          created_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          client_id: string
          project_id: string | null
          name: string
          platform: CampaignPlatform
          external_campaign_id: string | null
          budget_total: number | null
          budget_daily: number | null
          status: CampaignStatus
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_id?: string | null
          name: string
          platform: CampaignPlatform
          external_campaign_id?: string | null
          budget_total?: number | null
          budget_daily?: number | null
          status?: CampaignStatus
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          project_id?: string | null
          name?: string
          platform?: CampaignPlatform
          external_campaign_id?: string | null
          budget_total?: number | null
          budget_daily?: number | null
          status?: CampaignStatus
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaign_metrics: {
        Row: {
          id: string
          campaign_id: string
          date: string
          impressions: number
          clicks: number
          conversions: number
          cost: number
          revenue: number | null
          ctr: number | null
          cpc: number | null
          cpa: number | null
          roas: number | null
          manually_entered: boolean
          entered_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          date: string
          impressions?: number
          clicks?: number
          conversions?: number
          cost?: number
          revenue?: number | null
          ctr?: number | null
          cpc?: number | null
          cpa?: number | null
          roas?: number | null
          manually_entered?: boolean
          entered_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          date?: string
          impressions?: number
          clicks?: number
          conversions?: number
          cost?: number
          revenue?: number | null
          ctr?: number | null
          cpc?: number | null
          cpa?: number | null
          roas?: number | null
          manually_entered?: boolean
          entered_by?: string | null
          created_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          status: TicketStatus
          priority: TicketPriority
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          status?: TicketStatus
          priority?: TicketPriority
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          status?: TicketStatus
          priority?: TicketPriority
          created_at?: string
          updated_at?: string
        }
      }
      support_ticket_messages: {
        Row: {
          id: string
          ticket_id: string
          sender_id: string
          content: string
          is_internal: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          sender_id: string
          content: string
          is_internal?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          sender_id?: string
          content?: string
          is_internal?: boolean
          created_at?: string
        }
      }
      storage_items: {
        Row: {
          id: string
          client_id: string
          project_id: string | null
          file_name: string
          file_path: string
          file_type: string | null
          mime_type: string | null
          size_bytes: number
          bucket_name: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_id?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          mime_type?: string | null
          size_bytes: number
          bucket_name?: string
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          project_id?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          mime_type?: string | null
          size_bytes?: number
          bucket_name?: string
          uploaded_by?: string | null
          created_at?: string
        }
      }
      playbooks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          priority: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          priority?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          priority?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      agency_insights: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          description: string
          priority: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          description: string
          priority?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          description?: string
          priority?: string
          created_at?: string
        }
      }
      domain_monitoring: {
        Row: {
          id: string
          project_id: string
          ssl_expires_at: string | null
          ssl_valid: boolean
          dns_valid: boolean
          blacklist_status: string | null
          last_checked: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          ssl_expires_at?: string | null
          ssl_valid?: boolean
          dns_valid?: boolean
          blacklist_status?: string | null
          last_checked?: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          ssl_expires_at?: string | null
          ssl_valid?: boolean
          dns_valid?: boolean
          blacklist_status?: string | null
          last_checked?: string
          created_at?: string
        }
      }
      security_scans: {
        Row: {
          id: string
          project_id: string
          scan_type: string
          vulnerabilities_found: number
          severity_high: number
          severity_medium: number
          severity_low: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          scan_type: string
          vulnerabilities_found?: number
          severity_high?: number
          severity_medium?: number
          severity_low?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          scan_type?: string
          vulnerabilities_found?: number
          severity_high?: number
          severity_medium?: number
          severity_low?: number
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          source: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          source?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          source?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          role: string
          full_name: string | null
          avatar_url: string | null
          company: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: string
          full_name?: string | null
          avatar_url?: string | null
          company?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: string
          full_name?: string | null
          avatar_url?: string | null
          company?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          status: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          status?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          status?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          priority: string | null
          due_date: string | null
          assigned_to: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          priority?: string | null
          due_date?: string | null
          assigned_to?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          priority?: string | null
          due_date?: string | null
          assigned_to?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string | null
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          created_at?: string
        }
      }
      interactive_checklists: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string | null
          is_template: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category?: string | null
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string | null
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      checklist_items: {
        Row: {
          id: string
          checklist_id: string
          title: string
          description: string | null
          order_index: number
          is_completed: boolean
          completed_at: string | null
          completed_by: string | null
          category: string | null
          priority: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          checklist_id: string
          title: string
          description?: string | null
          order_index: number
          is_completed?: boolean
          completed_at?: string | null
          completed_by?: string | null
          category?: string | null
          priority?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          checklist_id?: string
          title?: string
          description?: string | null
          order_index?: number
          is_completed?: boolean
          completed_at?: string | null
          completed_by?: string | null
          category?: string | null
          priority?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cloud_files: {
        Row: {
          id: string
          user_id: string
          name: string
          path: string
          size: number
          mime_type: string | null
          starred: boolean
          download_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          path: string
          size: number
          mime_type?: string | null
          starred?: boolean
          download_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          path?: string
          size?: number
          mime_type?: string | null
          starred?: boolean
          download_count?: number
          created_at?: string
          updated_at?: string
        }
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
