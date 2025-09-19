/**
 * Script to fix incorrect imports in feature components where they're importing
 * from './features/DesignSystem' and should be importing from '../features/DesignSystem'
 * or directly from '@/components/ui'
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔍 Finding components with incorrect imports...');

// Get all feature component files
const featureFiles = glob.sync('src/components/features/**/*.{ts,tsx}');

let totalFixedFiles = 0;

featureFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  let modified = false;
    // Fix import paths for feature components importing from './features/DesignSystem'
  if (content.includes('./features/DesignSystem')) {
    content = content.replace(/from\s+['"]\.\/features\/DesignSystem['"]/g, 'from \'../features/DesignSystem\'');
    modified = true;
    console.log(`✅ Fixed DesignSystem import in ${file}`);
  }
  
  // Fix Button import paths from './features/button'
  if (content.includes('./features/button')) {
    content = content.replace(/from\s+['"]\.\/features\/button['"]/g, 'from \'./button\'');
    modified = true;
    console.log(`✅ Fixed Button import in ${file} from ./features/button to ./button`);
  }
  
  // Fix import paths from '@/components/ui/button' when there are properties like leftIcon, rightIcon
  if (content.includes('@/components/ui/button') || content.includes('@/components/ui/Button')) {
    // If using properties like leftIcon, rightIcon, etc., change to import from '../features/button'
    if (content.includes('leftIcon') || content.includes('rightIcon') || content.includes('loading')) {
      content = content.replace(/from\s+['"]@\/components\/ui\/[bB]utton['"]/g, 'from \'../features/button\'');
      modified = true;
      console.log(`✅ Fixed Button import in ${file} to use enhanced button`);
    }
  }
  
  // Fix import paths for ui-utils
  if (content.includes('@/lib/utils') && !content.includes('@/lib/utils/ui-utils')) {
    content = content.replace(/from\s+['"]@\/lib\/utils['"]/g, 'from \'../../../lib/utils/ui-utils\'');
    modified = true;
    console.log(`✅ Fixed utils import in ${file}`);
  }
  
  // Fix imports from ui components
  if (content.includes('@/components/ui')) {
    // If using Card component
    if (content.includes('Card') || content.includes('CardHeader') || content.includes('CardContent')) {
      content = content.replace(/from\s+['"]@\/components\/ui['"]/g, 'from \'../ui\'');
      modified = true;
      console.log(`✅ Fixed UI component imports in ${file}`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(file, content);
    totalFixedFiles++;
  }
});

console.log(`\n🎉 Fixed imports in ${totalFixedFiles} files`);
console.log('Run the development server to verify the fixes.');
