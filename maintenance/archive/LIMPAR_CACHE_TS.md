# Limpar e Recompilar TypeScript

Este script limpa os caches do TypeScript e do Next.js e força uma recompilação total do projeto.

## Problemas resolvidos

1. Erros de TypeScript do tipo "Cannot find module '@/components/...'"
2. Problemas de reconhecimento de módulos após migração de componentes
3. Problemas com o cache do Next.js não reconhecendo novas alterações

## Execução

Execute o script abaixo para limpar os caches e recomeçar uma compilação limpa:

```powershell
# Parar o servidor se estiver rodando
Get-Process -Name "node" -ErrorAction SilentlyContinue | ForEach-Object { $_.Kill() }

# Remover arquivos de cache
Remove-Item -Path ".\node_modules\.cache" -Recurse -ErrorAction SilentlyContinue
Remove-Item -Path ".\.next" -Recurse -ErrorAction SilentlyContinue
Remove-Item -Path ".\tsconfig.tsbuildinfo" -ErrorAction SilentlyContinue

# Reinstalar dependências
npm install

# Executar o build para validar a tipagem
npm run build

# Iniciar o servidor em modo de desenvolvimento
npm run dev
```
