// Este script serve para limpar o cache e forçar a reconstrução dos arquivos estáticos do Next.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Função para executar comandos com retorno de promessa
function execCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Executando: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.warn(`Aviso: ${stderr}`);
      }
      console.log(`Saída: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Diretórios para limpar
const diretoriosParaLimpar = [
  '.next',
  '.cache',
  'node_modules/.cache'
];

// Função principal
async function limparEReiniciar() {
  try {
    console.log('=== Iniciando processo de limpeza e reconstrução ===');

    // 1. Parar qualquer servidor Next.js em execução
    try {
      console.log('Tentando parar servidores Next.js em execução...');
      await execCommand('taskkill /f /im node.exe');
    } catch (error) {
      console.log('Nenhum servidor Node.js encontrado ou não foi possível encerrar.');
    }

    // 2. Limpar diretórios de cache
    console.log('Limpando diretórios de cache...');
    for (const dir of diretoriosParaLimpar) {
      const dirPath = path.join(__dirname, dir);
      if (fs.existsSync(dirPath)) {
        console.log(`Removendo ${dir}...`);
        rimraf.sync(dirPath);
      }
    }

    // 3. Limpar cache do npm
    console.log('Limpando cache do NPM...');
    await execCommand('npm cache clean --force');

    // 4. Reinstalar dependências
    console.log('Reinstalando dependências...');
    await execCommand('npm install');

    // 5. Reconstruir o projeto
    console.log('Reconstruindo o projeto...');
    await execCommand('npm run build');

    console.log('=== Processo concluído com sucesso! ===');
    console.log('Para iniciar o servidor de desenvolvimento, execute:');
    console.log('npm run dev');

  } catch (error) {
    console.error('Falha no processo:', error);
  }
}

// Executar a função principal
limparEReiniciar();
