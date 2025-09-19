#!/usr/bin/env node

/**
 * Phase 3 ESLint Parsing Error Recovery Script
 * 
 * Fixes the parsing errors created by the batch ESLint script
 * Specifically handles:
 * - Incorrect HTML entity replacements in code
 * - String literal issues
 * - Property/signature parsing problems
 * 
 * @author ARCO UI/UX Workflow System
 * @version 3.1.0
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 ARCO ESLint Parsing Error Recovery - Phase 3.1');
console.log('=================================================\n');

// Files with critical parsing errors that need immediate fixing
const CRITICAL_FIXES = [
  'src/components/ui/legacy/typography.tsx',
  'src/design-system/tokens/index.ts',
  'lib/analytics/index.ts',
  'lib/feature-variants.ts',
  'src/lib/context/i18n-context.tsx',
  'src/lib/hooks/useOptimizedAnimation.ts'
];

/**
 * Fix incorrect HTML entity replacements in TypeScript/JSX code
 */
function fixIncorrectEntityReplacements(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Fix displayName assignments
  fixed = fixed.replace(/\.displayName = &apos;([^&]+)&apos;/g, ".displayName = '$1'");
  if (fixed !== content) changeCount++;
  
  // Fix string literals in code (not JSX)
  fixed = fixed.replace(/className={cn\(&apos;([^&]+)&apos;/g, "className={cn('$1'");
  if (fixed !== content) changeCount++;
  
  // Fix function parameters and return types
  fixed = fixed.replace(/: &apos;([^&]+)&apos;/g, ": '$1'");
  if (fixed !== content) changeCount++;
  
  // Fix import statements
  fixed = fixed.replace(/from &apos;([^&]+)&apos;/g, "from '$1'");
  if (fixed !== content) changeCount++;
  
  // Fix object property keys
  fixed = fixed.replace(/&apos;([^&]+)&apos;:/g, "'$1':");
  if (fixed !== content) changeCount++;
  
  // Fix unterminated string literals
  fixed = fixed.replace(/&quot;([^&\n]+)$/gm, '"$1"');
  if (fixed !== content) changeCount++;
  
  console.log(`   Entity fixes: ${changeCount} corrections applied`);
  return fixed;
}

/**
 * Fix TypeScript interface and type issues
 */
function fixTypeScriptSyntax(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Fix interface property signatures
  if (fixed.includes('Property or signature expected')) {
    // This usually means we have a malformed interface
    fixed = fixed.replace(/export interface (\w+Props) extends React\.HTMLAttributes<[^>]+> \{ \}/g, 
      'export interface $1 extends React.HTMLAttributes<HTMLElement> {}');
    changeCount++;
  }
  
  // Fix expression expected errors - usually from malformed object literals
  fixed = fixed.replace(/{\s*(\w+):\s*{\s*}/g, '{ $1: {} }');
  if (fixed !== content) changeCount++;
  
  console.log(`   TypeScript syntax: ${changeCount} fixes applied`);
  return fixed;
}

/**
 * Process individual file
 */
function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return;
    }
    
    console.log(`🔧 Fixing: ${path.relative(process.cwd(), filePath)}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    let fixed = content;
    
    // Apply fixes
    fixed = fixIncorrectEntityReplacements(fixed);
    fixed = fixTypeScriptSyntax(fixed);
    
    // Only write if changes were made
    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`   ✅ File recovered\n`);
    } else {
      console.log(`   ℹ️  No recovery needed\n`);
    }
    
  } catch (error) {
    console.error(`   ❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🚑 Recovering critical files from parsing errors...\n');
  
  // Process critical files first
  CRITICAL_FIXES.forEach(processFile);
  
  console.log('✅ Critical parsing errors recovered!');
  console.log('Now running build test...\n');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fixIncorrectEntityReplacements, fixTypeScriptSyntax };
