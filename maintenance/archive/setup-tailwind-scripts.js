# Adding Tailwind rebuild to package.json scripts

const fs = require('fs');
const path = require('path');

// Define paths
const projectRoot = process.cwd();
const packageJsonPath = path.join(projectRoot, 'package.json');

// Read the package.json file
console.log('Reading package.json...');
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (error) {
  console.error('Error reading package.json:', error.message);
  process.exit(1);
}

// Add the rebuild-tailwind script if it doesn't exist
console.log('Adding rebuild-tailwind script...');
packageJson.scripts = packageJson.scripts || {};

// Add our rebuild script
packageJson.scripts['rebuild-tailwind'] = 'tailwindcss -i ./src/app/globals.css -o ./src/app/globals.output.css --minify && node ./scripts/merge-tailwind.js';

// Write the updated package.json
console.log('Writing updated package.json...');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('✅ Successfully added rebuild-tailwind script to package.json');
console.log('Now creating the merge-tailwind.js script...');

// Create a helper script to merge the CSS files
const mergeTailwindScript = `// Script to merge Tailwind directives with generated CSS
const fs = require('fs');
const path = require('path');

console.log('Merging Tailwind CSS files...');

try {
  // Define file paths
  const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
  const outputPath = path.join(process.cwd(), 'src/app/globals.output.css');
  
  // Read original globals.css to extract directives
  const originalContent = fs.readFileSync(globalsPath, 'utf8');
  
  // Find the directives section and imports
  const directivesMatch = originalContent.match(/@tailwind[\\s\\S]*?(?=\\n\\n)/);
  const importsMatch = originalContent.match(/@import[\\s\\S]*?(?=\\n\\n)/);
  
  const directives = directivesMatch ? directivesMatch[0] + '\\n\\n' : '@tailwind base;\\n@tailwind components;\\n@tailwind utilities;\\n\\n';
  const imports = importsMatch ? importsMatch[0] + '\\n\\n' : '';
  
  // Read generated CSS
  const generatedCss = fs.readFileSync(outputPath, 'utf8');
  
  // Combine directives, imports and generated CSS
  const mergedContent = directives + imports + generatedCss;
  
  // Write back to globals.css
  fs.writeFileSync(globalsPath, mergedContent, 'utf8');
  
  // Remove output file
  fs.unlinkSync(outputPath);
  
  console.log('✅ Successfully merged Tailwind CSS files');
} catch (error) {
  console.error('❌ Error merging CSS files:', error.message);
}
`;

// Write the merge script
const mergeScriptPath = path.join(projectRoot, 'scripts', 'merge-tailwind.js');
fs.writeFileSync(mergeScriptPath, mergeTailwindScript, 'utf8');

console.log('✅ Created merge-tailwind.js script');
console.log('\nTo rebuild Tailwind CSS, run:');
console.log('npm run rebuild-tailwind');
