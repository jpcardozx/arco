// Script para limpar imports não utilizados
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Iniciando limpeza de imports não utilizados');

function cleanUnusedImports() {
  console.log('🧹 Analisando arquivos para remover imports não utilizados...');
  
  const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
    ignore: ['node_modules/**', '.next/**', 'out/**', 'public/**', '**/eslint-fix-scripts/**', 'fix-*.js']
  });

  let fixCount = 0;

  // Lista de imports frequentemente não utilizados com base no relatório ESLint
  const commonUnusedImports = [
    'motion', 'AnimatePresence', 'Image', 'Link',
    'ArrowRight', 'ArrowUpDown', 'ExternalLink', 'ChevronRight',
    'Clock', 'Check', 'BarChart3', 'LineChart', 'TrendingUp',
    'Eye', 'DollarSign', 'Zap', 'Layers', 'XCircle', 'Star',
    'ArrowDown', 'Divide', 'FiArrowRight', 'FiBarChart2', 'FiClock',
    'BodyLarge', 'Button', 'Card', 'Caption', 'CSSProperties',
    'useEffect', 'useState', 'useRef'
  ];
  
  const dynamicRegExpCache = {};

  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      
      // Para cada import potencialmente não utilizado
      commonUnusedImports.forEach(importName => {
        // Buscar pelo padrão de import específico
        if (!dynamicRegExpCache[importName]) {
          // Matches: import { Something, ImportName, Other } from 'package'
          dynamicRegExpCache[importName] = new RegExp(`import\\s+{[^}]*?\\b${importName}\\b[^}]*?}\\s+from\\s+['"][^'"]+['"]`, 'g');
        }
        
        // Verificar se o import existe e se o símbolo é utilizado no arquivo
        const importRegex = dynamicRegExpCache[importName];
        
        // Verificar existência do import
        const importMatches = content.match(importRegex);
        if (importMatches) {
          // Verificar se o símbolo é usado no código, excluindo a linha do próprio import
          const codeWithoutImport = content.replace(importRegex, '');
          const usageRegex = new RegExp(`\\b${importName}\\b`, 'g');
          const isUsed = usageRegex.test(codeWithoutImport);
          
          if (!isUsed) {
            // O símbolo não é utilizado, remover do import
            content = content.replace(
              new RegExp(`(import\\s+{[^}]*?)\\b${importName}\\b\\s*,?\\s*([^}]*?}\\s+from\\s+['"][^'"]+['"])`, 'g'),
              (match, before, after) => {
                // Limpar vírgulas extras, etc.
                let result = `${before}${after}`;
                // Corrigir caso de { , Something }
                result = result.replace(/{\s*,\s*/, '{ ');
                // Corrigir caso de { Something, } 
                result = result.replace(/,\s*}/, ' }');
                // Remover import vazio { }
                if (result.includes('{ }')) {
                  return '';
                }
                return result;
              }
            );
            
            // Remover imports standalone como: import Image from 'next/image'
            content = content.replace(
              new RegExp(`import\\s+${importName}\\s+from\\s+['"][^'"]+['"]\\s*;?`, 'g'),
              ''
            );
            
            modified = true;
            fixCount++;
          }
        }
      });
      
      // Escrever alterações no arquivo apenas se ele foi modificado
      if (modified) {
        fs.writeFileSync(file, content);
      }
    } catch (error) {
      console.error(`Erro ao processar o arquivo ${file}:`, error);
    }
  });
  
  console.log(`✅ Removidos ${fixCount} imports não utilizados`);
}

// Executar limpeza de imports
cleanUnusedImports();

console.log('🎉 Processo de limpeza de imports não utilizados concluído');
