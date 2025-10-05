/**
 * Enhanced Toast Notifications
 * Professional feedback system for user actions
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react'
import { create } from 'zustand'
import { useEffect } from 'react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  description?: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7)
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }]
    }))

    // Auto-remove after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    }, toast.duration || 5000)
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
}))

// Helper hook for easy toast usage
export function useToast() {
  const { addToast } = useToastStore()

  return {
    success: (title: string, description?: string) =>
      addToast({ type: 'success', title, description }),
    error: (title: string, description?: string) =>
      addToast({ type: 'error', title, description }),
    info: (title: string, description?: string) =>
      addToast({ type: 'info', title, description }),
    warning: (title: string, description?: string) =>
      addToast({ type: 'warning', title, description })
  }
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  }

  const colors = {
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      icon: 'text-emerald-500',
      text: 'text-emerald-100'
    },
    error: {
      bg: 'bg-red-500/10 border-red-500/30',
      icon: 'text-red-500',
      text: 'text-red-100'
    },
    warning: {
      bg: 'bg-orange-500/10 border-orange-500/30',
      icon: 'text-orange-500',
      text: 'text-orange-100'
    },
    info: {
      bg: 'bg-blue-500/10 border-blue-500/30',
      icon: 'text-blue-500',
      text: 'text-blue-100'
    }
  }

  const Icon = icons[toast.type]
  const color = colors[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm ${color.bg} shadow-xl max-w-md w-full`}
    >
      <Icon className={`h-5 w-5 mt-0.5 ${color.icon} flex-shrink-0`} />

      <div className="flex-1 min-w-0">
        <p className={`font-semibold ${color.text}`}>{toast.title}</p>
        {toast.description && (
          <p className="text-sm text-slate-300 mt-1">{toast.description}</p>
        )}
      </div>

      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
