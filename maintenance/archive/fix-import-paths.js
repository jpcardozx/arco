/**
 * Script to fix import issues in the ARCO project
 * This focuses on fixing the problematic imports from '../../../lib/utils/ui-utils'
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔍 Finding components with incorrect utility imports...');

// Process all the feature components
const featureFiles = glob.sync('src/components/features/**/*.{ts,tsx}');

let totalFixedFiles = 0;

featureFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  let modified = false;
  
  // Fix imports for ui-utils
  if (content.includes('../../../lib/utils/ui-utils')) {
    content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/lib\/utils\/ui-utils['"]/g, 'from \'@/lib/utils/ui-utils\'');
    modified = true;
    console.log(`✅ Fixed ui-utils import in ${file}`);
  }
  
  // Fix imports for i18n-context
  if (content.includes('../../../lib/context/i18n-context')) {
    content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/lib\/context\/i18n-context['"]/g, 'from \'@/lib/context/i18n-context\'');
    modified = true;
    console.log(`✅ Fixed i18n-context import in ${file}`);
  }
  
  // Fix imports for analytics
  if (content.includes('../../../lib/utils/analytics')) {
    content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/lib\/utils\/analytics['"]/g, 'from \'@/lib/utils/analytics\'');
    modified = true;
    console.log(`✅ Fixed analytics import in ${file}`);
  }

  // Fix imports for ../ui/heading and other UI components
  if (content.includes('../ui/heading')) {
    content = content.replace(/from\s+['"]\.\.\/ui\/heading['"]/g, 'from \'@/components/ui/heading\'');
    modified = true;
    console.log(`✅ Fixed heading import in ${file}`);
  }

  // Fix imports for CTAButton
  if (content.includes('../../../components/sections/CTAButton')) {
    content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/components\/sections\/CTAButton['"]/g, 'from \'@/components/sections/CTAButton\'');
    modified = true;
    console.log(`✅ Fixed CTAButton import in ${file}`);
  }

  // Fix imports for ../enhanced/MarketHero
  if (content.includes('../enhanced/MarketHero')) {
    content = content.replace(/from\s+['"]\.\.\/enhanced\/MarketHero['"]/g, 'from \'@/components/enhanced/MarketHero\'');
    modified = true;
    console.log(`✅ Fixed MarketHero import in ${file}`);
  }

  // Fix imports for next-themes/dist/types
  if (content.includes('next-themes/dist/types')) {
    content = content.replace(/from\s+['"]next-themes\/dist\/types['"]/g, 'from \'next-themes\'');
    modified = true;
    console.log(`✅ Fixed next-themes import in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(file, content);
    totalFixedFiles++;
  }
});

// Process layout components that may need fixes
const layoutFiles = glob.sync('src/components/layout/**/*.{ts,tsx}');

layoutFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  let modified = false;
  
  // Fix imports for DesignSystem
  if (content.includes('../../features/features/DesignSystem')) {
    content = content.replace(/from\s+['"]\.\.\/\.\.\/features\/features\/DesignSystem['"]/g, 'from \'@/components/features/DesignSystem\'');
    modified = true;
    console.log(`✅ Fixed DesignSystem import in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(file, content);
    totalFixedFiles++;
  }
});

// Process components/sections files
const sectionsFiles = glob.sync('src/components/components/sections/**/*.{ts,tsx}');
sectionsFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  let modified = false;

  // Fix imports for DesignSystem in sections
  if (content.includes('../../features/features/DesignSystem')) {
    content = content.replace(/from\s+['"]\.\.\/\.\.\/features\/features\/DesignSystem['"]/g, 'from \'@/components/features/DesignSystem\'');
    modified = true;
    console.log(`✅ Fixed DesignSystem import in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(file, content);
    totalFixedFiles++;
  }
});

console.log(`\n🎉 Fixed imports in ${totalFixedFiles} files`);
console.log('Run the TypeScript compiler to verify the fixes');
