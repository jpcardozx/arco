/**
 * Script para atualizar os imports do Design System nos componentes existentes
 * Este script encontra as importações do sistema de design diretamente nos componentes
 * e as atualiza para usar o novo sistema centralizado
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');

// Função para atualizar importações nos arquivos
const updateImports = (file) => {
  try {
    // Ler o conteúdo do arquivo
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Detectar padrões de importação do antigo design system
    const patterns = [
      // Importações de componentes individuais
      {
        regex: /import\s+{\s*(Heading[123]|BodyLarge|BodyRegular|Caption|Card|Button|Section|Grid)(?:\s*,\s*(Heading[123]|BodyLarge|BodyRegular|Caption|Card|Button|Section|Grid))*\s*}\s+from\s+['"]@\/components\/features\/[^'"]*['"]/g,
        replacement: `import { $1$2 } from '@/components/features/DesignSystem'`
      },
      // Importação de componentes em direto de subpastas
      {
        regex: /import\s+{\s*(Card|Button)\s*}\s+from\s+['"]@\/components\/ui\/[^'"]*['"]/g,
        replacement: `import { $1 } from '@/components/features/DesignSystem'`
      },
      // Importação de componentes de layout
      {
        regex: /import\s+{\s*(Grid|Section)\s*}\s+from\s+['"]@\/components\/layout\/[^'"]*['"]/g,
        replacement: `import { $1 } from '@/components/features/DesignSystem'`
      }
    ];
    
    // Aplicar substituições
    let modified = false;
    patterns.forEach(({ regex, replacement }) => {
      if (regex.test(content)) {
        content = content.replace(regex, replacement);
        modified = true;
      }
    });
    
    // Se houver modificações, salvar o arquivo
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(chalk.green(`✅ Atualizado: ${file}`));
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(chalk.red(`❌ Erro ao processar ${file}: ${error.message}`));
    return 0;
  }
};

// Função principal
const main = async () => {
  console.log(chalk.blue('🔍 Buscando componentes para atualizar importações...'));
  
  // Encontrar todos os arquivos de componente
  const files = glob.sync('components/**/*.{tsx,jsx}', { cwd: process.cwd() });
  
  console.log(chalk.yellow(`Encontrados ${files.length} arquivos para verificar.`));
  
  // Processar cada arquivo
  let updatedCount = 0;
  files.forEach(file => {
    updatedCount += updateImports(file);
  });
  
  console.log(chalk.green(`✨ Concluído! ${updatedCount} arquivos atualizados.`));
};

// Executar o script
main().catch(error => {
  console.error(chalk.red(`❌ Erro: ${error.message}`));
  process.exit(1);
});
