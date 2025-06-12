/**
 * Corrige problemas com importação do componente Link do Next.js
 * Este é um problema comum em projetos Next.js com TypeScript
 */

const fs = require('fs');
const path = require('path');

const colorize = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Expressão regular para encontrar a importação incorreta do Link
const linkImportRegex = /import\s+Link\s+from\s+['"]next\/link['"];?/;
const linkImportRegex2 = /import\s+{\s*Link\s*}\s+from\s+['"]next\/link['"];?/;
const newLinkImport = "import Link from 'next/link';\nimport type { LinkProps } from 'next/link';";

/**
 * Varre os arquivos e corrige as importações
 */
function fixLinkImports(rootDir, extensions = ['.tsx', '.ts']) {
  console.log(colorize.bold(colorize.blue('\n=== Corrigindo Importações de Link do Next.js ===\n')));
  
  function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      // Ignorar node_modules e .next
      if (item === 'node_modules' || item === '.next' || item === '.git' || item === 'dist') {
        continue;
      }
      
      try {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          processDirectory(fullPath);
        } else if (stats.isFile() && extensions.includes(path.extname(fullPath))) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Verificar se o arquivo usa o componente Link
            if (content.includes('<Link') || 
                linkImportRegex.test(content) || 
                linkImportRegex2.test(content)) {
              
              // Verificar se há o erro "Link cannot be used as a JSX component"
              if ((content.includes('<Link') && !content.includes('type { LinkProps }')) ||
                 linkImportRegex.test(content)) {
                
                // Substituir a importação antiga pela nova
                let newContent = content;
                
                if (linkImportRegex.test(newContent)) {
                  newContent = newContent.replace(linkImportRegex, newLinkImport);
                } else if (linkImportRegex2.test(newContent)) {
                  newContent = newContent.replace(linkImportRegex2, newLinkImport);
                } else if (content.includes('<Link') && !content.includes('import Link')) {
                  // Arquivo usa Link mas não o importa, adicionar no topo 
                  // (após outros imports)
                  const lines = newContent.split('\n');
                  const lastImportIndex = lines.findIndex((line, index, array) => {
                    return line.includes('import ') && !array[index + 1]?.includes('import ');
                  });
                  
                  if (lastImportIndex >= 0) {
                    lines.splice(lastImportIndex + 1, 0, newLinkImport);
                    newContent = lines.join('\n');
                  } else {
                    // Se não encontrou nenhum import, adicionar no início
                    newContent = newLinkImport + '\n\n' + newContent;
                  }
                }
                
                // Salvar o conteúdo modificado
                if (newContent !== content) {
                  fs.writeFileSync(fullPath, newContent, 'utf8');
                  console.log(colorize.green(`✓ Corrigido: ${fullPath}`));
                }
              }
            }
          } catch (err) {
            console.error(colorize.red(`✗ Erro ao processar ${fullPath}: ${err.message}`));
          }
        }
      } catch (err) {
        console.error(colorize.red(`✗ Erro ao acessar ${fullPath}: ${err.message}`));
      }
    }
  }
  
  processDirectory(rootDir);
  console.log(colorize.bold(colorize.blue('\n=== Processo Concluído ===\n')));
}

// Executar a função principal
try {
  fixLinkImports(process.cwd());
  console.log(colorize.green('✓ Correção de importações de Link concluída com sucesso'));
  console.log(colorize.blue('\nAgora execute "npm run dev" para iniciar o servidor'));
} catch (err) {
  console.error(colorize.red(`✗ Erro: ${err.message}`));
  process.exit(1);
}
