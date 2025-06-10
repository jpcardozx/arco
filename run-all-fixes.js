// Script principal para executar todas as correções de ESLint
const { execSync } = require('child_process');

console.log('🚀 Iniciando processo completo de correção de erros ESLint');

try {
  // 1. Configurar ESLint e corrigir problemas gerais
  console.log('\n🔧 Etapa 1: Configuração do ESLint e correções gerais');
  execSync('node fix-eslint-advanced.js', { stdio: 'inherit' });
  
  // 2. Corrigir problemas específicos de React Hooks
  console.log('\n🔧 Etapa 2: Correção de problemas de React Hooks');
  execSync('node fix-react-hooks.js', { stdio: 'inherit' });
  
  // 3. Remover imports não utilizados
  console.log('\n🔧 Etapa 3: Remoção de imports não utilizados');
  execSync('node fix-unused-imports.js', { stdio: 'inherit' });
  
  // 4. Executar ESLint novamente para verificar os erros restantes
  console.log('\n📊 Relatório final de erros ESLint:');
  execSync('npx eslint . --max-warnings=0', { stdio: 'inherit' });
  
  console.log('\n✅ Todas as correções foram aplicadas com sucesso!');
} catch (error) {
  console.error('\n⚠️ O processo de correção foi concluído, mas alguns erros persistem. Verifique o relatório acima para detalhes.');
  
  // Exibir estatísticas de erros restantes
  try {
    console.log('\n📊 Estatísticas de erros restantes:');
    execSync('npx eslint . --format=stylish --quiet', { stdio: 'inherit' });
  } catch (err) {
    // Erro esperado se ainda existirem problemas
  }
  
  console.log('\n👉 Considere resolver manualmente os erros restantes conforme as mensagens acima.');
}

console.log('\n🏆 Processo de correção de ESLint concluído!');
