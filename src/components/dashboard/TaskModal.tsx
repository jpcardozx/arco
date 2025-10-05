/**
 * Task Modal - Pareto Stub
 */

'use client'

import { X } from 'lucide-react'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: () => void
  task?: any
}

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        <p className="text-slate-400 mb-4">
          Funcionalidade em desenvolvimento. Use o form modal em src/components/forms/task-form-modal.tsx
        </p>
        
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}

export default TaskModal
