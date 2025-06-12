# ARCO Project Structure Fix
# This script fixes the component structure by moving components from root to src

Write-Host "===== ARCO Project Component Structure Fix =====" -ForegroundColor Magenta
$projectRoot = $PSScriptRoot | Split-Path -Parent
Write-Host "Project root: $projectRoot" -ForegroundColor Cyan

# Create required directories if they don't exist
$requiredDirs = @(
    "src\components\features",
    "src\components\layout",
    "src\components\sections",
    "src\components\ui"
)

Write-Host "`n=== Creating Required Directories ===" -ForegroundColor Blue
foreach ($dir in $requiredDirs) {
    $fullPath = Join-Path $projectRoot $dir
    if (-not (Test-Path $fullPath)) {
        Write-Host "Creating directory: $dir" -ForegroundColor Yellow
        New-Item -Path $fullPath -ItemType Directory -Force | Out-Null
    }
}

# Function to categorize component based on name or function
function Get-ComponentCategory {
    param (
        [string]$fileName,
        [string]$content
    )
    
    # Check for layout components
    if ($fileName -match "Layout|Footer|Header|NavBar|Sidebar|Page|Container") {
        return "layout"
    }
    
    # Check for sections (usually larger page sections)
    if ($fileName -match "Hero|Banner|Section|CTA|Pricing|Feature|Process") {
        return "sections"
    }
    
    # Check for UI components (small, reusable UI elements)
    if ($fileName -match "Button|Input|Form|Card|Modal|Dialog|Alert|Toast|Badge") {
        return "ui"
    }
    
    # Default to features (complex interactive components)
    return "features"
}

# Move components from root to src with proper categorization
Write-Host "`n=== Moving Components to Correct Directories ===" -ForegroundColor Blue

$rootComponents = Get-ChildItem "$projectRoot\components\*.tsx"
foreach ($component in $rootComponents) {
    $content = Get-Content $component.FullName -Raw
    $category = Get-ComponentCategory -fileName $component.Name -content $content
    
    $targetDir = "$projectRoot\src\components\$category"
    $targetPath = "$targetDir\$($component.Name)"
    
    # Check if the component already exists in src
    if (Test-Path $targetPath) {
        Write-Host "Component $($component.Name) already exists in src/$category - skipping" -ForegroundColor Yellow
        continue
    }
    
    # Copy the component to the target directory
    Write-Host "Moving $($component.Name) to src/components/$category/" -ForegroundColor Green
    Copy-Item $component.FullName -Destination $targetPath
}

Write-Host "`n=== Component Structure Fix Complete ===" -ForegroundColor Magenta
Write-Host "Components have been copied to their appropriate directories in src/components/" -ForegroundColor Cyan
Write-Host "Important: You may still need to update imports in your code!" -ForegroundColor Yellow
