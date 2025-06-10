
// Script para executar o seed do banco de dados
import { seedDatabase } from './seed.ts';

console.log('🚀 Iniciando processo de seed...');
seedDatabase().then(() => {
  console.log('✅ Processo de seed concluído!');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Erro durante o seed:', error);
  process.exit(1);
});
