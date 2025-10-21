#!/usr/bin/env tsx

/**
 * Script de Teste: Meta Conversions API
 * 
 * Testa a integração com a Meta Conversions API enviando um evento de teste.
 * 
 * Uso:
 *   npx tsx scripts/test-meta-api.ts
 * 
 * Requisitos:
 *   - META_DATASET_ID configurado em .env.local
 *   - META_CONVERSION_API_TOKEN configurado em .env.local
 *   - META_TEST_EVENT_CODE configurado (opcional)
 */

import { MetaConversionsAPI } from '../src/lib/tracking/meta-conversions-api';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  META_DATASET_ID: process.env.META_DATASET_ID,
  META_CONVERSION_API_TOKEN: process.env.META_CONVERSION_API_TOKEN,
  META_TEST_EVENT_CODE: process.env.META_TEST_EVENT_CODE,
};

// ============================================================================
// VALIDATION
// ============================================================================

function validateConfig() {
  const errors: string[] = [];

  if (!CONFIG.META_DATASET_ID) {
    errors.push('❌ META_DATASET_ID não configurado em .env.local');
  }

  if (!CONFIG.META_CONVERSION_API_TOKEN) {
    errors.push('❌ META_CONVERSION_API_TOKEN não configurado em .env.local');
  }

  if (errors.length > 0) {
    console.error('\n🚫 Configuração Incompleta:\n');
    errors.forEach(error => console.error(error));
    console.error('\n📝 Configure as variáveis em .env.local antes de continuar.\n');
    process.exit(1);
  }
}

// ============================================================================
// TEST DATA
// ============================================================================

const TEST_LEAD = {
  email: 'teste@example.com',
  phone: '+5511999999999',
  firstName: 'João',
  lastName: 'Silva',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01310-100',
  value: 100,
};

// ============================================================================
// MAIN TEST FUNCTION
// ============================================================================

async function runTest() {
  console.log('\n🚀 Iniciando teste da Meta Conversions API...\n');

  // Validar configuração
  validateConfig();

  console.log('✅ Configuração validada');
  console.log(`   Dataset ID: ${CONFIG.META_DATASET_ID}`);
  console.log(`   Test Code: ${CONFIG.META_TEST_EVENT_CODE || 'não configurado'}\n`);

  // Inicializar API
  const metaAPI = new MetaConversionsAPI({
    accessToken: CONFIG.META_CONVERSION_API_TOKEN,
    datasetId: CONFIG.META_DATASET_ID,
    testEventCode: CONFIG.META_TEST_EVENT_CODE,
  });

  console.log('📤 Enviando evento de teste...\n');
  console.log('Dados do lead de teste:');
  console.log(JSON.stringify(TEST_LEAD, null, 2));
  console.log('');

  try {
    // Enviar evento de teste
    const response = await metaAPI.trackLead(TEST_LEAD);

    console.log('✅ Evento enviado com sucesso!\n');
    console.log('Resposta da API:');
    console.log(JSON.stringify(response, null, 2));
    console.log('');

    // Instruções de verificação
    console.log('📋 Próximos passos:\n');
    console.log('1. Aguarde ~30 segundos');
    console.log('2. Acesse: https://business.facebook.com/events_manager');
    console.log('3. Selecione seu Dataset (Pixel)');
    
    if (CONFIG.META_TEST_EVENT_CODE) {
      console.log('4. Vá em "Eventos de Teste"');
      console.log('5. Verifique se o evento apareceu com o código:', CONFIG.META_TEST_EVENT_CODE);
    } else {
      console.log('4. Vá em "Visão Geral"');
      console.log('5. Verifique se o evento apareceu nos últimos eventos');
      console.log('\n⚠️  Nota: Sem test_event_code, o evento afetará dados de produção!');
      console.log('   Configure META_TEST_EVENT_CODE em .env.local para testes seguros.');
    }

    console.log('\n🎉 Teste concluído com sucesso!\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Erro ao enviar evento:\n');
    
    if (error instanceof Error) {
      console.error('Mensagem:', error.message);
      
      // Erros comuns e soluções
      if (error.message.includes('190')) {
        console.error('\n💡 Solução: Token de acesso inválido ou expirado');
        console.error('   - Gere um novo token no Meta Events Manager');
        console.error('   - Atualize META_CONVERSION_API_TOKEN em .env.local');
      }
      
      if (error.message.includes('100')) {
        console.error('\n💡 Solução: Dataset ID inválido');
        console.error('   - Verifique META_DATASET_ID em .env.local');
        console.error('   - Confirme o ID no Meta Events Manager');
      }
      
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('\n💡 Solução: Erro de conexão');
        console.error('   - Verifique sua conexão com a internet');
        console.error('   - Confirme se graph.facebook.com está acessível');
      }
    } else {
      console.error(error);
    }

    console.error('\n📚 Documentação: docs/META_CONVERSIONS_API_SETUP.md\n');
    process.exit(1);
  }
}

// ============================================================================
// RUN
// ============================================================================

runTest().catch(error => {
  console.error('\n💥 Erro fatal:', error);
  process.exit(1);
});
