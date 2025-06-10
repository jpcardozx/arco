'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface PortfolioTabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export default function PortfolioTabs({
  items,
  defaultTab = items[0]?.id || '',
  className = '',
}: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Find the active content
  const activeContent = items.find(item => item.id === activeTab)?.content;

  return (
    <div className={className}>
      <div className="hide-scrollbar mb-6 flex overflow-x-auto border-b border-neutral-200 dark:border-neutral-700">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative mr-4 px-4 py-2 text-sm font-medium transition-all ${
              activeTab === item.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-neutral-600 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-300'
            } `}
            aria-selected={activeTab === item.id}
            role="tab"
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="tab-content"
      >
        {activeContent}
      </motion.div>
    </div>
  );
}

// Utility class for scrollbar hiding
const injectScrollbarStyles = () => {
  if (typeof document !== 'undefined') {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
      }
    `;
    document.head.appendChild(styleTag);
  }
};

// Inject the styles when imported
if (typeof window !== 'undefined') {
  injectScrollbarStyles();
}
