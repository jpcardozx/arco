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
      audit_log: {
        Row: {
          action: string
          changed_fields: string[] | null
          created_at: string
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          action: string
          changed_fields?: string[] | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          action?: string
          changed_fields?: string[] | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          assigned_to: string | null
          budget_max: number | null
          budget_min: number | null
          client_code: string
          company: string | null
          company_name: string | null
          created_at: string
          created_by: string
          department: string | null
          email: string
          id: string
          last_contact: string | null
          name: string
          next_follow_up: string | null
          notes: string | null
          phone: string | null
          priority: string
          project_budget: number | null
          property_type: string | null
          service_interest: string | null
          status: string
          transaction_type: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          assigned_to?: string | null
          budget_max?: number | null
          budget_min?: number | null
          client_code: string
          company?: string | null
          company_name?: string | null
          created_at?: string
          created_by: string
          department?: string | null
          email: string
          id?: string
          last_contact?: string | null
          name: string
          next_follow_up?: string | null
          notes?: string | null
          phone?: string | null
          priority?: string
          project_budget?: number | null
          property_type?: string | null
          service_interest?: string | null
          status?: string
          transaction_type?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          assigned_to?: string | null
          budget_max?: number | null
          budget_min?: number | null
          client_code?: string
          company?: string | null
          company_name?: string | null
          created_at?: string
          created_by?: string
          department?: string | null
          email?: string
          id?: string
          last_contact?: string | null
          name?: string
          next_follow_up?: string | null
          notes?: string | null
          phone?: string | null
          priority?: string
          project_budget?: number | null
          property_type?: string | null
          service_interest?: string | null
          status?: string
          transaction_type?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          budget_max: number | null
          budget_min: number | null
          created_at: string
          email: string
          id: string
          interest_type: string | null
          last_contact: string | null
          lead_score: number | null
          metadata: Json | null
          name: string | null
          next_follow_up: string | null
          notes: string | null
          phone: string | null
          preferred_location: string | null
          priority: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          email: string
          id?: string
          interest_type?: string | null
          last_contact?: string | null
          lead_score?: number | null
          metadata?: Json | null
          name?: string | null
          next_follow_up?: string | null
          notes?: string | null
          phone?: string | null
          preferred_location?: string | null
          priority?: string | null
          source: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          email?: string
          id?: string
          interest_type?: string | null
          last_contact?: string | null
          lead_score?: number | null
          metadata?: Json | null
          name?: string | null
          next_follow_up?: string | null
          notes?: string | null
          phone?: string | null
          preferred_location?: string | null
          priority?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          category: string | null
          client_id: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string
          end_time: string | null
          id: string
          priority: string
          property_id: string | null
          reminders: Json | null
          start_time: string | null
          status: string
          task_type: string | null
          title: string
          updated_at: string
          visibility: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          client_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date: string
          end_time?: string | null
          id?: string
          priority?: string
          property_id?: string | null
          reminders?: Json | null
          start_time?: string | null
          status?: string
          task_type?: string | null
          title: string
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string
          end_time?: string | null
          id?: string
          priority?: string
          property_id?: string | null
          reminders?: Json | null
          start_time?: string | null
          status?: string
          task_type?: string | null
          title?: string
          updated_at?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          email_notifications: boolean | null
          full_name: string | null
          id: string
          language: string | null
          last_seen_at: string | null
          phone: string | null
          role: string
          timezone: string | null
          updated_at: string
          whatsapp_notifications: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email_notifications?: boolean | null
          full_name?: string | null
          id: string
          language?: string | null
          last_seen_at?: string | null
          phone?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string
          whatsapp_notifications?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          language?: string | null
          last_seen_at?: string | null
          phone?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string
          whatsapp_notifications?: boolean | null
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

