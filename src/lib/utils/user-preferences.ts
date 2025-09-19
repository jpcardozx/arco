/**
 * ARCO User Preferences
 * Sistema de preferências usando ARCO design tokens
 */

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt' | 'en';
  notifications: boolean;
  analytics: boolean;
}

export const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'pt',
  notifications: true,
  analytics: true
};

export const getPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') return defaultPreferences;
  
  try {
    const stored = localStorage.getItem('arco-preferences');
    return stored ? JSON.parse(stored) : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
};

export const savePreferences = (preferences: UserPreferences): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('arco-preferences', JSON.stringify(preferences));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const initializeSystemPreferences = (): UserPreferences => {
  const preferences = getPreferences();
  
  // Apply theme to document
  if (preferences.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (preferences.theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
  
  return preferences;
};
