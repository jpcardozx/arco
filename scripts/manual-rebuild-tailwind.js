/**
 * Script para manualmente reconstruir o CSS do Tailwind
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Caminhos importantes
const projectRoot = path.resolve(__dirname, '..');
const inputCssPath = path.join(projectRoot, 'src', 'app', 'input.css');
const outputCssPath = path.join(projectRoot, 'src', 'app', 'output.css');
const globalsCssPath = path.join(projectRoot, 'src', 'app', 'globals.css');

// Criar arquivo de entrada temporário
console.log('✅ Criando arquivo de entrada temporário para o Tailwind...');
fs.writeFileSync(
  inputCssPath,
  '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
  'utf8'
);

// Verificar se o arquivo tailwind.config.js existe
const configPath = fs.existsSync(path.join(projectRoot, 'tailwind.config.js'))
  ? path.join(projectRoot, 'tailwind.config.js')
  : path.join(projectRoot, 'tailwind.config.ts');

console.log(`✅ Usando arquivo de configuração: ${configPath}`);

// Executar tailwindcss CLI
try {
  console.log('⚙️ Executando o Tailwind CLI para gerar CSS...');
  execSync(`npx tailwindcss -c "${configPath}" -i "${inputCssPath}" -o "${outputCssPath}" --minify`);
  console.log('✅ CSS gerado com sucesso!');

  // Ler arquivo globals.css para preservar diretivas e imports
  let globalsCss = '';
  if (fs.existsSync(globalsCssPath)) {
    globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
  }

  // Extrair diretivas e imports
  let tailwindDirectives = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n';
  let importStatements = '';

  // Extrair imports
  const importRegex = /@import\s+['"]([^'"]+)['"]\s*;/g;
  let match;
  while ((match = importRegex.exec(globalsCss)) !== null) {
    importStatements += match[0] + '\n';
  }

  // Ler CSS gerado
  const outputCss = fs.readFileSync(outputCssPath, 'utf8');

  // Combinar tudo
  const newGlobalsCss = `/* Arquivo gerado automaticamente pelo script manual-rebuild-tailwind.js */
/* Não edite este arquivo diretamente; as mudanças serão sobrescritas */
${tailwindDirectives}
${importStatements}
${outputCss}`;

  // Salvar de volta para globals.css
  fs.writeFileSync(globalsCssPath, newGlobalsCss, 'utf8');
  console.log('✅ globals.css atualizado com sucesso!');

  // Limpar arquivo temporário
  fs.unlinkSync(inputCssPath);
  fs.unlinkSync(outputCssPath);
  
  console.log('✅ Processo concluído! O Tailwind CSS foi reconstruído com sucesso.');
} catch (error) {
  console.error('❌ Erro ao executar o Tailwind CLI:', error.message);
  process.exit(1);
}
