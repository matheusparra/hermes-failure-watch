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
      alertas: {
        Row: {
          created_at: string | null
          descricao: string
          id: string
          id_maquina: string
          resolved_at: string | null
          resolvido: boolean | null
          severidade: string
          threshold_valor: number | null
          tipo_alerta: string
          titulo: string
          valor_sensor: number | null
        }
        Insert: {
          created_at?: string | null
          descricao: string
          id?: string
          id_maquina: string
          resolved_at?: string | null
          resolvido?: boolean | null
          severidade: string
          threshold_valor?: number | null
          tipo_alerta: string
          titulo: string
          valor_sensor?: number | null
        }
        Update: {
          created_at?: string | null
          descricao?: string
          id?: string
          id_maquina?: string
          resolved_at?: string | null
          resolvido?: boolean | null
          severidade?: string
          threshold_valor?: number | null
          tipo_alerta?: string
          titulo?: string
          valor_sensor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alertas_id_maquina_fkey"
            columns: ["id_maquina"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_limites: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          id: string
          id_maquina: string
          limite_critical: number
          limite_warning: number
          tipo_sensor: string
          unidade: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          id_maquina: string
          limite_critical: number
          limite_warning: number
          tipo_sensor: string
          unidade: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          id_maquina?: string
          limite_critical?: number
          limite_warning?: number
          tipo_sensor?: string
          unidade?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_limites_id_maquina_fkey"
            columns: ["id_maquina"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      flood_data: {
        Row: {
          chuva_1h: number
          chuva_24h: number
          chuva_6h: number
          created_at: string
          id: string
          nivel_rio: number
          risco_enchente: number
          tendencia_rio: number
          umidade: number
          updated_at: string
          vento: number
        }
        Insert: {
          chuva_1h: number
          chuva_24h: number
          chuva_6h: number
          created_at?: string
          id?: string
          nivel_rio: number
          risco_enchente: number
          tendencia_rio: number
          umidade: number
          updated_at?: string
          vento: number
        }
        Update: {
          chuva_1h?: number
          chuva_24h?: number
          chuva_6h?: number
          created_at?: string
          id?: string
          nivel_rio?: number
          risco_enchente?: number
          tendencia_rio?: number
          umidade?: number
          updated_at?: string
          vento?: number
        }
        Relationships: []
      }
      leituras_sensores: {
        Row: {
          id: number
          id_maquina: string
          temperatura: number
          timestamp_leitura: string | null
          umidade: number
          vibracao_x: number
          vibracao_y: number
          vibracao_z: number
        }
        Insert: {
          id?: number
          id_maquina: string
          temperatura: number
          timestamp_leitura?: string | null
          umidade: number
          vibracao_x: number
          vibracao_y: number
          vibracao_z: number
        }
        Update: {
          id?: number
          id_maquina?: string
          temperatura?: number
          timestamp_leitura?: string | null
          umidade?: number
          vibracao_x?: number
          vibracao_y?: number
          vibracao_z?: number
        }
        Relationships: [
          {
            foreignKeyName: "leituras_sensores_id_maquina_fkey"
            columns: ["id_maquina"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      manutencoes: {
        Row: {
          created_at: string | null
          custo: number | null
          data_fim: string | null
          data_inicio: string
          descricao: string
          id: string
          id_maquina: string
          observacoes: string | null
          status_manutencao: string
          tecnico_responsavel: string | null
          tipo_manutencao: string
        }
        Insert: {
          created_at?: string | null
          custo?: number | null
          data_fim?: string | null
          data_inicio: string
          descricao: string
          id?: string
          id_maquina: string
          observacoes?: string | null
          status_manutencao?: string
          tecnico_responsavel?: string | null
          tipo_manutencao: string
        }
        Update: {
          created_at?: string | null
          custo?: number | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string
          id?: string
          id_maquina?: string
          observacoes?: string | null
          status_manutencao?: string
          tecnico_responsavel?: string | null
          tipo_manutencao?: string
        }
        Relationships: [
          {
            foreignKeyName: "manutencoes_id_maquina_fkey"
            columns: ["id_maquina"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquinas: {
        Row: {
          created_at: string | null
          id: string
          localizacao: string
          nome: string
          status_operacional: string
          tipo_maquina: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          localizacao: string
          nome: string
          status_operacional?: string
          tipo_maquina?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          localizacao?: string
          nome?: string
          status_operacional?: string
          tipo_maquina?: string
          updated_at?: string | null
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
