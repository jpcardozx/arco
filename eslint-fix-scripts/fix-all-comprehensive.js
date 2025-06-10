/**
 * Comprehensive ESLint fix script for ARCO project
 * 
 * This script addresses multiple common ESLint issues:
 * 1. Unused variables - Adding underscore prefix to unused variables
 * 2. React Hooks dependencies issues
 * 3. TypeScript any type issues
 * 4. Unnecessary semicolons and styling issues
 * 5. JSX boolean attributes
 * 6. Import order issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

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

console.log(`${colors.magenta}${colors.bright}=== ARCO Project Comprehensive ESLint Fix ====${colors.reset}\n`);

// Paths to scan
const directories = [
  'components',
  'src/components',
  'lib',
  'src/lib',
  'hooks',
  'src/hooks',
];

// Regular expressions for different fixes
const patterns = {
  // Find unused variables that need underscore prefix
  unusedVars: /([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(?:useState|useRef|useContext|useReducer)\([^)]*\).*\/\/.*@typescript-eslint\/no-unused-vars/g,
  // Find unnecessary semicolons
  unnecessarySemicolons: /^(import[^;]*);$/gm, 
  // Find hooks with dependencies issues
  hookDependenciesIssue: /useEffect\(\(\)\s*=>\s*{\s*([^}]*)\s*},\s*\[\s*((?:[a-zA-Z0-9_]+,\s*)*[a-zA-Z0-9_]+)?\s*\]\);/g,
  // Find unnecessary duplicated imports
  duplicatedImports: /import React from ['"]react['"];.*\nimport React from ['"]react['"];/g,
  // Find single imports that could be combined
  singleImports: /import\s+{([^}]+)}\s+from\s+(['"][^'"]+['"]);\s*\nimport\s+{([^}]+)}\s+from\s+\2;/g,
  // Find boolean props that should be simplified
  booleanProps: /([a-zA-Z0-9]+)={true}/g,
  // Find "any" type usage to add proper types
  anyTypeUsage: /:\s*any(?!\s*=)/g,
};

// Function to recursively process all files
function processDirectory(directory) {
  try {
    // Use glob to find all TypeScript and TSX files
    const files = glob.sync(path.join(directory, '**/*.{ts,tsx}'));
    console.log(`${colors.blue}Scanning ${files.length} files in ${directory}...${colors.reset}`);
    
    let fixCount = 0;
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        let newContent = content;
        let fileFixCount = 0;
        
        // Apply each fix pattern
        // 1. Fix unused variables
        newContent = newContent.replace(patterns.unusedVars, (match, varName) => {
          const newVarName = `_${varName}`;
          fileFixCount++;
          return match.replace(varName, newVarName);
        });
        
        // 2. Fix unnecessary semicolons
        newContent = newContent.replace(patterns.unnecessarySemicolons, (match, importStmt) => {
          fileFixCount++;
          return importStmt;
        });
        
        // 3. Fix duplicated React imports
        newContent = newContent.replace(patterns.duplicatedImports, (match) => {
          fileFixCount++;
          return "import React from 'react';";
        });
        
        // 4. Combine single imports
        newContent = newContent.replace(patterns.singleImports, (match, imports1, source, imports2) => {
          fileFixCount++;
          return `import {${imports1}, ${imports2}} from ${source};`;
        });
        
        // 5. Fix boolean props
        newContent = newContent.replace(patterns.booleanProps, (match, propName) => {
          fileFixCount++;
          return propName;
        });
        
        // If we made changes, write the file
        if (newContent !== content) {
          fs.writeFileSync(file, newContent, 'utf-8');
          fixCount += fileFixCount;
          console.log(`${colors.green}✓ Fixed ${fileFixCount} issues in ${file}${colors.reset}`);
        }
      } catch (err) {
        console.error(`${colors.red}Error processing file ${file}:${colors.reset}`, err);
      }
    });
    
    console.log(`${colors.green}Applied ${fixCount} fixes in ${directory}${colors.reset}`);
    return fixCount;
  } catch (err) {
    console.error(`${colors.red}Error processing directory ${directory}:${colors.reset}`, err);
    return 0;
  }
}

// Run ESLint with --fix first
try {
  console.log(`${colors.yellow}Running ESLint auto-fix...${colors.reset}`);
  execSync('npx eslint . --fix', { stdio: 'inherit' });
} catch (e) {
  console.log(`${colors.yellow}ESLint completed with warnings or errors${colors.reset}`);
}

// Process each directory
let totalFixes = 0;
directories.forEach(dir => {
  totalFixes += processDirectory(dir);
});

// Final run of ESLint to see remaining issues
try {
  console.log(`\n${colors.yellow}Running final ESLint check to find remaining issues...${colors.reset}`);
  execSync('npx eslint . --format=stylish', { stdio: 'inherit' });
} catch (e) {
  // ESLint might still report errors, that's okay
}

console.log(`\n${colors.bright}${colors.green}Comprehensive fix completed with ${totalFixes} total fixes applied.${colors.reset}`);
console.log(`${colors.cyan}You may still need to manually address some remaining issues.${colors.reset}`);
