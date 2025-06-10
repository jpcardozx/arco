/**
 * Script to automatically fix import order issues
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run ESLint fix for import order
try {
  console.log('Fixing import order issues...');
  execSync('npx eslint --fix --rule "import/order: error" .', { stdio: 'inherit' });
  console.log('✅ Import order issues fixed');
} catch (error) {
  console.error('❌ Error fixing import order issues:', error.message);
}
