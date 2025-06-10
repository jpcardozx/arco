# ARCO Project - PowerShell Tailwind CSS Fix Script
# Este script analisa e corrige problemas com o Tailwind CSS no projeto ARCO

Write-Host "==== ARCO Project Tailwind CSS Fix ====" -ForegroundColor Magenta

# Função para executar comandos com mensagens coloridas
function Invoke-Command {
    param(
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "`nExecutando: $Description..." -ForegroundColor Cyan
    
    try {
        Invoke-Expression $Command
        Write-Host "✓ $Description concluído com sucesso!" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ $Description falhou: $_" -ForegroundColor Red
        return $false
    }
}

# Verifica se o Tailwind CSS está instalado
if (-not (Test-Path "./node_modules/tailwindcss")) {
    Write-Host "Tailwind CSS não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -D tailwindcss postcss autoprefixer
}

# Verifica a configuração do Tailwind
if (-not (Test-Path "./tailwind.config.ts")) {
    Write-Host "Arquivo de configuração do Tailwind não encontrado. Criando..." -ForegroundColor Yellow
    npx tailwindcss init -p
}

# Verifica o arquivo globals.css
$globalsPath = "./src/app/globals.css"
if (Test-Path $globalsPath) {
    $globalsContent = Get-Content $globalsPath -Raw
    
    # Verifica se as diretivas do Tailwind estão presentes
    if (-not ($globalsContent -match "@tailwind base")) {
        Write-Host "Adicionando diretivas do Tailwind ao globals.css..." -ForegroundColor Yellow
        $tailwindDirectives = @"
/* 
 * This file uses Tailwind CSS directives
 */
@tailwind base;
@tailwind components;
@tailwind utilities;

"@
        $updatedContent = $tailwindDirectives + $globalsContent
        $updatedContent | Set-Content $globalsPath
        Write-Host "✓ Diretivas do Tailwind adicionadas ao globals.css" -ForegroundColor Green
    }
    
    # Corrige caminhos de importação de estilos
    if ($globalsContent -match "@import '/styles/") {
        Write-Host "Corrigindo caminhos de importação de estilos no globals.css..." -ForegroundColor Yellow
        $fixedContent = $globalsContent -replace "@import '/styles/", "@import '../../styles/"
        $fixedContent | Set-Content $globalsPath
        Write-Host "✓ Caminhos de importação corrigidos no globals.css" -ForegroundColor Green
    }
} else {
    Write-Host "globals.css não encontrado. Verificar estrutura do projeto." -ForegroundColor Red
}

# Verificar o conteúdo do content[] no tailwind.config.ts
$tailwindConfigPath = "./tailwind.config.ts"
if (Test-Path $tailwindConfigPath) {
    $tailwindConfig = Get-Content $tailwindConfigPath -Raw
    
    # Verifica se os paths do content estão corretos
    if (-not ($tailwindConfig -match "components/\*\*/\*.{ts,tsx}")) {
        Write-Host "Atualizando configuração do Tailwind para incluir todos os componentes..." -ForegroundColor Yellow
        
        # Cria um arquivo temporário com a configuração atualizada
        $updatedConfig = $tailwindConfig -replace "(content:\s*\[)([^\]]*?)(\])", '$1`n    "./components/**/*.{ts,tsx}",`n    "./src/**/*.{ts,tsx,mdx}",`n    "./app/**/*.{ts,tsx,mdx}"$3'
        $updatedConfig | Set-Content "$tailwindConfigPath.new"
        
        # Substitui o arquivo original pelo novo
        Move-Item "$tailwindConfigPath.new" $tailwindConfigPath -Force
        
        Write-Host "✓ Configuração do Tailwind atualizada" -ForegroundColor Green
    }
}

# Limpa o cache do Next.js
Write-Host "`nLimpando cache do Next.js..." -ForegroundColor Yellow
if (Test-Path "./.next") {
    Remove-Item -Recurse -Force ./.next
    Write-Host "✓ Cache do Next.js limpo" -ForegroundColor Green
}

# Recompila o projeto
Invoke-Command -Command "npm run build" -Description "Reconstruir o projeto com as novas configurações"

# Resumo
Write-Host "`n==== Resumo ====" -ForegroundColor Magenta
Write-Host "O processo de correção do Tailwind CSS foi concluído." -ForegroundColor Green
Write-Host "Execute 'npm run dev' para verificar se o Tailwind está sendo aplicado corretamente." -ForegroundColor Cyan
