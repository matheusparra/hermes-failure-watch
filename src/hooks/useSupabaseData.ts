
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, type EquipmentData, type Alert } from '../lib/supabaseClient';

// Função para calcular vibração média dos 3 eixos
const calculateAverageVibration = (x: number, y: number, z: number): number => {
  return Math.round((x + y + z) / 3);
};

// Função para simular RPM baseado na vibração (para manter compatibilidade com o dashboard)
const calculateRPM = (vibration: number): number => {
  // Mapear vibração (500-3500) para RPM (1500-2000)
  const minVib = 500, maxVib = 3500;
  const minRPM = 1500, maxRPM = 2000;
  
  const normalizedVib = Math.max(0, Math.min(1, (vibration - minVib) / (maxVib - minVib)));
  return Math.round(minRPM + normalizedVib * (maxRPM - minRPM));
};

// Função para determinar status do equipamento
const getEquipmentStatus = (temperatura: number, vibration: number): 'normal' | 'warning' | 'critical' => {
  if (temperatura > 95 || vibration > 3000) return 'critical';
  if (temperatura > 85 || vibration > 2500) return 'warning';
  return 'normal';
};

// Função para gerar alertas baseados nos dados dos sensores
const generateAlerts = (equipmentData: EquipmentData[]): Alert[] => {
  const alerts: Alert[] = [];

  equipmentData.forEach(equipment => {
    const timestamp = new Date().toLocaleString('pt-BR');

    // Verificar temperatura
    if (equipment.sensors.temperature > 95) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'critical',
        title: 'Temperatura Crítica Detectada',
        description: 'Temperatura acima do limite crítico. Risco de dano ao equipamento.',
        sensor: 'Temperatura',
        value: `${equipment.sensors.temperature.toFixed(1)}°C`,
        timestamp,
      });
    } else if (equipment.sensors.temperature > 85) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'warning',
        title: 'Temperatura Elevada',
        description: 'Temperatura acima do valor ideal. Monitoramento necessário.',
        sensor: 'Temperatura',
        value: `${equipment.sensors.temperature.toFixed(1)}°C`,
        timestamp,
      });
    }

    // Verificar vibração
    if (equipment.sensors.vibration > 3000) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'critical',
        title: 'Vibração Excessiva',
        description: 'Vibração crítica detectada. Possível desalinhamento ou desgaste.',
        sensor: 'Vibração',
        value: `${equipment.sensors.vibration} unidades`,
        timestamp,
      });
    } else if (equipment.sensors.vibration > 2500) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'warning',
        title: 'Vibração Anormal',
        description: 'Vibração acima do normal. Verificação recomendada.',
        sensor: 'Vibração',
        value: `${equipment.sensors.vibration} unidades`,
        timestamp,
      });
    }

    // Verificar RPM (simulado)
    if (equipment.sensors.rpm < 1600) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'warning',
        title: 'Rotação Baixa',
        description: 'Rotação abaixo do valor nominal. Verificar sistema de acionamento.',
        sensor: 'RPM',
        value: `${equipment.sensors.rpm} RPM`,
        timestamp,
      });
    } else if (equipment.sensors.rpm > 1950) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'warning',
        title: 'Rotação Elevada',
        description: 'Rotação acima do valor nominal. Verificar controle de velocidade.',
        sensor: 'RPM',
        value: `${equipment.sensors.rpm} RPM`,
        timestamp,
      });
    }
  });

  return alerts;
};

export const useSupabaseData = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Query para buscar os dados mais recentes de cada máquina
  const { data: equipmentData = [], isLoading, error, refetch } = useQuery({
    queryKey: ['equipment-data'],
    queryFn: async (): Promise<EquipmentData[]> => {
      // Buscar todas as máquinas
      const { data: maquinas, error: maquinasError } = await supabase
        .from('maquinas')
        .select('*');

      if (maquinasError) throw maquinasError;

      // Para cada máquina, buscar a leitura mais recente
      const equipmentPromises = maquinas.map(async (maquina) => {
        const { data: leitura, error: leituraError } = await supabase
          .from('leituras_sensores')
          .select('*')
          .eq('id_maquina', maquina.id)
          .order('timestamp_leitura', { ascending: false })
          .limit(1)
          .single();

        if (leituraError) {
          console.warn(`Nenhuma leitura encontrada para máquina ${maquina.nome}`);
          // Retornar dados padrão se não houver leitura
          return {
            id: maquina.id,
            name: maquina.nome,
            location: maquina.localizacao,
            status: 'normal' as const,
            sensors: {
              temperature: 0,
              vibration: 0,
              rpm: 0,
              humidity: 0,
            },
            lastReading: new Date().toISOString(),
          };
        }

        const vibration = calculateAverageVibration(
          leitura.vibracao_x,
          leitura.vibracao_y,
          leitura.vibracao_z
        );

        const rpm = calculateRPM(vibration);
        const status = getEquipmentStatus(leitura.temperatura, vibration);

        return {
          id: maquina.id,
          name: maquina.nome,
          location: maquina.localizacao,
          status,
          sensors: {
            temperature: leitura.temperatura,
            vibration,
            rpm,
            humidity: leitura.umidade,
          },
          lastReading: leitura.timestamp_leitura,
        };
      });

      return Promise.all(equipmentPromises);
    },
    refetchInterval: 3000, // Atualizar a cada 3 segundos
  });

  // Atualizar alertas sempre que os dados dos equipamentos mudarem
  useEffect(() => {
    if (equipmentData.length > 0) {
      const newAlerts = generateAlerts(equipmentData);
      setAlerts(newAlerts);
    }
  }, [equipmentData]);

  return {
    equipmentData,
    alerts,
    isLoading,
    error,
    refetch,
  };
};
