# Script para reconstruir o Tailwind CSS
Write-Host "===== ARCO Project - Reconstruir Tailwind CSS =====" -ForegroundColor Magenta

$projectRoot = $PSScriptRoot | Split-Path -Parent
Write-Host "Diretório do projeto: $projectRoot" -ForegroundColor Cyan

# Limpar caches
Write-Host "`nLimpando caches..." -ForegroundColor Yellow
if (Test-Path "$projectRoot\.next") {
    Write-Host "Removendo diretório .next..." -ForegroundColor Yellow
    Remove-Item -Path "$projectRoot\.next" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "$projectRoot\node_modules\.cache") {
    Write-Host "Removendo cache do Node.js..." -ForegroundColor Yellow
    Remove-Item -Path "$projectRoot\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
}

# Verificar dependências do Tailwind
Write-Host "`nVerificando dependências do Tailwind..." -ForegroundColor Yellow
npm list tailwindcss postcss autoprefixer
npm list @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio @tailwindcss/container-queries

# Garantir que o Tailwind e plugins estão instalados
Write-Host "`nInstalando/atualizando o Tailwind e plugins recomendados..." -ForegroundColor Yellow
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Instalar plugins recomendados
Write-Host "`nInstalando plugins recomendados do Tailwind..." -ForegroundColor Yellow
npm install -D @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio @tailwindcss/container-queries

# Modificar o arquivo tailwind.config.ts para adicionar os plugins
Write-Host "`nAtualizando plugins no arquivo tailwind.config.ts..." -ForegroundColor Yellow
$tailwindConfigPath = "$projectRoot\tailwind.config.ts"
$tailwindContent = Get-Content -Path $tailwindConfigPath -Raw

if ($tailwindContent -match "plugins:\s*\[\s*//.*@tailwindcss\/typography") {
    Write-Host "Atualizando plugins do Tailwind..." -ForegroundColor Cyan
    
    $newPluginsConfig = @"
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
"@
    
    $tailwindContent = $tailwindContent -replace "plugins:\s*\[(.*?)\]", $newPluginsConfig
    Set-Content -Path $tailwindConfigPath -Value $tailwindContent
    
    Write-Host "Plugins do Tailwind atualizados com sucesso!" -ForegroundColor Green
}

# Gerar CSS completo
Write-Host "`nGerando CSS do Tailwind..." -ForegroundColor Yellow
npx tailwindcss -i ./src/app/globals.css -o ./src/app/output.css --minify

# Copiar output.css para globals.css
Write-Host "`nAplicando CSS gerado ao globals.css..." -ForegroundColor Yellow
if (Test-Path "$projectRoot\src\app\output.css") {
    $originalGlobals = Get-Content -Path "$projectRoot\src\app\globals.css" -Raw
    $tailwindDirectives = @"
/* 
 * This file uses Tailwind CSS directives which may show as warnings
 * in CSS validation but are valid in the context of Tailwind CSS.
 * These warnings can be safely ignored.
 */
@tailwind base;
@tailwind components;
@tailwind utilities;

"@

    $importStatements = ""
    if ($originalGlobals -match "@import\s+'[^']+'") {
        $regex = [regex]"(@import\s+'[^']+';(\r?\n)?)"
        $matches = $regex.Matches($originalGlobals)
        foreach ($match in $matches) {
            $importStatements += $match.Groups[1].Value
        }
        $importStatements += "`n"
    }
    
    $generatedCSS = Get-Content -Path "$projectRoot\src\app\output.css" -Raw
    
    $newGlobals = $tailwindDirectives + $importStatements + "`n" + $generatedCSS
    Set-Content -Path "$projectRoot\src\app\globals.css" -Value $newGlobals
    
    Remove-Item -Path "$projectRoot\src\app\output.css"
    
    Write-Host "globals.css atualizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Falha ao gerar o CSS do Tailwind" -ForegroundColor Red
}

Write-Host "`n===== Reconstrução do Tailwind Concluída =====" -ForegroundColor Magenta
Write-Host "Execute 'npm run dev' para iniciar o servidor de desenvolvimento" -ForegroundColor Cyan
