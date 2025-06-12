# Fix Tailwind immediate version
Write-Host "===== Fix Tailwind CSS Immediate =====" -ForegroundColor Magenta

# Change to project directory
$projectRoot = $PSScriptRoot | Split-Path -Parent
Set-Location -Path $projectRoot
Write-Host "Projeto: $projectRoot" -ForegroundColor Cyan

# Ensure correct Tailwind config
$tailwindConfigPath = Join-Path -Path $projectRoot -ChildPath "tailwind.config.ts"
$tailwindContent = Get-Content -Path $tailwindConfigPath -Raw

# 1. Add a comprehensive safelist for common utility classes
Write-Host "1. Adicionando safelist abrangente..." -ForegroundColor Yellow
if (-not ($tailwindContent -match "safelist:")) {
    # Add safelist before the plugins section
    $safelistToAdd = @"
  safelist: [
    // Layout
    'flex', 'flex-row', 'flex-col', 'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    // Spacing
    'gap-1', 'gap-2', 'gap-4', 'gap-8', 'p-1', 'p-2', 'p-4', 'p-6', 'p-8', 'py-2', 'py-4', 'py-8', 'px-2', 'px-4', 'px-8',
    'my-2', 'my-4', 'my-8', 'mx-auto', 'm-0', 'm-2', 'm-4', 'm-8',
    // Positioning
    'fixed', 'absolute', 'relative', 'sticky', 'top-0', 'bottom-0', 'left-0', 'right-0', 'z-10', 'z-20', 'z-40', 'z-50',
    // Typography
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-center', 'text-right',
    'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'italic',
    // Colors
    'bg-white', 'bg-black', 'bg-gray-100', 'bg-gray-200', 'bg-blue-600', 'bg-neutral-800', 'bg-neutral-700', 'bg-neutral-100',
    'text-white', 'text-black', 'text-gray-600', 'text-blue-600', 'text-neutral-700', 'text-neutral-200',
    // Display
    'hidden', 'block', 'inline-block', 'inline', 'flex', 'inline-flex',
    // Flex & Grid
    'items-center', 'items-start', 'items-end', 'justify-center', 'justify-between', 'justify-end',
    // Width & Height
    'w-full', 'w-auto', 'h-full', 'h-auto', 'min-h-screen',
    // Border & Rounding
    'rounded', 'rounded-lg', 'rounded-full', 'border', 'border-gray-200',
    // Shadow
    'shadow', 'shadow-lg', 'shadow-md',
    // Hover
    'hover:bg-neutral-100', 'hover:bg-neutral-700', 'hover:text-blue-600',
  ],
"@

    $contentArray = $tailwindContent -split '(\}\s*,\s*)'
    $updatedContent = ""
    
    $insertedSafelist = $false
    foreach ($section in $contentArray) {
        $updatedContent += $section
        
        # After content section
        if ($section -match "content:\s*\[.*?\]," -and -not $insertedSafelist) {
            $updatedContent += "`n$safelistToAdd`n"
            $insertedSafelist = $true
        }
    }
    
    Set-Content -Path $tailwindConfigPath -Value $updatedContent
    Write-Host "Safelist adicionado!" -ForegroundColor Green
}

# 2. Enable Tailwind plugins
Write-Host "2. Ativando plugins do Tailwind..." -ForegroundColor Yellow
if ($tailwindContent -match "plugins:\s*\[\s*//.*@tailwindcss\/typography") {
    $newPluginsConfig = @"
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
"@
    
    $tailwindContent = $tailwindContent -replace "plugins:\s*\[(.*?)\],", $newPluginsConfig
    Set-Content -Path $tailwindConfigPath -Value $tailwindContent
    Write-Host "Plugins ativados!" -ForegroundColor Green
}

# 3. Disable optimizeCss in Next.js config
Write-Host "3. Desativando optimizeCss no next.config.mjs..." -ForegroundColor Yellow
$nextConfigPath = Join-Path -Path $projectRoot -ChildPath "next.config.mjs"
$nextConfigContent = Get-Content -Path $nextConfigPath -Raw

if ($nextConfigContent -match "optimizeCss:") {
    $nextConfigContent = $nextConfigContent -replace "optimizeCss:\s*true", "optimizeCss: false"
    Set-Content -Path $nextConfigPath -Value $nextConfigContent
    Write-Host "optimizeCss desativado!" -ForegroundColor Green
}

# 4. Create a simple tailwind rebuild script
Write-Host "4. Criando script simplificado de reconstrução do Tailwind..." -ForegroundColor Yellow
$rebuildScriptPath = Join-Path -Path $projectRoot -ChildPath "RECONSTRUIR_TAILWIND_SIMPLES.bat"
$rebuildScriptContent = @"
@echo off
echo Reconstruindo Tailwind CSS...
cd %~dp0
npx tailwindcss build -i ./src/app/globals.css -o ./src/app/temp.css --minify
echo Tailwind CSS reconstruído! Forças manualmente:
echo 1. Copie o conteúdo de ./src/app/temp.css 
echo 2. Adicione manualmente às diretivas @tailwind no globals.css
echo 3. Execute 'npm run dev' para iniciar o desenvolvimento
pause
"@

Set-Content -Path $rebuildScriptPath -Value $rebuildScriptContent
Write-Host "Script de reconstrução criado!" -ForegroundColor Green

# 5. Clear .next cache
Write-Host "5. Limpando o cache do Next.js..." -ForegroundColor Yellow
if (Test-Path "$projectRoot\.next") {
    Remove-Item -Path "$projectRoot\.next" -Recurse -Force -ErrorAction SilentlyContinue
}
Write-Host "Cache limpo!" -ForegroundColor Green

Write-Host "`n===== Correções do Tailwind Aplicadas! =====" -ForegroundColor Magenta
Write-Host "Para aplicar as mudanças:" -ForegroundColor Cyan
Write-Host "1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento" -ForegroundColor Cyan
Write-Host "2. Se ainda tiver problemas, execute o arquivo RECONSTRUIR_TAILWIND_SIMPLES.bat" -ForegroundColor Cyan

Write-Host "`nPressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
