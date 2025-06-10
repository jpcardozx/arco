import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const componentsDir = path.join(process.cwd(), 'components');

// Mapeamento de componentes para suas novas pastas
const componentMapping = {
  // Layout components
  'NavBar.tsx': 'layout',
  'NavBarEnhanced.tsx': 'layout',
  'FooterARCO.tsx': 'layout',
  'FooterARCORevised.tsx': 'layout',
  'HomepageLayout.tsx': 'layout',
  
  // Hero components
  'HeroARCO.tsx': 'heroes',
  'HeroARCOEnhanced.tsx': 'heroes',
  'HeroARCORevised.tsx': 'heroes',
  
  // CTA components
  'CTAButton.tsx': 'cta',
  'EditorialCTA.tsx': 'cta',
  'EditorialCTARevised.tsx': 'cta',
  'EnhancedCTA.tsx': 'cta',
  
  // UI components
  'BackgroundImage.tsx': 'ui',
  'LanguageSelector.tsx': 'ui',
  'SymbolicAnchor.tsx': 'ui',
  'SymbolicAnchorRevised.tsx': 'ui',
  
  // Feature components
  'DesignCompare.tsx': 'features',
  'DesignCompareRefined.tsx': 'features',
  'ProcessEnhanced.tsx': 'features',
  'TheMisalignment.tsx': 'features',
  'TheMisalignmentRevised.tsx': 'features',
  
  // Core components
  'AnalyticsProvider.tsx': 'core',
  'IntegrationController.tsx': 'core',
  'MultilangMetadata.tsx': 'core',
  'StructuredData.tsx': 'core',
};

// Criar diretórios necessários
Object.values(componentMapping).forEach(dir => {
  const fullPath = path.join(componentsDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(chalk.green(`✓ Created directory: ${dir}`));
  }
});

// Mover componentes para suas novas localizações
Object.entries(componentMapping).forEach(([file, targetDir]) => {
  const sourcePath = path.join(componentsDir, file);
  const targetPath = path.join(componentsDir, targetDir, file);
  
  if (fs.existsSync(sourcePath)) {
    try {
      fs.renameSync(sourcePath, targetPath);
      console.log(chalk.blue(`✓ Moved ${file} to ${targetDir}/`));
    } catch (error) {
      console.error(chalk.red(`✗ Error moving ${file}: ${error.message}`));
    }
  } else {
    console.log(chalk.yellow(`! File not found: ${file}`));
  }
});

console.log(chalk.green('\n✓ Component reorganization completed!'));
