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
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          id: string
          name: string
          role: string
          is_admin: boolean
          signup_date: string
        }
        Insert: {
          avatar_url?: string | null
          email: string
          id: string
          name: string
          role?: string
          is_admin?: boolean
          signup_date?: string
        }
        Update: {
          avatar_url?: string | null
          email?: string
          id?: string
          name?: string
          role?: string
          is_admin?: boolean
          signup_date?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          location: string
          cuisine: string
          price_range: string
          images: string[] | null
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          location: string
          cuisine: string
          price_range: string
          images?: string[] | null
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          location?: string
          cuisine?: string
          price_range?: string
          images?: string[] | null
          is_approved?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reservations: {
        Row: {
          id: string
          user_id: string
          restaurant_id: string | null
          guest_count: number
          budget: string
          location: string
          event_type: string
          optional_dish: string | null
          optional_decoration: string | null
          booking_date: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          restaurant_id?: string | null
          guest_count: number
          budget: string
          location: string
          event_type: string
          optional_dish?: string | null
          optional_decoration?: string | null
          booking_date: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          restaurant_id?: string | null
          guest_count?: number
          budget?: string
          location?: string
          event_type?: string
          optional_dish?: string | null
          optional_decoration?: string | null
          booking_date?: string
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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