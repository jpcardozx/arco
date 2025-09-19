import { useEffect, useState } from 'react';

interface FeatureConfig {
  name: string;
  variants: string[];
  defaultVariant: string;
  distribution?: Record<string, number>;
}

// Feature flags configuration
const featureConfigs: Record<string, FeatureConfig> = {
  hero: {
    name: 'hero',
    variants: ['base', 'enhanced', 'revised'],
    defaultVariant: 'enhanced',
    distribution: {
      base: 0, // 0% of users
      enhanced: 80, // 80% of users
      revised: 20, // 20% of users
    },
  },
  footer: {
    name: 'footer',
    variants: ['base', 'revised'],
    defaultVariant: 'revised',
  },
  // Add more feature configurations as needed
};

// Utility to get consistent hash for user
const getHashedValue = (userId: string, salt: string): number => {
  const str = userId + salt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Hook to determine which variant to show
export const useFeatureVariant = (featureName: string, userId?: string): string => {
  const [variant, setVariant] = useState<string>('');

  useEffect(() => {
    const config = featureConfigs[featureName];
    if (!config) {
      console.warn(`No configuration found for feature: ${featureName}`);
      return;
    }

    // If no distribution is set, use default variant
    if (!config.distribution) {
      setVariant(config.defaultVariant);
      return;
    }

    // If no userId, use default variant
    if (!userId) {
      setVariant(config.defaultVariant);
      return;
    }

    // Get consistent hash for user
    const hash = getHashedValue(userId, featureName);
    const percentage = hash % 100;

    // Determine variant based on distribution
    let cumulative = 0;
    for (const [variant, distribution] of Object.entries(config.distribution)) {
      cumulative += distribution;
      if (percentage < cumulative) {
        setVariant(variant);
        return;
      }
    }

    // Fallback to default variant
    setVariant(config.defaultVariant);
  }, [featureName, userId]);

  return variant;
};

// Hook to manage component variants
export const useComponentVariant = (baseName: string, userId?: string) => {
  const variant = useFeatureVariant(baseName, userId);

  return {
    variant,
    isEnhanced: variant === 'enhanced',
    isRevised: variant === 'revised',
    isBase: variant === 'base',
  };
};

// Utility to track variant performance
export const trackVariantPerformance = (
  featureName: string,
  variant: string,
  metrics: Record<string, number>
) => {
  // Implementation for tracking variant performance
  // This should integrate with your analytics system
};

// Type-safe way to register new feature flags
export const registerFeature = (config: FeatureConfig) => {
  featureConfigs[config.name] = config;
};
