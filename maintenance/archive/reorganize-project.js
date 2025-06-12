/**
 * Script para reorganizar a estrutura do projeto conforme o REORGANIZATION_PLAN.md
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Definição da nova estrutura
const newStructure = {
  'src': {
    'app': {},               // Diretório principal do Next.js App Router
    'components': {          // Componentes organizados 
      'ui': {},              // Componentes de UI básicos
      'layout': {},          // Componentes de layout
      'sections': {},        // Seções maiores das páginas
      'features': {}         // Componentes específicos de funcionalidades
    },
    'lib': {                 // Utilidades, funções, bibliotecas
      'utils': {},           // Funções utilitárias
      'config': {},          // Configurações
      'hooks': {},           // Custom hooks React
      'store': {},           // Gerenciamento de estado (se houver)
    },
    'types': {},             // Definições de tipos TypeScript
    'styles': {}             // Estilos globais e utilitários CSS/SCSS
  }
};

// Criar estrutura de diretórios
const createDirectoryStructure = (structure, basePath) => {
  Object.entries(structure).forEach(([dir, subDirs]) => {
    const dirPath = path.join(basePath, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`📁 Criando diretório: ${chalk.green(dirPath)}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    if (Object.keys(subDirs).length > 0) {
      createDirectoryStructure(subDirs, dirPath);
    }
  });
};

// Mover hooks para a nova estrutura
const migrateHooks = () => {
  const sourceDir = path.join(__dirname, '..', 'hooks');
  const targetDir = path.join(__dirname, '..', 'src', 'lib', 'hooks');
  
  if (!fs.existsSync(sourceDir)) return;
  
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    if (!file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.js')) return;
    
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    console.log(`🔄 Movendo ${chalk.cyan(file)} para ${chalk.green('src/lib/hooks')}`);
    fs.copyFileSync(sourcePath, targetPath);
    
    // Criar arquivo de alias para manter compatibilidade
    const aliasContent = `/**
 * @deprecated Use a versão em src/lib/hooks/${file}
 */
export { default } from '../src/lib/hooks/${file.replace(/\.tsx?$/, '')}';
export * from '../src/lib/hooks/${file.replace(/\.tsx?$/, '')}';
`;
    fs.writeFileSync(sourcePath, aliasContent);
  });
};

// Mover arquivos de configuração para lugares apropriados
const migrateConfigFiles = () => {
  const configMappings = [
    { 
      source: path.join(__dirname, '..', 'tailwind.config.ts'), 
      target: path.join(__dirname, '..', 'src', 'lib', 'config', 'tailwind.config.ts') 
    },
    { 
      source: path.join(__dirname, '..', 'next.config.mjs'), 
      target: path.join(__dirname, '..', 'src', 'lib', 'config', 'next.config.mjs') 
    }
  ];
  
  configMappings.forEach(({ source, target }) => {
    if (!fs.existsSync(source)) return;
    
    console.log(`📄 Copiando ${chalk.cyan(path.basename(source))} para ${chalk.green('src/lib/config')}`);
    fs.copyFileSync(source, target);
  });
  
  // Atualizar imports nos arquivos de configuração copiados
  // Este é apenas um exemplo básico, você pode precisar de uma lógica mais complexa
  // dependendo das importações específicas nos seus arquivos
};

// Mover estilos para a nova estrutura
const migrateStyles = () => {
  const sourceDir = path.join(__dirname, '..', 'styles');
  const targetDir = path.join(__dirname, '..', 'src', 'styles');
  
  if (!fs.existsSync(sourceDir)) return;
  
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    if (!file.endsWith('.css') && !file.endsWith('.scss')) return;
    
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    console.log(`🔄 Movendo ${chalk.cyan(file)} para ${chalk.green('src/styles')}`);
    fs.copyFileSync(sourcePath, targetPath);
  });
};

// Atualizar referências de importação nos componentes consolidados
const updateImportPaths = () => {
  console.log(chalk.blue('🔄 Atualizando caminhos de importação...'));
  
  const componentsDir = path.join(__dirname, '..', 'src', 'components');
  
  const processDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      
      if (fs.statSync(itemPath).isDirectory()) {
        processDirectory(itemPath);
        return;
      }
      
      if (!item.endsWith('.tsx') && !item.endsWith('.jsx')) return;
      
      let content = fs.readFileSync(itemPath, 'utf-8');
      
      // Atualizar importações
      // Exemplo: import { X } from '../../components/Y' -> import { X } from '@/components/category/Y'
      content = content.replace(
        /from ['"]\.\.\/\.\.\/components\/(.+)['"]/g,
        (match, component) => {
          // Determinar categoria com base em heurísticas simples
          let category = 'features'; // padrão
          
          if (component.includes('Hero') || component.includes('CTA') || component.includes('Footer')) {
            category = 'sections';
          } else if (component.includes('Layout')) {
            category = 'layout';
          } else if (component.includes('Button') || component.includes('Input') || component.includes('Card')) {
            category = 'ui';
          }
          
          return `from '@/components/${category}/${component}'`;
        }
      );
      
      // Atualizar imports de hooks
      content = content.replace(
        /from ['"]\.\.\/\.\.\/hooks\/(.+)['"]/g,
        "from '@/lib/hooks/$1'"
      );
      
      fs.writeFileSync(itemPath, content);
    });
  };
  
  processDirectory(componentsDir);
};

// Função principal de execução
const reorganizeProject = async () => {
  console.log(chalk.blue.bold('🚀 Iniciando reorganização da estrutura do projeto...'));
  
  // 1. Criar nova estrutura de diretórios
  createDirectoryStructure(newStructure, path.join(__dirname, '..'));
  
  // 2. Migrar hooks
  migrateHooks();
  
  // 3. Migrar arquivos de configuração
  migrateConfigFiles();
  
  // 4. Migrar estilos
  migrateStyles();
  
  // 5. Atualizar referências de importação
  updateImportPaths();
  
  console.log(chalk.green.bold('✨ Reorganização da estrutura concluída com sucesso!'));
  console.log(chalk.yellow('⚠️ Atenção: Você pode precisar ajustar manualmente algumas importações em arquivos específicos.'));
};

// Executar reorganização
reorganizeProject();
