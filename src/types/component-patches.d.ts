// Additional type declarations for components
import { LogoProps } from '@/components/ui/Logo';
import { STierButtonProps } from '@/components/ui/design-system/STierButton';

declare module '@/components/ui/Logo' {
  export interface LogoProps {
    isScrolled?: boolean;
  }
}

declare module '@/components/ui/design-system/STierButton' {
  export interface STierButtonProps {
    variant?: 'default' | 'outline' | 'outline-inverted' | 'secondary' | 'destructive' | 'ghost' | 'link' | 'premium' | 'premium-dark' | 'premium-light' | 'glass-premium';
  }
}
