
import { supabase } from '../src/lib/supabaseClient';

const maquinas = [
  {
    nome: 'Prensa Hidráulica 01',
    localizacao: 'Setor de Prensagem'
  },
  {
    nome: 'Motor CNC 05',
    localizacao: 'Oficina de Usinagem'
  },
  {
    nome: 'Esteira Rolante Central',
    localizacao: 'Linha de Montagem'
  }
];

// Função para gerar valor aleatório entre min e max
const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Função para gerar leituras com anomalias para a Prensa Hidráulica
const generateReading = (maquinaId: string, timestamp: Date, isPrensaHidraulica: boolean, isRecentAnomaly: boolean) => {
  let temperatura = randomBetween(50, 85);
  let vibracao_x = Math.floor(randomBetween(500, 2500));
  let vibracao_y = Math.floor(randomBetween(500, 2500));
  let vibracao_z = Math.floor(randomBetween(500, 2500));

  // Simular anomalias na Prensa Hidráulica nas últimas 3 horas
  if (isPrensaHidraulica && isRecentAnomaly && Math.random() < 0.3) {
    temperatura = randomBetween(95, 110); // Temperatura crítica
    vibracao_x = Math.floor(randomBetween(3000, 3500)); // Vibração crítica
    vibracao_y = Math.floor(randomBetween(3000, 3500));
    vibracao_z = Math.floor(randomBetween(3000, 3500));
  }

  return {
    id_maquina: maquinaId,
    temperatura,
    umidade: randomBetween(30, 70),
    vibracao_x,
    vibracao_y,
    vibracao_z,
    timestamp_leitura: timestamp.toISOString()
  };
};

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // 1. Criar máquinas
    console.log('📊 Inserindo máquinas...');
    const { data: maquinasData, error: maquinasError } = await supabase
      .from('maquinas')
      .insert(maquinas)
      .select();

    if (maquinasError) {
      throw maquinasError;
    }

    console.log(`✅ ${maquinasData.length} máquinas inseridas com sucesso!`);

    // 2. Gerar leituras históricas
    console.log('📈 Gerando leituras históricas...');
    
    const now = new Date();
    const readings = [];

    for (const maquina of maquinasData) {
      const isPrensaHidraulica = maquina.nome === 'Prensa Hidráulica 01';
      
      // Gerar dados das últimas 24 horas (a cada 10 minutos = 144 leituras por máquina)
      for (let i = 144; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 10 * 60 * 1000);
        const isRecentAnomaly = i <= 18; // Últimas 3 horas (18 * 10 min = 180 min = 3h)
        
        readings.push(generateReading(maquina.id, timestamp, isPrensaHidraulica, isRecentAnomaly));
      }
    }

    // Inserir leituras em lotes para otimização
    const batchSize = 1000;
    for (let i = 0; i < readings.length; i += batchSize) {
      const batch = readings.slice(i, i + batchSize);
      const { error: readingsError } = await supabase
        .from('leituras_sensores')
        .insert(batch);

      if (readingsError) {
        throw readingsError;
      }

      console.log(`✅ Inserido lote ${Math.floor(i / batchSize) + 1} de leituras...`);
    }

    console.log(`🎉 Seed concluído! ${readings.length} leituras inseridas para ${maquinasData.length} máquinas.`);
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  }
}

// Executar apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export { seedDatabase };
