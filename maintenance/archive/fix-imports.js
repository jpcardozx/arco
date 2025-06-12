const fs = require('fs');
const path = require('path');

const { glob } = require('glob');

const PROJECT_ROOT = path.resolve(__dirname, '..');
console.log('Project root:', PROJECT_ROOT);

// Mapeamento das importações antigas para as novas
const IMPORT_MAPPINGS = {
  '@/lib/ui-utils': '@/lib/utils/ui-utils',
  '@/lib/i18n-context': '@/lib/context/i18n-context',
  '@/lib/i18n-context.js': '@/lib/context/i18n-context',
  '@/lib/user-preferences-context': '@/lib/context/user-preferences-context',
  '@/lib/with-translation': '@/lib/utils/with-translation',
  '@/lib/analytics': '@/lib/utils/analytics',
  '@/lib/language-utils': '@/lib/utils/language-utils',
  '@/lib/path-utils': '@/lib/utils/path-utils',

  // Componentes de UI
  '@/components/ui/DesignSystem': '@/components/features/DesignSystem',
  '@/components/ui/language-switcher': '@/components/features/language-switcher',
  '@/components/ui/button': '@/components/features/button',
  '@/components/ui/card': '@/components/features/card',
  '@/components/ui/section': '@/components/features/section',
  '@/components/ui/theme-provider': '@/components/features/theme-provider',
  '@/components/ui/toast': '@/components/features/toast',
  
  // Componentes principais
  '@/components/NavBarEnhanced': '@/components/features/NavBarEnhanced',
  '@/components/NavBar': '@/components/features/NavBar',
  '@/components/DesignCompare': '@/components/features/DesignCompare',
  '@/components/HeroARCOEnhanced': '@/components/sections/HeroARCOEnhanced',
  '@/components/HeroARCORevised': '@/components/sections/HeroARCORevised',
  '@/components/CaseStudiesEnhanced': '@/components/features/CaseStudiesEnhanced',
  '@/components/ProcessEnhanced': '@/components/features/ProcessEnhanced',
  '@/components/EnhancedCTA': '@/components/sections/EnhancedCTA',
  '@/components/FooterARCORevised': '@/components/layout/FooterARCORevised',
  '@/components/DesignCompareRefined': '@/components/features/DesignCompareRefined',
  '@/components/HomepageLayout': '@/components/layout/HomepageLayout',
  '@/components/SymbolicAnchorRevised': '@/components/features/SymbolicAnchorRevised',
  '@/components/TheMisalignmentRevised': '@/components/features/TheMisalignmentRevised',
  '@/components/EditorialCTARevised': '@/components/sections/EditorialCTARevised',
  '@/components/HomepageFinalCodaRevised': '@/components/features/HomepageFinalCodaRevised',
  '@/components/SymbolicVerdictsRevised': '@/components/features/SymbolicVerdictsRevised',
  '@/components/IntegrationController': '@/components/features/IntegrationController',
  '@/components/CTAButton': '@/components/sections/CTAButton',
  
  // Componentes enhanced
  '@/components/enhanced/MarketHero': '@/components/sections/MarketHero',
  '@/components/enhanced/ValuePropositioning': '@/components/features/ValuePropositioning',
  '@/components/enhanced/PerceptionGapAnalyzer': '@/components/features/PerceptionGapAnalyzer',
  '@/components/enhanced/ClientTestimonials': '@/components/features/ClientTestimonials',
  
  // Módulos especiais
  './i18n-context': '@/lib/context/i18n-context',
  './user-preferences': '@/lib/utils/user-preferences',
  './analytics': '@/lib/utils/analytics',
};

// Extensões de arquivos a processar
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

// Função para atualizar caminhos de importação em um arquivo
function updateImportPaths(filePath) {
  try {
    // Ler o arquivo
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Processar cada mapeamento
    Object.entries(IMPORT_MAPPINGS).forEach(([oldPath, newPath]) => {
      // Regex para detectar diferentes formatos de importação
      const importRegex = new RegExp(`(from\\s+['"])${oldPath.replace(/\//g, '\\/').replace(/\./g, '\\.')}(['"])`, 'g');
      const importRegex2 = new RegExp(`(import\\s+['"])${oldPath.replace(/\//g, '\\/').replace(/\./g, '\\.')}(['"])`, 'g');
      
      // Verificar se há correspondências antes de substituir
      if (importRegex.test(content) || importRegex2.test(content)) {
        const updatedContent = content
          .replace(importRegex, `$1${newPath}$2`)
          .replace(importRegex2, `$1${newPath}$2`);
        
        if (content !== updatedContent) {
          content = updatedContent;
          hasChanges = true;
        }
      }
    });
    
    // Se houver mudanças, salvar o arquivo atualizado
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Atualizadas importações em: ${path.relative(PROJECT_ROOT, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função para processar todos os arquivos do projeto
async function processAllFiles() {
  try {
    // Encontrar todos os arquivos com as extensões especificadas
    const files = await glob('**/*.{ts,tsx,js,jsx}', {
      cwd: PROJECT_ROOT,
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/scripts/fix-imports.js', '**/.next/**'],
      absolute: true
    });
    
    console.log(`🔍 Encontrados ${files.length} arquivos para verificar...`);
    
    let updatedFiles = 0;
    
    // Processar cada arquivo
    files.forEach(file => {
      if (updateImportPaths(file)) {
        updatedFiles++;
      }
    });
    
    console.log(`✨ Processo concluído! Atualizados ${updatedFiles} arquivos.`);
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error);
  }
}

// Executar o script
processAllFiles().catch(err => {
  console.error('Erro na execução do script:', err);
});
