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
      drivers: {
        Row: {
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string
          license_expiry: string
          license_number: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          license_expiry: string
          license_number: string
          phone?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          license_expiry?: string
          license_number?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      location_history: {
        Row: {
          id: string
          latitude: number
          longitude: number
          timestamp: string
          vehicle_id: string
        }
        Insert: {
          id?: string
          latitude: number
          longitude: number
          timestamp?: string
          vehicle_id: string
        }
        Update: {
          id?: string
          latitude?: number
          longitude?: number
          timestamp?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_history_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      offices: {
        Row: {
          created_at: string
          id: string
          location: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      route_stops: {
        Row: {
          address: string
          arrival_time: string | null
          created_at: string
          departure_time: string | null
          id: string
          latitude: number | null
          longitude: number | null
          order_index: number
          route_id: string
          type: string
        }
        Insert: {
          address: string
          arrival_time?: string | null
          created_at?: string
          departure_time?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          order_index: number
          route_id: string
          type: string
        }
        Update: {
          address?: string
          arrival_time?: string | null
          created_at?: string
          departure_time?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          order_index?: number
          route_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          constraints: Json
          created_at: string
          date: string
          distance: number
          driver_id: string | null
          duration: number
          estimated_cost: number
          id: string
          name: string
          optimization_priority: string
          status: string
          time_window_end: string | null
          time_window_start: string | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          constraints?: Json
          created_at?: string
          date: string
          distance?: number
          driver_id?: string | null
          duration?: number
          estimated_cost?: number
          id?: string
          name: string
          optimization_priority: string
          status: string
          time_window_end?: string | null
          time_window_start?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          constraints?: Json
          created_at?: string
          date?: string
          distance?: number
          driver_id?: string | null
          duration?: number
          estimated_cost?: number
          id?: string
          name?: string
          optimization_priority?: string
          status?: string
          time_window_end?: string | null
          time_window_start?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          created_at: string
          distance: number | null
          driver_id: string
          end_location: string
          end_time: string | null
          id: string
          start_location: string
          start_time: string
          status: string
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          distance?: number | null
          driver_id: string
          end_location: string
          end_time?: string | null
          id?: string
          start_location: string
          start_time: string
          status: string
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          distance?: number | null
          driver_id?: string
          end_location?: string
          end_time?: string | null
          id?: string
          start_location?: string
          start_time?: string
          status?: string
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          office_id: string | null
          role: Database["public"]["Enums"]["tms_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          office_id?: string | null
          role: Database["public"]["Enums"]["tms_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          office_id?: string | null
          role?: Database["public"]["Enums"]["tms_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          capacity: number
          created_at: string
          current_load: number
          driver_id: string | null
          emissions: number
          id: string
          last_maintenance: string | null
          license_plate: string
          location: string | null
          name: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          capacity: number
          created_at?: string
          current_load?: number
          driver_id?: string | null
          emissions?: number
          id?: string
          last_maintenance?: string | null
          license_plate: string
          location?: string | null
          name: string
          status: string
          type: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          current_load?: number
          driver_id?: string | null
          emissions?: number
          id?: string
          last_maintenance?: string | null
          license_plate?: string
          location?: string | null
          name?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      get_user_office_id: {
        Args: {
          requested_role: Database["public"]["Enums"]["tms_role"]
        }
        Returns: string
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      has_any_role: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      has_role: {
        Args: {
          requested_role: Database["public"]["Enums"]["tms_role"]
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_appian_docs: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          url: string
          chunk_number: number
          title: string
          summary: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_site_pages: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          url: string
          chunk_number: number
          title: string
          summary: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      tms_role:
        | "administrator"
        | "dispatcher"
        | "planner"
        | "freight_manager"
        | "master_data_specialist"
        | "finance"
        | "customer_service"
        | "shipper"
        | "carrier"
        | "transportation_manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
