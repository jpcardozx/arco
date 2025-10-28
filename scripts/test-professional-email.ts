import { render } from '@react-email/components'
import { Resend } from 'resend'
import { WeeklyDigestSimple } from '../emails/templates/WeeklyDigestSimple'

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // Use env var, never hardcode
const TEST_EMAIL = process.env.TEST_EMAIL || 'jpcardozo@imobiliariaipe.com.br'

async function testProfessionalEmail() {
  console.log('📧 ARCO Email System v3.0 - Professional Test')
  console.log('============================================\n')

  // Mock data realista
  const emailData = {
    userName: 'João Pedro Cardoso',
    userEmail: TEST_EMAIL,
    metrics: {
      visits: '2.543',
      conversions: '87',
      revenue: 'R$ 15.420',
    },
    weekRange: '20-26 Out 2024',
  }

  // Render HTML
  const html = await render(WeeklyDigestSimple(emailData))

  console.log(`✅ Template renderizado`)
  console.log(`📏 Tamanho: ${(html.length / 1024).toFixed(1)}KB`)
  console.log(`📊 Features: Heroicons inline, Professional copy, Token-based design`)
  console.log(`🎨 UI/UX: Clean spacing, Semantic colors, Clear hierarchy\n`)

  // Send via Resend
  if (!RESEND_API_KEY || RESEND_API_KEY.includes('your')) {
    console.log('⚠️  RESEND_API_KEY não configurado - apenas rendering test')
    return
  }

  const resend = new Resend(RESEND_API_KEY)

  try {
    console.log(`📤 Enviando para: ${TEST_EMAIL}`)
    
    const result = await resend.emails.send({
      from: 'ARCO Consultoria <noreply@consultingarco.com>',
      to: TEST_EMAIL,
      subject: `${emailData.userName.split(' ')[0]}, seu resumo semanal: ${emailData.metrics.conversions} conversões`,
      html,
    })

    console.log(`✅ Email enviado! ID: ${result.data?.id}`)
    console.log(`\n📋 Validar:`)
    console.log(`   - URLs corretas (consultingarco.com)`)
    console.log(`   - Logo renderizando (verificar se existe public/logo.svg)`)
    console.log(`   - Heroicons inline (eye, checkCircle, currencyDollar)`)
    console.log(`   - Copy profissional (sem emojis nos cards)`)
    console.log(`   - Spacing responsivo (mobile + desktop)`)
    console.log(`   - Typography hierárquica (36px→44px revenue)`)
    console.log(`   - Shadows sutis (elevated cards)`)
    
  } catch (error) {
    console.error('❌ Erro ao enviar:', error)
  }
}

testProfessionalEmail().catch(console.error)
