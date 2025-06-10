'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Info, AlertCircle, CheckCircle, AlertTriangle, Bell } from 'lucide-react';
import React, { useState, useEffect, createContext, useContext } from 'react';

import { cn } from '../../../lib/utils/ui-utils';

// Toast types and interfaces
export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'custom';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

// Context for toast management
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add a new toast
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: Toast = {
      id,
      duration: 5000,
      // Apply default type only if not provided in toast
      ...{ type: 'info' },
      ...toast,
    };
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  // Remove a toast by ID
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Remove all toasts
  const removeAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Custom hook for using toasts
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

// Toast container component
function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext)!;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[420px] flex-col items-end gap-2 md:bottom-6 md:right-6">
      <AnimatePresence initial={false}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual toast component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!toast.duration) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  // Animation variants
  const toastVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  // Default icons based on type
  const getDefaultIcon = () => {
    switch (toast.type) {
      case 'info':
        return <Info size={18} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-amber-500" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-500" />;
      default:
        return <Bell size={18} className="text-neutral-500" />;
    }
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  // Toast style based on type
  const getToastClassNames = () => {
    const baseClasses =
      'bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-4 w-full max-w-md flex items-start gap-3 border';

    switch (toast.type) {
      case 'info':
        return cn(baseClasses, 'border-blue-200 dark:border-blue-900/40');
      case 'success':
        return cn(baseClasses, 'border-green-200 dark:border-green-900/40');
      case 'warning':
        return cn(baseClasses, 'border-amber-200 dark:border-amber-900/40');
      case 'error':
        return cn(baseClasses, 'border-red-200 dark:border-red-900/40');
      default:
        return cn(baseClasses, 'border-neutral-200 dark:border-neutral-700');
    }
  };

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={getToastClassNames()}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="mt-0.5">{toast.icon || getDefaultIcon()}</div>

      <div className="flex-1">
        {toast.title && (
          <h4 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {toast.title}
          </h4>
        )}
        <p className="text-sm text-neutral-700 dark:text-neutral-300">{toast.message}</p>

        {toast.action && (
          <button
            className="mt-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={e => {
              e.stopPropagation();
              toast.action?.onClick();
              onClose();
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
        className="text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
