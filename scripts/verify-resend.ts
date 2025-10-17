#!/usr/bin/env tsx
/**
 * Verify Resend API Configuration
 */

import { Resend } from 'resend'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

async function verifyResend() {
  console.log('🔍 Verificando configuração do Resend...\n')

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('❌ RESEND_API_KEY não encontrada em .env.local')
    console.log('\n📋 Configure:')
    console.log('   1. Crie conta em https://resend.com')
    console.log('   2. Gere API key no dashboard')
    console.log('   3. Adicione em .env.local: RESEND_API_KEY=re_...')
    process.exit(1)
  }

  console.log(`✅ API Key encontrada: ${apiKey.substring(0, 10)}...`)

  try {
    const resend = new Resend(apiKey)

    // Test API by fetching emails
    console.log('\n📡 Testando conexão com Resend API...')
    const { data, error } = await resend.emails.list({ limit: 1 })

    if (error) {
      console.error('❌ Erro na API:', error)
      process.exit(1)
    }

    console.log('✅ API funcionando!')
    console.log(`📧 Emails no histórico: ${data?.data?.length || 0}`)

    // Send test email
    console.log('\n🧪 Enviando email de teste...')
    const testEmail = await resend.emails.send({
      from: 'ARCO Testing <onboarding@resend.dev>', // Resend test domain
      to: 'delivered@resend.dev', // Resend test inbox
      subject: '✅ Resend Test - ARCO System',
      html: `
        <h1>🎉 Resend está funcionando!</h1>
        <p>Este é um email de teste do sistema ARCO.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Se você recebeu este email, a integração Resend está 100% funcional.
        </p>
      `
    })

    if (testEmail.error) {
      console.error('❌ Erro ao enviar:', testEmail.error)
      process.exit(1)
    }

    console.log('✅ Email de teste enviado!')
    console.log(`📬 ID: ${testEmail.data?.id}`)
    console.log('\n💡 Dica: Configure domínio customizado para emails de produção')
    console.log('   Dashboard: https://resend.com/domains')
    console.log('\n🎉 Resend está 100% funcional!')

  } catch (error) {
    console.error('❌ Erro:', error)
    process.exit(1)
  }
}

verifyResend()
