/**
 * ARCO Project Full Reset and Rebuild Script
 * 
 * Este script realiza uma limpeza completa e reinstalação do projeto para resolver problemas
 * de dependências, módulos e configuração do Tailwind CSS.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for better output formatting
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bright: '\x1b[1m',
};

console.log(`${colors.magenta}${colors.bright}=== ARCO Project Full Reset and Rebuild ====${colors.reset}\n`);

function execCommand(command, label) {
  console.log(`\n${colors.cyan}${label}...${colors.reset}`);
  try {
    execSync(command, { shell: 'powershell.exe', stdio: 'inherit' });
    console.log(`${colors.green}✓ ${label} completed successfully${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ ${label} failed: ${error.message}${colors.reset}`);
    return false;
  }
}

// Step 1: Clean the Next.js cache
console.log(`\n${colors.yellow}Step 1: Cleaning Next.js cache${colors.reset}`);
try {
  if (fs.existsSync('./.next')) {
    execSync('if (Test-Path ./.next) { Remove-Item -Recurse -Force ./.next }', { shell: 'powershell.exe', stdio: 'inherit' });
  }
  console.log(`${colors.green}✓ Next.js cache cleaned${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to clean Next.js cache: ${error.message}${colors.reset}`);
}

// Step 2: Delete node_modules
console.log(`\n${colors.yellow}Step 2: Cleaning node_modules${colors.reset}`);
try {
  if (fs.existsSync('./node_modules')) {
    execSync('if (Test-Path ./node_modules) { Remove-Item -Recurse -Force ./node_modules }', { shell: 'powershell.exe', stdio: 'inherit' });
  }
  console.log(`${colors.green}✓ node_modules cleaned${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to clean node_modules: ${error.message}${colors.reset}`);
}

// Step 3: Reinstall packages
console.log(`\n${colors.yellow}Step 3: Reinstalling packages${colors.reset}`);
if (execCommand('npm install', 'Package reinstallation')) {
  // Check if Tailwind is correctly installed
  if (!fs.existsSync('./node_modules/tailwindcss')) {
    console.warn(`${colors.yellow}⚠ Tailwind CSS not found in node_modules, installing separately${colors.reset}`);
    execCommand('npm install -D tailwindcss', 'Tailwind CSS installation');
  }
}

// Step 4: Reinstall specific dependencies
console.log(`\n${colors.yellow}Step 4: Reinstalling specific dependencies${colors.reset}`);
execCommand('npm install -D tailwindcss postcss autoprefixer', 'CSS tooling reinstallation');

// Step 5: Rebuild Tailwind config if needed
console.log(`\n${colors.yellow}Step 5: Checking Tailwind configuration${colors.reset}`);
try {
  const tailwindConfigPath = './tailwind.config.ts';
  if (!fs.existsSync(tailwindConfigPath)) {
    console.warn(`${colors.yellow}⚠ Tailwind config not found, creating a new one${colors.reset}`);
    execCommand('npx tailwindcss init -p', 'Tailwind initialization');
  }
  console.log(`${colors.green}✓ Tailwind configuration verified${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to verify Tailwind config: ${error.message}${colors.reset}`);
}

// Step 6: Build the project
console.log(`\n${colors.yellow}Step 6: Building the project${colors.reset}`);
execCommand('npm run build', 'Project build');

// Step 7: Run ESLint fix
console.log(`\n${colors.yellow}Step 7: Running ESLint fixes${colors.reset}`);
execCommand('npm run lint:fix', 'ESLint fix');

// Step 8: Initialize the development server
console.log(`\n${colors.yellow}Step 8: Starting development server${colors.reset}`);
execCommand('npm run dev', 'Development server');

console.log(`\n${colors.bright}${colors.green}Reset and rebuild process complete!${colors.reset}`);
console.log(`${colors.cyan}The ARCO application should now be running with all issues resolved.${colors.reset}`);
