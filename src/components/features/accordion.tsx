'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils/ui-utils';


const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    disableBorder?: boolean;
  }
>(({ className, disableBorder = false, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      !disableBorder && 'border-b border-neutral-200 dark:border-neutral-700',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    hideIcon?: boolean;
    iconPosition?: 'left' | 'right';
  }
>(({ className, children, hideIcon = false, iconPosition = 'right', ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:text-neutral-600 dark:hover:text-neutral-300 [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {iconPosition === 'left' && !hideIcon && (
        <ChevronDown className="mr-2 h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300" />
      )}
      {children}
      {iconPosition === 'right' && !hideIcon && (
        <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    animationStyle?: 'default' | 'slide' | 'fade' | 'none';
  }
>(({ className, children, animationStyle = 'default', ...props }, ref) => {
  // Using forwardRef to access open state
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-state') {
          const state = (mutation.target as HTMLElement).getAttribute('data-state');
          setOpen(state === 'open');
        }
      });
    });

    const element = ref && 'current' in ref ? ref.current : null;
    if (element) {
      observer.observe(element, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  if (animationStyle === 'none') {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={cn('overflow-hidden text-sm', className)}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </AccordionPrimitive.Content>
    );
  }

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn('overflow-hidden text-sm', className)}
      {...props}
    >
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={
              animationStyle === 'slide'
                ? { height: 0, opacity: 1 }
                : animationStyle === 'fade'
                  ? { opacity: 0 }
                  : { height: 0, opacity: 0 }
            }
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                opacity: { duration: 0.25, delay: 0.05 },
              },
            }}
            exit={
              animationStyle === 'slide'
                ? { height: 0, opacity: 1 }
                : animationStyle === 'fade'
                  ? { opacity: 0 }
                  : { height: 0, opacity: 0 }
            }
            transition={{
              height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
              opacity: { duration: 0.25 },
            }}
          >
            <div className="pb-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
