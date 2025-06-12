/**
 * Script to automatically fix React/JSX not defined errors
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript and JSX files
const tsxFiles = glob.sync('**/*.{ts,tsx,jsx}', {
  ignore: ['node_modules/**', '.next/**', 'out/**', '.git/**']
});

console.log(`Analyzing ${tsxFiles.length} files for React/JSX not defined issues...`);

let fixedFiles = 0;

// Process each file
tsxFiles.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Skip files that already import React
  if (content.includes("import React") || content.includes("import * as React")) {
    return;
  }
  
  // Check if file uses JSX
  const usesJSX = content.includes('JSX') || 
                 content.includes('<div') || 
                 content.includes('<span') || 
                 content.includes('<p') ||
                 content.includes('React.') ||
                 content.includes('</');
  
  // Only add import if JSX is used
  if (usesJSX) {
    const lines = content.split('\n');
    const importStatements = lines.filter(line => line.trim().startsWith('import '));
    
    // Insert import after last import statement, or at the beginning if no imports
    const insertIndex = importStatements.length > 0 
      ? lines.lastIndexOf(importStatements[importStatements.length - 1]) + 1
      : 0;
    
    lines.splice(insertIndex, 0, 'import React from "react";');
    
    // Write the updated content back to file
    fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
    fixedFiles++;
    console.log(`✅ Added React import to ${filePath}`);
  }
});

console.log(`✅ Fixed React/JSX not defined issues in ${fixedFiles} files.`);
