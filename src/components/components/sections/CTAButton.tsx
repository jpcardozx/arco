'use client';

import Link from 'next/link';
import React from 'react';

interface CTAButtonProps {
  href: string;
  label: string;
  intent?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({
  href,
  label,
  intent = 'primary',
  size = 'md',
  className = '',
}: CTAButtonProps) {
  const base =
    'inline-block font-medium uppercase tracking-[0.075em] transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300';

  const sizes = {
    sm: 'text-[12.5px] px-4 py-2',
    md: 'text-[13.5px] px-6 py-[0.65rem]',
    lg: 'text-[14.5px] px-8 py-[0.8rem]',
  };

  const variants = {
    primary:
      'bg-neutral-900 text-white border-neutral-900 hover:bg-transparent hover:text-neutral-900',
    secondary: 'text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:text-white',
  };

  return (
    <Link
      href={href}
      aria-label={`CTA – ${label}`}
      className={` ${base} ${sizes[size]} ${variants[intent]} rounded-md ${className} `}
    >
      {label}
    </Link>
  );
}
