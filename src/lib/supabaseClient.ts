
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Para desenvolvimento no Lovable, usar valores temporários se as variáveis não estiverem definidas
const defaultUrl = supabaseUrl || 'https://placeholder.supabase.co';
const defaultKey = supabaseAnonKey || 'placeholder-key';

// Só criar o cliente se tivermos valores reais
export const supabase = createClient(defaultUrl, defaultKey);

// Função para verificar se a Supabase está configurada
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'https://placeholder.supabase.co' && 
           supabaseAnonKey !== 'placeholder-key');
};

// Tipos para as tabelas
export interface Maquina {
  id: string;
  nome: string;
  localizacao: string;
  created_at: string;
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
