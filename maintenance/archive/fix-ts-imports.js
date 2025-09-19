/**
 * Corrige problemas de importação e referências de módulos no projeto TypeScript
 * Aborda especificamente erros como "Cannot find module '@/components/...'"
 * 
 * Atualizado para verificar a exportação dos componentes e identificar problemas de registro
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Função para colorir o texto no console
const colorize = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Função para verificar se um diretório existe
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(colorize.blue(`Diretório não encontrado, criando: ${dirPath}`));
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

// Função para criar um arquivo de exportação simples
function createExportFile(filePath, componentName) {
  try {
    const dirName = path.dirname(filePath);
    ensureDirExists(dirName);
    
    const fileContent = `/**
 * Este é um arquivo gerado automaticamente para resolver problemas de importação.
 * Exporta um componente fictício até que o componente real seja implementado.
 */
import React from 'react';

export default function ${componentName}() {
  return (
    <div className="p-4 bg-yellow-100 text-yellow-800 rounded border border-yellow-300">
      <strong>Componente ${componentName}:</strong> Este é um componente temporário criado para 
      resolver problemas de importação TypeScript. Substitua este componente por uma implementação real.
    </div>
  );
}
`;

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(colorize.green(`✓ Criado arquivo temporário: ${filePath}`));
    return true;
  } catch (err) {
    console.error(colorize.red(`✗ Erro ao criar arquivo ${filePath}: ${err.message}`));
    return false;
  }
}

// Lista de arquivos com problemas de importação
const problemFiles = [
  {
    path: 'src/components/layout/Footer.tsx',
    componentName: 'Footer'
  },
  {
    path: 'src/components/sections/Process.tsx',
    componentName: 'Process'
  },
  {
    path: 'src/components/sections/ClientTestimonials.tsx',
    componentName: 'ClientTestimonials'
  },
  {
    path: 'src/components/sections/CaseStudies.tsx',
    componentName: 'CaseStudies'
  },
  {
    path: 'src/components/sections/CTA.tsx',
    componentName: 'CTA'
  }
];

// Função para verificar o conteúdo de um arquivo de componente
function verifyComponentExport(filePath, componentName) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar se o arquivo exporta um componente com o nome esperado
    const hasDefaultExport = content.includes(`export default function ${componentName}`) || 
                            content.includes('export default') && content.includes(`function ${componentName}`);
    
    // Se não exportar o componente esperado, adicionar um console.log
    if (!hasDefaultExport) {
      console.log(colorize.yellow(`⚠ O arquivo ${filePath} não exporta o componente ${componentName} corretamente`));
      return false;
    }
    
    return true;
  } catch (err) {
    console.error(colorize.red(`✗ Erro ao verificar arquivo ${filePath}: ${err.message}`));
    return false;
  }
}

// Função principal
function fixImportIssues() {
  console.log(colorize.bold(colorize.blue('\n=== Corrigindo Problemas de Importação TypeScript ===\n')));
  
  let created = 0;
  let already = 0;
  let verified = 0;
  let needsAttention = 0;
  
  problemFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file.path);
    
    // Verificar se o arquivo já existe
    if (fs.existsSync(filePath)) {
      console.log(colorize.yellow(`O arquivo já existe: ${file.path}`));
      already++;
      
      // Verificar o conteúdo do arquivo
      if (verifyComponentExport(filePath, file.componentName)) {
        verified++;
      } else {
        needsAttention++;
      }
    } else {
      // Criar o arquivo se não existir
      if (createExportFile(filePath, file.componentName)) {
        created++;
      }
    }
  });
  
  console.log(colorize.bold(colorize.blue('\n=== Resultado ===\n')));
  console.log(`${colorize.green(`✓ ${created} arquivos criados`)}`);
  console.log(`${colorize.yellow(`⚠ ${already} arquivos já existiam`)}`);
  console.log(`${colorize.green(`✓ ${verified} componentes verificados e corretos`)}`);
  console.log(`${colorize.yellow(`⚠ ${needsAttention} componentes precisam de atenção`)}`);
  
  // Limpar o cache TypeScript
  console.log(colorize.blue('\n=== Limpando Cache TypeScript ===\n'));
  try {
    if (fs.existsSync(path.join(process.cwd(), 'tsconfig.tsbuildinfo'))) {
      fs.unlinkSync(path.join(process.cwd(), 'tsconfig.tsbuildinfo'));
      console.log(colorize.green('✓ Cache TypeScript removido'));
    }
    
    // Executar o comando tsc para recompilar
    console.log(colorize.blue('\nRecompilando com TypeScript...'));
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log(colorize.green('✓ TypeScript recompilado com sucesso'));
  } catch (err) {
    console.error(colorize.red(`✗ Erro ao limpar cache ou recompilar: ${err.message}`));
  }
  
  console.log(colorize.blue('\nPróximos passos:'));
  console.log('1. Execute "npm run dev" para iniciar o servidor de desenvolvimento');
  console.log('2. Se os problemas persistirem, execute o script LIMPAR_CACHE_TS.bat');
  console.log('3. Corrija qualquer componente que precisa de atenção\n');
}

// Executar o script
fixImportIssues();
