
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
