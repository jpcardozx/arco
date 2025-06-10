# ARCO Project Component Path Fix
# This script fixes import paths in the project to ensure they use the correct @/ syntax

# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "===== ARCO Import Path Fix =====" -ForegroundColor Magenta

$projectRoot = $PSScriptRoot

# Define patterns to search for and their replacements
$replacementPatterns = @(
    @{
        # Absolute path imports like '../../components/ComponentName'
        Search = '(?<=import\s+.*from\s+[''"])\.\.\/\.\.\/components\/([^''"/]+)(?=[''"])'
        Replace = '@/components/features/$1'
        Description = "Fixing root-level component imports"
    },
    @{
        # Incorrect path imports using wrong directories
        Search = '(?<=import\s+.*from\s+[''"])@\/components\/layout\/([^''"/]+)(?=[''"])'
        Replace = '@/components/layout/$1'
        Description = "Standardizing layout component paths"
    },
    @{
        # Incorrect path imports for sections
        Search = '(?<=import\s+.*from\s+[''"])@\/components\/([^''"/]+)(?=[''"])'
        Replace = '@/components/features/$1'
        Description = "Standardizing feature component paths"
    },
    @{
        # Incorrect hook paths
        Search = '(?<=import\s+.*from\s+[''"])@\/lib\/hooks\/([^''"/]+)(?=[''"])'
        Replace = '@/hooks/$1'
        Description = "Fixing hook import paths"
    }
)

# Find all TypeScript/React files
$files = Get-ChildItem -Path "$projectRoot\src" -Include "*.ts", "*.tsx", "*.js", "*.jsx" -Recurse

$totalFixedFiles = 0
$totalReplacements = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $fixedFileImports = 0
    
    foreach ($pattern in $replacementPatterns) {
        $matches = [regex]::Matches($content, $pattern.Search)
        if ($matches.Count -gt 0) {
            Write-Host "Fixing imports in: $($file.FullName)" -ForegroundColor Cyan
            Write-Host "  $($pattern.Description): $($matches.Count) instances" -ForegroundColor Yellow
            
            $content = [regex]::Replace($content, $pattern.Search, $pattern.Replace)
            $fixedFileImports += $matches.Count
            $totalReplacements += $matches.Count
        }
    }
    
    # Save the file if changes were made
    if ($content -ne $originalContent) {
        Write-Host "  Total fixes in this file: $fixedFileImports" -ForegroundColor Green
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $totalFixedFiles++
    }
}

# Fix specifically page.tsx import issues
$pagePath = "$projectRoot\src\app\page.tsx"
if (Test-Path $pagePath) {
    $pageContent = Get-Content -Path $pagePath -Raw
    $originalPageContent = $pageContent
    
    # Specific fixes for page.tsx
    $pageContent = $pageContent -replace 'import\s+NavBarEnhanced\s+from\s+''@\/components\/features\/NavBarEnhanced''', 'import NavBarEnhanced from ''@/components/layout/NavBarEnhanced'''
    $pageContent = $pageContent -replace 'import\s+(\{.*?\})\s+from\s+''@\/lib\/utils\/analytics''', 'import $1 from ''@/lib/analytics'''
    
    if ($pageContent -ne $originalPageContent) {
        Write-Host "Fixed specific import issues in page.tsx" -ForegroundColor Green
        Set-Content -Path $pagePath -Value $pageContent -NoNewline
        $totalFixedFiles++
    }
}

# Summary
Write-Host "`n=== Import Path Fix Complete ===" -ForegroundColor Magenta
Write-Host "Fixed $totalReplacements import paths in $totalFixedFiles files" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run the ESLint and Tailwind fix scripts" -ForegroundColor White
Write-Host "2. Test the application to ensure components load correctly" -ForegroundColor White
