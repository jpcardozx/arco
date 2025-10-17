'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { QuizQuestion as QuizQuestionType, type QuizOption } from '@/types/quiz'
import { cn } from '@/lib/utils'

interface QuizQuestionProps {
  question: QuizQuestionType
  value: string | string[] | number | null
  onChange: (value: string | string[] | number) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  currentQuestion: number
  totalQuestions: number
}

export function QuizQuestion({
  question,
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
  currentQuestion,
  totalQuestions,
}: QuizQuestionProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleSingleChoice = (optionId: string) => {
    onChange(optionId)
  }

  const handleMultipleChoice = (optionId: string) => {
    const currentValue = Array.isArray(value) ? value : []
    const maxSelections = 3

    if (currentValue.includes(optionId)) {
      onChange(currentValue.filter(id => id !== optionId))
    } else if (currentValue.length < maxSelections) {
      onChange([...currentValue, optionId])
    }
  }

  const handleScale = (optionId: string) => {
    onChange(optionId)
  }

  const isOptionSelected = (optionId: string): boolean => {
    if (Array.isArray(value)) {
      return value.includes(optionId)
    }
    return value === optionId
  }

  const canProceed = (): boolean => {
    if (!question.required) return true
    
    if (question.type === 'multiple-choice') {
      return Array.isArray(value) && value.length > 0
    }
    
    return value !== null && value !== ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Pergunta {currentQuestion + 1} de {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {question.title}
          </h2>
          {question.description && (
            <p className="mt-2 text-muted-foreground">
              {question.description}
            </p>
          )}
          {question.type === 'multiple-choice' && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione até 3 opções
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 pt-4">
          {question.type === 'single-choice' && question.options?.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={isOptionSelected(option.id)}
              onClick={() => handleSingleChoice(option.id)}
              type="single"
            />
          ))}

          {question.type === 'multiple-choice' && question.options?.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={isOptionSelected(option.id)}
              onClick={() => handleMultipleChoice(option.id)}
              type="multiple"
            />
          ))}

          {question.type === 'scale' && question.options?.map((option, index) => (
            <QuizScaleOption
              key={option.id}
              option={option}
              index={index}
              totalOptions={question.options?.length || 0}
              isSelected={isOptionSelected(option.id)}
              onClick={() => handleScale(option.id)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirst}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed()}
          className="gap-2"
        >
          {isLast ? (
            <>
              Finalizar
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Próxima
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}

// Option Component
interface QuizOptionComponentProps {
  option: QuizOption
  isSelected: boolean
  onClick: () => void
  type: 'single' | 'multiple'
}

function QuizOption({ option, isSelected, onClick, type }: QuizOptionComponentProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-lg border-2 text-left transition-all',
        'hover:border-primary/50 hover:bg-accent/50',
        isSelected
          ? 'border-primary bg-primary/10 shadow-md'
          : 'border-border bg-background'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all',
          type === 'single' && 'rounded-full',
          type === 'multiple' && 'rounded',
          isSelected
            ? 'border-primary bg-primary'
            : 'border-muted-foreground'
        )}>
          {isSelected && (
            <Check className="w-full h-full p-0.5 text-primary-foreground" />
          )}
        </div>
        <span className="font-medium">{option.label}</span>
      </div>
    </motion.button>
  )
}

// Scale Option Component
interface QuizScaleOptionProps {
  option: QuizOption
  index: number
  totalOptions: number
  isSelected: boolean
  onClick: () => void
}

function QuizScaleOption({ option, index, totalOptions, isSelected, onClick }: QuizScaleOptionProps) {
  // Gradient do vermelho ao verde
  const getColor = () => {
    const ratio = index / (totalOptions - 1)
    if (ratio < 0.5) {
      // Vermelho para amarelo
      return `hsl(${ratio * 120}, 70%, ${isSelected ? '55%' : '45%'})`
    } else {
      // Amarelo para verde
      return `hsl(${ratio * 120}, 70%, ${isSelected ? '55%' : '45%'})`
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-lg border-2 text-left transition-all',
        isSelected ? 'shadow-lg' : 'hover:shadow-md'
      )}
      style={{
        borderColor: isSelected ? getColor() : 'var(--border)',
        backgroundColor: isSelected ? `${getColor()}15` : 'var(--background)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{option.label}</span>
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm',
            isSelected && 'ring-2 ring-offset-2'
          )}
          style={{
            backgroundColor: getColor(),
          }}
        >
          {index + 1}
        </div>
      </div>
    </motion.button>
  )
}
