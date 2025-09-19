/**
 * Script to find and report React Hooks dependency issues
 * This script won't automatically fix the dependencies as it requires careful analysis of each case
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run ESLint check for React hooks dependencies
try {
  console.log('Analyzing React Hooks dependency issues...');
  const output = execSync('npx eslint --rule "react-hooks/exhaustive-deps: error" . -f json', { encoding: 'utf8' });
  
  // Parse the JSON output
  const results = JSON.parse(output);
  
  // Extract and organize the hooks dependency issues
  const hooksIssues = results
    .filter(file => file.messages.some(msg => msg.ruleId === 'react-hooks/exhaustive-deps'))
    .map(file => ({
      filePath: file.filePath,
      issues: file.messages
        .filter(msg => msg.ruleId === 'react-hooks/exhaustive-deps')
        .map(msg => ({
          line: msg.line,
          message: msg.message,
        }))
    }));
  
  // Output the issues in a readable format
  console.log('\n======= React Hooks Dependency Issues =======\n');
  console.log(`Found ${hooksIssues.length} files with dependency issues:\n`);
  
  hooksIssues.forEach(file => {
    console.log(`File: ${file.filePath}`);
    file.issues.forEach(issue => {
      console.log(`  - Line ${issue.line}: ${issue.message}`);
    });
    console.log('');
  });
  
  console.log('These issues need manual review and fixing.');
  console.log('\nTips for fixing:');
  console.log('1. Include all dependencies used in the Hook in the dependency array');
  console.log('2. Use useCallback for functions that are dependencies of other Hooks');
  console.log('3. Use useMemo for objects or arrays that are dependencies');
  console.log('4. Consider extracting state updates to useReducer if dependencies are complex');
  
} catch (error) {
  console.error('❌ Error analyzing React Hooks dependency issues:', error.message);
}
