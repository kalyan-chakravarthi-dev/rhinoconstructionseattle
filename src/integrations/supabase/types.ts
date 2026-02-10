export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          full_name: string
          heard_from: string | null
          id: string
          message: string
          phone: string
          service: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          heard_from?: string | null
          id?: string
          message: string
          phone: string
          service?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          heard_from?: string | null
          id?: string
          message?: string
          phone?: string
          service?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          id: string
          drive_file_id: string
          drive_file_name: string
          drive_modified_time: string | null
          category: string
          category_display_name: string
          storage_path: string
          storage_url: string
          thumbnail_path: string | null
          thumbnail_url: string | null
          title: string | null
          description: string | null
          width: number | null
          height: number | null
          file_size_bytes: number | null
          mime_type: string | null
          published: boolean
          featured: boolean
          social_posted_at: Json | null
          synced_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          drive_file_id: string
          drive_file_name: string
          drive_modified_time?: string | null
          category: string
          category_display_name: string
          storage_path: string
          storage_url: string
          thumbnail_path?: string | null
          thumbnail_url?: string | null
          title?: string | null
          description?: string | null
          width?: number | null
          height?: number | null
          file_size_bytes?: number | null
          mime_type?: string | null
          published?: boolean
          featured?: boolean
          social_posted_at?: Json | null
          synced_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          drive_file_id?: string
          drive_file_name?: string
          drive_modified_time?: string | null
          category?: string
          category_display_name?: string
          storage_path?: string
          storage_url?: string
          thumbnail_path?: string | null
          thumbnail_url?: string | null
          title?: string | null
          description?: string | null
          width?: number | null
          height?: number | null
          file_size_bytes?: number | null
          mime_type?: string | null
          published?: boolean
          featured?: boolean
          social_posted_at?: Json | null
          synced_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          created_at: string
          customer_name: string
          email: string
          id: string
          message: string | null
          phone: string | null
          property_city: string | null
          property_state: string | null
          service_requested: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
          property_city?: string | null
          property_state?: string | null
          service_requested: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
          property_city?: string | null
          property_state?: string | null
          service_requested?: string
        }
        Relationships: []
      }
      sync_log: {
        Row: {
          id: string
          sync_type: string
          started_at: string
          completed_at: string | null
          status: string
          files_found: number | null
          files_synced: number | null
          files_skipped: number | null
          files_errored: number | null
          error_details: Json | null
        }
        Insert: {
          id?: string
          sync_type?: string
          started_at?: string
          completed_at?: string | null
          status?: string
          files_found?: number | null
          files_synced?: number | null
          files_skipped?: number | null
          files_errored?: number | null
          error_details?: Json | null
        }
        Update: {
          id?: string
          sync_type?: string
          started_at?: string
          completed_at?: string | null
          status?: string
          files_found?: number | null
          files_synced?: number | null
          files_skipped?: number | null
          files_errored?: number | null
          error_details?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
