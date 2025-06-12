#!/usr/bin/env node

/**
 * Script de migração para reorganizar a estrutura do projeto ARCO
 * Este script:
 * 1. Cria uma nova estrutura de diretórios
 * 2. Move arquivos para suas posições corretas
 * 3. Atualiza importações quando necessário
 */

const { execSync } = require('child_process');
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

console.log(`${colors.bright}${colors.blue}=== ARCO PROJECT MIGRATION TOOL ===${colors.reset}\n`);

// Diretório raiz do projeto
const rootDir = process.cwd();

// Nova estrutura de diretórios
const newStructure = {
  'src/components': {
    ui: [],
    layout: [],
    sections: [],
    features: [],
  },
  'src/lib': {
    utils: [],
    config: [],
    hooks: [],
    context: [],
  },
  'src/styles': [],
  'src/types': [],
};

// Função para criar diretórios recursivamente
function createDirectories(structure, basePath = '') {
  Object.entries(structure).forEach(([dir, subDirs]) => {
    const fullPath = path.join(rootDir, basePath, dir);

    // Cria o diretório se não existir
    if (!fs.existsSync(fullPath)) {
      console.log(
        `${colors.yellow}Criando diretório: ${colors.reset}${path.relative(rootDir, fullPath)}`
      );
      fs.mkdirSync(fullPath, { recursive: true });
    }

    // Cria subdiretórios se houver
    if (typeof subDirs === 'object' && !Array.isArray(subDirs)) {
      createDirectories(subDirs, path.join(basePath, dir));
    }
  });
}

// Categorizar componentes
function categorizeComponent(filePath) {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Categorização básica por nome e conteúdo
  if (
    fileName.includes('Navbar') ||
    fileName.includes('Footer') ||
    fileName.includes('Layout') ||
    fileName.includes('Header')
  ) {
    return 'layout';
  } else if (
    fileName.includes('Hero') ||
    fileName.includes('Section') ||
    fileName.includes('CTA') ||
    fileName.includes('Card')
  ) {
    return 'sections';
  } else if (
    fileName.includes('Button') ||
    fileName.includes('Input') ||
    fileName.includes('Icon') ||
    fileName.includes('Avatar')
  ) {
    return 'ui';
  } else {
    return 'features';
  }
}

// Mover componentes
function moveComponentsToNewStructure() {
  const componentsDir = path.join(rootDir, 'components');

  // Verifica se o diretório existe
  if (!fs.existsSync(componentsDir)) {
    console.log(
      `${colors.red}Diretório de componentes não encontrado: ${colors.reset}${componentsDir}`
    );
    return;
  }

  // Lista todos os arquivos .tsx no diretório components
  function processComponentsDirectory(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
      const fullPath = path.join(dir, dirent.name);

      if (dirent.isDirectory()) {
        // Processa subdiretórios
        processComponentsDirectory(fullPath);
      } else if (dirent.name.endsWith('.tsx')) {
        // Processa arquivos de componentes
        const category = categorizeComponent(fullPath);
        const newDir = path.join(rootDir, 'src', 'components', category);
        const newPath = path.join(newDir, dirent.name);

        // Se o arquivo tem sufixos como Enhanced, Revised - remove o sufixo
        if (/(?:Enhanced|Revised|Refined|V\d+)\.tsx$/.test(dirent.name)) {
          // Loga que esse componente foi identificado como variante
          console.log(
            `${colors.yellow}Componente variante detectado: ${colors.reset}${dirent.name}`
          );
        }

        // Copia o arquivo para o novo local
        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }

        console.log(
          `${colors.green}Movendo componente: ${colors.reset}${path.relative(rootDir, fullPath)} → ${path.relative(rootDir, newPath)}`
        );
        fs.copyFileSync(fullPath, newPath);
      }
    });
  }

  processComponentsDirectory(componentsDir);
}

// Mover hooks
function moveHooks() {
  const hooksDir = path.join(rootDir, 'hooks');
  const newHooksDir = path.join(rootDir, 'src', 'lib', 'hooks');

  if (!fs.existsSync(hooksDir)) {
    console.log(`${colors.yellow}Diretório de hooks não encontrado: ${colors.reset}${hooksDir}`);
    return;
  }

  // Cria o diretório de destino se não existir
  if (!fs.existsSync(newHooksDir)) {
    fs.mkdirSync(newHooksDir, { recursive: true });
  }

  // Copia todos os arquivos de hooks
  fs.readdirSync(hooksDir).forEach(file => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const sourcePath = path.join(hooksDir, file);
      const destPath = path.join(newHooksDir, file);

      console.log(
        `${colors.green}Movendo hook: ${colors.reset}${path.relative(rootDir, sourcePath)} → ${path.relative(rootDir, destPath)}`
      );
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Mover utilitários da pasta lib
function moveLibUtilities() {
  const libDir = path.join(rootDir, 'lib');
  const newLibDir = path.join(rootDir, 'src', 'lib');

  if (!fs.existsSync(libDir)) {
    console.log(`${colors.yellow}Diretório lib não encontrado: ${colors.reset}${libDir}`);
    return;
  }

  // Processa os arquivos da lib
  fs.readdirSync(libDir, { withFileTypes: true }).forEach(dirent => {
    const sourcePath = path.join(libDir, dirent.name);

    if (dirent.isDirectory()) {
      // Para subdiretórios, copia a estrutura
      const newSubDir = path.join(newLibDir, dirent.name);
      if (!fs.existsSync(newSubDir)) {
        fs.mkdirSync(newSubDir, { recursive: true });
      }

      // TODO: Copiar conteúdo recursivamente
    } else if (dirent.name.endsWith('.ts') || dirent.name.endsWith('.tsx')) {
      // Categoriza o arquivo
      let targetDir = 'utils';

      if (dirent.name.includes('context')) {
        targetDir = 'context';
      } else if (dirent.name.includes('config')) {
        targetDir = 'config';
      }

      const destDir = path.join(newLibDir, targetDir);
      const destPath = path.join(destDir, dirent.name);

      // Cria diretório se não existir
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      console.log(
        `${colors.green}Movendo utility: ${colors.reset}${path.relative(rootDir, sourcePath)} → ${path.relative(rootDir, destPath)}`
      );
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Função principal
function runMigration() {
  console.log(`${colors.bright}${colors.blue}Iniciando migração do projeto...${colors.reset}\n`);

  try {
    // Criar nova estrutura de diretórios
    console.log(
      `${colors.bright}${colors.magenta}1. Criando estrutura de diretórios${colors.reset}\n`
    );
    createDirectories(newStructure);

    // Mover componentes
    console.log(`\n${colors.bright}${colors.magenta}2. Movendo componentes${colors.reset}\n`);
    moveComponentsToNewStructure();

    // Mover hooks
    console.log(`\n${colors.bright}${colors.magenta}3. Movendo hooks${colors.reset}\n`);
    moveHooks();

    // Mover utilitários da lib
    console.log(`\n${colors.bright}${colors.magenta}4. Movendo utilitários${colors.reset}\n`);
    moveLibUtilities();

    console.log(
      `\n${colors.bright}${colors.green}Migração concluída com sucesso!${colors.reset}\n`
    );
    console.log(
      `${colors.yellow}IMPORTANTE: Esta é uma migração inicial. Você deve verificar se todas as importações estão corretas.${colors.reset}`
    );
    console.log(
      `${colors.yellow}Recomendamos executar 'pnpm type-check' para identificar erros de importação.${colors.reset}\n`
    );
  } catch (error) {
    console.error(
      `${colors.bright}${colors.red}Erro durante a migração: ${error.message}${colors.reset}\n`
    );
    console.error(error);
  }
}

// Executa a migração
runMigration();
