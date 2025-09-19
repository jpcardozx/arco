# Guia de Resolucao de Problemas ARCO

Este documento fornece instrucoes sobre como corrigir problemas comuns no projeto ARCO.

## Problemas de Codificacao em Scripts PowerShell

Se voce encontrar erros relacionados a caracteres especiais em scripts PowerShell, use os arquivos de script simplificados:

- `Fix-ESLint-Simple.ps1` em vez de `Fix-ESLint.ps1`
- `Fix-Tailwind-Simple.ps1` em vez de `Fix-Tailwind.ps1`
- `Fix-ARCO-Master.ps1` em vez de `Master-Fix.ps1`

## Como Executar o Processo de Correcao

### Metodo 1: Usando o Arquivo Batch

1. Simplesmente clique duas vezes no arquivo `CORRIGIR_PROJETO.bat` na pasta raiz do projeto
2. Siga as instrucoes na tela

### Metodo 2: Usando PowerShell Diretamente

Se preferir executar os scripts PowerShell diretamente:

```powershell
cd "Caminho\Para\Seu\Projeto\arco"
powershell -ExecutionPolicy Bypass -File .\scripts\Fix-ARCO-Master.ps1
```

### Metodo 3: Correcoes Individuais

Para corrigir apenas problemas de ESLint:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\Fix-ESLint-Simple.ps1
```

Para corrigir apenas problemas de Tailwind:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\Fix-Tailwind-Simple.ps1
```

## Verificacao Apos Correcao

Depois de aplicar as correcoes:

1. Execute `npm run dev` para iniciar o servidor de desenvolvimento
2. Verifique se as classes do Tailwind estao sendo aplicadas corretamente
3. Execute `npx eslint .` para verificar se ainda ha erros do ESLint que precisam de correcao manual

## Erros Comuns e Solucoes

### Erro: "A funcao nao e reconhecida como o nome de um cmdlet"

Este erro pode ocorrer se o PowerShell nao reconhecer caracteres especiais nos scripts. Use as versoes simplificadas dos scripts mencionadas acima.

### Erro: "O sistema nao pode encontrar o arquivo especificado"

Verifique se voce esta no diretorio raiz do projeto ao executar os scripts.

### Erro: "Nao e possivel carregar o arquivo... pois a execucao de scripts foi desabilitada"

Execute o PowerShell como administrador e digite:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro: "O NPM nao e reconhecido como um comando interno ou externo"

Verifique se o Node.js esta instalado corretamente em seu sistema.
