'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'featured';
  onOpenChange?: (open: boolean) => void;
}

export function CollapsibleSection({
  title,
  description,
  icon,
  children,
  defaultOpen = false,
  variant = 'default',
  onOpenChange
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <motion.div
      layout
      className={`rounded-lg border transition-all duration-300 overflow-hidden ${
        variant === 'featured'
          ? isOpen
            ? 'border-teal-500/50 bg-slate-800/50'
            : 'border-slate-700 bg-slate-900/30'
          : isOpen
          ? 'border-slate-600 bg-slate-800/30'
          : 'border-slate-700 bg-slate-900/20'
      }`}
    >
      <motion.button
        onClick={handleToggle}
        className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-start gap-4 text-left flex-1">
          {icon && (
            <div className="flex-shrink-0 mt-1 text-teal-400">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="border-t border-slate-700"
          >
            <div className="px-6 py-4 text-slate-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface CollapsibleGroupProps {
  sections: Array<{
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  }>;
  variant?: 'default' | 'featured';
  allowMultiple?: boolean;
}

export function CollapsibleGroup({
  sections,
  variant = 'default',
  allowMultiple = false
}: CollapsibleGroupProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const handleOpenChange = (id: string, open: boolean) => {
    const newSet = new Set(openSections);
    if (open) {
      if (!allowMultiple) {
        newSet.clear();
      }
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setOpenSections(newSet);
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <CollapsibleSection
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          variant={variant}
          defaultOpen={openSections.has(section.id)}
          onOpenChange={(open) => handleOpenChange(section.id, open)}
        >
          {section.content}
        </CollapsibleSection>
      ))}
    </div>
  );
}
