#!/usr/bin/env node

/**
 * Script para otimizar imagens automaticamente
 * Converte JPG/PNG para WebP com qualidade otimizada
 * 
 * Uso: node scripts/image-optimizer.js [pasta]
 * Exemplo: node scripts/image-optimizer.js public/images/salon-examples
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const CONFIG = {
  quality: 85,
  maxWidth: 1920,
  maxHeight: 1080,
  formats: ['.jpg', '.jpeg', '.png'],
};

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Verifica se sharp está instalado
function checkDependencies() {
  try {
    require.resolve('sharp');
    return true;
  } catch {
    log('❌ Sharp não está instalado. Instalando...', 'red');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      log('✅ Sharp instalado com sucesso!', 'green');
      return true;
    } catch (error) {
      log('❌ Erro ao instalar Sharp. Instale manualmente: npm install sharp --save-dev', 'red');
      return false;
    }
  }
}

async function optimizeImage(inputPath, outputPath) {
  const sharp = require('sharp');
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calcula dimensões mantendo aspect ratio
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > CONFIG.maxWidth || height > CONFIG.maxHeight) {
      const ratio = Math.min(CONFIG.maxWidth / width, CONFIG.maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }
    
    // Converte para WebP
    await image
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);
    
    // Calcula tamanhos
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    
    log(`  ✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`, 'green');
    log(`    ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% menor)`, 'blue');
    
    return { success: true, savings: originalSize - optimizedSize };
  } catch (error) {
    log(`  ✗ Erro ao processar ${path.basename(inputPath)}: ${error.message}`, 'red');
    return { success: false, savings: 0 };
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    log(`❌ Diretório não encontrado: ${dirPath}`, 'red');
    return;
  }
  
  log(`\n🔍 Buscando imagens em: ${dirPath}`, 'yellow');
  
  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return CONFIG.formats.includes(ext);
  });
  
  if (imageFiles.length === 0) {
    log('⚠️  Nenhuma imagem encontrada para processar', 'yellow');
    return;
  }
  
  log(`\n📦 Processando ${imageFiles.length} imagem(ns)...\n`, 'blue');
  
  let totalSavings = 0;
  let successCount = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(dirPath, file);
    const outputPath = path.join(
      dirPath,
      path.basename(file, path.extname(file)) + '.webp'
    );
    
    // Pula se WebP já existe e é mais recente
    if (fs.existsSync(outputPath)) {
      const inputTime = fs.statSync(inputPath).mtime;
      const outputTime = fs.statSync(outputPath).mtime;
      
      if (outputTime > inputTime) {
        log(`  ⊘ ${file} (WebP já existe e está atualizado)`, 'yellow');
        continue;
      }
    }
    
    const result = await optimizeImage(inputPath, outputPath);
    if (result.success) {
      successCount++;
      totalSavings += result.savings;
    }
  }
  
  log(`\n✨ Concluído!`, 'green');
  log(`   ${successCount}/${imageFiles.length} imagens otimizadas`, 'green');
  log(`   Economia total: ${formatBytes(totalSavings)}`, 'green');
  
  // Dicas
  log(`\n💡 Dicas:`, 'blue');
  log(`   - Use <OptimizedImage> component para carregar as imagens`, 'blue');
  log(`   - As imagens originais foram mantidas (podem ser deletadas se desejar)`, 'blue');
  log(`   - Configure lazy loading para imagens fora do viewport inicial`, 'blue');
}

// Main
async function main() {
  const targetDir = process.argv[2] || 'public/images/salon-examples';
  
  log('🖼️  Image Optimizer', 'blue');
  log('━'.repeat(50), 'blue');
  
  if (!checkDependencies()) {
    process.exit(1);
  }
  
  await processDirectory(targetDir);
}

main().catch(error => {
  log(`\n❌ Erro fatal: ${error.message}`, 'red');
  process.exit(1);
});
