#!/usr/bin/env node

/**
 * Run this script to automatically fix most ESLint errors and warnings
 */
const { execSync } = require('child_process');

console.log('🔧 Running ESLint auto-fixes...');

try {
  // Define which rules to fix strictly (as errors)
  const strictRules = [
    'no-undef',
    'import/order'
  ];

  // 1. Fix undefined React/JSX issues
  console.log('\n🔍 Step 1/3: Adding React imports where needed...');
  execSync('node eslint-fix-scripts/fix-react-jsx.js', { stdio: 'inherit' });

  // 2. Fix unused imports and variables
  console.log('\n🔍 Step 2/3: Fixing unused imports and variables...');
  execSync('npx eslint --fix --rule "@typescript-eslint/no-unused-vars:warn" .', { stdio: 'inherit' });

  // 3. Run general ESLint fixes
  console.log('\n🔍 Step 3/3: Running general ESLint fixes...');
  execSync('npx eslint --fix .', { stdio: 'inherit' });

  console.log('\n✅ ESLint auto-fixes completed!');
  console.log('\nℹ️ Note: Some warnings may still remain, especially React Hooks dependencies.');
  console.log('For Hook dependency warnings, manually check each case as automatic fixes might cause side effects.');
} catch (error) {
  console.error('\n❌ Error during ESLint fixes:', error.message);
  console.log('Some files may have been fixed successfully before the error occurred.');
}
