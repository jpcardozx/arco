/**
 * Script to automatically fix unused imports and variables
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run ESLint fix
try {
  console.log('Fixing unused imports and variables...');
  execSync('npx eslint --fix --rule "@typescript-eslint/no-unused-vars: error" .', { stdio: 'inherit' });
  console.log('✅ Unused imports and variables fixed');
} catch (error) {
  console.error('❌ Error fixing unused imports and variables:', error.message);
}
