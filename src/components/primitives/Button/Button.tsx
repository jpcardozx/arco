import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  size = 'md',
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false
}) => {
  // Size variations using design tokens
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm font-medium',
    md: 'h-10 px-4 text-base font-medium',
    lg: 'h-12 px-6 text-lg font-semibold'
  };

  // Variant styles using ARCO brand colors
  const variantClasses = {
    primary: `
      bg-blue-500 text-white border border-blue-500
      hover:bg-blue-600 hover:border-blue-600
      focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      active:bg-blue-700
    `,
    secondary: `
      bg-orange-500 text-white border border-orange-500
      hover:bg-orange-600 hover:border-orange-600
      focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
      active:bg-orange-700
    `,
    outline: `
      bg-transparent text-blue-600 border border-blue-300
      hover:bg-blue-50 hover:border-blue-400
      focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      active:bg-blue-100
    `,
    ghost: `
      bg-transparent text-neutral-700 border border-transparent
      hover:bg-neutral-100 hover:text-neutral-900
      focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50
    `,
    success: `
      bg-green-500 text-white border border-green-500
      hover:bg-green-600 hover:border-green-600
      focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
    `,
    warning: `
      bg-yellow-500 text-white border border-yellow-500
      hover:bg-yellow-600 hover:border-yellow-600
      focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
    `,
    error: `
      bg-red-500 text-white border border-red-500
      hover:bg-red-600 hover:border-red-600
      focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
    `
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-md
    transition-all duration-200
    font-medium tracking-wide
    focus:outline-none focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-sm
  `.replace(/\s+/g, ' ').trim();

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'cursor-wait' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type="button"
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {icon && !loading && (
        <span className="mr-2 flex items-center">
          {icon}
        </span>
      )}

      {children}
    </button>
  );
};

export default Button;
