#!/usr/bin/env node
/**
 * LP Performance Validator
 * 
 * Valida:
 * - Tamanho de bundle
 * - Lazy loading correto
 * - Componentes críticos acima do fold
 * - Scripts inline otimizados
 * 
 * Execute: node scripts/validate-lp-performance.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 Validando performance da Landing Page...\n');

let errors = 0;
let warnings = 0;

// 1. Verificar lazy loading
console.log('📦 Verificando lazy loading...');
const templatePath = path.join(projectRoot, 'src/components/landing/LandingPageTemplate.tsx');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

const lazyLoadedComponents = ['ProofSection', 'ValueInvestmentSection', 'CaptureSection'];
lazyLoadedComponents.forEach(component => {
  if (templateContent.includes(`import { ${component} }`) && !templateContent.includes('dynamic')) {
    console.log(`  ⚠️  ${component} deveria ser lazy loaded`);
    warnings++;
  } else if (templateContent.includes(`const ${component} = dynamic`)) {
    console.log(`  ✅ ${component} está lazy loaded`);
  }
});

// 2. Verificar eager loading de componentes críticos
console.log('\n⚡ Verificando componentes críticos (eager)...');
const eagerComponents = ['HeroSection', 'HowItWorksSection'];
eagerComponents.forEach(component => {
  const isDynamic = templateContent.match(new RegExp(`const ${component} = dynamic`, 'g'));
  const isImported = templateContent.match(new RegExp(`import.*${component}.*from`, 'g'));
  
  if (isDynamic) {
    console.log(`  ❌ ${component} NÃO deveria ser lazy loaded (acima do fold)`);
    errors++;
  } else if (isImported) {
    console.log(`  ✅ ${component} está eager loaded`);
  } else {
    console.log(`  ⚠️  ${component} não encontrado`);
    warnings++;
  }
});

// 3. Verificar Meta Pixel (server-safe)
console.log('\n🎯 Verificando Meta Pixel...');
const layoutPath = path.join(projectRoot, 'src/app/layout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

if (layoutContent.includes('getMetaPixelScript()')) {
  console.log('  ❌ getMetaPixelScript() não deve ser chamado (server-side)');
  errors++;
} else if (layoutContent.includes('<MetaPixelScript />')) {
  console.log('  ✅ MetaPixelScript component (server-safe)');
} else {
  console.log('  ⚠️  Meta Pixel não encontrado');
  warnings++;
}

// 4. Verificar imports duplicados
console.log('\n🔄 Verificando imports duplicados...');
const srcFiles = fs.readdirSync(path.join(projectRoot, 'src/app'), { recursive: true })
  .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
  .map(f => path.join(projectRoot, 'src/app', f));

srcFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const imports = content.match(/^import .* from .*/gm) || [];
  const importMap = new Map();
  
  imports.forEach(imp => {
    const module = imp.match(/from ['"](.+)['"]/)?.[1];
    if (module) {
      if (importMap.has(module)) {
        console.log(`  ⚠️  Import duplicado: ${module} em ${path.basename(file)}`);
        warnings++;
      }
      importMap.set(module, true);
    }
  });
});

// 5. Verificar tamanho de arquivos críticos
console.log('\n📏 Verificando tamanho de componentes...');
const criticalComponents = [
  'src/components/landing/LandingPageTemplate.tsx',
  'src/components/landing/sections/HeroSection.tsx',
  'src/components/landing/sections/ProofSection.tsx',
];

criticalComponents.forEach(comp => {
  const filePath = path.join(projectRoot, comp);
  if (fs.existsSync(filePath)) {
    const size = fs.statSync(filePath).size;
    const sizeKB = (size / 1024).toFixed(2);
    
    if (size > 50 * 1024) {
      console.log(`  ⚠️  ${path.basename(comp)}: ${sizeKB}KB (considere split)`);
      warnings++;
    } else {
      console.log(`  ✅ ${path.basename(comp)}: ${sizeKB}KB`);
    }
  }
});

// Resumo
console.log('\n' + '='.repeat(50));
console.log(`✅ Erros: ${errors}`);
console.log(`⚠️  Warnings: ${warnings}`);
console.log('='.repeat(50));

if (errors > 0) {
  console.log('\n❌ Validação falhou. Corrija os erros acima.');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️  Validação passou com warnings.');
  process.exit(0);
} else {
  console.log('\n✅ Validação passou perfeitamente!');
  process.exit(0);
}
