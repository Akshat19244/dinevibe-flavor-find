export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          id: string
          registration_code: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          registration_code: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          registration_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      deal_claims: {
        Row: {
          claimed_at: string | null
          deal_id: string
          expiry_date: string | null
          id: string
          restaurant_id: string
          status: string
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          deal_id: string
          expiry_date?: string | null
          id?: string
          restaurant_id: string
          status?: string
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          deal_id?: string
          expiry_date?: string | null
          id?: string
          restaurant_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_claims_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contact_number: string | null
          email: string
          id: string
          is_admin: boolean | null
          name: string
          role: string
          signup_date: string
        }
        Insert: {
          avatar_url?: string | null
          contact_number?: string | null
          email: string
          id: string
          is_admin?: boolean | null
          name: string
          role?: string
          signup_date?: string
        }
        Update: {
          avatar_url?: string | null
          contact_number?: string | null
          email?: string
          id?: string
          is_admin?: boolean | null
          name?: string
          role?: string
          signup_date?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          booking_date: string
          budget: string
          created_at: string
          event_type: string
          guest_count: number
          id: string
          location: string
          optional_decoration: string | null
          optional_dish: string | null
          restaurant_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          booking_date: string
          budget: string
          created_at?: string
          event_type: string
          guest_count: number
          id?: string
          location: string
          optional_decoration?: string | null
          optional_dish?: string | null
          restaurant_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          budget?: string
          created_at?: string
          event_type?: string
          guest_count?: number
          id?: string
          location?: string
          optional_decoration?: string | null
          optional_dish?: string | null
          restaurant_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          created_at: string
          cuisine: string
          deals: Json | null
          description: string
          id: string
          images: string[] | null
          is_approved: boolean | null
          location: string
          manager_details: Json | null
          menu_images: string[] | null
          name: string
          owner_id: string
          price_range: string | null
          staff_size: number | null
        }
        Insert: {
          created_at?: string
          cuisine: string
          deals?: Json | null
          description: string
          id?: string
          images?: string[] | null
          is_approved?: boolean | null
          location: string
          manager_details?: Json | null
          menu_images?: string[] | null
          name: string
          owner_id: string
          price_range?: string | null
          staff_size?: number | null
        }
        Update: {
          created_at?: string
          cuisine?: string
          deals?: Json | null
          description?: string
          id?: string
          images?: string[] | null
          is_approved?: boolean | null
          location?: string
          manager_details?: Json | null
          menu_images?: string[] | null
          name?: string
          owner_id?: string
          price_range?: string | null
          staff_size?: number | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
