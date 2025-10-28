/**
 * TrackableLink Component
 *
 * Link component that automatically tracks clicks
 */

'use client';

import React, { type AnchorHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';

// ============================================================================
// TYPES
// ============================================================================

interface TrackableLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  trackLabel?: string;
  trackProperties?: Record<string, any>;
  external?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TrackableLink({
  href,
  children,
  trackLabel,
  trackProperties,
  external = false,
  onClick,
  ...props
}: TrackableLinkProps) {
  const { trackInteraction } = useAnalytics();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click
    await trackInteraction(trackLabel || href, 'click', {
      element_type: 'link',
      href,
      external,
      ...trackProperties,
    });

    // Call original onClick if provided
    onClick?.(e);
  };

  // External link
  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link
  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export default TrackableLink;
