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
          admin_count: number | null
          id: string
          registration_code: string
          updated_at: string | null
        }
        Insert: {
          admin_count?: number | null
          id?: string
          registration_code: string
          updated_at?: string | null
        }
        Update: {
          admin_count?: number | null
          id?: string
          registration_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_token: string
          booking_type: string
          budget_max: number | null
          budget_min: number | null
          created_at: string
          date_time: string
          dining_type: string | null
          guest_count: number
          guest_list: string | null
          id: string
          menu_preference: string | null
          special_requests: string | null
          status: string | null
          updated_at: string
          user_id: string
          venue_id: string
        }
        Insert: {
          booking_token: string
          booking_type: string
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          date_time: string
          dining_type?: string | null
          guest_count: number
          guest_list?: string | null
          id?: string
          menu_preference?: string | null
          special_requests?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          venue_id: string
        }
        Update: {
          booking_token?: string
          booking_type?: string
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          date_time?: string
          dining_type?: string | null
          guest_count?: number
          guest_list?: string | null
          id?: string
          menu_preference?: string | null
          special_requests?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          booking_id: string | null
          created_at: string
          customer_id: string
          id: string
          owner_id: string
          status: string
          updated_at: string
          venue_name: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          customer_id: string
          id?: string
          owner_id: string
          status?: string
          updated_at?: string
          venue_name?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          customer_id?: string
          id?: string
          owner_id?: string
          status?: string
          updated_at?: string
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          sender_id: string
          sender_type: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          sender_id: string
          sender_type: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_id: string
          author_type: string
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          is_approved: boolean | null
          likes_count: number | null
          location: string | null
          post_type: string
          tags: string[] | null
          title: string
          updated_at: string
          venue_id: string | null
        }
        Insert: {
          author_id: string
          author_type: string
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          likes_count?: number | null
          location?: string | null
          post_type: string
          tags?: string[] | null
          title: string
          updated_at?: string
          venue_id?: string | null
        }
        Update: {
          author_id?: string
          author_type?: string
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          likes_count?: number | null
          location?: string | null
          post_type?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
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
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
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
      query_requests: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          created_at: string
          customer_id: string
          event_date: string
          event_time: string | null
          event_type: string
          guest_count: number
          id: string
          location: string
          query_token: string
          response_deadline: string | null
          special_requirements: string | null
          status: string
          updated_at: string
          vendor_response: string | null
          vendor_response_at: string | null
          venue_id: string | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          customer_id: string
          event_date: string
          event_time?: string | null
          event_type: string
          guest_count: number
          id?: string
          location: string
          query_token: string
          response_deadline?: string | null
          special_requirements?: string | null
          status?: string
          updated_at?: string
          vendor_response?: string | null
          vendor_response_at?: string | null
          venue_id?: string | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          customer_id?: string
          event_date?: string
          event_time?: string | null
          event_type?: string
          guest_count?: number
          id?: string
          location?: string
          query_token?: string
          response_deadline?: string | null
          special_requirements?: string | null
          status?: string
          updated_at?: string
          vendor_response?: string | null
          vendor_response_at?: string | null
          venue_id?: string | null
        }
        Relationships: []
      }
      query_responses: {
        Row: {
          availability_confirmed: boolean | null
          created_at: string
          id: string
          message: string | null
          query_id: string
          quoted_price: number | null
          response_type: string
          terms_conditions: string | null
          vendor_id: string
        }
        Insert: {
          availability_confirmed?: boolean | null
          created_at?: string
          id?: string
          message?: string | null
          query_id: string
          quoted_price?: number | null
          response_type: string
          terms_conditions?: string | null
          vendor_id: string
        }
        Update: {
          availability_confirmed?: boolean | null
          created_at?: string
          id?: string
          message?: string | null
          query_id?: string
          quoted_price?: number | null
          response_type?: string
          terms_conditions?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "query_responses_query_id_fkey"
            columns: ["query_id"]
            isOneToOne: false
            referencedRelation: "query_requests"
            referencedColumns: ["id"]
          },
        ]
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
          budget_range: Json | null
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
          offers_decoration: boolean | null
          owner_id: string
          price_range: string | null
          seating_capacity: number | null
          staff_size: number | null
        }
        Insert: {
          budget_range?: Json | null
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
          offers_decoration?: boolean | null
          owner_id: string
          price_range?: string | null
          seating_capacity?: number | null
          staff_size?: number | null
        }
        Update: {
          budget_range?: Json | null
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
          offers_decoration?: boolean | null
          owner_id?: string
          price_range?: string | null
          seating_capacity?: number | null
          staff_size?: number | null
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          admin_response: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      venue_availability: {
        Row: {
          booking_id: string | null
          created_at: string
          date: string
          id: string
          is_available: boolean | null
          time_slot: string
          venue_id: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          date: string
          id?: string
          is_available?: boolean | null
          time_slot: string
          venue_id: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          date?: string
          id?: string
          is_available?: boolean | null
          time_slot?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_availability_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_availability_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string | null
          ambience_type: string[] | null
          auto_approved: boolean | null
          banquet_images: string[] | null
          created_at: string
          email: string | null
          google_review_url: string | null
          guest_capacity: number | null
          has_360_preview: boolean | null
          id: string
          is_approved: boolean | null
          latitude: number | null
          longitude: number | null
          menu_images: string[] | null
          name: string
          owner_id: string
          phone: string | null
          price_range_max: number | null
          price_range_min: number | null
          rating: number | null
          services: string[] | null
          type: string
          updated_at: string
          venue_images: string[] | null
        }
        Insert: {
          address?: string | null
          ambience_type?: string[] | null
          auto_approved?: boolean | null
          banquet_images?: string[] | null
          created_at?: string
          email?: string | null
          google_review_url?: string | null
          guest_capacity?: number | null
          has_360_preview?: boolean | null
          id?: string
          is_approved?: boolean | null
          latitude?: number | null
          longitude?: number | null
          menu_images?: string[] | null
          name: string
          owner_id: string
          phone?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          services?: string[] | null
          type: string
          updated_at?: string
          venue_images?: string[] | null
        }
        Update: {
          address?: string | null
          ambience_type?: string[] | null
          auto_approved?: boolean | null
          banquet_images?: string[] | null
          created_at?: string
          email?: string | null
          google_review_url?: string | null
          guest_capacity?: number | null
          has_360_preview?: boolean | null
          id?: string
          is_approved?: boolean | null
          latitude?: number | null
          longitude?: number | null
          menu_images?: string[] | null
          name?: string
          owner_id?: string
          phone?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          services?: string[] | null
          type?: string
          updated_at?: string
          venue_images?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_query_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_unread_message_count: {
        Args: { user_uuid: string }
        Returns: number
      }
      increment_admin_count: {
        Args: Record<PropertyKey, never>
        Returns: number
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
