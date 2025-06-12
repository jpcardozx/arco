/**
 * Script para atualizar importações nos componentes para usar o novo sistema de design
 * e a nova estrutura de diretórios
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Cores para saída de console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Mapeamento de componentes para seus novos caminhos
// Este objeto será preenchido automaticamente ao escanear a nova estrutura
const componentMap = {};

// Escanear os componentes na nova estrutura
function scanNewComponents() {
  const baseDir = path.join(process.cwd(), 'src', 'components');
  const categories = ['ui', 'layout', 'sections', 'features'];
  
  categories.forEach(category => {
    const categoryDir = path.join(baseDir, category);
    
    if (!fs.existsSync(categoryDir)) return;
    
    fs.readdirSync(categoryDir).forEach(file => {
      if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return;
      
      // Obter nome do componente sem a extensão
      const componentName = file.replace(/\.(tsx|jsx)$/, '');
      
      // Registrar no mapa de componentes
      componentMap[componentName] = `@/components/${category}/${componentName}`;
      
      // Adicionar mapeamento para versões antigas com sufixos comuns
      // Para garantir que importações das versões anteriores sejam atualizadas
      [`${componentName}Enhanced`, `${componentName}Revised`, `${componentName}Refined`].forEach(variant => {
        componentMap[variant] = `@/components/${category}/${componentName}`;
      });
    });
  });
  
  console.log(`${colors.cyan}Mapeamento de componentes construído com ${Object.keys(componentMap).length} entradas${colors.reset}`);
}

// Atualizar as importações em um arquivo
function updateImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let modified = false;
    
    // Substituir importações diretas de componentes
    Object.entries(componentMap).forEach(([component, newPath]) => {
      // Padrão para importações de componentes específicos
      // Ex: import { ComponentName } from '../components/ComponentName';
      // Ex: import ComponentName from '../components/ComponentName';
      const importRegex = new RegExp(`import\\s+({\\s*${component}\\s*}|${component})\\s+from\\s+['"]([^\\'"]*/components|[^\\'"]*/src/components)/${component}(Enhanced|Revised|Refined)?['"]`, 'g');
      
      if (importRegex.test(content)) {
        content = content.replace(importRegex, `import $1 from '${newPath}'`);
        modified = true;
      }
    });
    
    // Substituir importações do Design System
    const designSystemImportRegex = /import\s+{\s*([^}]+)\s*}\s+from\s+['"]@\/components\/features\/DesignSystem['"]/g;
    
    if (designSystemImportRegex.test(content)) {
      content = content.replace(designSystemImportRegex, (match, importedComponents) => {
        // Verificar quais componentes são do Design System
        const componentList = importedComponents.split(',').map(c => c.trim());
        
        // Criar novas importações diretas dos componentes específicos
        const newImports = componentList.map(comp => {
          // Identificar a categoria do componente
          if (['Heading1', 'Heading2', 'Heading3', 'BodyLarge', 'BodyRegular', 'Caption'].includes(comp)) {
            return `import { ${comp} } from '@/components/ui/Typography';`;
          } else if (comp === 'Button') {
            return `import { ${comp} } from '@/components/ui/Button';`;
          } else if (comp === 'Card') {
            return `import { ${comp} } from '@/components/ui/Card';`;
          } else if (['Grid'].includes(comp)) {
            return `import { ${comp} } from '@/components/layout/Grid';`;
          } else if (['Section'].includes(comp)) {
            return `import { ${comp} } from '@/components/layout/Section';`;
          } else {
            return `import { ${comp} } from '@/components/features/DesignSystem';`;
          }
        });
        
        return newImports.join('\n');
      });
      
      modified = true;
    }
    
    // Se houve modificações, salvar o arquivo
    if (modified) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`${colors.red}Erro ao processar ${filePath}: ${error.message}${colors.reset}`);
    return false;
  }
}

// Função principal
async function updateAllImports() {
  console.log(`\n${colors.bright}${colors.yellow}=== Atualizando Importações de Componentes ===${colors.reset}\n`);
  
  // Construir o mapa de componentes
  scanNewComponents();
  
  // Encontrar todos os arquivos de componente
  const files = [
    ...glob.sync('components/**/*.{tsx,jsx}'),
    ...glob.sync('src/**/*.{tsx,jsx}'),
    ...glob.sync('app/**/*.{tsx,jsx}'),
    ...glob.sync('pages/**/*.{tsx,jsx}'),
  ];
  
  console.log(`${colors.blue}Encontrados ${files.length} arquivos para atualização de importações${colors.reset}\n`);
  
  // Atualizar cada arquivo
  let updatedFiles = 0;
  
  files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    const updated = updateImports(fullPath);
    
    if (updated) {
      console.log(`${colors.green}✓ ${file} - importações atualizadas${colors.reset}`);
      updatedFiles++;
    }
  });
  
  console.log(`\n${colors.green}${colors.bright}Atualização concluída! ${updatedFiles} arquivos atualizados.${colors.reset}\n`);
}

// Executar o script
updateAllImports().catch(error => {
  console.error(`${colors.red}Erro fatal: ${error.message}${colors.reset}`);
  process.exit(1);
});
