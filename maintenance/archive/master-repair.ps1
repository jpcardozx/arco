# ARCO Project Master Repair
# This script coordinates all repair operations to fix the ARCO project

# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "===== ARCO Project Master Repair =====" -ForegroundColor Magenta
Write-Host "This script will fix the structural issues in the ARCO project" -ForegroundColor Cyan

$projectRoot = $PSScriptRoot

# Function to execute a script with error handling
function Invoke-SafeScript {
    param (
        [string]$ScriptPath,
        [string]$Description
    )
    
    Write-Host "`n=== Step: $Description ===`n" -ForegroundColor Blue
    
    try {
        & $ScriptPath
        Write-Host "`n[SUCCESS] $Description completed successfully" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "`n[ERROR] $Description failed: $_" -ForegroundColor Red
        return $false
    }
}

# Step 1: Consolidate components
$step1 = Invoke-SafeScript -ScriptPath "$projectRoot\scripts\consolidate-components.ps1" -Description "Component Consolidation"
if (-not $step1) {
    Write-Host "Component consolidation failed, but continuing with other fixes" -ForegroundColor Yellow
}

# Step 2: Fix import paths
$step2 = Invoke-SafeScript -ScriptPath "$projectRoot\scripts\fix-import-paths.ps1" -Description "Import Path Fixes"
if (-not $step2) {
    Write-Host "Import path fixes failed, but continuing with other fixes" -ForegroundColor Yellow
}

# Step 3: Run ESLint fixes
Write-Host "`n=== Step: Running ESLint Fixes ===`n" -ForegroundColor Blue
try {
    & "$projectRoot\scripts\Fix-ESLint-Simple.ps1"
    Write-Host "`n[SUCCESS] ESLint fixes completed successfully" -ForegroundColor Green
    $step3 = $true
}
catch {
    Write-Host "`n[ERROR] ESLint fixes failed: $_" -ForegroundColor Red
    $step3 = $false
}

# Step 4: Run Tailwind fixes
Write-Host "`n=== Step: Running Tailwind Fixes ===`n" -ForegroundColor Blue
try {
    & "$projectRoot\scripts\Fix-Tailwind-Simple.ps1"
    Write-Host "`n[SUCCESS] Tailwind fixes completed successfully" -ForegroundColor Green
    $step4 = $true
}
catch {
    Write-Host "`n[ERROR] Tailwind fixes failed: $_" -ForegroundColor Red
    $step4 = $false
}

# Summary
Write-Host "`n===== Repair Process Summary =====" -ForegroundColor Magenta
Write-Host "Component Consolidation: $(if ($step1) { "Success" } else { "Failed" })" -ForegroundColor $(if ($step1) { "Green" } else { "Red" })
Write-Host "Import Path Fixes: $(if ($step2) { "Success" } else { "Failed" })" -ForegroundColor $(if ($step2) { "Green" } else { "Red" })
Write-Host "ESLint Fixes: $(if ($step3) { "Success" } else { "Failed" })" -ForegroundColor $(if ($step3) { "Green" } else { "Red" })
Write-Host "Tailwind Fixes: $(if ($step4) { "Success" } else { "Failed" })" -ForegroundColor $(if ($step4) { "Green" } else { "Red" })

# Next steps
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Run 'npm run dev' to test if the application now works correctly" -ForegroundColor White
Write-Host "2. If issues persist, check the console for specific error messages" -ForegroundColor White
Write-Host "3. Make any manual fixes needed for components that still have issues" -ForegroundColor White

# Create a reference for further troubleshooting
$troubleshootingPath = "$projectRoot\REPAIR_SUMMARY.md"
$troubleshootingContent = @"
# ARCO Project Repair Summary

## Repair Actions Taken
- **Component Consolidation**: $(if ($step1) { "✅ Success" } else { "❌ Failed" })
- **Import Path Fixes**: $(if ($step2) { "✅ Success" } else { "❌ Failed" })
- **ESLint Fixes**: $(if ($step3) { "✅ Success" } else { "❌ Failed" })
- **Tailwind Fixes**: $(if ($step4) { "✅ Success" } else { "❌ Failed" })

## Component Structure
The repair process established the following component structure:

- \`src/components/features/\` - Complex interactive components
- \`src/components/layout/\` - Layout components (NavBar, Footer, etc.)
- \`src/components/sections/\` - Page sections (Hero, CTA, etc.)
- \`src/components/ui/\` - Basic UI components (Button, Card, etc.)

## Import Paths
Components should be imported using the @/ alias syntax:

\`\`\`tsx
import MyComponent from '@/components/features/MyComponent';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import Button from '@/components/ui/Button';
\`\`\`

## Common Issues & Solutions

### Tailwind Classes Not Working
- Ensure globals.css contains the Tailwind directives
- Check that postcss.config.mjs is properly configured
- Run \`npm run dev\` with the \`--turbo\` flag removed

### Component Not Found Errors
- Verify import paths use proper @/ syntax
- Check that the component exists in the expected directory
- Remember to use the correct component category in the path

### ESLint Errors
- Run \`npx eslint --fix .\` to apply automatic fixes
- Address remaining issues manually

## Manual Fixes Required
Components that may still need manual attention:
- NavBarEnhanced (ensure it's properly placed in /layout)
- HeroARCOEnhanced (ensure it exists in /sections)
- ProcessEnhanced (ensure it exists in /features)
- CaseStudiesEnhanced (ensure it exists in /features)
"@

Set-Content -Path $troubleshootingPath -Value $troubleshootingContent
Write-Host "`nCreated repair summary at: $troubleshootingPath" -ForegroundColor Cyan
