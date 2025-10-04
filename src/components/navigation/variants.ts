import { cva } from 'class-variance-authority';

export const navigationVariants = cva(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
    {
        variants: {
            isScrolled: {
                true: 'navbar-glass scrolled',
                false: 'navbar-glass',
            },
        },
        defaultVariants: {
            isScrolled: false,
        },
    }
);

export const navButtonVariants = cva(
    'font-semibold text-sm px-5 py-2.5 h-auto rounded-lg transition-all duration-300 relative overflow-hidden group border',
    {
        variants: {
            variant: {
                ghost: 'text-neutral-800 hover:text-neutral-900 border-white/30 hover:border-white/50 shadow-sm hover:shadow-md',
                cta: 'text-white border-0 shadow-lg hover:shadow-xl relative hover:shadow-teal-500/25 backdrop-blur-sm',
            },
            isScrolled: {
                true: 'bg-white/50 hover:bg-white/70 backdrop-blur-xl',
                false: 'bg-white/30 hover:bg-white/50 backdrop-blur-lg',
            },
        },
        defaultVariants: {
            variant: 'ghost',
            isScrolled: false,
        },
    }
);
