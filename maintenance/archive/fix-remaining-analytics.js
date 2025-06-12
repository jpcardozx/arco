#!/usr/bin/env node

/**
 * Script to fix trackEvent issues in DesignCompareRefined.tsx and other components
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

// Function to fix trackEvent issues in DesignCompareRefined.tsx
const fixTrackEvent = (content) => {
  return content.replace(
    /trackEvent\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*({[^}]*})\)/g,
    (match, eventName, eventAction, eventData) => {
      const combinedEventName = `${eventName}_${eventAction}`;
      return `trackEvent('${combinedEventName}', ${eventData})`;
    }
  );
};

// Function to fix PageLayout.tsx trackPageView
const fixPageLayoutTrackPageView = (content) => {
  return content.replace(
    /trackPageView\(([^,]+),\s*({[^}]*})\)/g,
    'trackPageView($1)'
  );
};

// Main function to process files
const processFiles = () => {
  console.log(`${colors.bright}${colors.blue}Fixing remaining analytics issues...${colors.reset}`);
  
  // First fix DesignCompareRefined
  const designCompareFile = 'c:/Users/João Pedro Cardozo/OneDrive/Área de Trabalho/projetos/arco/components/DesignCompareRefined.tsx';
  if (fs.existsSync(designCompareFile)) {
    const content = fs.readFileSync(designCompareFile, 'utf8');
    const fixedContent = fixTrackEvent(content);
    
    if (content !== fixedContent) {
      console.log(`${colors.green}Fixed trackEvent in ${colors.yellow}${designCompareFile}${colors.reset}`);
      fs.writeFileSync(designCompareFile, fixedContent, 'utf8');
    }
  }
    // Then fix the copied version in src/components if it exists
  const srcDesignCompareFile = 'c:/Users/João Pedro Cardozo/OneDrive/Área de Trabalho/projetos/arco/src/components/features/DesignCompareRefined.tsx';
  if (fs.existsSync(srcDesignCompareFile)) {
    const content = fs.readFileSync(srcDesignCompareFile, 'utf8');
    const fixedContent = fixTrackEvent(content);
    
    if (content !== fixedContent) {
      console.log(`${colors.green}Fixed trackEvent in ${colors.yellow}${srcDesignCompareFile}${colors.reset}`);
      fs.writeFileSync(srcDesignCompareFile, fixedContent, 'utf8');
    }
  }
    // Fix PageLayout
  const pageLayoutFile = 'c:/Users/João Pedro Cardozo/OneDrive/Área de Trabalho/projetos/arco/src/components/layout/PageLayout.tsx';
  if (fs.existsSync(pageLayoutFile)) {
    const content = fs.readFileSync(pageLayoutFile, 'utf8');
    const fixedContent = fixPageLayoutTrackPageView(content);
    
    if (content !== fixedContent) {
      console.log(`${colors.green}Fixed trackPageView in ${colors.yellow}${pageLayoutFile}${colors.reset}`);
      fs.writeFileSync(pageLayoutFile, fixedContent, 'utf8');
    }
  }
  
  console.log(`${colors.bright}${colors.green}Completed fixing remaining analytics issues${colors.reset}`);
};

// Run the script
processFiles();
