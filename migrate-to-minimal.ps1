# Clean Dependencies Migration Script
# This script will backup current setup and test with minimal dependencies

Write-Host "🚀 ARCO Performance Optimization Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup current setup
Write-Host "📦 Step 1: Backing up current setup..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Copy-Item "package.json" "package-backup.json"
    Write-Host "✅ Backed up package.json" -ForegroundColor Green
}

if (Test-Path "tailwind.config.js") {
    Copy-Item "tailwind.config.js" "tailwind-backup.config.js"
    Write-Host "✅ Backed up tailwind.config.js" -ForegroundColor Green
}

# Step 2: Stop dev server if running
Write-Host ""
Write-Host "🛑 Step 2: Stopping any running processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✅ Processes stopped" -ForegroundColor Green

# Step 3: Clean install with minimal dependencies
Write-Host ""
Write-Host "🧹 Step 3: Cleaning node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ Removed node_modules" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json"
    Write-Host "✅ Removed package-lock.json" -ForegroundColor Green
}

# Step 4: Install minimal dependencies
Write-Host ""
Write-Host "⚡ Step 4: Installing minimal dependencies..." -ForegroundColor Yellow
Copy-Item "package-minimal.json" "package.json"
Copy-Item "tailwind-minimal.config.js" "tailwind.config.js"

Write-Host "Installing packages..." -ForegroundColor Blue
$installStart = Get-Date
npm install --no-audit --no-fund
$installEnd = Get-Date
$installTime = ($installEnd - $installStart).TotalSeconds

Write-Host "✅ Installation completed in $($installTime) seconds" -ForegroundColor Green

# Step 5: Test build performance
Write-Host ""
Write-Host "🏗️ Step 5: Testing build performance..." -ForegroundColor Yellow
$buildStart = Get-Date
npm run build
$buildEnd = Get-Date
$buildTime = ($buildEnd - $buildStart).TotalSeconds

Write-Host "✅ Build completed in $($buildTime) seconds" -ForegroundColor Green

# Step 6: Performance summary
Write-Host ""
Write-Host "📊 PERFORMANCE SUMMARY" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "Install time: $($installTime) seconds" -ForegroundColor White
Write-Host "Build time: $($buildTime) seconds" -ForegroundColor White
Write-Host ""

# Step 7: Start dev server
Write-Host "🚀 Starting optimized dev server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$(Get-Location)'; npm run dev"

Write-Host ""
Write-Host "✅ Migration completed!" -ForegroundColor Green
Write-Host "Your original files are backed up as *-backup.*" -ForegroundColor Blue
Write-Host "Check http://localhost:3000 to verify everything works" -ForegroundColor Blue
