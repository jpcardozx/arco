#!/usr/bin/env node

/**
 * Script to fix import paths in backup pages
 */

const fs = require('fs');
const path = require('path');

const glob = require('glob');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Component mapping based on your project structure
const componentMappings = {
  '@/components/HeroARCOEnhanced': '@/components/sections/HeroARCOEnhanced',
  '@/components/ProcessEnhanced': '@/components/features/ProcessEnhanced',
  '@/components/CaseStudiesEnhanced': '@/components/features/CaseStudiesEnhanced',
  '@/components/EnhancedCTA': '@/components/sections/EnhancedCTA',
  '@/components/DesignCompareRefined': '@/components/features/DesignCompareRefined',
  '@/components/IntegrationController': '@/components/features/IntegrationController',
  '@/components/NavBarEnhanced': '@/components/features/NavBarEnhanced',
  '@/components/enhanced/MarketHero': '@/components/features/MarketHero',
  '@/components/enhanced/ValuePropositioning': '@/components/features/ValuePropositioning',
  '@/components/enhanced/PerceptionGapAnalyzer': '@/components/features/PerceptionGapAnalyzer',
  '@/components/enhanced/ClientTestimonials': '@/components/features/ClientTestimonials',
  '@/lib/analytics/index': '@/lib/utils/analytics',
};

// Fix trackPageView usage
const fixTrackPageView = (content) => {
  // Replace trackPageView with second argument object to just use the path
  return content.replace(
    /trackPageView\(['"](.*?)['"],\s*{[^}]*}\);/g,
    'trackPageView(\'$1\');'
  );
};

// Fix trackComponentPerformance usage
const fixTrackComponentPerformance = (content) => {
  // Replace with correct signature, removing the third argument
  return content.replace(
    /trackComponentPerformance\(['"](.*?)['"],[^,]*?,\s*{[^}]*}\);/g,
    'trackComponentPerformance(\'$1\', performance.now());'
  );
};

// Fix trackEvent usage
const fixTrackEvent = (content) => {
  // Replace with correct signature
  return content.replace(
    /trackEvent\(['"](.*?)['"],\s*['"](.*?)['"],\s*{([^}]*)}\);/g,
    (match, event, action, dataBody) => {
      // Create a combined event name
      const combinedEvent = `${event}_${action}`;
      return `trackEvent('${combinedEvent}', {${dataBody}});`;
    }
  );
};

// Main function to process files
const processFiles = () => {
  const backupPagesGlob = 'src/app/_page_backups/**/*.tsx';
  const otherPagesGlob = 'src/app/**/*.tsx';
  
  console.log(`${colors.bright}${colors.blue}Fixing import paths in backup pages...${colors.reset}`);
  
  // Process all files matching the glob patterns
  const files = [...glob.sync(backupPagesGlob), ...glob.sync(otherPagesGlob)];
  let totalFixedPaths = 0;
  let totalFixedAnalytics = 0;
  let modifiedFiles = 0;
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    let fixedPaths = 0;
    
    // Fix component imports
    for (const [oldImport, newImport] of Object.entries(componentMappings)) {
      const regex = new RegExp(`import\\(['"](${oldImport})['"](\\))`, 'g');
      const importRegex = new RegExp(`from\\s*['"](${oldImport})['"]`, 'g');
      
      // Fix dynamic imports
      if (content.match(regex)) {
        content = content.replace(regex, `import('${newImport}'$2`);
        fixedPaths++;
      }
      
      // Fix static imports
      if (content.match(importRegex)) {
        content = content.replace(importRegex, `from '${newImport}'`);
        fixedPaths++;
      }
    }
    
    // Fix analytics usage
    const contentWithFixedAnalytics = fixTrackEvent(fixTrackComponentPerformance(fixTrackPageView(content)));
    
    // Calculate analytics fixes
    const analyticsFixes = contentWithFixedAnalytics !== content ? 1 : 0;
    totalFixedAnalytics += analyticsFixes;
    content = contentWithFixedAnalytics;
    
    // Save the file if changes were made
    if (content !== originalContent) {
      console.log(`${colors.green}Fixing ${colors.yellow}${file}${colors.green}: ${fixedPaths} import paths, ${analyticsFixes ? 'analytics fixed' : 'no analytics issues'}${colors.reset}`);
      fs.writeFileSync(file, content, 'utf8');
      modifiedFiles++;
      totalFixedPaths += fixedPaths;
    }
  });
  
  console.log(`\n${colors.bright}${colors.green}Summary:${colors.reset}`);
  console.log(`${colors.cyan}Modified files: ${colors.bright}${modifiedFiles}${colors.reset}`);
  console.log(`${colors.cyan}Fixed import paths: ${colors.bright}${totalFixedPaths}${colors.reset}`);
  console.log(`${colors.cyan}Fixed analytics usage: ${colors.bright}${totalFixedAnalytics}${colors.reset}`);
};

// Run the script
processFiles();
