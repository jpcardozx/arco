#!/usr/bin/env node
/**
 * ARCO Project Maintenance Tool
 * Consolidated script for common maintenance tasks
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ARCOMaintenance {
  constructor() {
    this.projectRoot = process.cwd();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      error: '\x1b[31m',   // Red
      warning: '\x1b[33m'  // Yellow
    };
    const reset = '\x1b[0m';
    console.log(`${colors[type]}[${timestamp}] ${message}${reset}`);
  }

  async runCommand(command, description) {
    try {
      this.log(`Starting: ${description}`, 'info');
      execSync(command, { stdio: 'inherit', cwd: this.projectRoot });
      this.log(`Completed: ${description}`, 'success');
      return true;
    } catch (error) {
      this.log(`Failed: ${description} - ${error.message}`, 'error');
      return false;
    }
  }

  async cleanCache() {
    this.log('Cleaning project cache...', 'info');
    const commands = [
      'rm -rf .next',
      'rm -rf node_modules/.cache',
      'rm -f tsconfig.tsbuildinfo'
    ];

    for (const cmd of commands) {
      try {
        execSync(cmd, { cwd: this.projectRoot });
      } catch (error) {
        // Continue if file doesn't exist
      }
    }
    this.log('Cache cleaned successfully', 'success');
  }

  async lintFix() {
    return await this.runCommand(
      'npx eslint . --fix --ext .ts,.tsx,.js,.jsx',
      'Running ESLint fixes'
    );
  }

  async formatCode() {
    return await this.runCommand(
      'npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,md}"',
      'Formatting code with Prettier'
    );
  }

  async typeCheck() {
    return await this.runCommand(
      'npx tsc --noEmit',
      'Type checking'
    );
  }

  async buildProject() {
    return await this.runCommand(
      'npm run build',
      'Building project'
    );
  }

  async runTests() {
    return await this.runCommand(
      'npm test',
      'Running tests'
    );
  }

  async fullMaintenance() {
    this.log('Starting full maintenance cycle...', 'info');
    
    const tasks = [
      () => this.cleanCache(),
      () => this.lintFix(),
      () => this.formatCode(),
      () => this.typeCheck()
    ];

    let successCount = 0;
    for (const task of tasks) {
      if (await task()) {
        successCount++;
      }
    }

    this.log(`Maintenance completed: ${successCount}/${tasks.length} tasks successful`, 
      successCount === tasks.length ? 'success' : 'warning');
  }

  showHelp() {
    console.log(`
ARCO Maintenance Tool

Usage: node maintenance.js [command]

Commands:
  clean     - Clean cache and build artifacts
  lint      - Run ESLint fixes
  format    - Format code with Prettier
  type      - Run TypeScript type checking
  build     - Build the project
  test      - Run tests
  full      - Run complete maintenance cycle
  help      - Show this help message

Examples:
  node maintenance.js clean
  node maintenance.js full
    `);
  }
}

// Main execution
const maintenance = new ARCOMaintenance();
const command = process.argv[2] || 'help';

switch (command) {
  case 'clean':
    maintenance.cleanCache();
    break;
  case 'lint':
    maintenance.lintFix();
    break;
  case 'format':
    maintenance.formatCode();
    break;
  case 'type':
    maintenance.typeCheck();
    break;
  case 'build':
    maintenance.buildProject();
    break;
  case 'test':
    maintenance.runTests();
    break;
  case 'full':
    maintenance.fullMaintenance();
    break;
  case 'help':
  default:
    maintenance.showHelp();
    break;
}
