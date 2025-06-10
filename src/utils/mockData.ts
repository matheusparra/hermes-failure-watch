
// Utilitário para gerar dados simulados de sensores
export const generateMockData = () => {
  const equipments = [
    {
      id: 'eq001',
      name: 'Equipamento 1',
      location: 'Linha de Produção A',
      status: 'normal',
      sensors: {
        temperature: Math.round(Math.random() * 30 + 60), // 60-90°C
        vibration: Math.round(Math.random() * 20 + 10), // 10-30 Hz
        rpm: Math.round(Math.random() * 400 + 1600), // 1600-2000 RPM
      }
    },
    {
      id: 'eq002',
      name: 'Equipamento 2',
      location: 'Linha de Produção B',
      status: 'normal',
      sensors: {
        temperature: Math.round(Math.random() * 25 + 65), // 65-90°C
        vibration: Math.round(Math.random() * 15 + 12), // 12-27 Hz
        rpm: Math.round(Math.random() * 300 + 1700), // 1700-2000 RPM
      }
    },
    {
      id: 'eq003',
      name: 'Equipamento 3',
      location: 'Linha de Produção C',
      status: 'normal',
      sensors: {
        temperature: Math.round(Math.random() * 35 + 70), // 70-105°C
        vibration: Math.round(Math.random() * 25 + 15), // 15-40 Hz
        rpm: Math.round(Math.random() * 500 + 1500), // 1500-2000 RPM
      }
    }
  ];

  // Simular algumas condições de alerta
  equipments.forEach(equipment => {
    if (equipment.sensors.temperature > 95) {
      equipment.status = 'critical';
    } else if (equipment.sensors.temperature > 85) {
      equipment.status = 'warning';
    }

    if (equipment.sensors.vibration > 35) {
      equipment.status = 'critical';
    } else if (equipment.sensors.vibration > 25) {
      equipment.status = 'warning';
    }

    if (equipment.sensors.rpm < 1600 || equipment.sensors.rpm > 1950) {
      if (equipment.status === 'normal') equipment.status = 'warning';
    }
  });

  return equipments;
};

// Função para verificar e gerar alertas baseados nos dados dos sensores
export const checkForAlerts = (equipmentData: any[]) => {
  const alerts: any[] = [];

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
        value: `${equipment.sensors.temperature}°C`,
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
        value: `${equipment.sensors.temperature}°C`,
        timestamp,
      });
    }

    // Verificar vibração
    if (equipment.sensors.vibration > 35) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'critical',
        title: 'Vibração Excessiva',
        description: 'Vibração crítica detectada. Possível desalinhamento ou desgaste.',
        sensor: 'Vibração',
        value: `${equipment.sensors.vibration} Hz`,
        timestamp,
      });
    } else if (equipment.sensors.vibration > 25) {
      alerts.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        severity: 'warning',
        title: 'Vibração Anormal',
        description: 'Vibração acima do normal. Verificação recomendada.',
        sensor: 'Vibração',
        value: `${equipment.sensors.vibration} Hz`,
        timestamp,
      });
    }

    // Verificar RPM
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
