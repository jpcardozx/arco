# ARCO Project - PowerShell Tailwind CSS Fix Script
# Este script analisa e corrige problemas com o Tailwind CSS no projeto ARCO

Write-Host "==== ARCO Project Tailwind CSS Fix ====" -ForegroundColor Magenta

# Funcao para executar comandos com mensagens coloridas
function Invoke-CommandSafe {
    param(
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "`nExecutando: $Description..." -ForegroundColor Cyan
    
    try {
        Invoke-Expression $Command
        Write-Host "[OK] $Description concluido com sucesso!" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "[ERRO] $Description falhou: $_" -ForegroundColor Red
        return $false
    }
}

# Verifica se o Tailwind CSS esta instalado
if (-not (Test-Path "./node_modules/tailwindcss")) {
    Write-Host "Tailwind CSS nao encontrado. Instalando..." -ForegroundColor Yellow
    npm install -D tailwindcss postcss autoprefixer
}

# Verifica a configuracao do Tailwind
if (-not (Test-Path "./tailwind.config.ts")) {
    Write-Host "Arquivo de configuracao do Tailwind nao encontrado. Criando..." -ForegroundColor Yellow
    npx tailwindcss init -p
}

# Verifica o arquivo globals.css
$globalsPath = "./src/app/globals.css"
if (Test-Path $globalsPath) {
    $globalsContent = Get-Content $globalsPath -Raw
    
    # Verifica se as diretivas do Tailwind estao presentes
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
        Write-Host "[OK] Diretivas do Tailwind adicionadas ao globals.css" -ForegroundColor Green
    }
    
    # Corrige caminhos de importacao de estilos
    if ($globalsContent -match "@import '/styles/") {
        Write-Host "Corrigindo caminhos de importacao de estilos no globals.css..." -ForegroundColor Yellow
        $fixedContent = $globalsContent -replace "@import '/styles/", "@import '../../styles/"
        $fixedContent | Set-Content $globalsPath
        Write-Host "[OK] Caminhos de importacao corrigidos no globals.css" -ForegroundColor Green
    }
} else {
    Write-Host "globals.css nao encontrado. Verificar estrutura do projeto." -ForegroundColor Red
}

# Limpa o cache do Next.js
Write-Host "`nLimpando cache do Next.js..." -ForegroundColor Yellow
if (Test-Path "./.next") {
    Remove-Item -Recurse -Force ./.next
    Write-Host "[OK] Cache do Next.js limpo" -ForegroundColor Green
}

# Recompila o projeto
Invoke-CommandSafe -Command "npm run build" -Description "Reconstruir o projeto com as novas configuracoes"

# Resumo
Write-Host "`n==== Resumo ====" -ForegroundColor Magenta
Write-Host "O processo de correcao do Tailwind CSS foi concluido." -ForegroundColor Green
Write-Host "Execute 'npm run dev' para verificar se o Tailwind esta sendo aplicado corretamente." -ForegroundColor Cyan
