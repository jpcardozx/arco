// Script para corrigir erros específicos de React Hooks
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Iniciando correção de erros de React Hooks');

// 1. Corrigir problemas de useState não desestruturado
function fixUseStateDestructuring() {
  console.log('🧹 Corrigindo casos de useState não desestruturado...');
  
  const files = glob.sync('**/*.{tsx,jsx}', {
    ignore: ['node_modules/**', '.next/**', 'out/**', 'public/**']
  });

  let fixCount = 0;

  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Encontrar padrões de useState não desestruturado
      const useStateRegex = /const\s+(\w+)\s*=\s*useState\(([^)]*)\)/g;
      const matches = content.matchAll(useStateRegex);
      
      for (const match of Array.from(matches)) {
        const fullMatch = match[0];
        const variableName = match[1];
        const initialValue = match[2];
        
        // Gerar nome para o setter
        const setterName = `set${variableName.charAt(0).toUpperCase() + variableName.slice(1)}`;
        
        // Substituir por versão desestruturada
        const replacement = `const [${variableName}, ${setterName}] = useState(${initialValue})`;
        content = content.replace(fullMatch, replacement);
        
        fixCount++;
      }
      
      fs.writeFileSync(file, content);
    } catch (error) {
      console.error(`Erro ao processar o arquivo ${file}:`, error);
    }
  });
  
  console.log(`✅ Corrigidos ${fixCount} casos de useState não desestruturado`);
}

// 2. Corrigir problemas de useEffect com dependências ausentes
function fixUseEffectDependencies() {
  console.log('🧹 Corrigindo casos de useEffect com dependências ausentes...');
  
  const files = glob.sync('**/*.{tsx,jsx}', {
    ignore: ['node_modules/**', '.next/**', 'out/**', 'public/**']
  });

  let fixCount = 0;

  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Processar casos específicos que sabemos que precisam ser corrigidos
      
      // Caso HeroARCOEnhanced.tsx
      if (file.includes('HeroARCOEnhanced.tsx') || file.includes('MarketHero.tsx')) {
        // Ajustar dependências do useEffect para incluir clientStats/marketMetrics
        content = content.replace(
          /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?setInterval[\s\S]*?clearInterval[\s\S]*?}\s*,\s*\[\s*\]\s*\)/g,
          (match) => {
            if (file.includes('HeroARCOEnhanced.tsx')) {
              return match.replace(/\[\s*\]/, '[clientStats]');
            } else if (file.includes('MarketHero.tsx')) {
              return match.replace(/\[\s*\]/, '[marketMetrics]');
            }
            return match;
          }
        );
        fixCount++;
      }
      
      // Caso PerceptionGapAnalyzer.tsx
      if (file.includes('PerceptionGapAnalyzer.tsx')) {
        content = content.replace(
          /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?calculatePerceptionGap[\s\S]*?calculateRevenueGap[\s\S]*?}\s*,\s*\[\s*\]\s*\)/g,
          (match) => {
            return match.replace(/\[\s*\]/, '[calculatePerceptionGap, calculateRevenueGap]');
          }
        );
        fixCount++;
      }
      
      // Caso StrategicDiagnosticTool.tsx
      if (file.includes('StrategicDiagnosticTool.tsx')) {
        content = content.replace(
          /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?calculateResult[\s\S]*?showResults[\s\S]*?}\s*,\s*\[\s*\]\s*\)/g,
          (match) => {
            return match.replace(/\[\s*\]/, '[calculateResult, showResults]');
          }
        );
        fixCount++;
      }
      
      fs.writeFileSync(file, content);
    } catch (error) {
      console.error(`Erro ao processar o arquivo ${file}:`, error);
    }
  });
  
  console.log(`✅ Corrigidos ${fixCount} casos de useEffect com dependências ausentes`);
}

// Executar as correções
fixUseStateDestructuring();
fixUseEffectDependencies();

console.log('🎉 Processo de correção de erros de React Hooks concluído');
