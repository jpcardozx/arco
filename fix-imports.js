// Script para corrigir problemas de importação no projeto ARCO
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Iniciando correção de imports no projeto ARCO...');

// Diretórios para varrer
const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(__dirname, 'components');
const libDir = path.join(__dirname, 'lib');

// Lista de extensões de arquivos para corrigir
const fileExtensions = ['.tsx', '.ts', '.jsx', '.js'];

// Função para listar arquivos recursivamente
function listFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFilesRecursively(filePath, fileList);
    } else {
      if (fileExtensions.includes(path.extname(filePath))) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Obter todos os arquivos
const srcFiles = listFilesRecursively(srcDir);
const componentFiles = listFilesRecursively(componentsDir);
const libFiles = listFilesRecursively(libDir);

const allFiles = [...srcFiles, ...componentFiles, ...libFiles];

console.log(`📄 Encontrados ${allFiles.length} arquivos para analisar`);

// Mapear os componentes disponíveis
const componentMap = new Map();

// Adicionar os componentes da pasta components/
componentFiles.forEach(file => {
  const relativePath = path.relative(componentsDir, file);
  const componentName = path.basename(file, path.extname(file));
  
  if (!componentMap.has(componentName)) {
    componentMap.set(componentName, { rootPath: relativePath, componentPath: file });
  }
});

// Contador de correções
let fixCount = 0;

// Expressões regulares para encontrar padrões de importação
const importPatterns = [
  // import X from '../../components/X';
  /import\s+(\w+)\s+from\s+(['"])([^'"]+)(['"])/g,
  // import { X } from '../../lib/X';
  /import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])([^'"]+)(['"])/g
];

// Corrigir importações em todos os arquivos
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  let fileFixed = false;
  
  // Se o arquivo está na pasta src/components, precisamos ajustar as importações
  // que apontam para a pasta raiz components/
  if (file.includes('src/components') || file.includes('src\\components')) {
    // Corrigir imports relativos
    content = content.replace(/from\s+['"]\.\.\/\.\.\/components\/(.*?)['"]/, (match, componentPath) => {
      return `from '../../../components/${componentPath}'`;
    });
    
    // Corrigir imports de lib/
    content = content.replace(/from\s+['"]\.\.\/\.\.\/lib\/(.*?)['"]/, (match, libPath) => {
      return `from '../../../lib/${libPath}'`;
    });
    
    // Corrigir imports com @/
    content = content.replace(/from\s+['"]@\/components\/(.*?)['"]/, (match, componentPath) => {
      return `from '../../../components/${componentPath}'`;
    });
    
    content = content.replace(/from\s+['"]@\/lib\/(.*?)['"]/, (match, libPath) => {
      return `from '../../../lib/${libPath}'`;
    });
  }
  
  // Corrigir imports em arquivos da raiz
  if (file.includes('src/app') || file.includes('src\\app')) {
    // Corrigir imports com @/ para componentes
    content = content.replace(/from\s+['"]@\/components\/(.*?)['"]/, (match, componentPath) => {
      return `from '../../components/${componentPath}'`;
    });
    
    content = content.replace(/from\s+['"]@\/lib\/(.*?)['"]/, (match, libPath) => {
      return `from '../../lib/${libPath}'`;
    });
  }
  
  // Se foi modificado, salve o arquivo
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Corrigidas importações em: ${path.relative(process.cwd(), file)}`);
    fixCount++;
    fileFixed = true;
  }
});

console.log(`🎉 Finalizado! ${fixCount} arquivos foram atualizados.`);

// Limpar cache do Next.js
try {
  console.log('🧹 Limpando cache do Next.js...');
  if (fs.existsSync(path.join(__dirname, '.next'))) {
    if (process.platform === 'win32') {
      execSync('rmdir /s /q .next', { stdio: 'inherit' });
    } else {
      execSync('rm -rf .next', { stdio: 'inherit' });
    }
  }
  console.log('✅ Cache limpo com sucesso!');
} catch (error) {
  console.error('❌ Erro ao limpar cache:', error);
}

console.log('\n⭐ Pronto para compilar! Execute "npm run build" ou "npm run dev"\n');
