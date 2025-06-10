'use client';

import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import React from "react";

export default function DesignCompare() {
  const [mode, setMode] = useState('enhanced');

  const toggleMode = () => {
    setMode(mode === 'enhanced' ? 'original' : 'enhanced');
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 transform flex-col items-center">
      <div className="mb-2 flex items-center space-x-2 rounded-full border border-white/10 bg-neutral-900/90 px-5 py-3 text-white shadow-xl backdrop-blur-md">
        <button
          onClick={toggleMode}
          className={`flex items-center space-x-2 rounded-full px-4 py-1.5 transition-all ${
            mode === 'enhanced' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
          }`}
        >
          <span>Design Aprimorado</span>
        </button>

        <div className="h-6 w-px bg-white/20" />

        <button
          onClick={toggleMode}
          className={`flex items-center space-x-2 rounded-full px-4 py-1.5 transition-all ${
            mode === 'original' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
          }`}
        >
          <span>Design Original</span>
        </button>

        <button
          onClick={toggleMode}
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-full bg-neutral-900/80 px-3 py-1 text-xs text-white/70">
        {mode === 'enhanced' ? (
          <Link href="/page" className="underline">
            Ver design original
          </Link>
        ) : (
          <Link href="/page-enhanced" className="underline">
            Ver design aprimorado
          </Link>
        )}
      </div>
    </div>
  );
}
