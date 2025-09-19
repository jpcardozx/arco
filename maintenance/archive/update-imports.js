#!/usr/bin/env node

/**
 * Script para atualizar os paths de importações após a migração da estrutura do projeto
 *
 * Este script procura por padrões de importação antigos e os substitui pelo novo formato
 */

const fs = require('fs');
const path = require('path');

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

// Mapeamento de caminhos antigos para novos
const importMappings = [
  // Componentes
  {
    pattern: /from ['"]\.\.\/\.\.\/components\/([^'"]+)['"]/g,
    replacement: "from '@/components/$1'",
  },
  {
    pattern: /from ['"]\.\.\/components\/([^'"]+)['"]/g,
    replacement: "from '@/components/$1'",
  },
  {
    pattern: /from ['"]\.\.\/([^\/'"]+)['"]/g,
    test: match => !match.includes('/') && /[A-Z]/.test(match[3]), // Componentes começam com letra maiúscula
    replacement: "from '@/components/$1'",
  },

  // Hooks
  {
    pattern: /from ['"]\.\.\/\.\.\/hooks\/([^'"]+)['"]/g,
    replacement: "from '@/lib/hooks/$1'",
  },
  {
    pattern: /from ['"]\.\.\/hooks\/([^'"]+)['"]/g,
    replacement: "from '@/lib/hooks/$1'",
  },

  // Lib
  {
    pattern: /from ['"]\.\.\/\.\.\/lib\/([^'"]+)['"]/g,
    replacement: "from '@/lib/$1'",
  },
  {
    pattern: /from ['"]\.\.\/lib\/([^'"]+)['"]/g,
    replacement: "from '@/lib/$1'",
  },

  // UI Components
  {
    pattern: /from ['"]\.\/ui\/([^'"]+)['"]/g,
    replacement: "from '@/components/ui/$1'",
  },
  {
    pattern: /from ['"]\.\.\/ui\/([^'"]+)['"]/g,
    replacement: "from '@/components/ui/$1'",
  },

  // Analytics
  {
    pattern: /from ['"]\.\.\/\.\.\/lib\/analytics['"]/g,
    replacement: "from '@/lib/utils/analytics'",
  },
  {
    pattern: /from ['"]\.\.\/lib\/analytics['"]/g,
    replacement: "from '@/lib/utils/analytics'",
  },

  // i18n
  {
    pattern: /from ['"]\.\.\/\.\.\/lib\/i18n-context['"]/g,
    replacement: "from '@/lib/context/i18n-context'",
  },
  {
    pattern: /from ['"]\.\.\/lib\/i18n-context['"]/g,
    replacement: "from '@/lib/context/i18n-context'",
  },

  // Utils
  {
    pattern: /from ['"]\.\.\/\.\.\/lib\/ui-utils['"]/g,
    replacement: "from '@/lib/utils/ui-utils'",
  },
  {
    pattern: /from ['"]\.\.\/lib\/ui-utils['"]/g,
    replacement: "from '@/lib/utils/ui-utils'",
  },

  // Imports dinamicos
  {
    pattern: /import\(['"]\.\.\/\.\.\/components\/([^'"]+)['"]\)/g,
    replacement: "import('@/components/$1')",
  },
];

// Diretórios para processar
const dirsToProcess = ['./src', './components', './hooks', './lib'];

// Funções auxiliares
function walkDirectory(dir, callback) {
  if (!fs.existsSync(dir)) {
    console.log(`${colors.yellow}Diretório não encontrado: ${colors.reset}${dir}`);
    return;
  }

  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      walkDirectory(fullPath, callback);
    } else if (
      /\.(tsx?|jsx?)$/.test(dirent.name) &&
      !dirent.name.endsWith('.test.ts') &&
      !dirent.name.endsWith('.spec.ts')
    ) {
      callback(fullPath);
    }
  });
}

// Função para atualizar os imports em um arquivo
function updateImports(filePath) {
  try {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    importMappings.forEach(mapping => {
      const originalContent = fileContent;

      if (mapping.test) {
        // Para padrões com condições adicionais
        const matches = fileContent.match(mapping.pattern);
        if (matches) {
          matches.forEach(match => {
            if (mapping.test(match)) {
              const newImport = match.replace(mapping.pattern, mapping.replacement);
              fileContent = fileContent.replace(match, newImport);
            }
          });
        }
      } else {
        // Padrão simples de substituição
        fileContent = fileContent.replace(mapping.pattern, mapping.replacement);
      }

      if (originalContent !== fileContent) {
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(
        `${colors.green}Atualizado: ${colors.reset}${path.relative(process.cwd(), filePath)}`
      );
    }
  } catch (error) {
    console.error(`${colors.red}Erro ao processar ${filePath}: ${colors.reset}${error.message}`);
  }
}

// Função principal
function updateAllImports() {
  console.log(
    `${colors.bright}${colors.blue}=== ATUALIZANDO IMPORTAÇÕES DO PROJETO ===${colors.reset}\n`
  );

  let filesProcessed = 0;
  let filesUpdated = 0;

  dirsToProcess.forEach(dir => {
    if (fs.existsSync(dir)) {
      walkDirectory(dir, filePath => {
        filesProcessed++;

        const originalContent = fs.readFileSync(filePath, 'utf8');
        updateImports(filePath);
        const newContent = fs.readFileSync(filePath, 'utf8');

        if (originalContent !== newContent) {
          filesUpdated++;
        }
      });
    }
  });

  console.log(`\n${colors.bright}${colors.green}Processamento concluído!${colors.reset}`);
  console.log(`${colors.yellow}Arquivos processados: ${colors.reset}${filesProcessed}`);
  console.log(`${colors.yellow}Arquivos atualizados: ${colors.reset}${filesUpdated}\n`);
}

// Executar atualização
updateAllImports();
