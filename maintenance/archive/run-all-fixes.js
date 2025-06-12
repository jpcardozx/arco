#!/usr/bin/env node

/**
 * Script to run all ESLint fixes in sequence
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔍 Starting ESLint auto-fix process...\n');

// Step 1: Install any missing dependencies
try {
  console.log('Checking for required dependencies...');
  execSync('npm list glob || npm install glob --save-dev', { stdio: 'inherit' });
  console.log('✅ Dependencies checked\n');
} catch (error) {
  console.warn('⚠️ Warning when checking dependencies (continuing anyway):', error.message);
}

// Step 2: Fix React/JSX not defined issues first
try {
  console.log('Step 1/4: Adding React imports where needed...');
  execSync('node eslint-fix-scripts/fix-react-jsx.js', { stdio: 'inherit' });
  console.log('✅ React import fixes completed\n');
} catch (error) {
  console.error('❌ Error in React import fixes:', error.message);
}

// Step 3: Fix unused imports and variables
try {
  console.log('Step 2/4: Fixing unused imports and variables...');
  execSync('npx eslint --fix --rule "@typescript-eslint/no-unused-vars:1" .', { stdio: 'inherit' });
  console.log('✅ Unused imports and variables fixed\n');
} catch (error) {
  console.error('❌ Error fixing unused imports and variables:', error.message);
}

// Step 4: Fix import order
try {
  console.log('Step 3/4: Fixing import order issues...');
  execSync('npx eslint --fix --rule "import/order:1" .', { stdio: 'inherit' });
  console.log('✅ Import order issues fixed\n');
} catch (error) {
  console.error('❌ Error fixing import order issues:', error.message);
}

// Step 5: Run general ESLint fixes
try {
  console.log('Step 4/4: Running general ESLint fixes...');
  execSync('npx eslint --fix .', { stdio: 'inherit' });
  console.log('✅ General ESLint fixes completed\n');
} catch (error) {
  console.error('❌ Error in general ESLint fixes (some warnings may remain):', error.message);
}

// Final: Report remaining issues
try {
  console.log('Analyzing remaining issues...');
  const output = execSync('npx eslint . --format json', { encoding: 'utf8' });
  const results = JSON.parse(output);
  
  // Count remaining warnings by rule
  const warnings = {};
  
  results.forEach(file => {
    file.messages.forEach(msg => {
      const rule = msg.ruleId || 'unknown';
      warnings[rule] = (warnings[rule] || 0) + 1;
    });
  });
  
  // Sort warnings by count
  const sortedWarnings = Object.entries(warnings)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 0);
  
  if (sortedWarnings.length > 0) {
    console.log('\n🔍 Remaining warnings by rule:');
    sortedWarnings.forEach(([rule, count]) => {
      console.log(`  - ${rule}: ${count} warnings`);
    });
    
    console.log('\n⚠️ Some warnings still remain. See above for details.');
    console.log('For React Hooks dependency warnings, run: node eslint-fix-scripts/analyze-hooks-deps.js');
  } else {
    console.log('✨ All ESLint issues have been fixed!');
  }
} catch (error) {
  console.error('❌ Error analyzing remaining issues:', error.message);
}

console.log('\n🎉 ESLint auto-fix process completed!');
