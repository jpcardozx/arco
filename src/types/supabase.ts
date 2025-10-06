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
          {
            foreignKeyName: "agency_insights_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
          crux_data: Json | null
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
          crux_data?: Json | null
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
          crux_data?: Json | null
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
            foreignKeyName: "analytics_data_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
          {
            foreignKeyName: "campaign_metrics_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
            foreignKeyName: "campaigns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
      checklist_activity_logs: {
        Row: {
          action: string
          checklist_id: string
          created_at: string
          details: Json | null
          id: string
          item_id: string | null
          user_id: string
        }
        Insert: {
          action: string
          checklist_id: string
          created_at?: string
          details?: Json | null
          id?: string
          item_id?: string | null
          user_id: string
        }
        Update: {
          action?: string
          checklist_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          item_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_activity_logs_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "interactive_checklists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_activity_logs_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "checklist_items"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          action_required: string | null
          actual_minutes: number | null
          category: string
          checklist_id: string
          completed_at: string | null
          completed_by: string | null
          created_at: string
          description: string | null
          difficulty: string
          estimated_minutes: number | null
          evidence_url: string | null
          id: string
          is_completed: boolean
          notes: string | null
          priority: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          action_required?: string | null
          actual_minutes?: number | null
          category: string
          checklist_id: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_minutes?: number | null
          evidence_url?: string | null
          id?: string
          is_completed?: boolean
          notes?: string | null
          priority?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          action_required?: string | null
          actual_minutes?: number | null
          category?: string
          checklist_id?: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_minutes?: number | null
          evidence_url?: string | null
          id?: string
          is_completed?: boolean
          notes?: string | null
          priority?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "interactive_checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          company_size: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          industry: string | null
          last_contact_at: string | null
          lifetime_value: number | null
          monthly_value: number | null
          name: string
          notes: string | null
          onboarded_at: string | null
          phone: string | null
          postal_code: string | null
          state: string | null
          status: string | null
          tags: string[] | null
          tier: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          last_contact_at?: string | null
          lifetime_value?: number | null
          monthly_value?: number | null
          name: string
          notes?: string | null
          onboarded_at?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          status?: string | null
          tags?: string[] | null
          tier?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          last_contact_at?: string | null
          lifetime_value?: number | null
          monthly_value?: number | null
          name?: string
          notes?: string | null
          onboarded_at?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          status?: string | null
          tags?: string[] | null
          tier?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      cloud_files: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          download_count: number | null
          extension: string | null
          folder_path: string | null
          id: string
          is_public: boolean | null
          last_accessed_at: string | null
          mime_type: string
          name: string
          original_name: string
          path: string
          share_expires_at: string | null
          share_token: string | null
          size: number
          starred: boolean | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          download_count?: number | null
          extension?: string | null
          folder_path?: string | null
          id?: string
          is_public?: boolean | null
          last_accessed_at?: string | null
          mime_type: string
          name: string
          original_name: string
          path: string
          share_expires_at?: string | null
          share_token?: string | null
          size?: number
          starred?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          download_count?: number | null
          extension?: string | null
          folder_path?: string | null
          id?: string
          is_public?: boolean | null
          last_accessed_at?: string | null
          mime_type?: string
          name?: string
          original_name?: string
          path?: string
          share_expires_at?: string | null
          share_token?: string | null
          size?: number
          starred?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      commission_goals: {
        Row: {
          category: string | null
          created_at: string | null
          current_progress: number | null
          description: string | null
          id: string
          is_team_goal: boolean | null
          percentage_complete: number | null
          status: string
          target_amount: number
          target_date: string
          target_period: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          current_progress?: number | null
          description?: string | null
          id?: string
          is_team_goal?: boolean | null
          percentage_complete?: number | null
          status?: string
          target_amount: number
          target_date: string
          target_period?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          current_progress?: number | null
          description?: string | null
          id?: string
          is_team_goal?: boolean | null
          percentage_complete?: number | null
          status?: string
          target_amount?: number
          target_date?: string
          target_period?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      commissions: {
        Row: {
          agent_id: string
          amount: number
          base_amount: number
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          percentage: number
          status: string
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_id: string
          amount: number
          base_amount: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          percentage: number
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string
          amount?: number
          base_amount?: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          percentage?: number
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
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
      email_accounts: {
        Row: {
          access_token: string | null
          auto_sync: boolean | null
          created_at: string | null
          display_name: string | null
          email: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          provider: string
          refresh_token: string | null
          sync_frequency: number | null
          sync_status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          auto_sync?: boolean | null
          created_at?: string | null
          display_name?: string | null
          email: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          provider: string
          refresh_token?: string | null
          sync_frequency?: number | null
          sync_status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          auto_sync?: boolean | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          provider?: string
          refresh_token?: string | null
          sync_frequency?: number | null
          sync_status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      email_messages: {
        Row: {
          account_id: string
          attachments: Json | null
          bcc_emails: string[] | null
          body_html: string | null
          body_text: string | null
          cc_emails: string[] | null
          created_at: string | null
          external_id: string
          folder: string | null
          from_email: string
          from_name: string | null
          id: string
          is_draft: boolean | null
          is_read: boolean | null
          is_sent: boolean | null
          labels: string[] | null
          message_date: string
          subject: string
          thread_id: string | null
          to_emails: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          attachments?: Json | null
          bcc_emails?: string[] | null
          body_html?: string | null
          body_text?: string | null
          cc_emails?: string[] | null
          created_at?: string | null
          external_id: string
          folder?: string | null
          from_email: string
          from_name?: string | null
          id?: string
          is_draft?: boolean | null
          is_read?: boolean | null
          is_sent?: boolean | null
          labels?: string[] | null
          message_date: string
          subject?: string
          thread_id?: string | null
          to_emails?: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          attachments?: Json | null
          bcc_emails?: string[] | null
          body_html?: string | null
          body_text?: string | null
          cc_emails?: string[] | null
          created_at?: string | null
          external_id?: string
          folder?: string | null
          from_email?: string
          from_name?: string | null
          id?: string
          is_draft?: boolean | null
          is_read?: boolean | null
          is_sent?: boolean | null
          labels?: string[] | null
          message_date?: string
          subject?: string
          thread_id?: string | null
          to_emails?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_messages_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      file_shares: {
        Row: {
          access_count: number | null
          created_at: string | null
          expires_at: string | null
          file_id: string
          id: string
          last_accessed_at: string | null
          permission: string
          shared_with_email: string | null
          shared_with_user_id: string | null
          user_id: string
        }
        Insert: {
          access_count?: number | null
          created_at?: string | null
          expires_at?: string | null
          file_id: string
          id?: string
          last_accessed_at?: string | null
          permission?: string
          shared_with_email?: string | null
          shared_with_user_id?: string | null
          user_id: string
        }
        Update: {
          access_count?: number | null
          created_at?: string | null
          expires_at?: string | null
          file_id?: string
          id?: string
          last_accessed_at?: string | null
          permission?: string
          shared_with_email?: string | null
          shared_with_user_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_shares_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "cloud_files"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
          total_amount: number | null
          transaction_count: number | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          total_amount?: number | null
          transaction_count?: number | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          total_amount?: number | null
          transaction_count?: number | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "integrations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
            referencedColumns: ["id"]
          },
        ]
      }
      interactive_checklists: {
        Row: {
          actual_time_minutes: number | null
          checklist_type: string
          completed_at: string | null
          completed_items: number
          created_at: string
          data: Json
          description: string | null
          estimated_time_minutes: number | null
          id: string
          progress_percentage: number
          status: string
          tags: string[] | null
          title: string
          total_items: number
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_time_minutes?: number | null
          checklist_type?: string
          completed_at?: string | null
          completed_items?: number
          created_at?: string
          data?: Json
          description?: string | null
          estimated_time_minutes?: number | null
          id?: string
          progress_percentage?: number
          status?: string
          tags?: string[] | null
          title: string
          total_items?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_time_minutes?: number | null
          checklist_type?: string
          completed_at?: string | null
          completed_items?: number
          created_at?: string
          data?: Json
          description?: string | null
          estimated_time_minutes?: number | null
          id?: string
          progress_percentage?: number
          status?: string
          tags?: string[] | null
          title?: string
          total_items?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          due_date: string
          id: string
          invoice_number: string
          items: Json | null
          notes: string | null
          paid_at: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_reference_encrypted: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          due_date: string
          id?: string
          invoice_number: string
          items?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_reference_encrypted?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          items?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_reference_encrypted?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_interactions: {
        Row: {
          created_at: string | null
          date: string
          duration: number | null
          id: string
          lead_id: string
          metadata: Json | null
          next_action: string | null
          notes: string | null
          outcome: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          lead_id: string
          metadata?: Json | null
          next_action?: string | null
          notes?: string | null
          outcome?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          next_action?: string | null
          notes?: string | null
          outcome?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          analysis_id: string | null
          assigned_to: string | null
          budget: number | null
          company_name: string | null
          conversion_probability: number | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          notes: string | null
          phone: string | null
          priority: string | null
          score: number | null
          source: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          analysis_id?: string | null
          assigned_to?: string | null
          budget?: number | null
          company_name?: string | null
          conversion_probability?: number | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          priority?: string | null
          score?: number | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          analysis_id?: string | null
          assigned_to?: string | null
          budget?: number | null
          company_name?: string | null
          conversion_probability?: number | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          priority?: string | null
          score?: number | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
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
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
            foreignKeyName: "proposals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
      security_scans: {
        Row: {
          created_at: string | null
          id: string
          scan_type: string
          scanned_at: string | null
          security_headers: Json | null
          ssl_expires_at: string | null
          ssl_valid: boolean | null
          status: string
          url: string
          vulnerabilities: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          scan_type: string
          scanned_at?: string | null
          security_headers?: Json | null
          ssl_expires_at?: string | null
          ssl_valid?: boolean | null
          status: string
          url: string
          vulnerabilities?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          scan_type?: string
          scanned_at?: string | null
          security_headers?: Json | null
          ssl_expires_at?: string | null
          ssl_valid?: boolean | null
          status?: string
          url?: string
          vulnerabilities?: Json | null
        }
        Relationships: []
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
            foreignKeyName: "storage_items_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
          {
            foreignKeyName: "storage_items_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
            foreignKeyName: "support_ticket_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
            foreignKeyName: "support_tickets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
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
      tasks: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          attachments: Json | null
          category: string | null
          client_id: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          priority: string | null
          project_id: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          attachments?: Json | null
          category?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          attachments?: Json | null
          category?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
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
            foreignKeyName: "team_members_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "user_profiles_decrypted"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          attachments: Json | null
          category: string
          client_id: string | null
          created_at: string | null
          currency: string | null
          description: string
          id: string
          invoice_id: string | null
          notes: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_reference_encrypted: string | null
          project_id: string | null
          status: string
          tags: string[] | null
          transaction_date: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          attachments?: Json | null
          category: string
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          description: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_reference_encrypted?: string | null
          project_id?: string | null
          status?: string
          tags?: string[] | null
          transaction_date?: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          attachments?: Json | null
          category?: string
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_reference_encrypted?: string | null
          project_id?: string | null
          status?: string
          tags?: string[] | null
          transaction_date?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
          phone_encrypted: string | null
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
          phone_encrypted?: string | null
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
          phone_encrypted?: string | null
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
      whatsapp_contacts: {
        Row: {
          business_name: string | null
          created_at: string | null
          id: string
          is_business: boolean | null
          is_favorite: boolean | null
          last_message_at: string | null
          name: string
          notes: string | null
          phone_number: string
          profile_picture_url: string | null
          tags: string[] | null
          total_messages: number | null
          unread_count: number | null
          updated_at: string | null
          user_id: string
          whatsapp_status: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_business?: boolean | null
          is_favorite?: boolean | null
          last_message_at?: string | null
          name: string
          notes?: string | null
          phone_number: string
          profile_picture_url?: string | null
          tags?: string[] | null
          total_messages?: number | null
          unread_count?: number | null
          updated_at?: string | null
          user_id: string
          whatsapp_status?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_business?: boolean | null
          is_favorite?: boolean | null
          last_message_at?: string | null
          name?: string
          notes?: string | null
          phone_number?: string
          profile_picture_url?: string | null
          tags?: string[] | null
          total_messages?: number | null
          unread_count?: number | null
          updated_at?: string | null
          user_id?: string
          whatsapp_status?: string | null
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          contact_id: string
          content: string
          created_at: string | null
          delivered_at: string | null
          direction: string
          id: string
          media_type: string | null
          media_url: string | null
          message_type: string
          read_at: string | null
          reply_to_message_id: string | null
          sent_at: string | null
          status: string | null
          user_id: string
          whatsapp_message_id: string | null
        }
        Insert: {
          contact_id: string
          content: string
          created_at?: string | null
          delivered_at?: string | null
          direction: string
          id?: string
          media_type?: string | null
          media_url?: string | null
          message_type?: string
          read_at?: string | null
          reply_to_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          user_id: string
          whatsapp_message_id?: string | null
        }
        Update: {
          contact_id?: string
          content?: string
          created_at?: string | null
          delivered_at?: string | null
          direction?: string
          id?: string
          media_type?: string | null
          media_url?: string | null
          message_type?: string
          read_at?: string | null
          reply_to_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          user_id?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_reply_to_message_id_fkey"
            columns: ["reply_to_message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_messages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_profiles_decrypted: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          monthly_analysis_count: number | null
          monthly_support_tickets: number | null
          phone: string | null
          phone_decrypted: string | null
          storage_used_mb: number | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          tier: string | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          monthly_analysis_count?: number | null
          monthly_support_tickets?: number | null
          phone?: string | null
          phone_decrypted?: never
          storage_used_mb?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          tier?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          monthly_analysis_count?: number | null
          monthly_support_tickets?: number | null
          phone?: string | null
          phone_decrypted?: never
          storage_used_mb?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          tier?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      archive_old_analyses: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_domain_health: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_security: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_uptime: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_shares: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_old_audit_logs: {
        Args: { days_to_keep?: number }
        Returns: number
      }
      cleanup_old_audit_logs_v2: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_website_audit_checklist: {
        Args: { p_description?: string; p_title?: string; p_user_id: string }
        Returns: string
      }
      decrypt_sensitive: {
        Args: { encrypted_data: string }
        Returns: string
      }
      downgrade_to_free: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      encrypt_sensitive: {
        Args: { data: string }
        Returns: string
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
      get_checklist_stats: {
        Args: { p_checklist_id: string }
        Returns: Json
      }
      get_client_domain: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_client_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_client_metrics_enhanced: {
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
      get_email_summary: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_financial_summary: {
        Args: { p_period?: string; p_user_id: string }
        Returns: {
          net_profit: number
          pending_payments: number
          total_commissions: number
          total_expenses: number
          total_income: number
          transaction_count: number
        }[]
      }
      get_leads_stats: {
        Args: { p_user_id: string }
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
      get_user_storage_usage: {
        Args: { p_user_id: string }
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
      get_user_usage_stats: {
        Args: { p_user_id: string }
        Returns: {
          analyses_limit: number
          analyses_percentage: number
          analyses_used: number
          storage_limit_mb: number
          storage_percentage: number
          storage_used_mb: number
          tier: string
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
      reset_monthly_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      seed_default_financial_categories: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      trigger_domain_check: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      trigger_security_check: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      trigger_uptime_check: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      upgrade_to_paid: {
        Args: { p_user_id: string }
        Returns: undefined
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

