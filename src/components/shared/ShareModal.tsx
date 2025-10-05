/**
 * Share Modal Component - Pareto Stub
 */

'use client'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  file?: any
}

export function ShareModal({ isOpen, onClose, file }: ShareModalProps) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-lg">
        <h3 className="text-white text-lg mb-4">Compartilhar Arquivo</h3>
        <p className="text-slate-400 mb-4">Funcionalidade em desenvolvimento</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
