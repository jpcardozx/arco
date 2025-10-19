/**
 * Theme Toggle Component
 * 
 * Elegant theme switcher with smooth transitions
 * Supports Light/Dark/Auto modes
 */

'use client';

import React from 'react';
import { useTheme } from '@/components/providers/theme-provider';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'auto' as const, label: 'Auto', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const Icon = currentTheme.icon;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden z-50 backdrop-blur-sm"
            >
              {themes.map((themeOption) => {
                const ThemeIcon = themeOption.icon;
                const isActive = theme === themeOption.value;
                
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => {
                      setTheme(themeOption.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <ThemeIcon className="w-4 h-4" />
                    {themeOption.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTheme"
                        className="ml-auto w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
