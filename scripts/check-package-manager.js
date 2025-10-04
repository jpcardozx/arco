#!/usr/bin/env node

/**
 * ARCO Package Manager Guardian
 * Intelligent system to enforce pnpm usage and reject npm/yarn
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const packageJson = path.join(projectRoot, 'package.json');

// Check if we're in a valid Node.js project
if (!fs.existsSync(packageJson)) {
    console.log('⚠️  Not in a Node.js project directory');
    process.exit(1);
}

// Detect package manager from lock files
function detectPackageManager() {
    const lockFiles = {
        'pnpm-lock.yaml': 'pnpm',
        'package-lock.json': 'npm',
        'yarn.lock': 'yarn'
    };

    for (const [lockFile, manager] of Object.entries(lockFiles)) {
        if (fs.existsSync(path.join(projectRoot, lockFile))) {
            return manager;
        }
    }

    return null;
}

// Get current command being executed
const userAgent = process.env.npm_config_user_agent || '';
const currentManager = userAgent.split('/')[0];

const detectedManager = detectPackageManager();

console.log('🔍 ARCO Package Manager Guardian\n');

if (detectedManager === 'pnpm') {
    console.log('✅ Project configured for pnpm');

    if (currentManager && currentManager !== 'pnpm') {
        console.log('\n❌ REJECTED: Using ' + currentManager + ' instead of pnpm');
        console.log('\n🔧 Please use pnpm instead:');
        console.log('   pnpm install     # instead of npm install');
        console.log('   pnpm add <pkg>   # instead of npm install <pkg>');
        console.log('   pnpm run <cmd>   # instead of npm run <cmd>');
        console.log('\n💡 pnpm is faster, uses less disk space, and has better dependency resolution');
        process.exit(1);
    }

    console.log('✅ Using correct package manager: pnpm');
} else if (detectedManager) {
    console.log(`⚠️  Project detected: ${detectedManager}`);
    console.log('💡 Consider migrating to pnpm for better performance');
} else {
    console.log('ℹ️  No package manager lock file detected');
}

console.log('\n🚀 Proceeding with operation...\n');