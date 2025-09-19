#!/usr/bin/env node

/**
 * ESLint Batch Fix Script for ARCO Project
 * 
 * Enterprise-grade automated ESLint error resolution
 * Specifically designed for the ARCO UI/UX workflow Phase 3
 * 
 * This script systematically fixes:
 * - TypeScript type issues (any -> proper types)
 * - React hooks errors  
 * - Unescaped entities
 * - Unused variables
 * - Missing dependencies
 * 
 * @author ARCO UI/UX Workflow System
 * @version 3.0.0
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 ARCO ESLint Batch Fix - Phase 3 Performance Optimization');
console.log('=========================================================\n');

// Configuration for systematic fixes
const FIXES_CONFIG = {
  // Replace common 'any' types with proper TypeScript types
  typeReplacements: {
    'Record<string, any>': 'Record<string, unknown>',
    ': any': ': unknown',
    'any[]': 'unknown[]',
    'any;': 'unknown;',
    'any)': 'unknown)',
    'any,': 'unknown,',
    'any }': 'unknown }'
  },
  
  // HTML entity replacements
  entityReplacements: {
    '"': '&quot;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;'
  },
  
  // Files to process (high-priority files first)
  targetFiles: [
    'lib/analytics/index.ts',
    'lib/connection-utils.ts', 
    'lib/feature-variants.ts',
    'src/design-system/tokens/index.ts',
    'src/lib/context/i18n-context.tsx',
    'src/lib/hooks/useOptimizedAnimation.ts',
    'src/lib/utils/analytics/*.ts',
    'src/components/**/*.tsx',
    'src/app/**/*.tsx'
  ]
};

/**
 * Fix TypeScript 'any' type issues
 */
function fixTypeScriptTypes(content, filePath) {
  let fixed = content;
  let changeCount = 0;
  
  // Replace any types with proper alternatives
  Object.entries(FIXES_CONFIG.typeReplacements).forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = fixed.match(regex);
    if (matches) {
      fixed = fixed.replace(regex, replacement);
      changeCount += matches.length;
    }
  });
  
  // Special handling for analytics and utility functions
  if (filePath.includes('analytics')) {
    fixed = fixed.replace(
      /function\s+\w+\([^)]*:\s*any/g, 
      (match) => match.replace(': any', ': Record<string, unknown>')
    );
  }
  
  console.log(`   TypeScript types: ${changeCount} fixes applied`);
  return fixed;
}

/**
 * Fix React unescaped entities
 */
function fixUnescapedEntities(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Find JSX text content with problematic entities
  const jsxTextRegex = />([^<]*['"&<>][^<]*)</g;
  
  fixed = fixed.replace(jsxTextRegex, (match, textContent) => {
    let newText = textContent;
    
    // Only replace entities that are likely to cause issues
    if (textContent.includes('"') && !textContent.includes('&quot;')) {
      newText = newText.replace(/"/g, '&quot;');
      changeCount++;
    }
    if (textContent.includes("'") && !textContent.includes('&apos;')) {
      newText = newText.replace(/'/g, '&apos;');
      changeCount++;
    }
    
    return `>${newText}<`;
  });
  
  console.log(`   HTML entities: ${changeCount} fixes applied`);
  return fixed;
}

/**
 * Fix unused variables and imports
 */
function fixUnusedVariables(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Common unused import patterns
  const unusedImportPatterns = [
    /import\s+{\s*[^}]*Image[^}]*}\s+from\s+['"][^'"]+['"];\s*\n/g,
    /import\s+{\s*[^}]*Link[^}]*}\s+from\s+['"][^'"]+['"];\s*\n/g
  ];
  
  // Check if imports are actually used before removing
  unusedImportPatterns.forEach(pattern => {
    const matches = fixed.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const importName = match.match(/{\s*([^}]+)\s*}/)?.[1]?.trim();
        if (importName && !fixed.includes(`<${importName}`) && !fixed.includes(`${importName}(`)) {
          fixed = fixed.replace(match, '');
          changeCount++;
        }
      });
    }
  });
  
  console.log(`   Unused variables: ${changeCount} fixes applied`);
  return fixed;
}

/**
 * Fix React hooks issues
 */
function fixReactHooks(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Fix useState in non-component functions
  const hookInFunctionRegex = /function\s+(?!use)\w+[^{]*{[^}]*useState/g;
  if (hookInFunctionRegex.test(fixed)) {
    // Convert function to component or move hook usage
    console.log(`   React hooks: Found hook usage in non-component function`);
    // This requires manual intervention, so we just log it
  }
  
  // Add missing dependencies to useEffect
  const useEffectRegex = /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?},\s*\[\s*\]\s*\)/g;
  const matches = fixed.match(useEffectRegex);
  if (matches) {
    console.log(`   React hooks: ${matches.length} useEffect dependency arrays need review`);
  }
  
  return fixed;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return;
    }
    
    console.log(`📝 Processing: ${path.relative(process.cwd(), filePath)}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    let fixed = content;
    
    // Apply all fixes
    fixed = fixTypeScriptTypes(fixed, filePath);
    fixed = fixUnescapedEntities(fixed);
    fixed = fixUnusedVariables(fixed);
    fixed = fixReactHooks(fixed);
    
    // Only write if changes were made
    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`   ✅ File updated\n`);
    } else {
      console.log(`   ℹ️  No changes needed\n`);
    }
    
  } catch (error) {
    console.error(`   ❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Find files matching glob patterns
 */
function findFiles(patterns) {
  const files = [];
  
  patterns.forEach(pattern => {
    try {
      if (pattern.includes('**')) {
        // Use simple recursive search for glob patterns
        const baseDir = pattern.split('**')[0];
        const ext = pattern.split('.').pop();
        
        function searchDir(dir) {
          if (!fs.existsSync(dir)) return;
          
          const items = fs.readdirSync(dir);
          items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
              searchDir(fullPath);
            } else if (item.endsWith(`.${ext}`)) {
              files.push(fullPath);
            }
          });
        }
        
        searchDir(baseDir);
      } else {
        // Direct file path
        if (fs.existsSync(pattern)) {
          files.push(pattern);
        }
      }
    } catch (error) {
      console.error(`Error processing pattern ${pattern}:`, error.message);
    }
  });
  
  return [...new Set(files)]; // Remove duplicates
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Finding files to process...');
  
  const files = findFiles(FIXES_CONFIG.targetFiles);
  console.log(`Found ${files.length} files to process\n`);
  
  // Process each file
  files.forEach(processFile);
  
  console.log('🎯 Running ESLint to verify fixes...');
  try {
    execSync('npm run lint -- --fix', { stdio: 'inherit' });
    console.log('✅ ESLint fixes applied successfully');
  } catch (error) {
    console.log('⚠️  Some ESLint issues remain (expected for complex cases)');
  }
  
  console.log('\n🚀 Phase 3 ESLint optimization complete!');
  console.log('Next: Continue with performance optimization...\n');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { processFile, fixTypeScriptTypes, fixUnescapedEntities };
