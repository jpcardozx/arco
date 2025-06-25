# ARCO Expert - Setup Script
# Este script configura o especialista ARCO para uso no terminal

Write-Host "🏛️  Configurando ARCO Expert - Especialista ARCO no Terminal" -ForegroundColor Blue
Write-Host "=" * 60 -ForegroundColor Gray

# Função para verificar se comando existe
function Test-Command($command) {
    try {
        Get-Command $command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Verificar pré-requisitos
Write-Host "`n📋 Verificando pré-requisitos..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js não encontrado. Instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ NPM não encontrado. Instale o NPM primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js e NPM encontrados" -ForegroundColor Green

# Instalar dependências necessárias
Write-Host "`n📦 Instalando dependências..." -ForegroundColor Yellow

$packages = @(
    "commander",
    "chalk",
    "inquirer",
    "@types/inquirer",
    "ts-node",
    "typescript"
)

foreach ($package in $packages) {
    Write-Host "   Instalando $package..." -ForegroundColor Gray
    npm install $package --save-dev 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ $package instalado" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Erro ao instalar $package" -ForegroundColor Red
    }
}

# Compilar TypeScript
Write-Host "`n🔨 Compilando código TypeScript..." -ForegroundColor Yellow
npx tsc --build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Compilação concluída" -ForegroundColor Green
} else {
    Write-Host "❌ Erro na compilação" -ForegroundColor Red
    exit 1
}

# Criar alias global
Write-Host "`n🌐 Configurando comando global..." -ForegroundColor Yellow

$binPath = Join-Path $PWD "bin"
$arcoExpertPath = Join-Path $binPath "arco-expert.js"

# Criar diretório bin se não existir
if (-not (Test-Path $binPath)) {
    New-Item -Path $binPath -ItemType Directory -Force
}

# Criar arquivo executável
$executableContent = @"
#!/usr/bin/env node
require('ts-node/register');
require('./src/mcp/cli/arco-expert.ts');
"@

Set-Content -Path $arcoExpertPath -Value $executableContent

# Adicionar ao PATH temporariamente
if ($env:PATH -notlike "*$binPath*") {
    $env:PATH = "$binPath;$env:PATH"
}

# Criar script de conveniência para PowerShell
$psScriptPath = Join-Path $binPath "arco-expert.ps1"
$psScriptContent = @"
# ARCO Expert - PowerShell Wrapper
param(
    [Parameter(ValueFromRemainingArguments=`$true)]
    [string[]]`$Arguments
)

& node "`$PSScriptRoot\arco-expert.js" @Arguments
"@

Set-Content -Path $psScriptPath -Value $psScriptContent

Write-Host "✅ Comando global configurado" -ForegroundColor Green

# Criar configuração inicial
Write-Host "`n⚙️  Criando configuração inicial..." -ForegroundColor Yellow

$configDir = Join-Path $env:USERPROFILE ".arco-expert"
$configPath = Join-Path $configDir "config.json"

if (-not (Test-Path $configDir)) {
    New-Item -Path $configDir -ItemType Directory -Force
}

$config = @{
    version = "1.0.0"
    projectPath = $PWD.Path
    lastUpdate = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    preferences = @{
        colorOutput = $true
        verboseMode = $false
        autoUpdate = $true
    }
} | ConvertTo-Json -Depth 3

Set-Content -Path $configPath -Value $config

Write-Host "✅ Configuração criada em: $configPath" -ForegroundColor Green

# Teste de funcionamento
Write-Host "`n🧪 Testando instalação..." -ForegroundColor Yellow

try {
    & node $arcoExpertPath status 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ARCO Expert funcionando corretamente!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  ARCO Expert instalado, mas pode precisar de configuração adicional" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Erro no teste, mas instalação pode estar OK" -ForegroundColor Yellow
}

# Instruções finais
Write-Host "`n🎉 SETUP CONCLUÍDO!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Gray

Write-Host "`n📚 COMO USAR O ARCO EXPERT:" -ForegroundColor Cyan
Write-Host ""
Write-Host "• Pergunta rápida:" -ForegroundColor Yellow
Write-Host "  arco-expert ask `"Como implementar autenticação?`"" -ForegroundColor White
Write-Host ""
Write-Host "• Modo interativo:" -ForegroundColor Yellow
Write-Host "  arco-expert interactive" -ForegroundColor White
Write-Host ""
Write-Host "• Analisar componente:" -ForegroundColor Yellow
Write-Host "  arco-expert analyze src/components/Login.tsx" -ForegroundColor White
Write-Host ""
Write-Host "• Insights arquiteturais:" -ForegroundColor Yellow
Write-Host "  arco-expert insights authentication" -ForegroundColor White
Write-Host ""
Write-Host "• Ver status:" -ForegroundColor Yellow
Write-Host "  arco-expert status" -ForegroundColor White
Write-Host ""
Write-Host "• Ver tópicos disponíveis:" -ForegroundColor Yellow
Write-Host "  arco-expert help-topics" -ForegroundColor White

Write-Host "`n💡 DICA: Use 'arco-expert --help' para ver todos os comandos disponíveis" -ForegroundColor Blue

Write-Host "`n✨ Seu especialista ARCO está pronto para uso no terminal!" -ForegroundColor Magenta
