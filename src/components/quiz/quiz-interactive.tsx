'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, AlertTriangle, Layers, Target, Clock, CheckCircle2 } from 'lucide-react'
import { QUIZ_SECTIONS, QUIZ_CONFIG } from '@/lib/quiz/quiz-config'
import { QuizEngine } from '@/lib/quiz/quiz-engine'
import { QuizState, QuizResponse, LeadProfile } from '@/types/quiz'
import { QuizQuestion } from './quiz-question'
import { QuizResult } from './quiz-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { dashboardLogger } from '@/lib/supabase/dashboard-logger'
import { createClient } from '@/lib/supabase/client'

const SECTION_ICONS = {
  context: Building2,
  'pain-points': AlertTriangle,
  resources: Layers,
  goals: Target,
  urgency: Clock,
}

export function QuizInteractive() {
  const [step, setStep] = useState<'intro' | 'contact' | 'quiz' | 'result'>('intro')
  const [state, setState] = useState<QuizState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    profile: {},
    isComplete: false,
    startedAt: new Date(),
  })
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  })
  const [result, setResult] = useState<any>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const supabase = createClient()

  // Auto-save progress to localStorage
  useEffect(() => {
    if (step === 'quiz' && state.responses.length > 0) {
      try {
        localStorage.setItem('quiz_progress', JSON.stringify({
          state,
          contactInfo,
          savedAt: new Date().toISOString()
        }))
      } catch (error) {
        console.error('Error saving quiz progress:', error)
      }
    }
  }, [state.responses, state.currentSection, state.currentQuestion])

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('quiz_progress')
      if (saved) {
        const { state: savedState, contactInfo: savedContact, savedAt } = JSON.parse(saved)

        // Only restore if saved less than 24h ago
        const savedDate = new Date(savedAt)
        const hoursSince = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60)

        if (hoursSince < 24 && savedState.responses.length > 0) {
          setState(savedState)
          setContactInfo(savedContact)
          setStep('quiz')
        }
      }
    } catch (error) {
      console.error('Error loading quiz progress:', error)
    }
  }, [])

  const currentSection = QUIZ_SECTIONS[state.currentSection]
  const currentQuestion = currentSection?.questions[state.currentQuestion]
  
  // Calcula total de questões
  const totalQuestions = QUIZ_SECTIONS.reduce((sum, section) => sum + section.questions.length, 0)
  const currentQuestionIndex = QUIZ_SECTIONS
    .slice(0, state.currentSection)
    .reduce((sum, section) => sum + section.questions.length, 0) + state.currentQuestion

  // Carrega resposta atual
  const currentValue = state.responses.find(r => r.questionId === currentQuestion?.id)?.value || null

  useEffect(() => {
    if (step === 'quiz') {
      dashboardLogger.pageView('/quiz', { section: currentSection?.id })
    }
  }, [step, state.currentSection])

  const handleStart = () => {
    setStep('contact')
    dashboardLogger.action('quiz_started', { config: QUIZ_CONFIG.title })
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactInfo.name || !contactInfo.email) {
      return
    }

    setStep('quiz')
    dashboardLogger.action('quiz_contact_submitted', { email: contactInfo.email })
  }

  const handleAnswer = (value: string | string[] | number) => {
    if (!currentQuestion) return

    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date(),
    }

    setState(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== currentQuestion.id),
        newResponse,
      ],
    }))
  }

  const handleNext = () => {
    const isLastQuestionInSection = state.currentQuestion === currentSection.questions.length - 1
    const isLastSection = state.currentSection === QUIZ_SECTIONS.length - 1

    if (isLastQuestionInSection && isLastSection) {
      // Finalizar quiz
      finishQuiz()
    } else if (isLastQuestionInSection) {
      // Próxima seção
      setState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0,
      }))
      dashboardLogger.action('quiz_section_completed', { 
        section: currentSection.id,
        nextSection: QUIZ_SECTIONS[state.currentSection + 1]?.id 
      })
    } else {
      // Próxima pergunta
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }))
    }
  }

  const handleBack = () => {
    if (state.currentQuestion === 0) {
      if (state.currentSection === 0) {
        // Voltar para info de contato
        setStep('contact')
      } else {
        // Voltar para seção anterior
        const prevSection = QUIZ_SECTIONS[state.currentSection - 1]
        setState(prev => ({
          ...prev,
          currentSection: prev.currentSection - 1,
          currentQuestion: prevSection.questions.length - 1,
        }))
      }
    } else {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }))
    }
  }

  const finishQuiz = () => {
    const quizResult = QuizEngine.processQuizResult(state.responses, contactInfo)
    
    setResult(quizResult)
    setState(prev => ({
      ...prev,
      isComplete: true,
      completedAt: new Date(),
    }))
    setStep('result')

    // Salvar no Supabase
    saveQuizResult(quizResult)

    dashboardLogger.action('quiz_completed', {
      score: quizResult.profile.score,
      leadScore: quizResult.profile.leadScore,
      verticals: quizResult.profile.verticals,
    })
  }

  const saveQuizResult = async (quizResult: any) => {
    try {
      setSaveError(null)
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase.from('quiz_results' as any).insert({
        user_id: user?.id || null,
        email: contactInfo.email,
        name: contactInfo.name,
        company: contactInfo.company || null,
        phone: contactInfo.phone || null,
        score: quizResult.profile.score || 0,
        lead_score: quizResult.profile.leadScore || 0,
        urgency_level: quizResult.profile.urgencyLevel || 'low',
        verticals: quizResult.profile.verticals || [],
        responses: state.responses,
        profile_data: quizResult.profile,
        recommendations: quizResult.recommendations || [],
        source: 'quiz-diagnostico-estrategico',
      })

      if (error) {
        throw error
      }

      // Clear localStorage after successful save
      localStorage.removeItem('quiz_progress')
      dashboardLogger.action('quiz_saved_to_db', { email: contactInfo.email })
    } catch (error) {
      console.error('❌ Erro ao salvar quiz:', error)
      setSaveError('Não foi possível salvar seus resultados. Você ainda pode agendar uma consultoria.')
      dashboardLogger.action('quiz_save_error', {
        email: contactInfo.email,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  const handleDownloadReport = async () => {
    dashboardLogger.action('quiz_report_download_requested', { email: contactInfo.email })

    try {
      // Send email with results via API
      const response = await fetch('/api/quiz/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contactInfo.email,
          name: contactInfo.name,
          result
        })
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar relatório')
      }

      dashboardLogger.action('quiz_report_sent', { email: contactInfo.email })
    } catch (error) {
      console.error('Error sending report:', error)
      // Fallback: redirect to contact page with pre-filled data
      window.location.href = `/contato?email=${encodeURIComponent(contactInfo.email)}&name=${encodeURIComponent(contactInfo.name)}&subject=Relatório de Diagnóstico`
    }
  }

  const handleScheduleCall = () => {
    dashboardLogger.action('quiz_schedule_call_clicked', { email: contactInfo.email })
    window.location.href = '/agendamentos'
  }

  if (step === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {QUIZ_CONFIG.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {QUIZ_CONFIG.subtitle}
          </p>
        </div>

        <Card className="p-8 text-left">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              {QUIZ_CONFIG.description}
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">~{QUIZ_CONFIG.estimatedTime} minutos</div>
                  <div className="text-sm text-muted-foreground">Tempo estimado</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{QUIZ_CONFIG.totalQuestions} perguntas</div>
                  <div className="text-sm text-muted-foreground">Rápido e direto</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">100% Personalizado</div>
                  <div className="text-sm text-muted-foreground">Análise exclusiva</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-3">O que você vai descobrir:</h3>
              <ul className="space-y-2">
                {QUIZ_SECTIONS.map((section) => {
                  const Icon = SECTION_ICONS[section.id as keyof typeof SECTION_ICONS]
                  return (
                    <li key={section.id} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{section.description}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Card>

        <Button size="lg" onClick={handleStart} className="text-lg px-8 py-6">
          Iniciar Diagnóstico Gratuito
        </Button>

        <p className="text-xs text-muted-foreground">
          Seus dados estão seguros e serão usados apenas para personalizar sua experiência
        </p>
      </motion.div>
    )
  }

  if (step === 'contact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <Card className="p-8">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Vamos começar!</h2>
              <p className="text-muted-foreground">
                Para personalizar sua análise, precisamos de algumas informações
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  required
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="João Silva"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail profissional *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="joao@empresa.com.br"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Nome da empresa"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continuar para o Diagnóstico
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </form>
        </Card>
      </motion.div>
    )
  }

  if (step === 'quiz' && currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Section Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {QUIZ_SECTIONS.map((section, index) => {
            const Icon = SECTION_ICONS[section.id as keyof typeof SECTION_ICONS]
            const isCurrent = index === state.currentSection
            const isCompleted = index < state.currentSection

            return (
              <div
                key={section.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium hidden md:inline">
                  {section.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuizQuestion
            key={`${state.currentSection}-${state.currentQuestion}`}
            question={currentQuestion}
            value={currentValue}
            onChange={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={state.currentSection === 0 && state.currentQuestion === 0}
            isLast={
              state.currentSection === QUIZ_SECTIONS.length - 1 &&
              state.currentQuestion === currentSection.questions.length - 1
            }
            currentQuestion={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
        </AnimatePresence>
      </div>
    )
  }

  if (step === 'result' && result) {
    return (
      <div className="max-w-5xl mx-auto">
        <QuizResult
          result={result}
          onDownloadReport={handleDownloadReport}
          onScheduleCall={handleScheduleCall}
        />
      </div>
    )
  }

  return null
}
