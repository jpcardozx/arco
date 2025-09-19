#!/usr/bin/env node

/**
 * ARCO Project Maintenance Tool
 * Consolidated script for common maintenance tasks
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ARCOMaintenance {
  constructor() {
    this.projectRoot = process.cwd();
    this.srcPath = path.join(this.projectRoot, 'src');
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}[ARCO] ${message}${colors.reset}`);
  }

  // Check project health
  checkHealth() {
    this.log('🔍 Checking project health...', 'info');
    
    const checks = [
      { name: 'package.json exists', path: 'package.json' },
      { name: 'src directory exists', path: 'src' },
      { name: 'components directory exists', path: 'src/components' },
      { name: 'tailwind.config.ts exists', path: 'tailwind.config.ts' },
      { name: 'next.config.mjs exists', path: 'next.config.mjs' }
    ];

    let healthy = true;
    checks.forEach(check => {
      const exists = fs.existsSync(path.join(this.projectRoot, check.path));
      this.log(`${exists ? '✅' : '❌'} ${check.name}`, exists ? 'success' : 'error');
      if (!exists) healthy = false;
    });

    return healthy;
  }

  // Clean unused imports
  cleanImports() {
    this.log('🧹 Cleaning unused imports...', 'info');
    try {
      execSync('npx eslint --fix src/', { stdio: 'inherit' });
      this.log('✅ Import cleanup completed', 'success');
    } catch (error) {
      this.log('⚠️ Some import issues may require manual fixing', 'warning');
    }
  }

  // Format code
  formatCode() {
    this.log('✨ Formatting code...', 'info');
    try {
      execSync('npx prettier --write "src/**/*.{ts,tsx,js,jsx}"', { stdio: 'inherit' });
      this.log('✅ Code formatting completed', 'success');
    } catch (error) {
      this.log('❌ Code formatting failed', 'error');
    }
  }

  // Analyze bundle size
  analyzeBundles() {
    this.log('📊 Analyzing bundle size...', 'info');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      this.log('✅ Build analysis completed', 'success');
    } catch (error) {
      this.log('❌ Build failed - check for errors', 'error');
    }
  }

  // Clean cache and rebuild
  cleanRebuild() {
    this.log('🔄 Cleaning cache and rebuilding...', 'info');
    try {
      if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
        this.log('Removed .next directory', 'info');
      }
      if (fs.existsSync('tsconfig.tsbuildinfo')) {
        fs.unlinkSync('tsconfig.tsbuildinfo');
        this.log('Removed TypeScript build info', 'info');
      }
      
      execSync('npm install', { stdio: 'inherit' });
      this.log('✅ Clean rebuild completed', 'success');
    } catch (error) {
      this.log('❌ Clean rebuild failed', 'error');
    }
  }

  // Run all maintenance tasks
  runAll() {
    this.log('🚀 Running complete maintenance cycle...', 'info');
    
    if (!this.checkHealth()) {
      this.log('❌ Project health check failed. Fix issues before continuing.', 'error');
      return;
    }
    
    this.cleanImports();
    this.formatCode();
    this.cleanRebuild();
    
    this.log('🎉 Maintenance cycle completed successfully!', 'success');
  }

  // Display help
  showHelp() {
    console.log(`
🔧 ARCO Project Maintenance Tool

Usage: node maintenance.js [command]

Commands:
  health      - Check project health
  imports     - Clean unused imports
  format      - Format code with Prettier
  analyze     - Analyze bundle size
  clean       - Clean cache and rebuild
  all         - Run all maintenance tasks
  help        - Show this help message

Examples:
  node maintenance.js health
  node maintenance.js all
    `);
  }
}

// CLI Interface
const maintenance = new ARCOMaintenance();
const command = process.argv[2];

switch (command) {
  case 'health':
    maintenance.checkHealth();
    break;
  case 'imports':
    maintenance.cleanImports();
    break;
  case 'format':
    maintenance.formatCode();
    break;
  case 'analyze':
    maintenance.analyzeBundles();
    break;
  case 'clean':
    maintenance.cleanRebuild();
    break;
  case 'all':
    maintenance.runAll();
    break;
  case 'help':
  default:
    maintenance.showHelp();
    break;
}
