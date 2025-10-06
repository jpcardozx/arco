// Enhanced Real-time Notification System
// File: /src/components/notifications/NotificationSystem.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X, 
  User, 
  TrendingUp,
  Zap
} from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'achievement'
  title: string
  message: string
  icon?: string
  avatar?: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  achievement: Zap
}

const colorMap = {
  success: {
    bg: 'from-emerald-500/20 to-green-600/20',
    border: 'border-emerald-400/30',
    icon: 'text-emerald-400'
  },
  warning: {
    bg: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-400/30',
    icon: 'text-amber-400'
  },
  info: {
    bg: 'from-blue-500/20 to-cyan-600/20',
    border: 'border-blue-400/30',
    icon: 'text-blue-400'
  },
  achievement: {
    bg: 'from-purple-500/20 to-pink-600/20',
    border: 'border-purple-400/30',
    icon: 'text-purple-400'
  }
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const newNotification = payload.new as Notification
          setNotifications(prev => [newNotification, ...prev])
          
          // Auto-show notification for 5 seconds
          setTimeout(() => {
            setNotifications(prev => 
              prev.filter(n => n.id !== newNotification.id)
            )
          }, 5000)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      {/* Bell Icon with Badge */}
      <motion.button
        className="relative p-2 rounded-xl bg-white/10 border border-white/20 
                   hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-white" />
        
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r 
                       from-red-500 to-pink-500 rounded-full flex items-center 
                       justify-center text-xs font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
        <AnimatePresence>
          {notifications.slice(0, 3).map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onDismiss={(id) => 
                setNotifications(prev => prev.filter(n => n.id !== id))
              }
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              className="fixed top-16 right-4 w-96 max-h-96 bg-slate-900/95 
                         backdrop-blur-xl border border-white/20 rounded-2xl 
                         shadow-2xl overflow-hidden z-50"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <p className="text-sm text-white/60">
                  {unreadCount} new notifications
                </p>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/60">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification} 
                    />
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NotificationToast({ 
  notification, 
  onDismiss 
}: { 
  notification: Notification
  onDismiss: (id: string) => void 
}) {
  const Icon = iconMap[notification.type]
  const colors = colorMap[notification.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative bg-gradient-to-r ${colors.bg} backdrop-blur-xl 
                  border ${colors.border} rounded-2xl p-4 shadow-2xl overflow-hidden`}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      
      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <motion.div
          className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 
                     flex items-center justify-center ${colors.icon}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-1">
            {notification.title}
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            {notification.message}
          </p>
          
          {notification.actionUrl && (
            <motion.button
              className="mt-2 text-xs text-teal-400 hover:text-teal-300 
                         transition-colors underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          )}
        </div>
        
        {/* Dismiss button */}
        <motion.button
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 
                     transition-colors text-white/60 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDismiss(notification.id)}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r 
                   from-teal-400 to-cyan-400"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
      />
    </motion.div>
  )
}

function NotificationItem({ notification }: { notification: Notification }) {
  const Icon = iconMap[notification.type]
  const colors = colorMap[notification.type]

  return (
    <motion.div
      className={`p-4 border-b border-white/5 hover:bg-white/5 
                  transition-colors cursor-pointer ${
                    !notification.read ? 'bg-white/[0.02]' : ''
                  }`}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 
                         flex items-center justify-center ${colors.icon}`}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-white">
              {notification.title}
            </h4>
            {!notification.read && (
              <div className="w-2 h-2 bg-teal-400 rounded-full" />
            )}
          </div>
          
          <p className="text-xs text-white/60 mb-2">
            {notification.message}
          </p>
          
          <p className="text-xs text-white/40">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}