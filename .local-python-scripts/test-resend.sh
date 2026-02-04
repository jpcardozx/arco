#!/bin/bash
# Quick test do Resend Email Service

cat << 'EOF' > /tmp/test-resend.ts
import { sendWelcomeEmail } from './src/lib/email/resend-service'

async function test() {
  try {
    console.log('🧪 Testando Resend Email...')
    
    const result = await sendWelcomeEmail(
      'arco@consultingarco.com',
      'ARCO Team'
    )
    
    console.log('✅ Email enviado com sucesso!')
    console.log('📧 ID:', result.id)
  } catch (error) {
    console.error('❌ Erro:', error)
  }
}

test()
EOF

echo "Test script criado em /tmp/test-resend.ts"
echo "Execute: npx tsx /tmp/test-resend.ts"
