export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agency_insights: {
        Row: {
          client_id: string | null
          content: string | null
          created_at: string
          id: string
          is_published: boolean
          published_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_insights_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analysis_requests: {
        Row: {
          arco_index: number | null
          created_at: string
          error_message: string | null
          id: string
          status: string
          url: string
          user_id: string | null
        }
        Insert: {
          arco_index?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          status?: string
          url: string
          user_id?: string | null
        }
        Update: {
          arco_index?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          status?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analysis_results: {
        Row: {
          analysis_id: string
          cls: number | null
          created_at: string
          fid: number | null
          id: string
          lcp: number | null
          lighthouse_accessibility: number | null
          lighthouse_best_practices: number | null
          lighthouse_performance: number | null
          lighthouse_seo: number | null
          raw_data: Json | null
          security_score: number | null
        }
        Insert: {
          analysis_id: string
          cls?: number | null
          created_at?: string
          fid?: number | null
          id?: string
          lcp?: number | null
          lighthouse_accessibility?: number | null
          lighthouse_best_practices?: number | null
          lighthouse_performance?: number | null
          lighthouse_seo?: number | null
          raw_data?: Json | null
          security_score?: number | null
        }
        Update: {
          analysis_id?: string
          cls?: number | null
          created_at?: string
          fid?: number | null
          id?: string
          lcp?: number | null
          lighthouse_accessibility?: number | null
          lighthouse_best_practices?: number | null
          lighthouse_performance?: number | null
          lighthouse_seo?: number | null
          raw_data?: Json | null
          security_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_results_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "analysis_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_data: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          conversion_rate: number | null
          conversions: number | null
          created_at: string
          date: string
          direct_traffic: number | null
          entered_by: string | null
          id: string
          manually_entered: boolean
          organic_traffic: number | null
          pageviews: number | null
          paid_traffic: number | null
          project_id: string
          referral_traffic: number | null
          social_traffic: number | null
          unique_visitors: number | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string
          date: string
          direct_traffic?: number | null
          entered_by?: string | null
          id?: string
          manually_entered?: boolean
          organic_traffic?: number | null
          pageviews?: number | null
          paid_traffic?: number | null
          project_id: string
          referral_traffic?: number | null
          social_traffic?: number | null
          unique_visitors?: number | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string
          date?: string
          direct_traffic?: number | null
          entered_by?: string | null
          id?: string
          manually_entered?: boolean
          organic_traffic?: number | null
          pageviews?: number | null
          paid_traffic?: number | null
          project_id?: string
          referral_traffic?: number | null
          social_traffic?: number | null
          unique_visitors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_data_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_data_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_metrics: {
        Row: {
          campaign_id: string
          clicks: number | null
          conversions: number | null
          cost: number | null
          cpa: number | null
          cpc: number | null
          created_at: string
          ctr: number | null
          date: string
          entered_by: string | null
          id: string
          impressions: number | null
          manually_entered: boolean
          revenue: number | null
          roas: number | null
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          cpa?: number | null
          cpc?: number | null
          created_at?: string
          ctr?: number | null
          date: string
          entered_by?: string | null
          id?: string
          impressions?: number | null
          manually_entered?: boolean
          revenue?: number | null
          roas?: number | null
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          cpa?: number | null
          cpc?: number | null
          created_at?: string
          ctr?: number | null
          date?: string
          entered_by?: string | null
          id?: string
          impressions?: number | null
          manually_entered?: boolean
          revenue?: number | null
          roas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_metrics_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget_daily: number | null
          budget_total: number | null
          client_id: string
          created_at: string
          end_date: string | null
          external_campaign_id: string | null
          id: string
          name: string
          platform: string
          project_id: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget_daily?: number | null
          budget_total?: number | null
          client_id: string
          created_at?: string
          end_date?: string | null
          external_campaign_id?: string | null
          id?: string
          name: string
          platform: string
          project_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget_daily?: number | null
          budget_total?: number | null
          client_id?: string
          created_at?: string
          end_date?: string | null
          external_campaign_id?: string | null
          id?: string
          name?: string
          platform?: string
          project_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_monitoring: {
        Row: {
          blacklist_sources: string[] | null
          checked_at: string
          created_at: string
          dns_a_record: string | null
          dns_dkim_record: string | null
          dns_dmarc_record: string | null
          dns_mx_record: string | null
          dns_spf_record: string | null
          dns_status: string | null
          id: string
          is_blacklisted: boolean
          project_id: string
          ssl_expiry_date: string | null
          ssl_issuer: string | null
          ssl_status: string | null
          ssl_valid: boolean | null
        }
        Insert: {
          blacklist_sources?: string[] | null
          checked_at?: string
          created_at?: string
          dns_a_record?: string | null
          dns_dkim_record?: string | null
          dns_dmarc_record?: string | null
          dns_mx_record?: string | null
          dns_spf_record?: string | null
          dns_status?: string | null
          id?: string
          is_blacklisted?: boolean
          project_id: string
          ssl_expiry_date?: string | null
          ssl_issuer?: string | null
          ssl_status?: string | null
          ssl_valid?: boolean | null
        }
        Update: {
          blacklist_sources?: string[] | null
          checked_at?: string
          created_at?: string
          dns_a_record?: string | null
          dns_dkim_record?: string | null
          dns_dmarc_record?: string | null
          dns_mx_record?: string | null
          dns_spf_record?: string | null
          dns_status?: string | null
          id?: string
          is_blacklisted?: boolean
          project_id?: string
          ssl_expiry_date?: string | null
          ssl_issuer?: string | null
          ssl_status?: string | null
          ssl_valid?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_monitoring_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          activated_at: string | null
          client_id: string
          config_encrypted: Json | null
          created_at: string
          id: string
          integration_type: string
          last_sync_at: string | null
          last_sync_status: string | null
          provider: string
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          client_id: string
          config_encrypted?: Json | null
          created_at?: string
          id?: string
          integration_type: string
          last_sync_at?: string | null
          last_sync_status?: string | null
          provider: string
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          client_id?: string
          config_encrypted?: Json | null
          created_at?: string
          id?: string
          integration_type?: string
          last_sync_at?: string | null
          last_sync_status?: string | null
          provider?: string
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          analysis_id: string | null
          assigned_to: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          analysis_id?: string | null
          assigned_to?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          analysis_id?: string | null
          assigned_to?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "analysis_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          arco_index: number | null
          cls: number | null
          created_at: string
          date: string
          fid: number | null
          id: string
          lcp: number | null
          lighthouse_score: number | null
          project_id: string
        }
        Insert: {
          arco_index?: number | null
          cls?: number | null
          created_at?: string
          date: string
          fid?: number | null
          id?: string
          lcp?: number | null
          lighthouse_score?: number | null
          project_id: string
        }
        Update: {
          arco_index?: number | null
          cls?: number | null
          created_at?: string
          date?: string
          fid?: number | null
          id?: string
          lcp?: number | null
          lighthouse_score?: number | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      playbooks: {
        Row: {
          category: string
          content: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_milestones: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          order_index: number
          project_id: string
          title: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          order_index?: number
          project_id: string
          title: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          order_index?: number
          project_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_delivery: string | null
          client_id: string
          completion_percent: number | null
          created_at: string
          description: string | null
          domain: string | null
          estimated_delivery: string | null
          id: string
          name: string
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          actual_delivery?: string | null
          client_id: string
          completion_percent?: number | null
          created_at?: string
          description?: string | null
          domain?: string | null
          estimated_delivery?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          actual_delivery?: string | null
          client_id?: string
          completion_percent?: number | null
          created_at?: string
          description?: string | null
          domain?: string | null
          estimated_delivery?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          accepted_at: string | null
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          generated_content: string | null
          id: string
          lead_id: string | null
          proposed_tier: string | null
          proposed_value: number | null
          sent_at: string | null
          status: string
          title: string
          updated_at: string
          viewed_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          generated_content?: string | null
          id?: string
          lead_id?: string | null
          proposed_tier?: string | null
          proposed_value?: number | null
          sent_at?: string | null
          status?: string
          title: string
          updated_at?: string
          viewed_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          generated_content?: string | null
          id?: string
          lead_id?: string | null
          proposed_tier?: string | null
          proposed_value?: number | null
          sent_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_items: {
        Row: {
          bucket_name: string
          client_id: string
          created_at: string
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          mime_type: string | null
          project_id: string | null
          size_bytes: number
          uploaded_by: string | null
        }
        Insert: {
          bucket_name?: string
          client_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          mime_type?: string | null
          project_id?: string | null
          size_bytes: number
          uploaded_by?: string | null
        }
        Update: {
          bucket_name?: string
          client_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          mime_type?: string | null
          project_id?: string | null
          size_bytes?: number
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_items_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_items_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_messages: {
        Row: {
          attachments: string[] | null
          author_id: string
          created_at: string
          id: string
          message: string
          ticket_id: string
        }
        Insert: {
          attachments?: string[] | null
          author_id: string
          created_at?: string
          id?: string
          message: string
          ticket_id: string
        }
        Update: {
          attachments?: string[] | null
          author_id?: string
          created_at?: string
          id?: string
          message?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          client_id: string
          created_at: string
          description: string
          id: string
          priority: string
          project_id: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          client_id: string
          created_at?: string
          description: string
          id?: string
          priority?: string
          project_id?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          client_id?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string
          project_id?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          accepted_at: string | null
          can_create_tickets: boolean
          can_manage_billing: boolean
          can_manage_projects: boolean
          can_view_analytics: boolean
          can_view_campaigns: boolean
          client_id: string
          created_at: string
          id: string
          invited_at: string
          invited_by: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          can_create_tickets?: boolean
          can_manage_billing?: boolean
          can_manage_projects?: boolean
          can_view_analytics?: boolean
          can_view_campaigns?: boolean
          client_id: string
          created_at?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          can_create_tickets?: boolean
          can_manage_billing?: boolean
          can_manage_projects?: boolean
          can_view_analytics?: boolean
          can_view_campaigns?: boolean
          client_id?: string
          created_at?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      uptime_checks: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          is_up: boolean
          project_id: string
          response_time_ms: number | null
          status_code: number | null
          timestamp: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          is_up: boolean
          project_id: string
          response_time_ms?: number | null
          status_code?: number | null
          timestamp?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          is_up?: boolean
          project_id?: string
          response_time_ms?: number | null
          status_code?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "uptime_checks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          monthly_analysis_count: number | null
          monthly_support_tickets: number | null
          phone: string | null
          storage_used_mb: number | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          tier: string
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          monthly_analysis_count?: number | null
          monthly_support_tickets?: number | null
          phone?: string | null
          storage_used_mb?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          tier?: string
          updated_at?: string
          user_type?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          monthly_analysis_count?: number | null
          monthly_support_tickets?: number | null
          phone?: string | null
          storage_used_mb?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          tier?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_audit_logs: {
        Args: { days_to_keep?: number }
        Returns: number
      }
      get_admin_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_audit_log: {
        Args: {
          filter_action?: string
          filter_table?: string
          filter_user_id?: string
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          action: string
          changed_fields: string[]
          created_at: string
          id: string
          record_id: string
          table_name: string
          user_email: string
          user_role: string
        }[]
      }
      get_client_domain: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_client_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_client_timeline: {
        Args: { p_limit?: number }
        Returns: Json
      }
      get_conversion_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_monthly_revenue: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_recent_activity: {
        Args: { limit_count?: number }
        Returns: {
          activity_type: string
          created_at: string
          description: string
          user_email: string
        }[]
      }
      get_record_history: {
        Args: { p_record_id: string; p_table_name: string }
        Returns: {
          action: string
          changed_fields: string[]
          created_at: string
          id: string
          new_data: Json
          old_data: Json
          user_email: string
        }[]
      }
      get_storage_usage: {
        Args: { user_uuid: string }
        Returns: number
      }
      get_user_leads: {
        Args: { p_limit?: number }
        Returns: {
          client_company: string
          client_id: string
          client_name: string
          created_at: string
          email: string
          id: string
          metadata: Json
          name: string
          phone: string
          source: string
          status: string
          updated_at: string
        }[]
      }
      get_user_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_tasks: {
        Args: { p_date?: string }
        Returns: {
          category: string
          client_id: string
          client_name: string
          created_at: string
          description: string
          due_date: string
          end_time: string
          id: string
          priority: string
          start_time: string
          status: string
          title: string
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_paid_tier: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

