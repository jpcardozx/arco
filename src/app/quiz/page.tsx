import { QuizInteractive } from '@/components/quiz/quiz-interactive'
import { MainLayout } from '@/components/layout/MainLayout'

export const metadata = {
  title: 'Diagnóstico Estratégico Digital | ARCO',
  description: 'Avalie a maturidade digital do seu negócio em 5 minutos e receba recomendações personalizadas.',
}

// Force dynamic rendering to avoid build-time Supabase client initialization
export const dynamic = 'force-dynamic'

export default function QuizPage() {
  return (
    <MainLayout showHeader={true} showFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <QuizInteractive />
        </div>
      </div>
    </MainLayout>
  )
}
