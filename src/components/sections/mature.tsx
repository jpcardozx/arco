/**
 * ARCO DESIGN SYSTEM - VERSÃO MADURA
 * 
 * Design system simples e eficaz focado em conversão
 * Sem overengineering, apenas o que gera resultados
 */

// === TOKENS ESSENCIAIS ===
export const designTokens = {
    colors: {
        // Cores que convertem, não cores bonitas
        primary: '#3B82F6',    // Azul confiança
        success: '#10B981',    // Verde aprovação
        warning: '#F59E0B',    // Urgência controlada
        dark: '#0F172A',       // Background profissional
        light: '#F8FAFC'       // Texto limpo
    },

    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '2rem',
        lg: '4rem',
        xl: '6rem'
    },

    typography: {
        hero: { size: '3.5rem', weight: '700', line: '1.1' },
        h1: { size: '2.5rem', weight: '600', line: '1.2' },
        h2: { size: '2rem', weight: '600', line: '1.3' },
        body: { size: '1.125rem', weight: '400', line: '1.6' },
        caption: { size: '0.875rem', weight: '400', line: '1.4' }
    },

    shadows: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
} as const;

// === COMPONENTES PRÁTICOS ===

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = ''
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 cursor-pointer';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        success: 'bg-green-600 text-white hover:bg-green-700'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    return (
        <div
            className={`
        bg-white rounded-xl border border-gray-200 p-6
        ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};

// === HOOK PRÁTICO DE ANALYTICS ===
export const useTracking = () => {
    const trackEvent = (event: string, data?: Record<string, any>) => {
        // Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', event, data);
        }

        // Console para debug
        console.log(`📊 Event: ${event}`, data);
    };

    return { trackEvent };
};

// === COMPONENTE DE MÉTRICAS ===
interface MetricCardProps {
    label: string;
    value: string;
    improvement?: string;
    color?: 'blue' | 'green' | 'red';
}

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    improvement,
    color = 'blue'
}) => {
    const colors = {
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        red: 'text-red-600 bg-red-50'
    };

    return (
        <Card className="text-center">
            <div className={`text-3xl font-bold ${colors[color].split(' ')[0]}`}>
                {value}
            </div>
            <div className="text-gray-600 text-sm mt-1">
                {label}
            </div>
            {improvement && (
                <div className={`text-xs mt-2 px-2 py-1 rounded-full inline-block ${colors[color]}`}>
                    {improvement}
                </div>
            )}
        </Card>
    );
};

export default {
    designTokens,
    Button,
    Card,
    Container,
    MetricCard,
    useTracking
};
