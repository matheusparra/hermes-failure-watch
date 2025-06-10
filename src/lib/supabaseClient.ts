
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jnaosnqzjgjtkrxizyrt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuYW9zbnF6amdqdGtyeGl6eXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTYwNzQsImV4cCI6MjA2NDYzMjA3NH0.MwfsUrzPfeASn_gnr4fAaQaK9wExNkovIVY6IYOYuxo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para verificar se a Supabase está configurada
export const isSupabaseConfigured = (): boolean => {
  return true; // Sempre true agora que está configurado
};

// Tipos para as tabelas
export interface Maquina {
  id: string;
  nome: string;
  localizacao: string;
  tipo_maquina: string;
  status_operacional: 'ativo' | 'inativo' | 'manutencao';
  created_at: string;
  updated_at: string;
}

export interface LeituraSensor {
  id: number;
  id_maquina: string;
  temperatura: number;
  umidade: number;
  vibracao_x: number;
  vibracao_y: number;
  vibracao_z: number;
  timestamp_leitura: string;
}

export interface Alerta {
  id: string;
  id_maquina: string;
  tipo_alerta: 'temperatura' | 'vibracao' | 'umidade' | 'sistema';
  severidade: 'info' | 'warning' | 'critical';
  titulo: string;
  descricao: string;
  valor_sensor?: number;
  threshold_valor?: number;
  resolvido: boolean;
  created_at: string;
  resolved_at?: string;
}

export interface ConfiguracaoLimite {
  id: string;
  id_maquina: string;
  tipo_sensor: 'temperatura' | 'vibracao' | 'umidade';
  limite_warning: number;
  limite_critical: number;
  unidade: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Manutencao {
  id: string;
  id_maquina: string;
  tipo_manutencao: 'preventiva' | 'corretiva' | 'preditiva';
  descricao: string;
  tecnico_responsavel?: string;
  data_inicio: string;
  data_fim?: string;
  custo?: number;
  status_manutencao: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  observacoes?: string;
  created_at: string;
}

// Tipos compatíveis com o dashboard existente
export interface EquipmentData {
  id: string;
  name: string;
  location: string;
  status: 'normal' | 'warning' | 'critical';
  sensors: {
    temperature: number;
    vibration: number;
    rpm: number;
    humidity: number;
  };
  lastReading: string;
}

export interface Alert {
  equipmentId: string;
  equipmentName: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  sensor: string;
  value: string;
  timestamp: string;
}
