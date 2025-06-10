# ARCO Project Component Consolidation
# This script helps consolidate components from root to src directory with proper structure

# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "===== ARCO Component Consolidation =====" -ForegroundColor Magenta

$projectRoot = $PSScriptRoot

# Define the component categories and their patterns
$categoryPatterns = @{
    "layout" = "Layout|Footer|Header|NavBar|Sidebar|Page|Container"
    "sections" = "Hero|Banner|Section|CTA|Pricing|Feature|Process"
    "ui" = "Button|Input|Form|Card|Modal|Dialog|Alert|Toast|Badge"
    "features" = ".*" # Default category
}

# 1. Ensure target directories exist
Write-Host "`n=== Creating Directory Structure ===" -ForegroundColor Blue
$targetDirs = @("layout", "sections", "ui", "features")
foreach ($dir in $targetDirs) {
    $path = Join-Path -Path "$projectRoot\src\components" -ChildPath $dir
    if (-not (Test-Path $path)) {
        Write-Host "Creating directory: src\components\$dir" -ForegroundColor Yellow
        New-Item -Path $path -ItemType Directory -Force | Out-Null
    }
}

# 2. Copy all components from root to appropriate src directories
Write-Host "`n=== Organizing Components ===" -ForegroundColor Blue

# Get all TSX files from the root components directory
$rootComponents = Get-ChildItem -Path "$projectRoot\components\*.tsx" -File
$count = 0

foreach ($component in $rootComponents) {
    # Determine the appropriate category based on filename
    $category = "features" # default
    foreach ($cat in $categoryPatterns.Keys) {
        if ($component.Name -match $categoryPatterns[$cat]) {
            $category = $cat
            break
        }
    }
    
    # Define target path
    $targetDir = Join-Path -Path "$projectRoot\src\components" -ChildPath $category
    $targetPath = Join-Path -Path $targetDir -ChildPath $component.Name
    
    # Check if component already exists in target location
    if (Test-Path $targetPath) {
        # Read both files and compare
        $sourceContent = Get-Content -Path $component.FullName -Raw
        $targetContent = Get-Content -Path $targetPath -Raw
        
        if ($sourceContent -ne $targetContent) {
            Write-Host "Component $($component.Name) exists in both locations with differences" -ForegroundColor Yellow
            Write-Host "  Source: $($component.FullName)" -ForegroundColor Gray
            Write-Host "  Target: $targetPath" -ForegroundColor Gray
            
            # Create a backup of the src version
            $backupPath = "$targetPath.bak"
            Write-Host "  Creating backup of src version: $backupPath" -ForegroundColor Cyan
            Copy-Item -Path $targetPath -Destination $backupPath -Force
            
            # Copy the root version to src
            Write-Host "  Copying root version to src" -ForegroundColor Green
            Copy-Item -Path $component.FullName -Destination $targetPath -Force
            $count++
        } else {
            Write-Host "Component $($component.Name) exists in both locations (identical content)" -ForegroundColor Gray
        }
    } else {
        # Component doesn't exist in src, simply copy it
        Write-Host "Copying component $($component.Name) to src\components\$category\" -ForegroundColor Green
        Copy-Item -Path $component.FullName -Destination $targetPath -Force
        $count++
    }
}

# 3. Summary
Write-Host "`n=== Component Consolidation Complete ===" -ForegroundColor Magenta
Write-Host "$count components were copied or updated" -ForegroundColor Cyan
Write-Host "Components now exist in both locations for compatibility" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Fix imports in your code to use @/components/... paths" -ForegroundColor White
Write-Host "2. Run the ESLint and Tailwind fix scripts" -ForegroundColor White
Write-Host "3. Test the application to ensure components load correctly" -ForegroundColor White
