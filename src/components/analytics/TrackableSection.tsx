/**
 * TrackableSection Component
 *
 * Section component that tracks when it enters viewport (section views)
 */

'use client';

import React, { type ReactNode, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnalytics } from '@/hooks/useAnalytics';

// ============================================================================
// TYPES
// ============================================================================

interface TrackableSectionProps {
  children: ReactNode;
  sectionName: string;
  trackOnce?: boolean;
  threshold?: number;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TrackableSection({
  children,
  sectionName,
  trackOnce = true,
  threshold = 0.5,
  className,
}: TrackableSectionProps) {
  const { trackEngagement } = useAnalytics();
  const hasTrackedRef = useRef(false);

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: trackOnce,
  });

  useEffect(() => {
    if (inView && (!trackOnce || !hasTrackedRef.current)) {
      trackEngagement('section_view', sectionName);
      hasTrackedRef.current = true;
    }
  }, [inView, sectionName, trackOnce, trackEngagement]);

  return (
    <section ref={ref} className={className} data-section={sectionName}>
      {children}
    </section>
  );
}

export default TrackableSection;
